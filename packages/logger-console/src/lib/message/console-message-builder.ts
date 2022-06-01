import {LogEntry, LogLevel} from '@consdata/logger-api';
import {StringReplacer} from '../strings/string-replacer';
import {StringUtil} from '../strings/string-util';

export class ConsoleMessageBuilder {

  private replacer = new StringReplacer('{}');

  public build(log: LogEntry): string {
    const message: string[] = [];
    message.push(`[${log.date}]`);
    message.push(`[${LogLevel[log.level]}]`);
    message.push(`[${log.logger}]`);
    if (log.context && Object.keys(log.context).length > 0) {
      message.push(`[${Object.keys(log.context).map(key => `${key}:${log.context[key]}`).join(',')}]`);
    }
    message.push(' ');
    message.push(this.replacer.replace(log.message, this.stringify(log.params)));
    return message.join('');
  }

  private stringify(params: any[]) {
    return params.map(p => StringUtil.safeStringify(p));
  }

}
