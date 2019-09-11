import {LogLevel, LogLevelProvider} from '@consdata/logger-api';
import {LocationUtil} from './location-util';

interface LogLevels {
  [key: string]: LogLevel
}

export class QueryParamsLogLevelProvider implements LogLevelProvider {

  public static instance: QueryParamsLogLevelProvider = new QueryParamsLogLevelProvider();
  private static LOG_LEVEL_PARAM = 'logLevel';
  private loggers: LogLevels;
  private root: LogLevel;

  public logLevel(name: string): LogLevel {
    if (!this.loggers) {
      this.initLogLevels();
    }
    return this.loggers[name] || this.root;
  }

  private initLogLevels() {
    const searchParams = LocationUtil.getSearchParams();
    this.loggers = {};

    Object.keys(searchParams).forEach(key => {
      const val = searchParams[key];
      if (val && key === QueryParamsLogLevelProvider.LOG_LEVEL_PARAM) {
        this.root = LogLevel[val];
      }
      if (val && key.indexOf(QueryParamsLogLevelProvider.LOG_LEVEL_PARAM) === 0) {
        // substring log level tag and dot suffix
        const loggerName = key.substr(key.indexOf(QueryParamsLogLevelProvider.LOG_LEVEL_PARAM) + QueryParamsLogLevelProvider.LOG_LEVEL_PARAM.length + 1);
        this.loggers[loggerName] = LogLevel[val];
      }
    });

  }

}
