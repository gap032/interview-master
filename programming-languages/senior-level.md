# Programming Languages - Senior-Level Questions

## 1. Compare Memory Management: Java vs C++ vs Go

**Question**: Compare memory management strategies across languages. Discuss GC algorithms and trade-offs.

**Answer**:

**C++ Manual Memory Management:**
```cpp
// Manual allocation/deallocation
int* ptr = new int(42);
delete ptr; // Must manually free

// RAII (Resource Acquisition Is Initialization)
{
    std::unique_ptr<int> ptr = std::make_unique<int>(42);
    // Automatically freed when scope ends
}

// Pros: Full control, no GC pauses
// Cons: Memory leaks, dangling pointers possible
```

**Java Garbage Collection:**
```java
// Automatic memory management
Object obj = new Object(); // Allocated on heap
// obj automatically collected when unreachable

// GC Algorithms:
// - G1GC (default): Divides heap into regions
// - ZGC: Low-latency (<10ms pauses)
// - Shenandoah: Concurrent compacting GC

// Pros: No manual management
// Cons: GC pauses, less control
```

**Go Garbage Collection:**
```go
// Concurrent mark-sweep GC
// Optimized for low latency

type Data struct {
    values []int
}

func process() {
    data := &Data{values: make([]int, 1000)}
    // GC automatically collects when unreachable
}

// Pros: Low pause times (<1ms)
// Cons: No generational collection (yet)
```

**Comparison:**

| Language | Strategy | Pauses | Control | Use Case |
|----------|----------|--------|---------|----------|
| C++ | Manual/RAII | None | Full | Real-time systems |
| Java | GC (generational) | ~10-100ms | Limited | Enterprise apps |
| Go | GC (concurrent) | <1ms | Limited | Microservices |

---

## 2. Async/Await vs Promises vs Callbacks

**Question**: Compare asynchronous programming models. When to use each?

**Answer**:

**1. Callbacks (oldest):**
```javascript
fs.readFile('file.txt', (err, data) => {
    if (err) return console.error(err);
    
    processData(data, (err, result) => {
        if (err) return console.error(err);
        
        saveResult(result, (err) => {
            // Callback hell!
        });
    });
});
```

**2. Promises:**
```javascript
readFile('file.txt')
    .then(data => processData(data))
    .then(result => saveResult(result))
    .catch(err => console.error(err));

// Better error handling, chainable
```

**3. Async/Await (modern):**
```javascript
async function process() {
    try {
        const data = await readFile('file.txt');
        const result = await processData(data);
        await saveResult(result);
    } catch (err) {
        console.error(err);
    }
}

// Synchronous-looking code, easier to read
```

**Parallel Execution:**
```javascript
// Sequential (slow)
const user = await fetchUser();
const posts = await fetchPosts();

// Parallel (fast)
const [user, posts] = await Promise.all([
    fetchUser(),
    fetchPosts()
]);
```
