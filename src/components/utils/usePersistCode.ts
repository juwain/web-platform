import { useActiveCode, useSandpack } from '@codesandbox/sandpack-react';
import { useEffect, useLayoutEffect } from 'react';
import { ls } from '~/utils/localStorage';

export const usePersistCode = () => {
  const { code, updateCode } = useActiveCode();
  const { sandpack } = useSandpack();

  const key = `${location.pathname}${sandpack.activeFile}`;

  const persistedCode = ls.get(key);

  useLayoutEffect(() => {
    if (persistedCode !== code && persistedCode !== null) {
      updateCode(persistedCode);
    }
  }, [key]);

  useEffect(() => {
    if (persistedCode !== code) {
      ls.set(key, code);
    }
  }, [code, persistedCode, key]);
};
