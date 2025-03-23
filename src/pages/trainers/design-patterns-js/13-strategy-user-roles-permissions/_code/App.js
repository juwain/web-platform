import { useState } from 'react';
import { Article } from './Article';
import './style.css';

// Демонстрационные данные
const demoArticle = {
  id: 1,
  ownerId: 100,
  title: 'Название статьи',
};

const demoUser = {
  id: 100,
  name: 'Иван Иванов',
};

export default function App() {
  const [role, setRole] = useState('user');

  return (
    <>
      <h1>Управление правами доступа</h1>

      <div className="controls">
        <label>Выберите роль: </label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="admin">Администратор</option>
          <option value="user">Пользователь</option>
          <option value="guest">Гость</option>
        </select>
      </div>

      <Article role={role} article={demoArticle} currentUser={demoUser} />
    </>
  );
}
