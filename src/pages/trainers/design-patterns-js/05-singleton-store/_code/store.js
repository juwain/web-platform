let instance;
const data = new Map();

/**
 * Синглтон-хранилище данных с использованием Map
 * @class
 * @example
 * const store = new SingletonStore();
 * store.set('key', 'value');
 * store.get('key'); // 'value'
 * store.has('key'); // true
 * store.delete('key'); // true
 * store.has('key'); // false
 *
 * // Все экземпляры разделяют общее хранилище:
 * const anotherStore = new SingletonStore();
 * anotherStore.set('num', 42);
 * store.get('num'); // 42
 */
class SingletonStore {
  constructor() {}

  set(key, value) {}

  get(key) {}

  has(key) {}

  delete(key) {}
}

export default SingletonStore;
