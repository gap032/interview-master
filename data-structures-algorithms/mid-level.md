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

