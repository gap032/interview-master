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
        }
    ],
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
