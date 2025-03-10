// import axios from 'axios';
import apiClient from './apiClient';

// Мокаем axios
// jest.mock('axios');

describe('ApiClient', () => {
  beforeEach(() => {
    // Очищаем моки перед каждым тестом
    // jest.clearAllMocks();
  });

  it('Класс ApiClient должен быть синглтоном,', () => {
    const client1 = new apiClient.constructor();
    const client2 = new apiClient.constructor();
    expect(client1).toBe(client2);
  });

  it('а экспортируемый объект должен быть замороженным', () => {
    expect(Object.isFrozen(apiClient)).toBe(true);
  });
});
