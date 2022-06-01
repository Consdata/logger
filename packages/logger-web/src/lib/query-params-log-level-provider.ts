import {LogLevel, LogLevelProvider} from '@consdata/logger-api';
import {LocationUtil} from './location-util';

interface LogLevels {
  [key: string]: LogLevel;
}

export class QueryParamsLogLevelProvider implements LogLevelProvider {

  public static instance: QueryParamsLogLevelProvider = new QueryParamsLogLevelProvider();
  private static LOG_LEVEL_PARAM = 'logLevel';
  private readonly loggers: LogLevels = {};
  private root?: LogLevel;

  constructor() {
    const searchParams = LocationUtil.getSearchParams();
    Object.keys(searchParams).forEach(key => {
      const val = searchParams[key];
      if (val && key === QueryParamsLogLevelProvider.LOG_LEVEL_PARAM) {
        this.root = LogLevel[val as keyof typeof LogLevel];
      } else if (val && key.indexOf(QueryParamsLogLevelProvider.LOG_LEVEL_PARAM) === 0) {
        // substring log level tag and dot suffix
        const loggerName = key.substr(QueryParamsLogLevelProvider.LOG_LEVEL_PARAM.length + 1);
        this.loggers[loggerName] = LogLevel[val as keyof typeof LogLevel];
      }
    });
  }

  public logLevel(name: string): LogLevel {
    return this.loggers[name] || this.root;
  }

}
