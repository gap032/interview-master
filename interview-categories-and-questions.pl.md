# Kategorie i Pytania Rekrutacyjne - Architekt & Senior Developer

## Spis Treści
- [Stanowisko: Architekt](#stanowisko-architekt)
- [Stanowisko: Senior Developer (Starszy Programista)](#stanowisko-senior-developer-starszy-programista)

---

## Stanowisko: Architekt

### 1. Architektura Systemów i Wzorce

**Pytania:**

1. **Monolith vs Microservices** - Kiedy wybrałbyś architekturę monolityczną, a kiedy mikrousługi? Jakie są główne trade-offy?

2. **Service Decomposition** - Jak zdecydować o granicach między mikrousługami? Jakie kryteria stosujesz przy dekompozycji systemu?

3. **Distributed Systems** - Jakie są główne wyzwania w systemach rozproszonych? Jak radzisz sobie z eventual consistency?

4. **CAP Theorem** - Wyjaśnij twierdzenie CAP i podaj przykłady systemów wybierających różne kombinacje (CP, AP, CA).

5. **API Gateway Pattern** - Jakie są zalety i wady użycia API Gateway? Kiedy jest to konieczne?

6. **Saga Pattern** - Jak zaimplementujesz distributed transactions używając wzorca Saga? Orchestration vs Choreography?

7. **Circuit Breaker** - Wyjaśnij wzorzec Circuit Breaker. W jakich sytuacjach jest niezbędny?

8. **Service Mesh** - Co to jest service mesh (np. Istio)? Kiedy warto go wprowadzić?

9. **Event-Driven Architecture** - Jakie są zalety i wady architektury event-driven? Podaj przykłady use cases.

10. **CQRS i Event Sourcing** - Kiedy stosujesz CQRS? Jakie są wyzwania przy implementacji Event Sourcing?

---

### 2. Domain-Driven Design (DDD)

**Pytania:**

1. **Bounded Context** - Co to jest Bounded Context? Jak identyfikujesz granice kontekstów w systemie?

2. **Aggregates** - Czym jest Aggregate w DDD? Jak określić granice aggregate'a?

3. **Domain Events** - Jak używasz Domain Events do komunikacji między agregatami?

4. **Ubiquitous Language** - Jak w praktyce wdrażasz Ubiquitous Language w zespole?

5. **Strategic Design** - Wyjaśnij Context Mapping patterns (Shared Kernel, Anti-Corruption Layer, itp.).

6. **Tactical Patterns** - Jakie tactical patterns DDD (Entity, Value Object, Repository) stosujesz najczęściej?

7. **Anemic Domain Model** - Co to jest Anemic Domain Model i dlaczego jest antywzorcem?

8. **Domain Services vs Application Services** - Jaka jest różnica między domain services a application services?

---

### 3. Skalowanie i Wydajność

**Pytania:**

1. **Horizontal vs Vertical Scaling** - Kiedy stosujesz skalowanie horyzontalne, a kiedy wertykalne?

2. **Load Balancing** - Jakie algorytmy load balancingu znasz? Kiedy stosujesz który?

3. **Caching Strategies** - Opisz strategie cache'owania (Cache-Aside, Write-Through, Write-Behind). Kiedy stosujesz którą?

4. **Database Sharding** - Jak zaprojektujesz strategię shardingu dla bazy danych? Jakie są wyzwania?

5. **Read Replicas** - Kiedy stosujesz read replicas? Jak radzisz sobie z replication lag?

6. **CDN** - W jakich scenariuszach stosujesz CDN? Jakie są trade-offy?

7. **Asynchronous Processing** - Kiedy przenosisz operacje do przetwarzania asynchronicznego?

8. **Rate Limiting** - Jak implementujesz rate limiting w systemie rozproszonym?

9. **Connection Pooling** - Dlaczego connection pooling jestważny? Jak go konfigurujesz?

10. **Performance Bottlenecks** - Jak identyfikujesz i rozwiązujesz wąskie gardła wydajnościowe?

---

### 4. Bezpieczeństwo

**Pytania:**

1. **Authentication vs Authorization** - Jaka jest różnica? Jakie mechanizmy stosujesz (OAuth2, JWT, SAML)?

2. **Zero Trust Architecture** - Co to jest Zero Trust? Jak implementujesz ten model?

3. **Security by Design** - Jak wdrażasz security od początku projektowania systemu?

4. **OWASP Top 10** - Wymień i opisz najważniejsze zagrożenia z OWASP Top 10.

5. **API Security** - Jak zabezpieczasz API (rate limiting, authentication, encryption)?

6. **Secrets Management** - Jak zarządzasz secretami w systemie (Vault, AWS Secrets Manager)?

7. **Encryption** - Kiedy stosujesz encryption at rest vs encryption in transit?

8. **HTTPS/TLS** - Jak działa TLS? Jak zarządzasz certyfikatami w infrastrukturze?

9. **SQL Injection Prevention** - Jak zapobiegasz SQL injection w całym systemie?

10. **Security Auditing** - Jak prowadzisz security audits i penetration testing?

---

### 5. Cloud i Infrastruktura

**Pytania:**

1. **Cloud Providers** - Porównaj AWS, Azure, GCP. Kiedy wybierasz który?

2. **Multi-Cloud Strategy** - Jakie są zalety i wady strategii multi-cloud?

3. **Serverless** - Kiedy stosujesz serverless (Lambda, Azure Functions)? Jakie są ograniczenia?

4. **Containers vs VMs** - Kiedy używasz kontenerów, a kiedy VM-ek?

5. **Kubernetes** - Czy Kubernetes jest zawsze potrzebny? Jakie są alternatywy?

6. **Infrastructure as Code** - Jak implementujesz IaC (Terraform, CloudFormation, ARM)?

7. **Cloud-Native Patterns** - Jakie cloud-native patterns znasz (12-factor app, circuit breaker)?

8. **Disaster Recovery** - Jak projektujesz DR strategy? RTO vs RPO?

9. **Cost Optimization** - Jak optymalizujesz koszty infrastruktury cloud?

10. **Cloud Migration** - Jak planujesz i wykonujesz migrację do cloud (lift-and-shift vs refactor)?

---

### 6. DevOps i CI/CD

**Pytania:**

1. **CI/CD Pipeline** - Jak wygląda idealny pipeline CI/CD? Jakie są kluczowe etapy?

2. **GitOps** - Co to jest GitOps? Jak implementujesz ten model?

3. **Blue-Green Deployment** - Wyjaśnij różne strategie deployment (blue-green, canary, rolling).

4. **Feature Flags** - Jak stosujesz feature flags? Jakie są best practices?

5. **Monitoring vs Observability** - Jaka jest różnica? Jakie narzędzia stosujesz?

6. **Logging Strategy** - Jak projektujesz strategię logowania w systemie rozproszonym?

7. **Alerting** - Jak konfigurujesz alerty, żeby unikać alert fatigue?

8. **SLA/SLO/SLI** - Wyjaśnij różnice i jak definiujesz te metryki.

9. **Incident Management** - Jak wygląda proces zarządzania incydentami? Postmortems?

10. **Configuration Management** - Jak zarządzasz konfiguracją w różnych środowiskach?

---

### 7. Komunikacja między Serwisami

**Pytania:**

1. **Synchronous vs Asynchronous** - Kiedy stosujesz komunikację synchroniczną (REST, gRPC), a kiedy asynchroniczną (messaging)?

2. **REST vs gRPC** - Porównaj REST i gRPC. Kiedy wybierasz który?

3. **GraphQL** - Kiedy GraphQL jest lepszy od REST? Jakie są wady?

4. **Message Brokers** - Porównaj RabbitMQ, Kafka, AWS SQS. Kiedy używasz którego?

5. **Kafka Architecture** - Jak działa Kafka? Kiedy jest najlepszym wyborem?

6. **Event Streaming** - Jaka jest różnica między message queue a event stream?

7. **API Versioning** - Jak wersjonujesz API? Jakie są strategie?

8. **Contract Testing** - Jak testujesz kontrakty między serwisami (Pact, Spring Cloud Contract)?

9. **Service Discovery** - Jak implementujesz service discovery (Consul, Eureka)?

10. **Idempotency** - Dlaczego idempotency jest ważna w systemach rozproszonych? Jak ją implementujesz?

---

### 8. Bazy Danych i Storage

**Pytania:**

1. **SQL vs NoSQL** - Kiedy wybierasz SQL, a kiedy NoSQL? Podaj konkretne use cases.

2. **Database per Service** - Jak implementujesz database per service pattern w mikrousługach?

3. **Polyglot Persistence** - Co to jest polyglot persistence? Jakie są wyzwania?

4. **Database Transactions** - Jak radzisz sobie z transakcjami w systemie rozproszonym?

5. **Data Consistency** - Strong consistency vs eventual consistency - kiedy stosujesz którą?

6. **Database Indexing** - Jak projektujesz indeksy? Jakie są trade-offy?

7. **Data Migration** - Jak planujesz i wykonujesz migracje schematu bazy danych w production?

8. **Data Warehousing** - Kiedy stosujesz data warehouse? OLTP vs OLAP?

9. **Time Series Databases** - Kiedy stosujesz time series DB (InfluxDB, TimescaleDB)?

10. **Database Backup Strategy** - Jak projektujesz strategię backup i recovery?

---

### 9. Monitoring, Observability i Reliability

**Pytania:**

1. **The Three Pillars** - Metrics, Logs, Traces - jak implementujesz każdy z nich?

2. **Distributed Tracing** - Jak działają narzędzia jak Jaeger, Zipkin? Kiedy są niezbędne?

3. **APM Tools** - Porównaj Application Performance Monitoring tools (New Relic, Dynatrace, DataDog).

4. **SRE Principles** - Jakie są kluczowe zasady Site Reliability Engineering?

5. **Error Budgets** - Co to jest error budget? Jak go obliczasz i używasz?

6. **Chaos Engineering** - Co to jest chaos engineering? Jak implementujesz (Chaos Monkey)?

7. **Health Checks** - Jak projektujesz health checks dla serwisów?

8. **Performance Testing** - Jak prowadzisz load testing i stress testing?

9. **Capacity Planning** - Jak planujesz capacity dla rosnącego systemu?

10. **Graceful Degradation** - Jak projektujesz system, który gracefully degraduje się przy awariach?

---

### 10. Zarządzanie Zespołem i Komunikacja

**Pytania:**

1. **Technical Leadership** - Jak balansujesz między technical work a leadership?

2. **Architecture Decision Records (ADR)** - Jak dokumentujesz decyzje architektoniczne?

3. **Stakeholder Management** - Jak komunikujesz decyzje techniczne do non-technical stakeholders?

4. **Technical Debt** - Jak zarządzasz technical debt? Jak przekonujesz biznes do jego spłacania?

5. **Code Review Process** - Jak wygląda proces review dla architektury i design?

6. **Mentoring** - Jak mentorujesz developerów w kwestiach architektonicznych?

7. **RFC Process** - Jak wygląda proces Request for Comments w twoim zespole?

8. **Cross-Functional Teams** - Jak współpracujesz z Product, UX, QA?

9. **Knowledge Sharing** - Jak zapewniasz knowledge sharing w zespole (tech talks, documentation)?

10. **Hiring** - Jak oceniasz kandydatów na stanowiska architektoniczne?

---

### 11. Trade-offs i Decyzje Architektoniczne

**Pytania:**

1. **Build vs Buy** - Jak decydujesz czy zbudować własne rozwiązanie, czy kupić gotowe?

2. **Premature Optimization** - Jak unikasz przedwczesnej optymalizacji, ale zachowujesz wydajność?

3. **Technology Selection** - Jakie kryteria stosujesz przy wyborze technologii?

4. **Legacy System Integration** - Jak integrujjesz nowe systemy z legacy?

5. **Breaking Changes** - Jak wprowadzasz breaking changes w systemie rozproszonym?

6. **Data Migration Strategy** - Jak migrujesz dane między systemami bez downtime?

7. **Scaling vs Simplicity** - Jak balansujesz między przyszłą skalowalnością a obecną prostotą?

8. **Time to Market** - Jak balansujesz między szybkim dostarczeniem a jakością architektury?

9. **Open Source vs Commercial** - Kiedy wybierasz open source, a kiedy komercyjne rozwiązania?

10. **Risk Assessment** - Jak oceniasz ryzyko związane z decyzjami architektonicznymi?

---

### 12. Migracje i Legacy Systems

**Pytania:**

1. **Strangler Fig Pattern** - Wyjaśnij ten wzorzec. Kiedy go stosujesz?

2. **Legacy Modernization** - Jakie są strategie modernizacji legacy systems?

3. **Anti-Corruption Layer** - Jak implementujesz ACL przy integracji z legacy?

4. **Data Migration** - Jak planujesz migrację dużych ilości danych?

5. **Zero-Downtime Migration** - Jak wykonujesz migracje bez przestojów?

6. **Rollback Strategy** - Jak planujesz rollback przy migracji?

7. **Testing Legacy Systems** - Jak testujesz legacy system przed migracją?

8. **Big Bang vs Incremental** - Kiedy stosujesz big bang migration, a kiedy incremental?

9. **Database Migration Tools** - Jakie narzędzia stosujesz do migracji DB (Flyway, Liquibase)?

10. **Documentation of Legacy** - Jak dokumentujesz legacy system przed refactorem?

---

## Stanowisko: Senior Developer (Starszy Programista)

### 1. Zaawansowane Programowanie Obiektowe

**Pytania:**

1. **SOLID Principles** - Wyjaśnij każdą z zasad SOLID z przykładami. Kiedy naruszysz którąś zasadę?

2. **Composition vs Inheritance** - Dlaczego "composition over inheritance"? Podaj przykłady.

3. **Design Patterns** - Opisz różnicę między Factory, Abstract Factory i Builder pattern.

4. **Dependency Injection** - Jak działa DI? Jakie są rodzaje DI (constructor, property, method)?

5. **Inversion of Control** - Jaka jest różnica między IoC a DI?

6. **Interface Segregation** - Jak stosujesz ISP w praktyce? Podaj przykład z własnego kodu.

7. **Open/Closed Principle** - Jak projektujesz kod otwarty na rozszerzenia, ale zamknięty na modyfikacje?

8. **Liskov Substitution** - Podaj przykład naruszenia LSP i jak go naprawić.

9. **Polymorphism** - Jakie rodzaje polimorfizmu znasz? Podaj przykłady użycia.

10. **Encapsulation** - Jak zapewniasz proper encapsulation w swoim kodzie?

---

### 2. Design Patterns

**Pytania:**

1. **Creational Patterns** - Kiedy używasz Singleton, Factory, Builder, Prototype?

2. **Structural Patterns** - Wyjaśnij Adapter, Decorator, Facade, Proxy z przykładami.

3. **Behavioral Patterns** - Opisz Strategy, Observer, Command, Template Method.

4. **Repository Pattern** - Jak implementujesz Repository pattern? Jakie są zalety?

5. **Unit of Work** - Co to jest Unit of Work pattern? Jak współpracuje z Repository?

6. **Specification Pattern** - Kiedy stosujesz Specification pattern w business logic?

7. **Chain of Responsibility** - Podaj praktyczny przykład użycia tego wzorca.

8. **Mediator Pattern** - Jak Mediator zmniejsza coupling między komponentami?

9. **State Pattern** - Kiedy State pattern jest lepszy niż if/switch statements?

10. **Anti-Patterns** - Jakie anti-patterns najczęściej spotykasz? Jak je refactorujesz?

---

### 3. Clean Code i Best Practices

**Pytania:**

1. **Code Readability** - Jakie praktyki stosujesz, żeby kod był czytelny?

2. **Naming Conventions** - Jak nazywasz zmienne, funkcje, klasy? Jakich konwencji przestrzegasz?

3. **Function Length** - Jak długa powinna być funkcja? Kiedy ją rozbijesz?

4. **Comments vs Self-Documenting Code** - Kiedy piszesz komentarze, a kiedy kod powinien być self-documenting?

5. **Code Duplication** - Jak identyfikujesz i eliminujesz duplikację kodu (DRY)?

6. **Magic Numbers** - Jak radzisz sobie z magic numbers i strings?

7. **Error Handling** - Jak projektujesz obsługę błędów? Exceptions vs Result types?

8. **Null Safety** - Jak unikasz NullReferenceException? Nullable types?

9. **Immutability** - Kiedy stosujesz immutable objects? Jakie są zalety?

10. **Code Organization** - Jak organizujesz strukturę projektu i folderów?

---

### 4. Algorytmy i Struktury Danych

**Pytania:**

1. **Time Complexity** - Wyjaśnij Big O notation. Podaj przykłady O(1), O(n), O(log n), O(n²).

2. **Hash Tables** - Jak działają hash tables? Collision resolution?

3. **Trees** - Jaka jest różnica między Binary Tree, BST, AVL, Red-Black Tree?

4. **Graph Algorithms** - Opisz BFS, DFS, Dijkstra, A*.

5. **Sorting Algorithms** - Porównaj QuickSort, MergeSort, HeapSort. Która jest najlepsza?

6. **Searching** - Binary search vs Linear search. Kiedy użyjesz której?

7. **Dynamic Programming** - Co to jest dynamic programming? Podaj przykład problemu.

8. **Recursion vs Iteration** - Kiedy używasz rekurencji, a kiedy iteracji?

9. **Stack vs Queue** - Podaj praktyczne przykłady użycia stack i queue.

10. **Linked List vs Array** - Jakie są trade-offy między linked list a array?

---

### 5. Wydajność i Optymalizacja

**Pytania:**

1. **Profiling** - Jakie narzędzia używasz do profilowania kodu?

2. **Memory Leaks** - Jak identyfikujesz i naprawiasz memory leaks?

3. **Caching** - Jakie strategie cache'owania stosujesz w aplikacji?

4. **Database Optimization** - Jak optymalizujesz zapytania do bazy danych?

5. **Lazy Loading** - Kiedy stosujesz lazy loading? Jakie są pułapki?

6. **N+1 Problem** - Co to jest N+1 problem? Jak go rozwiązujesz?

7. **Connection Pooling** - Dlaczego connection pooling jest ważny?

8. **Async/Await** - Jak async/await poprawia wydajność? Jakie są best practices?

9. **Batch Processing** - Kiedy stosujesz batch processing zamiast pojedynczych operacji?

10. **Premature Optimization** - Jak unikasz premature optimization, ale zachowujesz wydajność?

---

### 6. Testowanie

**Pytania:**

1. **Test Pyramid** - Wyjaśnij test pyramid. Ile testów każdego typu powinieneś mieć?

2. **Unit Testing** - Jak piszesz dobre unit testy? AAA pattern?

3. **Mocking** - Kiedy używasz mocks, stubs, fakes? Jaka jest różnica?

4. **Integration Testing** - Jak testujesz integrację z bazą danych, API, etc.?

5. **TDD** - Czy stosujesz TDD? Jakie są zalety i wady?

6. **Test Coverage** - Ile procent coverage jest wystarczające? Czy 100% to dobry cel?

7. **E2E Testing** - Jak piszesz end-to-end testy? Jakie narzędzia używasz?

8. **Flaky Tests** - Jak radzisz sobie z niestabilnymi testami?

9. **Test Data Management** - Jak zarządzasz danymi testowymi?

10. **BDD** - Co to jest Behavior-Driven Development? Gherkin syntax?

---

### 7. Refactoring

**Pytania:**

1. **When to Refactor** - Kiedy refactorujesz kod? Jakie są sygnały?

2. **Boy Scout Rule** - Jak stosujesz Boy Scout Rule w praktyce?

3. **Extract Method** - Kiedy wyciągasz metodę? Jak długa jest idealna metoda?

4. **Extract Class** - Kiedy wyciągasz klasę? Single Responsibility Principle?

5. **Rename Variables** - Jak refactorujesz naming w legacy code?

6. **Remove Code Duplication** - Jakie techniki stosujesz do eliminacji duplikacji?

7. **Simplify Conditionals** - Jak upraszczasz skomplikowane if/else statements?

8. **Replace Magic Numbers** - Jak refactorujesz magic numbers do named constants?

9. **Introduce Parameter Object** - Kiedy grupujesz parametry w obiekt?

10. **Working with Legacy** - Jak bezpiecznie refactorujesz legacy code bez testów?

---

### 8. Code Review i Współpraca

**Pytania:**

1. **Code Review Process** - Jak wygląda twój proces code review?

2. **PR Best Practices** - Jak duże powinny być Pull Requesty? Co powinny zawierać?

3. **Giving Feedback** - Jak udzielasz konstruktywnego feedbacku w code review?

4. **Receiving Feedback** - Jak reagujesz na krytykę swojego kodu?

5. **Code Style** - Jak zapewniasz consistent code style w zespole?

6. **Git Workflow** - Jaki Git workflow stosujesz (GitFlow, GitHub Flow, Trunk-Based)?

7. **Commit Messages** - Jak piszesz dobre commit messages?

8. **Pair Programming** - Czy stosujesz pair programming? Jakie są zalety?

9. **Knowledge Sharing** - Jak dzielisz się wiedzą w zespole?

10. **Technical Discussions** - Jak rozwiązujesz techniczne spory w zespole?

---

### 9. Frameworki i Biblioteki

**Pytania:**

1. **Framework Selection** - Jak wybierasz framework do projektu?

2. **Framework Updates** - Jak zarządzasz updateami dependencies i frameworków?

3. **Dependency Management** - Jak zarządzasz dependencies (npm, NuGet, Maven)?

4. **Security Vulnerabilities** - Jak monitorujesz i naprawiasz security vulnerabilities w dependencies?

5. **Custom vs Library** - Kiedy piszesz własną implementację, a kiedy używasz biblioteki?

6. **Learning New Frameworks** - Jak szybko uczysz się nowych frameworków?

7. **Framework Limitations** - Jak radzisz sobie z ograniczeniami frameworka?

8. **Migration Between Frameworks** - Jak planujesz migrację między frameworkami?

9. **Package Management** - Jak organizujesz własne wewnętrzne packages?

10. **Open Source Contribution** - Czy contributujesz do open source? Jakie są korzyści?

---

### 10. API Design

**Pytania:**

1. **RESTful API** - Jakie są zasady REST? Jak projektujesz RESTful API?

2. **HTTP Methods** - Kiedy używasz GET, POST, PUT, PATCH, DELETE?

3. **Status Codes** - Jakie status codes HTTP używasz w jakich sytuacjach?

4. **API Versioning** - Jak wersjonujesz API? URL vs Header?

5. **Pagination** - Jak implementujesz paginację w API?

6. **Filtering and Sorting** - Jak projektujesz API dla filtrowania i sortowania?

7. **Error Responses** - Jak strukturyzujesz error responses?

8. **Rate Limiting** - Jak implementujesz rate limiting?

9. **API Documentation** - Jak dokumentujesz API (Swagger, OpenAPI)?

10. **GraphQL vs REST** - Kiedy wybierasz GraphQL zamiast REST?

---

### 11. Bazy Danych

**Pytania:**

1. **ORM vs Raw SQL** - Kiedy używasz ORM (Entity Framework, Hibernate), a kiedy raw SQL?

2. **Database Indexing** - Jak projektujesz indeksy? Jakie są trade-offy?

3. **Query Optimization** - Jak optymalizujesz wolne zapytania SQL?

4. **Transactions** - ACID properties. Isolation levels?

5. **Database Migrations** - Jak zarządzasz schema migrations (Flyway, Entity Framework Migrations)?

6. **NoSQL** - Kiedy wybierasz NoSQL zamiast SQL? Jakie typy NoSQL znasz?

7. **Database Design** - Normalizacja vs denormalizacja. Kiedy stosujesz którą?

8. **Connection Pooling** - Jak konfigurujesz connection pooling?

9. **Stored Procedures** - Kiedy używasz stored procedures? Zalety i wady?

10. **Database Testing** - Jak testujesz kod zależny od bazy danych?

---

### 12. Git i Version Control

**Pytania:**

1. **Git Workflow** - Jaki Git workflow stosujesz w zespole?

2. **Branching Strategy** - Jak nazywasz i organizujesz branch'e?

3. **Merge vs Rebase** - Kiedy używasz merge, a kiedy rebase?

4. **Conflict Resolution** - Jak rozwiązujesz merge conflicts?

5. **Git Hooks** - Czy używasz git hooks? Do czego?

6. **Cherry-Pick** - Kiedy używasz git cherry-pick?

7. **Git Bisect** - Jak używasz git bisect do znajdowania bugów?

8. **Commit History** - Jak dbasz o clean commit history?

9. **Git Best Practices** - Jakie Git best practices stosujesz?

10. **Monorepo vs Multirepo** - Jakie są zalety i wady monorepo?

---

### 13. Debugging i Troubleshooting

**Pytania:**

1. **Debugging Tools** - Jakie narzędzia używasz do debugowania?

2. **Production Debugging** - Jak debugujesz problemy w production?

3. **Logging** - Jak implementujesz logging? Jakie poziomy logów używasz?

4. **Stack Traces** - Jak czytasz i analizujesz stack traces?

5. **Memory Profiling** - Jak identyfikujesz memory leaks?

6. **Performance Issues** - Jak identyfikujesz bottlenecki wydajnościowe?

7. **Debugging Techniques** - Jakie techniki debugowania stosujesz (rubber duck, binary search)?

8. **Remote Debugging** - Jak debugujesz aplikacje na zdalnych serwerach?

9. **Monitoring Tools** - Jakie narzędzia monitoringu używasz w production?

10. **Postmortem Analysis** - Jak prowadzisz analizę po incydencie w production?

---

### 14. Mentoring i Leadership

**Pytania:**

1. **Mentoring Juniors** - Jak mentorujesz młodszych developerów?

2. **Code Reviews for Juniors** - Jak dostosowujesz code reviews dla różnych poziomów doświadczenia?

3. **Teaching Best Practices** - Jak uczysz best practices w zespole?

4. **Technical Discussions** - Jak prowadzisz technical discussions z zespołem?

5. **Knowledge Transfer** - Jak zapewniasz transfer wiedzy w zespole?

6. **Technical Leadership** - Jak balansujesz między coding a leadership?

7. **Architecture Discussions** - Jak włączasz się w dyskusje architektoniczne?

8. **Onboarding** - Jak onboardujesz nowych developerów do projektu?

9. **Tech Talks** - Czy prowadzisz tech talks? Na jakie tematy?

10. **Career Development** - Jak pomagasz młodszym developerom w rozwoju kariery?

---

## Pytania Behawioralne (dla obu stanowisk)

### Doświadczenie i Projekty

1. Opowiedz o najtrudniejszym technicznym wyzwaniu, z którym się zmierzyłeś.
2. Opisz projekt, w którym musiałeś podjąć trudne decyzje architektoniczne/techniczne.
3. Jak radziłeś sobie z niepowodzeniem projektu?
4. Opowiedz o sytuacji, gdy musiałeś szybko nauczyć się nowej technologii.
5. Opisz projekt, z którego jesteś najbardziej dumny.

### Współpraca i Komunikacja

6. Jak rozwiązujesz konflikty techniczne w zespole?
7. Opowiedz o sytuacji, gdy musiałeś przekonać zespół do swojego rozwiązania.
8. Jak komunikujesz złożone techniczne koncepty non-technical stakeholders?
9. Opisz sytuację, gdy popełniłeś błąd w production. Jak zareagowałeś?
10. Jak radzisz sobie z tight deadlines i presją?

### Rozwój i Nauka

11. Jak się uczysz nowych technologii?
12. Jakie blogi/książki/podcasty techniczne śledzisz?
13. Jak się rozwijasz jako developer/architekt?
14. Co ostatnio cię zafascynowało w technologii?
15. Jakie nowe technologie chciałbyś się nauczyć?

---

## Pytania Zadaniowe (Coding/Design Challenges)

### Dla Architekta

1. **System Design**: Zaprojektuj system do bookowania lotów (lub Uber-like, Twitter-like system).
2. **Microservices**: Jak zdekomponujesz monolityczną aplikację e-commerce na mikrousługi?
3. **Scalability**: Zaprojektuj system do obsługi 1 miliona requestów na sekundę.
4. **Data Modeling**: Zaprojektuj schemat bazy danych dla systemu rezerwacji hotelowych.
5. **API Design**: Zaprojektuj RESTful API dla aplikacji do zarządzania projektami.

### Dla Senior Developer

1. **Algorithm**: Zaimplementuj LRU Cache.
2. **Refactoring**: Zrefactoruj podany legacy code.
3. **Design Pattern**: Zaimplementuj Observer pattern.
4. **API**: Zaprojektuj i zaimplementuj RESTful API dla TODO list.
5. **Testing**: Napisz unit testy dla podanej funkcji biznesowej.
6. **Database**: Zoptymalizuj podane zapytanie SQL.
7. **Async**: Zaimplementuj async data processing pipeline.
8. **Error Handling**: Zaprojektuj robust error handling strategy.

---

## Pytania na koniec rozmowy (dla kandydata)

Zachęć kandydata do zadawania pytań. Dobre pytania świadczą o zaangażowaniu:

**Przykłady dobrych pytań od kandydata:**

1. Jaka jest architektura obecnego systemu?
2. Jakie są największe techniczne wyzwania w firmie?
3. Jak wygląda proces developmentu i deployment?
4. Jakie technologie są w stack'u?
5. Jak wygląda ścieżka rozwoju dla tego stanowiska?
6. Jak firma podchodzi do technical debt?
7. Jaka jest kultura code review?
8. Czy firma wspiera rozwój (konferencje, kursy, certyfikaty)?
9. Jak duży jest zespół i jak jest zorganizowany?
10. Jakie są plany rozwoju produktu/technologii?
