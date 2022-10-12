import { cascades } from '@patternfly/pfe-core/decorators/cascades.js';
import { property } from 'lit/decorators.js';
import { customElement } from 'lit/decorators.js';

import { BaseAccordion } from './BaseAccordion.js';
import './pfe-accordion-header.js';
import './pfe-accordion-panel.js';

import style from './pfe-accordion.scss';

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
 *       Place the `pfe-accordion-header` and `pfe-accordion-panel` elements here.
 *
 * @cssproperty {<color>} --accordion__bordered--Color
 *              Color for the borders between accordion headers when using bordered or large attributes
 *              {@default `var(--rh-color-black-300, #d2d2d2)`}
 */
@customElement('pfe-accordion')
export class PfeAccordion extends BaseAccordion {
  static readonly version = '{{version}}';

  static readonly styles = [...BaseAccordion.styles, style];

  @cascades('pfe-accordion-header', 'pfe-accordion-panel')
  @property({ reflect: true })
    bordered?: 'true'|'false';

  @cascades('pfe-accordion-header', 'pfe-accordion-panel')
  @property({ reflect: true })
    large?: 'true'|'false';


  @property({ type: Boolean, reflect: true }) fixed = false;
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-accordion': PfeAccordion;
  }
}
