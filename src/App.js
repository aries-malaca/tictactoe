import React, { useState } from "react";

const buttonStyle = {
  width: "100px",
  height: "100px",
  border: "1px solid black",
  fontSize: "3rem",
};

const boardStyle = {
  display: "grid",
  gridTemplateColumns: "auto auto auto",
  width: "100px",
};

const Square = ({ value, onClick }) => {
  return (
    <button onClick={onClick} style={buttonStyle}>
      {value}
    </button>
  );
};

const Board = ({ isXNext, squares, onPlay }) => {
  const handleClick = (index) => {
    const nextSquares = squares.slice();
    nextSquares[index] = isXNext ? "X" : "O";

    if (calculateWinner(squares) || squares[index]) return;

    onPlay(nextSquares);
  };

  let status = `Next turn: ${isXNext ? "X" : "O"}`;

  const winner = calculateWinner(squares);

  if (squares.filter((i) => i === null).length === 0) status = "Draw";

  if (winner) status = `Winner is: ${isXNext ? "O" : "X"}`;

  return (
    <div>
      {status}
      <div style={boardStyle}>
        {squares.map((value, index) => (
          <Square
            value={value}
            key={index}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

const initialState = [Array(9).fill(null)];

const App = () => {
  const [history, setHistory] = useState(initialState);
  const [currentMove, setCurrentMove] = useState(0);
  const isXNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const handlePlay = (nextSquare) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquare];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const resetGame = () => {
    setHistory(initialState);
    setCurrentMove(0);
  };

  return (
    <div>
      <Board isXNext={isXNext} squares={currentSquares} onPlay={handlePlay} />
      <button onClick={resetGame}>Reset Game</button>
    </div>
  );
};

export default App;

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
