import questionsData from '../../assets/data/conjugations.json';

// Mélanger les questions
function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue,
        randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Mélanger les questions
let shuffledQuestions = shuffle(questionsData);

// Générer une question aléatoire
export function generateQuestion() {
    if (shuffledQuestions.length === 0) {
        // Toutes les questions ont été utilisées, mélanger à nouveau
        shuffledQuestions = shuffle(questionsData);
    }

    // Retourner une question du début du tableau mélangé
    return shuffledQuestions.shift();
}
