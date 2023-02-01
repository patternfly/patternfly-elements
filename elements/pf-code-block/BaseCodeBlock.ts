import type { TemplateResult } from 'lit';

import { LitElement } from 'lit';

import styles from './BaseCodeBlock.css';

export abstract class BaseCodeBlock extends LitElement {
  static readonly styles = [styles];

  abstract render(): TemplateResult;

  protected get content() {
    const script = this.querySelector<HTMLScriptElement>('script[type]');
    if (
      script?.type !== 'text/javascript-sample' &&
      !!script?.type.match(/(j(ava)?|ecma|live)script/)) {
      return '';
    } else {
      return script?.textContent ?? '';
    }
  }

  protected dedent(str: string): string {
    const stripped = str.replace(/^\n/, '');
    const match = stripped.match(/^\s+/);
    return match ? stripped.replace(new RegExp(`^${match[0]}`, 'gm'), '') : str;
  }
}
