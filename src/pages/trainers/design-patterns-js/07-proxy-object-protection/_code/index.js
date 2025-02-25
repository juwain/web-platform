import { createProtectedObject } from './lib';

// Исходный объект
const user = {
  name: 'Гость',
  age: 0,
};

// Создаём защищённый объект
const protectedUser = createProtectedObject(user);

// Пример использования
// try {
//   protectedUser.name = 'Анна'; // Успешно
//   protectedUser.age = 25; // Успешно
//   protectedUser.email = 'test@mail.ru'; // Ошибка!
// } catch (e) {
//   console.error('Ошибка:', e.message);
// }
