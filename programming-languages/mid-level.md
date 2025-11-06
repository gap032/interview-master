# Programming Languages - Mid-Level Questions

## 1. JavaScript Closures and Scope

**Question**: Explain closures in JavaScript with examples. What are common pitfalls?

**Answer**:

A closure is a function that has access to variables in its outer (enclosing) scope, even after the outer function has returned.

```javascript
function createCounter() {
    let count = 0; // Private variable
    
    return {
        increment: function() {
            count++;
            return count;
        },
        decrement: function() {
            count--;
            return count;
        },
        getCount: function() {
            return count;
        }
    };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount());  // 2
```

**Common Pitfall - Loop Closures:**
```javascript
// Wrong: all functions reference same 'i'
for (var i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(i); // Prints: 3, 3, 3
    }, 100);
}

// Fix 1: Use let (block scope)
for (let i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(i); // Prints: 0, 1, 2
    }, 100);
}

// Fix 2: IIFE to capture value
for (var i = 0; i < 3; i++) {
    (function(j) {
        setTimeout(function() {
            console.log(j); // Prints: 0, 1, 2
        }, 100);
    })(i);
}
```

**C# Equivalent - Delegates and Closures:**
```csharp
using System;
using System.Collections.Generic;
using System.Threading;

// Closure with delegates
public class Counter
{
    public static Func<int> CreateCounter()
    {
        int count = 0; // Captured variable

        return () => ++count; // Lambda captures 'count'
    }
}

// Usage
var counter = Counter.CreateCounter();
Console.WriteLine(counter()); // 1
Console.WriteLine(counter()); // 2
Console.WriteLine(counter()); // 3

// Common Pitfall - Loop Closures (same as JavaScript)
var actions = new List<Action>();

// Wrong: all lambdas capture same variable
for (int i = 0; i < 3; i++)
{
    actions.Add(() => Console.WriteLine(i)); // Captures loop variable
}

foreach (var action in actions)
    action(); // Prints: 3, 3, 3

// Fix: Capture into local variable
for (int i = 0; i < 3; i++)
{
    int j = i; // Create local copy
    actions.Add(() => Console.WriteLine(j));
}

foreach (var action in actions)
    action(); // Prints: 0, 1, 2
```

---

## 2. Python Decorators

**Question**: Implement a caching decorator and explain how decorators work.

**Answer**:

```python
from functools import wraps
import time

def cache(func):
    """Memoization decorator"""
    cached_results = {}
    
    @wraps(func)
    def wrapper(*args, **kwargs):
        # Create cache key from arguments
        key = str(args) + str(kwargs)
        
        if key not in cached_results:
            cached_results[key] = func(*args, **kwargs)
        
        return cached_results[key]
    
    return wrapper

@cache
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# With cache: O(n), without: O(2^n)
print(fibonacci(100))  # Fast with caching
```

**Decorator with Arguments:**
```python
def retry(max_attempts=3, delay=1):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_attempts - 1:
                        raise
                    time.sleep(delay)
        return wrapper
    return decorator

@retry(max_attempts=5, delay=2)
def unreliable_api_call():
    # May fail, will retry up to 5 times
    pass
```

**C# Equivalent - Attributes and AOP:**
```csharp
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Runtime.CompilerServices;

// Custom attribute for caching (metadata only)
[AttributeUsage(AttributeTargets.Method)]
public class CacheAttribute : Attribute
{
    public int TTL { get; set; }
    public CacheAttribute(int ttl = 300) => TTL = ttl;
}

// Practical caching with lazy evaluation
public class MemoizationExample
{
    private Dictionary<string, int> cache = new();

    // Manual caching pattern
    public int Fibonacci(int n)
    {
        string key = n.ToString();
        if (cache.ContainsKey(key))
            return cache[key];

        int result = n < 2 ? n : Fibonacci(n - 1) + Fibonacci(n - 2);
        cache[key] = result;
        return result;
    }

    // Using Lazy<T> for thread-safe caching
    private Lazy<int> expensiveOperation = new Lazy<int>(() =>
    {
        // Computed only once, thread-safe
        return PerformExpensiveCalculation();
    });

    public int GetCachedResult() => expensiveOperation.Value;

    private static int PerformExpensiveCalculation()
    {
        System.Threading.Thread.Sleep(1000);
        return 42;
    }
}

// Method interception with DispatchProxy (advanced)
public class CachingProxy<T> : DispatchProxy where T : class
{
    private T target;
    private Dictionary<string, object> cache = new();

    protected override object Invoke(MethodInfo targetMethod, object[] args)
    {
        string key = $"{targetMethod.Name}:{string.Join(",", args)}";

        if (!cache.ContainsKey(key))
        {
            var result = targetMethod.Invoke(target, args);
            cache[key] = result;
        }

        return cache[key];
    }

    public static T Create(T instance)
    {
        object proxy = Create<T, CachingProxy<T>>();
        ((CachingProxy<T>)proxy).target = instance;
        return (T)proxy;
    }
}
```

---

## 3. Java Generics and Type Erasure

**Question**: Explain Java generics, type erasure, and wildcards.

**Answer**:

```java
// Generic class
public class Box<T> {
    private T value;
    
    public void set(T value) {
        this.value = value;
    }
    
    public T get() {
        return value;
    }
}

// Usage
Box<String> stringBox = new Box<>();
stringBox.set("Hello");
String value = stringBox.get(); // No cast needed

// Type Erasure: Generics removed at runtime
// Box<String> becomes Box at runtime
// Can't do: new T() or T.class
```

**Wildcards:**
```java
// Upper bounded wildcard: read-only
public void processNumbers(List<? extends Number> numbers) {
    for (Number n : numbers) {
        System.out.println(n.doubleValue());
    }
    // numbers.add(5); // Compile error - can't add
}

// Lower bounded wildcard: write-only
public void addIntegers(List<? super Integer> list) {
    list.add(42); // OK
    list.add(100); // OK
    // Integer n = list.get(0); // Compile error
}

// PECS: Producer Extends, Consumer Super
```

**C# Equivalent - Generics (Reified, not erased):**
```csharp
// Generic class with constraints
public class Box<T> where T : class // Reference type constraint
{
    private T value;

    public void Set(T value) => this.value = value;
    public T Get() => value;

    // C# retains type info at runtime (unlike Java)
    public Type GetBoxedType() => typeof(T);
}

// Multiple constraints
public class Repository<T> where T : class, IEntity, new()
{
    // T must be: reference type, implement IEntity, have parameterless constructor
    public T Create() => new T(); // Possible because of 'new()' constraint
}

// Covariance and Contravariance
public interface IProducer<out T> // Covariant
{
    T Produce(); // Can only return T, not accept it
}

public interface IConsumer<in T> // Contravariant
{
    void Consume(T item); // Can only accept T, not return it
}

// Usage
IProducer<string> stringProducer = GetStringProducer();
IProducer<object> objectProducer = stringProducer; // OK: string is object

IConsumer<object> objectConsumer = GetObjectConsumer();
IConsumer<string> stringConsumer = objectConsumer; // OK: can consume strings as objects

// Generic methods with type inference
public static T Max<T>(T a, T b) where T : IComparable<T>
{
    return a.CompareTo(b) > 0 ? a : b;
}

// Type inference works
int maxInt = Max(5, 10); // T inferred as int
string maxStr = Max("abc", "xyz"); // T inferred as string
```

---

## 4. C# LINQ and Query Expressions

**Question**: Explain LINQ, query syntax vs method syntax, and deferred execution.

**Answer**:

LINQ (Language Integrated Query) provides a unified syntax for querying data from different sources (collections, databases, XML, etc.).

```csharp
using System;
using System.Linq;
using System.Collections.Generic;

var numbers = new[] { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

// Method syntax (fluent)
var evenNumbers = numbers
    .Where(n => n % 2 == 0)
    .Select(n => n * n)
    .OrderByDescending(n => n);

// Query syntax (SQL-like)
var evenSquares = from n in numbers
                  where n % 2 == 0
                  orderby n descending
                  select n * n;

// Both produce same result: [100, 64, 36, 16, 4]
```

**Deferred Execution:**
```csharp
var query = numbers.Where(n =>
{
    Console.WriteLine($"Filtering {n}");
    return n > 5;
});

// Nothing printed yet - query not executed

foreach (var n in query)
{
    Console.WriteLine($"Result: {n}");
}
// Now filters are executed: "Filtering 1", "Filtering 2", etc.

// Force immediate execution
var list = numbers.Where(n => n > 5).ToList(); // Executes now
var count = numbers.Count(n => n > 5); // Executes now
```

**Complex LINQ Operations:**
```csharp
public class Product
{
    public string Name { get; set; }
    public decimal Price { get; set; }
    public string Category { get; set; }
}

var products = new List<Product>
{
    new() { Name = "Laptop", Price = 999, Category = "Electronics" },
    new() { Name = "Mouse", Price = 25, Category = "Electronics" },
    new() { Name = "Desk", Price = 299, Category = "Furniture" }
};

// Grouping
var grouped = products
    .GroupBy(p => p.Category)
    .Select(g => new
    {
        Category = g.Key,
        AvgPrice = g.Average(p => p.Price),
        Count = g.Count()
    });

// Joins
var orders = new[] { /* ... */ };
var orderDetails = from o in orders
                   join p in products on o.ProductName equals p.Name
                   select new { o.OrderId, p.Name, p.Price };

// Let clause for intermediate results
var query = from n in numbers
            let square = n * n
            where square > 20
            select new { n, square };
```

---

## 5. C# Value Types vs Reference Types

**Question**: Explain the difference between value types and reference types in C#. What are boxing/unboxing?

**Answer**:

**Value Types** (stack allocated):
- Structs, enums, primitives (int, bool, double, etc.)
- Copied when assigned
- No garbage collection overhead

**Reference Types** (heap allocated):
- Classes, interfaces, delegates, arrays
- Reference copied when assigned (both point to same object)
- Managed by garbage collector

```csharp
// Value type example
struct Point
{
    public int X;
    public int Y;

    public Point(int x, int y)
    {
        X = x;
        Y = y;
    }
}

Point p1 = new Point(10, 20);
Point p2 = p1; // Copy made
p2.X = 99;

Console.WriteLine(p1.X); // 10 (unchanged)
Console.WriteLine(p2.X); // 99

// Reference type example
class Rectangle
{
    public int Width { get; set; }
    public int Height { get; set; }
}

Rectangle r1 = new Rectangle { Width = 10, Height = 20 };
Rectangle r2 = r1; // Reference copied (both point to same object)
r2.Width = 99;

Console.WriteLine(r1.Width); // 99 (changed!)
Console.WriteLine(r2.Width); // 99
```

**Boxing and Unboxing:**
```csharp
// Boxing: value type → reference type
int value = 42;
object boxed = value; // Boxing occurs (heap allocation)

// Unboxing: reference type → value type
int unboxed = (int)boxed; // Unboxing (with cast)

// Performance impact
List<int> numbers = new List<int>(); // Good: no boxing
numbers.Add(42); // int stays as value type

ArrayList oldList = new ArrayList(); // Old style: uses objects
oldList.Add(42); // Boxing! int → object (performance hit)
```

**When to use structs vs classes:**
```csharp
// Use struct when:
// - Small size (<= 16 bytes recommended)
// - Immutable
// - Short-lived
// - Value semantics desired

public readonly struct Color
{
    public readonly byte R, G, B;

    public Color(byte r, byte g, byte b)
    {
        R = r; G = g; B = b;
    }
}

// Use class when:
// - Large objects
// - Needs inheritance
// - Reference semantics desired
// - Mutable state
```

---

## 6. C# Async/Await and Task-based Asynchronous Pattern

**Question**: Explain async/await in C#. How does it differ from JavaScript promises?

**Answer**:

```csharp
using System;
using System.Net.Http;
using System.Threading.Tasks;

// Basic async method
public async Task<string> FetchDataAsync(string url)
{
    using var client = new HttpClient();

    // await suspends method, returns control to caller
    string result = await client.GetStringAsync(url);

    // Continues here when complete
    return result.ToUpper();
}

// Async void (only for event handlers - avoid otherwise!)
private async void Button_Click(object sender, EventArgs e)
{
    await DoWorkAsync();
}

// Parallel execution
public async Task<(int, string, bool)> GetAllDataAsync()
{
    // All start simultaneously
    Task<int> task1 = GetNumberAsync();
    Task<string> task2 = GetTextAsync();
    Task<bool> task3 = GetFlagAsync();

    // Wait for all to complete
    await Task.WhenAll(task1, task2, task3);

    return (task1.Result, task2.Result, task3.Result);
}

// Error handling
public async Task<string> SafeFetchAsync(string url)
{
    try
    {
        return await FetchDataAsync(url);
    }
    catch (HttpRequestException ex)
    {
        Console.WriteLine($"Request failed: {ex.Message}");
        return null;
    }
}

// Cancellation support
public async Task<string> FetchWithCancellation(
    string url,
    CancellationToken cancellationToken)
{
    using var client = new HttpClient();

    // Throws OperationCanceledException if cancelled
    return await client.GetStringAsync(url, cancellationToken);
}

// ConfigureAwait for library code
public async Task<string> LibraryMethodAsync()
{
    // Don't capture synchronization context
    var result = await GetDataAsync().ConfigureAwait(false);
    return result;
}
```

**Key Differences from JavaScript:**
```csharp
// C# - strongly typed
Task<int> task = GetNumberAsync();
int result = await task;

// JavaScript - Promise
const promise = getNumberAsync();
const result = await promise;

// C# - cancellation is first-class
await FetchAsync(url, cancellationToken);

// JavaScript - no built-in cancellation
// Must use AbortController or similar
```

**Common Patterns:**
```csharp
// Timeout pattern
public async Task<string> FetchWithTimeout(string url, int timeoutMs)
{
    using var cts = new CancellationTokenSource(timeoutMs);

    try
    {
        return await FetchDataAsync(url, cts.Token);
    }
    catch (OperationCanceledException)
    {
        throw new TimeoutException($"Request timeout after {timeoutMs}ms");
    }
}

// Retry pattern
public async Task<T> RetryAsync<T>(Func<Task<T>> operation, int maxAttempts = 3)
{
    for (int attempt = 1; attempt <= maxAttempts; attempt++)
    {
        try
        {
            return await operation();
        }
        catch (Exception ex) when (attempt < maxAttempts)
        {
            await Task.Delay(TimeSpan.FromSeconds(Math.Pow(2, attempt))); // Exponential backoff
        }
    }

    throw new Exception("All retry attempts failed");
}
```
