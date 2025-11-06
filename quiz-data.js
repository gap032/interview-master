// Quiz Questions Database
const quizQuestions = [
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

    // Data Structures & Algorithms - Senior Level
    {
        category: "algorithms",
        level: "senior",
        question: "Który algorithm sortowania ma najlepszą złożoność w najgorszym przypadku dla danych prawie posortowanych?",
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

    // Additional questions to reach 100+
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
    }
];

// Helper function to get filtered questions
function getFilteredQuestions(category = 'all', level = 'all', count = 10) {
    let filtered = quizQuestions;

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
