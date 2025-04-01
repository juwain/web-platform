import {
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
  type CodeEditorRef,
} from '@codesandbox/sandpack-react';
import { useEffect, useRef, useState } from 'react';
import { useMatchingMediaQueries } from 'use-matching-media-queries';
import { ServiceBar } from '../ServiceBar/ServiceBar';
import { mapGoalsFromSpecs } from '../../utils/mapGoalsFromSpecs';
import type { Goal, Spec } from '../../types';
import './styles.css';
import { Goals } from '../Goals/Goals';
import { usePersistCode } from '../utils/usePersistCode';
import { Tutorial } from '../Tutorial/Tutorial';
import { parseRange } from '~/utils/parseRange';

import { StateEffect, StateField } from '@codemirror/state';
import { Decoration, EditorView } from '@codemirror/view'; // Correct import

const highlightEffect = StateEffect.define<any>();
const highlightField = StateField.define<any>({
  create: () => Decoration.none,
  update: (value, tr) => {
    value = value.map(tr.changes);
    tr.effects.forEach((effect) => {
      if (effect.is(highlightEffect)) value = effect.value;
    });
    return tr.docChanged && tr.isUserEvent('input') ? Decoration.none : value;
  },
  provide: (f) => EditorView.decorations.from(f),
});

export const SandpackComponents = ({
  nextUrl,
  showSidebar,
  tutorialSource,
}: {
  nextUrl?: string;
  showSidebar: boolean;
  tutorialSource?: Record<
    string,
    Array<Record<string, string | Record<string, string> | Array<string>>>
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
  const tutorialStepHighlight = tutorialStep?.highlight as Array<string>;

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
      const highlights = tutorialStepHighlight || [];

      setTimeout(() => {
        const cm = codemirrorInstance.current?.getCodemirror();
        if (!cm) return;

        const decorations = [];
        for (const range of highlights) {
          const [start, end] = parseRange(range);
          for (let line = start; line <= end; line++) {
            const linePos = cm.state.doc.line(line + 1);
            decorations.push(
              Decoration.line({
                class: 'cm-line-highlight',
              }).range(linePos.from),
            );
          }
        }

        cm.dispatch({
          effects: highlightEffect.of(Decoration.set(decorations)),
        });
      }, 50);
    }
  }, [tutorialStepCode]);

  useEffect(() => {
    if (isTutorial) {
      const [fileName, fileContent] = Object.entries(tutorialStepCode)[0];

      sandpack.updateFile(fileName, fileContent);
      sandpack.openFile(fileName);
    }
  }, [tutorialStepCode]);

  const handleToggleTutorial = (direction: -1 | 1) => {
    setCurrentTutorialStep((prev) => prev + direction);
  };

  const { resetAllFiles } = usePersistCode(!isTutorial);

  const codemirrorInstance = useRef<CodeEditorRef>(null);

  return (
    <SandpackLayout className={isSidebarVisible ? 'with-sidebar' : ''}>
      {/* <SandpackFileExplorer /> */}
      <div className="code-editor-wrapper">
        <SandpackCodeEditor
          showInlineErrors
          showLineNumbers
          showTabs
          ref={codemirrorInstance}
          extensions={[highlightField]}
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
