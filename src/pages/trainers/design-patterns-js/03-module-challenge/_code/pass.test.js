import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';
import { translations } from './translations';

describe('Компонент App', () => {
  test('Рендерятся основные элементы: `<h1>`, `<button>`, `<select>` с корректными текстами', () => {
    render(<App />);

    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  test('Начальное состояние темы и языка: у `<main>` класс `light`, язык – русский', () => {
    render(<App />);

    // Проверка класса темы
    const container = screen.getByRole('main');
    expect(container).toHaveClass('light');

    // Проверка начального языка
    expect(screen.getByText(translations.ru.title)).toBeInTheDocument();
    expect(screen.getByText(translations.ru.languageLabel)).toBeInTheDocument();
  });

  test('По нажатию на кнопку переключается тема со светлой на тёмную и наоборот', async () => {
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

  test('При смене языка в `<select>` переключается язык интерфейса на выбранный', async () => {
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
