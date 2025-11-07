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
