import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { colorContextConsumer, pfelement } from '@patternfly/pfe-core/decorators.js';
import { getRandomId } from '@patternfly/pfe-core/functions/random.js';

import { PfeCollapsePanel } from '@patternfly/pfe-collapse/pfe-collapse-panel.js';

import style from './pfe-accordion-panel.scss';
import { ColorTheme } from '@patternfly/pfe-core';

/**
 * Accordion Panel
 *
 * @slot - Panel content
 * @csspart container - container element for slotted content
 */
@customElement('pfe-accordion-panel') @pfelement()
export class PfeAccordionPanel extends LitElement {
  static readonly version = '{{version}}';

  static readonly styles = [
    ...PfeCollapsePanel.styles,
    style
  ];

  /** Disclosure */
  @property({ type: String, reflect: true }) disclosure?: 'true'|'false';

  @property({ type: String, reflect: true }) boredered?: 'true'|'false';

  @property({ type: Boolean, reflect: true }) expanded = false;

  @property({ attribute: 'aria-labelledby', reflect: true }) ariaLabelledby?: string;

  /**
   * Sets color theme based on parent context
   */
  @colorContextConsumer()
  @property({ reflect: true }) on?: ColorTheme;

  connectedCallback() {
    super.connectedCallback();
    this.id ||= getRandomId('pfe-accordion-panel');
    this.setAttribute('role', 'region');
  }

  render() {
    return html`
      <div tabindex="-1">
        <div id="container" class="pf-c-accordion__expanded-content" part="container">
          <div class="pf-c-accordion__expanded-content-body">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-accordion-panel': PfeAccordionPanel;
  }
}
