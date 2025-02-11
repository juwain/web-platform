import { App } from './index';
import { handleObjectValues } from './module';

describe('Задание 1', () => {
  test("Функция App возвращает 'test'", () => {
    expect(App()).toBe('test');
    expect(handleObjectValues({ test: 'test' }).toBe({ test: 'test' }));
  });
});
