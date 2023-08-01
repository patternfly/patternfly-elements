import { html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';

import styles from './pf-expandable-row.css';

import { PfTr } from '@patternfly/elements/pf-table/pf-table.js';

/**
 * Expandable row
 * @slot - Place element content here
 */
@customElement('pf-expandable-row')
export class PfExpandableRow extends PfTr {
  static readonly styles = [...PfTr.styles, styles];

  @property({ type: Boolean, reflect: true }) expanded = false;

  render() {
    return html`
      <slot></slot>
    `;
  }
}
