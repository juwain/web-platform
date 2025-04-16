import { useSettings } from './useSettings';
import { translations } from './translations';

export default function App() {
  return (
    <main className="light">
      <h1>Настройки</h1>
      <div className="controls">
        <button type="button">Сменить тему</button>
        <div className="switch">
          <label htmlFor="language">Язык</label>
          <select name="language" value="Русский" onChange={(e) => {}}>
            <option value="ru">Русский</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
    </main>
  );
}
