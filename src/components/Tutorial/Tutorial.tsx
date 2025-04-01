import Markdown from 'react-markdown';
import './styles.css';

interface TutorialProps {
  currentStep: number;
  totalSteps?: number;
  content: string;
}

export function Tutorial({ currentStep, content, totalSteps }: TutorialProps) {
  return (
    <div className="tutorial">
      <h2 className="tutorial-title">
        Шаг {currentStep + 1} {totalSteps && `из ${totalSteps}`}
      </h2>
      <div className="tutorial-text">
        <Markdown>{content}</Markdown>
      </div>
    </div>
  );
}
