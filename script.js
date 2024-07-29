const words = ["javascript", "html", "css", "programacion", "desarrollo", "casa", "carro", "arbol", "cama", "sabana", "telefono", "escuela", "espejo", "teclado", "cabeza", "palo", "sueter", "moda", "sistema", "kerry", "churro", "ferrari"];
const wordLists = {
    easy: ["casa", "carro", "palo"],
    medium: ["programacion", "desarrollo", "telefono"],
    hard: ["javascript", "html", "css"]
};

let chosenWord;
let attempts;
let guessedLetters;
let difficulty = 'easy';
let score = 0;

document.getElementById('guess-button').addEventListener('click', guessLetter);
document.getElementById('reset-button').addEventListener('click', resetGame);
document.getElementById('hint-button').addEventListener('click', giveHint);
document.getElementById('difficulty').addEventListener('change', (event) => {
    difficulty = event.target.value;
    startGame();
});

function startGame() {
    chosenWord = wordLists[difficulty][Math.floor(Math.random() * wordLists[difficulty].length)];
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
    if (won) {
        score += attempts * 10; // Ejemplo de cálculo de puntuación
    }
    document.getElementById('message').innerText = won ? `¡Ganaste! Puntuación: ${score}` : `Perdiste. La palabra era ${chosenWord}. Puntuación: ${score}`;
    document.getElementById('reset-button').classList.remove('hidden');
}

function resetGame() {
    startGame();
}

function giveHint() {
    const unguessedLetters = chosenWord.split('').filter(letter => !guessedLetters.includes(letter));
    if (unguessedLetters.length > 0) {
        const hintLetter = unguessedLetters[Math.floor(Math.random() * unguessedLetters.length)];
        guessedLetters.push(hintLetter);
        updateWord();
    }
}

// Inicializa el juego al cargar la página
startGame();
