import { Answer } from "./Answer";

export class Story {
  id!: string;
  // childrens: Story[] = [];

  title!: string;
  content!: string;
  answers: Answer[] = [];

  cover!: string;

  constructor(props?: Partial<ExtractType<Story>>) {
    if (props) {
      const { /* parent, childrens */ id, title, content, answers, cover } =
        props;
      id && (this.id = id);
      // childrens && (this.childrens = childrens);
      title && (this.title = title);
      content && (this.content = content);
      answers &&
        (this.answers = answers.map((answer) => answer.setParent(this)));
      cover && (this.cover = cover);
    }
  }
}
