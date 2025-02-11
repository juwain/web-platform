const cache = new WeakMap();

function handleObjectValues(obj) {
  if (cache.has(obj)) {
    return cache.get(obj);
  }

  const result = Object.values(obj).map(console.log);

  cache.set(obj, result);

  return result;
}

export { handleObjectValues };
