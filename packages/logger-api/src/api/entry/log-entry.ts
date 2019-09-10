import {LogLevel} from '../level/log-level';
import {LogEntryContext} from './log-entry-context';

export interface LogEntry {
  date: string;
  timestamp: number;
  logger: string;
  level: LogLevel;
  message: string;
  params: any[];
  context: LogEntryContext;
  error?: Error;
}
