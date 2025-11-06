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

**C# Implementation - Entity Framework Core with SQL Server:**

```csharp
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Collections.Generic;

// Entity classes
public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public DateTime CreatedAt { get; set; }
    public string City { get; set; }
    public int Age { get; set; }

    public ICollection<Order> Orders { get; set; }
}

public class Order
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public decimal Total { get; set; }

    public User User { get; set; }
}

// DbContext
public class AppDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Order> Orders { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(
            "Server=localhost;Database=InterviewDB;Trusted_Connection=True;");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Create indexes
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .HasDatabaseName("idx_users_email");

        modelBuilder.Entity<User>()
            .HasIndex(u => u.CreatedAt)
            .HasDatabaseName("idx_users_created");

        // Composite index
        modelBuilder.Entity<User>()
            .HasIndex(u => new { u.City, u.Age })
            .HasDatabaseName("idx_users_city_age");

        modelBuilder.Entity<Order>()
            .HasIndex(o => o.UserId)
            .HasDatabaseName("idx_orders_user_id");

        // Configure relationships
        modelBuilder.Entity<Order>()
            .HasOne(o => o.User)
            .WithMany(u => u.Orders)
            .HasForeignKey(o => o.UserId);
    }
}

// Query optimization examples
public class DatabaseExamples
{
    static void Main()
    {
        using var db = new AppDbContext();

        // Optimized query with indexes
        var recentUsers = db.Users
            .Where(u => u.CreatedAt > new DateTime(2024, 1, 1))
            .Include(u => u.Orders)
            .Select(u => new
            {
                u.Name,
                OrderCount = u.Orders.Count
            })
            .ToList();

        // Using composite index
        var nycUsers = db.Users
            .Where(u => u.City == "NYC" && u.Age == 30)
            .ToList();

        // Index usage demonstration
        var user = db.Users
            .Where(u => u.Email == "user@example.com")
            .FirstOrDefault();

        Console.WriteLine("Queries executed with index optimization");
    }
}
```

**C# Implementation - Transactions with Entity Framework Core:**

```csharp
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

public class TransactionExamples
{
    // Example 1: Basic transaction
    public static async Task TransferMoneyAsync(int fromAccountId, int toAccountId, decimal amount)
    {
        using var db = new AppDbContext();

        // Begin transaction
        using var transaction = await db.Database.BeginTransactionAsync();

        try
        {
            // Debit from account
            var fromAccount = await db.Accounts.FindAsync(fromAccountId);
            if (fromAccount.Balance < amount)
                throw new InvalidOperationException("Insufficient funds");

            fromAccount.Balance -= amount;

            // Credit to account
            var toAccount = await db.Accounts.FindAsync(toAccountId);
            toAccount.Balance += amount;

            // Save changes
            await db.SaveChangesAsync();

            // Commit transaction
            await transaction.CommitAsync();

            Console.WriteLine($"Transferred {amount:C} from {fromAccountId} to {toAccountId}");
        }
        catch (Exception ex)
        {
            // Rollback on error
            await transaction.RollbackAsync();
            Console.WriteLine($"Transaction failed: {ex.Message}");
            throw;
        }
    }

    // Example 2: Isolation levels
    public static async Task DemonstrateIsolationLevelsAsync()
    {
        using var db = new AppDbContext();

        // Read Committed (default)
        using (var transaction = await db.Database.BeginTransactionAsync(
            System.Data.IsolationLevel.ReadCommitted))
        {
            var user = await db.Users.FirstAsync();
            Console.WriteLine($"Read Committed: {user.Name}");
            await transaction.CommitAsync();
        }

        // Repeatable Read
        using (var transaction = await db.Database.BeginTransactionAsync(
            System.Data.IsolationLevel.RepeatableRead))
        {
            var user1 = await db.Users.FindAsync(1);
            // ... do some work ...
            var user2 = await db.Users.FindAsync(1);
            // user1 and user2 will have same values even if updated concurrently
            await transaction.CommitAsync();
        }

        // Serializable (strictest)
        using (var transaction = await db.Database.BeginTransactionAsync(
            System.Data.IsolationLevel.Serializable))
        {
            var users = await db.Users.Where(u => u.Age > 25).ToListAsync();
            // No other transaction can insert/update/delete users that match this query
            await transaction.CommitAsync();
        }
    }

    // Example 3: Handling concurrency conflicts
    public static async Task HandleOptimisticConcurrencyAsync(int userId)
    {
        using var db = new AppDbContext();

        try
        {
            var user = await db.Users.FindAsync(userId);
            user.Name = "Updated Name";

            await db.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException ex)
        {
            // Handle concurrency conflict
            var entry = ex.Entries.Single();
            var databaseValues = await entry.GetDatabaseValuesAsync();

            if (databaseValues == null)
            {
                Console.WriteLine("Record was deleted by another user");
            }
            else
            {
                Console.WriteLine("Conflict detected. Merging changes...");
                entry.OriginalValues.SetValues(databaseValues);
                await db.SaveChangesAsync();
            }
        }
    }
}

// Add to User entity for optimistic concurrency
public class Account
{
    public int Id { get; set; }
    public decimal Balance { get; set; }

    [Timestamp]  // Enables optimistic concurrency
    public byte[] RowVersion { get; set; }
}
```

**C# Implementation - Raw SQL and Dapper (Lightweight ORM):**

```csharp
using Dapper;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

public class DapperExamples
{
    private const string ConnectionString =
        "Server=localhost;Database=InterviewDB;Trusted_Connection=True;";

    // Example 1: Simple query
    public static async Task<IEnumerable<User>> GetUsersByEmailAsync(string email)
    {
        using var connection = new SqlConnection(ConnectionString);

        // Dapper automatically uses parameters (prevents SQL injection)
        var users = await connection.QueryAsync<User>(
            "SELECT * FROM Users WHERE Email = @Email",
            new { Email = email });

        return users;
    }

    // Example 2: Complex query with JOIN
    public static async Task<IEnumerable<UserWithOrderCount>> GetUsersWithOrderCountAsync(
        DateTime since)
    {
        using var connection = new SqlConnection(ConnectionString);

        var sql = @"
            SELECT u.Name, COUNT(o.Id) as OrderCount
            FROM Users u
            LEFT JOIN Orders o ON u.Id = o.UserId
            WHERE u.CreatedAt > @Since
            GROUP BY u.Id, u.Name";

        var results = await connection.QueryAsync<UserWithOrderCount>(
            sql,
            new { Since = since });

        return results;
    }

    // Example 3: Transaction with Dapper
    public static async Task TransferWithDapperAsync(
        int fromId,
        int toId,
        decimal amount)
    {
        using var connection = new SqlConnection(ConnectionString);
        await connection.OpenAsync();

        using var transaction = connection.BeginTransaction();

        try
        {
            // Debit
            await connection.ExecuteAsync(
                "UPDATE Accounts SET Balance = Balance - @Amount WHERE Id = @Id",
                new { Amount = amount, Id = fromId },
                transaction);

            // Credit
            await connection.ExecuteAsync(
                "UPDATE Accounts SET Balance = Balance + @Amount WHERE Id = @Id",
                new { Amount = amount, Id = toId },
                transaction);

            transaction.Commit();
        }
        catch
        {
            transaction.Rollback();
            throw;
        }
    }

    public class UserWithOrderCount
    {
        public string Name { get; set; }
        public int OrderCount { get; set; }
    }
}
```

**C# Implementation - MongoDB (NoSQL):**

```csharp
using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

// MongoDB document model
public class UserDocument
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    public string Name { get; set; }
    public string Email { get; set; }

    public List<Address> Addresses { get; set; } = new List<Address>();

    public Dictionary<string, object> Metadata { get; set; } = new();
}

public class Address
{
    public string Type { get; set; }  // "home", "work"
    public string City { get; set; }
    public string Street { get; set; }
}

public class MongoDbExamples
{
    private static IMongoDatabase GetDatabase()
    {
        var client = new MongoClient("mongodb://localhost:27017");
        return client.GetDatabase("interview_db");
    }

    // Example 1: Insert document
    public static async Task InsertUserAsync()
    {
        var database = GetDatabase();
        var collection = database.GetCollection<UserDocument>("users");

        var user = new UserDocument
        {
            Name = "John Doe",
            Email = "john@example.com",
            Addresses = new List<Address>
            {
                new Address { Type = "home", City = "NYC", Street = "5th Ave" },
                new Address { Type = "work", City = "SF", Street = "Market St" }
            },
            Metadata = new Dictionary<string, object>
            {
                { "created_at", DateTime.UtcNow },
                { "tier", "premium" }
            }
        };

        await collection.InsertOneAsync(user);
        Console.WriteLine($"Inserted user with ID: {user.Id}");
    }

    // Example 2: Query with filters
    public static async Task<List<UserDocument>> FindUsersByCityAsync(string city)
    {
        var database = GetDatabase();
        var collection = database.GetCollection<UserDocument>("users");

        // Find users who have any address in the specified city
        var filter = Builders<UserDocument>.Filter.ElemMatch(
            u => u.Addresses,
            a => a.City == city);

        var users = await collection.Find(filter).ToListAsync();
        return users;
    }

    // Example 3: Update document (flexible schema)
    public static async Task AddMetadataAsync(string userId, string key, object value)
    {
        var database = GetDatabase();
        var collection = database.GetCollection<UserDocument>("users");

        var filter = Builders<UserDocument>.Filter.Eq(u => u.Id, userId);
        var update = Builders<UserDocument>.Update.Set($"Metadata.{key}", value);

        await collection.UpdateOneAsync(filter, update);
    }

    // Example 4: Aggregation pipeline
    public static async Task GetUserStatisticsByCityAsync()
    {
        var database = GetDatabase();
        var collection = database.GetCollection<UserDocument>("users");

        var pipeline = new[]
        {
            new BsonDocument("$unwind", "$Addresses"),
            new BsonDocument("$group", new BsonDocument
            {
                { "_id", "$Addresses.City" },
                { "count", new BsonDocument("$sum", 1) }
            }),
            new BsonDocument("$sort", new BsonDocument("count", -1))
        };

        var results = await collection.Aggregate<BsonDocument>(pipeline).ToListAsync();

        foreach (var result in results)
        {
            Console.WriteLine($"City: {result["_id"]}, Users: {result["count"]}");
        }
    }
}
```

**C# Decision Guide - When to Use Each Approach:**

```csharp
public class DatabaseStrategy
{
    // Use Entity Framework Core when:
    // - Complex object graphs with relationships
    // - Need change tracking
    // - Want LINQ support
    // - Rapid development
    public void UseEntityFramework()
    {
        using var db = new AppDbContext();

        var usersWithOrders = db.Users
            .Include(u => u.Orders)
            .Where(u => u.Age > 25)
            .ToList();
    }

    // Use Dapper when:
    // - Performance critical
    // - Complex SQL queries
    // - Simple mapping
    // - Microservices
    public async Task UseDapper()
    {
        using var connection = new SqlConnection("...");

        var users = await connection.QueryAsync<User>(
            "SELECT * FROM Users WHERE Age > @Age",
            new { Age = 25 });
    }

    // Use MongoDB when:
    // - Flexible/evolving schema
    // - Hierarchical/nested data
    // - Horizontal scaling
    // - Document-oriented storage
    public async Task UseMongoDB()
    {
        var database = new MongoClient("...").GetDatabase("db");
        var collection = database.GetCollection<UserDocument>("users");

        var users = await collection
            .Find(u => u.Addresses.Any(a => a.City == "NYC"))
            .ToListAsync();
    }
}
```

