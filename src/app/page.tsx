'use client';
import { useState } from 'react';
import Block from './component/Block';

export default function Home() {
  const [state, setState] = useState(Array(9).fill(null));

  const checkWinner = (currentState: any[]) => {
    const winningCombinations = [
      [0, 1, 2], // top row
      [3, 4, 5], // middle row
      [6, 7, 8], // bottom row
      [0, 3, 6], // left column
      [1, 4, 7], // middle column
      [2, 5, 8], // right column
      [0, 4, 8], // diagonal top-left to bottom-right
      [2, 4, 6], // diagonal top-right to bottom-left
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (
        currentState[a] &&
        currentState[a] === currentState[b] &&
        currentState[a] === currentState[c]
      ) {
        return currentState[a];
      }
    }

    if (state.every((square) => square !== null)) {
      return 'draw';
    }

    return null;
  };

  const [currentTurn, setCurrentTurn] = useState('X');

  const handleBlockClick = (index: number) => {
    const _state = Array.from(state);
    if (_state[index] !== null) return;
    _state[index] = currentTurn;
    setState(_state);

    const isWinner = checkWinner(_state);
    if (isWinner) {
      setTimeout(() => {
        alert('is Winner');
      }, 200);
    }

    setCurrentTurn(currentTurn === 'X' ? '0' : 'X');
  };

  return (
    <div className="board">
      <div className="row">
        <Block onClick={() => handleBlockClick(0)} value={state[0]} />
        <Block onClick={() => handleBlockClick(1)} value={state[1]} />
        <Block onClick={() => handleBlockClick(2)} value={state[2]} />
      </div>
      <div className="row">
        <Block onClick={() => handleBlockClick(3)} value={state[3]} />
        <Block onClick={() => handleBlockClick(4)} value={state[4]} />
        <Block onClick={() => handleBlockClick(5)} value={state[5]} />
      </div>
      <div className="row">
        <Block onClick={() => handleBlockClick(6)} value={state[6]} />
        <Block onClick={() => handleBlockClick(7)} value={state[7]} />
        <Block onClick={() => handleBlockClick(8)} value={state[8]} />
      </div>
    </div>
  );
}
