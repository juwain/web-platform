import type { AstroInstance } from "astro";

interface Part extends AstroInstance {
  title: string;
}

export const getContents = (allParts: Part[]) => {
  return allParts.map((part: Part) => {
    return {
      url: part.url || "",
      title: part.title,
    };
  });
};
