const cards = document.querySelectorAll('.card');
const timerDisplay = document.querySelector('.timer');
const winScreen = document.querySelector('.win-screen');
const restartButton = document.getElementById('restart-button');
const finalTimeDisplay = document.getElementById('final-time');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let matchedCardsCount = 0;
let timer;
let seconds = 0;

function startTimer() {
    timer = setInterval(() => {
        seconds++;
        timerDisplay.textContent = `Tempo: ${seconds}s`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
    finalTimeDisplay.textContent = seconds;
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedCardsCount++;

        if (matchedCardsCount === cards.length / 2) {
            stopTimer();
            winScreen.style.display = 'block';
        }

        resetBoard();
    }, 1000);
}


function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function shuffle() {
    const shuffledCards = Array.from(cards);
    shuffledCards.sort(() => Math.random() - 0.5);
    shuffledCards.forEach(card => document.querySelector('.game-board').appendChild(card));
}

function restartGame() {
    matchedCardsCount = 0;
    seconds = 0;
    timerDisplay.textContent = `Tempo: 0s`;
    winScreen.style.display = 'none';
    shuffle();
    cards.forEach(card => card.classList.remove('flipped', 'matched'));
    startTimer();
}

shuffle();
startTimer();

cards.forEach(card => card.addEventListener('click', flipCard));
restartButton.addEventListener('click', restartGame);