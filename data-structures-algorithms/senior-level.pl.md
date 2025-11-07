# Struktury Danych i Algorytmy - Pytania Poziom Senior

## 1. Design and Implement an LRU Cache

**Trudność**: Medium-Hard

**Pytanie**: Design and implement a Least Recently Used (LRU) cache with O(1) time complexity for both get and put operations. Explain your design choices.

**Odpowiedź**:

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

**C# Implementation:**

```csharp
using System;
using System.Collections.Generic;

public class DLLNode
{
    public int Key { get; set; }
    public int Value { get; set; }
    public DLLNode Prev { get; set; }
    public DLLNode Next { get; set; }

    public DLLNode(int key = 0, int value = 0)
    {
        Key = key;
        Value = value;
    }
}

public class LRUCache
{
    private readonly int capacity;
    private readonly Dictionary<int, DLLNode> cache;
    private readonly DLLNode head;
    private readonly DLLNode tail;

    public LRUCache(int capacity)
    {
        this.capacity = capacity;
        cache = new Dictionary<int, DLLNode>();

        // Dummy head and tail for easier operations
        head = new DLLNode();
        tail = new DLLNode();
        head.Next = tail;
        tail.Prev = head;
    }

    private void AddToHead(DLLNode node)
    {
        // Add node right after head (most recently used)
        node.Prev = head;
        node.Next = head.Next;

        head.Next.Prev = node;
        head.Next = node;
    }

    private void RemoveNode(DLLNode node)
    {
        // Remove node from linked list
        DLLNode prevNode = node.Prev;
        DLLNode nextNode = node.Next;

        prevNode.Next = nextNode;
        nextNode.Prev = prevNode;
    }

    private void MoveToHead(DLLNode node)
    {
        // Move existing node to head (mark as recently used)
        RemoveNode(node);
        AddToHead(node);
    }

    private DLLNode RemoveTail()
    {
        // Remove least recently used item
        DLLNode lruNode = tail.Prev;
        RemoveNode(lruNode);
        return lruNode;
    }

    public int Get(int key)
    {
        // Get value for key, mark as recently used
        // Time: O(1)
        if (!cache.ContainsKey(key))
            return -1;

        DLLNode node = cache[key];
        MoveToHead(node);
        return node.Value;
    }

    public void Put(int key, int value)
    {
        // Put key-value pair, evict LRU if needed
        // Time: O(1)
        if (cache.ContainsKey(key))
        {
            // Update existing key
            DLLNode node = cache[key];
            node.Value = value;
            MoveToHead(node);
        }
        else
        {
            // Add new key
            DLLNode newNode = new DLLNode(key, value);
            cache[key] = newNode;
            AddToHead(newNode);

            if (cache.Count > capacity)
            {
                // Evict LRU
                DLLNode lruNode = RemoveTail();
                cache.Remove(lruNode.Key);
            }
        }
    }

    public override string ToString()
    {
        // Debug: show cache state
        List<string> items = new List<string>();
        DLLNode current = head.Next;
        while (current != tail)
        {
            items.Add($"{current.Key}:{current.Value}");
            current = current.Next;
        }
        return string.Join(" -> ", items);
    }
}

// Alternative: Using LinkedList<T> and Dictionary
public class LRUCacheLinkedList<TKey, TValue>
{
    private readonly int capacity;
    private readonly Dictionary<TKey, LinkedListNode<(TKey key, TValue value)>> cache;
    private readonly LinkedList<(TKey key, TValue value)> list;

    public LRUCacheLinkedList(int capacity)
    {
        this.capacity = capacity;
        cache = new Dictionary<TKey, LinkedListNode<(TKey, TValue)>>();
        list = new LinkedList<(TKey, TValue)>();
    }

    public TValue Get(TKey key)
    {
        if (!cache.ContainsKey(key))
            return default;

        var node = cache[key];
        // Move to front (most recent)
        list.Remove(node);
        list.AddFirst(node);
        return node.Value.value;
    }

    public void Put(TKey key, TValue value)
    {
        if (cache.ContainsKey(key))
        {
            // Update existing
            var node = cache[key];
            list.Remove(node);
            list.AddFirst((key, value));
            cache[key] = list.First;
        }
        else
        {
            // Add new
            list.AddFirst((key, value));
            cache[key] = list.First;

            if (cache.Count > capacity)
            {
                // Evict LRU (last item)
                var lruKey = list.Last.Value.key;
                cache.Remove(lruKey);
                list.RemoveLast();
            }
        }
    }
}

// Usage example
class Program
{
    static void Main()
    {
        var cache = new LRUCache(3);

        cache.Put(1, 10);
        cache.Put(2, 20);
        cache.Put(3, 30);
        Console.WriteLine(cache);  // 3:30 -> 2:20 -> 1:10

        Console.WriteLine(cache.Get(2));  // 20
        Console.WriteLine(cache);  // 2:20 -> 3:30 -> 1:10 (2 moved to front)

        cache.Put(4, 40);  // Evicts key 1 (LRU)
        Console.WriteLine(cache);  // 4:40 -> 2:20 -> 3:30

        Console.WriteLine(cache.Get(1));  // -1 (not found)

        // Using generic version
        var cacheGeneric = new LRUCacheLinkedList<string, int>(2);
        cacheGeneric.Put("a", 1);
        cacheGeneric.Put("b", 2);
        Console.WriteLine(cacheGeneric.Get("a"));  // 1
        cacheGeneric.Put("c", 3);  // Evicts "b"
        Console.WriteLine(cacheGeneric.Get("b"));  // default (0)
    }
}
```

**Key Points:**
- Doubly linked list enables O(1) addition/removal
- Hash map enables O(1) key lookup
- Dummy nodes simplify edge cases
- Access counts as "use" - move to head
- Thread-safety would require locks
- C# LinkedList<T> provides built-in doubly-linked list

---

## 2. Implement a Trie (Prefix Tree)

**Trudność**: Medium

**Pytanie**: Implement a trie data structure with insert, search, and startsWith operations. Discuss time and space complexity and real-world applications.

**Odpowiedź**:

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

**C# Implementation:**

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

public class TrieNode
{
    public Dictionary<char, TrieNode> Children { get; set; }
    public bool IsEndOfWord { get; set; }
    public int WordCount { get; set; }

    public TrieNode()
    {
        Children = new Dictionary<char, TrieNode>();
        IsEndOfWord = false;
        WordCount = 0;
    }
}

public class Trie
{
    private readonly TrieNode root;

    public Trie()
    {
        root = new TrieNode();
    }

    public void Insert(string word)
    {
        // Time: O(m) where m is word length
        // Space: O(m) in worst case
        TrieNode node = root;

        foreach (char c in word)
        {
            if (!node.Children.ContainsKey(c))
            {
                node.Children[c] = new TrieNode();
            }
            node = node.Children[c];
            node.WordCount++;
        }

        node.IsEndOfWord = true;
    }

    public bool Search(string word)
    {
        // Search for exact word match - Time: O(m)
        TrieNode node = FindNode(word);
        return node != null && node.IsEndOfWord;
    }

    public bool StartsWith(string prefix)
    {
        // Check if any word starts with prefix - Time: O(m)
        return FindNode(prefix) != null;
    }

    private TrieNode FindNode(string prefix)
    {
        // Helper: navigate to node representing prefix
        TrieNode node = root;

        foreach (char c in prefix)
        {
            if (!node.Children.ContainsKey(c))
                return null;
            node = node.Children[c];
        }

        return node;
    }

    public List<string> Autocomplete(string prefix)
    {
        // Get all words with given prefix
        // Time: O(p + n) where p is prefix length, n is nodes in subtree
        TrieNode node = FindNode(prefix);
        if (node == null)
            return new List<string>();

        List<string> words = new List<string>();
        DfsCollectWords(node, prefix, words);
        return words;
    }

    private void DfsCollectWords(TrieNode node, string currentWord, List<string> words)
    {
        // DFS to collect all words from a node
        if (node.IsEndOfWord)
        {
            words.Add(currentWord);
        }

        foreach (var kvp in node.Children)
        {
            DfsCollectWords(kvp.Value, currentWord + kvp.Key, words);
        }
    }

    public bool Delete(string word)
    {
        // Delete a word from trie - Time: O(m)
        return DeleteRecursive(root, word, 0);
    }

    private bool DeleteRecursive(TrieNode node, string word, int index)
    {
        if (index == word.Length)
        {
            if (!node.IsEndOfWord)
                return false; // Word not found

            node.IsEndOfWord = false;
            // Delete node if it has no children
            return node.Children.Count == 0;
        }

        char c = word[index];
        if (!node.Children.ContainsKey(c))
            return false;

        TrieNode childNode = node.Children[c];
        bool shouldDeleteChild = DeleteRecursive(childNode, word, index + 1);

        if (shouldDeleteChild)
        {
            node.Children.Remove(c);
            // Delete current node if no children and not end of word
            return node.Children.Count == 0 && !node.IsEndOfWord;
        }

        return false;
    }

    public int CountWordsWithPrefix(string prefix)
    {
        // Count words that start with prefix
        TrieNode node = FindNode(prefix);
        return node?.WordCount ?? 0;
    }

    public string LongestCommonPrefix()
    {
        // Find longest common prefix of all words
        if (root.Children.Count == 0)
            return "";

        List<char> prefix = new List<char>();
        TrieNode node = root;

        while (node.Children.Count == 1 && !node.IsEndOfWord)
        {
            char c = node.Children.Keys.First();
            prefix.Add(c);
            node = node.Children[c];
        }

        return new string(prefix.ToArray());
    }
}

// Space-Optimized Trie using Arrays (for lowercase letters only)
public class CompactTrieNode
{
    public CompactTrieNode[] Children { get; set; }
    public bool IsEnd { get; set; }

    public CompactTrieNode()
    {
        Children = new CompactTrieNode[26]; // a-z
        IsEnd = false;
    }

    public int GetIndex(char c)
    {
        return c - 'a';
    }
}

public class CompactTrie
{
    private readonly CompactTrieNode root;

    public CompactTrie()
    {
        root = new CompactTrieNode();
    }

    public void Insert(string word)
    {
        CompactTrieNode node = root;
        foreach (char c in word)
        {
            int idx = node.GetIndex(c);
            if (node.Children[idx] == null)
            {
                node.Children[idx] = new CompactTrieNode();
            }
            node = node.Children[idx];
        }
        node.IsEnd = true;
    }

    public bool Search(string word)
    {
        CompactTrieNode node = root;
        foreach (char c in word)
        {
            int idx = node.GetIndex(c);
            if (node.Children[idx] == null)
                return false;
            node = node.Children[idx];
        }
        return node.IsEnd;
    }
}

// Usage example
class Program
{
    static void Main()
    {
        Trie trie = new Trie();
        string[] words = { "apple", "app", "apricot", "banana", "band" };

        foreach (var word in words)
        {
            trie.Insert(word);
        }

        // Search operations
        Console.WriteLine(trie.Search("apple"));      // True
        Console.WriteLine(trie.Search("app"));        // True
        Console.WriteLine(trie.Search("appl"));       // False

        // Prefix operations
        Console.WriteLine(trie.StartsWith("app"));    // True
        Console.WriteLine(trie.StartsWith("ban"));    // True
        Console.WriteLine(trie.StartsWith("cat"));    // False

        // Autocomplete
        var appWords = trie.Autocomplete("app");
        Console.WriteLine(string.Join(", ", appWords)); // app, apple, apricot

        var banWords = trie.Autocomplete("ban");
        Console.WriteLine(string.Join(", ", banWords)); // banana, band

        // Advanced operations
        Console.WriteLine(trie.CountWordsWithPrefix("ap"));  // 3

        // Delete
        trie.Delete("app");
        Console.WriteLine(trie.Search("app"));        // False
        Console.WriteLine(trie.Search("apple"));      // True (still exists)

        // Compact Trie for lowercase only
        CompactTrie compactTrie = new CompactTrie();
        compactTrie.Insert("hello");
        compactTrie.Insert("world");
        Console.WriteLine(compactTrie.Search("hello")); // True
    }
}
```

**Key Points:**
- Each path from root represents a string
- Shared prefixes share nodes (space efficient)
- No collisions like hash tables
- Memory usage increases with alphabet size
- Can be compressed with radix trees for sparse data
- C# Dictionary<char, TrieNode> for flexible character sets
- Array-based implementation for fixed alphabets (more memory efficient)

---

## 3. Serialize and Deserialize Binary Tree

**Trudność**: Hard

**Pytanie**: Design an algorithm to serialize and deserialize a binary tree. The serialization format should be compact and the deserialization should reconstruct the exact tree structure.

**Odpowiedź**:

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

**C# Implementation:**

```csharp
using System;
using System.Collections.Generic;
using System.Text;

public class TreeNode
{
    public int val;
    public TreeNode left;
    public TreeNode right;

    public TreeNode(int val = 0, TreeNode left = null, TreeNode right = null)
    {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// Solution 1: Level-Order Traversal (BFS)
public class Codec
{
    public string Serialize(TreeNode root)
    {
        // Serialize tree to string using level-order traversal
        // Time: O(n), Space: O(n)
        if (root == null)
            return "[]";

        List<string> result = new List<string>();
        Queue<TreeNode> queue = new Queue<TreeNode>();
        queue.Enqueue(root);

        while (queue.Count > 0)
        {
            TreeNode node = queue.Dequeue();

            if (node != null)
            {
                result.Add(node.val.ToString());
                queue.Enqueue(node.left);
                queue.Enqueue(node.right);
            }
            else
            {
                result.Add("null");
            }
        }

        // Remove trailing nulls for compactness
        while (result.Count > 0 && result[result.Count - 1] == "null")
        {
            result.RemoveAt(result.Count - 1);
        }

        return "[" + string.Join(",", result) + "]";
    }

    public TreeNode Deserialize(string data)
    {
        // Deserialize string to tree
        // Time: O(n), Space: O(n)
        if (data == "[]")
            return null;

        // Parse string
        string[] values = data.Substring(1, data.Length - 2).Split(',');
        TreeNode root = new TreeNode(int.Parse(values[0]));
        Queue<TreeNode> queue = new Queue<TreeNode>();
        queue.Enqueue(root);
        int i = 1;

        while (queue.Count > 0 && i < values.Length)
        {
            TreeNode node = queue.Dequeue();

            // Process left child
            if (i < values.Length && values[i] != "null")
            {
                node.left = new TreeNode(int.Parse(values[i]));
                queue.Enqueue(node.left);
            }
            i++;

            // Process right child
            if (i < values.Length && values[i] != "null")
            {
                node.right = new TreeNode(int.Parse(values[i]));
                queue.Enqueue(node.right);
            }
            i++;
        }

        return root;
    }
}

// Solution 2: Pre-order Traversal (DFS)
public class CodecPreorder
{
    public string Serialize(TreeNode root)
    {
        // Serialize using preorder traversal
        // More compact for unbalanced trees
        List<string> values = new List<string>();
        SerializeDfs(root, values);
        return string.Join(",", values);
    }

    private void SerializeDfs(TreeNode node, List<string> values)
    {
        if (node == null)
        {
            values.Add("null");
            return;
        }

        values.Add(node.val.ToString());
        SerializeDfs(node.left, values);
        SerializeDfs(node.right, values);
    }

    public TreeNode Deserialize(string data)
    {
        // Deserialize using preorder traversal
        Queue<string> values = new Queue<string>(data.Split(','));
        return DeserializeDfs(values);
    }

    private TreeNode DeserializeDfs(Queue<string> values)
    {
        string val = values.Dequeue();
        if (val == "null")
            return null;

        TreeNode node = new TreeNode(int.Parse(val));
        node.left = DeserializeDfs(values);
        node.right = DeserializeDfs(values);
        return node;
    }
}

// Solution 3: Parenthetic Representation
public class CodecParenthetic
{
    public string Serialize(TreeNode root)
    {
        // Serialize as: node(left)(right)
        // More human-readable
        if (root == null)
            return "()";

        string left = Serialize(root.left);
        string right = Serialize(root.right);

        return $"{root.val}({left})({right})";
    }

    public TreeNode Deserialize(string data)
    {
        // Parse parenthetic representation
        if (data == "()")
            return null;

        // Find value and first parenthesis
        int i = 0;
        while (i < data.Length && data[i] != '(' && data[i] != ')')
        {
            i++;
        }

        int val = int.Parse(data.Substring(0, i));
        TreeNode node = new TreeNode(val);

        // Find matching parentheses for left subtree
        int count = 0;
        int start = i;
        for (int j = i; j < data.Length; j++)
        {
            if (data[j] == '(')
                count++;
            else if (data[j] == ')')
                count--;

            if (count == 0)
            {
                node.left = Deserialize(data.Substring(start + 1, j - start - 1));
                node.right = Deserialize(data.Substring(j + 2, data.Length - j - 3));
                break;
            }
        }

        return node;
    }
}

// Usage example
class Program
{
    static void Main()
    {
        // Build tree:      1
        //                /   \
        //               2     3
        //                    / \
        //                   4   5
        TreeNode root = new TreeNode(1);
        root.left = new TreeNode(2);
        root.right = new TreeNode(3);
        root.right.left = new TreeNode(4);
        root.right.right = new TreeNode(5);

        // Test Solution 1: Level-order
        Codec codec = new Codec();
        string serialized = codec.Serialize(root);
        Console.WriteLine($"Serialized: {serialized}");  // [1,2,3,null,null,4,5]

        TreeNode deserialized = codec.Deserialize(serialized);
        Console.WriteLine($"Re-serialized: {codec.Serialize(deserialized)}");

        // Test Solution 2: Preorder
        CodecPreorder codec2 = new CodecPreorder();
        string serialized2 = codec2.Serialize(root);
        Console.WriteLine($"Preorder: {serialized2}");  // 1,2,null,null,3,4,null,null,5,null,null

        // Test Solution 3: Parenthetic
        CodecParenthetic codec3 = new CodecParenthetic();
        string serialized3 = codec3.Serialize(root);
        Console.WriteLine($"Parenthetic: {serialized3}");  // 1(2(()()))(3(4(()()))(5(()())))

        // Test edge cases
        Console.WriteLine("\nEdge cases:");
        Console.WriteLine(codec.Serialize(null));  // []
        Console.WriteLine(codec.Serialize(new TreeNode(1)));  // [1]
    }
}
```

**Key Points:**
- Must preserve null nodes to maintain structure
- Level-order is intuitive and mirrors visual representation
- Preorder is recursive and compact
- Choose format based on requirements (size vs readability)
- Both serialization and deserialization are O(n)
- C# Queue<T> for BFS, recursion for DFS
- StringBuilder can optimize string concatenation for large trees

---

## 4. Find Median from Data Stream

**Trudność**: Hard

**Pytanie**: Design a data structure that supports adding numbers from a stream and finding the median efficiently. Optimize for the case where findMedian is called frequently.

**Odpowiedź**:

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

**C# Implementation - Two Heaps with PriorityQueue:**

```csharp
using System;
using System.Collections.Generic;

// Available in .NET 6+
public class MedianFinder
{
    // Max heap for smaller half (negate priority for max behavior)
    private PriorityQueue<int, int> small;
    // Min heap for larger half
    private PriorityQueue<int, int> large;

    public MedianFinder()
    {
        // Max heap: negate values to reverse min heap behavior
        small = new PriorityQueue<int, int>();
        large = new PriorityQueue<int, int>();
    }

    public void AddNum(int num)
    {
        // Add to max heap (small half) - negate for max behavior
        small.Enqueue(num, -num);

        // Balance: ensure all elements in small <= all in large
        if (small.Count > 0 && large.Count > 0)
        {
            int smallMax = small.Peek();
            int largeMin = large.Peek();

            if (smallMax > largeMin)
            {
                small.Dequeue();
                large.Enqueue(smallMax, smallMax);
            }
        }

        // Balance sizes: small can have at most 1 more element
        if (small.Count > large.Count + 1)
        {
            int val = small.Dequeue();
            large.Enqueue(val, val);
        }
        else if (large.Count > small.Count)
        {
            int val = large.Dequeue();
            small.Enqueue(val, -val);
        }
    }

    public double FindMedian()
    {
        if (small.Count > large.Count)
        {
            return small.Peek();
        }
        else
        {
            return (small.Peek() + large.Peek()) / 2.0;
        }
    }

    public int Size()
    {
        return small.Count + large.Count;
    }
}

// Usage example
class Program
{
    static void Main()
    {
        var mf = new MedianFinder();
        mf.AddNum(1);
        mf.AddNum(2);
        Console.WriteLine(mf.FindMedian()); // 1.5

        mf.AddNum(3);
        Console.WriteLine(mf.FindMedian()); // 2.0

        mf.AddNum(4);
        mf.AddNum(5);
        Console.WriteLine(mf.FindMedian()); // 3.0
    }
}
```

**C# Alternative - Custom Min/Max Heap (Pre-.NET 6):**

```csharp
using System;
using System.Collections.Generic;

public class MinHeap
{
    private List<int> heap = new List<int>();

    public int Count => heap.Count;

    public void Add(int value)
    {
        heap.Add(value);
        HeapifyUp(heap.Count - 1);
    }

    public int Peek() => heap[0];

    public int Remove()
    {
        int result = heap[0];
        heap[0] = heap[heap.Count - 1];
        heap.RemoveAt(heap.Count - 1);
        if (heap.Count > 0)
            HeapifyDown(0);
        return result;
    }

    private void HeapifyUp(int index)
    {
        while (index > 0)
        {
            int parent = (index - 1) / 2;
            if (heap[index] >= heap[parent])
                break;

            Swap(index, parent);
            index = parent;
        }
    }

    private void HeapifyDown(int index)
    {
        while (true)
        {
            int smallest = index;
            int left = 2 * index + 1;
            int right = 2 * index + 2;

            if (left < heap.Count && heap[left] < heap[smallest])
                smallest = left;
            if (right < heap.Count && heap[right] < heap[smallest])
                smallest = right;

            if (smallest == index)
                break;

            Swap(index, smallest);
            index = smallest;
        }
    }

    private void Swap(int i, int j)
    {
        int temp = heap[i];
        heap[i] = heap[j];
        heap[j] = temp;
    }
}

public class MaxHeap
{
    private List<int> heap = new List<int>();

    public int Count => heap.Count;

    public void Add(int value)
    {
        heap.Add(value);
        HeapifyUp(heap.Count - 1);
    }

    public int Peek() => heap[0];

    public int Remove()
    {
        int result = heap[0];
        heap[0] = heap[heap.Count - 1];
        heap.RemoveAt(heap.Count - 1);
        if (heap.Count > 0)
            HeapifyDown(0);
        return result;
    }

    private void HeapifyUp(int index)
    {
        while (index > 0)
        {
            int parent = (index - 1) / 2;
            if (heap[index] <= heap[parent]) // Max heap condition
                break;

            Swap(index, parent);
            index = parent;
        }
    }

    private void HeapifyDown(int index)
    {
        while (true)
        {
            int largest = index;
            int left = 2 * index + 1;
            int right = 2 * index + 2;

            if (left < heap.Count && heap[left] > heap[largest]) // Max heap
                largest = left;
            if (right < heap.Count && heap[right] > heap[largest])
                largest = right;

            if (largest == index)
                break;

            Swap(index, largest);
            index = largest;
        }
    }

    private void Swap(int i, int j)
    {
        int temp = heap[i];
        heap[i] = heap[j];
        heap[j] = temp;
    }
}

public class MedianFinderCustomHeaps
{
    private MaxHeap small; // Smaller half (max heap)
    private MinHeap large; // Larger half (min heap)

    public MedianFinderCustomHeaps()
    {
        small = new MaxHeap();
        large = new MinHeap();
    }

    public void AddNum(int num)
    {
        // Add to max heap (small half)
        small.Add(num);

        // Balance: ensure all elements in small <= all in large
        if (small.Count > 0 && large.Count > 0 && small.Peek() > large.Peek())
        {
            int val = small.Remove();
            large.Add(val);
        }

        // Balance sizes: small can have at most 1 more element
        if (small.Count > large.Count + 1)
        {
            int val = small.Remove();
            large.Add(val);
        }
        else if (large.Count > small.Count)
        {
            int val = large.Remove();
            small.Add(val);
        }
    }

    public double FindMedian()
    {
        if (small.Count > large.Count)
        {
            return small.Peek();
        }
        else
        {
            return (small.Peek() + large.Peek()) / 2.0;
        }
    }
}
```

**C# Alternative - Using SortedSet:**

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

public class MedianFinderSorted
{
    private List<int> nums;

    public MedianFinderSorted()
    {
        nums = new List<int>();
    }

    public void AddNum(int num)
    {
        // Binary search to find insertion position
        int index = nums.BinarySearch(num);
        if (index < 0)
            index = ~index; // BinarySearch returns bitwise complement if not found

        nums.Insert(index, num);
    }

    public double FindMedian()
    {
        int n = nums.Count;
        if (n % 2 == 0)
        {
            return (nums[n / 2 - 1] + nums[n / 2]) / 2.0;
        }
        else
        {
            return nums[n / 2];
        }
    }
}

// Verbose example to visualize process
class MedianFinderVerbose
{
    private MedianFinder mf = new MedianFinder();

    public void AddNum(int num)
    {
        mf.AddNum(num);
        Console.WriteLine($"Added {num}, Median: {mf.FindMedian()}");
    }

    static void Main()
    {
        var mfv = new MedianFinderVerbose();
        foreach (int num in new[] { 5, 15, 1, 3, 8, 7, 9, 10 })
        {
            mfv.AddNum(num);
        }

        // Output:
        // Added 5, Median: 5
        // Added 15, Median: 10
        // Added 1, Median: 5
        // Added 3, Median: 4
        // Added 8, Median: 5
        // Added 7, Median: 6
        // Added 9, Median: 7
        // Added 10, Median: 7.5
    }
}
```

**C# Percentile Finder:**

```csharp
using System;
using System.Collections.Generic;

public class PercentileFinder
{
    private double percentile;
    private List<int> nums;

    public PercentileFinder(double percentile = 0.99)
    {
        this.percentile = percentile;
        this.nums = new List<int>();
    }

    public void AddNum(int num)
    {
        int index = nums.BinarySearch(num);
        if (index < 0)
            index = ~index;
        nums.Insert(index, num);
    }

    public int? FindPercentile()
    {
        int n = nums.Count;
        if (n == 0)
            return null;

        int idx = (int)(n * percentile);
        return nums[Math.Min(idx, n - 1)];
    }

    static void Main()
    {
        var pf = new PercentileFinder(0.99);
        for (int i = 0; i < 100; i++)
        {
            pf.AddNum(i);
        }
        Console.WriteLine(pf.FindPercentile()); // 99
    }
}
```

---

## 5. Graph Algorithms: Detect Cycles in Directed Graph

**Trudność**: Medium-Hard

**Pytanie**: Implement algorithms to detect cycles in both directed and undirected graphs. Explain the differences in approach and provide examples of real-world applications.

**Odpowiedź**:

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

**C# Implementation - Directed Graph with DFS (Colors):**

```csharp
using System;
using System.Collections.Generic;

public class DirectedGraph
{
    private int vertices;
    private Dictionary<int, List<int>> graph;

    public DirectedGraph(int vertices)
    {
        this.vertices = vertices;
        this.graph = new Dictionary<int, List<int>>();
        for (int i = 0; i < vertices; i++)
        {
            graph[i] = new List<int>();
        }
    }

    public void AddEdge(int u, int v)
    {
        graph[u].Add(v);
    }

    public bool HasCycleDFS()
    {
        // WHITE (0): unvisited
        // GRAY (1): in current DFS path (visiting)
        // BLACK (2): completely processed
        const int WHITE = 0, GRAY = 1, BLACK = 2;
        int[] color = new int[vertices];

        bool DFS(int node)
        {
            color[node] = GRAY; // Mark as being processed

            foreach (int neighbor in graph[node])
            {
                if (color[neighbor] == GRAY)
                {
                    // Back edge to node in current path = cycle
                    return true;
                }
                if (color[neighbor] == WHITE && DFS(neighbor))
                {
                    return true;
                }
            }

            color[node] = BLACK; // Done processing
            return false;
        }

        // Check all components
        for (int vertex = 0; vertex < vertices; vertex++)
        {
            if (color[vertex] == WHITE)
            {
                if (DFS(vertex))
                    return true;
            }
        }

        return false;
    }

    public (bool hasCycle, List<int> cyclePath) HasCycleDFSWithPath()
    {
        const int WHITE = 0, GRAY = 1, BLACK = 2;
        int[] color = new int[vertices];

        List<int> DFS(int node, List<int> path)
        {
            color[node] = GRAY;
            path.Add(node);

            foreach (int neighbor in graph[node])
            {
                if (color[neighbor] == GRAY)
                {
                    // Found cycle, extract it
                    int cycleStart = path.IndexOf(neighbor);
                    List<int> cycle = path.GetRange(cycleStart, path.Count - cycleStart);
                    cycle.Add(neighbor);
                    return cycle;
                }
                if (color[neighbor] == WHITE)
                {
                    List<int> result = DFS(neighbor, path);
                    if (result != null)
                        return result;
                }
            }

            color[node] = BLACK;
            path.RemoveAt(path.Count - 1);
            return null;
        }

        for (int vertex = 0; vertex < vertices; vertex++)
        {
            if (color[vertex] == WHITE)
            {
                List<int> cycle = DFS(vertex, new List<int>());
                if (cycle != null)
                    return (true, cycle);
            }
        }

        return (false, new List<int>());
    }
}

// Test directed graph
class DirectedGraphTest
{
    static void Main()
    {
        var dg = new DirectedGraph(4);
        dg.AddEdge(0, 1);
        dg.AddEdge(1, 2);
        dg.AddEdge(2, 3);
        dg.AddEdge(3, 1);  // Creates cycle: 1 -> 2 -> 3 -> 1

        Console.WriteLine($"Has cycle: {dg.HasCycleDFS()}");  // True
        var (hasCycle, cyclePath) = dg.HasCycleDFSWithPath();
        Console.WriteLine($"Cycle path: [{string.Join(", ", cyclePath)}]");  // [1, 2, 3, 1]
    }
}
```

**C# Implementation - Kahn's Algorithm (Topological Sort):**

```csharp
using System;
using System.Collections.Generic;

public class DirectedGraphKahn
{
    private int vertices;
    private Dictionary<int, List<int>> graph;

    public DirectedGraphKahn(int vertices)
    {
        this.vertices = vertices;
        this.graph = new Dictionary<int, List<int>>();
        for (int i = 0; i < vertices; i++)
        {
            graph[i] = new List<int>();
        }
    }

    public void AddEdge(int u, int v)
    {
        graph[u].Add(v);
    }

    public bool HasCycleKahn()
    {
        // Calculate in-degrees
        int[] inDegree = new int[vertices];
        for (int u = 0; u < vertices; u++)
        {
            foreach (int v in graph[u])
            {
                inDegree[v]++;
            }
        }

        // Queue all nodes with in-degree 0
        Queue<int> queue = new Queue<int>();
        for (int i = 0; i < vertices; i++)
        {
            if (inDegree[i] == 0)
                queue.Enqueue(i);
        }

        int processed = 0;

        while (queue.Count > 0)
        {
            int node = queue.Dequeue();
            processed++;

            // Reduce in-degree of neighbors
            foreach (int neighbor in graph[node])
            {
                inDegree[neighbor]--;
                if (inDegree[neighbor] == 0)
                    queue.Enqueue(neighbor);
            }
        }

        // If not all nodes processed, cycle exists
        return processed != vertices;
    }

    public (bool hasCycle, List<int> topologicalOrder) TopologicalSort()
    {
        int[] inDegree = new int[vertices];
        for (int u = 0; u < vertices; u++)
        {
            foreach (int v in graph[u])
            {
                inDegree[v]++;
            }
        }

        Queue<int> queue = new Queue<int>();
        for (int i = 0; i < vertices; i++)
        {
            if (inDegree[i] == 0)
                queue.Enqueue(i);
        }

        List<int> topOrder = new List<int>();

        while (queue.Count > 0)
        {
            int node = queue.Dequeue();
            topOrder.Add(node);

            foreach (int neighbor in graph[node])
            {
                inDegree[neighbor]--;
                if (inDegree[neighbor] == 0)
                    queue.Enqueue(neighbor);
            }
        }

        bool hasCycle = topOrder.Count != vertices;
        return (hasCycle, topOrder);
    }

    static void Main()
    {
        var dgk = new DirectedGraphKahn(4);
        dgk.AddEdge(0, 1);
        dgk.AddEdge(1, 2);
        dgk.AddEdge(2, 3);
        dgk.AddEdge(3, 1);  // Cycle

        Console.WriteLine($"Has cycle (Kahn): {dgk.HasCycleKahn()}");  // True

        // Test without cycle
        var dag = new DirectedGraphKahn(4);
        dag.AddEdge(0, 1);
        dag.AddEdge(0, 2);
        dag.AddEdge(1, 3);
        dag.AddEdge(2, 3);

        var (hasCycle, order) = dag.TopologicalSort();
        Console.WriteLine($"Has cycle: {hasCycle}");  // False
        Console.WriteLine($"Topological order: [{string.Join(", ", order)}]");  // [0, 1, 2, 3] or [0, 2, 1, 3]
    }
}
```

**C# Implementation - Undirected Graph with DFS:**

```csharp
using System;
using System.Collections.Generic;

public class UndirectedGraph
{
    private int vertices;
    private Dictionary<int, List<int>> graph;

    public UndirectedGraph(int vertices)
    {
        this.vertices = vertices;
        this.graph = new Dictionary<int, List<int>>();
        for (int i = 0; i < vertices; i++)
        {
            graph[i] = new List<int>();
        }
    }

    public void AddEdge(int u, int v)
    {
        graph[u].Add(v);
        graph[v].Add(u);
    }

    public bool HasCycleDFS()
    {
        bool[] visited = new bool[vertices];

        bool DFS(int node, int parent)
        {
            visited[node] = true;

            foreach (int neighbor in graph[node])
            {
                if (!visited[neighbor])
                {
                    if (DFS(neighbor, node))
                        return true;
                }
                else if (neighbor != parent)
                {
                    // Visited neighbor that's not parent = cycle
                    return true;
                }
            }

            return false;
        }

        // Check all components
        for (int vertex = 0; vertex < vertices; vertex++)
        {
            if (!visited[vertex])
            {
                if (DFS(vertex, -1))
                    return true;
            }
        }

        return false;
    }

    static void Main()
    {
        var ug = new UndirectedGraph(5);
        ug.AddEdge(0, 1);
        ug.AddEdge(1, 2);
        ug.AddEdge(2, 3);
        ug.AddEdge(3, 4);
        ug.AddEdge(4, 1);  // Creates cycle

        Console.WriteLine($"Undirected has cycle: {ug.HasCycleDFS()}");  // True
    }
}
```

**C# Implementation - Union-Find for Undirected Graph:**

```csharp
using System;
using System.Collections.Generic;

public class UnionFind
{
    private int[] parent;
    private int[] rank;

    public UnionFind(int size)
    {
        parent = new int[size];
        rank = new int[size];

        for (int i = 0; i < size; i++)
        {
            parent[i] = i;
            rank[i] = 0;
        }
    }

    public int Find(int x)
    {
        // Find with path compression
        if (parent[x] != x)
        {
            parent[x] = Find(parent[x]);
        }
        return parent[x];
    }

    public bool Union(int x, int y)
    {
        // Union by rank, returns false if already in same set
        int rootX = Find(x);
        int rootY = Find(y);

        if (rootX == rootY)
        {
            return false;  // Cycle detected
        }

        // Union by rank
        if (rank[rootX] < rank[rootY])
        {
            parent[rootX] = rootY;
        }
        else if (rank[rootX] > rank[rootY])
        {
            parent[rootY] = rootX;
        }
        else
        {
            parent[rootY] = rootX;
            rank[rootX]++;
        }

        return true;
    }

    public bool IsConnected(int x, int y)
    {
        return Find(x) == Find(y);
    }
}

public class UndirectedGraphUnionFind
{
    private int vertices;
    private List<(int u, int v)> edges;

    public UndirectedGraphUnionFind(int vertices)
    {
        this.vertices = vertices;
        this.edges = new List<(int, int)>();
    }

    public void AddEdge(int u, int v)
    {
        edges.Add((u, v));
    }

    public bool HasCycleUnionFind()
    {
        UnionFind uf = new UnionFind(vertices);

        foreach (var (u, v) in edges)
        {
            if (!uf.Union(u, v))
            {
                return true;  // Adding edge creates cycle
            }
        }

        return false;
    }

    static void Main()
    {
        var uguf = new UndirectedGraphUnionFind(3);
        uguf.AddEdge(0, 1);
        uguf.AddEdge(1, 2);
        uguf.AddEdge(2, 0);  // Cycle

        Console.WriteLine($"Has cycle (Union-Find): {uguf.HasCycleUnionFind()}");  // True

        // Test without cycle
        var tree = new UndirectedGraphUnionFind(4);
        tree.AddEdge(0, 1);
        tree.AddEdge(0, 2);
        tree.AddEdge(0, 3);

        Console.WriteLine($"Tree has cycle: {tree.HasCycleUnionFind()}");  // False
    }
}
```

**C# Advanced - Generic Graph with Cycle Detection:**

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

public class Graph<T> where T : IEquatable<T>
{
    private Dictionary<T, List<T>> adjacencyList;
    private bool isDirected;

    public Graph(bool isDirected = true)
    {
        this.adjacencyList = new Dictionary<T, List<T>>();
        this.isDirected = isDirected;
    }

    public void AddVertex(T vertex)
    {
        if (!adjacencyList.ContainsKey(vertex))
        {
            adjacencyList[vertex] = new List<T>();
        }
    }

    public void AddEdge(T from, T to)
    {
        AddVertex(from);
        AddVertex(to);

        adjacencyList[from].Add(to);

        if (!isDirected)
        {
            adjacencyList[to].Add(from);
        }
    }

    public bool HasCycle()
    {
        if (isDirected)
        {
            return HasCycleDirected();
        }
        else
        {
            return HasCycleUndirected();
        }
    }

    private bool HasCycleDirected()
    {
        var color = new Dictionary<T, int>();
        foreach (var vertex in adjacencyList.Keys)
        {
            color[vertex] = 0; // WHITE
        }

        bool DFS(T node)
        {
            color[node] = 1; // GRAY

            foreach (var neighbor in adjacencyList[node])
            {
                if (color[neighbor] == 1)
                    return true;
                if (color[neighbor] == 0 && DFS(neighbor))
                    return true;
            }

            color[node] = 2; // BLACK
            return false;
        }

        return adjacencyList.Keys.Any(vertex => color[vertex] == 0 && DFS(vertex));
    }

    private bool HasCycleUndirected()
    {
        var visited = new HashSet<T>();

        bool DFS(T node, T parent)
        {
            visited.Add(node);

            foreach (var neighbor in adjacencyList[node])
            {
                if (!visited.Contains(neighbor))
                {
                    if (DFS(neighbor, node))
                        return true;
                }
                else if (!neighbor.Equals(parent))
                {
                    return true;
                }
            }

            return false;
        }

        return adjacencyList.Keys.Any(vertex => !visited.Contains(vertex) && DFS(vertex, default(T)));
    }

    static void Main()
    {
        // Directed graph with strings
        var dirGraph = new Graph<string>(isDirected: true);
        dirGraph.AddEdge("A", "B");
        dirGraph.AddEdge("B", "C");
        dirGraph.AddEdge("C", "A");  // Cycle

        Console.WriteLine($"Directed graph has cycle: {dirGraph.HasCycle()}");  // True

        // Undirected graph with integers
        var undirGraph = new Graph<int>(isDirected: false);
        undirGraph.AddEdge(1, 2);
        undirGraph.AddEdge(2, 3);
        undirGraph.AddEdge(3, 4);

        Console.WriteLine($"Undirected graph has cycle: {undirGraph.HasCycle()}");  // False
    }
}
```

