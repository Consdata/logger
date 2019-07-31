export interface Logger {
  error(message: string, ...args);
  warn(message: string, ...args);
  info(message: string, ...args);
  debug(message: string, ...args);
  trace(message: string, ...args);
}
