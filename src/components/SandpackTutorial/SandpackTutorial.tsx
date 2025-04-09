import {
  SandpackLayout,
  SandpackCodeEditor,
  // SandpackFileExplorer,
  ConsoleIcon,
  RoundedButton,
  useSandpack,
  BackwardIcon,
  ForwardIcon,
  type CodeEditorRef,
} from '@codesandbox/sandpack-react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useMatchingMediaQueries } from 'use-matching-media-queries';
import { ServiceBar } from '../ServiceBar/ServiceBar';
import './styles.css';
import { Tutorial } from '../Tutorial/Tutorial';
import { parseRange } from '~/utils/parseRange';

import { StateEffect, StateField } from '@codemirror/state';
import { Decoration, EditorView } from '@codemirror/view';
import type { Range } from '@codemirror/state';
import { SandpackSidebar } from '../SandpackSidebar/SandpackSidebar';

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

export const SandpackTutorial = ({
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

  const tutorialContent = tutorialSource?.content;
  const isFirstTutorialStep = currentTutorialStep === 0;
  const isLastTutorialStep =
    currentTutorialStep === Number(tutorialContent?.length) - 1;
  const tutorialStep = tutorialContent?.[currentTutorialStep];
  const tutorialStepDescription = tutorialStep?.description as string;
  const tutorialStepCode = tutorialStep?.code as Record<string, string>;
  const tutorialStepHighlight = tutorialStep?.highlight as Array<string>;
  const tutorialStepActiveFile = tutorialStep?.activeFile as string;

  const [isSidebarVisible, setIsSidebarVisible] = useState(showSidebar);

  const isTablet = useMatchingMediaQueries('(min-width: 1100px)');

  const { sandpack } = useSandpack();

  useLayoutEffect(() => {
    Object.entries(tutorialStepCode).forEach(([fileName, fileContent]) => {
      sandpack.updateFile(fileName, fileContent);

      if (fileName === tutorialStepActiveFile) {
        sandpack.openFile(fileName);
      }
    });
  }, [tutorialStepCode]);

  useEffect(() => {
    const highlights = tutorialStepHighlight || [];

    setTimeout(() => {
      const cm = codemirrorInstance.current?.getCodemirror();
      if (!cm) return;

      let firstHighlight: number | null = null;
      const decorations: Range<Decoration>[] = [];

      highlights.forEach((range) => {
        const [start, end] = parseRange(range);
        for (let line = start; line <= end; line++) {
          try {
            const linePos = cm.state.doc.line(line + 1);
            decorations.push(
              Decoration.line({ class: 'cm-line-highlight' }).range(
                linePos.from,
              ),
            );

            // Track first highlight position
            if (firstHighlight === null) {
              firstHighlight = linePos.from;
            }
          } catch (e) {
            console.warn(`Line ${line + 1} not found`);
          }
        }
      });

      const effects = [];

      if (decorations.length > 0) {
        effects.push(highlightEffect.of(Decoration.set(decorations)));
      }

      const scrollContainer = cm.scrollDOM;
      const hasVerticalScroll =
        scrollContainer.scrollHeight > scrollContainer.clientHeight;

      if (hasVerticalScroll && firstHighlight !== null) {
        effects.push(
          EditorView.scrollIntoView(firstHighlight, {
            y: 'nearest',
            yMargin: 100,
          }),
        );
      }

      cm.dispatch({ effects });
    }, 100);
  }, [tutorialStepCode]);

  const handleToggleTutorial = (direction: -1 | 1) => {
    setCurrentTutorialStep((prev) => prev + direction);
  };

  const handleSaveTutorialStep = () => {
    const step = {
      code: {},
      activeFile: '',
      description: '',
      highlight: [],
    };

    step.code = Object.fromEntries(
      sandpack.visibleFiles.map((file) => [file, sandpack.files[file].code]),
    );
    step.activeFile = sandpack.activeFile;

    const currentCode = JSON.parse(
      sandpack.files['/tutorial.source.json'].code,
    );

    currentCode.content.push(step);

    const code = JSON.stringify(currentCode);

    sandpack.updateFile('/tutorial.source.json', code, false);
  };

  const handleOpenTutorialSource = () => {
    sandpack.openFile('/tutorial.source.json');
  };

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
        {import.meta.env.MODE === 'development' && (
          <div className="top-bar-controls">
            <RoundedButton onClick={handleSaveTutorialStep}>
              <span>Сохранить</span>
            </RoundedButton>
            <RoundedButton onClick={handleOpenTutorialSource}>
              <span>Открыть</span>
            </RoundedButton>
          </div>
        )}
      </div>
      <ServiceBar>
        <Tutorial
          currentStep={currentTutorialStep}
          totalSteps={tutorialContent?.length}
          content={tutorialStepDescription}
        />
        <div className="service-bar-controls">
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
          {isLastTutorialStep && nextUrl && (
            <a className="button next-task-button" href={nextUrl}>
              Перейти дальше
            </a>
          )}
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
