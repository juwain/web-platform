/**
 * Фабрика для создания элементов формы на основе конфигурации
 * @example
 * // Создание текстового поля
 * FormFieldFactory.createField({
 *   type: 'text',
 *   name: 'username',
 *   label: 'Введите имя'
 * });
 *
 * // Создание выпадающего списка
 * FormFieldFactory.createField({
 *   type: 'select',
 *   name: 'city',
 *   options: ['Москва', 'Санкт-Петербург', 'Казань']
 * });
 */
const FormFieldFactory = {
  createField(config) {
    switch (config.type) {
      case 'text':
        return 'input[type="text"]';

      case 'select':
        return 'select > option';

      case 'checkbox':
        return 'label > input[type="checkbox"] + text';

      default:
        return;
    }
  },
};

export { FormFieldFactory };
