// permissionStrategies.test.js
import { permissionStrategies } from './permissionStrategies';

describe('Тесты стратегий доступа', () => {
  test('Стратегии доступа работают для админа: полный доступ к редактированию и удалению,', () => {
    const admin = permissionStrategies.admin;
    expect(admin.canEdit()).toBe(true);
    expect(admin.canEdit(123, 456)).toBe(true);
    expect(admin.canDelete()).toBe(true);
    expect(admin.canDelete('any_argument')).toBe(true);
  });

  test('для пользователя: редактирование только своих ресурсов,', () => {
    const user = permissionStrategies.user;
    expect(user.canEdit(100, 100)).toBe(true);
    expect(user.canEdit(100, 200)).toBe(false);
    expect(user.canDelete()).toBe(false);
    expect(user.canDelete(100, 'test')).toBe(false);
  });

  test('для гостя: запрет всех действий,', () => {
    const guest = permissionStrategies.guest;
    expect(guest.canEdit()).toBe(false);
    expect(guest.canEdit(999, 999)).toBe(false);
    expect(guest.canDelete()).toBe(false);
    expect(guest.canDelete(null)).toBe(false);
  });

  test('у каждой стратегии имеются методы canEdit и canDelete', () => {
    Object.values(permissionStrategies).forEach((strategy) => {
      expect(strategy.canEdit).toBeInstanceOf(Function);
      expect(strategy.canDelete).toBeInstanceOf(Function);
    });
  });
});
