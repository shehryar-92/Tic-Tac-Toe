const { checkWinner, getBestMove } = (() => {
  const fs = require("fs");
  const code = fs.readFileSync(__dirname + "/game.js", "utf8");
  const module = { exports: {} };
  const fn = new Function("module", "exports", code + "\nmodule.exports = { checkWinner, getBestMove };");
  fn(module, module.exports);
  return module.exports;
})();

function assertEqual(actual, expected, label) {
  const pass = JSON.stringify(actual) === JSON.stringify(expected);
  console.log((pass ? "PASS" : "FAIL") + " - " + label +
    (pass ? "" : ` (expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)})`));
}

// Row win
assertEqual(checkWinner(["X","X","X",null,null,null,null,null,null]), "X", "row win for X");

// Column win
assertEqual(checkWinner(["O",null,null,"O",null,null,"O",null,null]), "O", "column win for O");

// Diagonal win
assertEqual(checkWinner(["X",null,null,null,"X",null,null,null,"X"]), "X", "diagonal win for X");

// Draw
assertEqual(checkWinner(["X","O","X","X","O","O","O","X","X"]), "draw", "draw board");

// No winner yet
assertEqual(checkWinner(["X",null,null,null,null,null,null,null,null]), null, "no winner yet");

// AI blocks an immediate win for X
let board = ["X","X",null,null,"O",null,null,null,null];
assertEqual(getBestMove(board), 2, "AI blocks X's winning move");

// AI takes winning move for itself
board = ["O","O",null,"X","X",null,null,null,null];
assertEqual(getBestMove(board), 2, "AI takes its own winning move");

// AI never loses from empty board (simulate full random opponent games)
function simulateGame(aiStarts) {
  let b = Array(9).fill(null);
  let turn = aiStarts ? "O" : "X";
  while (!checkWinner(b)) {
    const empty = b.reduce((acc, v, i) => { if (v === null) acc.push(i); return acc; }, []);
    if (turn === "O") {
      b[getBestMove(b)] = "O";
    } else {
      const move = empty[Math.floor(Math.random() * empty.length)];
      b[move] = "X";
    }
    turn = turn === "O" ? "X" : "O";
  }
  return checkWinner(b);
}

let aiLosses = 0;
for (let i = 0; i < 20; i++) {
  const result = simulateGame(i % 2 === 0);
  if (result === "X") aiLosses++;
}
assertEqual(aiLosses, 0, "AI never loses across 20 random games");
