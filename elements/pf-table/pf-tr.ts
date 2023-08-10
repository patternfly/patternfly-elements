import { LitElement, html, type ComplexAttributeConverter, type PropertyValues } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';

import styles from './pf-tr.css';
import { ifDefined } from 'lit/directives/if-defined.js';

import '@patternfly/elements/pf-button/pf-button.js';
import '@patternfly/elements/pf-icon/pf-icon.js';

export class RequestExpandEvent extends Event {
  constructor() {
    super('request-expand', {
      bubbles: true,
      cancelable: true,
    });
  }
}

function BooleanEnumConverter(...allowedAttributes: string[]): ComplexAttributeConverter {
  const values = new Set(allowedAttributes);
  return {
    fromAttribute(value) {
      if (value && values.has(value.toLowerCase())) {
        return value;
      } else {
        return value != null;
      }
    },
    toAttribute(value) {
      if (!value) {
        return null;
      } else if (value === 'compound') {
        return value;
      } else {
        return '';
      }
    }
  };
}

/**
 * Table row
 * @slot - Place element content here
 */
@customElement('pf-tr')
export class PfTr extends LitElement {
  static readonly styles = [styles];

  @property({
    reflect: true,
    converter: BooleanEnumConverter('compound'),
  }) expandable: boolean | 'compound' = false;

  @property({ type: Boolean, reflect: true }) expanded = false;

  override connectedCallback(): void {
    super.connectedCallback();
    this.#expandableChanged();
  }

  override willUpdate(changed: PropertyValues<this>) {
    if (changed.has('expandable')) {
      this.#expandableChanged();
    }
    if (changed.has('expanded')) {
      this.#expandedChanged();
    }
  }

  render() {
    return [
      !this.expandable ? '' : html`
        <pf-td id="toggle-cell">
          <pf-button id="toggle-button"
                     aria-expanded=${this.expanded}
                     plain
                     @click=${this.#onClick}>
            <pf-icon id="toggle-icon"
                     icon="angle-right"
                     size="md"
            ></pf-icon>
          </pf-button>
        </pf-td>
      `,
      html`
        <div id="container">
          <slot role="${ifDefined(this.expandable ? 'row' : undefined)}"></slot>
        </div>
      `,
      !(this.expandable && this.expanded) ? '' : html`
        <slot id="expansion"
              name="expansion"
              role="row"
        ></slot>
      `
    ];
  }

  #expandedChanged() {
    // disallow setting `expanded` unless `expandable` is also set
    if (this.expanded && !this.expandable) {
      this.expanded = false;
    }
  }

  #expandableChanged() {
    this.setAttribute('role', this.expandable ? 'rowgroup' : 'row');
  }

  #onClick() {
    if (this.expanded) {
      this.expanded = false;
    } else {
      this.dispatchEvent(new RequestExpandEvent());
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-tr': PfTr;
  }
}
