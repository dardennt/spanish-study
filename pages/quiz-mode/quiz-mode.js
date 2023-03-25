let timer = 60;
let score = 0;
let interval;

function startTimer() {
    interval = setInterval(() => {
        timer--;
        document.getElementById("timer").innerText = timer;
        if (timer <= 0) {
            clearInterval(interval);
            // Gérer la fin du quiz ici
        }
    }, 1000);
}

function checkAnswer() {
    // Vérifiez la réponse de l'utilisateur et mettez à jour le score
}

function generateQuestion() {
    // Générer une nouvelle question
}

function resetQuiz() {
    clearInterval(interval);
    timer = 60;
    score = 0;
    document.getElementById("timer").innerText = timer;
    document.getElementById("score").innerText = score;
    startTimer();
    generateQuestion();
}

document.getElementById("answer").addEventListener("input", checkAnswer);
document.getElementById("restart").addEventListener("click", resetQuiz);

// Lancer le quiz
startTimer();
generateQuestion();