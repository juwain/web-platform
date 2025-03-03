import { User } from './user';

const user1 = new User({
  id: 1,
  firstName: 'Иван',
  lastName: 'Иванов',
  email: 'ivan.ivanov@mail.ru',
  role: 'user',
});

const user2 = new User({
  id: 2,
  firstName: 'Петр',
  lastName: 'Петров',
  email: 'petr.petrov@mail.ru',
  role: 'admin',
});
