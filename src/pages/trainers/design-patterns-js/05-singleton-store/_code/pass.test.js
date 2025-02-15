// MySingleton.test.js

import MySingleton from './store';

describe('MySingleton', () => {
  it('should always return the same instance', () => {
    const instance1 = new MySingleton();
    const instance2 = new MySingleton();

    // Проверяем, что это один и тот же экземпляр
    expect(instance1).toBe(instance2);
  });

  it('should have public properties and methods', () => {
    const instance = new MySingleton();

    // Проверяем публичное свойство
    expect(instance.publicProperty).toBe('I am also public');

    // Проверяем публичный метод
    expect(typeof instance.publicMethod).toBe('function');

    // Проверяем метод getRandomNumber
    expect(typeof instance.getRandomNumber).toBe('function');
    expect(typeof instance.getRandomNumber()).toBe('number');
  });

  it('should return the same random number for all instances', () => {
    const instance1 = new MySingleton();
    const instance2 = new MySingleton();

    // Проверяем, что метод getRandomNumber возвращает одно и то же число
    expect(instance1.getRandomNumber()).toBe(instance2.getRandomNumber());
  });

  it('should not expose private methods and variables', () => {
    const instance = new MySingleton();

    // Проверяем, что приватные методы и переменные недоступны
    expect(instance.privateMethod).toBeUndefined();
    expect(instance.privateVariable).toBeUndefined();
    expect(instance.randomNumber).toBeUndefined();
  });
});
