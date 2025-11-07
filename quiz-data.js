// Quiz Questions Database - Bilingual (PL/EN)
const quizQuestionsData = {
    en: [
        // Data Structures & Algorithms - Mid Level
        {
            category: "algorithms",
            level: "mid",
            question: "What is the time complexity of searching in a BST (Binary Search Tree) in the worst case?",
            answers: [
                "O(1)",
                "O(log n)",
                "O(n)",
                "O(n log n)"
            ],
            correct: 2,
            explanation: "In the worst case, when the BST is degenerate (all nodes on one side), searching requires traversing all n nodes, giving O(n)."
        },
        {
            category: "algorithms",
            level: "mid",
            question: "Which data structure is best for implementing an LRU Cache?",
            answers: [
                "Stack",
                "Queue",
                "Hash Map + Doubly Linked List",
                "Binary Tree"
            ],
            correct: 2,
            explanation: "LRU Cache requires O(1) access (Hash Map) and O(1) order updates (Doubly Linked List). The combination of both structures provides optimal performance."
        },
        {
            category: "algorithms",
            level: "mid",
            question: "What is the difference between BFS (Breadth-First Search) and DFS (Depth-First Search)?",
            answers: [
                "BFS uses a stack, DFS uses a queue",
                "BFS uses a queue, DFS uses a stack",
                "Both use a queue",
                "Both use a stack"
            ],
            correct: 1,
            explanation: "BFS searches level by level using a queue (FIFO), DFS searches depth-first using a stack (LIFO) or recursion."
        },
        {
            category: "algorithms",
            level: "mid",
            question: "Which data structure is most efficient for implementing a priority queue?",
            answers: [
                "Array",
                "Linked List",
                "Binary Heap",
                "Hash Table"
            ],
            correct: 2,
            explanation: "Binary Heap offers O(log n) for insert and delete-min/max, which is optimal for priority queue. Array and Linked List require O(n) for some operations."
        },
        {
            category: "algorithms",
            level: "mid",
            question: "What is the space complexity of merge sort?",
            answers: [
                "O(1)",
                "O(log n)",
                "O(n)",
                "O(n²)"
            ],
            correct: 2,
            explanation: "Merge sort requires O(n) additional space to merge the subarrays during the sorting process."
        },
        {
            category: "algorithms",
            level: "mid",
            question: "Which algorithm is used to find the shortest path in a weighted graph with positive weights?",
            answers: [
                "BFS",
                "DFS",
                "Dijkstra's Algorithm",
                "Quick Sort"
            ],
            correct: 2,
            explanation: "Dijkstra's algorithm efficiently finds the shortest path in weighted graphs with non-negative weights using a greedy approach."
        },

        // Data Structures & Algorithms - Senior Level
        {
            category: "algorithms",
            level: "senior",
            question: "Which sorting algorithm has the best worst-case complexity for nearly sorted data?",
            answers: [
                "Quick Sort",
                "Merge Sort",
                "Bubble Sort",
                "Insertion Sort"
            ],
            correct: 1,
            explanation: "Merge Sort guarantees O(n log n) in the worst case. Quick Sort can have O(n²), and Bubble Sort is always O(n²). Insertion Sort is O(n²), but O(n) for nearly sorted data."
        },
        {
            category: "algorithms",
            level: "senior",
            question: "In Dijkstra's algorithm, why can't we use negative edge weights?",
            answers: [
                "The algorithm will always return an error",
                "The greedy approach may choose suboptimal paths",
                "The implementation will be too complex",
                "Time complexity becomes exponential"
            ],
            correct: 1,
            explanation: "Dijkstra uses a greedy approach and assumes that once a vertex is visited, it has the shortest path. Negative weights can make later paths shorter."
        },
        {
            category: "algorithms",
            level: "senior",
            question: "What is 'Amortized Time Complexity'?",
            answers: [
                "Worst case for an operation",
                "Average cost of an operation in a sequence of operations",
                "Best case for an operation",
                "Space complexity"
            ],
            correct: 1,
            explanation: "Amortized time is the average cost per operation in a long sequence. E.g., dynamic array resize is O(n) but amortized O(1) for append."
        },
        {
            category: "algorithms",
            level: "senior",
            question: "What is the time complexity of finding the kth smallest element using QuickSelect?",
            answers: [
                "O(n log n)",
                "O(n) average, O(n²) worst case",
                "O(k log n)",
                "O(n + k)"
            ],
            correct: 1,
            explanation: "QuickSelect has O(n) average time complexity but can degrade to O(n²) in worst case without randomization, similar to QuickSort."
        },
        {
            category: "algorithms",
            level: "senior",
            question: "What data structure would you use to implement an autocomplete feature efficiently?",
            answers: [
                "Hash Map",
                "Binary Search Tree",
                "Trie (Prefix Tree)",
                "Array"
            ],
            correct: 2,
            explanation: "A Trie is optimal for autocomplete as it allows O(k) lookup time where k is the length of the prefix, and efficiently stores shared prefixes."
        },

        // System Design - Mid Level
        {
            category: "system-design",
            level: "mid",
            question: "Which caching strategy is most appropriate for applications with frequent reads and rare writes?",
            answers: [
                "Write-through",
                "Write-behind",
                "Cache-aside (Lazy Loading)",
                "Write-around"
            ],
            correct: 2,
            explanation: "Cache-aside (Lazy Loading) is ideal for frequent reads - data is loaded into cache only when needed, minimizing unnecessary cache writes."
        },
        {
            category: "system-design",
            level: "mid",
            question: "What is the 'thundering herd problem' in the context of caching?",
            answers: [
                "Too many requests to cache cause it to overflow",
                "Many requests simultaneously try to refresh the same expired cache key",
                "Cache is too small for the number of users",
                "Distributed cache loses synchronization"
            ],
            correct: 1,
            explanation: "Thundering herd occurs when a cache key expires and many requests simultaneously try to refresh it, causing a spike in database load."
        },
        {
            category: "system-design",
            level: "mid",
            question: "What is the primary purpose of a Load Balancer?",
            answers: [
                "Increase application security",
                "Distribute traffic across multiple servers",
                "Compress data sent to clients",
                "Monitor application performance"
            ],
            correct: 1,
            explanation: "A Load Balancer distributes incoming network traffic across multiple servers, increasing performance and availability."
        },
        {
            category: "system-design",
            level: "mid",
            question: "Which sharding strategy ensures the most even data distribution?",
            answers: [
                "Range-based sharding",
                "Hash-based sharding",
                "Geographic sharding",
                "List-based sharding"
            ],
            correct: 1,
            explanation: "Hash-based sharding uses a hash function for even data distribution. Range-based can create hotspots if keys aren't evenly distributed."
        },
        {
            category: "system-design",
            level: "mid",
            question: "What is horizontal scaling?",
            answers: [
                "Increasing the power of existing servers",
                "Adding more servers to distribute load",
                "Optimizing database queries",
                "Compressing data"
            ],
            correct: 1,
            explanation: "Horizontal scaling means adding more servers to distribute the load, while vertical scaling means increasing the power of existing servers."
        },
        {
            category: "system-design",
            level: "mid",
            question: "What is the purpose of a CDN (Content Delivery Network)?",
            answers: [
                "Store user data permanently",
                "Cache static content closer to users geographically",
                "Process backend logic",
                "Manage database connections"
            ],
            correct: 1,
            explanation: "A CDN caches static content (images, CSS, JS) on servers geographically closer to users, reducing latency and improving load times."
        },

        // System Design - Senior Level
        {
            category: "system-design",
            level: "senior",
            question: "Which of the following is NOT a good practice for designing microservices?",
            answers: [
                "Each service has its own database",
                "Services communicate via REST or message queue",
                "All services share a common business logic library",
                "Services are independently deployed"
            ],
            correct: 2,
            explanation: "Sharing a common business logic library creates coupling between services and makes independent development and deployment difficult."
        },
        {
            category: "system-design",
            level: "senior",
            question: "In CAP theorem, what does 'P' (Partition Tolerance) mean?",
            answers: [
                "System operates despite loss of some data partitions",
                "System continues operating despite network issues between nodes",
                "System can be geographically partitioned",
                "System tolerates partial writes"
            ],
            correct: 1,
            explanation: "Partition Tolerance means the system continues to operate even when there are network communication problems between nodes (network partition)."
        },
        {
            category: "system-design",
            level: "senior",
            question: "What is the main difference between SQL and NoSQL databases?",
            answers: [
                "SQL is always faster",
                "NoSQL can't handle complex queries",
                "SQL uses fixed schema, NoSQL offers flexible schema",
                "NoSQL doesn't support transactions"
            ],
            correct: 2,
            explanation: "SQL databases require a predefined schema while NoSQL databases offer flexible, schema-less data models. Both have their use cases."
        },
        {
            category: "system-design",
            level: "senior",
            question: "What is database denormalization and when should it be used?",
            answers: [
                "Removing all relationships between tables",
                "Adding redundant data to reduce joins and improve read performance",
                "Converting SQL to NoSQL",
                "Removing indexes"
            ],
            correct: 1,
            explanation: "Denormalization adds redundant data to reduce expensive joins, improving read performance at the cost of write complexity and storage."
        },
        {
            category: "system-design",
            level: "senior",
            question: "What is the purpose of a message queue in distributed systems?",
            answers: [
                "Store permanent data",
                "Enable asynchronous communication and decouple services",
                "Replace databases",
                "Compress network traffic"
            ],
            correct: 1,
            explanation: "Message queues enable asynchronous, decoupled communication between services, improving reliability and scalability through buffering."
        },

        // Programming Languages - Mid Level
        {
            category: "programming",
            level: "mid",
            question: "What is a 'closure' in JavaScript?",
            answers: [
                "A function that automatically closes network connections",
                "A function that has access to variables from its outer scope",
                "A method to end program execution",
                "A data type for storing functions"
            ],
            correct: 1,
            explanation: "A closure is a function that 'remembers' variables from its outer scope, even after the outer function has finished executing."
        },
        {
            category: "programming",
            level: "mid",
            question: "What is the difference between '==' and '===' in JavaScript?",
            answers: [
                "There is no difference",
                "== compares value and type, === only value",
                "=== compares value and type, == only value",
                "== is faster than ==="
            ],
            correct: 2,
            explanation: "=== (strict equality) compares both value AND type, while == (loose equality) performs type coercion before comparison."
        },
        {
            category: "programming",
            level: "mid",
            question: "What is the 'GIL' (Global Interpreter Lock) in Python?",
            answers: [
                "Garbage collection mechanism",
                "A mutex preventing parallel execution of Python bytecode",
                "Memory management system",
                "Debugging tool"
            ],
            correct: 1,
            explanation: "GIL is a mutex that allows only one thread at a time to execute Python bytecode, limiting multithreading in CPU-bound tasks."
        },
        {
            category: "programming",
            level: "mid",
            question: "What is a 'Promise' in JavaScript?",
            answers: [
                "A synchronous function",
                "An object representing eventual completion (or failure) of an asynchronous operation",
                "A data type for storing values",
                "An error handling mechanism"
            ],
            correct: 1,
            explanation: "A Promise is an object representing the eventual completion or failure of an asynchronous operation, with chaining via .then() and .catch()."
        },
        {
            category: "programming",
            level: "mid",
            question: "What does 'immutability' mean in programming?",
            answers: [
                "Variables can't be declared",
                "Data can't be changed after creation",
                "Functions can't be called",
                "Code can't be refactored"
            ],
            correct: 1,
            explanation: "Immutability means that once data is created, it cannot be changed. Any modification creates a new copy, improving predictability and debugging."
        },
        {
            category: "programming",
            level: "mid",
            question: "What is the purpose of 'async/await' in JavaScript?",
            answers: [
                "To make code run faster",
                "To write asynchronous code in a synchronous style",
                "To create parallel threads",
                "To handle errors"
            ],
            correct: 1,
            explanation: "Async/await is syntactic sugar over Promises that allows writing asynchronous code in a more readable, synchronous-looking style."
        },

        // Programming Languages - Senior Level
        {
            category: "programming",
            level: "senior",
            question: "Which type of garbage collector does Java use by default in newer versions?",
            answers: [
                "Serial GC",
                "Parallel GC",
                "G1GC",
                "CMS (Concurrent Mark Sweep)"
            ],
            correct: 2,
            explanation: "Since Java 9, G1GC (Garbage-First) is the default garbage collector, designed for low latency and large heaps."
        },
        {
            category: "programming",
            level: "senior",
            question: "What is 'Type Erasure' in Java Generics?",
            answers: [
                "A compilation error with incorrect generic types",
                "Generic type information is removed at runtime",
                "Automatic type conversion",
                "A code deduplication mechanism"
            ],
            correct: 1,
            explanation: "Type Erasure means generic type information is removed during compilation and isn't available at runtime, which is a backward compatibility feature."
        },
        {
            category: "programming",
            level: "senior",
            question: "What is the difference between 'stack' and 'heap' memory?",
            answers: [
                "Stack is slower than heap",
                "Stack is for local variables, heap for dynamically allocated objects",
                "Heap is only for integers",
                "There is no difference"
            ],
            correct: 1,
            explanation: "Stack memory stores local variables and function calls (LIFO), while heap stores dynamically allocated objects with manual or garbage-collected management."
        },
        {
            category: "programming",
            level: "senior",
            question: "What is a 'race condition'?",
            answers: [
                "When code executes too fast",
                "When multiple threads access shared data simultaneously causing unpredictable results",
                "When a function runs in a loop",
                "When network requests timeout"
            ],
            correct: 1,
            explanation: "A race condition occurs when multiple threads access and modify shared data concurrently, leading to unpredictable behavior depending on timing."
        },
        {
            category: "programming",
            level: "senior",
            question: "What is functional programming's main principle?",
            answers: [
                "Using only functions, no classes",
                "Avoiding mutable state and side effects",
                "Writing short functions",
                "Using only pure JavaScript"
            ],
            correct: 1,
            explanation: "Functional programming emphasizes immutability, pure functions (no side effects), and treating functions as first-class citizens."
        },

        // Architecture - Mid Level
        {
            category: "architecture",
            level: "mid",
            question: "What is the 'Circuit Breaker Pattern'?",
            answers: [
                "A security pattern protecting against SQL injection",
                "A pattern preventing cascade failures in distributed systems",
                "A mechanism for closing network connections",
                "A load balancing algorithm"
            ],
            correct: 1,
            explanation: "Circuit Breaker monitors calls to external services and 'opens the circuit' when detecting too many failures, preventing cascade failures."
        },
        {
            category: "architecture",
            level: "mid",
            question: "Which layer in a multi-tier architecture handles business logic?",
            answers: [
                "Presentation Layer",
                "Business/Application Layer",
                "Data Access Layer",
                "Database Layer"
            ],
            correct: 1,
            explanation: "The Business/Application Layer contains application business logic, processing data between the presentation and data layers."
        },
        {
            category: "architecture",
            level: "mid",
            question: "What is an 'API Gateway' in microservices architecture?",
            answers: [
                "A database for APIs",
                "A single entry point for all clients to microservices",
                "A monitoring tool",
                "A testing framework"
            ],
            correct: 1,
            explanation: "An API Gateway is a single entry point handling routing, authentication, rate limiting, and request aggregation to multiple microservices."
        },
        {
            category: "architecture",
            level: "mid",
            question: "What is the MVC (Model-View-Controller) pattern?",
            answers: [
                "A database design pattern",
                "A separation of data, presentation, and logic layers",
                "A testing methodology",
                "A deployment strategy"
            ],
            correct: 1,
            explanation: "MVC separates applications into Model (data), View (presentation), and Controller (logic), improving maintainability and testability."
        },
        {
            category: "architecture",
            level: "mid",
            question: "What is 'dependency injection'?",
            answers: [
                "Adding new libraries to a project",
                "Providing dependencies to a class from outside rather than creating them internally",
                "Installing npm packages",
                "A type of SQL injection"
            ],
            correct: 1,
            explanation: "Dependency Injection provides dependencies from outside rather than having classes create them, improving testability and loose coupling."
        },

        // Architecture - Senior Level
        {
            category: "architecture",
            level: "senior",
            question: "In Event Sourcing, how do you rebuild the current application state?",
            answers: [
                "Read from cache",
                "Replay all events from the beginning",
                "Read the last snapshot and replay events from that point",
                "Query the read model"
            ],
            correct: 2,
            explanation: "In Event Sourcing, state is rebuilt by replaying events. For performance, snapshots are used and only events since the last snapshot are replayed."
        },
        {
            category: "architecture",
            level: "senior",
            question: "What is the 'Saga Pattern' in microservices?",
            answers: [
                "A pattern for handling long-running operations",
                "A mechanism for distributed transactions through a sequence of local transactions",
                "An event logging system",
                "A caching pattern"
            ],
            correct: 1,
            explanation: "Saga Pattern manages distributed transactions as a sequence of local transactions, with compensating transactions in case of failure."
        },
        {
            category: "architecture",
            level: "senior",
            question: "What is CQRS (Command Query Responsibility Segregation)?",
            answers: [
                "A database replication strategy",
                "Separating read and write operations into different models",
                "A caching technique",
                "A security pattern"
            ],
            correct: 1,
            explanation: "CQRS separates read (Query) and write (Command) operations, allowing independent optimization and scaling of each."
        },
        {
            category: "architecture",
            level: "senior",
            question: "What is the 'Strangler Fig Pattern'?",
            answers: [
                "A performance optimization technique",
                "Gradually replacing a legacy system by routing traffic to new services",
                "A database migration strategy",
                "A testing approach"
            ],
            correct: 1,
            explanation: "Strangler Fig Pattern gradually replaces legacy systems by incrementally routing functionality to new services, reducing risk."
        },
        {
            category: "architecture",
            level: "senior",
            question: "What is idempotency in API design?",
            answers: [
                "APIs that never fail",
                "Operations that produce the same result when called multiple times",
                "Fast API responses",
                "Cached API calls"
            ],
            correct: 1,
            explanation: "Idempotent operations produce the same result regardless of how many times they're executed, crucial for reliability in distributed systems."
        },

        // Databases - Mid Level
        {
            category: "databases",
            level: "mid",
            question: "Which transaction isolation level prevents 'dirty reads'?",
            answers: [
                "Read Uncommitted",
                "Read Committed",
                "Repeatable Read",
                "Serializable"
            ],
            correct: 1,
            explanation: "Read Committed and higher levels prevent dirty reads. Read Uncommitted allows reading uncommitted data."
        },
        {
            category: "databases",
            level: "mid",
            question: "What is a 'database index' and how does it affect performance?",
            answers: [
                "Speeds up INSERT, slows down SELECT",
                "Speeds up SELECT, slows down INSERT/UPDATE/DELETE",
                "Speeds up all operations",
                "Has no impact on performance"
            ],
            correct: 1,
            explanation: "An index speeds up SELECT operations through faster searching but slows INSERT/UPDATE/DELETE due to index maintenance overhead."
        },
        {
            category: "databases",
            level: "mid",
            question: "When should you use NoSQL instead of SQL?",
            answers: [
                "When you need ACID transactions",
                "When data is highly relational with many JOINs",
                "When schema changes frequently or data is hierarchical",
                "Always - NoSQL is better than SQL"
            ],
            correct: 2,
            explanation: "NoSQL is good for flexible schemas, hierarchical data, and horizontal scaling. SQL is better for structured data and complex queries."
        },
        {
            category: "databases",
            level: "mid",
            question: "What is 'ACID' in the context of databases?",
            answers: [
                "Advanced Computing Interface Design",
                "Atomicity, Consistency, Isolation, Durability",
                "Automated Cache Invalidation Database",
                "Application Code Integration Design"
            ],
            correct: 1,
            explanation: "ACID properties of transactions: Atomicity (all or nothing), Consistency (valid state), Isolation (independent), Durability (permanent)."
        },
        {
            category: "databases",
            level: "mid",
            question: "What is database normalization?",
            answers: [
                "Making all data lowercase",
                "Organizing data to reduce redundancy and improve integrity",
                "Backing up the database",
                "Optimizing query performance"
            ],
            correct: 1,
            explanation: "Normalization is organizing database schema to reduce data redundancy and improve data integrity by dividing tables and establishing relationships."
        },
        {
            category: "databases",
            level: "mid",
            question: "What is the N+1 query problem?",
            answers: [
                "Making N+1 database queries instead of using joins",
                "Having N+1 database tables",
                "A mathematical formula",
                "A backup strategy"
            ],
            correct: 0,
            explanation: "N+1 problem occurs when you make 1 query to fetch N items, then N additional queries to fetch related data, instead of using joins."
        },

        // Databases - Senior Level
        {
            category: "databases",
            level: "senior",
            question: "What is 'database sharding' and what is the main problem with it?",
            answers: [
                "Data replication; problem: consistency",
                "Splitting data into smaller parts; problem: cross-shard queries",
                "Data compression; problem: performance",
                "Data backup; problem: storage"
            ],
            correct: 1,
            explanation: "Sharding splits data across multiple servers. The main problem is cross-shard queries and distributed transactions, which are slow and complex."
        },
        {
            category: "databases",
            level: "senior",
            question: "What does a system guarantee with eventual consistency?",
            answers: [
                "Data is always consistent immediately",
                "Data will be consistent at some undefined future time",
                "Data will never be consistent",
                "Only the last write is preserved"
            ],
            correct: 1,
            explanation: "Eventual consistency guarantees that if no new writes are made, all replicas will eventually become consistent, but not immediately."
        },
        {
            category: "databases",
            level: "senior",
            question: "What is a database transaction deadlock?",
            answers: [
                "When a database crashes",
                "When two transactions wait for each other to release locks",
                "When queries are too slow",
                "When disk space runs out"
            ],
            correct: 1,
            explanation: "A deadlock occurs when two or more transactions are waiting for each other to release locks, creating a circular dependency."
        },
        {
            category: "databases",
            level: "senior",
            question: "What is the difference between clustered and non-clustered indexes?",
            answers: [
                "No difference",
                "Clustered determines physical order, non-clustered is a separate structure",
                "Clustered is faster",
                "Non-clustered uses more memory"
            ],
            correct: 1,
            explanation: "Clustered index determines the physical order of data in the table (one per table), while non-clustered indexes are separate structures pointing to data."
        },
        {
            category: "databases",
            level: "senior",
            question: "What is database replication lag?",
            answers: [
                "Slow query execution",
                "Delay between write on primary and visibility on replicas",
                "Network latency",
                "Backup time"
            ],
            correct: 1,
            explanation: "Replication lag is the time delay between when data is written to the primary database and when it becomes available on replica servers."
        },

        // DevOps - Mid Level
        {
            category: "devops",
            level: "mid",
            question: "What is a 'Docker container'?",
            answers: [
                "A virtual machine with a full OS",
                "A lightweight, isolated process with its own dependencies",
                "A type of database",
                "A continuous integration tool"
            ],
            correct: 1,
            explanation: "A container is an isolated process using the host kernel, lighter than a VM, containing an application and all its dependencies."
        },
        {
            category: "devops",
            level: "mid",
            question: "What is the difference between CI and CD?",
            answers: [
                "CI is Continuous Integration, CD is Continuous Deployment/Delivery",
                "No difference, they're synonyms",
                "CI is for frontend, CD for backend",
                "CI is faster than CD"
            ],
            correct: 0,
            explanation: "CI (Continuous Integration) is automated building and testing of code. CD is Continuous Delivery (ready to deploy) or Deployment (automatic deployment)."
        },
        {
            category: "devops",
            level: "mid",
            question: "What is 'Infrastructure as Code' (IaC)?",
            answers: [
                "Writing infrastructure in JavaScript",
                "Managing infrastructure through code instead of manual configuration",
                "Deploying code to servers",
                "Monitoring infrastructure"
            ],
            correct: 1,
            explanation: "IaC is managing and provisioning infrastructure through configuration files (e.g., Terraform, CloudFormation) instead of manual configuration."
        },
        {
            category: "devops",
            level: "mid",
            question: "What is a 'Kubernetes Service'?",
            answers: [
                "A type of container",
                "An abstraction defining a logical set of Pods and how to access them",
                "A storage volume",
                "A configuration file"
            ],
            correct: 1,
            explanation: "A Service in Kubernetes is an abstraction providing a stable endpoint (IP/DNS) for a group of Pods, enabling load balancing and service discovery."
        },
        {
            category: "devops",
            level: "mid",
            question: "What is the purpose of a reverse proxy?",
            answers: [
                "Hiding client IP addresses",
                "Sitting in front of servers to handle requests, SSL termination, load balancing",
                "Storing cache",
                "Running tests"
            ],
            correct: 1,
            explanation: "A reverse proxy sits in front of servers, handling incoming requests, SSL termination, load balancing, and caching before forwarding to backend servers."
        },
        {
            category: "devops",
            level: "mid",
            question: "What is Docker Compose used for?",
            answers: [
                "Building Docker images faster",
                "Defining and running multi-container applications",
                "Monitoring containers",
                "Deploying to production"
            ],
            correct: 1,
            explanation: "Docker Compose is a tool for defining and running multi-container Docker applications using a YAML configuration file."
        },

        // DevOps - Senior Level
        {
            category: "devops",
            level: "senior",
            question: "What is 'Blue-Green Deployment'?",
            answers: [
                "Deployment with two colors in UI",
                "A deployment strategy with two identical environments",
                "A type of load balancing",
                "A database backup strategy"
            ],
            correct: 1,
            explanation: "Blue-Green Deployment uses two identical environments. The new version is deployed to the inactive (green) environment, then traffic is switched."
        },
        {
            category: "devops",
            level: "senior",
            question: "In Kubernetes, what is a 'Pod'?",
            answers: [
                "A single container",
                "The smallest deployment unit - a group of containers",
                "A load balancer",
                "A volume for storing data"
            ],
            correct: 1,
            explanation: "A Pod is the smallest unit in Kubernetes, containing one or more tightly coupled containers sharing network and storage."
        },
        {
            category: "devops",
            level: "senior",
            question: "What is canary deployment?",
            answers: [
                "Deploying only during the day",
                "Gradually rolling out changes to a small subset of users before full deployment",
                "A backup strategy",
                "A testing methodology"
            ],
            correct: 1,
            explanation: "Canary deployment releases changes to a small subset of users first, allowing monitoring and validation before full rollout."
        },
        {
            category: "devops",
            level: "senior",
            question: "What is the purpose of a service mesh in microservices?",
            answers: [
                "Store service data",
                "Handle service-to-service communication, observability, and security",
                "Deploy services",
                "Write service code"
            ],
            correct: 1,
            explanation: "A service mesh (e.g., Istio, Linkerd) provides infrastructure layer for service-to-service communication, handling traffic management, security, and observability."
        },
        {
            category: "devops",
            level: "senior",
            question: "What is immutable infrastructure?",
            answers: [
                "Infrastructure that never changes",
                "Replacing servers entirely rather than updating them in place",
                "Infrastructure in the cloud",
                "Read-only file systems"
            ],
            correct: 1,
            explanation: "Immutable infrastructure means replacing servers entirely with new versions rather than updating in place, improving consistency and reliability."
        },

        // Behavioral - Mid Level
        {
            category: "behavioral",
            level: "mid",
            question: "The STAR framework in behavioral interview answers stands for:",
            answers: [
                "Start, Test, Act, Review",
                "Situation, Task, Action, Result",
                "Strategy, Team, Approach, Result",
                "Story, Team, Action, Reflection"
            ],
            correct: 1,
            explanation: "STAR stands for Situation, Task, Action, Result - a structure for answering behavioral interview questions."
        },
        {
            category: "behavioral",
            level: "mid",
            question: "What is most important when giving code review feedback?",
            answers: [
                "Finding as many bugs as possible",
                "Being constructive and focusing on code, not the person",
                "Rewriting code in your own style",
                "Quick approval without detailed analysis"
            ],
            correct: 1,
            explanation: "Code review should be constructive, focused on the code (not the person), helpful for learning, and maintaining quality standards."
        },
        {
            category: "behavioral",
            level: "mid",
            question: "How should you handle disagreements with teammates about technical decisions?",
            answers: [
                "Always agree to avoid conflict",
                "Let the senior developer decide",
                "Present your reasoning with data and be open to other perspectives",
                "Escalate immediately to management"
            ],
            correct: 2,
            explanation: "Handle disagreements professionally by presenting data-driven reasoning while being open to others' perspectives and finding the best solution together."
        },
        {
            category: "behavioral",
            level: "mid",
            question: "What should you do when you don't know the answer to a technical question in an interview?",
            answers: [
                "Make up an answer",
                "Stay silent",
                "Admit you don't know and explain your thought process for solving it",
                "Change the subject"
            ],
            correct: 2,
            explanation: "Honesty is important. Admit when you don't know something and demonstrate problem-solving by explaining how you would find the answer."
        },

        // Behavioral - Senior Level
        {
            category: "behavioral",
            level: "senior",
            question: "As a senior developer, what is key when mentoring junior developers?",
            answers: [
                "Solving all their problems",
                "Criticizing every mistake",
                "Asking guiding questions that lead them to solutions",
                "Only giving them simple tasks"
            ],
            correct: 2,
            explanation: "Good mentoring means guiding to solutions through questions, not giving ready answers, which develops critical thinking and self-reliance."
        },
        {
            category: "behavioral",
            level: "senior",
            question: "How should you handle technical debt in a project?",
            answers: [
                "Ignore it until the end of the project",
                "Immediately refactor everything",
                "Balance new features with gradual debt reduction",
                "Rewrite the entire project from scratch"
            ],
            correct: 2,
            explanation: "Technical debt requires balance: prioritize critical debt, reserve time for reduction (e.g., 20% capacity), and refactor gradually."
        },
        {
            category: "behavioral",
            level: "senior",
            question: "How do you approach estimating a large, complex project?",
            answers: [
                "Give a quick guess",
                "Break it down into smaller tasks and estimate each, adding buffer",
                "Always double the initial estimate",
                "Refuse to estimate"
            ],
            correct: 1,
            explanation: "Break large projects into smaller, estimable tasks. Consider unknowns, dependencies, and add buffer for uncertainties. Communicate assumptions."
        },
        {
            category: "behavioral",
            level: "senior",
            question: "What should you do when you realize mid-project that the current approach won't work?",
            answers: [
                "Continue anyway to avoid wasting work",
                "Immediately start over without telling anyone",
                "Communicate early with stakeholders and propose alternatives with tradeoffs",
                "Blame requirements"
            ],
            correct: 2,
            explanation: "Communicate early about issues. Present the problem, alternative solutions with tradeoffs, and recommendations. Transparency builds trust."
        },

        // Behavioral - Principal Level
        {
            category: "behavioral",
            level: "principal",
            question: "As a Principal Engineer, how should you influence technical direction in an organization?",
            answers: [
                "Impose your decisions without consultation",
                "Build consensus, create RFCs, gather feedback",
                "Let teams decide independently without guidance",
                "Copy solutions from other companies"
            ],
            correct: 1,
            explanation: "Principal Engineers should build consensus through RFCs, working groups, gathering feedback, and demonstrating value through pilots."
        },
        {
            category: "behavioral",
            level: "principal",
            question: "What is crucial when making architectural decisions under time pressure?",
            answers: [
                "Choose the quickest solution without analysis",
                "Wait until pressure passes",
                "Implement quick tactical fixes + plan strategic solution",
                "Delegate the decision to junior developers"
            ],
            correct: 2,
            explanation: "Under time pressure: implement tactical fixes for immediate relief + plan and communicate long-term strategic solution."
        },
        {
            category: "behavioral",
            level: "principal",
            question: "How should you handle competing priorities from multiple teams?",
            answers: [
                "Work on everything simultaneously",
                "Choose the loudest stakeholder",
                "Evaluate impact, align with business goals, communicate tradeoffs",
                "Ignore all requests"
            ],
            correct: 2,
            explanation: "Evaluate each priority's impact and alignment with business goals. Communicate tradeoffs clearly and make data-driven decisions."
        },
        {
            category: "behavioral",
            level: "principal",
            question: "What is your role in growing other senior engineers?",
            answers: [
                "Compete with them to stay on top",
                "Do their work for them",
                "Provide challenging opportunities, share context, and sponsor their growth",
                "Keep knowledge to maintain your position"
            ],
            correct: 2,
            explanation: "Principal Engineers grow others by providing challenging opportunities, sharing organizational context, sponsoring visibility, and mentoring."
        },

        // Additional Algorithms Questions - Mid Level
        {
            category: "algorithms",
            level: "mid",
            question: "What is the purpose of dynamic programming?",
            answers: [
                "To make programs run faster by using more memory",
                "To solve problems by breaking them into overlapping subproblems and storing results",
                "To dynamically allocate memory",
                "To write programs that modify themselves"
            ],
            correct: 1,
            explanation: "Dynamic programming solves complex problems by breaking them down into simpler overlapping subproblems and storing their results to avoid redundant calculations."
        },
        {
            category: "algorithms",
            level: "mid",
            question: "Which sorting algorithm is most suitable for sorting a linked list?",
            answers: [
                "Quick Sort",
                "Heap Sort",
                "Merge Sort",
                "Insertion Sort"
            ],
            correct: 2,
            explanation: "Merge Sort is ideal for linked lists because it doesn't require random access and works efficiently with sequential access, unlike Quick Sort or Heap Sort."
        },
        {
            category: "algorithms",
            level: "mid",
            question: "What is the time complexity of finding an element in a balanced AVL tree?",
            answers: [
                "O(1)",
                "O(log n)",
                "O(n)",
                "O(n log n)"
            ],
            correct: 1,
            explanation: "AVL trees are self-balancing binary search trees that guarantee O(log n) search time by maintaining balance through rotations."
        },
        {
            category: "algorithms",
            level: "senior",
            question: "What is the Bellman-Ford algorithm used for?",
            answers: [
                "Sorting arrays",
                "Finding shortest paths in graphs with negative weights",
                "Balancing binary trees",
                "Compressing data"
            ],
            correct: 1,
            explanation: "Bellman-Ford algorithm finds shortest paths from a source vertex to all other vertices in a weighted graph, even with negative edge weights."
        },
        {
            category: "algorithms",
            level: "senior",
            question: "What is the difference between Kruskal's and Prim's algorithms?",
            answers: [
                "Kruskal's is for shortest path, Prim's for minimum spanning tree",
                "Both find MST but Kruskal's works on edges, Prim's on vertices",
                "There is no difference",
                "Kruskal's is faster for dense graphs"
            ],
            correct: 1,
            explanation: "Both find minimum spanning trees, but Kruskal's algorithm sorts and processes edges, while Prim's algorithm grows the tree by adding vertices."
        },
        {
            category: "algorithms",
            level: "senior",
            question: "What is memoization in the context of algorithms?",
            answers: [
                "Memorizing the code",
                "Caching function results to optimize recursive algorithms",
                "Using more memory",
                "Writing memory to disk"
            ],
            correct: 1,
            explanation: "Memoization is an optimization technique where function results are cached and reused, particularly useful for optimizing recursive algorithms with overlapping subproblems."
        },

        // Additional System Design Questions - Mid Level
        {
            category: "system-design",
            level: "mid",
            question: "What is the purpose of a message broker?",
            answers: [
                "To trade stocks",
                "To enable asynchronous communication between services",
                "To compress messages",
                "To encrypt data"
            ],
            correct: 1,
            explanation: "A message broker facilitates asynchronous communication between services by receiving, routing, and delivering messages, improving decoupling and scalability."
        },
        {
            category: "system-design",
            level: "mid",
            question: "What does 'idempotent' mean in the context of REST APIs?",
            answers: [
                "The API is very fast",
                "Multiple identical requests have the same effect as a single request",
                "The API uses encryption",
                "The API can handle multiple users"
            ],
            correct: 1,
            explanation: "An idempotent operation can be performed multiple times with the same result. GET, PUT, and DELETE are typically idempotent in REST APIs."
        },
        {
            category: "system-design",
            level: "mid",
            question: "What is the purpose of rate limiting in APIs?",
            answers: [
                "To make APIs slower",
                "To prevent abuse and ensure fair resource usage",
                "To compress data",
                "To cache responses"
            ],
            correct: 1,
            explanation: "Rate limiting restricts the number of API requests a client can make in a given time period, preventing abuse and ensuring system stability."
        },
        {
            category: "system-design",
            level: "senior",
            question: "What is the purpose of a Circuit Breaker in microservices?",
            answers: [
                "To turn services on and off",
                "To prevent cascading failures by failing fast when a service is down",
                "To balance load",
                "To encrypt communication"
            ],
            correct: 1,
            explanation: "Circuit Breaker monitors for failures and 'opens the circuit' to fail fast and prevent cascading failures, giving the failing service time to recover."
        },
        {
            category: "system-design",
            level: "senior",
            question: "What is the difference between vertical and horizontal partitioning in databases?",
            answers: [
                "Vertical splits by rows, horizontal by columns",
                "Vertical splits by columns, horizontal by rows",
                "No difference",
                "Vertical is faster"
            ],
            correct: 1,
            explanation: "Vertical partitioning splits tables by columns (different attributes in different tables), while horizontal partitioning splits by rows (sharding)."
        },
        {
            category: "system-design",
            level: "senior",
            question: "What is the purpose of a reverse proxy?",
            answers: [
                "To hide client IP addresses",
                "To sit in front of servers, handling SSL, caching, and load balancing",
                "To reverse data flow",
                "To encrypt all traffic"
            ],
            correct: 1,
            explanation: "A reverse proxy sits in front of web servers, providing SSL termination, caching, load balancing, and protection from direct exposure."
        },

        // Additional Programming Questions - Mid Level
        {
            category: "programming",
            level: "mid",
            question: "What is the difference between 'let' and 'var' in JavaScript?",
            answers: [
                "No difference",
                "'let' is block-scoped, 'var' is function-scoped",
                "'var' is block-scoped, 'let' is function-scoped",
                "'let' is faster"
            ],
            correct: 1,
            explanation: "'let' has block scope and doesn't get hoisted in the same way as 'var', which has function scope and can lead to unexpected behavior."
        },
        {
            category: "programming",
            level: "mid",
            question: "What is a decorator in Python?",
            answers: [
                "A design pattern for UI",
                "A function that modifies another function's behavior",
                "A way to add colors to output",
                "A class inheritance method"
            ],
            correct: 1,
            explanation: "A decorator is a function that takes another function and extends or modifies its behavior without permanently modifying the function itself."
        },
        {
            category: "programming",
            level: "mid",
            question: "What does REST stand for in web services?",
            answers: [
                "Rapid External Service Transfer",
                "Representational State Transfer",
                "Remote Execution Service Technology",
                "Reliable Stateful Transmission"
            ],
            correct: 1,
            explanation: "REST (Representational State Transfer) is an architectural style for distributed hypermedia systems using stateless communication and standard HTTP methods."
        },
        {
            category: "programming",
            level: "senior",
            question: "What is the event loop in JavaScript?",
            answers: [
                "A loop that processes events from the DOM",
                "A mechanism that handles asynchronous operations by managing callback queue",
                "A debugging tool",
                "A way to loop through events"
            ],
            correct: 1,
            explanation: "The event loop is a mechanism that handles asynchronous operations by continuously checking the call stack and callback queue, executing callbacks when the stack is empty."
        },
        {
            category: "programming",
            level: "senior",
            question: "What is the purpose of virtual DOM in React?",
            answers: [
                "To virtualize the application",
                "To minimize direct DOM manipulation by batching updates efficiently",
                "To run React in virtual machines",
                "To create virtual reality interfaces"
            ],
            correct: 1,
            explanation: "Virtual DOM is an in-memory representation of the real DOM that allows React to batch updates and minimize expensive direct DOM manipulations, improving performance."
        },
        {
            category: "programming",
            level: "senior",
            question: "What is tail recursion optimization?",
            answers: [
                "Recursion that processes the tail of a list",
                "Compiler optimization that converts tail-recursive calls into iterative loops",
                "A way to limit recursion depth",
                "Recursion that returns early"
            ],
            correct: 1,
            explanation: "Tail recursion optimization allows compilers to convert tail-recursive functions into iterative loops, preventing stack overflow and improving performance."
        },

        // Additional Architecture Questions - Mid Level
        {
            category: "architecture",
            level: "mid",
            question: "What is the Repository Pattern?",
            answers: [
                "A Git workflow",
                "A pattern that abstracts data access logic from business logic",
                "A way to organize files",
                "A deployment strategy"
            ],
            correct: 1,
            explanation: "Repository Pattern creates an abstraction layer between the data access logic and business logic, making the code more maintainable and testable."
        },
        {
            category: "architecture",
            level: "mid",
            question: "What is the Singleton pattern and when should you use it cautiously?",
            answers: [
                "A pattern for single-threaded applications",
                "A pattern ensuring one instance of a class; be cautious as it can create global state and testing issues",
                "A pattern for creating unique objects",
                "A pattern for single-page applications"
            ],
            correct: 1,
            explanation: "Singleton ensures only one instance of a class exists. Use cautiously as it introduces global state, can complicate testing, and may hide dependencies."
        },
        {
            category: "architecture",
            level: "mid",
            question: "What is the Observer pattern?",
            answers: [
                "A pattern for monitoring system performance",
                "A pattern where objects subscribe to and receive notifications about state changes",
                "A pattern for user authentication",
                "A pattern for logging"
            ],
            correct: 1,
            explanation: "Observer pattern defines a one-to-many dependency between objects where when one object changes state, all dependents are notified automatically."
        },
        {
            category: "architecture",
            level: "senior",
            question: "What is the difference between orchestration and choreography in microservices?",
            answers: [
                "No difference, they're synonyms",
                "Orchestration has central control, choreography is decentralized event-driven",
                "Orchestration is faster",
                "Choreography uses more resources"
            ],
            correct: 1,
            explanation: "Orchestration uses a central coordinator to control service interactions, while choreography is decentralized with services reacting to events independently."
        },
        {
            category: "architecture",
            level: "senior",
            question: "What is Domain-Driven Design (DDD)?",
            answers: [
                "Designing domains for websites",
                "An approach to software design focusing on modeling complex business domains",
                "A database design methodology",
                "A UI design pattern"
            ],
            correct: 1,
            explanation: "DDD is a software design approach that focuses on understanding and modeling complex business domains through collaboration between technical and domain experts."
        },
        {
            category: "architecture",
            level: "senior",
            question: "What is a Bounded Context in Domain-Driven Design?",
            answers: [
                "A limited time frame for development",
                "A boundary where a particular domain model is defined and applicable",
                "A restricted access area",
                "A performance constraint"
            ],
            correct: 1,
            explanation: "A Bounded Context defines explicit boundaries where a particular domain model is valid, helping to manage complexity in large systems."
        },

        // Additional Database Questions - Mid Level
        {
            category: "databases",
            level: "mid",
            question: "What is a database view?",
            answers: [
                "A way to visualize data",
                "A virtual table based on a SQL query result",
                "A database monitoring tool",
                "A GUI for databases"
            ],
            correct: 1,
            explanation: "A view is a virtual table created from a SQL query result. It doesn't store data but provides a way to present data in a specific format or hide complexity."
        },
        {
            category: "databases",
            level: "mid",
            question: "What is a foreign key constraint?",
            answers: [
                "A key from a foreign country",
                "A constraint that ensures referential integrity between tables",
                "An encryption key",
                "A primary key from another database"
            ],
            correct: 1,
            explanation: "A foreign key constraint ensures referential integrity by requiring that values in one table match values in another table's primary key."
        },
        {
            category: "databases",
            level: "mid",
            question: "What is database indexing and when should you avoid it?",
            answers: [
                "Always use indexes on every column",
                "Indexes speed up reads but slow writes; avoid on frequently updated columns with low selectivity",
                "Indexes only work on primary keys",
                "Indexes are automatic and can't be controlled"
            ],
            correct: 1,
            explanation: "While indexes speed up queries, they slow down INSERT/UPDATE/DELETE operations. Avoid indexes on columns with low selectivity or high update frequency."
        },
        {
            category: "databases",
            level: "senior",
            question: "What is the CAP theorem?",
            answers: [
                "Compression, Access, Performance",
                "Consistency, Availability, Partition tolerance - you can only guarantee 2 of 3",
                "Cache, API, Processing",
                "Capacity, Availability, Performance"
            ],
            correct: 1,
            explanation: "CAP theorem states that a distributed system can only guarantee 2 out of 3: Consistency, Availability, and Partition tolerance simultaneously."
        },
        {
            category: "databases",
            level: "senior",
            question: "What is a materialized view?",
            answers: [
                "A physical view of the database",
                "A view that stores query results physically for faster access",
                "A temporary view",
                "A view with material design"
            ],
            correct: 1,
            explanation: "A materialized view stores the query result physically, improving read performance but requiring periodic refresh to stay current with source data."
        },
        {
            category: "databases",
            level: "senior",
            question: "What is optimistic locking vs pessimistic locking?",
            answers: [
                "Optimistic is faster, pessimistic is slower",
                "Optimistic assumes no conflicts and checks at commit; pessimistic locks resources immediately",
                "They're the same",
                "Optimistic uses less memory"
            ],
            correct: 1,
            explanation: "Optimistic locking assumes conflicts are rare and checks at commit time, while pessimistic locking prevents conflicts by locking resources immediately."
        },

        // Additional DevOps Questions - Mid Level
        {
            category: "devops",
            level: "mid",
            question: "What is the difference between Docker image and Docker container?",
            answers: [
                "No difference",
                "Image is a template, container is a running instance of an image",
                "Image is larger than container",
                "Container is a template, image is running"
            ],
            correct: 1,
            explanation: "A Docker image is an immutable template containing the application and dependencies. A container is a running instance created from an image."
        },
        {
            category: "devops",
            level: "mid",
            question: "What is a health check in containerized applications?",
            answers: [
                "A medical examination for developers",
                "A mechanism to verify if a container is running correctly and ready to serve traffic",
                "A security scan",
                "A performance test"
            ],
            correct: 1,
            explanation: "Health checks are probes that determine if a container is running correctly, helping orchestrators decide whether to route traffic or restart containers."
        },
        {
            category: "devops",
            level: "mid",
            question: "What is the purpose of a .dockerignore file?",
            answers: [
                "To ignore Docker commands",
                "To exclude files from being copied into Docker image, reducing image size",
                "To hide Docker from security scans",
                "To configure Docker settings"
            ],
            correct: 1,
            explanation: ".dockerignore file specifies which files and directories should be excluded when building Docker images, reducing image size and build time."
        },
        {
            category: "devops",
            level: "senior",
            question: "What is GitOps?",
            answers: [
                "Using Git for all operations",
                "A methodology where Git repos are the source of truth for declarative infrastructure and applications",
                "Git operations training",
                "A Git GUI tool"
            ],
            correct: 1,
            explanation: "GitOps uses Git repositories as the single source of truth for declarative infrastructure and applications, with automated deployment on Git changes."
        },
        {
            category: "devops",
            level: "senior",
            question: "What is a StatefulSet in Kubernetes?",
            answers: [
                "A set of static files",
                "A workload API object for managing stateful applications with stable network identities",
                "A collection of state variables",
                "A configuration file"
            ],
            correct: 1,
            explanation: "StatefulSet manages stateful applications that require stable, unique network identifiers and persistent storage that stays with each pod."
        },
        {
            category: "devops",
            level: "senior",
            question: "What is the difference between ConfigMap and Secret in Kubernetes?",
            answers: [
                "No difference",
                "ConfigMap for non-sensitive config, Secret for sensitive data with base64 encoding",
                "ConfigMap is faster",
                "Secret is larger"
            ],
            correct: 1,
            explanation: "ConfigMap stores non-sensitive configuration data in plain text, while Secret stores sensitive data like passwords with base64 encoding and restricted access."
        },

        // Additional Behavioral Questions - Mid Level
        {
            category: "behavioral",
            level: "mid",
            question: "How do you handle a situation where you disagree with your manager's technical decision?",
            answers: [
                "Ignore and implement your way anyway",
                "Express concerns with data, suggest alternatives, but support final decision",
                "Complain to other team members",
                "Refuse to work on it"
            ],
            correct: 1,
            explanation: "Express concerns professionally with supporting data, propose alternatives, but ultimately support the final decision and maintain trust and professionalism."
        },
        {
            category: "behavioral",
            level: "mid",
            question: "What do you do when you're blocked on a task?",
            answers: [
                "Wait for someone to notice",
                "Proactively communicate the blocker, document what you've tried, ask for help",
                "Switch to another task without telling anyone",
                "Give up"
            ],
            correct: 1,
            explanation: "Proactively communicate blockers, document attempted solutions, seek help from appropriate people, and provide context to enable quick resolution."
        },
        {
            category: "behavioral",
            level: "senior",
            question: "How do you handle a team member who consistently produces low-quality code?",
            answers: [
                "Report them to management immediately",
                "Ignore it",
                "Provide specific feedback, pair program, offer resources, escalate only if no improvement",
                "Rewrite all their code yourself"
            ],
            correct: 2,
            explanation: "Address through constructive feedback with examples, pair programming, sharing resources, and mentoring. Escalate to management only if issues persist."
        },
        {
            category: "behavioral",
            level: "senior",
            question: "How do you prioritize technical debt vs new features?",
            answers: [
                "Always do new features first",
                "Always fix tech debt first",
                "Balance based on business impact, risk, and velocity impact; communicate tradeoffs",
                "Let management decide everything"
            ],
            correct: 2,
            explanation: "Balance technical debt and features by assessing business impact, risk, and velocity effects. Communicate tradeoffs clearly to stakeholders."
        },
        {
            category: "behavioral",
            level: "principal",
            question: "How do you drive technical standards across multiple teams?",
            answers: [
                "Mandate standards without input",
                "Build consensus through RFCs, demonstrate value, provide tooling and support",
                "Let each team do whatever they want",
                "Copy what other companies do"
            ],
            correct: 1,
            explanation: "Build consensus through RFCs and working groups, demonstrate value with pilots, provide tooling and support, and iterate based on feedback."
        },
        {
            category: "behavioral",
            level: "principal",
            question: "How do you handle technical disagreements between senior engineers?",
            answers: [
                "Pick the person with higher seniority",
                "Facilitate data-driven discussion, focus on tradeoffs, build consensus or make informed decision",
                "Let them fight it out",
                "Avoid the conflict"
            ],
            correct: 1,
            explanation: "Facilitate objective discussion with data, analyze tradeoffs, seek consensus, and if needed, make informed decision with clear rationale."
        },

        // Security Questions - Mid Level
        {
            category: "system-design",
            level: "mid",
            question: "What is SQL injection and how do you prevent it?",
            answers: [
                "A medical procedure",
                "An attack where malicious SQL is inserted; prevent with parameterized queries",
                "A database feature",
                "A performance optimization"
            ],
            correct: 1,
            explanation: "SQL injection is an attack where malicious SQL code is inserted into queries. Prevent it using parameterized queries/prepared statements, never string concatenation."
        },
        {
            category: "system-design",
            level: "mid",
            question: "What is CORS (Cross-Origin Resource Sharing)?",
            answers: [
                "A database system",
                "A security feature that controls how resources are shared between different origins",
                "A programming language",
                "A testing framework"
            ],
            correct: 1,
            explanation: "CORS is a security mechanism that controls which origins can access resources on a web server, preventing unauthorized cross-origin requests."
        },
        {
            category: "system-design",
            level: "senior",
            question: "What is OAuth 2.0 used for?",
            answers: [
                "Password encryption",
                "Authorization framework for delegated access without sharing credentials",
                "User authentication",
                "Database access control"
            ],
            correct: 1,
            explanation: "OAuth 2.0 is an authorization framework that enables applications to obtain limited access to user accounts without exposing user credentials."
        },

        // Cloud Computing Questions - Mid Level
        {
            category: "devops",
            level: "mid",
            question: "What is the difference between IaaS, PaaS, and SaaS?",
            answers: [
                "They're all the same",
                "IaaS provides infrastructure, PaaS provides platform, SaaS provides software applications",
                "IaaS is fastest",
                "PaaS is most expensive"
            ],
            correct: 1,
            explanation: "IaaS provides virtual infrastructure (servers, storage), PaaS provides development platforms (with runtime, middleware), SaaS provides complete applications."
        },
        {
            category: "devops",
            level: "mid",
            question: "What is auto-scaling in cloud computing?",
            answers: [
                "Automatic software updates",
                "Automatically adjusting resource capacity based on demand",
                "Automatic billing",
                "Automatic backups"
            ],
            correct: 1,
            explanation: "Auto-scaling automatically adjusts computing resources (scale up or down) based on actual demand, optimizing cost and performance."
        },
        {
            category: "devops",
            level: "senior",
            question: "What is the purpose of a Service Mesh like Istio?",
            answers: [
                "To create meshes for visualization",
                "To handle service-to-service communication with observability, security, and traffic control",
                "To mesh network cables",
                "To create service documentation"
            ],
            correct: 1,
            explanation: "Service Mesh provides infrastructure layer for microservices communication, handling traffic management, security, observability, and resilience patterns."
        },

        // Competitive Programming Questions - Mid Level
        {
            category: "competitive-programming",
            level: "mid",
            question: "Write C# code to find the two numbers in an array that sum to a target value. What's the optimal time complexity?",
            answers: [
                "O(n²) - nested loops comparing all pairs",
                "O(n log n) - sort array then use two pointers",
                "O(n) - use hash set to track complements",
                "O(n³) - brute force all combinations"
            ],
            correct: 2,
            explanation: "Optimal O(n) solution using HashSet:\n```csharp\npublic int[] TwoSum(int[] nums, int target) {\n    var seen = new HashSet<int>();\n    for (int i = 0; i < nums.Length; i++) {\n        int complement = target - nums[i];\n        if (seen.Contains(complement)) {\n            return new int[] { complement, nums[i] };\n        }\n        seen.Add(nums[i]);\n    }\n    return null;\n}\n```\nTime: O(n), Space: O(n). Better than O(n²) nested loops or O(n log n) sort approach."
        },
        {
            category: "competitive-programming",
            level: "mid",
            question: "How would you implement a function to reverse a linked list in C#?",
            answers: [
                "Use recursion",
                "Iterate with three pointers (prev, current, next)",
                "Convert to array, reverse, rebuild",
                "Use Stack<T>"
            ],
            correct: 1,
            explanation: "Iterative solution with O(n) time, O(1) space:\n```csharp\npublic ListNode ReverseList(ListNode head) {\n    ListNode prev = null;\n    ListNode current = head;\n    while (current != null) {\n        ListNode next = current.next;\n        current.next = prev;\n        prev = current;\n        current = next;\n    }\n    return prev;\n}\n```\nMost efficient approach - modifies pointers in-place without extra space."
        },
        {
            category: "competitive-programming",
            level: "mid",
            question: "What's the best approach to check if a string is a palindrome in C#?",
            answers: [
                "Reverse string and compare",
                "Two pointers from start and end",
                "Use LINQ Reverse()",
                "Recursion"
            ],
            correct: 1,
            explanation: "Optimal two-pointer solution:\n```csharp\npublic bool IsPalindrome(string s) {\n    int left = 0, right = s.Length - 1;\n    while (left < right) {\n        if (s[left] != s[right])\n            return false;\n        left++;\n        right--;\n    }\n    return true;\n}\n```\nTime: O(n/2) = O(n), Space: O(1). No extra string allocation."
        },
        {
            category: "competitive-programming",
            level: "mid",
            question: "How to find the maximum subarray sum (Kadane's algorithm) in C#?",
            answers: [
                "Check all possible subarrays - O(n³)",
                "Use prefix sums - O(n²)",
                "Dynamic programming with current/max sum - O(n)",
                "Divide and conquer - O(n log n)"
            ],
            correct: 2,
            explanation: "Kadane's Algorithm - O(n) solution:\n```csharp\npublic int MaxSubArray(int[] nums) {\n    int maxSoFar = nums[0];\n    int maxEndingHere = nums[0];\n    for (int i = 1; i < nums.Length; i++) {\n        maxEndingHere = Math.Max(nums[i], maxEndingHere + nums[i]);\n        maxSoFar = Math.Max(maxSoFar, maxEndingHere);\n    }\n    return maxSoFar;\n}\n```\nClassic DP problem with optimal O(n) time and O(1) space."
        },
        {
            category: "competitive-programming",
            level: "mid",
            question: "Implement binary search in C# - what's the correct way to avoid integer overflow?",
            answers: [
                "int mid = (left + right) / 2;",
                "int mid = left + (right - left) / 2;",
                "int mid = (left + right) >> 1;",
                "float mid = (left + right) / 2.0;"
            ],
            correct: 1,
            explanation: "Safe binary search avoiding overflow:\n```csharp\npublic int BinarySearch(int[] arr, int target) {\n    int left = 0, right = arr.Length - 1;\n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        if (arr[mid] == target) return mid;\n        else if (arr[mid] < target) left = mid + 1;\n        else right = mid - 1;\n    }\n    return -1;\n}\n```\nTime: O(log n). Formula prevents overflow when left+right > int.MaxValue."
        },
        {
            category: "competitive-programming",
            level: "senior",
            question: "How to solve the 'Longest Increasing Subsequence' problem optimally in C#?",
            answers: [
                "Recursion with memoization - O(n²)",
                "Dynamic programming - O(n²)",
                "Binary search with DP - O(n log n)",
                "Greedy approach - O(n)"
            ],
            correct: 2,
            explanation: "Optimal O(n log n) solution with binary search:\n```csharp\npublic int LengthOfLIS(int[] nums) {\n    var tails = new List<int>();\n    foreach (int num in nums) {\n        int left = 0, right = tails.Count;\n        while (left < right) {\n            int mid = left + (right - left) / 2;\n            if (tails[mid] < num) left = mid + 1;\n            else right = mid;\n        }\n        if (left == tails.Count) tails.Add(num);\n        else tails[left] = num;\n    }\n    return tails.Count;\n}\n```\nUses binary search to maintain smallest tail for each length."
        },
        {
            category: "competitive-programming",
            level: "senior",
            question: "What's the optimal way to detect a cycle in a linked list?",
            answers: [
                "Store all nodes in HashSet - O(n) space",
                "Floyd's Cycle Detection (tortoise & hare) - O(1) space",
                "Mark visited nodes - modifies structure",
                "Reverse list and check if same - O(n) space"
            ],
            correct: 1,
            explanation: "Floyd's Cycle Detection Algorithm:\n```csharp\npublic bool HasCycle(ListNode head) {\n    if (head == null) return false;\n    ListNode slow = head;\n    ListNode fast = head;\n    while (fast?.next != null) {\n        slow = slow.next;\n        fast = fast.next.next;\n        if (slow == fast) return true;\n    }\n    return false;\n}\n```\nTime: O(n), Space: O(1). Slow moves 1 step, fast moves 2 - they meet if cycle exists."
        },
        {
            category: "competitive-programming",
            level: "senior",
            question: "How to implement a Trie (Prefix Tree) for word search in C#?",
            answers: [
                "Use Dictionary<string, bool>",
                "Use HashSet<string>",
                "Create TrieNode class with Dictionary<char, TrieNode>",
                "Use array of 26 children per node"
            ],
            correct: 2,
            explanation: "Trie implementation with Dictionary:\n```csharp\npublic class TrieNode {\n    public Dictionary<char, TrieNode> Children = new();\n    public bool IsEndOfWord = false;\n}\npublic class Trie {\n    private TrieNode root = new();\n    public void Insert(string word) {\n        var node = root;\n        foreach (char c in word) {\n            if (!node.Children.ContainsKey(c))\n                node.Children[c] = new TrieNode();\n            node = node.Children[c];\n        }\n        node.IsEndOfWord = true;\n    }\n    public bool Search(string word) {\n        var node = root;\n        foreach (char c in word) {\n            if (!node.Children.ContainsKey(c)) return false;\n            node = node.Children[c];\n        }\n        return node.IsEndOfWord;\n    }\n}\n```\nInsert/Search: O(m) where m is word length."
        },
        {
            category: "competitive-programming",
            level: "senior",
            question: "Solve the 'Merge K Sorted Lists' problem optimally in C#:",
            answers: [
                "Merge lists one by one - O(kN)",
                "Use PriorityQueue (Min Heap) - O(N log k)",
                "Merge all into array and sort - O(N log N)",
                "Divide and conquer - O(N log k)"
            ],
            correct: 1,
            explanation: "Optimal solution using PriorityQueue:\n```csharp\npublic ListNode MergeKLists(ListNode[] lists) {\n    var pq = new PriorityQueue<ListNode, int>();\n    foreach (var list in lists) {\n        if (list != null)\n            pq.Enqueue(list, list.val);\n    }\n    var dummy = new ListNode(0);\n    var current = dummy;\n    while (pq.Count > 0) {\n        var node = pq.Dequeue();\n        current.next = node;\n        current = current.next;\n        if (node.next != null)\n            pq.Enqueue(node.next, node.next.val);\n    }\n    return dummy.next;\n}\n```\nTime: O(N log k), where N is total nodes, k is number of lists."
        },
        {
            category: "competitive-programming",
            level: "senior",
            question: "How to solve the 'Knapsack 0/1' problem with DP in C#?",
            answers: [
                "2D DP array - O(n×W) space",
                "Recursion with memoization - O(n×W) space",
                "1D DP array with reverse iteration - O(W) space",
                "Greedy by value/weight ratio - incorrect"
            ],
            correct: 2,
            explanation: "Space-optimized 1D DP solution:\n```csharp\npublic int Knapsack(int[] weights, int[] values, int capacity) {\n    int n = weights.Length;\n    int[] dp = new int[capacity + 1];\n    for (int i = 0; i < n; i++) {\n        for (int w = capacity; w >= weights[i]; w--) {\n            dp[w] = Math.Max(dp[w], dp[w - weights[i]] + values[i]);\n        }\n    }\n    return dp[capacity];\n}\n```\nTime: O(n×W), Space: O(W). Backwards iteration prevents item reuse."
        },
        {
            category: "competitive-programming",
            level: "senior",
            question: "Find all permutations of a string using backtracking in C#:",
            answers: [
                "Use built-in library",
                "Iterative with queue",
                "Recursive backtracking with swap",
                "Generate using factorials"
            ],
            correct: 2,
            explanation: "Classic backtracking solution:\n```csharp\npublic IList<string> Permute(string str) {\n    var result = new List<string>();\n    Backtrack(str.ToCharArray(), 0, result);\n    return result;\n}\nprivate void Backtrack(char[] arr, int start, List<string> result) {\n    if (start == arr.Length) {\n        result.Add(new string(arr));\n        return;\n    }\n    for (int i = start; i < arr.Length; i++) {\n        (arr[start], arr[i]) = (arr[i], arr[start]);\n        Backtrack(arr, start + 1, result);\n        (arr[start], arr[i]) = (arr[i], arr[start]);\n    }\n}\n```\nTime: O(n!), Space: O(n) for recursion stack."
        },
        {
            category: "competitive-programming",
            level: "senior",
            question: "Implement Dijkstra's shortest path algorithm in C#:",
            answers: [
                "Use BFS with queue - incorrect for weighted graphs",
                "Use DFS - doesn't guarantee shortest path",
                "Use PriorityQueue with distances - O((V+E) log V)",
                "Use simple array iteration - O(V²)"
            ],
            correct: 2,
            explanation: "Dijkstra's with PriorityQueue:\n```csharp\npublic int[] Dijkstra(List<(int node, int weight)>[] graph, int start) {\n    int n = graph.Length;\n    int[] dist = new int[n];\n    Array.Fill(dist, int.MaxValue);\n    dist[start] = 0;\n    var pq = new PriorityQueue<int, int>();\n    pq.Enqueue(start, 0);\n    while (pq.Count > 0) {\n        int u = pq.Dequeue();\n        foreach (var (v, weight) in graph[u]) {\n            int newDist = dist[u] + weight;\n            if (newDist < dist[v]) {\n                dist[v] = newDist;\n                pq.Enqueue(v, newDist);\n            }\n        }\n    }\n    return dist;\n}\n```\nTime: O((V+E) log V) with binary heap."
        },
        {
            category: "competitive-programming",
            level: "senior",
            question: "How to find Lowest Common Ancestor (LCA) in a Binary Tree?",
            answers: [
                "Store path to both nodes, find intersection - O(n) space",
                "Recursive DFS checking if nodes are in subtrees - O(h) space",
                "Level-order traversal - inefficient",
                "Parent pointers - requires modification"
            ],
            correct: 1,
            explanation: "Elegant recursive solution:\n```csharp\npublic TreeNode LowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n    if (root == null || root == p || root == q)\n        return root;\n    TreeNode left = LowestCommonAncestor(root.left, p, q);\n    TreeNode right = LowestCommonAncestor(root.right, p, q);\n    if (left != null && right != null)\n        return root;\n    return left ?? right;\n}\n```\nTime: O(n), Space: O(h) for recursion where h is height."
        },
        {
            category: "competitive-programming",
            level: "senior",
            question: "Solve 'Coin Change' (minimum coins to make amount) with DP:",
            answers: [
                "Greedy by largest coin first - incorrect",
                "BFS level-order - O(amount×coins) space",
                "Bottom-up DP - O(amount) space",
                "Recursion without memoization - exponential"
            ],
            correct: 2,
            explanation: "Bottom-up DP solution:\n```csharp\npublic int CoinChange(int[] coins, int amount) {\n    int[] dp = new int[amount + 1];\n    Array.Fill(dp, amount + 1);\n    dp[0] = 0;\n    for (int i = 1; i <= amount; i++) {\n        foreach (int coin in coins) {\n            if (coin <= i) {\n                dp[i] = Math.Min(dp[i], dp[i - coin] + 1);\n            }\n        }\n    }\n    return dp[amount] > amount ? -1 : dp[amount];\n}\n```\nTime: O(amount × coins), Space: O(amount)."
        },
        {
            category: "competitive-programming",
            level: "senior",
            question: "Implement Union-Find (Disjoint Set) with path compression:",
            answers: [
                "Simple parent array - O(n) per operation",
                "Path compression only - O(log n) amortized",
                "Union by rank only - O(log n) amortized",
                "Path compression + union by rank - O(α(n)) amortized"
            ],
            correct: 3,
            explanation: "Optimized Union-Find:\n```csharp\npublic class UnionFind {\n    private int[] parent;\n    private int[] rank;\n    public UnionFind(int n) {\n        parent = new int[n];\n        rank = new int[n];\n        for (int i = 0; i < n; i++)\n            parent[i] = i;\n    }\n    public int Find(int x) {\n        if (parent[x] != x)\n            parent[x] = Find(parent[x]);\n        return parent[x];\n    }\n    public void Union(int x, int y) {\n        int rootX = Find(x);\n        int rootY = Find(y);\n        if (rootX == rootY) return;\n        if (rank[rootX] < rank[rootY])\n            parent[rootX] = rootY;\n        else if (rank[rootX] > rank[rootY])\n            parent[rootY] = rootX;\n        else {\n            parent[rootY] = rootX;\n            rank[rootX]++;\n        }\n    }\n}\n```\nBoth operations: O(α(n)) - inverse Ackermann function."
        },

        // Advanced Data Structures Questions
        {
            category: "algorithms",
            level: "senior",
            question: "How does a Segment Tree solve range query problems efficiently?",
            answers: [
                "Stores all possible ranges - O(n²) space",
                "Uses binary tree where each node represents a range - O(n) space, O(log n) query/update",
                "Pre-computes all queries - impractical for updates",
                "Uses hash table for ranges - inefficient"
            ],
            correct: 1,
            explanation: "Segment Tree divides array into segments in a tree structure:\n- Build: O(n)\n- Query (sum/min/max in range): O(log n)\n- Update: O(log n)\n- Space: O(n)\nIdeal for problems with frequent range queries and updates. Each node stores aggregate info (sum, min, max) for its range."
        },
        {
            category: "algorithms",
            level: "senior",
            question: "What problem does a Fenwick Tree (Binary Indexed Tree) solve best?",
            answers: [
                "String pattern matching",
                "Prefix sums with point updates - O(log n) for both",
                "Graph shortest paths",
                "Hash collision resolution"
            ],
            correct: 1,
            explanation: "Fenwick Tree excels at:\n- Prefix sum queries: O(log n)\n- Point updates: O(log n)\n- Space: O(n)\nMore memory efficient than Segment Tree for cumulative operations. Uses clever bit manipulation to navigate parent/child relationships."
        },
        {
            category: "algorithms",
            level: "senior",
            question: "How to handle a stream of numbers and efficiently find the median?",
            answers: [
                "Sort array each time - O(n log n)",
                "Use two heaps (max heap for lower half, min heap for upper half) - O(log n) insert, O(1) median",
                "Maintain sorted list - O(n) insert",
                "Use single priority queue - doesn't work"
            ],
            correct: 1,
            explanation: "Two-heap approach:\n```csharp\nprivate PriorityQueue<int, int> maxHeap; // lower half (max on top)\nprivate PriorityQueue<int, int> minHeap; // upper half (min on top)\n\npublic void AddNum(int num) {\n    maxHeap.Enqueue(num, -num); // negate for max heap\n    minHeap.Enqueue(maxHeap.Dequeue(), maxHeap.Dequeue());\n    if (maxHeap.Count < minHeap.Count)\n        maxHeap.Enqueue(minHeap.Dequeue(), -minHeap.Dequeue());\n}\n\npublic double FindMedian() {\n    return maxHeap.Count > minHeap.Count \n        ? maxHeap.Peek() \n        : (maxHeap.Peek() + minHeap.Peek()) / 2.0;\n}\n```\nMaintains balance with sizes differing by at most 1."
        },
        {
            category: "algorithms",
            level: "senior",
            question: "What's the key challenge with implementing a thread-safe cache with LRU eviction?",
            answers: [
                "No challenge - just add locks everywhere",
                "Maintaining O(1) operations while ensuring atomicity of get/put",
                "LRU is impossible with multithreading",
                "Cache invalidation only"
            ],
            correct: 1,
            explanation: "Challenges:\n1. Lock granularity - coarse locks (entire cache) vs fine locks (per entry)\n2. Maintaining O(1) with atomic operations\n3. Preventing race conditions during eviction\n4. Avoiding deadlocks\n\nSolutions:\n- ConcurrentDictionary + custom linked list with locks\n- Read-write locks for get/put separation\n- Lock-free algorithms with CAS operations\n- Segment-level locking for reduced contention"
        },

        // String Operations Questions
        {
            category: "programming",
            level: "mid",
            question: "What's the most efficient way to check if one string is a rotation of another?",
            answers: [
                "Generate all rotations and compare - O(n²)",
                "Check if s2 is substring of s1+s1 - O(n)",
                "Character frequency comparison - incorrect",
                "Two pointers - O(n²) worst case"
            ],
            correct: 1,
            explanation: "Clever one-liner approach:\n```csharp\npublic bool IsRotation(string s1, string s2) {\n    return s1.Length == s2.Length && (s1 + s1).Contains(s2);\n}\n```\nExample: s1=\"waterbottle\", s2=\"erbottlewat\"\nwaterbottle + waterbottle = waterbottlewaterbottle (contains erbottlewat)\nTime: O(n), Space: O(n)"
        },
        {
            category: "programming",
            level: "mid",
            question: "How to efficiently remove all adjacent duplicates from a string?",
            answers: [
                "Nested loops - O(n²)",
                "Stack-based approach - O(n)",
                "Recursion - O(n²) worst case",
                "String replace in loop - O(n²)"
            ],
            correct: 1,
            explanation: "Stack solution:\n```csharp\npublic string RemoveDuplicates(string s) {\n    var stack = new Stack<char>();\n    foreach (char c in s) {\n        if (stack.Count > 0 && stack.Peek() == c)\n            stack.Pop();\n        else\n            stack.Push(c);\n    }\n    return new string(stack.Reverse().ToArray());\n}\n```\nExample: \"abbaca\" → \"ca\" (remove bb, then aa)\nTime: O(n), Space: O(n)"
        },
        {
            category: "programming",
            level: "senior",
            question: "What's the Rabin-Karp algorithm advantage for pattern matching?",
            answers: [
                "Always faster than naive approach",
                "Can find multiple patterns in single pass using hashing - O(n+m) average",
                "Uses less memory",
                "Better worst-case than KMP"
            ],
            correct: 1,
            explanation: "Rabin-Karp uses rolling hash:\n```csharp\npublic int RabinKarp(string text, string pattern) {\n    int m = pattern.Length, n = text.Length;\n    int patternHash = pattern.GetHashCode();\n    \n    for (int i = 0; i <= n - m; i++) {\n        string window = text.Substring(i, m);\n        if (window.GetHashCode() == patternHash && window == pattern)\n            return i;\n    }\n    return -1;\n}\n```\nAdvantages:\n- Multiple patterns simultaneously\n- Rolling hash: O(1) per window\n- Good average case: O(n+m)\nWorst case: O(nm) with hash collisions"
        },
        {
            category: "programming",
            level: "senior",
            question: "How to find the longest palindromic substring efficiently?",
            answers: [
                "Check all substrings - O(n³)",
                "Expand around centers - O(n²), or Manacher's algorithm - O(n)",
                "Dynamic programming - O(n²) time and space",
                "Recursion - exponential"
            ],
            correct: 1,
            explanation: "Expand around centers (simpler than Manacher's):\n```csharp\npublic string LongestPalindrome(string s) {\n    if (string.IsNullOrEmpty(s)) return \"\";\n    int start = 0, maxLen = 0;\n    \n    for (int i = 0; i < s.Length; i++) {\n        // Odd length palindromes\n        int len1 = ExpandAroundCenter(s, i, i);\n        // Even length palindromes\n        int len2 = ExpandAroundCenter(s, i, i + 1);\n        int len = Math.Max(len1, len2);\n        \n        if (len > maxLen) {\n            maxLen = len;\n            start = i - (len - 1) / 2;\n        }\n    }\n    return s.Substring(start, maxLen);\n}\n\nint ExpandAroundCenter(string s, int left, int right) {\n    while (left >= 0 && right < s.Length && s[left] == s[right]) {\n        left--; right++;\n    }\n    return right - left - 1;\n}\n```\nTime: O(n²), Space: O(1)"
        },

        // Performance Optimization Questions
        {
            category: "system-design",
            level: "mid",
            question: "What's the difference between lazy loading and eager loading?",
            answers: [
                "No difference",
                "Lazy loads data on-demand, eager loads everything upfront",
                "Lazy is always faster",
                "Eager uses less memory"
            ],
            correct: 1,
            explanation: "Lazy Loading:\n- Pros: Faster initial load, less memory if data not needed\n- Cons: N+1 query problem, unpredictable performance\n- Use: Large datasets, optional data\n\nEager Loading:\n- Pros: Predictable performance, fewer queries\n- Cons: Slower initial load, more memory\n- Use: Required data, avoiding N+1\n\nExample (EF Core):\n```csharp\n// Lazy: N+1 queries\nvar users = context.Users.ToList();\nforeach(var u in users) Console.WriteLine(u.Orders.Count); // Query per user!\n\n// Eager: 1 query with JOIN\nvar users = context.Users.Include(u => u.Orders).ToList();\n```"
        },
        {
            category: "system-design",
            level: "senior",
            question: "How does database connection pooling improve performance?",
            answers: [
                "Makes queries faster",
                "Reuses connections instead of creating new ones - reduces overhead",
                "Increases database capacity",
                "Caches query results"
            ],
            correct: 1,
            explanation: "Connection Pooling benefits:\n1. Eliminates connection creation overhead (TCP handshake, auth, etc.)\n2. Limits max connections to database\n3. Reuses existing connections\n\nWithout pooling: Each request creates new connection (~100ms overhead)\nWith pooling: Reuse from pool (~1ms)\n\n```csharp\n// Connection string with pooling\n\"Server=db;Database=app;Pooling=true;Min Pool Size=5;Max Pool Size=100;\"\n\n// Best practice: using statement ensures return to pool\nusing (var conn = new SqlConnection(connString)) {\n    conn.Open();\n    // Use connection\n} // Returns to pool, doesn't close\n```\nTypical pool size: 10-100 connections"
        },
        {
            category: "system-design",
            level: "senior",
            question: "What is database query result caching and when should you avoid it?",
            answers: [
                "Always use caching",
                "Cache frequently read, rarely changing data; avoid for real-time or rapidly changing data",
                "Only cache small results",
                "Never use caching"
            ],
            correct: 1,
            explanation: "When to CACHE:\n- Read-heavy workloads (95%+ reads)\n- Expensive queries (complex joins, aggregations)\n- Infrequently changing data\n- Acceptable stale data\n\nWhen to AVOID:\n- Real-time requirements\n- Frequently updated data\n- User-specific data (low hit rate)\n- Large result sets (memory pressure)\n\nInvalidation strategies:\n1. Time-based (TTL): Expire after X seconds\n2. Event-based: Clear on updates\n3. Write-through: Update cache on write\n\n```csharp\npublic async Task<List<Product>> GetProducts() {\n    var cacheKey = \"products:all\";\n    var cached = await cache.GetAsync(cacheKey);\n    if (cached != null) return cached;\n    \n    var products = await db.Products.ToListAsync();\n    await cache.SetAsync(cacheKey, products, TimeSpan.FromMinutes(5));\n    return products;\n}\n```"
        },
        {
            category: "programming",
            level: "senior",
            question: "How does StringBuilder improve string concatenation performance?",
            answers: [
                "Uses better algorithm",
                "Mutable buffer avoids creating new strings each concat - O(n) vs O(n²)",
                "Compresses strings",
                "Uses parallel processing"
            ],
            correct: 1,
            explanation: "String is immutable in C#:\n```csharp\n// BAD: O(n²) - creates n intermediate strings\nstring result = \"\";\nfor (int i = 0; i < 1000; i++)\n    result += i.ToString(); // Creates new string each time!\n\n// GOOD: O(n) - single mutable buffer\nvar sb = new StringBuilder();\nfor (int i = 0; i < 1000; i++)\n    sb.Append(i);\nstring result = sb.ToString();\n```\n\nPerformance:\n- 100 concats: String ~10x slower\n- 1000 concats: String ~100x slower\n- 10000 concats: String ~1000x slower\n\nRule: Use StringBuilder for 3+ concatenations in loops"
        },

        // Security Questions
        {
            category: "system-design",
            level: "mid",
            question: "What is SQL injection and what's the BEST prevention?",
            answers: [
                "Input validation only",
                "Parameterized queries/prepared statements - not string concatenation",
                "Escape special characters",
                "Use stored procedures only"
            ],
            correct: 1,
            explanation: "SQL Injection: Malicious SQL code inserted via user input\n\n```csharp\n// VULNERABLE - DON'T DO THIS!\nstring query = \"SELECT * FROM Users WHERE Username='\" + username + \"'\";\n// Attack: username = \"' OR '1'='1\" → returns all users!\n\n// SAFE - Use parameters\nvar cmd = new SqlCommand(\n    \"SELECT * FROM Users WHERE Username=@username\", conn);\ncmd.Parameters.AddWithValue(\"@username\", username);\n\n// Or with EF/Dapper:\nvar user = context.Users.FirstOrDefault(u => u.Username == username);\nvar user = connection.QueryFirst<User>(\n    \"SELECT * FROM Users WHERE Username=@user\", \n    new { user = username });\n```\nParameterized queries treat input as data, not code."
        },
        {
            category: "system-design",
            level: "mid",
            question: "What is XSS (Cross-Site Scripting) and how to prevent it?",
            answers: [
                "Server-side only issue",
                "Injecting malicious scripts into web pages; prevent by encoding output and CSP",
                "Only affects old browsers",
                "Use HTTPS"
            ],
            correct: 1,
            explanation: "XSS: Attacker injects malicious JavaScript executed in victim's browser\n\nTypes:\n1. Reflected: URL parameter → immediate execution\n2. Stored: Saved to DB → affects all users\n3. DOM-based: Client-side manipulation\n\nPrevention:\n```csharp\n// ASP.NET Core automatically encodes by default\n@Model.UserInput  // Encoded: <script> → &lt;script&gt;\n@Html.Raw(Model.UserInput)  // DANGEROUS - unencoded!\n\n// Manual encoding when needed:\nvar safe = System.Web.HttpUtility.HtmlEncode(userInput);\n\n// Content Security Policy header:\nresponse.Headers.Add(\"Content-Security-Policy\", \n    \"default-src 'self'; script-src 'self'\");\n```\n\nAlso:\n- Validate input (whitelist)\n- Use HttpOnly cookies\n- Implement CSP headers"
        },
        {
            category: "system-design",
            level: "senior",
            question: "What's the difference between authentication and authorization?",
            answers: [
                "Same thing",
                "Authentication verifies identity (who you are), authorization verifies permissions (what you can do)",
                "Authentication is for APIs only",
                "Authorization happens first"
            ],
            correct: 1,
            explanation: "Authentication: WHO are you?\n- Login with username/password\n- JWT tokens\n- OAuth/OpenID Connect\n- Multi-factor authentication\n\nAuthorization: WHAT can you do?\n- Role-based (RBAC)\n- Claims-based\n- Policy-based\n- Resource-based\n\n```csharp\n// ASP.NET Core example\n[Authorize] // Authentication: must be logged in\npublic class SecureController : Controller {\n    \n    [Authorize(Roles = \"Admin\")] // Authorization: must have Admin role\n    public IActionResult DeleteUser(int id) { }\n    \n    [Authorize(Policy = \"CanEditDocument\")] // Authorization: custom policy\n    public IActionResult EditDocument(int id) { }\n}\n```\n\nFlow: Authentication → Authorization → Access"
        },
        {
            category: "system-design",
            level: "senior",
            question: "What is CSRF (Cross-Site Request Forgery) and how to prevent it?",
            answers: [
                "Same as XSS",
                "Tricks authenticated user into executing unwanted actions; prevent with anti-CSRF tokens",
                "Only affects GET requests",
                "Solved by HTTPS"
            ],
            correct: 1,
            explanation: "CSRF: Attacker tricks victim's browser into making authenticated request\n\nAttack scenario:\n1. User logs into bank.com (gets session cookie)\n2. Visits evil.com (while still logged in)\n3. evil.com contains: <img src=\"bank.com/transfer?to=attacker&amount=1000\">\n4. Browser sends request WITH session cookie\n5. Bank processes it (thinks it's legitimate)\n\nPrevention:\n```csharp\n// ASP.NET Core - Anti-forgery token\n// In form:\n<form method=\"post\">\n    @Html.AntiForgeryToken()\n    <!-- form fields -->\n</form>\n\n// In controller:\n[HttpPost]\n[ValidateAntiForgeryToken]\npublic IActionResult Transfer(TransferModel model) { }\n\n// Or globally:\nservices.AddControllersWithViews(options => \n    options.Filters.Add(new AutoValidateAntiforgeryTokenAttribute()));\n```\n\nAlso:\n- SameSite cookie attribute\n- Check Referer header\n- Require re-authentication for sensitive actions"
        },
        {
            category: "system-design",
            level: "senior",
            question: "What are the key principles of secure password storage?",
            answers: [
                "Encrypt passwords",
                "Hash with salt using bcrypt/Argon2 - never store plaintext or use MD5/SHA1",
                "Store in secure database",
                "Use strong encryption algorithm"
            ],
            correct: 1,
            explanation: "NEVER:\n❌ Store plaintext\n❌ Use reversible encryption\n❌ Use fast hashes (MD5, SHA1, SHA256)\n❌ Hash without salt\n\nALWAYS:\n✅ Use slow hashing algorithms (bcrypt, Argon2, PBKDF2)\n✅ Use unique salt per password\n✅ Use high work factor/iterations\n\n```csharp\nusing BCrypt.Net;\n\n// Registration - hash password\npublic void CreateUser(string username, string password) {\n    string hashedPassword = BCrypt.HashPassword(password, \n        workFactor: 12); // Higher = slower = more secure\n    // Store hashedPassword in database\n}\n\n// Login - verify password\npublic bool ValidateUser(string username, string password) {\n    string hashedPassword = GetHashedPasswordFromDb(username);\n    return BCrypt.Verify(password, hashedPassword);\n}\n```\n\nWhy slow hashing?\n- Prevents brute force attacks\n- bcrypt with work factor 12: ~250ms per attempt\n- Attacker needs years to crack instead of seconds\n\nSalt prevents rainbow table attacks."
        },
        // Big O Complexity - from coding-interview-university & tech-interview-handbook
        {
            category: "algorithms",
            level: "mid",
            question: "What is the time complexity to add/remove elements at the END of a dynamic array (amortized)?",
            answers: [
                "O(n) - always requires shifting elements",
                "O(1) - amortized constant time",
                "O(log n) - binary search needed",
                "O(n²) - all elements need updating"
            ],
            correct: 1,
            explanation: "Dynamic array add/remove at END:\n\nTime Complexity: **O(1) amortized**\n\nWhy amortized?\n- Most operations are O(1)\n- Occasionally need to resize (double capacity) = O(n)\n- Cost distributed across many operations\n\n```csharp\n// C# List<T> implementation\nvar list = new List<int>(); // capacity = 4\nlist.Add(1); // O(1)\nlist.Add(2); // O(1)\nlist.Add(3); // O(1)\nlist.Add(4); // O(1)\nlist.Add(5); // O(n) - resize to capacity 8, copy all elements\nlist.Add(6); // O(1)\n// ...\nlist.Add(8); // O(1)\nlist.Add(9); // O(n) - resize to capacity 16\n```\n\nAmortized analysis:\n- n insertions cause ~log₂(n) resizes\n- Total work: n + n/2 + n/4 + ... ≈ 2n\n- Average per operation: 2n/n = O(1)\n\nContrast with middle insertion:\n```csharp\nlist.Insert(0, x); // O(n) - shift all elements\nlist.RemoveAt(0);  // O(n) - shift all elements\n```\n\nKey takeaway: Array operations at END = O(1), at MIDDLE = O(n)"
        },
        {
            category: "algorithms",
            level: "senior",
            question: "What's the time complexity of QuickSort in average vs worst case?",
            answers: [
                "Average O(n log n), Worst O(n log n) - always same",
                "Average O(n log n), Worst O(n²) - bad pivot selection",
                "Average O(n²), Worst O(n³)",
                "Average O(log n), Worst O(n)"
            ],
            correct: 1,
            explanation: "QuickSort Complexity:\n\n**Average Case: O(n log n)**\n- Good pivot splits array ~evenly\n- Recursion depth: log n\n- Work per level: n\n- Total: n × log n\n\n**Worst Case: O(n²)**\n- Bad pivot (smallest/largest element each time)\n- Array becomes [pivot | rest] = unbalanced\n- Recursion depth: n\n- Total: n + (n-1) + (n-2) + ... = n²\n\n```csharp\npublic void QuickSort(int[] arr, int low, int high) {\n    if (low < high) {\n        int pivotIndex = Partition(arr, low, high);\n        QuickSort(arr, low, pivotIndex - 1);\n        QuickSort(arr, pivotIndex + 1, high);\n    }\n}\n\nprivate int Partition(int[] arr, int low, int high) {\n    int pivot = arr[high]; // Last element as pivot\n    int i = low - 1;\n    \n    for (int j = low; j < high; j++) {\n        if (arr[j] <= pivot) {\n            i++;\n            Swap(arr, i, j);\n        }\n    }\n    Swap(arr, i + 1, high);\n    return i + 1;\n}\n```\n\n**Worst case trigger**: Already sorted array with last element pivot\n[1,2,3,4,5] → pivot=5 → [1,2,3,4 | 5 | empty]\n\n**Improvements**:\n✅ Random pivot selection\n✅ Median-of-three\n✅ Switch to insertion sort for small subarrays\n\n**Space complexity**: O(log n) average (recursion stack)\n\n**Why use QuickSort?**\n- In-place (unlike MergeSort)\n- Cache-friendly\n- Excellent average performance\n- Used in C# Array.Sort() for value types"
        },
        {
            category: "algorithms",
            level: "senior",
            question: "Compare time complexity: Binary Search Tree vs Hash Table lookup?",
            answers: [
                "BST O(log n), Hash O(1) average - Hash faster for simple lookups",
                "BST O(1), Hash O(n) - BST always faster",
                "Both O(log n) - same performance",
                "BST O(n²), Hash O(1) - Hash always better"
            ],
            correct: 0,
            explanation: "Lookup Time Complexity:\n\n**Hash Table: O(1) average, O(n) worst**\n- Hash function: O(1)\n- Direct array access: O(1)\n- Collision handling (rare): O(n) worst\n\n**BST: O(log n) average, O(n) worst**\n- Balanced tree: O(log n)\n- Degenerate tree (linked list): O(n)\n\n```csharp\n// Hash Table (Dictionary)\nvar dict = new Dictionary<string, int>();\ndict[\"key\"] = 42;          // O(1) average\nint value = dict[\"key\"];    // O(1) average\n\n// Binary Search Tree\nvar bst = new TreeSet<int>();\nbst.Add(42);                // O(log n) balanced\nbool exists = bst.Contains(42); // O(log n) balanced\n```\n\n**When to use Hash Table:**\n✅ Need O(1) lookup\n✅ Don't need ordering\n✅ Keys have good hash function\n✅ Example: caching, counting frequencies\n\n**When to use BST:**\n✅ Need sorted order\n✅ Need range queries (find all between x and y)\n✅ Need min/max efficiently\n✅ Example: ordered statistics, range searches\n\n```csharp\n// BST advantages - ordered operations\nvar sortedSet = new SortedSet<int> { 5, 2, 8, 1, 9 };\nvar inRange = sortedSet.GetViewBetween(2, 8); // [2,5,8] - O(log n)\nint min = sortedSet.Min; // 1 - O(log n)\nint max = sortedSet.Max; // 9 - O(log n)\n\n// Hash Table can't do this efficiently!\n```\n\n**Space complexity**: Both O(n)\n\n**Practical note**: Modern hash tables (C# Dictionary) have excellent average-case performance with good hash functions and load factor management."
        },
        {
            category: "algorithms",
            level: "mid",
            question: "What is the space complexity of MergeSort?",
            answers: [
                "O(1) - in-place sorting",
                "O(log n) - recursion stack only",
                "O(n) - requires temporary arrays",
                "O(n²) - quadratic space"
            ],
            correct: 2,
            explanation: "MergeSort Space Complexity: **O(n)**\n\nWhy?\n- Needs temporary array to merge subarrays\n- Can't merge in-place efficiently\n- Each level of recursion needs space for merging\n\n```csharp\npublic void MergeSort(int[] arr, int left, int right) {\n    if (left < right) {\n        int mid = (left + right) / 2;\n        MergeSort(arr, left, mid);\n        MergeSort(arr, mid + 1, right);\n        Merge(arr, left, mid, right); // Needs O(n) space\n    }\n}\n\nprivate void Merge(int[] arr, int left, int mid, int right) {\n    int n1 = mid - left + 1;\n    int n2 = right - mid;\n    \n    // Temporary arrays - O(n) space!\n    int[] L = new int[n1];\n    int[] R = new int[n2];\n    \n    Array.Copy(arr, left, L, 0, n1);\n    Array.Copy(arr, mid + 1, R, 0, n2);\n    \n    // Merge back into arr\n    int i = 0, j = 0, k = left;\n    while (i < n1 && j < n2) {\n        arr[k++] = L[i] <= R[j] ? L[i++] : R[j++];\n    }\n    while (i < n1) arr[k++] = L[i++];\n    while (j < n2) arr[k++] = R[j++];\n}\n```\n\n**Space breakdown**:\n- Temporary arrays for merging: O(n)\n- Recursion call stack: O(log n)\n- Total: O(n) + O(log n) = **O(n)**\n\n**Comparison with other sorts**:\n\n| Algorithm | Time | Space | Stable | In-place |\n|-----------|------|-------|--------|----------|\n| MergeSort | O(n log n) | O(n) | ✅ | ❌ |\n| QuickSort | O(n log n) avg | O(log n) | ❌ | ✅ |\n| HeapSort | O(n log n) | O(1) | ❌ | ✅ |\n\n**When to use MergeSort**:\n✅ Need stable sort\n✅ Guaranteed O(n log n) worst case\n✅ External sorting (disk-based)\n✅ Space is not a constraint\n\n**When to avoid**:\n❌ Limited memory\n❌ Need in-place sorting"
        },
        {
            category: "algorithms",
            level: "principal",
            question: "What's the time complexity for finding Lowest Common Ancestor (LCA) in a Binary Tree?",
            answers: [
                "O(1) with preprocessing",
                "O(log n) with binary search",
                "O(n) - may need to traverse entire tree",
                "O(n²) - check all pairs"
            ],
            correct: 2,
            explanation: "LCA (Lowest Common Ancestor) Time Complexity:\n\n**Basic approach: O(n)**\n- Must potentially visit all nodes\n- No ordering property to exploit (not BST)\n\n```csharp\npublic class TreeNode {\n    public int val;\n    public TreeNode left, right;\n}\n\n// O(n) solution - single pass\npublic TreeNode LowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n    // Base case\n    if (root == null || root == p || root == q)\n        return root;\n    \n    // Search left and right subtrees\n    TreeNode left = LowestCommonAncestor(root.left, p, q);\n    TreeNode right = LowestCommonAncestor(root.right, p, q);\n    \n    // If both sides return non-null, root is LCA\n    if (left != null && right != null)\n        return root;\n    \n    // Otherwise, return non-null side\n    return left != null ? left : right;\n}\n```\n\n**For BST: O(log n) average**\nCan use ordering property:\n```csharp\npublic TreeNode LCA_BST(TreeNode root, TreeNode p, TreeNode q) {\n    while (root != null) {\n        if (p.val < root.val && q.val < root.val)\n            root = root.left;  // Both in left subtree\n        else if (p.val > root.val && q.val > root.val)\n            root = root.right; // Both in right subtree\n        else\n            return root;       // Split point = LCA\n    }\n    return null;\n}\n```\n\n**Optimized with preprocessing: O(1) query**\nUse techniques like:\n- Sparse Table: O(n log n) preprocessing, O(1) query\n- Segment Tree: O(n) preprocessing, O(log n) query\n\n```csharp\n// Example: Store parent pointers and depths\npublic class LCAPreprocessor {\n    private Dictionary<TreeNode, TreeNode> parent;\n    private Dictionary<TreeNode, int> depth;\n    \n    public LCAPreprocessor(TreeNode root) {\n        parent = new Dictionary<TreeNode, TreeNode>();\n        depth = new Dictionary<TreeNode, int>();\n        DFS(root, null, 0); // O(n) preprocessing\n    }\n    \n    private void DFS(TreeNode node, TreeNode par, int d) {\n        if (node == null) return;\n        parent[node] = par;\n        depth[node] = d;\n        DFS(node.left, node, d + 1);\n        DFS(node.right, node, d + 1);\n    }\n    \n    public TreeNode GetLCA(TreeNode p, TreeNode q) { // O(h) = O(log n)\n        // Bring both to same level\n        while (depth[p] > depth[q]) p = parent[p];\n        while (depth[q] > depth[p]) q = parent[q];\n        \n        // Move up together until meet\n        while (p != q) {\n            p = parent[p];\n            q = parent[q];\n        }\n        return p;\n    }\n}\n```\n\n**Use cases**:\n- Version control systems (git merge base)\n- File system hierarchies\n- Organizational charts"
        },
        // Data Structures from repositories
        {
            category: "algorithms",
            level: "mid",
            question: "What's the primary advantage of a Hash Table over an Array?",
            answers: [
                "Uses less memory",
                "O(1) lookup by key (not just index) - fast access with meaningful keys",
                "Always faster",
                "Maintains sorted order"
            ],
            correct: 1,
            explanation: "Hash Table vs Array:\n\n**Array**: Access by index only\n```csharp\nstring[] users = new string[100];\nusers[0] = \"Alice\";  // Must know index\nstring name = users[0];\n```\n\n**Hash Table**: Access by meaningful key\n```csharp\nvar users = new Dictionary<string, User>();\nusers[\"alice@example.com\"] = new User(\"Alice\");\nUser alice = users[\"alice@example.com\"]; // O(1) lookup by email!\n```\n\n**Key Advantage**: **O(1) lookup with semantic keys**\n\n**How it works**:\n1. Hash function: key → integer\n2. Modulo: integer → array index\n3. Store at index (handle collisions)\n\n```csharp\n// Simplified hash table\npublic class SimpleHashTable<K, V> {\n    private class Entry {\n        public K Key;\n        public V Value;\n        public Entry Next; // For chaining\n    }\n    \n    private Entry[] buckets;\n    private int size;\n    \n    public SimpleHashTable(int capacity = 16) {\n        buckets = new Entry[capacity];\n    }\n    \n    private int GetBucketIndex(K key) {\n        int hash = key.GetHashCode();\n        return Math.Abs(hash) % buckets.Length;\n    }\n    \n    public void Add(K key, V value) {\n        int index = GetBucketIndex(key);\n        \n        // Check if key exists\n        for (var curr = buckets[index]; curr != null; curr = curr.Next) {\n            if (curr.Key.Equals(key)) {\n                curr.Value = value; // Update\n                return;\n            }\n        }\n        \n        // Add new entry (chaining)\n        var newEntry = new Entry { Key = key, Value = value, Next = buckets[index] };\n        buckets[index] = newEntry;\n        size++;\n        \n        // Resize if load factor > 0.75\n        if (size > buckets.Length * 0.75)\n            Resize();\n    }\n    \n    public bool TryGetValue(K key, out V value) {\n        int index = GetBucketIndex(key);\n        \n        for (var curr = buckets[index]; curr != null; curr = curr.Next) {\n            if (curr.Key.Equals(key)) {\n                value = curr.Value;\n                return true;\n            }\n        }\n        \n        value = default(V);\n        return false;\n    }\n}\n```\n\n**Collision handling**:\n1. **Chaining**: Each bucket is a linked list\n2. **Open addressing**: Find next empty slot\n   - Linear probing: check next slot\n   - Quadratic probing: check i² slots away\n   - Double hashing: use second hash function\n\n**Time complexity**:\n- Average: O(1) for add, get, remove\n- Worst: O(n) if all keys collide\n\n**Space complexity**: O(n)\n\n**Use cases**:\n- Caching (key = URL, value = response)\n- Counting frequencies\n- Deduplication\n- Database indexing"
        },
        {
            category: "algorithms",
            level: "senior",
            question: "How does a Heap differ from a Binary Search Tree?",
            answers: [
                "No difference - they're the same",
                "Heap: parent ≥ children (partial order), O(1) max; BST: left < parent < right (total order), O(log n) search",
                "Heap is always balanced, BST never is",
                "Heap is faster for all operations"
            ],
            correct: 1,
            explanation: "Heap vs Binary Search Tree:\n\n**HEAP (Max Heap)**:\n- **Property**: Parent ≥ all children (partial order)\n- **Structure**: Complete binary tree (filled left to right)\n- **Strengths**: O(1) find max, O(log n) insert/remove\n- **Weakness**: O(n) search for arbitrary element\n\n**BST (Binary Search Tree)**:\n- **Property**: Left < Parent < Right (total order)\n- **Structure**: Can be unbalanced\n- **Strengths**: O(log n) search/insert/remove (if balanced)\n- **Weakness**: O(n) if degenerate (becomes linked list)\n\n```csharp\n// MAX HEAP EXAMPLE\n//       90\n//      /  \\\n//     85   70\n//    / \\   /\n//   50 60 40\n// Parent ≥ children, but 85 > 70 (no left < right rule)\n\n// BST EXAMPLE\n//       50\n//      /  \\\n//     30   70\n//    / \\   / \\\n//   20 40 60 90\n// Left < Parent < Right (strictly ordered)\n```\n\n**Implementation**:\n\n```csharp\n// HEAP (array-based, complete binary tree)\npublic class MaxHeap {\n    private List<int> heap = new List<int>();\n    \n    private int Parent(int i) => (i - 1) / 2;\n    private int Left(int i) => 2 * i + 1;\n    private int Right(int i) => 2 * i + 2;\n    \n    public void Insert(int val) { // O(log n)\n        heap.Add(val);\n        SiftUp(heap.Count - 1);\n    }\n    \n    private void SiftUp(int i) {\n        while (i > 0 && heap[i] > heap[Parent(i)]) {\n            Swap(i, Parent(i));\n            i = Parent(i);\n        }\n    }\n    \n    public int ExtractMax() { // O(log n)\n        if (heap.Count == 0) throw new InvalidOperationException();\n        int max = heap[0];\n        heap[0] = heap[heap.Count - 1];\n        heap.RemoveAt(heap.Count - 1);\n        if (heap.Count > 0) SiftDown(0);\n        return max;\n    }\n    \n    private void SiftDown(int i) {\n        int maxIndex = i;\n        int left = Left(i);\n        if (left < heap.Count && heap[left] > heap[maxIndex])\n            maxIndex = left;\n        int right = Right(i);\n        if (right < heap.Count && heap[right] > heap[maxIndex])\n            maxIndex = right;\n        \n        if (i != maxIndex) {\n            Swap(i, maxIndex);\n            SiftDown(maxIndex);\n        }\n    }\n    \n    public int GetMax() => heap[0]; // O(1)!\n}\n\n// BST (node-based)\npublic class BST {\n    public class Node {\n        public int val;\n        public Node left, right;\n    }\n    \n    private Node root;\n    \n    public void Insert(int val) { // O(log n) average\n        root = InsertRec(root, val);\n    }\n    \n    private Node InsertRec(Node node, int val) {\n        if (node == null) return new Node { val = val };\n        \n        if (val < node.val)\n            node.left = InsertRec(node.left, val);\n        else\n            node.right = InsertRec(node.right, val);\n        \n        return node;\n    }\n    \n    public bool Search(int val) { // O(log n) average\n        return SearchRec(root, val);\n    }\n    \n    private bool SearchRec(Node node, int val) {\n        if (node == null) return false;\n        if (node.val == val) return true;\n        return val < node.val \n            ? SearchRec(node.left, val)\n            : SearchRec(node.right, val);\n    }\n}\n```\n\n**When to use**:\n\n**Heap**:\n✅ Priority queue\n✅ Heap sort\n✅ K-th largest/smallest\n✅ Median of stream (two heaps)\n\n**BST**:\n✅ Ordered data\n✅ Range queries\n✅ Predecessor/successor\n✅ Sorted iteration\n\n**Time complexity comparison**:\n\n| Operation | Heap | BST (balanced) |\n|-----------|------|----------------|\n| Find min/max | O(1) | O(log n) |\n| Insert | O(log n) | O(log n) |\n| Delete | O(log n) | O(log n) |\n| Search | O(n) | O(log n) |\n| Build | O(n) | O(n log n) |"
        },
        // Recursion & Dynamic Programming
        {
            category: "algorithms",
            level: "senior",
            question: "What's the key difference between recursion and dynamic programming?",
            answers: [
                "No difference - DP always uses recursion",
                "DP avoids recomputing same subproblems via memoization/tabulation",
                "Recursion is always faster",
                "DP only works for sorting problems"
            ],
            correct: 1,
            explanation: "Recursion vs Dynamic Programming:\n\n**Problem**: Fibonacci sequence\n\n**Naive Recursion** - O(2ⁿ) - SLOW!\n```csharp\npublic int Fib(int n) {\n    if (n <= 1) return n;\n    return Fib(n-1) + Fib(n-2); // Recomputes same values!\n}\n// Fib(5) calls Fib(3) twice, Fib(2) three times, etc.\n```\n\nCall tree for Fib(5):\n```\n                Fib(5)\n              /        \\\n         Fib(4)        Fib(3)\n        /     \\        /     \\\n    Fib(3)  Fib(2)  Fib(2)  Fib(1)\n   /    \\    /   \\   /   \\\n Fib(2) Fib(1) ...\n```\nNotice Fib(3), Fib(2) computed multiple times!\n\n**Dynamic Programming Solution 1: Memoization** - O(n)\n```csharp\n// Top-down with memoization (cache)\nprivate Dictionary<int, int> memo = new Dictionary<int, int>();\n\npublic int FibMemo(int n) {\n    if (n <= 1) return n;\n    \n    if (memo.ContainsKey(n))\n        return memo[n]; // Return cached result\n    \n    memo[n] = FibMemo(n-1) + FibMemo(n-2);\n    return memo[n];\n}\n// Each Fib(k) computed only once!\n```\n\n**Dynamic Programming Solution 2: Tabulation** - O(n)\n```csharp\n// Bottom-up with table\npublic int FibTab(int n) {\n    if (n <= 1) return n;\n    \n    int[] dp = new int[n + 1];\n    dp[0] = 0;\n    dp[1] = 1;\n    \n    for (int i = 2; i <= n; i++) {\n        dp[i] = dp[i-1] + dp[i-2];\n    }\n    \n    return dp[n];\n}\n```\n\n**Space-optimized DP** - O(1) space\n```csharp\npublic int FibOptimized(int n) {\n    if (n <= 1) return n;\n    \n    int prev2 = 0, prev1 = 1;\n    \n    for (int i = 2; i <= n; i++) {\n        int current = prev1 + prev2;\n        prev2 = prev1;\n        prev1 = current;\n    }\n    \n    return prev1;\n}\n```\n\n**Performance comparison**:\n```\nFib(30):\n- Naive recursion: 1.3 seconds (2,692,537 calls)\n- Memoization: 0.001 seconds (59 calls)\n- Tabulation: 0.0005 seconds (no recursion overhead)\n```\n\n**DP Requirements**:\n1. **Optimal substructure**: Solution built from subproblems\n2. **Overlapping subproblems**: Same subproblems recomputed\n\n**Classic DP problems**:\n- Fibonacci\n- Coin change\n- Longest common subsequence\n- Knapsack 0/1\n- Edit distance\n- Matrix chain multiplication\n\n**When to use DP**:\n✅ Optimization problems (min/max)\n✅ Counting problems\n✅ Overlapping subproblems\n✅ Can define recurrence relation\n\n**DP approaches**:\n1. **Memoization** (top-down): Start with big problem, cache results\n2. **Tabulation** (bottom-up): Start with base cases, build up\n\nMemoization pros: Only computes needed subproblems\nTabulation pros: No recursion overhead, predictable memory"
        },
        // Graph Algorithms
        {
            category: "algorithms",
            level: "senior",
            question: "When should you use BFS vs DFS for graph traversal?",
            answers: [
                "Always use BFS - it's faster",
                "BFS for shortest path (unweighted), DFS for detecting cycles/topological sort",
                "DFS is always better - uses less memory",
                "No difference - both are exactly the same"
            ],
            correct: 1,
            explanation: "BFS (Breadth-First Search) vs DFS (Depth-First Search):\n\n**BFS - Level by level (Queue)**\n```csharp\npublic void BFS(Graph g, int start) {\n    var visited = new HashSet<int>();\n    var queue = new Queue<int>();\n    \n    visited.Add(start);\n    queue.Enqueue(start);\n    \n    while (queue.Count > 0) {\n        int node = queue.Dequeue();\n        Console.WriteLine(node);\n        \n        foreach (int neighbor in g.GetNeighbors(node)) {\n            if (!visited.Contains(neighbor)) {\n                visited.Add(neighbor);\n                queue.Enqueue(neighbor);\n            }\n        }\n    }\n}\n```\n\n**DFS - Go deep first (Stack/Recursion)**\n```csharp\npublic void DFS(Graph g, int node, HashSet<int> visited) {\n    visited.Add(node);\n    Console.WriteLine(node);\n    \n    foreach (int neighbor in g.GetNeighbors(node)) {\n        if (!visited.Contains(neighbor)) {\n            DFS(g, neighbor, visited);\n        }\n    }\n}\n\n// Iterative version\npublic void DFSIterative(Graph g, int start) {\n    var visited = new HashSet<int>();\n    var stack = new Stack<int>();\n    \n    stack.Push(start);\n    \n    while (stack.Count > 0) {\n        int node = stack.Pop();\n        \n        if (!visited.Contains(node)) {\n            visited.Add(node);\n            Console.WriteLine(node);\n            \n            foreach (int neighbor in g.GetNeighbors(node)) {\n                if (!visited.Contains(neighbor)) {\n                    stack.Push(neighbor);\n                }\n            }\n        }\n    }\n}\n```\n\n**Visual comparison**:\n```\nGraph:    1 --- 2\n          |     |\n          3 --- 4\n                |\n                5\n\nBFS from 1: 1, 2, 3, 4, 5 (level by level)\nDFS from 1: 1, 2, 4, 5, 3 (go deep first)\n```\n\n**When to use BFS**:\n✅ **Shortest path** in unweighted graph\n✅ Level-order traversal\n✅ Find connected components\n✅ Test bipartiteness\n\n```csharp\n// Shortest path with BFS\npublic int ShortestPath(Graph g, int start, int end) {\n    var queue = new Queue<(int node, int distance)>();\n    var visited = new HashSet<int>();\n    \n    queue.Enqueue((start, 0));\n    visited.Add(start);\n    \n    while (queue.Count > 0) {\n        var (node, distance) = queue.Dequeue();\n        \n        if (node == end) return distance;\n        \n        foreach (int neighbor in g.GetNeighbors(node)) {\n            if (!visited.Contains(neighbor)) {\n                visited.Add(neighbor);\n                queue.Enqueue((neighbor, distance + 1));\n            }\n        }\n    }\n    \n    return -1; // Not found\n}\n```\n\n**When to use DFS**:\n✅ **Detect cycles** in directed/undirected graph\n✅ **Topological sorting**\n✅ Find strongly connected components\n✅ Solve mazes\n✅ Generate permutations/combinations\n\n```csharp\n// Detect cycle with DFS\npublic bool HasCycle(Graph g) {\n    var visited = new HashSet<int>();\n    var recStack = new HashSet<int>(); // Recursion stack\n    \n    foreach (int node in g.GetAllNodes()) {\n        if (!visited.Contains(node)) {\n            if (HasCycleDFS(g, node, visited, recStack))\n                return true;\n        }\n    }\n    return false;\n}\n\nprivate bool HasCycleDFS(Graph g, int node, \n                         HashSet<int> visited, \n                         HashSet<int> recStack) {\n    visited.Add(node);\n    recStack.Add(node);\n    \n    foreach (int neighbor in g.GetNeighbors(node)) {\n        if (!visited.Contains(neighbor)) {\n            if (HasCycleDFS(g, neighbor, visited, recStack))\n                return true;\n        }\n        else if (recStack.Contains(neighbor)) {\n            return true; // Back edge = cycle\n        }\n    }\n    \n    recStack.Remove(node);\n    return false;\n}\n```\n\n**Complexity**:\n- Time: O(V + E) for both (V=vertices, E=edges)\n- Space: \n  - BFS: O(V) queue (all nodes at same level)\n  - DFS: O(h) stack (h=height, can be V in worst case)\n\n**Memory usage**:\n- BFS uses more memory (wide trees)\n- DFS uses less memory (deep trees)\n\n**Summary**:\n- **BFS**: Shortest path, level-order\n- **DFS**: Cycles, topology, backtracking"
        },
        // Behavioral questions from awesome-behavioral-interviews
        {
            category: "behavioral",
            level: "senior",
            question: "What's the STAR method for answering behavioral questions?",
            answers: [
                "Situation, Task, Action, Result - structured way to describe experiences",
                "Skills, Time, Accuracy, Reliability",
                "Start, Think, Answer, Reflect",
                "System, Testing, Architecture, Review"
            ],
            correct: 0,
            explanation: "STAR Method for Behavioral Interviews:\n\n**S - Situation**: Set the context\n- Where/when did this happen?\n- What was the background?\n- Keep it brief but specific\n\n**T - Task**: Describe your responsibility\n- What was your role?\n- What challenge/goal were you facing?\n- What was at stake?\n\n**A - Action**: Explain what YOU did\n- What specific steps did you take?\n- Focus on YOUR actions (not 'we')\n- Why did you choose this approach?\n\n**R - Result**: Share the outcome\n- What happened?\n- Quantify if possible (%, $, time saved)\n- What did you learn?\n\n**Example Question**: \"Tell me about a time you had to meet a tight deadline\"\n\n**Poor Answer**:\n\"I had a tight deadline once and worked really hard to finish it on time.\"\n\n**STAR Answer**:\n\n**Situation**: \"In my previous role at XYZ Corp, our client requested a critical feature 2 weeks before a major product launch. The marketing campaign was already scheduled.\"\n\n**Task**: \"As the lead developer, I needed to deliver a payment integration feature that normally takes 4 weeks, in just 2 weeks, without compromising quality or introducing bugs.\"\n\n**Action**: \"I took these steps:\n1. Breaking down the feature into must-haves vs nice-to-haves\n2. Negotiated with stakeholders to defer 2 non-critical requirements\n3. Set up daily 15-min standups to track progress and blockers\n4. Implemented automated tests first (TDD) to ensure quality\n5. Worked with QA to do parallel testing as I developed\n6. Coordinated with DevOps for smooth deployment\"\n\n**Result**: \"We delivered the core payment feature 1 day before the deadline. The launch was successful, processing $500K in transactions in the first week with zero payment-related bugs. The client was so impressed they extended our contract for another year. I learned that breaking down problems and clear communication with stakeholders can make even impossible deadlines achievable.\"\n\n**Tips**:\n✅ Use specific numbers/metrics\n✅ Focus on YOUR actions (use 'I' not 'we')\n✅ Show learning/growth\n✅ Be honest about challenges\n✅ Practice 15-20 stories covering different scenarios\n\n**Common Behavioral Topics**:\n- Leadership: \"Tell me about a time you led a team\"\n- Conflict: \"Describe a disagreement with a coworker\"\n- Failure: \"Tell me about a time you failed\"\n- Initiative: \"Give an example of going above and beyond\"\n- Problem-solving: \"Describe solving a complex technical issue\"\n- Adaptability: \"Tell me about dealing with major change\"\n\n**Preparation Strategy**:\n1. Write down 15-20 situations from your career\n2. For each, prepare full STAR response\n3. Practice out loud\n4. Time yourself (aim for 2-3 minutes)\n5. Have multiple stories ready (don't reuse same story)"
        }
    pl: [
        // Data Structures & Algorithms - Mid Level
        {
            category: "algorithms",
            level: "mid",
            question: "Jaka jest złożoność czasowa wyszukiwania w drzewie BST (Binary Search Tree) w najgorszym przypadku?",
            answers: [
                "O(1)",
                "O(log n)",
                "O(n)",
                "O(n log n)"
            ],
            correct: 2,
            explanation: "W najgorszym przypadku, gdy BST jest zdegenerowane (wszystkie węzły po jednej stronie), wyszukiwanie wymaga przejścia przez wszystkie n węzłów, dając O(n)."
        },
        {
            category: "algorithms",
            level: "mid",
            question: "Którą strukturę danych najlepiej użyć do implementacji LRU Cache?",
            answers: [
                "Stack",
                "Queue",
                "Hash Map + Doubly Linked List",
                "Binary Tree"
            ],
            correct: 2,
            explanation: "LRU Cache wymaga O(1) dostępu (Hash Map) i O(1) aktualizacji kolejności (Doubly Linked List). Kombinacja obu struktur daje optymalną wydajność."
        },
        {
            category: "algorithms",
            level: "mid",
            question: "Czym różni się BFS (Breadth-First Search) od DFS (Depth-First Search)?",
            answers: [
                "BFS używa stosu, DFS używa kolejki",
                "BFS używa kolejki, DFS używa stosu",
                "Oba używają kolejki",
                "Oba używają stosu"
            ],
            correct: 1,
            explanation: "BFS przeszukuje poziomami używając kolejki (FIFO), DFS przeszukuje w głąb używając stosu (LIFO) lub rekurencji."
        },
        {
            category: "algorithms",
            level: "mid",
            question: "Która struktura danych jest najbardziej efektywna dla implementacji kolejki priorytetowej?",
            answers: [
                "Array",
                "Linked List",
                "Binary Heap",
                "Hash Table"
            ],
            correct: 2,
            explanation: "Binary Heap oferuje O(log n) dla insert i delete-min/max, co jest optymalne dla priority queue. Array i Linked List wymagają O(n) dla niektórych operacji."
        },
        {
            category: "algorithms",
            level: "mid",
            question: "Jaka jest złożoność przestrzenna merge sort?",
            answers: [
                "O(1)",
                "O(log n)",
                "O(n)",
                "O(n²)"
            ],
            correct: 2,
            explanation: "Merge sort wymaga O(n) dodatkowej przestrzeni do łączenia podtablic podczas sortowania."
        },
        {
            category: "algorithms",
            level: "mid",
            question: "Który algorytm służy do znajdowania najkrótszej ścieżki w grafie ważonym z dodatnimi wagami?",
            answers: [
                "BFS",
                "DFS",
                "Algorytm Dijkstry",
                "Quick Sort"
            ],
            correct: 2,
            explanation: "Algorytm Dijkstry efektywnie znajduje najkrótszą ścieżkę w grafach ważonych z nieujemnymi wagami używając podejścia zachłannego."
        },

        // Data Structures & Algorithms - Senior Level
        {
            category: "algorithms",
            level: "senior",
            question: "Który algorytm sortowania ma najlepszą złożoność w najgorszym przypadku dla danych prawie posortowanych?",
            answers: [
                "Quick Sort",
                "Merge Sort",
                "Bubble Sort",
                "Insertion Sort"
            ],
            correct: 1,
            explanation: "Merge Sort gwarantuje O(n log n) w najgorszym przypadku. Quick Sort może mieć O(n²), a Bubble Sort zawsze O(n²). Insertion Sort jest O(n²), ale O(n) dla prawie posortowanych."
        },
        {
            category: "algorithms",
            level: "senior",
            question: "W algorytmie Dijkstry, dlaczego nie możemy użyć ujemnych wag krawędzi?",
            answers: [
                "Algorytm zawsze zwróci błąd",
                "Greedy approach może wybrać suboptymalne ścieżki",
                "Implementacja będzie zbyt skomplikowana",
                "Złożoność czasowa stanie się wykładnicza"
            ],
            correct: 1,
            explanation: "Dijkstra używa greedy approach i zakłada, że raz odwiedzona wierzchołek ma już najkrótszą ścieżkę. Ujemne wagi mogą sprawić, że późniejsze ścieżki będą krótsze."
        },
        {
            category: "algorithms",
            level: "senior",
            question: "Co to jest 'Amortized Time Complexity'?",
            answers: [
                "Najgorszy przypadek dla operacji",
                "Średni koszt operacji w sekwencji operacji",
                "Najlepszy przypadek dla operacji",
                "Złożoność przestrzenna"
            ],
            correct: 1,
            explanation: "Amortized time to średni koszt operacji w długiej sekwencji operacji. Np. dynamic array resize ma O(n) ale amortized O(1) dla append."
        },
        {
            category: "algorithms",
            level: "senior",
            question: "Jaka jest złożoność czasowa znajdowania k-tego najmniejszego elementu przy użyciu QuickSelect?",
            answers: [
                "O(n log n)",
                "O(n) średnio, O(n²) w najgorszym przypadku",
                "O(k log n)",
                "O(n + k)"
            ],
            correct: 1,
            explanation: "QuickSelect ma średnią złożoność O(n), ale może degradować do O(n²) w najgorszym przypadku bez randomizacji, podobnie jak QuickSort."
        },
        {
            category: "algorithms",
            level: "senior",
            question: "Jakiej struktury danych użyłbyś do efektywnej implementacji funkcji autocomplete?",
            answers: [
                "Hash Map",
                "Binary Search Tree",
                "Trie (Prefix Tree)",
                "Array"
            ],
            correct: 2,
            explanation: "Trie jest optymalne dla autocomplete, bo pozwala na wyszukiwanie O(k) gdzie k to długość prefiksu i efektywnie przechowuje wspólne prefiksy."
        },

        // System Design - Mid Level
        {
            category: "system-design",
            level: "mid",
            question: "Która strategia cache'owania jest najbardziej odpowiednia dla aplikacji z częstymi odczytami i rzadkimi zapisami?",
            answers: [
                "Write-through",
                "Write-behind",
                "Cache-aside (Lazy Loading)",
                "Write-around"
            ],
            correct: 2,
            explanation: "Cache-aside (Lazy Loading) jest idealny dla częstych odczytów - dane są ładowane do cache tylko gdy są potrzebne, minimalizując zbędne zapisy do cache."
        },
        {
            category: "system-design",
            level: "mid",
            question: "Co to jest 'thundering herd problem' w kontekście cache?",
            answers: [
                "Zbyt wiele requestów do cache powoduje jego przepełnienie",
                "Wiele requestów jednocześnie próbuje odświeżyć ten sam wygasły klucz cache",
                "Cache jest zbyt mały dla liczby użytkowników",
                "Distributed cache traci synchronizację"
            ],
            correct: 1,
            explanation: "Thundering herd występuje gdy cache key wygasa i wiele requestów jednocześnie próbuje go odświeżyć, powodując spike w obciążeniu bazy danych."
        },
        {
            category: "system-design",
            level: "mid",
            question: "Jaki jest główny cel Load Balancera?",
            answers: [
                "Zwiększenie bezpieczeństwa aplikacji",
                "Dystrybucja ruchu między wiele serwerów",
                "Kompresja danych przesyłanych do klienta",
                "Monitorowanie wydajności aplikacji"
            ],
            correct: 1,
            explanation: "Load Balancer dystrybuuje przychodzący ruch sieciowy między wiele serwerów, zwiększając wydajność i dostępność aplikacji."
        },
        {
            category: "system-design",
            level: "mid",
            question: "Która strategia shardingu zapewnia najbardziej równomierne rozłożenie danych?",
            answers: [
                "Range-based sharding",
                "Hash-based sharding",
                "Geographic sharding",
                "List-based sharding"
            ],
            correct: 1,
            explanation: "Hash-based sharding używa hash funkcji do równomiernego rozłożenia danych. Range-based może tworzyć hotspots jeśli klucze nie są równomiernie rozłożone."
        },
        {
            category: "system-design",
            level: "mid",
            question: "Co to jest skalowanie horyzontalne?",
            answers: [
                "Zwiększanie mocy istniejących serwerów",
                "Dodawanie większej liczby serwerów do rozłożenia obciążenia",
                "Optymalizacja zapytań do bazy danych",
                "Kompresja danych"
            ],
            correct: 1,
            explanation: "Skalowanie horyzontalne to dodawanie większej liczby serwerów do rozłożenia obciążenia, podczas gdy skalowanie wertykalne to zwiększanie mocy istniejących serwerów."
        },
        {
            category: "system-design",
            level: "mid",
            question: "Jaki jest cel CDN (Content Delivery Network)?",
            answers: [
                "Trwałe przechowywanie danych użytkowników",
                "Cache'owanie statycznej zawartości bliżej użytkowników geograficznie",
                "Przetwarzanie logiki backendowej",
                "Zarządzanie połączeniami do bazy danych"
            ],
            correct: 1,
            explanation: "CDN cache'uje statyczną zawartość (obrazy, CSS, JS) na serwerach geograficznie bliższych użytkownikom, redukując opóźnienia i poprawiając czas ładowania."
        },

        // System Design - Senior Level
        {
            category: "system-design",
            level: "senior",
            question: "Które z poniższych NIE jest dobrą praktyką dla projektowania mikrousług?",
            answers: [
                "Każdy serwis ma własną bazę danych",
                "Serwisy komunikują się przez REST lub message queue",
                "Wszystkie serwisy dzielą wspólną bibliotekę kodu biznesowego",
                "Serwisy są niezależnie deployowane"
            ],
            correct: 2,
            explanation: "Dzielenie wspólnej biblioteki kodu biznesowego tworzy coupling między serwisami i utrudnia ich niezależny development i deployment."
        },
        {
            category: "system-design",
            level: "senior",
            question: "W CAP theorem, co oznacza 'P' (Partition Tolerance)?",
            answers: [
                "System działa pomimo utraty niektórych partycji danych",
                "System kontynuuje działanie pomimo problemów z siecią między węzłami",
                "System może być podzielony geograficznie",
                "System toleruje częściowe zapisy"
            ],
            correct: 1,
            explanation: "Partition Tolerance oznacza, że system kontynuuje działanie nawet gdy występują problemy z komunikacją sieciową między węzłami (network partition)."
        },
        {
            category: "system-design",
            level: "senior",
            question: "Jaka jest główna różnica między bazami SQL a NoSQL?",
            answers: [
                "SQL jest zawsze szybsze",
                "NoSQL nie może obsługiwać złożonych zapytań",
                "SQL używa sztywnego schematu, NoSQL oferuje elastyczny schemat",
                "NoSQL nie wspiera transakcji"
            ],
            correct: 2,
            explanation: "Bazy SQL wymagają predefiniowanego schematu, podczas gdy bazy NoSQL oferują elastyczne modele danych bez schematu. Obie mają swoje zastosowania."
        },
        {
            category: "system-design",
            level: "senior",
            question: "Co to jest denormalizacja bazy danych i kiedy powinna być stosowana?",
            answers: [
                "Usunięcie wszystkich relacji między tabelami",
                "Dodanie redundantnych danych aby zmniejszyć joiny i poprawić wydajność odczytu",
                "Konwersja SQL na NoSQL",
                "Usunięcie indeksów"
            ],
            correct: 1,
            explanation: "Denormalizacja dodaje redundantne dane aby zmniejszyć drogie joiny, poprawiając wydajność odczytu kosztem złożoności zapisu i miejsca."
        },
        {
            category: "system-design",
            level: "senior",
            question: "Jaki jest cel kolejki komunikatów w systemach rozproszonych?",
            answers: [
                "Trwałe przechowywanie danych",
                "Umożliwienie asynchronicznej komunikacji i rozdzielenia serwisów",
                "Zastąpienie baz danych",
                "Kompresja ruchu sieciowego"
            ],
            correct: 1,
            explanation: "Kolejki komunikatów umożliwiają asynchroniczną, rozdzieloną komunikację między serwisami, poprawiając niezawodność i skalowalność poprzez buforowanie."
        },

        // Programming Languages - Mid Level
        {
            category: "programming",
            level: "mid",
            question: "Co to jest 'closure' w JavaScript?",
            answers: [
                "Funkcja, która automatycznie zamyka połączenia sieciowe",
                "Funkcja, która ma dostęp do zmiennych z zakresu zewnętrznego",
                "Metoda kończąca wykonanie programu",
                "Typ danych do przechowywania funkcji"
            ],
            correct: 1,
            explanation: "Closure to funkcja, która 'pamięta' zmienne ze swojego zakresu zewnętrznego, nawet po zakończeniu wykonania funkcji zewnętrznej."
        },
        {
            category: "programming",
            level: "mid",
            question: "Jaka jest różnica między '==' a '===' w JavaScript?",
            answers: [
                "Nie ma różnicy",
                "== porównuje wartość i typ, === tylko wartość",
                "=== porównuje wartość i typ, == tylko wartość",
                "== jest szybsze niż ==="
            ],
            correct: 2,
            explanation: "=== (strict equality) porównuje wartość I typ, podczas gdy == (loose equality) wykonuje konwersję typów przed porównaniem."
        },
        {
            category: "programming",
            level: "mid",
            question: "Co to jest 'GIL' (Global Interpreter Lock) w Pythonie?",
            answers: [
                "Mechanizm garbage collection",
                "Mutex zapobiegający równoległemu wykonywaniu bytecode Pythona",
                "System zarządzania pamięcią",
                "Narzędzie do debugowania"
            ],
            correct: 1,
            explanation: "GIL to mutex, który pozwala tylko jednemu wątkowi na raz wykonywać bytecode Pythona, co ogranicza wielowątkowość w CPU-bound tasks."
        },
        {
            category: "programming",
            level: "mid",
            question: "Co to jest 'Promise' w JavaScript?",
            answers: [
                "Synchroniczna funkcja",
                "Obiekt reprezentujący eventual completion (lub failure) asynchronicznej operacji",
                "Typ danych do przechowywania wartości",
                "Error handling mechanism"
            ],
            correct: 1,
            explanation: "Promise to obiekt reprezentujący eventual completion lub failure asynchronicznej operacji, z możliwością chainingu przez .then() i .catch()."
        },
        {
            category: "programming",
            level: "mid",
            question: "Co oznacza 'immutability' (niezmienność) w programowaniu?",
            answers: [
                "Zmienne nie mogą być deklarowane",
                "Dane nie mogą być zmieniane po utworzeniu",
                "Funkcje nie mogą być wywoływane",
                "Kod nie może być refaktoryzowany"
            ],
            correct: 1,
            explanation: "Immutability oznacza, że raz utworzone dane nie mogą być zmieniane. Każda modyfikacja tworzy nową kopię, poprawiając przewidywalność i debugowanie."
        },
        {
            category: "programming",
            level: "mid",
            question: "Jaki jest cel 'async/await' w JavaScript?",
            answers: [
                "Sprawienie, aby kod działał szybciej",
                "Pisanie kodu asynchronicznego w stylu synchronicznym",
                "Tworzenie równoległych wątków",
                "Obsługa błędów"
            ],
            correct: 1,
            explanation: "Async/await to syntactic sugar nad Promise'ami, który pozwala pisać kod asynchroniczny w bardziej czytelnym, wyglądającym synchronicznie stylu."
        },

        // Programming Languages - Senior Level
        {
            category: "programming",
            level: "senior",
            question: "Który typ garbage collectora używa Java (domyślnie w nowszych wersjach)?",
            answers: [
                "Serial GC",
                "Parallel GC",
                "G1GC",
                "CMS (Concurrent Mark Sweep)"
            ],
            correct: 2,
            explanation: "Od Java 9, G1GC (Garbage-First) jest domyślnym garbage collectorem, zaprojektowanym dla niskich opóźnień i dużych heap'ów."
        },
        {
            category: "programming",
            level: "senior",
            question: "Co to jest 'Type Erasure' w Java Generics?",
            answers: [
                "Błąd kompilacji przy złym użyciu generic types",
                "Informacje o typach generycznych są usuwane w runtime",
                "Automatyczna konwersja typów",
                "Mechanizm deduplikacji kodu"
            ],
            correct: 1,
            explanation: "Type Erasure oznacza, że informacje o typach generycznych są usuwane podczas kompilacji i nie są dostępne w runtime, co jest backward compatibility feature."
        },
        {
            category: "programming",
            level: "senior",
            question: "Jaka jest różnica między pamięcią 'stack' a 'heap'?",
            answers: [
                "Stack jest wolniejszy niż heap",
                "Stack jest dla zmiennych lokalnych, heap dla dynamicznie alokowanych obiektów",
                "Heap jest tylko dla liczb całkowitych",
                "Nie ma różnicy"
            ],
            correct: 1,
            explanation: "Pamięć stack przechowuje zmienne lokalne i wywołania funkcji (LIFO), podczas gdy heap przechowuje dynamicznie alokowane obiekty z ręcznym lub automatycznym zarządzaniem."
        },
        {
            category: "programming",
            level: "senior",
            question: "Co to jest 'race condition'?",
            answers: [
                "Gdy kod wykonuje się zbyt szybko",
                "Gdy wiele wątków jednocześnie dostęp do współdzielonych danych powodując nieprzewidywalne rezultaty",
                "Gdy funkcja działa w pętli",
                "Gdy żądania sieciowe przekraczają timeout"
            ],
            correct: 1,
            explanation: "Race condition występuje gdy wiele wątków jednocześnie odczytuje i modyfikuje współdzielone dane, prowadząc do nieprzewidywalnego zachowania zależnego od timingu."
        },
        {
            category: "programming",
            level: "senior",
            question: "Jaka jest główna zasada programowania funkcyjnego?",
            answers: [
                "Używanie tylko funkcji, bez klas",
                "Unikanie zmiennego stanu i efektów ubocznych",
                "Pisanie krótkich funkcji",
                "Używanie tylko czystego JavaScript"
            ],
            correct: 1,
            explanation: "Programowanie funkcyjne kładzie nacisk na immutability, czyste funkcje (bez side effects) i traktowanie funkcji jako obywateli pierwszej klasy."
        },

        // Architecture - Mid Level
        {
            category: "architecture",
            level: "mid",
            question: "Co to jest 'Circuit Breaker Pattern'?",
            answers: [
                "Wzorzec bezpieczeństwa chroniący przed SQL injection",
                "Wzorzec zapobiegający cascade failures w systemach rozproszonych",
                "Mechanizm zamykania połączeń sieciowych",
                "Algorytm load balancing"
            ],
            correct: 1,
            explanation: "Circuit Breaker monitoruje wywołania do zewnętrznych serwisów i 'otwiera obwód' gdy wykryje zbyt wiele błędów, zapobiegając cascade failures."
        },
        {
            category: "architecture",
            level: "mid",
            question: "Która warstwa w architekturze wielowarstwowej zajmuje się logiką biznesową?",
            answers: [
                "Presentation Layer",
                "Business/Application Layer",
                "Data Access Layer",
                "Database Layer"
            ],
            correct: 1,
            explanation: "Business/Application Layer zawiera logikę biznesową aplikacji, przetwarzając dane między warstwą prezentacji a warstwą danych."
        },
        {
            category: "architecture",
            level: "mid",
            question: "Co to jest 'API Gateway' w architekturze mikrousług?",
            answers: [
                "Baza danych dla API",
                "Single entry point dla wszystkich klientów do mikrousług",
                "Monitoring tool",
                "Testing framework"
            ],
            correct: 1,
            explanation: "API Gateway to single entry point obsługujący routing, authentication, rate limiting i aggregację requestów do wielu mikrousług."
        },
        {
            category: "architecture",
            level: "mid",
            question: "Co to jest wzorzec MVC (Model-View-Controller)?",
            answers: [
                "Wzorzec projektowania baz danych",
                "Separacja warstw danych, prezentacji i logiki",
                "Metodologia testowania",
                "Strategia deploymentu"
            ],
            correct: 1,
            explanation: "MVC dzieli aplikacje na Model (dane), View (prezentacja) i Controller (logika), poprawiając utrzymywalność i testowalność."
        },
        {
            category: "architecture",
            level: "mid",
            question: "Co to jest 'dependency injection' (wstrzykiwanie zależności)?",
            answers: [
                "Dodawanie nowych bibliotek do projektu",
                "Dostarczanie zależności do klasy z zewnątrz zamiast tworzenia ich wewnętrznie",
                "Instalowanie pakietów npm",
                "Typ SQL injection"
            ],
            correct: 1,
            explanation: "Dependency Injection dostarcza zależności z zewnątrz zamiast tworzenia ich przez klasy, poprawiając testowalność i luźne powiązanie."
        },

        // Architecture - Senior Level
        {
            category: "architecture",
            level: "senior",
            question: "W Event Sourcing, jak odbudowuje się aktualny stan aplikacji?",
            answers: [
                "Odczyt z cache",
                "Replay wszystkich eventów od początku",
                "Odczyt ostatniego snapshota i replay eventów od tego momentu",
                "Zapytanie do read model"
            ],
            correct: 2,
            explanation: "W Event Sourcing stan odbudowuje się przez replay eventów. Dla wydajności używa się snapshotów i replay tylko eventów od ostatniego snapshota."
        },
        {
            category: "architecture",
            level: "senior",
            question: "Co to jest 'Saga Pattern' w mikrousługach?",
            answers: [
                "Wzorzec do obsługi długotrwałych operacji",
                "Mechanizm distributed transactions przez sekwencję lokalnych transakcji",
                "System logowania eventów",
                "Wzorzec cache'owania"
            ],
            correct: 1,
            explanation: "Saga Pattern zarządza distributed transactions jako sekwencją lokalnych transakcji, z kompensującymi transakcjami w przypadku błędu."
        },
        {
            category: "architecture",
            level: "senior",
            question: "Co to jest CQRS (Command Query Responsibility Segregation)?",
            answers: [
                "Strategia replikacji bazy danych",
                "Separacja operacji odczytu i zapisu na różne modele",
                "Technika cache'owania",
                "Wzorzec bezpieczeństwa"
            ],
            correct: 1,
            explanation: "CQRS rozdziela operacje odczytu (Query) i zapisu (Command), pozwalając na niezależną optymalizację i skalowanie każdej z nich."
        },
        {
            category: "architecture",
            level: "senior",
            question: "Co to jest wzorzec 'Strangler Fig'?",
            answers: [
                "Technika optymalizacji wydajności",
                "Stopniowe zastępowanie systemu legacy poprzez routing ruchu do nowych serwisów",
                "Strategia migracji bazy danych",
                "Podejście do testowania"
            ],
            correct: 1,
            explanation: "Wzorzec Strangler Fig stopniowo zastępuje systemy legacy poprzez inkrementalne przekierowywanie funkcjonalności do nowych serwisów, zmniejszając ryzyko."
        },
        {
            category: "architecture",
            level: "senior",
            question: "Co to jest idempotentność w projektowaniu API?",
            answers: [
                "API które nigdy nie zawodzą",
                "Operacje które produkują ten sam rezultat gdy są wywoływane wielokrotnie",
                "Szybkie odpowiedzi API",
                "Cache'owane wywołania API"
            ],
            correct: 1,
            explanation: "Idempotentne operacje produkują ten sam rezultat niezależnie od tego ile razy są wykonywane, co jest kluczowe dla niezawodności systemów rozproszonych."
        },

        // Databases - Mid Level
        {
            category: "databases",
            level: "mid",
            question: "Który poziom izolacji transakcji zapobiega 'dirty reads'?",
            answers: [
                "Read Uncommitted",
                "Read Committed",
                "Repeatable Read",
                "Serializable"
            ],
            correct: 1,
            explanation: "Read Committed i wyższe poziomy zapobiegają dirty reads. Read Uncommitted pozwala na czytanie niezacommitowanych danych."
        },
        {
            category: "databases",
            level: "mid",
            question: "Co to jest 'database index' i jak wpływa na wydajność?",
            answers: [
                "Przyspiesza INSERT, spowalnia SELECT",
                "Przyspiesza SELECT, spowalnia INSERT/UPDATE/DELETE",
                "Przyspiesza wszystkie operacje",
                "Nie ma wpływu na wydajność"
            ],
            correct: 1,
            explanation: "Index przyspiesza operacje SELECT przez szybsze wyszukiwanie, ale spowalnia INSERT/UPDATE/DELETE przez konieczność aktualizacji indeksu."
        },
        {
            category: "databases",
            level: "mid",
            question: "Kiedy warto użyć NoSQL zamiast SQL?",
            answers: [
                "Gdy potrzebujemy ACID transactions",
                "Gdy dane są wysoce relacyjne z wieloma JOIN'ami",
                "Gdy schema często się zmienia lub dane są hierarchiczne",
                "Zawsze - NoSQL jest lepsze od SQL"
            ],
            correct: 2,
            explanation: "NoSQL jest dobry dla flexible schema, hierarchicznych danych i horizontal scaling. SQL jest lepszy dla structured data i complex queries."
        },
        {
            category: "databases",
            level: "mid",
            question: "Co to jest 'ACID' w kontekście baz danych?",
            answers: [
                "Advanced Computing Interface Design",
                "Atomicity, Consistency, Isolation, Durability",
                "Automated Cache Invalidation Database",
                "Application Code Integration Design"
            ],
            correct: 1,
            explanation: "ACID to właściwości transakcji: Atomicity (wszystko albo nic), Consistency (valid state), Isolation (niezależne), Durability (trwałość)."
        },
        {
            category: "databases",
            level: "mid",
            question: "Co to jest normalizacja bazy danych?",
            answers: [
                "Zamiana wszystkich danych na małe litery",
                "Organizowanie danych aby zredukować redundancję i poprawić integralność",
                "Tworzenie kopii zapasowych bazy",
                "Optymalizacja wydajności zapytań"
            ],
            correct: 1,
            explanation: "Normalizacja to organizacja schematu bazy danych aby zredukować redundancję i poprawić integralność danych poprzez podział tabel i ustanowienie relacji."
        },
        {
            category: "databases",
            level: "mid",
            question: "Co to jest problem N+1 zapytań?",
            answers: [
                "Wykonywanie N+1 zapytań do bazy zamiast użycia joinów",
                "Posiadanie N+1 tabel w bazie",
                "Formuła matematyczna",
                "Strategia backupu"
            ],
            correct: 0,
            explanation: "Problem N+1 występuje gdy wykonujesz 1 zapytanie dla N elementów, a potem N dodatkowych zapytań dla powiązanych danych, zamiast użyć joinów."
        },

        // Databases - Senior Level
        {
            category: "databases",
            level: "senior",
            question: "Co to jest 'database sharding' i jaki jest główny problem z nim związany?",
            answers: [
                "Replikacja danych; problem: spójność",
                "Podział danych na mniejsze części; problem: cross-shard queries",
                "Kompresja danych; problem: wydajność",
                "Backup danych; problem: storage"
            ],
            correct: 1,
            explanation: "Sharding dzieli dane między wiele serwerów. Główny problem to cross-shard queries i distributed transactions, które są wolne i skomplikowane."
        },
        {
            category: "databases",
            level: "senior",
            question: "W eventual consistency, co gwarantuje system?",
            answers: [
                "Dane są zawsze spójne natychmiast",
                "Dane będą spójne w nieokreślonym czasie w przyszłości",
                "Dane nigdy nie będą spójne",
                "Tylko ostatni zapis jest zachowany"
            ],
            correct: 1,
            explanation: "Eventual consistency gwarantuje, że jeśli nie będzie nowych zapisów, wszystkie repliki w końcu będą spójne, ale nie natychmiast."
        },
        {
            category: "databases",
            level: "senior",
            question: "Co to jest deadlock transakcji w bazie danych?",
            answers: [
                "Gdy baza danych się zawiesza",
                "Gdy dwie transakcje czekają na siebie nawzajem aby zwolnić blokady",
                "Gdy zapytania są zbyt wolne",
                "Gdy kończy się miejsce na dysku"
            ],
            correct: 1,
            explanation: "Deadlock występuje gdy dwie lub więcej transakcji czeka na siebie nawzajem aby zwolnić blokady, tworząc cykliczną zależność."
        },
        {
            category: "databases",
            level: "senior",
            question: "Jaka jest różnica między indeksem klastrowanym a nieklastrowanym?",
            answers: [
                "Nie ma różnicy",
                "Klastrowany określa fizyczną kolejność, nieklastrowany to oddzielna struktura",
                "Klastrowany jest szybszy",
                "Nieklastrowany używa więcej pamięci"
            ],
            correct: 1,
            explanation: "Indeks klastrowany określa fizyczną kolejność danych w tabeli (jeden na tabelę), podczas gdy indeksy nieklastrowane to oddzielne struktury wskazujące na dane."
        },
        {
            category: "databases",
            level: "senior",
            question: "Co to jest opóźnienie replikacji (replication lag) w bazie danych?",
            answers: [
                "Wolne wykonywanie zapytań",
                "Opóźnienie między zapisem na primary a widocznością na replikach",
                "Opóźnienie sieciowe",
                "Czas backupu"
            ],
            correct: 1,
            explanation: "Replication lag to opóźnienie czasowe między zapisaniem danych do głównej bazy a ich udostępnieniem na serwerach replik."
        },

        // DevOps - Mid Level
        {
            category: "devops",
            level: "mid",
            question: "Co to jest 'Docker container'?",
            answers: [
                "Wirtualna maszyna z pełnym OS",
                "Lekki, izolowany proces z własnymi dependencies",
                "Typ bazy danych",
                "Narzędzie do continuous integration"
            ],
            correct: 1,
            explanation: "Container to izolowany proces używający kernel'a hosta, lżejszy niż VM, zawierający aplikację i wszystkie jej zależności."
        },
        {
            category: "devops",
            level: "mid",
            question: "Jaka jest różnica między CI a CD?",
            answers: [
                "CI to Continuous Integration, CD to Continuous Deployment/Delivery",
                "Nie ma różnicy, to synonimy",
                "CI to dla frontendu, CD dla backendu",
                "CI jest szybsze niż CD"
            ],
            correct: 0,
            explanation: "CI (Continuous Integration) to automatyczne budowanie i testowanie kodu. CD to Continuous Delivery (gotowość do deploy) lub Deployment (automatyczny deploy)."
        },
        {
            category: "devops",
            level: "mid",
            question: "Co to jest 'Infrastructure as Code' (IaC)?",
            answers: [
                "Pisanie infrastruktury w JavaScript",
                "Zarządzanie infrastrukturą przez kod zamiast ręcznej konfiguracji",
                "Deployment kodu na serwery",
                "Monitoring infrastruktury"
            ],
            correct: 1,
            explanation: "IaC to zarządzanie i provisioning infrastruktury przez pliki konfiguracyjne (np. Terraform, CloudFormation) zamiast ręcznej konfiguracji."
        },
        {
            category: "devops",
            level: "mid",
            question: "Co to jest 'Kubernetes Service'?",
            answers: [
                "Typ kontenera",
                "Abstrakcja definiująca logiczny zbiór Podów i sposób dostępu do nich",
                "Storage volume",
                "Configuration file"
            ],
            correct: 1,
            explanation: "Service w Kubernetes to abstrakcja zapewniająca stały endpoint (IP/DNS) dla grupy Podów, umożliwiając load balancing i service discovery."
        },
        {
            category: "devops",
            level: "mid",
            question: "Jaki jest cel reverse proxy?",
            answers: [
                "Ukrywanie adresów IP klientów",
                "Stanie przed serwerami aby obsługiwać żądania, SSL termination, load balancing",
                "Przechowywanie cache",
                "Uruchamianie testów"
            ],
            correct: 1,
            explanation: "Reverse proxy stoi przed serwerami, obsługując przychodzące żądania, SSL termination, load balancing i cache'owanie przed przekazaniem do serwerów backend."
        },
        {
            category: "devops",
            level: "mid",
            question: "Do czego służy Docker Compose?",
            answers: [
                "Szybszego budowania obrazów Docker",
                "Definiowania i uruchamiania aplikacji multi-container",
                "Monitorowania kontenerów",
                "Deploymentu do produkcji"
            ],
            correct: 1,
            explanation: "Docker Compose to narzędzie do definiowania i uruchamiania aplikacji Docker multi-container używając pliku konfiguracyjnego YAML."
        },

        // DevOps - Senior Level
        {
            category: "devops",
            level: "senior",
            question: "Co to jest 'Blue-Green Deployment'?",
            answers: [
                "Deployment z dwoma kolorami w UI",
                "Strategia deploymentu z dwoma identycznymi środowiskami",
                "Type of load balancing",
                "Database backup strategy"
            ],
            correct: 1,
            explanation: "Blue-Green Deployment używa dwóch identycznych środowisk. Nowa wersja jest deployowana do nieaktywnego (green), następnie ruch jest przełączany."
        },
        {
            category: "devops",
            level: "senior",
            question: "W Kubernetes, co to jest 'Pod'?",
            answers: [
                "Pojedynczy kontener",
                "Najmniejsza jednostka deploymentu - grupa kontenerów",
                "Load balancer",
                "Volume do przechowywania danych"
            ],
            correct: 1,
            explanation: "Pod to najmniejsza jednostka w Kubernetes, może zawierać jeden lub więcej ściśle powiązanych kontenerów dzielących network i storage."
        },
        {
            category: "devops",
            level: "senior",
            question: "Co to jest canary deployment?",
            answers: [
                "Deployment tylko w ciągu dnia",
                "Stopniowe wdrażanie zmian dla małego podzbioru użytkowników przed pełnym wdrożeniem",
                "Strategia backupu",
                "Metodologia testowania"
            ],
            correct: 1,
            explanation: "Canary deployment wdraża zmiany najpierw dla małego podzbioru użytkowników, pozwalając na monitorowanie i walidację przed pełnym wdrożeniem."
        },
        {
            category: "devops",
            level: "senior",
            question: "Jaki jest cel service mesh w mikrousługach?",
            answers: [
                "Przechowywanie danych serwisów",
                "Obsługa komunikacji między serwisami, observability i bezpieczeństwo",
                "Deployment serwisów",
                "Pisanie kodu serwisów"
            ],
            correct: 1,
            explanation: "Service mesh (np. Istio, Linkerd) zapewnia warstwę infrastruktury dla komunikacji między serwisami, obsługując zarządzanie ruchem, bezpieczeństwo i observability."
        },
        {
            category: "devops",
            level: "senior",
            question: "Co to jest immutable infrastructure (niezmienna infrastruktura)?",
            answers: [
                "Infrastruktura która nigdy się nie zmienia",
                "Zastępowanie serwerów całkowicie zamiast aktualizowania ich w miejscu",
                "Infrastruktura w chmurze",
                "Systemy plików tylko do odczytu"
            ],
            correct: 1,
            explanation: "Immutable infrastructure oznacza całkowite zastępowanie serwerów nowymi wersjami zamiast aktualizowania w miejscu, poprawiając spójność i niezawodność."
        },

        // Behavioral - Mid Level
        {
            category: "behavioral",
            level: "mid",
            question: "Framework STAR w odpowiedziach na pytania behavioral oznacza:",
            answers: [
                "Start, Test, Act, Review",
                "Situation, Task, Action, Result",
                "Strategy, Team, Approach, Result",
                "Story, Team, Action, Reflection"
            ],
            correct: 1,
            explanation: "STAR to Situation (sytuacja), Task (zadanie), Action (działanie), Result (rezultat) - struktura odpowiedzi na pytania behawioralne."
        },
        {
            category: "behavioral",
            level: "mid",
            question: "Co jest najważniejsze przy dawaniu code review feedback?",
            answers: [
                "Znalezienie jak najwięcej błędów",
                "Bycie konstruktywnym i skoncentrowanym na kodzie, nie osobie",
                "Przepisanie kodu w swoim stylu",
                "Szybkie zaakceptowanie bez szczegółowej analizy"
            ],
            correct: 1,
            explanation: "Code review powinien być konstruktywny, skupiony na kodzie (nie osobie), pomocny w nauce i utrzymaniu quality standards."
        },
        {
            category: "behavioral",
            level: "mid",
            question: "Jak powinieneś postąpić gdy nie zgadzasz się z członkami zespołu co do decyzji technicznych?",
            answers: [
                "Zawsze się zgadzać aby uniknąć konfliktu",
                "Pozwolić senior developerowi decydować",
                "Przedstawić swoje rozumowanie z danymi i być otwartym na inne perspektywy",
                "Natychmiast eskalować do managementu"
            ],
            correct: 2,
            explanation: "Obsługuj nieporozumienia profesjonalnie przedstawiając rozumowanie oparte na danych będąc otwartym na perspektywy innych i znajdując najlepsze rozwiązanie razem."
        },
        {
            category: "behavioral",
            level: "mid",
            question: "Co powinieneś zrobić gdy nie znasz odpowiedzi na pytanie techniczne w wywiadzie?",
            answers: [
                "Wymyślić odpowiedź",
                "Milczeć",
                "Przyznać że nie wiesz i wyjaśnić swój proces myślowy dla rozwiązania",
                "Zmienić temat"
            ],
            correct: 2,
            explanation: "Szczerość jest ważna. Przyznaj gdy czegoś nie wiesz i zademonstruj rozwiązywanie problemów wyjaśniając jak byś znalazł odpowiedź."
        },

        // Behavioral - Senior Level
        {
            category: "behavioral",
            level: "senior",
            question: "Jako senior developer, co jest kluczowe przy mentoringu junior developerów?",
            answers: [
                "Rozwiązywanie wszystkich ich problemów",
                "Krytykowanie każdego błędu",
                "Zadawanie pytań prowadzących ich do rozwiązań",
                "Dawanie im tylko proste zadania"
            ],
            correct: 2,
            explanation: "Dobry mentoring to prowadzenie do rozwiązań przez pytania, nie dawanie gotowych odpowiedzi, co rozwija myślenie krytyczne i self-reliance."
        },
        {
            category: "behavioral",
            level: "senior",
            question: "Jak postępować z technical debt w projekcie?",
            answers: [
                "Ignorować go aż do końca projektu",
                "Natychmiast refaktorować wszystko",
                "Balansować między nowymi features a stopniową redukcją debt",
                "Przepisać cały projekt od zera"
            ],
            correct: 2,
            explanation: "Technical debt wymaga balance: priorytetyzować krytyczny debt, rezerwować czas na redukcję (np. 20% capacity), refaktorować stopniowo."
        },
        {
            category: "behavioral",
            level: "senior",
            question: "Jak podchodzisz do szacowania dużego, złożonego projektu?",
            answers: [
                "Dać szybki strzał",
                "Rozbić na mniejsze zadania i oszacować każde, dodając bufor",
                "Zawsze podwoić początkowe oszacowanie",
                "Odmówić szacowania"
            ],
            correct: 1,
            explanation: "Rozbij duże projekty na mniejsze, możliwe do oszacowania zadania. Rozważ niewiadome, zależności i dodaj bufor na niepewności. Komunikuj założenia."
        },
        {
            category: "behavioral",
            level: "senior",
            question: "Co powinieneś zrobić gdy zdajesz sobie sprawę w środku projektu, że obecne podejście nie zadziała?",
            answers: [
                "Kontynuować mimo wszystko aby nie marnować pracy",
                "Natychmiast zacząć od nowa nie informując nikogo",
                "Wcześnie komunikować się ze stakeholderami i proponować alternatywy z trade-offami",
                "Obwiniać wymagania"
            ],
            correct: 2,
            explanation: "Komunikuj się wcześnie o problemach. Przedstaw problem, alternatywne rozwiązania z trade-offami i rekomendacje. Transparentność buduje zaufanie."
        },

        // Behavioral - Principal Level
        {
            category: "behavioral",
            level: "principal",
            question: "Jako Principal Engineer, jak powinieneś wpływać na technical direction organizacji?",
            answers: [
                "Narzucać swoje decyzje bez konsultacji",
                "Budować konsensus, tworzyć RFCs, zbierać feedback",
                "Pozwolić zespołom samodzielnie decydować bez guidance",
                "Kopiować rozwiązania z innych firm"
            ],
            correct: 1,
            explanation: "Principal Engineer powinien budować konsensus przez RFCs, working groups, gathering feedback i demonstrowanie wartości przez pilots."
        },
        {
            category: "behavioral",
            level: "principal",
            question: "Co jest kluczowe przy podejmowaniu architectural decisions pod presją czasu?",
            answers: [
                "Wybrać najszybsze rozwiązanie bez analizy",
                "Poczekać aż presja minie",
                "Implementować szybkie tactical fixes + planować strategic solution",
                "Delegować decyzję do junior developerów"
            ],
            correct: 2,
            explanation: "Przy presji czasu: implementuj tactical fixes dla natychmiastowego relief + zaplanuj i komunikuj długoterminowe strategic solution."
        },
        {
            category: "behavioral",
            level: "principal",
            question: "Jak powinieneś obsługiwać konkurujące priorytety z wielu zespołów?",
            answers: [
                "Pracować nad wszystkim jednocześnie",
                "Wybrać najgłośniejszego stakeholdera",
                "Ocenić wpływ, dopasować do celów biznesowych, komunikować trade-offy",
                "Ignorować wszystkie prośby"
            ],
            correct: 2,
            explanation: "Oceń wpływ każdego priorytetu i dopasowanie do celów biznesowych. Komunikuj trade-offy jasno i podejmuj decyzje oparte na danych."
        },
        {
            category: "behavioral",
            level: "principal",
            question: "Jaka jest twoja rola w rozwoju innych senior engineerów?",
            answers: [
                "Konkurować z nimi aby pozostać na szczycie",
                "Wykonywać ich pracę za nich",
                "Zapewniać wymagające możliwości, dzielić się kontekstem i sponsorować ich rozwój",
                "Trzymać wiedzę aby utrzymać swoją pozycję"
            ],
            correct: 2,
            explanation: "Principal Engineers rozwijają innych zapewniając wymagające możliwości, dzieląc się kontekstem organizacyjnym, sponsorując widoczność i mentoringiem."
        },

        // Dodatkowe pytania algorytmiczne - Mid Level
        {
            category: "algorithms",
            level: "mid",
            question: "Jaki jest cel programowania dynamicznego?",
            answers: [
                "Aby programy działały szybciej używając więcej pamięci",
                "Rozwiązywanie problemów przez rozdzielenie na nakładające się podproblemy i przechowywanie wyników",
                "Dynamiczne alokowanie pamięci",
                "Pisanie programów które modyfikują same siebie"
            ],
            correct: 1,
            explanation: "Programowanie dynamiczne rozwiązuje złożone problemy rozdzielając je na prostsze nakładające się podproblemy i przechowując ich wyniki aby uniknąć redundantnych obliczeń."
        },
        {
            category: "algorithms",
            level: "mid",
            question: "Który algorytm sortowania jest najbardziej odpowiedni do sortowania listy linkowanej?",
            answers: [
                "Quick Sort",
                "Heap Sort",
                "Merge Sort",
                "Insertion Sort"
            ],
            correct: 2,
            explanation: "Merge Sort jest idealny dla list linkowanych, ponieważ nie wymaga dostępu losowego i działa efektywnie z dostępem sekwencyjnym, w przeciwieństwie do Quick Sort czy Heap Sort."
        },
        {
            category: "algorithms",
            level: "mid",
            question: "Jaka jest złożoność czasowa znajdowania elementu w zrównoważonym drzewie AVL?",
            answers: [
                "O(1)",
                "O(log n)",
                "O(n)",
                "O(n log n)"
            ],
            correct: 1,
            explanation: "Drzewa AVL to samobalansujące się drzewa binarne wyszukiwania, które gwarantują czas wyszukiwania O(log n) poprzez utrzymywanie równowagi przez rotacje."
        },
        {
            category: "algorithms",
            level: "senior",
            question: "Do czego służy algorytm Bellmana-Forda?",
            answers: [
                "Sortowania tablic",
                "Znajdowania najkrótszych ścieżek w grafach z ujemnymi wagami",
                "Balansowania drzew binarnych",
                "Kompresji danych"
            ],
            correct: 1,
            explanation: "Algorytm Bellmana-Forda znajduje najkrótsze ścieżki od wierzchołka źródłowego do wszystkich innych wierzchołków w grafie ważonym, nawet z ujemnymi wagami krawędzi."
        },
        {
            category: "algorithms",
            level: "senior",
            question: "Jaka jest różnica między algorytmami Kruskala i Prima?",
            answers: [
                "Kruskal jest dla najkrótszej ścieżki, Prim dla minimalnego drzewa rozpinającego",
                "Oba znajdują MST ale Kruskal pracuje na krawędziach, Prim na wierzchołkach",
                "Nie ma różnicy",
                "Kruskal jest szybszy dla gęstych grafów"
            ],
            correct: 1,
            explanation: "Oba algorytmy znajdują minimalne drzewa rozpinające, ale algorytm Kruskala sortuje i przetwarza krawędzie, podczas gdy algorytm Prima rozbudowuje drzewo dodając wierzchołki."
        },
        {
            category: "algorithms",
            level: "senior",
            question: "Co to jest memoizacja w kontekście algorytmów?",
            answers: [
                "Zapamiętywanie kodu",
                "Cache'owanie wyników funkcji aby zoptymalizować algorytmy rekurencyjne",
                "Używanie więcej pamięci",
                "Zapisywanie pamięci na dysk"
            ],
            correct: 1,
            explanation: "Memoizacja to technika optymalizacyjna, w której wyniki funkcji są cache'owane i ponownie używane, szczególnie przydatna dla optymalizacji algorytmów rekurencyjnych z nakładającymi się podproblemami."
        },

        // Dodatkowe pytania System Design - Mid Level
        {
            category: "system-design",
            level: "mid",
            question: "Jaki jest cel message brokera?",
            answers: [
                "Handlowanie akcjami",
                "Umożliwienie asynchronicznej komunikacji między serwisami",
                "Kompresja wiadomości",
                "Szyfrowanie danych"
            ],
            correct: 1,
            explanation: "Message broker ułatwia asynchroniczną komunikację między serwisami poprzez odbieranie, przekierowywanie i dostarczanie wiadomości, poprawiając rozdzielenie i skalowalność."
        },
        {
            category: "system-design",
            level: "mid",
            question: "Co oznacza 'idempotent' w kontekście REST API?",
            answers: [
                "API jest bardzo szybkie",
                "Wielokrotne identyczne żądania mają taki sam efekt jak pojedyncze żądanie",
                "API używa szyfrowania",
                "API może obsługiwać wielu użytkowników"
            ],
            correct: 1,
            explanation: "Operacja idempotentna może być wykonana wielokrotnie z tym samym rezultatem. GET, PUT i DELETE są zazwyczaj idempotentne w REST API."
        },
        {
            category: "system-design",
            level: "mid",
            question: "Jaki jest cel rate limiting w API?",
            answers: [
                "Aby API działało wolniej",
                "Aby zapobiec nadużyciom i zapewnić sprawiedliwe użycie zasobów",
                "Aby kompresować dane",
                "Aby cache'ować odpowiedzi"
            ],
            correct: 1,
            explanation: "Rate limiting ogranicza liczbę żądań API, które klient może wykonać w danym okresie czasu, zapobiegając nadużyciom i zapewniając stabilność systemu."
        },
        {
            category: "system-design",
            level: "senior",
            question: "Jaki jest cel Circuit Breakera w mikrousługach?",
            answers: [
                "Włączanie i wyłączanie serwisów",
                "Zapobieganie kaskadowym awariom poprzez szybkie zawodzenie gdy serwis nie działa",
                "Balansowanie obciążenia",
                "Szyfrowanie komunikacji"
            ],
            correct: 1,
            explanation: "Circuit Breaker monitoruje awarie i 'otwiera obwód' aby szybko zawieść i zapobiec kaskadowym awariom, dając zawodzącemu serwisowi czas na odzyskanie."
        },
        {
            category: "system-design",
            level: "senior",
            question: "Jaka jest różnica między partycjonowaniem wertykalnym a horyzontalnym w bazach danych?",
            answers: [
                "Wertykalne dzieli po wierszach, horyzontalne po kolumnach",
                "Wertykalne dzieli po kolumnach, horyzontalne po wierszach",
                "Nie ma różnicy",
                "Wertykalne jest szybsze"
            ],
            correct: 1,
            explanation: "Partycjonowanie wertykalne dzieli tabele po kolumnach (różne atrybuty w różnych tabelach), podczas gdy partycjonowanie horyzontalne dzieli po wierszach (sharding)."
        },
        {
            category: "system-design",
            level: "senior",
            question: "Jaki jest cel reverse proxy?",
            answers: [
                "Ukrywanie adresów IP klientów",
                "Stanie przed serwerami, obsługa SSL, cache'owanie i load balancing",
                "Odwracanie przepływu danych",
                "Szyfrowanie całego ruchu"
            ],
            correct: 1,
            explanation: "Reverse proxy stoi przed serwerami webowymi, zapewniając terminację SSL, cache'owanie, load balancing i ochronę przed bezpośrednim narażeniem."
        },

        // Dodatkowe pytania programistyczne - Mid Level
        {
            category: "programming",
            level: "mid",
            question: "Jaka jest różnica między 'let' a 'var' w JavaScript?",
            answers: [
                "Nie ma różnicy",
                "'let' ma zakres blokowy, 'var' ma zakres funkcyjny",
                "'var' ma zakres blokowy, 'let' ma zakres funkcyjny",
                "'let' jest szybsze"
            ],
            correct: 1,
            explanation: "'let' ma zakres blokowy i nie jest hoistowane w ten sam sposób co 'var', który ma zakres funkcyjny i może prowadzić do nieoczekiwanego zachowania."
        },
        {
            category: "programming",
            level: "mid",
            question: "Co to jest dekorator w Pythonie?",
            answers: [
                "Wzorzec projektowy dla UI",
                "Funkcja, która modyfikuje zachowanie innej funkcji",
                "Sposób dodawania kolorów do wyjścia",
                "Metoda dziedziczenia klas"
            ],
            correct: 1,
            explanation: "Dekorator to funkcja, która przyjmuje inną funkcję i rozszerza lub modyfikuje jej zachowanie bez stałej modyfikacji samej funkcji."
        },
        {
            category: "programming",
            level: "mid",
            question: "Co oznacza REST w web services?",
            answers: [
                "Rapid External Service Transfer",
                "Representational State Transfer",
                "Remote Execution Service Technology",
                "Reliable Stateful Transmission"
            ],
            correct: 1,
            explanation: "REST (Representational State Transfer) to styl architektoniczny dla rozproszonych systemów hipermedialnych używających bezstanowej komunikacji i standardowych metod HTTP."
        },
        {
            category: "programming",
            level: "senior",
            question: "Co to jest event loop w JavaScript?",
            answers: [
                "Pętla przetwarzająca zdarzenia z DOM",
                "Mechanizm obsługujący operacje asynchroniczne przez zarządzanie kolejką callbacków",
                "Narzędzie do debugowania",
                "Sposób pętlowania przez zdarzenia"
            ],
            correct: 1,
            explanation: "Event loop to mechanizm obsługujący operacje asynchroniczne poprzez ciągłe sprawdzanie stosu wywołań i kolejki callbacków, wykonując callbacki gdy stos jest pusty."
        },
        {
            category: "programming",
            level: "senior",
            question: "Jaki jest cel virtual DOM w React?",
            answers: [
                "Wirtualizacja aplikacji",
                "Minimalizacja bezpośredniej manipulacji DOM przez efektywne batch'owanie aktualizacji",
                "Uruchamianie React w maszynach wirtualnych",
                "Tworzenie interfejsów wirtualnej rzeczywistości"
            ],
            correct: 1,
            explanation: "Virtual DOM to reprezentacja rzeczywistego DOM w pamięci, która pozwala React na batch'owanie aktualizacji i minimalizację drogich bezpośrednich manipulacji DOM, poprawiając wydajność."
        },
        {
            category: "programming",
            level: "senior",
            question: "Co to jest optymalizacja rekurencji ogonowej?",
            answers: [
                "Rekurencja przetwarzająca ogon listy",
                "Optymalizacja kompilatora konwertująca wywołania tail-recursive na pętle iteracyjne",
                "Sposób ograniczania głębokości rekurencji",
                "Rekurencja która zwraca wcześnie"
            ],
            correct: 1,
            explanation: "Optymalizacja rekurencji ogonowej pozwala kompilatorom konwertować funkcje tail-recursive na pętle iteracyjne, zapobiegając przepełnieniu stosu i poprawiając wydajność."
        },

        // Dodatkowe pytania architektoniczne - Mid Level
        {
            category: "architecture",
            level: "mid",
            question: "Co to jest wzorzec Repository?",
            answers: [
                "Workflow Git",
                "Wzorzec abstrahujący logikę dostępu do danych od logiki biznesowej",
                "Sposób organizacji plików",
                "Strategia deploymentu"
            ],
            correct: 1,
            explanation: "Wzorzec Repository tworzy warstwę abstrakcji między logiką dostępu do danych a logiką biznesową, czyniąc kod bardziej utrzymywalnym i testowalnym."
        },
        {
            category: "architecture",
            level: "mid",
            question: "Co to jest wzorzec Singleton i kiedy używać go ostrożnie?",
            answers: [
                "Wzorzec dla aplikacji jednowątkowych",
                "Wzorzec zapewniający jedną instancję klasy; używaj ostrożnie bo może tworzyć stan globalny i problemy z testowaniem",
                "Wzorzec tworzenia unikalnych obiektów",
                "Wzorzec dla aplikacji jednostronicowych"
            ],
            correct: 1,
            explanation: "Singleton zapewnia, że istnieje tylko jedna instancja klasy. Używaj ostrożnie, bo wprowadza stan globalny, może komplikować testowanie i ukrywać zależności."
        },
        {
            category: "architecture",
            level: "mid",
            question: "Co to jest wzorzec Observer?",
            answers: [
                "Wzorzec monitorowania wydajności systemu",
                "Wzorzec gdzie obiekty subskrybują i otrzymują powiadomienia o zmianach stanu",
                "Wzorzec uwierzytelniania użytkowników",
                "Wzorzec logowania"
            ],
            correct: 1,
            explanation: "Wzorzec Observer definiuje zależność jeden-do-wielu między obiektami, gdzie gdy jeden obiekt zmienia stan, wszyscy zależni są automatycznie powiadamiani."
        },
        {
            category: "architecture",
            level: "senior",
            question: "Jaka jest różnica między orkiestracją a choreografią w mikrousługach?",
            answers: [
                "Nie ma różnicy, to synonimy",
                "Orkiestracja ma centralną kontrolę, choreografia jest zdecentralizowana i sterowana zdarzeniami",
                "Orkiestracja jest szybsza",
                "Choreografia używa więcej zasobów"
            ],
            correct: 1,
            explanation: "Orkiestracja używa centralnego koordynatora do kontrolowania interakcji serwisów, podczas gdy choreografia jest zdecentralizowana z serwisami reagującymi na zdarzenia niezależnie."
        },
        {
            category: "architecture",
            level: "senior",
            question: "Co to jest Domain-Driven Design (DDD)?",
            answers: [
                "Projektowanie domen dla stron internetowych",
                "Podejście do projektowania oprogramowania skupiające się na modelowaniu złożonych domen biznesowych",
                "Metodologia projektowania baz danych",
                "Wzorzec projektowania UI"
            ],
            correct: 1,
            explanation: "DDD to podejście do projektowania oprogramowania skupiające się na zrozumieniu i modelowaniu złożonych domen biznesowych przez współpracę między ekspertami technicznymi i domenowymi."
        },
        {
            category: "architecture",
            level: "senior",
            question: "Co to jest Bounded Context w Domain-Driven Design?",
            answers: [
                "Ograniczony czas na development",
                "Granica gdzie konkretny model domeny jest zdefiniowany i obowiązuje",
                "Obszar o ograniczonym dostępie",
                "Ograniczenie wydajnościowe"
            ],
            correct: 1,
            explanation: "Bounded Context definiuje wyraźne granice, gdzie konkretny model domeny jest ważny, pomagając zarządzać złożonością w dużych systemach."
        },

        // Dodatkowe pytania o bazy danych - Mid Level
        {
            category: "databases",
            level: "mid",
            question: "Co to jest widok bazy danych?",
            answers: [
                "Sposób wizualizacji danych",
                "Wirtualna tabela oparta na wyniku zapytania SQL",
                "Narzędzie monitorowania bazy danych",
                "GUI dla baz danych"
            ],
            correct: 1,
            explanation: "Widok to wirtualna tabela utworzona z wyniku zapytania SQL. Nie przechowuje danych ale zapewnia sposób prezentacji danych w określonym formacie lub ukrycia złożoności."
        },
        {
            category: "databases",
            level: "mid",
            question: "Co to jest ograniczenie klucza obcego?",
            answers: [
                "Klucz z obcego kraju",
                "Ograniczenie zapewniające integralność referencyjną między tabelami",
                "Klucz szyfrowania",
                "Klucz główny z innej bazy danych"
            ],
            correct: 1,
            explanation: "Ograniczenie klucza obcego zapewnia integralność referencyjną wymagając, aby wartości w jednej tabeli odpowiadały wartościom w kluczu głównym innej tabeli."
        },
        {
            category: "databases",
            level: "mid",
            question: "Co to jest indeksowanie bazy danych i kiedy go unikać?",
            answers: [
                "Zawsze używaj indeksów na każdej kolumnie",
                "Indeksy przyspieszają odczyty ale spowalniają zapisy; unikaj na często aktualizowanych kolumnach z niską selektywnością",
                "Indeksy działają tylko na kluczach głównych",
                "Indeksy są automatyczne i nie można ich kontrolować"
            ],
            correct: 1,
            explanation: "Chociaż indeksy przyspieszają zapytania, spowalniają operacje INSERT/UPDATE/DELETE. Unikaj indeksów na kolumnach z niską selektywnością lub wysoką częstotliwością aktualizacji."
        },
        {
            category: "databases",
            level: "senior",
            question: "Co to jest twierdzenie CAP?",
            answers: [
                "Compression, Access, Performance",
                "Consistency, Availability, Partition tolerance - możesz zagwarantować tylko 2 z 3",
                "Cache, API, Processing",
                "Capacity, Availability, Performance"
            ],
            correct: 1,
            explanation: "Twierdzenie CAP mówi, że system rozproszony może zagwarantować tylko 2 z 3: Consistency, Availability i Partition tolerance jednocześnie."
        },
        {
            category: "databases",
            level: "senior",
            question: "Co to jest zmaterializowany widok?",
            answers: [
                "Fizyczny widok bazy danych",
                "Widok przechowujący wyniki zapytania fizycznie dla szybszego dostępu",
                "Tymczasowy widok",
                "Widok z material design"
            ],
            correct: 1,
            explanation: "Zmaterializowany widok przechowuje wynik zapytania fizycznie, poprawiając wydajność odczytu ale wymagając okresowego odświeżania aby być aktualnym z danymi źródłowymi."
        },
        {
            category: "databases",
            level: "senior",
            question: "Co to jest optimistic locking vs pessimistic locking?",
            answers: [
                "Optimistic jest szybsze, pessimistic jest wolniejsze",
                "Optimistic zakłada brak konfliktów i sprawdza przy commicie; pessimistic blokuje zasoby natychmiast",
                "Są takie same",
                "Optimistic używa mniej pamięci"
            ],
            correct: 1,
            explanation: "Optimistic locking zakłada, że konflikty są rzadkie i sprawdza przy commicie, podczas gdy pessimistic locking zapobiega konfliktom blokując zasoby natychmiast."
        },

        // Dodatkowe pytania DevOps - Mid Level
        {
            category: "devops",
            level: "mid",
            question: "Jaka jest różnica między obrazem Docker a kontenerem Docker?",
            answers: [
                "Nie ma różnicy",
                "Obraz to szablon, kontener to uruchomiona instancja obrazu",
                "Obraz jest większy niż kontener",
                "Kontener to szablon, obraz jest uruchomiony"
            ],
            correct: 1,
            explanation: "Obraz Docker to niezmienny szablon zawierający aplikację i zależności. Kontener to uruchomiona instancja utworzona z obrazu."
        },
        {
            category: "devops",
            level: "mid",
            question: "Co to jest health check w aplikacjach kontenerowych?",
            answers: [
                "Badanie lekarskie dla developerów",
                "Mechanizm weryfikujący czy kontener działa poprawnie i jest gotowy do obsługi ruchu",
                "Skanowanie bezpieczeństwa",
                "Test wydajności"
            ],
            correct: 1,
            explanation: "Health checks to sondy określające czy kontener działa poprawnie, pomagające orkiestratorom zdecydować czy kierować ruch lub restartować kontenery."
        },
        {
            category: "devops",
            level: "mid",
            question: "Jaki jest cel pliku .dockerignore?",
            answers: [
                "Ignorowanie poleceń Docker",
                "Wykluczenie plików z kopiowania do obrazu Docker, zmniejszając rozmiar obrazu",
                "Ukrywanie Docker przed skanowaniem bezpieczeństwa",
                "Konfiguracja ustawień Docker"
            ],
            correct: 1,
            explanation: "Plik .dockerignore określa, które pliki i katalogi powinny być wykluczone podczas budowania obrazów Docker, zmniejszając rozmiar obrazu i czas budowy."
        },
        {
            category: "devops",
            level: "senior",
            question: "Co to jest GitOps?",
            answers: [
                "Używanie Git do wszystkich operacji",
                "Metodologia gdzie repozytoria Git są źródłem prawdy dla deklaratywnej infrastruktury i aplikacji",
                "Szkolenie z operacji Git",
                "Narzędzie GUI Git"
            ],
            correct: 1,
            explanation: "GitOps używa repozytoriów Git jako pojedynczego źródła prawdy dla deklaratywnej infrastruktury i aplikacji, z automatycznym wdrażaniem przy zmianach Git."
        },
        {
            category: "devops",
            level: "senior",
            question: "Co to jest StatefulSet w Kubernetes?",
            answers: [
                "Zestaw plików statycznych",
                "Obiekt API workload do zarządzania aplikacjami stanowymi ze stabilnymi tożsamościami sieciowymi",
                "Kolekcja zmiennych stanu",
                "Plik konfiguracyjny"
            ],
            correct: 1,
            explanation: "StatefulSet zarządza aplikacjami stanowymi, które wymagają stabilnych, unikalnych identyfikatorów sieciowych i trwałego przechowywania, które pozostaje z każdym podem."
        },
        {
            category: "devops",
            level: "senior",
            question: "Jaka jest różnica między ConfigMap a Secret w Kubernetes?",
            answers: [
                "Nie ma różnicy",
                "ConfigMap dla nie-wrażliwej konfiguracji, Secret dla wrażliwych danych z kodowaniem base64",
                "ConfigMap jest szybszy",
                "Secret jest większy"
            ],
            correct: 1,
            explanation: "ConfigMap przechowuje nie-wrażliwe dane konfiguracyjne w czystym tekście, podczas gdy Secret przechowuje wrażliwe dane jak hasła z kodowaniem base64 i ograniczonym dostępem."
        },

        // Dodatkowe pytania behawioralne - Mid Level
        {
            category: "behavioral",
            level: "mid",
            question: "Jak obsługujesz sytuację gdy nie zgadzasz się z techniczną decyzją swojego managera?",
            answers: [
                "Ignoruj i zaimplementuj na swój sposób",
                "Wyrażaj obawy z danymi, sugeruj alternatywy, ale wspieraj ostateczną decyzję",
                "Narzekaj innym członkom zespołu",
                "Odmów pracy nad tym"
            ],
            correct: 1,
            explanation: "Wyrażaj obawy profesjonalnie z danymi wspierającymi, proponuj alternatywy, ale ostatecznie wspieraj ostateczną decyzję i utrzymuj zaufanie i profesjonalizm."
        },
        {
            category: "behavioral",
            level: "mid",
            question: "Co robisz gdy jesteś zablokowany w zadaniu?",
            answers: [
                "Czekaj aż ktoś zauważy",
                "Proaktywnie komunikuj blocker, dokumentuj co próbowałeś, poproś o pomoc",
                "Przełącz się na inne zadanie bez mówienia nikomu",
                "Poddaj się"
            ],
            correct: 1,
            explanation: "Proaktywnie komunikuj blokery, dokumentuj próbowane rozwiązania, szukaj pomocy od odpowiednich osób i dostarczaj kontekst aby umożliwić szybkie rozwiązanie."
        },
        {
            category: "behavioral",
            level: "senior",
            question: "Jak obsługujesz członka zespołu, który konsekwentnie produkuje kod niskiej jakości?",
            answers: [
                "Natychmiast zgłoś do zarządu",
                "Ignoruj to",
                "Dostarczaj konkretny feedback, programuj w parze, oferuj zasoby, eskaluj tylko jeśli nie ma poprawy",
                "Przepisz cały ich kod sam"
            ],
            correct: 2,
            explanation: "Adresuj poprzez konstruktywny feedback z przykładami, programowanie w parach, dzielenie się zasobami i mentoring. Eskaluj do zarządu tylko jeśli problemy utrzymują się."
        },
        {
            category: "behavioral",
            level: "senior",
            question: "Jak priorytetujesz dług techniczny vs nowe funkcje?",
            answers: [
                "Zawsze najpierw nowe funkcje",
                "Zawsze najpierw naprawiaj dług techniczny",
                "Balansuj w oparciu o wpływ biznesowy, ryzyko i wpływ na velocity; komunikuj trade-offy",
                "Pozwól zarządowi decydować o wszystkim"
            ],
            correct: 2,
            explanation: "Balansuj dług techniczny i funkcje oceniając wpływ biznesowy, ryzyko i efekty velocity. Komunikuj trade-offy jasno interesariuszom."
        },
        {
            category: "behavioral",
            level: "principal",
            question: "Jak kierujesz standardami technicznymi w wielu zespołach?",
            answers: [
                "Nakazuj standardy bez wkładu",
                "Buduj konsensus przez RFC, demonstruj wartość, zapewniaj narzędzia i wsparcie",
                "Pozwól każdemu zespołowi robić co chce",
                "Kopiuj to co robią inne firmy"
            ],
            correct: 1,
            explanation: "Buduj konsensus przez RFC i grupy robocze, demonstruj wartość pilotażami, zapewniaj narzędzia i wsparcie, iteruj w oparciu o feedback."
        },
        {
            category: "behavioral",
            level: "principal",
            question: "Jak obsługujesz techniczne nieporozumienia między senior engineerami?",
            answers: [
                "Wybierz osobę z wyższym starszeństwem",
                "Ułatwiaj dyskusję opartą na danych, skup się na trade-offach, buduj konsensus lub podejmij świadomą decyzję",
                "Pozwól im to wywalczyć",
                "Unikaj konfliktu"
            ],
            correct: 1,
            explanation: "Ułatwiaj obiektywną dyskusję z danymi, analizuj trade-offy, szukaj konsensusu, a jeśli potrzeba, podejmij świadomą decyzję z jasnym uzasadnieniem."
        },

        // Pytania bezpieczeństwa - Mid Level
        {
            category: "system-design",
            level: "mid",
            question: "Co to jest SQL injection i jak go zapobiegać?",
            answers: [
                "Procedura medyczna",
                "Atak gdzie wstrzykiwany jest złośliwy SQL; zapobiegaj używając zapytań parametryzowanych",
                "Funkcja bazy danych",
                "Optymalizacja wydajności"
            ],
            correct: 1,
            explanation: "SQL injection to atak gdzie złośliwy kod SQL jest wstrzykiwany do zapytań. Zapobiegaj używając zapytań parametryzowanych/prepared statements, nigdy konkatenacji stringów."
        },
        {
            category: "system-design",
            level: "mid",
            question: "Co to jest CORS (Cross-Origin Resource Sharing)?",
            answers: [
                "System bazy danych",
                "Funkcja bezpieczeństwa kontrolująca jak zasoby są udostępniane między różnymi pochodzeniami",
                "Język programowania",
                "Framework testowy"
            ],
            correct: 1,
            explanation: "CORS to mechanizm bezpieczeństwa kontrolujący które pochodzenia mogą uzyskać dostęp do zasobów na serwerze web, zapobiegając nieautoryzowanym żądaniom cross-origin."
        },
        {
            category: "system-design",
            level: "senior",
            question: "Do czego służy OAuth 2.0?",
            answers: [
                "Szyfrowanie haseł",
                "Framework autoryzacyjny dla delegowanego dostępu bez dzielenia się credentials",
                "Uwierzytelnianie użytkowników",
                "Kontrola dostępu do bazy danych"
            ],
            correct: 1,
            explanation: "OAuth 2.0 to framework autoryzacyjny, który umożliwia aplikacjom uzyskanie ograniczonego dostępu do kont użytkowników bez ujawniania credentials użytkownika."
        },

        // Pytania Cloud Computing - Mid Level
        {
            category: "devops",
            level: "mid",
            question: "Jaka jest różnica między IaaS, PaaS i SaaS?",
            answers: [
                "Wszystkie są takie same",
                "IaaS zapewnia infrastrukturę, PaaS platformę, SaaS aplikacje oprogramowania",
                "IaaS jest najszybsze",
                "PaaS jest najdroższe"
            ],
            correct: 1,
            explanation: "IaaS zapewnia wirtualną infrastrukturę (serwery, storage), PaaS zapewnia platformy deweloperskie (z runtime, middleware), SaaS zapewnia kompletne aplikacje."
        },
        {
            category: "devops",
            level: "mid",
            question: "Co to jest auto-scaling w cloud computing?",
            answers: [
                "Automatyczne aktualizacje oprogramowania",
                "Automatyczne dostosowywanie pojemności zasobów w oparciu o zapotrzebowanie",
                "Automatyczne rozliczanie",
                "Automatyczne backupy"
            ],
            correct: 1,
            explanation: "Auto-scaling automatycznie dostosowuje zasoby obliczeniowe (skaluje w górę lub w dół) w oparciu o rzeczywiste zapotrzebowanie, optymalizując koszty i wydajność."
        },
        {
            category: "devops",
            level: "senior",
            question: "Jaki jest cel Service Mesh jak Istio?",
            answers: [
                "Tworzenie siatek do wizualizacji",
                "Obsługa komunikacji serwis-do-serwis z observability, security i kontrolą ruchu",
                "Łączenie kabli sieciowych",
                "Tworzenie dokumentacji serwisów"
            ],
            correct: 1,
            explanation: "Service Mesh zapewnia warstwę infrastruktury dla komunikacji mikrousług, obsługując zarządzanie ruchem, bezpieczeństwo, observability i wzorce odporności."
        },

        // Pytania z programowania konkursowego - Mid Level
        {
            category: "competitive-programming",
            level: "mid",
            question: "Napisz kod C# aby znaleźć dwie liczby w tablicy, które sumują się do wartości docelowej. Jaka jest optymalna złożoność czasowa?",
            answers: [
                "O(n²) - zagnieżdżone pętle porównujące wszystkie pary",
                "O(n log n) - sortowanie tablicy a potem dwa wskaźniki",
                "O(n) - użycie hash set do śledzenia dopełnień",
                "O(n³) - brute force wszystkich kombinacji"
            ],
            correct: 2,
            explanation: "Optymalne rozwiązanie O(n) używające HashSet:\n```csharp\npublic int[] TwoSum(int[] nums, int target) {\n    var seen = new HashSet<int>();\n    for (int i = 0; i < nums.Length; i++) {\n        int complement = target - nums[i];\n        if (seen.Contains(complement)) {\n            return new int[] { complement, nums[i] };\n        }\n        seen.Add(nums[i]);\n    }\n    return null;\n}\n```\nCzas: O(n), Pamięć: O(n). Lepsze niż O(n²) zagnieżdżone pętle lub O(n log n) sortowanie."
        },
        {
            category: "competitive-programming",
            level: "mid",
            question: "Jak zaimplementować funkcję odwracania listy linkowanej w C#?",
            answers: [
                "Użyć rekurencji",
                "Iterować z trzema wskaźnikami (prev, current, next)",
                "Konwersja do tablicy, odwrócenie, przebudowa",
                "Użyć Stack<T>"
            ],
            correct: 1,
            explanation: "Rozwiązanie iteracyjne z O(n) czasem, O(1) pamięcią:\n```csharp\npublic ListNode ReverseList(ListNode head) {\n    ListNode prev = null;\n    ListNode current = head;\n    while (current != null) {\n        ListNode next = current.next;\n        current.next = prev;\n        prev = current;\n        current = next;\n    }\n    return prev;\n}\n```\nNajbardziej efektywne podejście - modyfikuje wskaźniki in-place bez dodatkowej pamięci."
        },
        {
            category: "competitive-programming",
            level: "mid",
            question: "Jakie jest najlepsze podejście do sprawdzenia czy string jest palindromem w C#?",
            answers: [
                "Odwrócić string i porównać",
                "Dwa wskaźniki od początku i końca",
                "Użyć LINQ Reverse()",
                "Rekurencja"
            ],
            correct: 1,
            explanation: "Optymalne rozwiązanie z dwoma wskaźnikami:\n```csharp\npublic bool IsPalindrome(string s) {\n    int left = 0, right = s.Length - 1;\n    while (left < right) {\n        if (s[left] != s[right])\n            return false;\n        left++;\n        right--;\n    }\n    return true;\n}\n```\nCzas: O(n/2) = O(n), Pamięć: O(1). Bez dodatkowej alokacji stringów."
        },
        {
            category: "competitive-programming",
            level: "mid",
            question: "Jak znaleźć maksymalną sumę podtablicy (algorytm Kadane'a) w C#?",
            answers: [
                "Sprawdzić wszystkie możliwe podtablice - O(n³)",
                "Użyć sum prefiksowych - O(n²)",
                "Programowanie dynamiczne z bieżącą/max sumą - O(n)",
                "Dziel i zwyciężaj - O(n log n)"
            ],
            correct: 2,
            explanation: "Algorytm Kadane'a - rozwiązanie O(n):\n```csharp\npublic int MaxSubArray(int[] nums) {\n    int maxSoFar = nums[0];\n    int maxEndingHere = nums[0];\n    for (int i = 1; i < nums.Length; i++) {\n        maxEndingHere = Math.Max(nums[i], maxEndingHere + nums[i]);\n        maxSoFar = Math.Max(maxSoFar, maxEndingHere);\n    }\n    return maxSoFar;\n}\n```\nKlasyczny problem DP z optymalnym czasem O(n) i pamięcią O(1)."
        },
        {
            category: "competitive-programming",
            level: "mid",
            question: "Implementacja binary search w C# - jaki jest poprawny sposób uniknięcia integer overflow?",
            answers: [
                "int mid = (left + right) / 2;",
                "int mid = left + (right - left) / 2;",
                "int mid = (left + right) >> 1;",
                "float mid = (left + right) / 2.0;"
            ],
            correct: 1,
            explanation: "Bezpieczne binary search unikające overflow:\n```csharp\npublic int BinarySearch(int[] arr, int target) {\n    int left = 0, right = arr.Length - 1;\n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        if (arr[mid] == target) return mid;\n        else if (arr[mid] < target) left = mid + 1;\n        else right = mid - 1;\n    }\n    return -1;\n}\n```\nCzas: O(log n). Formuła zapobiega overflow gdy left+right > int.MaxValue."
        },
        {
            category: "competitive-programming",
            level: "senior",
            question: "Jak rozwiązać problem 'Longest Increasing Subsequence' optymalnie w C#?",
            answers: [
                "Rekurencja z memoizacją - O(n²)",
                "Programowanie dynamiczne - O(n²)",
                "Binary search z DP - O(n log n)",
                "Podejście zachłanne - O(n)"
            ],
            correct: 2,
            explanation: "Optymalne rozwiązanie O(n log n) z binary search:\n```csharp\npublic int LengthOfLIS(int[] nums) {\n    var tails = new List<int>();\n    foreach (int num in nums) {\n        int left = 0, right = tails.Count;\n        while (left < right) {\n            int mid = left + (right - left) / 2;\n            if (tails[mid] < num) left = mid + 1;\n            else right = mid;\n        }\n        if (left == tails.Count) tails.Add(num);\n        else tails[left] = num;\n    }\n    return tails.Count;\n}\n```\nUżywa binary search do utrzymywania najmniejszego ogona dla każdej długości."
        },
        {
            category: "competitive-programming",
            level: "senior",
            question: "Jaki jest optymalny sposób wykrycia cyklu w liście linkowanej?",
            answers: [
                "Przechować wszystkie węzły w HashSet - O(n) pamięci",
                "Wykrywanie cyklu Floyda (żółw i zając) - O(1) pamięci",
                "Oznaczać odwiedzone węzły - modyfikuje strukturę",
                "Odwrócić listę i sprawdzić czy ta sama - O(n) pamięci"
            ],
            correct: 1,
            explanation: "Algorytm wykrywania cyklu Floyda:\n```csharp\npublic bool HasCycle(ListNode head) {\n    if (head == null) return false;\n    ListNode slow = head;\n    ListNode fast = head;\n    while (fast?.next != null) {\n        slow = slow.next;\n        fast = fast.next.next;\n        if (slow == fast) return true;\n    }\n    return false;\n}\n```\nCzas: O(n), Pamięć: O(1). Slow porusza się o 1 krok, fast o 2 - spotykają się jeśli istnieje cykl."
        },
        {
            category: "competitive-programming",
            level: "senior",
            question: "Jak zaimplementować Trie (Prefix Tree) do wyszukiwania słów w C#?",
            answers: [
                "Użyć Dictionary<string, bool>",
                "Użyć HashSet<string>",
                "Stworzyć klasę TrieNode z Dictionary<char, TrieNode>",
                "Użyć tablicy 26 dzieci na węzeł"
            ],
            correct: 2,
            explanation: "Implementacja Trie z Dictionary:\n```csharp\npublic class TrieNode {\n    public Dictionary<char, TrieNode> Children = new();\n    public bool IsEndOfWord = false;\n}\npublic class Trie {\n    private TrieNode root = new();\n    public void Insert(string word) {\n        var node = root;\n        foreach (char c in word) {\n            if (!node.Children.ContainsKey(c))\n                node.Children[c] = new TrieNode();\n            node = node.Children[c];\n        }\n        node.IsEndOfWord = true;\n    }\n    public bool Search(string word) {\n        var node = root;\n        foreach (char c in word) {\n            if (!node.Children.ContainsKey(c)) return false;\n            node = node.Children[c];\n        }\n        return node.IsEndOfWord;\n    }\n}\n```\nInsert/Search: O(m) gdzie m to długość słowa."
        },
        {
            category: "competitive-programming",
            level: "senior",
            question: "Rozwiąż problem 'Merge K Sorted Lists' optymalnie w C#:",
            answers: [
                "Łącz listy jedna po drugiej - O(kN)",
                "Użyj PriorityQueue (Min Heap) - O(N log k)",
                "Połącz wszystko w tablicę i posortuj - O(N log N)",
                "Dziel i zwyciężaj - O(N log k)"
            ],
            correct: 1,
            explanation: "Optymalne rozwiązanie używające PriorityQueue:\n```csharp\npublic ListNode MergeKLists(ListNode[] lists) {\n    var pq = new PriorityQueue<ListNode, int>();\n    foreach (var list in lists) {\n        if (list != null)\n            pq.Enqueue(list, list.val);\n    }\n    var dummy = new ListNode(0);\n    var current = dummy;\n    while (pq.Count > 0) {\n        var node = pq.Dequeue();\n        current.next = node;\n        current = current.next;\n        if (node.next != null)\n            pq.Enqueue(node.next, node.next.val);\n    }\n    return dummy.next;\n}\n```\nCzas: O(N log k), gdzie N to łączna liczba węzłów, k to liczba list."
        },
        {
            category: "competitive-programming",
            level: "senior",
            question: "Jak rozwiązać problem 'Knapsack 0/1' z DP w C#?",
            answers: [
                "Tablica 2D DP - O(n×W) pamięci",
                "Rekurencja z memoizacją - O(n×W) pamięci",
                "Tablica 1D DP z iteracją wsteczną - O(W) pamięci",
                "Zachłannie przez stosunek wartość/waga - niepoprawne"
            ],
            correct: 2,
            explanation: "Zoptymalizowane pod kątem pamięci rozwiązanie 1D DP:\n```csharp\npublic int Knapsack(int[] weights, int[] values, int capacity) {\n    int n = weights.Length;\n    int[] dp = new int[capacity + 1];\n    for (int i = 0; i < n; i++) {\n        for (int w = capacity; w >= weights[i]; w--) {\n            dp[w] = Math.Max(dp[w], dp[w - weights[i]] + values[i]);\n        }\n    }\n    return dp[capacity];\n}\n```\nCzas: O(n×W), Pamięć: O(W). Iteracja wsteczna zapobiega ponownemu użyciu przedmiotu."
        },
        {
            category: "competitive-programming",
            level: "senior",
            question: "Znajdź wszystkie permutacje stringa używając backtrackingu w C#:",
            answers: [
                "Użyj wbudowanej biblioteki",
                "Iteracyjnie z kolejką",
                "Rekurencyjny backtracking z zamianą",
                "Generuj używając silni"
            ],
            correct: 2,
            explanation: "Klasyczne rozwiązanie backtrackingowe:\n```csharp\npublic IList<string> Permute(string str) {\n    var result = new List<string>();\n    Backtrack(str.ToCharArray(), 0, result);\n    return result;\n}\nprivate void Backtrack(char[] arr, int start, List<string> result) {\n    if (start == arr.Length) {\n        result.Add(new string(arr));\n        return;\n    }\n    for (int i = start; i < arr.Length; i++) {\n        (arr[start], arr[i]) = (arr[i], arr[start]);\n        Backtrack(arr, start + 1, result);\n        (arr[start], arr[i]) = (arr[i], arr[start]);\n    }\n}\n```\nCzas: O(n!), Pamięć: O(n) dla stosu rekurencji."
        },
        {
            category: "competitive-programming",
            level: "senior",
            question: "Zaimplementuj algorytm najkrótszej ścieżki Dijkstry w C#:",
            answers: [
                "Użyj BFS z kolejką - niepoprawne dla grafów ważonych",
                "Użyj DFS - nie gwarantuje najkrótszej ścieżki",
                "Użyj PriorityQueue z odległościami - O((V+E) log V)",
                "Użyj prostej iteracji po tablicy - O(V²)"
            ],
            correct: 2,
            explanation: "Dijkstra z PriorityQueue:\n```csharp\npublic int[] Dijkstra(List<(int node, int weight)>[] graph, int start) {\n    int n = graph.Length;\n    int[] dist = new int[n];\n    Array.Fill(dist, int.MaxValue);\n    dist[start] = 0;\n    var pq = new PriorityQueue<int, int>();\n    pq.Enqueue(start, 0);\n    while (pq.Count > 0) {\n        int u = pq.Dequeue();\n        foreach (var (v, weight) in graph[u]) {\n            int newDist = dist[u] + weight;\n            if (newDist < dist[v]) {\n                dist[v] = newDist;\n                pq.Enqueue(v, newDist);\n            }\n        }\n    }\n    return dist;\n}\n```\nCzas: O((V+E) log V) z kopcem binarnym."
        },
        {
            category: "competitive-programming",
            level: "senior",
            question: "Jak znaleźć Lowest Common Ancestor (LCA) w drzewie binarnym?",
            answers: [
                "Przechować ścieżkę do obu węzłów, znaleźć przecięcie - O(n) pamięci",
                "Rekurencyjny DFS sprawdzający czy węzły są w poddrzewach - O(h) pamięci",
                "Przeszukiwanie poziomowe - nieefektywne",
                "Wskaźniki rodzica - wymaga modyfikacji"
            ],
            correct: 1,
            explanation: "Eleganckie rozwiązanie rekurencyjne:\n```csharp\npublic TreeNode LowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n    if (root == null || root == p || root == q)\n        return root;\n    TreeNode left = LowestCommonAncestor(root.left, p, q);\n    TreeNode right = LowestCommonAncestor(root.right, p, q);\n    if (left != null && right != null)\n        return root;\n    return left ?? right;\n}\n```\nCzas: O(n), Pamięć: O(h) dla rekurencji gdzie h to wysokość."
        },
        {
            category: "competitive-programming",
            level: "senior",
            question: "Rozwiąż 'Coin Change' (minimalna liczba monet dla kwoty) z DP:",
            answers: [
                "Zachłannie przez największą monetę - niepoprawne",
                "BFS poziomowe - O(amount×coins) pamięci",
                "Bottom-up DP - O(amount) pamięci",
                "Rekurencja bez memoizacji - wykładnicze"
            ],
            correct: 2,
            explanation: "Rozwiązanie Bottom-up DP:\n```csharp\npublic int CoinChange(int[] coins, int amount) {\n    int[] dp = new int[amount + 1];\n    Array.Fill(dp, amount + 1);\n    dp[0] = 0;\n    for (int i = 1; i <= amount; i++) {\n        foreach (int coin in coins) {\n            if (coin <= i) {\n                dp[i] = Math.Min(dp[i], dp[i - coin] + 1);\n            }\n        }\n    }\n    return dp[amount] > amount ? -1 : dp[amount];\n}\n```\nCzas: O(amount × coins), Pamięć: O(amount)."
        },
        {
            category: "competitive-programming",
            level: "senior",
            question: "Zaimplementuj Union-Find (Disjoint Set) z kompresją ścieżki:",
            answers: [
                "Prosta tablica rodziców - O(n) na operację",
                "Tylko kompresja ścieżki - O(log n) zamortyzowane",
                "Tylko union by rank - O(log n) zamortyzowane",
                "Kompresja ścieżki + union by rank - O(α(n)) zamortyzowane"
            ],
            correct: 3,
            explanation: "Zoptymalizowany Union-Find:\n```csharp\npublic class UnionFind {\n    private int[] parent;\n    private int[] rank;\n    public UnionFind(int n) {\n        parent = new int[n];\n        rank = new int[n];\n        for (int i = 0; i < n; i++)\n            parent[i] = i;\n    }\n    public int Find(int x) {\n        if (parent[x] != x)\n            parent[x] = Find(parent[x]);\n        return parent[x];\n    }\n    public void Union(int x, int y) {\n        int rootX = Find(x);\n        int rootY = Find(y);\n        if (rootX == rootY) return;\n        if (rank[rootX] < rank[rootY])\n            parent[rootX] = rootY;\n        else if (rank[rootX] > rank[rootY])\n            parent[rootY] = rootX;\n        else {\n            parent[rootY] = rootX;\n            rank[rootX]++;\n        }\n    }\n}\n```\nObie operacje: O(α(n)) - odwrotna funkcja Ackermanna."
        },
        // Advanced Data Structures - Zaawansowane struktury danych
        {
            category: "algorithms",
            level: "senior",
            question: "Jak działa Drzewo Przedziałowe (Segment Tree) i do czego służy?",
            answers: [
                "Drzewo binarne do wyszukiwania w O(log n)",
                "Struktura do zapytań o przedziały z budową O(n) i zapytaniem O(log n)",
                "Drzewo AVL do zrównoważonego przechowywania",
                "Graf do najkrótszych ścieżek"
            ],
            correct: 1,
            explanation: "Drzewo Przedziałowe to struktura danych dla zapytań o przedziały:\n\nZastosowania:\n✅ Suma/minimum/maksimum w przedziale\n✅ Aktualizacje punktowe lub przedziałowe\n✅ Problemy z przedziałami\n\nZłożoność:\n- Budowa: O(n)\n- Zapytanie: O(log n)\n- Aktualizacja: O(log n)\n\n```csharp\npublic class SegmentTree {\n    private int[] tree;\n    private int n;\n    \n    public SegmentTree(int[] arr) {\n        n = arr.Length;\n        tree = new int[4 * n];\n        Build(arr, 0, 0, n - 1);\n    }\n    \n    private void Build(int[] arr, int node, int start, int end) {\n        if (start == end) {\n            tree[node] = arr[start];\n            return;\n        }\n        int mid = (start + end) / 2;\n        Build(arr, 2*node+1, start, mid);\n        Build(arr, 2*node+2, mid+1, end);\n        tree[node] = tree[2*node+1] + tree[2*node+2];\n    }\n    \n    public int Query(int L, int R) {\n        return QueryUtil(0, 0, n-1, L, R);\n    }\n    \n    private int QueryUtil(int node, int start, int end, int L, int R) {\n        if (R < start || end < L) return 0;\n        if (L <= start && end <= R) return tree[node];\n        int mid = (start + end) / 2;\n        return QueryUtil(2*node+1, start, mid, L, R) +\n               QueryUtil(2*node+2, mid+1, end, L, R);\n    }\n}\n```\n\nPrzykład: suma w przedziale [2, 5] w tablicy [1,3,5,7,9,11]\nSegmentTree st = new SegmentTree(arr);\nint sum = st.Query(2, 5); // = 5+7+9+11 = 32"
        },
        {
            category: "algorithms",
            level: "senior",
            question: "Czym jest Drzewo Fenwicka (Binary Indexed Tree) i czym różni się od Drzewa Przedziałowego?",
            answers: [
                "To to samo co Drzewo Przedziałowe",
                "Prostsze w implementacji, ale obsługuje tylko sumy prefiksowe - O(log n)",
                "Wolniejsze niż Drzewo Przedziałowe - O(n log n)",
                "Działa tylko dla liczb całkowitych"
            ],
            correct: 1,
            explanation: "Drzewo Fenwicka (BIT):\n\nZalety nad Segment Tree:\n✅ Prostsza implementacja\n✅ Mniejsze zużycie pamięci\n✅ Szybsze stałe (cache-friendly)\n\nOgraniczenia:\n❌ Tylko dla operacji odwracalnych (suma, XOR)\n❌ Nie dla min/max (użyj Segment Tree)\n\n```csharp\npublic class FenwickTree {\n    private int[] tree;\n    private int n;\n    \n    public FenwickTree(int size) {\n        n = size;\n        tree = new int[n + 1];\n    }\n    \n    // Aktualizuj wartość na pozycji idx\n    public void Update(int idx, int delta) {\n        idx++; // 1-indexed\n        while (idx <= n) {\n            tree[idx] += delta;\n            idx += idx & (-idx); // Dodaj ostatni bit\n        }\n    }\n    \n    // Suma prefiksowa [0..idx]\n    public int Query(int idx) {\n        idx++; // 1-indexed\n        int sum = 0;\n        while (idx > 0) {\n            sum += tree[idx];\n            idx -= idx & (-idx); // Usuń ostatni bit\n        }\n        return sum;\n    }\n    \n    // Suma w przedziale [left, right]\n    public int RangeQuery(int left, int right) {\n        return Query(right) - (left > 0 ? Query(left - 1) : 0);\n    }\n}\n```\n\nKluczowa sztuczka: `idx & (-idx)` = ostatni ustawiony bit\nDla idx=6 (110): 6 & (-6) = 6 & (11111010) = 2 (010)"
        },
        {
            category: "algorithms",
            level: "principal",
            question: "Jak efektywnie obliczyć medianę ze strumienia danych?",
            answers: [
                "Sortować tablicę za każdym razem - O(n log n)",
                "Użyć dwóch kopców (max i min) - O(log n) wstawienie, O(1) mediana",
                "Użyć drzewa BST - O(log n)",
                "Użyć hashmapy - O(1)"
            ],
            correct: 1,
            explanation: "Algorytm dwóch kopców dla mediany ze strumienia:\n\nStruktura:\n- Max heap: mniejsza połowa liczb\n- Min heap: większa połowa liczb\n- Mediana: górne elementy kopców\n\n```csharp\npublic class MedianFinder {\n    private PriorityQueue<int, int> maxHeap; // mniejsza połowa\n    private PriorityQueue<int, int> minHeap; // większa połowa\n    \n    public MedianFinder() {\n        // Max heap: odwróć porównanie\n        maxHeap = new PriorityQueue<int, int>(\n            Comparer<int>.Create((a, b) => b - a));\n        minHeap = new PriorityQueue<int, int>();\n    }\n    \n    public void AddNum(int num) {\n        // Dodaj do max heap (mniejsza połowa)\n        maxHeap.Enqueue(num, num);\n        \n        // Balansuj: przenieś największy z maxHeap do minHeap\n        minHeap.Enqueue(maxHeap.Peek(), maxHeap.Peek());\n        maxHeap.Dequeue();\n        \n        // Zachowaj rozmiar: maxHeap >= minHeap\n        if (maxHeap.Count < minHeap.Count) {\n            maxHeap.Enqueue(minHeap.Peek(), minHeap.Peek());\n            minHeap.Dequeue();\n        }\n    }\n    \n    public double FindMedian() {\n        if (maxHeap.Count > minHeap.Count)\n            return maxHeap.Peek();\n        return (maxHeap.Peek() + minHeap.Peek()) / 2.0;\n    }\n}\n```\n\nPrzykład: strumień [5, 15, 1, 3]\n- Dodaj 5: maxHeap=[5], mediana=5\n- Dodaj 15: maxHeap=[5], minHeap=[15], mediana=10\n- Dodaj 1: maxHeap=[5,1], minHeap=[15], mediana=5\n- Dodaj 3: maxHeap=[3,1], minHeap=[5,15], mediana=4"
        },
        {
            category: "system-design",
            level: "principal",
            question: "Jak zaprojektować thread-safe LRU Cache z efektywnym O(1)?",
            answers: [
                "Użyć Dictionary z lockiem - O(1) ale wolne",
                "LinkedList + Dictionary + ReaderWriterLockSlim - O(1) z współbieżnością",
                "Tylko Dictionary - niethread-safe",
                "ConcurrentDictionary - brak LRU eviction"
            ],
            correct: 1,
            explanation: "Thread-safe LRU Cache wymaga:\n✅ O(1) get/put\n✅ Thread safety\n✅ LRU eviction\n\nImplementacja:\n```csharp\npublic class LRUCache<K, V> {\n    private class Node {\n        public K Key;\n        public V Value;\n        public Node Prev, Next;\n    }\n    \n    private int capacity;\n    private Dictionary<K, Node> cache;\n    private Node head, tail;\n    private ReaderWriterLockSlim rwLock;\n    \n    public LRUCache(int capacity) {\n        this.capacity = capacity;\n        cache = new Dictionary<K, Node>(capacity);\n        rwLock = new ReaderWriterLockSlim();\n        head = new Node(); tail = new Node();\n        head.Next = tail; tail.Prev = head;\n    }\n    \n    public V Get(K key) {\n        rwLock.EnterUpgradeableReadLock();\n        try {\n            if (!cache.TryGetValue(key, out Node node))\n                return default(V);\n            \n            rwLock.EnterWriteLock();\n            try {\n                MoveToHead(node);\n                return node.Value;\n            } finally {\n                rwLock.ExitWriteLock();\n            }\n        } finally {\n            rwLock.ExitUpgradeableReadLock();\n        }\n    }\n    \n    public void Put(K key, V value) {\n        rwLock.EnterWriteLock();\n        try {\n            if (cache.TryGetValue(key, out Node node)) {\n                node.Value = value;\n                MoveToHead(node);\n            } else {\n                Node newNode = new Node { Key = key, Value = value };\n                cache[key] = newNode;\n                AddToHead(newNode);\n                \n                if (cache.Count > capacity) {\n                    Node removed = RemoveTail();\n                    cache.Remove(removed.Key);\n                }\n            }\n        } finally {\n            rwLock.ExitWriteLock();\n        }\n    }\n    \n    private void MoveToHead(Node node) {\n        RemoveNode(node);\n        AddToHead(node);\n    }\n    \n    private void AddToHead(Node node) {\n        node.Next = head.Next;\n        node.Prev = head;\n        head.Next.Prev = node;\n        head.Next = node;\n    }\n    \n    private void RemoveNode(Node node) {\n        node.Prev.Next = node.Next;\n        node.Next.Prev = node.Prev;\n    }\n    \n    private Node RemoveTail() {\n        Node node = tail.Prev;\n        RemoveNode(node);\n        return node;\n    }\n}\n```\n\nZłożoność: Get/Put O(1)\nThread safety: ReaderWriterLockSlim pozwala na wielokrotne odczyty"
        },
        // String Operations - Operacje na stringach
        {
            category: "algorithms",
            level: "mid",
            question: "Jak sprawdzić, czy jeden string jest rotacją drugiego?",
            answers: [
                "Porównać każdą możliwą rotację - O(n²)",
                "Sprawdzić czy s1 jest podstringiem s2+s2 - O(n)",
                "Użyć hashmapy - O(n log n)",
                "Posortować oba stringi - niepoprawne"
            ],
            correct: 1,
            explanation: "Sprytna sztuczka do sprawdzenia rotacji:\n\nPomysł:\n- Jeśli s1 jest rotacją s2, to s1 jest podstringiem s2+s2\n- Przykład: \"waterbottle\" i \"erbottlewat\"\n- \"erbottlewat\" + \"erbottlewat\" = \"erbottlewaterbottlewat\"\n- \"waterbottle\" jest podstringiem!\n\n```csharp\npublic bool IsRotation(string s1, string s2) {\n    // Sprawdź długości\n    if (s1.Length != s2.Length || s1.Length == 0)\n        return false;\n    \n    // s1 jest podstringiem s2+s2?\n    string doubled = s2 + s2;\n    return doubled.Contains(s1);\n}\n```\n\nPrzykłady:\n✅ IsRotation(\"waterbottle\", \"erbottlewat\") = true\n✅ IsRotation(\"abc\", \"cab\") = true\n❌ IsRotation(\"abc\", \"acb\") = false (nie rotacja)\n\nZłożoność: O(n) używając KMP dla Contains\nPamięć: O(n) dla podwojonego stringa"
        },
        {
            category: "algorithms",
            level: "mid",
            question: "Jak usunąć wszystkie sąsiednie duplikaty ze stringa?",
            answers: [
                "Użyć zagnieżdżonych pętli - O(n²)",
                "Użyć stosu - O(n) czas, O(n) pamięć",
                "Sortować najpierw - O(n log n)",
                "Użyć rekurencji - O(n) ale stack overflow"
            ],
            correct: 1,
            explanation: "Algorytm ze stosem dla sąsiednich duplikatów:\n\n```csharp\npublic string RemoveAdjacentDuplicates(string s) {\n    Stack<char> stack = new Stack<char>();\n    \n    foreach (char c in s) {\n        if (stack.Count > 0 && stack.Peek() == c) {\n            stack.Pop(); // Usuń duplikat\n        } else {\n            stack.Push(c);\n        }\n    }\n    \n    // Zbuduj wynik od końca\n    char[] result = new char[stack.Count];\n    for (int i = result.Length - 1; i >= 0; i--) {\n        result[i] = stack.Pop();\n    }\n    \n    return new string(result);\n}\n```\n\nPrzykłady:\n- \"abbaca\" → \"ca\"\n  Krok po kroku: a,b,b(usuń),a,c,a\n  Stos: [a] → [a,b] → [a] → [] → [c] → [c,a]\n  \n- \"azxxzy\" → \"ay\"\n  [a] → [a,z] → [a,z,x] → [a,z] → [a] → [a,y]\n\nZłożoność:\n- Czas: O(n) - jedna iteracja\n- Pamięć: O(n) - stos w najgorszym przypadku"
        },
        {
            category: "algorithms",
            level: "senior",
            question: "Jak działa algorytm Rabina-Karpa do wyszukiwania wzorca?",
            answers: [
                "Porównuje każdy znak - O(nm)",
                "Używa haszowania kroczącego (rolling hash) - O(n+m) średnio",
                "Buduje drzewo sufiksowe - O(m²)",
                "Sortuje wzorzec - O(m log m)"
            ],
            correct: 1,
            explanation: "Algorytm Rabina-Karpa używa rolling hash:\n\nPomysł:\n- Oblicz hash wzorca\n- Przesuń okno po tekście, aktualizując hash w O(1)\n- Sprawdź znaki tylko gdy hasze się zgadzają\n\n```csharp\npublic List<int> RabinKarp(string text, string pattern) {\n    List<int> matches = new List<int>();\n    int n = text.Length, m = pattern.Length;\n    if (m > n) return matches;\n    \n    const int d = 256; // rozmiar alfabetu\n    const int q = 101; // liczba pierwsza dla modulo\n    \n    int patternHash = 0, textHash = 0;\n    int h = 1; // d^(m-1) % q\n    \n    // Oblicz h = d^(m-1) % q\n    for (int i = 0; i < m - 1; i++)\n        h = (h * d) % q;\n    \n    // Oblicz początkowe hasze\n    for (int i = 0; i < m; i++) {\n        patternHash = (d * patternHash + pattern[i]) % q;\n        textHash = (d * textHash + text[i]) % q;\n    }\n    \n    // Przesuń okno po tekście\n    for (int i = 0; i <= n - m; i++) {\n        // Sprawdź hash\n        if (patternHash == textHash) {\n            // Potwierdź dopasowanie\n            bool match = true;\n            for (int j = 0; j < m; j++) {\n                if (text[i + j] != pattern[j]) {\n                    match = false;\n                    break;\n                }\n            }\n            if (match) matches.Add(i);\n        }\n        \n        // Oblicz hash następnego okna (rolling hash)\n        if (i < n - m) {\n            textHash = (d * (textHash - text[i] * h) + text[i + m]) % q;\n            if (textHash < 0) textHash += q;\n        }\n    }\n    \n    return matches;\n}\n```\n\nPrzykład: tekst=\"ABABCABABA\", pattern=\"ABA\"\nWystąpienia na pozycjach: [0, 5, 7]\n\nZłożoność:\n- Średnia: O(n + m)\n- Najgorsza: O(nm) gdy dużo kolizji hash"
        },
        {
            category: "algorithms",
            level: "senior",
            question: "Jak znaleźć najdłuższy palindromiczny podstring?",
            answers: [
                "Sprawdzić każdy podstring - O(n³)",
                "Rozszerzanie wokół środka - O(n²) czas, O(1) pamięć",
                "Dynamiczne programowanie - O(n²) czas i pamięć",
                "Algorytm Manachera - O(n) ale skomplikowany"
            ],
            correct: 1,
            explanation: "Expand Around Center - najlepsza równowaga:\n\nPomysł:\n- Każdy palindrom ma środek\n- Środek może być znakiem (nieparzysty) lub szczeliną (parzysty)\n- Rozszerz wokół każdego możliwego środka\n\n```csharp\npublic string LongestPalindrome(string s) {\n    if (string.IsNullOrEmpty(s)) return \"\";\n    \n    int start = 0, maxLen = 0;\n    \n    for (int i = 0; i < s.Length; i++) {\n        // Nieparzysty palindrom (środek = i)\n        int len1 = ExpandAroundCenter(s, i, i);\n        // Parzysty palindrom (środek = i, i+1)\n        int len2 = ExpandAroundCenter(s, i, i + 1);\n        \n        int len = Math.Max(len1, len2);\n        if (len > maxLen) {\n            maxLen = len;\n            start = i - (len - 1) / 2;\n        }\n    }\n    \n    return s.Substring(start, maxLen);\n}\n\nprivate int ExpandAroundCenter(string s, int left, int right) {\n    while (left >= 0 && right < s.Length && s[left] == s[right]) {\n        left--;\n        right++;\n    }\n    return right - left - 1;\n}\n```\n\nPrzykłady:\n- \"babad\" → \"bab\" lub \"aba\"\n- \"cbbd\" → \"bb\"\n- \"racecar\" → \"racecar\"\n\nZłożoność:\n- Czas: O(n²) - n środków × O(n) rozszerzanie\n- Pamięć: O(1)\n\nAlternatywa: Algorytm Manachera O(n), ale rzadko używany na rozmowach"
        },
        // Performance - Wydajność
        {
            category: "programming",
            level: "senior",
            question: "Czym różni się lazy loading od eager loading w Entity Framework?",
            answers: [
                "Brak różnicy, to synonimy",
                "Lazy: ładuje powiązane dane na żądanie (N+1), Eager: ładuje wszystko z Include",
                "Lazy jest zawsze szybsze",
                "Eager używa więcej pamięci więc unikaj"
            ],
            correct: 1,
            explanation: "Lazy vs Eager Loading:\n\n**Lazy Loading** - ładuje powiązane dane gdy są użyte:\n```csharp\n// Problem N+1 queries!\nvar users = context.Users.ToList(); // 1 zapytanie\nforeach (var user in users) {\n    // Każde user.Orders tworzy osobne zapytanie!\n    Console.WriteLine(user.Orders.Count); // N zapytań\n}\n// Total: 1 + N zapytań = powolne!\n```\n\n**Eager Loading** - ładuje wszystko za jednym razem:\n```csharp\n// Jedno zapytanie z JOIN\nvar users = context.Users\n    .Include(u => u.Orders)\n    .ToList();\nforeach (var user in users) {\n    Console.WriteLine(user.Orders.Count); // Bez dodatkowych zapytań\n}\n// Total: 1 zapytanie = szybkie!\n```\n\n**Explicit Loading** - kontrolowane ładowanie:\n```csharp\nvar user = context.Users.Find(1);\n// Załaduj tylko gdy potrzebne\ncontext.Entry(user)\n    .Collection(u => u.Orders)\n    .Load();\n```\n\nKiedy użyć:\n✅ Eager (.Include): znasz potrzebne relacje\n✅ Explicit: warunkowe ładowanie\n❌ Lazy: unikaj - problem N+1!\n\nBest practice:\n```csharp\nvar users = context.Users\n    .Include(u => u.Orders)\n        .ThenInclude(o => o.Items)\n    .Where(u => u.IsActive)\n    .ToList();\n```"
        },
        {
            category: "databases",
            level: "senior",
            question: "Czym jest connection pooling i dlaczego jest ważny?",
            answers: [
                "Współdzielenie jednego połączenia - niebezpieczne",
                "Buforowanie połączeń do bazy - dramatycznie redukuje overhead tworzenia połączeń",
                "Cache dla wyników zapytań",
                "Kompresja danych połączenia"
            ],
            correct: 1,
            explanation: "Connection Pooling = reużywanie połączeń do bazy:\n\nProblem bez poolingu:\n```csharp\n// ŹLE - tworzy nowe połączenie za każdym razem\nfor (int i = 0; i < 100; i++) {\n    using (var conn = new SqlConnection(connectionString)) {\n        conn.Open(); // Kosztowne: TCP handshake, autentykacja\n        // ... zapytanie ...\n    } // Zamyka i niszczy połączenie\n}\n// 100 × (connect + auth + disconnect) = POWOLNE!\n```\n\nZ poolingiem:\n```csharp\n// DOBRZE - używa connection pool\nstring connectionString = \n    \"Server=.;Database=MyDB;\" +\n    \"Min Pool Size=5;Max Pool Size=100;\" + // konfiguracja pool\n    \"Pooling=true;\"; // domyślnie true w ADO.NET\n\nfor (int i = 0; i < 100; i++) {\n    using (var conn = new SqlConnection(connectionString)) {\n        conn.Open(); // Reużywa połączenia z puli\n        // ... zapytanie ...\n    } // Zwraca do puli zamiast zamykać\n}\n// Tworzy ~5-20 fizycznych połączeń, reużywa 100 razy\n```\n\nJak działa:\n1. Pierwsze conn.Open(): tworzy fizyczne połączenie\n2. conn.Dispose(): zwraca do puli (nie zamyka!)\n3. Następne conn.Open(): reużywa z puli\n4. Pool zarządza lifetimem połączeń\n\nKonfiguracja:\n- **Min Pool Size**: utrzymywane zawsze (default: 0)\n- **Max Pool Size**: maksymalna liczba (default: 100)\n- **Connection Lifetime**: max czas życia (seconds)\n- **Connection Timeout**: timeout dla conn.Open()\n\nBest practices:\n```csharp\n// ASP.NET Core - Dependency Injection\nservices.AddDbContext<MyContext>(options =>\n    options.UseSqlServer(connectionString));\n\n// Używaj using - zawsze zwróć do puli!\nusing (var context = new MyContext()) {\n    var data = context.Users.ToList();\n}\n```\n\nWydajność:\n- Bez poolingu: ~100ms na połączenie\n- Z poolingiem: ~1ms reużycie\n- 100× szybciej dla aplikacji webowych!"
        },
        {
            category: "system-design",
            level: "senior",
            question: "Jakie strategie cache'owania wyników zapytań są najczęściej używane?",
            answers: [
                "Tylko in-memory cache - zawsze najszybszy",
                "Cache-aside, Write-through, Write-behind z TTL i invalidation",
                "Nigdy nie cache'ować zapytań",
                "Cache tylko na froncie"
            ],
            correct: 1,
            explanation: "Strategie cache'owania zapytań:\n\n**1. Cache-Aside (Lazy Loading)** - najpopularniejszy:\n```csharp\npublic async Task<User> GetUser(int id) {\n    string key = $\"user:{id}\";\n    \n    // Sprawdź cache\n    var cached = await cache.GetAsync(key);\n    if (cached != null)\n        return JsonSerializer.Deserialize<User>(cached);\n    \n    // Cache miss - pobierz z bazy\n    var user = await db.Users.FindAsync(id);\n    \n    // Zapisz do cache z TTL\n    await cache.SetAsync(key, \n        JsonSerializer.SerializeToUtf8Bytes(user),\n        new DistributedCacheEntryOptions {\n            AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(10)\n        });\n    \n    return user;\n}\n```\n\n**2. Write-Through** - cache i DB jednocześnie:\n```csharp\npublic async Task UpdateUser(User user) {\n    string key = $\"user:{user.Id}\";\n    \n    // Zapisz do bazy\n    await db.SaveChangesAsync();\n    \n    // Aktualizuj cache\n    await cache.SetAsync(key, \n        JsonSerializer.SerializeToUtf8Bytes(user),\n        new DistributedCacheEntryOptions {\n            AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(10)\n        });\n}\n```\n\n**3. Write-Behind (Write-Back)** - async zapis:\n```csharp\npublic async Task UpdateUserAsync(User user) {\n    string key = $\"user:{user.Id}\";\n    \n    // Aktualizuj cache natychmiast\n    await cache.SetAsync(key, \n        JsonSerializer.SerializeToUtf8Bytes(user));\n    \n    // Zakolejkuj zapis do DB (background job)\n    await queue.EnqueueAsync(new DbWriteJob {\n        Entity = user,\n        Timestamp = DateTime.UtcNow\n    });\n}\n```\n\n**Cache Invalidation** - najtrudniejszy problem:\n```csharp\npublic async Task InvalidateUserCache(int userId) {\n    // Usuń konkretny klucz\n    await cache.RemoveAsync($\"user:{userId}\");\n    \n    // Usuń powiązane (np. lista użytkowników)\n    await cache.RemoveAsync(\"users:list\");\n}\n\n// Pattern z tagami (Redis)\npublic async Task<List<User>> GetActiveUsers() {\n    var cached = await cache.GetAsync(\"users:active\");\n    if (cached != null) return Deserialize(cached);\n    \n    var users = await db.Users.Where(u => u.IsActive).ToListAsync();\n    \n    await cache.SetAsync(\"users:active\", Serialize(users), \n        new DistributedCacheEntryOptions {\n            AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5),\n            // Tag dla invalidation\n            Tags = new[] { \"users\" }\n        });\n    \n    return users;\n}\n\n// Invalidacja po tagu\nawait cache.RemoveByTagAsync(\"users\");\n```\n\nASP.NET Core - gotowe rozwiązanie:\n```csharp\n// Startup/Program.cs\nservices.AddStackExchangeRedisCache(options => {\n    options.Configuration = \"localhost:6379\";\n});\n\n// Controller\npublic class UserController : ControllerBase {\n    private readonly IDistributedCache _cache;\n    \n    [HttpGet(\"{id}\")]\n    [ResponseCache(Duration = 300)] // Output caching\n    public async Task<User> Get(int id) {\n        // Cache-aside pattern\n    }\n}\n```\n\nKiedy użyć:\n✅ Cache-Aside: większość przypadków\n✅ Write-Through: krytyczna spójność\n✅ Write-Behind: wysokie write throughput\n❌ Unikaj: często zmieniające się dane"
        },
        {
            category: "programming",
            level: "mid",
            question: "Dlaczego StringBuilder jest szybszy niż konkatenacja stringów w pętli?",
            answers: [
                "Nie ma różnicy wydajności",
                "String jest immutable, więc += tworzy nowe obiekty - O(n²), StringBuilder - O(n)",
                "StringBuilder używa kompresji",
                "String jest thread-safe więc wolniejszy"
            ],
            correct: 1,
            explanation: "String vs StringBuilder wydajność:\n\n**Problem ze stringami** (immutable):\n```csharp\n// ŹLE - O(n²) złożoność!\nstring result = \"\";\nfor (int i = 0; i < 10000; i++) {\n    result += \"test\"; // Tworzy NOWY string za każdym razem!\n}\n// Iteracja 1: \"\" + \"test\" = nowy string (4 znaki)\n// Iteracja 2: \"test\" + \"test\" = nowy string (8 znaków)\n// Iteracja 3: \"testtest\" + \"test\" = nowy string (12 znaków)\n// ...\n// Total kopiowania: 4 + 8 + 12 + ... + 40000 = O(n²)\n```\n\n**StringBuilder** (mutable):\n```csharp\n// DOBRZE - O(n) złożoność!\nvar sb = new StringBuilder();\nfor (int i = 0; i < 10000; i++) {\n    sb.Append(\"test\"); // Dodaje do istniejącego bufora\n}\nstring result = sb.ToString();\n// Alokuje bufor (np. 16), podwaja gdy pełny: 16→32→64→128...\n// Total kopiowania: O(n) dzięki geometrycznemu wzrostowi\n```\n\nBenchmark:\n```csharp\nusing BenchmarkDotNet.Attributes;\n\n[MemoryDiagnoser]\npublic class StringBenchmark {\n    [Benchmark]\n    public string StringConcat() {\n        string s = \"\";\n        for (int i = 0; i < 10000; i++)\n            s += \"x\";\n        return s;\n    }\n    \n    [Benchmark]\n    public string StringBuilderAppend() {\n        var sb = new StringBuilder();\n        for (int i = 0; i < 10000; i++)\n            sb.Append(\"x\");\n        return sb.ToString();\n    }\n}\n\n// Wyniki:\n// StringConcat:        250ms, 400 MB allocated\n// StringBuilderAppend:   2ms,   0.5 MB allocated\n// StringBuilder 125× szybszy!\n```\n\nKiedy użyć:\n✅ StringBuilder: pętle, dużo konkatenacji\n✅ String interpolation: mało operacji\n```csharp\n// OK dla małej liczby\nstring name = $\"{firstName} {lastName}\";\n\n// ŹLE dla pętli\nstring html = \"\";\nfor (int i = 0; i < items.Count; i++)\n    html += $\"<li>{items[i]}</li>\"; // O(n²)!\n\n// DOBRZE\nvar sb = new StringBuilder();\nforeach (var item in items)\n    sb.Append($\"<li>{item}</li>\");\nstring html = sb.ToString();\n```\n\nOptymalizacja capacity:\n```csharp\n// Podaj początkową capacity jeśli znasz rozmiar\nvar sb = new StringBuilder(capacity: 10000);\n// Unikaj realokacji bufora!\n```"
        },
        // Security - Bezpieczeństwo
        {
            category: "system-design",
            level: "senior",
            question: "Jak zapobiec atakom SQL Injection?",
            answers: [
                "Walidować input po stronie klienta",
                "Używać parametryzowanych zapytań / ORM - NIGDY nie konkatenować SQL",
                "Escapować apostrofy",
                "Ograniczyć długość inputu"
            ],
            correct: 1,
            explanation: "SQL Injection Prevention:\n\n**NIGDY nie rób tego** ❌:\n```csharp\n// PODATNE NA SQL INJECTION!\nstring username = Request.Form[\"username\"];\nstring password = Request.Form[\"password\"];\n\nstring sql = $\"SELECT * FROM Users WHERE Username='{username}' AND Password='{password}'\";\n// Atakujący wpisuje: username = \"admin'--\"\n// Zapytanie: SELECT * FROM Users WHERE Username='admin'--' AND Password='...'\n// Komentarz -- ignoruje sprawdzenie hasła!\n\nusing (var cmd = new SqlCommand(sql, connection)) {\n    var reader = cmd.ExecuteReader();\n}\n```\n\n**ZAWSZE używaj parametrów** ✅:\n```csharp\n// BEZPIECZNE - parametryzowane zapytanie\nstring sql = \"SELECT * FROM Users WHERE Username=@username AND Password=@password\";\n\nusing (var cmd = new SqlCommand(sql, connection)) {\n    cmd.Parameters.AddWithValue(\"@username\", username);\n    cmd.Parameters.AddWithValue(\"@password\", password);\n    var reader = cmd.ExecuteReader();\n}\n// Parametry są automatycznie escapowane przez ADO.NET\n```\n\n**Entity Framework** - automatyczna ochrona:\n```csharp\n// BEZPIECZNE - EF używa parametrów\nvar user = context.Users\n    .FirstOrDefault(u => u.Username == username && u.Password == password);\n\n// BEZPIECZNE - nawet z interpolacją w FromSqlRaw\nvar users = context.Users\n    .FromSqlRaw(\"SELECT * FROM Users WHERE Username = {0}\", username)\n    .ToList();\n```\n\n**Dapper** - mikro-ORM:\n```csharp\n// BEZPIECZNE\nvar user = connection.QueryFirstOrDefault<User>(\n    \"SELECT * FROM Users WHERE Username = @username\",\n    new { username });\n```\n\n**Dodatkowa ochrona**:\n```csharp\n// 1. Least privilege - ogranicz uprawnienia DB\n// Użytkownik aplikacji nie powinien mieć:\n// - DROP TABLE\n// - ALTER\n// - Dostępu do systemowych tabel\n\n// 2. Walidacja inputu (defense in depth)\npublic bool IsValidUsername(string username) {\n    // Tylko alfanumeryczne, 3-20 znaków\n    return Regex.IsMatch(username, @\"^[a-zA-Z0-9]{3,20}$\");\n}\n\n// 3. Stored Procedures (opcjonalnie)\nusing (var cmd = new SqlCommand(\"sp_ValidateUser\", connection)) {\n    cmd.CommandType = CommandType.StoredProcedure;\n    cmd.Parameters.AddWithValue(\"@username\", username);\n    // ...\n}\n```\n\nZasady:\n✅ ZAWSZE parametryzowane zapytania\n✅ Używaj ORM (EF, Dapper)\n✅ Waliduj input\n✅ Least privilege dla DB user\n❌ NIGDY konkatenacja SQL\n❌ NIGDY escapowanie ręczne"
        },
        {
            category: "system-design",
            level: "senior",
            question: "Jak zapobiec atakom XSS (Cross-Site Scripting)?",
            answers: [
                "Wyłączyć JavaScript w przeglądarce",
                "Enkodować output, używać Content Security Policy, walidować input",
                "Tylko używać HTTPS",
                "Blokować tagi <script>"
            ],
            correct: 1,
            explanation: "XSS (Cross-Site Scripting) Prevention:\n\n**Problem - Reflected XSS**:\n```csharp\n// PODATNE! ❌\npublic IActionResult Search(string query) {\n    // Użytkownik wpisuje: <script>alert(document.cookie)</script>\n    return Content($\"<h1>Wyniki dla: {query}</h1>\", \"text/html\");\n    // Renderuje: <h1>Wyniki dla: <script>alert(document.cookie)</script></h1>\n    // Wykonuje złośliwy kod!\n}\n```\n\n**Rozwiązanie 1: Output Encoding** ✅:\n```csharp\n// ASP.NET Core Razor - automatyczne HTML encoding\n@model SearchViewModel\n<h1>Wyniki dla: @Model.Query</h1>\n// Input: <script>alert(1)</script>\n// Output: &lt;script&gt;alert(1)&lt;/script&gt; (bezpieczne)\n\n// Ręczne encoding gdy potrzebne\n@using System.Web\n<div>@Html.Raw(HttpUtility.HtmlEncode(userInput))</div>\n```\n\n**Rozwiązanie 2: Content Security Policy**:\n```csharp\n// Startup.cs / Program.cs\napp.Use(async (context, next) => {\n    context.Response.Headers.Add(\"Content-Security-Policy\",\n        \"default-src 'self'; \" +\n        \"script-src 'self' https://trusted.cdn.com; \" +\n        \"style-src 'self' 'unsafe-inline'; \" +\n        \"img-src 'self' data: https:;\");\n    await next();\n});\n// Blokuje inline scripts i niewiarygodne źródła\n```\n\n**Rozwiązanie 3: Sanityzacja HTML**:\n```csharp\nusing Ganss.XSS;\n\npublic string SanitizeHtml(string input) {\n    var sanitizer = new HtmlSanitizer();\n    \n    // Dozwolone tagi\n    sanitizer.AllowedTags.Add(\"b\");\n    sanitizer.AllowedTags.Add(\"i\");\n    sanitizer.AllowedTags.Add(\"p\");\n    \n    // Usuń niebezpieczne atrybuty\n    sanitizer.AllowedAttributes.Remove(\"onclick\");\n    sanitizer.AllowedAttributes.Remove(\"onerror\");\n    \n    return sanitizer.Sanitize(input);\n}\n\n// Użycie\nstring userHtml = \"<p onclick='alert(1)'>Test</p><script>alert(2)</script>\";\nstring safe = SanitizeHtml(userHtml);\n// Wynik: \"<p>Test</p>\" (bezpieczne)\n```\n\n**Typy XSS**:\n\n1. **Stored XSS** - najgroźniejszy:\n```csharp\n// Zapisz komentarz do DB\npublic async Task<IActionResult> PostComment(string comment) {\n    // ❌ PODATNE - zapisuje <script>...\n    await db.Comments.AddAsync(new Comment { Text = comment });\n    \n    // ✅ BEZPIECZNE\n    await db.Comments.AddAsync(new Comment { \n        Text = SanitizeHtml(comment) \n    });\n}\n```\n\n2. **DOM-based XSS** - po stronie klienta:\n```javascript\n// ❌ PODATNE\nconst name = new URLSearchParams(window.location.search).get('name');\ndocument.getElementById('welcome').innerHTML = `Witaj ${name}`;\n\n// ✅ BEZPIECZNE\ndocument.getElementById('welcome').textContent = `Witaj ${name}`;\n// lub\nconst div = document.createElement('div');\ndiv.textContent = `Witaj ${name}`;\n```\n\n**Best Practices**:\n```csharp\n// ASP.NET Core - domyślnie bezpieczny\n@Model.UserInput  // Auto HTML-encoded ✅\n@Html.Raw(Model.UserInput)  // NIE encoduje - niebezpieczne! ❌\n\n// JavaScript context\n<script>\n    var userName = \"@Html.JavaScriptStringEncode(Model.Name)\";\n</script>\n\n// URL context\n<a href=\"@Url.Encode(Model.RedirectUrl)\">Link</a>\n\n// Attribute context\n<div data-user=\"@Html.AttributeEncode(Model.Name)\"></div>\n```\n\nZasady obrony:\n✅ Zawsze enkoduj output w kontekście (HTML/JS/URL/CSS)\n✅ Użyj Content Security Policy\n✅ Sanityzuj HTML jeśli musisz przyjąć rich text\n✅ Używaj bibliotek jak Razor (auto-encoding)\n❌ NIGDY @Html.Raw() na user input\n❌ NIGDY innerHTML z user input"
        },
        {
            category: "system-design",
            level: "senior",
            question: "Czym różni się Authentication od Authorization?",
            answers: [
                "To samo, synonimy",
                "Authentication = kim jesteś (tożsamość), Authorization = co możesz robić (uprawnienia)",
                "Authentication dla API, Authorization dla UI",
                "Authorization jest szybsza"
            ],
            correct: 1,
            explanation: "Authentication vs Authorization:\n\n**Authentication (AuthN)** = \"Kim jesteś?\"\n- Potwierdzenie tożsamości\n- Login + password, OAuth, certificates\n- Odpowiada: czy użytkownik jest tym za kogo się podaje?\n\n**Authorization (AuthZ)** = \"Co możesz robić?\"\n- Kontrola dostępu do zasobów\n- Role, claims, policies\n- Odpowiada: czy użytkownik ma uprawnienia?\n\n**ASP.NET Core - Authentication**:\n```csharp\n// Startup/Program.cs\nservices.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)\n    .AddCookie(options => {\n        options.LoginPath = \"/Account/Login\";\n        options.ExpireTimeSpan = TimeSpan.FromHours(1);\n    });\n\n// Login Controller\npublic async Task<IActionResult> Login(LoginViewModel model) {\n    var user = await ValidateUser(model.Username, model.Password);\n    if (user == null)\n        return Unauthorized();\n    \n    // Utwórz claims (tożsamość)\n    var claims = new List<Claim> {\n        new Claim(ClaimTypes.Name, user.Username),\n        new Claim(ClaimTypes.Email, user.Email),\n        new Claim(ClaimTypes.Role, user.Role)\n    };\n    \n    var identity = new ClaimsIdentity(claims, \n        CookieAuthenticationDefaults.AuthenticationScheme);\n    var principal = new ClaimsPrincipal(identity);\n    \n    // Zaloguj użytkownika (AUTHENTICATION)\n    await HttpContext.SignInAsync(\n        CookieAuthenticationDefaults.AuthenticationScheme,\n        principal);\n    \n    return RedirectToAction(\"Index\", \"Home\");\n}\n```\n\n**ASP.NET Core - Authorization**:\n```csharp\n// 1. Role-based\n[Authorize(Roles = \"Admin\")] // Tylko admin\npublic IActionResult DeleteUser(int id) {\n    // ...\n}\n\n// 2. Policy-based (bardziej elastyczne)\nservices.AddAuthorization(options => {\n    options.AddPolicy(\"RequireAdmin\", policy =>\n        policy.RequireRole(\"Admin\"));\n    \n    options.AddPolicy(\"AtLeast18\", policy =>\n        policy.RequireClaim(\"Age\", \"18\", \"19\", \"20\", /* ... */));\n    \n    options.AddPolicy(\"SeniorEmployee\", policy =>\n        policy.RequireAssertion(context =>\n            context.User.HasClaim(c => c.Type == \"EmploymentDate\" &&\n                DateTime.Parse(c.Value) < DateTime.Now.AddYears(-5))));\n});\n\n// Użycie policy\n[Authorize(Policy = \"RequireAdmin\")]\npublic IActionResult AdminPanel() { }\n\n// 3. Custom Authorization Handler\npublic class MinimumAgeRequirement : IAuthorizationRequirement {\n    public int MinimumAge { get; }\n    public MinimumAgeRequirement(int age) => MinimumAge = age;\n}\n\npublic class MinimumAgeHandler : AuthorizationHandler<MinimumAgeRequirement> {\n    protected override Task HandleRequirementAsync(\n        AuthorizationHandlerContext context,\n        MinimumAgeRequirement requirement) {\n        \n        var ageClaim = context.User.FindFirst(c => c.Type == \"Age\");\n        if (ageClaim != null && \n            int.Parse(ageClaim.Value) >= requirement.MinimumAge) {\n            context.Succeed(requirement);\n        }\n        \n        return Task.CompletedTask;\n    }\n}\n\n// Rejestracja\nservices.AddSingleton<IAuthorizationHandler, MinimumAgeHandler>();\nservices.AddAuthorization(options => {\n    options.AddPolicy(\"AtLeast21\", policy =>\n        policy.Requirements.Add(new MinimumAgeRequirement(21)));\n});\n```\n\n**Resource-based Authorization**:\n```csharp\npublic class DocumentAuthorizationHandler : \n    AuthorizationHandler<OperationAuthorizationRequirement, Document> {\n    \n    protected override Task HandleRequirementAsync(\n        AuthorizationHandlerContext context,\n        OperationAuthorizationRequirement requirement,\n        Document resource) {\n        \n        // Tylko właściciel lub admin może edytować\n        if (requirement.Name == \"Edit\") {\n            if (resource.OwnerId == context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value ||\n                context.User.IsInRole(\"Admin\")) {\n                context.Succeed(requirement);\n            }\n        }\n        \n        return Task.CompletedTask;\n    }\n}\n\n// Controller\npublic async Task<IActionResult> Edit(int id) {\n    var document = await db.Documents.FindAsync(id);\n    \n    var authResult = await _authorizationService.AuthorizeAsync(\n        User, document, \"Edit\");\n    \n    if (!authResult.Succeeded)\n        return Forbid();\n    \n    return View(document);\n}\n```\n\n**Podsumowanie**:\n\n| Aspekt | Authentication | Authorization |\n|--------|----------------|---------------|\n| Pytanie | Kim jesteś? | Co możesz robić? |\n| Proces | Login, OAuth, certyfikaty | Role, claims, policies |\n| HTTP Status | 401 Unauthorized | 403 Forbidden |\n| Kolejność | Zawsze pierwszy | Po authentication |\n\nZasada: **Authentication → Authorization → Access**"
        },
        {
            category: "system-design",
            level: "senior",
            question: "Jak zapobiec atakom CSRF (Cross-Site Request Forgery)?",
            answers: [
                "Używać silnych haseł",
                "Anti-forgery tokens, SameSite cookies, weryfikacja Origin/Referer",
                "Tylko HTTPS wystarczy",
                "Disable cookies całkowicie"
            ],
            correct: 1,
            explanation: "CSRF (Cross-Site Request Forgery) Prevention:\n\n**Problem**:\n```html\n<!-- Złośliwa strona attacker.com -->\n<img src=\"https://bank.com/transfer?to=attacker&amount=10000\" />\n<!-- Jeśli użytkownik jest zalogowany na bank.com,\n     przeglądarka wyśle cookies automatycznie! -->\n\n<form action=\"https://bank.com/transfer\" method=\"POST\">\n    <input type=\"hidden\" name=\"to\" value=\"attacker\" />\n    <input type=\"hidden\" name=\"amount\" value=\"10000\" />\n</form>\n<script>document.forms[0].submit();</script>\n```\n\n**Rozwiązanie 1: Anti-Forgery Tokens** ✅:\n```csharp\n// ASP.NET Core - automatyczne w Razor\n<form asp-action=\"Transfer\" method=\"post\">\n    @Html.AntiForgeryToken()  // Generuje ukryty token\n    <input name=\"to\" />\n    <input name=\"amount\" />\n    <button type=\"submit\">Transfer</button>\n</form>\n// Renderuje:\n// <input name=\"__RequestVerificationToken\" type=\"hidden\" \n//        value=\"CfDJ8...\" />\n\n// Controller - walidacja tokenu\n[HttpPost]\n[ValidateAntiForgeryToken]  // Sprawdza token!\npublic async Task<IActionResult> Transfer(TransferModel model) {\n    // Token musi się zgadzać\n    await ProcessTransfer(model);\n    return RedirectToAction(\"Success\");\n}\n\n// Globalnie dla wszystkich POST\nservices.AddControllersWithViews(options => {\n    options.Filters.Add(new AutoValidateAntiforgeryTokenAttribute());\n});\n```\n\n**Rozwiązanie 2: SameSite Cookies** ✅:\n```csharp\n// Program.cs / Startup.cs\nservices.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)\n    .AddCookie(options => {\n        options.Cookie.SameSite = SameSiteMode.Strict;\n        // Strict: cookie tylko na tej samej domenie\n        // Lax: cookie wysyłane dla top-level navigation (domyślne w Chrome)\n        // None: cookie zawsze wysyłane (wymaga Secure)\n        options.Cookie.SecurePolicy = CookieSecurePolicy.Always; // Tylko HTTPS\n    });\n\n// Lub globalnie dla wszystkich cookies\nservices.Configure<CookiePolicyOptions>(options => {\n    options.MinimumSameSitePolicy = SameSiteMode.Strict;\n    options.Secure = CookieSecurePolicy.Always;\n});\n```\n\n**Rozwiązanie 3: Weryfikacja Origin/Referer**:\n```csharp\npublic class ValidateOriginAttribute : ActionFilterAttribute {\n    public override void OnActionExecuting(ActionExecutingContext context) {\n        var request = context.HttpContext.Request;\n        \n        // Sprawdź Origin header\n        if (request.Headers.TryGetValue(\"Origin\", out var origin)) {\n            var allowedOrigin = \"https://myapp.com\";\n            if (!origin.Equals(allowedOrigin, StringComparison.OrdinalIgnoreCase)) {\n                context.Result = new StatusCodeResult(403);\n                return;\n            }\n        }\n        \n        // Sprawdź Referer jako backup\n        if (request.Headers.TryGetValue(\"Referer\", out var referer)) {\n            if (!referer.ToString().StartsWith(\"https://myapp.com\")) {\n                context.Result = new StatusCodeResult(403);\n                return;\n            }\n        }\n        \n        base.OnActionExecuting(context);\n    }\n}\n\n[HttpPost]\n[ValidateOrigin]\npublic IActionResult Transfer(TransferModel model) { }\n```\n\n**API - Custom Header**:\n```csharp\n// Frontend - dodaj custom header\nfetch('/api/transfer', {\n    method: 'POST',\n    headers: {\n        'Content-Type': 'application/json',\n        'X-Requested-With': 'XMLHttpRequest'  // Custom header\n    },\n    body: JSON.stringify(data)\n});\n\n// Backend - weryfikuj header\npublic class ValidateAjaxAttribute : ActionFilterAttribute {\n    public override void OnActionExecuting(ActionExecutingContext context) {\n        if (!context.HttpContext.Request.Headers\n                .ContainsKey(\"X-Requested-With\")) {\n            context.Result = new StatusCodeResult(403);\n        }\n    }\n}\n```\n\n**Double Submit Cookie Pattern**:\n```csharp\npublic IActionResult Login() {\n    // Ustaw CSRF token w cookie I w formularzu\n    var token = Guid.NewGuid().ToString();\n    \n    Response.Cookies.Append(\"CSRF-TOKEN\", token, new CookieOptions {\n        HttpOnly = false,  // JavaScript musi móc czytać\n        Secure = true,\n        SameSite = SameSiteMode.Strict\n    });\n    \n    ViewBag.CsrfToken = token;\n    return View();\n}\n\n[HttpPost]\npublic IActionResult ProcessLogin(LoginModel model, \n    [FromHeader(Name = \"X-CSRF-TOKEN\")] string headerToken) {\n    \n    var cookieToken = Request.Cookies[\"CSRF-TOKEN\"];\n    \n    if (string.IsNullOrEmpty(cookieToken) || \n        cookieToken != headerToken) {\n        return StatusCode(403);\n    }\n    \n    // Process login\n}\n```\n\n**Best Practices**:\n✅ Zawsze używaj `[ValidateAntiForgeryToken]` dla POST/PUT/DELETE\n✅ SameSite=Strict dla cookies\n✅ HTTPS only\n✅ Weryfikuj Origin/Referer\n❌ Nigdy nie używaj GET do modyfikacji danych\n❌ Nie polegaj tylko na cookies do autentykacji akcji"
        },
        {
            category: "system-design",
            level: "senior",
            question: "Jakie są kluczowe zasady bezpiecznego przechowywania haseł?",
            answers: [
                "Zaszyfrować hasła",
                "Haszować z solą używając bcrypt/Argon2 - NIGDY plaintext ani MD5/SHA1",
                "Przechowywać w bezpiecznej bazie danych",
                "Używać silnego algorytmu szyfrowania"
            ],
            correct: 1,
            explanation: "NIGDY:\n❌ Przechowywać w plaintext\n❌ Używać odwracalnego szyfrowania\n❌ Używać szybkich haszy (MD5, SHA1, SHA256)\n❌ Haszować bez soli\n\nZAWSZE:\n✅ Używać wolnych algorytmów haszowania (bcrypt, Argon2, PBKDF2)\n✅ Używać unikalnej soli na hasło\n✅ Używać wysokiego work factor/iterations\n\n```csharp\nusing BCrypt.Net;\n\n// Rejestracja - haszowanie hasła\npublic void CreateUser(string username, string password) {\n    string hashedPassword = BCrypt.HashPassword(password, \n        workFactor: 12); // Wyższe = wolniejsze = bezpieczniejsze\n    // Zapisz hashedPassword w bazie danych\n}\n\n// Login - weryfikacja hasła\npublic bool ValidateUser(string username, string password) {\n    string hashedPassword = GetHashedPasswordFromDb(username);\n    return BCrypt.Verify(password, hashedPassword);\n}\n```\n\nDlaczego wolne haszowanie?\n- Zapobiega atakom brute force\n- bcrypt z work factor 12: ~250ms na próbę\n- Atakujący potrzebuje lat zamiast sekund na złamanie\n\nSól zapobiega atakom rainbow table."
        },
        // Big O Complexity & Algorithms - z coding-interview-university
        {
            category: "algorithms",
            level: "mid",
            question: "Jaka jest złożoność czasowa dodawania/usuwania elementów na KOŃCU dynamicznej tablicy (amortyzowana)?",
            answers: [
                "O(n) - zawsze wymaga przesunięcia elementów",
                "O(1) - zamortyzowany czas stały",
                "O(log n) - potrzebne wyszukiwanie binarne",
                "O(n²) - wszystkie elementy wymagają aktualizacji"
            ],
            correct: 1,
            explanation: "Dynamiczna tablica - dodawanie/usuwanie na KOŃCU:\n\nZłożoność czasowa: **O(1) zamortyzowana**\n\nDlaczego zamortyzowana?\n- Większość operacji to O(1)\n- Czasem trzeba zmienić rozmiar (podwoić capacity) = O(n)\n- Koszt rozłożony na wiele operacji\n\n```csharp\n// C# List<T>\nvar list = new List<int>(); // pojemność = 4\nlist.Add(1); // O(1)\nlist.Add(2); // O(1)\nlist.Add(3); // O(1)\nlist.Add(4); // O(1)\nlist.Add(5); // O(n) - resize do pojemności 8, kopiowanie wszystkich elementów\nlist.Add(6); // O(1)\n// ...\nlist.Add(8); // O(1)\nlist.Add(9); // O(n) - resize do pojemności 16\n```\n\nAnaliza zamortyzowana:\n- n wstawień powoduje ~log₂(n) zmian rozmiaru\n- Całkowita praca: n + n/2 + n/4 + ... ≈ 2n\n- Średnio na operację: 2n/n = O(1)\n\nKontrast z wstawianiem w środek:\n```csharp\nlist.Insert(0, x); // O(n) - przesunięcie wszystkich elementów\nlist.RemoveAt(0);  // O(n) - przesunięcie wszystkich elementów\n```\n\nKluczowa zasada: Operacje na KOŃCU = O(1), w ŚRODKU = O(n)"
        },
        {
            category: "algorithms",
            level: "senior",
            question: "Jaka jest złożoność czasowa QuickSort - średnia vs najgorsza?",
            answers: [
                "Średnia O(n log n), Najgorsza O(n log n) - zawsze tak samo",
                "Średnia O(n log n), Najgorsza O(n²) - zły wybór pivota",
                "Średnia O(n²), Najgorsza O(n³)",
                "Średnia O(log n), Najgorsza O(n)"
            ],
            correct: 1,
            explanation: "Złożoność QuickSort:\n\n**Średni przypadek: O(n log n)**\n- Dobry pivot dzieli tablicę mniej więcej na pół\n- Głębokość rekurencji: log n\n- Praca na poziom: n\n- Razem: n × log n\n\n**Najgorszy przypadek: O(n²)**\n- Zły pivot (najmniejszy/największy element za każdym razem)\n- Tablica [pivot | reszta] = niezbilansowana\n- Głębokość rekurencji: n\n- Razem: n + (n-1) + (n-2) + ... = n²\n\n```csharp\npublic void QuickSort(int[] arr, int low, int high) {\n    if (low < high) {\n        int pivotIndex = Partition(arr, low, high);\n        QuickSort(arr, low, pivotIndex - 1);\n        QuickSort(arr, pivotIndex + 1, high);\n    }\n}\n\nprivate int Partition(int[] arr, int low, int high) {\n    int pivot = arr[high]; // Ostatni element jako pivot\n    int i = low - 1;\n    \n    for (int j = low; j < high; j++) {\n        if (arr[j] <= pivot) {\n            i++;\n            Swap(arr, i, j);\n        }\n    }\n    Swap(arr, i + 1, high);\n    return i + 1;\n}\n```\n\n**Najgorszy przypadek**: Już posortowana tablica z ostatnim elementem jako pivot\n[1,2,3,4,5] → pivot=5 → [1,2,3,4 | 5 | pusta]\n\n**Ulepszenia**:\n✅ Losowy wybór pivota\n✅ Mediana z trzech\n✅ Przejście na insertion sort dla małych podtablic\n\n**Złożoność pamięciowa**: O(log n) średnio (stos rekurencji)\n\n**Dlaczego QuickSort?**\n- In-place (w przeciwieństwie do MergeSort)\n- Przyjazny dla cache\n- Doskonała średnia wydajność\n- Używany w C# Array.Sort() dla typów wartości"
        },
        {
            category: "algorithms",
            level: "senior",
            question: "Porównaj złożoność czasową: Binary Search Tree vs Hash Table?",
            answers: [
                "BST O(log n), Hash O(1) średnio - Hash szybszy dla prostych wyszukiwań",
                "BST O(1), Hash O(n) - BST zawsze szybszy",
                "Oba O(log n) - ta sama wydajność",
                "BST O(n²), Hash O(1) - Hash zawsze lepszy"
            ],
            correct: 0,
            explanation: "Złożoność czasowa wyszukiwania:\n\n**Hash Table: O(1) średnio, O(n) najgorszy**\n- Funkcja hash: O(1)\n- Bezpośredni dostęp do tablicy: O(1)\n- Obsługa kolizji (rzadko): O(n) najgorszy\n\n**BST: O(log n) średnio, O(n) najgorszy**\n- Zrównoważone drzewo: O(log n)\n- Zdegenerowane drzewo (lista): O(n)\n\n```csharp\n// Hash Table (Dictionary)\nvar dict = new Dictionary<string, int>();\ndict[\"klucz\"] = 42;          // O(1) średnio\nint value = dict[\"klucz\"];   // O(1) średnio\n\n// Binary Search Tree\nvar bst = new TreeSet<int>();\nbst.Add(42);                 // O(log n) zrównoważone\nbool istnieje = bst.Contains(42); // O(log n) zrównoważone\n```\n\n**Kiedy używać Hash Table:**\n✅ Potrzebne O(1) wyszukiwanie\n✅ Nie potrzeba sortowania\n✅ Klucze mają dobrą funkcję hash\n✅ Przykład: cache, liczenie częstotliwości\n\n**Kiedy używać BST:**\n✅ Potrzebna kolejność\n✅ Zapytania zakresowe (wszystkie między x i y)\n✅ Efektywne min/max\n✅ Przykład: statystyki uporządkowane, wyszukiwanie zakresowe\n\n```csharp\n// BST - operacje uporządkowane\nvar sortedSet = new SortedSet<int> { 5, 2, 8, 1, 9 };\nvar wZakresie = sortedSet.GetViewBetween(2, 8); // [2,5,8] - O(log n)\nint min = sortedSet.Min; // 1 - O(log n)\nint max = sortedSet.Max; // 9 - O(log n)\n\n// Hash Table nie potrafi tego efektywnie!\n```\n\n**Złożoność pamięciowa**: Oba O(n)\n\n**Praktyczna uwaga**: Nowoczesne hash tables (C# Dictionary) mają doskonałą wydajność w średnim przypadku dzięki dobrym funkcjom hash i zarządzaniu load factorem."
        },
        {
            category: "algorithms",
            level: "mid",
            question: "Jaka jest złożoność pamięciowa MergeSort?",
            answers: [
                "O(1) - sortowanie w miejscu",
                "O(log n) - tylko stos rekurencji",
                "O(n) - wymaga tymczasowych tablic",
                "O(n²) - kwadratowa pamięć"
            ],
            correct: 2,
            explanation: "Złożoność pamięciowa MergeSort: **O(n)**\n\nDlaczego?\n- Potrzebna tymczasowa tablica do łączenia podtablic\n- Nie można efektywnie scalać w miejscu\n- Każdy poziom rekurencji potrzebuje miejsca na scalanie\n\n```csharp\npublic void MergeSort(int[] arr, int left, int right) {\n    if (left < right) {\n        int mid = (left + right) / 2;\n        MergeSort(arr, left, mid);\n        MergeSort(arr, mid + 1, right);\n        Merge(arr, left, mid, right); // Potrzebuje O(n) pamięci\n    }\n}\n\nprivate void Merge(int[] arr, int left, int mid, int right) {\n    int n1 = mid - left + 1;\n    int n2 = right - mid;\n    \n    // Tymczasowe tablice - O(n) pamięć!\n    int[] L = new int[n1];\n    int[] R = new int[n2];\n    \n    Array.Copy(arr, left, L, 0, n1);\n    Array.Copy(arr, mid + 1, R, 0, n2);\n    \n    // Scalanie z powrotem do arr\n    int i = 0, j = 0, k = left;\n    while (i < n1 && j < n2) {\n        arr[k++] = L[i] <= R[j] ? L[i++] : R[j++];\n    }\n    while (i < n1) arr[k++] = L[i++];\n    while (j < n2) arr[k++] = R[j++];\n}\n```\n\n**Rozkład pamięci**:\n- Tymczasowe tablice do scalania: O(n)\n- Stos wywołań rekurencyjnych: O(log n)\n- Razem: O(n) + O(log n) = **O(n)**\n\n**Porównanie z innymi sortowaniami**:\n\n| Algorytm | Czas | Pamięć | Stabilny | In-place |\n|----------|------|--------|----------|----------|\n| MergeSort | O(n log n) | O(n) | ✅ | ❌ |\n| QuickSort | O(n log n) śr | O(log n) | ❌ | ✅ |\n| HeapSort | O(n log n) | O(1) | ❌ | ✅ |\n\n**Kiedy używać MergeSort**:\n✅ Potrzebne stabilne sortowanie\n✅ Gwarantowane O(n log n) w najgorszym przypadku\n✅ Sortowanie zewnętrzne (na dysku)\n✅ Pamięć nie jest ograniczeniem\n\n**Kiedy unikać**:\n❌ Ograniczona pamięć\n❌ Potrzebne sortowanie w miejscu"
        },
        {
            category: "algorithms",
            level: "principal",
            question: "Jaka jest złożoność czasowa znalezienia Lowest Common Ancestor (LCA) w drzewie binarnym?",
            answers: [
                "O(1) z preprocessingiem",
                "O(log n) z wyszukiwaniem binarnym",
                "O(n) - może być potrzebne przejście całego drzewa",
                "O(n²) - sprawdzenie wszystkich par"
            ],
            correct: 2,
            explanation: "LCA (Lowest Common Ancestor) - złożoność czasowa:\n\n**Podstawowe podejście: O(n)**\n- Może trzeba odwiedzić wszystkie węzły\n- Brak właściwości uporządkowania (nie BST)\n\n```csharp\npublic class TreeNode {\n    public int val;\n    public TreeNode left, right;\n}\n\n// Rozwiązanie O(n) - jedno przejście\npublic TreeNode LowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n    // Przypadek bazowy\n    if (root == null || root == p || root == q)\n        return root;\n    \n    // Szukaj w lewym i prawym poddrzewie\n    TreeNode left = LowestCommonAncestor(root.left, p, q);\n    TreeNode right = LowestCommonAncestor(root.right, p, q);\n    \n    // Jeśli obie strony zwracają nie-null, root to LCA\n    if (left != null && right != null)\n        return root;\n    \n    // W przeciwnym razie zwróć stronę nie-null\n    return left != null ? left : right;\n}\n```\n\n**Dla BST: O(log n) średnio**\nMożna użyć właściwości uporządkowania:\n```csharp\npublic TreeNode LCA_BST(TreeNode root, TreeNode p, TreeNode q) {\n    while (root != null) {\n        if (p.val < root.val && q.val < root.val)\n            root = root.left;  // Oba w lewym poddrzewie\n        else if (p.val > root.val && q.val > root.val)\n            root = root.right; // Oba w prawym poddrzewie\n        else\n            return root;       // Punkt rozdzielenia = LCA\n    }\n    return null;\n}\n```\n\n**Optymalizacja z preprocessingiem: O(1) zapytanie**\nTechniki:\n- Sparse Table: O(n log n) preprocessing, O(1) zapytanie\n- Segment Tree: O(n) preprocessing, O(log n) zapytanie\n\n```csharp\n// Przykład: Przechowywanie wskaźników rodziców i głębokości\npublic class LCAPreprocessor {\n    private Dictionary<TreeNode, TreeNode> parent;\n    private Dictionary<TreeNode, int> depth;\n    \n    public LCAPreprocessor(TreeNode root) {\n        parent = new Dictionary<TreeNode, TreeNode>();\n        depth = new Dictionary<TreeNode, int>();\n        DFS(root, null, 0); // O(n) preprocessing\n    }\n    \n    private void DFS(TreeNode node, TreeNode par, int d) {\n        if (node == null) return;\n        parent[node] = par;\n        depth[node] = d;\n        DFS(node.left, node, d + 1);\n        DFS(node.right, node, d + 1);\n    }\n    \n    public TreeNode GetLCA(TreeNode p, TreeNode q) { // O(h) = O(log n)\n        // Sprowadź oba na ten sam poziom\n        while (depth[p] > depth[q]) p = parent[p];\n        while (depth[q] > depth[p]) q = parent[q];\n        \n        // Idź w górę razem aż się spotkają\n        while (p != q) {\n            p = parent[p];\n            q = parent[q];\n        }\n        return p;\n    }\n}\n```\n\n**Zastosowania**:\n- Systemy kontroli wersji (git merge base)\n- Hierarchie systemów plików\n- Schematy organizacyjne"
        },
        {
            category: "algorithms",
            level: "mid",
            question: "Jaka jest główna zaleta Hash Table nad tablicą?",
            answers: [
                "Używa mniej pamięci",
                "O(1) wyszukiwanie po kluczu (nie tylko indeksie) - szybki dostęp ze znaczącymi kluczami",
                "Zawsze szybsza",
                "Zachowuje kolejność sortowania"
            ],
            correct: 1,
            explanation: "Hash Table vs Tablica:\n\n**Tablica**: Dostęp tylko po indeksie\n```csharp\nstring[] users = new string[100];\nusers[0] = \"Alicja\";  // Trzeba znać indeks\nstring name = users[0];\n```\n\n**Hash Table**: Dostęp po znaczącym kluczu\n```csharp\nvar users = new Dictionary<string, User>();\nusers[\"alicja@example.com\"] = new User(\"Alicja\");\nUser alicja = users[\"alicja@example.com\"]; // O(1) wyszukiwanie po emailu!\n```\n\n**Kluczowa zaleta**: **O(1) wyszukiwanie ze semantycznymi kluczami**\n\n**Jak to działa**:\n1. Funkcja hash: klucz → liczba całkowita\n2. Modulo: liczba → indeks tablicy\n3. Przechowuj w indeksie (obsłuż kolizje)\n\n```csharp\n// Uproszczona hash table\npublic class SimpleHashTable<K, V> {\n    private class Entry {\n        public K Key;\n        public V Value;\n        public Entry Next; // Dla łańcuchowania\n    }\n    \n    private Entry[] buckets;\n    private int size;\n    \n    public SimpleHashTable(int capacity = 16) {\n        buckets = new Entry[capacity];\n    }\n    \n    private int GetBucketIndex(K key) {\n        int hash = key.GetHashCode();\n        return Math.Abs(hash) % buckets.Length;\n    }\n    \n    public void Add(K key, V value) {\n        int index = GetBucketIndex(key);\n        \n        // Sprawdź czy klucz istnieje\n        for (var curr = buckets[index]; curr != null; curr = curr.Next) {\n            if (curr.Key.Equals(key)) {\n                curr.Value = value; // Aktualizuj\n                return;\n            }\n        }\n        \n        // Dodaj nowy wpis (łańcuchowanie)\n        var newEntry = new Entry { Key = key, Value = value, Next = buckets[index] };\n        buckets[index] = newEntry;\n        size++;\n        \n        // Zmień rozmiar jeśli load factor > 0.75\n        if (size > buckets.Length * 0.75)\n            Resize();\n    }\n    \n    public bool TryGetValue(K key, out V value) {\n        int index = GetBucketIndex(key);\n        \n        for (var curr = buckets[index]; curr != null; curr = curr.Next) {\n            if (curr.Key.Equals(key)) {\n                value = curr.Value;\n                return true;\n            }\n        }\n        \n        value = default(V);\n        return false;\n    }\n}\n```\n\n**Obsługa kolizji**:\n1. **Łańcuchowanie**: Każdy bucket to lista\n2. **Adresowanie otwarte**: Znajdź następne puste miejsce\n   - Linear probing: sprawdź następny slot\n   - Quadratic probing: sprawdź sloty i² dalej\n   - Double hashing: użyj drugiej funkcji hash\n\n**Złożoność czasowa**:\n- Średnia: O(1) dla add, get, remove\n- Najgorsza: O(n) jeśli wszystkie klucze kolidują\n\n**Złożoność pamięciowa**: O(n)\n\n**Zastosowania**:\n- Cache (klucz = URL, wartość = odpowiedź)\n- Liczenie częstotliwości\n- Deduplikacja\n- Indeksowanie baz danych"
        },
        {
            category: "algorithms",
            level: "senior",
            question: "Czym różni się Heap od Binary Search Tree?",
            answers: [
                "Nie ma różnicy - to to samo",
                "Heap: rodzic ≥ dzieci (częściowy porządek), O(1) max; BST: lewy < rodzic < prawy (pełny porządek), O(log n) wyszukiwanie",
                "Heap jest zawsze zrównoważony, BST nigdy",
                "Heap jest szybszy dla wszystkich operacji"
            ],
            correct: 1,
            explanation: "Heap vs Binary Search Tree:\n\n**HEAP (Max Heap)**:\n- **Właściwość**: Rodzic ≥ wszystkie dzieci (częściowy porządek)\n- **Struktura**: Kompletne drzewo binarne (wypełnione od lewej do prawej)\n- **Mocne strony**: O(1) znajdź max, O(log n) wstaw/usuń\n- **Słaba strona**: O(n) wyszukiwanie dowolnego elementu\n\n**BST (Binary Search Tree)**:\n- **Właściwość**: Lewy < Rodzic < Prawy (pełny porządek)\n- **Struktura**: Może być niezrównoważone\n- **Mocne strony**: O(log n) wyszukiwanie/wstawianie/usuwanie (jeśli zrównoważone)\n- **Słaba strona**: O(n) jeśli zdegenerowane (staje się listą)\n\n```csharp\n// PRZYKŁAD MAX HEAP\n//       90\n//      /  \\\n//     85   70\n//    / \\   /\n//   50 60 40\n// Rodzic ≥ dzieci, ale 85 > 70 (brak reguły lewy < prawy)\n\n// PRZYKŁAD BST\n//       50\n//      /  \\\n//     30   70\n//    / \\   / \\\n//   20 40 60 90\n// Lewy < Rodzic < Prawy (ściśle uporządkowane)\n```\n\n**Kiedy użyć**:\n\n**Heap**:\n✅ Kolejka priorytetowa\n✅ Heap sort\n✅ K-ty największy/najmniejszy\n✅ Mediana ze strumienia (dwa heapy)\n\n**BST**:\n✅ Uporządkowane dane\n✅ Zapytania zakresowe\n✅ Poprzednik/następnik\n✅ Iteracja w kolejności\n\n**Porównanie złożoności czasowej**:\n\n| Operacja | Heap | BST (zrównoważone) |\n|----------|------|--------------------|\n| Znajdź min/max | O(1) | O(log n) |\n| Wstaw | O(log n) | O(log n) |\n| Usuń | O(log n) | O(log n) |\n| Wyszukaj | O(n) | O(log n) |\n| Zbuduj | O(n) | O(n log n) |"
        },
        {
            category: "algorithms",
            level: "senior",
            question: "Jaka jest kluczowa różnica między rekurencją a programowaniem dynamicznym?",
            answers: [
                "Nie ma różnicy - DP zawsze używa rekurencji",
                "DP unika ponownego obliczania tych samych podproblemów przez memoizację/tabulację",
                "Rekurencja jest zawsze szybsza",
                "DP działa tylko dla problemów sortowania"
            ],
            correct: 1,
            explanation: "Rekurencja vs Programowanie Dynamiczne:\n\n**Problem**: Ciąg Fibonacciego\n\n**Naiwna rekurencja** - O(2ⁿ) - WOLNO!\n```csharp\npublic int Fib(int n) {\n    if (n <= 1) return n;\n    return Fib(n-1) + Fib(n-2); // Ponownie oblicza te same wartości!\n}\n// Fib(5) wywołuje Fib(3) dwa razy, Fib(2) trzy razy, itd.\n```\n\n**Rozwiązanie DP 1: Memoizacja** - O(n)\n```csharp\n// Top-down z memoizacją (cache)\nprivate Dictionary<int, int> memo = new Dictionary<int, int>();\n\npublic int FibMemo(int n) {\n    if (n <= 1) return n;\n    \n    if (memo.ContainsKey(n))\n        return memo[n]; // Zwróć z cache\n    \n    memo[n] = FibMemo(n-1) + FibMemo(n-2);\n    return memo[n];\n}\n// Każde Fib(k) obliczane tylko raz!\n```\n\n**Rozwiązanie DP 2: Tabulacja** - O(n)\n```csharp\n// Bottom-up z tablicą\npublic int FibTab(int n) {\n    if (n <= 1) return n;\n    \n    int[] dp = new int[n + 1];\n    dp[0] = 0;\n    dp[1] = 1;\n    \n    for (int i = 2; i <= n; i++) {\n        dp[i] = dp[i-1] + dp[i-2];\n    }\n    \n    return dp[n];\n}\n```\n\n**DP zoptymalizowane pamięciowo** - O(1) pamięć\n```csharp\npublic int FibOptimized(int n) {\n    if (n <= 1) return n;\n    \n    int prev2 = 0, prev1 = 1;\n    \n    for (int i = 2; i <= n; i++) {\n        int current = prev1 + prev2;\n        prev2 = prev1;\n        prev1 = current;\n    }\n    \n    return prev1;\n}\n```\n\n**Porównanie wydajności**:\n```\nFib(30):\n- Naiwna rekurencja: 1.3 sekundy (2,692,537 wywołań)\n- Memoizacja: 0.001 sekundy (59 wywołań)\n- Tabulacja: 0.0005 sekundy (bez narzutu rekurencji)\n```\n\n**Wymagania DP**:\n1. **Optymalna podstruktura**: Rozwiązanie zbudowane z podproblemów\n2. **Nakładające się podproblemy**: Te same podproblemy ponownie obliczane\n\n**Klasyczne problemy DP**:\n- Fibonacci\n- Wydawanie reszty\n- Najdłuższy wspólny podciąg\n- Plecak 0/1\n- Odległość edycyjna\n- Mnożenie łańcucha macierzy\n\n**Kiedy używać DP**:\n✅ Problemy optymalizacyjne (min/max)\n✅ Problemy liczące\n✅ Nakładające się podproblemy\n✅ Można zdefiniować relację rekurencyjną\n\n**Podejścia DP**:\n1. **Memoizacja** (top-down): Zacznij od dużego problemu, cache'uj wyniki\n2. **Tabulacja** (bottom-up): Zacznij od przypadków bazowych, buduj w górę"
        },
        {
            category: "algorithms",
            level: "senior",
            question: "Kiedy używać BFS zamiast DFS do przeszukiwania grafu?",
            answers: [
                "Zawsze używaj BFS - jest szybsze",
                "BFS dla najkrótszej ścieżki (nieważony), DFS dla wykrywania cykli/sortowania topologicznego",
                "DFS jest zawsze lepsze - używa mniej pamięci",
                "Nie ma różnicy - oba są identyczne"
            ],
            correct: 1,
            explanation: "BFS (Breadth-First Search) vs DFS (Depth-First Search):\n\n**BFS - Poziom po poziomie (Kolejka)**\n```csharp\npublic void BFS(Graph g, int start) {\n    var visited = new HashSet<int>();\n    var queue = new Queue<int>();\n    \n    visited.Add(start);\n    queue.Enqueue(start);\n    \n    while (queue.Count > 0) {\n        int node = queue.Dequeue();\n        Console.WriteLine(node);\n        \n        foreach (int neighbor in g.GetNeighbors(node)) {\n            if (!visited.Contains(neighbor)) {\n                visited.Add(neighbor);\n                queue.Enqueue(neighbor);\n            }\n        }\n    }\n}\n```\n\n**DFS - Idź głęboko najpierw (Stos/Rekurencja)**\n```csharp\npublic void DFS(Graph g, int node, HashSet<int> visited) {\n    visited.Add(node);\n    Console.WriteLine(node);\n    \n    foreach (int neighbor in g.GetNeighbors(node)) {\n        if (!visited.Contains(neighbor)) {\n            DFS(g, neighbor, visited);\n        }\n    }\n}\n```\n\n**Wizualne porównanie**:\n```\nGraf:    1 --- 2\n         |     |\n         3 --- 4\n               |\n               5\n\nBFS od 1: 1, 2, 3, 4, 5 (poziom po poziomie)\nDFS od 1: 1, 2, 4, 5, 3 (idź głęboko najpierw)\n```\n\n**Kiedy używać BFS**:\n✅ **Najkrótsza ścieżka** w grafie nieważonym\n✅ Przeszukiwanie poziomowe\n✅ Znajdowanie składowych spójnych\n✅ Test dwudzielności\n\n**Kiedy używać DFS**:\n✅ **Wykrywanie cykli** w grafie\n✅ **Sortowanie topologiczne**\n✅ Znajdowanie silnie spójnych składowych\n✅ Rozwiązywanie labiryntów\n✅ Generowanie permutacji/kombinacji\n\n**Złożoność**:\n- Czas: O(V + E) dla obu (V=wierzchołki, E=krawędzie)\n- Pamięć: \n  - BFS: O(V) kolejka (wszystkie węzły na tym samym poziomie)\n  - DFS: O(h) stos (h=wysokość, może być V w najgorszym przypadku)\n\n**Użycie pamięci**:\n- BFS używa więcej pamięci (szerokie drzewa)\n- DFS używa mniej pamięci (głębokie drzewa)\n\n**Podsumowanie**:\n- **BFS**: Najkrótsza ścieżka, przeszukiwanie poziomowe\n- **DFS**: Cykle, topologia, backtracking"
        },
        {
            category: "behavioral",
            level: "senior",
            question: "Czym jest metoda STAR do odpowiadania na pytania behawioralne?",
            answers: [
                "Situation, Task, Action, Result - strukturalny sposób opisywania doświadczeń",
                "Skills, Time, Accuracy, Reliability",
                "Start, Think, Answer, Reflect",
                "System, Testing, Architecture, Review"
            ],
            correct: 0,
            explanation: "Metoda STAR dla wywiadów behawioralnych:\n\n**S - Sytuacja (Situation)**: Ustaw kontekst\n- Gdzie/kiedy to się wydarzyło?\n- Jakie było tło?\n- Krótko ale konkretnie\n\n**T - Zadanie (Task)**: Opisz swoją odpowiedzialność\n- Jaka była twoja rola?\n- Jakiemu wyzwaniu/celowi czeliłeś?\n- Co było na szali?\n\n**A - Akcja (Action)**: Wyjaśnij co TY zrobiłeś\n- Jakie konkretne kroki podjąłeś?\n- Skup się na TWOICH działaniach (nie 'my')\n- Dlaczego wybrałeś to podejście?\n\n**R - Rezultat (Result)**: Podziel się wynikiem\n- Co się stało?\n- Skwantyfikuj jeśli możliwe (%, $, zaoszczędzony czas)\n- Czego się nauczyłeś?\n\n**Przykładowe pytanie**: \"Opowiedz o sytuacji, gdy musiałeś dotrzymać napiętego terminu\"\n\n**Słaba odpowiedź**:\n\"Raz miałem napięty termin i ciężko pracowałem, żeby skończyć na czas.\"\n\n**Odpowiedź STAR**:\n\n**Sytuacja**: \"W mojej poprzedniej roli w XYZ Corp, klient zażądał krytycznej funkcjonalności 2 tygodnie przed głównym wydaniem produktu. Kampania marketingowa była już zaplanowana.\"\n\n**Zadanie**: \"Jako główny programista, musiałem dostarczyć funkcję integracji płatności, która normalnie zajmuje 4 tygodnie, w zaledwie 2 tygodnie, bez kompromisów w jakości ani wprowadzania błędów.\"\n\n**Akcja**: \"Podjąłem następujące kroki:\n1. Rozbicie funkcji na must-have vs nice-to-have\n2. Negocjacje ze stakeholderami o przełożenie 2 niekrytycznych wymagań\n3. Ustanowienie codziennych 15-min standup'ów do śledzenia postępów i blokad\n4. Implementacja testów automatycznych najpierw (TDD) dla zapewnienia jakości\n5. Współpraca z QA do równoległego testowania podczas rozwoju\n6. Koordynacja z DevOps dla płynnego wdrożenia\"\n\n**Rezultat**: \"Dostarczyliśmy główną funkcję płatności 1 dzień przed terminem. Uruchomienie było sukcesem, przetworzyliśmy $500K transakcji w pierwszym tygodniu bez żadnych błędów związanych z płatnościami. Klient był tak pod wrażeniem, że przedłużył nasz kontrakt o kolejny rok. Nauczyłem się, że rozbicie problemów i jasna komunikacja ze stakeholderami może sprawić, że nawet niemożliwe terminy stają się osiągalne.\"\n\n**Wskazówki**:\n✅ Używaj konkretnych liczb/metryk\n✅ Skup się na TWOICH działaniach (używaj 'ja' nie 'my')\n✅ Pokaż uczenie się/wzrost\n✅ Bądź szczery o wyzwaniach\n✅ Przećwicz 15-20 historii pokrywających różne scenariusze\n\n**Typowe tematy behawioralne**:\n- Przywództwo: \"Opowiedz o sytuacji gdy prowadziłeś zespół\"\n- Konflikt: \"Opisz nieporozumienie ze współpracownikiem\"\n- Porażka: \"Opowiedz o sytuacji gdy poniosłeś porażkę\"\n- Inicjatywa: \"Podaj przykład wykroczenia poza wymagania\"\n- Rozwiązywanie problemów: \"Opisz rozwiązanie złożonego problemu technicznego\"\n- Adaptacja: \"Opowiedz o radzeniu sobie z dużą zmianą\""
        }
    ]
};

// Helper function to get filtered questions based on current language
function getFilteredQuestions(category = 'all', level = 'all', count = 10, language = 'en') {
    // Get questions for the current language
    let filtered = quizQuestionsData[language] || quizQuestionsData['en'];

    if (category !== 'all') {
        filtered = filtered.filter(q => q.category === category);
    }

    if (level !== 'all') {
        filtered = filtered.filter(q => q.level === level);
    }

    // Shuffle and take 'count' questions
    const shuffled = filtered.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, shuffled.length));
}

// For backward compatibility - use English by default if no language specified
const quizQuestions = quizQuestionsData.en;
