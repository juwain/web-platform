import { processSurveyData } from './module.js';

describe('processSurveyData', () => {
  it('should calculate the average for each user correctly', () => {
    const surveyData = {
      user1: [1, 2, 3, 4, 5],
      user2: [7, 1, 5, 3, 2],
      user3: [1, 2, 1, 2, 1],
      user4: [2, 2, 3, 2, 3],
      user5: [5, 4, 3, 4, 5],
    };

    const expectedAverages = [
      (1 + 2 + 3 + 4 + 5) / 5, // user1
      (7 + 1 + 5 + 3 + 2) / 5, // user2
      (1 + 2 + 1 + 2 + 1) / 5, // user3
      (2 + 2 + 3 + 2 + 3) / 5, // user4
      (5 + 4 + 3 + 4 + 5) / 5, // user5
    ];

    const result = processSurveyData(surveyData);

    expect(result).toEqual(expectedAverages);
  });

  it('should return cached result if the same object is processed again', () => {
    const surveyData = {
      user1: [1, 2, 3, 4, 5],
      user2: [7, 1, 5, 3, 2],
    };

    const expectedAverages = [
      (1 + 2 + 3 + 4 + 5) / 5, // user1
      (7 + 1 + 5 + 3 + 2) / 5, // user2
    ];

    // Первый вызов
    const firstResult = processSurveyData(surveyData);

    // Проверяем, что результат корректный
    expect(firstResult).toEqual(expectedAverages);

    // Второй вызов
    const secondResult = processSurveyData(surveyData);

    // Проверяем, что результат закэширован (тот же самый объект)
    expect(secondResult).toBe(firstResult);

    // Проверяем, что результат по-прежнему корректный
    expect(secondResult).toEqual(expectedAverages);
  });

  it('should handle empty survey data', () => {
    const surveyData = {};

    const result = processSurveyData(surveyData);

    expect(result).toEqual([]);
  });
});
