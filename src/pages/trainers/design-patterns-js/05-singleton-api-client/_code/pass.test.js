import apiClient from './apiClient';

describe('ApiClient', () => {
  it('Класс ApiClient должен быть Синглтоном,', () => {
    const client1 = new apiClient.constructor();
    const client2 = new apiClient.constructor();
    expect(client1).toBe(client2);
  });

  it('а экспортируемый объект должен быть замороженным', () => {
    expect(Object.isFrozen(apiClient)).toBe(true);
  });
});
