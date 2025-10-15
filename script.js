const board = document.getElementById('board');
const status = document.getElementById('status');
const modeToggle = document.getElementById('modeToggle');

let cells = [];
let currentPlayer = 'X';
let gameActive = true;
let isVsComputer = false;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
  [0, 4, 8], [2, 4, 6]              // Diagonals
];

function init() {
  board.innerHTML = '';
  cells = [];
  gameState = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = 'X';
  gameActive = true;
  status.textContent = "Player X's turn";
  isVsComputer = modeToggle.checked;

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
    cells.push(cell);
  }
}

function handleCellClick(e) {
  const idx = e.target.dataset.index;

  if (!gameActive || gameState[idx] !== "") return;

  makeMove(idx, currentPlayer);

  if (checkWin(currentPlayer)) {
    status.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (gameState.every(cell => cell !== "")) {
    status.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  status.textContent = `Player ${currentPlayer}'s turn`;

  // Computer move
  if (isVsComputer && currentPlayer === 'O' && gameActive) {
    setTimeout(computerMove, 500);
  }
}

function makeMove(index, player) {
  gameState[index] = player;
  cells[index].textContent = player;
  cells[index].style.cursor = 'default';
}

function checkWin(player) {
  return winPatterns.some(pattern =>
    pattern.every(index => gameState[index] === player)
  );
}

function computerMove() {
  const emptyIndices = gameState
    .map((val, i) => (val === "" ? i : null))
    .filter(i => i !== null);

  if (emptyIndices.length === 0) return;

  const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  makeMove(randomIndex, 'O');

  if (checkWin('O')) {
    status.textContent = "Computer wins!";
    gameActive = false;
    return;
  }

  if (gameState.every(cell => cell !== "")) {
    status.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = 'X';
  status.textContent = "Player X's turn";
}

function resetGame() {
  init();
}

modeToggle.addEventListener('change', resetGame);

// Start the game
init();
