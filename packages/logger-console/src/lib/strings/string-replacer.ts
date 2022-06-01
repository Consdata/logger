export class StringReplacer {

  constructor(private marker: string) {
  }

  public replace(text: string, params: string[]): string {
    const paramsString = JSON.stringify(params);
    return text.replace(
      new RegExp(this.marker, 'g'),
      () => {
        const replace = params.shift();
        if (replace) {
          return replace;
        } else {
          throw new Error(`Missing value for replacement [text=${text}, params=${paramsString}]`);
        }
      }
    );
  }

}
