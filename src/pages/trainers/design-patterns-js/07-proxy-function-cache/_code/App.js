import { useState } from 'react';
import { memoize } from './lib';

// «Медленная» функция вычисления квадрата числа
const square = memoize((n) => n * n);

// Мемоизированная версия
const memoizedSquare = memoize(square);

const NUMBER = 10;

export default function App() {
  const [result, setResult] = useState(null);

  const calculate = () => {
    const result = memoizedSquare(NUMBER);

    setResult(result);
  };

  return (
    <>
      <button onClick={calculate}>Вычислить квадрат {NUMBER}</button>

      {result && (
        <p>
          {NUMBER}
          <sup>2</sup> = {result}
        </p>
      )}
    </>
  );
}
