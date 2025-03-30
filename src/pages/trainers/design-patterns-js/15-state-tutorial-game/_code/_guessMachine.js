import { createMachine } from 'xstate';

const guessMachine = createMachine({
  id: 'guessGame',
  initial: 'idle',

  states: {
    idle: {
      on: {
        START: 'playing',
      },
    },
    playing: {},
  },
});

export { guessMachine };
