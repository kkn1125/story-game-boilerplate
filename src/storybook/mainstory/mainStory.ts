import { Answer } from "@module/Answer";
import { Story } from "@module/Story";

export const mainStory = new Story({
  id: "#1",
  title: "마을에 도착하다",
  content:
    "해가 지기 전에 마을에 도착했다. 마을은 조용하지만 뭔가 이상한 기운이 감돌고 있다.",
  answers: [
    new Answer({ content: "마을 사람에게 말을 건다", next: "#2-1" }),
    new Answer({ content: "마을을 둘러본다", next: "#2-2" }),
  ],
  cover: "/scene/scene1.jpg",
});
export const secondBranch1 = new Story({
  id: "#2-1",
  title: "마을 사람의 경고",
  content:
    "마을 사람은 어두운 표정으로 '밤이 되면 집 안에 있어야 한다'고 경고한다. 그는 더 이상 말을 이어가지 않았다.",
  answers: [
    new Answer({ content: "집 안으로 돌아간다", next: "#3-1" }),
    new Answer({ content: "경고를 무시하고 밖에 남는다", next: "#3-2" }),
  ],
  cover: "/scene/scene2.jpg",
});
export const secondBranch2 = new Story({
  id: "#2-2",
  title: "이상한 그림자",
  content:
    "마을을 둘러보던 중, 이상한 그림자가 눈에 들어왔다. 그 그림자는 빠르게 사라졌지만, 무언가 뒤쫓고 있는 듯한 느낌이 들었다.",
  answers: [
    new Answer({ content: "그림자를 쫓는다", next: "#3-1" }),
    new Answer({ content: "신경 쓰지 않고 계속 걷는다", next: "#3-2" }),
  ],
});
export const thirdBranch1 = new Story({
  id: "#3-1",
  title: "의문의 편지",
  content:
    "집으로 돌아온 주인공은 책상 위에 놓인 의문의 편지를 발견한다. 편지에는 '그는 돌아오지 않는다'는 알 수 없는 문장이 적혀 있었다.",
  answers: [new Answer({ content: "편지를 조사한다", next: "#4-1" })],
});
export const thirdBranch2 = new Story({
  id: "#3-2",
  title: "밤의 추격",
  content:
    "어둠이 마을을 덮자, 갑자기 뒷골목에서 인기척이 들렸다. 주인공은 갑작스러운 공포에 휩싸였다.",
  answers: [
    new Answer({ content: "도망친다", next: "#4-2" }),
    new Answer({ content: "추격자를 마주한다", next: "#4-3" }),
  ],
});
