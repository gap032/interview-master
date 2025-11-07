# Databases - Senior-Level Questions

## 1. Database Sharding Strategies

**Question**: Design a sharding strategy for a database with billions of rows.

**Answer**:

**Sharding Approaches:**

**1. Range-Based Sharding:**
```python
def get_shard(user_id):
    if user_id < 1_000_000:
        return 'shard_1'
    elif user_id < 2_000_000:
        return 'shard_2'
    else:
        return 'shard_3'
```
- Pros: Simple, good for range queries
- Cons: Unbalanced shards, hotspots

**2. Hash-Based Sharding:**
```python
def get_shard(user_id):
    shard_count = 10
    return f'shard_{hash(user_id) % shard_count}'
```
- Pros: Even distribution
- Cons: Range queries hit all shards

**3. Geographic Sharding:**
```python
def get_shard(user_id):
    location = get_user_location(user_id)
    return f'shard_{location}'  # shard_us, shard_eu, shard_asia
```
- Pros: Data locality, compliance
- Cons: Uneven distribution

**Challenges:**
- Cross-shard queries
- Rebalancing when adding shards
- Distributed transactions
- Schema changes across shards

**C# Implementation - Database Sharding:**

```csharp
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

// Shard routing interface
public interface IShardRouter
{
    string GetShard(int userId);
    IEnumerable<string> GetAllShards();
}

// 1. Range-Based Sharding
public class RangeBasedShardRouter : IShardRouter
{
    private readonly List<(int maxId, string shardName)> ranges;

    public RangeBasedShardRouter()
    {
        ranges = new List<(int, string)>
        {
            (1_000_000, "shard_1"),
            (2_000_000, "shard_2"),
            (int.MaxValue, "shard_3")
        };
    }

    public string GetShard(int userId)
    {
        foreach (var (maxId, shardName) in ranges)
        {
            if (userId < maxId)
                return shardName;
        }
        return ranges.Last().shardName;
    }

    public IEnumerable<string> GetAllShards() =>
        ranges.Select(r => r.shardName).Distinct();
}

// 2. Hash-Based Sharding
public class HashBasedShardRouter : IShardRouter
{
    private readonly int shardCount;
    private readonly List<string> shards;

    public HashBasedShardRouter(int shardCount = 10)
    {
        this.shardCount = shardCount;
        this.shards = Enumerable.Range(0, shardCount)
            .Select(i => $"shard_{i}")
            .ToList();
    }

    public string GetShard(int userId)
    {
        // Use consistent hashing for better distribution
        using var md5 = MD5.Create();
        byte[] hashBytes = md5.ComputeHash(BitConverter.GetBytes(userId));
        int hash = Math.Abs(BitConverter.ToInt32(hashBytes, 0));

        return shards[hash % shardCount];
    }

    public IEnumerable<string> GetAllShards() => shards;
}

// 3. Geographic Sharding
public class GeographicShardRouter : IShardRouter
{
    private readonly Dictionary<string, string> locationToShard;

    public GeographicShardRouter()
    {
        locationToShard = new Dictionary<string, string>
        {
            { "US", "shard_us" },
            { "EU", "shard_eu" },
            { "ASIA", "shard_asia" }
        };
    }

    public string GetShard(int userId)
    {
        string location = GetUserLocation(userId);
        return locationToShard.GetValueOrDefault(location, "shard_us");
    }

    public IEnumerable<string> GetAllShards() => locationToShard.Values.Distinct();

    private string GetUserLocation(int userId)
    {
        // Simplified: In real app, query user's location from cache/database
        return "US";
    }
}

// Sharded database context
public class ShardedDbContext
{
    private readonly IShardRouter shardRouter;
    private readonly Dictionary<string, DbContextOptions<AppDbContext>> shardConnections;

    public ShardedDbContext(IShardRouter shardRouter)
    {
        this.shardRouter = shardRouter;
        this.shardConnections = new Dictionary<string, DbContextOptions<AppDbContext>>
        {
            ["shard_1"] = CreateOptions("Server=shard1.db;Database=Users1"),
            ["shard_2"] = CreateOptions("Server=shard2.db;Database=Users2"),
            ["shard_3"] = CreateOptions("Server=shard3.db;Database=Users3")
        };
    }

    private DbContextOptions<AppDbContext> CreateOptions(string connectionString)
    {
        return new DbContextOptionsBuilder<AppDbContext>()
            .UseSqlServer(connectionString)
            .Options;
    }

    // Get context for specific shard
    public AppDbContext GetContext(int userId)
    {
        string shard = shardRouter.GetShard(userId);
        var options = shardConnections[shard];
        return new AppDbContext(options);
    }

    // Query single shard
    public async Task<User> GetUserAsync(int userId)
    {
        using var context = GetContext(userId);
        return await context.Users.FindAsync(userId);
    }

    // Cross-shard query (expensive!)
    public async Task<List<User>> GetAllUsersAsync()
    {
        var allUsers = new List<User>();

        foreach (var shard in shardRouter.GetAllShards())
        {
            var options = shardConnections[shard];
            using var context = new AppDbContext(options);
            var users = await context.Users.ToListAsync();
            allUsers.AddRange(users);
        }

        return allUsers;
    }

    // Shard-local query (efficient)
    public async Task<List<User>> GetUsersByShardAsync(int userId)
    {
        using var context = GetContext(userId);
        return await context.Users.ToListAsync();
    }
}

// Usage example
public class ShardingExample
{
    static async Task Main()
    {
        // Example 1: Hash-based sharding
        var hashRouter = new HashBasedShardRouter(shardCount: 10);
        var shardedDb = new ShardedDbContext(hashRouter);

        // Insert user (goes to specific shard)
        int userId = 12345;
        var user = new User { Id = userId, Name = "John Doe", Email = "john@example.com" };

        using (var context = shardedDb.GetContext(userId))
        {
            context.Users.Add(user);
            await context.SaveChangesAsync();
            Console.WriteLine($"User {userId} saved to {hashRouter.GetShard(userId)}");
        }

        // Query user (from specific shard)
        var retrievedUser = await shardedDb.GetUserAsync(userId);
        Console.WriteLine($"Retrieved: {retrievedUser.Name}");

        // Example 2: Range-based sharding
        var rangeRouter = new RangeBasedShardRouter();
        Console.WriteLine($"User 500,000 -> {rangeRouter.GetShard(500_000)}");
        Console.WriteLine($"User 1,500,000 -> {rangeRouter.GetShard(1_500_000)}");
        Console.WriteLine($"User 3,000,000 -> {rangeRouter.GetShard(3_000_000)}");

        // Example 3: Cross-shard aggregation
        var allUsers = await shardedDb.GetAllUsersAsync();
        Console.WriteLine($"Total users across all shards: {allUsers.Count}");
    }
}

// Advanced: Consistent hashing for better rebalancing
public class ConsistentHashShardRouter : IShardRouter
{
    private readonly SortedDictionary<int, string> ring;
    private readonly int virtualNodesPerShard;

    public ConsistentHashShardRouter(IEnumerable<string> shards, int virtualNodesPerShard = 150)
    {
        this.virtualNodesPerShard = virtualNodesPerShard;
        this.ring = new SortedDictionary<int, string>();

        foreach (var shard in shards)
        {
            AddShard(shard);
        }
    }

    private void AddShard(string shard)
    {
        // Add virtual nodes for better distribution
        for (int i = 0; i < virtualNodesPerShard; i++)
        {
            string virtualNode = $"{shard}#{i}";
            int hash = GetHash(virtualNode);
            ring[hash] = shard;
        }
    }

    public string GetShard(int userId)
    {
        int hash = GetHash(userId.ToString());

        // Find first node clockwise from hash
        foreach (var kvp in ring)
        {
            if (kvp.Key >= hash)
                return kvp.Value;
        }

        // Wrap around to first node
        return ring.First().Value;
    }

    public IEnumerable<string> GetAllShards() => ring.Values.Distinct();

    private int GetHash(string key)
    {
        using var md5 = MD5.Create();
        byte[] hashBytes = md5.ComputeHash(Encoding.UTF8.GetBytes(key));
        return BitConverter.ToInt32(hashBytes, 0);
    }

    // Add new shard with minimal data movement
    public void AddNewShard(string newShard)
    {
        AddShard(newShard);
        Console.WriteLine($"Added {newShard} to the ring. Only ~1/{ring.Values.Distinct().Count()} of data needs to move.");
    }
}
```

**C# Implementation - Handling Cross-Shard Transactions:**

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

public class CrossShardTransactionManager
{
    private readonly ShardedDbContext shardedDb;

    public CrossShardTransactionManager(ShardedDbContext shardedDb)
    {
        this.shardedDb = shardedDb;
    }

    // Two-Phase Commit pattern for cross-shard transactions
    public async Task<bool> TransferMoneyAsync(
        int fromUserId,
        int toUserId,
        decimal amount)
    {
        var transactions = new List<IDbContextTransaction>();

        try
        {
            // Phase 1: Prepare (acquire locks on both shards)
            var fromContext = shardedDb.GetContext(fromUserId);
            var toContext = shardedDb.GetContext(toUserId);

            var fromTx = await fromContext.Database.BeginTransactionAsync();
            var toTx = await toContext.Database.BeginTransactionAsync();

            transactions.Add(fromTx);
            transactions.Add(toTx);

            // Debit from first shard
            var fromAccount = await fromContext.Accounts.FindAsync(fromUserId);
            if (fromAccount.Balance < amount)
            {
                throw new InvalidOperationException("Insufficient funds");
            }
            fromAccount.Balance -= amount;

            // Credit to second shard
            var toAccount = await toContext.Accounts.FindAsync(toUserId);
            toAccount.Balance += amount;

            // Save changes (still in transaction)
            await fromContext.SaveChangesAsync();
            await toContext.SaveChangesAsync();

            // Phase 2: Commit both transactions
            await fromTx.CommitAsync();
            await toTx.CommitAsync();

            return true;
        }
        catch (Exception ex)
        {
            // Rollback all transactions
            foreach (var tx in transactions)
            {
                await tx.RollbackAsync();
            }

            Console.WriteLine($"Cross-shard transaction failed: {ex.Message}");
            return false;
        }
        finally
        {
            // Cleanup
            foreach (var tx in transactions)
            {
                await tx.DisposeAsync();
            }
        }
    }

    // Saga pattern for eventual consistency
    public async Task<bool> CreateOrderWithSagaAsync(int userId, Order order)
    {
        var steps = new List<Func<Task>>();
        var compensations = new List<Func<Task>>();

        try
        {
            // Step 1: Reserve inventory (shard 1)
            steps.Add(async () => await ReserveInventoryAsync(order));
            compensations.Add(async () => await ReleaseInventoryAsync(order));

            // Step 2: Charge user (shard 2)
            steps.Add(async () => await ChargeUserAsync(userId, order.Total));
            compensations.Add(async () => await RefundUserAsync(userId, order.Total));

            // Step 3: Create order record (shard 3)
            steps.Add(async () => await CreateOrderRecordAsync(order));
            compensations.Add(async () => await DeleteOrderRecordAsync(order.Id));

            // Execute all steps
            foreach (var step in steps)
            {
                await step();
            }

            return true;
        }
        catch (Exception ex)
        {
            // Execute compensating transactions in reverse order
            compensations.Reverse();
            foreach (var compensation in compensations)
            {
                try
                {
                    await compensation();
                }
                catch (Exception compEx)
                {
                    Console.WriteLine($"Compensation failed: {compEx.Message}");
                }
            }

            return false;
        }
    }

    private async Task ReserveInventoryAsync(Order order) { /* ... */ }
    private async Task ReleaseInventoryAsync(Order order) { /* ... */ }
    private async Task ChargeUserAsync(int userId, decimal amount) { /* ... */ }
    private async Task RefundUserAsync(int userId, decimal amount) { /* ... */ }
    private async Task CreateOrderRecordAsync(Order order) { /* ... */ }
    private async Task DeleteOrderRecordAsync(int orderId) { /* ... */ }
}
```

