import {LogAppender} from '../appender/log-appender';
import {LoggerWithAppenders} from '../appender/log-with-appenders';
import {LogEntryContext} from '../entry/log-entry-context';
import {LogLevel} from '../level/log-level';
import {LogLevelProvider} from '../level/log-level-provider';
import {Logger} from '../logger/logger';

export abstract class LoggerFactory {

  public static getLogger(name: string): Logger {
    if (!LoggerFactory.loggers.name) {
      LoggerFactory.loggers[name] = new LoggerWithAppenders(
        name,
        () => this.appenders,
        () => this.context,
        () => LoggerFactory.combinedLogLevelProvider,
      );
    }
    return LoggerFactory.loggers[name];
  }

  public static addAppender(appender: LogAppender): void {
    this.appenders.push(appender);
  }

  public static addLogLevelProvider(provider: LogLevelProvider) {
    this.logLevelProviders.push(provider);
  }

  public static setRootLogLevel(level: LogLevel) {
    this.rootLogLevel = level;
  }

  private static loggers: { [key: string]: Logger } = {};
  private static rootLogLevel = LogLevel.OFF;
  private static appenders: LogAppender[] = [];
  private static context: LogEntryContext = {};
  private static logLevelProviders: LogLevelProvider[] = [];
  private static combinedLogLevelProvider: LogLevelProvider = {
    logLevel(name: string): LogLevel {
      for (const provider of LoggerFactory.logLevelProviders) {
        const level = provider.logLevel(name);
        if (level !== null && level !== undefined) {
          return level;
        }
      }
      return LoggerFactory.rootLogLevel;
    },
  };

}
