import type { Test } from '~/types';
import './styles.css';
import { Goal } from '../Goal/Goal';

interface GoalsProps {
  specs?: Partial<Test>[];
  highlight: boolean;
}

export function Goals({ specs, highlight }: GoalsProps) {
  return (
    <div className="goals">
      <h2 className="goals-title">Тесты:</h2>
      <ul className="goals-list">
        {specs ? (
          specs.map((spec, index) => (
            <Goal
              key={spec.name}
              specs={specs}
              index={index}
              highlight={highlight}
            />
          ))
        ) : (
          <span className="loader"></span>
        )}
      </ul>
    </div>
  );
}
