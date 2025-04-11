import type { AstroInstance } from "astro";

export interface PartData {
  url: string;
  title: string;
  shortTitle: string;
  category: string;
  type: string;
}

export interface Part extends AstroInstance {
  title: string;
  category: string;
  shortTitle: string;
  type: string;
}

export interface LessonParent extends Part {
  lessonParts: PartData[];
}

export interface Lesson extends Part {
  duration: string;
  level: string;
  description: string;
  partCount: number;
  status: "completed" | "wip" | "new";
  order: number;
  picture: ImageMetadata;
}

export type TestStatus = "idle" | "running" | "pass" | "fail";

export interface Test {
  name: string;
  blocks: string[];
  status: TestStatus;
  path: string;
  errors: TestError[];
  duration?: number | undefined;
}

export interface Describe {
  name: string;
  tests: Record<string, Test>;
  describes: Record<string, Describe>;
}

export type TestError = Error & {
  matcherResult?: boolean;
  mappedErrors?: Array<{
    fileName: string;
    _originalFunctionName: string;
    _originalColumnNumber: number;
    _originalLineNumber: number;
    _originalScriptCode: Array<{
      lineNumber: number;
      content: string;
      highlight: boolean;
    }> | null;
  }>;
};

export interface Goal {
  name: string;
  status: string;
}

export type Spec = {
  error?: TestError;
} & Describe;
