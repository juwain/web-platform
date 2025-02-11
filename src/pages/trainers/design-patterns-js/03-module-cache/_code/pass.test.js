import { processSurveyData } from './module.js';

describe('processSurveyData', () => {
  it('Функция processSurveyData корректно вычисляет значения и возвращает полученный массив,', () => {
    const surveyData = {
      user1: [1, 2, 3, 4, 5],
      user2: [7, 1, 5, 3, 2],
      user3: [1, 2, 1, 2, 1],
      user4: [2, 2, 3, 2, 3],
      user5: [5, 4, 3, 4, 5],
    };

    const expectedAverages = [
      (1 + 2 + 3 + 4 + 5) / 5,
      (7 + 1 + 5 + 3 + 2) / 5,
      (1 + 2 + 1 + 2 + 1) / 5,
      (2 + 2 + 3 + 2 + 3) / 5,
      (5 + 4 + 3 + 4 + 5) / 5,
    ];

    const result = processSurveyData(surveyData);

    expect(result).toEqual(expectedAverages);
  });

  it('возвращает закешированный результат при повторном вызове с тем же объектом', () => {
    const surveyData = {
      user1: [1, 2, 3, 4, 5],
      user2: [7, 1, 5, 3, 2],
    };

    const expectedAverages = [
      (1 + 2 + 3 + 4 + 5) / 5, // user1
      (7 + 1 + 5 + 3 + 2) / 5, // user2
    ];

    const firstResult = processSurveyData(surveyData);

    expect(firstResult).toEqual(expectedAverages);

    const secondResult = processSurveyData(surveyData);

    expect(secondResult).toBe(firstResult);
    expect(secondResult).toEqual(expectedAverages);
  });

  it('и возвращает пустой массив, если передан пустой объект', () => {
    const surveyData = {};

    const result = processSurveyData(surveyData);

    expect(result).toEqual([]);
  });
});
