const words = ["javascript", "html", "css", "programacion", "desarrollo", "casa", "carro", "arbol", "cama", "sabana", "telefono", "escuela", "espejo", "teclado", "cabeza", "palo", "sueter","moda", "sistema", "kerry", "churro", "ferrari"]
let chosenWord;
let attempts;
let guessedLetters;

document.getElementById('guess-button').addEventListener('click', guessLetter);
document.getElementById('reset-button').addEventListener('click', resetGame);

function startGame() {
    chosenWord = words[Math.floor(Math.random() * words.length)];
    attempts = 6;
    guessedLetters = [];
    document.getElementById('word').innerText = '_ '.repeat(chosenWord.length);
    document.getElementById('attempts').innerText = attempts;
    document.getElementById('letter-input').value = '';
    document.getElementById('message').innerText = '';
    document.getElementById('reset-button').classList.add('hidden');
}

function guessLetter() {
    const letter = document.getElementById('letter-input').value.toLowerCase();
    if (letter && !guessedLetters.includes(letter)) {
        guessedLetters.push(letter);
        if (chosenWord.includes(letter)) {
            updateWord();
        } else {
            attempts--;
            document.getElementById('attempts').innerText = attempts;
        }
        if (attempts <= 0) {
            endGame(false);
        }
        document.getElementById('letter-input').value = '';
    }
}

function updateWord() {
    const wordDisplay = chosenWord.split('').map(letter => (guessedLetters.includes(letter) ? letter : '_')).join(' ');
    document.getElementById('word').innerText = wordDisplay;
    if (!wordDisplay.includes('_')) {
        endGame(true);
    }
}

function endGame(won) {
    document.getElementById('message').innerText = won ? '¡Ganaste!' : `Perdiste. La palabra era ${chosenWord}.`;
    document.getElementById('reset-button').classList.remove('hidden');
}

function resetGame() {
    startGame();
}

startGame();
