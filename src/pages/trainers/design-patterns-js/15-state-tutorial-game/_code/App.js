import React, { useState } from 'react';
import { useMachine } from '@xstate/react';
import { guessMachine } from './guessMachine';
import './style.css';

export default function App() {
  const [state, send] = useMachine(guessMachine);
  const [input, setInput] = useState('');

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  const handleGuess = () => {
    send({ type: 'GUESS', guess: Number(input) });
    setInput('');
  };

  const handleStart = () => send({ type: 'START' });

  return (
    <div className="container">
      {state.matches('idle') && (
        <>
          <h1>Игра «Угадай число от 1 до 10»</h1>
          <button onClick={handleStart}>Начать игру</button>
        </>
      )}

      {state.matches('playing') && (
        <>
          <h1>Осталось попыток: {state.context.attempts}</h1>
          <div className="controls">
            <input
              type="number"
              value={input}
              onChange={handleInput}
              placeholder="Введите число"
            />
            <button onClick={handleGuess}>Проверить</button>
          </div>
          {state.context.message && <p>{state.context.message}</p>}
        </>
      )}

      {state.matches('success') && (
        <>
          <h1>Поздравляем, вы угадали!</h1>
          <p>Загаданное число: {state.context.number}</p>
        </>
      )}

      {state.matches('failure') && (
        <>
          <h1>Игра окончена!</h1>
          <p>Загаданное число было: {state.context.number}</p>
          <p>{state.context.message}</p>
        </>
      )}
    </div>
  );
}
