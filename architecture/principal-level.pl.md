# Architektura Oprogramowania - Pytania dla Poziomu Principal

## 1. Zaprojektuj Architekturę SaaS Multi-Tenant

**Pytanie**: Zaprojektuj platformę SaaS multi-tenant. Omów strategie izolacji i kompromisy.

**Odpowiedź**:

**Strategie Izolacji:**

**1. Współdzielona Baza Danych, Współdzielony Schemat:**
```sql
CREATE TABLE users (
    id BIGINT,
    tenant_id BIGINT,  -- Every table has tenant_id
    name VARCHAR(100)
);

-- All queries filtered by tenant_id
SELECT * FROM users WHERE tenant_id = ? AND id = ?;
```
- Zalety: Najniższy koszt, łatwe zarządzanie
- Wady: Brak izolacji danych, problem "hałaśliwego sąsiada"

**2. Współdzielona Baza Danych, Osobne Schematy:**
```sql
-- tenant_1 schema
CREATE SCHEMA tenant_1;
CREATE TABLE tenant_1.users (...);

-- tenant_2 schema
CREATE SCHEMA tenant_2;
CREATE TABLE tenant_2.users (...);
```
- Zalety: Lepsza izolacja, umiarkowany koszt
- Wady: Zmiany schematu są skomplikowane

**3. Osobna Baza Danych dla Każdego Najemcy:**
- Zalety: Całkowita izolacja, możliwość dostosowania dla każdego najemcy
- Wady: Kosztowne, trudniejsze zarządzanie w skali

**Podejście Hybrydowe:**
```python
class TenantRouter:
    def get_database(self, tenant_id):
        tier = self.get_tenant_tier(tenant_id)

        if tier == 'enterprise':
            # Dedicated database
            return f"tenant_{tenant_id}_db"
        elif tier == 'premium':
            # Shared DB, separate schema
            return f"shared_db.tenant_{tenant_id}"
        else:
            # Shared everything
            return "shared_db.public"
```

**Kluczowe Zagadnienia:**
- Bezpieczeństwo na poziomie wiersza (RLS) dla współdzielonych tabel
- Pooling połączeń per najemca
- Ograniczanie częstotliwości żądań per najemca
- Strategie backup/restore
- Wymagania dotyczące rezydencji danych

---

## 2. Zaprojektuj Architekturę Event-Driven na Dużą Skalę

**Pytanie**: Zaprojektuj architekturę event-driven dla dużej platformy e-commerce przetwarzającej miliony zdarzeń na sekundę.

**Odpowiedź**:

**Architektura:**

```
┌─────────────────────────────────────────────────────┐
│              Event Producers                         │
│  Order Service | Payment | Inventory | Shipping     │
└─────────────────────────────────────────────────────┘
                        │
                        ↓
            ┌───────────────────────┐
            │   Event Bus (Kafka)   │
            │   - Partitioned       │
            │   - Replicated        │
            │   - Durable           │
            └───────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        ↓               ↓               ↓
   [Analytics]   [Notifications]  [Warehouse]
```

**Ewolucja Schematów Zdarzeń:**

```json
// Event Envelope (Common Structure)
{
  "eventId": "uuid",
  "eventType": "order.placed",
  "eventVersion": "v2",
  "timestamp": "2025-01-15T10:30:00Z",
  "correlationId": "trace-id",
  "causationId": "parent-event-id",
  "metadata": {
    "source": "order-service",
    "userId": "user-123"
  },
  "payload": {
    // Event-specific data
  }
}
```

**Integracja z Schema Registry:**

```python
from confluent_kafka import avro
from confluent_kafka.avro import AvroProducer

# Define schema with backward compatibility
order_placed_schema = """
{
  "type": "record",
  "name": "OrderPlaced",
  "namespace": "com.ecommerce.events",
  "fields": [
    {"name": "orderId", "type": "string"},
    {"name": "customerId", "type": "string"},
    {"name": "totalAmount", "type": "double"},
    {"name": "currency", "type": "string", "default": "USD"},
    {"name": "items", "type": {"type": "array", "items": "OrderItem"}},
    // New field with default (backward compatible)
    {"name": "loyaltyPoints", "type": ["null", "int"], "default": null}
  ]
}
"""

producer = AvroProducer({
    'bootstrap.servers': 'kafka:9092',
    'schema.registry.url': 'http://schema-registry:8081'
}, default_value_schema=avro.loads(order_placed_schema))
```

**Wzorce Przetwarzania Zdarzeń:**

**1. Choreografia (Zdecentralizowana):**
```python
# Each service reacts to events independently

# Order Service
def place_order(order):
    save_order(order)
    publish_event("order.placed", order)

# Payment Service (listens to order.placed)
@event_handler("order.placed")
def process_payment(event):
    payment = charge_customer(event.payload)
    if payment.success:
        publish_event("payment.completed", payment)
    else:
        publish_event("payment.failed", payment)

# Inventory Service (listens to payment.completed)
@event_handler("payment.completed")
def reserve_inventory(event):
    reserved = reserve_items(event.payload.items)
    publish_event("inventory.reserved", reserved)
```

**2. Orkiestracja (Scentralizowana Saga):**
```python
# Saga Orchestrator
class OrderSaga:
    def __init__(self, order):
        self.order = order
        self.state = "INITIATED"

    async def execute(self):
        try:
            # Step 1: Process payment
            payment = await self.payment_service.charge(self.order)
            self.state = "PAYMENT_COMPLETED"

            # Step 2: Reserve inventory
            inventory = await self.inventory_service.reserve(self.order.items)
            self.state = "INVENTORY_RESERVED"

            # Step 3: Create shipment
            shipment = await self.shipping_service.create(self.order)
            self.state = "COMPLETED"

            publish_event("order.completed", self.order)

        except PaymentError as e:
            await self.compensate_payment()
        except InventoryError as e:
            await self.compensate_payment()
            await self.compensate_inventory()
        except ShippingError as e:
            await self.compensate_payment()
            await self.compensate_inventory()

    async def compensate_payment(self):
        await self.payment_service.refund(self.order)
        publish_event("payment.refunded", self.order)
```

**Gwarantowane Dostarczenie:**

```python
# Transactional Outbox Pattern
from sqlalchemy import event
from sqlalchemy.orm import Session

class Order(Base):
    __tablename__ = 'orders'
    id = Column(String, primary_key=True)
    # ... other fields

class OutboxEvent(Base):
    __tablename__ = 'outbox_events'
    id = Column(String, primary_key=True)
    aggregate_id = Column(String)
    event_type = Column(String)
    payload = Column(JSON)
    created_at = Column(DateTime)
    published = Column(Boolean, default=False)

def create_order(session: Session, order_data):
    # Transaction includes both business logic and event
    order = Order(**order_data)
    session.add(order)

    # Add event to outbox (same transaction)
    outbox_event = OutboxEvent(
        id=generate_uuid(),
        aggregate_id=order.id,
        event_type="order.placed",
        payload=order.to_dict(),
        created_at=datetime.now()
    )
    session.add(outbox_event)

    session.commit()  # Atomic: both order and event saved

# Background worker publishes events from outbox
async def outbox_publisher():
    while True:
        unpublished = session.query(OutboxEvent).filter_by(published=False).limit(100).all()

        for event in unpublished:
            try:
                kafka_producer.send(event.event_type, event.payload)
                event.published = True
                session.commit()
            except Exception as e:
                logger.error(f"Failed to publish event {event.id}: {e}")
                # Retry logic

        await asyncio.sleep(1)
```

**Kluczowe Zagadnienia:**
- Idempotentność (obsługa duplikatów zdarzeń)
- Kolejność zdarzeń (użycie kluczy partycji)
- Dead letter queues dla nieudanych zdarzeń
- Wersjonowanie zdarzeń i ewolucja schematów
- Monitoring i śledzenie poprzez zdarzenia

---

## 3. Zaprojektuj Strategię API Gateway

**Pytanie**: Zaprojektuj strategię API gateway dla architektury microservices obsługującej klientów mobilnych, webowych i zewnętrznych.

**Odpowiedź**:

**Wielowarstwowa Architektura Gateway:**

```
[Clients: Mobile, Web, Partners]
            │
            ↓
    ┌───────────────────┐
    │  CDN (CloudFront) │
    │  - Static assets  │
    │  - Edge caching   │
    └───────────────────┘
            │
            ↓
    ┌───────────────────┐
    │  API Gateway      │
    │  - Auth           │
    │  - Rate limiting  │
    │  - Routing        │
    └───────────────────┘
            │
    ┌───────┴────────┬──────────┬─────────┐
    ↓                ↓          ↓         ↓
[User Service] [Order Svc] [Product] [Payment]
```

**Wzorzec Backend for Frontend (BFF):**

```typescript
// Mobile BFF - Optimized for mobile clients
@Controller('/mobile/api')
export class MobileBFFController {
  // Aggregates multiple service calls
  @Get('/home')
  async getHomeScreen(): Promise<MobileHomeResponse> {
    // Parallel calls to multiple services
    const [user, recommendations, promotions] = await Promise.all([
      this.userService.getCurrentUser(),
      this.recommendationService.getPersonalized(),
      this.promotionService.getActive()
    ]);

    // Transform to mobile-optimized format
    return {
      user: this.transformUserForMobile(user),
      recommendedProducts: recommendations.slice(0, 10), // Limit for mobile
      banners: this.transformPromotions(promotions)
    };
  }
}

// Web BFF - Optimized for web clients
@Controller('/web/api')
export class WebBFFController {
  @Get('/home')
  async getHomeScreen(): Promise<WebHomeResponse> {
    // Same data, different format
    const [user, recommendations, promotions, categories] = await Promise.all([
      this.userService.getCurrentUser(),
      this.recommendationService.getPersonalized(),
      this.promotionService.getActive(),
      this.categoryService.getAll() // Web shows full category tree
    ]);

    return {
      user,
      recommendations: recommendations.slice(0, 50), // More items for web
      promotions,
      categoryTree: categories
    };
  }
}
```

**Konfiguracja API Gateway (Przykład Kong):**

```yaml
# kong.yml
_format_version: "2.1"

services:
  - name: user-service
    url: http://user-service:8080
    routes:
      - name: user-route
        paths:
          - /api/users
        strip_path: true
    plugins:
      # Authentication
      - name: jwt
        config:
          key_claim_name: kid
          secret_is_base64: false

      # Rate limiting per user
      - name: rate-limiting
        config:
          minute: 100
          policy: local
          limit_by: consumer

      # Request transformation
      - name: request-transformer
        config:
          add:
            headers:
              - X-Service-Version:v1
              - X-Request-ID:$(uuid)

      # Response caching
      - name: proxy-cache
        config:
          strategy: memory
          content_type:
            - application/json
          cache_ttl: 300

  - name: order-service
    url: http://order-service:8080
    routes:
      - name: order-route
        paths:
          - /api/orders
    plugins:
      # Circuit breaker
      - name: circuit-breaker
        config:
          error_threshold: 50
          timeout: 30
          recovery_timeout: 30
```

**GraphQL Gateway (Alternatywne Podejście):**

```typescript
// Apollo Federation Gateway
import { ApolloGateway } from '@apollo/gateway';

const gateway = new ApolloGateway({
  serviceList: [
    { name: 'users', url: 'http://user-service:4001/graphql' },
    { name: 'orders', url: 'http://order-service:4002/graphql' },
    { name: 'products', url: 'http://product-service:4003/graphql' }
  ],
  buildService({ url }) {
    return new RemoteGraphQLDataSource({
      url,
      willSendRequest({ request, context }) {
        // Propagate auth token
        request.http.headers.set('authorization', context.token);
        // Propagate trace context
        request.http.headers.set('x-trace-id', context.traceId);
      }
    });
  }
});

// Client can query across services
const query = gql`
  query GetUserOrders($userId: ID!) {
    user(id: $userId) {
      name
      email
      orders {  # From order-service
        id
        totalAmount
        items {  # From product-service
          product {
            name
            imageUrl
          }
          quantity
        }
      }
    }
  }
`;
```

**Warstwy Bezpieczeństwa:**

```typescript
// API Key validation
@Injectable()
export class APIKeyGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];

    // Validate API key (check Redis cache first)
    const client = await this.apiKeyService.validateKey(apiKey);

    if (!client) {
      throw new UnauthorizedException('Invalid API key');
    }

    // Attach client info to request
    request.client = client;
    return true;
  }
}

// OAuth 2.0 + JWT validation
@Injectable()
export class JWTAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // Validate JWT
    const isValid = await super.canActivate(context);
    if (!isValid) return false;

    // Check permissions
    const requiredPermissions = this.reflector.get('permissions', context.getHandler());
    if (!requiredPermissions) return true;

    const user = request.user;
    return this.authService.hasPermissions(user, requiredPermissions);
  }
}
```

**Strategia Rate Limiting:**

```python
# Hierarchical rate limiting
from redis import Redis
import time

class RateLimiter:
    def __init__(self, redis: Redis):
        self.redis = redis

    async def check_rate_limit(self, client_id: str, endpoint: str) -> bool:
        now = time.time()

        # Tier-based limits
        tier = await self.get_client_tier(client_id)

        limits = {
            'free': {'requests_per_hour': 1000, 'requests_per_second': 10},
            'premium': {'requests_per_hour': 10000, 'requests_per_second': 100},
            'enterprise': {'requests_per_hour': 100000, 'requests_per_second': 1000}
        }

        limit = limits.get(tier, limits['free'])

        # Check per-second limit (sliding window)
        second_key = f"ratelimit:{client_id}:{endpoint}:second:{int(now)}"
        requests_this_second = self.redis.incr(second_key)
        self.redis.expire(second_key, 2)

        if requests_this_second > limit['requests_per_second']:
            return False

        # Check per-hour limit (sliding window)
        hour_key = f"ratelimit:{client_id}:{endpoint}:hour:{int(now/3600)}"
        requests_this_hour = self.redis.incr(hour_key)
        self.redis.expire(hour_key, 3700)

        if requests_this_hour > limit['requests_per_hour']:
            return False

        return True
```

---

## 4. Zaprojektuj Architekturę CQRS i Event Sourcing

**Pytanie**: Zaprojektuj architekturę CQRS i Event Sourcing dla systemu bankowego wymagającego pełnego audytu i złożonych zapytań.

**Odpowiedź**:

**Architektura:**

```
        [Commands]                    [Queries]
            │                              │
            ↓                              ↓
    ┌──────────────┐              ┌──────────────┐
    │ Command Side │              │  Query Side  │
    │              │              │              │
    │ Write Model  │              │  Read Model  │
    └──────────────┘              └──────────────┘
            │                              ↑
            ↓                              │
    ┌──────────────┐              ┌──────────────┐
    │ Event Store  │──────────────→│  Projections │
    │ (Source of   │   Events      │  (Denorm.    │
    │  Truth)      │               │   Views)     │
    └──────────────┘              └──────────────┘
```

**Implementacja Event Sourcing:**

```csharp
// Domain Events
public abstract class DomainEvent
{
    public Guid EventId { get; } = Guid.NewGuid();
    public DateTime OccurredOn { get; } = DateTime.UtcNow;
    public int Version { get; set; }
}

public class AccountOpenedEvent : DomainEvent
{
    public Guid AccountId { get; set; }
    public string CustomerId { get; set; }
    public decimal InitialBalance { get; set; }
    public string Currency { get; set; }
}

public class MoneyDepositedEvent : DomainEvent
{
    public Guid AccountId { get; set; }
    public decimal Amount { get; set; }
    public string TransactionId { get; set; }
}

public class MoneyWithdrawnEvent : DomainEvent
{
    public Guid AccountId { get; set; }
    public decimal Amount { get; set; }
    public string TransactionId { get; set; }
}

// Aggregate Root
public class BankAccount
{
    private Guid id;
    private decimal balance;
    private List<DomainEvent> uncommittedEvents = new();

    // Prevent direct instantiation
    private BankAccount() { }

    // Command: Open account
    public static BankAccount Open(Guid accountId, string customerId, decimal initialBalance)
    {
        var account = new BankAccount();
        account.Apply(new AccountOpenedEvent
        {
            AccountId = accountId,
            CustomerId = customerId,
            InitialBalance = initialBalance,
            Currency = "USD"
        });
        return account;
    }

    // Command: Deposit money
    public void Deposit(decimal amount, string transactionId)
    {
        if (amount <= 0)
            throw new InvalidOperationException("Amount must be positive");

        Apply(new MoneyDepositedEvent
        {
            AccountId = this.id,
            Amount = amount,
            TransactionId = transactionId
        });
    }

    // Command: Withdraw money
    public void Withdraw(decimal amount, string transactionId)
    {
        if (amount <= 0)
            throw new InvalidOperationException("Amount must be positive");

        if (this.balance < amount)
            throw new InsufficientFundsException();

        Apply(new MoneyWithdrawnEvent
        {
            AccountId = this.id,
            Amount = amount,
            TransactionId = transactionId
        });
    }

    // Apply event (updates state)
    private void Apply(DomainEvent @event)
    {
        // Update state based on event
        When(@event);

        // Track uncommitted event
        uncommittedEvents.Add(@event);
    }

    // State mutation based on event type
    private void When(DomainEvent @event)
    {
        switch (@event)
        {
            case AccountOpenedEvent e:
                this.id = e.AccountId;
                this.balance = e.InitialBalance;
                break;

            case MoneyDepositedEvent e:
                this.balance += e.Amount;
                break;

            case MoneyWithdrawnEvent e:
                this.balance -= e.Amount;
                break;
        }
    }

    // Load from events (event replay)
    public static BankAccount LoadFromHistory(IEnumerable<DomainEvent> history)
    {
        var account = new BankAccount();
        foreach (var @event in history)
        {
            account.When(@event);
        }
        return account;
    }

    public IEnumerable<DomainEvent> GetUncommittedEvents() => uncommittedEvents;

    public void MarkEventsAsCommitted() => uncommittedEvents.Clear();
}

// Event Store Repository
public class EventStoreRepository
{
    private readonly IEventStore eventStore;

    public async Task SaveAsync(BankAccount account)
    {
        var events = account.GetUncommittedEvents();

        foreach (var @event in events)
        {
            await eventStore.AppendEventAsync(
                streamId: account.Id.ToString(),
                @event: @event,
                expectedVersion: @event.Version
            );
        }

        account.MarkEventsAsCommitted();
    }

    public async Task<BankAccount> GetByIdAsync(Guid accountId)
    {
        var events = await eventStore.GetEventsAsync(accountId.ToString());
        return BankAccount.LoadFromHistory(events);
    }
}
```

**Projekcje Modeli Odczytu:**

```csharp
// Read Model
public class AccountBalanceReadModel
{
    public Guid AccountId { get; set; }
    public string CustomerId { get; set; }
    public decimal Balance { get; set; }
    public string Currency { get; set; }
    public DateTime LastUpdated { get; set; }
}

public class TransactionHistoryReadModel
{
    public string TransactionId { get; set; }
    public Guid AccountId { get; set; }
    public string Type { get; set; } // Deposit, Withdrawal
    public decimal Amount { get; set; }
    public DateTime Timestamp { get; set; }
}

// Projection Handler
public class AccountProjection
{
    private readonly IMongoDatabase database;

    public async Task Handle(AccountOpenedEvent @event)
    {
        var collection = database.GetCollection<AccountBalanceReadModel>("account_balances");

        await collection.InsertOneAsync(new AccountBalanceReadModel
        {
            AccountId = @event.AccountId,
            CustomerId = @event.CustomerId,
            Balance = @event.InitialBalance,
            Currency = @event.Currency,
            LastUpdated = @event.OccurredOn
        });
    }

    public async Task Handle(MoneyDepositedEvent @event)
    {
        // Update balance read model
        var balanceCollection = database.GetCollection<AccountBalanceReadModel>("account_balances");
        var update = Builders<AccountBalanceReadModel>.Update
            .Inc(x => x.Balance, @event.Amount)
            .Set(x => x.LastUpdated, @event.OccurredOn);

        await balanceCollection.UpdateOneAsync(
            x => x.AccountId == @event.AccountId,
            update
        );

        // Update transaction history
        var txCollection = database.GetCollection<TransactionHistoryReadModel>("transactions");
        await txCollection.InsertOneAsync(new TransactionHistoryReadModel
        {
            TransactionId = @event.TransactionId,
            AccountId = @event.AccountId,
            Type = "Deposit",
            Amount = @event.Amount,
            Timestamp = @event.OccurredOn
        });
    }

    public async Task Handle(MoneyWithdrawnEvent @event)
    {
        // Similar to deposit, but subtract
        var balanceCollection = database.GetCollection<AccountBalanceReadModel>("account_balances");
        var update = Builders<AccountBalanceReadModel>.Update
            .Inc(x => x.Balance, -@event.Amount)
            .Set(x => x.LastUpdated, @event.OccurredOn);

        await balanceCollection.UpdateOneAsync(
            x => x.AccountId == @event.AccountId,
            update
        );

        var txCollection = database.GetCollection<TransactionHistoryReadModel>("transactions");
        await txCollection.InsertOneAsync(new TransactionHistoryReadModel
        {
            TransactionId = @event.TransactionId,
            AccountId = @event.AccountId,
            Type = "Withdrawal",
            Amount = @event.Amount,
            Timestamp = @event.OccurredOn
        });
    }
}
```

**Schemat Event Store (PostgreSQL):**

```sql
CREATE TABLE event_store (
    stream_id VARCHAR(255) NOT NULL,
    version INT NOT NULL,
    event_type VARCHAR(255) NOT NULL,
    event_data JSONB NOT NULL,
    metadata JSONB,
    occurred_on TIMESTAMP NOT NULL,
    PRIMARY KEY (stream_id, version)
);

CREATE INDEX idx_event_store_stream ON event_store(stream_id);
CREATE INDEX idx_event_store_type ON event_store(event_type);

-- Snapshots for performance (avoid replaying thousands of events)
CREATE TABLE snapshots (
    stream_id VARCHAR(255) PRIMARY KEY,
    version INT NOT NULL,
    state JSONB NOT NULL,
    created_at TIMESTAMP NOT NULL
);
```

**Strategia Snapshotów:**

```csharp
public class SnapshotStrategy
{
    private const int SNAPSHOT_INTERVAL = 100;

    public async Task<BankAccount> GetAccountAsync(Guid accountId)
    {
        // Try to load from snapshot
        var snapshot = await snapshotStore.GetLatestSnapshotAsync(accountId);

        IEnumerable<DomainEvent> events;

        if (snapshot != null)
        {
            // Load only events after snapshot
            events = await eventStore.GetEventsAsync(
                accountId.ToString(),
                fromVersion: snapshot.Version + 1
            );

            var account = snapshot.State;
            // Apply events after snapshot
            foreach (var @event in events)
            {
                account.When(@event);
            }

            return account;
        }
        else
        {
            // No snapshot, load all events
            events = await eventStore.GetEventsAsync(accountId.ToString());
            return BankAccount.LoadFromHistory(events);
        }
    }

    public async Task SaveWithSnapshotAsync(BankAccount account)
    {
        await repository.SaveAsync(account);

        // Create snapshot every N events
        var eventCount = await eventStore.GetEventCountAsync(account.Id.ToString());

        if (eventCount % SNAPSHOT_INTERVAL == 0)
        {
            await snapshotStore.SaveSnapshotAsync(
                streamId: account.Id.ToString(),
                version: eventCount,
                state: account
            );
        }
    }
}
```

**Kluczowe Korzyści:**
- Pełny dziennik audytu (każda zmiana stanu jest zapisana)
- Podróże w czasie (odtworzenie stanu w dowolnym momencie)
- Odtwarzanie zdarzeń (przebudowa modeli odczytu od podstaw)
- Zapytania temporalne (np. "Jaki był stan konta 31 grudnia 2024?")
- Rozdzielenie optymalizacji odczytu i zapisu

---

## 5. Zaprojektuj Architekturę Service Mesh

**Pytanie**: Zaprojektuj architekturę service mesh dla 200+ microservices wymagających zaawansowanego zarządzania ruchem, bezpieczeństwa i obserwowalności.

**Odpowiedź**:

**Architektura Service Mesh (Istio):**

```
┌──────────────────────────────────────────────────────┐
│              Control Plane (Istiod)                   │
│  - Service Discovery                                  │
│  - Configuration Management                           │
│  - Certificate Authority                              │
└──────────────────────────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
        ↓               ↓               ↓
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│  Service A  │ │  Service B  │ │  Service C  │
│ ┌─────────┐ │ │ ┌─────────┐ │ │ ┌─────────┐ │
│ │  App    │ │ │ │  App    │ │ │ │  App    │ │
│ └─────────┘ │ │ └─────────┘ │ │ └─────────┘ │
│ ┌─────────┐ │ │ ┌─────────┐ │ │ ┌─────────┐ │
│ │ Envoy   │ │ │ │ Envoy   │ │ │ │ Envoy   │ │
│ │ Sidecar │ │ │ │ Sidecar │ │ │ │ Sidecar │ │
│ └─────────┘ │ │ └─────────┘ │ │ └─────────┘ │
└─────────────┘ └─────────────┘ └─────────────┘
      Data Plane (Envoy Proxies)
```

**Zarządzanie Ruchem:**

**1. Wdrożenie Canary:**
```yaml
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
        x-canary:
          exact: "true"
    route:
    - destination:
        host: user-service
        subset: v2
      weight: 100

  - route:
    - destination:
        host: user-service
        subset: v1
      weight: 90
    - destination:
        host: user-service
        subset: v2
      weight: 10

---
apiVersion: networking.istio.io/v1beta1
kind: DestinationRule
metadata:
  name: user-service
spec:
  host: user-service
  subsets:
  - name: v1
    labels:
      version: v1
  - name: v2
    labels:
      version: v2
```

**2. Circuit Breaking:**
```yaml
apiVersion: networking.istio.io/v1beta1
kind: DestinationRule
metadata:
  name: payment-service
spec:
  host: payment-service
  trafficPolicy:
    connectionPool:
      tcp:
        maxConnections: 100
      http:
        http1MaxPendingRequests: 50
        http2MaxRequests: 100
        maxRequestsPerConnection: 2
    outlierDetection:
      consecutiveErrors: 5
      interval: 30s
      baseEjectionTime: 30s
      maxEjectionPercent: 50
      minHealthPercent: 40
```

**3. Retry i Timeout:**
```yaml
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: order-service
spec:
  hosts:
  - order-service
  http:
  - route:
    - destination:
        host: order-service
    timeout: 10s
    retries:
      attempts: 3
      perTryTimeout: 3s
      retryOn: 5xx,reset,connect-failure,refused-stream
```

**Bezpieczeństwo:**

**1. Mutual TLS (mTLS):**
```yaml
apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata:
  name: default
  namespace: production
spec:
  mtls:
    mode: STRICT  # Enforce mTLS for all services

---
# Certificate rotation handled automatically by Istio CA
# No application code changes needed
```

**2. Polityki Autoryzacji:**
```yaml
# Only allow payment-service to call billing-service
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: billing-service-authz
  namespace: production
spec:
  selector:
    matchLabels:
      app: billing-service
  action: ALLOW
  rules:
  - from:
    - source:
        principals: ["cluster.local/ns/production/sa/payment-service"]
    to:
    - operation:
        methods: ["POST"]
        paths: ["/api/bill"]

---
# Rate limiting based on JWT claims
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: rate-limit-by-user
spec:
  selector:
    matchLabels:
      app: api-gateway
  action: CUSTOM
  provider:
    name: rate-limit-provider
  rules:
  - to:
    - operation:
        paths: ["/api/*"]
    when:
    - key: request.auth.claims[sub]
      values: ["*"]
```

**Obserwowalność:**

**1. Śledzenie Rozproszone:**
```yaml
# Automatic trace propagation between services
# Application only needs to forward headers

apiVersion: telemetry.istio.io/v1alpha1
kind: Telemetry
metadata:
  name: tracing
  namespace: istio-system
spec:
  tracing:
  - providers:
    - name: jaeger
    randomSamplingPercentage: 10.0
    customTags:
      environment:
        literal:
          value: "production"
      version:
        environment:
          name: APP_VERSION
```

**2. Zbieranie Metryk:**
```yaml
apiVersion: telemetry.istio.io/v1alpha1
kind: Telemetry
metadata:
  name: metrics
spec:
  metrics:
  - providers:
    - name: prometheus
    dimensions:
      request_protocol: request.protocol
      response_code: response.code
      connection_security_policy: connection.security_policy
```

**Wygenerowane Metryki Prometheus:**
```prometheus
# Request rate
istio_requests_total{
  source_app="frontend",
  destination_app="user-service",
  response_code="200"
}

# Request duration
istio_request_duration_milliseconds{
  source_app="frontend",
  destination_app="user-service"
}

# Request size
istio_request_bytes{...}
istio_response_bytes{...}
```

**3. Logowanie Dostępu:**
```yaml
apiVersion: telemetry.istio.io/v1alpha1
kind: Telemetry
metadata:
  name: access-logging
spec:
  accessLogging:
  - providers:
    - name: envoy
    filter:
      expression: response.code >= 400  # Log only errors
```

**Multi-Cluster Service Mesh:**

```yaml
# Primary cluster config
apiVersion: install.istio.io/v1alpha1
kind: IstioOperator
spec:
  values:
    global:
      meshID: mesh1
      multiCluster:
        clusterName: cluster-us-east
      network: network1

---
# Remote cluster config
apiVersion: install.istio.io/v1alpha1
kind: IstioOperator
spec:
  values:
    global:
      meshID: mesh1
      multiCluster:
        clusterName: cluster-eu-west
      network: network2

---
# Cross-cluster service routing
apiVersion: networking.istio.io/v1beta1
kind: ServiceEntry
metadata:
  name: user-service-remote
spec:
  hosts:
  - user-service.production.global
  location: MESH_INTERNAL
  ports:
  - number: 80
    name: http
    protocol: HTTP
  resolution: DNS
  endpoints:
  - address: user-service.production.svc.cluster-us-east.local
    locality: us-east/zone1/subzone1
  - address: user-service.production.svc.cluster-eu-west.local
    locality: eu-west/zone1/subzone1
```

**Kluczowe Korzyści:**
- Bezpieczeństwo zero-trust (mTLS domyślnie)
- Zaawansowane zarządzanie ruchem bez zmian w kodzie
- Kompleksowa obserwowalność
- Wsparcie dla wielu klastrów
- Uwierzytelnianie/autoryzacja między serwisami
