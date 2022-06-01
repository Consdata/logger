import {LogEntry, LoggerFactory, LogLevel} from '@consdata/logger-api';
import {ConsoleLogAppender} from '@consdata/logger-console';
import {QueryParamsLogLevelProvider} from '@consdata/logger-web';

LoggerFactory.addAppender(ConsoleLogAppender.instance);
LoggerFactory.addAppender({
  append(log: LogEntry): void {
    // tslint:disable-next-line:no-console
    console.info(JSON.stringify(log));
  },
});
LoggerFactory.setRootLogLevel(LogLevel.INFO);
LoggerFactory.addLogLevelProvider(QueryParamsLogLevelProvider.instance);
LoggerFactory.addLogLevelProvider({
  logLevel(name: string): LogLevel {
    if (name === 'DebugLogger') {
      return LogLevel.DEBUG;
    }
  },
});

LoggerFactory.getLogger('ErrorLogger').error('Test error message [{}]', 'param');
LoggerFactory.getLogger('InfoLogger').info('Test info message [{}]', 'param');
LoggerFactory.getLogger('DebugLogger').debug('Test debug message [{}]', 'param');
LoggerFactory.getLogger('StandardLogger').debug('Should not log debug [{}]', 'param');
LoggerFactory.getLogger('TraceLogger').trace('Should not log trace [{}]', 'param');

