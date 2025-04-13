import type { Test } from '~/types';
import { RoundedButton } from '@codesandbox/sandpack-react';
import { useEffect, useRef, useState } from 'react';
import Markdown from 'react-markdown';

interface GoalProps {
  specs?: Partial<Test>[];
  highlight: boolean;
  index: number;
}

export function Goal({ specs, index, highlight }: GoalProps) {
  const [tooltipShown, setTooltipShown] = useState(false);

  const handleShowTooltip = () => {
    setTooltipShown((state) => !state);
  };

  const spec = specs?.[index];

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setTooltipShown((state) => !state);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return spec ? (
    <li className={highlight ? spec.status : ''}>
      {highlight && spec?.status === 'fail' && (
        <>
          {tooltipShown && (
            <div className="tooltip" ref={ref}>
              {spec.errors?.map(({ message }) => message)}
            </div>
          )}
          <RoundedButton
            className="goals-info-button"
            onClick={handleShowTooltip}
          >
            <span>?</span>
          </RoundedButton>
        </>
      )}
      <Markdown>{spec.name}</Markdown>
    </li>
  ) : null;
}
