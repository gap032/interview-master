# System Design - Pytania na Poziomie Senior

## 1. Zaprojektuj Feed Instagram/Twitter

**Pytanie**: Zaprojektuj system kanału mediów społecznościowych, który pokazuje posty od użytkowników, których obserwujesz, posortowane według czasu.

**Odpowiedź**:

**Architektura:**
```
[Client] → [API Gateway] → [Feed Service] → [Cache/DB]
                              ↓
                        [Fanout Service]
                              ↓
                        [Timeline Cache]
```

**Strategie Generowania Feed:**

**1. Model Pull (Czytanie na żądanie):**
- Użytkownik żąda feedu → Zapytanie do wszystkich obserwowanych → Scalanie i sortowanie
- Zalety: Zoptymalizowany pod kątem zapisu, świeże dane
- Wady: Wolny dla użytkowników obserwujących wiele kont

**2. Model Push (Fanout przy zapisie):**
- Gdy użytkownik publikuje → Kopiowanie do feedów wszystkich obserwujących
- Zalety: Szybkie odczyty
- Wady: Wolne zapisy dla celebrytów (miliony obserwujących)

**3. Podejście Hybrydowe:**
```python
def generate_feed(user_id):
    # Zwykli użytkownicy: użyj wstępnie obliczonego feedu (push)
    feed = get_precomputed_feed(user_id, limit=50)

    # Celebryci: pobieraj na żądanie (pull)
    celebrities = get_celebrity_followees(user_id)
    celebrity_posts = fetch_recent_posts(celebrities, limit=20)

    # Scalanie i sortowanie
    return merge_sort_by_time(feed, celebrity_posts)[:50]
```

**Kluczowe Punkty:**
- Użyj hybrydowego push/pull dla wydajności
- Cachuj popularne feedy w Redis
- Sharduj użytkowników według user_id
- Użyj kolejki wiadomości dla asynchronicznego fanout

---

## 2. Zaprojektuj Netflix/YouTube

**Pytanie**: Zaprojektuj platformę streamingu wideo obsługującą miliony jednoczesnych użytkowników.

**Odpowiedź**:

**Komponenty:**
- CDN do dostarczania wideo
- Adaptacyjny streaming bitrate
- Pipeline przetwarzania wideo
- Silnik rekomendacji

**Przetwarzanie Wideo:**
```
Upload → Transkodowanie do wielu formatów → Przechowywanie w blob storage → CDN
         (360p, 720p, 1080p, 4K)
```

**Kluczowe Technologie:**
- CDN: Cloudflare, Akamai
- Storage: S3, GCS
- Transcoding: FFmpeg, AWS Elastic Transcoder
- Streaming: Protokoły HLS, DASH

---

## 3. Zaprojektuj Uber/Lyft

**Pytanie**: Zaprojektuj platformę współdzielenia przejazdów dopasowującą kierowców i pasażerów.

**Odpowiedź**:

**Kluczowe Problemy:**
- Śledzenie lokalizacji w czasie rzeczywistym
- Wydajne dopasowywanie kierowca-pasażer
- Wycena (surge)
- Obliczanie ETA

**Indeksowanie Geoprzestrzenne:**
```python
# QuadTree lub Google S2 do indeksowania lokalizacji
def find_nearby_drivers(lat, lon, radius_km):
    cell_id = s2.lat_lng_to_cell_id(lat, lon, level=12)
    neighbor_cells = get_neighbor_cells(cell_id)

    drivers = []
    for cell in neighbor_cells:
        drivers.extend(get_drivers_in_cell(cell))

    return filter_by_distance(drivers, lat, lon, radius_km)
```

**Kluczowe Punkty:**
- WebSocket dla aktualizacji w czasie rzeczywistym
- QuadTree/Geohash dla zapytań przestrzennych
- Kafka dla event streaming
- Dynamiczna wycena oparta na podaży/popycie

---

## 4. Zaprojektuj URL Shortener (bit.ly, TinyURL)

**Pytanie**: Zaprojektuj serwis skracania URL, który konwertuje długie URL-e na krótkie.

**Odpowiedź**:

**Wymagania:**
- Funkcjonalne:
  - Generowanie krótkiego URL z długiego URL
  - Przekierowanie krótkiego URL do oryginalnego URL
  - Niestandardowe krótkie URL (opcjonalne)
  - Wygasanie (opcjonalne)
  - Analityka (śledzenie kliknięć)

- Niefunkcjonalne:
  - Niska latencja (< 100ms)
  - Wysoka dostępność (99.99%)
  - Skala: 100M URL-i utworzonych/miesiąc, 10B przekierowań/miesiąc

**Architektura:**

```
[Client] → [Load Balancer] → [API Servers] → [Cache (Redis)] → [Database]
                                  ↓
                            [Analytics Service]
```

**Schemat Bazy Danych:**

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

**Strategie Generowania Krótkiego Kodu:**

**1. Kodowanie Base62 (Auto-increment ID):**
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

# Użycie
short_code = Base62.encode(12345)  # Zwraca: "3D7"
original_id = Base62.decode("3D7")  # Zwraca: 12345

# Dla 7 znaków: 62^7 = 3.5 biliona możliwych URL-i
```

**2. Oparte na Hash (MD5 + Obsługa Kolizji):**
```python
import hashlib

def generate_short_code(long_url):
    # Generuj hash MD5
    hash_obj = hashlib.md5(long_url.encode())
    hash_hex = hash_obj.hexdigest()

    # Weź pierwsze 7 znaków
    short_code = hash_hex[:7]

    # Sprawdź kolizję
    existing = db.query('SELECT id FROM urls WHERE short_code = ?', short_code)
    if existing:
        # Kolizja: dodaj licznik
        counter = 1
        while True:
            new_code = hash_hex[:6] + str(counter)
            existing = db.query('SELECT id FROM urls WHERE short_code = ?', new_code)
            if not existing:
                return new_code
            counter += 1

    return short_code
```

**3. Losowe Generowanie (ze sprawdzeniem unikalności):**
```python
import random
import string

def generate_random_code(length=7):
    while True:
        code = ''.join(random.choices(string.ascii_letters + string.digits, k=length))

        # Sprawdź unikalność
        existing = db.query('SELECT id FROM urls WHERE short_code = ?', code)
        if not existing:
            return code
```

**Implementacja API:**

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

    # Waliduj URL
    if not is_valid_url(long_url):
        return {'error': 'Invalid URL'}, 400

    # Użyj niestandardowego kodu lub wygeneruj nowy
    if custom_code:
        # Sprawdź dostępność
        existing = db.query('SELECT id FROM urls WHERE short_code = ?', custom_code)
        if existing:
            return {'error': 'Custom code already taken'}, 409
        short_code = custom_code
    else:
        # Auto-generuj ID i zakoduj
        url_id = db.execute('INSERT INTO urls (long_url) VALUES (?)', long_url)
        short_code = Base62.encode(url_id)
        db.execute('UPDATE urls SET short_code = ? WHERE id = ?', short_code, url_id)

    # Ustaw wygasanie
    if expires_in_days:
        expires_at = datetime.now() + timedelta(days=expires_in_days)
        db.execute('UPDATE urls SET expires_at = ? WHERE short_code = ?',
                   expires_at, short_code)

    # Cachuj w Redis
    redis_client.setex(f'url:{short_code}', 86400, long_url)

    return {
        'short_url': f'https://short.ly/{short_code}',
        'long_url': long_url
    }

@app.route('/<short_code>')
def redirect_url(short_code):
    # Najpierw spróbuj cache
    long_url = redis_client.get(f'url:{short_code}')

    if not long_url:
        # Cache miss - zapytaj bazę danych
        result = db.query('''
            SELECT long_url, expires_at
            FROM urls
            WHERE short_code = ?
        ''', short_code)

        if not result:
            return {'error': 'URL not found'}, 404

        # Sprawdź wygasanie
        if result['expires_at'] and datetime.now() > result['expires_at']:
            return {'error': 'URL expired'}, 410

        long_url = result['long_url']

        # Cachuj
        redis_client.setex(f'url:{short_code}', 86400, long_url)

    # Śledź kliknięcie asynchronicznie
    track_click(short_code, request)

    # Przekieruj
    return redirect(long_url, code=301)

def track_click(short_code, request):
    # Kolejka do asynchronicznego przetwarzania
    analytics_queue.publish({
        'short_code': short_code,
        'clicked_at': datetime.now(),
        'user_agent': request.headers.get('User-Agent'),
        'ip_address': request.remote_addr,
        'referrer': request.headers.get('Referer')
    })
```

**Analityka:**

```python
@app.route('/analytics/<short_code>')
def get_analytics(short_code):
    # Całkowita liczba kliknięć
    total = db.query('''
        SELECT COUNT(*) as count
        FROM clicks
        WHERE short_code = ?
    ''', short_code)[0]['count']

    # Kliknięcia według dnia (ostatnie 30 dni)
    daily_clicks = db.query('''
        SELECT DATE(clicked_at) as date, COUNT(*) as count
        FROM clicks
        WHERE short_code = ?
          AND clicked_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
        GROUP BY DATE(clicked_at)
        ORDER BY date
    ''', short_code)

    # Top referrerzy
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

**Zagadnienia Skalowania:**

1. **Sharding Bazy Danych:**
   - Sharduj według hash short_code
   - Każdy shard obsługuje podzbiór URL-i

2. **Strategia Cachowania:**
   - Cachuj popularne URL-e w Redis
   - CDN dla statycznych zasobów
   - Cachowanie na poziomie aplikacji

3. **Rate Limiting:**
   - Zapobiegaj nadużyciom (spam tworzenia URL)
   - Limity oparte na IP lub użytkowniku

4. **Analityka w Skali:**
   - Użyj kolejki wiadomości (Kafka) dla wydarzeń kliknięć
   - Przetwarzaj asynchronicznie
   - Przechowuj w bazie danych szeregów czasowych (InfluxDB)

---

## 5. Zaprojektuj Rate Limiter

**Pytanie**: Zaprojektuj system ograniczania liczby żądań, aby zapobiec nadużyciom API.

**Odpowiedź**:

**Wymagania:**
- Ograniczenie żądań na użytkownika/IP
- Różne limity dla różnych endpointów
- Rozproszony (działa na wielu serwerach)
- Niska latencja
- Zwracanie jasnych komunikatów błędów

**Algorytmy Rate Limiting:**

**1. Token Bucket:**

```python
import time
import redis

class TokenBucket:
    def __init__(self, redis_client, capacity, refill_rate):
        self.redis = redis_client
        self.capacity = capacity  # Maksymalna liczba tokenów
        self.refill_rate = refill_rate  # Tokeny na sekundę

    def allow_request(self, user_id):
        key = f'rate_limit:{user_id}'
        now = time.time()

        # Pobierz aktualny stan
        pipe = self.redis.pipeline()
        pipe.hgetall(key)
        result = pipe.execute()[0]

        if not result:
            # Pierwsze żądanie
            tokens = self.capacity - 1
            last_refill = now
        else:
            tokens = float(result[b'tokens'])
            last_refill = float(result[b'last_refill'])

            # Uzupełnij tokeny na podstawie upływu czasu
            elapsed = now - last_refill
            tokens_to_add = elapsed * self.refill_rate
            tokens = min(self.capacity, tokens + tokens_to_add)
            last_refill = now

        # Sprawdź, czy żądanie jest dozwolone
        if tokens >= 1:
            tokens -= 1
            allowed = True
        else:
            allowed = False

        # Zaktualizuj stan
        self.redis.hset(key, mapping={
            'tokens': tokens,
            'last_refill': last_refill
        })
        self.redis.expire(key, 3600)  # Wyczyść po 1 godzinie

        return allowed

# Użycie
limiter = TokenBucket(redis_client, capacity=100, refill_rate=10)  # 10 req/sek
if limiter.allow_request(user_id):
    # Przetwórz żądanie
    pass
else:
    # Zwróć 429 Too Many Requests
    return {'error': 'Rate limit exceeded'}, 429
```

**2. Sliding Window Log:**

```python
import time
import redis

class SlidingWindowLog:
    def __init__(self, redis_client, window_size, max_requests):
        self.redis = redis_client
        self.window_size = window_size  # sekundy
        self.max_requests = max_requests

    def allow_request(self, user_id):
        key = f'rate_limit:log:{user_id}'
        now = time.time()
        window_start = now - self.window_size

        # Usuń stare wpisy
        self.redis.zremrangebyscore(key, 0, window_start)

        # Policz żądania w aktualnym oknie
        request_count = self.redis.zcard(key)

        if request_count < self.max_requests:
            # Dodaj aktualne żądanie
            self.redis.zadd(key, {str(now): now})
            self.redis.expire(key, self.window_size)
            return True
        else:
            return False

# Użycie: 100 żądań na minutę
limiter = SlidingWindowLog(redis_client, window_size=60, max_requests=100)
```

**3. Sliding Window Counter (Oszczędny pamięciowo):**

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

        # Pobierz liczniki
        current_count = int(self.redis.get(current_key) or 0)
        previous_count = int(self.redis.get(previous_key) or 0)

        # Oblicz wagę dla poprzedniego okna
        elapsed_time_in_window = now % self.window_size
        previous_weight = 1 - (elapsed_time_in_window / self.window_size)

        # Ważona liczba
        weighted_count = (previous_count * previous_weight) + current_count

        if weighted_count < self.max_requests:
            # Zwiększ licznik aktualnego okna
            pipe = self.redis.pipeline()
            pipe.incr(current_key)
            pipe.expire(current_key, self.window_size * 2)
            pipe.execute()
            return True
        else:
            return False

# Użycie: 1000 żądań na godzinę
limiter = SlidingWindowCounter(redis_client, window_size=3600, max_requests=1000)
```

**Integracja Middleware Flask:**

```python
from flask import Flask, request, jsonify
from functools import wraps

app = Flask(__name__)

def rate_limit(max_requests=100, window=60):
    """
    Dekorator do ograniczania liczby żądań dla endpointów
    max_requests: liczba dozwolonych żądań
    window: okno czasowe w sekundach
    """
    def decorator(f):
        @wraps(f)
        def wrapped(*args, **kwargs):
            # Pobierz identyfikator użytkownika (IP lub user_id)
            user_id = request.headers.get('X-User-ID') or request.remote_addr

            # Sprawdź rate limit
            limiter = SlidingWindowCounter(redis_client, window, max_requests)
            if not limiter.allow_request(user_id):
                # Pobierz czas retry-after
                retry_after = calculate_retry_after(user_id, window)

                return jsonify({
                    'error': 'Rate limit exceeded',
                    'retry_after': retry_after
                }), 429, {'Retry-After': str(retry_after)}

            return f(*args, **kwargs)
        return wrapped
    return decorator

@app.route('/api/search')
@rate_limit(max_requests=10, window=60)  # 10 żądań na minutę
def search():
    query = request.args.get('q')
    results = perform_search(query)
    return jsonify(results)

@app.route('/api/expensive-operation')
@rate_limit(max_requests=1, window=10)  # 1 żądanie na 10 sekund
def expensive_operation():
    result = perform_expensive_operation()
    return jsonify(result)
```

**Rozproszony Rate Limiting (Skrypt Lua Redis):**

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
# Załaduj skrypt Lua
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

**Zaawansowane Funkcje:**

**1. Wielopoziomowe Rate Limity:**
```python
RATE_LIMITS = {
    'free': {'requests': 100, 'window': 3600},     # 100/godzinę
    'basic': {'requests': 1000, 'window': 3600},   # 1000/godzinę
    'premium': {'requests': 10000, 'window': 3600} # 10000/godzinę
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

**2. Nagłówki Rate Limit:**
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

**3. Dynamiczny Rate Limiting (oparty na obciążeniu systemu):**
```python
def adaptive_rate_limit(user_id):
    # Sprawdź obciążenie systemu
    cpu_usage = get_cpu_usage()
    memory_usage = get_memory_usage()

    # Dostosuj limity na podstawie obciążenia
    if cpu_usage > 80 or memory_usage > 80:
        max_requests = 50  # Zmniejsz limit
    else:
        max_requests = 100  # Normalny limit

    limiter = TokenBucket(redis_client, capacity=max_requests, refill_rate=10)
    return limiter.allow_request(user_id)
```

**Porównanie Algorytmów:**

| Algorytm | Pamięć | Dokładność | Rozproszony | Złożoność |
|----------|--------|------------|-------------|-----------|
| **Token Bucket** | Niska | Dobra | Tak (Redis) | Niska |
| **Sliding Window Log** | Wysoka | Dokładna | Tak | Średnia |
| **Sliding Window Counter** | Niska | Przybliżona | Tak | Niska |
| **Fixed Window** | Niska | Słaba (burst) | Tak | Bardzo Niska |

**Najlepsze Praktyki:**
- Użyj Redis dla rozproszonego rate limiting
- Zwracaj jasne komunikaty błędów (status 429)
- Dołączaj nagłówek Retry-After
- Implementuj graceful degradation
- Monitoruj metryki rate limit
- Rozważ różne limity dla różnych endpointów
- Allow-lista dla zaufanych IP/użytkowników
