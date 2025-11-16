# System Design - Principal-Level Questions

## 1. Design Global Content Delivery Network (CDN)

**Question**: Design a CDN serving petabytes of content to billions of users globally with 99.99% availability.

**Answer**:

**Architecture Layers:**
```
[Origin Servers]
     ↓
[Edge Locations] (1000+ worldwide)
     ↓
[ISP Caches]
     ↓
[End Users]
```

**Key Design Decisions:**

**1. Cache Invalidation:**
```
- TTL-based expiration
- Purge API for immediate invalidation
- Versioned URLs (cache busting)
```

**2. Routing Strategy:**
- Anycast IP: Route to nearest edge
- GeoDNS: DNS-based routing
- Load-based routing

**3. Cache Coherency:**
- Eventual consistency acceptable
- Invalidation propagation via pub/sub
- Cache keys include version/hash

**Key Points:**
- Edge locations near users (<50ms latency)
- Cache hit ratio >90% target
- Multi-tier caching (memory → SSD → origin)
- DDoS protection at edge

---

## 2. Design Distributed Database (Spanner-like)

**Question**: Design a globally distributed database with ACID transactions and external consistency.

**Answer**:

**Consensus & Replication:**
- Paxos/Raft for consensus
- Multi-region replication
- Synchronous replication for strong consistency

**Time Synchronization:**
- TrueTime API (GPS + atomic clocks)
- Uncertainty bounds for ordering

**Sharding Strategy:**
- Range-based sharding
- Automatic rebalancing
- Split/merge based on load

**Transaction Protocol:**
```
1. Two-phase commit
2. Timestamp assignment using TrueTime
3. Wait for uncertainty to ensure external consistency
4. Commit across shards
```

**Key Points:**
- CAP: Choose CP (consistency + partition tolerance)
- Global ordering via synchronized clocks
- Automatic sharding and rebalancing
- Multi-version concurrency control (MVCC)

---

## 3. Design Real-Time Analytics Platform

**Question**: Design a real-time analytics platform processing billions of events per day with sub-second query latency.

**Answer**:

**Architecture:**

```
[Event Sources]
  Mobile Apps
  Web Apps
  IoT Devices
  Third-party APIs
       │
       ↓
[Ingestion Layer]
  Kafka (partitioned by user_id)
  - 1000 partitions
  - Replication factor: 3
  - Retention: 7 days
       │
       ├─────────────────┬─────────────────┐
       ↓                 ↓                 ↓
[Stream Processing]  [Batch Processing]  [Cold Storage]
  Apache Flink       Apache Spark         S3/Glacier
  - Real-time        - Hourly jobs        - Long-term
  - Aggregations     - Complex analytics   - Compliance
       │                  │
       ↓                  ↓
[Serving Layer]
  ClickHouse (Real-time queries)
  Druid (Pre-aggregated OLAP)
  Redis (Hot data cache)
       │
       ↓
[Query API]
  GraphQL/REST
  Query optimizer
  Rate limiting
```

**Data Flow:**

**1. Event Ingestion:**
```python
# High-throughput event ingestion
from kafka import KafkaProducer
import json

producer = KafkaProducer(
    bootstrap_servers=['kafka1:9092', 'kafka2:9092'],
    value_serializer=lambda v: json.dumps(v).encode('utf-8'),
    compression_type='lz4',
    linger_ms=10,  # Batch for throughput
    batch_size=32768,
    acks='all'  # Durability
)

def ingest_event(event):
    # Partition by user_id for ordering guarantees
    key = event['user_id'].encode('utf-8')
    producer.send(
        topic='user_events',
        key=key,
        value=event
    )
```

**2. Stream Processing (Flink):**
```java
// Real-time aggregations
StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();

DataStream<Event> events = env
    .addSource(new FlinkKafkaConsumer<>("user_events", new EventSchema(), properties));

// Windowed aggregation (1-minute tumbling windows)
events
    .keyBy(Event::getUserId)
    .window(TumblingEventTimeWindows.of(Time.minutes(1)))
    .aggregate(new EventAggregator())
    .addSink(new ClickHouseSink());

// Session windows (detect user sessions)
events
    .keyBy(Event::getUserId)
    .window(EventTimeSessionWindows.withGap(Time.minutes(30)))
    .process(new SessionAnalyzer())
    .addSink(new RedisSink());
```

**3. OLAP Storage (ClickHouse):**
```sql
-- Optimized for analytical queries
CREATE TABLE events (
    event_id UUID,
    user_id String,
    event_type LowCardinality(String),
    timestamp DateTime,
    properties String, -- JSON
    country LowCardinality(String),
    platform LowCardinality(String)
)
ENGINE = MergeTree()
PARTITION BY toYYYYMM(timestamp)
ORDER BY (user_id, timestamp)
SETTINGS index_granularity = 8192;

-- Materialized view for pre-aggregation
CREATE MATERIALIZED VIEW events_by_hour
ENGINE = SummingMergeTree()
PARTITION BY toYYYYMM(hour)
ORDER BY (event_type, country, hour)
AS SELECT
    toStartOfHour(timestamp) AS hour,
    event_type,
    country,
    count() AS event_count,
    uniq(user_id) AS unique_users
FROM events
GROUP BY hour, event_type, country;
```

**4. Query Layer:**
```python
from fastapi import FastAPI, Query
from typing import List, Optional
import clickhouse_driver

app = FastAPI()
ch_client = clickhouse_driver.Client(host='clickhouse')

@app.get("/analytics/events")
async def get_events(
    event_type: Optional[str] = None,
    start_time: datetime = Query(...),
    end_time: datetime = Query(...),
    group_by: List[str] = Query(default=['hour'])
):
    # Query optimization
    if (end_time - start_time) > timedelta(days=30):
        # Use pre-aggregated data for long ranges
        table = "events_by_hour"
    else:
        # Use raw data for recent/detailed queries
        table = "events"

    # Build dynamic query with parameterization
    query = f"""
        SELECT
            {', '.join(group_by)},
            count() AS count,
            uniqExact(user_id) AS unique_users
        FROM {table}
        WHERE timestamp BETWEEN %(start)s AND %(end)s
    """

    if event_type:
        query += " AND event_type = %(event_type)s"

    query += f" GROUP BY {', '.join(group_by)}"

    result = ch_client.execute(
        query,
        {'start': start_time, 'end': end_time, 'event_type': event_type}
    )

    return result
```

**Scaling Considerations:**

**1. Data Partitioning:**
- Time-based partitioning (monthly)
- Drop old partitions efficiently
- Query pruning based on partition

**2. Caching Strategy:**
```python
# Multi-tier caching
class AnalyticsCache:
    def __init__(self):
        self.l1_cache = {}  # In-memory (recent queries)
        self.l2_cache = Redis()  # Distributed (popular queries)

    async def get_or_compute(self, query_key, query_fn):
        # L1 cache
        if query_key in self.l1_cache:
            return self.l1_cache[query_key]

        # L2 cache
        cached = await self.l2_cache.get(query_key)
        if cached:
            self.l1_cache[query_key] = cached
            return cached

        # Compute
        result = await query_fn()

        # Cache based on query timerange
        ttl = self.calculate_ttl(query_key)
        await self.l2_cache.setex(query_key, ttl, result)

        return result
```

**3. Query Optimization:**
- Pre-aggregate common queries
- Partition pruning
- Sampling for exploratory queries
- Query result caching
- Approximate algorithms (HyperLogLog for distinct counts)

**Performance Targets:**
- Ingestion: 1M events/second
- Query latency: P95 < 500ms
- Data freshness: < 5 seconds
- Storage efficiency: 10:1 compression ratio

---

## 4. Design Video Streaming Platform (YouTube/Netflix scale)

**Question**: Design a video streaming platform serving millions of concurrent users globally with adaptive bitrate streaming.

**Answer**:

**Architecture:**

```
[Content Pipeline]
  Upload → Transcode → Store → CDN
     │         │         │       │
     │    ┌────┴─────────┴───┐   │
     │    │  Video Processing │   │
     │    └──────────────────┘   │
     │                            │
     ↓                            ↓
[Metadata DB]              [CDN Edge Nodes]
 - Video info              - Global distribution
 - User data               - Edge caching
 - Recommendations         - Adaptive delivery
                                 │
                                 ↓
                           [End Users]
                           - Adaptive bitrate
                           - Offline download
```

**Content Upload & Processing:**

```python
# Upload workflow
class VideoUploadService:
    async def upload_video(self, file, metadata):
        # 1. Upload to S3
        video_id = generate_uuid()
        s3_key = f"raw/{video_id}/original.mp4"

        await self.s3.upload_fileobj(
            file,
            bucket='video-uploads',
            key=s3_key,
            ExtraArgs={
                'ServerSideEncryption': 'AES256',
                'StorageClass': 'INTELLIGENT_TIERING'
            }
        )

        # 2. Trigger transcoding pipeline
        await self.sqs.send_message(
            QueueUrl='transcoding-queue',
            MessageBody=json.dumps({
                'video_id': video_id,
                's3_key': s3_key,
                'metadata': metadata
            })
        )

        # 3. Store metadata
        await self.db.insert_video({
            'id': video_id,
            'status': 'processing',
            'uploaded_at': datetime.now(),
            **metadata
        })

        return video_id

# Transcoding (FFmpeg-based)
class TranscodingWorker:
    PROFILES = {
        '4k': {'width': 3840, 'height': 2160, 'bitrate': '15M'},
        '1080p': {'width': 1920, 'height': 1080, 'bitrate': '5M'},
        '720p': {'width': 1280, 'height': 720, 'bitrate': '2.5M'},
        '480p': {'width': 854, 'height': 480, 'bitrate': '1M'},
        '360p': {'width': 640, 'height': 360, 'bitrate': '500K'}
    }

    async def process_video(self, video_id, s3_key):
        # Download from S3
        local_path = f"/tmp/{video_id}.mp4"
        await self.s3.download_file('video-uploads', s3_key, local_path)

        # Transcode to multiple bitrates (parallel)
        tasks = []
        for profile_name, profile in self.PROFILES.items():
            tasks.append(self.transcode_profile(
                video_id, local_path, profile_name, profile
            ))

        await asyncio.gather(*tasks)

        # Generate HLS manifest
        await self.generate_hls_manifest(video_id)

        # Update metadata
        await self.db.update_video(video_id, {
            'status': 'ready',
            'processed_at': datetime.now()
        })

    async def transcode_profile(self, video_id, input_path, profile_name, profile):
        output_path = f"/tmp/{video_id}_{profile_name}.mp4"

        # FFmpeg command
        cmd = [
            'ffmpeg', '-i', input_path,
            '-vf', f"scale={profile['width']}:{profile['height']}",
            '-b:v', profile['bitrate'],
            '-c:v', 'libx264',
            '-preset', 'fast',
            '-c:a', 'aac',
            '-b:a', '128k',
            output_path
        ]

        subprocess.run(cmd, check=True)

        # Upload to S3
        s3_key = f"processed/{video_id}/{profile_name}.mp4"
        await self.s3.upload_file(
            output_path,
            'video-content',
            s3_key
        )

        # Generate thumbnail
        await self.generate_thumbnail(input_path, video_id, profile_name)
```

**HLS Adaptive Streaming:**

```m3u8
# Master playlist (adaptive bitrate)
#EXTM3U
#EXT-X-VERSION:3

#EXT-X-STREAM-INF:BANDWIDTH=15000000,RESOLUTION=3840x2160
4k/index.m3u8

#EXT-X-STREAM-INF:BANDWIDTH=5000000,RESOLUTION=1920x1080
1080p/index.m3u8

#EXT-X-STREAM-INF:BANDWIDTH=2500000,RESOLUTION=1280x720
720p/index.m3u8

#EXT-X-STREAM-INF:BANDWIDTH=1000000,RESOLUTION=854x480
480p/index.m3u8

#EXT-X-STREAM-INF:BANDWIDTH=500000,RESOLUTION=640x360
360p/index.m3u8
```

**CDN Configuration:**

```yaml
# CloudFront distribution
Type: AWS::CloudFront::Distribution
Properties:
  DistributionConfig:
    Enabled: true
    Origins:
      - Id: S3Origin
        DomainName: video-content.s3.amazonaws.com
        S3OriginConfig:
          OriginAccessIdentity: !Ref OriginAccessIdentity

    DefaultCacheBehavior:
      TargetOriginId: S3Origin
      ViewerProtocolPolicy: redirect-to-https
      AllowedMethods: [GET, HEAD, OPTIONS]
      CachedMethods: [GET, HEAD]
      Compress: true

      # Cache optimization
      MinTTL: 0
      DefaultTTL: 86400  # 24 hours
      MaxTTL: 31536000  # 1 year

      ForwardedValues:
        QueryString: false
        Cookies:
          Forward: none

    # Edge locations
    PriceClass: PriceClass_All  # Global distribution

    # Geographic restrictions
    Restrictions:
      GeoRestriction:
        RestrictionType: none
```

**Video Player (Client-side):**

```javascript
// HLS.js for adaptive streaming
import Hls from 'hls.js';

class VideoPlayer {
  constructor(videoElement) {
    this.video = videoElement;
    this.hls = new Hls({
      // Adaptive bitrate configuration
      startLevel: -1,  // Auto-detect initial quality
      maxBufferLength: 30,  // seconds
      maxMaxBufferLength: 600,
      enableWorker: true,
      lowLatencyMode: false
    });

    this.setupAnalytics();
  }

  loadVideo(manifestUrl) {
    if (Hls.isSupported()) {
      this.hls.loadSource(manifestUrl);
      this.hls.attachMedia(this.video);

      this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
        this.video.play();
      });

      // Quality switching
      this.hls.on(Hls.Events.LEVEL_SWITCHED, (event, data) => {
        const level = this.hls.levels[data.level];
        console.log(`Switched to ${level.height}p`);
        this.trackQualityChange(level);
      });

      // Error handling
      this.hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          this.handleFatalError(data);
        }
      });
    }
  }

  setupAnalytics() {
    // Track playback metrics
    this.video.addEventListener('play', () => {
      this.analytics.track('video_play', {
        video_id: this.videoId,
        timestamp: Date.now()
      });
    });

    // Buffer events
    this.video.addEventListener('waiting', () => {
      this.bufferStart = Date.now();
    });

    this.video.addEventListener('playing', () => {
      if (this.bufferStart) {
        const bufferDuration = Date.now() - this.bufferStart;
        this.analytics.track('buffering', {
          duration: bufferDuration,
          position: this.video.currentTime
        });
      }
    });
  }
}
```

**Recommendation System:**

```python
# Collaborative filtering + content-based
class RecommendationEngine:
    def __init__(self):
        self.model = load_trained_model()

    async def get_recommendations(self, user_id, limit=20):
        # Get user history
        user_history = await self.db.get_user_watch_history(user_id)

        # Collaborative filtering
        similar_users = await self.find_similar_users(user_id)
        collab_recs = await self.get_collaborative_recommendations(
            user_id, similar_users
        )

        # Content-based
        content_recs = await self.get_content_based_recommendations(
            user_history
        )

        # Hybrid ranking
        recommendations = self.merge_and_rank(
            collab_recs,
            content_recs,
            user_preferences=await self.get_user_preferences(user_id)
        )

        return recommendations[:limit]

    async def find_similar_users(self, user_id):
        # Use cosine similarity on watch history vectors
        user_vector = await self.vectorize_user(user_id)

        # Query vector database (Faiss/Milvus)
        similar_users = await self.vector_db.search(
            user_vector,
            limit=100,
            metric='cosine'
        )

        return similar_users
```

**Database Schema:**

```sql
-- Video metadata
CREATE TABLE videos (
    id UUID PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    uploader_id UUID REFERENCES users(id),
    duration INTERVAL,
    upload_date TIMESTAMP DEFAULT NOW(),
    view_count BIGINT DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    status VARCHAR(20), -- processing, ready, failed

    -- Sharding key
    shard_key VARCHAR(10) GENERATED ALWAYS AS (substring(id::text, 1, 2)) STORED,

    INDEX idx_uploader (uploader_id),
    INDEX idx_upload_date (upload_date DESC),
    INDEX idx_view_count (view_count DESC)
) PARTITION BY LIST (shard_key);

-- Watch history (time-series)
CREATE TABLE watch_history (
    user_id UUID,
    video_id UUID,
    watched_at TIMESTAMP,
    watch_duration INTERVAL,
    quality VARCHAR(10),

    PRIMARY KEY (user_id, watched_at)
) PARTITION BY RANGE (watched_at);

-- Comments (denormalized)
CREATE TABLE comments (
    id UUID PRIMARY KEY,
    video_id UUID,
    user_id UUID,
    content TEXT,
    created_at TIMESTAMP,
    like_count INTEGER DEFAULT 0,

    INDEX idx_video_created (video_id, created_at DESC)
);
```

**Scaling Considerations:**

**1. Storage:**
- S3 for video content (petabytes)
- Intelligent tiering (hot/warm/cold)
- CloudFront for global distribution
- Regional caching

**2. Database:**
- Sharded by video_id (consistent hashing)
- Read replicas for popular content
- Caching layer (Redis) for metadata
- Time-series DB for analytics

**3. Transcoding:**
- Distributed workers (Kubernetes)
- Auto-scaling based on queue depth
- Priority queues (premium users)
- GPU instances for faster encoding

**4. Cost Optimization:**
- Adaptive storage (frequently accessed = S3, rarely = Glacier)
- CDN cost optimization (regional vs. global)
- Spot instances for transcoding
- Compression optimization

**Performance Targets:**
- Video start time: < 2 seconds
- Buffering ratio: < 0.5%
- CDN cache hit ratio: > 95%
- Transcoding time: < 2x video duration

---

## 5. Design Global Search Engine (Google-scale)

**Question**: Design a web search engine indexing billions of pages with sub-second query latency.

**Answer**:

**Architecture:**

```
[Crawling]          [Indexing]           [Query Processing]
    │                   │                        │
    ↓                   ↓                        ↓
┌─────────┐      ┌──────────┐           ┌──────────────┐
│ Crawler │ →    │ Inverted │     ←─    │ Query Parser │
│ Fleet   │      │  Index   │           │  & Ranker    │
└─────────┘      └──────────┘           └──────────────┘
    │                   │                        │
    ↓                   ↓                        ↓
[URL Queue]      [Index Shards]          [Result Cache]
                 [Page Rank]             [Serving Layer]
```

**1. Web Crawling:**

```python
from urllib.parse import urljoin, urlparse
import aiohttp
import asyncio
from bs4 import BeautifulSoup

class DistributedCrawler:
    def __init__(self, crawler_id):
        self.crawler_id = crawler_id
        self.rate_limiter = RateLimiter()
        self.url_frontier = URLFrontier()
        self.visited = BloomFilter(capacity=1_000_000_000)

    async def crawl(self):
        while True:
            # Get batch of URLs from distributed queue
            urls = await self.url_frontier.get_batch(
                crawler_id=self.crawler_id,
                batch_size=100
            )

            # Crawl in parallel
            tasks = [self.crawl_url(url) for url in urls]
            await asyncio.gather(*tasks, return_exceptions=True)

    async def crawl_url(self, url):
        # Politeness policy (rate limiting per domain)
        domain = urlparse(url).netloc
        await self.rate_limiter.wait(domain)

        # Check robots.txt
        if not await self.is_allowed(url):
            return

        # Fetch page
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(url, timeout=10) as response:
                    if response.status != 200:
                        return

                    content = await response.text()
                    content_type = response.headers.get('Content-Type', '')

                    if 'text/html' not in content_type:
                        return
        except Exception as e:
            await self.log_error(url, e)
            return

        # Parse and extract
        soup = BeautifulSoup(content, 'html.parser')

        # Extract links
        links = self.extract_links(soup, url)
        new_links = [link for link in links if not self.visited.contains(link)]

        # Add to frontier
        await self.url_frontier.add_urls(new_links)

        # Extract content
        document = {
            'url': url,
            'title': soup.title.string if soup.title else '',
            'content': soup.get_text(),
            'links': links,
            'crawled_at': datetime.now()
        }

        # Send to indexing pipeline
        await self.kafka.send('crawled_documents', document)

        # Mark as visited
        self.visited.add(url)

    def extract_links(self, soup, base_url):
        links = []
        for anchor in soup.find_all('a', href=True):
            link = urljoin(base_url, anchor['href'])
            if self.is_valid_url(link):
                links.append(link)
        return links

# URL Frontier (priority queue)
class URLFrontier:
    """
    Sharded priority queue:
    - Front queues (high priority, e.g., news sites)
    - Back queues (low priority)
    - Politeness queues (one queue per domain)
    """

    async def get_batch(self, crawler_id, batch_size):
        # Get URLs from assigned shard
        shard = crawler_id % NUM_SHARDS

        urls = await self.redis.zrange(
            f'url_frontier:shard:{shard}',
            0, batch_size - 1
        )

        # Remove from queue
        await self.redis.zrem(f'url_frontier:shard:{shard}', *urls)

        return urls

    async def add_urls(self, urls):
        # Calculate priority (based on PageRank, freshness, etc.)
        for url in urls:
            priority = await self.calculate_priority(url)
            shard = hash(urlparse(url).netloc) % NUM_SHARDS

            await self.redis.zadd(
                f'url_frontier:shard:{shard}',
                {url: priority}
            )
```

**2. Inverted Index:**

```python
# Document indexing
class Indexer:
    def __init__(self):
        self.index_shards = [IndexShard(i) for i in range(NUM_SHARDS)]

    async def index_document(self, doc):
        # Tokenization and normalization
        tokens = self.tokenize(doc['content'])

        # Term frequency
        term_freq = Counter(tokens)

        # For each term, update inverted index
        for term, freq in term_freq.items():
            # Shard by term (consistent hashing)
            shard = self.get_shard(term)

            await shard.add_posting(
                term=term,
                doc_id=doc['id'],
                frequency=freq,
                positions=self.find_positions(tokens, term),
                metadata={
                    'url': doc['url'],
                    'title': doc['title']
                }
            )

    def tokenize(self, text):
        # Lowercase, remove punctuation
        text = text.lower()
        text = re.sub(r'[^\w\s]', ' ', text)

        # Tokenize
        tokens = text.split()

        # Stemming
        stemmer = PorterStemmer()
        tokens = [stemmer.stem(token) for token in tokens]

        # Remove stop words
        tokens = [t for t in tokens if t not in STOP_WORDS]

        return tokens

# Inverted index structure
class IndexShard:
    """
    Inverted Index:
    term -> [(doc_id, term_frequency, positions), ...]

    Stored in sorted order by doc_id for efficient merging
    """

    async def add_posting(self, term, doc_id, frequency, positions, metadata):
        # Get existing postings list
        postings = await self.get_postings(term)

        # Add new posting
        postings.append({
            'doc_id': doc_id,
            'tf': frequency,
            'positions': positions,
            'metadata': metadata
        })

        # Store updated postings list
        await self.store_postings(term, postings)

    async def search(self, term):
        # Retrieve postings list for term
        postings = await self.get_postings(term)

        # Calculate TF-IDF scores
        idf = math.log(TOTAL_DOCS / len(postings))

        scored_docs = []
        for posting in postings:
            tf = 1 + math.log(posting['tf'])
            score = tf * idf

            scored_docs.append({
                'doc_id': posting['doc_id'],
                'score': score,
                'metadata': posting['metadata']
            })

        return scored_docs
```

**3. PageRank Calculation:**

```python
# Simplified PageRank
class PageRankCalculator:
    def __init__(self, damping_factor=0.85):
        self.d = damping_factor

    def calculate(self, graph, iterations=20):
        """
        graph: {url: [outgoing_links]}
        """
        N = len(graph)
        pagerank = {url: 1/N for url in graph}

        for _ in range(iterations):
            new_pagerank = {}

            for url in graph:
                # Damping factor component
                rank = (1 - self.d) / N

                # Sum of incoming links' contributions
                for incoming_url, outgoing_links in graph.items():
                    if url in outgoing_links:
                        num_outgoing = len(outgoing_links)
                        rank += self.d * (pagerank[incoming_url] / num_outgoing)

                new_pagerank[url] = rank

            pagerank = new_pagerank

        return pagerank
```

**4. Query Processing:**

```python
class SearchEngine:
    def __init__(self):
        self.index_shards = [IndexShard(i) for i in range(NUM_SHARDS)]
        self.pagerank = PageRankStore()
        self.cache = Redis()

    async def search(self, query, limit=10):
        # Check cache
        cache_key = f"search:{query}"
        cached = await self.cache.get(cache_key)
        if cached:
            return json.loads(cached)

        # Parse query
        terms = self.tokenize(query)

        # Retrieve postings for each term (parallel)
        tasks = [self.get_postings(term) for term in terms]
        postings_lists = await asyncio.gather(*tasks)

        # Merge and rank
        results = self.rank_documents(postings_lists, query)

        # Get top results
        top_results = results[:limit]

        # Fetch snippets
        for result in top_results:
            result['snippet'] = await self.generate_snippet(
                result['doc_id'],
                terms
            )

        # Cache results
        await self.cache.setex(cache_key, 3600, json.dumps(top_results))

        return top_results

    def rank_documents(self, postings_lists, query):
        # Combine signals:
        # 1. TF-IDF score
        # 2. PageRank
        # 3. Freshness
        # 4. Click-through rate
        # 5. Query-document similarity

        doc_scores = defaultdict(float)

        # TF-IDF contribution
        for postings in postings_lists:
            for posting in postings:
                doc_id = posting['doc_id']
                doc_scores[doc_id] += posting['score']

        # Apply PageRank
        for doc_id in doc_scores:
            pagerank_score = self.pagerank.get(doc_id)
            doc_scores[doc_id] *= (1 + pagerank_score)

        # Freshness boost (recent documents)
        for doc_id in doc_scores:
            age_days = self.get_document_age(doc_id)
            freshness_boost = 1 / (1 + age_days / 30)
            doc_scores[doc_id] *= (1 + 0.1 * freshness_boost)

        # Sort by score
        ranked = sorted(
            doc_scores.items(),
            key=lambda x: x[1],
            reverse=True
        )

        return [{'doc_id': doc_id, 'score': score} for doc_id, score in ranked]
```

**5. Scaling:**

```
Crawling:
- 1000 crawler machines
- 100 URLs/second per crawler
- Total: 100,000 URLs/second
- 8.6 billion URLs per day

Indexing:
- 100 index shards
- Each shard handles 1B terms
- Total: 100B terms indexed

Storage:
- Index: 50TB (compressed)
- Documents: 500TB
- Total: ~500TB (with replication: 1.5PB)

Query Serving:
- 10,000 QPS
- P99 latency: < 200ms
- Cache hit rate: 40%
```

**Key Optimizations:**
- Term position indexing (for phrase queries)
- Compression (delta encoding, variable byte encoding)
- Index tiering (hot/warm/cold)
- Query rewriting and spell correction
- Personalization based on user history
- Machine learning ranking (LambdaMART)
