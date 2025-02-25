import { calculateAverage } from './lib.js';

const cache = new WeakMap();

/**
 * Функция рассчитывает средние значения оценок пользователей с кешированием результатов
 * @param {Object.<string, number[]>} obj - Данные опроса (пользователь → массив оценок)
 * @returns {number[]} Массив средних значений в порядке пользователей объекта
 * @example
 * // Возвращает [3, 3.6, 1.4]
 * processSurveyData({
 *   user1: [1,2,3,4,5],
 *   user2: [7,1,5,3,2],
 *   user3: [1,2,1,2,1]
 * });
 */
function processSurveyData(obj) {
  // Тяжёлые вычисления: средний балл для каждого пользователя
  const result = '';

  return result;
}

export { processSurveyData };
