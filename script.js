const emojis = ["😀", "🐶", "🍕", "🚗", "🎵", "🌈", "🐱", "⚽"];
let gameEmojis = [];
let flippedCards = [];
let matchedCount = 0;

let timerInterval;
let seconds = 0;
let hasGameStarted = false;

const gameBoard = document.getElementById("game-board");
const message = document.getElementById("message");
const timerDisplay = document.getElementById("timer");
const restartBtn = document.getElementById("restart-btn");

// Shuffle function
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Create game board
function createBoard() {
  gameBoard.innerHTML = "";
  gameEmojis = shuffle([...emojis, ...emojis]);
  gameEmojis.forEach((emoji, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.emoji = emoji;
    card.dataset.index = index;
    card.textContent = emoji;
    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  });
}

// Flip logic
function flipCard() {
  if (!hasGameStarted) {
    hasGameStarted = true;
    startTimer();
  }

  if (flippedCards.length === 2 || this.classList.contains("flipped")) return;

  this.classList.add("flipped");
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    const [card1, card2] = flippedCards;
    if (card1.dataset.emoji === card2.dataset.emoji) {
      matchedCount++;
      flippedCards = [];

      if (matchedCount === emojis.length) {
        clearInterval(timerInterval);
        message.textContent = `🎉 You matched all emojis in ${seconds}s!`;
      }
    } else {
      setTimeout(() => {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        flippedCards = [];
      }, 800);
    }
  }
}

// Timer
function startTimer() {
  seconds = 0;
  timerDisplay.textContent = `Time: 0s`;
  timerInterval = setInterval(() => {
    seconds++;
    timerDisplay.textContent = `Time: ${seconds}s`;
  }, 1000);
}

// Restart Game
function restartGame() {
  clearInterval(timerInterval);
  seconds = 0;
  hasGameStarted = false;
  matchedCount = 0;
  flippedCards = [];
  message.textContent = "";
  timerDisplay.textContent = `Time: 0s`;
  createBoard();
}

// Button click event
restartBtn.addEventListener("click", restartGame);

// Start game
restartGame();
