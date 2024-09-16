import { StoryStatus } from "@enum/StoryStatus";
import { beforeEach, describe, expect, it } from "vitest";
import { Answer } from "./Answer";
import { Story } from "./Story";
import { StoryTeller } from "./StoryTeller";
import { Logger } from "@util/Logger";

describe("[StoryTeller] 테스트", () => {
  let storyTeller: StoryTeller;
  let logger: Logger;

  beforeEach(() => {
    storyTeller = new StoryTeller();
    storyTeller.addStory(new Story());
    logger = new Logger("TestLogger");
  });

  it("생성 테스트", () => {
    logger.debug("생성 테스트");
    expect(storyTeller).toBeDefined();
  });

  it("기본 동작 테스트", () => {
    logger.debug("기본 동작 테스트");
    const secondScene1 = new Story({
      title: "두번째 대본",
      content:
        "제 소개가 늦었네요. 저는 홍길동입니다. 오랫동안 기절해있었어요.",
      answers: [
        new Answer({ content: "(내가 기절했었다고..?) 무슨 일이 있었던거죠?" }),
        new Answer({ content: "아무것도 기억이 나지 않아요." }),
      ],
    });
    const secondScene2 = new Story({
      title: "두번째 번외 대본",
      content:
        "지금 상황이 이해가 안되실거에요. 말하자면 길어요. 우선 휴식부터 취해요.",
    });
    const mainScene = new Story({
      title: "첫 대본",
      content: "안녕하세요?",
      answers: [
        new Answer({ content: "누구세요?", next: secondScene1 }),
        new Answer({ content: "뭐야", next: secondScene2 }),
        new Answer({ content: "(아무말 하지 않는다)" }),
      ],
    });

    storyTeller.storyline(mainScene, secondScene1, secondScene2);
    logger.debug("스토리라인 생성");

    storyTeller.start();

    logger.debug("스토리라인 시작");

    const status = storyTeller.status;
    logger.debug(status);

    logger.info(storyTeller.getCurrentStory());
    let isNext = storyTeller.next(1);
    logger.info(storyTeller.getCurrentStory());
    isNext = storyTeller.next(0);
    if (isNext) {
      logger.info(storyTeller.getCurrentStory());
    } else {
      logger.error("스토리 끝");
    }

    expect(status).toStrictEqual(StoryStatus.Start);
  });
});
