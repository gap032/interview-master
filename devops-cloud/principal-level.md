# DevOps & Cloud - Principal-Level Questions

## 1. Design Multi-Region Active-Active Architecture

**Question**: Design a globally distributed, active-active system with disaster recovery.

**Answer**:

**Architecture:**
```
Global:
├── Route 53 (Geolocation routing)
├── CloudFront (Global CDN)
│
├── US-East Region (Primary)
│   ├── EKS Cluster
│   ├── Aurora Global Database (Primary)
│   └── DynamoDB Global Table
│
└── EU-West Region (Secondary/Active)
    ├── EKS Cluster
    ├── Aurora Global Database (Read Replica, promotable)
    └── DynamoDB Global Table
```

**Key Considerations:**
- Data replication lag
- Conflict resolution (last-write-wins, CRDT)
- Regional failover automation
- Cost optimization
