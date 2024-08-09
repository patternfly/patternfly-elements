import type { PfAccordion } from './pf-accordion.js';

import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';

import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';
import { Logger } from '@patternfly/pfe-core/controllers/logger.js';

import { getRandomId } from '@patternfly/pfe-core/functions/random.js';

import style from './pf-accordion-header.css';

import '@patternfly/elements/pf-icon/pf-icon.js';

const isPorHeader =
  (el: Node): el is HTMLElement =>
    el instanceof HTMLElement && !!el.tagName.match(/P|^H[1-6]/);

export class PfAccordionHeaderChangeEvent extends Event {
  declare target: PfAccordionHeader;
  constructor(
    public expanded: boolean,
    public toggle: PfAccordionHeader,
    public accordion: PfAccordion
  ) {
    super('change', { bubbles: true });
  }
}

/**
 * Accordion Header
 * @csspart text - inline element containing the heading text or slotted heading content
 * @csspart accents - container for accents within the header
 * @csspart icon - caret icon
 * @slot
 *       We expect the light DOM of the pf-accordion-header to be a heading level tag (h1, h2, h3, h4, h5, h6)
 * @slot accents
 *       These elements will appear inline with the accordion header, between the header and the chevron
 *       (or after the chevron and header in disclosure mode).
 * @fires {AccordionHeaderChangeEvent} change - when the open panels change
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
export class PfAccordionHeader extends LitElement {
  static readonly styles: CSSStyleSheet[] = [style];

  static override readonly shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  @property({ reflect: true }) bordered?: 'true' | 'false';

  @property({ reflect: true }) icon?: string;

  @property({ reflect: true, attribute: 'icon-set' }) iconSet?: string;

  @property({ type: Boolean, reflect: true }) expanded = false;

  @property({ reflect: true, attribute: 'heading-text' }) headingText?: string;

  @property({ reflect: true, attribute: 'heading-tag' }) headingTag?: string;

  #generatedHtag?: HTMLHeadingElement;

  #logger = new Logger(this);

  #header?: HTMLElement;

  #slots = new SlotController(this, 'accents', null);

  override connectedCallback(): void {
    super.connectedCallback();
    this.id ||= getRandomId(this.localName);
    this.#initHeader();
  }

  override render(): TemplateResult<1> {
    const headingText = this.headingText?.trim() ?? this.#header?.textContent?.trim();
    const content = html`
      <button id="button"
              class="toggle"
              @click="${this.#onClick}"
              aria-expanded="${String(!!this.expanded) as 'true' | 'false'}">
        <span part="text">${headingText ?? html`
          <slot></slot>`}
        </span>
        <span part="accents" ?hidden="${this.#slots.isEmpty('accents')}">
          <slot name="accents"></slot>
        </span>
        <pf-icon part="icon"
                 class="icon"
                 size="lg"
                 set="${this.iconSet ?? 'fas'}"
                 icon="${this.icon ?? 'angle-right'}"
        ></pf-icon>
      </button>
    `;
    switch (this.headingTag) {
      case 'h1': return html`<h1 id="heading">${content}</h1>`;
      case 'h2': return html`<h2 id="heading">${content}</h2>`;
      case 'h3': return html`<h3 id="heading">${content}</h3>`;
      case 'h4': return html`<h4 id="heading">${content}</h4>`;
      case 'h5': return html`<h5 id="heading">${content}</h5>`;
      case 'h6': return html`<h6 id="heading">${content}</h6>`;
      default: return content;
    }
  }

  async #initHeader() {
    if (this.headingText) {
      this.headingTag ||= 'h3';
    }
    this.#header = this.#getOrCreateHeader();

    // prevent double-logging
    if (this.#header !== this.#generatedHtag) {
      this.#generatedHtag = undefined;
    }

    do {
      await this.updateComplete;
    } while (!await this.updateComplete);

    // Remove the hidden attribute after upgrade
    this.hidden = false;
  }

  #getOrCreateHeader(): HTMLElement | undefined {
    // Check if there is no nested element or nested textNodes
    if (!this.firstElementChild && !this.firstChild) {
      return void this.#logger.warn('No header content provided');
    } else if (this.firstElementChild) {
      const [heading, ...otherContent] = Array.from(this.children)
          .filter((x): x is HTMLElement => !x.hasAttribute('slot') && isPorHeader(x));

      // If there is no content inside the slot, return empty with a warning
      // else, if there is more than 1 element in the slot, capture the first h-tag
      if (!heading) {
        return void this.#logger.warn('No heading information was provided.');
      } else if (otherContent.length) {
        this.#logger.warn('Heading currently only supports 1 tag; extra tags will be ignored.');
      }
      return heading;
    } else {
      if (!this.#generatedHtag) {
        this.#logger.warn('Header should contain at least 1 heading tag for correct semantics.');
      }
      this.#generatedHtag = document.createElement('h3');

      // If a text node was provided but no semantics, default to an h3
      // otherwise, incorrect semantics were used, create an H3 and try to capture the content
      if (this.firstChild?.nodeType === Node.TEXT_NODE) {
        this.#generatedHtag.textContent = this.firstChild.textContent;
      } else {
        this.#generatedHtag.textContent = this.textContent;
      }

      return this.#generatedHtag;
    }
  }

  #onClick() {
    const expanded = !this.expanded;
    const acc = this.closest('pf-accordion');
    if (acc) {
      this.dispatchEvent(new PfAccordionHeaderChangeEvent(expanded, this, acc));
    }
  }
}


declare global {
  interface HTMLElementTagNameMap {
    'pf-accordion-header': PfAccordionHeader;
  }
}
