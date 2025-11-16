# DevOps & Cloud - Pytania Poziom Principal

## 1. Zaprojektuj Architekturę Multi-Region Active-Active

**Pytanie**: Zaprojektuj globalnie rozprosowany system active-active z odzyskiwaniem po awarii.

**Odpowiedź**:

**Architektura:**
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

**Kluczowe Zagadnienia:**
- Opóźnienie replikacji danych
- Rozwiązywanie konfliktów (last-write-wins, CRDT)
- Automatyczne przełączanie regionów
- Optymalizacja kosztów

---

## 2. Zaprojektuj Strategię Infrastructure as Code (IaC) dla Przedsiębiorstwa

**Pytanie**: Zaprojektuj strategię IaC do zarządzania infrastrukturą dla 100+ mikroserwisów, wielu środowisk i regionów.

**Odpowiedź**:

**Architektura:**

```
Struktura Repozytorium IaC:
├── modules/           # Moduły Terraform do wielokrotnego użytku
│   ├── eks-cluster/
│   ├── rds-postgres/
│   ├── vpc-networking/
│   └── security-groups/
├── environments/
│   ├── dev/
│   ├── staging/
│   └── prod/
├── services/          # Infrastruktura per-serwis
│   ├── user-service/
│   ├── payment-service/
│   └── notification-service/
└── global/            # Zagadnienia przekrojowe
    ├── iam-roles/
    ├── route53/
    └── cloudfront/
```

**Kluczowe Strategie:**

**1. Wersjonowanie Modułów:**
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

**2. Zarządzanie Stanem:**
- Zdalny stan w S3 z blokowaniem DynamoDB
- Osobne pliki stanu per środowisko/serwis
- Szyfrowanie plików stanu za pomocą KMS
- Regularne kopie zapasowe stanu

**3. Pipeline CI/CD:**
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

**4. Wykrywanie Odchyleń:**
- Zaplanowane zadania wykrywania odchyleń
- Alerty o odchyleniach konfiguracji
- Automatyczna korekta odchyleń dla krytycznych zasobów

**Najlepsze Praktyki:**
- Wersjonowanie modułów i wersjonowanie semantyczne
- Code review dla wszystkich zmian infrastruktury
- Automatyczne testowanie (terratest, kitchen-terraform)
- Policy as Code (OPA, Sentinel)
- Szacowanie kosztów w komentarzach PR
- Ograniczanie promienia rażenia (małe pliki stanu)

---

## 3. Zaprojektuj Strategię Wdrażania bez Przestojów

**Pytanie**: Zaprojektuj strategię wdrażania gwarantującą zero przestojów dla krytycznych mikroserwisów obsługujących miliony żądań na sekundę.

**Odpowiedź**:

**Strategie Wdrażania:**

**1. Blue/Green Deployment:**
```yaml
apiVersion: v1
kind: Service
metadata:
  name: user-service
spec:
  selector:
    app: user-service
    version: blue  # Przełącz na 'green' dla cutover
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

**Proces Wdrażania:**
1. Wdróż środowisko green (nowa wersja)
2. Uruchom testy smoke na green
3. Stopniowo przenoś ruch (10%, 25%, 50%, 100%)
4. Monitoruj metryki (wskaźnik błędów, opóźnienia)
5. Utrzymuj blue działające dla rollbacku
6. Po walidacji, zdejmij blue

**2. Canary Deployment z Progresywnym Ruchem:**
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
      weight: 10  # Canary otrzymuje 10% ruchu
```

**3. Strategia Migracji Bazy Danych:**
```python
# Wzorzec Expand-Contract
# Krok 1: Expand (dodaj nową kolumnę)
ALTER TABLE users ADD COLUMN email_v2 VARCHAR(255);

# Krok 2: Dual Write (aplikacja zapisuje do obu)
def update_user_email(user_id, new_email):
    db.execute("""
        UPDATE users
        SET email = %s, email_v2 = %s
        WHERE id = %s
    """, (new_email, new_email, user_id))

# Krok 3: Uzupełnij stare dane
UPDATE users SET email_v2 = email WHERE email_v2 IS NULL;

# Krok 4: Przełącz odczyty na nową kolumnę
# Krok 5: Contract (usuń starą kolumnę)
ALTER TABLE users DROP COLUMN email;
ALTER TABLE users RENAME COLUMN email_v2 TO email;
```

**Kluczowe Metryki do Monitorowania:**
- Wskaźnik błędów (< 0.1% wzrost)
- Opóźnienie P99 (< 10% wzrost)
- Liczba żądań
- Wykorzystanie CPU/Pamięci
- Pula połączeń z bazą danych

**Kryteria Rollbacku:**
- Wskaźnik błędów > 0.5%
- Opóźnienie P99 > 2x bazowe
- Ręczna interwencja wywołana
- Błędy health check > 5%

---

## 4. Zaprojektuj Platformę Obserwowalności dla Mikroserwisów

**Pytanie**: Zaprojektuj kompleksową platformę obserwowalności dla 200+ mikroserwisów generujących terabajty danych telemetrycznych dziennie.

**Odpowiedź**:

**Architektura Trzech Filarów:**

```
┌─────────────────────────────────────────────────────┐
│                  Aplikacje (200+)                    │
└─────────────────────────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
    [Metryki]       [Logi]         [Ślady]
        │               │               │
   Prometheus      FluentBit        Jaeger
        │               │               │
        └───────────────┼───────────────┘
                        │
                 [Warstwa Korelacji]
                        │
                  [Grafana / UI]
```

**1. Zbieranie Metryk:**
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

**Kluczowe Metryki:**
```prometheus
# Metryki SLI
http_request_duration_seconds{service="user-service"}
http_requests_total{service="user-service", status="200"}
database_query_duration_seconds{service="user-service"}

# Reguły Alertów
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
      summary: "Wskaźnik błędów powyżej 1%"
```

**2. Rozproszone Śledzenie:**
```go
// Instrumentacja OpenTelemetry
import (
    "go.opentelemetry.io/otel"
    "go.opentelemetry.io/otel/trace"
)

func processOrder(ctx context.Context, orderID string) error {
    tracer := otel.Tracer("order-service")
    ctx, span := tracer.Start(ctx, "processOrder")
    defer span.End()

    // Dodaj atrybuty
    span.SetAttributes(
        attribute.String("order.id", orderID),
        attribute.String("user.id", getUserID(ctx)),
    )

    // Wywołaj serwis downstream (ślad propagowany)
    if err := paymentService.Charge(ctx, orderID); err != nil {
        span.RecordError(err)
        return err
    }

    return nil
}
```

**3. Strategia Agregacji Logów:**
```yaml
# Konfiguracja Fluent Bit
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

**4. Optymalizacja Kosztów:**
- Próbkowanie śladów (1-10% próbkowania w zależności od wolumenu)
- Zasady retencji (7 dni hot, 30 dni warm, 90 dni cold)
- Zagregowane metryki vs. surowe dane
- Inteligentne próbkowanie (zawsze śledź błędy, próbkuj sukcesy)

**5. Korelacja:**
```json
// Zunifikowany format logowania z kontekstem śladu
{
  "timestamp": "2025-01-15T10:30:00Z",
  "level": "ERROR",
  "service": "user-service",
  "trace_id": "abc123...",
  "span_id": "def456...",
  "user_id": "user_789",
  "message": "Nie udało się przetworzyć żądania",
  "error": "timeout bazy danych"
}
```

---

## 5. Zaprojektuj Strategię Chaos Engineering

**Pytanie**: Zaprojektuj program chaos engineering dla krytycznego systemu finansowego przetwarzającego miliardy dolarów dziennie.

**Odpowiedź**:

**Framework Chaos Engineering:**

**1. Definicja Stanu Ustalonego:**
```yaml
# Definicja SLO
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

**2. Eksperymenty Oparte na Hipotezach:**

**Eksperyment 1: Failover Bazy Danych**
```yaml
# Eksperyment Chaos Mesh
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

**Hipoteza:**
- System automatycznie przełączy się na replikę w ciągu 10s
- Brak utraty transakcji dzięki synchronicznej replikacji
- Aplikacja ponowi nieudane transakcje

**Walidacja:**
- Monitoruj wskaźnik sukcesu transakcji
- Zmierz czas failoveru
- Sprawdź spójność danych

**3. Progresywny Promień Rażenia:**

**Faza 1: Środowisko Dev**
- Wszystkie eksperymenty
- Wysokie wskaźniki awarii
- Faza uczenia

**Faza 2: Staging/Canary**
- Wybrane eksperymenty
- 1% ruchu
- Walidacja wykrywania

**Faza 3: Produkcja (Kontrolowana)**
- Tylko sprawdzone eksperymenty
- Godziny poza szczytem
- Pojedyncza strefa dostępności
- Początkowo 0.1% ruchu

**Faza 4: Produkcja (Pełna)**
- Automatyczne eksperymenty
- Godziny pracy
- Multi-region
- Pełny ruch

**4. Kategorie Eksperymentów:**

**Chaos Sieciowy:**
```yaml
# Wprowadź opóźnienie
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

**Chaos Zasobów:**
- Ograniczanie CPU
- Presja pamięci
- Nasycenie I/O dysku

**Chaos Aplikacji:**
- Wstrzykiwanie wyjątków
- Powolne odpowiedzi
- Korupcja danych

**Chaos Infrastruktury:**
- Awarie AZ
- Awarie DNS
- Wygaśnięcie certyfikatów

**5. GameDays:**
```markdown
## Kwartalny GameDay: Awaria Regionalna

**Scenariusz**: Cały region AWS us-east-1 staje się niedostępny

**Uczestnicy**:
- Zespoły inżynieryjne
- SRE
- Product managerowie
- Wsparcie klienta

**Oś czasu**:
09:00 - Briefing
09:30 - Wprowadź awarię (symuluj utratę regionu)
09:35 - Zespoły reagują
11:00 - Odzyskanie zakończone
11:30 - Retrospektywa

**Kryteria Sukcesu**:
- Failover do us-west-2 w ciągu 5 minut
- < 0.1% utraty transakcji
- Strona statusu dla klienta zaktualizowana w ciągu 2 minut
```

**6. Środki Bezpieczeństwa:**
- Automatyczne przerwanie przy naruszeniu SLO
- Ręczny kill switch
- Ograniczony promień rażenia
- Godziny poza szczytem dla ryzykownych eksperymentów
- Dedykowany inżynier on-call podczas eksperymentów

---

## 6. Zaprojektuj Strategię Optymalizacji Kosztów Infrastruktury Cloud

**Pytanie**: Zaprojektuj kompleksową strategię optymalizacji kosztów dla infrastruktury cloud wydającej $5M+ rocznie.

**Odpowiedź**:

**Podejście Wielowarstwowe:**

**1. Analiza Right-Sizing:**
```python
# Automatyczne rekomendacje right-sizing
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

            # Pobierz wykorzystanie CPU (ostatnie 30 dni)
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

**2. Rabaty Oparte na Zobowiązaniach:**

```yaml
Strategia Zakupowa:
  Reserved Instances (1-3 lata):
    - Pojemność bazowa: 60% użycia
    - Standard RI dla przewidywalnych obciążeń
    - Convertible RI dla elastyczności

  Savings Plans:
    - Compute Savings Plans: 30% użycia
    - Elastyczne między typami instancji
    - Pokrywają obciążenia kontenerowe

  Spot Instances:
    - Przetwarzanie wsadowe: 100%
    - Bezstanowy web: 40%
    - Obciążenia tolerujące błędy
    - Spot Fleet z wieloma typami instancji
```

**3. Polityki Auto-Scaling:**
```yaml
# Kubernetes HPA z niestandardowymi metrykami
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

**4. Skalowanie Oparte na Harmonogramie:**
```python
# Auto-stop zasobów nieprodukcyjnych
# Funkcja Lambda uruchamiana codziennie
def stop_non_prod_resources():
    ec2 = boto3.client('ec2')
    rds = boto3.client('rds')

    # Zatrzymaj instancje dev/staging poza godzinami pracy
    if is_off_hours():
        # Zatrzymaj EC2
        instances = ec2.describe_instances(
            Filters=[
                {'Name': 'tag:Environment', 'Values': ['dev', 'staging']},
                {'Name': 'instance-state-name', 'Values': ['running']}
            ]
        )

        for reservation in instances['Reservations']:
            for instance in reservation['Instances']:
                ec2.stop_instances(InstanceIds=[instance['InstanceId']])

        # Zatrzymaj RDS
        databases = rds.describe_db_instances()
        for db in databases['DBInstances']:
            if 'dev' in db['DBInstanceIdentifier'] or 'staging' in db['DBInstanceIdentifier']:
                rds.stop_db_instance(DBInstanceIdentifier=db['DBInstanceIdentifier'])

# Potencjalne oszczędności: 70% na infrastrukturze nieprodukcyjnej
```

**5. Optymalizacja Przechowywania:**

**Polityki Cyklu Życia S3:**
```json
{
  "Rules": [
    {
      "Id": "Archiwizuj stare logi",
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

**Optymalizacja EBS:**
- Identyfikuj i usuń nieużywane woluminy EBS
- Snapshot i usuń stare woluminy
- Użyj gp3 zamiast gp2 (20% taniej, lepsza wydajność)
- Right-size IOPS i przepustowość woluminów

**6. Monitorowanie Kosztów i Alerty:**
```yaml
# Alert Rozliczeniowy CloudWatch
AWSTemplateFormatVersion: '2010-09-09'
Resources:
  BillingAlarm:
    Type: AWS::CloudWatch::Alarm
    Properties:
      AlarmName: MonthlyBillingAlarm
      AlarmDescription: Alert gdy miesięczny rachunek przekracza próg
      MetricName: EstimatedCharges
      Namespace: AWS/Billing
      Statistic: Maximum
      Period: 21600  # 6 godzin
      EvaluationPeriods: 1
      Threshold: 500000  # $500k
      ComparisonOperator: GreaterThanThreshold
      Dimensions:
        - Name: Currency
          Value: USD
```

**7. Praktyki FinOps:**
- Showback/Chargeback per zespół
- Tagi alokacji kosztów
- Miesięczne spotkania przeglądowe kosztów
- Wykrywanie anomalii kosztowych
- Budżety per zespół/projekt

**Oczekiwane Oszczędności:**
- Right-sizing: 20-30%
- Reserved Instances/Savings Plans: 30-50%
- Auto-scaling: 40-60%
- Optymalizacja przechowywania: 50-70%
- Skalowanie oparte na harmonogramie: 65-75% na non-prod

**Całkowite Potencjalne Oszczędności: 30-40% ($1.5M-$2M rocznie)**
