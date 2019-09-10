export class StringReplacer {

  constructor(private marker: string) {
  }

  replace(string: string, params: string[]) {
    return string.replace(new RegExp(this.marker, 'g'), () => params.shift());
  }

}
