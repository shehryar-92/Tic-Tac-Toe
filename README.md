# Tic Tac Toe vs AI

A simple browser-based Tic Tac Toe game against an unbeatable AI.

## Files

- `index.html` – page structure
- `style.css` – styling (light theme, with a dark mode toggle)
- `game.js` – game logic and the AI (minimax algorithm)
- `app.js` – DOM wiring, handles clicks and updates the board
- `test.js` – test cases for the game logic and AI

## How to play

Open `index.html` in a browser. You are X and go first. Click any empty cell to make a move. The AI (O) will respond automatically.

The AI uses minimax, so it plays perfectly — the best you can do is force a draw.

## Running tests

Tests run in Node and check win detection, blocking, and that the AI never loses:

```
node test.js
```
