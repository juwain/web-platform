import type { FC } from 'react';
import './styles.css';

interface GoalsProps {
  specs?: {
    name: string;
    status: string;
  }[];
  highlight: boolean;
}

export const Goals: FC<GoalsProps> = ({ specs, highlight }) => {
  return (
    <div className="goals">
      <h2 className="goals-title">Задачи:</h2>
      <ul className="goals-list">
        {specs ? (
          specs.map((spec) => (
            <li key={spec.name} className={highlight ? spec.status : ''}>
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
