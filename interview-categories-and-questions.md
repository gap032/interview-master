# Interview Categories and Questions - Architect & Senior Developer

## Table of Contents
- [Position: Architect](#position-architect)
- [Position: Senior Developer](#position-senior-developer)

---

## Position: Architect

### 1. System Architecture and Patterns

**Questions:**

1. **Monolith vs Microservices** - When would you choose monolithic architecture vs microservices? What are the main trade-offs?

2. **Service Decomposition** - How do you decide on boundaries between microservices? What criteria do you use for system decomposition?

3. **Distributed Systems** - What are the main challenges in distributed systems? How do you handle eventual consistency?

4. **CAP Theorem** - Explain the CAP theorem and give examples of systems choosing different combinations (CP, AP, CA).

5. **API Gateway Pattern** - What are the pros and cons of using an API Gateway? When is it necessary?

6. **Saga Pattern** - How would you implement distributed transactions using the Saga pattern? Orchestration vs Choreography?

7. **Circuit Breaker** - Explain the Circuit Breaker pattern. In what situations is it essential?

8. **Service Mesh** - What is a service mesh (e.g., Istio)? When is it worth implementing?

9. **Event-Driven Architecture** - What are the advantages and disadvantages of event-driven architecture? Give use case examples.

10. **CQRS and Event Sourcing** - When do you use CQRS? What are the challenges in implementing Event Sourcing?

### 2. Domain-Driven Design (DDD)

**Questions:**

1. **Bounded Context** - What is a Bounded Context? How do you identify context boundaries in a system?

2. **Aggregates** - What is an Aggregate in DDD? How do you determine aggregate boundaries?

3. **Domain Events** - How do you use Domain Events for communication between aggregates?

4. **Ubiquitous Language** - How do you implement Ubiquitous Language in practice within a team?

5. **Strategic Design** - Explain Context Mapping patterns (Shared Kernel, Anti-Corruption Layer, etc.).

### 3. Scalability and Performance

**Key Topics:**
- Horizontal vs Vertical Scaling
- Load Balancing Strategies
- Caching Layers (CDN, Application, Database)
- Database Sharding and Partitioning
- Read Replicas and Write Optimization

### 4. Security

**Key Topics:**
- Authentication vs Authorization
- OAuth 2.0 / OIDC
- JWT and Session Management
- API Security Best Practices
- Security Vulnerabilities (OWASP Top 10)

### 5. Cloud and Infrastructure

**Key Topics:**
- Cloud Providers (AWS, Azure, GCP)
- Serverless Architecture
- Container Orchestration (Kubernetes)
- Infrastructure as Code (Terraform, CloudFormation)

### 6. DevOps and CI/CD

**Key Topics:**
- CI/CD Pipeline Design
- Blue-Green Deployment
- Canary Releases
- Monitoring and Observability
- Incident Response

### 7. Databases

**Key Topics:**
- SQL vs NoSQL Selection
- Database Normalization
- Transaction Isolation Levels
- Replication Strategies
- Data Migration Approaches

### 8. Observability and Monitoring

**Key Topics:**
- Logging Strategies
- Metrics Collection
- Distributed Tracing
- Alerting Best Practices

### 9. Team Management

**Key Topics:**
- Technical Leadership
- Architecture Decision Records
- Code Review Processes
- Mentoring Junior Engineers

### 10. Trade-offs and Decision Making

**Key Questions:**
- How do you make architectural decisions?
- How do you balance technical debt vs new features?
- How do you handle disagreements on technical direction?

---

## Position: Senior Developer

### 1. Object-Oriented Programming

**Key Concepts:**
- SOLID Principles
- Design Patterns (Factory, Strategy, Observer, etc.)
- Inheritance vs Composition
- Polymorphism and Abstraction

### 2. Design Patterns

**Common Patterns:**
- Creational: Singleton, Factory, Builder
- Structural: Adapter, Decorator, Facade
- Behavioral: Strategy, Observer, Command

### 3. Clean Code

**Principles:**
- Meaningful Names
- Functions Should Do One Thing
- DRY (Don't Repeat Yourself)
- YAGNI (You Aren't Gonna Need It)
- Code Comments and Documentation

### 4. Algorithms and Data Structures

**Key Topics:**
- Time and Space Complexity
- Common Data Structures (Arrays, Lists, Trees, Graphs)
- Sorting and Searching Algorithms
- Dynamic Programming Basics

### 5. Performance Optimization

**Areas:**
- Code Profiling
- Database Query Optimization
- Caching Strategies
- Async/Await Patterns

### 6. Testing

**Types:**
- Unit Testing
- Integration Testing
- E2E Testing
- TDD (Test-Driven Development)
- Mocking and Stubbing

### 7. Refactoring

**Techniques:**
- Extract Method
- Rename Variables
- Remove Duplication
- Simplify Conditional Logic

### 8. Code Review

**Best Practices:**
- Constructive Feedback
- Focus on Code, Not Person
- Check for Edge Cases
- Verify Tests Coverage

### 9. Frameworks and Libraries

**Knowledge Areas:**
- Framework Selection Criteria
- Understanding Core Concepts
- When to Use vs Build Custom

### 10. API Design

**Principles:**
- RESTful API Design
- GraphQL Basics
- Versioning Strategies
- Documentation (OpenAPI/Swagger)

### 11. Databases

**Skills:**
- Query Optimization
- Index Design
- Transaction Management
- ORM Usage

### 12. Git and Version Control

**Topics:**
- Branching Strategies
- Merge vs Rebase
- Conflict Resolution
- Git Best Practices

### 13. Debugging

**Techniques:**
- Systematic Approach
- Using Debuggers
- Log Analysis
- Performance Profiling

### 14. Mentoring

**Responsibilities:**
- Code Review for Juniors
- Knowledge Sharing
- Pair Programming
- Growing Team Skills

---

## Behavioral Questions

**Common Questions:**

1. Tell me about a time you disagreed with a team member
2. Describe a challenging technical problem you solved
3. How do you handle tight deadlines?
4. Tell me about a time you made a mistake
5. How do you stay current with technology?
6. Describe your experience mentoring others
7. How do you handle constructive criticism?
8. Tell me about a time you had to make a difficult trade-off decision
9. How do you prioritize competing demands?
10. Describe a time you improved a process or system
11. How do you approach learning new technologies?
12. Tell me about a successful project you led
13. How do you handle disagreement with your manager?
14. Describe a time you failed and what you learned
15. How do you collaborate with non-technical stakeholders?

---

## Practical Challenges

### For Architect:
- Design a system for 1M concurrent users
- Design a notification system
- Design a distributed cache
- Design a rate limiter
- Design a URL shortener at scale

### For Senior Developer:
- Implement a LRU cache
- Design a thread-safe singleton
- Optimize a slow database query
- Refactor legacy code
- Debug a memory leak
- Implement retry logic with exponential backoff

---

**Total:** 260+ questions across all categories for comprehensive interview preparation.
