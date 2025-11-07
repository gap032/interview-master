# Języki Programowania - Pytania Poziom Senior

## 1. Compare Memory Management: Java vs C++ vs Go

**Pytanie**: Compare memory management strategies across languages. Discuss GC algorithms and trade-offs.

**Odpowiedź**:

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

**Pytanie**: Compare asynchronous programming models. When to use each?

**Odpowiedź**:

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

**Pytanie**: Explain reflection in C#, its use cases, and performance implications. Compare with compile-time alternatives.

**Odpowiedź**:

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

**Pytanie**: What are expression trees? When would you use them over delegates?

**Odpowiedź**:

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

**Pytanie**: Explain C# records, pattern matching, and discriminated unions. How do they compare to other languages?

**Odpowiedź**:

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

---

## 7. Advanced Angular Concepts

**Pytanie**: Explain RxJS operators, state management strategies, change detection, lazy loading, and advanced routing patterns in Angular.

**Odpowiedź**:

**1. RxJS Operators and Reactive Programming:**

**Common RxJS Operators:**

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject, combineLatest, merge, forkJoin } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap,
         catchError, retry, tap, takeUntil, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs-demo',
  template: `
    <input [formControl]="searchControl" placeholder="Search...">
    <div *ngFor="let result of searchResults$ | async">
      {{ result.name }}
    </div>
  `
})
export class RxjsDemoComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  searchControl = new FormControl('');
  searchResults$!: Observable<any[]>;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Search with debounce and distinctUntilChanged
    this.searchResults$ = this.searchControl.valueChanges.pipe(
      debounceTime(300),              // Wait 300ms after user stops typing
      distinctUntilChanged(),         // Only if value changed
      filter(term => term.length >= 3), // Min 3 characters
      switchMap(term => this.search(term)), // Cancel previous, switch to new
      catchError(err => {
        console.error('Search error:', err);
        return of([]);
      }),
      takeUntil(this.destroy$)        // Cleanup on destroy
    );
  }

  search(term: string): Observable<any[]> {
    return this.http.get<any[]>(`/api/search?q=${term}`);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

**Advanced RxJS Patterns:**

```typescript
// 1. CombineLatest - combine multiple observables
@Component({
  selector: 'app-dashboard',
  template: `
    <div *ngIf="dashboardData$ | async as data">
      <p>Users: {{ data.users.length }}</p>
      <p>Orders: {{ data.orders.length }}</p>
      <p>Settings: {{ data.settings.theme }}</p>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  dashboardData$!: Observable<any>;

  constructor(
    private userService: UserService,
    private orderService: OrderService,
    private settingsService: SettingsService
  ) { }

  ngOnInit(): void {
    // Combine three observables into one
    this.dashboardData$ = combineLatest([
      this.userService.getUsers(),
      this.orderService.getOrders(),
      this.settingsService.getSettings()
    ]).pipe(
      map(([users, orders, settings]) => ({
        users,
        orders,
        settings
      })),
      shareReplay(1)  // Cache and share result
    );
  }
}

// 2. ForkJoin - wait for all to complete (like Promise.all)
loadInitialData(): Observable<InitialData> {
  return forkJoin({
    users: this.http.get<User[]>('/api/users'),
    products: this.http.get<Product[]>('/api/products'),
    categories: this.http.get<Category[]>('/api/categories')
  }).pipe(
    catchError(error => {
      console.error('Failed to load initial data', error);
      throw error;
    })
  );
}

// 3. Merge - merge multiple observables
const clicks$ = fromEvent(button, 'click');
const touches$ = fromEvent(button, 'touchstart');
const interactions$ = merge(clicks$, touches$);

// 4. Higher-order observables
@Component({
  selector: 'app-autocomplete',
  template: `
    <input (input)="search$.next($event.target.value)">
    <ul>
      <li *ngFor="let item of results$ | async">{{ item }}</li>
    </ul>
  `
})
export class AutocompleteComponent implements OnInit {
  search$ = new Subject<string>();
  results$!: Observable<any[]>;

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    this.results$ = this.search$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term =>
        term.length >= 2
          ? this.searchService.search(term).pipe(
              retry(3),  // Retry failed requests
              catchError(() => of([]))
            )
          : of([])
      )
    );
  }
}

// 5. BehaviorSubject for state management
export class DataService {
  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  constructor(private http: HttpClient) { }

  loadUsers(): void {
    this.loadingSubject.next(true);

    this.http.get<User[]>('/api/users').pipe(
      tap(users => this.usersSubject.next(users)),
      catchError(error => {
        console.error('Error loading users:', error);
        return of([]);
      }),
      finalize(() => this.loadingSubject.next(false))
    ).subscribe();
  }

  addUser(user: User): void {
    const currentUsers = this.usersSubject.value;
    this.usersSubject.next([...currentUsers, user]);
  }

  getUserById(id: number): Observable<User | undefined> {
    return this.users$.pipe(
      map(users => users.find(u => u.id === id))
    );
  }
}
```

**2. State Management with NgRx:**

```typescript
// actions/user.actions.ts
import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

export const loadUsers = createAction('[User List] Load Users');

export const loadUsersSuccess = createAction(
  '[User API] Load Users Success',
  props<{ users: User[] }>()
);

export const loadUsersFailure = createAction(
  '[User API] Load Users Failure',
  props<{ error: string }>()
);

export const addUser = createAction(
  '[User Form] Add User',
  props<{ user: User }>()
);

export const updateUser = createAction(
  '[User Form] Update User',
  props<{ user: User }>()
);

export const deleteUser = createAction(
  '[User List] Delete User',
  props<{ id: number }>()
);
```

```typescript
// reducers/user.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/user.actions';
import { User } from '../models/user.model';

export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  selectedUserId: number | null;
}

export const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  selectedUserId: null
};

export const userReducer = createReducer(
  initialState,

  on(UserActions.loadUsers, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(UserActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false
  })),

  on(UserActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(UserActions.addUser, (state, { user }) => ({
    ...state,
    users: [...state.users, user]
  })),

  on(UserActions.updateUser, (state, { user }) => ({
    ...state,
    users: state.users.map(u => u.id === user.id ? user : u)
  })),

  on(UserActions.deleteUser, (state, { id }) => ({
    ...state,
    users: state.users.filter(u => u.id !== id)
  }))
);
```

```typescript
// selectors/user.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../reducers/user.reducer';

export const selectUserState = createFeatureSelector<UserState>('users');

export const selectAllUsers = createSelector(
  selectUserState,
  (state) => state.users
);

export const selectUsersLoading = createSelector(
  selectUserState,
  (state) => state.loading
);

export const selectUsersError = createSelector(
  selectUserState,
  (state) => state.error
);

export const selectUserById = (id: number) => createSelector(
  selectAllUsers,
  (users) => users.find(u => u.id === id)
);

export const selectActiveUsers = createSelector(
  selectAllUsers,
  (users) => users.filter(u => u.isActive)
);
```

```typescript
// effects/user.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import * as UserActions from '../actions/user.actions';

@Injectable()
export class UserEffects {

  loadUsers$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.loadUsers),
    switchMap(() =>
      this.userService.getUsers().pipe(
        map(users => UserActions.loadUsersSuccess({ users })),
        catchError(error => of(UserActions.loadUsersFailure({
          error: error.message
        })))
      )
    )
  ));

  addUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.addUser),
    switchMap(({ user }) =>
      this.userService.createUser(user).pipe(
        map(createdUser => UserActions.addUser({ user: createdUser })),
        catchError(error => of(UserActions.loadUsersFailure({
          error: error.message
        })))
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) { }
}
```

```typescript
// Component using NgRx
@Component({
  selector: 'app-user-list',
  template: `
    <div *ngIf="loading$ | async">Loading...</div>
    <div *ngIf="error$ | async as error" class="error">{{ error }}</div>

    <ul>
      <li *ngFor="let user of users$ | async">
        {{ user.name }} - {{ user.email }}
        <button (click)="deleteUser(user.id)">Delete</button>
      </li>
    </ul>

    <button (click)="loadUsers()">Refresh</button>
  `
})
export class UserListComponent implements OnInit {
  users$ = this.store.select(selectAllUsers);
  loading$ = this.store.select(selectUsersLoading);
  error$ = this.store.select(selectUsersError);

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.store.dispatch(UserActions.loadUsers());
  }

  deleteUser(id: number): void {
    this.store.dispatch(UserActions.deleteUser({ id }));
  }
}
```

**3. Change Detection Strategies:**

```typescript
// Default change detection (runs on every change)
@Component({
  selector: 'app-default',
  template: `
    <h2>{{ title }}</h2>
    <p>Count: {{ count }}</p>
  `,
  changeDetection: ChangeDetectionStrategy.Default  // Default
})
export class DefaultComponent {
  title = 'Default Change Detection';
  count = 0;
}

// OnPush change detection (optimized)
@Component({
  selector: 'app-optimized',
  template: `
    <h2>{{ title }}</h2>
    <p>Count: {{ data.count }}</p>
    <p>Items: {{ items.length }}</p>

    <!-- Change detection triggered by: -->
    <!-- 1. Input reference change -->
    <!-- 2. Event from template -->
    <!-- 3. Async pipe emission -->
    <button (click)="increment()">Increment</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush  // Optimized!
})
export class OptimizedComponent {
  @Input() data!: { count: number };  // Must change reference
  @Input() items!: any[];

  title = 'OnPush Change Detection';

  constructor(private cdr: ChangeDetectorRef) { }

  increment(): void {
    // This triggers change detection (event from template)
    this.data = { ...this.data, count: this.data.count + 1 };
  }

  // Manually trigger change detection if needed
  manualUpdate(): void {
    this.cdr.markForCheck();
  }
}

// Parent component must pass new references
@Component({
  selector: 'app-parent',
  template: `
    <app-optimized
      [data]="userData"
      [items]="userItems">
    </app-optimized>

    <button (click)="updateData()">Update</button>
  `
})
export class ParentComponent {
  userData = { count: 0 };
  userItems = ['A', 'B', 'C'];

  updateData(): void {
    // Create new reference (OnPush will detect)
    this.userData = { count: this.userData.count + 1 };

    // Create new array reference
    this.userItems = [...this.userItems, 'D'];
  }
}
```

**4. Lazy Loading and Code Splitting:**

```typescript
// app-routing.module.ts
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  // Lazy load feature module
  {
    path: 'users',
    loadChildren: () => import('./users/users.module')
      .then(m => m.UsersModule)
  },

  // Lazy load with preloading strategy
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module')
      .then(m => m.AdminModule),
    canLoad: [AuthGuard],  // Guard before loading
    data: { preload: true }
  },

  // Lazy load standalone component (Angular 14+)
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component')
      .then(m => m.DashboardComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: CustomPreloadingStrategy  // Custom preloading
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

**Custom Preloading Strategy:**

```typescript
import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CustomPreloadingStrategy implements PreloadingStrategy {

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    // Preload if route data says so
    if (route.data && route.data['preload']) {
      console.log('Preloading:', route.path);

      // Delay preloading by 2 seconds
      return timer(2000).pipe(
        mergeMap(() => load())
      );
    }

    return of(null);
  }
}
```

**5. Route Guards and Resolvers:**

```typescript
// Auth Guard - prevent unauthorized access
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.authService.isLoggedIn$.pipe(
      map(isLoggedIn => {
        if (isLoggedIn) {
          return true;
        }

        // Redirect to login
        return this.router.createUrlTree(['/login'], {
          queryParams: { returnUrl: state.url }
        });
      })
    );
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.canActivate(childRoute, state);
  }
}

// Role Guard - check user permissions
@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const requiredRoles = route.data['roles'] as string[];

    return this.authService.currentUser$.pipe(
      map(user => {
        if (!user) return false;

        return requiredRoles.some(role => user.roles.includes(role));
      })
    );
  }
}

// CanDeactivate Guard - warn before leaving unsaved changes
export interface CanComponentDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable({ providedIn: 'root' })
export class UnsavedChangesGuard implements CanDeactivate<CanComponentDeactivate> {

  canDeactivate(
    component: CanComponentDeactivate
  ): boolean | Observable<boolean> {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}

// Component implementing CanComponentDeactivate
@Component({
  selector: 'app-edit-form',
  template: `
    <form [formGroup]="form">
      <!-- form fields -->
    </form>
  `
})
export class EditFormComponent implements CanComponentDeactivate {
  form!: FormGroup;

  canDeactivate(): boolean {
    if (this.form.dirty) {
      return confirm('You have unsaved changes. Do you want to leave?');
    }
    return true;
  }
}

// Resolver - preload data before route activation
@Injectable({ providedIn: 'root' })
export class UserResolver implements Resolve<User> {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    const id = Number(route.paramMap.get('id'));

    return this.userService.getUserById(id).pipe(
      catchError(error => {
        console.error('Error loading user:', error);
        this.router.navigate(['/users']);
        return EMPTY;
      })
    );
  }
}

// Using guards and resolvers in routes
const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'edit/:id',
    component: EditFormComponent,
    canDeactivate: [UnsavedChangesGuard]
  },
  {
    path: 'user/:id',
    component: UserDetailComponent,
    resolve: { user: UserResolver }  // Preload data
  }
];

// Access resolved data in component
@Component({
  selector: 'app-user-detail',
  template: `<h2>{{ user.name }}</h2>`
})
export class UserDetailComponent implements OnInit {
  user!: User;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Get resolved data
    this.user = this.route.snapshot.data['user'];

    // Or subscribe to changes
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
  }
}
```

**6. HTTP Interceptors:**

```typescript
// auth.interceptor.ts - add auth token
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    // Clone request and add authorization header
    const authToken = this.authService.getToken();

    if (authToken) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`)
      });
      return next.handle(authReq);
    }

    return next.handle(req);
  }
}

// error.interceptor.ts - handle errors globally
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private notificationService: NotificationService
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An error occurred';

        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = error.error.message;
        } else {
          // Server-side error
          switch (error.status) {
            case 401:
              this.router.navigate(['/login']);
              errorMessage = 'Unauthorized';
              break;
            case 403:
              errorMessage = 'Access denied';
              break;
            case 404:
              errorMessage = 'Resource not found';
              break;
            case 500:
              errorMessage = 'Server error';
              break;
            default:
              errorMessage = `Error: ${error.message}`;
          }
        }

        this.notificationService.showError(errorMessage);
        return throwError(() => error);
      })
    );
  }
}

// loading.interceptor.ts - show loading indicator
@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    this.loadingService.show();

    return next.handle(req).pipe(
      finalize(() => this.loadingService.hide())
    );
  }
}

// cache.interceptor.ts - cache GET requests
@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private cache = new Map<string, HttpResponse<any>>();

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    // Only cache GET requests
    if (req.method !== 'GET') {
      return next.handle(req);
    }

    // Check cache
    const cachedResponse = this.cache.get(req.url);
    if (cachedResponse) {
      return of(cachedResponse);
    }

    // Make request and cache response
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.cache.set(req.url, event);
        }
      })
    );
  }
}

// Register interceptors in app.module.ts
@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true }
  ]
})
export class AppModule { }
```

**7. Content Projection and ng-content:**

```typescript
// card.component.ts
@Component({
  selector: 'app-card',
  template: `
    <div class="card">
      <div class="card-header">
        <ng-content select="[header]"></ng-content>
      </div>
      <div class="card-body">
        <ng-content></ng-content>
      </div>
      <div class="card-footer">
        <ng-content select="[footer]"></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .card { border: 1px solid #ccc; border-radius: 4px; }
    .card-header { background: #f5f5f5; padding: 10px; }
    .card-body { padding: 15px; }
    .card-footer { background: #f5f5f5; padding: 10px; }
  `]
})
export class CardComponent { }

// Usage:
@Component({
  selector: 'app-demo',
  template: `
    <app-card>
      <h2 header>Card Title</h2>
      <p>This is the card content</p>
      <button footer>Action</button>
    </app-card>
  `
})
export class DemoComponent { }
```

**Key Advanced Concepts:**

✅ **RxJS Mastery**: Operators, higher-order observables, state management
✅ **NgRx**: Actions, reducers, selectors, effects for complex state
✅ **Change Detection**: OnPush strategy for performance
✅ **Lazy Loading**: Code splitting and preloading strategies
✅ **Guards**: CanActivate, CanDeactivate, CanLoad, route protection
✅ **Resolvers**: Preload data before route activation
✅ **Interceptors**: Global HTTP request/response handling
✅ **Content Projection**: Reusable component templates

