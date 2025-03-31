import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  // SandpackFileExplorer,
  SandpackTests,
  SandpackConsole,
  ConsoleIcon,
  RunIcon,
  RoundedButton,
  SandpackPreview,
  useSandpack,
  RefreshIcon,
  BackwardIcon,
  ForwardIcon,
} from '@codesandbox/sandpack-react';
import { useEffect, useRef, useState } from 'react';
import { useMatchingMediaQueries } from 'use-matching-media-queries';
import { ServiceBar } from '../ServiceBar/ServiceBar';
import { mapGoalsFromSpecs } from '../../utils/mapGoalsFromSpecs';
import type { SandpackEditorProps } from '../Editor.astro';
import type { Goal, Spec } from '../../types';
import './styles.css';
import { Goals } from '../Goals/Goals';
import { usePersistCode } from '../utils/usePersistCode';
import { Tutorial } from '../Tutorial/Tutorial';

const classes = {
  'sp-layout': 'editor-layout',
  'sp-file-explorer': 'file-explorer',
  'sp-editor': 'code-editor',
  'sp-tests': 'tests-panel',
  'sp-console': 'console',
  'sp-console-item': 'console-item',
};

export function SandpackEditor({
  template,
  files,
  nextUrl,
  options,
}: SandpackEditorProps) {
  const { showSidebar, customSetup } = options ?? {};

  const visibleFiles = Object.keys(files).filter((file) => {
    return ['.test.', '.source.'].every(
      (exception) => !file.includes(exception),
    );
  });
  const hasTutorial = Boolean(files['tutorial.source.json']);
  const tutorialSource = hasTutorial
    ? JSON.parse(files['tutorial.source.json'] as string)
    : null;

  const isMobile = useMatchingMediaQueries('(max-width: 850px)');

  return (
    <SandpackProvider
      template={template}
      theme="auto"
      files={files}
      options={{
        classes,
        visibleFiles: visibleFiles,
        bundlerURL: import.meta.env.PUBLIC_BUNDLER_URL,
        recompileMode: 'delayed',
        recompileDelay: 500,
      }}
      customSetup={customSetup}
    >
      <SandpackComponents
        nextUrl={nextUrl}
        showSidebar={!isMobile && Boolean(showSidebar)}
        tutorialSource={tutorialSource}
      />
    </SandpackProvider>
  );
}

const SandpackComponents = ({
  nextUrl,
  showSidebar,
  tutorialSource,
}: {
  nextUrl?: string;
  showSidebar: boolean;
  tutorialSource?: Record<
    string,
    Array<Record<string, string | Record<string, string>>>
  >;
}) => {
  const [currentTutorialStep, setCurrentTutorialStep] = useState(0);

  const isTutorial = Boolean(tutorialSource);
  const tutorialContent = tutorialSource?.content;
  const isFirstTutorialStep = currentTutorialStep === 0;
  const isLastTutorialStep =
    currentTutorialStep === Number(tutorialContent?.length) - 1;
  const tutorialStep = tutorialContent?.[currentTutorialStep];
  const tutorialStepDescription = tutorialStep?.description as string;
  const tutorialStepCode = tutorialStep?.code as Record<string, string>;

  const [isSidebarVisible, setIsSidebarVisible] = useState(showSidebar);
  const [specs, setSpecs] = useState<Goal[]>();
  const [needHighlight, setNeedHighlight] = useState(false);

  const isAllSpecsPassed = specs?.every((spec) => spec.status === 'pass');
  const isTablet = useMatchingMediaQueries('(min-width: 1100px)');
  const ref = useRef<HTMLDivElement>(null);

  const { dispatch, sandpack } = useSandpack();

  const handleComplete = (result: Record<string, Spec>) => {
    const specs = mapGoalsFromSpecs(result);

    if (specs?.length !== 0) {
      queueMicrotask(() => setSpecs(specs));
    }
  };

  const handleRunTests = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch({ type: 'run-all-tests' });
    setNeedHighlight(event.isTrusted);
  };

  useEffect(() => {
    if (!isTutorial) {
      new MutationObserver(function (_, observer) {
        const btn = ref.current?.querySelector('button');

        btn?.click();

        observer.disconnect();
      }).observe(document.querySelector('.tests-panel')!, { childList: true });
    }
  }, []);

  useEffect(() => {
    if (isTutorial) {
      const [fileName, fileContent] = Object.entries(tutorialStepCode)[0];

      sandpack.openFile(fileName);
      sandpack.updateFile(fileName, fileContent);
    }
  }, [tutorialStepCode]);

  const handleToggleTutorial = (direction: -1 | 1) => {
    setCurrentTutorialStep((prev) => prev + direction);
  };

  const { resetAllFiles } = usePersistCode(!isTutorial);

  return (
    <SandpackLayout className={isSidebarVisible ? 'with-sidebar' : ''}>
      {/* <SandpackFileExplorer /> */}
      <div className="code-editor-wrapper">
        <SandpackCodeEditor
          showInlineErrors
          showLineNumbers
          showTabs
        ></SandpackCodeEditor>
        {!isTutorial && (
          <RoundedButton className="code-reset" onClick={resetAllFiles}>
            <RefreshIcon />
            {isTablet && <span>Сбросить всё</span>}
          </RoundedButton>
        )}
      </div>
      {!isTutorial && (
        <SandpackTests
          hideTestsAndSupressLogs
          showVerboseButton={false}
          watchMode={false}
          onComplete={handleComplete}
        />
      )}
      <ServiceBar>
        {isTutorial ? (
          <Tutorial
            currentStep={currentTutorialStep}
            totalSteps={tutorialContent?.length}
            content={tutorialStepDescription}
          />
        ) : (
          <Goals specs={specs} highlight={needHighlight} />
        )}
        <div className="service-bar-controls">
          {isTutorial ? (
            <>
              <RoundedButton
                onClick={() => handleToggleTutorial(-1)}
                className={`icon-text-button ${isFirstTutorialStep ? 'disabled' : ''}`}
              >
                <BackwardIcon />
                {isTablet && <span>Назад</span>}
              </RoundedButton>
              <RoundedButton
                onClick={() => handleToggleTutorial(1)}
                className={`icon-text-button ${isLastTutorialStep ? 'disabled' : ''}`}
              >
                <ForwardIcon />
                {isTablet && <span>Вперёд</span>}
              </RoundedButton>
            </>
          ) : (
            <>
              {isAllSpecsPassed && nextUrl && (
                <a className="button next-task-button" href={nextUrl}>
                  Перейти дальше
                </a>
              )}
              <div ref={ref}>
                {!isTutorial ? (
                  <RoundedButton
                    onClick={handleRunTests}
                    className="icon-text-button"
                  >
                    <RunIcon />
                    {isTablet && <span>Запустить проверку</span>}
                  </RoundedButton>
                ) : null}
              </div>
            </>
          )}
          <RoundedButton
            onClick={() => setIsSidebarVisible((prevState) => !prevState)}
            className="icon-text-button"
          >
            <ConsoleIcon />
            {isTablet && (
              <span>{isSidebarVisible ? 'Скрыть' : 'Показать'} консоль</span>
            )}
          </RoundedButton>
        </div>
      </ServiceBar>
      <div className="side-bar">
        <p className="side-bar-title">Просмотр</p>
        <SandpackPreview
          showOpenInCodeSandbox={false}
          showSandpackErrorOverlay={false}
        />
        <p className="side-bar-title">Консоль</p>
        <SandpackConsole resetOnPreviewRestart />
      </div>
    </SandpackLayout>
  );
};
