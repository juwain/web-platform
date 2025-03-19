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
  const visibleFiles = Object.keys(files).filter(
    (file) => !file.includes('.test.'),
  );
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
      />
    </SandpackProvider>
  );
}

const SandpackComponents = ({
  nextUrl,
  showSidebar,
}: {
  nextUrl?: string;
  showSidebar: boolean;
}) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(showSidebar);
  const [specs, setSpecs] = useState<Goal[]>();
  const isAllSpecsPassed = specs?.every((spec) => spec.status === 'pass');
  const [needHighlight, setNeedHighlight] = useState(false);

  const { dispatch } = useSandpack();

  const { resetAllFiles } = usePersistCode();

  const ref = useRef<HTMLDivElement>(null);

  const isTablet = useMatchingMediaQueries('(min-width: 1100px)');

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
    new MutationObserver(function (_, observer) {
      const btn = ref.current?.querySelector('button');

      btn?.click();

      observer.disconnect();
    }).observe(document.querySelector('.tests-panel')!, { childList: true });
  }, []);

  const handleReset = () => {
    resetAllFiles();
  };

  return (
    <SandpackLayout className={isSidebarVisible ? 'with-sidebar' : ''}>
      {/* <SandpackFileExplorer /> */}
      <div className="code-editor-wrapper">
        <SandpackCodeEditor
          showInlineErrors
          showLineNumbers
          showTabs
        ></SandpackCodeEditor>
        <RoundedButton className="code-reset" onClick={handleReset}>
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
          {isAllSpecsPassed && nextUrl && (
            <a className="button next-task-button" href={nextUrl}>
              Перейти дальше
            </a>
          )}
          <div ref={ref}>
            <RoundedButton
              onClick={handleRunTests}
              className="icon-text-button"
            >
              <RunIcon />
              {isTablet && <span>Запустить проверку</span>}
            </RoundedButton>
          </div>
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
