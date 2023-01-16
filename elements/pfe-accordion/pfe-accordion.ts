import { Logger } from '@patternfly/pfe-core/controllers/logger.js';
import { observed } from '@patternfly/pfe-core/decorators.js';
import { property } from 'lit/decorators.js';
import { customElement } from 'lit/decorators.js';

import { BaseAccordion } from './BaseAccordion.js';
import { BaseAccordionHeader } from './BaseAccordionHeader.js';
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

  protected static instances = new Set<PfeAccordion>();

  /**
   * Initializes the mini-SPA which modifies the location with accordion state
   */
  static initRouter() {
    window.addEventListener('popstate', () =>
      PfeAccordion.instances.forEach(el =>
        el.#updateStateFromURL()));
  }

  /** When true, only one accordion panel may be expanded at a time */
  @property({ reflect: true, type: Boolean }) single = false;

  /** Whether to apply the `bordered` style variant */
  @property({ type: Boolean, reflect: true }) bordered = false;

  /** Whether to apply the `large` style variant */
  @observed(function largeChanged(this: PfeAccordion) {
    [...this.headers, ...this.panels].forEach(el => el.toggleAttribute('large', this.large));
  })
  @property({ type: Boolean, reflect: true }) large = false;

  /**
   * Updates `window.history` and the URL to create sharable links.
   * With the `history` attribute, the accordion *must* have an `id`.
   *
   * The URL pattern will be `?{id-of-tabs}={index-of-expanded-items}`.
   * In the example below, selecting "Accordion 2" will update the URL as follows:
   * `?lorem-ipsum=2`. The index value for the expanded items starts at 1.
   *
   * ```html
   * <pfe-accordion history id="lorem-ipsum">
   *   <pfe-accordion-header>
   *     <h3>Accordion 1</h3>
   *   </pfe-accordion-header>
   *   <pfe-accordion-panel>
   *     <p>Accordion 1 panel content.</p>
   *   </pfe-accordion-panel>
   *   <pfe-accordion-header>
   *     <h3>Accordion 2</h3>
   *   </pfe-accordion-header>
   *   <pfe-accordion-panel>
   *     <p>Accordion 2 panel content.</p>
   *   </pfe-accordion-panel>
   * </pfe-accordion>
   * ```
   *
   * To expand multiple sets, you can dash separate indexes: ?lorem-ipsum=1-2.
   */
  @property({ type: Boolean }) history = false;

  @property({ type: Boolean, reflect: true }) fixed = false;

  #updateHistory = true;

  #logger = new Logger(this);

  #mo = new MutationObserver(() => this.#updateStateFromURL());

  override connectedCallback(): void {
    super.connectedCallback();
    PfeAccordion.instances.add(this);
    this.addEventListener('change', this.#updateURLHistory);
    this.#mo.observe(this, { childList: true });
    this.#updateStateFromURL();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    PfeAccordion.instances.delete(this);
  }

  override async expand(index: number, parentAccordion?: BaseAccordion) {
    if (index === -1) {
      return;
    }

    const allHeaders: Array<BaseAccordionHeader> = this.headers;

    // Get all the headers and capture the item by index value
    if (this.single) {
      await Promise.all([
        ...allHeaders.map((header, index) => header.expanded && this.collapse(index)),
      ]);
    }
    await super.expand(index, parentAccordion);
  }

  #getIndexesFromURL() {
    // Capture the URL parameters
    const urlParams = new URLSearchParams(window.location.search);

    // If parameters exist and they contain the ID for this accordion
    if (urlParams.has(this.id)) {
      const params = urlParams.get(this.id);
      // Split the parameters by underscore to see if more than 1 item is expanded
      const indexes = (params ?? '').split('-');
      if (indexes.length < 0) {
        return [];
      }

      // Clean up the results by converting to array count
      return indexes.map(item => parseInt(item.trim(), 10) - 1);
    }
  }

  /**
   * This handles updating the URL parameters based on the current state
   * of the global this.expanded array
   * @requires this.expandedSets {Array}
   */
  #updateURLHistory() {
    if (!this.history || !this.#updateHistory) {
      return;
    }

    if (!this.id) {
      this.#logger.error(`The history feature cannot update the URL without an ID added to the accordion tag.`);
      return;
    }

    // Capture the URL and rebuild it using the new state
    const url = new URL(window.location.href);

    // If values exist in the array, add them to the parameter string
    // Otherwise delete the set entirely
    if (this.expandedSets.size > 0) {
      // Iterate the expanded array by 1 to convert to human-readable vs. array notation;
      // sort values numerically and connect them using a dash
      url.searchParams.set(this.id, Array.from(this.expandedSets)
        .sort((a, b) => a - b)
        .join('-'));
    } else {
      url.searchParams.delete(this.id);
    }

    // Note: Using replace state protects the user's back navigation
    history.replaceState({}, '', url.toString());
  }

  /**
   * This captures the URL parameters and expands each item in the array
   */
  #updateStateFromURL() {
    const indexesFromURL = this.#getIndexesFromURL() ?? [];
    this.#updateHistory = false;
    indexesFromURL.forEach(idx => this.expand(idx));
    this.#updateHistory = true;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-accordion': PfeAccordion;
  }
}

PfeAccordion.initRouter();
