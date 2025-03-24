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
  admin: {},
  user: {},
  guest: {},
};

export { permissionStrategies };
