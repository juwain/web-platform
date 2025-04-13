import {
  SandpackLayout,
  SandpackCodeEditor,
  // SandpackFileExplorer,
  SandpackTests,
  ConsoleIcon,
  RunIcon,
  RoundedButton,
  useSandpack,
  RefreshIcon,
} from '@codesandbox/sandpack-react';
import { useEffect, useRef, useState } from 'react';
import { useMatchingMediaQueries } from 'use-matching-media-queries';
import { ServiceBar } from '../ServiceBar/ServiceBar';
import { mapGoalsFromTestResult } from '../../utils/mapGoalsFromTestResult';
import type { Spec, Test } from '../../types';

import { Goals } from '../Goals/Goals';
import { usePersistCode } from '../utils/usePersistCode';
import { SandpackSidebar } from '../SandpackSidebar/SandpackSidebar';

export const SandpackTask = ({
  nextUrl,
  showSidebar,
}: {
  nextUrl?: string;
  showSidebar: boolean;
}) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(showSidebar);
  const [specs, setSpecs] = useState<Partial<Test>[]>();
  const [needHighlight, setNeedHighlight] = useState(false);

  const isAllSpecsPassed = specs?.every((spec) => spec.status === 'pass');
  const isTablet = useMatchingMediaQueries('(min-width: 1100px)');
  const ref = useRef<HTMLDivElement>(null);

  const { dispatch } = useSandpack();

  const handleComplete = (result: Record<string, Spec>) => {
    const specs = mapGoalsFromTestResult(result);

    if (specs?.length !== 0) {
      queueMicrotask(() => setSpecs(specs));
    }
  };

  const handleRunTests = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch({ type: 'run-all-tests' });
    setNeedHighlight(event.isTrusted);
  };

  useEffect(() => {
    new MutationObserver(function (_, observer) {
      const btn = ref.current?.querySelector('button');

      btn?.click();

      observer.disconnect();
    }).observe(document.querySelector('.tests-panel')!, { childList: true });
  }, []);

  const { resetAllFiles } = usePersistCode();

  return (
    <SandpackLayout className={isSidebarVisible ? 'with-sidebar' : ''}>
      {/* <SandpackFileExplorer /> */}
      <div className="code-editor-wrapper">
        <SandpackCodeEditor
          showInlineErrors
          showLineNumbers
          showTabs
        ></SandpackCodeEditor>
        <RoundedButton className="top-bar-controls" onClick={resetAllFiles}>
          <RefreshIcon />
          {isTablet && <span>Сбросить всё</span>}
        </RoundedButton>
      </div>
      <SandpackTests
        hideTestsAndSupressLogs
        showVerboseButton={false}
        watchMode={false}
        onComplete={handleComplete}
      />
      <ServiceBar>
        <Goals specs={specs} highlight={needHighlight} />
        <div className="service-bar-controls">
          <>
            <div ref={ref}>
              <RoundedButton
                onClick={handleRunTests}
                className="icon-text-button"
              >
                <RunIcon />
                {isTablet && <span>Запустить проверку</span>}
              </RoundedButton>
            </div>
            {isAllSpecsPassed && nextUrl && (
              <a className="button next-task-button" href={nextUrl}>
                Перейти дальше
              </a>
            )}
          </>
          <RoundedButton
            onClick={() => setIsSidebarVisible((prevState) => !prevState)}
            className="icon-text-button side-button"
          >
            <ConsoleIcon />
            {isTablet && (
              <span>{isSidebarVisible ? 'Скрыть' : 'Показать'} консоль</span>
            )}
          </RoundedButton>
        </div>
      </ServiceBar>
      <SandpackSidebar />
    </SandpackLayout>
  );
};
