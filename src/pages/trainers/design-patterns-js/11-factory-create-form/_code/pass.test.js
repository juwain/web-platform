import { FormFieldFactory } from './factory';

describe('FormFieldFactory', () => {
  it('Фабрика FormFieldFactory создает текстовый <input> с корректными параметрами,', () => {
    const config = {
      type: 'text',
      name: 'username',
      label: 'Введите имя пользователя',
    };

    const field = FormFieldFactory.createField(config);

    expect(field.type).toBe('input');
    expect(field.props).toMatchObject({
      type: 'text',
      name: 'username',
      placeholder: 'Введите имя пользователя',
    });
  });

  it('создаёт <select> с нужными <option>,', () => {
    const config = {
      type: 'select',
      name: 'country',
      options: ['Россия', 'Беларусь', 'Казахстан'],
    };

    const field = FormFieldFactory.createField(config);
    const options = field.props.children;

    expect(field.type).toBe('select');
    expect(options).toHaveLength(3);
    options.forEach((opt, i) => {
      expect(opt.type).toBe('option');
      expect(opt.props.value).toBe(config.options[i]);
      expect(opt.props.children).toBe(config.options[i]);
    });
  });

  it('а также создает чекбокс с подписью <label>', () => {
    const config = {
      type: 'checkbox',
      name: 'agreement',
      label: 'Согласен с условиями',
    };

    const field = FormFieldFactory.createField(config);
    const [input, labelText] = field.props.children;

    expect(field.type).toBe('label');
    expect(input.type).toBe('input');
    expect(input.props.type).toBe('checkbox');
    expect(labelText).toBe('Согласен с условиями');
  });

  it('и возвращает null для неизвестного типа', () => {
    const config = { type: 'unknown' };
    const field = FormFieldFactory.createField(config);
    expect(field).toBeNull();
  });
});
