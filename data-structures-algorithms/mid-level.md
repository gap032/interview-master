# Data Structures & Algorithms - Mid-Level Questions

## 1. Explain the difference between an Array and a Linked List

**Difficulty**: Easy

**Question**: What are the key differences between arrays and linked lists? When would you use one over the other?

**Answer**:

Arrays and linked lists are both linear data structures, but they differ in memory allocation and performance characteristics:

**Arrays:**
- **Contiguous memory**: Elements stored in consecutive memory locations
- **Fixed size**: Size typically defined at creation (in static arrays)
- **Random access**: O(1) access time using indices
- **Poor insertion/deletion**: O(n) for insertion/deletion in middle (requires shifting)
- **Cache-friendly**: Better cache locality due to contiguous storage

**Linked Lists:**
- **Non-contiguous memory**: Elements (nodes) scattered in memory, connected by pointers
- **Dynamic size**: Can grow/shrink easily
- **Sequential access**: O(n) access time (must traverse from head)
- **Efficient insertion/deletion**: O(1) if you have reference to the node
- **Extra memory**: Requires additional memory for pointers

**When to use Arrays:**
- Frequent access by index
- Fixed or predictable size
- Need for cache efficiency
- Binary search requirements

**When to use Linked Lists:**
- Frequent insertions/deletions at beginning or middle
- Unknown size that changes frequently
- Implementing queues, stacks, or other abstract data types

**Example in Python:**
```python
# Array (using list)
arr = [1, 2, 3, 4, 5]
print(arr[2])  # O(1) access

# Linked List (simple implementation)
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def insert_at_beginning(self, data):
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node  # O(1) insertion
```

**Key Points:**
- Arrays provide O(1) access but O(n) insertion/deletion
- Linked lists provide O(1) insertion/deletion but O(n) access
- Choose based on your primary operations

---

## 2. Implement a Hash Table with Collision Resolution

**Difficulty**: Medium

**Question**: Implement a hash table from scratch with collision resolution using chaining. Explain how hash collisions occur and how chaining resolves them.

**Answer**:

Hash collisions occur when two different keys hash to the same index. Chaining resolves this by storing multiple key-value pairs at each index using a linked list or array.

**Implementation:**

```python
class HashTable:
    def __init__(self, size=10):
        self.size = size
        self.table = [[] for _ in range(size)]  # Array of lists for chaining

    def _hash(self, key):
        """Hash function using modulo"""
        return hash(key) % self.size

    def insert(self, key, value):
        """Insert or update a key-value pair"""
        hash_index = self._hash(key)

        # Check if key already exists and update
        for i, (k, v) in enumerate(self.table[hash_index]):
            if k == key:
                self.table[hash_index][i] = (key, value)
                return

        # Key doesn't exist, append new pair
        self.table[hash_index].append((key, value))

    def get(self, key):
        """Retrieve value by key"""
        hash_index = self._hash(key)

        for k, v in self.table[hash_index]:
            if k == key:
                return v

        raise KeyError(f"Key '{key}' not found")

    def remove(self, key):
        """Remove a key-value pair"""
        hash_index = self._hash(key)

        for i, (k, v) in enumerate(self.table[hash_index]):
            if k == key:
                del self.table[hash_index][i]
                return

        raise KeyError(f"Key '{key}' not found")

    def __str__(self):
        items = []
        for i, bucket in enumerate(self.table):
            if bucket:
                items.append(f"Bucket {i}: {bucket}")
        return "\n".join(items) if items else "Empty hash table"

# Usage example
ht = HashTable(5)
ht.insert("name", "Alice")
ht.insert("age", 30)
ht.insert("city", "New York")
ht.insert("email", "alice@example.com")

print(ht.get("name"))  # Output: Alice
print(ht)
```

**Collision Resolution Strategies:**

1. **Chaining (implemented above)**:
   - Each bucket contains a list of entries
   - Simple to implement
   - No limit on number of elements
   - Performance degrades to O(n) in worst case

2. **Open Addressing** (alternative):
   - Linear probing: Check next slot
   - Quadratic probing: Check slots at quadratic intervals
   - Double hashing: Use second hash function

**Time Complexity:**
- Average case: O(1) for insert, get, remove
- Worst case: O(n) when all keys hash to same index
- Load factor (n/m) should be kept below 0.7 for good performance

**Key Points:**
- Hash functions should distribute keys uniformly
- Chaining is simple but uses extra memory for pointers
- Load factor determines when to resize (rehash)
- Good hash functions minimize collisions

---

## 3. Binary Search Tree Operations

**Difficulty**: Medium

**Question**: Implement a Binary Search Tree with insert, search, and delete operations. Explain the time complexity of each operation.

**Answer**:

A Binary Search Tree (BST) is a tree where each node has at most two children, and for each node:
- All values in left subtree < node value
- All values in right subtree > node value

**Implementation:**

```python
class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

class BinarySearchTree:
    def __init__(self):
        self.root = None

    def insert(self, value):
        """Insert a value into the BST"""
        if not self.root:
            self.root = TreeNode(value)
        else:
            self._insert_recursive(self.root, value)

    def _insert_recursive(self, node, value):
        if value < node.value:
            if node.left is None:
                node.left = TreeNode(value)
            else:
                self._insert_recursive(node.left, value)
        else:
            if node.right is None:
                node.right = TreeNode(value)
            else:
                self._insert_recursive(node.right, value)

    def search(self, value):
        """Search for a value in the BST"""
        return self._search_recursive(self.root, value)

    def _search_recursive(self, node, value):
        if node is None:
            return False

        if value == node.value:
            return True
        elif value < node.value:
            return self._search_recursive(node.left, value)
        else:
            return self._search_recursive(node.right, value)

    def delete(self, value):
        """Delete a value from the BST"""
        self.root = self._delete_recursive(self.root, value)

    def _delete_recursive(self, node, value):
        if node is None:
            return None

        if value < node.value:
            node.left = self._delete_recursive(node.left, value)
        elif value > node.value:
            node.right = self._delete_recursive(node.right, value)
        else:
            # Node to delete found
            # Case 1: Leaf node or node with one child
            if node.left is None:
                return node.right
            elif node.right is None:
                return node.left

            # Case 2: Node with two children
            # Find minimum value in right subtree (inorder successor)
            min_node = self._find_min(node.right)
            node.value = min_node.value
            node.right = self._delete_recursive(node.right, min_node.value)

        return node

    def _find_min(self, node):
        """Find node with minimum value"""
        current = node
        while current.left:
            current = current.left
        return current

    def inorder_traversal(self):
        """Return list of values in sorted order"""
        result = []
        self._inorder_recursive(self.root, result)
        return result

    def _inorder_recursive(self, node, result):
        if node:
            self._inorder_recursive(node.left, result)
            result.append(node.value)
            self._inorder_recursive(node.right, result)

# Usage example
bst = BinarySearchTree()
values = [50, 30, 70, 20, 40, 60, 80]
for val in values:
    bst.insert(val)

print(bst.search(40))  # True
print(bst.search(25))  # False
print(bst.inorder_traversal())  # [20, 30, 40, 50, 60, 70, 80]

bst.delete(30)
print(bst.inorder_traversal())  # [20, 40, 50, 60, 70, 80]
```

**Time Complexity:**

| Operation | Average Case | Worst Case | Best Case |
|-----------|-------------|------------|-----------|
| Insert    | O(log n)    | O(n)       | O(1)      |
| Search    | O(log n)    | O(n)       | O(1)      |
| Delete    | O(log n)    | O(n)       | O(1)      |

**Worst case** occurs when tree becomes skewed (essentially a linked list).
**Average case** assumes balanced tree.

**Space Complexity:** O(n) for storing n nodes, O(h) for recursive call stack where h is height.

**Key Points:**
- BST property enables efficient search through binary decisions
- Worst case O(n) occurs with unbalanced trees
- Self-balancing trees (AVL, Red-Black) guarantee O(log n)
- Deletion with two children requires finding inorder successor/predecessor

---

## 4. Detect Cycle in a Linked List

**Difficulty**: Medium

**Question**: Write an algorithm to detect if a linked list contains a cycle. Explain Floyd's Cycle Detection Algorithm.

**Answer**:

Floyd's Cycle Detection Algorithm (also called "tortoise and hare") uses two pointers moving at different speeds to detect cycles.

**Algorithm:**
1. Use two pointers: slow (moves 1 step) and fast (moves 2 steps)
2. If there's a cycle, fast will eventually meet slow
3. If fast reaches null, there's no cycle

**Implementation:**

```python
class ListNode:
    def __init__(self, value):
        self.value = value
        self.next = None

def has_cycle(head):
    """Detect cycle using Floyd's algorithm"""
    if not head or not head.next:
        return False

    slow = head
    fast = head

    while fast and fast.next:
        slow = slow.next          # Move 1 step
        fast = fast.next.next     # Move 2 steps

        if slow == fast:          # Cycle detected
            return True

    return False  # fast reached end, no cycle

def find_cycle_start(head):
    """Find the node where cycle begins"""
    if not head or not head.next:
        return None

    # First, detect if cycle exists
    slow = fast = head
    has_cycle = False

    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next

        if slow == fast:
            has_cycle = True
            break

    if not has_cycle:
        return None

    # Move slow to head, keep fast at meeting point
    # Both move at same speed, they'll meet at cycle start
    slow = head
    while slow != fast:
        slow = slow.next
        fast = fast.next

    return slow

# Usage example
# Creating a linked list with cycle: 1 -> 2 -> 3 -> 4 -> 2 (cycle)
node1 = ListNode(1)
node2 = ListNode(2)
node3 = ListNode(3)
node4 = ListNode(4)

node1.next = node2
node2.next = node3
node3.next = node4
node4.next = node2  # Creates cycle

print(has_cycle(node1))  # True
cycle_start = find_cycle_start(node1)
print(f"Cycle starts at node with value: {cycle_start.value}")  # 2

# List without cycle
node5 = ListNode(1)
node6 = ListNode(2)
node5.next = node6
print(has_cycle(node5))  # False
```

**Why It Works:**

If there's a cycle of length C:
- Fast pointer gains 1 step on slow pointer each iteration
- Once slow enters cycle, fast is at most C-1 steps behind
- Fast will catch slow in at most C iterations

**Mathematical Proof:**
- Let distance to cycle start = F
- Let distance from cycle start to meeting point = a
- Let cycle length = C
- When they meet: 2 × (F + a) = F + a + nC
- Solving: F + a = nC, therefore F = nC - a

**Alternative Approach - Hash Set:**

```python
def has_cycle_hashset(head):
    """Detect cycle using hash set (uses O(n) space)"""
    visited = set()
    current = head

    while current:
        if current in visited:
            return True
        visited.add(current)
        current = current.next

    return False
```

**Complexity Comparison:**

| Approach | Time | Space |
|----------|------|-------|
| Floyd's  | O(n) | O(1)  |
| Hash Set | O(n) | O(n)  |

**Key Points:**
- Floyd's algorithm uses O(1) space vs O(n) for hash set
- Fast pointer moves twice as fast as slow pointer
- Meeting point is not necessarily the cycle start
- Can extend algorithm to find cycle start and length

---

## 5. Implement a Stack with Min Operation

**Difficulty**: Medium

**Question**: Design a stack that supports push, pop, top, and retrieving the minimum element in constant time O(1).

**Answer**:

The challenge is maintaining the minimum element as elements are pushed and popped. We can solve this using an auxiliary stack to track minimums.

**Solution 1: Two Stacks**

```python
class MinStack:
    def __init__(self):
        self.stack = []      # Main stack
        self.min_stack = []  # Stack to track minimums

    def push(self, value):
        """Push element onto stack"""
        self.stack.append(value)

        # Update min_stack
        if not self.min_stack or value <= self.min_stack[-1]:
            self.min_stack.append(value)

    def pop(self):
        """Remove and return top element"""
        if not self.stack:
            raise IndexError("Stack is empty")

        value = self.stack.pop()

        # If popped value was minimum, remove from min_stack
        if value == self.min_stack[-1]:
            self.min_stack.pop()

        return value

    def top(self):
        """Return top element without removing"""
        if not self.stack:
            raise IndexError("Stack is empty")
        return self.stack[-1]

    def get_min(self):
        """Return minimum element in O(1)"""
        if not self.min_stack:
            raise IndexError("Stack is empty")
        return self.min_stack[-1]

    def is_empty(self):
        return len(self.stack) == 0

    def size(self):
        return len(self.stack)

# Usage example
stack = MinStack()
stack.push(5)
stack.push(2)
stack.push(7)
stack.push(1)
stack.push(3)

print(f"Min: {stack.get_min()}")  # 1
print(f"Top: {stack.top()}")      # 3

stack.pop()
stack.pop()
print(f"Min: {stack.get_min()}")  # 2
```

**Solution 2: Single Stack with Tuples**

```python
class MinStack2:
    def __init__(self):
        # Each element is (value, current_min)
        self.stack = []

    def push(self, value):
        if not self.stack:
            current_min = value
        else:
            current_min = min(value, self.stack[-1][1])

        self.stack.append((value, current_min))

    def pop(self):
        if not self.stack:
            raise IndexError("Stack is empty")
        return self.stack.pop()[0]

    def top(self):
        if not self.stack:
            raise IndexError("Stack is empty")
        return self.stack[-1][0]

    def get_min(self):
        if not self.stack:
            raise IndexError("Stack is empty")
        return self.stack[-1][1]

# Usage
stack2 = MinStack2()
stack2.push(3)
stack2.push(5)
stack2.push(2)
stack2.push(1)

print(stack2.get_min())  # 1
stack2.pop()
print(stack2.get_min())  # 2
```

**Complexity Analysis:**

| Operation | Time | Space |
|-----------|------|-------|
| push()    | O(1) | O(n)  |
| pop()     | O(1) | O(1)  |
| top()     | O(1) | O(1)  |
| get_min() | O(1) | O(1)  |

**Space Complexity:**
- Solution 1: O(n) in worst case (when elements are in decreasing order)
- Solution 2: O(n) always (stores pair for each element)

**Trade-offs:**
- Solution 1: More space-efficient when few minimums change
- Solution 2: Simpler logic, predictable space usage

**Key Points:**
- Key insight: track minimum at each stack state
- Two-stack approach optimizes space for some cases
- All operations remain O(1) time complexity
- Similar approach can track maximum element

---

## 6. Find First Non-Repeating Character

**Difficulty**: Easy

**Question**: Given a string, find the first non-repeating character. Return its index, or -1 if it doesn't exist.

**Answer**:

This problem tests understanding of hash tables and string processing.

**Solution 1: Two-Pass with Hash Map**

```python
def first_unique_char(s):
    """
    Find index of first non-repeating character
    Time: O(n), Space: O(1) - limited to 26 letters
    """
    # Count frequency of each character
    char_count = {}
    for char in s:
        char_count[char] = char_count.get(char, 0) + 1

    # Find first character with count 1
    for i, char in enumerate(s):
        if char_count[char] == 1:
            return i

    return -1

# Test cases
print(first_unique_char("leetcode"))     # 0 (l)
print(first_unique_char("loveleetcode")) # 2 (v)
print(first_unique_char("aabb"))         # -1
```

**Solution 2: Single Pass with OrderedDict**

```python
from collections import OrderedDict

def first_unique_char_v2(s):
    """
    Single pass solution using OrderedDict
    Time: O(n), Space: O(1)
    """
    char_index = OrderedDict()
    repeated = set()

    for i, char in enumerate(s):
        if char in repeated:
            continue
        elif char in char_index:
            # Character repeated, remove from dict and add to set
            del char_index[char]
            repeated.add(char)
        else:
            char_index[char] = i

    # Return first remaining character's index
    return next(iter(char_index.values())) if char_index else -1

print(first_unique_char_v2("leetcode"))  # 0
```

**Solution 3: Using Counter from collections**

```python
from collections import Counter

def first_unique_char_v3(s):
    """
    Using Counter for cleaner code
    Time: O(n), Space: O(1)
    """
    count = Counter(s)

    for i, char in enumerate(s):
        if count[char] == 1:
            return i

    return -1

print(first_unique_char_v3("leetcode"))  # 0
```

**Edge Cases to Consider:**

```python
# Test edge cases
test_cases = [
    "",                    # Empty string -> -1
    "a",                   # Single character -> 0
    "aabbcc",              # All repeated -> -1
    "aabbccd",             # Last char unique -> 6
    "abcabc",              # All repeated -> -1
]

for test in test_cases:
    print(f"'{test}' -> {first_unique_char(test)}")
```

**Complexity Analysis:**

| Solution | Time | Space | Passes |
|----------|------|-------|--------|
| Hash Map | O(n) | O(1)* | 2      |
| OrderedDict | O(n) | O(1)* | 1   |
| Counter  | O(n) | O(1)* | 2      |

*Space is O(1) because character set is limited (26 lowercase letters or 128 ASCII)

**Key Points:**
- Hash map is classic solution for counting problems
- Two-pass is simpler to understand and implement
- Space is effectively constant for limited character sets
- OrderedDict maintains insertion order for optimization

