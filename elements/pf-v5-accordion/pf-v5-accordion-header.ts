import type { PfV5Accordion } from './pf-v5-accordion.js';

import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';

import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';
import { Logger } from '@patternfly/pfe-core/controllers/logger.js';

import { getRandomId } from '@patternfly/pfe-core/functions/random.js';

import style from './pf-v5-accordion-header.css';

import '@patternfly/elements/pf-v5-icon/pf-v5-icon.js';

const isPorHeader =
  (el: Node): el is HTMLElement =>
    el instanceof HTMLElement && !!el.tagName.match(/P|^H[1-6]/);

export class PfV5AccordionHeaderChangeEvent extends Event {
  declare target: PfV5AccordionHeader;
  constructor(
    public expanded: boolean,
    public toggle: PfV5AccordionHeader,
    public accordion: PfV5Accordion
  ) {
    super('change', { bubbles: true });
  }
}

/**
 * Accordion Header
 * @fires {AccordionHeaderChangeEvent} change - when the open panels change
 *
 */
@customElement('pf-v5-accordion-header')
export class PfV5AccordionHeader extends LitElement {
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
        <!-- summary: inline element containing the heading text or slotted heading content -->
        <span part="text">${headingText ?? html`
          <!-- summary: A heading level tag (h1, h2, h3, h4, h5, h6) -->
          <slot></slot>`}
        </span>
        <!-- summary: container for accents within the header -->
        <span part="accents" ?hidden="${this.#slots.isEmpty('accents')}">
          <!-- summary: Header accent elements like tag or icon
               description: |
                 These elements will appear inline with the accordion header,
                 between the header and the chevron
                 (or after the chevron and header in disclosure mode). -->
          <slot name="accents"></slot>
        </span>
        <!-- summary: caret icon -->
        <pf-v5-icon part="icon"
                 class="icon"
                 size="lg"
                 set="${this.iconSet ?? 'fas'}"
                 icon="${this.icon ?? 'angle-right'}"
        ></pf-v5-icon>
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
    const acc = this.closest('pf-v5-accordion');
    if (acc) {
      this.dispatchEvent(new PfV5AccordionHeaderChangeEvent(expanded, this, acc));
    }
  }
}


declare global {
  interface HTMLElementTagNameMap {
    'pf-v5-accordion-header': PfV5AccordionHeader;
  }
}
