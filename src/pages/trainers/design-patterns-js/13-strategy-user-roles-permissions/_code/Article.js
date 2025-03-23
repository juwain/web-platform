import { permissionStrategies } from './permissionStrategies';

const Article = ({ role, article, currentUser }) => {
  const permissions = permissionStrategies[role];

  if (!permissions.canEdit || !permissions.canDelete) {
    return `Для роли ${role} не определены методы canEdit или canDelete`;
  }

  const canEdit = permissions.canEdit(article.ownerId, currentUser.id);
  const canDelete = permissions.canDelete();

  return (
    <div className="article">
      <h2>{article.title}</h2>

      <div className="actions">
        <button disabled={!canEdit} type="button">
          Редактировать
        </button>

        <button disabled={!canDelete} type="button">
          Удалить
        </button>
      </div>

      <p>Редактирование {!canEdit ? 'запрещено' : 'разрешено'}</p>
      <p>Удаление {!canDelete ? 'запрещено' : 'разрешено'}</p>
    </div>
  );
};

export { Article };
