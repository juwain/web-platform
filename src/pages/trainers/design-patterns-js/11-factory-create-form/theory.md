---
title: "Паттерн Factory (Фабрика), практика: создание формы в фабрике"
---

Представьте, что есть задача построить форму `<form>` динамически, чтобы источником данных служил конфиг с массивом информации о полях:

```js
const formConfig = [
  { type: "text", label: "Text", name: "name" },
  {
    type: "select",
    label: "Text",
    name: "country",
    options: ["Россия", "США", "Германия"],
  },
  { type: "checkbox", label: "Text", name: "agree" },
];
```

На клиенте происходит обход массива в конфиге и для каждого элемента создаётся соответствующее поле:

- для `text` — `<input type="text">` с подписью в `placeholder`
- для `select` — `<select>` с набором опций `<option>` внутри
- для `checkbox` — `<label>` внутри с `<input type="checkbox"` и текстом подписи после него

Для создания такой формы уместно будет использовать «упрощённый» вид Factory. В качестве фабрики будет использоваться объект `FormFieldFactory` с методом `createField`. В зависимости от полученного типа функция возвращает соответствующий JSX-элемент:

```js
/**
 * Генерирует JSX-элемент формы по конфигурации
 * @param {object} config — Объект конфигурации
 * @param {'text'|'select'|'checkbox'} config.type — Тип поля
 * @param {string} config.name — Атрибут name для поля
 * @param {string} config.label — Подпись для текстового поля/чекбокса
 * @param {string[]} [config.options] — Опции для выпадающего списка
 * @returns {JSX.Element|null} React-элемент или null для неизвестных типов
 */
createField(config) {
  switch (config.type) {
    case 'text':
      return (
        // JSX-элемент текстового инпута
      );

    case 'select':
      return (
        // JSX-элемент выпадающего списка
      );

    case 'checkbox':
      return (
        // JSX-элемент чекбокса с подписью
      );

    default:
      // по-умолчанию возвращается null
  }
}
```

В модуле `factory.js` уже создана заготовка объекта `FormFieldFactory` с методом `createField`.

Заполните правильно возвращаемые значения в `switch` JSX-элементами, так чтобы:

- в случае типа `text` возвращался `<input>` с заданными атрибутами `type`, `placeholder` и `name`

- в случае типа `select` возвращался `<select>` с заданным атрибутом `name`, внутри него в цикле по `options` возвращались опции с текстом

- в случае типа `checkbox` возвращался `<label>`, внутри которого есть `<input>` с заданными атрибутами `type` и `name`, а также текст подписи после инпута

- в случае по умолчанию возвращался `null`
