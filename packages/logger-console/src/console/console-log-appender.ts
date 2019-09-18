import {LogAppender, LogEntry, LogLevel} from '@consdata/logger-api';
import {ConsoleMessageBuilder} from '../message/console-message-builder';

export class ConsoleLogAppender implements LogAppender {

  public static readonly instance: ConsoleLogAppender = new ConsoleLogAppender();
  private message = new ConsoleMessageBuilder();

  public append(log: LogEntry) {
    if (log.error) {
      // tslint:disable-next-line:no-console
      console.error(this.message.build(log), log.error);
    } else {
      // tslint:disable-next-line:no-console
      console.info(this.message.build(log));
    }
  }

}
