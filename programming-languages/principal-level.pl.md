# Języki Programowania - Pytania Poziom Principal

## 1. Design a Programming Language Feature

**Pytanie**: Design a new concurrency primitive for a programming language. Justify design decisions.

**Odpowiedź**:

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

**C# Implementation Example:**

C# actually has structured concurrency patterns through proper use of CancellationToken and task hierarchies:

```csharp
using System;
using System.Threading;
using System.Threading.Tasks;

// Structured concurrency pattern
public async Task<Result> StructuredConcurrentOperation(CancellationToken ct)
{
    // Create linked token source for automatic cancellation
    using var cts = CancellationTokenSource.CreateLinkedTokenSource(ct);

    try
    {
        // All tasks share cancellation token
        var task1 = DoWork1Async(cts.Token);
        var task2 = DoWork2Async(cts.Token);
        var task3 = DoWork3Async(cts.Token);

        // Wait for all (any exception cancels all)
        await Task.WhenAll(task1, task2, task3);

        return new Result
        {
            Result1 = await task1,
            Result2 = await task2,
            Result3 = await task3
        };
    }
    catch
    {
        // Cancel all remaining tasks
        cts.Cancel();
        throw;
    }
    // All tasks guaranteed completed or cancelled when exiting scope
}

// Parent-child task relationships
public async Task ParentTask()
{
    await Task.Run(async () =>
    {
        // Child tasks attached to parent
        var child1 = Task.Factory.StartNew(() => Work1(),
            TaskCreationOptions.AttachedToParent);

        var child2 = Task.Factory.StartNew(() => Work2(),
            TaskCreationOptions.AttachedToParent);

        // Parent won't complete until all children complete
    });
}
```

---

## 2. C# Compiler Design and Roslyn APIs

**Pytanie**: How would you design a code analyzer or refactoring tool? Explain the Roslyn compiler pipeline.

**Odpowiedź**:

**Roslyn Compiler Pipeline:**

```
Source Code → Lexical Analysis → Syntax Analysis → Semantic Analysis → Emit
              (Tokens)          (Syntax Tree)   (Symbols/Types)    (IL/Metadata)
```

**Working with Roslyn APIs:**

```csharp
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;

// Parse code into syntax tree
string code = @"
    public class Calculator
    {
        public int Add(int a, int b)
        {
            return a + b;
        }
    }";

SyntaxTree tree = CSharpSyntaxTree.ParseText(code);
CompilationUnitSyntax root = tree.GetCompilationUnitRoot();

// Traverse syntax tree
var methods = root.DescendantNodes()
    .OfType<MethodDeclarationSyntax>();

foreach (var method in methods)
{
    Console.WriteLine($"Method: {method.Identifier}");
}

// Custom analyzer
public class NamingAnalyzer : DiagnosticAnalyzer
{
    private static readonly DiagnosticDescriptor Rule = new DiagnosticDescriptor(
        id: "NA001",
        title: "Method names should be PascalCase",
        messageFormat: "Method '{0}' should be PascalCase",
        category: "Naming",
        defaultSeverity: DiagnosticSeverity.Warning,
        isEnabledByDefault: true);

    public override ImmutableArray<DiagnosticDescriptor> SupportedDiagnostics
        => ImmutableArray.Create(Rule);

    public override void Initialize(AnalysisContext context)
    {
        context.RegisterSyntaxNodeAction(AnalyzeMethod, SyntaxKind.MethodDeclaration);
    }

    private void AnalyzeMethod(SyntaxNodeAnalysisContext context)
    {
        var method = (MethodDeclarationSyntax)context.Node;
        string name = method.Identifier.Text;

        if (!IsPascalCase(name))
        {
            var diagnostic = Diagnostic.Create(Rule, method.Identifier.GetLocation(), name);
            context.ReportDiagnostic(diagnostic);
        }
    }
}

// Code fix provider
public class NamingCodeFixProvider : CodeFixProvider
{
    public override async Task RegisterCodeFixesAsync(CodeFixContext context)
    {
        var root = await context.Document.GetSyntaxRootAsync(context.CancellationToken);
        var diagnostic = context.Diagnostics.First();
        var diagnosticSpan = diagnostic.Location.SourceSpan;

        var method = root.FindToken(diagnosticSpan.Start)
            .Parent.AncestorsAndSelf()
            .OfType<MethodDeclarationSyntax>()
            .First();

        context.RegisterCodeFix(
            CodeAction.Create(
                title: "Convert to PascalCase",
                createChangedDocument: c => ConvertToPascalCaseAsync(context.Document, method, c),
                equivalenceKey: "ConvertToPascalCase"),
            diagnostic);
    }
}

// Source generator
[Generator]
public class AutoNotifyGenerator : ISourceGenerator
{
    public void Execute(GeneratorExecutionContext context)
    {
        // Find all classes with [AutoNotify] attribute
        var receiver = (SyntaxReceiver)context.SyntaxReceiver;

        foreach (var candidateClass in receiver.CandidateClasses)
        {
            // Get semantic model
            var model = context.Compilation.GetSemanticModel(candidateClass.SyntaxTree);
            var classSymbol = model.GetDeclaredSymbol(candidateClass);

            // Generate INotifyPropertyChanged implementation
            string source = GeneratePropertyChanged(classSymbol);

            context.AddSource($"{classSymbol.Name}_AutoNotify.g.cs", source);
        }
    }

    private string GeneratePropertyChanged(INamedTypeSymbol classSymbol)
    {
        // Generate boilerplate code at compile time
        return $@"
            public partial class {classSymbol.Name} : INotifyPropertyChanged
            {{
                public event PropertyChangedEventHandler PropertyChanged;

                protected void OnPropertyChanged(string propertyName)
                {{
                    PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
                }}
            }}";
    }
}
```

**Design Decisions for Analyzer:**

1. **Performance**: Use incremental analysis, cache results
2. **Accuracy**: Use semantic model for type information, not just syntax
3. **Usability**: Provide clear diagnostics with fix suggestions
4. **Extensibility**: Plugin architecture for custom rules

---

## 3. Advanced C# Performance Optimization

**Pytanie**: Design a high-performance serialization library in C#. What techniques would you use?

**Odpowiedź**:

**Performance Techniques:**

```csharp
using System;
using System.Buffers;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;

// 1. Span<T> and Memory<T> for zero-allocation slicing
public class FastSerializer
{
    public void Serialize<T>(T value, Span<byte> buffer) where T : struct
    {
        // Zero-copy serialization
        MemoryMarshal.Write(buffer, ref value);
    }

    public T Deserialize<T>(ReadOnlySpan<byte> buffer) where T : struct
    {
        return MemoryMarshal.Read<T>(buffer);
    }
}

// 2. ArrayPool for buffer reuse
public class BufferManager
{
    private readonly ArrayPool<byte> pool = ArrayPool<byte>.Shared;

    public byte[] RentBuffer(int size)
    {
        return pool.Rent(size);
    }

    public void ReturnBuffer(byte[] buffer)
    {
        pool.Return(buffer);
    }
}

// 3. ref struct for stack-only types (no GC)
public ref struct StackOnlyBuffer
{
    private Span<byte> buffer;

    public StackOnlyBuffer(Span<byte> buffer)
    {
        this.buffer = buffer;
    }

    // Cannot be boxed, cannot be on heap
    // Compiler enforces stack-only semantics
}

// 4. Aggressive inlining
[MethodImpl(MethodImplOptions.AggressiveInlining)]
public int FastAdd(int a, int b) => a + b;

// 5. SIMD vectorization
using System.Numerics;

public void VectorizedSum(float[] data)
{
    var vectorSize = Vector<float>.Count;
    var sum = Vector<float>.Zero;

    int i = 0;
    for (; i <= data.Length - vectorSize; i += vectorSize)
    {
        var vector = new Vector<float>(data, i);
        sum += vector;
    }

    // Handle remainder
    float result = Vector.Dot(sum, Vector<float>.One);
    for (; i < data.Length; i++)
    {
        result += data[i];
    }
}

// 6. Custom memory management with unmanaged allocations
public unsafe class UnmanagedBuffer : IDisposable
{
    private byte* ptr;
    private int size;

    public UnmanagedBuffer(int size)
    {
        this.size = size;
        ptr = (byte*)Marshal.AllocHGlobal(size);
    }

    public Span<byte> AsSpan() => new Span<byte>(ptr, size);

    public void Dispose()
    {
        if (ptr != null)
        {
            Marshal.FreeHGlobal((IntPtr)ptr);
            ptr = null;
        }
    }
}

// 7. Source generators for zero-overhead serialization
[Generator]
public class SerializationGenerator : ISourceGenerator
{
    public void Execute(GeneratorExecutionContext context)
    {
        // Generate optimal serialization code at compile time
        // No reflection, no dynamic dispatch
        // Direct field access with optimal layout
    }
}

// 8. Interop with native code for critical paths
[DllImport("native.dll")]
private static extern void OptimizedNativeOperation(IntPtr data, int size);

// 9. Readonly structs to enable compiler optimizations
public readonly struct Point3D
{
    public readonly float X, Y, Z;

    public Point3D(float x, float y, float z)
    {
        X = x; Y = y; Z = z;
    }

    // Compiler can optimize copies away in many cases
}

// 10. Benchmark-driven optimization
[Benchmark]
public void SerializeWithReflection() { /* slower */ }

[Benchmark]
public void SerializeWithSourceGen() { /* faster */ }
```

**Architecture Decisions:**

| Technique | Benefit | Trade-off |
|-----------|---------|-----------|
| Span<T> | Zero-copy | Stack-only limitation |
| ArrayPool | Reduced GC | Manual return required |
| Source Generators | Zero runtime cost | Compile-time complexity |
| SIMD | 4-8x throughput | Platform-specific |
| Unsafe code | Maximum performance | Memory safety risk |

**Benchmark Results (hypothetical):**

```
| Method              | Mean      | Allocated |
|---------------------|-----------|-----------|
| Reflection          | 1,000 ns  | 512 B     |
| Expression Trees    | 200 ns    | 128 B     |
| Source Generator    | 50 ns     | 0 B       |
| Unsafe/SIMD         | 10 ns     | 0 B       |
```

---

## 4. Language Evolution and Breaking Changes

**Pytanie**: You're designing C# 13. Propose a new feature. How would you ensure backward compatibility?

**Odpowiedź**:

**Proposed Feature: First-class Discriminated Unions**

```csharp
// New syntax proposal
public union Result<T>
{
    case Success(T Value);
    case Error(string Message, int Code);
    case Cancelled;
}

// Exhaustive pattern matching (compiler-enforced)
public string Handle(Result<int> result)
{
    return result match // New 'match' keyword
    {
        Success(var value) => $"Got {value}",
        Error(var msg, var code) => $"Error {code}: {msg}",
        Cancelled => "Operation cancelled"
        // Compiler error if any case is missing!
    };
}

// Backward compatibility strategy:
// 1. Compile to abstract class + nested records (existing syntax)
// 2. Emit [Union] attribute for tooling
// 3. Works with older compilers (graceful degradation)

// Generated code (what older compilers see):
[Union] // Marker attribute
public abstract record Result<T>
{
    private Result() { } // Sealed hierarchy

    public sealed record Success(T Value) : Result<T>;
    public sealed record Error(string Message, int Code) : Result<T>;
    public sealed record Cancelled : Result<T>;
}
```

**Compatibility Analysis:**

1. **Source compatibility**: Old code compiles unchanged
2. **Binary compatibility**: New assemblies work with old runtimes
3. **Behavioral compatibility**: Semantics unchanged
4. **Migration path**: Gradual adoption with attributes

**Implementation Phases:**

```
Phase 1: Analyzer & CodeFix
  - Suggest union syntax for existing patterns
  - Preview feature flag

Phase 2: Compiler Support
  - Full syntax support
  - Exhaustiveness checking
  - Optimization opportunities

Phase 3: Runtime Optimization
  - Specialized IL opcodes (future .NET)
  - JIT optimizations for union types
```

**Breaking Change Assessment:**

| Risk Level | Mitigation |
|------------|------------|
| Syntax conflicts | Use contextual keyword 'union' |
| Existing 'union' identifiers | Show warning, provide automated fix |
| Performance regression | Ensure generated code is optimal |
| Tooling compatibility | Update analyzers, formatters, etc. |

---

## 5. Cross-Language Interop Architecture

**Pytanie**: Design a system for seamless C#/JavaScript interop. How would you handle type safety and performance?

**Odpowiedź**:

**Architecture:**

```csharp
// C# side - Source generator creates JS bindings
[JSExport]
public class Calculator
{
    [JSExport]
    public int Add(int a, int b) => a + b;

    [JSExport]
    public async Task<string> FetchDataAsync(string url)
    {
        // C# async/await
        return await httpClient.GetStringAsync(url);
    }
}

// Generated JavaScript binding (TypeScript)
interface Calculator {
    add(a: number, b: number): number;
    fetchDataAsync(url: string): Promise<string>;
}

const calc = DotNet.import<Calculator>("MyApp.Calculator");
const result = await calc.add(5, 3);
const data = await calc.fetchDataAsync("https://api.example.com");

// Type mapping strategy
C# Type          <->  JavaScript Type
int, long, etc   <->  number
string           <->  string
bool             <->  boolean
T[]              <->  Array<T>
Task<T>          <->  Promise<T>
Action<T>        <->  (arg: T) => void
Func<T, R>       <->  (arg: T) => R

// Performance optimizations:
// 1. Shared memory for large data (WebAssembly)
[JSExport]
public unsafe Span<byte> GetSharedBuffer()
{
    return new Span<byte>(nativePtr, size);
}

// JavaScript side - zero-copy access
const buffer = dotnet.getSharedBuffer();
const view = new Uint8Array(buffer);

// 2. Marshaling-free calls for primitives
[JSExport]
[MethodImpl(MethodImplOptions.AggressiveInlining)]
public int FastOperation(int x) => x * 2;
// Compiled to direct WASM call, no marshaling

// 3. Batch operations to reduce roundtrips
[JSExport]
public int[] ProcessBatch(int[] inputs)
{
    return inputs.Select(x => x * 2).ToArray();
}

// 4. Streaming for large datasets
[JSExport]
public async IAsyncEnumerable<Item> StreamItemsAsync()
{
    await foreach (var item in GetItemsFromDbAsync())
    {
        yield return item;
    }
}

// JavaScript consumption
for await (const item of dotnet.streamItemsAsync()) {
    console.log(item);
}
```

**Error Handling:**

```csharp
// C# exceptions map to JS promise rejections
[JSExport]
public async Task<Result> OperationAsync()
{
    try
    {
        return await DoWorkAsync();
    }
    catch (Exception ex)
    {
        throw new JSException(ex.Message, ex);
    }
}

// JavaScript
try {
    await dotnet.operationAsync();
} catch (error) {
    console.error(error.message);
}
```

**Design Decisions:**

1. **Type Safety**: Generate TypeScript definitions from C# types
2. **Performance**: Use shared memory + minimal marshaling
3. **Async**: Map Task<T> to Promise<T> naturally
4. **Tooling**: Source generators for zero-config setup
5. **Debugging**: Source maps for cross-language debugging

---

## 5. Angular Enterprise Architecture and Scalability

**Pytanie**: Design a scalable Angular architecture for large enterprise applications. Discuss monorepo strategies, micro-frontends, module federation, performance optimization at scale, and testing strategies.

**Odpowiedź**:

**1. Monorepo Architecture with Nx:**

```bash
# Nx workspace structure
my-enterprise-app/
├── apps/
│   ├── web-app/                 # Main application
│   ├── admin-portal/            # Admin application
│   ├── mobile-app/              # Mobile app (Ionic/Capacitor)
│   └── web-app-e2e/            # E2E tests
├── libs/
│   ├── shared/
│   │   ├── ui/                  # Shared UI components
│   │   ├── data-access/         # API services
│   │   ├── utils/               # Utilities
│   │   └── models/              # TypeScript interfaces
│   ├── feature-auth/            # Authentication feature
│   ├── feature-users/           # Users feature
│   ├── feature-products/        # Products feature
│   └── feature-orders/          # Orders feature
├── tools/                       # Custom build tools
├── nx.json                      # Nx configuration
├── angular.json                 # Angular CLI config
└── tsconfig.base.json          # Base TypeScript config
```

**Nx Library Configuration:**

```json
// nx.json
{
  "affected": {
    "defaultBase": "main"
  },
  "tasksRunnerOptions": {
    "default": {
      "runner": "@nrwl/nx-cloud",
      "options": {
        "cacheableOperations": ["build", "lint", "test", "e2e"],
        "accessToken": "YOUR_TOKEN"
      }
    }
  },
  "targetDefaults": {
    "build": {
      "dependsOn": ["^build"],
      "inputs": ["production", "^production"]
    }
  }
}
```

```typescript
// libs/shared/data-access/src/lib/base-api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';

@Injectable()
export abstract class BaseApiService<T> {
  protected abstract get resourcePath(): string;

  constructor(
    protected http: HttpClient,
    protected baseUrl: string
  ) { }

  getAll(params?: any): Observable<T[]> {
    const httpParams = this.buildParams(params);
    return this.http.get<T[]>(`${this.baseUrl}/${this.resourcePath}`, { params: httpParams })
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getById(id: string | number): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${this.resourcePath}/${id}`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  create(item: T): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${this.resourcePath}`, item);
  }

  update(id: string | number, item: Partial<T>): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${this.resourcePath}/${id}`, item);
  }

  delete(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${this.resourcePath}/${id}`);
  }

  protected buildParams(params?: any): HttpParams {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }
    return httpParams;
  }

  protected abstract handleError(error: any): Observable<never>;
}

// Feature-specific service extends base
@Injectable({ providedIn: 'root' })
export class UserApiService extends BaseApiService<User> {
  protected get resourcePath(): string {
    return 'users';
  }

  constructor(http: HttpClient, @Inject('API_BASE_URL') baseUrl: string) {
    super(http, baseUrl);
  }

  protected handleError(error: any): Observable<never> {
    console.error('User API error:', error);
    return throwError(() => error);
  }

  // Domain-specific methods
  getUsersByRole(role: string): Observable<User[]> {
    return this.getAll({ role });
  }
}
```

**2. Micro-Frontends with Module Federation:**

```javascript
// webpack.config.js for Host Application
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const mf = require('@angular-architects/module-federation/webpack');
const path = require('path');

module.exports = {
  output: {
    uniqueName: 'host',
    publicPath: 'auto'
  },
  optimization: {
    runtimeChunk: false
  },
  resolve: {
    alias: {
      ...sh areAll([
        '@angular/core',
        '@angular/common',
        '@angular/router',
        '@ngrx/store'
      ])
    }
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      filename: 'remoteEntry.js',
      remotes: {
        'mfe1': 'mfe1@http://localhost:4201/remoteEntry.js',
        'mfe2': 'mfe2@http://localhost:4202/remoteEntry.js',
      },
      shared: share({
        '@angular/core': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        '@angular/common': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        '@angular/router': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        '@ngrx/store': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        'rxjs': { singleton: true, strictVersion: false, requiredVersion: 'auto' }
      })
    }),
    new mf.ShareMappingsPlugin()
  ]
};
```

```typescript
// Dynamic Module Loading
// app-routing.module.ts (Host)
import { loadRemoteModule } from '@angular-architects/module-federation';

const routes: Routes = [
  {
    path: 'mfe1',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './Module'
      }).then(m => m.Mfe1Module)
  },
  {
    path: 'mfe2',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4202/remoteEntry.js',
        exposedModule: './Module'
      }).then(m => m.Mfe2Module)
  }
];

// Dynamic Remote Configuration
@Injectable({ providedIn: 'root' })
export class MicroFrontendService {
  private remotes$ = new BehaviorSubject<RemoteConfig[]>([]);

  constructor(private http: HttpClient) {
    this.loadRemoteConfig();
  }

  private loadRemoteConfig(): void {
    // Load remote configuration from API
    this.http.get<RemoteConfig[]>('/api/mfe-config').pipe(
      tap(remotes => {
        // Dynamically set up Module Federation remotes
        remotes.forEach(remote => {
          this.registerRemote(remote);
        });
        this.remotes$.next(remotes);
      })
    ).subscribe();
  }

  private registerRemote(config: RemoteConfig): void {
    const remoteEntry = `${config.url}/remoteEntry.js`;
    // Dynamic registration logic
  }

  getRemotes(): Observable<RemoteConfig[]> {
    return this.remotes$.asObservable();
  }
}
```

**3. Custom Schematics and Code Generation:**

```typescript
// tools/schematics/feature/index.ts
import { Rule, SchematicContext, Tree, apply, template, url, mergeWith, move } from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';

interface FeatureOptions {
  name: string;
  path: string;
  project: string;
}

export function feature(options: FeatureOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const templateSource = apply(url('./files'), [
      template({
        ...strings,
        ...options,
        // Custom template variables
        dasherize: strings.dasherize,
        classify: strings.classify
      }),
      move(options.path)
    ]);

    return mergeWith(templateSource)(tree, context);
  };
}

// Generated structure:
// libs/feature-{{name}}/
// ├── src/
// │   ├── lib/
// │   │   ├── {{name}}.module.ts
// │   │   ├── state/
// │   │   │   ├── {{name}}.actions.ts
// │   │   │   ├── {{name}}.reducer.ts
// │   │   │   ├── {{name}}.effects.ts
// │   │   │   └── {{name}}.selectors.ts
// │   │   ├── services/
// │   │   │   └── {{name}}.service.ts
// │   │   └── components/
// │   │       └── {{name}}-list/
// │   │           ├── {{name}}-list.component.ts
// │   │           ├── {{name}}-list.component.html
// │   │           └── {{name}}-list.component.spec.ts
// │   └── index.ts
// └── README.md
```

**4. Performance Optimization at Scale:**

**Build Optimization:**

```json
// angular.json - Production Configuration
{
  "configurations": {
    "production": {
      "optimization": {
        "scripts": true,
        "styles": {
          "minify": true,
          "inlineCritical": true
        },
        "fonts": true
      },
      "outputHashing": "all",
      "sourceMap": false,
      "namedChunks": false,
      "aot": true,
      "extractLicenses": true,
      "vendorChunk": false,
      "buildOptimizer": true,
      "budgets": [
        {
          "type": "initial",
          "maximumWarning": "500kb",
          "maximumError": "1mb"
        },
        {
          "type": "anyComponentStyle",
          "maximumWarning": "2kb",
          "maximumError": "4kb"
        }
      ]
    }
  }
}
```

**Runtime Performance Monitoring:**

```typescript
// performance.service.ts
@Injectable({ providedIn: 'root' })
export class PerformanceService {
  private metrics = new Map<string, PerformanceMetric>();

  measureComponentLoad(componentName: string): void {
    const mark = `${componentName}-start`;
    performance.mark(mark);
  }

  endComponentLoad(componentName: string): void {
    const startMark = `${componentName}-start`;
    const endMark = `${componentName}-end`;
    const measureName = `${componentName}-load`;

    performance.mark(endMark);
    performance.measure(measureName, startMark, endMark);

    const measure = performance.getEntriesByName(measureName)[0];
    this.metrics.set(componentName, {
      name: componentName,
      duration: measure.duration,
      timestamp: Date.now()
    });

    // Send to analytics
    this.reportMetric(componentName, measure.duration);
  }

  private reportMetric(name: string, duration: number): void {
    // Send to analytics service
    if (duration > 1000) {
      console.warn(`Slow component load: ${name} took ${duration}ms`);
    }
  }
}

// Usage in component
@Component({
  selector: 'app-heavy-component',
  template: `...`
})
export class HeavyComponent implements OnInit, AfterViewInit {
  constructor(private perf: PerformanceService) {
    this.perf.measureComponentLoad('HeavyComponent');
  }

  ngAfterViewInit(): void {
    this.perf.endComponentLoad('HeavyComponent');
  }
}
```

**Virtual Scrolling for Large Lists:**

```typescript
@Component({
  selector: 'app-virtual-list',
  template: `
    <cdk-virtual-scroll-viewport
      [itemSize]="50"
      class="viewport"
      [minBufferPx]="200"
      [maxBufferPx]="400">

      <div *cdkVirtualFor="let item of items$ | async; let i = index"
           class="list-item">
        <app-list-item [item]="item" [index]="i"></app-list-item>
      </div>

    </cdk-virtual-scroll-viewport>
  `,
  styles: [`
    .viewport {
      height: 600px;
      overflow: auto;
    }
    .list-item {
      height: 50px;
    }
  `]
})
export class VirtualListComponent {
  items$ = this.store.select(selectLargeDataset); // 10,000+ items

  constructor(private store: Store) { }
}
```

**5. Comprehensive Testing Strategy:**

**Unit Testing with Jest:**

```typescript
// user.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserService,
        { provide: 'API_BASE_URL', useValue: 'http://api.test' }
      ]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch users', () => {
    const mockUsers = [
      { id: 1, name: 'User 1' },
      { id: 2, name: 'User 2' }
    ];

    service.getAll().subscribe(users => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne('http://api.test/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should handle errors', () => {
    service.getById(1).subscribe({
      next: () => fail('should have failed'),
      error: (error) => {
        expect(error.status).toBe(404);
      }
    });

    const req = httpMock.expectOne('http://api.test/users/1');
    req.flush('Not found', { status: 404, statusText: 'Not Found' });
  });
});
```

**Component Testing:**

```typescript
// user-list.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { UserListComponent } from './user-list.component';
import * as UserActions from '../state/user.actions';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let store: MockStore;

  const initialState = {
    users: {
      users: [],
      loading: false,
      error: null
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListComponent],
      providers: [
        provideMockStore({ initialState })
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
  });

  it('should dispatch loadUsers on init', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    fixture.detectChanges();

    expect(dispatchSpy).toHaveBeenCalledWith(UserActions.loadUsers());
  });

  it('should display users', () => {
    store.setState({
      users: {
        users: [
          { id: 1, name: 'User 1', email: 'user1@test.com' },
          { id: 2, name: 'User 2', email: 'user2@test.com' }
        ],
        loading: false,
        error: null
      }
    });

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const userItems = compiled.querySelectorAll('.user-item');

    expect(userItems.length).toBe(2);
    expect(userItems[0].textContent).toContain('User 1');
    expect(userItems[1].textContent).toContain('User 2');
  });
});
```

**E2E Testing with Cypress:**

```typescript
// cypress/e2e/user-management.cy.ts
describe('User Management', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/users', {
      fixture: 'users.json'
    }).as('getUsers');

    cy.visit('/users');
    cy.wait('@getUsers');
  });

  it('should display user list', () => {
    cy.get('[data-cy=user-list]').should('exist');
    cy.get('[data-cy=user-item]').should('have.length', 3);
  });

  it('should create new user', () => {
    cy.intercept('POST', '/api/users', {
      statusCode: 201,
      body: { id: 4, name: 'New User', email: 'new@test.com' }
    }).as('createUser');

    cy.get('[data-cy=add-user-btn]').click();
    cy.get('[data-cy=name-input]').type('New User');
    cy.get('[data-cy=email-input]').type('new@test.com');
    cy.get('[data-cy=submit-btn]').click();

    cy.wait('@createUser');
    cy.get('[data-cy=success-message]').should('be.visible');
  });

  it('should handle errors gracefully', () => {
    cy.intercept('POST', '/api/users', {
      statusCode: 400,
      body: { message: 'Email already exists' }
    }).as('createUserError');

    cy.get('[data-cy=add-user-btn]').click();
    cy.get('[data-cy=name-input]').type('Duplicate User');
    cy.get('[data-cy=email-input]').type('existing@test.com');
    cy.get('[data-cy=submit-btn]').click();

    cy.wait('@createUserError');
    cy.get('[data-cy=error-message]')
      .should('be.visible')
      .and('contain', 'Email already exists');
  });
});
```

**6. State Management Architecture:**

```typescript
// Facade Pattern for State Management
@Injectable({ providedIn: 'root' })
export class UserFacade {
  // Selectors
  users$ = this.store.select(selectAllUsers);
  loading$ = this.store.select(selectUsersLoading);
  error$ = this.store.select(selectUsersError);
  selectedUser$ = this.store.select(selectSelectedUser);

  // Derived state
  activeUsers$ = this.store.select(selectActiveUsers);
  userCount$ = this.users$.pipe(map(users => users.length));

  constructor(private store: Store) { }

  // Actions
  loadUsers(): void {
    this.store.dispatch(UserActions.loadUsers());
  }

  selectUser(id: number): void {
    this.store.dispatch(UserActions.selectUser({ id }));
  }

  createUser(user: User): void {
    this.store.dispatch(UserActions.createUser({ user }));
  }

  updateUser(id: number, changes: Partial<User>): void {
    this.store.dispatch(UserActions.updateUser({ id, changes }));
  }

  deleteUser(id: number): void {
    this.store.dispatch(UserActions.deleteUser({ id }));
  }

  // Complex operations
  bulkDeleteUsers(ids: number[]): void {
    this.store.dispatch(UserActions.bulkDeleteUsers({ ids }));
  }

  exportUsers(format: 'csv' | 'json'): void {
    this.users$.pipe(
      take(1),
      tap(users => this.performExport(users, format))
    ).subscribe();
  }

  private performExport(users: User[], format: string): void {
    // Export logic
  }
}

// Component uses facade instead of direct store access
@Component({
  selector: 'app-user-management',
  template: `
    <div *ngIf="loading$ | async">Loading...</div>
    <div *ngIf="error$ | async as error">{{ error }}</div>

    <p>Total Users: {{ userCount$ | async }}</p>

    <app-user-list
      [users]="users$ | async"
      (userSelected)="onUserSelected($event)"
      (userDeleted)="onUserDeleted($event)">
    </app-user-list>
  `
})
export class UserManagementComponent implements OnInit {
  users$ = this.userFacade.users$;
  loading$ = this.userFacade.loading$;
  error$ = this.userFacade.error$;
  userCount$ = this.userFacade.userCount$;

  constructor(private userFacade: UserFacade) { }

  ngOnInit(): void {
    this.userFacade.loadUsers();
  }

  onUserSelected(id: number): void {
    this.userFacade.selectUser(id);
  }

  onUserDeleted(id: number): void {
    this.userFacade.deleteUser(id);
  }
}
```

**7. CI/CD Pipeline Configuration:**

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  affected:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - run: npm ci

      - name: Run affected tests
        run: npx nx affected:test --base=origin/main --parallel=3

      - name: Run affected lint
        run: npx nx affected:lint --base=origin/main --parallel=3

      - name: Build affected apps
        run: npx nx affected:build --base=origin/main --parallel=3 --configuration=production

      - name: Upload coverage
        uses: codecov/codecov-action@v3

  e2e:
    needs: affected
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - uses: actions/setup-node@v3
        with:
          node-version: '18'

      - run: npm ci

      - name: Run E2E tests
        run: npx nx affected:e2e --base=origin/main
```

**Key Enterprise Architecture Principles:**

✅ **Monorepo**: Nx workspace with shared libraries and consistent tooling
✅ **Micro-Frontends**: Module Federation for independent deployment
✅ **Code Generation**: Custom schematics for consistency
✅ **Performance**: Virtual scrolling, lazy loading, build optimization
✅ **Testing**: Comprehensive unit, integration, E2E testing
✅ **State Management**: Facade pattern with NgRx
✅ **CI/CD**: Automated testing and deployment with affected analysis

