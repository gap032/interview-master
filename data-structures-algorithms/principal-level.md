# Data Structures & Algorithms - Principal-Level Questions

## 1. Design a Distributed Rate Limiter

**Difficulty**: Hard

**Question**: Design a distributed rate limiter that can handle millions of requests per second across multiple servers. Discuss trade-offs between different algorithms (token bucket, leaky bucket, sliding window) and how to handle distributed synchronization.

**Answer**:

A distributed rate limiter must coordinate across multiple servers while maintaining high performance and accuracy.

**Algorithms Overview:**

**1. Token Bucket Algorithm**

```python
import time
import redis
from typing import Optional

class TokenBucketRateLimiter:
    """
    Token bucket: tokens added at fixed rate, consumed per request
    Allows bursts up to bucket capacity
    """

    def __init__(self, redis_client, rate: float, capacity: int):
        """
        rate: tokens per second
        capacity: max tokens in bucket
        """
        self.redis = redis_client
        self.rate = rate
        self.capacity = capacity

    def _get_key(self, user_id: str) -> str:
        return f"rate_limit:token_bucket:{user_id}"

    def allow_request(self, user_id: str) -> bool:
        """
        Check if request is allowed
        Time: O(1), Space: O(1)
        """
        key = self._get_key(user_id)
        now = time.time()

        # Lua script for atomic operation
        lua_script = """
        local key = KEYS[1]
        local capacity = tonumber(ARGV[1])
        local rate = tonumber(ARGV[2])
        local now = tonumber(ARGV[3])
        local requested = tonumber(ARGV[4])

        local bucket = redis.call('HMGET', key, 'tokens', 'last_update')
        local tokens = tonumber(bucket[1]) or capacity
        local last_update = tonumber(bucket[2]) or now

        -- Add tokens based on time elapsed
        local elapsed = now - last_update
        tokens = math.min(capacity, tokens + elapsed * rate)

        -- Check if enough tokens
        if tokens >= requested then
            tokens = tokens - requested
            redis.call('HMSET', key, 'tokens', tokens, 'last_update', now)
            redis.call('EXPIRE', key, 300)  -- 5 min TTL
            return 1
        else
            redis.call('HMSET', key, 'tokens', tokens, 'last_update', now)
            redis.call('EXPIRE', key, 300)
            return 0
        end
        """

        result = self.redis.eval(
            lua_script,
            1,  # number of keys
            key,
            self.capacity,
            self.rate,
            now,
            1  # tokens requested
        )

        return bool(result)

    def get_retry_after(self, user_id: str) -> Optional[float]:
        """Get seconds until next token available"""
        key = self._get_key(user_id)
        bucket = self.redis.hmget(key, 'tokens', 'last_update')

        if not bucket[0]:
            return 0

        tokens = float(bucket[0])
        if tokens >= 1:
            return 0

        # Time needed to accumulate 1 token
        return (1 - tokens) / self.rate


# Example usage with Redis cluster
import redis

redis_client = redis.Redis(host='localhost', port=6379, decode_responses=True)
rate_limiter = TokenBucketRateLimiter(redis_client, rate=10, capacity=100)

# Simulate requests
user_id = "user_123"
for i in range(105):
    allowed = rate_limiter.allow_request(user_id)
    if not allowed:
        retry_after = rate_limiter.get_retry_after(user_id)
        print(f"Request {i}: Rate limited. Retry after {retry_after:.2f}s")
        break
    print(f"Request {i}: Allowed")
```

**2. Sliding Window Log**

```python
import time
from collections import deque

class SlidingWindowRateLimiter:
    """
    Track exact request timestamps within window
    Most accurate but memory intensive
    """

    def __init__(self, redis_client, max_requests: int, window_seconds: int):
        self.redis = redis_client
        self.max_requests = max_requests
        self.window = window_seconds

    def allow_request(self, user_id: str) -> bool:
        """
        Time: O(N) where N is number of requests in window
        Space: O(N)
        """
        key = f"rate_limit:sliding_window:{user_id}"
        now = time.time()
        window_start = now - self.window

        lua_script = """
        local key = KEYS[1]
        local now = tonumber(ARGV[1])
        local window_start = tonumber(ARGV[2])
        local max_requests = tonumber(ARGV[3])

        -- Remove old entries
        redis.call('ZREMRANGEBYSCORE', key, '-inf', window_start)

        -- Count current requests
        local current_requests = redis.call('ZCARD', key)

        if current_requests < max_requests then
            redis.call('ZADD', key, now, now)
            redis.call('EXPIRE', key, 300)
            return 1
        else
            return 0
        end
        """

        result = self.redis.eval(
            lua_script,
            1,
            key,
            now,
            window_start,
            self.max_requests
        )

        return bool(result)


class SlidingWindowCounterRateLimiter:
    """
    Hybrid: divide window into smaller buckets
    More memory efficient than log, more accurate than fixed window
    """

    def __init__(self, redis_client, max_requests: int, window_seconds: int, num_buckets: int = 10):
        self.redis = redis_client
        self.max_requests = max_requests
        self.window = window_seconds
        self.num_buckets = num_buckets
        self.bucket_size = window_seconds / num_buckets

    def allow_request(self, user_id: str) -> bool:
        """
        Time: O(B) where B is number of buckets
        Space: O(B)
        """
        key = f"rate_limit:sliding_counter:{user_id}"
        now = time.time()
        current_bucket = int(now / self.bucket_size)
        window_start_bucket = int((now - self.window) / self.bucket_size)

        lua_script = """
        local key = KEYS[1]
        local current_bucket = tonumber(ARGV[1])
        local window_start_bucket = tonumber(ARGV[2])
        local max_requests = tonumber(ARGV[3])

        -- Remove old buckets
        redis.call('HDEL', key, unpack(
            redis.call('HKEYS', key):filter(function(k)
                return tonumber(k) < window_start_bucket
            end)
        ))

        -- Count requests in window
        local total = 0
        for k, v in pairs(redis.call('HGETALL', key)) do
            if tonumber(k) >= window_start_bucket then
                total = total + tonumber(v)
            end
        end

        if total < max_requests then
            redis.call('HINCRBY', key, current_bucket, 1)
            redis.call('EXPIRE', key, 300)
            return 1
        else
            return 0
        end
        """

        result = self.redis.eval(
            lua_script,
            1,
            key,
            current_bucket,
            window_start_bucket,
            self.max_requests
        )

        return bool(result)
```

**3. Distributed Implementation with Consistency**

```python
from typing import List
import hashlib

class DistributedRateLimiter:
    """
    Coordinate rate limiting across multiple Redis nodes
    Handles eventual consistency and synchronization
    """

    def __init__(self, redis_nodes: List[redis.Redis], local_cache_ttl: int = 1):
        self.redis_nodes = redis_nodes
        self.local_cache = {}
        self.local_cache_ttl = local_cache_ttl

    def _get_node(self, user_id: str) -> redis.Redis:
        """Consistent hashing to select Redis node"""
        hash_value = int(hashlib.md5(user_id.encode()).hexdigest(), 16)
        return self.redis_nodes[hash_value % len(self.redis_nodes)]

    def allow_request_with_quota(self, user_id: str, max_requests: int, window: int) -> bool:
        """
        Check quota across distributed system with local cache
        """
        # Check local cache first (reduce Redis load)
        cache_key = f"{user_id}:{max_requests}:{window}"
        now = time.time()

        if cache_key in self.local_cache:
            cached_data, timestamp = self.local_cache[cache_key]
            if now - timestamp < self.local_cache_ttl:
                if cached_data['count'] >= max_requests:
                    return False

        # Check Redis
        node = self._get_node(user_id)

        # Use sliding window counter
        limiter = SlidingWindowCounterRateLimiter(node, max_requests, window)
        allowed = limiter.allow_request(user_id)

        # Update local cache
        if allowed:
            if cache_key in self.local_cache:
                self.local_cache[cache_key][0]['count'] += 1
            else:
                self.local_cache[cache_key] = ({'count': 1}, now)

        return allowed


class AdaptiveRateLimiter:
    """
    Adaptive rate limiter that adjusts limits based on system load
    Implements token bucket with dynamic rate adjustment
    """

    def __init__(self, redis_client, base_rate: float, min_rate: float, max_rate: float):
        self.redis = redis_client
        self.base_rate = base_rate
        self.min_rate = min_rate
        self.max_rate = max_rate
        self.capacity = base_rate * 2

    def adjust_rate(self, system_load: float):
        """
        Adjust rate based on system load (0.0 to 1.0)
        Low load -> higher rate
        High load -> lower rate
        """
        if system_load < 0.5:
            return min(self.max_rate, self.base_rate * (1 + (0.5 - system_load)))
        else:
            return max(self.min_rate, self.base_rate * (1 - (system_load - 0.5)))

    def allow_request(self, user_id: str, system_load: float) -> bool:
        """Rate limit with adaptive rate"""
        current_rate = self.adjust_rate(system_load)
        limiter = TokenBucketRateLimiter(self.redis, current_rate, self.capacity)
        return limiter.allow_request(user_id)
```

**Comparison of Algorithms:**

| Algorithm | Accuracy | Memory | Bursts | Complexity | Use Case |
|-----------|----------|---------|--------|------------|----------|
| Token Bucket | Good | O(1) | Yes | O(1) | General purpose, API gateways |
| Leaky Bucket | Good | O(1) | No | O(1) | Smooth traffic, video streaming |
| Fixed Window | Poor | O(1) | Yes | O(1) | Simple quotas, admin panels |
| Sliding Window Log | Excellent | O(N) | No | O(N) | Strict limits, billing |
| Sliding Window Counter | Good | O(B) | Some | O(B) | Balance of all factors |

**Distributed Challenges & Solutions:**

1. **Race Conditions**:
   - Solution: Lua scripts for atomic operations
   - Alternative: Distributed locks (Redlock)

2. **Clock Skew**:
   - Solution: Logical clocks, NTP synchronization
   - Use TTLs relative to system, not absolute time

3. **Network Partitions**:
   - Solution: Local rate limits as fallback
   - CAP theorem: Choose AP (availability) over C (consistency)

4. **Hot Keys**:
   - Solution: Client-side caching
   - Solution: Key sharding with consistent hashing

**Production Considerations:**

```python
class ProductionRateLimiter:
    """
    Production-ready rate limiter with monitoring and fallback
    """

    def __init__(self, redis_client, fallback_limiter, metrics_client):
        self.redis = redis_client
        self.fallback = fallback_limiter
        self.metrics = metrics_client
        self.circuit_breaker_threshold = 0.5
        self.failure_count = 0
        self.total_requests = 0

    def allow_request(self, user_id: str, limit: int, window: int) -> bool:
        """
        Request with fallback and monitoring
        """
        self.total_requests += 1

        # Circuit breaker: use fallback if Redis is failing
        if self.failure_count / max(self.total_requests, 1) > self.circuit_breaker_threshold:
            self.metrics.increment('rate_limiter.circuit_breaker.open')
            return self.fallback.allow_request(user_id)

        try:
            # Try Redis rate limiter
            limiter = TokenBucketRateLimiter(self.redis, limit / window, limit)
            allowed = limiter.allow_request(user_id)

            # Metrics
            self.metrics.increment('rate_limiter.requests.total')
            if allowed:
                self.metrics.increment('rate_limiter.requests.allowed')
            else:
                self.metrics.increment('rate_limiter.requests.denied')

            return allowed

        except redis.RedisError as e:
            # Fallback to local rate limiter
            self.failure_count += 1
            self.metrics.increment('rate_limiter.redis.error')
            return self.fallback.allow_request(user_id)
```

**Key Points:**
- Token bucket best for general use (allows bursts, O(1))
- Sliding window log most accurate but memory intensive
- Use Lua scripts for atomic operations in Redis
- Implement fallback for Redis failures
- Consider clock skew in distributed systems
- Monitor false positives/negatives
- Client-side caching reduces load on rate limiter

---

## 2. B+ Tree Implementation and Analysis

**Difficulty**: Hard

**Question**: Implement a B+ tree and explain why it's used in database systems instead of binary search trees or hash tables. Discuss the trade-offs and performance characteristics.

**Answer**:

B+ trees are self-balancing tree structures optimized for disk-based storage systems, used extensively in databases and file systems.

**Key Properties:**
- All keys in internal nodes are duplicated in leaves
- All data stored in leaf nodes
- Leaf nodes linked as linked list
- Height is logarithmic: O(log_m n) where m is branching factor

**Implementation:**

```python
from typing import Optional, List, Tuple, Any
import bisect

class BPlusTreeNode:
    def __init__(self, order: int, is_leaf: bool = False):
        self.order = order  # Maximum number of children
        self.is_leaf = is_leaf
        self.keys: List[Any] = []
        self.children: List['BPlusTreeNode'] = []  # For internal nodes
        self.values: List[Any] = []  # For leaf nodes
        self.next: Optional['BPlusTreeNode'] = None  # Leaf node link
        self.parent: Optional['BPlusTreeNode'] = None

    def is_full(self) -> bool:
        return len(self.keys) >= self.order - 1

    def is_underflow(self) -> bool:
        min_keys = (self.order - 1) // 2
        return len(self.keys) < min_keys


class BPlusTree:
    def __init__(self, order: int = 4):
        """
        order: maximum number of children per node
        Typical values: 100-200 for disk-based systems
        """
        self.order = order
        self.root = BPlusTreeNode(order, is_leaf=True)
        self.leaf_head = self.root  # First leaf for range queries

    def search(self, key: Any) -> Optional[Any]:
        """
        Search for key
        Time: O(log_m n) where m is order
        """
        node = self._find_leaf(key)

        try:
            idx = node.keys.index(key)
            return node.values[idx]
        except ValueError:
            return None

    def _find_leaf(self, key: Any) -> BPlusTreeNode:
        """Navigate to leaf node that should contain key"""
        node = self.root

        while not node.is_leaf:
            # Find child to descend to
            idx = bisect.bisect_right(node.keys, key)
            node = node.children[idx]

        return node

    def insert(self, key: Any, value: Any):
        """
        Insert key-value pair
        Time: O(log_m n)
        """
        leaf = self._find_leaf(key)

        # Update if key exists
        if key in leaf.keys:
            idx = leaf.keys.index(key)
            leaf.values[idx] = value
            return

        # Insert into leaf
        idx = bisect.bisect_left(leaf.keys, key)
        leaf.keys.insert(idx, key)
        leaf.values.insert(idx, value)

        # Split if necessary
        if leaf.is_full():
            self._split_leaf(leaf)

    def _split_leaf(self, leaf: BPlusTreeNode):
        """Split a full leaf node"""
        mid = len(leaf.keys) // 2

        # Create new leaf
        new_leaf = BPlusTreeNode(self.order, is_leaf=True)
        new_leaf.keys = leaf.keys[mid:]
        new_leaf.values = leaf.values[mid:]
        new_leaf.parent = leaf.parent

        # Update linked list
        new_leaf.next = leaf.next
        leaf.next = new_leaf

        # Update original leaf
        split_key = leaf.keys[mid]
        leaf.keys = leaf.keys[:mid]
        leaf.values = leaf.values[:mid]

        # Insert into parent
        if leaf.parent is None:
            # Create new root
            new_root = BPlusTreeNode(self.order, is_leaf=False)
            new_root.keys = [split_key]
            new_root.children = [leaf, new_leaf]
            leaf.parent = new_root
            new_leaf.parent = new_root
            self.root = new_root
        else:
            self._insert_into_parent(leaf.parent, split_key, leaf, new_leaf)

    def _split_internal(self, node: BPlusTreeNode):
        """Split a full internal node"""
        mid = len(node.keys) // 2
        split_key = node.keys[mid]

        # Create new internal node
        new_node = BPlusTreeNode(self.order, is_leaf=False)
        new_node.keys = node.keys[mid + 1:]
        new_node.children = node.children[mid + 1:]
        new_node.parent = node.parent

        # Update children's parent pointers
        for child in new_node.children:
            child.parent = new_node

        # Update original node
        node.keys = node.keys[:mid]
        node.children = node.children[:mid + 1]

        # Insert into parent
        if node.parent is None:
            # Create new root
            new_root = BPlusTreeNode(self.order, is_leaf=False)
            new_root.keys = [split_key]
            new_root.children = [node, new_node]
            node.parent = new_root
            new_node.parent = new_root
            self.root = new_root
        else:
            self._insert_into_parent(node.parent, split_key, node, new_node)

    def _insert_into_parent(self, parent: BPlusTreeNode, key: Any, left: BPlusTreeNode, right: BPlusTreeNode):
        """Insert key into parent, with left and right children"""
        idx = bisect.bisect_left(parent.keys, key)
        parent.keys.insert(idx, key)
        parent.children.insert(idx + 1, right)

        if parent.is_full():
            self._split_internal(parent)

    def range_query(self, start_key: Any, end_key: Any) -> List[Tuple[Any, Any]]:
        """
        Return all key-value pairs in range [start_key, end_key]
        Time: O(log_m n + k) where k is number of results
        """
        result = []

        # Find starting leaf
        node = self._find_leaf(start_key)

        # Traverse leaf nodes using linked list
        while node:
            for i, key in enumerate(node.keys):
                if start_key <= key <= end_key:
                    result.append((key, node.values[i]))
                elif key > end_key:
                    return result
            node = node.next

        return result

    def bulk_load(self, sorted_data: List[Tuple[Any, Any]]):
        """
        Efficient bulk loading of sorted data
        Time: O(n) vs O(n log n) for individual inserts
        """
        if not sorted_data:
            return

        # Build leaf level
        leaves = []
        current_leaf = BPlusTreeNode(self.order, is_leaf=True)

        for key, value in sorted_data:
            if len(current_leaf.keys) >= self.order - 1:
                leaves.append(current_leaf)
                next_leaf = BPlusTreeNode(self.order, is_leaf=True)
                current_leaf.next = next_leaf
                current_leaf = next_leaf

            current_leaf.keys.append(key)
            current_leaf.values.append(value)

        leaves.append(current_leaf)
        self.leaf_head = leaves[0]

        # Build internal levels bottom-up
        current_level = leaves

        while len(current_level) > 1:
            next_level = []
            i = 0

            while i < len(current_level):
                parent = BPlusTreeNode(self.order, is_leaf=False)

                # Add children to this parent
                while len(parent.children) < self.order and i < len(current_level):
                    child = current_level[i]
                    child.parent = parent
                    parent.children.append(child)

                    if len(parent.children) > 1:
                        parent.keys.append(child.keys[0])

                    i += 1

                next_level.append(parent)

            current_level = next_level

        self.root = current_level[0]

    def print_tree(self, node=None, level=0):
        """Debug: print tree structure"""
        if node is None:
            node = self.root

        prefix = "  " * level
        node_type = "LEAF" if node.is_leaf else "INTERNAL"
        print(f"{prefix}{node_type}: {node.keys}")

        if not node.is_leaf:
            for child in node.children:
                self.print_tree(child, level + 1)


# Usage and performance demonstration
def demonstrate_bplus_tree():
    # Create B+ tree with order 4 (3 keys max per node)
    tree = BPlusTree(order=4)

    # Insert data
    data = [(10, "ten"), (20, "twenty"), (5, "five"), (6, "six"),
            (12, "twelve"), (30, "thirty"), (7, "seven"), (17, "seventeen")]

    for key, value in data:
        tree.insert(key, value)

    print("Tree structure after insertions:")
    tree.print_tree()

    # Point query
    print(f"\nSearch for key 12: {tree.search(12)}")

    # Range query (efficient due to leaf links)
    print(f"\nRange query [6, 20]: {tree.range_query(6, 20)}")

    # Bulk load demonstration
    tree2 = BPlusTree(order=4)
    sorted_data = [(i, f"value_{i}") for i in range(1, 16)]
    tree2.bulk_load(sorted_data)

    print("\n\nBulk loaded tree:")
    tree2.print_tree()

demonstrate_bplus_tree()
```

**Why B+ Trees in Databases:**

**1. Disk-Optimized Design:**
```
Binary Search Tree:
- Height: O(log₂ n)
- For 1M records: ~20 disk seeks
- Typical disk seek: 5-10ms → 100-200ms total

B+ Tree (order 200):
- Height: O(log₂₀₀ n)
- For 1M records: ~3 disk seeks
- Total: 15-30ms (6-7x faster)
```

**2. Range Query Efficiency:**
```python
# Binary Search Tree: Must traverse tree for each element
def range_query_bst(root, start, end):
    # O(k log n) for k results
    result = []
    for key in range(start, end + 1):
        if value := search_bst(root, key):
            result.append((key, value))
    return result

# B+ Tree: Sequential scan of leaves
def range_query_bplus(tree, start, end):
    # O(log n + k) - much better!
    return tree.range_query(start, end)
```

**Comparison Table:**

| Feature | Hash Table | BST | B-Tree | B+ Tree |
|---------|-----------|-----|--------|---------|
| Point Query | O(1) avg | O(log n) | O(log n) | O(log n) |
| Range Query | O(n) | O(k log n) | O(k log n) | O(log n + k) |
| Ordered Scan | O(n log n) | O(n) | O(n) | O(n) |
| Disk I/Os | Random | Many | Few | Fewest |
| Space Overhead | High | Low | Medium | Medium-High |
| Cache Performance | Poor | Poor | Good | Best |

**Real-World Usage:**

1. **MySQL InnoDB**: B+ tree with order ~1200
2. **PostgreSQL**: B+ tree with order ~300-400
3. **SQLite**: B+ tree (order varies)
4. **MongoDB**: B-tree (simpler than B+)

**Key Points:**
- Optimized for disk I/O: high branching factor = low height
- Leaf-level links enable efficient range queries
- All data in leaves: internal nodes cache-friendly
- Self-balancing ensures O(log n) operations
- Bulk loading is O(n) vs O(n log n) for sequential inserts
- Order of 100-200 typical for databases (matches disk page size)

---

## 3. Advanced Dynamic Programming: Optimal Binary Search Tree

**Difficulty**: Hard

**Question**: Given a sorted array of keys and their access frequencies, construct an Optimal Binary Search Tree that minimizes the expected search cost. Explain the dynamic programming approach and analyze complexity.

**Answer**:

An Optimal BST minimizes weighted path length considering access frequencies, unlike balanced trees which minimize height.

**Problem:**
- Given: keys[1..n] in sorted order, frequencies freq[1..n]
- Build: BST that minimizes Σ(frequency[i] × depth[i])

**Example:**
```
Keys:        [10, 20, 30, 40]
Frequencies: [4,  2,  6,  3]

Optimal BST:
       30 (depth 1, freq 6, cost 6)
      /  \
    20    40 (both depth 2)
   /
 10 (depth 3)

Total cost: 4×3 + 2×2 + 6×1 + 3×2 = 12 + 4 + 6 + 6 = 28
```

**Dynamic Programming Solution:**

```python
import sys
from typing import List, Tuple

class OptimalBST:
    def __init__(self, keys: List[int], frequencies: List[int]):
        self.keys = keys
        self.freq = frequencies
        self.n = len(keys)

        # DP table: cost[i][j] = minimum cost for keys[i..j]
        self.cost = [[0] * self.n for _ in range(self.n)]

        # root[i][j] = root of optimal BST for keys[i..j]
        self.root = [[0] * self.n for _ in range(self.n)]

        # Frequency sum table for optimization
        self.freq_sum = [[0] * self.n for _ in range(self.n)]

    def calculate_optimal_cost(self) -> int:
        """
        Calculate minimum cost using DP
        Time: O(n³), Space: O(n²)
        """
        n = self.n

        # Precompute frequency sums
        for i in range(n):
            self.freq_sum[i][i] = self.freq[i]
            for j in range(i + 1, n):
                self.freq_sum[i][j] = self.freq_sum[i][j-1] + self.freq[j]

        # Base case: single keys
        for i in range(n):
            self.cost[i][i] = self.freq[i]
            self.root[i][i] = i

        # Build up: solve for increasing chain lengths
        for length in range(2, n + 1):  # Chain length
            for i in range(n - length + 1):
                j = i + length - 1
                self.cost[i][j] = sys.maxsize

                # Try each key as root
                for r in range(i, j + 1):
                    # Cost = left subtree + right subtree + sum of frequencies
                    left_cost = self.cost[i][r-1] if r > i else 0
                    right_cost = self.cost[r+1][j] if r < j else 0
                    total = left_cost + right_cost + self.freq_sum[i][j]

                    if total < self.cost[i][j]:
                        self.cost[i][j] = total
                        self.root[i][j] = r

        return self.cost[0][n-1]

    def construct_tree(self) -> 'TreeNode':
        """Build actual tree structure from DP solution"""
        def build(i: int, j: int) -> 'TreeNode':
            if i > j:
                return None

            r = self.root[i][j]
            node = TreeNode(self.keys[r])
            node.left = build(i, r - 1)
            node.right = build(r + 1, j)
            return node

        return build(0, self.n - 1)

    def print_structure(self):
        """Print DP table structure"""
        print("Cost table:")
        for row in self.cost:
            print([c if c > 0 else 0 for c in row])

        print("\nRoot table:")
        for row in self.root:
            print(row)


class OptimalBSTOptimized:
    """
    Optimized version using Knuth's optimization
    Reduces complexity from O(n³) to O(n²)
    """

    def __init__(self, keys: List[int], frequencies: List[int]):
        self.keys = keys
        self.freq = frequencies
        self.n = len(keys)
        self.cost = [[0] * self.n for _ in range(self.n)]
        self.root = [[0] * self.n for _ in range(self.n)]
        self.freq_sum = [[0] * self.n for _ in range(self.n)]

    def calculate_optimal_cost(self) -> int:
        """
        Knuth's optimization: root[i][j-1] ≤ root[i][j] ≤ root[i+1][j]
        This property allows narrowing the search space
        Time: O(n²), Space: O(n²)
        """
        n = self.n

        # Precompute frequency sums
        for i in range(n):
            self.freq_sum[i][i] = self.freq[i]
            for j in range(i + 1, n):
                self.freq_sum[i][j] = self.freq_sum[i][j-1] + self.freq[j]

        # Base case
        for i in range(n):
            self.cost[i][i] = self.freq[i]
            self.root[i][i] = i

        # Fill DP table
        for length in range(2, n + 1):
            for i in range(n - length + 1):
                j = i + length - 1
                self.cost[i][j] = sys.maxsize

                # Knuth's optimization: narrow search range
                start = self.root[i][j-1] if j > i else i
                end = self.root[i+1][j] if i < j else j

                for r in range(start, end + 1):
                    left_cost = self.cost[i][r-1] if r > i else 0
                    right_cost = self.cost[r+1][j] if r < j else 0
                    total = left_cost + right_cost + self.freq_sum[i][j]

                    if total < self.cost[i][j]:
                        self.cost[i][j] = total
                        self.root[i][j] = r

        return self.cost[0][n-1]


class TreeNode:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None

    def print_tree(self, level=0):
        if self.right:
            self.right.print_tree(level + 1)
        print("  " * level + str(self.key))
        if self.left:
            self.left.print_tree(level + 1)


def compare_with_balanced():
    """Compare optimal BST with balanced BST"""
    keys = [10, 20, 30, 40, 50]
    frequencies = [20, 5, 15, 10, 3]  # 10 is accessed most

    print("Keys:", keys)
    print("Frequencies:", frequencies)
    print()

    # Calculate optimal BST
    obst = OptimalBST(keys, frequencies)
    optimal_cost = obst.calculate_optimal_cost()
    optimal_tree = obst.construct_tree()

    print(f"Optimal BST cost: {optimal_cost}")
    print("Optimal BST structure:")
    optimal_tree.print_tree()
    print()

    # Calculate cost for balanced BST (e.g., AVL tree structure)
    # For [10,20,30,40,50], balanced would be: 30 root, 20 and 40 as children
    balanced_cost = (frequencies[0] * 2 +  # 10 at depth 2
                    frequencies[1] * 2 +  # 20 at depth 2
                    frequencies[2] * 1 +  # 30 at depth 1
                    frequencies[3] * 2 +  # 40 at depth 2
                    frequencies[4] * 3)   # 50 at depth 3

    print(f"Balanced BST cost: {balanced_cost}")
    print(f"Savings: {balanced_cost - optimal_cost} ({100*(balanced_cost-optimal_cost)/balanced_cost:.1f}%)")

    # Show why optimal is better
    print("\nAnalysis:")
    print("- Optimal BST places high-frequency keys (10, 30) closer to root")
    print("- Balanced BST ignores frequency, only minimizes height")
    print("- Trade-off: optimal BST may have greater height for low-frequency keys")


def test_performance():
    """Test on larger dataset"""
    import time

    sizes = [10, 20, 50, 100]

    for n in sizes:
        keys = list(range(1, n + 1))
        frequencies = [i for i in range(1, n + 1)]  # Increasing frequencies

        # Test O(n³) version
        obst = OptimalBST(keys[:], frequencies[:])
        start = time.time()
        cost = obst.calculate_optimal_cost()
        time_cubic = time.time() - start

        # Test O(n²) optimized version
        obst_opt = OptimalBSTOptimized(keys[:], frequencies[:])
        start = time.time()
        cost_opt = obst_opt.calculate_optimal_cost()
        time_quadratic = time.time() - start

        print(f"n={n:3d}: O(n³)={time_cubic:.4f}s, O(n²)={time_quadratic:.4f}s, " +
              f"speedup={time_cubic/time_quadratic:.1f}x")

        assert cost == cost_opt, "Costs should match"


# Run demonstrations
print("=" * 60)
print("OPTIMAL BST vs BALANCED BST")
print("=" * 60)
compare_with_balanced()

print("\n" + "=" * 60)
print("PERFORMANCE COMPARISON")
print("=" * 60)
test_performance()
```

**DP Recurrence Relation:**

```
cost[i][j] = min{ cost[i][r-1] + cost[r+1][j] + sum(freq[i..j]) }
             for all r in [i, j]

Base case: cost[i][i] = freq[i]
```

**Complexity Analysis:**

| Approach | Time | Space | Description |
|----------|------|-------|-------------|
| Brute Force | O(4ⁿ) | O(n) | Try all BST structures |
| DP Basic | O(n³) | O(n²) | Try each root for each subproblem |
| Knuth Optimized | O(n²) | O(n²) | Exploit monotonicity property |
| Greedy (wrong) | O(n) | O(1) | Doesn't give optimal solution |

**When to Use Optimal BST:**

✅ **Good For:**
- Static datasets (no insertions/deletions)
- Known access frequencies
- Read-heavy workloads
- Dictionary lookups with skewed distribution

❌ **Not Good For:**
- Dynamic datasets (use AVL, Red-Black instead)
- Unknown or uniform access patterns
- Frequent updates

**Real-World Applications:**

1. **Compilers**: Symbol tables with known frequency
2. **Databases**: Index structures for read-only data
3. **Natural Language**: Word frequency dictionaries
4. **Caching**: Pre-computed lookup structures

**Key Points:**
- Dynamic programming builds solution bottom-up
- O(n³) can be optimized to O(n²) using Knuth's property
- Different from balanced trees: optimizes for access frequency
- Requires static data and known frequencies
- Trade-off: construction time vs query time
- Generalizes to include unsuccessful search costs

