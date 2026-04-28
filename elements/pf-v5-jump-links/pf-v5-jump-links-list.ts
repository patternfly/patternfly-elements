import { html, LitElement, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';

import style from './pf-v5-jump-links-list.css';

@customElement('pf-v5-jump-links-list')
export class PfV5JumpLinksList extends LitElement {
  static readonly styles: CSSStyleSheet[] = [style];

  render(): TemplateResult<1> {
    // TODO: add label
    // eslint-disable-next-line lit-a11y/accessible-name
    return html`<div id="container" role="listbox"><slot></slot></div>`;
  }
}


declare global {
  interface HTMLElementTagNameMap {
    'pf-v5-jump-links-list': PfV5JumpLinksList;
  }
}
