import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { observed, pfelement } from '@patternfly/pfe-core/decorators.js';
import { getRandomId } from '@patternfly/pfe-core/functions/random.js';

import { PfeCollapsePanel } from '@patternfly/pfe-collapse/pfe-collapse-panel.js';

import style from './pfe-accordion-panel.scss';

/**
 * Accordion Panel
 *
 * @slot - Panel content
 */
@customElement('pfe-accordion-panel') @pfelement()
export class PfeAccordionPanel extends LitElement {
  static readonly styles = [
    ...PfeCollapsePanel.styles,
    style
  ];

  /** Disclosure */
  @property({ type: String, reflect: true }) disclosure?: 'true'|'false';

  @observed
  @property({ type: Boolean, reflect: true }) expanded = false;

  @property({ attribute: 'aria-labelledby', reflect: true }) ariaLabelledby?: string;

  connectedCallback() {
    super.connectedCallback();
    this.id ||= getRandomId('pfe-accordion-panel');
    this.setAttribute('role', 'region');
  }

  render() {
    return html`
      <div tabindex="-1">
        <div id="container" class="pf-c-accordion__expanded-content">
          <slot></slot>
        </div>
      </div>
    `;
  }

  protected _expandedChanged() {
    this.setAttribute('aria-hidden', String(!this.expanded) as 'true'|'false');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-accordion-panel': PfeAccordionPanel;
  }
}
