import { LitElement, html as _html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { withStatic, unsafeStatic } from 'lit/static-html.js';

import { ComposedEvent } from '@patternfly/pfe-core';
import { pfelement, bound, observed, initializer } from '@patternfly/pfe-core/decorators.js';
import { getRandomId } from '@patternfly/pfe-core/functions/random.js';
import { pfeEvent } from '@patternfly/pfe-core/functions/pfeEvent.js';
import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';
import { Logger } from '@patternfly/pfe-core/controllers/logger.js';

import style from './pfe-accordion-header.scss';

import '@patternfly/pfe-icon';

const html = withStatic(_html);

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
  static readonly styles = [style];

  @property({ attribute: 'aria-controls', reflect: true }) ariaControls?: string;

  /** Disclosure */
  @property({ type: String, reflect: true }) disclosure?: 'true'|'false';

  @observed
  @property({ type: Boolean, reflect: true }) expanded = false;

  @property({ reflect: true, attribute: 'heading-text' }) headingText = '';

  @property({ reflect: true, attribute: 'heading-tag' }) headingTag = 'h3';

  @query('.pf-c-accordion__toggle') button?: HTMLButtonElement;

  private _generatedHtag?: HTMLHeadingElement;

  private slots = new SlotController(this, 'accents', null);
  private logger = new Logger(this);

  constructor() {
    super();
    this.addEventListener('click', this._clickHandler);
  }

  connectedCallback() {
    super.connectedCallback();
    this.hidden = true;
    this.id ||= getRandomId('pfe-accordion');
  }

  @initializer() protected async _init() {
    const header = await this._getHeaderElement();

    // prevent double-logging
    if (header !== this._generatedHtag)
      this._generatedHtag = undefined;

    this.headingTag = header?.tagName.toLowerCase() ?? 'h3';
    this.headingText = header?.textContent?.trim() ?? '';

    // Remove the hidden attribute after upgrade
    this.hidden = false;
  }

  render() {
    const tag = unsafeStatic(this.headingTag);
    return html`
      <${tag} id="heading">
        <button aria-expanded="${String(this.expanded)}" id="button" class="pf-c-accordion__toggle">
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
          ></pfe-icon>
        </button>
      </${tag}>
    `;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this._clickHandler);
  }

  @bound private async _getHeaderElement(): Promise<HTMLElement|undefined> {
    await this.updateComplete;
    // Check if there is no nested element or nested textNodes
    if (!this.firstElementChild && !this.firstChild)
      return void this.logger.warn('No header content provided');
    else if (this.firstElementChild) {
      const htags = this.slots.getSlotted().filter(isPorHeader);

      // If there is no content inside the slot, return empty with a warning
      if (htags.length === 0)
        return void this.logger.warn('No heading information was provided.');

      // If there is more than 1 element in the slot, capture the first h-tag
      else if (htags.length > 1) {
        this.logger.warn('Heading currently only supports 1 tag; extra tags will be ignored.');
        return htags[0];
      } else return htags[0];
    } else {
      if (!this._generatedHtag)
        this.logger.warn('Header should contain at least 1 heading tag for correct semantics.');
      this._generatedHtag = document.createElement('h3');

      // If a text node was provided but no semantics, default to an h3
      // otherwise, incorrect semantics were used, create an H3 and try to capture the content
      if (this.firstChild?.nodeType === Node.TEXT_NODE)
        this._generatedHtag.textContent = this.firstChild.textContent;
      else
        this._generatedHtag.textContent = this.textContent;

      return this._generatedHtag;
    }
  }

  @bound private _clickHandler() {
    const expanded = !this.expanded;
    this.dispatchEvent(new AccordionHeaderChangeEvent(expanded, this));
    this.dispatchEvent(pfeEvent('pfe-accordion:change', { expanded, toggle: this }));
  }

  protected _expandedChanged() {
    if (this.button)
      this.button.setAttribute('aria-expanded', this.expanded ? 'true' : 'false');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-accordion-header': PfeAccordionHeader;
  }
}
