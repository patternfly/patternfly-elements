import { LitElement, html, type ComplexAttributeConverter, type PropertyValues } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';

import styles from './pf-tr.css';
import { ifDefined } from 'lit/directives/if-defined.js';

import '@patternfly/elements/pf-button/pf-button.js';
import '@patternfly/elements/pf-icon/pf-icon.js';

export class RequestExpandEvent extends Event {
  /**
   * if provided, the slot name for the compound-expanded cell
   */
  public compoundExpanded: string | boolean = false;

  /**
   * if compoundExpanded is provided, a reference to the row
   * must also be provided.
   */
  public row?: PfTr;

  constructor();
  constructor(compoundExpanded: string | boolean, row: PfTr);
  constructor(compoundExpanded?: string | boolean, row?: PfTr) {
    super('request-expand', {
      bubbles: true,
      cancelable: true,
    });
    if (row) {
      this.compoundExpanded = compoundExpanded ?? false;
      this.row = row;
    }
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
    },
  };
}

const StringOrBooleanConverter: ComplexAttributeConverter = {
  fromAttribute(value) {
    return value || value !== null;
  },
  toAttribute(value) {
    if (!value) {
      return null;
    } else if (typeof value === 'string') {
      return value;
    } else {
      return '';
    }
  },
};

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

  @property({
    reflect: true,
    converter: StringOrBooleanConverter,
  }) expanded: boolean | string = false;

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
      this.expandable && this.expandable !== 'compound' && html`
        <pf-td id="toggle-cell">
          <pf-button id="toggle-button"
                     aria-expanded=${String(this.expanded) as 'true' | 'false'}
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
        <div id="container" role="${ifDefined(this.expandable ? 'row' : undefined)}">
          <slot></slot>
        </div>
      `,

      this.expandable && this.expandable !== 'compound' && this.expanded && html`
        <div id="expansion" role="row"><slot name="expansion"></slot></div>
      `,

      this.expandable === 'compound' && html`
        <div id="expansion">${!this.expanded ? '' : html`
          <slot name="${this.expanded}"></slot>`}
        </div>
      `,
    ].filter(Boolean);
  }

  #expandedChanged() {
    // disallow setting `expanded` unless `expandable` is also set
    if (this.expanded && !this.expandable) {
      this.expanded = false;
    }
  }

  #expandableChanged() {
    switch (this.expandable) {
      case 'compound': {
        // TODO: do we need tab roles now?
        break;
      }
      case true:
        this.setAttribute('role', 'rowgroup');
        break;
      default:
        this.setAttribute('role', 'row');
    }
  }

  #onClick() {
    this.dispatchEvent(new RequestExpandEvent());
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-tr': PfTr;
  }
}
