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