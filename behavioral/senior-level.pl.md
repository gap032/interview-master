# Pytania Behawioralne - Poziom Senior

## 1. Opowiedz o sytuacji, gdy nie zgadzałeś się z decyzją techniczną

**Pytanie**: Opisz konflikt techniczny i jak sobie z nim poradziłeś.

**Odpowiedź:**

**Sytuacja:**
"Zespół chciał przyjąć NoSQL dla wszystkich nowych serwisów, ale uważałem, że relacyjna baza danych byłaby lepsza dla naszego obciążenia transakcyjnego."

**Zadanie:**
"Znaleźć odpowiednie rozwiązanie zachowując jednocześnie spójność zespołu."

**Działanie:**
- Przygotowałem dane: porównanie modeli spójności, testy wydajnościowe
- Zorganizowałem dyskusję techniczną z konkretnymi przykładami
- Wysłuchałem obaw zespołu (skalowalność, elastyczność)
- Zaproponowałem rozwiązanie hybrydowe: NoSQL dla cache'owania/sesji, SQL dla transakcji
- Stworzyłem macierz decyzyjną dla przyszłych wyborów baz danych

**Rezultat:**
"Zespół przyjął podejście hybrydowe. Stworzyliśmy wytyczne zapobiegające przyszłym niejasnościom. System działał dobrze pod obciążeniem."

**Kluczowe Punkty:**
- Popieraj sprzeciwy danymi
- Słuchaj, aby zrozumieć perspektywę innych
- Skup się na celach zespołu, nie na tym, żeby mieć rację
- Dokumentuj decyzje dla przyszłego odniesienia

---

## 2. Jak radzisz sobie z długiem technicznym?

**Odpowiedź:**

"Traktuję dług techniczny jako decyzję biznesową wymagającą równowagi:

**Śledzenie:**
- Prowadzę backlog elementów długu technicznego
- Kategoryzuję według ryzyka i wpływu
- Szacuję nakład pracy potrzebny do naprawy

**Priorytetyzacja:**
- Luki w bezpieczeństwie: natychmiastowo
- Problemy z wydajnością wpływające na użytkowników: wysoki priorytet
- Usprawnienia jakości kodu: w równowadze z nowymi funkcjonalnościami

**Komunikacja:**
- Tłumaczę dług w kategoriach biznesowych dla interesariuszy
- Pokazuję koszty nieadresowania (wolniejszy rozwój, błędy)
- Rezerwuję 20% pojemności sprintu na redukcję długu

**Przykład:**
Mieliśmy legacy serwis płatności bez testów. Zamiast pełnego przepisania:
1. Dodałem testy dla krytycznych ścieżek
2. Refaktoryzowałem przyrostowo podczas pracy nad funkcjonalnościami
3. Po 6 miesiącach: 80% pokrycia, redukcja błędów o 60%"

---

## 3. Opisz sytuację, gdy mentorowałeś młodszego programistę

**Pytanie**: Opowiedz o swoim doświadczeniu w mentorowaniu mniej doświadczonych inżynierów.

**Odpowiedź:**

**Sytuacja:**
"Młodszy programista dołączył do naszego zespołu, aby pracować nad naszą platformą mikroserwisową. Miał solidną wiedzę akademicką, ale ograniczone doświadczenie produkcyjne."

**Zadanie:**
"Pomóc mu stać się produktywnym jednocześnie budując jego pewność siebie i umiejętności."

**Działanie:**
- **Programowanie w Parach (Tydzień 1-2):** Zacząłem od codziennych sesji parowania przy małych, dobrze zdefiniowanych zadaniach
- **Stopniowe Przekazywanie Odpowiedzialności:** Dałem mu pierwsze samodzielne zadanie (dodanie nowego endpointu API) z jasnymi wymaganiami
- **Code Review jako Narzędzie Nauczania:** Wykorzystywałem przeglądy PR jako okazje do nauki, tłumacząc "dlaczego", nie tylko "co"
  - Przykład: Wyjaśniłem, dlaczego używamy dependency injection dla testowalności
  - Udostępniłem dokument ze standardami kodowania zespołu
- **Regularne Rozmowy 1-na-1:** Cotygodniowe spotkania, aby omówić blokery, odpowiedzieć na pytania, dzielić się zasobami
- **Zachęcanie do Pytań:** Stworzyłem bezpieczne środowisko - "nie ma głupich pytań"
- **Dzielenie się Wiedzą:** Przydzieliłem mu prezentację tematu technicznego dla zespołu (wybrał podstawy Kubernetes)

**Rezultat:**
- Po 3 miesiącach: samodzielnie dostarczał funkcjonalności z minimalnym nadzorem
- Jego prezentacja pomogła 2 innym członkom zespołu lepiej zrozumieć naszą konfigurację K8s
- Został mentorem dla następnego młodszego pracownika
- Otrzymał pozytywną opinię w swojej pierwszej ocenie wydajności

**Kluczowe Punkty:**
- Zacznij od małych zadań, stopniowo zwiększaj złożoność
- Uczyń naukę dwukierunkową (ja też się uczyłem)
- Świętuj małe zwycięstwa, aby budować pewność siebie
- Dostarczaj kontekst, nie tylko instrukcje
- Regularna informacja zwrotna jest kluczowa

---

## 4. Opowiedz o sytuacji, gdy musiałeś podjąć trudny kompromis

**Pytanie**: Opisz sytuację, w której musiałeś zrównoważyć konkurujące priorytety.

**Odpowiedź:**

**Sytuacja:**
"Budowaliśmy nowy proces realizacji zakupu. Dział produktu chciał rozbudowanych funkcji testów A/B. Inżynieria chciała zrefaktoryzować legacy integrację płatności. Termin był napięty - 6 tygodni do uruchomienia."

**Zadanie:**
"Dostarczyć wartość zarządzając jednocześnie ograniczeniami technicznymi i biznesowymi."

**Działanie:**

**Analiza:**
- Stworzyłem macierz decyzyjną z trzema opcjami:
  1. Pełny zestaw funkcjonalności + refaktoryzacja (12 tygodni)
  2. Pełne funkcjonalności, bez refaktoryzacji (8 tygodni, zwiększony dług techniczny)
  3. Funkcjonalności MVP + krytyczna refaktoryzacja (6 tygodni)

**Komunikacja z Interesariuszami:**
- Spotkałem się z działem produktu: wyjaśniłem ograniczenia techniczne
- Pokazałem dane: obecny kod płatności miał 15 błędów w ostatnim kwartale
- Zaproponowałem MVP: Pojedynczy framework testów A/B, rozbudowa później
- Wyjaśniłem ryzyko: pominięcie refaktoryzacji = wolniejszy przyszły rozwój

**Kompromis:**
- Dostarczyłem MVP kasy z podstawowymi testami A/B
- Zrefaktoryzowałem warstwę walidacji płatności (obszar z największą liczbą błędów)
- Zaplanowałem Fazę 2 (zaawansowane funkcje A/B) na następny kwartał
- Udokumentowałem elementy długu technicznego dla integracji płatności

**Rezultat:**
- Uruchomienie na czas (6 tygodni)
- Błędy płatności zredukowane o 60% w następnym kwartale
- Testy A/B wykorzystane pomyślnie w 3 eksperymentach
- Funkcjonalności Fazy 2 dostarczone 8 tygodni później
- Zbudowałem zaufanie z zespołem produktu przez transparentność

**Kluczowe Lekcje:**
- Używaj danych do wspierania decyzji
- Czyń kompromisy jawne i widoczne
- Obiecuj mniej, dostarczaj więcej
- Jakość techniczna umożliwia przyszłą prędkość

---

## 5. Jak radzisz sobie z konfliktowymi priorytetami od różnych interesariuszy?

**Odpowiedź:**

"Nauczyłem się, że konfliktowe priorytety to okazje do wyrównania wspólnych celów:

**Framework Rozwiązywania:**

**1. Zrozum 'Dlaczego':**
- Nie tylko zbieraj wymagania - zrozum wpływ biznesowy
- Pytaj: 'Jaki problem rozwiązujemy? Co się stanie, jeśli poczekamy?'
- Przykład: Dział sprzedaży pilnie potrzebuje funkcjonalności X. Dlaczego? Zamknięcie umowy na 2 miliony zależy od tego.

**2. Kwantyfikuj Wpływ:**
- Przekształć żądania na metryki biznesowe
- Poprawka bezpieczeństwa: Chroni 50 milionów przychodu
- Nowa funkcjonalność: Może wygenerować 200 tysięcy rocznego przychodu
- Wydajność: Redukuje rezygnacje o 5% = 100 tysięcy zaoszczędzonych

**3. Ułatwiaj Dyskusję:**
- Zbierz interesariuszy razem (nie bądź pośrednikiem)
- Przedstaw porównanie oparte na danych
- Pozwól im zobaczyć pełny obraz
- Przykładowe spotkanie:
  ```
  Sprzedaż: Potrzebujemy funkcjonalności X dla klienta
  Bezpieczeństwo: Potrzebujemy wdrożenia krytycznej łatki
  Produkt: Potrzebujemy aktualizacji analityki

  Moja rola: Przedstawić pojemność (40 godzin), szacowane nakłady i wpływ
  Grupa decyduje: Bezpieczeństwo (20h) + Funkcjonalność X (20h), Analityka odroczona
  ```

**4. Dokumentuj i Komunikuj:**
- Publikuj decyzję i uzasadnienie
- Ustal oczekiwania dla odroczonej pracy
- Przeglądaj kwartalnie

**Prawdziwy Przykład:**
Marketing chciał integracji nowej strony landing page. Wsparcie chciało ulepszeń panelu klienta. Bezpieczeństwo zgłosiło lukę SQL injection.

**Moje podejście:**
1. Bezpieczeństwo: Natychmiast (1 dzień) - bez negocjacji
2. Panel wsparcia: Wysoki wpływ na retencję (3 dni)
3. Marketing: Nice to have, ale nie pilne (następny sprint)

**Wynik:**
- Bezpieczeństwo naprawione natychmiast
- Panel dostarczony, zgłoszenia wsparcia zredukowane o 30%
- Marketing zaakceptował opóźnienie po zobaczeniu logiki priorytetyzacji
- Ustanowiono jasną ścieżkę eskalacji dla przyszłych konfliktów

**Kluczowe Zasady:**
- Transparentność buduje zaufanie
- Dane pokonują opinie
- Wspólne zrozumienie pokonuje kompromis
- Dokumentuj decyzje dla odpowiedzialności"

---

## 6. Opisz sytuację, gdy musiałeś radzić sobie z poważnym incydentem produkcyjnym

**Pytanie**: Opowiedz o sytuacji, gdy odpowiadałeś na krytyczny problem produkcyjny.

**Odpowiedź:**

**Sytuacja:**
"Alarm o 3 nad ranem: Czasy odpowiedzi API wzrosły z 200ms do 8 sekund. Przetwarzanie płatności przekraczało limit czasu. Weekend Black Friday - szczytowy ruch."

**Zadanie:**
"Przywrócić usługę szybko minimalizując stratę przychodów i zapobiegając ponownemu wystąpieniu."

**Działanie:**

**Natychmiastowa Reakcja (Pierwsze 15 minut):**
1. Potwierdziłem incydent, dołączyłem do kanału Slack war room
2. Sprawdziłem dashboardy monitoringu (Datadog, Cloudwatch)
3. Zidentyfikowałem symptom: Pula połączeń z bazą danych wyczerpana
4. Szybkie łagodzenie: Zwiększyłem rozmiar puli połączeń (10 → 50)
5. Rezultat: Czasy odpowiedzi spadły do 2 sekund (lepiej, ale nie normalnie)

**Analiza Przyczyny Źródłowej (Następne 30 minut):**
1. Przejrzałem ostatnie wdrożenia: Nowy serwis rekomendacji wdrożony 2 godziny wcześniej
2. Sprawdziłem zapytania do bazy: Nowy serwis wykonywał zapytania N+1
3. Każda strona produktu: 1 zapytanie stało się 50+ zapytaniami
4. CPU bazy danych: 95% wykorzystania

**Rozwiązanie:**
1. Wycofałem wdrożenie serwisu rekomendacji
2. Czasy odpowiedzi wróciły do normy (200ms)
3. Ruch odzyskany, płatności przetwarzane normalnie
4. Całkowity przestój: 45 minut, szacowana strata: 50 tysięcy przychodu

**Po Incydencie (Następny Dzień):**
1. Napisałem raport incydentu (timeline, wpływ, przyczyna źródłowa, lekcje)
2. Zaplanowałem blameless postmortem z zespołem
3. Zadania do wykonania:
   - Dodać testy wydajności zapytań do CI/CD
   - Wdrożyć alerty logowania zapytań bazodanowych
   - Strategia stopniowego wdrażania (canary deployments)
   - Wymaganie testów obciążeniowych dla nowych serwisów

**Kontynuacja (2 tygodnie):**
- Naprawiłem zapytanie N+1 używając eager loading
- Dodałem testy integracyjne z asercjami liczby zapytań
- Skonfigurowałem Datadog APM do monitorowania wydajności zapytań
- Wdrożyłem canary deployment (5% → 50% → 100%)
- Ponownie wdrożyłem pomyślnie z monitoringiem

**Rezultat:**
- Brak podobnych incydentów w następnych 6 miesiącach
- Zespół nauczył się wartości testowania wydajności
- Ulepszone praktyki bezpieczeństwa wdrożeń
- Udokumentowany playbook reagowania na incydenty

**Kluczowe Punkty:**
- Zachowaj spokój, postępuj według playbooka
- Najpierw łagodzenie, potem przyczyna źródłowa
- Blameless postmortems napędzają naukę
- Incydenty to okazje do ulepszania systemów
- Dokumentacja pomaga następnym razem

**Co Zrobiłbym Inaczej:**
- Powinienem mieć lepsze testy obciążeniowe przed Black Friday
- Mógłbym włączyć logowanie wolnych zapytań bazodanowych wcześniej
- Canary deployments powinny być standardową praktyką

---

## 7. Jak wpływasz na decyzje techniczne, gdy nie jesteś decydentem?

**Odpowiedź:**

"Jako senior inżynier, często muszę wpływać bez formalnego autorytetu:

**Strategie:**

**1. Buduj Wiarygodność:**
- Konsekwentnie wywiązuj się z zobowiązań
- Przyznawaj się, gdy czegoś nie wiesz
- Dawaj uznanie pomysłom innych
- Przykład: Gdy junior zasugerował alternatywne podejście, pomogłem go prototypować, przypisałem mu zasługi na spotkaniu zespołu

**2. Używaj Danych i Prototypów:**
- Nie tylko argumentuj - demonstruj
- Przykład: Zespół debatował GraphQL vs REST
  - Zbudowałem mały proof-of-concept w weekend
  - Pokazałem elastyczność zapytań, metryki wydajności
  - Zespół podjął świadomą decyzję (wybrał GraphQL)

**3. Formułuj w Kategoriach Wyników:**
- Łącz wybory techniczne z wpływem biznesowym
- Źle: 'Powinniśmy zrefaktoryzować ten kod, jest bałaganiarski'
- Dobrze: 'Ten kod spowodował 8 błędów w 3 miesiące. Refaktoryzacja zmniejszyłaby czas debugowania o ~40%'

**4. Słuchaj i Uwzględniaj Feedback:**
- Staraj się zrozumieć przeciwstawne punkty widzenia
- Znajdź wspólną płaszczyznę
- Przykład: Architekt chciał mikroserwisów, ja preferowałem monolit
  - Zapytałem: 'Jakie problemy próbujesz rozwiązać?'
  - Odpowiedź: Niezależność zespołów, elastyczność wdrożeń
  - Kompromis: Modularny monolit z jasnymi granicami, łatwy do podziału później

**5. Mądrze Wybieraj Bitwy:**
- Nie każda decyzja techniczna wymaga mojego wkładu
- Skup się na obszarach wysokiego wpływu
- Pozwól zespołowi być właścicielem decyzji, gdy stawka jest niska

**Prawdziwy Przykład:**

**Sytuacja:** Engineering manager chciał przyjąć nowy framework testowy (Cypress). Wierzyłem, że nasze obecne rozwiązanie (Jest + Testing Library) było wystarczające.

**Moje podejście:**
1. Zadałem pytania wyjaśniające: Co nie działa z obecnym rozwiązaniem?
2. Odpowiedź: Testy E2E są niestabilne, trudne do debugowania
3. Zaproponowałem: Naprawmy przyczynę źródłową (problemy async, lepsze selektory)
4. Stworzyłem spike: Ulepszyłem istniejące testy, udokumentowałem najlepsze praktyki
5. Rezultat: Niezawodność testów poprawiona o 80%, uniknięto kosztów migracji
6. Manager docenił podejście oparte na danych

**Gdy Się Myliłem:**

Zespół chciał przyjąć TypeScript. Byłem sceptyczny (krzywa uczenia, nakład migracji).

**Co zmieniło moje zdanie:**
- Junior dev pokazał mi, jak typy złapały 3 błędy w PR
- Zespół był entuzjastyczny i gotowy inwestować w naukę
- Zaproponowałem strategię stopniowego przyjęcia
- Rezultat: TypeScript poprawił jakość kodu, myliłem się stawiając opór

**Kluczowy Wniosek:**
- Wpływaj przez dowody, empatię i wykonanie
- Bądź gotowy zostać udowodnionym, że się mylisz
- Silne opinie, słabo trzymane"
