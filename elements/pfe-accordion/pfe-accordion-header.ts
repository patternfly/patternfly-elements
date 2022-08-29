import { customElement, property } from 'lit/decorators.js';

import '@patternfly/pfe-icon';
import { BaseAccordionHeader } from './BaseAccordionHeader.js';

import style from './pfe-accordion-header.scss';

/**
 * Accordion Header
 *
 * @csspart text - inline element containing the heading text or slotted heading content
 * @csspart accents - container for accents within the header
 * @csspart icon - caret icon
 *
 * @slot
 *       We expect the light DOM of the pfe-accordion-header to be a heading level tag (h1, h2, h3, h4, h5, h6)
 * @slot accents
 *       These elements will appear inline with the accordion header, between the header and the chevron
 *       (or after the chevron and header in disclosure mode).
 *
 * @fires {AccordionHeaderChangeEvent} change - when the open panels change
 */
@customElement('pfe-accordion-header')
export class PfeAccordionHeader extends BaseAccordionHeader {
  static readonly version = '{{version}}';

  static readonly styles = [...BaseAccordionHeader.styles, style];
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-accordion-header': PfeAccordionHeader;
  }
}
