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

**Question**: How would you design a code analyzer or refactoring tool? Explain the Roslyn compiler pipeline.

**Answer**:

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

**Question**: Design a high-performance serialization library in C#. What techniques would you use?

**Answer**:

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

**Question**: You're designing C# 13. Propose a new feature. How would you ensure backward compatibility?

**Answer**:

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

**Question**: Design a system for seamless C#/JavaScript interop. How would you handle type safety and performance?

**Answer**:

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
