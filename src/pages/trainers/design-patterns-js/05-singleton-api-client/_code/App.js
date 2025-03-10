import React, { useEffect, useState } from 'react';
import apiClient from './apiClient';

export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    apiClient
      .get('/todos/1')
      .then((response) => setData(response.data))
      .catch((error) => console.error('Ошибка:', error));
  }, []);

  return (
    data && (
      <div>
        <h1>Title: {data.title}</h1>
        <p>Id: {data.userId}</p>
        <p>UserId: {data.userId}</p>
        <p>Completed: {data.completed}</p>
      </div>
    )
  );
}
