import { customElement } from 'lit/decorators.js';

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
 *
 * @cssprop     {<length>} --pf-c-accordion__toggle--PaddingTop
 *              Sets the background color for the tooltip content.
 *              {@default `var(--pf-global--spacer--sm, 0.5rem)`}
 * @cssprop     {<length>} --pf-c-accordion__toggle--PaddingRight
 *              Sets the background color for the tooltip content.
 *              {@default `var(--pf-global--spacer--md, 1rem)`}
 * @cssprop     {<length>} --pf-c-accordion__toggle--PaddingBottom
 *              Sets the background color for the tooltip content.
 *              {@default `var(--pf-global--spacer--sm, 0.5rem)`}
 * @cssprop     {<length>} --pf-c-accordion__toggle--PaddingLeft
 *              Sets the background color for the tooltip content.
 *              {@default `var(--pf-global--spacer--md, 1rem)`}
 * @cssprop     {<color>} --pf-c-accordion__toggle--before--BackgroundColor
 *              Sets the background color for the tooltip content.
 *              {@default `transparent`}
 * @cssprop     {<color>} --pf-c-accordion__toggle--hover--BackgroundColor
 *              Sets the background color for the tooltip content.
 *              {@default `var(--pf-global--BackgroundColor--200, #f0f0f0)`}
 * @cssprop     {<color>} --pf-c-accordion__toggle--focus--BackgroundColor
 *              Sets the background color for the tooltip content.
 *              {@default `var(--pf-global--BackgroundColor--200, #f0f0f0)`}
 * @cssprop     {<length>} --pf-c-accordion__toggle--active--BackgroundColor
 *              color the background color for the tooltip content.
 *              {@default `var(--pf-global--BackgroundColor--200, #f0f0f0)`}
 * @cssprop     {<length>} --pf-c-accordion__toggle--before--Width
 *              Sets the background color for the tooltip content.
 *              {@default `var(--pf-global--BorderWidth--lg, 3px)`}
 * @cssprop     {<color>} --pf-c-accordion__toggle--m-expanded--before--BackgroundColor
 *              Sets the background color for the tooltip content.
 *              {@default `var(--pf-global--primary-color--100, #06c)`}
 * @cssprop     {<length>} --pf-c-accordion__toggle-text--MaxWidth
 *              Sets the background color for the tooltip content.
 *              {@default `calc(100% - var(--pf-global--spacer--lg, 1.5rem))`}
 * @cssprop     {<color>} --pf-c-accordion__toggle--hover__toggle-text--Color
 *              Sets the background color for the tooltip content.
 *              {@default `var(--pf-global--link--Color, #06c)`}
 * @cssprop     {<color>} --pf-c-accordion__toggle--active__toggle-text--Color
 *              Sets the background color for the tooltip content.
 *              {@default `var(--pf-global--link--Color, #06c)`}
 * @cssprop     {<number>} --pf-c-accordion__toggle--active__toggle-text--FontWeight
 *              Sets the background color for the tooltip content.
 *              {@default `var(--pf-global--FontWeight--semi-bold, 700)`}
 * @cssprop     {<color>} --pf-c-accordion__toggle--focus__toggle-text--Color
 *              Sets the background color for the tooltip content.
 *              {@default `var(--pf-global--link--Color, #06c)`}
 * @cssprop     {<number>} --pf-c-accordion__toggle--focus__toggle-text--FontWeight
 *              Sets the background color for the tooltip content.
 *              {@default `var(--pf-global--FontWeight--semi-bold, 700)`}
 * @cssprop     {<color>} --pf-c-accordion__toggle--m-expanded__toggle-text--Color
 *              Sets the background color for the tooltip content.
 *              {@default `var(--pf-global--link--Color, #06c)`}
 * @cssprop     {<number>} --pf-c-accordion__toggle--m-expanded__toggle-text--FontWeight
 *              Sets the background color for the tooltip content.
 *              {@default `var(--pf-global--FontWeight--semi-bold, 700)`}
 * @cssprop     --pf-c-accordion__toggle-icon--Transition
 *              Sets the background color for the tooltip content.
 *              {@default `.2s ease-in 0s`}
 * @cssprop     --pf-c-accordion__toggle--m-expanded__toggle-icon--Rotate
 *              Sets the background color for the tooltip content.
 *              {@default `90deg`}
 * @cssprop     {<length>} --pf-c-accordion__toggle--FontSize
 *              Sets the background color for the tooltip content.
 *              {@default `var(--pf-global--FontSize--lg, 1rem)`}
 * @cssprop     --pf-c-accordion__toggle--FontFamily
 *              Sets the background color for the tooltip content.
 *              {@default `var(--pf-global--FontFamily--redhat-updated--heading--sans-serif, "RedHatDisplayUpdated", "Overpass", overpass, helvetica, arial, sans-serif)`}
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
