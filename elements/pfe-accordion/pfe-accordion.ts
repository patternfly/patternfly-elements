import type { TemplateResult } from 'lit';

import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import {
  bound,
  cascades,
  initializer,
  observed,
  pfelement,
} from '@patternfly/pfe-core/decorators.js';

import { NumberListConverter, ComposedEvent } from '@patternfly/pfe-core';
import { pfeEvent } from '@patternfly/pfe-core/functions/pfeEvent.js';
import { Logger } from '@patternfly/pfe-core/controllers/logger.js';

import { AccordionHeaderChangeEvent, PfeAccordionHeader } from './pfe-accordion-header.js';
import { PfeAccordionPanel } from './pfe-accordion-panel.js';

import style from './pfe-accordion.scss';

function isPfeAccordionPanel(el?: EventTarget|null): el is PfeAccordionPanel {
  return el instanceof Element && el.tagName.toLowerCase() === 'pfe-accordion-panel';
}

export class AccordionExpandEvent extends ComposedEvent {
  constructor(
    public toggle: PfeAccordionHeader,
    public panel: PfeAccordionPanel,
  ) {
    super('expand');
  }
}

export class AccordionCollapseEvent extends ComposedEvent {
  constructor(
    public toggle: PfeAccordionHeader,
    public panel: PfeAccordionPanel,
  ) {
    super('collapse');
  }
}

/**
 * Accordion
 * Accordions toggle the visibility of sections of content.
 * They feature panels that consist of a section text label and a caret icon that collapses or expands to reveal more information.
 *
 * @fires {AccordionExpandEvent} expand - when a panel expands
 * @fires {AccordionCollapseEvent} collapse - when a panel collapses
 *
 * @fires {CustomEvent<{ toggle: PfeAccordionHeader, panel: PfeAccordionPanel }>} pfe-accordion:expand - when a panel expands {@deprecated Use `expand`}
 * @fires {CustomEvent<{ toggle: PfeAccordionHeader, panel: PfeAccordionPanel }>} pfe-accordion:collapse - when a panel collapses {@deprecated Use `collapse`}
 *
 * @slot
 *       Place the `pfe-accordion-header` and `pfe-accordion-panel` elements here.
 *
 * @cssproperty {[ <length> | <percentage> ]{1,4}}--pfe-accordion--Padding
 *              Applied to header and panel components
 *              {@default `var(--pfe-theme--container-padding, 1rem) calc(var(--pfe-theme--container-padding, 1rem) * 1.5)`}
 * @cssproperty {<color>} --pfe-accordion--BorderColor
 *              Color of the encompassing borders
 *              {@default `var(--pfe-theme--color--surface--border, #d2d2d2)`}
 * @cssproperty {<length>} --pfe-accordion--BorderWidth
 *              Width of the encompassing borders
 *              {@default `var(--pfe-theme--surface--border-width, 1px)`}
 * @cssproperty {<length>} --pfe-accordion--accent--width
 *              Width of the accent mark
 *              {@default `var(--pfe-theme--surface--border-width--active, 3px)`}
 * @cssproperty {<length>} --pfe-accordion--Width
 *              Maximum width for the accordion element
 *              {@default `100%`}
 * @cssproperty {<length>} --pfe-accordion--MaxWidth--content
 *              Maximum width for the content inside the accordion panel
 *              {@default `80ch`}
 * @cssproperty --pfe-accordion--BoxShadow
 *              Box shadow on the header and panel in closed state
 *              {@default `0 5px 4px transparent`}
 * @cssproperty {<number>} --pfe-accordion--ZIndex
 *              Accordion's z-index for the stack
 *              {@default `3`}
 * @cssproperty --pfe-accordion--FontSize--header
 *              Font-size for the accordion header text
 *              {@default `var(--pf-global--FontSize--xl, 1.25rem)`}
 * @cssproperty --pfe-accordion--FontWeight--header
 *              Font-weight for the accordion header text
 *              {@default `var(--pfe-theme--font-weight--normal, 400)`}
 * @cssproperty --pfe-accordion--TextAlign
 *              Text alignment for the accordion header text
 *              {@default `left`}
 * @cssproperty --pfe-accordion--BackgroundColor
 *              Background color for the accordion header and panel
 *              {@default `transparent`}
 * @cssproperty {<color>} --pfe-accordion--Color
 *              Text color for the accordion header and panel
 *              {@default `var(--pfe-broadcasted--text, #3c3f42)`}
 * @cssproperty --pfe-accordion--accent
 *              Left accent line color for the accordion header and panel
 *              {@default `transparent`}
 * @cssproperty --pfe-accordion--BackgroundColor--active
 *              Background color when the accordion is active (hover, focus)
 *              {@default `var(--pfe-theme--color--surface--lighter, #f0f0f0)`}
 * @cssproperty --pfe-accordion--Color--active
 *              Text color when the accordion is active (hover, focus)
 *              {@default `var(--pfe-broadcasted--text, #3c3f42)`}
 * @cssproperty --pfe-accordion--accent--active
 *              Color of the accent mark when the accordion is active (hover, focus)
 *              {@default `var(--pfe-theme--color--ui-accent, #06c)`}
 * @cssproperty --pfe-accordion--BackgroundColor--expanded
 *              Background color when the accordion is open
 *              {@default `var(--pfe-theme--color--surface--lightest, #fff)`}
 * @cssproperty --pfe-accordion--Color--expanded
 *              Text color when the accordion is open
 *              {@default `var(--pfe-broadcasted--text, #3c3f42)`}
 * @cssproperty --pfe-accordion--accent--expanded
 *              Color of the accent mark when the accordion is open
 *              {@default `var(--pfe-theme--color--ui-accent, #06c)`}
 * @cssproperty --pfe-accordion--BoxShadow--expanded
 *              Box shadow when the accordion is open
 *              {@default `0 5px 4px rgba(140, 140, 140, 0.35)`}
 */
@customElement('pfe-accordion') @pfelement()
export class PfeAccordion extends LitElement {
  static readonly styles = [style];

  static isHeader(element: Element|null): element is PfeAccordionHeader {
    return element instanceof PfeAccordionHeader;
  }

  static isPanel(element: Element|null): element is PfeAccordionPanel {
    return element instanceof PfeAccordionPanel;
  }

  /**
   * If the element has one `pfe-accordion-header`, it will get tagged with
   * `disclosure="true"`. This applies a slightly different set of styles:
   * chevron appears on the left side, the header has a single border on all four sides.
   * Applying `disclosure="false"` to an element containing only one header/panel pairing
   * will set the element to display as a standard accordion.
   */
  @cascades('pfe-accordion-header', 'pfe-accordion-panel')
  @property({ type: String, reflect: true })
    disclosure?: 'true'|'false';

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
  @observed
  @property({ type: Boolean }) history = false;

  /**
   * Sets and reflects the currently expanded accordion indexes.
   * Use commas to separate multiple indexes. The index value for the
   * expanded items starts at 1.
   *
   * ```html
   * <pfe-accordion expanded-index="2,3">
   *   ...
   * </pfe-accordion>
   * ```
   */
  @observed
  @property({ attribute: 'expanded-index', converter: NumberListConverter })
    expandedIndex: number[] = [];

  /**
   * Changes the context of the accordion to one of 3 possible themes:
   *
   * - `light` (default)
   * - `dark`
   * - `saturated`
   *
   * This will override any context being passed from a parent component
   * and will add a style attribute setting the `--theme` variable.
   * @attr context
   */
  declare context: 'light'|'dark'|'saturated';

  @state() expandedSets: number[] = [];

  @state() private _updateHistory = true;

  private _manualDisclosure?: 'true'|'false';

  private initialized = false;

  private logger = new Logger(this);

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('change', this._changeHandler as EventListener);
    this.addEventListener('keydown', this._keydownHandler);
  }

  render(): TemplateResult {
    return html`
      <slot></slot>
    `;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('popstate', this._updateStateFromURL);
  }

  /**
   * Initialize the accordion by connecting headers and panels
   * with aria controls and labels; set up the default disclosure
   * state if not set by the author; and check the URL for default
   * open
   */
  @initializer() protected _init() {
    if (!this.initialized) {
      this._manualDisclosure = this.getAttribute('disclosure') as 'true'|'false';
      this.initialized = true;
    }

    this.updateAccessibility();

    // Update state if params exist in the URL
    this._updateStateFromURL();
  }

  @bound private _changeHandler(event: AccordionHeaderChangeEvent) {
    if (this.classList.contains('animating')) {
      return;
    }

    const index = this._getIndex(event.target as Element);

    if (event.expanded) {
      this.expand(index);
    } else {
      this.collapse(index);
    }

    this._updateURLHistory();
  }

  private _expandHeader(header: PfeAccordionHeader) {
    const index = this._getIndex(header);

    // If this index is not already listed in the expandedSets array, add it
    if (!this.expandedSets.includes(index) && index > -1) {
      this.expandedSets.push(index);
    }

    header.expanded = true;
  }

  private async _expandPanel(panel: PfeAccordionPanel) {
    if (!panel) {
      this.logger.error(`Trying to expand a panel that doesn't exist.`);
      return;
    }

    if (panel.expanded) {
      return;
    }

    panel.expanded = true;

    await panel.updateComplete;

    const rect = panel.getBoundingClientRect();

    this._animate(panel, 0, rect.height);
  }

  private _collapseHeader(header: PfeAccordionHeader) {
    const index = this._getIndex(header);

    // If this index is exists in the expanded array, remove it
    const idx = this.expandedSets.indexOf(index);
    if (idx >= 0) {
      this.expandedSets.splice(idx, 1);
    }

    header.expanded = false;
  }

  private async _collapsePanel(panel: PfeAccordionPanel) {
    if (!panel) {
      this.logger.error(`Trying to collapse a panel that doesn't exist`);
      return;
    }

    await panel.updateComplete;

    if (!panel.expanded) {
      return;
    }

    const rect = panel.getBoundingClientRect();

    panel.expanded = false;

    this._animate(panel, rect.height, 0);
  }

  private async _animate(panel: PfeAccordionPanel, start: number, end: number) {
    if (panel) {
      const header = panel.previousElementSibling;
      if (header) {
        header.classList.add('animating');
      }

      panel.classList.add('animating');
      panel.style.height = `${start}px`;

      // panel.animate({ height: [`${start}px`, `${end}px`] }).play();

      // TODO: use Element#animate
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          panel.style.height = `${end}px`;
          panel.addEventListener('transitionend', this._transitionEndHandler, { once: true });
        });
      });
    }
  }

  private _keydownHandler(evt: KeyboardEvent) {
    const currentHeader = evt.target as Element;

    if (!PfeAccordion.isHeader(currentHeader)) {
      return;
    }

    let newHeader: PfeAccordionHeader;

    switch (evt.key) {
      case 'ArrowDown':
      case 'Down':
      case 'ArrowRight':
      case 'Right':
        newHeader = this._nextHeader();
        break;
      case 'ArrowUp':
      case 'Up':
      case 'ArrowLeft':
      case 'Left':
        newHeader = this._previousHeader();
        break;
      case 'Home':
        newHeader = this._firstHeader();
        break;
      case 'End':
        newHeader = this._lastHeader();
        break;
      default:
        return;
    }

    // QUESTION: await newHeader.updateComplete here?
    if (newHeader) {
      newHeader.shadowRoot?.querySelector('button')?.focus?.();

      const index = this._getIndex(newHeader);
      this.expand(index);
    }
  }

  @bound private _transitionEndHandler(evt: TransitionEvent) {
    const panel = evt.target as PfeAccordionPanel;
    const header = panel.previousElementSibling;
    if (header) {
      header.classList.remove('animating');
    }
    panel.style.removeProperty('height');
    panel.classList.remove('animating');
  }

  private _allHeaders(): PfeAccordionHeader[] {
    return Array.from(this.children).filter(PfeAccordion.isHeader);
  }

  private _allPanels(): PfeAccordionPanel[] {
    return Array.from(this.children).filter(PfeAccordion.isPanel);
  }

  private _panelForHeader(header: PfeAccordionHeader) {
    const next = header.nextElementSibling;

    if (!next) {
      return;
    }

    if (!isPfeAccordionPanel(next)) {
      this.logger.error('Sibling element to a header needs to be a panel');
      return;
    }

    return next;
  }

  private _previousHeader() {
    const headers = this._allHeaders();
    const newIndex = headers.findIndex(header => header === document.activeElement) - 1;
    return headers[(newIndex + headers.length) % headers.length];
  }

  private _nextHeader() {
    const headers = this._allHeaders();
    const newIndex = headers.findIndex(header => header === document.activeElement) + 1;
    return headers[newIndex % headers.length];
  }

  private _firstHeader() {
    const headers = this._allHeaders();
    return headers[0];
  }

  private _lastHeader() {
    const headers = this._allHeaders();
    return headers[headers.length - 1];
  }

  protected async _expandedIndexChanged(oldVal?: number[], newVal?: number[]) {
    await this.updateComplete;
    if (oldVal === newVal || !Array.isArray(newVal)) {
      return;
    }
    [...newVal].reverse().forEach(i => this.expand(i - 1));
  }

  private _getIndex(_el: Element|null) {
    if (PfeAccordion.isHeader(_el)) {
      const headers = this._allHeaders();
      return headers.findIndex(header => header.id === _el.id);
    }

    if (PfeAccordion.isPanel(_el)) {
      const panels = this._allPanels();
      return panels.findIndex(panel => panel.id === _el.id);
    }

    this.logger.warn('The _getIndex method expects to receive a header or panel element.');
    return -1;
  }

  @bound private _getIndexesFromURL() {
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
  @bound private _updateURLHistory() {
    if (!this.history || !this._updateHistory) {
      return;
    }

    if (!this.id) {
      this.logger.error(`The history feature cannot update the URL without an ID added to the pfe-accordion tag.`);
      return;
    }

    // Iterate the expanded array by 1 to convert to human-readable vs. array notation;
    // sort values numerically and connect them using a dash
    const openIndexes = this.expandedSets
      .map(item => item + 1)
      .sort((a, b) => a - b)
      .join('-');

    // Capture the URL and rebuild it using the new state
    const url = new URL(window.location.href);

    // If values exist in the array, add them to the parameter string
    // Otherwise delete the set entirely
    if (this.expandedSets.length > 0) {
      url.searchParams.set(this.id, openIndexes);
    } else {
      url.searchParams.delete(this.id);
    }

    // Note: Using replace state protects the user's back navigation
    history.replaceState({}, '', url.toString());
  }

  /**
   * This captures the URL parameters and expands each item in the array
   */
  @bound private _updateStateFromURL() {
    const indexesFromURL = this._getIndexesFromURL() ?? [];

    this._updateHistory = false;
    indexesFromURL.forEach(idx => this.expand(idx));
    this._updateHistory = true;
  }

  /**
   * Accepts a 0-based index value (integer) for the set of accordion items to expand or collapse.
   */
  toggle(index: number) {
    const headers = this._allHeaders();
    const header = headers[index];

    if (!header.expanded) {
      this.expand(index);
    } else {
      this.collapse(index);
    }
  }

  /**
   * Accepts a 0-based index value (integer) for the set of accordion items to expand.
   */
  expand(index: number) {
    if (index == null) {
      return;
    }

    // Ensure the input is a number
    index = parseInt(`${index}`, 10);

    // Get all the headers and capture the item by index value
    const headers = this._allHeaders();
    const toggle = headers[index];
    if (!toggle) {
      return;
    }

    const panel = this._panelForHeader(toggle);
    if (!toggle || !panel) {
      return;
    }

    // If the header and panel exist, open both
    this._expandHeader(toggle);
    this._expandPanel(panel);

    toggle.focus();

    this.dispatchEvent(new AccordionExpandEvent(toggle, panel));
    this.dispatchEvent(pfeEvent('pfe-accordion:expand', { toggle, panel }));
  }

  /**
   * Expands all accordion items.
   */
  expandAll() {
    const headers = this._allHeaders();
    const panels = this._allPanels();

    headers.forEach(header => this._expandHeader(header));
    panels.forEach(panel => this._expandPanel(panel));
  }

  /**
   * Accepts a 0-based index value (integer) for the set of accordion items to collapse.
   */
  collapse(index: number) {
    const headers = this._allHeaders();
    const panels = this._allPanels();
    const toggle = headers[index];
    const panel = panels[index];

    if (!toggle || !panel) {
      return;
    }

    this._collapseHeader(toggle);
    this._collapsePanel(panel);

    this.dispatchEvent(new AccordionCollapseEvent(toggle, panel));
    this.dispatchEvent(pfeEvent('pfe-accordion:collapse', { toggle, panel }));
  }

  /**
   * Collapses all accordion items.
   */
  collapseAll() {
    const headers = this._allHeaders();
    const panels = this._allPanels();

    headers.forEach(header => this._collapseHeader(header));
    panels.forEach(panel => this._collapsePanel(panel));
  }

  updateAccessibility() {
    const headers = this._allHeaders();

    // For each header in the accordion, attach the aria connections
    headers.forEach(header => {
      const panel = this._panelForHeader(header);
      if (panel) {
        header.setAttribute('aria-controls', panel.id);
        panel.setAttribute('aria-labelledby', header.id);
      }
    });

    // If disclosure was not set by the author, set up the defaults
    if (headers.length === 1) {
      this.disclosure = this._manualDisclosure ?? 'true';
    } else if (headers.length > 1) {
      this.disclosure = 'false';
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-accordion': PfeAccordion;
  }
}
