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
| C# | GC (generational) | ~10-50ms | Medium | Enterprise/Games |

**C# Memory Management:**
```csharp
// Automatic GC with manual hints
using System;
using System.Buffers;

// IDisposable pattern for deterministic cleanup
public class ResourceHolder : IDisposable
{
    private IntPtr unmanagedResource;
    private bool disposed = false;

    public ResourceHolder()
    {
        unmanagedResource = /* allocate unmanaged */;
    }

    // Dispose pattern
    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this); // Prevent finalizer
    }

    protected virtual void Dispose(bool disposing)
    {
        if (!disposed)
        {
            if (disposing)
            {
                // Dispose managed resources
            }

            // Free unmanaged resources
            if (unmanagedResource != IntPtr.Zero)
            {
                // Free unmanaged memory
                unmanagedResource = IntPtr.Zero;
            }

            disposed = true;
        }
    }

    ~ResourceHolder() // Finalizer
    {
        Dispose(false);
    }
}

// Using statement for automatic disposal
using (var resource = new ResourceHolder())
{
    // Use resource
} // Dispose called automatically

// C# 8.0+ using declaration
using var resource2 = new ResourceHolder();
// Disposed at end of scope

// Stack allocation with Span<T> (no GC)
Span<int> stackNumbers = stackalloc int[100];
stackNumbers[0] = 42; // Stack allocated, no heap/GC

// ArrayPool for reducing allocations
var pool = ArrayPool<byte>.Shared;
byte[] buffer = pool.Rent(1024); // Reuse pooled array
try
{
    // Use buffer
}
finally
{
    pool.Return(buffer); // Return to pool
}

// GC generations and tuning
// Gen 0: Short-lived objects (most collections here)
// Gen 1: Medium-lived objects
// Gen 2: Long-lived objects (expensive to collect)

// Force collection (rarely needed)
GC.Collect(2, GCCollectionMode.Optimized);

// LOH (Large Object Heap) for objects >= 85KB
byte[] largeArray = new byte[100_000]; // Goes to LOH
```

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

**C# Task-based Asynchronous Pattern:**
```csharp
using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;

// Task vs ValueTask
public async Task<string> RegularTaskAsync()
{
    // Always allocates Task object on heap
    return await GetDataAsync();
}

public async ValueTask<string> OptimizedValueTaskAsync()
{
    // Can avoid allocation if completes synchronously
    var cached = GetFromCache();
    if (cached != null)
        return cached; // No allocation!

    return await GetDataAsync(); // Allocates only when awaiting
}

// Sequential vs Parallel
public async Task<Result> SequentialAsync()
{
    var user = await FetchUserAsync();      // Wait
    var posts = await FetchPostsAsync();    // Then wait
    var comments = await FetchCommentsAsync(); // Then wait
    // Total time: T1 + T2 + T3
}

public async Task<Result> ParallelAsync()
{
    // Start all tasks
    var userTask = FetchUserAsync();
    var postsTask = FetchPostsAsync();
    var commentsTask = FetchCommentsAsync();

    // Wait for all
    await Task.WhenAll(userTask, postsTask, commentsTask);

    // Total time: Max(T1, T2, T3)
    return new Result
    {
        User = userTask.Result,
        Posts = postsTask.Result,
        Comments = commentsTask.Result
    };
}

// Advanced patterns
public async Task<string> FirstToComplete()
{
    var tasks = new[]
    {
        FetchFromServer1(),
        FetchFromServer2(),
        FetchFromServer3()
    };

    // Return first successful result
    var completed = await Task.WhenAny(tasks);
    return await completed;
}

// Throttling parallel operations
public async Task<List<Result>> ProcessWithThrottling(
    IEnumerable<string> urls,
    int maxConcurrency)
{
    var semaphore = new SemaphoreSlim(maxConcurrency);
    var tasks = urls.Select(async url =>
    {
        await semaphore.WaitAsync();
        try
        {
            return await ProcessUrlAsync(url);
        }
        finally
        {
            semaphore.Release();
        }
    });

    return (await Task.WhenAll(tasks)).ToList();
}

// ConfigureAwait explained
public async Task LibraryMethod()
{
    // Library code: don't capture context
    var data = await GetDataAsync().ConfigureAwait(false);

    // This may run on different thread than caller
    ProcessData(data);
}

public async Task UIMethod()
{
    // UI code: DO capture context (default)
    var data = await GetDataAsync(); // ConfigureAwait(true) implicit

    // This WILL run on UI thread
    UpdateUI(data);
}

// Cancellation patterns
public async Task<T> WithCancellationAsync<T>(
    Func<CancellationToken, Task<T>> operation,
    TimeSpan timeout)
{
    using var cts = new CancellationTokenSource(timeout);

    try
    {
        return await operation(cts.Token);
    }
    catch (OperationCanceledException)
    {
        throw new TimeoutException("Operation timed out");
    }
}
```

**Comparison Table:**

| Feature | C# Task | JavaScript Promise | Callback |
|---------|---------|-------------------|----------|
| Syntax | async/await | async/await | Nested functions |
| Cancellation | Built-in (CancellationToken) | Manual (AbortController) | Manual |
| Sync Context | ConfigureAwait | N/A | N/A |
| Type Safety | Strong | Weak | Weak |
| Performance | ValueTask optimization | Single allocation | No allocation |

---

## 3. C# Reflection and Metadata Programming

**Question**: Explain reflection in C#, its use cases, and performance implications. Compare with compile-time alternatives.

**Answer**:

**Reflection** allows inspecting and manipulating types at runtime.

```csharp
using System;
using System.Reflection;
using System.Linq;

// Basic reflection
Type type = typeof(MyClass);
// or
Type type2 = obj.GetType();

// Get type members
PropertyInfo[] properties = type.GetProperties();
MethodInfo[] methods = type.GetMethods();
FieldInfo[] fields = type.GetFields();

// Create instance dynamically
object instance = Activator.CreateInstance(type);

// Invoke method
MethodInfo method = type.GetMethod("DoWork");
object result = method.Invoke(instance, new object[] { arg1, arg2 });

// Get/Set property values
PropertyInfo prop = type.GetProperty("Name");
prop.SetValue(instance, "New Value");
string value = (string)prop.GetValue(instance);

// Attributes
[MyCustomAttribute("metadata")]
public class MyClass
{
    public void DoWork() { }
}

// Read attributes
var attr = type.GetCustomAttribute<MyCustomAttribute>();
Console.WriteLine(attr.Value); // "metadata"
```

**Performance Comparison:**
```csharp
// Slow: Reflection (100-1000x slower)
MethodInfo method = type.GetMethod("Calculate");
int result = (int)method.Invoke(obj, new object[] { 5, 10 });

// Medium: Cached reflection with compiled lambda
var compiledMethod = CreateDelegate(method);
int result2 = compiledMethod(obj, 5, 10); // Much faster

// Fast: Direct call (baseline)
int result3 = obj.Calculate(5, 10);

// Helper to create fast delegate
static Func<object, int, int, int> CreateDelegate(MethodInfo method)
{
    return (Func<object, int, int, int>)
        Delegate.CreateDelegate(typeof(Func<object, int, int, int>), method);
}
```

**Modern Alternatives:**

```csharp
// Source Generators (compile-time, zero overhead)
[AutoNotify]
public partial class Person
{
    private string name;
    // Generator creates Name property with INotifyPropertyChanged
}

// Expression Trees for dynamic LINQ
Expression<Func<Product, bool>> expr = p => p.Price > 100;
// Can analyze and modify expression tree at runtime

// Attributes for metadata
[Table("Users")]
public class User
{
    [Column("user_id")]
    public int Id { get; set; }
}

// Use source generators instead of reflection in ORMs
```

---

## 4. C# Expression Trees and Dynamic Code Generation

**Question**: What are expression trees? When would you use them over delegates?

**Answer**:

**Expression Trees** represent code as data that can be analyzed and modified at runtime.

```csharp
using System;
using System.Linq.Expressions;

// Delegate (compiled code)
Func<int, int, int> add = (a, b) => a + b;
int result = add(5, 3); // Executes directly

// Expression Tree (code as data)
Expression<Func<int, int, int>> addExpr = (a, b) => a + b;
// Can analyze structure:
// addExpr.Body = BinaryExpression { Left = a, Right = b, Operator = Add }

// Building expressions programmatically
ParameterExpression param = Expression.Parameter(typeof(int), "x");
ConstantExpression constant = Expression.Constant(5);
BinaryExpression multiply = Expression.Multiply(param, constant);
Expression<Func<int, int>> lambda = Expression.Lambda<Func<int, int>>(multiply, param);

// Compile to delegate
Func<int, int> compiled = lambda.Compile();
Console.WriteLine(compiled(10)); // 50

// Practical use: Dynamic query building
public static Expression<Func<T, bool>> BuildPredicate<T>(
    string propertyName,
    object value)
{
    var param = Expression.Parameter(typeof(T), "x");
    var property = Expression.Property(param, propertyName);
    var constant = Expression.Constant(value);
    var equals = Expression.Equal(property, constant);

    return Expression.Lambda<Func<T, bool>>(equals, param);
}

// Usage
var predicate = BuildPredicate<Product>("Category", "Electronics");
var products = dbContext.Products.Where(predicate); // Translates to SQL!

// Expression visitor for transformation
public class ParameterReplacer : ExpressionVisitor
{
    private readonly ParameterExpression _oldParam;
    private readonly ParameterExpression _newParam;

    protected override Expression VisitParameter(ParameterExpression node)
    {
        return node == _oldParam ? _newParam : base.VisitParameter(node);
    }
}

// Combining expressions
public static Expression<Func<T, bool>> And<T>(
    Expression<Func<T, bool>> expr1,
    Expression<Func<T, bool>> expr2)
{
    var param = Expression.Parameter(typeof(T), "x");

    var visitor = new ParameterReplacer(expr1.Parameters[0], param);
    var left = visitor.Visit(expr1.Body);

    visitor = new ParameterReplacer(expr2.Parameters[0], param);
    var right = visitor.Visit(expr2.Body);

    var combined = Expression.AndAlso(left, right);
    return Expression.Lambda<Func<T, bool>>(combined, param);
}

// Dynamic query composition (like in Entity Framework)
var filter1 = BuildPredicate<Product>("Price", 100);
var filter2 = BuildPredicate<Product>("InStock", true);
var combined = And(filter1, filter2);

var results = dbContext.Products.Where(combined);
// Translates to: SELECT * FROM Products WHERE Price = 100 AND InStock = 1
```

**When to use:**
- Building dynamic queries (ORMs, search filters)
- Code analysis tools
- Mapping libraries (AutoMapper)
- Rule engines
- Translating C# to other languages (SQL, JavaScript)

---

## 5. C# Advanced Type System Features

**Question**: Explain C# records, pattern matching, and discriminated unions. How do they compare to other languages?

**Answer**:

**Records (C# 9.0+)** - Value-based equality:

```csharp
// Record class (reference type with value semantics)
public record Person(string Name, int Age);

var p1 = new Person("Alice", 30);
var p2 = new Person("Alice", 30);

Console.WriteLine(p1 == p2); // True (value equality, not reference!)

// with expression for non-destructive mutation
var p3 = p1 with { Age = 31 };

// Record struct (C# 10+)
public record struct Point(int X, int Y);

// Traditional record with custom members
public record Product(string Name, decimal Price)
{
    public decimal DiscountedPrice => Price * 0.9m;
}
```

**Pattern Matching:**

```csharp
// Type patterns
object obj = GetValue();

if (obj is string s)
{
    Console.WriteLine(s.ToUpper());
}

// Switch expressions
string result = obj switch
{
    int n => $"Number: {n}",
    string s => $"Text: {s}",
    null => "Nothing",
    _ => "Unknown"
};

// Property patterns
var person = GetPerson();

var category = person switch
{
    { Age: < 18 } => "Minor",
    { Age: >= 18, Age: < 65 } => "Adult",
    { Age: >= 65 } => "Senior",
    _ => "Unknown"
};

// Positional patterns with records
var point = new Point(3, 4);

var quadrant = point switch
{
    (0, 0) => "Origin",
    (> 0, > 0) => "Q1",
    (< 0, > 0) => "Q2",
    (< 0, < 0) => "Q3",
    (> 0, < 0) => "Q4",
    _ => "On axis"
};

// List patterns (C# 11)
int[] numbers = { 1, 2, 3, 4, 5 };

var description = numbers switch
{
    [] => "Empty",
    [var single] => $"Single: {single}",
    [var first, var second] => $"Pair: {first}, {second}",
    [var first, .., var last] => $"First: {first}, Last: {last}",
    _ => "Other"
};
```

**Discriminated Unions (via records and pattern matching):**

```csharp
// Simulating discriminated unions
public abstract record Result<T>
{
    public record Success(T Value) : Result<T>;
    public record Failure(string Error) : Result<T>;
}

// Usage
public Result<int> Divide(int a, int b)
{
    if (b == 0)
        return new Result<int>.Failure("Division by zero");

    return new Result<int>.Success(a / b);
}

// Pattern matching on discriminated union
var result = Divide(10, 2);

var message = result switch
{
    Result<int>.Success(var value) => $"Result: {value}",
    Result<int>.Failure(var error) => $"Error: {error}",
    _ => throw new InvalidOperationException()
};

// More complex example: AST representation
public abstract record Expression
{
    public record Number(double Value) : Expression;
    public record Add(Expression Left, Expression Right) : Expression;
    public record Multiply(Expression Left, Expression Right) : Expression;
    public record Variable(string Name) : Expression;
}

// Evaluator using pattern matching
public double Evaluate(Expression expr, Dictionary<string, double> vars)
{
    return expr switch
    {
        Expression.Number(var n) => n,
        Expression.Add(var left, var right) => Evaluate(left, vars) + Evaluate(right, vars),
        Expression.Multiply(var left, var right) => Evaluate(left, vars) * Evaluate(right, vars),
        Expression.Variable(var name) => vars[name],
        _ => throw new NotSupportedException()
    };
}
```

**Comparison to other languages:**

| Feature | C# | F# | Rust | TypeScript |
|---------|----|----|------|------------|
| Records | record class | record | struct | interface |
| Pattern matching | switch expr | match | match | switch |
| Discriminated unions | Via records | Native | enum | union types |
| Exhaustiveness check | Partial | Full | Full | Full |
