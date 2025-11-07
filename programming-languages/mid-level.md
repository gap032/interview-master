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

---

## 7. SOLID Principles

**Question**: Explain the SOLID principles with practical examples. How do they improve code quality?

**Answer**:

SOLID is an acronym for five design principles that make software designs more understandable, flexible, and maintainable:

### S - Single Responsibility Principle (SRP)

A class should have only one reason to change.

**Bad Example:**
```csharp
// Violates SRP: handles both user data AND email sending
public class User
{
    public string Name { get; set; }
    public string Email { get; set; }

    public void Save()
    {
        // Save to database
    }

    public void SendEmail(string message)
    {
        // Send email logic
    }
}
```

**Good Example:**
```csharp
// Separate responsibilities
public class User
{
    public string Name { get; set; }
    public string Email { get; set; }
}

public class UserRepository
{
    public void Save(User user)
    {
        // Save to database
    }
}

public class EmailService
{
    public void SendEmail(string email, string message)
    {
        // Send email logic
    }
}
```

**Python Example:**
```python
# Bad: Multiple responsibilities
class User:
    def __init__(self, name, email):
        self.name = name
        self.email = email

    def save_to_database(self):
        # Database logic
        pass

    def send_email(self, message):
        # Email logic
        pass

# Good: Separated concerns
class User:
    def __init__(self, name, email):
        self.name = name
        self.email = email

class UserRepository:
    def save(self, user):
        # Database logic
        pass

class EmailService:
    def send(self, email, message):
        # Email logic
        pass
```

### O - Open/Closed Principle (OCP)

Software entities should be open for extension but closed for modification.

**Bad Example:**
```csharp
public class PaymentProcessor
{
    public void ProcessPayment(string type, decimal amount)
    {
        if (type == "CreditCard")
        {
            // Process credit card
        }
        else if (type == "PayPal")
        {
            // Process PayPal
        }
        // Need to modify this method for each new payment type!
    }
}
```

**Good Example:**
```csharp
// Use abstraction for extension
public interface IPaymentMethod
{
    void ProcessPayment(decimal amount);
}

public class CreditCardPayment : IPaymentMethod
{
    public void ProcessPayment(decimal amount)
    {
        Console.WriteLine($"Processing ${amount} via Credit Card");
    }
}

public class PayPalPayment : IPaymentMethod
{
    public void ProcessPayment(decimal amount)
    {
        Console.WriteLine($"Processing ${amount} via PayPal");
    }
}

public class PaymentProcessor
{
    public void Process(IPaymentMethod paymentMethod, decimal amount)
    {
        paymentMethod.ProcessPayment(amount);
    }
}

// Usage - can add new payment methods without modifying PaymentProcessor
var processor = new PaymentProcessor();
processor.Process(new CreditCardPayment(), 100);
processor.Process(new PayPalPayment(), 50);
```

**JavaScript Example:**
```javascript
// Good: Open for extension
class PaymentMethod {
    processPayment(amount) {
        throw new Error("Must implement processPayment");
    }
}

class CreditCardPayment extends PaymentMethod {
    processPayment(amount) {
        console.log(`Processing $${amount} via Credit Card`);
    }
}

class PayPalPayment extends PaymentMethod {
    processPayment(amount) {
        console.log(`Processing $${amount} via PayPal`);
    }
}

class PaymentProcessor {
    process(paymentMethod, amount) {
        paymentMethod.processPayment(amount);
    }
}
```

### L - Liskov Substitution Principle (LSP)

Derived classes must be substitutable for their base classes.

**Bad Example:**
```csharp
public class Rectangle
{
    public virtual int Width { get; set; }
    public virtual int Height { get; set; }

    public int GetArea() => Width * Height;
}

public class Square : Rectangle
{
    public override int Width
    {
        get => base.Width;
        set
        {
            base.Width = value;
            base.Height = value; // Violates LSP!
        }
    }

    public override int Height
    {
        get => base.Height;
        set
        {
            base.Width = value;  // Violates LSP!
            base.Height = value;
        }
    }
}

// Problem: Unexpected behavior
Rectangle rect = new Square();
rect.Width = 5;
rect.Height = 10;
Console.WriteLine(rect.GetArea()); // Expected 50, but gets 100!
```

**Good Example:**
```csharp
// Use composition or separate interfaces
public interface IShape
{
    int GetArea();
}

public class Rectangle : IShape
{
    public int Width { get; set; }
    public int Height { get; set; }

    public int GetArea() => Width * Height;
}

public class Square : IShape
{
    public int Side { get; set; }

    public int GetArea() => Side * Side;
}
```

### I - Interface Segregation Principle (ISP)

Clients should not be forced to depend on interfaces they don't use.

**Bad Example:**
```csharp
// Fat interface - not all implementations need all methods
public interface IWorker
{
    void Work();
    void Eat();
    void Sleep();
}

public class HumanWorker : IWorker
{
    public void Work() { /* ... */ }
    public void Eat() { /* ... */ }
    public void Sleep() { /* ... */ }
}

public class RobotWorker : IWorker
{
    public void Work() { /* ... */ }
    public void Eat() { throw new NotImplementedException(); } // Robot doesn't eat!
    public void Sleep() { throw new NotImplementedException(); } // Robot doesn't sleep!
}
```

**Good Example:**
```csharp
// Segregated interfaces
public interface IWorkable
{
    void Work();
}

public interface IFeedable
{
    void Eat();
}

public interface ISleepable
{
    void Sleep();
}

public class HumanWorker : IWorkable, IFeedable, ISleepable
{
    public void Work() { /* ... */ }
    public void Eat() { /* ... */ }
    public void Sleep() { /* ... */ }
}

public class RobotWorker : IWorkable
{
    public void Work() { /* ... */ }
}
```

**TypeScript Example:**
```typescript
// Bad: Fat interface
interface Worker {
    work(): void;
    eat(): void;
    sleep(): void;
}

// Good: Segregated interfaces
interface Workable {
    work(): void;
}

interface Feedable {
    eat(): void;
}

interface Sleepable {
    sleep(): void;
}

class HumanWorker implements Workable, Feedable, Sleepable {
    work() { /* ... */ }
    eat() { /* ... */ }
    sleep() { /* ... */ }
}

class RobotWorker implements Workable {
    work() { /* ... */ }
}
```

### D - Dependency Inversion Principle (DIP)

High-level modules should not depend on low-level modules. Both should depend on abstractions.

**Bad Example:**
```csharp
// High-level class depends on low-level class directly
public class MySQLDatabase
{
    public void Save(string data)
    {
        Console.WriteLine($"Saving to MySQL: {data}");
    }
}

public class UserService
{
    private MySQLDatabase database = new MySQLDatabase();

    public void SaveUser(string userData)
    {
        database.Save(userData);
        // Tightly coupled to MySQL - hard to test, hard to change
    }
}
```

**Good Example:**
```csharp
// Depend on abstraction
public interface IDatabase
{
    void Save(string data);
}

public class MySQLDatabase : IDatabase
{
    public void Save(string data)
    {
        Console.WriteLine($"Saving to MySQL: {data}");
    }
}

public class MongoDatabase : IDatabase
{
    public void Save(string data)
    {
        Console.WriteLine($"Saving to MongoDB: {data}");
    }
}

public class UserService
{
    private readonly IDatabase database;

    // Dependency injection
    public UserService(IDatabase database)
    {
        this.database = database;
    }

    public void SaveUser(string userData)
    {
        database.Save(userData);
    }
}

// Usage with Dependency Injection
var userService1 = new UserService(new MySQLDatabase());
var userService2 = new UserService(new MongoDatabase());
```

**Python Example:**
```python
from abc import ABC, abstractmethod

# Bad: Direct dependency
class MySQLDatabase:
    def save(self, data):
        print(f"Saving to MySQL: {data}")

class UserService:
    def __init__(self):
        self.database = MySQLDatabase()  # Tightly coupled

    def save_user(self, user_data):
        self.database.save(user_data)

# Good: Dependency on abstraction
class Database(ABC):
    @abstractmethod
    def save(self, data):
        pass

class MySQLDatabase(Database):
    def save(self, data):
        print(f"Saving to MySQL: {data}")

class MongoDatabase(Database):
    def save(self, data):
        print(f"Saving to MongoDB: {data}")

class UserService:
    def __init__(self, database: Database):
        self.database = database  # Depends on abstraction

    def save_user(self, user_data):
        self.database.save(user_data)

# Usage
user_service = UserService(MySQLDatabase())
user_service.save_user("John Doe")
```

**Key Benefits:**
- **S**: Easier to understand and maintain
- **O**: Can add features without breaking existing code
- **L**: Polymorphism works correctly
- **I**: Smaller, focused interfaces
- **D**: Loose coupling, easier testing

---

## 8. Object-Oriented Programming Basics

**Question**: Explain the four pillars of OOP with practical examples.

**Answer**:

The four fundamental principles of Object-Oriented Programming are:

### 1. Encapsulation

Bundling data and methods that operate on that data within a single unit (class), and restricting direct access to some components.

**C# Example:**
```csharp
public class BankAccount
{
    // Private fields - hidden from outside
    private decimal balance;
    private string accountNumber;

    // Public constructor
    public BankAccount(string accountNumber, decimal initialBalance)
    {
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
    }

    // Public property with validation
    public decimal Balance
    {
        get { return balance; }
        private set
        {
            if (value < 0)
                throw new ArgumentException("Balance cannot be negative");
            balance = value;
        }
    }

    // Public methods to interact with private data
    public void Deposit(decimal amount)
    {
        if (amount <= 0)
            throw new ArgumentException("Deposit amount must be positive");
        Balance += amount;
    }

    public void Withdraw(decimal amount)
    {
        if (amount <= 0)
            throw new ArgumentException("Withdrawal amount must be positive");
        if (amount > Balance)
            throw new InvalidOperationException("Insufficient funds");
        Balance -= amount;
    }

    public string GetAccountNumber()
    {
        // Return masked version for security
        return "****" + accountNumber.Substring(accountNumber.Length - 4);
    }
}

// Usage
var account = new BankAccount("123456789", 1000);
account.Deposit(500);
// account.balance = -100; // Compilation error - private field
Console.WriteLine($"Balance: {account.Balance}");
```

**Python Example:**
```python
class BankAccount:
    def __init__(self, account_number, initial_balance):
        self.__balance = initial_balance  # Private (name mangling)
        self.__account_number = account_number

    @property
    def balance(self):
        return self.__balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Deposit amount must be positive")
        self.__balance += amount

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive")
        if amount > self.__balance:
            raise ValueError("Insufficient funds")
        self.__balance -= amount

    def get_account_number(self):
        # Return masked version
        return "****" + self.__account_number[-4:]

# Usage
account = BankAccount("123456789", 1000)
account.deposit(500)
print(f"Balance: {account.balance}")
```

**JavaScript Example:**
```javascript
class BankAccount {
    #balance; // Private field (ES2022)
    #accountNumber;

    constructor(accountNumber, initialBalance) {
        this.#accountNumber = accountNumber;
        this.#balance = initialBalance;
    }

    get balance() {
        return this.#balance;
    }

    deposit(amount) {
        if (amount <= 0) {
            throw new Error("Deposit amount must be positive");
        }
        this.#balance += amount;
    }

    withdraw(amount) {
        if (amount <= 0) {
            throw new Error("Withdrawal amount must be positive");
        }
        if (amount > this.#balance) {
            throw new Error("Insufficient funds");
        }
        this.#balance -= amount;
    }

    getAccountNumber() {
        return "****" + this.#accountNumber.slice(-4);
    }
}
```

### 2. Inheritance

A mechanism where a new class derives properties and behavior from an existing class.

**C# Example:**
```csharp
// Base class
public class Animal
{
    public string Name { get; set; }
    public int Age { get; set; }

    public virtual void MakeSound()
    {
        Console.WriteLine("Some generic animal sound");
    }

    public void Sleep()
    {
        Console.WriteLine($"{Name} is sleeping");
    }
}

// Derived classes
public class Dog : Animal
{
    public string Breed { get; set; }

    public override void MakeSound()
    {
        Console.WriteLine("Woof! Woof!");
    }

    public void Fetch()
    {
        Console.WriteLine($"{Name} is fetching the ball");
    }
}

public class Cat : Animal
{
    public bool IsIndoor { get; set; }

    public override void MakeSound()
    {
        Console.WriteLine("Meow!");
    }

    public void Scratch()
    {
        Console.WriteLine($"{Name} is scratching the furniture");
    }
}

// Usage
var dog = new Dog { Name = "Buddy", Age = 3, Breed = "Golden Retriever" };
dog.MakeSound(); // Woof! Woof!
dog.Sleep();     // Buddy is sleeping
dog.Fetch();     // Buddy is fetching the ball

var cat = new Cat { Name = "Whiskers", Age = 2, IsIndoor = true };
cat.MakeSound(); // Meow!
cat.Scratch();   // Whiskers is scratching the furniture
```

**Java Example:**
```java
// Base class
public class Vehicle {
    protected String brand;
    protected int year;

    public Vehicle(String brand, int year) {
        this.brand = brand;
        this.year = year;
    }

    public void start() {
        System.out.println("Vehicle is starting");
    }
}

// Derived class
public class Car extends Vehicle {
    private int numberOfDoors;

    public Car(String brand, int year, int numberOfDoors) {
        super(brand, year);  // Call parent constructor
        this.numberOfDoors = numberOfDoors;
    }

    @Override
    public void start() {
        System.out.println("Car engine is starting");
    }

    public void openTrunk() {
        System.out.println("Trunk is opening");
    }
}
```

### 3. Polymorphism

The ability of objects to take on multiple forms. The most common use is when a parent class reference is used to refer to a child class object.

**C# Example:**
```csharp
// Base class
public abstract class Shape
{
    public abstract double GetArea();
    public abstract double GetPerimeter();

    public void Display()
    {
        Console.WriteLine($"Area: {GetArea():F2}, Perimeter: {GetPerimeter():F2}");
    }
}

// Derived classes
public class Circle : Shape
{
    public double Radius { get; set; }

    public Circle(double radius)
    {
        Radius = radius;
    }

    public override double GetArea()
    {
        return Math.PI * Radius * Radius;
    }

    public override double GetPerimeter()
    {
        return 2 * Math.PI * Radius;
    }
}

public class Rectangle : Shape
{
    public double Width { get; set; }
    public double Height { get; set; }

    public Rectangle(double width, double height)
    {
        Width = width;
        Height = height;
    }

    public override double GetArea()
    {
        return Width * Height;
    }

    public override double GetPerimeter()
    {
        return 2 * (Width + Height);
    }
}

// Polymorphism in action
public class ShapeCalculator
{
    public static void CalculateTotalArea(List<Shape> shapes)
    {
        double totalArea = 0;
        foreach (Shape shape in shapes)
        {
            totalArea += shape.GetArea();  // Polymorphic call
            shape.Display();
        }
        Console.WriteLine($"Total area: {totalArea:F2}");
    }
}

// Usage
var shapes = new List<Shape>
{
    new Circle(5),
    new Rectangle(4, 6),
    new Circle(3)
};

ShapeCalculator.CalculateTotalArea(shapes);
```

**Python Example:**
```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def get_area(self):
        pass

    @abstractmethod
    def get_perimeter(self):
        pass

    def display(self):
        print(f"Area: {self.get_area():.2f}, Perimeter: {self.get_perimeter():.2f}")

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def get_area(self):
        return 3.14159 * self.radius ** 2

    def get_perimeter(self):
        return 2 * 3.14159 * self.radius

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def get_area(self):
        return self.width * self.height

    def get_perimeter(self):
        return 2 * (self.width + self.height)

# Polymorphism
shapes = [Circle(5), Rectangle(4, 6), Circle(3)]
total_area = sum(shape.get_area() for shape in shapes)

for shape in shapes:
    shape.display()
print(f"Total area: {total_area:.2f}")
```

### 4. Abstraction

Hiding complex implementation details and showing only the necessary features of an object.

**C# Example:**
```csharp
// Abstract class defines contract
public abstract class PaymentGateway
{
    // Template method (abstraction)
    public bool ProcessPayment(decimal amount, string account)
    {
        if (!ValidatePayment(amount, account))
        {
            Console.WriteLine("Validation failed");
            return false;
        }

        if (!Authorize(amount, account))
        {
            Console.WriteLine("Authorization failed");
            return false;
        }

        bool result = ExecutePayment(amount, account);

        if (result)
        {
            SendConfirmation(account);
        }

        return result;
    }

    // Abstract methods - details hidden, must be implemented by derived classes
    protected abstract bool Authorize(decimal amount, string account);
    protected abstract bool ExecutePayment(decimal amount, string account);

    // Concrete methods with default implementation
    protected virtual bool ValidatePayment(decimal amount, string account)
    {
        return amount > 0 && !string.IsNullOrEmpty(account);
    }

    protected virtual void SendConfirmation(string account)
    {
        Console.WriteLine($"Payment confirmation sent to {account}");
    }
}

// Concrete implementation
public class CreditCardGateway : PaymentGateway
{
    protected override bool Authorize(decimal amount, string account)
    {
        Console.WriteLine($"Authorizing credit card payment of ${amount}");
        // Complex authorization logic hidden here
        return true;
    }

    protected override bool ExecutePayment(decimal amount, string account)
    {
        Console.WriteLine($"Executing credit card payment of ${amount}");
        // Complex payment execution logic hidden here
        return true;
    }
}

public class PayPalGateway : PaymentGateway
{
    protected override bool Authorize(decimal amount, string account)
    {
        Console.WriteLine($"Authorizing PayPal payment of ${amount}");
        // Different authorization logic
        return true;
    }

    protected override bool ExecutePayment(decimal amount, string account)
    {
        Console.WriteLine($"Executing PayPal payment of ${amount}");
        // Different payment execution logic
        return true;
    }
}

// Usage - complexity is abstracted away
PaymentGateway gateway = new CreditCardGateway();
gateway.ProcessPayment(100.50m, "1234-5678-9012-3456");
```

**Key Differences:**

| Principle | Purpose | Example |
|-----------|---------|---------|
| Encapsulation | Data hiding | Private fields with public methods |
| Inheritance | Code reuse | Dog extends Animal |
| Polymorphism | One interface, multiple forms | List<Shape> with different shapes |
| Abstraction | Hide complexity | Abstract class/interface |

**Benefits of OOP:**
- **Modularity**: Code organized in logical units
- **Reusability**: Inheritance allows code reuse
- **Flexibility**: Polymorphism allows runtime behavior changes
- **Maintainability**: Changes localized to specific classes
- **Security**: Encapsulation protects data

---
## 9. React Fundamentals

**Question**: Explain React core concepts: components, state, props, and hooks. When would you use React?

**Answer**:

React is a JavaScript library for building user interfaces, particularly single-page applications with complex, interactive UIs.

### Core Concepts

**1. Components**

Components are reusable building blocks that return JSX (JavaScript XML).

```javascript
// Functional Component
function Welcome(props) {
    return <h1>Hello, {props.name}!</h1>;
}

// Arrow Function Component
const Welcome = (props) => {
    return <h1>Hello, {props.name}!</h1>;
};

// Usage
<Welcome name="John" />
```

**2. Props (Properties)**

Props pass data from parent to child components (immutable).

```javascript
// Parent Component
function App() {
    const user = { name: "Alice", age: 30 };
    
    return (
        <div>
            <UserProfile user={user} />
            <Greeting name="Bob" message="Welcome!" />
        </div>
    );
}

// Child Component
function UserProfile({ user }) {
    return (
        <div>
            <h2>{user.name}</h2>
            <p>Age: {user.age}</p>
        </div>
    );
}

function Greeting({ name, message }) {
    return <h3>{message}, {name}!</h3>;
}
```

**3. State**

State stores component data that can change over time.

```javascript
import { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);  // useState hook
    
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>
                Increment
            </button>
            <button onClick={() => setCount(count - 1)}>
                Decrement
            </button>
            <button onClick={() => setCount(0)}>
                Reset
            </button>
        </div>
    );
}
```

### React Hooks

**useState - State Management:**
```javascript
function Form() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
            />
            <input 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
            />
            <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
            />
            <button type="submit">Submit</button>
        </form>
    );
}
```

**useEffect - Side Effects:**
```javascript
import { useState, useEffect } from 'react';

function UserData({ userId }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        // Runs after component mounts and when userId changes
        const fetchUser = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/users/${userId}`);
                const data = await response.json();
                setUser(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        
        fetchUser();
        
        // Cleanup function (runs on unmount or before next effect)
        return () => {
            console.log('Cleanup');
        };
    }, [userId]);  // Dependency array - re-run when userId changes
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    
    return (
        <div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
        </div>
    );
}
```

**useContext - Global State:**
```javascript
import { createContext, useContext, useState } from 'react';

// Create context
const ThemeContext = createContext();

// Provider component
function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light');
    
    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };
    
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

// Consumer component
function ThemedButton() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    
    return (
        <button 
            onClick={toggleTheme}
            style={{ background: theme === 'light' ? '#fff' : '#333' }}
        >
            Toggle Theme (Current: {theme})
        </button>
    );
}

// App
function App() {
    return (
        <ThemeProvider>
            <ThemedButton />
        </ThemeProvider>
    );
}
```

**TypeScript with React:**
```typescript
import React, { useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
}

interface UserListProps {
    users: User[];
    onUserClick: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onUserClick }) => {
    return (
        <ul>
            {users.map(user => (
                <li key={user.id} onClick={() => onUserClick(user)}>
                    {user.name} - {user.email}
                </li>
            ))}
        </ul>
    );
};

// Usage
function App() {
    const [users] = useState<User[]>([
        { id: 1, name: 'Alice', email: 'alice@example.com' },
        { id: 2, name: 'Bob', email: 'bob@example.com' }
    ]);
    
    const handleUserClick = (user: User) => {
        console.log('Clicked user:', user);
    };
    
    return <UserList users={users} onUserClick={handleUserClick} />;
}
```

**Custom Hooks:**
```javascript
// Custom hook for form handling
function useForm(initialValues) {
    const [values, setValues] = useState(initialValues);
    
    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    };
    
    const reset = () => {
        setValues(initialValues);
    };
    
    return { values, handleChange, reset };
}

// Usage
function LoginForm() {
    const { values, handleChange, reset } = useForm({
        username: '',
        password: ''
    });
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login:', values);
        reset();
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input
                name="username"
                value={values.username}
                onChange={handleChange}
            />
            <input
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
            />
            <button type="submit">Login</button>
        </form>
    );
}
```

**When to Use React:**
- Complex, interactive UIs
- Single Page Applications (SPAs)
- Need component reusability
- Large-scale applications
- Rich ecosystem (Next.js, React Native)
- Need virtual DOM performance

**Key Benefits:**
- Component-based architecture
- Virtual DOM for performance
- Unidirectional data flow
- Strong community and ecosystem
- React Native for mobile apps

---

## 10. jQuery Fundamentals

**Question**: Explain jQuery basics and DOM manipulation. When would you still use jQuery in modern development?

**Answer**:

jQuery is a fast, small JavaScript library that simplifies DOM manipulation, event handling, AJAX, and animations.

### jQuery Basics

**Setup:**
```html
<!-- Include jQuery from CDN -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<script>
// Document ready
$(document).ready(function() {
    // Your code here
});

// Shorthand
$(function() {
    // Your code here
});
</script>
```

**Selectors:**
```javascript
// CSS-style selectors
$('#myId')              // ID selector
$('.myClass')           // Class selector
$('div')                // Element selector
$('div.myClass')        // Element with class
$('[data-role="btn"]')  // Attribute selector

// Hierarchy
$('ul li')              // Descendant
$('ul > li')            // Direct child
$('h1 + p')             // Adjacent sibling
$('h1 ~ p')             // General sibling

// Filters
$('li:first')           // First element
$('li:last')            // Last element
$('li:even')            // Even indexed
$('li:odd')             // Odd indexed
$('li:eq(2)')           // Specific index
$(':checkbox')          // All checkboxes
$(':checked')           // Checked elements
```

**DOM Manipulation:**
```javascript
// Get/Set content
$('#myDiv').text();                    // Get text
$('#myDiv').text('New text');          // Set text
$('#myDiv').html();                    // Get HTML
$('#myDiv').html('<p>New HTML</p>');   // Set HTML

// Get/Set attributes
$('img').attr('src');                  // Get attribute
$('img').attr('src', 'new.jpg');       // Set attribute
$('img').attr({                        // Set multiple
    src: 'new.jpg',
    alt: 'New image'
});

// Get/Set values (forms)
$('input').val();                      // Get value
$('input').val('New value');           // Set value

// CSS manipulation
$('#myDiv').css('color');              // Get CSS property
$('#myDiv').css('color', 'red');       // Set CSS property
$('#myDiv').css({                      // Set multiple
    color: 'red',
    'font-size': '16px',
    backgroundColor: '#f0f0f0'
});

// Classes
$('#myDiv').addClass('highlight');
$('#myDiv').removeClass('highlight');
$('#myDiv').toggleClass('active');
$('#myDiv').hasClass('active');        // Returns boolean
```

**DOM Manipulation - Add/Remove Elements:**
```javascript
// Append/Prepend
$('ul').append('<li>New item</li>');      // Add to end
$('ul').prepend('<li>First item</li>');   // Add to beginning

// After/Before
$('h1').after('<p>After h1</p>');
$('h1').before('<p>Before h1</p>');

// Remove
$('#myDiv').remove();          // Remove element and its data
$('#myDiv').empty();           // Remove children only

// Clone
$('#myDiv').clone().appendTo('body');
```

**Event Handling:**
```javascript
// Click event
$('#myButton').click(function() {
    alert('Button clicked!');
});

// Equivalent using .on()
$('#myButton').on('click', function() {
    alert('Button clicked!');
});

// Multiple events
$('#myInput').on({
    focus: function() {
        $(this).css('background', 'yellow');
    },
    blur: function() {
        $(this).css('background', 'white');
    },
    keyup: function(e) {
        console.log('Key pressed:', e.key);
    }
});

// Event delegation (for dynamic elements)
$('ul').on('click', 'li', function() {
    alert($(this).text());
});

// Prevent default and stop propagation
$('a').click(function(e) {
    e.preventDefault();        // Prevent default action
    e.stopPropagation();      // Stop bubbling
    console.log('Link clicked');
});

// One-time event
$('#myButton').one('click', function() {
    alert('This will only run once');
});

// Remove event handler
$('#myButton').off('click');
```

**Effects and Animations:**
```javascript
// Show/Hide
$('#myDiv').show();           // Show element
$('#myDiv').hide();           // Hide element
$('#myDiv').toggle();         // Toggle visibility

// Fade
$('#myDiv').fadeIn(1000);     // Fade in over 1 second
$('#myDiv').fadeOut(500);     // Fade out over 0.5 seconds
$('#myDiv').fadeToggle();     // Toggle fade
$('#myDiv').fadeTo(500, 0.5); // Fade to 50% opacity

// Slide
$('#myDiv').slideDown();      // Slide down
$('#myDiv').slideUp();        // Slide up
$('#myDiv').slideToggle();    // Toggle slide

// Custom animation
$('#myDiv').animate({
    left: '250px',
    opacity: 0.5,
    height: '150px',
    width: '150px'
}, 1000, function() {
    console.log('Animation complete');
});

// Chain animations
$('#myDiv')
    .fadeOut(500)
    .slideDown(500)
    .animate({ left: '100px' }, 1000);

// Stop animation
$('#myDiv').stop();           // Stop current animation
$('#myDiv').finish();         // Jump to end of animation
```

**AJAX:**
```javascript
// GET request
$.get('/api/users', function(data) {
    console.log('Data:', data);
});

// POST request
$.post('/api/users', { name: 'John', email: 'john@example.com' }, function(response) {
    console.log('Response:', response);
});

// AJAX with more options
$.ajax({
    url: '/api/users',
    method: 'GET',
    dataType: 'json',
    success: function(data) {
        console.log('Success:', data);
    },
    error: function(xhr, status, error) {
        console.error('Error:', error);
    },
    complete: function() {
        console.log('Request complete');
    }
});

// Load HTML into element
$('#myDiv').load('/page.html');

// Modern promise-based approach
$.ajax({
    url: '/api/users',
    method: 'GET'
})
.done(function(data) {
    console.log('Success:', data);
})
.fail(function(error) {
    console.error('Error:', error);
})
.always(function() {
    console.log('Complete');
});
```

**Utilities:**
```javascript
// Each iteration
$('li').each(function(index) {
    console.log(index + ': ' + $(this).text());
});

// Array/Object iteration
$.each([1, 2, 3], function(index, value) {
    console.log(index + ': ' + value);
});

$.each({ name: 'John', age: 30 }, function(key, value) {
    console.log(key + ': ' + value);
});

// Extend objects
let defaults = { color: 'red', size: 'medium' };
let options = { color: 'blue' };
let settings = $.extend({}, defaults, options);
// Result: { color: 'blue', size: 'medium' }

// Type checking
$.isArray([1, 2, 3]);        // true
$.isFunction(function(){});   // true
$.isNumeric('123');          // true

// Trim whitespace
$.trim('  text  ');          // 'text'
```

**jQuery vs Vanilla JavaScript:**

| Task | jQuery | Vanilla JS |
|------|--------|------------|
| Select element | `$('#id')` | `document.getElementById('id')` |
| Select by class | `$('.class')` | `document.querySelectorAll('.class')` |
| Add event | `$('#id').click(fn)` | `document.getElementById('id').addEventListener('click', fn)` |
| AJAX | `$.get(url, fn)` | `fetch(url).then(response => response.json())` |

**When to Use jQuery (Modern Context):**

**Still Useful:**
- Legacy codebases
- Quick prototypes
- Browser compatibility (older browsers)
- Simpler event delegation
- Animation without CSS3
- Working with plugins (Bootstrap 4, etc.)

**Avoid When:**
- Modern frameworks (React, Vue, Angular) handle DOM
- ES6+ and modern browsers support most features
- Performance-critical applications (bundle size)
- Using modern build tools (Webpack, Vite)

**Modern Alternative:**
```javascript
// jQuery
$('#myDiv').addClass('active').css('color', 'red');

// Vanilla JS (modern)
const div = document.getElementById('myDiv');
div.classList.add('active');
div.style.color = 'red';

// jQuery AJAX
$.get('/api/users', function(data) {
    console.log(data);
});

// Modern fetch API
fetch('/api/users')
    .then(response => response.json())
    .then(data => console.log(data));
```

**Key Takeaways:**
- jQuery simplifies DOM manipulation and cross-browser compatibility
- Modern JavaScript (ES6+) has caught up with many jQuery features
- React/Vue handle DOM updates automatically
- Still valuable for legacy projects and quick prototypes
- Understand both jQuery and modern alternatives

---

## 11. Code Performance Optimization

**Question**: How do you identify and fix performance bottlenecks in code? What techniques improve performance?

**Answer**:

**1. Time and Space Complexity:**

```python
# Bad: O(n²) - Nested loops
def find_duplicates_slow(arr):
    duplicates = []
    for i in range(len(arr)):
        for j in range(i + 1, len(arr)):
            if arr[i] == arr[j]:
                duplicates.append(arr[i])
    return duplicates

# Good: O(n) - Using set
def find_duplicates_fast(arr):
    seen = set()
    duplicates = set()
    for num in arr:
        if num in seen:
            duplicates.add(num)
        seen.add(num)
    return list(duplicates)

# Time: O(n²) → O(n)
# Space: O(1) → O(n) - trade-off
```

**2. Data Structure Selection:**

```python
# Bad: Using list for membership checks - O(n)
allowed_users = ['user1', 'user2', 'user3', ...]  # List with 10,000 items

def is_user_allowed(username):
    return username in allowed_users  # O(n) - slow!

# Good: Using set for membership checks - O(1)
allowed_users = {'user1', 'user2', 'user3', ...}  # Set

def is_user_allowed(username):
    return username in allowed_users  # O(1) - fast!
```

**3. Avoid Repeated Work:**

```javascript
// Bad: Recalculating in loop
for (let i = 0; i < array.length; i++) {  // length recalculated each iteration
    console.log(array[i]);
}

// Good: Cache the length
const len = array.length;
for (let i = 0; i < len; i++) {
    console.log(array[i]);
}

// Bad: Repeated DOM queries
for (let i = 0; i < 100; i++) {
    document.getElementById('myDiv').innerHTML += i;  // DOM query each time
}

// Good: Cache DOM reference
const div = document.getElementById('myDiv');
let html = '';
for (let i = 0; i < 100; i++) {
    html += i;
}
div.innerHTML = html;  // Single DOM write
```

**4. Lazy Loading and Pagination:**

```python
# Bad: Load all data at once
def get_all_users():
    return User.query.all()  # Could be millions of records!

# Good: Pagination
def get_users_page(page=1, per_page=50):
    return User.query.paginate(page=page, per_page=per_page)

# Good: Lazy loading with generator
def get_users_lazy():
    for user in User.query.yield_per(100):  # Batch of 100
        yield user
```

**5. Database Query Optimization:**

```python
# Bad: N+1 query problem
users = User.query.all()
for user in users:
    print(user.orders)  # Separate query for each user!

# Good: Eager loading
users = User.query.options(joinedload(User.orders)).all()
for user in users:
    print(user.orders)  # No additional queries

# Bad: Select all columns
users = db.execute("SELECT * FROM users WHERE city = 'NYC'")

# Good: Select only needed columns
users = db.execute("SELECT id, name FROM users WHERE city = 'NYC'")
```

**6. Caching:**

```python
from functools import lru_cache
import time

# Without caching
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(35))  # Takes ~5 seconds

# With caching - memoization
@lru_cache(maxsize=None)
def fibonacci_cached(n):
    if n <= 1:
        return n
    return fibonacci_cached(n-1) + fibonacci_cached(n-2)

print(fibonacci_cached(35))  # Takes milliseconds!
```

**7. Async/Parallel Processing:**

```python
import asyncio
import aiohttp

# Bad: Sequential API calls
import requests

def fetch_data_sync(urls):
    results = []
    for url in urls:
        response = requests.get(url)
        results.append(response.json())
    return results

# Takes: 10 URLs × 1 second = 10 seconds

# Good: Async API calls
async def fetch_data_async(urls):
    async with aiohttp.ClientSession() as session:
        tasks = [session.get(url) for url in urls]
        responses = await asyncio.gather(*tasks)
        return [await r.json() for r in responses]

# Takes: ~1 second (all in parallel!)
```

**C# Implementation - Performance Optimization:**

**1. LINQ Performance:**

```csharp
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;

public class LinqPerformance
{
    static void Main()
    {
        var numbers = Enumerable.Range(1, 1_000_000).ToList();

        // Bad: Multiple enumerations
        var sw1 = Stopwatch.StartNew();
        var query = numbers.Where(n => n % 2 == 0).Select(n => n * 2);
        var count = query.Count();  // First enumeration
        var sum = query.Sum();      // Second enumeration (recalculates!)
        sw1.Stop();
        Console.WriteLine($"Multiple enumerations: {sw1.ElapsedMilliseconds}ms");

        // Good: Single enumeration with ToList()
        var sw2 = Stopwatch.StartNew();
        var materialized = numbers.Where(n => n % 2 == 0).Select(n => n * 2).ToList();
        count = materialized.Count;  // No re-enumeration
        sum = materialized.Sum();    // No re-enumeration
        sw2.Stop();
        Console.WriteLine($"Single enumeration: {sw2.ElapsedMilliseconds}ms");

        // Good: For loop (fastest for simple operations)
        var sw3 = Stopwatch.StartNew();
        var result = new List<int>();
        for (int i = 0; i < numbers.Count; i++)
        {
            if (numbers[i] % 2 == 0)
                result.Add(numbers[i] * 2);
        }
        sw3.Stop();
        Console.WriteLine($"For loop: {sw3.ElapsedMilliseconds}ms");
    }
}
```

**2. String Concatenation:**

```csharp
using System;
using System.Diagnostics;
using System.Text;

public class StringPerformance
{
    static void Main()
    {
        const int iterations = 10_000;

        // Bad: String concatenation with + (creates new string each time)
        var sw1 = Stopwatch.StartNew();
        string result1 = "";
        for (int i = 0; i < iterations; i++)
        {
            result1 += i.ToString();  // O(n²) - very slow!
        }
        sw1.Stop();
        Console.WriteLine($"String +: {sw1.ElapsedMilliseconds}ms");

        // Good: StringBuilder (mutable, O(n))
        var sw2 = Stopwatch.StartNew();
        var sb = new StringBuilder();
        for (int i = 0; i < iterations; i++)
        {
            sb.Append(i);
        }
        string result2 = sb.ToString();
        sw2.Stop();
        Console.WriteLine($"StringBuilder: {sw2.ElapsedMilliseconds}ms");

        // Result: StringBuilder is 100x-1000x faster!
    }
}
```

**3. Collection Performance:**

```csharp
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;

public class CollectionPerformance
{
    static void Main()
    {
        const int size = 100_000;

        // List vs HashSet for lookups
        var list = Enumerable.Range(1, size).ToList();
        var hashSet = new HashSet<int>(list);

        int searchValue = size - 1;  // Worst case for list

        // Bad: List.Contains() - O(n)
        var sw1 = Stopwatch.StartNew();
        bool found1 = list.Contains(searchValue);
        sw1.Stop();
        Console.WriteLine($"List.Contains: {sw1.ElapsedMilliseconds}ms");

        // Good: HashSet.Contains() - O(1)
        var sw2 = Stopwatch.StartNew();
        bool found2 = hashSet.Contains(searchValue);
        sw2.Stop();
        Console.WriteLine($"HashSet.Contains: {sw2.ElapsedTicks} ticks");

        // Dictionary for key-value lookups
        var dict = new Dictionary<int, string>();
        for (int i = 0; i < size; i++)
        {
            dict[i] = $"Value{i}";
        }

        // O(1) lookup
        var sw3 = Stopwatch.StartNew();
        string value = dict[searchValue];
        sw3.Stop();
        Console.WriteLine($"Dictionary lookup: {sw3.ElapsedTicks} ticks");
    }
}
```

**4. Async/Await Performance:**

```csharp
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

public class AsyncPerformance
{
    private static readonly HttpClient client = new HttpClient();

    // Bad: Sequential API calls
    static async Task<List<string>> FetchDataSequentialAsync(List<string> urls)
    {
        var results = new List<string>();
        foreach (var url in urls)
        {
            var response = await client.GetStringAsync(url);
            results.Add(response);
        }
        return results;
        // Time: N urls × average response time
    }

    // Good: Parallel API calls
    static async Task<List<string>> FetchDataParallelAsync(List<string> urls)
    {
        var tasks = urls.Select(url => client.GetStringAsync(url));
        var results = await Task.WhenAll(tasks);
        return results.ToList();
        // Time: ~max response time (all parallel)
    }

    static async Task Main()
    {
        var urls = Enumerable.Range(1, 10)
            .Select(i => $"https://jsonplaceholder.typicode.com/posts/{i}")
            .ToList();

        // Sequential
        var sw1 = Stopwatch.StartNew();
        var data1 = await FetchDataSequentialAsync(urls);
        sw1.Stop();
        Console.WriteLine($"Sequential: {sw1.ElapsedMilliseconds}ms");

        // Parallel
        var sw2 = Stopwatch.StartNew();
        var data2 = await FetchDataParallelAsync(urls);
        sw2.Stop();
        Console.WriteLine($"Parallel: {sw2.ElapsedMilliseconds}ms");
    }
}
```

**5. Memory Optimization with Span<T>:**

```csharp
using System;
using System.Diagnostics;

public class MemoryOptimization
{
    // Bad: Creates substring (allocates new string)
    static string ParseSubstringBad(string input)
    {
        return input.Substring(0, 10);  // Allocates new string
    }

    // Good: Uses Span<char> (no allocation)
    static ReadOnlySpan<char> ParseSubstringGood(string input)
    {
        return input.AsSpan(0, 10);  // No allocation, just a "view"
    }

    static void Main()
    {
        string data = "This is a long string with lots of data...";

        // Bad: Substring allocations
        var sw1 = Stopwatch.StartNew();
        for (int i = 0; i < 1_000_000; i++)
        {
            var sub = data.Substring(0, 10);
        }
        sw1.Stop();
        Console.WriteLine($"Substring: {sw1.ElapsedMilliseconds}ms");

        // Good: Span (no allocations)
        var sw2 = Stopwatch.StartNew();
        for (int i = 0; i < 1_000_000; i++)
        {
            var span = data.AsSpan(0, 10);
        }
        sw2.Stop();
        Console.WriteLine($"Span: {sw2.ElapsedMilliseconds}ms");
    }
}
```

**6. Entity Framework Core Performance:**

```csharp
using Microsoft.EntityFrameworkCore;
using System;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

public class EFCorePerformance
{
    // Bad: N+1 query problem
    static async Task BadQueryAsync(AppDbContext context)
    {
        var sw = Stopwatch.StartNew();
        var users = await context.Users.ToListAsync();
        foreach (var user in users)
        {
            // Separate query for each user!
            var orderCount = user.Orders.Count;  // N+1 queries
        }
        sw.Stop();
        Console.WriteLine($"N+1 queries: {sw.ElapsedMilliseconds}ms");
    }

    // Good: Eager loading
    static async Task GoodQueryAsync(AppDbContext context)
    {
        var sw = Stopwatch.StartNew();
        var users = await context.Users
            .Include(u => u.Orders)  // Single JOIN query
            .ToListAsync();
        foreach (var user in users)
        {
            var orderCount = user.Orders.Count;  // No extra queries
        }
        sw.Stop();
        Console.WriteLine($"Eager loading: {sw.ElapsedMilliseconds}ms");
    }

    // Best: Projection (select only what you need)
    static async Task BestQueryAsync(AppDbContext context)
    {
        var sw = Stopwatch.StartNew();
        var userStats = await context.Users
            .Select(u => new
            {
                u.Name,
                OrderCount = u.Orders.Count  // Calculated in SQL
            })
            .ToListAsync();
        sw.Stop();
        Console.WriteLine($"Projection: {sw.ElapsedMilliseconds}ms");
    }

    // Use AsNoTracking for read-only queries
    static async Task NoTrackingQueryAsync(AppDbContext context)
    {
        var sw = Stopwatch.StartNew();
        var users = await context.Users
            .AsNoTracking()  // Skip change tracking (faster)
            .ToListAsync();
        sw.Stop();
        Console.WriteLine($"AsNoTracking: {sw.ElapsedMilliseconds}ms");
    }
}
```

**7. Caching with MemoryCache:**

```csharp
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Diagnostics;
using System.Threading.Tasks;

public class CachingExample
{
    private static IMemoryCache cache = new MemoryCache(new MemoryCacheOptions());

    // Expensive operation
    static string ExpensiveOperation(int id)
    {
        System.Threading.Thread.Sleep(1000);  // Simulate slow operation
        return $"Result for {id}";
    }

    // Without caching
    static void WithoutCache(int id)
    {
        var sw = Stopwatch.StartNew();
        var result = ExpensiveOperation(id);
        sw.Stop();
        Console.WriteLine($"Without cache: {sw.ElapsedMilliseconds}ms");
    }

    // With caching
    static void WithCache(int id)
    {
        var sw = Stopwatch.StartNew();
        var result = cache.GetOrCreate(id, entry =>
        {
            entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5);
            return ExpensiveOperation(id);
        });
        sw.Stop();
        Console.WriteLine($"With cache: {sw.ElapsedMilliseconds}ms");
    }

    static void Main()
    {
        WithCache(1);  // ~1000ms (cache miss)
        WithCache(1);  // ~0ms (cache hit!)
        WithCache(1);  // ~0ms (cache hit!)
    }
}
```

**JavaScript-Specific Optimizations:**

```javascript
// 1. Debouncing (limit function calls)
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Usage: Search input
const search = debounce((query) => {
    fetch(`/api/search?q=${query}`);
}, 300);  // Only call after 300ms of no typing

document.getElementById('search').addEventListener('input', (e) => {
    search(e.target.value);
});

// 2. Throttling (limit execution rate)
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Usage: Scroll handler
const handleScroll = throttle(() => {
    console.log('Scrolled');
}, 100);  // Max once per 100ms

window.addEventListener('scroll', handleScroll);

// 3. Virtual scrolling (render only visible items)
// Bad: Render 10,000 items
const container = document.getElementById('container');
for (let i = 0; i < 10000; i++) {
    const div = document.createElement('div');
    div.textContent = `Item ${i}`;
    container.appendChild(div);  // Slow! DOM overload
}

// Good: Render only visible items (pseudo-code)
const visibleStart = Math.floor(scrollTop / itemHeight);
const visibleEnd = visibleStart + visibleCount;
renderItems(items.slice(visibleStart, visibleEnd));
```

**Performance Profiling Tools:**

**C#:**
- Visual Studio Profiler (CPU, Memory, Database)
- BenchmarkDotNet for micro-benchmarks
- PerfView for advanced profiling
- dotMemory for memory analysis

**Python:**
```python
import cProfile
import pstats

# Profile code
cProfile.run('my_function()', 'output.prof')

# Analyze results
p = pstats.Stats('output.prof')
p.sort_stats('cumulative').print_stats(10)
```

**JavaScript:**
- Chrome DevTools Performance tab
- Lighthouse for web app audits
- `console.time()` / `console.timeEnd()`
- React DevTools Profiler

**Performance Checklist:**

✅ **Algorithm Complexity:**
- Choose O(n) over O(n²) when possible
- Use appropriate data structures (hash tables, trees)
- Avoid nested loops for large datasets

✅ **Database:**
- Use indexes on frequently queried columns
- Eager load relationships (avoid N+1)
- Select only needed columns
- Use pagination for large result sets

✅ **Caching:**
- Cache expensive computations
- Use CDN for static assets
- Implement HTTP caching headers
- Consider in-memory caches (Redis, Memcached)

✅ **Async/Parallel:**
- Use async/await for I/O operations
- Parallel.ForEach for CPU-bound parallel work
- Avoid blocking threads
- Use connection pooling

✅ **Memory:**
- Dispose of resources properly (using/IDisposable)
- Avoid memory leaks (event handlers, closures)
- Use Span<T> for low-allocation scenarios
- Consider object pooling for high-allocation code

✅ **Frontend:**
- Minimize DOM manipulations
- Use virtual scrolling for long lists
- Lazy load images and components
- Debounce/throttle event handlers
- Code splitting and tree shaking

**Key Principle: Measure First, Optimize Second**
- Don't optimize prematurely
- Profile to find actual bottlenecks
- Benchmark before and after changes
- Balance readability with performance

---

## 12. Angular Fundamentals

**Question**: What are the core concepts of Angular? Explain components, services, dependency injection, and directives.

**Answer**:

**Angular Overview:**
Angular is a TypeScript-based web application framework maintained by Google. It provides a complete solution for building SPAs with routing, forms, HTTP, and more.

**1. Components:**

Components are the building blocks of Angular applications. Each component controls a view template.

```typescript
// user.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  // Properties
  name: string = 'John Doe';
  age: number = 30;
  isActive: boolean = true;

  // Constructor
  constructor() { }

  // Lifecycle hook
  ngOnInit(): void {
    console.log('Component initialized');
  }

  // Methods
  updateName(newName: string): void {
    this.name = newName;
  }

  greet(): string {
    return `Hello, ${this.name}!`;
  }
}
```

```html
<!-- user.component.html -->
<div class="user-card">
  <h2>{{ name }}</h2>
  <p>Age: {{ age }}</p>
  <p>Status: {{ isActive ? 'Active' : 'Inactive' }}</p>

  <button (click)="updateName('Jane Doe')">Change Name</button>

  <p>{{ greet() }}</p>
</div>
```

**2. Data Binding:**

```typescript
// data-binding.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-data-binding',
  template: `
    <!-- Interpolation -->
    <h1>{{ title }}</h1>

    <!-- Property Binding -->
    <img [src]="imageUrl" [alt]="imageAlt">
    <button [disabled]="isDisabled">Click Me</button>

    <!-- Event Binding -->
    <button (click)="handleClick()">Submit</button>
    <input (keyup)="onKeyUp($event)">

    <!-- Two-Way Binding -->
    <input [(ngModel)]="username" placeholder="Enter username">
    <p>Username: {{ username }}</p>
  `
})
export class DataBindingComponent {
  // Interpolation
  title = 'Angular Data Binding';

  // Property binding
  imageUrl = 'https://angular.io/assets/images/logos/angular/angular.png';
  imageAlt = 'Angular Logo';
  isDisabled = false;

  // Event binding
  handleClick(): void {
    alert('Button clicked!');
  }

  onKeyUp(event: KeyboardEvent): void {
    console.log('Key pressed:', (event.target as HTMLInputElement).value);
  }

  // Two-way binding
  username = '';
}
```

**3. Services and Dependency Injection:**

```typescript
// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'  // Singleton service
})
export class UserService {
  private apiUrl = 'https://api.example.com/users';

  constructor(private http: HttpClient) { }

  // Get all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // Get user by ID
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  // Create user
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  // Update user
  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  // Delete user
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
```

**Using the service in a component:**

```typescript
// user-list.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService, User } from './user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  loading = false;
  error: string | null = null;

  // Dependency Injection
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load users';
        this.loading = false;
        console.error(err);
      }
    });
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.users = this.users.filter(u => u.id !== id);
        },
        error: (err) => console.error(err)
      });
    }
  }
}
```

```html
<!-- user-list.component.html -->
<div *ngIf="loading">Loading...</div>
<div *ngIf="error" class="error">{{ error }}</div>

<div *ngIf="!loading && !error">
  <ul>
    <li *ngFor="let user of users">
      {{ user.name }} - {{ user.email }}
      <button (click)="deleteUser(user.id)">Delete</button>
    </li>
  </ul>
</div>
```

**4. Directives:**

**Structural Directives (change DOM structure):**

```typescript
@Component({
  selector: 'app-directives',
  template: `
    <!-- *ngIf - Conditional rendering -->
    <div *ngIf="isLoggedIn">
      Welcome back!
    </div>

    <div *ngIf="isLoggedIn; else loginTemplate">
      You are logged in
    </div>
    <ng-template #loginTemplate>
      Please log in
    </ng-template>

    <!-- *ngFor - Loop through items -->
    <ul>
      <li *ngFor="let item of items; let i = index; let isFirst = first">
        {{ i + 1 }}. {{ item }} <span *ngIf="isFirst">(First)</span>
      </li>
    </ul>

    <!-- *ngSwitch - Multiple conditions -->
    <div [ngSwitch]="userRole">
      <p *ngSwitchCase="'admin'">Admin Panel</p>
      <p *ngSwitchCase="'user'">User Dashboard</p>
      <p *ngSwitchDefault>Guest View</p>
    </div>
  `
})
export class DirectivesComponent {
  isLoggedIn = true;
  items = ['Apple', 'Banana', 'Orange'];
  userRole = 'admin';
}
```

**Attribute Directives (change appearance or behavior):**

```typescript
@Component({
  selector: 'app-attribute-directives',
  template: `
    <!-- ngClass - Dynamic CSS classes -->
    <div [ngClass]="{'active': isActive, 'disabled': isDisabled}">
      Dynamic classes
    </div>

    <div [ngClass]="currentClasses">Classes from object</div>

    <!-- ngStyle - Dynamic inline styles -->
    <p [ngStyle]="{'color': textColor, 'font-size': fontSize + 'px'}">
      Styled text
    </p>

    <p [ngStyle]="currentStyles">Styles from object</p>

    <!-- ngModel - Two-way binding -->
    <input [(ngModel)]="searchText" placeholder="Search...">
    <p>You typed: {{ searchText }}</p>
  `
})
export class AttributeDirectivesComponent {
  isActive = true;
  isDisabled = false;

  currentClasses = {
    'highlight': true,
    'bold': false,
    'large': true
  };

  textColor = 'blue';
  fontSize = 16;

  currentStyles = {
    'font-weight': 'bold',
    'text-decoration': 'underline'
  };

  searchText = '';
}
```

**Custom Directive:**

```typescript
// highlight.directive.ts
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input() appHighlight = 'yellow';
  @Input() defaultColor = 'transparent';

  constructor(private el: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.appHighlight);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(this.defaultColor);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}

// Usage:
// <p appHighlight="lightblue">Hover over me!</p>
```

**5. Input/Output - Component Communication:**

```typescript
// child.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
    <div class="child">
      <h3>{{ title }}</h3>
      <p>Count: {{ count }}</p>
      <button (click)="increment()">Increment</button>
      <button (click)="sendMessage()">Send Message</button>
    </div>
  `
})
export class ChildComponent {
  // Input - receive data from parent
  @Input() title: string = 'Child Component';
  @Input() count: number = 0;

  // Output - emit events to parent
  @Output() countChange = new EventEmitter<number>();
  @Output() message = new EventEmitter<string>();

  increment(): void {
    this.count++;
    this.countChange.emit(this.count);
  }

  sendMessage(): void {
    this.message.emit('Hello from child!');
  }
}

// parent.component.ts
@Component({
  selector: 'app-parent',
  template: `
    <div class="parent">
      <h2>Parent Component</h2>
      <p>Parent count: {{ parentCount }}</p>
      <p>Message: {{ receivedMessage }}</p>

      <app-child
        [title]="'Child 1'"
        [count]="parentCount"
        (countChange)="onCountChange($event)"
        (message)="onMessage($event)">
      </app-child>
    </div>
  `
})
export class ParentComponent {
  parentCount = 0;
  receivedMessage = '';

  onCountChange(newCount: number): void {
    this.parentCount = newCount;
  }

  onMessage(msg: string): void {
    this.receivedMessage = msg;
  }
}
```

**6. Routing:**

```typescript
// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'users', component: UserListComponent },
  { path: 'users/:id', component: UserDetailComponent },  // Route parameter
  { path: '**', component: NotFoundComponent }  // Wildcard for 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

```typescript
// app.component.ts
@Component({
  selector: 'app-root',
  template: `
    <nav>
      <a routerLink="/home" routerLinkActive="active">Home</a>
      <a routerLink="/about" routerLinkActive="active">About</a>
      <a routerLink="/users" routerLinkActive="active">Users</a>
    </nav>

    <router-outlet></router-outlet>
  `
})
export class AppComponent { }
```

```typescript
// user-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, User } from '../user.service';

@Component({
  selector: 'app-user-detail',
  template: `
    <div *ngIf="user">
      <h2>{{ user.name }}</h2>
      <p>Email: {{ user.email }}</p>
      <button (click)="goBack()">Back</button>
    </div>
  `
})
export class UserDetailComponent implements OnInit {
  user: User | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    // Get route parameter
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadUser(id);
  }

  loadUser(id: number): void {
    this.userService.getUserById(id).subscribe({
      next: (data) => this.user = data,
      error: (err) => console.error(err)
    });
  }

  goBack(): void {
    this.router.navigate(['/users']);
  }
}
```

**7. Forms:**

**Template-Driven Forms:**

```typescript
// template-form.component.ts
import { Component } from '@angular/core';

interface FormData {
  name: string;
  email: string;
  age: number;
}

@Component({
  selector: 'app-template-form',
  template: `
    <form #userForm="ngForm" (ngSubmit)="onSubmit(userForm)">
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          [(ngModel)]="model.name"
          #name="ngModel"
          required
          minlength="3">
        <div *ngIf="name.invalid && name.touched" class="error">
          <span *ngIf="name.errors?.['required']">Name is required</span>
          <span *ngIf="name.errors?.['minlength']">Min length is 3</span>
        </div>
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          [(ngModel)]="model.email"
          #email="ngModel"
          required
          email>
        <div *ngIf="email.invalid && email.touched" class="error">
          Email is invalid
        </div>
      </div>

      <div>
        <label>Age:</label>
        <input
          type="number"
          name="age"
          [(ngModel)]="model.age"
          #age="ngModel"
          required
          min="18"
          max="100">
      </div>

      <button type="submit" [disabled]="userForm.invalid">Submit</button>
    </form>

    <pre>{{ model | json }}</pre>
  `
})
export class TemplateFormComponent {
  model: FormData = {
    name: '',
    email: '',
    age: 18
  };

  onSubmit(form: any): void {
    if (form.valid) {
      console.log('Form submitted:', this.model);
    }
  }
}
```

**Reactive Forms:**

```typescript
// reactive-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  template: `
    <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
      <div>
        <label>Name:</label>
        <input formControlName="name">
        <div *ngIf="name?.invalid && name?.touched" class="error">
          <span *ngIf="name?.errors?.['required']">Name is required</span>
          <span *ngIf="name?.errors?.['minlength']">
            Min length is {{ name?.errors?.['minlength'].requiredLength }}
          </span>
        </div>
      </div>

      <div>
        <label>Email:</label>
        <input formControlName="email">
        <div *ngIf="email?.invalid && email?.touched" class="error">
          Invalid email
        </div>
      </div>

      <div formGroupName="address">
        <h4>Address</h4>
        <input formControlName="street" placeholder="Street">
        <input formControlName="city" placeholder="City">
      </div>

      <button type="submit" [disabled]="userForm.invalid">Submit</button>
    </form>

    <pre>{{ userForm.value | json }}</pre>
  `
})
export class ReactiveFormComponent implements OnInit {
  userForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      address: this.fb.group({
        street: [''],
        city: ['']
      })
    });

    // Subscribe to value changes
    this.userForm.get('name')?.valueChanges.subscribe(value => {
      console.log('Name changed:', value);
    });
  }

  // Getter for easy access in template
  get name() {
    return this.userForm.get('name');
  }

  get email() {
    return this.userForm.get('email');
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      console.log('Form submitted:', this.userForm.value);
    }
  }
}
```

**8. Pipes:**

```typescript
// Built-in pipes
@Component({
  selector: 'app-pipes',
  template: `
    <!-- Date pipe -->
    <p>{{ today | date }}</p>
    <p>{{ today | date:'short' }}</p>
    <p>{{ today | date:'dd/MM/yyyy' }}</p>

    <!-- Currency pipe -->
    <p>{{ price | currency }}</p>
    <p>{{ price | currency:'EUR' }}</p>

    <!-- Uppercase/Lowercase -->
    <p>{{ name | uppercase }}</p>
    <p>{{ name | lowercase }}</p>

    <!-- JSON pipe -->
    <pre>{{ user | json }}</pre>

    <!-- Percent pipe -->
    <p>{{ 0.75 | percent }}</p>

    <!-- Async pipe -->
    <p>{{ users$ | async | json }}</p>
  `
})
export class PipesComponent {
  today = new Date();
  price = 99.99;
  name = 'Angular Developer';
  user = { name: 'John', age: 30 };
  users$ = this.userService.getUsers();

  constructor(private userService: UserService) { }
}
```

**Custom Pipe:**

```typescript
// filter.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string, field: string): any[] {
    if (!items || !searchText) {
      return items;
    }

    searchText = searchText.toLowerCase();

    return items.filter(item => {
      return item[field].toLowerCase().includes(searchText);
    });
  }
}

// Usage:
// <li *ngFor="let user of users | filter:searchText:'name'">
//   {{ user.name }}
// </li>
```

**9. Lifecycle Hooks:**

```typescript
import { Component, OnInit, OnDestroy, OnChanges,
         SimpleChanges, Input } from '@angular/core';

@Component({
  selector: 'app-lifecycle',
  template: `<p>Check console for lifecycle logs</p>`
})
export class LifecycleComponent implements OnInit, OnChanges, OnDestroy {
  @Input() data: any;

  // 1. Constructor - called first
  constructor() {
    console.log('1. Constructor');
  }

  // 2. ngOnChanges - when input properties change
  ngOnChanges(changes: SimpleChanges): void {
    console.log('2. ngOnChanges', changes);
  }

  // 3. ngOnInit - after first ngOnChanges
  ngOnInit(): void {
    console.log('3. ngOnInit - initialization logic here');
  }

  // 4. ngDoCheck - custom change detection
  ngDoCheck(): void {
    console.log('4. ngDoCheck');
  }

  // 5. ngAfterContentInit - after content projection
  ngAfterContentInit(): void {
    console.log('5. ngAfterContentInit');
  }

  // 6. ngAfterContentChecked - after content checked
  ngAfterContentChecked(): void {
    console.log('6. ngAfterContentChecked');
  }

  // 7. ngAfterViewInit - after view initialized
  ngAfterViewInit(): void {
    console.log('7. ngAfterViewInit');
  }

  // 8. ngAfterViewChecked - after view checked
  ngAfterViewChecked(): void {
    console.log('8. ngAfterViewChecked');
  }

  // 9. ngOnDestroy - cleanup before component destruction
  ngOnDestroy(): void {
    console.log('9. ngOnDestroy - cleanup here');
  }
}
```

**Key Concepts Summary:**

✅ **Components**: Building blocks with templates, styles, and logic
✅ **Data Binding**: Interpolation, property, event, two-way binding
✅ **Services**: Reusable business logic with dependency injection
✅ **Directives**: Structural (*ngIf, *ngFor) and Attribute (ngClass, ngStyle)
✅ **Routing**: Navigation between views with parameters
✅ **Forms**: Template-driven and reactive forms with validation
✅ **Pipes**: Transform data in templates
✅ **Lifecycle Hooks**: Component lifecycle management

