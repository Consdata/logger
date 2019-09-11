import {LogLevel} from './log-level';

export interface LogLevelProvider {
  logLevel(name: string): LogLevel;
}
