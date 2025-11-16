# Pytania Behawioralne - Poziom Principal

## 1. Jak napędzasz strategię techniczną w całej organizacji?

**Pytanie**: Opisz jak wpływasz na kierunek techniczny na dużą skalę.

**Odpowiedź:**

"Jako Principal Engineer skupiam się na:

**1. Budowaniu Konsensusu:**
- Identyfikuję wspólne punkty bólu między zespołami
- Tworzę grupy robocze z przedstawicielami każdego zespołu
- Tworzę RFC (Request for Comments) dla głównych decyzji
- Zbieram feedback wcześnie i często

**Przykład:**
Napędzałem adopcję architektury event-driven:
- Zacząłem od pilotażowego zespołu, udowodniłem wartość
- Udokumentowałem wzorce i best practices
- Zaprezentowałem na spotkaniu całego działu inżynierii
- Stworzyłem self-service szablony i biblioteki
- Teraz 15 zespołów używa tego wzorca

**2. Balansowanie Innowacji i Stabilności:**
- Nowe technologie najpierw na niekrytycznych ścieżkach
- Udowadniam wartość przed mandatowym przyjęciem
- Wspieram legacy systemy podczas tranzycji

**3. Oparte na Metrykach:**
- Definiuję metryki sukcesu z góry
- Regularne przeglądy decyzji technologicznych
- Dostosowuję na podstawie danych, nie opinii"

---

## 2. Opowiedz o sytuacji, gdy musiałeś podjąć krytyczną decyzję architektoniczną pod presją

**Odpowiedź:**

**Sytuacja:**
"Nasza baza danych osiągnęła 90% pojemności. Awarie prawdopodobne w ciągu tygodni. Pełna migracja zajęłaby miesiące."

**Zadanie:**
"Ustabilizować system natychmiast planując jednocześnie długoterminowe rozwiązanie."

**Działanie:**
Krótkoterminowo (tydzień 1):
- Zaimplementowałem agresywne cachowanie
- Zarchiwizowałem stare dane
- Zoptymalizowałem wolne zapytania
- Dodałem repliki read

Długoterminowo (3 miesiące):
- Zaprojektowałem strategię shardingu
- Zbudowałem pipeline migracji danych
- Migrowałem stopniowo, tabela po tabeli
- Migracja bez przestojów

**Rezultat:**
- Natychmiastowo: Zredukowane obciążenie DB o 40%, uniknąłem awarii
- 3 miesiące: Skalowanie do 10x pojemności
- Proces stał się playbookiem dla przyszłych migracji

**Lekcje:**
- Kupuj czas taktycznymi naprawami
- Planuj strategiczne rozwiązanie równolegle
- Komunikuj postęp do interesariuszy
- Dokumentuj dla przyszłych podobnych sytuacji"

---

## 3. Jak radzisz sobie z nieporozumieniem z wyższym kierownictwem w kwestii kierunku technicznego?

**Odpowiedź:**

**Sytuacja:**
"VP of Engineering chciał zmigrować całą platformę do microservices w ciągu 3 miesięcy. Uważałem, że to zbyt agresywne i ryzykowne."

**Podejście:**

**1. Analiza Oparta na Danych:**
- Stworzyłem szczegółowy plan migracji z zależnościami
- Zidentyfikowałem 45 serwisów, oszacowałem 8-12 miesięcy na bezpieczną migrację
- Przeanalizowałem ryzyka: ekspertyza zespołu, koszty operacyjne, spójność danych
- Analiza kosztów i korzyści pokazała ograniczoną wartość krótkoterminową

**2. Propozycja Alternatywna:**
- Zaproponowałem podejście fazowe na 12 miesięcy
- Start z 3 pilotażowymi serwisami aby udowodnić wartość
- Budowa wewnętrznych narzędzi i best practices
- Szkolenie zespołów stopniowo

**3. Prezentacja dla Kierownictwa:**
- Potwierdziłem zrozumienie biznesowych motywacji decyzji
- Zaprezentowałem dane pokazujące ryzyka agresywnego harmonogramu
- Pokazałem alternatywny plan osiągający kluczowe kamienie milowe biznesowe
- Dołączyłem feedback od zespołów inżynieryjnych

**Rezultat:**
- Kierownictwo zgodziło się na podejście fazowe
- Ukończona migracja w 10 miesięcy
- Zero poważnych incydentów podczas migracji
- Ustalony wzorzec dla przyszłych migracji

**Kluczowe Zasady:**
- Szanuj kwestionowanie z danymi, nie opiniami
- Rozumiej kontekst biznesowy
- Proponuj alternatywy, nie mów tylko "nie"
- Buduj koalicję wsparcia
- Akceptuj ostateczną decyzję nawet jeśli się nie zgadzasz

---

## 4. Opisz jak mentorowałeś inżyniera do następnego poziomu

**Odpowiedź:**

**Sytuacja:**
"Senior engineer (Sarah) konsekwentnie dostarczała wyniki, ale miała trudności z niejednoznacznymi problemami i wpływem międzyzespołowym."

**Podejście Mentoringowe:**

**1. Plan Rozwoju Kariery:**
```
Obecny Stan: Silna egzekucja, ograniczony zakres
Cel: Staff Engineer (6-9 miesięcy)

Analiza Luk:
- ✗ Myślenie systemowe
- ✗ Wpływanie między zespołami
- ✗ Radzenie sobie z niejednoznacznością
- ✓ Głębokość techniczna
- ✓ Jakość kodu
```

**2. Ustrukturyzowane Możliwości Wzrostu:**

**Miesiąc 1-2: Obserwacja & Nauka**
- Obserwowała mnie na spotkaniach architektonicznych
- Współtworzyła dokumenty projektowe
- Obserwowała negocjacje międzyzespołowe
- Cotygodniowe 1:1 aby omawiać obserwacje

**Miesiąc 3-4: Prowadzona Niezależność**
- Prowadziła mały projekt międzyzespołowy (integracja płatności)
- Uczestniczyłem w spotkaniach ale pozwalałem jej prowadzić
- Dawałem feedback po każdym spotkaniu
- Przeglądałem dokumenty projektowe przed udostępnieniem

**Miesiąc 5-6: Pełna Odpowiedzialność**
- Odpowiadała za przeprojektowanie end-to-end systemu notyfikacji
- Pracowała z 4 zespołami niezależnie
- Byłem dostępny do porady, ale bez angażowania się
- Prezentowała finalne rozwiązanie VP of Engineering

**3. Konkretne Techniki:**

**Uczenie Myślenia Systemowego:**
- "Nie tylko rozwiąż problem; zidentyfikuj wzorzec"
- Code reviews skupione na szerszych implikacjach
- Dzielenie się przykładami efektów drugiego rzędu

**Budowanie Wpływu:**
- Uczyłem: Słuchaj najpierw, proponuj później
- Praktyka: Odgrywanie trudnych rozmów
- Feedback: Debriefing po każdej ważnej interakcji

**Radzenie sobie z Niejednoznacznością:**
- Podawałem niejasne wymagania celowo
- Uczyłem: "Zacznij od pytań, nie rozwiązań"
- Celebrowałem dobre pytania, nie tylko odpowiedzi

**Rezultat:**
- Sarah awansowana do Staff Engineer po 8 miesiącach
- Teraz mentoruje 2 senior engineers
- Prowadzi architekturę dla całej domeny płatności
- Niedawno prezentowała na spotkaniu całego działu

**Lekcje:**
- Twórz wyzwania z siatką bezpieczeństwa
- Dawaj feedback natychmiast i konkretnie
- Celebruj postęp, nie tylko wyniki
- Pozwól im się męczyć (w rozsądnych granicach)

---

## 5. Opowiedz o sytuacji gdy musiałeś wycofać ukochaną ale przestarzałą technologię

**Odpowiedź:**

**Sytuacja:**
"Firma miała własny framework Pythonowy (6 lat), używany przez 80% serwisów. Kochany przez wczesnych inżynierów, ale stający się obciążeniem."

**Wyzwania:**
- 40 serwisów zbudowanych na nim
- 20+ inżynierów głęboko znających framework
- Brak wybranej standardowej alternatywy
- Ciągły rozwój funkcjonalności
- Emocjonalne przywiązanie od założycieli

**Podejście:**

**Faza 1: Zbuduj Przypadek (2 miesiące)**
```
Zidentyfikowane Problemy:
- 60% incydentów produkcyjnych związanych z quirkami frameworka
- Nowi pracownicy potrzebowali 3 miesięcy aby stać się produktywnymi
- Niekompatybilny z nowoczesnymi funkcjami Pythona
- Brak wsparcia społeczności; 2 inżynierów utrzymujących
- Blokowanie adopcji lepszych narzędzi

Wpływ Biznesowy:
- $500K/rok w kosztach incydentów
- 40% wolniejsza szybkość dostarczania funkcji
- Trudności z rekrutacją (kandydaci chcieli nowoczesnego stacku)
```

**Faza 2: Socjalizacja Planu (1 miesiąc)**
- Rozmowy jeden-na-jeden z twórcami frameworka (założycielami)
  - Doceniłem ich wspaniałą pracę w tamtym czasie
  - Pokazałem jak potrzeby ewoluowały
  - Podkreśliłem legacy, nie porażkę
- Prezentacja na spotkaniu całego działu inżynierii
  - Transparentnie podzieliłem się danymi
  - Zaprosiłem do feedbacku i obaw
- Stworzenie kanału Slack do dyskusji

**Faza 3: Wykonaj Migrację (12 miesięcy)**

**Miesiąc 1-3: Fundamenty**
- Wybór FastAPI jako zamiennika (zespół głosował)
- Zbudowanie przewodnika migracji i szablonów
- Stworzenie automatycznych narzędzi migracyjnych
- Przeszkolenie 5 "championów FastAPI"

**Miesiąc 4-6: Projekty Pilotażowe**
- Migracja 3 serwisów o niskim ryzyku
- Dokumentacja nauczonych lekcji
- Udoskonalenie procesu migracji
- Pomiar: 40% mniej kodu, 2x szybciej

**Miesiąc 7-12: Pełna Migracja**
- Zespoły samodzielnie wybierały kolejność migracji
- Cotygodniowe godziny biurowe migracji
- Celebrowanie każdej zakończonej migracji
- Stary framework wszedł w tryb maintenance

**Radzenie sobie z Oporem:**

**Feedback założyciela:** "Ten framework był naszą przewagą konkurencyjną"
**Moja odpowiedź:**
- "BYŁ naszą przewagą w 2018, i ta decyzja była genialna"
- "Teraz jest naszą kotwicą. Technologia powinna ewoluować."
- "Twoje zasady architektoniczne żyją w tym jak projektujemy serwisy"

**Senior engineer:** "Nie chcę uczyć się nowego frameworka"
**Moja odpowiedź:**
- "Rozumiem. Zmiana jest trudna. Zróbmy pierwszą migrację razem w parze."
- "FastAPI jest prostsze—będziesz produktywny w dni, nie miesiące"
- *Programowałem z nimi w parze przez 2 tygodnie*

**Rezultat:**
- Wszystkie serwisy zmigrowane w 11 miesięcy
- Wskaźnik incydentów spadł o 40%
- Produktywność nowych pracowników: 3 miesiące → 3 tygodnie
- Odzyskanie szacunku twórców frameworka
- Framework należycie uczczony na wydarzeniu firmowym

**Lekcje:**
- Honoruj przeszłość przechodząc do przyszłości
- Dane przekonują umysły; empatia zdobywa serca
- Pozwól ludziom zachować twarz
- Twórz championów, nie wymuszaj zgodności
- Celebruj stare przyjmując nowe

---

## 6. Jak balansujesz dług techniczny z dostarczaniem funkcjonalności?

**Odpowiedź:**

"Jako Principal Engineer, to jedna z moich głównych odpowiedzialności. Oto mój framework:

**1. Kwantyfikuj Dług Techniczny:**

Zamiast argumentować "mamy za dużo długu," mierzę:

```python
# Technical Debt Scorecard
Metryki:
- Wskaźnik incydentów przypisanych do legacy kodu
- Czas spędzony na workaround vs. funkcjach
- Degradacja czasu cyklu w czasie
- Ankieta developerów: "blokery produktywności"

Przykładowy Dashboard:
┌─────────────────────────────────────────┐
│ Wpływ Długu Technicznego                │
├─────────────────────────────────────────┤
│ Incydenty (30 dni): 12 (8 legacy code)  │
│ Szybkość funkcji: -15% (vs. 6 mies temu)│
│ Satysfakcja inżynierów: 6/10            │
│ Top bloker: Deployment monolitu         │
└─────────────────────────────────────────┘
```

**2. Kategoryzuj Dług:**

**Krytyczny (napraw teraz):**
- Blokujący funkcje
- Luki bezpieczeństwa
- Powodujący częste incydenty
- Ryzyko utraty talentów

**Ważny (zaplanuj naprawę):**
- Spowalniający rozwój
- Zwiększający MTTR incydentów
- Blokujący cele architektoniczne

**Akceptowalny (dokumentuj & monitoruj):**
- Nie aktywnie szkodzący
- Istnieją jasne workaroundy
- Koszt naprawy > obecny ból

**3. Model Alokacji:**

Wynegocjowałem z kierownictwem produktu:

```
Alokacja Pojemności Sprinta:
- 70% Funkcje (roadmapa produktowa)
- 20% Dług techniczny (wybór inżynierii)
- 10% Innowacje/R&D (eksperymenty inżynieryjne)

Zasady:
- Zespół inżynieryjny wybiera zadania długu każdego sprinta
- Nie potrzeba uzasadnienia jeśli w ramach 20%
- Można "bankować" niewykorzystaną pojemność na większe projekty
```

**4. Czynienie Długu Widocznym:**

Stworzenie "Debt Transparency Board" w Jira:
- Każdy P0 incydent → ticket długu jeśli główna przyczyna to tech debt
- Miesięczny przegląd z liderami produktu
- Pokazanie kosztu: "Ten dług spowodował 40 godzin straty w tym miesiącu"

**5. Strategiczny Refactoring:**

Zamiast "zatrzymaj świat" refactoringu:

```
Przykład: Monolit → Microservices

Złe Podejście:
- Pauza funkcji na 6 miesięcy
- Migracja big bang
- Wysokie ryzyko

Dobre Podejście:
- Ekstrakcja serwisu podczas pracy nad funkcją
- "Jeśli tego dotykasz, możesz to refaktoryzować"
- Funkcja: Nowa metoda płatności → Ekstrakcja serwisu płatności
- Stopniowo, niskie ryzyko, dostarcza wartość przez cały czas
```

**Prawdziwy Przykład:**

**Sytuacja:** Produkt chciał 5 głównych funkcji. Inżynieria chciała zrefaktoryzować system autentykacji (krytyczny dług).

**Rozwiązanie:**
1. Pokazałem dane: Błędy auth powodowały 30% incydentów
2. Zaproponowałem: Zrób 4 funkcje + refactoring auth w tym samym czasie
3. Trade-off: 1 funkcja mniej, ale 30% mniej incydentów
4. Produkt zgodził się

**Wykonanie:**
- Refaktoryzacja auth stopniowo przez 3 miesiące
- Dostarczone 4 funkcje równolegle
- Wskaźnik incydentów spadł o 35%
- Faktycznie dostarczano funkcje szybciej (mniej gaszenia pożarów)

**Kluczowe Zasady:**
- Uczyń dług wymiernym, nie filozoficznym
- Daj zespołowi inżynieryjnemu autonomię w ramach granic
- Wiąż spłatę długu z wynikami biznesowymi
- Stopniowy refactoring podczas pracy nad funkcjami
- Buduj zaufanie przez dostarczanie

---

## 7. Opisz sytuację gdy budowałeś konsensus między wieloma zespołami z konkurencyjnymi priorytetami

**Odpowiedź:**

**Sytuacja:**
"Firma potrzebowała zunifikowanej bramy API. 5 zespołów miało różne wymagania i istniejące rozwiązania."

**Konkurencyjne Priorytety:**

```
Zespół Mobile: "Potrzebujemy <50ms opóźnienia"
Zespół Web: "Potrzebujemy wsparcia GraphQL"
Zespół Partnerów: "Potrzebujemy wersjonowania API & kompatybilności wstecznej"
Zespół Security: "Potrzebujemy OAuth 2.0 & rate limiting"
Zespół Platform (ja): "Potrzebujemy jednego rozwiązania, nie pięciu"
```

**Podejście:**

**Krok 1: Odkrycie (2 tygodnie)**
- Spotkanie z każdym zespołem indywidualnie
- Zrozumienie ich ograniczeń, nie tylko żądań
- Dokumentacja rzeczywistych wymagań vs. nice-to-have
- Identyfikacja wspólnej płaszczyzny

**Krok 2: Grupa Robocza (1 miesiąc)**
- Utworzenie międzyzespołowego komitetu (1 osoba z każdego zespołu)
- Ustalenie procesu podejmowania decyzji:
  - Preferowany konsensus
  - Jeśli brak konsensusu: Głosowanie (większość rządzi)
  - Rozstrzygający: Zespół Platform (ja)

**Krok 3: Framework Ewaluacji**
Stworzenie wspólnych kryteriów (zespoły ważyły współpracując):

```
Kryteria (ważone):
1. Wydajność: 30%
2. Funkcje: 25%
3. Złożoność operacyjna: 20%
4. Wysiłek migracji: 15%
5. Koszt: 10%

Kandydaci:
- Kong
- AWS API Gateway
- Apigee
- Własne rozwiązanie
```

**Krok 4: Proof of Concept (1 miesiąc)**
- Każdy zespół prototypował swój top wybór
- Dzielone koszty infrastruktury
- Mierzenie względem kryteriów
- Demo day: Każdy zespół prezentował

**Krok 5: Decyzja**
- Punktowanie względem frameworka
- Kong wygrał (bliska druga: AWS API Gateway)
- Zespół Mobile zaniepokojony opóźnieniem

**Radzenie sobie z Sprzeciwem:**

Zespół Mobile: "Kong dodaje 15ms opóźnienia, nie możemy tego zaakceptować"

**Moja odpowiedź:**
1. "Słyszę cię. Opóźnienie ma znaczenie. Zagłębmy się."
2. Analiza: Większość opóźnienia z sieci, nie Kong
3. Propozycja: Edge deployment (jak CDN) dla ruchu mobile
4. Test: Zredukowane opóźnienie do <10ms
5. Zespół Mobile: "To działa!"

**Krok 6: Wdrożenie (3 miesiące)**
- Stworzenie playbooka migracji
- Zespół Platform zapewnił wsparcie migracji
- Każdy zespół migrował we własnym tempie
- Cotygodniowy sync aby dzielić się naukami

**Rezultat:**
- Wszystkie 5 zespołów zmigrowało do Kong
- Skonsolidowane 3 różne bramy
- Zredukowane koszty operacyjne o 60%
- Opóźnienie Mobile: 8ms (lepiej niż wcześniej!)
- Zdobyte poparcie początkowych sceptyków
- Grupa robocza stała się modelem dla przyszłych decyzji

**Lekcje:**
- Zacznij od indywidualnych rozmów
- Stwórz obiektywny framework decyzyjny
- Daj zespołom sprawczość w procesie
- Adresuj obawy danymi i prototypami
- Uczyń decyzję transparentną i odwracalną (jeśli potrzeba)
- Wspieraj zespoły przez implementację

---

## 8. Jak skalowaś siebie gdy organizacja rośnie?

**Odpowiedź:**

"Widziałem jak moja organizacja urosła z 30 do 300 inżynierów. Tak się skalowałem:

**Faza 1: Individual Contributor (30 inżynierów)**
**Co działało:**
- Bezpośredni przegląd wszystkich głównych projektów
- Częste programowanie w parach z inżynierami
- Samodzielne pisanie znaczącego kodu

**Co przestało działać na większą skalę:**
- Stałem się wąskim gardłem dla decyzji
- Kalendarz 100% zapełniony przeglądami
- Brak czasu na strategiczne myślenie

**Faza 2: Dźwignia przez Dokumentację (80 inżynierów)**

**Zmiana:**
- Pisanie architecture decision records (ADRs)
- Stworzenie frameworka przeglądu projektów
- Dokumentacja best practices i wzorców

**Przykład: Szablon Przeglądu Projektu**
```markdown
# Service Design Review

## Wymagane Sekcje:
1. Problem statement
2. Proponowane rozwiązanie
3. Rozważone alternatywy
4. Diagram przepływu danych
5. Tryby awarii & mitigacja
6. Analiza skalowalności
7. Rozważania operacyjne

## Proces Przeglądu:
- Self-review najpierw (użyj checklisty)
- Peer review (zespół)
- Principal review (dla wpływu międzyzespołowego)
```

**Wpływ:**
- 70% projektów nie potrzebowało mojego przeglądu
- Jakość się poprawiła (zespoły łapały problemy wcześniej)
- Mój czas uwolniony na pracę strategiczną

**Faza 3: Dźwignia przez Ludzi (150 inżynierów)**

**Zmiana:**
- Rozwinięcie Staff Engineers (awansowanie 3)
- Delegacja domen architektonicznych
- Skupienie na zagadnieniach przekrojowych

**Struktura:**
```
Principal Engineer (ja)
├── Staff Eng: Data Platform
├── Staff Eng: API & Services
├── Staff Eng: Frontend Architecture
└── Staff Eng: Infrastructure

Mój focus: Cross-domain, standardy, strategia
```

**Jak ich Upoważniłem:**
- Cotygodniowy Staff Eng sync
- Dałem im autorytet do podejmowania finalnych decyzji
- Popierałem ich decyzje publicznie
- Wkraczałem tylko przy konfliktach międzydomenowych

**Faza 4: Dźwignia przez Systemy (300 inżynierów)**

**Zmiana:**
- Budowa self-service platform
- Automatyczne barierki
- Skodyfikowana wiedza w narzędzia

**Przykłady:**

**1. Szablon Serwisu:**
```bash
$ create-service --name user-service --type api
✓ Scaffolded project structure
✓ Added CI/CD pipeline
✓ Configured observability
✓ Set up deployment
✓ Added security scanning

Wszystkie best practices: Wbudowane, nie dokumentowane
```

**2. Automatyczny Przegląd Architektury:**
```python
# Pre-commit hook
class ArchitectureValidator:
    def validate(self, code_changes):
        issues = []

        # Enforce patterns
        if new_database_call() and not using_connection_pool():
            issues.append("Use connection pooling")

        if new_api_endpoint() and not has_rate_limiting():
            issues.append("Add rate limiting")

        if new_service() and not has_health_check():
            issues.append("Add health check")

        return issues
```

**3. Engineering Portal:**
- Przeszukiwalna dokumentacja architektury
- Baza danych ADR
- Katalog serwisów
- Automatyczne grafy zależności
- Self-service tutoriale

**Jak Spędzam Czas Teraz (300 inżynierów):**

```
Alokacja Czasu:
- 30% Strategia (roadmapa, wizja, planowanie)
- 25% Przeglądy o wysokiej dźwigni (krytyczne projekty, incydenty)
- 20% Mentoring (Staff+ engineers)
- 15% Techniczne spike'i (dowód nowych konceptów)
- 10% Zewnętrzne (konferencje, rekrutacja, klienci)
```

**Zasady Których Przestrzegam:**

**1. Mnóż, Nie Dziel**
- Nie dziel czasu na wszystko
- Buduj systemy które skalują się beze mnie
- Twórz więcej liderów

**2. Pracuj nad Systemem, Nie w Systemie**
- Naprawiaj główne przyczyny, nie symptomy
- Automatyzuj powtarzające się decyzje
- Dokumentuj raz, odwołuj się na zawsze

**3. Zwiększaj Sygnał, Redukuj Szum**
- Filtruj: Co tylko ja mogę zrobić?
- Deleguj: Co inni mogą zrobić?
- Eliminuj: Co nie potrzebuje robienia?

**4. Inwestuj w Dźwignię**
- 1 godzina tworzenia szablonu = 100 godzin oszczędzone
- 1 godzina mentoringu Staff Eng = 1000 godzin zyskane
- 1 godzina automatyzacji decyzji = ∞ godzin oszczędzone

**Konkretny Przykład:**

**Problem:** Spędzanie 10 godzin/tydzień na przeglądaniu schematów baz danych

**Rozwiązanie:**
1. Analiza wzorców w feedbacku (Tydzień 1)
2. Stworzenie przewodnika projektowania schematów (Tydzień 2)
3. Budowa automatycznego walidatora (Tydzień 3)
4. Szkolenie Staff Engineers na edge cases (Tydzień 4)

**Rezultat:**
- Czas przeglądu: 10 godzin/tydzień → 2 godziny/tydzień
- Jakość schematów się poprawiła (wcześniejsze łapanie)
- Wiedza rozproszona po zespole

**To jest skalowanie: Przekształć czas w systemy.**"
