import type { Spec } from '../types';

export const mapGoalsFromSpecs = (data: Record<string, Spec>) => {
  let specs: { name: string; status: string }[] = [];

  if (!data) return;

  Object.values(data).forEach((value) => {
    Object.values(value?.describes).forEach((describe) => {
      specs = Object.values(describe.tests).map((value) => {
        return {
          name: value.name,
          status: value.status,
        };
      });
    });
  });

  return specs;
};
