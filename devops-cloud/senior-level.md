# DevOps & Cloud - Senior-Level Questions

## 1. Design High-Availability Infrastructure

**Question**: Design a highly available, fault-tolerant infrastructure on AWS.

**Answer**:

**Architecture:**
```
[Route 53 DNS]
     ↓
[CloudFront CDN]
     ↓
[Application Load Balancer] (Multi-AZ)
     ↓
[Auto Scaling Group] → [EC2 instances in multiple AZs]
     ↓
[RDS Multi-AZ] + [Read Replicas]
     ↓
[ElastiCache] (Redis Cluster Mode)
```

**Terraform Example:**
```hcl
# Multi-AZ RDS
resource "aws_db_instance" "main" {
  identifier           = "mydb"
  engine              = "postgres"
  instance_class      = "db.t3.medium"
  
  multi_az            = true
  availability_zone   = "us-east-1a"
  
  backup_retention_period = 7
  backup_window          = "03:00-04:00"
  
  enabled_cloudwatch_logs_exports = ["postgresql"]
}

# Auto Scaling Group
resource "aws_autoscaling_group" "web" {
  name                 = "web-asg"
  vpc_zone_identifier  = [aws_subnet.private_a.id, aws_subnet.private_b.id]
  min_size            = 2
  max_size            = 10
  desired_capacity    = 3
  
  health_check_type         = "ELB"
  health_check_grace_period = 300
  
  launch_template {
    id      = aws_launch_template.web.id
    version = "$Latest"
  }
}
```

**Disaster Recovery:**
- RTO (Recovery Time Objective): < 1 hour
- RPO (Recovery Point Objective): < 15 minutes
- Regular backup testing
- Multi-region failover plan

---

## 2. Design a CI/CD Pipeline

**Question**: Design a comprehensive CI/CD pipeline for a microservices application.

**Answer**:

**Pipeline Stages:**

```
[Git Push] → [Build] → [Test] → [Security Scan] → [Deploy to Dev] → [Integration Tests] → [Deploy to Staging] → [Deploy to Production]
```

**Detailed Pipeline (Jenkins/GitHub Actions):**

```yaml
# .github/workflows/deploy.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Build Docker Image
        run: |
          docker build -t myapp:${{ github.sha }} .
          docker tag myapp:${{ github.sha }} myapp:latest

      - name: Run Unit Tests
        run: docker run myapp:${{ github.sha }} npm test

      - name: Lint Code
        run: docker run myapp:${{ github.sha }} npm run lint

      - name: Security Scan (Trivy)
        run: |
          trivy image --severity HIGH,CRITICAL myapp:${{ github.sha }}

      - name: Push to Registry
        run: |
          echo ${{ secrets.DOCKER_PASSWORD }} | docker login -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
          docker push myapp:${{ github.sha }}

  deploy-dev:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/develop'
    steps:
      - name: Deploy to Dev Environment
        run: |
          kubectl set image deployment/myapp myapp=myapp:${{ github.sha }} -n dev
          kubectl rollout status deployment/myapp -n dev

  integration-tests:
    needs: deploy-dev
    runs-on: ubuntu-latest
    steps:
      - name: Run Integration Tests
        run: |
          npm run test:integration -- --env=dev

  deploy-staging:
    needs: integration-tests
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to Staging
        run: |
          kubectl set image deployment/myapp myapp=myapp:${{ github.sha }} -n staging
          kubectl rollout status deployment/myapp -n staging

      - name: Smoke Tests
        run: curl -f https://staging.myapp.com/health || exit 1

  deploy-production:
    needs: deploy-staging
    runs-on: ubuntu-latest
    environment: production
    steps:
      - name: Blue/Green Deployment
        run: |
          # Deploy to green environment
          kubectl apply -f k8s/green-deployment.yaml
          kubectl set image deployment/myapp-green myapp=myapp:${{ github.sha }} -n prod
          kubectl rollout status deployment/myapp-green -n prod

          # Run smoke tests
          curl -f https://green.myapp.com/health || exit 1

          # Switch traffic
          kubectl patch service myapp -p '{"spec":{"selector":{"version":"green"}}}' -n prod

          # Keep blue for rollback
          sleep 300
          kubectl delete deployment myapp-blue -n prod
```

**Best Practices:**
- **Automated Testing:** Unit, integration, E2E tests in pipeline
- **Security Scanning:** Dependency check (Snyk), container scan (Trivy)
- **Environments:** Dev → Staging → Production with gates
- **Rollback Strategy:** Keep previous version, automated rollback on failure
- **Notifications:** Slack/email alerts on failures
- **Audit Trail:** Log all deployments, who triggered, what changed

---

## 3. Kubernetes Architecture and Management

**Question**: Explain Kubernetes architecture and how you'd manage a production cluster.

**Answer**:

**Kubernetes Architecture:**

```
┌─────────────────────────────────────────┐
│           Control Plane                  │
│  ┌──────────┐  ┌──────────┐            │
│  │ API      │  │ Scheduler │            │
│  │ Server   │  │           │            │
│  └──────────┘  └──────────┘            │
│  ┌──────────┐  ┌──────────┐            │
│  │ etcd     │  │Controller │            │
│  │          │  │Manager    │            │
│  └──────────┘  └──────────┘            │
└─────────────────────────────────────────┘
              │
    ┌─────────┴─────────┐
    ▼                   ▼
┌─────────┐        ┌─────────┐
│  Node 1 │        │  Node 2 │
│ ┌─────┐ │        │ ┌─────┐ │
│ │kubelet│        │ │kubelet│
│ └─────┘ │        │ └─────┘ │
│ ┌─────┐ │        │ ┌─────┐ │
│ │Pods │ │        │ │Pods │ │
│ └─────┘ │        │ └─────┘ │
└─────────┘        └─────────┘
```

**Production Deployment Example:**

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
  namespace: production
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  selector:
    matchLabels:
      app: web-app
  template:
    metadata:
      labels:
        app: web-app
        version: v2.3.0
    spec:
      containers:
      - name: app
        image: myapp:v2.3.0
        ports:
        - containerPort: 8080

        # Resource limits
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"

        # Health checks
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10

        readinessProbe:
          httpGet:
            path: /ready
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5

        # Environment config
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: url

        # Volume mounts
        volumeMounts:
        - name: config
          mountPath: /etc/config

      volumes:
      - name: config
        configMap:
          name: app-config

---
# service.yaml
apiVersion: v1
kind: Service
metadata:
  name: web-app-service
spec:
  type: LoadBalancer
  selector:
    app: web-app
  ports:
  - protocol: TCP
    port: 80
    targetPort: 8080

---
# hpa.yaml (Horizontal Pod Autoscaler)
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: web-app-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: web-app
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
```

**Production Best Practices:**

1. **Resource Management:**
   - Set CPU/memory requests and limits
   - Use namespace resource quotas
   - Monitor resource usage

2. **High Availability:**
   - Run multiple replicas (min 3)
   - Use pod anti-affinity rules
   - Deploy across multiple availability zones

3. **Security:**
   - Use RBAC (Role-Based Access Control)
   - Network policies to restrict traffic
   - Pod security policies
   - Secrets management (external: Vault, AWS Secrets Manager)

4. **Monitoring:**
   - Prometheus + Grafana for metrics
   - ELK/Loki for log aggregation
   - Distributed tracing (Jaeger)

---

## 4. Monitoring, Logging, and Observability

**Question**: How do you implement comprehensive monitoring for a distributed system?

**Answer**:

**The Three Pillars of Observability:**

1. **Metrics** (What is happening?)
2. **Logs** (Detailed events)
3. **Traces** (Request flow through system)

**Architecture:**

```
[Application] → [Prometheus] → [Grafana]
      ↓
[Logs] → [Fluentd] → [Elasticsearch] → [Kibana]
      ↓
[Traces] → [Jaeger]
```

**1. Metrics (Prometheus + Grafana):**

```python
# Python app with Prometheus metrics
from prometheus_client import Counter, Histogram, Gauge, start_http_server
import time

# Define metrics
REQUEST_COUNT = Counter(
    'http_requests_total',
    'Total HTTP requests',
    ['method', 'endpoint', 'status']
)

REQUEST_DURATION = Histogram(
    'http_request_duration_seconds',
    'HTTP request duration',
    ['method', 'endpoint']
)

ACTIVE_USERS = Gauge(
    'active_users',
    'Number of active users'
)

# Use in application
@app.route('/api/orders')
def get_orders():
    with REQUEST_DURATION.labels(method='GET', endpoint='/api/orders').time():
        # Business logic
        result = fetch_orders()
        REQUEST_COUNT.labels(method='GET', endpoint='/api/orders', status=200).inc()
        return result

# Start metrics server
start_http_server(8000)
```

**Prometheus Config:**
```yaml
# prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'myapp'
    kubernetes_sd_configs:
      - role: pod
    relabel_configs:
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
        action: keep
        regex: true
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_port]
        action: replace
        target_label: __address__
        regex: ([^:]+)(?::\d+)?;(\d+)
        replacement: $1:$2

alerting:
  alertmanagers:
    - static_configs:
        - targets: ['alertmanager:9093']

rule_files:
  - 'alerts.yml'
```

**Alert Rules:**
```yaml
# alerts.yml
groups:
  - name: application
    interval: 30s
    rules:
      - alert: HighErrorRate
        expr: |
          sum(rate(http_requests_total{status=~"5.."}[5m]))
          /
          sum(rate(http_requests_total[5m])) > 0.05
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "High error rate detected"
          description: "Error rate is {{ $value }}%"

      - alert: HighLatency
        expr: |
          histogram_quantile(0.95,
            sum(rate(http_request_duration_seconds_bucket[5m])) by (le)
          ) > 1.0
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "High latency detected"
          description: "95th percentile latency is {{ $value }}s"

      - alert: PodCrashLooping
        expr: rate(kube_pod_container_status_restarts_total[15m]) > 0
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "Pod {{ $labels.pod }} is crash looping"
```

**2. Logging (ELK Stack):**

```yaml
# fluentd-configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: fluentd-config
data:
  fluent.conf: |
    <source>
      @type tail
      path /var/log/containers/*.log
      pos_file /var/log/fluentd-containers.log.pos
      tag kubernetes.*
      read_from_head true
      <parse>
        @type json
        time_format %Y-%m-%dT%H:%M:%S.%NZ
      </parse>
    </source>

    <filter kubernetes.**>
      @type kubernetes_metadata
    </filter>

    <match **>
      @type elasticsearch
      host elasticsearch
      port 9200
      logstash_format true
      logstash_prefix fluentd
      include_tag_key true
    </match>
```

**3. Distributed Tracing (Jaeger):**

```python
# Python OpenTelemetry instrumentation
from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.jaeger.thrift import JaegerExporter

# Setup tracing
trace.set_tracer_provider(TracerProvider())
jaeger_exporter = JaegerExporter(
    agent_host_name='jaeger',
    agent_port=6831,
)
trace.get_tracer_provider().add_span_processor(
    BatchSpanProcessor(jaeger_exporter)
)

tracer = trace.get_tracer(__name__)

# Use in code
@app.route('/api/checkout')
def checkout():
    with tracer.start_as_current_span("checkout") as span:
        span.set_attribute("user.id", user_id)

        # Child span
        with tracer.start_as_current_span("validate_cart"):
            validate_cart(cart_id)

        with tracer.start_as_current_span("process_payment"):
            process_payment(payment_info)

        with tracer.start_as_current_span("create_order"):
            order = create_order(cart_id)

        return order
```

**Grafana Dashboard Example Queries:**
```promql
# Request rate
sum(rate(http_requests_total[5m])) by (endpoint)

# Error rate
sum(rate(http_requests_total{status=~"5.."}[5m])) by (endpoint)

# Latency (95th percentile)
histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le, endpoint))

# Pod CPU usage
sum(rate(container_cpu_usage_seconds_total[5m])) by (pod)

# Memory usage
container_memory_working_set_bytes / container_spec_memory_limit_bytes
```

**Alerting Strategy:**
- **Critical:** Page on-call engineer (PagerDuty)
- **Warning:** Slack notification
- **Info:** Log to dashboard

---

## 5. Infrastructure Security Best Practices

**Question**: What security practices do you implement for cloud infrastructure?

**Answer**:

**Defense in Depth Strategy:**

**1. Network Security:**

```hcl
# Terraform - Network segmentation
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
}

# Public subnet (DMZ)
resource "aws_subnet" "public" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "us-east-1a"

  tags = {
    Name = "Public Subnet"
    Tier = "dmz"
  }
}

# Private subnet (Application)
resource "aws_subnet" "private_app" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.10.0/24"
  availability_zone = "us-east-1a"

  tags = {
    Name = "Private App Subnet"
    Tier = "application"
  }
}

# Private subnet (Database)
resource "aws_subnet" "private_db" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.20.0/24"
  availability_zone = "us-east-1a"

  tags = {
    Name = "Private DB Subnet"
    Tier = "data"
  }
}

# Security group - Web tier
resource "aws_security_group" "web" {
  name        = "web-sg"
  description = "Security group for web servers"
  vpc_id      = aws_vpc.main.id

  # Allow HTTPS from anywhere
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow outbound to app tier only
  egress {
    from_port       = 8080
    to_port         = 8080
    protocol        = "tcp"
    security_groups = [aws_security_group.app.id]
  }
}

# Security group - App tier
resource "aws_security_group" "app" {
  name   = "app-sg"
  vpc_id = aws_vpc.main.id

  # Only accept from web tier
  ingress {
    from_port       = 8080
    to_port         = 8080
    protocol        = "tcp"
    security_groups = [aws_security_group.web.id]
  }

  # Only connect to DB tier
  egress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.db.id]
  }
}

# Security group - Database tier
resource "aws_security_group" "db" {
  name   = "db-sg"
  vpc_id = aws_vpc.main.id

  # Only accept from app tier
  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.app.id]
  }

  # No outbound internet access
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = []
  }
}
```

**2. Identity and Access Management (IAM):**

```hcl
# Principle of least privilege
resource "aws_iam_role" "app_role" {
  name = "application-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "ec2.amazonaws.com"
      }
    }]
  })
}

# Policy - only specific S3 bucket access
resource "aws_iam_role_policy" "app_s3_policy" {
  name = "app-s3-access"
  role = aws_iam_role.app_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Action = [
        "s3:GetObject",
        "s3:PutObject"
      ]
      Resource = "arn:aws:s3:::myapp-uploads/*"
    }]
  })
}

# Enforce MFA for human users
resource "aws_iam_policy" "require_mfa" {
  name = "RequireMFA"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Deny"
      NotAction = [
        "iam:CreateVirtualMFADevice",
        "iam:EnableMFADevice",
        "iam:ListMFADevices"
      ]
      Resource = "*"
      Condition = {
        BoolIfExists = {
          "aws:MultiFactorAuthPresent" = "false"
        }
      }
    }]
  })
}
```

**3. Secrets Management:**

```python
# Use AWS Secrets Manager
import boto3
from botocore.exceptions import ClientError

def get_secret(secret_name):
    session = boto3.session.Session()
    client = session.client(
        service_name='secretsmanager',
        region_name='us-east-1'
    )

    try:
        response = client.get_secret_value(SecretId=secret_name)
        return response['SecretString']
    except ClientError as e:
        # Handle error
        raise e

# Usage
db_credentials = get_secret('prod/database/credentials')
```

**4. Encryption:**

```hcl
# Encryption at rest
resource "aws_db_instance" "main" {
  identifier = "mydb"

  # Encrypt database
  storage_encrypted = true
  kms_key_id       = aws_kms_key.db_key.arn
}

resource "aws_s3_bucket" "uploads" {
  bucket = "myapp-uploads"
}

# Encrypt S3 bucket
resource "aws_s3_bucket_server_side_encryption_configuration" "uploads" {
  bucket = aws_s3_bucket.uploads.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm     = "aws:kms"
      kms_master_key_id = aws_kms_key.s3_key.arn
    }
  }
}

# Enforce HTTPS only
resource "aws_s3_bucket_policy" "uploads_https_only" {
  bucket = aws_s3_bucket.uploads.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Deny"
      Principal = "*"
      Action = "s3:*"
      Resource = [
        aws_s3_bucket.uploads.arn,
        "${aws_s3_bucket.uploads.arn}/*"
      ]
      Condition = {
        Bool = {
          "aws:SecureTransport" = "false"
        }
      }
    }]
  })
}
```

**5. Logging and Auditing:**

```hcl
# Enable CloudTrail for audit logs
resource "aws_cloudtrail" "main" {
  name                          = "main-trail"
  s3_bucket_name               = aws_s3_bucket.cloudtrail.id
  include_global_service_events = true
  is_multi_region_trail        = true
  enable_log_file_validation   = true

  event_selector {
    read_write_type           = "All"
    include_management_events = true

    data_resource {
      type   = "AWS::S3::Object"
      values = ["arn:aws:s3:::*/sensitive-data/*"]
    }
  }
}

# VPC Flow Logs
resource "aws_flow_log" "main" {
  vpc_id          = aws_vpc.main.id
  traffic_type    = "ALL"
  iam_role_arn    = aws_iam_role.flow_log_role.arn
  log_destination = aws_cloudwatch_log_group.flow_log.arn
}
```

**6. Container Security:**

```dockerfile
# Dockerfile best practices
FROM node:18-alpine AS builder  # Use minimal base image

# Run as non-root user
RUN addgroup -g 1001 appgroup && \
    adduser -u 1001 -G appgroup -s /bin/sh -D appuser

WORKDIR /app

# Copy only necessary files
COPY package*.json ./
RUN npm ci --only=production

COPY . .

# Switch to non-root user
USER appuser

# Don't expose unnecessary ports
EXPOSE 8080

CMD ["node", "server.js"]
```

**Security Checklist:**
- [ ] Principle of least privilege (IAM roles/policies)
- [ ] Network segmentation (VPC, subnets, security groups)
- [ ] Encryption at rest and in transit
- [ ] Secrets in vault (never in code)
- [ ] MFA for human access
- [ ] Regular security scanning (Trivy, Snyk)
- [ ] Audit logs enabled (CloudTrail, VPC Flow Logs)
- [ ] Automated compliance checking (AWS Config)
- [ ] Incident response plan documented
- [ ] Regular security training for team
