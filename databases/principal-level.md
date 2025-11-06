# Databases - Principal-Level Questions

## 1. Design Distributed Database with Consensus

**Question**: Design a distributed database ensuring consistency across nodes using consensus algorithms.

**Answer**:

**Consensus Algorithms:**

**Raft Consensus:**
```
1. Leader election
2. Log replication
3. Safety guarantees
```

**Write Process:**
```
Client → Leader → Replicate to majority → Commit → Respond to client
```

**Key Properties:**
- Strong consistency
- Fault tolerance (tolerates f failures in 2f+1 nodes)
- Leader-based (simpler than Paxos)

**Trade-offs:**
- Latency: Requires majority acknowledgment
- Availability: Can't write during partition without majority
- CAP theorem: Choose CP (consistency + partition tolerance)
