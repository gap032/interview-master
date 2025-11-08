# Bazy Danych - Pytania Poziom Principal

## 1. Design Distributed Database with Consensus

**Pytanie**: Design a distributed database ensuring consistency across nodes using consensus algorithms.

**Odpowiedź**:

**Consensus Algorithms:**

**Raft Consensus:**
```
1. Leader election
2. Log replication
3. Safety guarantees
```

**Write Process:**
```
Client → Leader → Replicate to majority → Commit → Respond to client
```

**Key Properties:**
- Strong consistency
- Fault tolerance (tolerates f failures in 2f+1 nodes)
- Leader-based (simpler than Paxos)

**Trade-offs:**
- Latency: Requires majority acknowledgment
- Availability: Can't write during partition without majority
- CAP theorem: Choose CP (consistency + partition tolerance)

**C# Implementation - Distributed Consensus Concepts:**

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

// Simplified Raft-like consensus implementation (educational purposes)
public enum NodeState
{
    Follower,
    Candidate,
    Leader
}

public class RaftNode
{
    private readonly int nodeId;
    private readonly List<RaftNode> cluster;
    private NodeState state;
    private int currentTerm;
    private int? votedFor;
    private int? leaderId;
    private readonly List<LogEntry> log;

    public RaftNode(int nodeId, List<RaftNode> cluster)
    {
        this.nodeId = nodeId;
        this.cluster = cluster;
        this.state = NodeState.Follower;
        this.currentTerm = 0;
        this.votedFor = null;
        this.leaderId = null;
        this.log = new List<LogEntry>();
    }

    // Simplified leader election
    public async Task<bool> StartElectionAsync()
    {
        state = NodeState.Candidate;
        currentTerm++;
        votedFor = nodeId;

        Console.WriteLine($"Node {nodeId}: Starting election for term {currentTerm}");

        int votesReceived = 1; // Vote for self
        int majority = (cluster.Count / 2) + 1;

        // Request votes from other nodes
        var tasks = cluster
            .Where(node => node.nodeId != nodeId)
            .Select(node => node.RequestVoteAsync(currentTerm, nodeId));

        var votes = await Task.WhenAll(tasks);
        votesReceived += votes.Count(v => v);

        if (votesReceived >= majority)
        {
            state = NodeState.Leader;
            leaderId = nodeId;
            Console.WriteLine($"Node {nodeId}: Elected as leader with {votesReceived} votes");
            return true;
        }
        else
        {
            state = NodeState.Follower;
            Console.WriteLine($"Node {nodeId}: Lost election with {votesReceived} votes");
            return false;
        }
    }

    // Vote RPC
    public Task<bool> RequestVoteAsync(int term, int candidateId)
    {
        if (term > currentTerm)
        {
            currentTerm = term;
            votedFor = null;
            state = NodeState.Follower;
        }

        if (votedFor == null || votedFor == candidateId)
        {
            votedFor = candidateId;
            Console.WriteLine($"Node {nodeId}: Voted for {candidateId} in term {term}");
            return Task.FromResult(true);
        }

        return Task.FromResult(false);
    }

    // Append entry (simplified write operation)
    public async Task<bool> AppendEntryAsync(LogEntry entry)
    {
        if (state != NodeState.Leader)
        {
            Console.WriteLine($"Node {nodeId}: Not a leader, cannot append");
            return false;
        }

        // Add to local log
        log.Add(entry);
        Console.WriteLine($"Node {nodeId} (Leader): Added entry to log: {entry.Data}");

        // Replicate to majority of followers
        int successCount = 1; // Self
        int majority = (cluster.Count / 2) + 1;

        var tasks = cluster
            .Where(node => node.nodeId != nodeId)
            .Select(node => node.ReplicateLogAsync(entry, currentTerm, nodeId));

        var results = await Task.WhenAll(tasks);
        successCount += results.Count(r => r);

        if (successCount >= majority)
        {
            entry.Committed = true;
            Console.WriteLine($"Node {nodeId} (Leader): Entry committed with {successCount} replicas");
            return true;
        }
        else
        {
            Console.WriteLine($"Node {nodeId} (Leader): Failed to commit entry, only {successCount} replicas");
            return false;
        }
    }

    // Replicate log entry (follower receives from leader)
    public Task<bool> ReplicateLogAsync(LogEntry entry, int leaderTerm, int leaderId)
    {
        if (leaderTerm >= currentTerm)
        {
            currentTerm = leaderTerm;
            this.leaderId = leaderId;
            state = NodeState.Follower;

            log.Add(entry);
            Console.WriteLine($"Node {nodeId} (Follower): Replicated entry from leader {leaderId}: {entry.Data}");
            return Task.FromResult(true);
        }

        return Task.FromResult(false);
    }
}

public class LogEntry
{
    public int Index { get; set; }
    public int Term { get; set; }
    public string Data { get; set; }
    public bool Committed { get; set; }
}

// Usage example
public class DistributedDatabaseExample
{
    static async Task Main()
    {
        // Create a 5-node cluster
        var cluster = new List<RaftNode>();
        for (int i = 0; i < 5; i++)
        {
            cluster.Add(new RaftNode(i, cluster));
        }

        // Node 0 starts an election
        bool elected = await cluster[0].StartElectionAsync();

        if (elected)
        {
            // Leader writes data
            var entry = new LogEntry
            {
                Index = 1,
                Term = 1,
                Data = "INSERT INTO users VALUES (1, 'Alice')",
                Committed = false
            };

            bool committed = await cluster[0].AppendEntryAsync(entry);
            Console.WriteLine($"Write operation committed: {committed}");
        }

        // Demonstrates:
        // - Leader election with majority vote
        // - Log replication to followers
        // - Commit only after majority acknowledgment
        // - Strong consistency (all nodes have same data)
    }
}

// CAP Theorem Trade-offs in C# Context
public class CAPTheorem
{
    // CP (Consistency + Partition Tolerance): Raft, Paxos
    // Example: Refuse writes during network partition
    public async Task<bool> ConsistentWriteAsync(string data)
    {
        // Must get majority acknowledgment
        // If partition prevents majority: refuse write
        // Guarantees: All nodes see same data OR write fails

        try
        {
            return await WriteWithMajorityAsync(data);
        }
        catch (PartitionException)
        {
            Console.WriteLine("Cannot achieve majority, refusing write");
            return false; // Sacrifice availability for consistency
        }
    }

    // AP (Availability + Partition Tolerance): Dynamo, Cassandra
    // Example: Accept writes during partition, resolve conflicts later
    public async Task<bool> AvailableWriteAsync(string data)
    {
        // Always accept write, even during partition
        // Use vector clocks for conflict resolution
        // Guarantees: Always writable, may have temporary inconsistency

        await WriteToLocalNodeAsync(data);
        _ = ReplicateEventuallyAsync(data); // Fire and forget

        return true; // Sacrifice consistency for availability
    }

    private Task<bool> WriteWithMajorityAsync(string data) => Task.FromResult(true);
    private Task WriteToLocalNodeAsync(string data) => Task.CompletedTask;
    private Task ReplicateEventuallyAsync(string data) => Task.CompletedTask;
}

// Quorum-based reads/writes (Cassandra-style)
public class QuorumDatabase
{
    private readonly int replicationFactor = 3;

    public async Task WriteWithQuorumAsync(string key, string value)
    {
        // W + R > N ensures strong consistency
        // W = write quorum, R = read quorum, N = replication factor

        int writeQuorum = 2; // (replicationFactor / 2) + 1
        var tasks = new List<Task>();

        // Write to multiple replicas
        for (int i = 0; i < replicationFactor; i++)
        {
            tasks.Add(WriteToReplicaAsync(i, key, value));
        }

        // Wait for quorum
        var completed = await Task.WhenAny(
            Task.WhenAll(tasks.Take(writeQuorum)),
            Task.Delay(TimeSpan.FromSeconds(5))
        );

        Console.WriteLine($"Write completed to {writeQuorum}/{replicationFactor} replicas");
    }

    public async Task<string> ReadWithQuorumAsync(string key)
    {
        int readQuorum = 2;
        var tasks = Enumerable.Range(0, replicationFactor)
            .Select(i => ReadFromReplicaAsync(i, key))
            .ToList();

        // Read from quorum, return most recent value
        var results = await Task.WhenAll(tasks.Take(readQuorum));
        return results.OrderByDescending(r => r.timestamp).First().value;
    }

    private Task WriteToReplicaAsync(int replicaId, string key, string value)
    {
        Console.WriteLine($"Writing to replica {replicaId}: {key}={value}");
        return Task.CompletedTask;
    }

    private Task<(string value, long timestamp)> ReadFromReplicaAsync(int replicaId, string key)
    {
        return Task.FromResult((value: "data", timestamp: DateTimeOffset.UtcNow.ToUnixTimeSeconds()));
    }
}
```

