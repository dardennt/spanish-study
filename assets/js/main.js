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