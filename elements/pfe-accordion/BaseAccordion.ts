import type { TemplateResult } from 'lit';

import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';

import {
  bound,
  colorContextConsumer,
  colorContextProvider,
  deprecation,
  initializer,
  observed,
} from '@patternfly/pfe-core/decorators.js';

import { NumberListConverter, ColorPalette, ColorTheme, ComposedEvent } from '@patternfly/pfe-core';
import { deprecatedCustomEvent } from '@patternfly/pfe-core/functions/deprecatedCustomEvent.js';
import { Logger } from '@patternfly/pfe-core/controllers/logger.js';

import style from './BaseAccordion.scss';
import { AccordionHeaderChangeEvent, BaseAccordionHeader } from './BaseAccordionHeader.js';
import { BaseAccordionPanel } from './BaseAccordionPanel.js';

const CSS_TIMING_UNITS_RE = /^[0-9.]+(?<unit>[a-zA-Z]+)/g;

export class AccordionExpandEvent extends ComposedEvent {
  constructor(
      public toggle: BaseAccordionHeader,
      public panel: BaseAccordionPanel,
  ) {
    super('expand');
  }
}

export class AccordionCollapseEvent extends ComposedEvent {
  constructor(
      public toggle: BaseAccordionHeader,
      public panel: BaseAccordionPanel,
  ) {
    super('collapse');
  }
}


export abstract class BaseAccordion extends LitElement {
  static readonly styles = [style];

  static isHeader(element: Element|null): element is BaseAccordionHeader {
    return element instanceof BaseAccordionHeader;
  }

  static isPanel(element: Element|null): element is BaseAccordionPanel {
    return element instanceof BaseAccordionPanel;
  }

  /**
   * Sets color palette, which affects the element's styles as well as descendants' color theme.
   * Overrides parent color context.
   * Your theme will influence these colors so check there first if you are seeing inconsistencies.
   * See [Color](https://patternflyelements.org/theming/colors/) for default values
   */
  @colorContextProvider()
  @property({ reflect: true, attribute: 'color-palette' }) colorPalette?: ColorPalette;

  /** @deprecated use `color-palette` */
  @deprecation({ alias: 'colorPalette', attribute: 'color' }) color?: ColorPalette;

  /**
   * Sets color theme based on parent context
   */
  @colorContextConsumer()
  @property({ reflect: true }) on: ColorTheme = 'light';

  @property({ type: String, reflect: true })
    single?: 'true'|'false';

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

  @state() private _updateHistory = true;

  private expandedSets = new Set<number>();

  private initialized = false;

  #logger = new Logger(this);

  private styles = getComputedStyle(this);

  private transitionDuration = this.getAnimationDuration();

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

  isAccordionPanel(el?: EventTarget|null): el is BaseAccordionPanel {
    return el instanceof Element;
  }

  _panelForHeader(header: BaseAccordionHeader) {
    const next = header.nextElementSibling;

    if (!next) {
      return;
    }

    if (!this.isAccordionPanel(next)) {
      this.#logger.error('Sibling element to a header needs to be a panel');
      return;
    }

    return next;
  }

  /**
   * Initialize the accordion by connecting headers and panels
   * with aria controls and labels; set up the default disclosure
   * state if not set by the author; and check the URL for default
   * open
   */
  @initializer() protected async _init() {
    if (!this.initialized) {
      await this.updateComplete;
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

  private _expandHeader(header: BaseAccordionHeader) {
    const index = this._getIndex(header);

    // If this index is not already listed in the expandedSets array, add it
    this.expandedSets.add(index);

    header.expanded = true;
  }

  private async _expandPanel(panel: BaseAccordionPanel) {
    if (!panel) {
      this.#logger.error(`Trying to expand a panel that doesn't exist.`);
      return;
    }

    if (panel.expanded) {
      return;
    }

    panel.expanded = true;
    panel.hidden = false;

    await panel.updateComplete;

    const rect = panel.getBoundingClientRect();

    this._animate(panel, 0, rect.height);
  }

  private _collapseHeader(header: BaseAccordionHeader) {
    const index = this._getIndex(header);

    // If this index is exists in the expanded array, remove it
    this.expandedSets.delete(index);

    header.expanded = false;
  }

  private async _collapsePanel(panel: BaseAccordionPanel) {
    if (!panel) {
      this.#logger.error(`Trying to collapse a panel that doesn't exist`);
      return;
    }

    await panel.updateComplete;

    if (!panel.expanded) {
      return;
    }

    const rect = panel.getBoundingClientRect();

    panel.expanded = false;
    panel.hidden = true;

    this._animate(panel, rect.height, 0);
  }

  private getAnimationDuration(): number {
    if ('computedStyleMap' in this) {
      // @ts-expect-error: https://caniuse.com/?search=computedStyleMap
      return this.computedStyleMap().get('transition-duration')?.to('ms').value;
    } else {
      const { transitionDuration } = this.styles;

      const groups = CSS_TIMING_UNITS_RE.exec(transitionDuration)?.groups;

      if (!groups) {
        return 0;
      }

      const parsed = parseFloat(transitionDuration);

      if (groups.unit === 's') {
        return parsed * 1000;
      } else {
        return parsed;
      }
    }
  }

  private async _animate(panel: BaseAccordionPanel, start: number, end: number) {
    if (panel) {
      const header = panel.previousElementSibling;

      const transitionDuration = this.getAnimationDuration();
      if (transitionDuration) {
        this.transitionDuration = transitionDuration;
      }

      const duration = this.transitionDuration ?? 0;

      header?.classList.add('animating');
      panel.classList.add('animating');

      const animation = panel.animate({ height: [`${start}px`, `${end}px`] }, { duration });
      animation.play();
      await animation.finished;

      header?.classList.remove('animating');
      panel.classList.remove('animating');

      panel.style.removeProperty('height');
      panel.hidden = !panel.expanded;
    }
  }

  /**
   * @see https://www.w3.org/TR/wai-aria-practices/#accordion
   */
  private async _keydownHandler(evt: KeyboardEvent) {
    const currentHeader = evt.target as Element;

    if (!BaseAccordion.isHeader(currentHeader)) {
      return;
    }

    let newHeader: BaseAccordionHeader;

    switch (evt.key) {
      case 'ArrowDown':
        evt.preventDefault();
        newHeader = this._nextHeader();
        break;
      case 'ArrowUp':
        evt.preventDefault();
        newHeader = this._previousHeader();
        break;
      case 'Home':
        evt.preventDefault();
        newHeader = this._firstHeader();
        break;
      case 'End':
        evt.preventDefault();
        newHeader = this._lastHeader();
        break;
      default:
        return;
    }

    newHeader?.focus?.();
  }

  private _allHeaders(): BaseAccordionHeader[] {
    return Array.from(this.children).filter(BaseAccordion.isHeader);
  }

  private _allPanels(): BaseAccordionPanel[] {
    return Array.from(this.children).filter(BaseAccordion.isPanel);
  }

  private _previousHeader() {
    const headers = this._allHeaders();
    const newIndex = headers.findIndex(header => header.matches(':focus,:focus-within')) - 1;
    return headers[(newIndex + headers.length) % headers.length];
  }

  private _nextHeader() {
    const headers = this._allHeaders();
    const newIndex = headers.findIndex(header => header.matches(':focus,:focus-within')) + 1;
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
    if (BaseAccordion.isHeader(_el)) {
      const headers = this._allHeaders();
      return headers.findIndex(header => header.id === _el.id);
    }

    if (BaseAccordion.isPanel(_el)) {
      const panels = this._allPanels();
      return panels.findIndex(panel => panel.id === _el.id);
    }

    this.#logger.warn('The _getIndex method expects to receive a header or panel element.');
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
      this.#logger.error(`The history feature cannot update the URL without an ID added to the accordion tag.`);
      return;
    }

    // Iterate the expanded array by 1 to convert to human-readable vs. array notation;
    // sort values numerically and connect them using a dash
    const openIndexes = Array.from(this.expandedSets, item => item + 1)
      .sort((a, b) => a - b)
      .join('-');

    // Capture the URL and rebuild it using the new state
    const url = new URL(window.location.href);

    // If values exist in the array, add them to the parameter string
    // Otherwise delete the set entirely
    if (this.expandedSets.size > 0) {
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

  public updateAccessibility() {
    const headers = this._allHeaders();

    // For each header in the accordion, attach the aria connections
    headers.forEach(header => {
      const panel = this._panelForHeader(header);
      if (panel) {
        header.setAttribute('aria-controls', panel.id);
        panel.setAttribute('aria-labelledby', header.id);
        panel.hidden = !panel.expanded;
      }
    });
  }

  /**
   * Accepts a 0-based index value (integer) for the set of accordion items to expand or collapse.
   */
  public toggle(index: number) {
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
  public expand(index: number) {
    if (index == null) {
      return;
    }

    // Ensure the input is a number
    index = parseInt(`${index}`, 10);

    // Get all the headers and capture the item by index value
    const headers = this._allHeaders();

    if (this.single === 'true' && this._updateHistory) {
      const allOpenedHeaders = headers.filter(header => header.expanded);
      const allOpenedPanels = this._allPanels().filter(panel => panel.expanded);

      allOpenedHeaders.forEach(header => this._collapseHeader(header));
      allOpenedPanels.forEach(panel => this._collapsePanel(panel));
    }

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
    this.dispatchEvent(deprecatedCustomEvent('pfe-accordion:expand', { toggle, panel }));
  }

  /**
   * Expands all accordion items.
   */
  public expandAll() {
    const headers = this._allHeaders();
    const panels = this._allPanels();

    headers.forEach(header => this._expandHeader(header));
    panels.forEach(panel => this._expandPanel(panel));
  }

  /**
   * Accepts a 0-based index value (integer) for the set of accordion items to collapse.
   */
  public collapse(index: number) {
    const headers = this._allHeaders();
    const panels = this._allPanels();
    const toggle = headers[index];
    const panel = panels[index];

    if (!toggle || !panel) {
      return;
    }

    this._collapseHeader(toggle);
    this._collapsePanel(panel);

    // this.dispatchEvent(new AccordionCollapseEvent(toggle, panel));
    this.dispatchEvent(deprecatedCustomEvent('pfe-accordion:collapse', { toggle, panel }));
  }

  /**
   * Collapses all accordion items.
   */
  public async collapseAll() {
    const headers = this._allHeaders();
    const panels = this._allPanels();

    await headers.forEach(header => this._collapseHeader(header));
    await panels.forEach(panel => this._collapsePanel(panel));
  }
}
