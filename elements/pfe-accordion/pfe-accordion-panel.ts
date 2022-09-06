import { customElement, } from 'lit/decorators.js';

import { BaseAccordionPanel } from './BaseAccordionPanel.js';

import style from './pfe-accordion-panel.scss';

/**
 * Accordion Panel
 *
 * @slot - Panel content
 * @csspart container - container element for slotted content
 */
@customElement('pfe-accordion-panel')
export class PfeAccordionPanel extends BaseAccordionPanel {
  static readonly version = '{{version}}';

  static readonly styles = [...BaseAccordionPanel.styles, style];
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-accordion-panel': PfeAccordionPanel;
  }
}
