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

**Example in C#:**
```csharp
using System;
using System.Collections.Generic;

// Array
int[] arr = { 1, 2, 3, 4, 5 };
Console.WriteLine(arr[2]);  // O(1) access

// List<T> - dynamic array
List<int> list = new List<int> { 1, 2, 3, 4, 5 };
Console.WriteLine(list[2]);  // O(1) access

// Linked List (simple implementation)
public class Node<T>
{
    public T Data { get; set; }
    public Node<T> Next { get; set; }

    public Node(T data)
    {
        Data = data;
        Next = null;
    }
}

public class LinkedList<T>
{
    private Node<T> head;

    public LinkedList()
    {
        head = null;
    }

    public void InsertAtBeginning(T data)
    {
        Node<T> newNode = new Node<T>(data);
        newNode.Next = head;
        head = newNode;  // O(1) insertion
    }

    public void Display()
    {
        Node<T> current = head;
        while (current != null)
        {
            Console.Write(current.Data + " -> ");
            current = current.Next;
        }
        Console.WriteLine("null");
    }
}

// Built-in LinkedList<T>
LinkedList<int> linkedList = new LinkedList<int>();
linkedList.AddFirst(5);  // O(1)
linkedList.AddFirst(4);  // O(1)
linkedList.AddLast(6);   // O(1)
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

**C# Implementation:**

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

public class HashTable<TKey, TValue>
{
    private class Entry
    {
        public TKey Key { get; set; }
        public TValue Value { get; set; }

        public Entry(TKey key, TValue value)
        {
            Key = key;
            Value = value;
        }
    }

    private int size;
    private List<Entry>[] table;

    public HashTable(int size = 10)
    {
        this.size = size;
        table = new List<Entry>[size];
        for (int i = 0; i < size; i++)
        {
            table[i] = new List<Entry>();
        }
    }

    private int Hash(TKey key)
    {
        // Hash function using modulo
        return Math.Abs(key.GetHashCode() % size);
    }

    public void Insert(TKey key, TValue value)
    {
        int hashIndex = Hash(key);

        // Check if key already exists and update
        for (int i = 0; i < table[hashIndex].Count; i++)
        {
            if (EqualityComparer<TKey>.Default.Equals(table[hashIndex][i].Key, key))
            {
                table[hashIndex][i] = new Entry(key, value);
                return;
            }
        }

        // Key doesn't exist, add new entry
        table[hashIndex].Add(new Entry(key, value));
    }

    public TValue Get(TKey key)
    {
        int hashIndex = Hash(key);

        foreach (var entry in table[hashIndex])
        {
            if (EqualityComparer<TKey>.Default.Equals(entry.Key, key))
            {
                return entry.Value;
            }
        }

        throw new KeyNotFoundException($"Key '{key}' not found");
    }

    public bool Remove(TKey key)
    {
        int hashIndex = Hash(key);

        for (int i = 0; i < table[hashIndex].Count; i++)
        {
            if (EqualityComparer<TKey>.Default.Equals(table[hashIndex][i].Key, key))
            {
                table[hashIndex].RemoveAt(i);
                return true;
            }
        }

        throw new KeyNotFoundException($"Key '{key}' not found");
    }

    public override string ToString()
    {
        var items = new List<string>();
        for (int i = 0; i < size; i++)
        {
            if (table[i].Count > 0)
            {
                var bucketItems = string.Join(", ",
                    table[i].Select(e => $"({e.Key}, {e.Value})"));
                items.Add($"Bucket {i}: [{bucketItems}]");
            }
        }
        return items.Count > 0 ? string.Join("\n", items) : "Empty hash table";
    }
}

// Usage example
var ht = new HashTable<string, object>(5);
ht.Insert("name", "Alice");
ht.Insert("age", 30);
ht.Insert("city", "New York");
ht.Insert("email", "alice@example.com");

Console.WriteLine(ht.Get("name"));  // Output: Alice
Console.WriteLine(ht);

// Using built-in Dictionary<TKey, TValue> (hash table)
Dictionary<string, object> dict = new Dictionary<string, object>
{
    { "name", "Alice" },
    { "age", 30 },
    { "city", "New York" }
};

Console.WriteLine(dict["name"]);  // O(1) average
```

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

**C# Implementation:**

```csharp
using System;
using System.Collections.Generic;

public class TreeNode<T> where T : IComparable<T>
{
    public T Value { get; set; }
    public TreeNode<T> Left { get; set; }
    public TreeNode<T> Right { get; set; }

    public TreeNode(T value)
    {
        Value = value;
        Left = null;
        Right = null;
    }
}

public class BinarySearchTree<T> where T : IComparable<T>
{
    private TreeNode<T> root;

    public BinarySearchTree()
    {
        root = null;
    }

    public void Insert(T value)
    {
        root = InsertRecursive(root, value);
    }

    private TreeNode<T> InsertRecursive(TreeNode<T> node, T value)
    {
        if (node == null)
            return new TreeNode<T>(value);

        if (value.CompareTo(node.Value) < 0)
            node.Left = InsertRecursive(node.Left, value);
        else
            node.Right = InsertRecursive(node.Right, value);

        return node;
    }

    public bool Search(T value)
    {
        return SearchRecursive(root, value);
    }

    private bool SearchRecursive(TreeNode<T> node, T value)
    {
        if (node == null)
            return false;

        if (value.CompareTo(node.Value) == 0)
            return true;
        else if (value.CompareTo(node.Value) < 0)
            return SearchRecursive(node.Left, value);
        else
            return SearchRecursive(node.Right, value);
    }

    public void Delete(T value)
    {
        root = DeleteRecursive(root, value);
    }

    private TreeNode<T> DeleteRecursive(TreeNode<T> node, T value)
    {
        if (node == null)
            return null;

        if (value.CompareTo(node.Value) < 0)
            node.Left = DeleteRecursive(node.Left, value);
        else if (value.CompareTo(node.Value) > 0)
            node.Right = DeleteRecursive(node.Right, value);
        else
        {
            // Node to delete found
            // Case 1: Leaf node or node with one child
            if (node.Left == null)
                return node.Right;
            else if (node.Right == null)
                return node.Left;

            // Case 2: Node with two children
            // Find minimum value in right subtree (inorder successor)
            TreeNode<T> minNode = FindMin(node.Right);
            node.Value = minNode.Value;
            node.Right = DeleteRecursive(node.Right, minNode.Value);
        }

        return node;
    }

    private TreeNode<T> FindMin(TreeNode<T> node)
    {
        while (node.Left != null)
            node = node.Left;
        return node;
    }

    public List<T> InorderTraversal()
    {
        List<T> result = new List<T>();
        InorderRecursive(root, result);
        return result;
    }

    private void InorderRecursive(TreeNode<T> node, List<T> result)
    {
        if (node != null)
        {
            InorderRecursive(node.Left, result);
            result.Add(node.Value);
            InorderRecursive(node.Right, result);
        }
    }
}

// Usage example
var bst = new BinarySearchTree<int>();
int[] values = { 50, 30, 70, 20, 40, 60, 80 };
foreach (var val in values)
{
    bst.Insert(val);
}

Console.WriteLine(bst.Search(40));  // True
Console.WriteLine(bst.Search(25));  // False
Console.WriteLine(string.Join(", ", bst.InorderTraversal()));
// Output: 20, 30, 40, 50, 60, 70, 80

bst.Delete(30);
Console.WriteLine(string.Join(", ", bst.InorderTraversal()));
// Output: 20, 40, 50, 60, 70, 80

// Using built-in SortedSet<T> (Red-Black tree)
SortedSet<int> sortedSet = new SortedSet<int> { 50, 30, 70, 20 };
Console.WriteLine(sortedSet.Contains(30));  // True, O(log n)
```

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

**C# Implementation:**

```csharp
using System;
using System.Collections.Generic;

public class ListNode
{
    public int Value { get; set; }
    public ListNode Next { get; set; }

    public ListNode(int value)
    {
        Value = value;
        Next = null;
    }
}

public class CycleDetection
{
    // Floyd's Cycle Detection Algorithm
    public static bool HasCycle(ListNode head)
    {
        if (head == null || head.Next == null)
            return false;

        ListNode slow = head;
        ListNode fast = head;

        while (fast != null && fast.Next != null)
        {
            slow = slow.Next;           // Move 1 step
            fast = fast.Next.Next;      // Move 2 steps

            if (slow == fast)           // Cycle detected
                return true;
        }

        return false; // fast reached end, no cycle
    }

    // Find the node where cycle begins
    public static ListNode FindCycleStart(ListNode head)
    {
        if (head == null || head.Next == null)
            return null;

        // First, detect if cycle exists
        ListNode slow = head;
        ListNode fast = head;
        bool hasCycle = false;

        while (fast != null && fast.Next != null)
        {
            slow = slow.Next;
            fast = fast.Next.Next;

            if (slow == fast)
            {
                hasCycle = true;
                break;
            }
        }

        if (!hasCycle)
            return null;

        // Move slow to head, keep fast at meeting point
        // Both move at same speed, they'll meet at cycle start
        slow = head;
        while (slow != fast)
        {
            slow = slow.Next;
            fast = fast.Next;
        }

        return slow;
    }

    // Alternative: Hash Set approach
    public static bool HasCycleHashSet(ListNode head)
    {
        HashSet<ListNode> visited = new HashSet<ListNode>();
        ListNode current = head;

        while (current != null)
        {
            if (visited.Contains(current))
                return true;

            visited.Add(current);
            current = current.Next;
        }

        return false;
    }

    // Get cycle length
    public static int GetCycleLength(ListNode head)
    {
        if (head == null || head.Next == null)
            return 0;

        ListNode slow = head;
        ListNode fast = head;

        // Detect cycle
        while (fast != null && fast.Next != null)
        {
            slow = slow.Next;
            fast = fast.Next.Next;

            if (slow == fast)
            {
                // Count nodes in cycle
                int length = 1;
                ListNode temp = slow.Next;
                while (temp != slow)
                {
                    length++;
                    temp = temp.Next;
                }
                return length;
            }
        }

        return 0; // No cycle
    }
}

// Usage example
class Program
{
    static void Main()
    {
        // Creating a linked list with cycle: 1 -> 2 -> 3 -> 4 -> 2 (cycle)
        var node1 = new ListNode(1);
        var node2 = new ListNode(2);
        var node3 = new ListNode(3);
        var node4 = new ListNode(4);

        node1.Next = node2;
        node2.Next = node3;
        node3.Next = node4;
        node4.Next = node2;  // Creates cycle

        Console.WriteLine(CycleDetection.HasCycle(node1));  // True

        var cycleStart = CycleDetection.FindCycleStart(node1);
        Console.WriteLine($"Cycle starts at node with value: {cycleStart.Value}");  // 2

        Console.WriteLine($"Cycle length: {CycleDetection.GetCycleLength(node1)}");  // 3

        // List without cycle
        var node5 = new ListNode(1);
        var node6 = new ListNode(2);
        node5.Next = node6;
        Console.WriteLine(CycleDetection.HasCycle(node5));  // False
    }
}
```

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

**C# Implementation:**

```csharp
using System;
using System.Collections.Generic;

// Solution 1: Two Stacks
public class MinStack
{
    private Stack<int> stack;     // Main stack
    private Stack<int> minStack;  // Stack to track minimums

    public MinStack()
    {
        stack = new Stack<int>();
        minStack = new Stack<int>();
    }

    public void Push(int value)
    {
        stack.Push(value);

        // Update minStack
        if (minStack.Count == 0 || value <= minStack.Peek())
        {
            minStack.Push(value);
        }
    }

    public int Pop()
    {
        if (stack.Count == 0)
            throw new InvalidOperationException("Stack is empty");

        int value = stack.Pop();

        // If popped value was minimum, remove from minStack
        if (value == minStack.Peek())
        {
            minStack.Pop();
        }

        return value;
    }

    public int Top()
    {
        if (stack.Count == 0)
            throw new InvalidOperationException("Stack is empty");

        return stack.Peek();
    }

    public int GetMin()
    {
        if (minStack.Count == 0)
            throw new InvalidOperationException("Stack is empty");

        return minStack.Peek();
    }

    public bool IsEmpty() => stack.Count == 0;

    public int Size() => stack.Count;
}

// Solution 2: Single Stack with Value Tuples
public class MinStack2
{
    private Stack<(int value, int currentMin)> stack;

    public MinStack2()
    {
        stack = new Stack<(int, int)>();
    }

    public void Push(int value)
    {
        int currentMin;
        if (stack.Count == 0)
        {
            currentMin = value;
        }
        else
        {
            currentMin = Math.Min(value, stack.Peek().currentMin);
        }

        stack.Push((value, currentMin));
    }

    public int Pop()
    {
        if (stack.Count == 0)
            throw new InvalidOperationException("Stack is empty");

        return stack.Pop().value;
    }

    public int Top()
    {
        if (stack.Count == 0)
            throw new InvalidOperationException("Stack is empty");

        return stack.Peek().value;
    }

    public int GetMin()
    {
        if (stack.Count == 0)
            throw new InvalidOperationException("Stack is empty");

        return stack.Peek().currentMin;
    }
}

// Usage example
class Program
{
    static void Main()
    {
        // Test Solution 1
        var stack = new MinStack();
        stack.Push(5);
        stack.Push(2);
        stack.Push(7);
        stack.Push(1);
        stack.Push(3);

        Console.WriteLine($"Min: {stack.GetMin()}");  // 1
        Console.WriteLine($"Top: {stack.Top()}");      // 3

        stack.Pop();
        stack.Pop();
        Console.WriteLine($"Min: {stack.GetMin()}");  // 2

        // Test Solution 2
        var stack2 = new MinStack2();
        stack2.Push(3);
        stack2.Push(5);
        stack2.Push(2);
        stack2.Push(1);

        Console.WriteLine(stack2.GetMin());  // 1
        stack2.Pop();
        Console.WriteLine(stack2.GetMin());  // 2

        // Using built-in Stack<T>
        Stack<int> builtInStack = new Stack<int>();
        builtInStack.Push(1);
        builtInStack.Push(2);
        builtInStack.Push(3);
        Console.WriteLine(builtInStack.Peek());  // 3 (top)
        Console.WriteLine(builtInStack.Pop());   // 3 (remove and return)
    }
}
```

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

**C# Implementation:**

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

public class FirstUniqueChar
{
    // Solution 1: Two-Pass with Dictionary
    public static int FirstUniqChar(string s)
    {
        // Count frequency of each character
        Dictionary<char, int> charCount = new Dictionary<char, int>();

        foreach (char c in s)
        {
            if (charCount.ContainsKey(c))
                charCount[c]++;
            else
                charCount[c] = 1;
        }

        // Find first character with count 1
        for (int i = 0; i < s.Length; i++)
        {
            if (charCount[s[i]] == 1)
                return i;
        }

        return -1;
    }

    // Solution 2: LINQ approach
    public static int FirstUniqCharLinq(string s)
    {
        var charCount = s.GroupBy(c => c)
                         .ToDictionary(g => g.Key, g => g.Count());

        return s.Select((c, i) => new { Char = c, Index = i })
                .Where(x => charCount[x.Char] == 1)
                .Select(x => x.Index)
                .DefaultIfEmpty(-1)
                .First();
    }

    // Solution 3: Using array for ASCII characters (most efficient)
    public static int FirstUniqCharArray(string s)
    {
        // Use array for counting (assuming lowercase letters only)
        int[] count = new int[26];

        // First pass: count frequencies
        foreach (char c in s)
        {
            count[c - 'a']++;
        }

        // Second pass: find first unique
        for (int i = 0; i < s.Length; i++)
        {
            if (count[s[i] - 'a'] == 1)
                return i;
        }

        return -1;
    }

    // Solution 4: Single pass with LinkedList (maintains order)
    public static int FirstUniqCharSinglePass(string s)
    {
        Dictionary<char, int> charIndex = new Dictionary<char, int>();
        HashSet<char> repeated = new HashSet<char>();

        for (int i = 0; i < s.Length; i++)
        {
            char c = s[i];

            if (repeated.Contains(c))
            {
                continue;
            }
            else if (charIndex.ContainsKey(c))
            {
                // Character repeated, remove from dict and add to set
                charIndex.Remove(c);
                repeated.Add(c);
            }
            else
            {
                charIndex[c] = i;
            }
        }

        // Return first remaining character's index
        return charIndex.Count > 0 ? charIndex.Values.Min() : -1;
    }
}

// Usage and test cases
class Program
{
    static void Main()
    {
        Console.WriteLine(FirstUniqueChar.FirstUniqChar("leetcode"));     // 0 (l)
        Console.WriteLine(FirstUniqueChar.FirstUniqChar("loveleetcode")); // 2 (v)
        Console.WriteLine(FirstUniqueChar.FirstUniqChar("aabb"));         // -1

        // Test edge cases
        string[] testCases = {
            "",           // Empty string -> -1
            "a",          // Single character -> 0
            "aabbcc",     // All repeated -> -1
            "aabbccd",    // Last char unique -> 6
            "abcabc"      // All repeated -> -1
        };

        Console.WriteLine("\nEdge case tests:");
        foreach (var test in testCases)
        {
            Console.WriteLine($"'{test}' -> {FirstUniqueChar.FirstUniqChar(test)}");
        }

        // Performance comparison
        Console.WriteLine("\nArray-based (fastest): " +
            FirstUniqueChar.FirstUniqCharArray("leetcode"));

        Console.WriteLine("LINQ (most concise): " +
            FirstUniqueChar.FirstUniqCharLinq("leetcode"));
    }
}
```

**Key Points:**
- Hash map is classic solution for counting problems
- Two-pass is simpler to understand and implement
- Space is effectively constant for limited character sets
- OrderedDict maintains insertion order for optimization
- C# array-based solution is fastest for known character sets

---

## 7. String Algorithms

**Difficulty**: Medium

**Question**: Implement common string manipulation algorithms including palindrome checking, anagram detection, and substring search.

**Answer**:

String algorithms are fundamental in solving many programming problems. Here are the most important patterns:

### 7.1 Palindrome Checking

A palindrome reads the same forwards and backwards.

**Python:**
```python
def is_palindrome(s: str) -> bool:
    """Check if string is palindrome (ignoring case and non-alphanumeric)"""
    # Clean string: lowercase and keep only alphanumeric
    cleaned = ''.join(c.lower() for c in s if c.isalnum())

    # Two-pointer approach
    left, right = 0, len(cleaned) - 1

    while left < right:
        if cleaned[left] != cleaned[right]:
            return False
        left += 1
        right -= 1

    return True

# Alternative: simple approach
def is_palindrome_simple(s: str) -> bool:
    """Simple palindrome check"""
    cleaned = ''.join(c.lower() for c in s if c.isalnum())
    return cleaned == cleaned[::-1]

# Examples
print(is_palindrome("A man, a plan, a canal: Panama"))  # True
print(is_palindrome("race a car"))  # False
print(is_palindrome(""))  # True (empty string)
```

**C#:**
```csharp
using System;
using System.Linq;
using System.Text;

public class PalindromeChecker
{
    // Two-pointer approach - O(n) time, O(1) space
    public static bool IsPalindrome(string s)
    {
        if (string.IsNullOrEmpty(s)) return true;

        int left = 0;
        int right = s.Length - 1;

        while (left < right)
        {
            // Skip non-alphanumeric characters
            while (left < right && !char.IsLetterOrDigit(s[left]))
                left++;

            while (left < right && !char.IsLetterOrDigit(s[right]))
                right--;

            // Compare characters (case-insensitive)
            if (char.ToLower(s[left]) != char.ToLower(s[right]))
                return false;

            left++;
            right--;
        }

        return true;
    }

    // Alternative: using LINQ - O(n) time, O(n) space
    public static bool IsPalindromeLinq(string s)
    {
        var cleaned = new string(s.Where(char.IsLetterOrDigit)
                                   .Select(char.ToLower)
                                   .ToArray());

        return cleaned.SequenceEqual(cleaned.Reverse());
    }
}

// Test cases
Console.WriteLine(PalindromeChecker.IsPalindrome("A man, a plan, a canal: Panama"));  // True
Console.WriteLine(PalindromeChecker.IsPalindrome("race a car"));  // False
Console.WriteLine(PalindromeChecker.IsPalindrome(""));  // True
```

**JavaScript:**
```javascript
function isPalindrome(s) {
    // Clean and normalize string
    const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');

    // Two-pointer approach
    let left = 0;
    let right = cleaned.length - 1;

    while (left < right) {
        if (cleaned[left] !== cleaned[right]) {
            return false;
        }
        left++;
        right--;
    }

    return true;
}

// Alternative: simple approach
function isPalindromeSimple(s) {
    const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleaned === cleaned.split('').reverse().join('');
}

console.log(isPalindrome("A man, a plan, a canal: Panama"));  // true
console.log(isPalindrome("race a car"));  // false
```

### 7.2 Anagram Detection

Two strings are anagrams if they contain the same characters with the same frequencies.

**Python:**
```python
from collections import Counter

def is_anagram(s1: str, s2: str) -> bool:
    """Check if two strings are anagrams"""
    # Quick length check
    if len(s1) != len(s2):
        return False

    # Using Counter (hash map)
    return Counter(s1) == Counter(s2)

def is_anagram_sort(s1: str, s2: str) -> bool:
    """Alternative: using sorting"""
    return sorted(s1) == sorted(s2)

def is_anagram_manual(s1: str, s2: str) -> bool:
    """Manual hash map approach"""
    if len(s1) != len(s2):
        return False

    char_count = {}

    # Count characters in s1
    for char in s1:
        char_count[char] = char_count.get(char, 0) + 1

    # Decrement for characters in s2
    for char in s2:
        if char not in char_count:
            return False
        char_count[char] -= 1
        if char_count[char] < 0:
            return False

    return True

# Examples
print(is_anagram("listen", "silent"))  # True
print(is_anagram("hello", "world"))  # False
print(is_anagram("anagram", "nagaram"))  # True
```

**C#:**
```csharp
using System;
using System.Linq;
using System.Collections.Generic;

public class AnagramDetector
{
    // Using Dictionary - O(n) time, O(n) space
    public static bool IsAnagram(string s1, string s2)
    {
        if (s1.Length != s2.Length) return false;

        var charCount = new Dictionary<char, int>();

        // Count characters in s1
        foreach (char c in s1)
        {
            if (!charCount.ContainsKey(c))
                charCount[c] = 0;
            charCount[c]++;
        }

        // Decrement for characters in s2
        foreach (char c in s2)
        {
            if (!charCount.ContainsKey(c))
                return false;

            charCount[c]--;
            if (charCount[c] < 0)
                return false;
        }

        return true;
    }

    // Using sorting - O(n log n) time, O(n) space
    public static bool IsAnagramSort(string s1, string s2)
    {
        if (s1.Length != s2.Length) return false;

        var sorted1 = new string(s1.OrderBy(c => c).ToArray());
        var sorted2 = new string(s2.OrderBy(c => c).ToArray());

        return sorted1 == sorted2;
    }

    // Using LINQ GroupBy - O(n) time, O(n) space
    public static bool IsAnagramLinq(string s1, string s2)
    {
        if (s1.Length != s2.Length) return false;

        return s1.GroupBy(c => c).OrderBy(g => g.Key)
                 .SequenceEqual(s2.GroupBy(c => c).OrderBy(g => g.Key),
                               new GroupingComparer());
    }

    private class GroupingComparer : IEqualityComparer<IGrouping<char, char>>
    {
        public bool Equals(IGrouping<char, char> x, IGrouping<char, char> y)
        {
            return x.Key == y.Key && x.Count() == y.Count();
        }

        public int GetHashCode(IGrouping<char, char> obj)
        {
            return obj.Key.GetHashCode() ^ obj.Count().GetHashCode();
        }
    }
}

// Test cases
Console.WriteLine(AnagramDetector.IsAnagram("listen", "silent"));  // True
Console.WriteLine(AnagramDetector.IsAnagram("hello", "world"));  // False
Console.WriteLine(AnagramDetector.IsAnagramSort("anagram", "nagaram"));  // True
```

### 7.3 Substring Search (Pattern Matching)

Find if a pattern exists in a text string.

**Python:**
```python
def substring_search_naive(text: str, pattern: str) -> int:
    """Naive substring search - O(n*m) time"""
    n, m = len(text), len(pattern)

    if m == 0:
        return 0
    if m > n:
        return -1

    for i in range(n - m + 1):
        j = 0
        while j < m and text[i + j] == pattern[j]:
            j += 1

        if j == m:
            return i  # Pattern found at index i

    return -1  # Pattern not found

def find_all_occurrences(text: str, pattern: str) -> list:
    """Find all occurrences of pattern in text"""
    result = []
    n, m = len(text), len(pattern)

    for i in range(n - m + 1):
        if text[i:i+m] == pattern:
            result.append(i)

    return result

# KMP (Knuth-Morris-Pratt) algorithm - O(n+m) time
def kmp_search(text: str, pattern: str) -> int:
    """Efficient pattern matching using KMP algorithm"""
    if not pattern:
        return 0

    # Build LPS (Longest Prefix Suffix) array
    def build_lps(pattern):
        lps = [0] * len(pattern)
        length = 0
        i = 1

        while i < len(pattern):
            if pattern[i] == pattern[length]:
                length += 1
                lps[i] = length
                i += 1
            else:
                if length != 0:
                    length = lps[length - 1]
                else:
                    lps[i] = 0
                    i += 1

        return lps

    lps = build_lps(pattern)
    i = j = 0

    while i < len(text):
        if text[i] == pattern[j]:
            i += 1
            j += 1

            if j == len(pattern):
                return i - j  # Pattern found
        else:
            if j != 0:
                j = lps[j - 1]
            else:
                i += 1

    return -1  # Pattern not found

# Examples
text = "hello world, hello universe"
pattern = "hello"

print(substring_search_naive(text, pattern))  # 0
print(find_all_occurrences(text, pattern))  # [0, 13]
print(kmp_search(text, pattern))  # 0
```

**C#:**
```csharp
using System;
using System.Collections.Generic;

public class SubstringSearch
{
    // Naive approach - O(n*m) time
    public static int NaiveSearch(string text, string pattern)
    {
        int n = text.Length;
        int m = pattern.Length;

        if (m == 0) return 0;
        if (m > n) return -1;

        for (int i = 0; i <= n - m; i++)
        {
            int j;
            for (j = 0; j < m; j++)
            {
                if (text[i + j] != pattern[j])
                    break;
            }

            if (j == m)
                return i;  // Pattern found
        }

        return -1;  // Pattern not found
    }

    // Find all occurrences
    public static List<int> FindAllOccurrences(string text, string pattern)
    {
        var result = new List<int>();
        int n = text.Length;
        int m = pattern.Length;

        for (int i = 0; i <= n - m; i++)
        {
            bool found = true;
            for (int j = 0; j < m; j++)
            {
                if (text[i + j] != pattern[j])
                {
                    found = false;
                    break;
                }
            }

            if (found)
                result.Add(i);
        }

        return result;
    }

    // KMP Algorithm - O(n+m) time
    public static int KMPSearch(string text, string pattern)
    {
        if (string.IsNullOrEmpty(pattern)) return 0;

        int[] lps = BuildLPS(pattern);
        int i = 0, j = 0;

        while (i < text.Length)
        {
            if (text[i] == pattern[j])
            {
                i++;
                j++;

                if (j == pattern.Length)
                    return i - j;  // Pattern found
            }
            else
            {
                if (j != 0)
                    j = lps[j - 1];
                else
                    i++;
            }
        }

        return -1;  // Pattern not found
    }

    // Build LPS (Longest Prefix Suffix) array
    private static int[] BuildLPS(string pattern)
    {
        int[] lps = new int[pattern.Length];
        int length = 0;
        int i = 1;

        while (i < pattern.Length)
        {
            if (pattern[i] == pattern[length])
            {
                length++;
                lps[i] = length;
                i++;
            }
            else
            {
                if (length != 0)
                {
                    length = lps[length - 1];
                }
                else
                {
                    lps[i] = 0;
                    i++;
                }
            }
        }

        return lps;
    }
}

// Test cases
string text = "hello world, hello universe";
string pattern = "hello";

Console.WriteLine(SubstringSearch.NaiveSearch(text, pattern));  // 0
Console.WriteLine(string.Join(", ", SubstringSearch.FindAllOccurrences(text, pattern)));  // 0, 13
Console.WriteLine(SubstringSearch.KMPSearch(text, pattern));  // 0
```

### 7.4 Longest Common Prefix

Find the longest common prefix among an array of strings.

**Python:**
```python
def longest_common_prefix(strs: list) -> str:
    """Find longest common prefix using vertical scanning"""
    if not strs:
        return ""

    # Use first string as reference
    for i in range(len(strs[0])):
        char = strs[0][i]

        # Check if this character matches in all strings
        for s in strs[1:]:
            if i >= len(s) or s[i] != char:
                return strs[0][:i]

    return strs[0]

def longest_common_prefix_sort(strs: list) -> str:
    """Alternative: sort and compare first and last"""
    if not strs:
        return ""

    strs.sort()
    first = strs[0]
    last = strs[-1]

    i = 0
    while i < len(first) and i < len(last) and first[i] == last[i]:
        i += 1

    return first[:i]

# Examples
print(longest_common_prefix(["flower", "flow", "flight"]))  # "fl"
print(longest_common_prefix(["dog", "racecar", "car"]))  # ""
print(longest_common_prefix(["interspecies", "interstellar", "interstate"]))  # "inters"
```

**C#:**
```csharp
using System;
using System.Linq;

public class LongestCommonPrefix
{
    // Vertical scanning - O(S) where S is sum of all characters
    public static string FindLCP(string[] strs)
    {
        if (strs == null || strs.Length == 0)
            return "";

        // Check each character position
        for (int i = 0; i < strs[0].Length; i++)
        {
            char c = strs[0][i];

            // Compare with all other strings
            for (int j = 1; j < strs.Length; j++)
            {
                if (i >= strs[j].Length || strs[j][i] != c)
                    return strs[0].Substring(0, i);
            }
        }

        return strs[0];
    }

    // Using LINQ and sorting
    public static string FindLCPSort(string[] strs)
    {
        if (strs == null || strs.Length == 0)
            return "";

        Array.Sort(strs);
        string first = strs[0];
        string last = strs[strs.Length - 1];

        int i = 0;
        while (i < first.Length && i < last.Length && first[i] == last[i])
            i++;

        return first.Substring(0, i);
    }
}

// Test cases
string[] test1 = { "flower", "flow", "flight" };
string[] test2 = { "dog", "racecar", "car" };
string[] test3 = { "interspecies", "interstellar", "interstate" };

Console.WriteLine(LongestCommonPrefix.FindLCP(test1));  // "fl"
Console.WriteLine(LongestCommonPrefix.FindLCP(test2));  // ""
Console.WriteLine(LongestCommonPrefix.FindLCPSort(test3));  // "inters"
```

### 7.5 String Reversal Techniques

**Python:**
```python
# Word reversal
def reverse_words(s: str) -> str:
    """Reverse words in a string"""
    # Split, reverse, join
    return ' '.join(s.split()[::-1])

def reverse_words_manual(s: str) -> str:
    """Manual word reversal without built-in reverse"""
    words = s.split()
    left, right = 0, len(words) - 1

    while left < right:
        words[left], words[right] = words[right], words[left]
        left += 1
        right -= 1

    return ' '.join(words)

# Character reversal
def reverse_string(s: list) -> None:
    """Reverse string in-place (list of characters)"""
    left, right = 0, len(s) - 1

    while left < right:
        s[left], s[right] = s[right], s[left]
        left += 1
        right -= 1

# Examples
print(reverse_words("the sky is blue"))  # "blue is sky the"
print(reverse_words("  hello world  "))  # "world hello"

chars = ['h', 'e', 'l', 'l', 'o']
reverse_string(chars)
print(''.join(chars))  # "olleh"
```

**C#:**
```csharp
using System;
using System.Linq;
using System.Text;

public class StringReversal
{
    // Reverse words in a string
    public static string ReverseWords(string s)
    {
        // Split, reverse, join
        return string.Join(" ", s.Split(' ', StringSplitOptions.RemoveEmptyEntries)
                                 .Reverse());
    }

    // Reverse words manually
    public static string ReverseWordsManual(string s)
    {
        var words = s.Split(' ', StringSplitOptions.RemoveEmptyEntries);
        int left = 0, right = words.Length - 1;

        while (left < right)
        {
            var temp = words[left];
            words[left] = words[right];
            words[right] = temp;
            left++;
            right--;
        }

        return string.Join(" ", words);
    }

    // Reverse character array in-place
    public static void ReverseString(char[] s)
    {
        int left = 0, right = s.Length - 1;

        while (left < right)
        {
            char temp = s[left];
            s[left] = s[right];
            s[right] = temp;
            left++;
            right--;
        }
    }

    // Reverse each word in string
    public static string ReverseEachWord(string s)
    {
        return string.Join(" ", s.Split(' ')
                                 .Select(word => new string(word.Reverse().ToArray())));
    }
}

// Test cases
Console.WriteLine(StringReversal.ReverseWords("the sky is blue"));  // "blue is sky the"
Console.WriteLine(StringReversal.ReverseWords("  hello world  "));  // "world hello"

char[] chars = { 'h', 'e', 'l', 'l', 'o' };
StringReversal.ReverseString(chars);
Console.WriteLine(new string(chars));  // "olleh"

Console.WriteLine(StringReversal.ReverseEachWord("Let's reverse each word"));  // "s'teL esrever hcae drow"
```

**Key Points:**
- **Palindrome**: Two-pointer technique is most efficient (O(n) time, O(1) space)
- **Anagram**: Hash map approach is O(n) time; sorting is O(n log n)
- **Substring Search**: Naive is O(n*m); KMP algorithm is O(n+m)
- **String manipulation**: Understanding pointers, slicing, and built-in methods
- **Time-Space tradeoffs**: Some algorithms trade memory for speed
- **Edge cases**: Always consider empty strings, single characters, and special characters
- **C# strings are immutable**: Use StringBuilder or char arrays for in-place modifications

---

## 8. Bitwise Operations

**Difficulty**: Medium

**Question**: Explain and demonstrate common bitwise operations and their applications in solving programming problems efficiently.

**Answer**:

Bitwise operations work directly on binary representations of numbers. They are extremely fast and useful for optimization, flags, and specific problem-solving patterns.

### 8.1 Basic Bitwise Operators

**Python:**
```python
# AND (&) - Sets each bit to 1 if both bits are 1
print(12 & 10)  # 1100 & 1010 = 1000 = 8

# OR (|) - Sets each bit to 1 if at least one bit is 1
print(12 | 10)  # 1100 | 1010 = 1110 = 14

# XOR (^) - Sets each bit to 1 if only one bit is 1
print(12 ^ 10)  # 1100 ^ 1010 = 0110 = 6

# NOT (~) - Inverts all bits
print(~12)  # ~1100 = ...11110011 = -13 (two's complement)

# Left Shift (<<) - Shifts bits left, fills with 0
print(5 << 2)  # 0101 << 2 = 10100 = 20 (multiply by 2^2)

# Right Shift (>>) - Shifts bits right
print(20 >> 2)  # 10100 >> 2 = 101 = 5 (divide by 2^2)

# Useful bit manipulation functions
def get_bit(num, i):
    """Get bit at position i"""
    return (num >> i) & 1

def set_bit(num, i):
    """Set bit at position i to 1"""
    return num | (1 << i)

def clear_bit(num, i):
    """Clear bit at position i (set to 0)"""
    mask = ~(1 << i)
    return num & mask

def toggle_bit(num, i):
    """Toggle bit at position i"""
    return num ^ (1 << i)

def update_bit(num, i, bit_value):
    """Update bit at position i to bit_value (0 or 1)"""
    mask = ~(1 << i)
    return (num & mask) | (bit_value << i)

# Examples
num = 10  # Binary: 1010
print(f"Original: {num} = {bin(num)}")
print(f"Get bit 1: {get_bit(num, 1)}")  # 1
print(f"Set bit 0: {set_bit(num, 0)} = {bin(set_bit(num, 0))}")  # 11 = 1011
print(f"Clear bit 1: {clear_bit(num, 1)} = {bin(clear_bit(num, 1))}")  # 8 = 1000
print(f"Toggle bit 2: {toggle_bit(num, 2)} = {bin(toggle_bit(num, 2))}")  # 14 = 1110
```

**C#:**
```csharp
using System;

public class BitwiseOperations
{
    public static void DemonstrateBasicOperations()
    {
        // AND (&) - Sets each bit to 1 if both bits are 1
        Console.WriteLine(12 & 10);  // 1100 & 1010 = 1000 = 8

        // OR (|) - Sets each bit to 1 if at least one bit is 1
        Console.WriteLine(12 | 10);  // 1100 | 1010 = 1110 = 14

        // XOR (^) - Sets each bit to 1 if only one bit is 1
        Console.WriteLine(12 ^ 10);  // 1100 ^ 1010 = 0110 = 6

        // NOT (~) - Inverts all bits
        Console.WriteLine(~12);  // ~1100 = ...11110011 = -13

        // Left Shift (<<) - Shifts bits left
        Console.WriteLine(5 << 2);  // 0101 << 2 = 10100 = 20

        // Right Shift (>>) - Shifts bits right
        Console.WriteLine(20 >> 2);  // 10100 >> 2 = 101 = 5
    }

    // Get bit at position i
    public static int GetBit(int num, int i)
    {
        return (num >> i) & 1;
    }

    // Set bit at position i to 1
    public static int SetBit(int num, int i)
    {
        return num | (1 << i);
    }

    // Clear bit at position i (set to 0)
    public static int ClearBit(int num, int i)
    {
        int mask = ~(1 << i);
        return num & mask;
    }

    // Toggle bit at position i
    public static int ToggleBit(int num, int i)
    {
        return num ^ (1 << i);
    }

    // Update bit at position i to bitValue (0 or 1)
    public static int UpdateBit(int num, int i, int bitValue)
    {
        int mask = ~(1 << i);
        return (num & mask) | (bitValue << i);
    }

    // Check if number is power of 2
    public static bool IsPowerOfTwo(int n)
    {
        return n > 0 && (n & (n - 1)) == 0;
    }
}

// Test
int num = 10;  // Binary: 1010
Console.WriteLine($"Original: {num} = {Convert.ToString(num, 2)}");
Console.WriteLine($"Get bit 1: {BitwiseOperations.GetBit(num, 1)}");  // 1
Console.WriteLine($"Set bit 0: {BitwiseOperations.SetBit(num, 0)}");  // 11
Console.WriteLine($"Clear bit 1: {BitwiseOperations.ClearBit(num, 1)}");  // 8
Console.WriteLine($"Toggle bit 2: {BitwiseOperations.ToggleBit(num, 2)}");  // 14
```

**JavaScript:**
```javascript
// Basic operations
console.log(12 & 10);  // 8
console.log(12 | 10);  // 14
console.log(12 ^ 10);  // 6
console.log(~12);      // -13
console.log(5 << 2);   // 20
console.log(20 >> 2);  // 5

// Utility functions
function getBit(num, i) {
    return (num >> i) & 1;
}

function setBit(num, i) {
    return num | (1 << i);
}

function clearBit(num, i) {
    const mask = ~(1 << i);
    return num & mask;
}

function toggleBit(num, i) {
    return num ^ (1 << i);
}

const num = 10;  // Binary: 1010
console.log(`Original: ${num} = ${num.toString(2)}`);
console.log(`Get bit 1: ${getBit(num, 1)}`);  // 1
console.log(`Set bit 0: ${setBit(num, 0)}`);  // 11
```

### 8.2 Common Bit Manipulation Problems

**Problem 1: Count Number of 1 Bits (Hamming Weight)**

**Python:**
```python
def count_set_bits(n: int) -> int:
    """Count number of 1 bits in binary representation"""
    count = 0
    while n:
        count += n & 1  # Check if last bit is 1
        n >>= 1  # Right shift by 1
    return count

def count_set_bits_optimized(n: int) -> int:
    """Brian Kernighan's algorithm - O(number of set bits)"""
    count = 0
    while n:
        n &= n - 1  # Removes rightmost set bit
        count += 1
    return count

# Built-in method
def count_set_bits_builtin(n: int) -> int:
    return bin(n).count('1')

# Examples
print(count_set_bits(11))  # 1011 has 3 ones
print(count_set_bits_optimized(11))  # 3
print(count_set_bits_builtin(128))  # 10000000 has 1 one
```

**C#:**
```csharp
using System;

public class BitCounting
{
    // Count 1 bits - Basic approach
    public static int CountSetBits(int n)
    {
        int count = 0;
        while (n != 0)
        {
            count += n & 1;
            n >>= 1;
        }
        return count;
    }

    // Brian Kernighan's algorithm - more efficient
    public static int CountSetBitsOptimized(int n)
    {
        int count = 0;
        while (n != 0)
        {
            n &= n - 1;  // Removes rightmost set bit
            count++;
        }
        return count;
    }

    // Using built-in .NET method
    public static int CountSetBitsBuiltin(int n)
    {
        return System.Numerics.BitOperations.PopCount((uint)n);
    }
}

// Test
Console.WriteLine(BitCounting.CountSetBits(11));  // 3
Console.WriteLine(BitCounting.CountSetBitsOptimized(11));  // 3
Console.WriteLine(BitCounting.CountSetBitsBuiltin(128));  // 1
```

**Problem 2: Check if Number is Power of 2**

**Python:**
```python
def is_power_of_two(n: int) -> bool:
    """Check if n is power of 2"""
    # Power of 2 has only one bit set
    # n = 8 (1000), n-1 = 7 (0111), n & (n-1) = 0
    return n > 0 and (n & (n - 1)) == 0

def is_power_of_two_alternative(n: int) -> bool:
    """Alternative: count set bits"""
    return n > 0 and bin(n).count('1') == 1

# Examples
print(is_power_of_two(16))  # True (10000)
print(is_power_of_two(18))  # False (10010)
print(is_power_of_two(1))   # True (1)
```

**C#:**
```csharp
public class PowerOfTwo
{
    public static bool IsPowerOfTwo(int n)
    {
        return n > 0 && (n & (n - 1)) == 0;
    }

    public static bool IsPowerOfTwoAlternative(int n)
    {
        if (n <= 0) return false;
        return CountSetBits(n) == 1;
    }

    private static int CountSetBits(int n)
    {
        int count = 0;
        while (n != 0)
        {
            count += n & 1;
            n >>= 1;
        }
        return count;
    }
}

Console.WriteLine(PowerOfTwo.IsPowerOfTwo(16));  // True
Console.WriteLine(PowerOfTwo.IsPowerOfTwo(18));  // False
```

**Problem 3: Find Single Number (XOR trick)**

Given an array where every element appears twice except one, find that single element.

**Python:**
```python
def single_number(nums: list) -> int:
    """Find number that appears once using XOR

    XOR properties:
    - a ^ a = 0
    - a ^ 0 = a
    - XOR is commutative and associative
    """
    result = 0
    for num in nums:
        result ^= num
    return result

# Example
print(single_number([4, 1, 2, 1, 2]))  # 4
print(single_number([2, 2, 1]))  # 1

# Explanation:
# 4 ^ 1 ^ 2 ^ 1 ^ 2
# = 4 ^ (1 ^ 1) ^ (2 ^ 2)
# = 4 ^ 0 ^ 0
# = 4
```

**C#:**
```csharp
using System;

public class SingleNumber
{
    public static int FindSingleNumber(int[] nums)
    {
        int result = 0;
        foreach (int num in nums)
        {
            result ^= num;
        }
        return result;
    }

    // LINQ version
    public static int FindSingleNumberLinq(int[] nums)
    {
        return nums.Aggregate(0, (acc, num) => acc ^ num);
    }
}

// Test
int[] test1 = { 4, 1, 2, 1, 2 };
int[] test2 = { 2, 2, 1 };

Console.WriteLine(SingleNumber.FindSingleNumber(test1));  // 4
Console.WriteLine(SingleNumber.FindSingleNumberLinq(test2));  // 1
```

**Problem 4: Swap Two Numbers Without Temp Variable**

**Python:**
```python
def swap_xor(a: int, b: int) -> tuple:
    """Swap using XOR"""
    print(f"Before: a = {a}, b = {b}")

    a = a ^ b  # a now contains XOR of both
    b = a ^ b  # b = (a^b) ^ b = a
    a = a ^ b  # a = (a^b) ^ a = b

    print(f"After: a = {a}, b = {b}")
    return a, b

swap_xor(5, 10)

# Modern Python way (more readable)
def swap_pythonic(a: int, b: int) -> tuple:
    a, b = b, a
    return a, b
```

**C#:**
```csharp
public class Swap
{
    public static void SwapXOR(ref int a, ref int b)
    {
        Console.WriteLine($"Before: a = {a}, b = {b}");

        a = a ^ b;
        b = a ^ b;  // b = (a^b) ^ b = a
        a = a ^ b;  // a = (a^b) ^ a = b

        Console.WriteLine($"After: a = {a}, b = {b}");
    }

    // Using tuple (C# 7.0+)
    public static (int, int) SwapTuple(int a, int b)
    {
        return (b, a);
    }
}

// Test
int x = 5, y = 10;
Swap.SwapXOR(ref x, ref y);
Console.WriteLine($"x = {x}, y = {y}");  // x = 10, y = 5
```

**Problem 5: Reverse Bits**

**Python:**
```python
def reverse_bits(n: int) -> int:
    """Reverse bits of a 32-bit unsigned integer"""
    result = 0
    for i in range(32):
        # Get rightmost bit and shift result left
        result = (result << 1) | (n & 1)
        # Shift n right for next iteration
        n >>= 1
    return result

# Example
n = 43261596  # 00000010100101000001111010011100
result = reverse_bits(n)
print(f"{n} reversed = {result}")  # 964176192
print(f"Binary: {bin(n)} -> {bin(result)}")
```

**C#:**
```csharp
using System;

public class BitReversal
{
    public static uint ReverseBits(uint n)
    {
        uint result = 0;
        for (int i = 0; i < 32; i++)
        {
            result = (result << 1) | (n & 1);
            n >>= 1;
        }
        return result;
    }

    // Optimized using lookup table (for repeated calls)
    private static readonly byte[] ReverseLookup = new byte[256];

    static BitReversal()
    {
        // Pre-compute reverse of all 8-bit values
        for (int i = 0; i < 256; i++)
        {
            byte reversed = 0;
            byte val = (byte)i;
            for (int j = 0; j < 8; j++)
            {
                reversed = (byte)((reversed << 1) | (val & 1));
                val >>= 1;
            }
            ReverseLookup[i] = reversed;
        }
    }

    public static uint ReverseBitsOptimized(uint n)
    {
        return ((uint)ReverseLookup[n & 0xff] << 24) |
               ((uint)ReverseLookup[(n >> 8) & 0xff] << 16) |
               ((uint)ReverseLookup[(n >> 16) & 0xff] << 8) |
               ((uint)ReverseLookup[(n >> 24) & 0xff]);
    }
}

// Test
uint n = 43261596;
uint result = BitReversal.ReverseBits(n);
Console.WriteLine($"{n} reversed = {result}");
Console.WriteLine($"Binary: {Convert.ToString(n, 2)} -> {Convert.ToString(result, 2)}");
```

### 8.3 Bitwise Tricks and Patterns

**Python:**
```python
# 1. Multiply/Divide by powers of 2
def multiply_by_power_of_2(n: int, power: int) -> int:
    """Multiply n by 2^power"""
    return n << power

def divide_by_power_of_2(n: int, power: int) -> int:
    """Divide n by 2^power"""
    return n >> power

print(multiply_by_power_of_2(5, 3))  # 5 * 8 = 40
print(divide_by_power_of_2(40, 3))   # 40 / 8 = 5

# 2. Check if number is odd/even
def is_odd(n: int) -> bool:
    return (n & 1) == 1

def is_even(n: int) -> bool:
    return (n & 1) == 0

print(is_odd(7))   # True
print(is_even(8))  # True

# 3. Toggle case of letters
def toggle_case(char: str) -> str:
    """Toggle case using XOR with space (32 in ASCII)"""
    return chr(ord(char) ^ 32)

print(toggle_case('A'))  # 'a'
print(toggle_case('a'))  # 'A'

# 4. Get absolute value (for two's complement)
def abs_value(n: int) -> int:
    """Get absolute value using bitwise operations"""
    mask = n >> 31  # All 1s if negative, all 0s if positive
    return (n + mask) ^ mask

print(abs_value(-5))   # 5
print(abs_value(10))   # 10

# 5. Check if two numbers have opposite signs
def opposite_signs(x: int, y: int) -> bool:
    return (x ^ y) < 0

print(opposite_signs(-5, 10))  # True
print(opposite_signs(5, 10))   # False

# 6. Find minimum/maximum without branching
def min_bitwise(x: int, y: int) -> int:
    return y ^ ((x ^ y) & -(x < y))

def max_bitwise(x: int, y: int) -> int:
    return x ^ ((x ^ y) & -(x < y))

print(min_bitwise(5, 10))  # 5
print(max_bitwise(5, 10))  # 10

# 7. Set rightmost 0 bit
def set_rightmost_zero_bit(n: int) -> int:
    return n | (n + 1)

print(bin(0b1011))  # 0b1011
print(bin(set_rightmost_zero_bit(0b1011)))  # 0b1111

# 8. Isolate rightmost 1 bit
def isolate_rightmost_one_bit(n: int) -> int:
    return n & -n

print(bin(0b1100))  # 0b1100
print(bin(isolate_rightmost_one_bit(0b1100)))  # 0b100
```

**C#:**
```csharp
using System;

public class BitwiseTricks
{
    // Multiply/Divide by powers of 2
    public static int MultiplyByPowerOf2(int n, int power)
    {
        return n << power;
    }

    public static int DivideByPowerOf2(int n, int power)
    {
        return n >> power;
    }

    // Check odd/even
    public static bool IsOdd(int n)
    {
        return (n & 1) == 1;
    }

    public static bool IsEven(int n)
    {
        return (n & 1) == 0;
    }

    // Toggle case
    public static char ToggleCase(char c)
    {
        return (char)(c ^ 32);
    }

    // Check opposite signs
    public static bool OppositeSigns(int x, int y)
    {
        return (x ^ y) < 0;
    }

    // Set rightmost 0 bit
    public static int SetRightmostZeroBit(int n)
    {
        return n | (n + 1);
    }

    // Isolate rightmost 1 bit
    public static int IsolateRightmostOneBit(int n)
    {
        return n & -n;
    }

    // Clear rightmost 1 bit
    public static int ClearRightmostOneBit(int n)
    {
        return n & (n - 1);
    }
}

// Tests
Console.WriteLine(BitwiseTricks.MultiplyByPowerOf2(5, 3));  // 40
Console.WriteLine(BitwiseTricks.IsOdd(7));  // True
Console.WriteLine(BitwiseTricks.ToggleCase('A'));  // 'a'
Console.WriteLine(BitwiseTricks.OppositeSigns(-5, 10));  // True
Console.WriteLine(Convert.ToString(BitwiseTricks.IsolateRightmostOneBit(0b1100), 2));  // 100
```

**Key Points:**
- **XOR properties**: `a ^ a = 0`, `a ^ 0 = a`, commutative and associative
- **Power of 2 check**: `n & (n-1) == 0` for n > 0
- **Isolate rightmost bit**: `n & -n` (useful for Fenwick trees)
- **Clear rightmost bit**: `n & (n-1)` (Brian Kernighan's algorithm)
- **Performance**: Bitwise operations are extremely fast (single CPU cycle)
- **Use cases**: Flags, masks, permissions, optimization, competitive programming
- **Bit masks for flags**: Can store 32/64 boolean values in single int/long
- **Common patterns**: Learn to recognize when bit manipulation can optimize solutions
- **Debugging**: Use `bin()` (Python) or `Convert.ToString(n, 2)` (C#) to visualize bits
