export function createProtectedObject(obj) {
  return new Proxy(obj, {
    set(target, property, value) {
      // Запрещаем добавление новых свойств
      if (!(property in target)) {
        throw new Error(`Добавление нового свойства '${property}' запрещено`);
      }

      // Разрешаем изменение существующих свойств
      target[property] = value;
      return true;
    },
  });
}
