import { SandpackConsole, SandpackPreview } from '@codesandbox/sandpack-react';

export const SandpackSidebar = () => {
  return (
    <div className="side-bar">
      <p className="side-bar-title">Просмотр</p>
      <SandpackPreview
        showOpenInCodeSandbox={false}
        showSandpackErrorOverlay={false}
      />
      <p className="side-bar-title">Консоль</p>
      <SandpackConsole resetOnPreviewRestart />
    </div>
  );
};
