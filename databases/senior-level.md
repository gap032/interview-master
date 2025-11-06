# Databases - Senior-Level Questions

## 1. Database Sharding Strategies

**Question**: Design a sharding strategy for a database with billions of rows.

**Answer**:

**Sharding Approaches:**

**1. Range-Based Sharding:**
```python
def get_shard(user_id):
    if user_id < 1_000_000:
        return 'shard_1'
    elif user_id < 2_000_000:
        return 'shard_2'
    else:
        return 'shard_3'
```
- Pros: Simple, good for range queries
- Cons: Unbalanced shards, hotspots

**2. Hash-Based Sharding:**
```python
def get_shard(user_id):
    shard_count = 10
    return f'shard_{hash(user_id) % shard_count}'
```
- Pros: Even distribution
- Cons: Range queries hit all shards

**3. Geographic Sharding:**
```python
def get_shard(user_id):
    location = get_user_location(user_id)
    return f'shard_{location}'  # shard_us, shard_eu, shard_asia
```
- Pros: Data locality, compliance
- Cons: Uneven distribution

**Challenges:**
- Cross-shard queries
- Rebalancing when adding shards
- Distributed transactions
- Schema changes across shards

