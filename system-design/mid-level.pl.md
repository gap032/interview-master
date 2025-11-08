# System Design - Pytania Poziom Mid

## 1. Design a URL Shortener

**Trudność**: Medium

**Pytanie**: Design a URL shortening service like bit.ly. Include API design, data storage, and how to generate short URLs.

**Odpowiedź**:

**Requirements:**
- Convert long URLs to short unique codes
- Redirect short URLs to original URLs
- Track click statistics
- Handle millions of URLs

**API Design:**

```
POST /api/shorten
Request: { "url": "https://example.com/very/long/url" }
Response: { "short_url": "https://short.ly/abc123", "id": "abc123" }

GET /{short_code}
Response: 302 Redirect to original URL

GET /api/stats/{short_code}
Response: { "clicks": 1234, "created": "2025-01-01" }
```

**Architecture:**

```
[Client] → [Load Balancer] → [API Servers] → [Cache (Redis)] → [Database]
                                     ↓
                              [ID Generator]
```

**Short Code Generation Strategies:**

**1. Base62 Encoding:**
```python
import string
import hashlib

class URLShortener:
    def __init__(self):
        self.alphabet = string.ascii_letters + string.digits  # 62 chars
        self.base = len(self.alphabet)

    def encode(self, num: int) -> str:
        """Convert number to base62"""
        if num == 0:
            return self.alphabet[0]

        result = []
        while num:
            result.append(self.alphabet[num % self.base])
            num //= self.base

        return ''.join(reversed(result))

    def decode(self, code: str) -> int:
        """Convert base62 to number"""
        num = 0
        for char in code:
            num = num * self.base + self.alphabet.index(char)
        return num

    def shorten_url(self, url: str, url_id: int) -> str:
        """Generate short code from auto-increment ID"""
        short_code = self.encode(url_id)
        return f"https://short.ly/{short_code}"
```

**2. Hash-Based Approach:**
```python
def generate_short_code_hash(url: str) -> str:
    """Use MD5 hash and take first 7 characters"""
    hash_object = hashlib.md5(url.encode())
    hash_hex = hash_object.hexdigest()

    # Take first 7 chars (62^7 = 3.5 trillion combinations)
    short_code = hash_hex[:7]
    return short_code

# Problem: Collisions possible
# Solution: Add salt/counter on collision
```

**Database Schema:**

```sql
CREATE TABLE urls (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    short_code VARCHAR(10) UNIQUE NOT NULL,
    original_url TEXT NOT NULL,
    user_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    INDEX idx_short_code (short_code)
);

CREATE TABLE clicks (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    short_code VARCHAR(10),
    clicked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    user_agent TEXT,
    referrer TEXT,
    INDEX idx_short_code (short_code),
    INDEX idx_clicked_at (clicked_at)
);
```

**Caching Strategy:**

```python
import redis

class URLService:
    def __init__(self, db, cache: redis.Redis):
        self.db = db
        self.cache = cache
        self.cache_ttl = 3600  # 1 hour

    def get_original_url(self, short_code: str) -> str:
        # Try cache first
        cached_url = self.cache.get(f"url:{short_code}")
        if cached_url:
            return cached_url.decode()

        # Cache miss - query database
        url = self.db.query(
            "SELECT original_url FROM urls WHERE short_code = ?",
            short_code
        )

        if url:
            # Store in cache
            self.cache.setex(
                f"url:{short_code}",
                self.cache_ttl,
                url
            )
            return url

        return None

    def create_short_url(self, original_url: str) -> str:
        # Insert into database
        result = self.db.execute(
            "INSERT INTO urls (original_url) VALUES (?)",
            original_url
        )
        url_id = result.lastrowid

        # Generate short code
        shortener = URLShortener()
        short_code = shortener.encode(url_id)

        # Update record with short code
        self.db.execute(
            "UPDATE urls SET short_code = ? WHERE id = ?",
            short_code, url_id
        )

        # Cache the mapping
        self.cache.setex(
            f"url:{short_code}",
            self.cache_ttl,
            original_url
        )

        return short_code
```

**Scale Considerations:**

| Requirement | Solution |
|-------------|----------|
| High read traffic | Redis caching, CDN for redirects |
| Write throughput | Database sharding by hash of short_code |
| Analytics | Async write to clicks table, use message queue |
| Global access | Geographic load balancing, regional caches |

**Capacity Estimation:**

```
Assumptions:
- 500M new URLs per month
- 100:1 read:write ratio
- Store for 5 years

Storage:
- Each URL: 500 bytes average
- 500M × 500 bytes × 12 months × 5 years = 15 TB

QPS:
- Writes: 500M / (30 days × 86400 sec) ≈ 200 URLs/sec
- Reads: 200 × 100 = 20,000 reads/sec

Cache:
- 20% of URLs account for 80% of traffic
- Cache size: 15 TB × 0.20 = 3 TB
```

**Key Points:**
- Use auto-increment ID + base62 encoding for uniqueness
- Cache hot URLs in Redis for performance
- Partition database by short_code hash
- Use async processing for analytics
- Consider CDN for global distribution

---

## 2. Design a Rate Limiter

**Trudność**: Medium

**Pytanie**: Design an API rate limiter to prevent abuse. Support different rate limits per user/tier.

**Odpowiedź**:

**Requirements:**
- Limit requests per time window (e.g., 100 req/min)
- Support different tiers (free: 100/min, premium: 1000/min)
- Distributed system support
- Low latency (<1ms overhead)

**Algorithms:**

**1. Token Bucket (Recommended):**

```python
import time

class TokenBucket:
    def __init__(self, capacity: int, refill_rate: float):
        """
        capacity: max tokens in bucket
        refill_rate: tokens added per second
        """
        self.capacity = capacity
        self.refill_rate = refill_rate
        self.tokens = capacity
        self.last_refill = time.time()

    def allow_request(self, tokens_needed: int = 1) -> bool:
        # Refill tokens based on time elapsed
        now = time.time()
        elapsed = now - self.last_refill
        tokens_to_add = elapsed * self.refill_rate

        self.tokens = min(self.capacity, self.tokens + tokens_to_add)
        self.last_refill = now

        # Check if enough tokens
        if self.tokens >= tokens_needed:
            self.tokens -= tokens_needed
            return True

        return False
```

**2. Sliding Window Counter:**

```python
from collections import deque
import time

class SlidingWindowRateLimiter:
    def __init__(self, max_requests: int, window_seconds: int):
        self.max_requests = max_requests
        self.window = window_seconds
        self.requests = deque()  # Store timestamps

    def allow_request(self) -> bool:
        now = time.time()
        cutoff = now - self.window

        # Remove old requests outside window
        while self.requests and self.requests[0] < cutoff:
            self.requests.popleft()

        # Check if under limit
        if len(self.requests) < self.max_requests:
            self.requests.append(now)
            return True

        return False
```

**Distributed Implementation with Redis:**

```python
import redis

class DistributedRateLimiter:
    def __init__(self, redis_client: redis.Redis):
        self.redis = redis_client

    def check_rate_limit(self, user_id: str, max_requests: int, window_seconds: int) -> bool:
        """
        Use Redis sorted set to track requests
        """
        key = f"rate_limit:{user_id}"
        now = time.time()
        window_start = now - window_seconds

        # Lua script for atomic operation
        lua_script = """
        local key = KEYS[1]
        local now = tonumber(ARGV[1])
        local window_start = tonumber(ARGV[2])
        local max_requests = tonumber(ARGV[3])

        -- Remove old entries
        redis.call('ZREMRANGEBYSCORE', key, '-inf', window_start)

        -- Count current requests
        local current = redis.call('ZCARD', key)

        if current < max_requests then
            redis.call('ZADD', key, now, now)
            redis.call('EXPIRE', key, 3600)
            return 1
        else
            return 0
        end
        """

        result = self.redis.eval(
            lua_script,
            1,  # num keys
            key,
            now,
            window_start,
            max_requests
        )

        return bool(result)
```

**API Integration:**

```python
from flask import Flask, jsonify, request
from functools import wraps

app = Flask(__name__)
redis_client = redis.Redis()

# Rate limit tiers
RATE_LIMITS = {
    'free': (100, 60),      # 100 requests per 60 seconds
    'premium': (1000, 60),
    'enterprise': (10000, 60)
}

def rate_limit(tier: str = 'free'):
    def decorator(f):
        @wraps(f)
        def wrapped(*args, **kwargs):
            user_id = request.headers.get('X-User-ID')
            if not user_id:
                return jsonify({'error': 'Missing user ID'}), 401

            max_requests, window = RATE_LIMITS[tier]
            limiter = DistributedRateLimiter(redis_client)

            if not limiter.check_rate_limit(user_id, max_requests, window):
                return jsonify({
                    'error': 'Rate limit exceeded',
                    'retry_after': window
                }), 429

            return f(*args, **kwargs)
        return wrapped
    return decorator

@app.route('/api/data')
@rate_limit(tier='free')
def get_data():
    return jsonify({'data': 'some data'})
```

**Response Headers:**

```
HTTP/1.1 200 OK
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 87
X-RateLimit-Reset: 1640995200
```

**Key Points:**
- Token bucket allows bursts, sliding window more accurate
- Use Redis for distributed rate limiting
- Lua scripts ensure atomic operations
- Return 429 status code with Retry-After header
- Consider multiple dimensions: per-user, per-IP, per-API key

---

## 3. Design a Cache System

**Trudność**: Medium

**Pytanie**: Design a distributed caching system. Cover eviction policies, consistency, and scaling strategies.

**Odpowiedź**:

**Requirements:**
- Fast read/write (< 1ms)
- LRU eviction policy
- Distributed across multiple servers
- Handle cache invalidation

**Single-Node Cache:**

```python
from collections import OrderedDict
import threading

class LRUCache:
    def __init__(self, capacity: int):
        self.cache = OrderedDict()
        self.capacity = capacity
        self.lock = threading.RLock()

    def get(self, key: str):
        with self.lock:
            if key not in self.cache:
                return None

            # Move to end (most recently used)
            self.cache.move_to_end(key)
            return self.cache[key]

    def put(self, key: str, value):
        with self.lock:
            if key in self.cache:
                self.cache.move_to_end(key)

            self.cache[key] = value

            if len(self.cache) > self.capacity:
                # Remove least recently used (first item)
                self.cache.popitem(last=False)

    def delete(self, key: str):
        with self.lock:
            if key in self.cache:
                del self.cache[key]

    def clear(self):
        with self.lock:
            self.cache.clear()
```

**Distributed Cache with Consistent Hashing:**

```python
import hashlib
import bisect

class ConsistentHashing:
    def __init__(self, nodes=None, replicas=3):
        self.replicas = replicas
        self.ring = {}  # hash -> node
        self.sorted_keys = []
        self.nodes = set()

        if nodes:
            for node in nodes:
                self.add_node(node)

    def _hash(self, key: str) -> int:
        return int(hashlib.md5(key.encode()).hexdigest(), 16)

    def add_node(self, node: str):
        self.nodes.add(node)

        for i in range(self.replicas):
            virtual_key = f"{node}:{i}"
            hash_value = self._hash(virtual_key)
            self.ring[hash_value] = node
            bisect.insort(self.sorted_keys, hash_value)

    def remove_node(self, node: str):
        self.nodes.remove(node)

        for i in range(self.replicas):
            virtual_key = f"{node}:{i}"
            hash_value = self._hash(virtual_key)
            del self.ring[hash_value]
            self.sorted_keys.remove(hash_value)

    def get_node(self, key: str) -> str:
        if not self.ring:
            return None

        hash_value = self._hash(key)
        idx = bisect.bisect(self.sorted_keys, hash_value)

        # Wrap around to first node
        if idx == len(self.sorted_keys):
            idx = 0

        return self.ring[self.sorted_keys[idx]]


class DistributedCache:
    def __init__(self, nodes):
        self.hash_ring = ConsistentHashing(nodes)
        self.caches = {node: LRUCache(capacity=1000) for node in nodes}

    def get(self, key: str):
        node = self.hash_ring.get_node(key)
        return self.caches[node].get(key)

    def put(self, key: str, value):
        node = self.hash_ring.get_node(key)
        self.caches[node].put(key, value)

    def delete(self, key: str):
        node = self.hash_ring.get_node(key)
        self.caches[node].delete(key)
```

**Cache-Aside Pattern:**

```python
class CacheAsidePattern:
    def __init__(self, cache, database):
        self.cache = cache
        self.db = database

    def get_user(self, user_id: int):
        # Try cache first
        cache_key = f"user:{user_id}"
        user = self.cache.get(cache_key)

        if user:
            return user  # Cache hit

        # Cache miss - query database
        user = self.db.query("SELECT * FROM users WHERE id = ?", user_id)

        if user:
            # Store in cache for future requests
            self.cache.put(cache_key, user, ttl=3600)

        return user

    def update_user(self, user_id: int, data):
        # Update database
        self.db.execute("UPDATE users SET ... WHERE id = ?", user_id)

        # Invalidate cache
        cache_key = f"user:{user_id}"
        self.cache.delete(cache_key)
```

**Key Points:**
- LRU eviction removes least recently used items
- Consistent hashing minimizes rehashing on node changes
- Cache-aside pattern: application manages cache
- Consider write-through vs write-behind for updates
- Monitor hit rate, eviction rate for tuning

