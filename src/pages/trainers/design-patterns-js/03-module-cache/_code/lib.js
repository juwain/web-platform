/**
 * Функция для вычисления среднего арифметического значения массива чисел
 * @param {number[]} answers - Массив числовых значений для расчета
 * @returns {number} Среднее арифметическое значение элементов массива
 * @example
 * // Возвращает 2.5
 * calculateAverage([1, 2, 3, 4])
 */
function calculateAverage(answers) {
  const sum = answers.reduce((acc, val) => acc + val, 0);
  return sum / answers.length;
}

export { calculateAverage };
