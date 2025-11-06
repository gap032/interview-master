# Data Structures & Algorithms - Senior-Level Questions

## 1. Design and Implement an LRU Cache

**Difficulty**: Medium-Hard

**Question**: Design and implement a Least Recently Used (LRU) cache with O(1) time complexity for both get and put operations. Explain your design choices.

**Answer**:

An LRU cache evicts the least recently used item when capacity is reached. To achieve O(1) for both operations, we combine a hash map with a doubly linked list.

**Design:**
- **Hash Map**: Maps keys to nodes for O(1) lookup
- **Doubly Linked List**: Maintains access order (most recent at head, least recent at tail)

**Implementation:**

```python
class DLLNode:
    """Doubly Linked List Node"""
    def __init__(self, key=0, value=0):
        self.key = key
        self.value = value
        self.prev = None
        self.next = None

class LRUCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = {}  # key -> node

        # Dummy head and tail for easier operations
        self.head = DLLNode()
        self.tail = DLLNode()
        self.head.next = self.tail
        self.tail.prev = self.head

    def _add_to_head(self, node):
        """Add node right after head (most recently used)"""
        node.prev = self.head
        node.next = self.head.next

        self.head.next.prev = node
        self.head.next = node

    def _remove_node(self, node):
        """Remove node from linked list"""
        prev_node = node.prev
        next_node = node.next

        prev_node.next = next_node
        next_node.prev = prev_node

    def _move_to_head(self, node):
        """Move existing node to head (mark as recently used)"""
        self._remove_node(node)
        self._add_to_head(node)

    def _remove_tail(self):
        """Remove least recently used item"""
        lru_node = self.tail.prev
        self._remove_node(lru_node)
        return lru_node

    def get(self, key):
        """
        Get value for key, mark as recently used
        Time: O(1)
        """
        if key not in self.cache:
            return -1

        node = self.cache[key]
        self._move_to_head(node)
        return node.value

    def put(self, key, value):
        """
        Put key-value pair, evict LRU if needed
        Time: O(1)
        """
        if key in self.cache:
            # Update existing key
            node = self.cache[key]
            node.value = value
            self._move_to_head(node)
        else:
            # Add new key
            new_node = DLLNode(key, value)
            self.cache[key] = new_node
            self._add_to_head(new_node)

            if len(self.cache) > self.capacity:
                # Evict LRU
                lru_node = self._remove_tail()
                del self.cache[lru_node.key]

    def __str__(self):
        """Debug: show cache state"""
        items = []
        current = self.head.next
        while current != self.tail:
            items.append(f"{current.key}:{current.value}")
            current = current.next
        return " -> ".join(items)

# Usage example
cache = LRUCache(3)

cache.put(1, "one")
cache.put(2, "two")
cache.put(3, "three")
print(cache)  # 3:three -> 2:two -> 1:one

print(cache.get(2))  # "two"
print(cache)  # 2:two -> 3:three -> 1:one (2 moved to front)

cache.put(4, "four")  # Evicts key 1 (LRU)
print(cache)  # 4:four -> 2:two -> 3:three

print(cache.get(1))  # -1 (not found)
```

**Alternative: Using OrderedDict**

```python
from collections import OrderedDict

class LRUCacheSimple:
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = OrderedDict()

    def get(self, key):
        if key not in self.cache:
            return -1
        # Move to end (most recent)
        self.cache.move_to_end(key)
        return self.cache[key]

    def put(self, key, value):
        if key in self.cache:
            # Update and move to end
            self.cache.move_to_end(key)
        self.cache[key] = value

        if len(self.cache) > self.capacity:
            # Remove first item (LRU)
            self.cache.popitem(last=False)
```

**Complexity Analysis:**

| Operation | Time | Space |
|-----------|------|-------|
| get()     | O(1) | O(1)  |
| put()     | O(1) | O(1)  |
| Overall   | O(1) | O(n)  |

**Design Trade-offs:**
1. **Custom DLL + HashMap**: Full control, explicit operations
2. **OrderedDict**: Simpler code, relies on built-in
3. **Memory**: Each node stores prev/next pointers (overhead)

**Key Points:**
- Doubly linked list enables O(1) addition/removal
- Hash map enables O(1) key lookup
- Dummy nodes simplify edge cases
- Access counts as "use" - move to head
- Thread-safety would require locks

---

## 2. Implement a Trie (Prefix Tree)

**Difficulty**: Medium

**Question**: Implement a trie data structure with insert, search, and startsWith operations. Discuss time and space complexity and real-world applications.

**Answer**:

A Trie (prefix tree) is a tree-like data structure for efficient string storage and retrieval, especially useful for prefix-based operations.

**Implementation:**

```python
class TrieNode:
    def __init__(self):
        self.children = {}  # char -> TrieNode
        self.is_end_of_word = False
        self.word_count = 0  # Number of words passing through this node

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        """
        Insert a word into the trie
        Time: O(m) where m is word length
        Space: O(m) in worst case
        """
        node = self.root

        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
            node.word_count += 1

        node.is_end_of_word = True

    def search(self, word):
        """
        Search for exact word match
        Time: O(m)
        """
        node = self._find_node(word)
        return node is not None and node.is_end_of_word

    def starts_with(self, prefix):
        """
        Check if any word starts with prefix
        Time: O(m)
        """
        return self._find_node(prefix) is not None

    def _find_node(self, prefix):
        """Helper: navigate to node representing prefix"""
        node = self.root

        for char in prefix:
            if char not in node.children:
                return None
            node = node.children[char]

        return node

    def autocomplete(self, prefix):
        """
        Get all words with given prefix
        Time: O(p + n) where p is prefix length, n is number of nodes in subtree
        """
        node = self._find_node(prefix)
        if not node:
            return []

        words = []
        self._dfs_collect_words(node, prefix, words)
        return words

    def _dfs_collect_words(self, node, current_word, words):
        """DFS to collect all words from a node"""
        if node.is_end_of_word:
            words.append(current_word)

        for char, child_node in node.children.items():
            self._dfs_collect_words(child_node, current_word + char, words)

    def delete(self, word):
        """
        Delete a word from trie
        Time: O(m)
        """
        def _delete_recursive(node, word, index):
            if index == len(word):
                if not node.is_end_of_word:
                    return False  # Word not found
                node.is_end_of_word = False
                # Delete node if it has no children
                return len(node.children) == 0

            char = word[index]
            if char not in node.children:
                return False

            child_node = node.children[char]
            should_delete_child = _delete_recursive(child_node, word, index + 1)

            if should_delete_child:
                del node.children[char]
                # Delete current node if no children and not end of word
                return len(node.children) == 0 and not node.is_end_of_word

            return False

        _delete_recursive(self.root, word, 0)

    def count_words_with_prefix(self, prefix):
        """Count words that start with prefix"""
        node = self._find_node(prefix)
        return node.word_count if node else 0

    def longest_common_prefix(self):
        """Find longest common prefix of all words"""
        if not self.root.children:
            return ""

        prefix = []
        node = self.root

        while len(node.children) == 1 and not node.is_end_of_word:
            char = next(iter(node.children))
            prefix.append(char)
            node = node.children[char]

        return ''.join(prefix)

# Usage examples
trie = Trie()
words = ["apple", "app", "apricot", "banana", "band"]

for word in words:
    trie.insert(word)

# Search operations
print(trie.search("apple"))      # True
print(trie.search("app"))        # True
print(trie.search("appl"))       # False

# Prefix operations
print(trie.starts_with("app"))   # True
print(trie.starts_with("ban"))   # True
print(trie.starts_with("cat"))   # False

# Autocomplete
print(trie.autocomplete("app"))  # ['app', 'apple', 'apricot']
print(trie.autocomplete("ban"))  # ['banana', 'band']

# Advanced operations
print(trie.count_words_with_prefix("ap"))  # 3
print(trie.longest_common_prefix())        # "" (no common prefix for all)

# Delete
trie.delete("app")
print(trie.search("app"))        # False
print(trie.search("apple"))      # True (still exists)
```

**Space-Optimized Trie using Arrays:**

```python
class CompactTrieNode:
    """Space-optimized for lowercase letters only"""
    def __init__(self):
        self.children = [None] * 26  # a-z
        self.is_end = False

    def get_index(self, char):
        return ord(char) - ord('a')

class CompactTrie:
    def __init__(self):
        self.root = CompactTrieNode()

    def insert(self, word):
        node = self.root
        for char in word:
            idx = node.get_index(char)
            if node.children[idx] is None:
                node.children[idx] = CompactTrieNode()
            node = node.children[idx]
        node.is_end = True
```

**Complexity Analysis:**

| Operation | Time | Space |
|-----------|------|-------|
| Insert    | O(m) | O(m) per word |
| Search    | O(m) | O(1) |
| StartsWith| O(m) | O(1) |
| Delete    | O(m) | O(1) |
| Autocomplete | O(p + n*k) | O(n*k) |

where m = word length, p = prefix length, n = matching words, k = average word length

**Real-World Applications:**
1. **Autocomplete**: Search engines, IDEs
2. **Spell Checkers**: Dictionary lookups
3. **IP Routing**: Longest prefix matching
4. **DNA Sequencing**: Pattern matching in genomes
5. **Phone Directories**: T9 predictive text

**Trade-offs:**
- **Space**: Higher than hash table (stores prefixes)
- **Time**: Better for prefix operations than hash table
- **Use case**: Excellent for string prefix operations, poor for exact matches only

**Key Points:**
- Each path from root represents a string
- Shared prefixes share nodes (space efficient)
- No collisions like hash tables
- Memory usage increases with alphabet size
- Can be compressed with radix trees for sparse data

---

## 3. Serialize and Deserialize Binary Tree

**Difficulty**: Hard

**Question**: Design an algorithm to serialize and deserialize a binary tree. The serialization format should be compact and the deserialization should reconstruct the exact tree structure.

**Answer**:

Serialization converts a tree to a string representation; deserialization reconstructs it. We need to handle null nodes to preserve structure.

**Solution 1: Level-Order Traversal (BFS)**

```python
from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Codec:
    def serialize(self, root):
        """
        Serialize tree to string using level-order traversal
        Time: O(n), Space: O(n)
        """
        if not root:
            return "[]"

        result = []
        queue = deque([root])

        while queue:
            node = queue.popleft()

            if node:
                result.append(str(node.val))
                queue.append(node.left)
                queue.append(node.right)
            else:
                result.append("null")

        # Remove trailing nulls for compactness
        while result and result[-1] == "null":
            result.pop()

        return "[" + ",".join(result) + "]"

    def deserialize(self, data):
        """
        Deserialize string to tree
        Time: O(n), Space: O(n)
        """
        if data == "[]":
            return None

        # Parse string
        values = data[1:-1].split(",")
        root = TreeNode(int(values[0]))
        queue = deque([root])
        i = 1

        while queue and i < len(values):
            node = queue.popleft()

            # Process left child
            if i < len(values) and values[i] != "null":
                node.left = TreeNode(int(values[i]))
                queue.append(node.left)
            i += 1

            # Process right child
            if i < len(values) and values[i] != "null":
                node.right = TreeNode(int(values[i]))
                queue.append(node.right)
            i += 1

        return root

# Test
codec = Codec()

# Build tree:      1
#                /   \
#               2     3
#                    / \
#                   4   5
root = TreeNode(1)
root.left = TreeNode(2)
root.right = TreeNode(3)
root.right.left = TreeNode(4)
root.right.right = TreeNode(5)

serialized = codec.serialize(root)
print(f"Serialized: {serialized}")  # [1,2,3,null,null,4,5]

deserialized = codec.deserialize(serialized)
print(f"Re-serialized: {codec.serialize(deserialized)}")  # Should match
```

**Solution 2: Pre-order Traversal (DFS)**

```python
class CodecPreorder:
    def serialize(self, root):
        """
        Serialize using preorder traversal
        More compact for unbalanced trees
        """
        def dfs(node):
            if not node:
                values.append("null")
                return
            values.append(str(node.val))
            dfs(node.left)
            dfs(node.right)

        values = []
        dfs(root)
        return ",".join(values)

    def deserialize(self, data):
        """
        Deserialize using preorder traversal
        """
        def dfs():
            val = next(values)
            if val == "null":
                return None

            node = TreeNode(int(val))
            node.left = dfs()
            node.right = dfs()
            return node

        values = iter(data.split(","))
        return dfs()

# Test
codec2 = CodecPreorder()
serialized2 = codec2.serialize(root)
print(f"Preorder: {serialized2}")  # 1,2,null,null,3,4,null,null,5,null,null
```

**Solution 3: Parenthetic Representation**

```python
class CodecParenthetic:
    def serialize(self, root):
        """
        Serialize as: node(left)(right)
        More human-readable
        """
        if not root:
            return "()"

        left = self.serialize(root.left)
        right = self.serialize(root.right)

        return f"{root.val}({left})({right})"

    def deserialize(self, data):
        """
        Parse parenthetic representation
        """
        if data == "()":
            return None

        # Find value and first parenthesis
        i = 0
        while i < len(data) and data[i] not in "()":
            i += 1

        val = int(data[:i])
        node = TreeNode(val)

        # Find matching parentheses for left subtree
        count = 0
        start = i
        for j in range(i, len(data)):
            if data[j] == '(':
                count += 1
            elif data[j] == ')':
                count -= 1
            if count == 0:
                node.left = self.deserialize(data[start+1:j])
                node.right = self.deserialize(data[j+2:-1])
                break

        return node

# Test
codec3 = CodecParenthetic()
serialized3 = codec3.serialize(root)
print(f"Parenthetic: {serialized3}")  # 1(2(()()))(3(4(()()))(5(()())))
```

**Comparison:**

| Method | Format | Compactness | Readability |
|--------|--------|-------------|-------------|
| Level-order | [1,2,3,null,null,4,5] | Medium | High |
| Preorder | 1,2,null,null,3,4,... | High | Medium |
| Parenthetic | 1(2(...))(3(...)) | Low | High |

**Complexity:**

| Operation | Time | Space |
|-----------|------|-------|
| Serialize | O(n) | O(n) |
| Deserialize | O(n) | O(n) |

**Edge Cases:**

```python
# Test edge cases
test_cases = [
    None,                          # Empty tree
    TreeNode(1),                   # Single node
    TreeNode(1, TreeNode(2)),      # Left skewed
    TreeNode(1, None, TreeNode(2)) # Right skewed
]

for i, test_root in enumerate(test_cases):
    ser = codec.serialize(test_root)
    deser = codec.deserialize(ser)
    print(f"Test {i}: {ser}")
```

**Key Points:**
- Must preserve null nodes to maintain structure
- Level-order is intuitive and mirrors visual representation
- Preorder is recursive and compact
- Choose format based on requirements (size vs readability)
- Both serialization and deserialization are O(n)

---

## 4. Find Median from Data Stream

**Difficulty**: Hard

**Question**: Design a data structure that supports adding numbers from a stream and finding the median efficiently. Optimize for the case where findMedian is called frequently.

**Answer**:

The median is the middle value in a sorted list. For a stream, we need to efficiently maintain order without fully sorting on each insertion.

**Solution: Two Heaps Approach**

Use two heaps to divide numbers:
- **Max heap** (left): stores smaller half
- **Min heap** (right): stores larger half
- Keep heaps balanced: max heap size = min heap size or max heap size = min heap size + 1

```python
import heapq

class MedianFinder:
    def __init__(self):
        # Max heap for smaller half (negate values for max heap)
        self.small = []  # Max heap
        # Min heap for larger half
        self.large = []  # Min heap

    def add_num(self, num):
        """
        Add number to data structure
        Time: O(log n)
        """
        # Add to max heap (small half)
        heapq.heappush(self.small, -num)

        # Balance: ensure all elements in small <= all in large
        if self.small and self.large and (-self.small[0] > self.large[0]):
            val = -heapq.heappop(self.small)
            heapq.heappush(self.large, val)

        # Balance sizes: small can have at most 1 more element
        if len(self.small) > len(self.large) + 1:
            val = -heapq.heappop(self.small)
            heapq.heappush(self.large, val)
        elif len(self.large) > len(self.small):
            val = heapq.heappop(self.large)
            heapq.heappush(self.small, -val)

    def find_median(self):
        """
        Find median of all numbers
        Time: O(1)
        """
        if len(self.small) > len(self.large):
            return -self.small[0]
        else:
            return (-self.small[0] + self.large[0]) / 2.0

    def size(self):
        return len(self.small) + len(self.large)

# Usage example
mf = MedianFinder()
mf.add_num(1)
mf.add_num(2)
print(mf.find_median())  # 1.5

mf.add_num(3)
print(mf.find_median())  # 2.0

mf.add_num(4)
mf.add_num(5)
print(mf.find_median())  # 3.0
```

**Detailed Example:**

```python
# Visualize the process
class MedianFinderVerbose(MedianFinder):
    def add_num(self, num):
        super().add_num(num)
        print(f"Added {num}")
        print(f"  Small (max heap): {[-x for x in self.small]}")
        print(f"  Large (min heap): {self.large}")
        print(f"  Median: {self.find_median()}\n")

mfv = MedianFinderVerbose()
for num in [5, 15, 1, 3, 8, 7, 9, 10]:
    mfv.add_num(num)
```

**Alternative: Using Sorted List**

```python
import bisect

class MedianFinderSorted:
    def __init__(self):
        self.nums = []

    def add_num(self, num):
        """
        Insert in sorted position
        Time: O(n) - due to insertion
        """
        bisect.insort(self.nums, num)

    def find_median(self):
        """
        Time: O(1)
        """
        n = len(self.nums)
        if n % 2 == 0:
            return (self.nums[n//2 - 1] + self.nums[n//2]) / 2.0
        else:
            return self.nums[n//2]
```

**Complexity Comparison:**

| Method | add_num | find_median | Space |
|--------|---------|-------------|-------|
| Two Heaps | O(log n) | O(1) | O(n) |
| Sorted List | O(n) | O(1) | O(n) |
| Simple Sort | O(1) | O(n log n) | O(n) |

**Follow-up: 99th Percentile**

```python
class PercentileFinder:
    """Find any percentile efficiently"""
    def __init__(self, percentile=0.99):
        self.percentile = percentile
        self.nums = []

    def add_num(self, num):
        bisect.insort(self.nums, num)

    def find_percentile(self):
        n = len(self.nums)
        if n == 0:
            return None
        idx = int(n * self.percentile)
        return self.nums[min(idx, n-1)]

pf = PercentileFinder(0.99)
for i in range(100):
    pf.add_num(i)
print(pf.find_percentile())  # 99
```

**When to Use Which:**
- **Two Heaps**: High frequency of insertions and median queries
- **Sorted List**: When you need other percentiles or quantiles
- **Simple Sort**: Rare median queries, batch processing

**Key Points:**
- Two heaps maintain partial order efficiently
- Max heap for smaller half, min heap for larger half
- Balancing ensures O(1) median retrieval
- Python's heapq only provides min heap (negate for max heap)
- Alternative approaches trade insertion for query speed

---

## 5. Graph Algorithms: Detect Cycles in Directed Graph

**Difficulty**: Medium-Hard

**Question**: Implement algorithms to detect cycles in both directed and undirected graphs. Explain the differences in approach and provide examples of real-world applications.

**Answer**:

Cycle detection is fundamental for dependency resolution, deadlock detection, and topological sorting.

**Directed Graph - DFS with Colors (White-Gray-Black)**

```python
class DirectedGraph:
    def __init__(self, vertices):
        self.V = vertices
        self.graph = {i: [] for i in range(vertices)}

    def add_edge(self, u, v):
        """Add directed edge from u to v"""
        self.graph[u].append(v)

    def has_cycle_dfs(self):
        """
        Detect cycle using DFS with three colors
        WHITE (0): unvisited
        GRAY (1): in current DFS path (visiting)
        BLACK (2): completely processed

        Time: O(V + E), Space: O(V)
        """
        WHITE, GRAY, BLACK = 0, 1, 2
        color = [WHITE] * self.V

        def dfs(node):
            color[node] = GRAY  # Mark as being processed

            for neighbor in self.graph[node]:
                if color[neighbor] == GRAY:
                    # Back edge to node in current path = cycle
                    return True
                if color[neighbor] == WHITE and dfs(neighbor):
                    return True

            color[node] = BLACK  # Done processing
            return False

        # Check all components
        for vertex in range(self.V):
            if color[vertex] == WHITE:
                if dfs(vertex):
                    return True

        return False

    def has_cycle_dfs_with_path(self):
        """
        Detect cycle and return the cycle path
        """
        WHITE, GRAY, BLACK = 0, 1, 2
        color = [WHITE] * self.V
        parent = [-1] * self.V

        def dfs(node, path):
            color[node] = GRAY
            path.append(node)

            for neighbor in self.graph[node]:
                if color[neighbor] == GRAY:
                    # Found cycle, extract it
                    cycle_start = path.index(neighbor)
                    return path[cycle_start:] + [neighbor]
                if color[neighbor] == WHITE:
                    result = dfs(neighbor, path)
                    if result:
                        return result

            color[node] = BLACK
            path.pop()
            return None

        for vertex in range(self.V):
            if color[vertex] == WHITE:
                cycle = dfs(vertex, [])
                if cycle:
                    return True, cycle

        return False, []

# Test directed graph
dg = DirectedGraph(4)
dg.add_edge(0, 1)
dg.add_edge(1, 2)
dg.add_edge(2, 3)
dg.add_edge(3, 1)  # Creates cycle: 1 -> 2 -> 3 -> 1

print(f"Has cycle: {dg.has_cycle_dfs()}")  # True
has_cycle, cycle_path = dg.has_cycle_dfs_with_path()
print(f"Cycle path: {cycle_path}")  # [1, 2, 3, 1]
```

**Directed Graph - Kahn's Algorithm (Topological Sort)**

```python
from collections import deque

class DirectedGraphKahn:
    def __init__(self, vertices):
        self.V = vertices
        self.graph = {i: [] for i in range(vertices)}

    def add_edge(self, u, v):
        self.graph[u].append(v)

    def has_cycle_kahn(self):
        """
        Use topological sort to detect cycle
        If topological sort is possible, no cycle exists
        Time: O(V + E), Space: O(V)
        """
        # Calculate in-degrees
        in_degree = [0] * self.V
        for u in range(self.V):
            for v in self.graph[u]:
                in_degree[v] += 1

        # Queue all nodes with in-degree 0
        queue = deque([i for i in range(self.V) if in_degree[i] == 0])
        processed = 0

        while queue:
            node = queue.popleft()
            processed += 1

            # Reduce in-degree of neighbors
            for neighbor in self.graph[node]:
                in_degree[neighbor] -= 1
                if in_degree[neighbor] == 0:
                    queue.append(neighbor)

        # If not all nodes processed, cycle exists
        return processed != self.V

# Test
dgk = DirectedGraphKahn(4)
dgk.add_edge(0, 1)
dgk.add_edge(1, 2)
dgk.add_edge(2, 3)
dgk.add_edge(3, 1)  # Cycle

print(f"Has cycle (Kahn): {dgk.has_cycle_kahn()}")  # True
```

**Undirected Graph - DFS**

```python
class UndirectedGraph:
    def __init__(self, vertices):
        self.V = vertices
        self.graph = {i: [] for i in range(vertices)}

    def add_edge(self, u, v):
        """Add undirected edge"""
        self.graph[u].append(v)
        self.graph[v].append(u)

    def has_cycle_dfs(self):
        """
        Detect cycle in undirected graph
        Key difference: track parent to avoid false positive
        Time: O(V + E), Space: O(V)
        """
        visited = [False] * self.V

        def dfs(node, parent):
            visited[node] = True

            for neighbor in self.graph[node]:
                if not visited[neighbor]:
                    if dfs(neighbor, node):
                        return True
                elif neighbor != parent:
                    # Visited neighbor that's not parent = cycle
                    return True

            return False

        # Check all components
        for vertex in range(self.V):
            if not visited[vertex]:
                if dfs(vertex, -1):
                    return True

        return False

# Test undirected graph
ug = UndirectedGraph(5)
ug.add_edge(0, 1)
ug.add_edge(1, 2)
ug.add_edge(2, 3)
ug.add_edge(3, 4)
ug.add_edge(4, 1)  # Creates cycle

print(f"Undirected has cycle: {ug.has_cycle_dfs()}")  # True
```

**Union-Find for Undirected Graph**

```python
class UnionFind:
    def __init__(self, size):
        self.parent = list(range(size))
        self.rank = [0] * size

    def find(self, x):
        """Find with path compression"""
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x, y):
        """Union by rank, returns False if already in same set"""
        root_x = self.find(x)
        root_y = self.find(y)

        if root_x == root_y:
            return False  # Cycle detected

        # Union by rank
        if self.rank[root_x] < self.rank[root_y]:
            self.parent[root_x] = root_y
        elif self.rank[root_x] > self.rank[root_y]:
            self.parent[root_y] = root_x
        else:
            self.parent[root_y] = root_x
            self.rank[root_x] += 1

        return True

class UndirectedGraphUnionFind:
    def __init__(self, vertices):
        self.V = vertices
        self.edges = []

    def add_edge(self, u, v):
        self.edges.append((u, v))

    def has_cycle_union_find(self):
        """
        Detect cycle using Union-Find
        Time: O(E α(V)) where α is inverse Ackermann
        """
        uf = UnionFind(self.V)

        for u, v in self.edges:
            if not uf.union(u, v):
                return True  # Adding edge creates cycle

        return False

# Test
uguf = UndirectedGraphUnionFind(3)
uguf.add_edge(0, 1)
uguf.add_edge(1, 2)
uguf.add_edge(2, 0)  # Cycle

print(f"Has cycle (Union-Find): {uguf.has_cycle_union_find()}")  # True
```

**Real-World Applications:**

1. **Dependency Resolution** (Directed):
   - Package managers (npm, pip)
   - Build systems (Make, Gradle)
   - Database foreign keys

2. **Deadlock Detection** (Directed):
   - Operating systems (resource allocation)
   - Database transactions
   - Distributed systems

3. **Circuit Design** (Directed):
   - Combinational circuits must be acyclic
   - Sequential circuits may have cycles

4. **Network Topology** (Undirected):
   - Routing protocols
   - Network redundancy
   - Spanning tree protocol

**Complexity Summary:**

| Graph Type | Algorithm | Time | Space | Notes |
|------------|-----------|------|-------|-------|
| Directed   | DFS (Colors) | O(V+E) | O(V) | Returns cycle |
| Directed   | Kahn's | O(V+E) | O(V) | Via toposort |
| Undirected | DFS | O(V+E) | O(V) | Track parent |
| Undirected | Union-Find | O(E α(V)) | O(V) | Efficient for sparse |

**Key Points:**
- Directed: Use DFS with colors or topological sort
- Undirected: Track parent in DFS or use Union-Find
- Union-Find efficient for sparse graphs
- Back edge in DFS indicates cycle
- Applications in scheduling, deadlock, and dependency management

