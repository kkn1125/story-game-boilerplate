import { StoryStatus } from "@enum/StoryStatus";
import { Story } from "./Story";
import { StoryTellerStep } from "@enum/StoryTellerStep";
import { Logger } from "@util/Logger";
import { ILogModule } from "./ILogModule";
import { getLastItem } from "@util/getLastItem";

export class StoryTeller implements ILogModule {
  status: StoryStatus = StoryStatus.Wait;
  stories: Story[] = [];
  currentStory: Story | null = null;
  histories: Story[] = [];
  listeners: Partial<Record<StoryTellerStep, Function[]>> = {};
  logger: Logger;

  constructor() {
    this.logger = new Logger(this);
  }

  goto(story: Story) {
    this.currentStory = story;
  }

  prev() {
    const story = this.histories.pop();
    if (!story) return;
    this.goto(story);
  }

  notify(step: StoryTellerStep) {
    if (!this.listeners[step]) return;
    this.listeners[step].forEach((listen) => listen.call(this));
  }

  on(step: StoryTellerStep, listener: Function) {
    if (!this.listeners[step]) this.listeners[step] = [];
    this.listeners[step].push(listener);
  }

  remove(step: StoryTellerStep, listener: Function) {
    if (!this.listeners[step]) return;
    this.listeners[step] = this.listeners[step].filter(
      (listen) => listen !== listener
    );
  }

  setStatus(status: StoryStatus) {
    this.status = status;
    this.notify(StoryTellerStep.SetStatus);
  }

  storyline(...stories: Story[]) {
    this.stories = stories;
    this.notify(StoryTellerStep.Storyline);
  }

  addStory(story: Story) {
    this.stories.push(story);
    this.notify(StoryTellerStep.AddStory);
  }

  getCurrentStory() {
    return this.currentStory;
  }

  isStatusEqualsTo(...status: StoryStatus[]) {
    return status.some((st) => this.status === st);
  }

  start() {
    if (!this.isStatusEqualsTo(StoryStatus.Wait)) {
      return;
    }
    this.setStatus(StoryStatus.Start);
    this.currentStory = this.stories[0];
    this.notify(StoryTellerStep.Start);
  }

  // talk() {
  //   if (!this.isStatusEqualsTo(StoryStatus.Start, StoryStatus.Talk)) {
  //     return;
  //   }
  //   this.setStatus(StoryStatus.Talk);
  //   this.notify(StoryTellerStep.Talk);
  //   return this.currentStory;
  // }

  next(answerIndex: number) {
    this.setStatus(StoryStatus.Talk);

    this.notify(StoryTellerStep.BeforeNext);

    if (!this.isStatusEqualsTo(StoryStatus.Start, StoryStatus.Talk)) {
      this.logger.error("storyteller is initialized.");
      this.notify(StoryTellerStep.AfterNext);
      return false;
    }

    const answer = this.currentStory?.answers[answerIndex];

    if (!answer?.next) {
      this.notify(StoryTellerStep.AfterNext);
      this.end();
      return false;
    }

    // console.log(this.currentStory);
    this.recordHistory(this.currentStory);
    const nextStory =
      this.stories.find((story) => story.id === answer.next) ?? null;
    this.currentStory = nextStory;
    this.notify(StoryTellerStep.AfterNext);
    return true;
  }

  recordHistory(story: Story | null) {
    if (!story) return;
    const lastItem = getLastItem(this.histories);
    if (lastItem === story) return;
    if (this.histories.length === 0) {
      this.histories.push(story);
      return;
    }
    this.histories.push(story);
  }

  end() {
    this.setStatus(StoryStatus.End);
    this.currentStory = null;
    this.logger.debug("storyteller end.");
    this.notify(StoryTellerStep.End);
  }
}
