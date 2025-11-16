# DevOps & Cloud - Principal-Level Questions

## 1. Design Multi-Region Active-Active Architecture

**Question**: Design a globally distributed, active-active system with disaster recovery.

**Answer**:

**Architecture:**
```
Global:
├── Route 53 (Geolocation routing)
├── CloudFront (Global CDN)
│
├── US-East Region (Primary)
│   ├── EKS Cluster
│   ├── Aurora Global Database (Primary)
│   └── DynamoDB Global Table
│
└── EU-West Region (Secondary/Active)
    ├── EKS Cluster
    ├── Aurora Global Database (Read Replica, promotable)
    └── DynamoDB Global Table
```

**Key Considerations:**
- Data replication lag
- Conflict resolution (last-write-wins, CRDT)
- Regional failover automation
- Cost optimization

---

## 2. Design Enterprise-Scale Infrastructure as Code (IaC) Strategy

**Question**: Design an IaC strategy for managing infrastructure across 100+ microservices, multiple environments, and regions.

**Answer**:

**Architecture:**

```
IaC Repository Structure:
├── modules/           # Reusable Terraform modules
│   ├── eks-cluster/
│   ├── rds-postgres/
│   ├── vpc-networking/
│   └── security-groups/
├── environments/
│   ├── dev/
│   ├── staging/
│   └── prod/
├── services/          # Per-service infrastructure
│   ├── user-service/
│   ├── payment-service/
│   └── notification-service/
└── global/            # Cross-cutting concerns
    ├── iam-roles/
    ├── route53/
    └── cloudfront/
```

**Key Strategies:**

**1. Module Versioning:**
```hcl
module "eks_cluster" {
  source  = "git::https://github.com/org/terraform-modules.git//eks-cluster?ref=v2.3.0"

  cluster_name = "production-eks"
  node_groups = {
    general = {
      instance_types = ["m5.xlarge"]
      min_size = 3
      max_size = 10
    }
  }
}
```

**2. State Management:**
- Remote state in S3 with DynamoDB locking
- Separate state files per environment/service
- State file encryption with KMS
- Regular state backups

**3. CI/CD Pipeline:**
```yaml
# .gitlab-ci.yml
stages:
  - validate
  - plan
  - apply

terraform-plan:
  stage: plan
  script:
    - terraform init
    - terraform plan -out=plan.tfplan
    - terraform show -json plan.tfplan > plan.json
  artifacts:
    paths:
      - plan.tfplan
      - plan.json

terraform-apply:
  stage: apply
  when: manual
  script:
    - terraform apply plan.tfplan
  only:
    - main
```

**4. Drift Detection:**
- Scheduled drift detection jobs
- Alerts on configuration drift
- Automated drift correction for critical resources

**Best Practices:**
- Module versioning and semantic versioning
- Code review for all infrastructure changes
- Automated testing (terratest, kitchen-terraform)
- Policy as Code (OPA, Sentinel)
- Cost estimation in PR comments
- Blast radius limitation (small state files)

---

## 3. Design Zero-Downtime Deployment Strategy

**Question**: Design a deployment strategy that guarantees zero downtime for critical microservices handling millions of requests per second.

**Answer**:

**Deployment Strategies:**

**1. Blue/Green Deployment:**
```yaml
apiVersion: v1
kind: Service
metadata:
  name: user-service
spec:
  selector:
    app: user-service
    version: blue  # Switch to 'green' for cutover
  ports:
    - port: 80
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: user-service-green
spec:
  replicas: 10
  template:
    metadata:
      labels:
        app: user-service
        version: green
    spec:
      containers:
      - name: app
        image: user-service:v2.0.0
```

**Deployment Process:**
1. Deploy green environment (new version)
2. Run smoke tests on green
3. Gradually shift traffic (10%, 25%, 50%, 100%)
4. Monitor metrics (error rate, latency)
5. Keep blue running for rollback
6. After validation, decommission blue

**2. Canary Deployment with Progressive Traffic:**
```yaml
# Istio VirtualService
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: user-service
spec:
  hosts:
  - user-service
  http:
  - match:
    - headers:
        user-type:
          exact: "internal"
    route:
    - destination:
        host: user-service
        subset: v2
  - route:
    - destination:
        host: user-service
        subset: v1
      weight: 90
    - destination:
        host: user-service
        subset: v2
      weight: 10  # Canary gets 10% traffic
```

**3. Database Migration Strategy:**
```python
# Expand-Contract Pattern
# Step 1: Expand (add new column)
ALTER TABLE users ADD COLUMN email_v2 VARCHAR(255);

# Step 2: Dual Write (application writes to both)
def update_user_email(user_id, new_email):
    db.execute("""
        UPDATE users
        SET email = %s, email_v2 = %s
        WHERE id = %s
    """, (new_email, new_email, user_id))

# Step 3: Backfill old data
UPDATE users SET email_v2 = email WHERE email_v2 IS NULL;

# Step 4: Switch reads to new column
# Step 5: Contract (drop old column)
ALTER TABLE users DROP COLUMN email;
ALTER TABLE users RENAME COLUMN email_v2 TO email;
```

**Key Metrics to Monitor:**
- Error rate (< 0.1% increase)
- P99 latency (< 10% increase)
- Request rate
- CPU/Memory utilization
- Database connection pool

**Rollback Criteria:**
- Error rate > 0.5%
- Latency P99 > 2x baseline
- Manual intervention triggered
- Health check failures > 5%

---

## 4. Design Observability Platform for Microservices

**Question**: Design a comprehensive observability platform for 200+ microservices generating terabytes of telemetry data daily.

**Answer**:

**Three Pillars Architecture:**

```
┌─────────────────────────────────────────────────────┐
│                  Applications (200+)                 │
└─────────────────────────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
    [Metrics]       [Logs]         [Traces]
        │               │               │
   Prometheus      FluentBit        Jaeger
        │               │               │
        └───────────────┼───────────────┘
                        │
                 [Correlation Layer]
                        │
                  [Grafana / UI]
```

**1. Metrics Collection:**
```yaml
# Prometheus ServiceMonitor
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: user-service-metrics
spec:
  selector:
    matchLabels:
      app: user-service
  endpoints:
  - port: metrics
    interval: 15s
    path: /metrics
```

**Key Metrics:**
```prometheus
# SLI Metrics
http_request_duration_seconds{service="user-service"}
http_requests_total{service="user-service", status="200"}
database_query_duration_seconds{service="user-service"}

# Alerting Rules
groups:
- name: slo_alerts
  rules:
  - alert: HighErrorRate
    expr: |
      sum(rate(http_requests_total{status=~"5.."}[5m]))
      /
      sum(rate(http_requests_total[5m])) > 0.01
    for: 5m
    annotations:
      summary: "Error rate above 1%"
```

**2. Distributed Tracing:**
```go
// OpenTelemetry instrumentation
import (
    "go.opentelemetry.io/otel"
    "go.opentelemetry.io/otel/trace"
)

func processOrder(ctx context.Context, orderID string) error {
    tracer := otel.Tracer("order-service")
    ctx, span := tracer.Start(ctx, "processOrder")
    defer span.End()

    // Add attributes
    span.SetAttributes(
        attribute.String("order.id", orderID),
        attribute.String("user.id", getUserID(ctx)),
    )

    // Call downstream service (trace propagates)
    if err := paymentService.Charge(ctx, orderID); err != nil {
        span.RecordError(err)
        return err
    }

    return nil
}
```

**3. Log Aggregation Strategy:**
```yaml
# Fluent Bit configuration
[INPUT]
    Name              tail
    Path              /var/log/containers/*.log
    Parser            docker
    Tag               kube.*
    Mem_Buf_Limit     50MB

[FILTER]
    Name                kubernetes
    Match               kube.*
    Kube_URL            https://kubernetes.default.svc:443
    Merge_Log           On

[OUTPUT]
    Name                es
    Match               *
    Host                elasticsearch
    Index               k8s-logs
    Type                _doc
    Trace_Error         On
```

**4. Cost Optimization:**
- Sample traces (1-10% sampling based on volume)
- Retention policies (7 days hot, 30 days warm, 90 days cold)
- Aggregated metrics vs. raw data
- Intelligent sampling (always trace errors, sample successes)

**5. Correlation:**
```json
// Unified logging format with trace context
{
  "timestamp": "2025-01-15T10:30:00Z",
  "level": "ERROR",
  "service": "user-service",
  "trace_id": "abc123...",
  "span_id": "def456...",
  "user_id": "user_789",
  "message": "Failed to process request",
  "error": "database timeout"
}
```

---

## 5. Design Chaos Engineering Strategy

**Question**: Design a chaos engineering program for a critical financial system processing billions of dollars daily.

**Answer**:

**Chaos Engineering Framework:**

**1. Steady State Definition:**
```yaml
# SLO Definition
service: payment-processing
slos:
  - name: availability
    target: 99.99%
    measurement: uptime

  - name: latency
    target: p99 < 200ms
    measurement: response_time

  - name: success_rate
    target: 99.9%
    measurement: successful_transactions / total_transactions
```

**2. Hypothesis-Driven Experiments:**

**Experiment 1: Database Failover**
```yaml
# Chaos Mesh experiment
apiVersion: chaos-mesh.org/v1alpha1
kind: PodChaos
metadata:
  name: db-primary-failure
spec:
  action: pod-failure
  mode: one
  selector:
    namespaces:
      - production
    labelSelectors:
      app: postgres
      role: primary
  duration: "30s"
  scheduler:
    cron: "@weekly"
```

**Hypothesis:**
- System will automatically failover to replica within 10s
- No transaction loss due to synchronous replication
- Application will retry failed transactions

**Validation:**
- Monitor transaction success rate
- Measure failover time
- Check data consistency

**3. Progressive Blast Radius:**

**Phase 1: Dev Environment**
- All experiments
- High failure rates
- Learning phase

**Phase 2: Staging/Canary**
- Selected experiments
- 1% traffic
- Validate detection

**Phase 3: Production (Controlled)**
- Proven experiments only
- Off-peak hours
- Single availability zone
- 0.1% traffic initially

**Phase 4: Production (Full)**
- Automated experiments
- Business hours
- Multi-region
- Full traffic

**4. Experiment Categories:**

**Network Chaos:**
```yaml
# Introduce latency
apiVersion: chaos-mesh.org/v1alpha1
kind: NetworkChaos
metadata:
  name: network-delay
spec:
  action: delay
  mode: one
  selector:
    namespaces:
      - production
  delay:
    latency: "100ms"
    correlation: "50"
    jitter: "10ms"
```

**Resource Chaos:**
- CPU throttling
- Memory pressure
- Disk I/O saturation

**Application Chaos:**
- Inject exceptions
- Slow responses
- Corrupt data

**Infrastructure Chaos:**
- AZ failures
- DNS failures
- Certificate expiration

**5. GameDays:**
```markdown
## Quarterly GameDay: Regional Failure

**Scenario**: Entire AWS us-east-1 region becomes unavailable

**Participants**:
- Engineering teams
- SRE
- Product managers
- Customer support

**Timeline**:
09:00 - Briefing
09:30 - Inject failure (simulate region loss)
09:35 - Teams respond
11:00 - Recovery complete
11:30 - Retrospective

**Success Criteria**:
- Failover to us-west-2 within 5 minutes
- < 0.1% transaction loss
- Customer-facing status page updated within 2 minutes
```

**6. Safety Measures:**
- Automated abort on SLO breach
- Manual kill switch
- Limited blast radius
- Off-peak hours for risky experiments
- Dedicated on-call engineer during experiments

---

## 6. Design Cost Optimization Strategy for Cloud Infrastructure

**Question**: Design a comprehensive cost optimization strategy for cloud infrastructure spending $5M+ annually.

**Answer**:

**Multi-Layered Approach:**

**1. Right-Sizing Analysis:**
```python
# Automated right-sizing recommendation
import boto3
from datetime import datetime, timedelta

def analyze_ec2_utilization():
    cloudwatch = boto3.client('cloudwatch')
    ec2 = boto3.client('ec2')

    instances = ec2.describe_instances()
    recommendations = []

    for reservation in instances['Reservations']:
        for instance in reservation['Instances']:
            instance_id = instance['InstanceId']
            instance_type = instance['InstanceType']

            # Get CPU utilization (last 30 days)
            cpu_stats = cloudwatch.get_metric_statistics(
                Namespace='AWS/EC2',
                MetricName='CPUUtilization',
                Dimensions=[{'Name': 'InstanceId', 'Value': instance_id}],
                StartTime=datetime.now() - timedelta(days=30),
                EndTime=datetime.now(),
                Period=3600,
                Statistics=['Average', 'Maximum']
            )

            avg_cpu = sum(d['Average'] for d in cpu_stats['Datapoints']) / len(cpu_stats['Datapoints'])
            max_cpu = max(d['Maximum'] for d in cpu_stats['Datapoints'])

            if avg_cpu < 20 and max_cpu < 60:
                recommendations.append({
                    'instance_id': instance_id,
                    'current_type': instance_type,
                    'recommended_type': get_smaller_instance_type(instance_type),
                    'avg_cpu': avg_cpu,
                    'potential_savings': calculate_savings(instance_type)
                })

    return recommendations
```

**2. Commitment-Based Discounts:**

```yaml
Purchasing Strategy:
  Reserved Instances (1-3 year):
    - Baseline capacity: 60% of usage
    - Standard RI for predictable workloads
    - Convertible RI for flexibility

  Savings Plans:
    - Compute Savings Plans: 30% of usage
    - Flexible across instance types
    - Cover containerized workloads

  Spot Instances:
    - Batch processing: 100%
    - Stateless web: 40%
    - Fault-tolerant workloads
    - Spot Fleet with multiple instance types
```

**3. Auto-Scaling Policies:**
```yaml
# Kubernetes HPA with custom metrics
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: user-service-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: user-service
  minReplicas: 10
  maxReplicas: 100
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Pods
    pods:
      metric:
        name: http_requests_per_second
      target:
        type: AverageValue
        averageValue: "1000"
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
      - type: Percent
        value: 50
        periodSeconds: 60
    scaleUp:
      stabilizationWindowSeconds: 0
      policies:
      - type: Percent
        value: 100
        periodSeconds: 30
```

**4. Schedule-Based Scaling:**
```python
# Auto-stop non-production resources
# Lambda function running daily
def stop_non_prod_resources():
    ec2 = boto3.client('ec2')
    rds = boto3.client('rds')

    # Stop dev/staging instances outside business hours
    if is_off_hours():
        # Stop EC2
        instances = ec2.describe_instances(
            Filters=[
                {'Name': 'tag:Environment', 'Values': ['dev', 'staging']},
                {'Name': 'instance-state-name', 'Values': ['running']}
            ]
        )

        for reservation in instances['Reservations']:
            for instance in reservation['Instances']:
                ec2.stop_instances(InstanceIds=[instance['InstanceId']])

        # Stop RDS
        databases = rds.describe_db_instances()
        for db in databases['DBInstances']:
            if 'dev' in db['DBInstanceIdentifier'] or 'staging' in db['DBInstanceIdentifier']:
                rds.stop_db_instance(DBInstanceIdentifier=db['DBInstanceIdentifier'])

# Potential savings: 70% on non-prod infrastructure
```

**5. Storage Optimization:**

**S3 Lifecycle Policies:**
```json
{
  "Rules": [
    {
      "Id": "Archive old logs",
      "Status": "Enabled",
      "Transitions": [
        {
          "Days": 30,
          "StorageClass": "STANDARD_IA"
        },
        {
          "Days": 90,
          "StorageClass": "GLACIER"
        },
        {
          "Days": 365,
          "StorageClass": "DEEP_ARCHIVE"
        }
      ],
      "Expiration": {
        "Days": 2555
      }
    }
  ]
}
```

**EBS Optimization:**
- Identify and delete unused EBS volumes
- Snapshot and delete old volumes
- Use gp3 instead of gp2 (20% cheaper, better performance)
- Right-size volume IOPS and throughput

**6. Cost Monitoring & Alerting:**
```yaml
# CloudWatch Billing Alert
AWSTemplateFormatVersion: '2010-09-09'
Resources:
  BillingAlarm:
    Type: AWS::CloudWatch::Alarm
    Properties:
      AlarmName: MonthlyBillingAlarm
      AlarmDescription: Alert when monthly bill exceeds threshold
      MetricName: EstimatedCharges
      Namespace: AWS/Billing
      Statistic: Maximum
      Period: 21600  # 6 hours
      EvaluationPeriods: 1
      Threshold: 500000  # $500k
      ComparisonOperator: GreaterThanThreshold
      Dimensions:
        - Name: Currency
          Value: USD
```

**7. FinOps Practices:**
- Showback/Chargeback per team
- Cost allocation tags
- Monthly cost review meetings
- Cost anomaly detection
- Budgets per team/project

**Expected Savings:**
- Right-sizing: 20-30%
- Reserved Instances/Savings Plans: 30-50%
- Auto-scaling: 40-60%
- Storage optimization: 50-70%
- Schedule-based scaling: 65-75% on non-prod

**Total Potential Savings: 30-40% ($1.5M-$2M annually)**
