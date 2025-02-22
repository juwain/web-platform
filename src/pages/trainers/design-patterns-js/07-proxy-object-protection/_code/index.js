import { createProtectedObject } from './createProtectedObject';

// Исходный объект
const user = {
  name: 'Гость',
  age: 0,
};

// Создаём защищённый объект
const protectedUser = createProtectedObject(user);

// Примеры использования
// try {
//   protectedUser.name = 'Анна';    // Успешно
//   protectedUser.age = 25;         // Успешно
//   console.log(protectedUser);     // {name: 'Анна', age: 25}

//   protectedUser.email = 'test@mail.ru'; // Ошибка!
// } catch (e) {
//   console.error('Ошибка:', e.message); // "Свойство 'email' запрещено"
// }
