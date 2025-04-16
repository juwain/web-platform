import { FormFieldFactory } from './factory';
import './style.css';

const formConfig = [
  { type: 'text', label: 'Ваше имя', name: 'name' },
  {
    type: 'select',
    label: 'Страна',
    name: 'country',
    options: ['Россия', 'США', 'Германия'],
  },
  { type: 'checkbox', label: 'Согласен с условиями', name: 'agree' },
];

export default function App() {
  return (
    <form>
      {formConfig.map((config) => (
        <div key={config.name}>{FormFieldFactory.createField(config)}</div>
      ))}
    </form>
  );
}
