import { createMachine, assign } from 'xstate';

const guessMachine = createMachine({
  id: 'guessGame',
  initial: 'idle',
  context: {
    number: Math.floor(Math.random() * 10) + 1, // случайное число от 1 до 10
    attempts: 3, // число попыток
    message: '', // сообщение пользователю,
  },
  states: {
    idle: {
      on: {
        START: 'playing',
      },
    },
    playing: {
      on: {
        GUESS: [
          {
            guard: ({ event, context }) => {
              return event.guess === context.number;
            },
            target: 'success',
            actions: assign({ message: () => 'Угадал!' }),
          },
          {
            guard: ({ context }) => {
              return context.attempts <= 1;
            },
            target: 'failure',
            actions: assign({ message: () => 'Попытки закончились!' }),
          },
          {
            actions: assign({
              attempts: ({ context }) => {
                return context.attempts - 1;
              },
              message: ({ event, context }) => {
                return event.guess < context.number
                  ? 'Слишком мало'
                  : 'Слишком много';
              },
            }),
          },
        ],
      },
    },
    success: { type: 'final' },
    failure: { type: 'final' },
  },
});

export { guessMachine };
