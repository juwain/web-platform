import { useSettings } from './useSettings';
import { translations } from './translations';

export default function App() {
  const { theme, language, toggleTheme, setLanguage } = useSettings();
  const t = translations[language];

  return (
    <main className={theme}>
      <h1>{t.title}</h1>
      <div className="controls">
        <button type="button" onClick={toggleTheme}>
          {t.toggleTheme}
        </button>
        <div className="switch">
          <label htmlFor="language">{t.languageLabel}</label>
          <select
            name="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="ru">Русский</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
    </main>
  );
}
