// Global state
let currentQuiz = {
    questions: [],
    currentQuestion: 0,
    answers: [],
    score: 0
};

let stats = {
    totalQuizzes: 0,
    totalQuestions: 0,
    correctAnswers: 0,
    quizHistory: [],
    categoryStats: {}
};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initializeLanguage();  // Initialize i18n first
    loadStats();
    initializeNavigation();
    initializeMaterialsSection();
    initializeQuizSection();
    initializeStatsSection();
    updateStatsDisplay();
});

// Navigation
function initializeNavigation() {
    const navBtns = document.querySelectorAll('.nav-btn');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.dataset.section;

            // Update active nav button
            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Show corresponding section
            document.querySelectorAll('.content-section').forEach(s => {
                s.classList.remove('active');
            });
            document.getElementById(`${section}-section`).classList.add('active');
        });
    });
}

// Materials Section
function initializeMaterialsSection() {
    const levelButtons = document.querySelectorAll('.level-btn');

    levelButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const file = btn.dataset.file;
            loadMarkdownFile(file);

            // Update active state
            levelButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

async function loadMarkdownFile(filepath) {
    const contentDiv = document.getElementById('content');
    const welcomeDiv = document.getElementById('welcome');
    const loadingDiv = document.getElementById('loading');

    // Show loading
    welcomeDiv.style.display = 'none';
    contentDiv.style.display = 'none';
    loadingDiv.style.display = 'block';

    try {
        let markdown;

        // Get current language (default to 'en')
        const language = (typeof currentLanguage !== 'undefined') ? currentLanguage : 'en';

        // Try to get from embedded data first (offline support)
        if (typeof MATERIALS_DATA !== 'undefined') {
            // Try language-specific version first, fallback to English
            const langData = MATERIALS_DATA[language] || MATERIALS_DATA['en'];
            if (langData && langData[filepath]) {
                markdown = langData[filepath];
                console.log(`Loaded from embedded data (${language}): ${filepath}`);
            } else {
                throw new Error(`Material not found in embedded data: ${filepath}`);
            }
        } else {
            // Fallback to fetch if available (when hosted on server)
            // Try language-specific file first
            let fetchPath = filepath;
            if (language === 'pl' && filepath.endsWith('.md')) {
                fetchPath = filepath.replace('.md', '.pl.md');
            }

            try {
                const response = await fetch(fetchPath);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                markdown = await response.text();
                console.log(`Loaded via fetch (${language}): ${fetchPath}`);
            } catch (fetchError) {
                // Fallback to English version
                if (language === 'pl') {
                    const response = await fetch(filepath);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    markdown = await response.text();
                    console.log(`Loaded via fetch (en fallback): ${filepath}`);
                } else {
                    throw fetchError;
                }
            }
        }

        // Convert markdown to HTML
        const html = marked.parse(markdown);

        // Display content
        contentDiv.innerHTML = html;

        // Highlight code blocks (if highlight.js is loaded)
        if (typeof hljs !== 'undefined') {
            contentDiv.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightElement(block);
            });
        } else {
            console.warn('highlight.js not loaded, skipping syntax highlighting');
        }

        loadingDiv.style.display = 'none';
        contentDiv.style.display = 'block';

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
        console.error('Error loading markdown:', error);
        contentDiv.innerHTML = `
            <div style="text-align: center; padding: 4rem; color: var(--danger-color);">
                <i class="fas fa-exclamation-triangle" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                <h2>${t('errorLoadingFile')}</h2>
                <p>${t('errorCannotLoad')} ${filepath}</p>
                <p style="color: var(--text-secondary); margin-top: 1rem;">
                    ${t('errorServerRequired')}
                </p>
            </div>
        `;
        loadingDiv.style.display = 'none';
        contentDiv.style.display = 'block';
    }
}

// Quiz Section
function initializeQuizSection() {
    const startQuizBtn = document.getElementById('start-quiz');
    const quitQuizBtn = document.getElementById('quit-quiz');
    const nextQuestionBtn = document.getElementById('next-question');
    const retryQuizBtn = document.getElementById('retry-quiz');
    const newQuizBtn = document.getElementById('new-quiz');

    startQuizBtn.addEventListener('click', startQuiz);
    quitQuizBtn.addEventListener('click', quitQuiz);
    nextQuestionBtn.addEventListener('click', nextQuestion);
    retryQuizBtn.addEventListener('click', () => {
        const category = document.getElementById('quiz-category').value;
        const level = document.getElementById('quiz-level').value;
        const count = parseInt(document.getElementById('quiz-count').value);
        startQuizWithParams(category, level, count);
    });
    newQuizBtn.addEventListener('click', resetQuiz);
}

function startQuiz() {
    console.log('[DEBUG] startQuiz() called');
    const category = document.getElementById('quiz-category').value;
    const level = document.getElementById('quiz-level').value;
    const count = parseInt(document.getElementById('quiz-count').value);

    console.log('[DEBUG] Quiz params:', { category, level, count, currentLanguage });
    startQuizWithParams(category, level, count);
}

function startQuizWithParams(category, level, count) {
    console.log('[DEBUG] startQuizWithParams() called with:', { category, level, count, currentLanguage });

    // Pass current language to get questions in the right language
    const questions = getFilteredQuestions(category, level, count, currentLanguage);

    console.log('[DEBUG] getFilteredQuestions() returned:', questions.length, 'questions');

    if (questions.length === 0) {
        console.error('[ERROR] No questions found for criteria:', { category, level, count, currentLanguage });
        alert(t('quizNoQuestions') || 'No questions available for selected criteria!');
        return;
    }

    console.log('[DEBUG] Starting quiz with', questions.length, 'questions');

    currentQuiz = {
        questions: questions,
        currentQuestion: 0,
        answers: [],
        score: 0
    };

    document.getElementById('quiz-start').style.display = 'none';
    document.getElementById('quiz-results').style.display = 'none';
    document.getElementById('quiz-questions').style.display = 'block';

    displayQuestion();
}

function displayQuestion() {
    const question = currentQuiz.questions[currentQuiz.currentQuestion];

    // Update progress
    const progress = ((currentQuiz.currentQuestion) / currentQuiz.questions.length) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;
    document.getElementById('progress-text').textContent =
        `${t('quizQuestion')} ${currentQuiz.currentQuestion + 1} ${t('quizOf')} ${currentQuiz.questions.length}`;

    // Display category (use translations)
    const categoryKey = 'cat' + question.category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
    const categoryMap = {
        'algorithms': 'catAlgorithms',
        'system-design': 'catSystemDesign',
        'programming': 'catProgramming',
        'architecture': 'catArchitecture',
        'databases': 'catDatabases',
        'devops': 'catDevOps',
        'behavioral': 'catBehavioral'
    };
    document.getElementById('question-category').textContent = t(categoryMap[question.category]) || question.category;

    // Display question
    document.getElementById('question-text').textContent = question.question;

    // Display answers
    const answersDiv = document.getElementById('answers');
    answersDiv.innerHTML = '';

    question.answers.forEach((answer, index) => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.textContent = answer;
        btn.onclick = () => selectAnswer(index);
        answersDiv.appendChild(btn);
    });

    document.getElementById('next-question').style.display = 'none';
}

function selectAnswer(answerIndex) {
    const question = currentQuiz.questions[currentQuiz.currentQuestion];
    const answerBtns = document.querySelectorAll('.answer-btn');

    // Disable all buttons
    answerBtns.forEach(btn => btn.disabled = true);

    // Mark selected answer
    answerBtns[answerIndex].classList.add('selected');

    // Show correct/incorrect
    const isCorrect = answerIndex === question.correct;

    if (isCorrect) {
        answerBtns[answerIndex].classList.remove('selected');
        answerBtns[answerIndex].classList.add('correct');
        currentQuiz.score++;
    } else {
        answerBtns[answerIndex].classList.add('incorrect');
        answerBtns[question.correct].classList.add('correct');
    }

    // Store answer
    currentQuiz.answers.push({
        questionIndex: currentQuiz.currentQuestion,
        selectedAnswer: answerIndex,
        correctAnswer: question.correct,
        isCorrect: isCorrect
    });

    // Show explanation if available
    if (question.explanation) {
        const explanationDiv = document.createElement('div');
        explanationDiv.className = 'explanation';
        explanationDiv.innerHTML = `
            <div style="margin-top: 1.5rem; padding: 1rem; background-color: var(--surface-light); border-radius: 8px; border-left: 4px solid ${isCorrect ? 'var(--success-color)' : 'var(--warning-color)'};">
                <strong><i class="fas fa-lightbulb"></i> Wyjaśnienie:</strong>
                <p style="margin-top: 0.5rem;">${question.explanation}</p>
            </div>
        `;
        document.getElementById('answers').appendChild(explanationDiv);
    }

    // Show next button
    document.getElementById('next-question').style.display = 'inline-flex';
}

function nextQuestion() {
    currentQuiz.currentQuestion++;

    if (currentQuiz.currentQuestion < currentQuiz.questions.length) {
        displayQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    const totalQuestions = currentQuiz.questions.length;
    const score = currentQuiz.score;
    const percentage = Math.round((score / totalQuestions) * 100);

    // Hide questions, show results
    document.getElementById('quiz-questions').style.display = 'none';
    document.getElementById('quiz-results').style.display = 'block';

    // Determine result icon and title
    const resultsIcon = document.getElementById('results-icon');
    const resultsTitle = document.getElementById('results-title');

    if (percentage >= 90) {
        resultsIcon.innerHTML = '<i class="fas fa-trophy"></i>';
        resultsIcon.className = 'results-icon excellent';
        resultsTitle.textContent = 'Doskonale! 🎉';
    } else if (percentage >= 70) {
        resultsIcon.innerHTML = '<i class="fas fa-star"></i>';
        resultsIcon.className = 'results-icon good';
        resultsTitle.textContent = 'Bardzo dobrze! ⭐';
    } else if (percentage >= 50) {
        resultsIcon.innerHTML = '<i class="fas fa-thumbs-up"></i>';
        resultsIcon.className = 'results-icon average';
        resultsTitle.textContent = 'Nieźle! 👍';
    } else {
        resultsIcon.innerHTML = '<i class="fas fa-book-reader"></i>';
        resultsIcon.className = 'results-icon poor';
        resultsTitle.textContent = 'Potrzebujesz więcej praktyki 📚';
    }

    // Display score
    document.getElementById('score-number').textContent = score;
    document.getElementById('score-total').textContent = `/ ${totalQuestions}`;
    document.getElementById('score-percentage').textContent = `${percentage}%`;

    // Display breakdown
    const breakdownDiv = document.getElementById('results-breakdown');
    breakdownDiv.innerHTML = '<h3><i class="fas fa-list-check"></i> Szczegóły</h3>';

    currentQuiz.answers.forEach((answer, index) => {
        const question = currentQuiz.questions[answer.questionIndex];
        const resultItem = document.createElement('div');
        resultItem.className = `result-item ${answer.isCorrect ? 'correct' : 'incorrect'}`;
        resultItem.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: start;">
                <div style="flex: 1;">
                    <strong>Pytanie ${index + 1}:</strong> ${question.question}
                </div>
                <div style="margin-left: 1rem;">
                    <i class="fas ${answer.isCorrect ? 'fa-check-circle' : 'fa-times-circle'}"
                       style="color: ${answer.isCorrect ? 'var(--success-color)' : 'var(--danger-color)'}; font-size: 1.5rem;"></i>
                </div>
            </div>
            ${!answer.isCorrect ? `
                <div style="margin-top: 0.5rem; font-size: 0.9rem; color: var(--text-secondary);">
                    Twoja odpowiedź: ${question.answers[answer.selectedAnswer]}<br>
                    Poprawna: ${question.answers[answer.correctAnswer]}
                </div>
            ` : ''}
        `;
        breakdownDiv.appendChild(resultItem);
    });

    // Save stats
    saveQuizStats(percentage);
    updateStatsDisplay();
}

function quitQuiz() {
    if (confirm('Czy na pewno chcesz zakończyć quiz? Postęp zostanie utracony.')) {
        resetQuiz();
    }
}

function resetQuiz() {
    currentQuiz = {
        questions: [],
        currentQuestion: 0,
        answers: [],
        score: 0
    };

    document.getElementById('quiz-questions').style.display = 'none';
    document.getElementById('quiz-results').style.display = 'none';
    document.getElementById('quiz-start').style.display = 'block';
}

// Statistics
function initializeStatsSection() {
    document.getElementById('reset-stats').addEventListener('click', () => {
        if (confirm('Czy na pewno chcesz zresetować wszystkie statystyki? Tej operacji nie można cofnąć.')) {
            stats = {
                totalQuizzes: 0,
                totalQuestions: 0,
                correctAnswers: 0,
                quizHistory: [],
                categoryStats: {}
            };
            saveStats();
            updateStatsDisplay();
        }
    });
}

function saveQuizStats(percentage) {
    const category = document.getElementById('quiz-category').value;

    stats.totalQuizzes++;
    stats.totalQuestions += currentQuiz.questions.length;
    stats.correctAnswers += currentQuiz.score;

    stats.quizHistory.push({
        date: new Date().toISOString(),
        category: category,
        score: currentQuiz.score,
        total: currentQuiz.questions.length,
        percentage: percentage
    });

    // Category stats
    if (!stats.categoryStats[category]) {
        stats.categoryStats[category] = {
            quizzes: 0,
            questions: 0,
            correct: 0
        };
    }
    stats.categoryStats[category].quizzes++;
    stats.categoryStats[category].questions += currentQuiz.questions.length;
    stats.categoryStats[category].correct += currentQuiz.score;

    saveStats();
}

function saveStats() {
    localStorage.setItem('interviewPrepStats', JSON.stringify(stats));
}

function loadStats() {
    const saved = localStorage.getItem('interviewPrepStats');
    if (saved) {
        stats = JSON.parse(saved);
    }
}

function updateStatsDisplay() {
    // Overall stats
    document.getElementById('total-quizzes').textContent = stats.totalQuizzes;

    const avgScore = stats.totalQuestions > 0
        ? Math.round((stats.correctAnswers / stats.totalQuestions) * 100)
        : 0;
    document.getElementById('avg-score').textContent = `${avgScore}%`;

    const bestScore = stats.quizHistory.length > 0
        ? Math.max(...stats.quizHistory.map(q => q.percentage))
        : 0;
    document.getElementById('best-score').textContent = `${bestScore}%`;

    // Calculate streak
    const streak = calculateStreak();
    document.getElementById('streak').textContent = streak;

    // Category breakdown
    const categoryBreakdownDiv = document.getElementById('category-breakdown');
    categoryBreakdownDiv.innerHTML = '';

    const categoryNames = {
        'all': t('catAll'),
        'algorithms': t('catAlgorithms'),
        'system-design': t('catSystemDesign'),
        'programming': t('catProgramming'),
        'architecture': t('catArchitecture'),
        'databases': t('catDatabases'),
        'devops': t('catDevOps'),
        'behavioral': t('catBehavioral')
    };

    Object.keys(stats.categoryStats).forEach(category => {
        const catStats = stats.categoryStats[category];
        const percentage = Math.round((catStats.correct / catStats.questions) * 100);

        const catDiv = document.createElement('div');
        catDiv.style.cssText = 'margin-bottom: 1.5rem;';
        catDiv.innerHTML = `
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <strong>${categoryNames[category] || category}</strong>
                <span>${percentage}%</span>
            </div>
            <div style="height: 8px; background-color: var(--bg-color); border-radius: 4px; overflow: hidden;">
                <div style="height: 100%; width: ${percentage}%; background: linear-gradient(90deg, var(--primary-color), var(--success-color)); transition: width 0.3s;"></div>
            </div>
            <div style="margin-top: 0.25rem; font-size: 0.85rem; color: var(--text-secondary);">
                ${catStats.quizzes} ${t('statsQuizzes')} • ${catStats.correct}/${catStats.questions} ${t('statsCorrect')}
            </div>
        `;
        categoryBreakdownDiv.appendChild(catDiv);
    });

    if (Object.keys(stats.categoryStats).length === 0) {
        categoryBreakdownDiv.innerHTML = `<p style="color: var(--text-secondary); text-align: center; padding: 2rem;">${t('statsNoData')}</p>`;
    }
}

function calculateStreak() {
    if (stats.quizHistory.length === 0) return 0;

    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Sort by date descending
    const sorted = [...stats.quizHistory].sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    let currentDate = new Date(today);
    const uniqueDates = new Set();

    for (let quiz of sorted) {
        const quizDate = new Date(quiz.date);
        quizDate.setHours(0, 0, 0, 0);
        const dateStr = quizDate.toISOString().split('T')[0];

        if (!uniqueDates.has(dateStr)) {
            uniqueDates.add(dateStr);

            if (quizDate.getTime() === currentDate.getTime() ||
                quizDate.getTime() === currentDate.getTime() - 86400000) {
                streak++;
                currentDate = new Date(quizDate);
                currentDate.setDate(currentDate.getDate() - 1);
            } else {
                break;
            }
        }
    }

    return streak;
}

// Configure marked options
marked.setOptions({
    highlight: function(code, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(code, { language: lang }).value;
            } catch (err) {}
        }
        return code;
    },
    breaks: true,
    gfm: true
});
