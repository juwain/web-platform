import { permissionStrategies } from './permissionStrategies';
import './style.css';

const article = {
  id: 1,
  ownerId: 100,
  title: 'Название статьи',
  text: 'Текст статьи',
};

const currentUser = {
  id: 100,
  name: 'Иван Иванов',
  role: 'admin',
};

export default function App() {
  const permissions = permissionStrategies[currentUser.role];

  const canEdit = permissions.canEdit(article.ownerId, currentUser.id);
  const canDelete = permissions.canDelete();

  return (
    <article>
      <h2>{article.title}</h2>
      <p>{article.text}</p>

      <div className="actions">
        <button disabled={!canEdit} type="button">
          Редактировать
        </button>

        <button disabled={!canDelete} type="button">
          Удалить
        </button>
      </div>
    </article>
  );
}
