import { customElement, } from 'lit/decorators.js';

import { BaseAccordionPanel } from './BaseAccordionPanel.js';

import style from './pfe-accordion-panel.scss';

/**
 * Accordion Panel
 *
 * @slot - Panel content
 * @cssprop     {<color>} --pf-c-accordion--BackgroundColor
 *              Sets the background color for the tooltip content.
 *              {@default `var(--pf-global--BackgroundColor--light-100, #fff)`}
 * @cssprop     {<color>} --_accordion__expanded-content--Color
 *              Sets the background color for the tooltip content.
 *              {@default `var(--pf-global--Color--dark-200, #6a6e73)`}
 * @cssprop     {<length>} --_accordion__expanded-content--FontSize
 *              Sets the background color for the tooltip content.
 *              {@default `var(--pf-global--FontSize--sm, 0.875rem)`}
 * @cssprop     {<color>} --_accordion__expanded-content--m-expanded__expanded-content-body--before--BackgroundColor
 *              Sets the background color for the tooltip content.
 *              {@default `var(--pf-global--primary-color--100, #06c)`}
 * @cssprop     {<length>} --_accordion__expanded-content--m-fixed--MaxHeight
 *              Sets the background color for the tooltip content.
 *              {@default `9.375rem`}
 * @cssprop     {<length>} --_accordion__expanded-content-body--PaddingTop
 *              Sets the background color for the tooltip content.
 *              {@default `var(--pf-global--spacer--sm, 0.5rem)`}
 * @cssprop     {<length>} --_accordion__expanded-content-body--PaddingRight
 *              Sets the background color for the tooltip content.
 *              {@default `var(--pf-global--spacer--md, 1rem)`}
 * @cssprop     {<length>} --_accordion__expanded-content-body--PaddingBottom
 *              Sets the background color for the tooltip content.
 *              {@default `var(--pf-global--spacer--sm, 0.5rem)`}
 * @cssprop     {<length>} --_accordion__expanded-content-body--PaddingLeft
 *              Sets the background color for the tooltip content.
 *              {@default `var(--pf-global--spacer--md, 1rem)`}
 * @cssprop     {<length>} --_accordion__expanded-content-body--expanded-content-body--PaddingTop
 *              Sets the background color for the tooltip content.
 *              {@default `0`}
 * @cssprop     {<color>} --_accordion__expanded-content-body--before--BackgroundColor
 *              Sets the background color for the tooltip content.
 *              {@default `transparent`}
 * @cssprop     --_accordion__expanded-content-body--before--Width
 *              Sets the background color for the tooltip content.
 *              {@default `var(--pf-global--BorderWidth--lg, 3px)`}
 * @cssprop     {<length>} --_accordion__expanded-content-body--before--Top
 *              Sets the background color for the tooltip content.
 *              {@default `0`}
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
