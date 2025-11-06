# Programming Languages - Principal-Level Questions

## 1. Design a Programming Language Feature

**Question**: Design a new concurrency primitive for a programming language. Justify design decisions.

**Answer**:

**Proposal: Structured Concurrency in "FutureScript"**

```javascript
// Current problem: Unstructured async
async function fetchData() {
    const task1 = doWork1(); // Fire and forget - can leak
    const task2 = doWork2();
    return await task1;
    // task2 still running even after return!
}

// Proposed: Structured concurrency
async function fetchData() {
    return await concurrent {
        const result1 = spawn doWork1();
        const result2 = spawn doWork2();
        
        await result1;
        // result2 automatically cancelled on scope exit
    }
    // All spawned tasks guaranteed completed/cancelled
}
```

**Design Decisions:**
1. **Scoped lifetime**: Tasks can't outlive scope
2. **Automatic cancellation**: Unused tasks cancelled
3. **Error propagation**: Any task error cancels all
4. **Deterministic cleanup**: No resource leaks

**Implementation Challenges:**
- Cancellation tokens
- Parent-child task relationships
- Deadlock detection
