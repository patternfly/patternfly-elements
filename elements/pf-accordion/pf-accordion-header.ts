import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';

import { BaseAccordionHeader } from './BaseAccordionHeader.js';

import style from './pf-accordion-header.css';

import '@patternfly/elements/pf-icon/pf-icon.js';

/**
 * Accordion Header
 *
 * @csspart text - inline element containing the heading text or slotted heading content
 * @csspart accents - container for accents within the header
 * @csspart icon - caret icon
 *
 * @slot
 *       We expect the light DOM of the pf-accordion-header to be a heading level tag (h1, h2, h3, h4, h5, h6)
 * @slot accents
 *       These elements will appear inline with the accordion header, between the header and the chevron
 *       (or after the chevron and header in disclosure mode).
 *
 * @fires {AccordionHeaderChangeEvent} change - when the open panels change
 *
 * @cssprop     {<color>} --pf-c-accordion__toggle--Color
 *              Sets the font color for the accordion header.
 *              {@default `var(--pf-global--Color--100, #151515)`}
 * @cssprop     {<color>} --pf-c-accordion__toggle--BackgroundColor
 *              Sets the background color for the accordion header toggle element.
 *              {@default `transparent`}
 * @cssprop     {<color>} --pf-c-accordion__toggle--after--BackgroundColor
 *              Sets the background color for the after element for the accordion header toggle element.
 *              {@default `transparent`}
 * @cssprop     {<length>} --pf-c-accordion__toggle--PaddingTop
 *              Sets the top padding for the accordion header.
 *              {@default `var(--pf-global--spacer--sm, 0.5rem)`}
 * @cssprop     {<length>} --pf-c-accordion__toggle--PaddingRight
 *              Sets the right padding for the accordion header.
 *              {@default `var(--pf-global--spacer--md, 1rem)`}
 * @cssprop     {<length>} --pf-c-accordion__toggle--PaddingBottom
 *              Sets the bottom padding for the accordion header.
 *              {@default `var(--pf-global--spacer--sm, 0.5rem)`}
 * @cssprop     {<length>} --pf-c-accordion__toggle--PaddingLeft
 *              Sets the left padding for the accordion header.
 *              {@default `var(--pf-global--spacer--md, 1rem)`}
 * @cssprop     {<length>} --pf-c-accordion__toggle--FontSize
 *              Sets the sidebar background color for the accordion header.
 *              {@default `var(--pf-global--FontSize--lg, 1rem)`}
 * @cssprop     {<color>} --pf-c-accordion__toggle--FontFamily
 *              Sets the font family for the accordion header.
 *              {@default `var(--pf-global--FontFamily--redhat-updated--heading--sans-serif, "RedHatDisplayUpdated", helvetica, arial, sans-serif)`}
 * @cssprop     --pf-c-accordion__toggle--FontWeight
 *              Sets the font weight for the accordion header.
 *              {@default `var(--pf-global--FontWeight--normal, 400)`}
 * @cssprop     {<color>} --pf-c-accordion__toggle--active--BackgroundColor
 *              Sets the active backgrdound color for the accordion header.
 *              {@default `var(--pf-global--BackgroundColor--200, #f0f0f0)`}
 * @cssprop     {<color>} --pf-c-accordion__toggle--active-text--Color
 *              Sets the active text color for the accordion header.
 *              {@default `var(--pf-global--link--Color, #0066cc)`}
 * @cssprop     --pf-c-accordion__toggle--active-text--FontWeight
 *              Sets the active text font weight for the accordion header.
 *              {@default `var(--pf-global--FontWeight--semi-bold, 700)`}
 * @cssprop     {<color>} --pf-c-accordion__toggle--expanded--before--BackgroundColor
 *              Sets the hover expanded before background color for the accordion header.
 *              {@default `var(--pf-global--link--Color, #0066cc)`}
 * @cssprop     --pf-c-accordion__toggle--expanded-icon--Rotate
 *              Sets the expanded icon rotation degrees for the accordion header.
 *              {@default `90deg`}
 * @cssprop     {<length>} --pf-c-accordion__toggle-text--MaxWidth
 *              Sets the max width for the text inside the accordion header.
 *              {@default `calc(100% - var(--pf-global--spacer--lg, 1.5rem))`}
 * @cssprop     --pf-c-accordion__toggle--before--Width
 *              Sets the sidebar width for the accordion header.
 *              {@default `var(--pf-global--BorderWidth--lg, 3px)`}
 * @cssprop     --pf-c-accordion__toggle-icon--Transition
 *              Sets the transition animation for the accordion header.
 *              {@default `0.2s ease-in 0s`}
 */
@customElement('pf-accordion-header')
export class PfAccordionHeader extends BaseAccordionHeader {
  static readonly styles = [...BaseAccordionHeader.styles, style];

  @property({ reflect: true }) bordered?: 'true'|'false';

  @property({ reflect: true }) icon?: string;

  @property({ reflect: true, attribute: 'icon-set' }) iconSet?: string;

  #slots = new SlotController(this, 'accents', null);

  renderAfterButton() {
    return html`${!this.#slots.hasSlotted('accents') ? '' : html`
      <span part="accents">
        <slot name="accents"></slot>
      </span>`}
      <pf-icon part="icon"
                icon="${this.icon ?? 'angle-right'}"
                set="${this.iconSet ?? 'fas'}"
                class="icon"
                size="lg"></pf-icon>
    `;
  }
}


declare global {
  interface HTMLElementTagNameMap {
    'pf-accordion-header': PfAccordionHeader;
  }
}
