import type { TemplateResult } from 'lit';

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators/property.js';
import { unsafeStatic, html as staticH } from 'lit/static-html.js';

import { BaseAccordion } from './BaseAccordion.js';
import { ComposedEvent } from '@patternfly/pfe-core';
import { getRandomId } from '@patternfly/pfe-core/functions/random.js';
import { Logger } from '@patternfly/pfe-core/controllers/logger.js';

import style from './BaseAccordionHeader.css';

const isPorHeader =
  (el: Node): el is HTMLElement =>
    el instanceof HTMLElement && !!el.tagName.match(/P|^H[1-6]/);

export class AccordionHeaderChangeEvent extends ComposedEvent {
  constructor(
    public expanded: boolean,
    public toggle: BaseAccordionHeader,
    public accordion: BaseAccordion
  ) {
    super('change');
  }
}

export abstract class BaseAccordionHeader extends LitElement {
  static readonly styles = [style];

  static override readonly shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  @property({ type: Boolean, reflect: true }) expanded = false;

  @property({ reflect: true, attribute: 'heading-text' }) headingText = '';

  @property({ reflect: true, attribute: 'heading-tag' }) headingTag = 'h3';

  #generatedHtag?: HTMLHeadingElement;

  #logger = new Logger(this);

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this.#onClick);
    this.hidden = true;
    this.id ||= getRandomId(this.localName);
    this.#initHeader();
  }

  async #initHeader() {
    const header = this.#getOrCreateHeader();

    // prevent double-logging
    if (header !== this.#generatedHtag) {
      this.#generatedHtag = undefined;
    }

    this.headingTag = header?.tagName.toLowerCase() ?? 'h3';
    this.headingText = header?.textContent?.trim() ?? '';

    do {
      await this.updateComplete;
    } while (!await this.updateComplete);

    // Remove the hidden attribute after upgrade
    this.hidden = false;
  }

  /** Template hook: before </button> */
  renderAfterButton?(): TemplateResult;

  override render(): TemplateResult {
    const tag = unsafeStatic(this.headingTag);
    const ariaExpandedState = String(!!this.expanded) as 'true' | 'false';
    return staticH`
      <${tag} id="heading">
        <button id="button"
                class="toggle"
                aria-expanded="${ariaExpandedState}">
          <span part="text">${this.headingText || html`
            <slot></slot>`}
          </span>
          ${this.renderAfterButton?.()}
        </button>
      </${tag}>
    `;
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

  #onClick(event: MouseEvent) {
    const expanded = !this.expanded;
    const acc = event.composedPath().find(BaseAccordion.isAccordion);
    if (acc) {
      this.dispatchEvent(new AccordionHeaderChangeEvent(expanded, this, acc));
    }
  }
}
