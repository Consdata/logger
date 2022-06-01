import {LogEntry} from '../entry/log-entry';
import {LogEntryContext} from '../entry/log-entry-context';
import {LogLevel} from '../level/log-level';
import {LogLevelProvider} from '../level/log-level-provider';
import {Logger} from '../logger/logger';
import {LogAppender} from './log-appender';

export class LoggerWithAppenders implements Logger {

  constructor(
    private name: string,
    private appenders: () => LogAppender[],
    private context: () => LogEntryContext,
    private logLevel: () => LogLevelProvider,
  ) {
  }

  public error(message: string, ...params: unknown[]) {
    if (params.length > 0 && params[params.length - 1] instanceof Error) {
      const error = params.pop() as Error;
      this.append(LogLevel.ERROR, message, params, error);
    } else {
      this.append(LogLevel.ERROR, message, params);
    }
  }

  public warn(message: string, ...params: unknown[]) {
    this.append(LogLevel.WARN, message, params);
  }

  public info(message: string, ...params: unknown[]) {
    this.append(LogLevel.INFO, message, params);
  }

  public debug(message: string, ...params: unknown[]) {
    this.append(LogLevel.DEBUG, message, params);
  }

  public trace(message: string, ...params: unknown[]) {
    this.append(LogLevel.TRACE, message, params);
  }

  private append(
    level: LogLevel,
    message: string,
    params: any[],
    error?: Error,
  ) {
    if (level >= this.logLevel().logLevel(this.name)) {
      const date = new Date();
      const logEntry: LogEntry = {
        context: this.context(),
        date: this.now(date),
        error,
        level,
        logger: this.name,
        message,
        params,
        timestamp: date.getTime(),
      };
      this.appenders().forEach(a => a.append(logEntry));
    }
  }

  private now(date: Date) {
    const format = {
      day: this.leadingZeros(2, '0', '' + date.getDate()),
      hour: this.leadingZeros(2, '0', '' + date.getHours()),
      milisecond: this.leadingZeros(3, '0', '' + date.getMilliseconds()),
      minute: this.leadingZeros(2, '0', '' + date.getMinutes()),
      month: this.leadingZeros(2, '0', '' + (date.getMonth() + 1)),
      second: this.leadingZeros(2, '0', '' + date.getSeconds()),
      year: date.getFullYear(),
    };
    return `${format.year}-${format.month}-${format.day} ${format.hour}:${
      format.minute
    }:${format.second}.${format.milisecond}`;
  }

  private leadingZeros(
    targetLength: number,
    padString: string,
    text: string,
  ): string {
    if (text.length >= targetLength) {
      return text;
    } else {
      let result = text;
      while (result.length < targetLength) {
        result = padString + result;
      }
      return result;
    }
  }

}
