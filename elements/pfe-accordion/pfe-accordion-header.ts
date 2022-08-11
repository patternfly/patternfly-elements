import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { unsafeStatic, html as staticH } from 'lit/static-html.js';

import { ColorTheme, ComposedEvent } from '@patternfly/pfe-core';
import { pfelement, bound, observed, initializer, colorContextConsumer } from '@patternfly/pfe-core/decorators.js';
import { getRandomId } from '@patternfly/pfe-core/functions/random.js';
import { deprecatedCustomEvent } from '@patternfly/pfe-core/functions/deprecatedCustomEvent.js';
import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';
import { Logger } from '@patternfly/pfe-core/controllers/logger.js';

import style from './pfe-accordion-header.scss';

import '@patternfly/pfe-icon';

const isPorHeader =
  (el: Node): el is HTMLElement =>
    el instanceof HTMLElement && !!el.tagName.match(/P|^H[1-6]/);

export class AccordionHeaderChangeEvent extends ComposedEvent {
  constructor(
    public expanded: boolean,
    public toggle: PfeAccordionHeader,
  ) {
    super('change');
  }
}

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
 * @fires {CustomEvent<{ expanded: Boolean; toggle: PfeAccordionHeader }>} pfe-accordion:change -
 *        when the open panels change {@deprecated Use `change`}
 *        ```javascript
 *        detail: {
 *          expanded: Boolean;
 *          toggle: PfeAccordionHeader;
 *        }
 *        ```
 */
@customElement('pfe-accordion-header') @pfelement()
export class PfeAccordionHeader extends LitElement {
  static readonly version = '{{version}}';

  static readonly styles = [style];

  static override readonly shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  @property({ attribute: 'aria-controls', reflect: true }) ariaControls?: string;

  /** Disclosure */
  @property({ type: String, reflect: true }) disclosure?: 'true'|'false';

  @observed
  @property({ type: Boolean, reflect: true }) expanded = false;

  @property({ reflect: true, attribute: 'heading-text' }) headingText = '';

  @property({ reflect: true, attribute: 'heading-tag' }) headingTag = 'h3';

  /**
   * Sets color theme based on parent context
   */
  @colorContextConsumer()
  @property({ reflect: true }) on?: ColorTheme;

  @query('.pf-c-accordion__toggle') button?: HTMLButtonElement;

  private _generatedHtag?: HTMLHeadingElement;

  private slots = new SlotController(this, 'accents', null);

  private logger = new Logger(this);

  private get ariaExpandedState(): 'true'|'false' {
    return String(!!this.expanded) as 'true'|'false';
  }

  constructor() {
    super();
    this.addEventListener('click', this._clickHandler);
  }

  override connectedCallback() {
    super.connectedCallback();
    this.hidden = true;
    this.id ||= getRandomId('pfe-accordion');
  }

  @initializer() protected async _init() {
    const header = await this._getHeaderElement();

    // prevent double-logging
    if (header !== this._generatedHtag) {
      this._generatedHtag = undefined;
    }

    this.headingTag = header?.tagName.toLowerCase() ?? 'h3';
    this.headingText = header?.textContent?.trim() ?? '';

    // Remove the hidden attribute after upgrade
    this.hidden = false;
  }

  override render() {
    const tag = unsafeStatic(this.headingTag);
    return staticH`
      <${tag} id="heading">${html`
        <button id="button"
          aria-expanded="${this.ariaExpandedState}"
          class="pf-c-accordion__toggle">
          <span class="pf-c-accordion__toggle-wrapper">
            <span class="pf-c-accordion__toggle-text" part="text">
              ${this.headingText || html`
              <slot></slot>
              `}
            </span>
            ${!this.slots.hasSlotted('accents') ? '' : html`
            <span class="pf-c-accordion__toggle-accents" part="accents">
              <slot name="accents"></slot>
            </span>
            `}
          </span>
          <pfe-icon
              icon="web-icon-caret-thin-right"
              on-fail="collapse"
              part="icon"
              class="pf-c-accordion__toggle-icon"
              size="1x"
          ></pfe-icon>
        </button>`}
      </${tag}>
    `;
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this._clickHandler);
  }

  @bound private async _getHeaderElement(): Promise<HTMLElement|undefined> {
    await this.updateComplete;
    // Check if there is no nested element or nested textNodes
    if (!this.firstElementChild && !this.firstChild) {
      return void this.logger.warn('No header content provided');
    } else if (this.firstElementChild) {
      const [heading, ...otherContent] = this.slots.getSlotted().filter(isPorHeader);

      // If there is no content inside the slot, return empty with a warning
      // else, if there is more than 1 element in the slot, capture the first h-tag
      if (!heading) {
        return void this.logger.warn('No heading information was provided.');
      } else if (otherContent.length) {
        this.logger.warn('Heading currently only supports 1 tag; extra tags will be ignored.');
      }
      return heading;
    } else {
      if (!this._generatedHtag) {
        this.logger.warn('Header should contain at least 1 heading tag for correct semantics.');
      }
      this._generatedHtag = document.createElement('h3');

      // If a text node was provided but no semantics, default to an h3
      // otherwise, incorrect semantics were used, create an H3 and try to capture the content
      if (this.firstChild?.nodeType === Node.TEXT_NODE) {
        this._generatedHtag.textContent = this.firstChild.textContent;
      } else {
        this._generatedHtag.textContent = this.textContent;
      }

      return this._generatedHtag;
    }
  }

  @bound private _clickHandler() {
    const expanded = !this.expanded;
    this.dispatchEvent(new AccordionHeaderChangeEvent(expanded, this));
    this.dispatchEvent(deprecatedCustomEvent('pfe-accordion:change', { expanded, toggle: this }));
  }

  protected _expandedChanged() {
    this.button?.setAttribute('aria-expanded', this.ariaExpandedState);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-accordion-header': PfeAccordionHeader;
  }
}
