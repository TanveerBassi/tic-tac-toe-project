const squares = document.querySelectorAll(".square");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

const restartGame = () => {
  currentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `${currentPlayer}'s turn`;
  squares.forEach((square) => (square.textContent = ""));
  running = true;
};

const updateSquare = (square, index) => {
  options[index] = currentPlayer;
  square.textContent = currentPlayer;
};

const squareClicked = (e) => {
  const squareIndex = e.target.getAttribute("squareIndex");

  if (options[squareIndex] != "" || !running) {
    return;
  }

  updateSquare(e.target, squareIndex);
  checkWinner();
};

const initializeGame = () => {
  squares.forEach((square) => square.addEventListener("click", squareClicked));
  restartBtn.addEventListener("click", restartGame);
  statusText.textContent = `${currentPlayer}'s turn`;
  running = true;
};

const changePlayer = () => {
  currentPlayer = currentPlayer == "X" ? "O" : "X";
  statusText.textContent = `${currentPlayer}'s turn`;
};

const checkWinner = () => {
  let roundWon = false;

  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];
    const squareA = options[condition[0]];
    const squareB = options[condition[1]];
    const squareC = options[condition[2]];

    if (squareA == "" || squareB == "" || squareC == "") {
      continue;
    }
    if (squareA == squareB && squareB == squareC) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `${currentPlayer} wins!`;
    running = false;
  } else if (!options.includes("")) {
    statusText.textContent = `Draw!`;
    running = false;
  } else {
    changePlayer();
  }
};

initializeGame();
