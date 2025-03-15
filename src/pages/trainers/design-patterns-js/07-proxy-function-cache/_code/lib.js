/**
 * Функция мемоизирует результаты выполнения для повторных вызовов
 * @param {Function} fn - Функция для оптимизации
 * @returns {Function} Проксированная функция с кешированием
 * @example
 * const add = (a, b) => a + b;
 * const memoizedAdd = memoize(add);
 *
 * memoizedAdd(2, 3); // Вычисление и кеширование
 * memoizedAdd(2, 3); // Возврат из кеша
 */

function memoize(fn) {
  const cache = new Map();

  return new Proxy(fn, {
    apply: (fn, _, args) => {
      const key = JSON.stringify(args);

      // если результат есть в кеше, возвращаем его
      /* ... */

      const result = fn(...args);

      // записываем результат в кеш
      /* ... */

      return result;
    },
  });
}

export { memoize };
