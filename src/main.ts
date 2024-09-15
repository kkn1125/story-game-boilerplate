import { StoryStatus } from "@enum/StoryStatus";
import { Answer } from "@module/Answer";
import { Story } from "@module/Story";
import { StoryTeller } from "@module/StoryTeller";
import { Logger } from "@util/Logger";

const app = document.querySelector("#app");

const logger = new Logger();

const storyTeller = new StoryTeller();

storyTeller.storyline(
  new Story({
    title: "메인 스토리",
    content: "날이 밝아온다.",
    answers: [
      new Answer({
        content: "다음",
        next: new Story({
          title: "메인 스토리",
          content: "날이 저문다",
          answers: [
            new Answer({
              content: "끝",
            }),
          ],
        }),
      }),
    ],
  })
);

function renderPage(story: Story | null) {
  if (
    !story ||
    !storyTeller.isStatusEqualsTo(StoryStatus.Start, StoryStatus.Talk)
  ) {
    logger.error("렌더 취소");
    return;
  }

  const mainWrap = document.createElement("div");
  mainWrap.id = "main";
  const wrap = document.createElement("div");
  wrap.id = "wrap";
  const title = document.createElement("h3");
  const content = document.createElement("div");
  const answerWrap = document.createElement("div");
  answerWrap.id = "answerWrap";

  title.innerHTML = story.title;
  content.innerHTML = story.content;

  answerWrap.append(
    ...story.answers.map((answer, i) => {
      const item = document.createElement("div");
      item.innerHTML = answer.content;
      item.classList.add("answer");
      item.dataset.answer = "" + i;
      return item;
    })
  );

  wrap.append(title, content, answerWrap);
  mainWrap.append(wrap);

  app?.insertAdjacentElement("beforeend", mainWrap);
}

storyTeller.start();
renderPage(storyTeller.getCurrentStory());

window.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  const isAnswer = target.classList.contains("answer");
  if (!isAnswer) return;

  const answerIndex = +(target.dataset.answer || -1);
  if (answerIndex === -1) return;

  const story = storyTeller.getCurrentStory();
  if (!story) return;

  const answer = story.answers[answerIndex];
  if (!answer) {
    logger.error("답변 끝");
    return;
  }

  const isNext = storyTeller.next(answerIndex);
  if (isNext) {
    app?.querySelector("#main")?.remove();
    renderPage(storyTeller.getCurrentStory());
  } /* else {
    app?.querySelector("#main")?.remove();
    renderPage(storyTeller.getCurrentStory());
  } */
});
