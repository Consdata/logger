export class StringUtil {

  public static truncate(value: string, maxLength: number, ellipsis: string = '...'): string {
    return value.length >= maxLength ? value.substring(0, maxLength - ellipsis.length) + ellipsis : value;
  }

  public static safeStringify(object: any): string {
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
    if (object.asStringifyObject) {
      return JSON.stringify(object.asStringifyObject(), circularReplacer());
    } else {
      return JSON.stringify(object, circularReplacer());
    }
  }

}
