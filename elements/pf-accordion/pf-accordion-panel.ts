import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';

import { getRandomId } from '@patternfly/pfe-core/functions/random.js';

import style from './pf-accordion-panel.css';

/**
 * Accordion Panel
 * @slot - Panel content
 */
@customElement('pf-accordion-panel')
export class PfAccordionPanel extends LitElement {
  static readonly styles: CSSStyleSheet[] = [style];

  @property({ type: Boolean, reflect: true }) expanded = false;

  @property({ reflect: true }) bordered?: 'true' | 'false';

  override connectedCallback(): void {
    super.connectedCallback();
    this.id ||= getRandomId(this.localName);
    this.setAttribute('role', 'region');
  }

  override render(): TemplateResult<1> {
    return html`
      <div tabindex="-1">
        <div id="container" class="content" part="container">
          <div class="body">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-accordion-panel': PfAccordionPanel;
  }
}
