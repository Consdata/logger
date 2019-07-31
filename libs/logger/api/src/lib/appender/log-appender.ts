import { LogEntry } from './log-entry';

export interface LogAppender {
  append(log: LogEntry): void;
}
