export class StringReplacer {

  constructor(private marker: string) {
  }

  public replace(text: string, params: string[]): string {
    return text.replace(new RegExp(this.marker, 'g'), () => params.shift());
  }

}
