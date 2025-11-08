# System Design - Pytania Poziom Senior

## 1. Design Instagram/Twitter Feed

**Pytanie**: Design a social media feed system that shows posts from users you follow, sorted by time.

**Odpowiedź**:

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

**Pytanie**: Design a video streaming platform supporting millions of concurrent users.

**Odpowiedź**:

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

**Pytanie**: Design a ride-sharing platform matching drivers and riders.

**Odpowiedź**:

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
