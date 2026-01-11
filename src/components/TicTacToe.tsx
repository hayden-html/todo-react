import { useState } from "react";

// Building react tutorial, but without looking at docs for a challenge

function Square({
  onSquareClick,
  value,
}: {
  onSquareClick: () => void;
  value: string;
}) {
  return (
    <button className="bg-white w-8 aspect-square mb-0" onClick={onSquareClick}>
      {value}
    </button>
  );
}
export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [isXNext, setIsXNext] = useState(true);
  const [status, setStatus] = useState("Next Go: x");

  function handleClick(x: number) {
    if (board[x] || gameComplete(board)) return;
    const updatedBoard = board.slice();
    if (isXNext) {
      updatedBoard[x] = "x";
    } else {
      updatedBoard[x] = "o";
    }
    setBoard(updatedBoard);

    if (gameComplete(updatedBoard)) {
      return setStatus(() => (isXNext ? "x" : "o") + " wins!");
    } else if (isBoardFull(updatedBoard)) {
      return setStatus(() => "Draw!");
    } else {
      setIsXNext(!isXNext);
      setStatus(() => "Next Go: " + (isXNext ? "o" : "x"));
    }
    return;
  }

  function isBoardFull(x: string[]) {
    for (let i = 0; i < x.length; i++) {
      if (x[i] == "") {
        return false;
      }
    }
    return true;
  }

  function gameComplete(board: string[]) {
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
      if (board[a] && board[a] == board[b] && board[a] == board[c]) {
        return board[a];
      }
    }
  }

  function resetGame() {
    setBoard(Array(9).fill(""));
    setIsXNext(true);
    setStatus("Next Go: x");
  }

  return (
    <div className="board flex flex-col gap-0.5">
      <h1 className="text-white">{status}</h1>
      <div className="flex gap-0.5">
        <Square onSquareClick={() => handleClick(0)} value={board[0]} />
        <Square onSquareClick={() => handleClick(1)} value={board[1]} />
        <Square onSquareClick={() => handleClick(2)} value={board[2]} />
      </div>
      <div className="flex gap-0.5">
        <Square onSquareClick={() => handleClick(3)} value={board[3]} />
        <Square onSquareClick={() => handleClick(4)} value={board[4]} />
        <Square onSquareClick={() => handleClick(5)} value={board[5]} />
      </div>
      <div className="flex gap-0.5">
        <Square onSquareClick={() => handleClick(6)} value={board[6]} />
        <Square onSquareClick={() => handleClick(7)} value={board[7]} />
        <Square onSquareClick={() => handleClick(8)} value={board[8]} />
      </div>
      <button className="text-white" onClick={() => resetGame()}>
        Reset
      </button>
    </div>
  );
}
