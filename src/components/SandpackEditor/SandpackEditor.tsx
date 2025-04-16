import { SandpackProvider } from '@codesandbox/sandpack-react';
import { useMatchingMediaQueries } from 'use-matching-media-queries';
import type { SandpackEditorProps } from '../Editor.astro';
import { SandpackTutorial } from '../SandpackTutorial/SandpackTutorial';
import { SandpackTask } from '../SandpackTask/SandpackTask';
import './styles.css';

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
      {hasTutorial ? (
        <SandpackTutorial
          nextUrl={nextUrl}
          showSidebar={!isMobile && Boolean(showSidebar)}
          tutorialSource={tutorialSource}
        />
      ) : (
        <SandpackTask
          nextUrl={nextUrl}
          showSidebar={!isMobile && Boolean(showSidebar)}
        />
      )}
    </SandpackProvider>
  );
}
