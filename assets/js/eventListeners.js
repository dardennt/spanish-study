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