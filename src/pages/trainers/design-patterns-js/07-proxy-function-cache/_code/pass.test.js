import { memoize } from './lib';

describe('memoize', () => {
  // Мок функции с логикой подсчёта вызовов
  const createMockFn = (result = (v) => v) => {
    const fn = jest.fn((...args) => result(...args));
    fn.memoized = memoize(fn);
    return fn;
  };

  it('Функция memoize кеширует результаты для одинаковых аргументов', () => {
    const sum = createMockFn((a, b) => a + b);

    sum.memoized(2, 3);
    sum.memoized(2, 3);

    expect(sum).toHaveBeenCalledTimes(1);
  });
});
