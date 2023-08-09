import { LitElement, html, type ComplexAttributeConverter, type PropertyValues } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';

import styles from './pf-tr.css';
import { ifDefined } from 'lit/directives/if-defined.js';

/**
 * Table row
 * @slot - Place element content here
 */
@customElement('pf-tr')
export class PfTr extends LitElement {
  static readonly styles = [styles];

  @property({ reflect: true, converter: {
    fromAttribute(value) {
      if (value === 'compound') {
        return value;
      } else {
        return value != null;
      }
    },
    toAttribute(value) {
      if (!value) {
        return null;
      } else {
        return value;
      }
    }
  } }) expandable: boolean | 'compound' = false;

  @property({ type: Boolean, reflect: true }) expanded = false;

  override connectedCallback(): void {
    super.connectedCallback();
    this.#expandableChanged();
  }

  willUpdate(changed: PropertyValues<this>) {
    if (changed.has('expandable')) {
      this.#expandableChanged();
    }
  }

  render() {
    return html`
      <div id="container">
        <slot role="${ifDefined(this.expandable ? 'row' : undefined)}"></slot>
        ${!this.expandable ? '' : html`
        <slot name="expansion" role="row"></slot>
        `}
      </div>
    `;
  }

  #expandableChanged() {
    this.setAttribute('role', this.expandable ? 'rowgroup' : 'row');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-tr': PfTr;
  }
}
