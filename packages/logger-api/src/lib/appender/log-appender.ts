import {LogEntry} from '../entry/log-entry';

export interface LogAppender {
  append(log: LogEntry): void;
}
