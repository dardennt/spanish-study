function checkAnswer() {
    const userAnswer = document.getElementById('answer').value.trim();
    const feedback = document.getElementById('feedback');

    if (userAnswer.toLowerCase() === currentConjugation.spanish) {
        feedback.classList.add('correct');
        feedback.innerText = 'Bonne réponse !';
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

function pickNextConjugation() {
    currentIndex++;

    if (currentIndex >= shuffleBag.length) {
        shuffleArray(shuffleBag);
        currentIndex = 0;
    }

    hideConjugationsHelp();

    currentConjugation = shuffleBag[currentIndex];
    document.getElementById('question').innerText = `${currentConjugation.french}`;

    fetchConjugationsHelp();
}

function fetchConjugationsHelp() {
    const frenchColumn = document.getElementById('french-conjugations');
    const spanishColumn = document.getElementById('spanish-conjugations');

    const currentVerb = shuffleBag[currentIndex];
    if (!currentVerb) return;

    const infinitive = currentVerb.infinitive;

    frenchColumn.innerHTML = '';
    spanishColumn.innerHTML = '';

    conjugations.forEach(conjugation => {
        if (conjugation.infinitive === infinitive) {
            const frenchConjugationElement = document.createElement('div');
            frenchConjugationElement.textContent = conjugation.french;
            frenchConjugationElement.className = 'conjugation';
            frenchColumn.appendChild(frenchConjugationElement);

            const spanishConjugationElement = document.createElement('div');
            spanishConjugationElement.textContent = conjugation.spanish;
            spanishConjugationElement.className = 'conjugation';
            spanishColumn.appendChild(spanishConjugationElement);
        }
    });
}

function hideConjugationsHelp() {
    const conjugationsDiv = document.getElementById('conjugations');
    if (!conjugationsDiv.classList.contains('hidden')) {
        conjugationsDiv.classList.add('hidden');
    }
}
function toggleConjugationsHelp() {
    const conjugationsDiv = document.getElementById('conjugations');
    if (conjugationsDiv.classList.contains('hidden')) {
        conjugationsDiv.classList.remove('hidden');
    } else {
        conjugationsDiv.classList.add('hidden');
    }
}

document.getElementById("show-conjugations")
    .addEventListener("click", function () {
        toggleConjugationsHelp();
    });

document.getElementById('answer')
    .addEventListener('keypress', handleKeyPress);

function handleKeyPress(event) {
    if (event.keyCode === 13) { // keyCode 13 correspond à la touche Enter
        checkAnswer();
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

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
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