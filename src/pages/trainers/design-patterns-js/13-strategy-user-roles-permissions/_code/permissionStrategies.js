/**
 * Стратегии управления правами доступа по ролям пользователей
 * @example
 * // Проверка прав администратора
 * permissionStrategies.admin.canEdit(); // true
 *
 * // Проверка прав пользователя на редактирование
 * const isOwner = permissionStrategies.user.canEdit(1001, 1001); // true
 *
 * @description
 * Реализует паттерн Стратегия для проверки прав:
 * 1. admin - полные права
 * 2. user - ограниченные права
 * 3. guest - минимальные права
 */
const permissionStrategies = {
  admin: {
    // canEdit: () => true,
    // canDelete: () => true,
  },
  user: {
    // canEdit: (ownerId, currentUserId) => ownerId === currentUserId,
    // canDelete: () => false,
  },
  guest: {
    // canEdit: () => false,
    // canDelete: () => false,
  },
};

export { permissionStrategies };
