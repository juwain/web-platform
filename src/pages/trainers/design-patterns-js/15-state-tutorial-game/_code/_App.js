import React from 'react';
import { useMachine } from '@xstate/react';
import { guessMachine } from './guessMachine';
import './style.css';

export default function App() {
  const [state, send] = useMachine(guessMachine);

  const handleStart = () => send({ type: 'START' });

  return (
    <div className="container">
      {state.matches('idle') && (
        <>
          <h1>Игра «Угадай число от 1 до 10»</h1>
          <button onClick={handleStart}>Начать игру</button>
        </>
      )}
      {state.matches('playing') && <h1>Игра запущена</h1>}
    </div>
  );
}
