let instance: LocalStorage;

class LocalStorage {
  constructor() {
    if (!instance) {
      instance = this;
    }

    return instance;
  }
  get(key: string) {
    return localStorage.getItem(key);
  }

  set(key: string, value: string) {
    localStorage.setItem(key, value);
  }
}

const ls = Object.freeze(new LocalStorage());

export { ls };
