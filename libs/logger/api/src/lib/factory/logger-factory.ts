import {LogEntryContext} from '../entry/log-entry-context';
import {LogLevel} from '../level/log-level';
import {LogAppender} from '../appender/log-appender';
import {LogLevelProvider} from '../level/log-level-provider';
import {LoggerWithAppenders} from '../appender/log-with-appenders';
import {Logger} from '../logger/logger';

export abstract class LoggerFactory {

  private static loggers: { [key: string]: Logger } = {};
  private static rootLogLevel = LogLevel.ERROR;
  private static appenders: LogAppender[] = [];
  private static context: LogEntryContext = {};
  private static logLevelProviders: LogLevelProvider[] = [];
  private static combinedLogLevelProvider: LogLevelProvider = {
    logLevel(name: String): LogLevel {
      for (let provider of LoggerFactory.logLevelProviders) {
        const level = provider.logLevel(name);
        if (level !== null && level !== undefined) {
          return level;
        }
      }
      return LoggerFactory.rootLogLevel;
    }
  };

  static getLogger(name: string): Logger {
    if (!LoggerFactory.loggers.name) {
      LoggerFactory.loggers[name] = new LoggerWithAppenders(
        name,
        () => this.appenders,
        () => this.context,
        () => LoggerFactory.combinedLogLevelProvider
      );
    }
    return LoggerFactory.loggers[name];
  }

  static addAppender(appender: LogAppender): void {
    this.appenders.push(appender);
  }

  static addLogLevelProvider(provider: LogLevelProvider) {
    this.logLevelProviders.push(provider);
  }

  static setRootLogLevel(level: LogLevel) {
    this.rootLogLevel = level;
  }

}
