import * as stringify_ from 'json-stringify-safe';
const stringify = stringify_;

export class StringUtil {

  public static truncate(value: string, maxLength: number, ellipsis: string = '...'): string {
    return value.length >= maxLength ? value.substring(0, maxLength - ellipsis.length) + ellipsis : value;
  }

  public static safeStringify(object: any): string {
    if (object instanceof Error) {
      if (object.stack) {
        return stringify({
          message: object.toString(),
          stack: object.stack,
        }, null, null, null);
      }
    } else if (typeof object === 'object') {
      try {
        const stringifiedObject: string = stringify(object, null, null, null);
        return StringUtil.truncate(stringifiedObject, 100);
      } catch (error) {
        return `Can't serialize object [msg=${error.message ? error.message : error}]`;
      }
    } else {
      return `${object}`;
    }
  }

}
