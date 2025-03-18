import { useActiveCode, useSandpack } from '@codesandbox/sandpack-react';
import { useEffect, useLayoutEffect } from 'react';
import { ls } from '~/utils/localStorage';

export const usePersistCode = () => {
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

  useEffect(() => {
    const currentFileKey = `${location.pathname}${sandpack.activeFile}`;
    const currentPersistedCode = ls.get(currentFileKey);

    if (currentPersistedCode !== code) {
      ls.set(currentFileKey, code);
    }
  }, [sandpack.activeFile, code]);
};
