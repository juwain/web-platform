import { useActiveCode, useSandpack } from '@codesandbox/sandpack-react';
import { useEffect, useLayoutEffect } from 'react';
import { ls } from '~/utils/localStorage';

export const usePersistCode = (needPersist: boolean) => {
  if (!needPersist) return {};

  const { code } = useActiveCode();
  const { sandpack } = useSandpack();

  useLayoutEffect(() => {
    sandpack.visibleFiles.forEach((file) => {
      const currentFileKey = `${location.pathname}${file}`;
      const currentPersistedCode = ls.get(currentFileKey);

      if (!currentPersistedCode) return;

      sandpack.updateFile(file, currentPersistedCode, true);
    });
  }, [sandpack.visibleFiles]);

  const currentFileKey = `${location.pathname}${sandpack.activeFile}`;

  useEffect(() => {
    const currentPersistedCode = ls.get(currentFileKey);

    if (currentPersistedCode !== code) {
      ls.set(currentFileKey, code);
    }
  }, [sandpack.activeFile, code]);

  return {
    resetAllFiles: () => {
      sandpack.resetAllFiles();

      sandpack.visibleFiles.forEach((file) => {
        const currentFileKey = `${location.pathname}${file}`;
        ls.remove(currentFileKey);
      });

      location.reload();
    },
  };
};
