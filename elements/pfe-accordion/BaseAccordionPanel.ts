import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';

import { colorContextConsumer } from '@patternfly/pfe-core/decorators.js';
import { getRandomId } from '@patternfly/pfe-core/functions/random.js';

import { PfeCollapsePanel } from '@patternfly/pfe-collapse/pfe-collapse-panel.js';

import style from './BaseAccordionPanel.scss';
import { ColorTheme } from '@patternfly/pfe-core';

export class BaseAccordionPanel extends LitElement {
  static readonly styles = [
    ...PfeCollapsePanel.styles,
    style
  ];

  @property({ type: String, reflect: true }) bordered?: 'true'|'false';

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

  override render() {
    return html`
      <div tabindex="-1">
        <div id="container" class="accordion__expanded-content" part="container">
          <div class="accordion__expanded-content-body">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}
