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
