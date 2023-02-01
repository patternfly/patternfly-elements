import { Logger } from '@patternfly/pfe-core/controllers/logger.js';
import { observed } from '@patternfly/pfe-core/decorators.js';
import { property } from 'lit/decorators.js';
import { customElement } from 'lit/decorators.js';

import { BaseAccordion } from './BaseAccordion.js';
import { BaseAccordionHeader } from './BaseAccordionHeader.js';

export * from './pf-accordion-header.js';
export * from './pf-accordion-panel.js';

import style from './pf-accordion.css';

/**
 * Accordions toggle the visibility of sections of content.
 * They feature panels that consist of a section text label and a caret icon that collapses or expands to reveal more information.
 *
 * @summary Toggle the visibility of sections of content
 *
 * @fires {AccordionExpandEvent} expand - when a panel expands
 * @fires {AccordionCollapseEvent} collapse - when a panel collapses
 *
 *
 * @slot
 *       Place the `pf-accordion-header` and `pf-accordion-panel` elements here.
 *
 * @cssproperty {<color>} --accordion__bordered--Color
 *              Color for the borders between accordion headers when using bordered or large attributes
 *              {@default `var(--rh-color-black-300, #d2d2d2)`}
 */
@customElement('pf-accordion')
export class PfAccordion extends BaseAccordion {
  static readonly styles = [...BaseAccordion.styles, style];

  /** When true, only one accordion panel may be expanded at a time */
  @property({ reflect: true, type: Boolean }) single = false;

  /** Whether to apply the `bordered` style variant */
  @property({ type: Boolean, reflect: true }) bordered = false;

  /** Whether to apply the `large` style variant */
  @observed(function largeChanged(this: PfAccordion) {
    [...this.headers, ...this.panels].forEach(el => el.toggleAttribute('large', this.large));
  })
  @property({ type: Boolean, reflect: true }) large = false;

  @property({ type: Boolean, reflect: true }) fixed = false;

  override async expand(index: number, parentAccordion?: BaseAccordion) {
    if (index === -1) {
      return;
    }

    const allHeaders: Array<BaseAccordionHeader> = this.headers;

    // Get all the headers and capture the item by index value
    if (this.single) {
      await Promise.all([
        ...allHeaders.map((header, index) => header.expanded && this.collapse(index)),
      ]);
    }
    await super.expand(index, parentAccordion);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-accordion': PfAccordion;
  }
}
