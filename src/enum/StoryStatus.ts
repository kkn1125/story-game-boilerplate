export const StoryStatus = {
  Wait: "wait",
  Start: "start",
  Talk: "talk",
  End: "end",
} as const;
export type StoryStatus = (typeof StoryStatus)[keyof typeof StoryStatus];
