import axios from 'axios';

let instance;

class ApiClient {
  constructor() {
    if (instance) {
      return instance;
    }

    this.client = axios.create({
      baseURL: 'https://jsonplaceholder.typicode.com',
      timeout: 5000,
      headers: { 'Content-Type': 'application/json' },
    });

    instance = this;

    return instance;
  }

  get(endpoint) {
    return this.client.get(endpoint);
  }
}

const apiClient = Object.freeze(new ApiClient());

export default apiClient;
