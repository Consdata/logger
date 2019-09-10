import {Logger} from '../logger/logger';
import {LogAppender} from './log-appender';
import {LogEntry} from '../entry/log-entry';
import {LogEntryContext} from '../entry/log-entry-context';
import {LogLevel} from '../level/log-level';
import {LogLevelProvider} from '../level/log-level-provider';

export class LoggerWithAppenders implements Logger {

  constructor(
    private name: string,
    private appenders: () => LogAppender[],
    private context: () => LogEntryContext,
    private logLevel: () => LogLevelProvider
  ) {
  }

  error(message: string, ...params) {
    if (params.length > 0 && params[params.length - 1] instanceof Error) {
      const error = params.pop();
      this.append(LogLevel.ERROR, message, params, error);
    } else {
      this.append(LogLevel.ERROR, message, params);
    }
  }

  warn(message: string, ...params) {
    this.append(LogLevel.WARN, message, params);
  }

  info(message: string, ...params) {
    this.append(LogLevel.INFO, message, params);
  }

  debug(message: string, ...params) {
    this.append(LogLevel.DEBUG, message, params);
  }

  trace(message: string, ...params) {
    this.append(LogLevel.TRACE, message, params);
  }

  private append(
    level: LogLevel,
    message: string,
    params: any[],
    error?: Error
  ) {
    if (level >= this.logLevel().logLevel(this.name)) {
      const date = new Date();
      const logEntry: LogEntry = {
        date: this.now(date),
        timestamp: date.getTime(),
        logger: this.name,
        level: level,
        message: message,
        params: params,
        context: this.context(),
        error: error
      };
      this.appenders().forEach(a => a.append(logEntry));
    }
  }

  private now(date: Date) {
    const format = {
      year: date.getFullYear(),
      month: this.leadingZeros(2, '0', '' + date.getMonth() + 1),
      day: this.leadingZeros(2, '0', '' + date.getDate()),
      hour: this.leadingZeros(2, '0', '' + date.getHours()),
      minute: this.leadingZeros(2, '0', '' + date.getMinutes()),
      second: this.leadingZeros(2, '0', '' + date.getSeconds()),
      milisecond: this.leadingZeros(3, '0', '' + date.getMilliseconds())
    };
    return `${format.year}-${format.month}-${format.day} ${format.hour}:${
      format.minute
    }:${format.second}.${format.milisecond}`;
  }

  private leadingZeros(
    targetLength: number,
    padString: string,
    string: string
  ): string {
    if (string.length >= targetLength) {
      return string;
    } else {
      let result = string;
      while (result.length < targetLength) {
        result = padString + result;
      }
      return result;
    }
  }

}
