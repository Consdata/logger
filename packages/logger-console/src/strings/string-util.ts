export class StringUtil {

  public static truncate(value: string, maxLength: number, ellipsis: string = '...'): string {
    return value.length >= maxLength ? value.substring(0, maxLength - ellipsis.length) + ellipsis : value;
  }

  public static safeStringify(object: any): string {
    const circularReplacer = () => {
      const seen = [];
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
