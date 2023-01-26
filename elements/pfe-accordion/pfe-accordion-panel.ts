import { customElement, property } from 'lit/decorators.js';

import { BaseAccordionPanel } from './BaseAccordionPanel.js';

import style from './pfe-accordion-panel.css';

/**
 * Accordion Panel
 *
 * @slot - Panel content
 * @cssprop     {<color>} --pf-c-accordion--BackgroundColor
 *              Sets the background color for the panel content.
 *              {@default `var(--pf-global--BackgroundColor--light-100, #ffffff)`}
 * @cssprop     {<color>} --pf-c-accordion__panel--Color
 *              Sets the font color for the panel content.
 *              {@default `var(--pf-global--Color--dark-200, #6a6e73)`}
 * @cssprop     {<length>} --pf-c-accordion__panel--FontSize
 *              Sets the font size for the panel content.
 *              {@default `var(--pf-global--FontSize--sm, 0.875rem)`}
 * @cssprop     {<color>} --pf-c-accordion__panel--content-body--before--BackgroundColor
 *              Sets the sidebar color for the panel when the context is expanded.
 *              {@default `var(--pf-global--primary-color--100, #0066cc)`}
 * @cssprop     {<length>} --pf-c-accordion__panel--m-fixed--MaxHeight
 *              Sets the maximum height for the panel content.
 *              Will only be used if the `fixed` attribute is used.
 *              {@default `9.375rem`}
 * @cssprop     {<length>} --pf-c-accordion__panel-body--PaddingTop
 *              Sets the padding top for the panel content.
 *              {@default `var(--pf-global--spacer--sm, 0.5rem)`}
 * @cssprop     {<length>} --pf-c-accordion__panel-body--PaddingRight
 *              Sets the padding right for the panel content.
 *              {@default `var(--pf-global--spacer--md, 1rem)`}
 * @cssprop     {<length>} --pf-c-accordion__panel-body--PaddingBottom
 *              Sets the padding bottom for the panel content.
 *              {@default `var(--pf-global--spacer--sm, 0.5rem)`}
 * @cssprop     {<length>} --pf-c-accordion__panel-body--PaddingLeft
 *              Sets the padding left for the panel content.
 *              {@default `var(--pf-global--spacer--md, 1rem)`}
 * @cssprop     {<color>} --pf-c-accordion__panel-body--before--BackgroundColor
 *              Sets the background color for the panel content.
 *              {@default `transparent`}
 * @cssprop     --pf-c-accordion__panel-body--before--Width
 *              Sets the before width for the panel content.
 *              {@default `var(--pf-global--BorderWidth--lg, 3px)`}
 */
@customElement('pfe-accordion-panel')
export class PfeAccordionPanel extends BaseAccordionPanel {
  static readonly version = '{{version}}';

  static readonly styles = [...BaseAccordionPanel.styles, style];

  @property({ reflect: true }) bordered?: 'true'|'false';
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-accordion-panel': PfeAccordionPanel;
  }
}
