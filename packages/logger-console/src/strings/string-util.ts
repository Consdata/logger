export class StringUtil {

  public static truncate(value: string, maxLength: number, ellipsis: string = '...'): string {
    return value.length >= maxLength ? value.substring(0, maxLength - ellipsis.length) + ellipsis : value;
  }

  public static safeStringify(object: any): string {
    if (object instanceof Error) {
      return StringUtil.stringify({
        message: object.toString(),
        stack: object.stack,
      });
    } else if (object && object.asStringifyObject) {
      return StringUtil.stringify(object.asStringifyObject());
    } else if (typeof object === 'object') {
      return StringUtil.stringify(object);
    } else if (object === null) {
      return 'null';
    } else if (object === undefined) {
      return 'undefined';
    } else {
      return `${object}`;
    }
  }

  private static stringify(object: any): string {
    const seen = [];
    const circularReplacer = () => {
      return (key, value) => {
        if (typeof value === 'object' && value !== null) {
          if (seen.indexOf(value) >= 0) {
            return `[Circular ~]`;
          }
          seen.push(value);
        }
        return value;
      };
    };
    return JSON.stringify(object, circularReplacer());
  }

}
