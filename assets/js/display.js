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

function displayConjugationsHelp() {
    const conjugationsDiv = document.getElementById('conjugations');
    if (conjugationsDiv.classList.contains('hidden')) {
        conjugationsDiv.classList.remove('hidden');
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
