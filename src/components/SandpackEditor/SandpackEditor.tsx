import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  // SandpackFileExplorer,
  SandpackTests,
  SandpackConsole,
  ConsoleIcon,
  RoundedButton,
  SandpackPreview,
} from '@codesandbox/sandpack-react';
import { useState } from 'react';
import { useMatchingMediaQueries } from 'use-matching-media-queries';
import { ServiceBar } from '../ServiceBar/ServiceBar';
import { mapGoalsFromSpecs } from '../../utils/mapGoalsFromSpecs';
import type { SandpackEditorProps } from '../Editor.astro';
import type { Goal, Spec } from '../../types';
import './styles.css';
import { Goals } from '../Goals/Goals';

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
  const isMobile = useMatchingMediaQueries('(max-width: 720px)');

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

  const handleComplete = (result: Record<string, Spec>) => {
    const specs = mapGoalsFromSpecs(result);

    if (specs.length !== 0) {
      queueMicrotask(() => setSpecs(specs));
    }
  };

  return (
    <SandpackLayout className={isSidebarVisible ? 'with-sidebar' : ''}>
      {/* <SandpackFileExplorer /> */}
      <SandpackCodeEditor
        showInlineErrors
        showLineNumbers
        showTabs
      ></SandpackCodeEditor>
      <SandpackTests
        hideTestsAndSupressLogs
        showVerboseButton={false}
        watchMode={true}
        onComplete={handleComplete}
      />
      <ServiceBar>
        <Goals specs={specs} />
        <RoundedButton
          onClick={() => setIsSidebarVisible((prevState) => !prevState)}
          className="toggle-sidebar"
        >
          <ConsoleIcon />
        </RoundedButton>
        {isAllSpecsPassed && nextUrl && (
          <a className="button next-task-button" href={nextUrl}>
            Перейти дальше
          </a>
        )}
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
