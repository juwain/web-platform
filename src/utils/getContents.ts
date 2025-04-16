import type { AstroInstance } from "astro";

interface Part extends AstroInstance {
  title: string;
  category: string;
  shortTitle: string;
  type: string;
}

export const getContents = (allParts: Part[]) => {
  return allParts.map(({ url = '', title, category, shortTitle, type }: Part) => {
    return {
      url,
      title,
      category,
      shortTitle,
      type
    };
  });
};
