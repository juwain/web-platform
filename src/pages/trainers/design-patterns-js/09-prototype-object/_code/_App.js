import { User } from './user';

const users = [
  new User({
    id: 1,
    firstName: 'Иван',
    lastName: 'Иванов',
    email: 'ivan.ivanov@mail.ru',
    role: 'user',
  }),
  new User({
    id: 2,
    firstName: 'Петр',
    lastName: 'Петров',
    email: 'petr.petrov@mail.ru',
    role: 'admin',
  }),
];

export default function App() {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.id} {user.fullName} {user.email} {user.isAdmin() && '⭐️'}
        </li>
      ))}
    </ul>
  );
}
