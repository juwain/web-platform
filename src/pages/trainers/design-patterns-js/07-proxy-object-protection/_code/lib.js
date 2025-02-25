/**
 * Функция создает защищенный объект, запрещающий добавление новых свойств
 * @param {object} obj - Исходный объект для защиты
 * @returns {Proxy} Прокси-объект с ограничениями на модификацию
 * @throws {Error} При попытке добавить новое свойство
 * @example
 * // Создание защищенного объекта
 * const original = { a: 1, b: 2 };
 * const protectedObj = createProtectedObject(original);
 *
 * protectedObj.a = 42; // Успешное изменение
 * protectedObj.c = 100; // Error: В объект нельзя добавлять  новые свойства
 */
export function createProtectedObject(obj) {}
