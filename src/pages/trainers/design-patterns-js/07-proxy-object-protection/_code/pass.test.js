import { createProtectedObject } from './lib';

describe('Защищённый объект', () => {
  const user = { name: 'Test', age: 20 };
  const protectedUser = createProtectedObject(user);

  it('Функция createProtectedObject возвращает «защищённый» прокси-объект, позволяющий изменение существующих в объекте свойств,', () => {
    // Проверка отсутствия ошибок при обновлении
    expect(() => {
      protectedUser.name = 'New Name';
      protectedUser.age = 30;
    }).not.toThrow();

    // Проверка актуальных значений
    expect(protectedUser.name).toBe('New Name');
    expect(protectedUser.age).toBe(30);
  });

  it('но при попытке добавить новое свойство бросается ошибка "В объект нельзя добавлять  новые свойства"', () => {
    expect(() => {
      protectedUser.email = 'test@mail.ru';
    }).toThrow('В объект нельзя добавлять  новые свойства');
  });
});
