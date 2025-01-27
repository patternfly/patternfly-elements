import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import styles from './pf-radio.css';
// import { PfRadioGroup } from './pf-radio-group.js';

/**
 * Radio Group Pf Radio
 * @slot - Place element content here
 */

@customElement('pf-radio')
export class PfRadio extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  @property({ reflect: true }) label?: string;
  @property({ reflect: true }) value = '';
  @property({ reflect: true }) checked = false;
  // @property({ reflect: true }) disabled = false;

  connectedCallback(): void {
    super.connectedCallback();

    // Dispatch a custom event to the parent radio group when the component is connected
    this.dispatchEvent(new CustomEvent('render-radio', {
      detail: { value: this.value, label: this.label,
        node: this.closest('pf-radio-group'), checked: this.checked },
      bubbles: true,
      cancelable: true,
    }));
  }

  render(): TemplateResult<1> | void {
    return html` <slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-radio': PfRadio;
  }
}
