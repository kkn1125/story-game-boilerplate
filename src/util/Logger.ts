import { MODE } from "@common/variables";
import dayjs from "dayjs";

export class Logger<T = object> {
  static Mode: typeof MODE = MODE;
  context: string = "LOGGING";
  levels = ["log", "info", "debug", "warn", "error", "fatal"] as const;
  icons = ["🪵", "✨", "🐛", "⚠️", "🔥", "💥"] as const;

  log: (...messages: any[]) => void = () => {};
  info: (...messages: any[]) => void = () => {};
  debug: (...messages: any[]) => void = () => {};
  warn: (...messages: any[]) => void = () => {};
  error: (...messages: any[]) => void = () => {};
  fatal: (...messages: any[]) => void = () => {};

  constructor(context?: T) {
    if (Logger.Mode === "production") return;

    let contextName: string = "LOGGING";
    if (context) {
      if (typeof context === "string") {
        contextName = context;
      } else {
        contextName = context.constructor.name;
      }
    }
    this.update(contextName);
  }

  timestamp() {
    return dayjs().format("mm:ss.SSS");
  }

  update(context: string) {
    this.context = context;
    for (const level of this.levels) {
      Object.defineProperty(this, level, {
        get: () => {
          return console.debug.bind(
            this,
            `${
              this.icons[this.levels.indexOf(level)]
            } [${this.context.toUpperCase()}] [${level.toUpperCase()}] ${this.timestamp()} ---`
          );
        },
      });
    }
  }
}
