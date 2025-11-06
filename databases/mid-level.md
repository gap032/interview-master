# Databases - Mid-Level Questions

## 1. SQL Indexing and Query Optimization

**Question**: Explain database indexes. How to optimize slow queries?

**Answer**:

**Index Types:**

**1. B-Tree Index (default):**
```sql
CREATE INDEX idx_users_email ON users(email);

-- Good for:
SELECT * FROM users WHERE email = 'user@example.com';  -- Exact match
SELECT * FROM users WHERE email LIKE 'user%';          -- Prefix search
SELECT * FROM users WHERE age > 25 ORDER BY age;       -- Range + sort

-- Bad for:
SELECT * FROM users WHERE email LIKE '%example.com';   -- Suffix search
```

**2. Composite Index:**
```sql
CREATE INDEX idx_users_city_age ON users(city, age);

-- Uses index (left-to-right):
SELECT * FROM users WHERE city = 'NYC' AND age = 30;  -- Both
SELECT * FROM users WHERE city = 'NYC';               -- First column only

-- Doesn't use index:
SELECT * FROM users WHERE age = 30;                   -- Skips first column
```

**Query Optimization Example:**

```sql
-- Slow query
EXPLAIN ANALYZE
SELECT u.name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at > '2024-01-01'
GROUP BY u.id, u.name;

-- Result: Seq Scan on users (cost=0..1000)

-- Optimize:
-- 1. Add index on created_at
CREATE INDEX idx_users_created ON users(created_at);

-- 2. Add index on foreign key
CREATE INDEX idx_orders_user_id ON orders(user_id);

-- Now: Index Scan (cost=0..100) - 10x faster!
```

**EXPLAIN output key metrics:**
- **cost**: Estimated cost (lower is better)
- **rows**: Estimated rows scanned
- **Seq Scan**: Full table scan (bad for large tables)
- **Index Scan**: Using index (good)

---

## 2. Transactions and ACID

**Question**: Explain database transactions and isolation levels.

**Answer**:

**ACID Properties:**
- **Atomicity**: All or nothing
- **Consistency**: Valid state to valid state
- **Isolation**: Transactions don't interfere
- **Durability**: Committed = permanent

**Isolation Levels:**

```sql
-- Read Uncommitted (dirty reads possible)
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

-- Read Committed (default in PostgreSQL)
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

-- Repeatable Read
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;

-- Serializable (strictest)
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
```

**Example Problems:**

```sql
-- Dirty Read
-- Transaction 1:
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
-- Not committed yet

-- Transaction 2 (Read Uncommitted):
SELECT balance FROM accounts WHERE id = 1;  -- Sees uncommitted value!

-- Transaction 1:
ROLLBACK;  -- Transaction 2 saw data that never existed
```

**Concurrency Issues:**

| Issue | Description | Prevented By |
|-------|-------------|--------------|
| Dirty Read | Read uncommitted data | Read Committed+ |
| Non-repeatable Read | Same query, different results | Repeatable Read+ |
| Phantom Read | New rows appear | Serializable |

---

## 3. SQL vs NoSQL

**Question**: When to use SQL vs NoSQL databases?

**Answer**:

**SQL (PostgreSQL, MySQL):**
```sql
-- Structured data with relationships
CREATE TABLE users (id, name, email);
CREATE TABLE orders (id, user_id, total);

SELECT u.name, SUM(o.total)
FROM users u
JOIN orders o ON u.id = o.user_id
GROUP BY u.id;
```

**Pros:**
- ACID transactions
- Complex queries (JOIN)
- Data integrity constraints
- Mature tooling

**NoSQL Document Store (MongoDB):**
```javascript
// Flexible schema
db.users.insertOne({
    name: "John",
    email: "john@example.com",
    addresses: [
        { type: "home", city: "NYC" },
        { type: "work", city: "SF" }
    ]
});
```

**Pros:**
- Flexible schema
- Horizontal scaling
- Fast for simple queries
- Good for hierarchical data

**Decision Guide:**

| Use SQL When | Use NoSQL When |
|--------------|----------------|
| Complex relationships | Denormalized data |
| ACID required | Eventual consistency OK |
| Structured data | Schema evolves frequently |
| Complex analytics | Simple key-value lookups |
| Financial systems | Session storage, caching |
