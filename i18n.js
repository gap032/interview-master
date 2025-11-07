// Internationalization (i18n) - Language translations
const translations = {
    en: {
        // Header & Navigation
        appTitle: "Interview Prep",
        navMaterials: "Materials",
        navQuiz: "Quiz",
        navStats: "Statistics",

        // Welcome Section
        welcomeTitle: "Welcome to Interview Prep!",
        welcomeSubtitle: "Select a category and level from the left menu to start learning.",
        statFiles: "Material Files",
        statQuestions: "Quiz Questions",
        statCategories: "Technical Categories",

        // Categories
        catCategories: "Categories",
        catAll: "All",
        catAlgorithms: "Data Structures & Algorithms",
        catSystemDesign: "System Design",
        catProgramming: "Programming Languages",
        catArchitecture: "Architecture",
        catDatabases: "Databases",
        catDevOps: "DevOps & Cloud",
        catBehavioral: "Behavioral",
        catCompetitiveProgramming: "Competitive Programming (C#)",

        // Levels
        levelMid: "Mid",
        levelSenior: "Senior",
        levelPrincipal: "Principal",

        // Quiz Section
        quizTitle: "Test Your Knowledge!",
        quizSubtitle: "Choose category and difficulty level",
        quizCategory: "Category:",
        quizLevel: "Level:",
        quizCount: "Number of questions:",
        quizStart: "Start Quiz",
        quizQuit: "Quit",
        quizNext: "Next Question",
        quizQuestion: "Question",
        quizOf: "of",
        quizNoQuestions: "No questions available for selected criteria!",

        // Quiz Categories (dropdown)
        quizAllCategories: "All categories",
        quizAllLevels: "All levels",
        quizMidLevel: "Mid-Level",
        quizSeniorLevel: "Senior-Level",
        quizPrincipalLevel: "Principal-Level",

        // Quiz Question Count
        quiz5Questions: "5 questions",
        quiz10Questions: "10 questions",
        quiz20Questions: "20 questions",
        quiz50Questions: "50 questions",

        // Quiz Results
        resultsExcellent: "Excellent! 🎉",
        resultsGood: "Very Good! ⭐",
        resultsAverage: "Not Bad! 👍",
        resultsPoor: "You Need More Practice 📚",
        resultsDetails: "Details",
        resultsYourAnswer: "Your answer:",
        resultsCorrect: "Correct:",
        resultsRetry: "Try Again",
        resultsNewQuiz: "New Quiz",

        // Statistics
        statsTitle: "Your Statistics",
        statsCompleted: "Completed Quizzes",
        statsAverage: "Average Score",
        statsBest: "Best Score",
        statsStreak: "Day Streak",
        statsByCategory: "Results by Category",
        statsQuizzes: "quizzes",
        statsCorrect: "correct",
        statsReset: "Reset Statistics",
        statsNoData: "No quizzes completed yet",

        // Loading & Errors
        loading: "Loading...",
        errorLoading: "Error Loading File",
        errorMessage: "Could not load file:",
        errorServer: "Make sure the app is hosted on a server (doesn't work with file://)",

        // Footer
        footerGithub: "GitHub Repository",

        // Buttons & Actions
        btnClose: "Close",
        btnSave: "Save",
        btnCancel: "Cancel",

        // Misc
        loading: "Loading...",
        explanation: "Explanation:",

        // Error messages
        errorLoadingFile: "Error Loading File",
        errorCannotLoad: "Cannot load file:",
        errorServerRequired: "Make sure the application is hosted on a server (doesn't work with file://)"
    },
    pl: {
        // Header & Navigation
        appTitle: "Interview Prep",
        navMaterials: "Materiały",
        navQuiz: "Quiz",
        navStats: "Statystyki",

        // Welcome Section
        welcomeTitle: "Witaj w Interview Prep!",
        welcomeSubtitle: "Wybierz kategorię i poziom z menu po lewej, aby rozpocząć naukę.",
        statFiles: "Plików z materiałami",
        statQuestions: "Pytań quizowych",
        statCategories: "Kategorii technicznych",

        // Categories
        catCategories: "Kategorie",
        catAll: "Wszystkie",
        catAlgorithms: "Struktury Danych i Algorytmy",
        catSystemDesign: "Projektowanie Systemów",
        catProgramming: "Języki Programowania",
        catArchitecture: "Architektura",
        catDatabases: "Bazy Danych",
        catDevOps: "DevOps i Cloud",
        catBehavioral: "Pytania Behawioralne",
        catCompetitiveProgramming: "Programowanie Konkursowe (C#)",

        // Levels
        levelMid: "Mid",
        levelSenior: "Senior",
        levelPrincipal: "Principal",

        // Quiz Section
        quizTitle: "Sprawdź swoją wiedzę!",
        quizSubtitle: "Wybierz kategorię i poziom trudności quizu",
        quizCategory: "Kategoria:",
        quizLevel: "Poziom:",
        quizCount: "Liczba pytań:",
        quizStart: "Rozpocznij Quiz",
        quizQuit: "Zakończ",
        quizNext: "Następne pytanie",
        quizQuestion: "Pytanie",
        quizOf: "z",
        quizNoQuestions: "Brak pytań dla wybranych kryteriów!",

        // Quiz Categories (dropdown)
        quizAllCategories: "Wszystkie kategorie",
        quizAllLevels: "Wszystkie poziomy",
        quizMidLevel: "Mid-Level",
        quizSeniorLevel: "Senior-Level",
        quizPrincipalLevel: "Principal-Level",

        // Quiz Question Count
        quiz5Questions: "5 pytań",
        quiz10Questions: "10 pytań",
        quiz20Questions: "20 pytań",
        quiz50Questions: "50 pytań",

        // Quiz Results
        resultsExcellent: "Doskonale! 🎉",
        resultsGood: "Bardzo dobrze! ⭐",
        resultsAverage: "Nieźle! 👍",
        resultsPoor: "Potrzebujesz więcej praktyki 📚",
        resultsDetails: "Szczegóły",
        resultsYourAnswer: "Twoja odpowiedź:",
        resultsCorrect: "Poprawna:",
        resultsRetry: "Spróbuj ponownie",
        resultsNewQuiz: "Nowy quiz",

        // Statistics
        statsTitle: "Twoje Statystyki",
        statsCompleted: "Ukończonych quizów",
        statsAverage: "Średni wynik",
        statsBest: "Najlepszy wynik",
        statsStreak: "Dni z rzędu",
        statsByCategory: "Wyniki według kategorii",
        statsQuizzes: "quizów",
        statsCorrect: "poprawnych",
        statsReset: "Resetuj statystyki",
        statsNoData: "Nie ukończono jeszcze żadnych quizów",

        // Loading & Errors
        loading: "Ładowanie...",
        errorLoading: "Błąd ładowania pliku",
        errorMessage: "Nie można załadować pliku:",
        errorServer: "Upewnij się, że aplikacja jest hostowana na serwerze (nie działa z file://)",

        // Footer
        footerGithub: "Repozytorium GitHub",

        // Buttons & Actions
        btnClose: "Zamknij",
        btnSave: "Zapisz",
        btnCancel: "Anuluj",

        // Misc
        loading: "Ładowanie...",
        explanation: "Wyjaśnienie:",

        // Error messages
        errorLoadingFile: "Błąd ładowania pliku",
        errorCannotLoad: "Nie można załadować pliku:",
        errorServerRequired: "Upewnij się, że aplikacja jest hostowana na serwerze (nie działa z file://)"
    }
};

// Current language
let currentLanguage = 'en';

// Get translation
function t(key) {
    return translations[currentLanguage][key] || key;
}

// Change language
function changeLanguage(lang) {
    if (!translations[lang]) return;

    currentLanguage = lang;
    localStorage.setItem('preferredLanguage', lang);
    updateUI();
}

// Update all UI text
function updateUI() {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = t(key);

        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = translation;
        } else if (element.tagName === 'OPTION') {
            // For option elements, just set text content
            element.textContent = translation;
        } else {
            // Preserve HTML structure, only replace text
            const html = element.innerHTML;
            if (html.includes('<i ')) {
                // Has icon(s), preserve them
                const icons = html.match(/(<i[^>]*>.*?<\/i>)/g) || [];

                // Check if icon is at the start or end
                const startsWithIcon = html.trim().startsWith('<i ');
                const endsWithIcon = html.trim().match(/<\/i>\s*$/);

                if (icons.length > 0) {
                    if (startsWithIcon && endsWithIcon) {
                        // Icons on both sides
                        element.innerHTML = icons[0] + ' ' + translation + ' ' + icons[icons.length - 1];
                    } else if (startsWithIcon) {
                        // Icon before text
                        element.innerHTML = icons[0] + ' ' + translation;
                    } else if (endsWithIcon) {
                        // Icon after text
                        element.innerHTML = translation + ' ' + icons[icons.length - 1];
                    } else {
                        // Icon somewhere in the middle, just set text
                        element.textContent = translation;
                    }
                } else {
                    element.textContent = translation;
                }
            } else {
                element.textContent = translation;
            }
        }
    });

    // Update language selector
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === currentLanguage);
    });

    // Update statistics display if the function exists
    if (typeof updateStatsDisplay === 'function') {
        updateStatsDisplay();
    }
}

// Initialize language on page load
function initializeLanguage() {
    // Check for saved preference
    const saved = localStorage.getItem('preferredLanguage');
    if (saved && translations[saved]) {
        currentLanguage = saved;
    } else {
        // Default to English
        currentLanguage = 'en';
    }

    // Setup language switcher (dropdown)
    const dropdown = document.getElementById('language-selector');
    if (dropdown) {
        dropdown.value = currentLanguage;
        dropdown.addEventListener('change', (e) => {
            changeLanguage(e.target.value);
        });
    }

    updateUI();
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { t, changeLanguage, initializeLanguage };
}
