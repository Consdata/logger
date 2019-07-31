import { Logger } from '../logger/logger';
import { LogAppender } from '../appender/log-appender';

export abstract class LoggerFactory {
  static getLogger(name: string): Logger {
    return null;
  }

  static addAppender(appender: LogAppender): void {}
}
