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
