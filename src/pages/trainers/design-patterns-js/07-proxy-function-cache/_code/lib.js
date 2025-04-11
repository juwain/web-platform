function memoize(fn) {
  const cache = new Map();

  return new Proxy(fn, {
    apply: (fn, _, args) => {
      const key = JSON.stringify(args);

      // если результат есть в кеше, возвращаем его
      if (cache.has(key)) {
        console.log(`Результат для ${args} взят из кэша`);

        return cache.get(key);
      }

      const result = fn(...args);

      // записываем результат в кеш
      cache.set(key, result);

      return result;
    },
  });
}

export { memoize };
