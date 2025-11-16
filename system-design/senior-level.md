# System Design - Senior-Level Questions

## 1. Design Instagram/Twitter Feed

**Question**: Design a social media feed system that shows posts from users you follow, sorted by time.

**Answer**:

**Architecture:**
```
[Client] → [API Gateway] → [Feed Service] → [Cache/DB]
                              ↓
                        [Fanout Service]
                              ↓
                        [Timeline Cache]
```

**Feed Generation Strategies:**

**1. Pull Model (Read on demand):**
- User requests feed → Query all followees → Merge & sort
- Pros: Write-optimized, fresh data
- Cons: Slow for users following many accounts

**2. Push Model (Fanout on write):**
- When user posts → Copy to all followers' feeds
- Pros: Fast reads
- Cons: Slow writes for celebrities (millions of followers)

**3. Hybrid Approach:**
```python
def generate_feed(user_id):
    # Regular users: use pre-computed feed (push)
    feed = get_precomputed_feed(user_id, limit=50)
    
    # Celebrities: fetch on-demand (pull)
    celebrities = get_celebrity_followees(user_id)
    celebrity_posts = fetch_recent_posts(celebrities, limit=20)
    
    # Merge and sort
    return merge_sort_by_time(feed, celebrity_posts)[:50]
```

**Key Points:**
- Use hybrid push/pull for efficiency
- Cache hot feeds in Redis
- Shard users by user_id
- Use message queue for async fanout

---

## 2. Design Netflix/YouTube

**Question**: Design a video streaming platform supporting millions of concurrent users.

**Answer**:

**Components:**
- CDN for video delivery
- Adaptive bitrate streaming
- Video processing pipeline
- Recommendation engine

**Video Processing:**
```
Upload → Transcode to multiple formats → Store in blob storage → CDN
         (360p, 720p, 1080p, 4K)
```

**Key Technologies:**
- CDN: Cloudflare, Akamai
- Storage: S3, GCS
- Transcoding: FFmpeg, AWS Elastic Transcoder
- Streaming: HLS, DASH protocols

---

## 3. Design Uber/Lyft

**Question**: Design a ride-sharing platform matching drivers and riders.

**Answer**:

**Core Problems:**
- Real-time location tracking
- Efficient driver-rider matching
- Pricing (surge)
- ETA calculation

**Geospatial Indexing:**
```python
# QuadTree or Google S2 for location indexing
def find_nearby_drivers(lat, lon, radius_km):
    cell_id = s2.lat_lng_to_cell_id(lat, lon, level=12)
    neighbor_cells = get_neighbor_cells(cell_id)
    
    drivers = []
    for cell in neighbor_cells:
        drivers.extend(get_drivers_in_cell(cell))
    
    return filter_by_distance(drivers, lat, lon, radius_km)
```

**Key Points:**
- WebSocket for real-time updates
- QuadTree/Geohash for spatial queries
- Kafka for event streaming
- Dynamic pricing based on supply/demand

---

## 4. Design URL Shortener (bit.ly, TinyURL)

**Question**: Design a URL shortening service that converts long URLs to short ones.

**Answer**:

**Requirements:**
- Functional:
  - Generate short URL from long URL
  - Redirect short URL to original URL
  - Custom short URLs (optional)
  - Expiration (optional)
  - Analytics (click tracking)

- Non-functional:
  - Low latency (< 100ms)
  - High availability (99.99%)
  - Scale: 100M URLs created/month, 10B redirects/month

**Architecture:**

```
[Client] → [Load Balancer] → [API Servers] → [Cache (Redis)] → [Database]
                                  ↓
                            [Analytics Service]
```

**Database Schema:**

```sql
CREATE TABLE urls (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    short_code VARCHAR(10) UNIQUE NOT NULL,
    long_url TEXT NOT NULL,
    user_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NULL,
    INDEX idx_short_code (short_code)
);

CREATE TABLE clicks (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    short_code VARCHAR(10),
    clicked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_agent VARCHAR(500),
    ip_address VARCHAR(45),
    referrer VARCHAR(500),
    INDEX idx_short_code (short_code),
    INDEX idx_clicked_at (clicked_at)
);
```

**Short Code Generation Strategies:**

**1. Base62 Encoding (Auto-increment ID):**
```python
import string

class Base62:
    ALPHABET = string.digits + string.ascii_lowercase + string.ascii_uppercase
    BASE = len(ALPHABET)  # 62

    @staticmethod
    def encode(num):
        if num == 0:
            return Base62.ALPHABET[0]

        result = []
        while num:
            num, rem = divmod(num, Base62.BASE)
            result.append(Base62.ALPHABET[rem])

        return ''.join(reversed(result))

    @staticmethod
    def decode(s):
        num = 0
        for char in s:
            num = num * Base62.BASE + Base62.ALPHABET.index(char)
        return num

# Usage
short_code = Base62.encode(12345)  # Returns: "3D7"
original_id = Base62.decode("3D7")  # Returns: 12345

# For 7 characters: 62^7 = 3.5 trillion possible URLs
```

**2. Hash-Based (MD5 + Collision Handling):**
```python
import hashlib

def generate_short_code(long_url):
    # Generate MD5 hash
    hash_obj = hashlib.md5(long_url.encode())
    hash_hex = hash_obj.hexdigest()

    # Take first 7 characters
    short_code = hash_hex[:7]

    # Check for collision
    existing = db.query('SELECT id FROM urls WHERE short_code = ?', short_code)
    if existing:
        # Collision: append counter
        counter = 1
        while True:
            new_code = hash_hex[:6] + str(counter)
            existing = db.query('SELECT id FROM urls WHERE short_code = ?', new_code)
            if not existing:
                return new_code
            counter += 1

    return short_code
```

**3. Random Generation (with uniqueness check):**
```python
import random
import string

def generate_random_code(length=7):
    while True:
        code = ''.join(random.choices(string.ascii_letters + string.digits, k=length))

        # Check uniqueness
        existing = db.query('SELECT id FROM urls WHERE short_code = ?', code)
        if not existing:
            return code
```

**API Implementation:**

```python
from flask import Flask, request, redirect
import redis

app = Flask(__name__)
redis_client = redis.Redis(host='localhost', port=6379)

@app.route('/shorten', methods=['POST'])
def shorten_url():
    long_url = request.json['url']
    custom_code = request.json.get('custom_code')
    expires_in_days = request.json.get('expires_in_days')

    # Validate URL
    if not is_valid_url(long_url):
        return {'error': 'Invalid URL'}, 400

    # Use custom code or generate one
    if custom_code:
        # Check availability
        existing = db.query('SELECT id FROM urls WHERE short_code = ?', custom_code)
        if existing:
            return {'error': 'Custom code already taken'}, 409
        short_code = custom_code
    else:
        # Auto-generate ID and encode
        url_id = db.execute('INSERT INTO urls (long_url) VALUES (?)', long_url)
        short_code = Base62.encode(url_id)
        db.execute('UPDATE urls SET short_code = ? WHERE id = ?', short_code, url_id)

    # Set expiration
    if expires_in_days:
        expires_at = datetime.now() + timedelta(days=expires_in_days)
        db.execute('UPDATE urls SET expires_at = ? WHERE short_code = ?',
                   expires_at, short_code)

    # Cache in Redis
    redis_client.setex(f'url:{short_code}', 86400, long_url)

    return {
        'short_url': f'https://short.ly/{short_code}',
        'long_url': long_url
    }

@app.route('/<short_code>')
def redirect_url(short_code):
    # Try cache first
    long_url = redis_client.get(f'url:{short_code}')

    if not long_url:
        # Cache miss - query database
        result = db.query('''
            SELECT long_url, expires_at
            FROM urls
            WHERE short_code = ?
        ''', short_code)

        if not result:
            return {'error': 'URL not found'}, 404

        # Check expiration
        if result['expires_at'] and datetime.now() > result['expires_at']:
            return {'error': 'URL expired'}, 410

        long_url = result['long_url']

        # Cache it
        redis_client.setex(f'url:{short_code}', 86400, long_url)

    # Track click asynchronously
    track_click(short_code, request)

    # Redirect
    return redirect(long_url, code=301)

def track_click(short_code, request):
    # Queue for async processing
    analytics_queue.publish({
        'short_code': short_code,
        'clicked_at': datetime.now(),
        'user_agent': request.headers.get('User-Agent'),
        'ip_address': request.remote_addr,
        'referrer': request.headers.get('Referer')
    })
```

**Analytics:**

```python
@app.route('/analytics/<short_code>')
def get_analytics(short_code):
    # Total clicks
    total = db.query('''
        SELECT COUNT(*) as count
        FROM clicks
        WHERE short_code = ?
    ''', short_code)[0]['count']

    # Clicks by day (last 30 days)
    daily_clicks = db.query('''
        SELECT DATE(clicked_at) as date, COUNT(*) as count
        FROM clicks
        WHERE short_code = ?
          AND clicked_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
        GROUP BY DATE(clicked_at)
        ORDER BY date
    ''', short_code)

    # Top referrers
    top_referrers = db.query('''
        SELECT referrer, COUNT(*) as count
        FROM clicks
        WHERE short_code = ?
        GROUP BY referrer
        ORDER BY count DESC
        LIMIT 10
    ''', short_code)

    return {
        'total_clicks': total,
        'daily_clicks': daily_clicks,
        'top_referrers': top_referrers
    }
```

**Scaling Considerations:**

1. **Database Sharding:**
   - Shard by short_code hash
   - Each shard handles subset of URLs

2. **Caching Strategy:**
   - Cache hot URLs in Redis
   - CDN for static assets
   - Application-level caching

3. **Rate Limiting:**
   - Prevent abuse (spam URL creation)
   - IP-based or user-based limits

4. **Analytics at Scale:**
   - Use message queue (Kafka) for click events
   - Process asynchronously
   - Store in time-series database (InfluxDB)

---

## 5. Design Rate Limiter

**Question**: Design a rate limiting system to prevent API abuse.

**Answer**:

**Requirements:**
- Limit requests per user/IP
- Different limits for different endpoints
- Distributed (works across multiple servers)
- Low latency
- Return clear error messages

**Rate Limiting Algorithms:**

**1. Token Bucket:**

```python
import time
import redis

class TokenBucket:
    def __init__(self, redis_client, capacity, refill_rate):
        self.redis = redis_client
        self.capacity = capacity  # Max tokens
        self.refill_rate = refill_rate  # Tokens per second

    def allow_request(self, user_id):
        key = f'rate_limit:{user_id}'
        now = time.time()

        # Get current state
        pipe = self.redis.pipeline()
        pipe.hgetall(key)
        result = pipe.execute()[0]

        if not result:
            # First request
            tokens = self.capacity - 1
            last_refill = now
        else:
            tokens = float(result[b'tokens'])
            last_refill = float(result[b'last_refill'])

            # Refill tokens based on elapsed time
            elapsed = now - last_refill
            tokens_to_add = elapsed * self.refill_rate
            tokens = min(self.capacity, tokens + tokens_to_add)
            last_refill = now

        # Check if request allowed
        if tokens >= 1:
            tokens -= 1
            allowed = True
        else:
            allowed = False

        # Update state
        self.redis.hset(key, mapping={
            'tokens': tokens,
            'last_refill': last_refill
        })
        self.redis.expire(key, 3600)  # Clean up after 1 hour

        return allowed

# Usage
limiter = TokenBucket(redis_client, capacity=100, refill_rate=10)  # 10 req/sec
if limiter.allow_request(user_id):
    # Process request
    pass
else:
    # Return 429 Too Many Requests
    return {'error': 'Rate limit exceeded'}, 429
```

**2. Sliding Window Log:**

```python
import time
import redis

class SlidingWindowLog:
    def __init__(self, redis_client, window_size, max_requests):
        self.redis = redis_client
        self.window_size = window_size  # seconds
        self.max_requests = max_requests

    def allow_request(self, user_id):
        key = f'rate_limit:log:{user_id}'
        now = time.time()
        window_start = now - self.window_size

        # Remove old entries
        self.redis.zremrangebyscore(key, 0, window_start)

        # Count requests in current window
        request_count = self.redis.zcard(key)

        if request_count < self.max_requests:
            # Add current request
            self.redis.zadd(key, {str(now): now})
            self.redis.expire(key, self.window_size)
            return True
        else:
            return False

# Usage: 100 requests per minute
limiter = SlidingWindowLog(redis_client, window_size=60, max_requests=100)
```

**3. Sliding Window Counter (Memory Efficient):**

```python
import time
import redis

class SlidingWindowCounter:
    def __init__(self, redis_client, window_size, max_requests):
        self.redis = redis_client
        self.window_size = window_size
        self.max_requests = max_requests

    def allow_request(self, user_id):
        now = time.time()
        current_window = int(now / self.window_size)
        previous_window = current_window - 1

        current_key = f'rate_limit:{user_id}:{current_window}'
        previous_key = f'rate_limit:{user_id}:{previous_window}'

        # Get counts
        current_count = int(self.redis.get(current_key) or 0)
        previous_count = int(self.redis.get(previous_key) or 0)

        # Calculate weight for previous window
        elapsed_time_in_window = now % self.window_size
        previous_weight = 1 - (elapsed_time_in_window / self.window_size)

        # Weighted count
        weighted_count = (previous_count * previous_weight) + current_count

        if weighted_count < self.max_requests:
            # Increment current window
            pipe = self.redis.pipeline()
            pipe.incr(current_key)
            pipe.expire(current_key, self.window_size * 2)
            pipe.execute()
            return True
        else:
            return False

# Usage: 1000 requests per hour
limiter = SlidingWindowCounter(redis_client, window_size=3600, max_requests=1000)
```

**Flask Middleware Integration:**

```python
from flask import Flask, request, jsonify
from functools import wraps

app = Flask(__name__)

def rate_limit(max_requests=100, window=60):
    """
    Decorator to rate limit endpoints
    max_requests: number of requests allowed
    window: time window in seconds
    """
    def decorator(f):
        @wraps(f)
        def wrapped(*args, **kwargs):
            # Get user identifier (IP or user_id)
            user_id = request.headers.get('X-User-ID') or request.remote_addr

            # Check rate limit
            limiter = SlidingWindowCounter(redis_client, window, max_requests)
            if not limiter.allow_request(user_id):
                # Get retry-after time
                retry_after = calculate_retry_after(user_id, window)

                return jsonify({
                    'error': 'Rate limit exceeded',
                    'retry_after': retry_after
                }), 429, {'Retry-After': str(retry_after)}

            return f(*args, **kwargs)
        return wrapped
    return decorator

@app.route('/api/search')
@rate_limit(max_requests=10, window=60)  # 10 requests per minute
def search():
    query = request.args.get('q')
    results = perform_search(query)
    return jsonify(results)

@app.route('/api/expensive-operation')
@rate_limit(max_requests=1, window=10)  # 1 request per 10 seconds
def expensive_operation():
    result = perform_expensive_operation()
    return jsonify(result)
```

**Distributed Rate Limiting (Redis Lua Script):**

```lua
-- token_bucket.lua
local key = KEYS[1]
local capacity = tonumber(ARGV[1])
local refill_rate = tonumber(ARGV[2])
local now = tonumber(ARGV[3])

local tokens = redis.call('HGET', key, 'tokens')
local last_refill = redis.call('HGET', key, 'last_refill')

if not tokens then
    tokens = capacity - 1
    last_refill = now
else
    tokens = tonumber(tokens)
    last_refill = tonumber(last_refill)

    local elapsed = now - last_refill
    local tokens_to_add = elapsed * refill_rate
    tokens = math.min(capacity, tokens + tokens_to_add)
    last_refill = now
end

local allowed = 0
if tokens >= 1 then
    tokens = tokens - 1
    allowed = 1
end

redis.call('HSET', key, 'tokens', tokens, 'last_refill', last_refill)
redis.call('EXPIRE', key, 3600)

return allowed
```

```python
# Load Lua script
with open('token_bucket.lua', 'r') as f:
    lua_script = f.read()

token_bucket_script = redis_client.register_script(lua_script)

def check_rate_limit(user_id, capacity=100, refill_rate=10):
    key = f'rate_limit:{user_id}'
    now = time.time()

    allowed = token_bucket_script(
        keys=[key],
        args=[capacity, refill_rate, now]
    )

    return bool(allowed)
```

**Advanced Features:**

**1. Tiered Rate Limits:**
```python
RATE_LIMITS = {
    'free': {'requests': 100, 'window': 3600},     # 100/hour
    'basic': {'requests': 1000, 'window': 3600},   # 1000/hour
    'premium': {'requests': 10000, 'window': 3600} # 10000/hour
}

def get_rate_limit(user_id):
    user = db.query('SELECT tier FROM users WHERE id = ?', user_id)
    tier = user['tier']
    return RATE_LIMITS[tier]

@app.route('/api/data')
def get_data():
    user_id = get_current_user_id()
    limit_config = get_rate_limit(user_id)

    limiter = SlidingWindowCounter(
        redis_client,
        window_size=limit_config['window'],
        max_requests=limit_config['requests']
    )

    if not limiter.allow_request(user_id):
        return {'error': 'Rate limit exceeded'}, 429

    return get_user_data()
```

**2. Rate Limit Headers:**
```python
@app.after_request
def add_rate_limit_headers(response):
    user_id = request.headers.get('X-User-ID')
    if user_id:
        limit_config = get_rate_limit(user_id)
        remaining = get_remaining_requests(user_id, limit_config)

        response.headers['X-RateLimit-Limit'] = str(limit_config['requests'])
        response.headers['X-RateLimit-Remaining'] = str(remaining)
        response.headers['X-RateLimit-Reset'] = str(get_reset_time(user_id))

    return response
```

**3. Dynamic Rate Limiting (based on system load):**
```python
def adaptive_rate_limit(user_id):
    # Check system load
    cpu_usage = get_cpu_usage()
    memory_usage = get_memory_usage()

    # Adjust limits based on load
    if cpu_usage > 80 or memory_usage > 80:
        max_requests = 50  # Reduce limit
    else:
        max_requests = 100  # Normal limit

    limiter = TokenBucket(redis_client, capacity=max_requests, refill_rate=10)
    return limiter.allow_request(user_id)
```

**Comparison of Algorithms:**

| Algorithm | Memory | Accuracy | Distributed | Complexity |
|-----------|--------|----------|-------------|------------|
| **Token Bucket** | Low | Good | Yes (Redis) | Low |
| **Sliding Window Log** | High | Exact | Yes | Medium |
| **Sliding Window Counter** | Low | Approximate | Yes | Low |
| **Fixed Window** | Low | Poor (burst) | Yes | Very Low |

**Best Practices:**
- Use Redis for distributed rate limiting
- Return clear error messages (429 status)
- Include Retry-After header
- Implement graceful degradation
- Monitor rate limit metrics
- Consider different limits per endpoint
- Allow-list trusted IPs/users
