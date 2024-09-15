export const StoryTellerStep = {
  BeforeNext: "beforenext",
  AfterNext: "afternext",
  SetStatus: "setStatus",
  Storyline: "storyline",
  AddStory: "addStory",
  Start: "start",
  End: "end",
  Talk: "talk",
} as const;
export type StoryTellerStep =
  (typeof StoryTellerStep)[keyof typeof StoryTellerStep];
