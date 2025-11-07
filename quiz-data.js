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
        }
    ]
};

// Helper function to shuffle array using Fisher-Yates algorithm
function shuffleArray(array) {
    const shuffled = [...array]; // Create a copy to avoid mutating original
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Helper function to get filtered questions based on current language
function getFilteredQuestions(category = 'all', level = 'all', count = 10, language = null) {
    // Auto-detect language from i18n if available, fallback to 'en'
    if (!language) {
        language = (typeof currentLanguage !== 'undefined') ? currentLanguage : 'en';
    }

    // Get questions for the current language
    let filtered = quizQuestionsData[language] || quizQuestionsData['en'];

    if (category !== 'all') {
        filtered = filtered.filter(q => q.category === category);
    }

    if (level !== 'all') {
        filtered = filtered.filter(q => q.level === level);
    }

    // Shuffle using Fisher-Yates algorithm and take 'count' questions
    const shuffled = shuffleArray(filtered);
    return shuffled.slice(0, Math.min(count, shuffled.length));
}

// For backward compatibility - use English by default if no language specified
const quizQuestions = quizQuestionsData.en;
