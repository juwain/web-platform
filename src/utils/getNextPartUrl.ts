import type { PartData } from "../types";

export const getNextPartUrl = (lessonParts: PartData[], currentUrl: string) => {
  const currentPart = lessonParts.findIndex((part) =>
    currentUrl.includes(part.url)
  );
  const nextPart = lessonParts[currentPart + 1];

  return nextPart.url;
};
