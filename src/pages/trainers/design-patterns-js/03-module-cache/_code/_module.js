import { calculateAverage } from './lib.js';

const cache = new WeakMap();

function processSurveyData(obj) {
  // Проверка наличия вычисленного значения в кеше перед вычислением
  if (cache.has(obj)) {
    console.log('Результат взят из кеша');

    return cache.get(obj);
  }

  // Тяжёлые вычисления: средний балл для каждого пользователя
  const result = Object.values(obj).map((value) => calculateAverage(value));

  // Запись вычисленного значения в кеш
  cache.set(obj, result);

  return result;
}

export { processSurveyData };
