import axios from 'axios';

let instance;

/**
 * Singleton API-клиент
 * @class
 * @example
 * // Использование клиента
 * apiClient.get('/todos/1')
 *   .then(response => console.log(response.data))
 *   .catch(error => console.error('Ошибка:', error));
 *
 * // Все импорты клиента используют один экземпляр:
 * import client from './apiClient';
 * client.get('/todos/1'); // => Promise
 */
class ApiClient {
  constructor() {
    this.client = axios.create({
      baseURL: 'https://jsonplaceholder.typicode.com',
      timeout: 5000,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  get(endpoint) {
    return this.client.get(endpoint);
  }
}

const apiClient = new ApiClient();

export default apiClient;
