# Framework Rozwiązywania Problemów dla Rozmów Technicznych

## Przegląd

Ten przewodnik przedstawia systematyczne podejście do rozwiązywania problemów kodowania podczas rozmów kwalifikacyjnych. Ustrukturyzowany framework pomaga:
- Zachować organizację pod presją
- Jasno komunikować proces myślowy
- Unikać pomijania przypadków brzegowych
- Pisać czystszy, bardziej utrzymywalny kod
- Demonstrować profesjonalne umiejętności rozwiązywania problemów

## Metoda UMPIRE

**UMPIRE** to akronim kompleksowego frameworka rozwiązywania problemów:

- **U**nderstand (Zrozum)
- **M**atch (Dopasuj)
- **P**lan (Zaplanuj)
- **I**mplement (Zaimplementuj)
- **R**eview (Przejrzyj)
- **E**valuate (Oceń)

### 1. Zrozum Problem

**Cel**: Upewnij się, że w pełni rozumiesz wymagania przed pisaniem kodu.

**Kroki**:

1. **Przeformułuj problem własnymi słowami**
   - "Więc muszę znaleźć najkrótszą ścieżkę między..."
   - "Zadanie polega na zwróceniu wszystkich kombinacji gdzie..."

2. **Wyjaśnij wejścia i wyjścia**
   - Jakie typy danych są wejściami?
   - Co powinno być zwrócone?
   - Co powinno się stać z nieprawidłowymi wejściami?

3. **Zadawaj pytania wyjaśniające**
   ```
   - "Czy tablica może być pusta?"
   - "Czy liczby są zawsze dodatnie?"
   - "Czy powinienem rozważyć duplikaty?"
   - "Jaki jest oczekiwany rozmiar wejścia?"
   - "Czy wejście jest posortowane?"
   - "Czy są ograniczenia pamięci?"
   ```

4. **Przepracuj przykłady**
   - Zacznij od prostych przykładów
   - Rozważ przypadki brzegowe
   - Prześledzmanualnie logikę

5. **Zidentyfikuj ograniczenia**
   - Oczekiwania złożoności czasowej
   - Limity złożoności przestrzennej
   - Zakresy rozmiaru wejścia

**Przykład**:
```
Problem: Znajdź dwie liczby w tablicy, które sumują się do target.

Pytania do zadania:
✓ Czy mogą być duplikaty liczb?
✓ Czy zawsze będzie dokładnie jedno rozwiązanie?
✓ Czy powinienem zwrócić indeksy czy wartości?
✓ Czy mogę użyć tego samego elementu dwa razy?
✓ Czy tablica jest posortowana?
✓ Co jeśli nie ma rozwiązania?
✓ Jaki jest oczekiwany rozmiar tablicy?
```

### 2. Dopasuj do Wzorców

**Cel**: Rozpoznaj wspólne wzorce i struktury danych pasujące do problemu.

**Wspólne Wzorce**:

#### Wzorce Tablic/Stringów
- **Two Pointers**: Posortowana tablica, pary z sumą target, sprawdzanie palindromów
- **Sliding Window**: Problemy podtablic/podstringów, stałe/zmienne okno
- **Fast & Slow Pointers**: Detekcja cykli, znajdowanie środkowego elementu

#### Wzorce Struktur Danych
- **Hash Map**: Liczenie częstości, szybkie wyszukiwanie, pary/trójki
- **Stack**: Dopasowanie nawiasów, następny większy element, ewaluacja wyrażeń
- **Queue**: BFS, level-order traversal, sliding window maximum
- **Heap**: Top K elementów, merge K posortowanych list, znajdowanie mediany

#### Wzorce Drzew
- **DFS (Rekursja)**: Problemy ścieżek, przechodzenie drzewa, walidacja
- **BFS (Queue)**: Level-order traversal, najkrótsza ścieżka w drzewie
- **Binary Search Tree**: Szukanie, wstawianie, walidacja właściwości BST

#### Wzorce Grafów
- **DFS**: Składowe spójne, detekcja cykli, sortowanie topologiczne
- **BFS**: Najkrótsza ścieżka, przechodzenie poziomowe
- **Union Find**: Składowe spójne, detekcja cykli w grafach nieskierowanych

#### Wzorce Programowania Dynamicznego
- **Fibonacci Pattern**: Wspinanie po schodach, decode ways
- **0/1 Knapsack**: Suma podzbioru, równa partycja
- **Unbounded Knapsack**: Wymiana monet, cięcie pręta
- **LCS Pattern**: Najdłuższy wspólny podciąg, odległość edycji

#### Wzorce Algorytmiczne
- **Binary Search**: Szukanie w posortowanej tablicy, szukanie w rotowanej tablicy
- **Backtracking**: Permutacje, kombinacje, N-Queens, Sudoku
- **Greedy**: Wybór aktywności, jump game, stacja benzynowa
- **Divide & Conquer**: Merge sort, quick sort, najbliższa para

### 3. Zaplanuj Rozwiązanie

**Cel**: Zaprojektuj rozwiązanie przed kodowaniem.

**Kroki**:

1. **Wybierz podejście**
   - Zacznij od brute force (pokazuje że rozumiesz problem)
   - Zidentyfikuj optymalizacje

2. **Naszkicuj algorytm**
   - Napisz pseudokod lub kroki wysokiego poziomu
   - Nie zacznij kodować natychmiast

3. **Analizuj złożoność**
   - Złożoność czasowa: O(?)
   - Złożoność przestrzenna: O(?)
   - Czy to akceptowalne przy danych ograniczeniach?

4. **Rozważ przypadki brzegowe**
   - Puste wejście
   - Pojedynczy element
   - Wszystkie elementy takie same
   - Wartości maksymalne/minimalne
   - Nieprawidłowe wejście

5. **Komunikuj swój plan**
   - Omów swoje podejście
   - Zapytaj czy rozmówca zgadza się z kierunkiem

**Przykładowy Plan**:
```
Problem: Two Sum

Podejście Brute Force:
- Zagnieżdżone pętle sprawdzające wszystkie pary
- Czas: O(n²), Przestrzeń: O(1)
- Działa ale za wolne dla dużych wejść

Optymalne Podejście:
- Użyj hash map do przechowania widzianych liczb
- Dla każdej liczby sprawdź czy (target - liczba) istnieje
- Czas: O(n), Przestrzeń: O(n)
- Wymiana przestrzeni na czas

Pseudokod:
1. Utwórz pustą hash mapę
2. Dla każdej liczby w tablicy:
   a. Oblicz complement = target - liczba
   b. Jeśli complement w hash mapie:
      - Zwróć [hash_map[complement], current_index]
   c. Dodaj liczbę i indeks do hash mapy
3. Zwróć pustą jeśli brak rozwiązania

Przypadki brzegowe:
- Pusta tablica → zwróć []
- Pojedynczy element → zwróć []
- Duplikaty liczb → hash mapa przechowuje ostatni indeks
- Ten sam element dwa razy → sprawdź czy complement równy current number
```

### 4. Zaimplementuj Kod

**Cel**: Napisz czysty, działający kod.

**Best Practices**:

1. **Zacznij od struktury**
2. **Pisz czytelny kod** - znaczące nazwy zmiennych, komentarze dla złożonej logiki
3. **Obsługuj przypadki brzegowe wcześnie**
4. **Myśl na głos** - wyjaśniaj co piszesz
5. **Testuj podczas pisania** - nie czekaj do końca

### 5. Przejrzyj Kod

**Cel**: Wyłap błędy i popraw jakość kodu.

**Checklist**:

1. **Prześledź z przykładami** - użyj swoich oryginalnych przykładów
2. **Sprawdź przypadki brzegowe**
3. **Szukaj błędów** - off-by-one errors, sprawdzenia null/None, integer overflow
4. **Jakość kodu** - czy kod można uprościć? Czy nazwy zmiennych są jasne?
5. **Poproś o feedback** - "Czy to ma sens?" "Czy jest coś do wyjaśnienia?"

### 6. Oceń Złożoność

**Cel**: Zademonstruj zrozumienie wydajności.

**Analiza**:

1. **Złożoność Czasowa**
   - Policz operacje w zależności od rozmiaru wejścia
   - Big-O notation: O(1), O(log n), O(n), O(n log n), O(n²)

2. **Złożoność Przestrzenna**
   - Policz dodatkową pamięć użytą
   - Stack przestrzeń dla rekursji
   - Struktury danych (hash maps, arrays)

3. **Trade-offs**
   - Często można wymienić przestrzeń na czas lub odwrotnie
   - Omów alternatywne podejścia

**Przykład Analizy**:
```
Two Sum Solution:
- Czas: O(n) - jedna iteracja przez tablicę
- Przestrzeń: O(n) - hash mapa może przechować n elementów
- Trade-off: Użyliśmy O(n) przestrzeni aby uzyskać O(n) czas
- Alternatywa: Sortowanie + two pointers = O(n log n) czas, O(1) przestrzeń
```

## Wskazówki Komunikacyjne

**Podczas Rozmowy**:

1. **Myśl na głos** - pokazuje proces myślowy
2. **Zadawaj pytania** - pokazuje dokładność
3. **Wyjaśniaj decyzje** - dlaczego wybrałeś dane podejście
4. **Bądź otwarty na hinty** - słuchaj sugestii rozmówcy
5. **Nie panikuj przy utknięciu** - omów alternatywy
6. **Zarządzaj czasem** - nie spędzaj 30 minut na jednej części

**Gdy Utkniesz**:

1. Wróć do przykładów - czasem wzorzec stanie się jasny
2. Pomyśl na głos o możliwych podejściach
3. Poproś o hint jeśli naprawdę utknąłeś
4. Zacznij od brute force i optymalizuj stopniowo

## Podsumowanie

Framework UMPIRE:
- **U**nderstand: Wyjaśnij problem, zadawaj pytania
- **M**atch: Rozpoznaj wzorce
- **P**lan: Zaprojektuj przed kodowaniem
- **I**mplement: Pisz czysty kod
- **R**eview: Testuj i szukaj błędów
- **E**valuate: Analizuj złożoność

**Praktyka jest kluczowa**. Im więcej problemów rozwiążesz używając tego frameworka, tym bardziej naturalny się stanie.
