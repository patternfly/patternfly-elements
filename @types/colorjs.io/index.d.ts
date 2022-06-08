declare module 'colorjs.io' {

  export default class Color {
    constructor(str: string);
    toString(options?: { format: 'hex'|'rgb'|'rgba'|'hsl'|'hsla' }): string;
  }

}
