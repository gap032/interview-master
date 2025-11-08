# Pytania Behawioralne - Poziom Senior

## 1. Opowiedz o sytuacji, gdy nie zgodziłeś się z decyzją techniczną

**Pytanie**: Opisz techniczną niezgodę i jak sobie z nią poradziłeś.

**Odpowiedź:**

**Sytuacja:**
"Zespół chciał przyjąć NoSQL dla wszystkich nowych serwisów, ale uważałem, że relacyjna baza danych jest lepsza dla naszego obciążenia transakcyjnego."

**Zadanie:**
"Znaleźć właściwe rozwiązanie zachowując jednocześnie spójność zespołu."

**Działanie:**
- Przygotowałem dane: porównanie modeli spójności, testy wydajności
- Zorganizowałem dyskusję techniczną z konkretnymi przykładami
- Słuchałem obaw zespołu (skalowalność, elastyczność)
- Zaproponowałem hybrydę: NoSQL dla cachingu/sesji, SQL dla transakcji
- Stworzyłem macierz decyzyjną dla przyszłych wyborów baz danych

**Rezultat:**
"Zespół przyjął podejście hybrydowe. Stworzyliśmy wytyczne zapobiegające przyszłym nieporozumieniom. System działał dobrze pod obciążeniem."

**Kluczowe Punkty:**
- Wspieraj niezgody danymi
- Słuchaj aby zrozumieć perspektywy innych
- Skup się na celach zespołu, a nie na racji
- Dokumentuj decyzje dla przyszłego odniesienia

---

## 2. Jak radzisz sobie z długiem technicznym?

**Odpowiedź:**

"Traktuję dług techniczny jako decyzję biznesową wymagającą balansu:

**Śledzenie:**
- Utrzymuję backlog elementów długu technicznego
- Kategoryzuję według ryzyka i wpływu
- Szacuję wysiłek potrzebny do naprawy

**Priorytetyzacja:**
- Luki bezpieczeństwa: natychmiastowo
- Problemy wydajności wpływające na użytkowników: wysoki priorytet
- Poprawy jakości kodu: balansowane z funkcjonalnościami

**Komunikacja:**
- Wyjaśniam dług w kategoriach biznesowych dla interesariuszy
- Pokazuję koszt nieadresowania (wolniejszy rozwój, błędy)
- Rezerwuję 20% pojemności sprintu na redukcję długu

**Przykład:**
Miałem legacy serwis płatności bez testów. Zamiast pełnego przepisania:
1. Dodałem testy dla krytycznych ścieżek
2. Refaktoryzowałem stopniowo podczas pracy nad funkcjonalnościami
3. Po 6 miesiącach: 80% pokrycia, zredukowane błędy o 60%"
