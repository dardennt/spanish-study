const TIMER_INITIAL_VALUE = 60;

let score = 0;
let timer = TIMER_INITIAL_VALUE;
let timerInterval = null;

function updateScore(value) {
    score += value;
    document.getElementById('score').innerText = score;
}

function resetTimer() {
    timer = TIMER_INITIAL_VALUE;
    document.getElementById('timer').innerText = timer;
}

function startTimer() {
    timerInterval = setInterval(() => {
        timer--;
        document.getElementById('timer').innerText = timer;
        if (timer <= 0) {
            clearInterval(timerInterval);
            alert('Temps écoulé ! Votre score est de ' + score);
            resetTimer();
            resetQuiz();
        }
    }, 1000);
}

function resetQuiz() {
    score = 0;
    document.getElementById('score').innerText = score;
    resetTimer();
    shuffleArray(shuffleBag);
    currentIndex = -1;
    pickNextConjugation();
}

document.getElementById('restart')
    .addEventListener('click', function () {
        clearInterval(timerInterval);
        timerInterval = null;
        resetQuiz();
    });

/**
 * Check the user's answer and provide feedback
 */
function checkAnswer() {
    const userAnswer = document.getElementById('answer').value.trim();
    const feedback = document.getElementById('feedback');

    if (userAnswer.toLowerCase() === currentConjugation.spanish) {
        feedback.classList.add('correct');
        feedback.innerText = 'Bonne réponse !';
        updateScore(1);
    } else {
        feedback.classList.add('incorrect');
        feedback.innerText = `Désolé, la réponse correcte est "${currentConjugation.spanish}".`;
    }

    setTimeout(() => {
        feedback.innerText = '';
        feedback.classList.remove('correct', 'incorrect');
        document.getElementById('answer').value = '';
        pickNextConjugation();
    }, 1000);
}

/**
 * Generate a new question and display it
 */
function pickNextConjugation() {
    currentIndex++;

    if (currentIndex >= shuffleBag.length) {
        shuffleArray(shuffleBag);
        currentIndex = 0;
    }

    currentConjugation = shuffleBag[currentIndex];
    document.getElementById('question').innerText = `${currentConjugation.french}`;
}

document.getElementById('answer')
    .addEventListener('keypress', handleKeyPress);

/**
 * Handle key press events
 * @param {KeyboardEvent} event
 */
function handleKeyPress(event) {
    if (event.keyCode === 13) { // keyCode 13 correspond à la touche Enter
        if (timerInterval === null) startTimer();
        checkAnswer();
    }
}

/**
 * Shuffle an array
 * @param {Array} array
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

async function fetchConjugations() {
    try {
        const response = await fetch('../../assets/data/conjugations.json');
        return await response.json();
    } catch (error) {
        console.error('Erreur lors du chargement des conjugaisons:', error);
        return [];
    }
}

let conjugations = [];
let currentConjugation = null;
let currentIndex = -1;
let shuffleBag = [];

fetchConjugations().then((data) => {
    conjugations = data;
    shuffleBag = [...conjugations];
    shuffleArray(shuffleBag); // Mélanger les conjugaisons initiales
    pickNextConjugation(); // Sélectionner la première conjugaison
});
