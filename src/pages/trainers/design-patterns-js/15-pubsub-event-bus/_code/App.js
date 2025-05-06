import { Notifications } from './Notifications';
import { emit } from './useEvent';
import './style.css';

export default function App() {
  const handleClick = (type) => {
    emit('notify', {
      type,
      message: `Событие: ${type} - ${new Date().toLocaleTimeString()}`,
    });
  };

  return (
    <>
      <Notifications />

      <div className="container">
        <h1>Система уведомлений</h1>

        <div className="controls">
          <button onClick={() => handleClick('error')}>Показать ошибку</button>
          <button onClick={() => handleClick('success')}>Показать успех</button>
          <button onClick={() => handleClick()}>Показать хз</button>
        </div>
      </div>
    </>
  );
}
