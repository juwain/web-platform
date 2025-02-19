import type { FC } from 'react';
import './styles.css';
import { RoundedButton } from '@codesandbox/sandpack-react';

interface GoalsProps {
  specs?: {
    name: string;
    status: string;
  }[];
}

export const Goals: FC<GoalsProps> = ({ specs }) => {
  return (
    <div className="goals">
      <RoundedButton
        onClick={() =>
          window.open(
            `https://t.me/web_platform_support?text=Hello, world!&profile'`,
          )
        }
        className="need-help"
      >
        <span>?</span>
      </RoundedButton>
      <h2 className="goals-title">Цели:</h2>
      <ul className="goals-list">
        {specs ? (
          specs.map((spec) => (
            <li
              key={spec.name}
              className={spec.status === 'pass' ? 'completed' : ''}
            >
              {spec.name}
            </li>
          ))
        ) : (
          <span className="loader"></span>
        )}
      </ul>
    </div>
  );
};
