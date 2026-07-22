const WIN_LINES = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function checkWinner(board) {
  for (const [a,b,c] of WIN_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  if (board.every(cell => cell !== null)) return "draw";
  return null;
}

function getEmptyIndices(board) {
  return board.reduce((acc, val, i) => {
    if (val === null) acc.push(i);
    return acc;
  }, []);
}

function minimax(board, isMaximizing) {
  const result = checkWinner(board);
  if (result === "O") return { score: 1 };
  if (result === "X") return { score: -1 };
  if (result === "draw") return { score: 0 };

  const moves = [];
  for (const i of getEmptyIndices(board)) {
    board[i] = isMaximizing ? "O" : "X";
    const { score } = minimax(board, !isMaximizing);
    moves.push({ index: i, score });
    board[i] = null;
  }

  if (isMaximizing) {
    return moves.reduce((best, m) => (m.score > best.score ? m : best));
  } else {
    return moves.reduce((best, m) => (m.score < best.score ? m : best));
  }
}

function getBestMove(board) {
  return minimax(board, true).index;
}
