async function fetchConjugations() {
    try {
        const response = await fetch('conjugations.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur lors du chargement des conjugaisons:', error);
        return [];
    }
}

let conjugations = [];
let currentConjugation = null;
let currentIndex = -1;
let shuffleBag = [];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
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
    }, 3000);
}

function handleKeyPress(event) {
    if (event.keyCode === 13) { // keyCode 13 correspond à la touche Enter
        checkAnswer();
    }
}

fetchConjugations().then((data) => {
    conjugations = data;
    shuffleBag = [...conjugations];
    shuffleArray(shuffleBag); // Mélanger les conjugaisons initiales
    pickNextConjugation(); // Sélectionner la première conjugaison
});

// Ajouter un gestionnaire d'événements pour écouter la touche Enter
document.getElementById('answer').addEventListener('keypress', handleKeyPress);
