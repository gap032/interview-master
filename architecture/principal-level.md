# Software Architecture - Principal-Level Questions

## 1. Design Multi-Tenant SaaS Architecture

**Question**: Design a multi-tenant SaaS platform. Discuss isolation strategies and trade-offs.

**Answer**:

**Isolation Strategies:**

**1. Shared Database, Shared Schema:**
```sql
CREATE TABLE users (
    id BIGINT,
    tenant_id BIGINT,  -- Every table has tenant_id
    name VARCHAR(100)
);

-- All queries filtered by tenant_id
SELECT * FROM users WHERE tenant_id = ? AND id = ?;
```
- Pros: Lowest cost, easy to manage
- Cons: No data isolation, noisy neighbor

**2. Shared Database, Separate Schema:**
```sql
-- tenant_1 schema
CREATE SCHEMA tenant_1;
CREATE TABLE tenant_1.users (...);

-- tenant_2 schema
CREATE SCHEMA tenant_2;
CREATE TABLE tenant_2.users (...);
```
- Pros: Better isolation, moderate cost
- Cons: Schema changes complex

**3. Separate Database per Tenant:**
- Pros: Complete isolation, custom per tenant
- Cons: Expensive, harder to manage at scale

**Hybrid Approach:**
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

**Key Considerations:**
- Row-level security (RLS) for shared tables
- Connection pooling per tenant
- Rate limiting per tenant
- Backup/restore strategies
- Data residency requirements

---

## 2. Design Event-Driven Architecture at Scale

**Question**: Design an event-driven architecture for a large e-commerce platform processing millions of events per second.

**Answer**:

**Architecture:**

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

**Event Schema Evolution:**

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

**Schema Registry Integration:**

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

**Event Processing Patterns:**

**1. Choreography (Decentralized):**
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

**2. Orchestration (Centralized Saga):**
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

**Guaranteed Delivery:**

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

**Key Considerations:**
- Idempotency (handle duplicate events)
- Event ordering (use partition keys)
- Dead letter queues for failed events
- Event versioning and schema evolution
- Monitoring and tracing across events

---

## 3. Design API Gateway Strategy

**Question**: Design an API gateway strategy for a microservices architecture serving mobile, web, and third-party clients.

**Answer**:

**Multi-Layer Gateway Architecture:**

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

**Backend for Frontend (BFF) Pattern:**

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

**API Gateway Configuration (Kong Example):**

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

**GraphQL Gateway (Alternative Approach):**

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

**Security Layers:**

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

**Rate Limiting Strategy:**

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

## 4. Design CQRS and Event Sourcing Architecture

**Question**: Design a CQRS and Event Sourcing architecture for a banking system requiring full audit trail and complex queries.

**Answer**:

**Architecture:**

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

**Event Sourcing Implementation:**

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

**Read Model Projections:**

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

**Event Store Schema (PostgreSQL):**

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

**Snapshot Strategy:**

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

**Key Benefits:**
- Complete audit trail (every state change is recorded)
- Time travel (reconstruct state at any point in time)
- Event replay (rebuild read models from scratch)
- Temporal queries (e.g., "What was the balance on Dec 31, 2024?")
- Separation of read and write optimization

---

## 5. Design Service Mesh Architecture

**Question**: Design a service mesh architecture for 200+ microservices requiring advanced traffic management, security, and observability.

**Answer**:

**Service Mesh Architecture (Istio):**

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

**Traffic Management:**

**1. Canary Deployment:**
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

**3. Retry and Timeout:**
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

**Security:**

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

**2. Authorization Policies:**
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

**Observability:**

**1. Distributed Tracing:**
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

**2. Metrics Collection:**
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

**Generated Prometheus Metrics:**
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

**3. Access Logging:**
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

**Key Benefits:**
- Zero-trust security (mTLS by default)
- Advanced traffic management without code changes
- Comprehensive observability
- Multi-cluster support
- Service-to-service authentication/authorization
