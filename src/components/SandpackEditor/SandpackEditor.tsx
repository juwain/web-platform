import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  // SandpackFileExplorer,
  SandpackTests,
  SandpackConsole,
  ConsoleIcon,
  RoundedButton,
} from "@codesandbox/sandpack-react";
import { useState } from "react";
import { ServiceBar } from "../ServiceBar/ServiceBar";
import { mapGoalsFromSpecs } from "../../utils/mapGoalsFromSpecs";
import type { SandpackEditorProps } from "../Editor.astro";
import type { Goal, Spec } from "../../types";
import "./styles.css";
import { Goals } from "../Goals/Goals";

const classes = {
  "sp-layout": "editor-layout",
  "sp-file-explorer": "file-explorer",
  "sp-editor": "code-editor",
  "sp-tests": "tests-panel",
  "sp-console": "console",
};

export function SandpackEditor({
  template,
  files,
  nextUrl,
}: SandpackEditorProps) {
  const visibleFiles = Object.keys(files).filter(
    (file) => !file.includes(".test.")
  );

  return (
    <SandpackProvider
      template={template}
      theme="light"
      files={files}
      options={{
        classes,
        visibleFiles: visibleFiles,
      }}
      customSetup={{
        dependencies: { espree: "^10.0.1" },
      }}
    >
      <SandpackComponents nextUrl={nextUrl} />
    </SandpackProvider>
  );
}

const SandpackComponents = ({ nextUrl }: { nextUrl?: string }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [specs, setSpecs] = useState<Goal[]>();
  const isAllSpecsPassed = specs?.every((spec) => spec.status === "pass");

  const handleComplete = (result: Record<string, Spec>) => {
    const specs = mapGoalsFromSpecs(result);

    if (specs.length !== 0) {
      queueMicrotask(() => setSpecs(specs));
    }
  };

  return (
    <SandpackLayout className={isSidebarVisible ? "with-sidebar" : ""}>
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
      {isSidebarVisible && (
        <div className="side-bar">
          <SandpackConsole resetOnPreviewRestart />
        </div>
      )}
    </SandpackLayout>
  );
};
