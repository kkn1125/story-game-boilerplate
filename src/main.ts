import { StoryStatus } from "@enum/StoryStatus";
import { Story } from "@module/Story";
import { StoryTeller } from "@module/StoryTeller";
import { Logger } from "@util/Logger";
import {
  mainStory,
  secondBranch1,
  secondBranch2,
  thirdBranch1,
  thirdBranch2,
} from "./storybook/mainstory/mainStory";

const app = document.querySelector("#app");

const logger = new Logger();

const storyTeller = new StoryTeller();

storyTeller.storyline(
  mainStory,
  secondBranch1,
  secondBranch2,
  thirdBranch1,
  thirdBranch2
);

function renderPage(story: Story | null) {
  if (
    !story ||
    !storyTeller.isStatusEqualsTo(
      StoryStatus.Start,
      StoryStatus.Talk,
      StoryStatus.End
    )
  ) {
    logger.error("렌더 취소");
    return;
  }

  const mainWrap = document.createElement("div");
  mainWrap.id = "main";
  const wrap = document.createElement("div");
  wrap.id = "wrap";
  const group = document.createElement("div");
  const title = document.createElement("h3");
  const content = document.createElement("div");
  const answerWrap = document.createElement("div");
  const prevButton = document.createElement("button");

  if (story.cover) {
    mainWrap.style.setProperty("--cover", `url(${story.cover})`);
  }

  title.id = "title";
  title.innerHTML = story.title;
  content.id = "content";
  content.innerHTML = story.content;

  group.id = "group";
  group.append(title, content);
  
  answerWrap.id = "answerWrap";
  answerWrap.append(
    ...story.answers.map((answer, i) => {
      const item = document.createElement("div");
      item.innerHTML = answer.content;
      item.classList.add("answer");
      item.dataset.answer = "" + i;
      return item;
    })
  );

  prevButton.id = "prev";
  prevButton.innerText = "이전";

  wrap.append(group, answerWrap, prevButton);
  mainWrap.append(wrap);

  app?.insertAdjacentElement("beforeend", mainWrap);
}

function refresh() {
  app?.querySelector("#main")?.remove();
  renderPage(storyTeller.getCurrentStory());
}

storyTeller.start();
renderPage(storyTeller.getCurrentStory());

window.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  const isPrev = target.id === "prev";
  if (isPrev) {
    storyTeller.prev();
    refresh();
    return;
  }

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
    refresh();
  } /* else {
    app?.querySelector("#main")?.remove();
    renderPage(storyTeller.getCurrentStory());
  } */
});
