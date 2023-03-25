const TIMER_START_VALUE = 60;
const TARGET_SCORE = 10;
const TIMER_DANGER_THRESHOLD = 20;

let conjugations = [];
let currentIndex = -1;
let shuffleBag = [];
let currentConjugation = null;
let score = 0;
let timerValue = TIMER_START_VALUE;
let timerInterval = null;

function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function updateTimer() {
    timerValue--;
    const timerElement = document.getElementById('timer');
    timerElement.innerText = formatTime(timerValue);

    if (timerValue <= TIMER_DANGER_THRESHOLD) {
        timerElement.classList.add('danger');
    }

    if (timerValue === 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        endGame(false);
    }
}

function resetTimer() {
    timerValue = TIMER_START_VALUE;
    const timerElement = document.getElementById('timer');
    timerElement.innerText = formatTime(timerValue);
    timerElement.classList.remove('danger');
}

function startTimer() {
    if (timerInterval === null) {
        timerInterval = setInterval(updateTimer, 1000);
    }
}

function updateScore() {
    score++;
    document.getElementById('score').innerText = `${score}/10`;
}

function resetScore() {
    score = 0;
    document.getElementById('score').innerText = `${score}/10`;
}

function clearFeedback() {
    const feedback = document.getElementById('feeback');
    feedback.innerText = '';
}

function endGame(isWin) {
    clearInterval(timerInterval);
    timerInterval = null;
    const feedback = document.getElementById('feedback');
    feedback.innerText = isWin ? "Félicitations, vous avez gagné !" : "Désolé, vous avez perdu.";
    document.getElementById('start').innerText = "Recommencer";
    hideGameElements();
}

function resetQuiz() {
    resetTimer();
    resetScore();
    clearFeedback();
    pickNextConjugation();
}

function showGameElements() {
    document.getElementById('question').classList.remove('hidden');
    document.getElementById('answer').classList.remove('hidden');
}

function hideGameElements() {
    document.getElementById('question').classList.add('hidden');
    document.getElementById('answer').classList.add('hidden');
}

function checkAnswer() {
    const userAnswer = document.getElementById('answer').value.trim();
    const feedback = document.getElementById('feedback');

    if (userAnswer.toLowerCase() === currentConjugation.spanish) {
        updateScore();
        feedback.classList.add('correct');
        feedback.innerText = 'Bonne réponse !';
        if (score >= TARGET_SCORE) {
            endGame(true);
        }
    } else {
        feedback.classList.add('incorrect');
        feedback.innerText = `Désolé, la réponse correcte est "${currentConjugation.spanish}".`;
    }

    setTimeout(() => {
        feedback.innerText = '';
        feedback.classList.remove('correct', 'incorrect');
        document.getElementById('answer').value = '';
        if (score < TARGET_SCORE) {
            pickNextConjugation();
        }
    }, 1000);
}

function pickNextConjugation() {
    currentIndex++;

    if (currentIndex >= shuffleBag.length) {
        shuffleArray(shuffleBag);
        currentIndex = 0;
    }

    currentConjugation = shuffleBag[currentIndex];
    document.getElementById('question').innerText = `${currentConjugation.french}`;
}

document.getElementById('start')
    .addEventListener('click', function () {
        if (timerInterval === null) {
            startTimer();
            showGameElements();
            resetQuiz();
            this.innerText = 'Recommencer';
        } else {
            clearInterval(timerInterval);
            timerInterval = null;
            resetQuiz();
        }
    });

document.getElementById('answer')
    .addEventListener('keypress', function (event) {
        if (event.keyCode === 13) {
            checkAnswer();
        }
    });

async function fetchConjugations() {
    try {
        const response = await fetch('../../assets/data/conjugations.json');
        return await response.json();
    } catch (error) {
        console.error('Erreur lors du chargement des conjugaisons:', error);
        return [];
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

fetchConjugations().then((data) => {
    conjugations = data;
    shuffleBag = [...conjugations];
    shuffleArray(shuffleBag); // Mélanger les conjugaisons initiales
    pickNextConjugation(); // Sélectionner la première conjugaison
    hideGameElements();
});