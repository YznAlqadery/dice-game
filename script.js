//Selecting the player's score by the querySelector with the # for the id selector
const player0ScoreElement = document.querySelector("#score--0");
const player1ScoreElement = document.querySelector("#score--1");
const current0Score = document.querySelector("#current--0");
const current1Score = document.querySelector("#current--1");
//Selecting elements with the class name
const playerZero = document.querySelector(".player--0");
const playerOne = document.querySelector(".player--1");
const diceElement = document.querySelector(".dice");
const newGameBtn = document.querySelector(".btn--new");
const rollBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");
const winnerTextElement = document.querySelector(".winner--text");
//Add a hidden class so the dice doesn't show till the player rolls the dice
diceElement.classList.add("hidden");
let scores, currentScore, activePlayer, gameAvailablity;
function startUp() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  gameAvailablity = true;

  player0ScoreElement.textContent = 0;
  player1ScoreElement.textContent = 0;
  current0Score.textContent = 0;
  current1Score.textContent = 0;

  diceElement.classList.add("hidden");
  playerZero.classList.remove("player--winner");
  playerOne.classList.remove("player--winner");
  playerZero.classList.add("player--active");
  playerOne.classList.remove("player--active");
  winnerTextElement.textContent = "";
}

startUp();

function switchPlayers() {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  // Toggle: If the class is there it will remove it, if it's not it will add it
  playerZero.classList.toggle("player--active");
  playerOne.classList.toggle("player--active");
}
//Rolling the dice
rollBtn.addEventListener("click", () => {
  if (gameAvailablity) {
    const randomDice = Math.floor(Math.random() * 6) + 1;

    diceElement.classList.remove("hidden");
    diceElement.src = `assets/dice-${randomDice}.png`;

    if (randomDice !== 1) {
      currentScore += randomDice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switching players
      switchPlayers();
    }
  }
});

holdBtn.addEventListener("click", () => {
  if (gameAvailablity) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 10) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      gameAvailablity = false;
      diceElement.classList.add("hidden");
      winnerTextElement.textContent = `Player ${
        activePlayer + 1
      } has won the game, reset the game to play again!`;
    } else {
      //Switching players
      switchPlayers();
    }
  }
});

newGameBtn.addEventListener("click", startUp);
