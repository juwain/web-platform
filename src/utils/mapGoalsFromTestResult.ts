import type { Spec, Test } from '../types';

export const mapGoalsFromTestResult = (data: Record<string, Spec>) => {
  let specs: Partial<Test>[] = [];

  if (!data) return;

  Object.values(data).forEach((value) => {
    Object.values(value?.describes).forEach((describe) => {
      specs = Object.values(describe.tests).map(({ name, status, errors }) => {
        return {
          name,
          status,
          errors
        };
      });
    });
  });

  return specs;
};
