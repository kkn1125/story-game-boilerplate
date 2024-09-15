import { Story } from "./Story";

export class Answer {
  parent!: Story;
  content!: string;
  next: Story | null = null;

  constructor(props?: Partial<ExtractType<Answer>>) {
    if (props) {
      const { content, next } = props;
      content && (this.content = content);
      next && (this.next = next);
    }
  }

  setParent(story: Story) {
    this.parent = story;
    return this;
  }
}
