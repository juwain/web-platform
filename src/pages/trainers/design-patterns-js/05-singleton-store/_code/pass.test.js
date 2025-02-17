import UserStore from './store';

describe('SingletonStore', () => {
  it('Стор SingletonStore – это Синглтон,', () => {
    const store1 = new UserStore();
    const store2 = new UserStore();

    expect(store1).toBe(store2);
  });

  it('в нём есть методы set() и get(),', () => {
    const store = new UserStore();

    store.set('name', 'Alice');
    expect(store.get('name')).toBe('Alice');

    store.set('age', 30);
    expect(store.get('age')).toBe(30);
  });

  it('также есть методы has() и delete()', () => {
    const store = new UserStore();

    store.set('email', 'alice@example.com');
    store.set('a', 1);
    store.delete('a');

    expect(store.has('email')).toBe(true);
    expect(store.has('phone')).toBe(false);
    expect(store.has('a')).toBe(false);
  });

  it('и при многократном создании инстанс класса один', () => {
    const store1 = new UserStore();
    const store2 = new UserStore();

    store1.set('shared', true);
    expect(store2.get('shared')).toBe(true);
  });
});
