import {LogEntry, LoggerFactory, LogLevel} from '@consdata/logger-api';
import {ConsoleLogAppender} from '@consdata/logger-console';

LoggerFactory.addAppender(ConsoleLogAppender.instance);
LoggerFactory.addAppender({
  append(log: LogEntry): void {
    // tslint:disable-next-line:no-console
    console.info(JSON.stringify(log));
  },
});
LoggerFactory.setRootLogLevel(LogLevel.INFO);
LoggerFactory.addLogLevelProvider({
  logLevel(name: string): LogLevel {
    if (name === 'DebugLogger') {
      return LogLevel.DEBUG;
    }
  },
});

LoggerFactory.getLogger('ErrorLogger').error('Test error message');
LoggerFactory.getLogger('InfoLogger').info('Test info message');
LoggerFactory.getLogger('DebugLogger').debug('Test debug message');
LoggerFactory.getLogger('StandardLogger').debug('Should not log debug');
LoggerFactory.getLogger('TraceLogger').trace('Should not log trace');
