# DevOps & Cloud - Pytania dla Senior-Level

## 1. Projektowanie Infrastruktury o Wysokiej Dostępności

**Pytanie**: Zaprojektuj wysoce dostępną, odporną na awarie infrastrukturę na AWS.

**Odpowiedź**:

**Architektura:**
```
[Route 53 DNS]
     ↓
[CloudFront CDN]
     ↓
[Application Load Balancer] (Multi-AZ)
     ↓
[Auto Scaling Group] → [Instancje EC2 w wielu AZ]
     ↓
[RDS Multi-AZ] + [Repliki do odczytu]
     ↓
[ElastiCache] (Redis Cluster Mode)
```

**Przykład Terraform:**
```hcl
# RDS Multi-AZ
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

# Grupa Auto Scaling
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
- RTO (Recovery Time Objective): < 1 godzina
- RPO (Recovery Point Objective): < 15 minut
- Regularne testowanie kopii zapasowych
- Plan przełączania awaryjnego wieloregionowego

---

## 2. Projektowanie Pipeline CI/CD

**Pytanie**: Zaprojektuj kompleksowy pipeline CI/CD dla aplikacji mikrousługowej.

**Odpowiedź**:

**Etapy Pipeline:**

```
[Git Push] → [Build] → [Test] → [Skan Bezpieczeństwa] → [Deploy do Dev] → [Testy Integracyjne] → [Deploy do Staging] → [Deploy do Production]
```

**Szczegółowy Pipeline (Jenkins/GitHub Actions):**

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

      - name: Budowanie obrazu Docker
        run: |
          docker build -t myapp:${{ github.sha }} .
          docker tag myapp:${{ github.sha }} myapp:latest

      - name: Uruchomienie testów jednostkowych
        run: docker run myapp:${{ github.sha }} npm test

      - name: Lintowanie kodu
        run: docker run myapp:${{ github.sha }} npm run lint

      - name: Skan bezpieczeństwa (Trivy)
        run: |
          trivy image --severity HIGH,CRITICAL myapp:${{ github.sha }}

      - name: Wysłanie do rejestru
        run: |
          echo ${{ secrets.DOCKER_PASSWORD }} | docker login -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
          docker push myapp:${{ github.sha }}

  deploy-dev:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/develop'
    steps:
      - name: Wdrożenie do środowiska Dev
        run: |
          kubectl set image deployment/myapp myapp=myapp:${{ github.sha }} -n dev
          kubectl rollout status deployment/myapp -n dev

  integration-tests:
    needs: deploy-dev
    runs-on: ubuntu-latest
    steps:
      - name: Uruchomienie testów integracyjnych
        run: |
          npm run test:integration -- --env=dev

  deploy-staging:
    needs: integration-tests
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Wdrożenie do Staging
        run: |
          kubectl set image deployment/myapp myapp=myapp:${{ github.sha }} -n staging
          kubectl rollout status deployment/myapp -n staging

      - name: Testy podstawowe
        run: curl -f https://staging.myapp.com/health || exit 1

  deploy-production:
    needs: deploy-staging
    runs-on: ubuntu-latest
    environment: production
    steps:
      - name: Wdrożenie Blue/Green
        run: |
          # Wdrożenie do środowiska green
          kubectl apply -f k8s/green-deployment.yaml
          kubectl set image deployment/myapp-green myapp=myapp:${{ github.sha }} -n prod
          kubectl rollout status deployment/myapp-green -n prod

          # Uruchomienie testów podstawowych
          curl -f https://green.myapp.com/health || exit 1

          # Przełączenie ruchu
          kubectl patch service myapp -p '{"spec":{"selector":{"version":"green"}}}' -n prod

          # Zachowanie blue dla rollback
          sleep 300
          kubectl delete deployment myapp-blue -n prod
```

**Najlepsze Praktyki:**
- **Automatyczne Testowanie:** Testy jednostkowe, integracyjne, E2E w pipeline
- **Skanowanie Bezpieczeństwa:** Sprawdzanie zależności (Snyk), skanowanie kontenerów (Trivy)
- **Środowiska:** Dev → Staging → Production z bramkami
- **Strategia Rollback:** Zachowanie poprzedniej wersji, automatyczny rollback przy awarii
- **Powiadomienia:** Alerty Slack/email przy niepowodzeniach
- **Ścieżka Audytu:** Logowanie wszystkich wdrożeń, kto uruchomił, co się zmieniło

---

## 3. Architektura i Zarządzanie Kubernetes

**Pytanie**: Wyjaśnij architekturę Kubernetes i jak zarządzałbyś klastrem produkcyjnym.

**Odpowiedź**:

**Architektura Kubernetes:**

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

**Przykład Wdrożenia Produkcyjnego:**

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

        # Limity zasobów
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"

        # Kontrole zdrowia
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

        # Konfiguracja środowiska
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: url

        # Montowanie woluminów
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

**Najlepsze Praktyki Produkcyjne:**

1. **Zarządzanie Zasobami:**
   - Ustawianie żądań i limitów CPU/pamięci
   - Używanie kwot zasobów dla namespace
   - Monitorowanie wykorzystania zasobów

2. **Wysoka Dostępność:**
   - Uruchamianie wielu replik (minimum 3)
   - Używanie reguł anty-afinitywności podów
   - Wdrażanie w wielu strefach dostępności

3. **Bezpieczeństwo:**
   - Używanie RBAC (Role-Based Access Control)
   - Polityki sieciowe do ograniczania ruchu
   - Polityki bezpieczeństwa podów
   - Zarządzanie sekretami (zewnętrzne: Vault, AWS Secrets Manager)

4. **Monitoring:**
   - Prometheus + Grafana dla metryk
   - ELK/Loki dla agregacji logów
   - Distributed tracing (Jaeger)

---

## 4. Monitoring, Logowanie i Obserwowalność

**Pytanie**: Jak zaimplementowałbyś kompleksowy monitoring dla systemu rozproszonego?

**Odpowiedź**:

**Trzy Filary Obserwowalności:**

1. **Metryki** (Co się dzieje?)
2. **Logi** (Szczegółowe zdarzenia)
3. **Ślady** (Przepływ żądania przez system)

**Architektura:**

```
[Aplikacja] → [Prometheus] → [Grafana]
      ↓
[Logi] → [Fluentd] → [Elasticsearch] → [Kibana]
      ↓
[Ślady] → [Jaeger]
```

**1. Metryki (Prometheus + Grafana):**

```python
# Aplikacja Python z metrykami Prometheus
from prometheus_client import Counter, Histogram, Gauge, start_http_server
import time

# Definicja metryk
REQUEST_COUNT = Counter(
    'http_requests_total',
    'Całkowita liczba żądań HTTP',
    ['method', 'endpoint', 'status']
)

REQUEST_DURATION = Histogram(
    'http_request_duration_seconds',
    'Czas trwania żądania HTTP',
    ['method', 'endpoint']
)

ACTIVE_USERS = Gauge(
    'active_users',
    'Liczba aktywnych użytkowników'
)

# Użycie w aplikacji
@app.route('/api/orders')
def get_orders():
    with REQUEST_DURATION.labels(method='GET', endpoint='/api/orders').time():
        # Logika biznesowa
        result = fetch_orders()
        REQUEST_COUNT.labels(method='GET', endpoint='/api/orders', status=200).inc()
        return result

# Uruchomienie serwera metryk
start_http_server(8000)
```

**Konfiguracja Prometheus:**
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

**Reguły Alertów:**
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
          summary: "Wykryto wysoki wskaźnik błędów"
          description: "Wskaźnik błędów wynosi {{ $value }}%"

      - alert: HighLatency
        expr: |
          histogram_quantile(0.95,
            sum(rate(http_request_duration_seconds_bucket[5m])) by (le)
          ) > 1.0
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "Wykryto wysokie opóźnienie"
          description: "95. percentyl opóźnienia wynosi {{ $value }}s"

      - alert: PodCrashLooping
        expr: rate(kube_pod_container_status_restarts_total[15m]) > 0
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "Pod {{ $labels.pod }} jest w pętli awarii"
```

**2. Logowanie (ELK Stack):**

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
# Instrumentacja Python OpenTelemetry
from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.jaeger.thrift import JaegerExporter

# Konfiguracja tracingu
trace.set_tracer_provider(TracerProvider())
jaeger_exporter = JaegerExporter(
    agent_host_name='jaeger',
    agent_port=6831,
)
trace.get_tracer_provider().add_span_processor(
    BatchSpanProcessor(jaeger_exporter)
)

tracer = trace.get_tracer(__name__)

# Użycie w kodzie
@app.route('/api/checkout')
def checkout():
    with tracer.start_as_current_span("checkout") as span:
        span.set_attribute("user.id", user_id)

        # Span potomny
        with tracer.start_as_current_span("validate_cart"):
            validate_cart(cart_id)

        with tracer.start_as_current_span("process_payment"):
            process_payment(payment_info)

        with tracer.start_as_current_span("create_order"):
            order = create_order(cart_id)

        return order
```

**Przykładowe Zapytania Dashboard Grafana:**
```promql
# Częstotliwość żądań
sum(rate(http_requests_total[5m])) by (endpoint)

# Wskaźnik błędów
sum(rate(http_requests_total{status=~"5.."}[5m])) by (endpoint)

# Opóźnienie (95. percentyl)
histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le, endpoint))

# Wykorzystanie CPU poda
sum(rate(container_cpu_usage_seconds_total[5m])) by (pod)

# Wykorzystanie pamięci
container_memory_working_set_bytes / container_spec_memory_limit_bytes
```

**Strategia Alertowania:**
- **Krytyczny:** Powiadomienie inżyniera dyżurnego (PagerDuty)
- **Ostrzeżenie:** Powiadomienie Slack
- **Info:** Logowanie do dashboardu

---

## 5. Najlepsze Praktyki Bezpieczeństwa Infrastruktury

**Pytanie**: Jakie praktyki bezpieczeństwa implementujesz dla infrastruktury w chmurze?

**Odpowiedź**:

**Strategia Obrony w Głąb:**

**1. Bezpieczeństwo Sieci:**

```hcl
# Terraform - Segmentacja sieci
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
}

# Podsieć publiczna (DMZ)
resource "aws_subnet" "public" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "us-east-1a"

  tags = {
    Name = "Public Subnet"
    Tier = "dmz"
  }
}

# Podsieć prywatna (Aplikacja)
resource "aws_subnet" "private_app" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.10.0/24"
  availability_zone = "us-east-1a"

  tags = {
    Name = "Private App Subnet"
    Tier = "application"
  }
}

# Podsieć prywatna (Baza danych)
resource "aws_subnet" "private_db" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.20.0/24"
  availability_zone = "us-east-1a"

  tags = {
    Name = "Private DB Subnet"
    Tier = "data"
  }
}

# Grupa bezpieczeństwa - warstwa Web
resource "aws_security_group" "web" {
  name        = "web-sg"
  description = "Grupa bezpieczeństwa dla serwerów web"
  vpc_id      = aws_vpc.main.id

  # Zezwól na HTTPS z dowolnego miejsca
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Zezwól na ruch wychodzący tylko do warstwy app
  egress {
    from_port       = 8080
    to_port         = 8080
    protocol        = "tcp"
    security_groups = [aws_security_group.app.id]
  }
}

# Grupa bezpieczeństwa - warstwa App
resource "aws_security_group" "app" {
  name   = "app-sg"
  vpc_id = aws_vpc.main.id

  # Akceptuj tylko z warstwy web
  ingress {
    from_port       = 8080
    to_port         = 8080
    protocol        = "tcp"
    security_groups = [aws_security_group.web.id]
  }

  # Łącz się tylko z warstwą DB
  egress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.db.id]
  }
}

# Grupa bezpieczeństwa - warstwa Bazy danych
resource "aws_security_group" "db" {
  name   = "db-sg"
  vpc_id = aws_vpc.main.id

  # Akceptuj tylko z warstwy app
  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.app.id]
  }

  # Brak dostępu do internetu
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
# Zasada najmniejszych uprawnień
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

# Polityka - dostęp tylko do określonego bucketu S3
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

# Wymuszenie MFA dla użytkowników
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

**3. Zarządzanie Sekretami:**

```python
# Użycie AWS Secrets Manager
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
        # Obsługa błędu
        raise e

# Użycie
db_credentials = get_secret('prod/database/credentials')
```

**4. Szyfrowanie:**

```hcl
# Szyfrowanie w spoczynku
resource "aws_db_instance" "main" {
  identifier = "mydb"

  # Szyfrowanie bazy danych
  storage_encrypted = true
  kms_key_id       = aws_kms_key.db_key.arn
}

resource "aws_s3_bucket" "uploads" {
  bucket = "myapp-uploads"
}

# Szyfrowanie bucketu S3
resource "aws_s3_bucket_server_side_encryption_configuration" "uploads" {
  bucket = aws_s3_bucket.uploads.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm     = "aws:kms"
      kms_master_key_id = aws_kms_key.s3_key.arn
    }
  }
}

# Wymuszenie tylko HTTPS
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

**5. Logowanie i Audyt:**

```hcl
# Włączenie CloudTrail dla logów audytu
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

**6. Bezpieczeństwo Kontenerów:**

```dockerfile
# Najlepsze praktyki Dockerfile
FROM node:18-alpine AS builder  # Użyj minimalnego obrazu bazowego

# Uruchom jako użytkownik nie-root
RUN addgroup -g 1001 appgroup && \
    adduser -u 1001 -G appgroup -s /bin/sh -D appuser

WORKDIR /app

# Kopiuj tylko niezbędne pliki
COPY package*.json ./
RUN npm ci --only=production

COPY . .

# Przełącz na użytkownika nie-root
USER appuser

# Nie udostępniaj niepotrzebnych portów
EXPOSE 8080

CMD ["node", "server.js"]
```

**Lista Kontrolna Bezpieczeństwa:**
- [ ] Zasada najmniejszych uprawnień (role/polityki IAM)
- [ ] Segmentacja sieci (VPC, podsieci, grupy bezpieczeństwa)
- [ ] Szyfrowanie w spoczynku i w tranzycie
- [ ] Sekrety w vault (nigdy w kodzie)
- [ ] MFA dla dostępu ludzkiego
- [ ] Regularne skanowanie bezpieczeństwa (Trivy, Snyk)
- [ ] Włączone logi audytu (CloudTrail, VPC Flow Logs)
- [ ] Automatyczne sprawdzanie zgodności (AWS Config)
- [ ] Udokumentowany plan reagowania na incydenty
- [ ] Regularne szkolenia bezpieczeństwa dla zespołu
