import {LogLevel} from '@logger/logger/api';

export interface LogLevelProvider {
  logLevel(name: String): LogLevel;
}
