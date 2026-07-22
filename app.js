let board = Array(9).fill(null);
let gameOver = false;

const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");
const themeToggle = document.getElementById("themeToggle");

function render() {
  boardEl.innerHTML = "";
  board.forEach((val, i) => {
    const cell = document.createElement("div");
    cell.className = "cell" + (val ? " taken" : "");
    cell.textContent = val || "";
    cell.addEventListener("click", () => handleMove(i));
    boardEl.appendChild(cell);
  });
}

function handleMove(i) {
  if (gameOver || board[i] !== null) return;

  board[i] = "X";
  const result = checkWinner(board);
  if (result) {
    endGame(result);
    return;
  }

  statusEl.textContent = "AI thinking...";
  render();

  setTimeout(() => {
    const move = getBestMove(board);
    board[move] = "O";
    const result2 = checkWinner(board);
    render();
    if (result2) {
      endGame(result2);
    } else {
      statusEl.textContent = "Your turn (X)";
    }
  }, 200);
}

function endGame(result) {
  gameOver = true;
  render();
  if (result === "draw") {
    statusEl.textContent = "It's a draw!";
  } else if (result === "X") {
    statusEl.textContent = "You win!";
  } else {
    statusEl.textContent = "AI wins!";
  }
}

function resetGame() {
  board = Array(9).fill(null);
  gameOver = false;
  statusEl.textContent = "Your turn (X)";
  render();
}

resetBtn.addEventListener("click", resetGame);

themeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark", themeToggle.checked);
});

render();
