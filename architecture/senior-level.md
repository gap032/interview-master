# Software Architecture - Senior-Level Questions

## 1. CQRS and Event Sourcing

**Question**: Explain CQRS and Event Sourcing. When to use them?

**Answer**:

**CQRS (Command Query Responsibility Segregation):**

Separate read and write models.

```python
# Write Model (Commands)
class CreateOrderCommand:
    def __init__(self, user_id, items):
        self.user_id = user_id
        self.items = items

class OrderCommandHandler:
    def handle_create_order(self, command):
        order = Order(command.user_id, command.items)
        self.order_repository.save(order)
        return order.id

# Read Model (Queries)
class OrderQueryService:
    def get_user_orders(self, user_id):
        # Optimized read-only view
        return self.read_db.query("""
            SELECT * FROM order_summary_view 
            WHERE user_id = ?
        """, user_id)
```

**Event Sourcing:**

Store all changes as sequence of events.

```python
# Events
class OrderCreated:
    def __init__(self, order_id, user_id, items):
        self.order_id = order_id
        self.user_id = user_id
        self.items = items

class OrderShipped:
    def __init__(self, order_id, tracking_number):
        self.order_id = order_id
        self.tracking_number = tracking_number

# Aggregate rebuilds state from events
class Order:
    def __init__(self, order_id):
        self.order_id = order_id
        self.status = None
        self.items = []
        
    def apply_event(self, event):
        if isinstance(event, OrderCreated):
            self.items = event.items
            self.status = 'CREATED'
        elif isinstance(event, OrderShipped):
            self.status = 'SHIPPED'
            self.tracking = event.tracking_number
    
    @classmethod
    def from_events(cls, events):
        order = cls(events[0].order_id)
        for event in events:
            order.apply_event(event)
        return order

# Rebuild current state
events = event_store.get_events(order_id)
order = Order.from_events(events)
```

**Benefits:**
- Complete audit trail
- Time travel debugging
- Multiple read models from same events
- Better scalability

**When NOT to use:**
- Simple CRUD apps
- Learning curve too high
- Team not experienced
- No need for audit trail

---

## 2. Microservices Architecture

**Question**: Design a microservices architecture. What are the trade-offs vs monolith?

**Answer**:

**Microservices Architecture:**

```
                    [API Gateway]
                          │
         ┌────────────────┼────────────────┐
         │                │                │
    [User Service]   [Order Service]  [Product Service]
         │                │                │
    [UserDB]         [OrderDB]        [ProductDB]
         │                │                │
         └────────────────┴────────────────┘
                          │
                   [Message Queue]
                          │
              [Notification Service]
```

**Example: E-commerce Platform**

**Services:**
1. **User Service** - Authentication, profiles
2. **Product Service** - Catalog, inventory
3. **Order Service** - Cart, checkout, orders
4. **Payment Service** - Payment processing
5. **Notification Service** - Emails, SMS

**Communication Patterns:**

**1. Synchronous (REST/gRPC):**
```python
# Order Service calls Product Service
import requests

class OrderService:
    def create_order(self, items):
        # Validate product availability
        for item in items:
            response = requests.get(
                f'http://product-service/api/products/{item.product_id}'
            )
            if response.status_code != 200:
                raise Exception(f'Product {item.product_id} not found')

            product = response.json()
            if product['stock'] < item.quantity:
                raise Exception('Insufficient stock')

        # Create order
        order = self.db.create_order(items)
        return order
```

**2. Asynchronous (Message Queue):**
```python
# Order Service publishes event
import pika

class OrderService:
    def create_order(self, items):
        # Create order
        order = self.db.create_order(items)

        # Publish event
        connection = pika.BlockingConnection(
            pika.ConnectionParameters('rabbitmq')
        )
        channel = connection.channel()

        message = {
            'event_type': 'ORDER_CREATED',
            'order_id': order.id,
            'user_id': order.user_id,
            'total': order.total
        }

        channel.basic_publish(
            exchange='orders',
            routing_key='order.created',
            body=json.dumps(message)
        )

        return order

# Notification Service subscribes
class NotificationService:
    def start(self):
        connection = pika.BlockingConnection(
            pika.ConnectionParameters('rabbitmq')
        )
        channel = connection.channel()
        channel.queue_declare(queue='notifications')
        channel.queue_bind(
            exchange='orders',
            queue='notifications',
            routing_key='order.created'
        )

        channel.basic_consume(
            queue='notifications',
            on_message_callback=self.handle_order_created,
            auto_ack=True
        )

        channel.start_consuming()

    def handle_order_created(self, ch, method, properties, body):
        message = json.loads(body)
        self.send_email(message['user_id'], 'Order Confirmed', message)
```

**Service Discovery (Consul):**
```python
import consul

class ServiceRegistry:
    def __init__(self):
        self.consul = consul.Consul(host='consul', port=8500)

    def register_service(self, name, host, port):
        self.consul.agent.service.register(
            name=name,
            service_id=f'{name}-{host}-{port}',
            address=host,
            port=port,
            check=consul.Check.http(
                f'http://{host}:{port}/health',
                interval='10s'
            )
        )

    def discover_service(self, name):
        _, services = self.consul.health.service(name, passing=True)
        if not services:
            raise Exception(f'No healthy instances of {name}')

        service = random.choice(services)
        return service['Service']['Address'], service['Service']['Port']
```

**Monolith vs Microservices:**

| Aspect | Monolith | Microservices |
|--------|----------|---------------|
| **Complexity** | Lower | Higher (distributed) |
| **Deployment** | Single unit | Independent services |
| **Scaling** | Scale entire app | Scale individual services |
| **Technology** | Single stack | Polyglot |
| **Team Structure** | Shared codebase | Independent teams |
| **Testing** | Easier integration | Complex E2E testing |
| **Performance** | Low latency | Network overhead |
| **Data** | Shared database | Database per service |

**When to use Microservices:**
- Large, complex applications
- Multiple independent teams
- Different scaling requirements
- Technology diversity needed
- Frequent deployments

**When to use Monolith:**
- Small to medium applications
- Small team
- Rapid prototyping
- Simple deployment requirements
- Low operational complexity

**Best Practices:**
- Start with monolith, extract services when needed
- Design services around business capabilities
- Implement circuit breakers (Hystrix, Resilience4j)
- Use API Gateway for routing
- Distributed tracing for debugging

---

## 3. API Design Best Practices

**Question**: How do you design a RESTful API? What about GraphQL vs REST?

**Answer**:

**REST API Design Principles:**

**1. Resource-Based URLs:**
```
Good:
GET    /api/v1/users           # Get all users
GET    /api/v1/users/123       # Get specific user
POST   /api/v1/users           # Create user
PUT    /api/v1/users/123       # Update user (full)
PATCH  /api/v1/users/123       # Update user (partial)
DELETE /api/v1/users/123       # Delete user

Bad:
GET  /api/getUsers
POST /api/createUser
POST /api/updateUser
POST /api/deleteUser
```

**2. Use HTTP Status Codes Correctly:**
```
200 OK              - Successful GET, PUT, PATCH
201 Created         - Successful POST
204 No Content      - Successful DELETE
400 Bad Request     - Invalid input
401 Unauthorized    - Missing/invalid auth
403 Forbidden       - Auth'd but not allowed
404 Not Found       - Resource doesn't exist
409 Conflict        - Duplicate resource
422 Unprocessable   - Validation error
500 Internal Error  - Server error
503 Service Unavailable - Maintenance/overload
```

**3. Versioning:**
```python
# URL versioning (most common)
@app.route('/api/v1/users', methods=['GET'])
def get_users_v1():
    return {'users': [...]}

@app.route('/api/v2/users', methods=['GET'])
def get_users_v2():
    # New format with additional fields
    return {'data': {'users': [...]}, 'meta': {...}}

# Header versioning
@app.route('/api/users', methods=['GET'])
def get_users():
    version = request.headers.get('API-Version', '1')
    if version == '2':
        return get_users_v2_response()
    return get_users_v1_response()
```

**4. Pagination:**
```python
@app.route('/api/v1/products', methods=['GET'])
def get_products():
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 20))

    # Limit max per_page
    per_page = min(per_page, 100)

    offset = (page - 1) * per_page
    products = db.query('SELECT * FROM products LIMIT ? OFFSET ?',
                        per_page, offset)
    total = db.query('SELECT COUNT(*) FROM products')[0]['count']

    return {
        'data': products,
        'meta': {
            'page': page,
            'per_page': per_page,
            'total': total,
            'total_pages': (total + per_page - 1) // per_page
        },
        'links': {
            'self': f'/api/v1/products?page={page}&per_page={per_page}',
            'next': f'/api/v1/products?page={page+1}&per_page={per_page}' if page < total_pages else None,
            'prev': f'/api/v1/products?page={page-1}&per_page={per_page}' if page > 1 else None
        }
    }
```

**5. Filtering, Sorting, Searching:**
```python
@app.route('/api/v1/products', methods=['GET'])
def get_products():
    # Filtering: /api/v1/products?category=electronics&price_max=1000
    category = request.args.get('category')
    price_max = request.args.get('price_max')

    # Sorting: /api/v1/products?sort=-price (descending)
    sort_field = request.args.get('sort', 'id')
    direction = 'DESC' if sort_field.startswith('-') else 'ASC'
    sort_field = sort_field.lstrip('-')

    # Searching: /api/v1/products?q=laptop
    search_query = request.args.get('q')

    query = 'SELECT * FROM products WHERE 1=1'
    params = []

    if category:
        query += ' AND category = ?'
        params.append(category)

    if price_max:
        query += ' AND price <= ?'
        params.append(float(price_max))

    if search_query:
        query += ' AND name LIKE ?'
        params.append(f'%{search_query}%')

    query += f' ORDER BY {sort_field} {direction}'

    products = db.query(query, *params)
    return {'data': products}
```

**REST vs GraphQL:**

**REST Example:**
```javascript
// Client needs user + their posts + post comments
// Requires 3 requests (N+1 problem)

// 1. Get user
GET /api/users/123
// Response: { id: 123, name: "John", ... }

// 2. Get user's posts
GET /api/users/123/posts
// Response: [{ id: 1, title: "..." }, { id: 2, title: "..." }]

// 3. Get comments for each post
GET /api/posts/1/comments
GET /api/posts/2/comments
```

**GraphQL Example:**
```graphql
# Single request gets exactly what you need
query {
  user(id: "123") {
    id
    name
    email
    posts {
      id
      title
      comments {
        id
        text
        author {
          name
        }
      }
    }
  }
}
```

**GraphQL Schema:**
```graphql
type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String!
  content: String!
  author: User!
  comments: [Comment!]!
}

type Comment {
  id: ID!
  text: String!
  author: User!
  post: Post!
}

type Query {
  user(id: ID!): User
  post(id: ID!): Post
  posts(limit: Int, offset: Int): [Post!]!
}

type Mutation {
  createPost(title: String!, content: String!): Post!
  deletePost(id: ID!): Boolean!
}
```

**GraphQL Server (Python):**
```python
import graphene
from graphene import ObjectType, String, Int, List, Field

class User(ObjectType):
    id = Int()
    name = String()
    email = String()
    posts = List(lambda: Post)

    def resolve_posts(self, info):
        return db.query('SELECT * FROM posts WHERE user_id = ?', self.id)

class Post(ObjectType):
    id = Int()
    title = String()
    content = String()
    author = Field(User)
    comments = List(lambda: Comment)

    def resolve_author(self, info):
        return db.query('SELECT * FROM users WHERE id = ?', self.user_id)[0]

    def resolve_comments(self, info):
        return db.query('SELECT * FROM comments WHERE post_id = ?', self.id)

class Query(ObjectType):
    user = Field(User, id=Int(required=True))
    posts = List(Post, limit=Int(), offset=Int())

    def resolve_user(self, info, id):
        return db.query('SELECT * FROM users WHERE id = ?', id)[0]

    def resolve_posts(self, info, limit=10, offset=0):
        return db.query('SELECT * FROM posts LIMIT ? OFFSET ?', limit, offset)

schema = graphene.Schema(query=Query)
```

**REST vs GraphQL Trade-offs:**

| Aspect | REST | GraphQL |
|--------|------|---------|
| **Over-fetching** | Often returns more data than needed | Client requests exact fields |
| **Under-fetching** | Multiple requests (N+1) | Single request |
| **Caching** | HTTP caching (easy) | Complex (needs libraries) |
| **Learning Curve** | Low | Higher |
| **Tooling** | Mature | Growing |
| **Type Safety** | OpenAPI/Swagger | Built-in schema |
| **File Uploads** | Easy | Requires special handling |

**When to use GraphQL:**
- Mobile apps (reduce bandwidth)
- Complex, nested data requirements
- Rapidly changing frontend needs
- Multiple client types

**When to use REST:**
- Simple CRUD operations
- Heavy caching requirements
- File uploads/downloads
- Team unfamiliar with GraphQL

---

## 4. Database Scaling Strategies

**Question**: How do you scale a database to handle millions of users?

**Answer**:

**Vertical vs Horizontal Scaling:**

```
Vertical (Scale Up):
Small Server → Bigger Server
↓              ↓
4 CPU          16 CPU
8 GB RAM       64 GB RAM
100 GB SSD     1 TB SSD

Limits: Hardware ceiling, single point of failure

Horizontal (Scale Out):
1 Server → Multiple Servers
↓          ↓
Master + Replicas
Sharding
```

**1. Read Replicas:**

```
         [Master DB]  ← Writes only
              │
      ┌───────┼───────┐
      ↓       ↓       ↓
  [Replica] [Replica] [Replica]  ← Reads
```

**Implementation (PostgreSQL):**
```python
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import random

# Connection pool
master_engine = create_engine('postgresql://master-db:5432/mydb')
replica_engines = [
    create_engine('postgresql://replica1-db:5432/mydb'),
    create_engine('postgresql://replica2-db:5432/mydb'),
    create_engine('postgresql://replica3-db:5432/mydb'),
]

class DatabaseRouter:
    def get_engine(self, write=False):
        if write:
            return master_engine
        # Load balance reads across replicas
        return random.choice(replica_engines)

router = DatabaseRouter()

# Usage
def create_user(name, email):
    # Write to master
    engine = router.get_engine(write=True)
    Session = sessionmaker(bind=engine)
    session = Session()
    user = User(name=name, email=email)
    session.add(user)
    session.commit()
    return user

def get_users():
    # Read from replica
    engine = router.get_engine(write=False)
    Session = sessionmaker(bind=engine)
    session = Session()
    return session.query(User).all()
```

**2. Sharding (Horizontal Partitioning):**

```
User IDs 0-999       → Shard 1
User IDs 1000-1999   → Shard 2
User IDs 2000-2999   → Shard 3
...
```

**Sharding Strategies:**

**a) Range-Based:**
```python
class RangeShardRouter:
    SHARDS = {
        'shard1': (0, 999),
        'shard2': (1000, 1999),
        'shard3': (2000, 2999),
    }

    def get_shard(self, user_id):
        for shard_name, (min_id, max_id) in self.SHARDS.items():
            if min_id <= user_id <= max_id:
                return shard_name
        raise Exception('No shard found')

# Problem: Uneven distribution if IDs not uniform
```

**b) Hash-Based:**
```python
class HashShardRouter:
    NUM_SHARDS = 4

    def get_shard(self, user_id):
        shard_num = hash(user_id) % self.NUM_SHARDS
        return f'shard{shard_num}'

# Problem: Rebalancing on shard addition is costly
```

**c) Consistent Hashing:**
```python
import hashlib

class ConsistentHashRouter:
    def __init__(self, nodes, virtual_nodes=150):
        self.nodes = nodes
        self.virtual_nodes = virtual_nodes
        self.ring = {}

        for node in nodes:
            for i in range(virtual_nodes):
                virtual_key = f'{node}:{i}'
                hash_val = int(hashlib.md5(virtual_key.encode()).hexdigest(), 16)
                self.ring[hash_val] = node

        self.sorted_keys = sorted(self.ring.keys())

    def get_shard(self, key):
        hash_val = int(hashlib.md5(str(key).encode()).hexdigest(), 16)

        # Find first node >= hash_val
        for ring_key in self.sorted_keys:
            if ring_key >= hash_val:
                return self.ring[ring_key]

        # Wrap around
        return self.ring[self.sorted_keys[0]]

router = ConsistentHashRouter(['shard1', 'shard2', 'shard3', 'shard4'])
shard = router.get_shard(user_id=12345)  # Returns 'shard2'
```

**3. Database Partitioning:**

**Vertical Partitioning:**
```sql
-- Split tables by column groups
CREATE TABLE users_core (
    id BIGINT PRIMARY KEY,
    email VARCHAR(255),
    password_hash VARCHAR(255)
);

CREATE TABLE users_profile (
    user_id BIGINT PRIMARY KEY,
    name VARCHAR(255),
    bio TEXT,
    avatar_url VARCHAR(500),
    FOREIGN KEY (user_id) REFERENCES users_core(id)
);

CREATE TABLE users_stats (
    user_id BIGINT PRIMARY KEY,
    login_count INT,
    last_login_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users_core(id)
);
```

**Horizontal Partitioning (PostgreSQL):**
```sql
-- Partition by range (time-based)
CREATE TABLE orders (
    id BIGINT,
    user_id BIGINT,
    created_at TIMESTAMP,
    total DECIMAL(10,2)
) PARTITION BY RANGE (created_at);

CREATE TABLE orders_2024_q1 PARTITION OF orders
    FOR VALUES FROM ('2024-01-01') TO ('2024-04-01');

CREATE TABLE orders_2024_q2 PARTITION OF orders
    FOR VALUES FROM ('2024-04-01') TO ('2024-07-01');

-- Queries automatically route to correct partition
SELECT * FROM orders WHERE created_at BETWEEN '2024-01-15' AND '2024-02-15';
```

**4. Denormalization for Read Performance:**

```sql
-- Normalized (requires JOIN)
CREATE TABLE users (id BIGINT, name VARCHAR(255));
CREATE TABLE orders (id BIGINT, user_id BIGINT, total DECIMAL);

SELECT users.name, orders.total
FROM orders
JOIN users ON orders.user_id = users.id;

-- Denormalized (no JOIN needed)
CREATE TABLE orders (
    id BIGINT,
    user_id BIGINT,
    user_name VARCHAR(255),  -- Denormalized
    total DECIMAL
);

SELECT user_name, total FROM orders;  -- Faster!

-- Trade-off: Update complexity
-- When user changes name, must update all their orders
```

**5. Connection Pooling:**

```python
from sqlalchemy import create_engine
from sqlalchemy.pool import QueuePool

engine = create_engine(
    'postgresql://db:5432/mydb',
    poolclass=QueuePool,
    pool_size=20,          # Normal connections
    max_overflow=10,       # Extra connections under load
    pool_timeout=30,       # Wait time for connection
    pool_recycle=3600,     # Recycle connections after 1 hour
    pool_pre_ping=True     # Check connection before use
)
```

**Scaling Strategy Checklist:**
1. Start with vertical scaling (easiest)
2. Add read replicas (reads >> writes usually)
3. Implement caching (Redis, Memcached)
4. Use connection pooling
5. Optimize queries (indexes, EXPLAIN)
6. Consider sharding (last resort, most complex)
7. Monitor query performance (slow query log)

---

## 5. Caching Strategies

**Question**: How do you implement caching to improve application performance?

**Answer**:

**Caching Layers:**

```
[Client]
   ↓
[CDN Cache] (static assets)
   ↓
[Application Server]
   ↓
[Application Cache] (Redis/Memcached)
   ↓
[Database Cache] (Query cache)
   ↓
[Database]
```

**1. Cache-Aside (Lazy Loading):**

```python
import redis
import json

redis_client = redis.Redis(host='localhost', port=6379, db=0)

def get_user(user_id):
    cache_key = f'user:{user_id}'

    # 1. Try cache first
    cached = redis_client.get(cache_key)
    if cached:
        return json.loads(cached)

    # 2. Cache miss - query database
    user = db.query('SELECT * FROM users WHERE id = ?', user_id)

    # 3. Store in cache
    redis_client.setex(
        cache_key,
        3600,  # TTL: 1 hour
        json.dumps(user)
    )

    return user

def update_user(user_id, data):
    # Update database
    db.execute('UPDATE users SET ... WHERE id = ?', user_id)

    # Invalidate cache
    cache_key = f'user:{user_id}'
    redis_client.delete(cache_key)
```

**2. Write-Through Cache:**

```python
def update_user(user_id, data):
    cache_key = f'user:{user_id}'

    # 1. Update database
    db.execute('UPDATE users SET name = ? WHERE id = ?', data['name'], user_id)

    # 2. Update cache immediately
    user = db.query('SELECT * FROM users WHERE id = ?', user_id)
    redis_client.setex(cache_key, 3600, json.dumps(user))

    return user
```

**3. Write-Behind (Write-Back) Cache:**

```python
from queue import Queue
import threading

write_queue = Queue()

def update_user(user_id, data):
    cache_key = f'user:{user_id}'

    # 1. Update cache immediately
    redis_client.setex(cache_key, 3600, json.dumps(data))

    # 2. Queue database write
    write_queue.put(('users', user_id, data))

    return data

# Background worker flushes to database
def database_writer():
    while True:
        table, id, data = write_queue.get()
        try:
            db.execute(f'UPDATE {table} SET ... WHERE id = ?', id)
        except Exception as e:
            # Handle error, retry, etc.
            logging.error(f'Failed to write {table}:{id} - {e}')
        write_queue.task_done()

threading.Thread(target=database_writer, daemon=True).start()
```

**4. Cache Invalidation Strategies:**

**a) TTL (Time-To-Live):**
```python
# Set expiration time
redis_client.setex('key', 300, 'value')  # Expires in 5 minutes

# For frequently updated data: short TTL
redis_client.setex('trending_posts', 60, json.dumps(posts))  # 1 minute

# For rarely updated data: long TTL
redis_client.setex('country_list', 86400, json.dumps(countries))  # 24 hours
```

**b) Event-Based Invalidation:**
```python
# Publish event when data changes
def create_order(user_id, items):
    order = db.create_order(user_id, items)

    # Invalidate related caches
    redis_client.delete(f'user:{user_id}:orders')
    redis_client.delete(f'user:{user_id}:cart')

    # Publish event for other services
    redis_client.publish('orders', json.dumps({
        'event': 'ORDER_CREATED',
        'order_id': order.id,
        'user_id': user_id
    }))

    return order
```

**c) Cache Tagging:**
```python
# Tag cache entries by related entities
def cache_post(post):
    cache_key = f'post:{post.id}'
    tags = [f'user:{post.author_id}', f'category:{post.category_id}']

    redis_client.setex(cache_key, 3600, json.dumps(post))

    # Store tags
    for tag in tags:
        redis_client.sadd(tag, cache_key)

def invalidate_by_tag(tag):
    # Get all cache keys with this tag
    cache_keys = redis_client.smembers(tag)

    # Delete all
    if cache_keys:
        redis_client.delete(*cache_keys)

    # Remove tag set
    redis_client.delete(tag)

# Usage: When user is deleted, invalidate all their content
invalidate_by_tag(f'user:{user_id}')
```

**5. Distributed Cache Patterns:**

**a) Cache Stampede Prevention:**
```python
import threading
import time

locks = {}

def get_expensive_data(key):
    cached = redis_client.get(key)
    if cached:
        return json.loads(cached)

    # Acquire lock to prevent thundering herd
    lock_key = f'lock:{key}'
    if not locks.get(lock_key):
        locks[lock_key] = threading.Lock()

    with locks[lock_key]:
        # Double-check cache (another thread may have filled it)
        cached = redis_client.get(key)
        if cached:
            return json.loads(cached)

        # Compute expensive result
        result = expensive_computation()

        # Cache it
        redis_client.setex(key, 300, json.dumps(result))

        return result
```

**b) Probabilistic Early Expiration:**
```python
import random
import time

def get_with_early_expiration(key, compute_fn, ttl=300):
    cached = redis_client.get(key)
    if cached:
        data = json.loads(cached)

        # Calculate how long until expiration
        ttl_remaining = redis_client.ttl(key)

        # Probabilistic early refresh
        # Probability increases as expiration approaches
        if ttl_remaining > 0:
            delta = ttl - ttl_remaining
            probability = delta / ttl

            if random.random() < probability:
                # Refresh in background
                threading.Thread(target=lambda: refresh_cache(key, compute_fn, ttl)).start()

        return data

    # Cache miss
    result = compute_fn()
    redis_client.setex(key, ttl, json.dumps(result))
    return result

def refresh_cache(key, compute_fn, ttl):
    result = compute_fn()
    redis_client.setex(key, ttl, json.dumps(result))
```

**6. Multi-Level Caching:**

```python
from functools import lru_cache

# L1: In-memory cache (application)
@lru_cache(maxsize=1000)
def get_config(key):
    # L2: Redis cache
    cached = redis_client.get(f'config:{key}')
    if cached:
        return json.loads(cached)

    # L3: Database
    value = db.query('SELECT value FROM config WHERE key = ?', key)

    # Populate caches
    redis_client.setex(f'config:{key}', 3600, json.dumps(value))

    return value
```

**Caching Best Practices:**
- Cache hot data, not everything
- Use appropriate TTLs
- Monitor cache hit/miss ratios
- Handle cache failures gracefully
- Consider data consistency requirements
- Use compression for large values
- Monitor memory usage
