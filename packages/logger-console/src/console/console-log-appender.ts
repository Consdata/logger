import {LogAppender, LogEntry, LogLevel} from '@consdata/logger-api';
import {StringReplacer} from './string-replacer';

export class ConsoleLogAppender implements LogAppender {

  public static readonly instance: ConsoleLogAppender = new ConsoleLogAppender();

  private replacer = new StringReplacer('{}');

  public append(log: LogEntry) {
    const message: string[] = [];
    message.push(`[${log.date}]`);
    message.push(`[${LogLevel[log.level]}]`);
    message.push(`[${log.logger}]`);
    if (log.context && Object.keys(log.context).length > 0) {
      message.push(`[${Object.keys(log.context).map(key => `${key}:${log.context[key]}`).join(',')}]`);
    }
    message.push(' ');
    message.push(this.replacer.replace(log.message, this.stringify(log.params)));
    if (log.error) {
      // tslint:disable-next-line:no-console
      console.error(message.join(''), log.error);
    } else {
      // tslint:disable-next-line:no-console
      console.log(message.join(''));
    }
  }

  private stringify(params: any[]) {
    return params.map(p => JSON.stringify(p));
  }

}
