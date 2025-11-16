# Architektura Oprogramowania - Pytania Senior-Level

## 1. CQRS i Event Sourcing

**Pytanie**: Wyjaśnij CQRS i Event Sourcing. Kiedy ich używać?

**Odpowiedź**:

**CQRS (Command Query Responsibility Segregation):**

Oddzielenie modeli zapisu i odczytu.

```python
# Model zapisu (Commands)
class CreateOrderCommand:
    def __init__(self, user_id, items):
        self.user_id = user_id
        self.items = items

class OrderCommandHandler:
    def handle_create_order(self, command):
        order = Order(command.user_id, command.items)
        self.order_repository.save(order)
        return order.id

# Model odczytu (Queries)
class OrderQueryService:
    def get_user_orders(self, user_id):
        # Zoptymalizowany widok tylko do odczytu
        return self.read_db.query("""
            SELECT * FROM order_summary_view
            WHERE user_id = ?
        """, user_id)
```

**Event Sourcing:**

Przechowywanie wszystkich zmian jako sekwencji zdarzeń.

```python
# Zdarzenia
class OrderCreated:
    def __init__(self, order_id, user_id, items):
        self.order_id = order_id
        self.user_id = user_id
        self.items = items

class OrderShipped:
    def __init__(self, order_id, tracking_number):
        self.order_id = order_id
        self.tracking_number = tracking_number

# Agregat odbudowuje stan ze zdarzeń
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

# Odbudowa aktualnego stanu
events = event_store.get_events(order_id)
order = Order.from_events(events)
```

**Korzyści:**
- Pełna historia audytu
- Debugowanie z możliwością cofania w czasie
- Wiele modeli odczytu z tych samych zdarzeń
- Lepsza skalowalność

**Kiedy NIE używać:**
- Proste aplikacje CRUD
- Zbyt wysoka krzywa uczenia się
- Zespół bez doświadczenia
- Brak potrzeby historii audytu

---

## 2. Architektura Microservices

**Pytanie**: Zaprojektuj architekturę microservices. Jakie są kompromisy w porównaniu z monolitem?

**Odpowiedź**:

**Architektura Microservices:**

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

**Przykład: Platforma E-commerce**

**Serwisy:**
1. **User Service** - Autentykacja, profile
2. **Product Service** - Katalog, zapasy
3. **Order Service** - Koszyk, checkout, zamówienia
4. **Payment Service** - Przetwarzanie płatności
5. **Notification Service** - E-maile, SMS

**Wzorce Komunikacji:**

**1. Synchroniczna (REST/gRPC):**
```python
# Order Service wywołuje Product Service
import requests

class OrderService:
    def create_order(self, items):
        # Walidacja dostępności produktu
        for item in items:
            response = requests.get(
                f'http://product-service/api/products/{item.product_id}'
            )
            if response.status_code != 200:
                raise Exception(f'Produkt {item.product_id} nie znaleziony')

            product = response.json()
            if product['stock'] < item.quantity:
                raise Exception('Niewystarczający zapas')

        # Tworzenie zamówienia
        order = self.db.create_order(items)
        return order
```

**2. Asynchroniczna (Message Queue):**
```python
# Order Service publikuje zdarzenie
import pika

class OrderService:
    def create_order(self, items):
        # Tworzenie zamówienia
        order = self.db.create_order(items)

        # Publikacja zdarzenia
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

# Notification Service subskrybuje
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
        self.send_email(message['user_id'], 'Zamówienie potwierdzone', message)
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
            raise Exception(f'Brak zdrowych instancji {name}')

        service = random.choice(services)
        return service['Service']['Address'], service['Service']['Port']
```

**Monolit vs Microservices:**

| Aspekt | Monolit | Microservices |
|--------|---------|---------------|
| **Złożoność** | Niższa | Wyższa (rozproszona) |
| **Wdrażanie** | Pojedyncza jednostka | Niezależne serwisy |
| **Skalowanie** | Skalowanie całej aplikacji | Skalowanie poszczególnych serwisów |
| **Technologia** | Pojedynczy stos | Polyglot |
| **Struktura zespołu** | Wspólna baza kodu | Niezależne zespoły |
| **Testowanie** | Łatwiejsze testy integracyjne | Złożone testy E2E |
| **Wydajność** | Niska latencja | Narzut sieciowy |
| **Dane** | Wspólna baza danych | Baza danych na serwis |

**Kiedy używać Microservices:**
- Duże, złożone aplikacje
- Wiele niezależnych zespołów
- Różne wymagania skalowania
- Potrzebna różnorodność technologiczna
- Częste wdrożenia

**Kiedy używać Monolitu:**
- Małe i średnie aplikacje
- Mały zespół
- Szybkie prototypowanie
- Proste wymagania wdrożeniowe
- Niska złożoność operacyjna

**Najlepsze praktyki:**
- Zacząć od monolitu, wyodrębnić serwisy gdy potrzeba
- Projektować serwisy wokół możliwości biznesowych
- Implementować circuit breakers (Hystrix, Resilience4j)
- Używać API Gateway do routingu
- Distributed tracing do debugowania

---

## 3. Najlepsze praktyki projektowania API

**Pytanie**: Jak zaprojektować RESTful API? Co z GraphQL vs REST?

**Odpowiedź**:

**Zasady projektowania REST API:**

**1. URL-e oparte na zasobach:**
```
Dobre:
GET    /api/v1/users           # Pobranie wszystkich użytkowników
GET    /api/v1/users/123       # Pobranie konkretnego użytkownika
POST   /api/v1/users           # Utworzenie użytkownika
PUT    /api/v1/users/123       # Aktualizacja użytkownika (pełna)
PATCH  /api/v1/users/123       # Aktualizacja użytkownika (częściowa)
DELETE /api/v1/users/123       # Usunięcie użytkownika

Złe:
GET  /api/getUsers
POST /api/createUser
POST /api/updateUser
POST /api/deleteUser
```

**2. Poprawne używanie kodów statusu HTTP:**
```
200 OK              - Udany GET, PUT, PATCH
201 Created         - Udany POST
204 No Content      - Udany DELETE
400 Bad Request     - Nieprawidłowe dane wejściowe
401 Unauthorized    - Brak/nieprawidłowa autoryzacja
403 Forbidden       - Autoryzowany ale niedozwolone
404 Not Found       - Zasób nie istnieje
409 Conflict        - Duplikat zasobu
422 Unprocessable   - Błąd walidacji
500 Internal Error  - Błąd serwera
503 Service Unavailable - Konserwacja/przeciążenie
```

**3. Wersjonowanie:**
```python
# Wersjonowanie URL (najczęstsze)
@app.route('/api/v1/users', methods=['GET'])
def get_users_v1():
    return {'users': [...]}

@app.route('/api/v2/users', methods=['GET'])
def get_users_v2():
    # Nowy format z dodatkowymi polami
    return {'data': {'users': [...]}, 'meta': {...}}

# Wersjonowanie nagłówkami
@app.route('/api/users', methods=['GET'])
def get_users():
    version = request.headers.get('API-Version', '1')
    if version == '2':
        return get_users_v2_response()
    return get_users_v1_response()
```

**4. Paginacja:**
```python
@app.route('/api/v1/products', methods=['GET'])
def get_products():
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 20))

    # Ograniczenie maksymalnego per_page
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

**5. Filtrowanie, sortowanie, wyszukiwanie:**
```python
@app.route('/api/v1/products', methods=['GET'])
def get_products():
    # Filtrowanie: /api/v1/products?category=electronics&price_max=1000
    category = request.args.get('category')
    price_max = request.args.get('price_max')

    # Sortowanie: /api/v1/products?sort=-price (malejąco)
    sort_field = request.args.get('sort', 'id')
    direction = 'DESC' if sort_field.startswith('-') else 'ASC'
    sort_field = sort_field.lstrip('-')

    # Wyszukiwanie: /api/v1/products?q=laptop
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

**Przykład REST:**
```javascript
// Klient potrzebuje użytkownika + jego posty + komentarze do postów
// Wymaga 3 żądań (problem N+1)

// 1. Pobranie użytkownika
GET /api/users/123
// Odpowiedź: { id: 123, name: "Jan", ... }

// 2. Pobranie postów użytkownika
GET /api/users/123/posts
// Odpowiedź: [{ id: 1, title: "..." }, { id: 2, title: "..." }]

// 3. Pobranie komentarzy dla każdego postu
GET /api/posts/1/comments
GET /api/posts/2/comments
```

**Przykład GraphQL:**
```graphql
# Jedno żądanie pobiera dokładnie to, czego potrzebujesz
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

**Schema GraphQL:**
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

**Serwer GraphQL (Python):**
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

**Kompromisy REST vs GraphQL:**

| Aspekt | REST | GraphQL |
|--------|------|---------|
| **Over-fetching** | Często zwraca więcej danych niż potrzeba | Klient żąda dokładnych pól |
| **Under-fetching** | Wiele żądań (N+1) | Jedno żądanie |
| **Caching** | Cache HTTP (łatwy) | Złożony (wymaga bibliotek) |
| **Krzywa uczenia** | Niska | Wyższa |
| **Narzędzia** | Dojrzałe | Rozwijające się |
| **Bezpieczeństwo typów** | OpenAPI/Swagger | Wbudowana schema |
| **Przesyłanie plików** | Łatwe | Wymaga specjalnej obsługi |

**Kiedy używać GraphQL:**
- Aplikacje mobilne (redukcja przepustowości)
- Złożone, zagnieżdżone wymagania danych
- Szybko zmieniające się potrzeby frontend
- Wiele typów klientów

**Kiedy używać REST:**
- Proste operacje CRUD
- Wysokie wymagania cache'owania
- Przesyłanie/pobieranie plików
- Zespół nieznający GraphQL

---

## 4. Strategie skalowania baz danych

**Pytanie**: Jak skalować bazę danych do obsługi milionów użytkowników?

**Odpowiedź**:

**Skalowanie wertykalne vs horyzontalne:**

```
Wertykalne (Scale Up):
Mały Serwer → Większy Serwer
↓              ↓
4 CPU          16 CPU
8 GB RAM       64 GB RAM
100 GB SSD     1 TB SSD

Limity: Pułap sprzętowy, pojedynczy punkt awarii

Horyzontalne (Scale Out):
1 Serwer → Wiele Serwerów
↓          ↓
Master + Repliki
Sharding
```

**1. Read Replicas:**

```
         [Master DB]  ← Tylko zapisy
              │
      ┌───────┼───────┐
      ↓       ↓       ↓
  [Replika] [Replika] [Replika]  ← Odczyty
```

**Implementacja (PostgreSQL):**
```python
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import random

# Pula połączeń
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
        # Równoważenie odczytów między replikami
        return random.choice(replica_engines)

router = DatabaseRouter()

# Użycie
def create_user(name, email):
    # Zapis do mastera
    engine = router.get_engine(write=True)
    Session = sessionmaker(bind=engine)
    session = Session()
    user = User(name=name, email=email)
    session.add(user)
    session.commit()
    return user

def get_users():
    # Odczyt z repliki
    engine = router.get_engine(write=False)
    Session = sessionmaker(bind=engine)
    session = Session()
    return session.query(User).all()
```

**2. Sharding (partycjonowanie horyzontalne):**

```
ID użytkowników 0-999       → Shard 1
ID użytkowników 1000-1999   → Shard 2
ID użytkowników 2000-2999   → Shard 3
...
```

**Strategie shardingu:**

**a) Oparte na zakresach:**
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
        raise Exception('Nie znaleziono sharda')

# Problem: Nierówna dystrybucja jeśli ID nie są jednolite
```

**b) Oparte na hashu:**
```python
class HashShardRouter:
    NUM_SHARDS = 4

    def get_shard(self, user_id):
        shard_num = hash(user_id) % self.NUM_SHARDS
        return f'shard{shard_num}'

# Problem: Rebalansowanie przy dodaniu sharda jest kosztowne
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

        # Znajdź pierwszy węzeł >= hash_val
        for ring_key in self.sorted_keys:
            if ring_key >= hash_val:
                return self.ring[ring_key]

        # Zawijanie
        return self.ring[self.sorted_keys[0]]

router = ConsistentHashRouter(['shard1', 'shard2', 'shard3', 'shard4'])
shard = router.get_shard(user_id=12345)  # Zwraca 'shard2'
```

**3. Partycjonowanie bazy danych:**

**Partycjonowanie wertykalne:**
```sql
-- Podział tabel według grup kolumn
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

**Partycjonowanie horyzontalne (PostgreSQL):**
```sql
-- Partycjonowanie według zakresu (oparte na czasie)
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

-- Zapytania automatycznie kierują do właściwej partycji
SELECT * FROM orders WHERE created_at BETWEEN '2024-01-15' AND '2024-02-15';
```

**4. Denormalizacja dla wydajności odczytu:**

```sql
-- Znormalizowane (wymaga JOIN)
CREATE TABLE users (id BIGINT, name VARCHAR(255));
CREATE TABLE orders (id BIGINT, user_id BIGINT, total DECIMAL);

SELECT users.name, orders.total
FROM orders
JOIN users ON orders.user_id = users.id;

-- Zdenormalizowane (nie wymaga JOIN)
CREATE TABLE orders (
    id BIGINT,
    user_id BIGINT,
    user_name VARCHAR(255),  -- Zdenormalizowane
    total DECIMAL
);

SELECT user_name, total FROM orders;  -- Szybciej!

-- Kompromis: Złożoność aktualizacji
-- Gdy użytkownik zmienia nazwę, trzeba zaktualizować wszystkie jego zamówienia
```

**5. Connection Pooling:**

```python
from sqlalchemy import create_engine
from sqlalchemy.pool import QueuePool

engine = create_engine(
    'postgresql://db:5432/mydb',
    poolclass=QueuePool,
    pool_size=20,          # Normalne połączenia
    max_overflow=10,       # Dodatkowe połączenia pod obciążeniem
    pool_timeout=30,       # Czas oczekiwania na połączenie
    pool_recycle=3600,     # Recykling połączeń po 1 godzinie
    pool_pre_ping=True     # Sprawdzenie połączenia przed użyciem
)
```

**Lista kontrolna strategii skalowania:**
1. Zacznij od skalowania wertykalnego (najłatwiejsze)
2. Dodaj repliki odczytu (zazwyczaj odczyty >> zapisy)
3. Zaimplementuj caching (Redis, Memcached)
4. Użyj connection pooling
5. Zoptymalizuj zapytania (indeksy, EXPLAIN)
6. Rozważ sharding (ostateczność, najbardziej złożone)
7. Monitoruj wydajność zapytań (slow query log)

---

## 5. Strategie Caching

**Pytanie**: Jak zaimplementować caching aby poprawić wydajność aplikacji?

**Odpowiedź**:

**Warstwy cache'owania:**

```
[Klient]
   ↓
[CDN Cache] (zasoby statyczne)
   ↓
[Serwer aplikacji]
   ↓
[Application Cache] (Redis/Memcached)
   ↓
[Database Cache] (cache zapytań)
   ↓
[Baza danych]
```

**1. Cache-Aside (Lazy Loading):**

```python
import redis
import json

redis_client = redis.Redis(host='localhost', port=6379, db=0)

def get_user(user_id):
    cache_key = f'user:{user_id}'

    # 1. Sprawdź cache najpierw
    cached = redis_client.get(cache_key)
    if cached:
        return json.loads(cached)

    # 2. Cache miss - zapytaj bazę danych
    user = db.query('SELECT * FROM users WHERE id = ?', user_id)

    # 3. Zapisz w cache
    redis_client.setex(
        cache_key,
        3600,  # TTL: 1 godzina
        json.dumps(user)
    )

    return user

def update_user(user_id, data):
    # Aktualizacja bazy danych
    db.execute('UPDATE users SET ... WHERE id = ?', user_id)

    # Unieważnienie cache
    cache_key = f'user:{user_id}'
    redis_client.delete(cache_key)
```

**2. Write-Through Cache:**

```python
def update_user(user_id, data):
    cache_key = f'user:{user_id}'

    # 1. Aktualizacja bazy danych
    db.execute('UPDATE users SET name = ? WHERE id = ?', data['name'], user_id)

    # 2. Natychmiastowa aktualizacja cache
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

    # 1. Natychmiastowa aktualizacja cache
    redis_client.setex(cache_key, 3600, json.dumps(data))

    # 2. Dodanie zapisu do kolejki bazy danych
    write_queue.put(('users', user_id, data))

    return data

# Worker w tle przeprowadza zapisy do bazy danych
def database_writer():
    while True:
        table, id, data = write_queue.get()
        try:
            db.execute(f'UPDATE {table} SET ... WHERE id = ?', id)
        except Exception as e:
            # Obsługa błędów, ponowne próby, itp.
            logging.error(f'Nie udało się zapisać {table}:{id} - {e}')
        write_queue.task_done()

threading.Thread(target=database_writer, daemon=True).start()
```

**4. Strategie unieważniania cache:**

**a) TTL (Time-To-Live):**
```python
# Ustawienie czasu wygaśnięcia
redis_client.setex('key', 300, 'value')  # Wygasa za 5 minut

# Dla często aktualizowanych danych: krótki TTL
redis_client.setex('trending_posts', 60, json.dumps(posts))  # 1 minuta

# Dla rzadko aktualizowanych danych: długi TTL
redis_client.setex('country_list', 86400, json.dumps(countries))  # 24 godziny
```

**b) Unieważnianie oparte na zdarzeniach:**
```python
# Publikowanie zdarzenia gdy dane się zmieniają
def create_order(user_id, items):
    order = db.create_order(user_id, items)

    # Unieważnienie powiązanych cache
    redis_client.delete(f'user:{user_id}:orders')
    redis_client.delete(f'user:{user_id}:cart')

    # Publikacja zdarzenia dla innych serwisów
    redis_client.publish('orders', json.dumps({
        'event': 'ORDER_CREATED',
        'order_id': order.id,
        'user_id': user_id
    }))

    return order
```

**c) Tagowanie cache:**
```python
# Tagowanie wpisów cache według powiązanych encji
def cache_post(post):
    cache_key = f'post:{post.id}'
    tags = [f'user:{post.author_id}', f'category:{post.category_id}']

    redis_client.setex(cache_key, 3600, json.dumps(post))

    # Zapisanie tagów
    for tag in tags:
        redis_client.sadd(tag, cache_key)

def invalidate_by_tag(tag):
    # Pobranie wszystkich kluczy cache z tym tagiem
    cache_keys = redis_client.smembers(tag)

    # Usunięcie wszystkich
    if cache_keys:
        redis_client.delete(*cache_keys)

    # Usunięcie zestawu tagów
    redis_client.delete(tag)

# Użycie: Gdy użytkownik jest usuwany, unieważnij całą jego zawartość
invalidate_by_tag(f'user:{user_id}')
```

**5. Wzorce rozproszonego cache:**

**a) Zapobieganie Cache Stampede:**
```python
import threading
import time

locks = {}

def get_expensive_data(key):
    cached = redis_client.get(key)
    if cached:
        return json.loads(cached)

    # Zdobycie blokady aby zapobiec thundering herd
    lock_key = f'lock:{key}'
    if not locks.get(lock_key):
        locks[lock_key] = threading.Lock()

    with locks[lock_key]:
        # Podwójne sprawdzenie cache (inny wątek mógł je wypełnić)
        cached = redis_client.get(key)
        if cached:
            return json.loads(cached)

        # Obliczenie kosztownego wyniku
        result = expensive_computation()

        # Zapisanie w cache
        redis_client.setex(key, 300, json.dumps(result))

        return result
```

**b) Probabilistyczne wczesne wygaśnięcie:**
```python
import random
import time

def get_with_early_expiration(key, compute_fn, ttl=300):
    cached = redis_client.get(key)
    if cached:
        data = json.loads(cached)

        # Obliczenie ile czasu do wygaśnięcia
        ttl_remaining = redis_client.ttl(key)

        # Probabilistyczne wczesne odświeżenie
        # Prawdopodobieństwo rośnie w miarę zbliżania się wygaśnięcia
        if ttl_remaining > 0:
            delta = ttl - ttl_remaining
            probability = delta / ttl

            if random.random() < probability:
                # Odświeżenie w tle
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

**6. Cache wielopoziomowy:**

```python
from functools import lru_cache

# L1: Cache w pamięci (aplikacja)
@lru_cache(maxsize=1000)
def get_config(key):
    # L2: Cache Redis
    cached = redis_client.get(f'config:{key}')
    if cached:
        return json.loads(cached)

    # L3: Baza danych
    value = db.query('SELECT value FROM config WHERE key = ?', key)

    # Zapełnienie cache
    redis_client.setex(f'config:{key}', 3600, json.dumps(value))

    return value
```

**Najlepsze praktyki Caching:**
- Cache'uj gorące dane, nie wszystko
- Używaj odpowiednich TTL
- Monitoruj współczynniki trafień/chybień cache
- Obsługuj awarie cache z gracją
- Rozważ wymagania spójności danych
- Używaj kompresji dla dużych wartości
- Monitoruj użycie pamięci
