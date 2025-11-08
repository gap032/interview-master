# Bazy Danych - Pytania Poziom Mid

## 1. SQL Indexing and Query Optimization

**Pytanie**: Explain database indexes. How to optimize slow queries?

**Odpowiedź**:

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

**Pytanie**: Explain database transactions and isolation levels.

**Odpowiedź**:

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

**Pytanie**: When to use SQL vs NoSQL databases?

**Odpowiedź**:

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

---

## 4. T-SQL (Transact-SQL) Fundamentals

**Pytanie**: What are the key features of T-SQL? Explain stored procedures, functions, and CTEs.

**Odpowiedź**:

**T-SQL Overview:**
T-SQL is Microsoft's proprietary extension to SQL, adding procedural programming, local variables, error handling, and more.

**1. Stored Procedures:**
```sql
-- Create a stored procedure
CREATE PROCEDURE GetUserOrders
    @UserId INT,
    @StartDate DATE = NULL  -- Optional parameter with default
AS
BEGIN
    SET NOCOUNT ON;  -- Don't return row count (performance)

    SELECT
        o.Id,
        o.OrderDate,
        o.Total,
        u.Name AS UserName
    FROM Orders o
    INNER JOIN Users u ON o.UserId = u.Id
    WHERE o.UserId = @UserId
        AND (@StartDate IS NULL OR o.OrderDate >= @StartDate)
    ORDER BY o.OrderDate DESC;
END;
GO

-- Execute stored procedure
EXEC GetUserOrders @UserId = 123;
EXEC GetUserOrders @UserId = 123, @StartDate = '2024-01-01';
```

**Stored Procedure with Output Parameters:**
```sql
CREATE PROCEDURE CreateUser
    @Name NVARCHAR(100),
    @Email NVARCHAR(100),
    @UserId INT OUTPUT  -- Output parameter
AS
BEGIN
    INSERT INTO Users (Name, Email, CreatedAt)
    VALUES (@Name, @Email, GETDATE());

    -- Return the new ID
    SET @UserId = SCOPE_IDENTITY();

    RETURN 0;  -- Return code (0 = success)
END;
GO

-- Call with output parameter
DECLARE @NewUserId INT;
EXEC CreateUser
    @Name = 'John Doe',
    @Email = 'john@example.com',
    @UserId = @NewUserId OUTPUT;

SELECT @NewUserId AS NewUserId;
```

**2. Functions:**

**Scalar Function (returns single value):**
```sql
CREATE FUNCTION dbo.CalculateTax
(
    @Amount DECIMAL(10, 2),
    @TaxRate DECIMAL(5, 2)
)
RETURNS DECIMAL(10, 2)
AS
BEGIN
    DECLARE @Tax DECIMAL(10, 2);
    SET @Tax = @Amount * (@TaxRate / 100);
    RETURN @Tax;
END;
GO

-- Usage
SELECT
    OrderId,
    Total,
    dbo.CalculateTax(Total, 8.5) AS Tax,
    Total + dbo.CalculateTax(Total, 8.5) AS TotalWithTax
FROM Orders;
```

**Inline Table-Valued Function (returns table):**
```sql
CREATE FUNCTION dbo.GetUserOrdersSummary(@UserId INT)
RETURNS TABLE
AS
RETURN
(
    SELECT
        YEAR(OrderDate) AS Year,
        MONTH(OrderDate) AS Month,
        COUNT(*) AS OrderCount,
        SUM(Total) AS TotalAmount
    FROM Orders
    WHERE UserId = @UserId
    GROUP BY YEAR(OrderDate), MONTH(OrderDate)
);
GO

-- Usage (can be used like a table)
SELECT * FROM dbo.GetUserOrdersSummary(123)
WHERE Year = 2024
ORDER BY Month;
```

**Multi-Statement Table-Valued Function:**
```sql
CREATE FUNCTION dbo.GetTopCustomers(@TopN INT)
RETURNS @Results TABLE
(
    UserId INT,
    UserName NVARCHAR(100),
    OrderCount INT,
    TotalSpent DECIMAL(10, 2)
)
AS
BEGIN
    INSERT INTO @Results
    SELECT TOP (@TopN)
        u.Id,
        u.Name,
        COUNT(o.Id) AS OrderCount,
        SUM(o.Total) AS TotalSpent
    FROM Users u
    INNER JOIN Orders o ON u.Id = o.UserId
    GROUP BY u.Id, u.Name
    ORDER BY SUM(o.Total) DESC;

    RETURN;
END;
GO

-- Usage
SELECT * FROM dbo.GetTopCustomers(10);
```

**3. Common Table Expressions (CTEs):**

**Simple CTE:**
```sql
-- CTE for better readability
WITH UserOrderStats AS
(
    SELECT
        UserId,
        COUNT(*) AS OrderCount,
        SUM(Total) AS TotalSpent,
        AVG(Total) AS AvgOrderValue
    FROM Orders
    GROUP BY UserId
)
SELECT
    u.Name,
    uos.OrderCount,
    uos.TotalSpent,
    uos.AvgOrderValue
FROM Users u
INNER JOIN UserOrderStats uos ON u.Id = uos.UserId
WHERE uos.OrderCount > 5
ORDER BY uos.TotalSpent DESC;
```

**Recursive CTE (hierarchical data):**
```sql
-- Employee hierarchy
CREATE TABLE Employees (
    Id INT PRIMARY KEY,
    Name NVARCHAR(100),
    ManagerId INT
);

-- Recursive CTE to get all subordinates
WITH EmployeeHierarchy AS
(
    -- Anchor: Start with the top manager
    SELECT
        Id,
        Name,
        ManagerId,
        0 AS Level
    FROM Employees
    WHERE ManagerId IS NULL

    UNION ALL

    -- Recursive: Get subordinates
    SELECT
        e.Id,
        e.Name,
        e.ManagerId,
        eh.Level + 1
    FROM Employees e
    INNER JOIN EmployeeHierarchy eh ON e.ManagerId = eh.Id
)
SELECT
    REPLICATE('  ', Level) + Name AS OrgChart,
    Level
FROM EmployeeHierarchy
ORDER BY Level, Name;
```

**4. Window Functions:**

```sql
-- ROW_NUMBER: Unique number for each row
SELECT
    Name,
    Salary,
    Department,
    ROW_NUMBER() OVER (PARTITION BY Department ORDER BY Salary DESC) AS RowNum
FROM Employees;

-- RANK: Same rank for ties, gaps in ranking
SELECT
    Name,
    Salary,
    RANK() OVER (ORDER BY Salary DESC) AS Rank
FROM Employees;

-- DENSE_RANK: Same rank for ties, no gaps
SELECT
    Name,
    Salary,
    DENSE_RANK() OVER (ORDER BY Salary DESC) AS DenseRank
FROM Employees;

-- LAG/LEAD: Access previous/next row
SELECT
    OrderDate,
    Total,
    LAG(Total, 1) OVER (ORDER BY OrderDate) AS PreviousTotal,
    LEAD(Total, 1) OVER (ORDER BY OrderDate) AS NextTotal,
    Total - LAG(Total, 1) OVER (ORDER BY OrderDate) AS Difference
FROM Orders;

-- Running totals with window functions
SELECT
    OrderDate,
    Total,
    SUM(Total) OVER (ORDER BY OrderDate ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS RunningTotal
FROM Orders;
```

**5. Transactions and Error Handling:**

```sql
-- Modern error handling with TRY/CATCH
CREATE PROCEDURE TransferMoney
    @FromAccountId INT,
    @ToAccountId INT,
    @Amount DECIMAL(10, 2)
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        -- Debit from account
        UPDATE Accounts
        SET Balance = Balance - @Amount
        WHERE Id = @FromAccountId;

        -- Check for insufficient funds
        IF (SELECT Balance FROM Accounts WHERE Id = @FromAccountId) < 0
        BEGIN
            THROW 50001, 'Insufficient funds', 1;
        END;

        -- Credit to account
        UPDATE Accounts
        SET Balance = Balance + @Amount
        WHERE Id = @ToAccountId;

        COMMIT TRANSACTION;

        PRINT 'Transfer successful';
    END TRY
    BEGIN CATCH
        -- Rollback on error
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        -- Log error details
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
        DECLARE @ErrorState INT = ERROR_STATE();

        PRINT 'Error: ' + @ErrorMessage;

        -- Re-throw the error
        THROW;
    END CATCH;
END;
GO
```

**6. Temp Tables vs Table Variables:**

```sql
-- Temporary Table (stored in tempdb, can have indexes)
CREATE TABLE #TempOrders
(
    OrderId INT PRIMARY KEY,
    Total DECIMAL(10, 2)
);

INSERT INTO #TempOrders (OrderId, Total)
SELECT Id, Total FROM Orders WHERE Total > 100;

CREATE INDEX IX_Total ON #TempOrders(Total);

SELECT * FROM #TempOrders;

DROP TABLE #TempOrders;  -- Cleanup

-- Table Variable (in-memory, no statistics)
DECLARE @OrdersTable TABLE
(
    OrderId INT PRIMARY KEY,
    Total DECIMAL(10, 2)
);

INSERT INTO @OrdersTable (OrderId, Total)
SELECT Id, Total FROM Orders WHERE Total > 100;

SELECT * FROM @OrdersTable;
-- Auto-cleanup when out of scope
```

**Use Cases:**
- **Temp Tables (#)**: Large datasets, need indexes, multiple queries
- **Table Variables (@)**: Small datasets, single query, simple logic

**7. Dynamic SQL:**

```sql
-- Dynamic SQL with parameterization (safe from SQL injection)
CREATE PROCEDURE SearchUsers
    @SearchColumn NVARCHAR(50),
    @SearchValue NVARCHAR(100)
AS
BEGIN
    DECLARE @SQL NVARCHAR(MAX);

    -- Whitelist column names (prevent SQL injection)
    IF @SearchColumn NOT IN ('Name', 'Email', 'City')
    BEGIN
        THROW 50002, 'Invalid column name', 1;
    END;

    SET @SQL = N'SELECT Id, Name, Email
                 FROM Users
                 WHERE ' + QUOTENAME(@SearchColumn) + N' LIKE @SearchParam';

    EXEC sp_executesql
        @SQL,
        N'@SearchParam NVARCHAR(100)',
        @SearchParam = '%' + @SearchValue + '%';
END;
GO

-- Execute
EXEC SearchUsers @SearchColumn = 'Name', @SearchValue = 'John';
```

**C# Implementation - Calling T-SQL from .NET:**

**1. Using ADO.NET (Direct SQL Connection):**

```csharp
using Microsoft.Data.SqlClient;
using System;
using System.Data;
using System.Threading.Tasks;

public class TSqlAdoNetExamples
{
    private const string ConnectionString =
        "Server=localhost;Database=InterviewDB;Trusted_Connection=True;";

    // Example 1: Call stored procedure
    public static async Task<DataTable> GetUserOrdersAsync(int userId, DateTime? startDate = null)
    {
        using var connection = new SqlConnection(ConnectionString);
        using var command = new SqlCommand("GetUserOrders", connection);
        command.CommandType = CommandType.StoredProcedure;

        // Add parameters
        command.Parameters.AddWithValue("@UserId", userId);
        command.Parameters.AddWithValue("@StartDate",
            startDate.HasValue ? (object)startDate.Value : DBNull.Value);

        await connection.OpenAsync();

        // Execute and fill DataTable
        var dataTable = new DataTable();
        using var adapter = new SqlDataAdapter(command);
        adapter.Fill(dataTable);

        return dataTable;
    }

    // Example 2: Call stored procedure with output parameter
    public static async Task<int> CreateUserAsync(string name, string email)
    {
        using var connection = new SqlConnection(ConnectionString);
        using var command = new SqlCommand("CreateUser", connection);
        command.CommandType = CommandType.StoredProcedure;

        // Input parameters
        command.Parameters.AddWithValue("@Name", name);
        command.Parameters.AddWithValue("@Email", email);

        // Output parameter
        var userIdParam = new SqlParameter("@UserId", SqlDbType.Int)
        {
            Direction = ParameterDirection.Output
        };
        command.Parameters.Add(userIdParam);

        await connection.OpenAsync();
        await command.ExecuteNonQueryAsync();

        // Get output value
        int newUserId = (int)userIdParam.Value;
        return newUserId;
    }

    // Example 3: Call scalar function
    public static async Task<decimal> CalculateTaxAsync(decimal amount, decimal taxRate)
    {
        using var connection = new SqlConnection(ConnectionString);
        using var command = new SqlCommand(
            "SELECT dbo.CalculateTax(@Amount, @TaxRate)", connection);

        command.Parameters.AddWithValue("@Amount", amount);
        command.Parameters.AddWithValue("@TaxRate", taxRate);

        await connection.OpenAsync();

        var result = await command.ExecuteScalarAsync();
        return Convert.ToDecimal(result);
    }

    // Example 4: Call table-valued function
    public static async Task GetUserOrdersSummaryAsync(int userId)
    {
        using var connection = new SqlConnection(ConnectionString);
        using var command = new SqlCommand(
            "SELECT * FROM dbo.GetUserOrdersSummary(@UserId) WHERE Year = @Year",
            connection);

        command.Parameters.AddWithValue("@UserId", userId);
        command.Parameters.AddWithValue("@Year", 2024);

        await connection.OpenAsync();

        using var reader = await command.ExecuteReaderAsync();
        while (await reader.ReadAsync())
        {
            int year = reader.GetInt32(0);
            int month = reader.GetInt32(1);
            int orderCount = reader.GetInt32(2);
            decimal totalAmount = reader.GetDecimal(3);

            Console.WriteLine($"{year}-{month:D2}: {orderCount} orders, ${totalAmount:N2}");
        }
    }

    // Example 5: Transaction with error handling
    public static async Task TransferMoneyAsync(
        int fromAccountId,
        int toAccountId,
        decimal amount)
    {
        using var connection = new SqlConnection(ConnectionString);
        await connection.OpenAsync();

        using var transaction = connection.BeginTransaction();

        try
        {
            // Call stored procedure within transaction
            using var command = new SqlCommand("TransferMoney", connection, transaction);
            command.CommandType = CommandType.StoredProcedure;

            command.Parameters.AddWithValue("@FromAccountId", fromAccountId);
            command.Parameters.AddWithValue("@ToAccountId", toAccountId);
            command.Parameters.AddWithValue("@Amount", amount);

            await command.ExecuteNonQueryAsync();

            await transaction.CommitAsync();
            Console.WriteLine($"Transfer of ${amount:N2} completed successfully");
        }
        catch (SqlException ex)
        {
            await transaction.RollbackAsync();
            Console.WriteLine($"Transfer failed: {ex.Message}");
            throw;
        }
    }
}
```

**2. Using Dapper with T-SQL:**

```csharp
using Dapper;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

public class TSqlDapperExamples
{
    private const string ConnectionString =
        "Server=localhost;Database=InterviewDB;Trusted_Connection=True;";

    // Example 1: Call stored procedure with Dapper
    public static async Task<IEnumerable<OrderDto>> GetUserOrdersAsync(
        int userId,
        DateTime? startDate = null)
    {
        using var connection = new SqlConnection(ConnectionString);

        var orders = await connection.QueryAsync<OrderDto>(
            "GetUserOrders",
            new { UserId = userId, StartDate = startDate },
            commandType: CommandType.StoredProcedure);

        return orders;
    }

    // Example 2: Stored procedure with output parameter
    public static async Task<int> CreateUserWithDapperAsync(string name, string email)
    {
        using var connection = new SqlConnection(ConnectionString);

        var parameters = new DynamicParameters();
        parameters.Add("@Name", name);
        parameters.Add("@Email", email);
        parameters.Add("@UserId", dbType: DbType.Int32, direction: ParameterDirection.Output);

        await connection.ExecuteAsync(
            "CreateUser",
            parameters,
            commandType: CommandType.StoredProcedure);

        int newUserId = parameters.Get<int>("@UserId");
        return newUserId;
    }

    // Example 3: Call scalar function
    public static async Task<decimal> CalculateTaxWithDapperAsync(
        decimal amount,
        decimal taxRate)
    {
        using var connection = new SqlConnection(ConnectionString);

        var tax = await connection.ExecuteScalarAsync<decimal>(
            "SELECT dbo.CalculateTax(@Amount, @TaxRate)",
            new { Amount = amount, TaxRate = taxRate });

        return tax;
    }

    // Example 4: Call table-valued function
    public static async Task<IEnumerable<OrderSummaryDto>> GetUserOrdersSummaryDapperAsync(
        int userId)
    {
        using var connection = new SqlConnection(ConnectionString);

        var summary = await connection.QueryAsync<OrderSummaryDto>(
            "SELECT * FROM dbo.GetUserOrdersSummary(@UserId) WHERE Year = 2024",
            new { UserId = userId });

        return summary;
    }

    // Example 5: Execute CTE query
    public static async Task<IEnumerable<UserStatsDto>> GetUserStatsAsync()
    {
        using var connection = new SqlConnection(ConnectionString);

        var sql = @"
            WITH UserOrderStats AS
            (
                SELECT
                    UserId,
                    COUNT(*) AS OrderCount,
                    SUM(Total) AS TotalSpent,
                    AVG(Total) AS AvgOrderValue
                FROM Orders
                GROUP BY UserId
            )
            SELECT
                u.Name,
                uos.OrderCount,
                uos.TotalSpent,
                uos.AvgOrderValue
            FROM Users u
            INNER JOIN UserOrderStats uos ON u.Id = uos.UserId
            WHERE uos.OrderCount > @MinOrders
            ORDER BY uos.TotalSpent DESC";

        var stats = await connection.QueryAsync<UserStatsDto>(sql, new { MinOrders = 5 });
        return stats;
    }

    // Example 6: Window functions query
    public static async Task<IEnumerable<SalesRankDto>> GetSalesRankingsAsync()
    {
        using var connection = new SqlConnection(ConnectionString);

        var sql = @"
            SELECT
                Name,
                Salary,
                Department,
                ROW_NUMBER() OVER (PARTITION BY Department ORDER BY Salary DESC) AS DeptRank,
                RANK() OVER (ORDER BY Salary DESC) AS OverallRank
            FROM Employees";

        var rankings = await connection.QueryAsync<SalesRankDto>(sql);
        return rankings;
    }

    // DTOs
    public class OrderDto
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal Total { get; set; }
        public string UserName { get; set; }
    }

    public class OrderSummaryDto
    {
        public int Year { get; set; }
        public int Month { get; set; }
        public int OrderCount { get; set; }
        public decimal TotalAmount { get; set; }
    }

    public class UserStatsDto
    {
        public string Name { get; set; }
        public int OrderCount { get; set; }
        public decimal TotalSpent { get; set; }
        public decimal AvgOrderValue { get; set; }
    }

    public class SalesRankDto
    {
        public string Name { get; set; }
        public decimal Salary { get; set; }
        public string Department { get; set; }
        public int DeptRank { get; set; }
        public int OverallRank { get; set; }
    }
}
```

**3. Using Entity Framework Core with Raw SQL/Stored Procedures:**

```csharp
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;

public class TSqlEFCoreExamples
{
    // Example 1: Call stored procedure with FromSqlRaw
    public static async Task<List<Order>> GetUserOrdersEFCoreAsync(
        AppDbContext context,
        int userId,
        DateTime? startDate = null)
    {
        var orders = await context.Orders
            .FromSqlRaw(
                "EXEC GetUserOrders @UserId, @StartDate",
                new SqlParameter("@UserId", userId),
                new SqlParameter("@StartDate", startDate ?? (object)DBNull.Value))
            .ToListAsync();

        return orders;
    }

    // Example 2: Execute stored procedure with output parameter
    public static async Task<int> CreateUserEFCoreAsync(
        AppDbContext context,
        string name,
        string email)
    {
        var userIdParam = new SqlParameter
        {
            ParameterName = "@UserId",
            SqlDbType = SqlDbType.Int,
            Direction = ParameterDirection.Output
        };

        await context.Database.ExecuteSqlRawAsync(
            "EXEC CreateUser @Name, @Email, @UserId OUTPUT",
            new SqlParameter("@Name", name),
            new SqlParameter("@Email", email),
            userIdParam);

        return (int)userIdParam.Value;
    }

    // Example 3: Execute CTE query
    public static async Task<List<UserStatsDto>> GetUserStatsEFCoreAsync(
        AppDbContext context)
    {
        var sql = @"
            WITH UserOrderStats AS
            (
                SELECT
                    UserId,
                    COUNT(*) AS OrderCount,
                    SUM(Total) AS TotalSpent
                FROM Orders
                GROUP BY UserId
            )
            SELECT
                u.Name,
                uos.OrderCount,
                uos.TotalSpent
            FROM Users u
            INNER JOIN UserOrderStats uos ON u.Id = uos.UserId
            WHERE uos.OrderCount > {0}";

        var stats = await context.Database
            .SqlQueryRaw<UserStatsDto>(sql, 5)
            .ToListAsync();

        return stats;
    }

    // Example 4: Use table-valued function
    public static async Task<List<OrderSummaryDto>> GetOrderSummaryEFCoreAsync(
        AppDbContext context,
        int userId)
    {
        var summary = await context.Database
            .SqlQueryRaw<OrderSummaryDto>(
                "SELECT * FROM dbo.GetUserOrdersSummary({0}) WHERE Year = 2024",
                userId)
            .ToListAsync();

        return summary;
    }

    // Example 5: Configure stored procedure in model
    public static void ConfigureStoredProcedures(ModelBuilder modelBuilder)
    {
        // Map entity to stored procedure for inserts
        modelBuilder.Entity<User>()
            .InsertUsingStoredProcedure(
                "CreateUser",
                spBuilder => spBuilder
                    .HasParameter(u => u.Name)
                    .HasParameter(u => u.Email)
                    .HasResultColumn(u => u.Id));

        // Map to stored procedure for updates
        modelBuilder.Entity<User>()
            .UpdateUsingStoredProcedure(
                "UpdateUser",
                spBuilder => spBuilder
                    .HasOriginalValueParameter(u => u.Id)
                    .HasParameter(u => u.Name)
                    .HasParameter(u => u.Email));
    }

    public class UserStatsDto
    {
        public string Name { get; set; }
        public int OrderCount { get; set; }
        public decimal TotalSpent { get; set; }
    }

    public class OrderSummaryDto
    {
        public int Year { get; set; }
        public int Month { get; set; }
        public int OrderCount { get; set; }
        public decimal TotalAmount { get; set; }
    }
}
```

**T-SQL vs Standard SQL Key Differences:**

| Feature | T-SQL | Standard SQL |
|---------|-------|--------------|
| Variables | `DECLARE @var INT` | Limited support |
| Control Flow | `IF/ELSE, WHILE, BEGIN/END` | Limited |
| Error Handling | `TRY/CATCH` | Not standard |
| Functions | Scalar, Table-valued | Basic functions only |
| Stored Procedures | Full support with OUTPUT params | Limited |
| Window Functions | `ROW_NUMBER(), RANK(), etc.` | SQL:2003+ |
| Identity | `IDENTITY(1,1)` | `AUTO_INCREMENT` (MySQL) |
| String Concat | `+` operator | `||` operator |
| Top N | `SELECT TOP N` | `LIMIT N` (MySQL/Postgres) |

**Best Practices:**
1. **Use parameterized queries** to prevent SQL injection
2. **SET NOCOUNT ON** in stored procedures for performance
3. **Use table-valued functions** instead of multi-statement for better performance
4. **Prefer CTEs** over temp tables for readability when possible
5. **Use TRY/CATCH** for robust error handling
6. **Avoid cursors** when set-based operations can work
7. **Use window functions** instead of self-joins for ranking/aggregations

