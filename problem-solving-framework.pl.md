# Problem-Solving Framework for Technical Interviews

## Overview

This guide provides a systematic approach to solving coding interview problems. Following a structured framework helps you:
- Stay organized under pressure
- Communicate your thought process clearly
- Avoid missing edge cases
- Write cleaner, more maintainable code
- Demonstrate professional problem-solving skills

## The UMPIRE Method

**UMPIRE** is an acronym for a comprehensive problem-solving framework:

- **U**nderstand
- **M**atch
- **P**lan
- **I**mplement
- **R**eview
- **E**valuate

### 1. Understand the Problem

**Goal**: Ensure you fully understand the requirements before writing code.

**Steps**:

1. **Restate the problem in your own words**
   - "So I need to find the shortest path between..."
   - "The task is to return all combinations where..."

2. **Clarify inputs and outputs**
   - What data types are the inputs?
   - What should be returned?
   - What should happen with invalid inputs?

3. **Ask clarifying questions**
   ```
   - "Can the array be empty?"
   - "Are the numbers always positive?"
   - "Should I consider duplicate values?"
   - "What's the expected size of the input?"
   - "Is the input sorted?"
   - "Are there memory constraints?"
   ```

4. **Work through examples**
   - Start with simple examples
   - Consider edge cases
   - Trace through the logic manually

5. **Identify constraints**
   - Time complexity expectations
   - Space complexity limitations
   - Input size ranges

**Example**:
```
Problem: Find two numbers in an array that add up to a target sum.

Questions to ask:
✓ Can there be duplicate numbers?
✓ Will there always be exactly one solution?
✓ Should I return indices or values?
✓ Can I use the same element twice?
✓ Is the array sorted?
✓ What if there's no solution?
✓ What's the expected array size?
```

### 2. Match to Patterns

**Goal**: Recognize common patterns and data structures that fit the problem.

**Common Patterns**:

#### Array/String Patterns
- **Two Pointers**: Sorted array, pairs with target sum, palindrome checking
- **Sliding Window**: Subarray/substring problems, fixed/variable window size
- **Fast & Slow Pointers**: Cycle detection, finding middle element

#### Data Structure Patterns
- **Hash Map**: Frequency counting, fast lookups, pairs/triplets
- **Stack**: Matching parentheses, next greater element, expression evaluation
- **Queue**: BFS, level-order traversal, sliding window maximum
- **Heap**: Top K elements, merge K sorted lists, median finding

#### Tree Patterns
- **DFS (Recursion)**: Path problems, tree traversal, validation
- **BFS (Queue)**: Level-order traversal, shortest path in tree
- **Binary Search Tree**: Search, insert, validate BST properties

#### Graph Patterns
- **DFS**: Connected components, cycle detection, topological sort
- **BFS**: Shortest path, level traversal
- **Union Find**: Connected components, cycle detection in undirected graphs

#### Dynamic Programming Patterns
- **Fibonacci Pattern**: Climbing stairs, decode ways
- **0/1 Knapsack**: Subset sum, equal partition
- **Unbounded Knapsack**: Coin change, rod cutting
- **LCS Pattern**: Longest common subsequence, edit distance

#### Algorithm Patterns
- **Binary Search**: Sorted array search, search in rotated array, find boundaries
- **Backtracking**: Permutations, combinations, N-Queens, Sudoku
- **Greedy**: Activity selection, jump game, gas station
- **Divide & Conquer**: Merge sort, quick sort, closest pair

**Pattern Matching Process**:
```
1. Identify the problem type
   → Array? String? Tree? Graph?

2. Look for keywords
   → "Shortest" → BFS, Dijkstra
   → "All combinations" → Backtracking
   → "Consecutive" → Sliding window
   → "Pairs that sum" → Two pointers or hash map
   → "K largest/smallest" → Heap
   → "Optimize" → Dynamic programming or greedy

3. Consider constraints
   → Sorted input → Binary search or two pointers
   → Need fast lookups → Hash map
   → Need ordered data → BST or heap
   → Need to track min/max → Stack or heap
```

### 3. Plan the Solution

**Goal**: Design your solution before coding.

**Steps**:

1. **Choose your approach**
   - Start with brute force (shows you understand the problem)
   - Identify optimizations

2. **Outline the algorithm**
   - Write pseudocode or high-level steps
   - Don't start coding immediately

3. **Analyze complexity**
   - Time complexity: O(?)
   - Space complexity: O(?)
   - Is this acceptable given the constraints?

4. **Consider edge cases**
   - Empty input
   - Single element
   - All elements the same
   - Maximum/minimum values
   - Invalid input

5. **Communicate your plan**
   - Talk through your approach
   - Ask if the interviewer agrees with the direction

**Example Plan**:
```
Problem: Two Sum

Brute Force Approach:
- Nested loops to check all pairs
- Time: O(n²), Space: O(1)
- Works but too slow for large inputs

Optimized Approach:
- Use hash map to store seen numbers
- For each number, check if (target - number) exists
- Time: O(n), Space: O(n)
- Trade space for time

Pseudocode:
1. Create empty hash map
2. For each number in array:
   a. Calculate complement = target - number
   b. If complement in hash map:
      - Return [hash_map[complement], current_index]
   c. Add number and index to hash map
3. Return empty if no solution

Edge cases:
- Empty array → return []
- Single element → return []
- Duplicate numbers → hash map stores latest index
- Same element twice → check if complement equals current number
```

### 4. Implement the Code

**Goal**: Write clean, working code.

**Best Practices**:

1. **Start with the structure**
   ```python
   def function_name(param1, param2):
       # Handle edge cases first

       # Initialize variables

       # Main logic

       # Return result
   ```

2. **Write readable code**
   - Use meaningful variable names
   - Add comments for complex logic
   - Keep functions focused and short

3. **Handle edge cases early**
   ```python
   if not array or len(array) == 0:
       return []
   ```

4. **Think out loud**
   - Explain what you're writing
   - If stuck, discuss alternatives

5. **Test as you go**
   - Don't wait until the end
   - Use simple examples to verify logic

**Example Implementation**:
```python
def two_sum(nums, target):
    """
    Find two numbers that add up to target.

    Args:
        nums: List of integers
        target: Target sum

    Returns:
        List of two indices, or empty list if no solution
    """
    # Edge case: empty or single element
    if not nums or len(nums) < 2:
        return []

    # Hash map to store number -> index mapping
    seen = {}

    # Iterate through array
    for i, num in enumerate(nums):
        complement = target - num

        # Check if complement exists
        if complement in seen:
            return [seen[complement], i]

        # Store current number
        seen[num] = i

    # No solution found
    return []
```

### 5. Review the Code

**Goal**: Catch bugs and improve code quality.

**Checklist**:

1. **Trace through with examples**
   - Use your original examples
   - Walk through line by line
   - Verify output is correct

2. **Check edge cases**
   - Run through edge cases mentally
   - Ensure they're handled properly

3. **Look for bugs**
   - Off-by-one errors
   - Null/None checks
   - Integer overflow
   - Index out of bounds

4. **Code quality**
   - Can any code be simplified?
   - Are variable names clear?
   - Is there duplicate logic?

5. **Ask for feedback**
   - "Does this make sense?"
   - "Is there anything you'd like me to clarify?"

**Common Bugs to Check**:
```python
# Off-by-one errors
for i in range(len(array) - 1):  # Missing last element?

# Integer division (Python 2 vs 3)
mid = (left + right) // 2  # Use // for integer division

# Modifying while iterating
for item in list:
    list.remove(item)  # Can cause issues

# Shallow vs deep copy
new_list = old_list  # Reference, not copy
new_list = old_list.copy()  # Shallow copy
new_list = copy.deepcopy(old_list)  # Deep copy

# String immutability
s = "hello"
s[0] = "H"  # Error in Python, strings are immutable
```

### 6. Evaluate Complexity

**Goal**: Analyze and communicate the efficiency of your solution.

**Time Complexity Analysis**:

```python
# O(1) - Constant
def get_first(array):
    return array[0]

# O(log n) - Logarithmic
def binary_search(array, target):
    left, right = 0, len(array) - 1
    while left <= right:
        mid = (left + right) // 2
        # ...

# O(n) - Linear
def find_max(array):
    max_val = array[0]
    for num in array:
        max_val = max(max_val, num)
    return max_val

# O(n log n) - Linearithmic
def merge_sort(array):
    # Divide and conquer with linear merge
    pass

# O(n²) - Quadratic
def bubble_sort(array):
    for i in range(len(array)):
        for j in range(len(array)):
            # Compare and swap

# O(2^n) - Exponential
def fibonacci_recursive(n):
    if n <= 1:
        return n
    return fibonacci_recursive(n-1) + fibonacci_recursive(n-2)

# O(n!) - Factorial
def permutations(array):
    # Generate all permutations
    pass
```

**Space Complexity Analysis**:

```python
# O(1) - Constant space
def swap(a, b):
    temp = a
    # Only a few variables

# O(n) - Linear space
def reverse_array(array):
    return array[::-1]  # Creates new array

# O(n) - Hash map
def two_sum(nums, target):
    seen = {}  # Can store up to n elements
    # ...

# O(log n) - Recursion stack
def binary_search_recursive(array, target, left, right):
    if left > right:
        return -1
    mid = (left + right) // 2
    # log n recursive calls

# O(n) - Recursion stack
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)  # n recursive calls
```

**Optimization Discussion**:
- "The current solution is O(n²). Can we do better?"
- "We're using O(n) extra space. Is there an in-place solution?"
- "This works for small inputs, but for n > 10⁶, we need a better approach"

## Interview Communication Tips

### 1. Think Out Loud
```
✓ "I'm thinking we could use a hash map here because..."
✓ "Let me consider the edge case where the array is empty..."
✓ "I notice the array is sorted, so binary search might work..."

✗ Silent coding for 5 minutes
✗ Jumping straight to code without explanation
```

### 2. Ask Questions
```
✓ "Should I optimize for time or space?"
✓ "Can I assume the input is valid?"
✓ "Would you like me to handle this edge case?"

✗ Making assumptions without clarifying
✗ Proceeding with unclear requirements
```

### 3. Handle Being Stuck
```
✓ "I'm thinking through two approaches. Let me outline both..."
✓ "This seems similar to problem X. Can I use that pattern?"
✓ "I'm stuck on this part. Can you give me a hint?"

✗ Sitting in silence when stuck
✗ Giving up immediately
```

### 4. Manage Time
```
✓ Start with brute force if pressed for time
✓ Mention optimizations even if you don't code them
✓ Prioritize working code over perfect code

✗ Spending 30 minutes on the perfect solution
✗ Over-engineering a simple problem
```

## Common Problem-Solving Strategies

### 1. Draw It Out
- Visualize the problem
- Draw arrays, trees, graphs
- Trace through examples visually

### 2. Simplify First
- Start with smallest valid input
- Solve for n=1, then n=2
- Find the pattern

### 3. Break It Down
- Solve subproblems first
- Build helper functions
- Combine solutions

### 4. Look for Patterns
- Similar to problems you've seen?
- Can you reuse known algorithms?
- What category does this fit?

### 5. Work Backwards
- Start from the desired output
- What would lead to this result?
- Trace backwards to input

### 6. Consider Trade-offs
- Time vs Space
- Readability vs Performance
- Simple vs Optimal

## Practice Checklist

Before the interview, practice:

- [ ] 5+ easy problems using UMPIRE method
- [ ] 10+ medium problems with optimization
- [ ] Explaining solutions out loud
- [ ] Writing code on whiteboard/paper
- [ ] Identifying patterns quickly
- [ ] Calculating time/space complexity
- [ ] Handling edge cases systematically
- [ ] Coding without IDE assistance

## Sample Problem Walkthrough

**Problem**: Given an array of integers, find the length of the longest consecutive sequence.

**Example**: `[100, 4, 200, 1, 3, 2]` → `4` (sequence: 1, 2, 3, 4)

### UMPIRE Application:

**U - Understand**
```
Input: Array of integers (can be unsorted, duplicates?)
Output: Integer (length of longest sequence)

Questions:
- Can array be empty? → Yes, return 0
- Duplicates? → Ignore them
- Negative numbers? → Yes, can have any integer
- Expected size? → Up to 10^5 elements

Example: [100, 4, 200, 1, 3, 2]
- Sequences: [100], [4, 3, 2, 1], [200]
- Longest: [1, 2, 3, 4] with length 4
```

**M - Match**
```
Pattern: Need to find consecutive numbers
- Could sort: O(n log n)
- Need fast lookups: Hash Set!
- Each number is start of potential sequence

Similar to: Finding connected components
```

**P - Plan**
```
Approach 1 (Brute Force):
- Sort array: O(n log n)
- Linear scan for consecutive: O(n)
- Total: O(n log n)

Approach 2 (Optimal):
- Use hash set for O(1) lookups
- For each number, check if it's start of sequence
- Count length of sequence from that start
- Time: O(n), Space: O(n)

Pseudocode:
1. Create set from array
2. For each number:
   a. If number-1 not in set (start of sequence):
      - Count consecutive numbers
      - Update max length
3. Return max length

Edge cases:
- Empty array → 0
- Single element → 1
- All duplicates → 1
- No consecutive → 1
```

**I - Implement**
```python
def longest_consecutive(nums):
    if not nums:
        return 0

    num_set = set(nums)
    max_length = 0

    for num in num_set:
        # Only start counting from beginning of sequence
        if num - 1 not in num_set:
            current_num = num
            current_length = 1

            # Count consecutive numbers
            while current_num + 1 in num_set:
                current_num += 1
                current_length += 1

            max_length = max(max_length, current_length)

    return max_length
```

**R - Review**
```
Test with example: [100, 4, 200, 1, 3, 2]
- Set: {100, 4, 200, 1, 3, 2}
- Check 100: 99 not in set, count: 1
- Check 4: 3 in set (not start), skip
- Check 200: 199 not in set, count: 1
- Check 1: 0 not in set (start!), count: 1→2→3→4
- Check 3: 2 in set, skip
- Check 2: 1 in set, skip
- Max: 4 ✓

Edge cases:
- []: → 0 ✓
- [1]: → 1 ✓
- [1,1,1]: → 1 ✓
- [1,3,5]: → 1 ✓
```

**E - Evaluate**
```
Time Complexity: O(n)
- Creating set: O(n)
- Iterating nums: O(n)
- Inner while: Each number visited at most twice
- Overall: O(n)

Space Complexity: O(n)
- Set stores all unique numbers

Trade-off: Use O(n) space to achieve O(n) time
Alternative: Sort in O(n log n) time with O(1) space
```

## Summary

The UMPIRE method provides a structured approach to tackling any coding problem:

1. **Understand** the problem completely
2. **Match** to known patterns and data structures
3. **Plan** your solution before coding
4. **Implement** clean, working code
5. **Review** for bugs and improvements
6. **Evaluate** time and space complexity

Practice this framework until it becomes second nature. The goal is to demonstrate not just coding ability, but systematic problem-solving skills and clear communication.
