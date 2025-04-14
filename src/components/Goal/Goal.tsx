import type { Test } from '~/types';
import { RoundedButton } from '@codesandbox/sandpack-react';
import { useEffect, useRef, useState } from 'react';
import Markdown from 'react-markdown';
import { createPortal } from 'react-dom';

interface GoalProps {
  specs?: Partial<Test>[];
  highlight: boolean;
  index: number;
}

export function Goal({ specs, index, highlight }: GoalProps) {
  const [tooltipShown, setTooltipShown] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });

  const containerRef = useRef<HTMLLIElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const spec = specs?.[index];

  const handleShowTooltip = () => {
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();

      setTooltipPosition({
        top: containerRect.top + window.scrollY - 5,
        left: containerRect.left + window.scrollX,
      });
    }

    setTooltipShown((prev) => !prev);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setTooltipShown((state) => !state);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [tooltipRef]);

  const renderTooltip = () => {
    return createPortal(
      <div
        className="tooltip"
        ref={tooltipRef}
        style={{
          top: tooltipPosition.top,
          left: tooltipPosition.left,
        }}
      >
        {spec?.errors?.map(({ message }) => message)}
      </div>,
      document.body,
    );
  };

  return spec ? (
    <li className={highlight ? spec.status : ''} ref={containerRef}>
      {highlight && spec?.status === 'fail' && (
        <>
          {tooltipShown && renderTooltip()}
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
