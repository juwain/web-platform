import { useEffect } from 'react';

const handlers = {};

const on = (event, callback) => {
  if (!handlers[event]) {
    handlers[event] = [];
  }

  handlers[event].push(callback);

  return () => off(event, callback);
};

const off = (event, callback) => {
  if (!handlers[event]) return;

  handlers[event] = handlers[event].filter((fn) => fn !== callback);
};

const emit = (event, payload) => {
  if (!handlers[event]) return;

  handlers[event].forEach((fn) => {
    try {
      fn(payload);
    } catch (error) {
      console.error('EventBus error:', error);
    }
  });
};

const useEvent = (event, callback) => {
  useEffect(() => {
    const unsubscribe = on(event, callback);

    return unsubscribe;
  }, [event, callback]);
};

export { on, off, emit, useEvent };
