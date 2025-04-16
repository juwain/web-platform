import { useState } from 'react';

export const useSettings = () => {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('ru');

  return {
    theme,
    language,
    toggleTheme: () => {
      setTheme((theme) => (theme === 'light' ? 'dark' : 'light'));
    },
    setLanguage: (lang) => setLanguage(lang),
  };
};
