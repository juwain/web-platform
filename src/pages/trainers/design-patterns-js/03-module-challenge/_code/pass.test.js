import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';
import { translations } from './translations';

describe('Компонент App', () => {
  test('Рендерит основные элементы', () => {
    render(<App />);

    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  test('Начальное состояние темы и языка', () => {
    render(<App />);

    // Проверка класса темы
    const container = screen.getByRole('main');
    expect(container).toHaveClass('light');

    // Проверка начального языка
    expect(screen.getByText(translations.ru.title)).toBeInTheDocument();
    expect(screen.getByText(translations.ru.languageLabel)).toBeInTheDocument();
  });

  test('Переключение темы', async () => {
    render(<App />);
    const button = screen.getByRole('button');
    const container = screen.getByRole('main');

    // Первое переключение
    fireEvent.click(button);
    expect(container).toHaveClass('dark');

    // Второе переключение
    fireEvent.click(button);
    expect(container).toHaveClass('light');
  });

  test('Смена языка', async () => {
    render(<App />);
    const select = screen.getByRole('combobox');

    // Меняем на английский
    fireEvent.change(select, { target: { value: 'en' } });

    // Проверяем английские тексты
    expect(screen.getByText(translations.en.title)).toBeInTheDocument();
    expect(screen.getByText(translations.en.languageLabel)).toBeInTheDocument();

    // Возвращаем русский
    fireEvent.change(select, { target: { value: 'ru' } });
    expect(screen.getByText(translations.ru.title)).toBeInTheDocument();
  });
});
