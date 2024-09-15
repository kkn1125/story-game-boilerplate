import { Answer } from "./Answer";

export class Story {
  parent!: Story | null;
  childrens: Story[] = [];

  title!: string;
  content!: string;
  answers: Answer[] = [];

  constructor(props?: Partial<ExtractType<Story>>) {
    if (props) {
      const { parent, childrens, title, content, answers } = props;
      parent && (this.parent = parent);
      childrens && (this.childrens = childrens);
      title && (this.title = title);
      content && (this.content = content);
      answers &&
        (this.answers = answers.map((answer) => answer.setParent(this)));
    }
  }
}
