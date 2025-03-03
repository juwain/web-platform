import { User } from './user';

describe('User Class', () => {
  const mockData = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    role: 'user',
  };

  it('Класс User корректно инициализирует свойства,', () => {
    const user = new User(mockData);

    expect(user.id).toBe(1);
    expect(user.firstName).toBe('John');
    expect(user.lastName).toBe('Doe');
    expect(user.email).toBe('john.doe@example.com');
    expect(user.role).toBe('user');
  });

  it('возвращает полное имя через геттер fullName,', () => {
    const user = new User(mockData);
    expect(user.fullName).toBe('John Doe');
  });

  it('метод isAdmin() возвращает true для роли admin и false для не-admin ролей', () => {
    const adminUser = new User({ ...mockData, role: 'admin' });
    const regularUser = new User(mockData);
    expect(adminUser.isAdmin()).toBe(true);
    expect(regularUser.isAdmin()).toBe(false);
  });
});
