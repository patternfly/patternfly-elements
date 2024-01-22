import type { TemplateResult } from 'lit';

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators/property.js';

import { NumberListConverter, ComposedEvent } from '@patternfly/pfe-core';
import { Logger } from '@patternfly/pfe-core/controllers/logger.js';

import { AccordionHeaderChangeEvent, BaseAccordionHeader } from './BaseAccordionHeader.js';
import { BaseAccordionPanel } from './BaseAccordionPanel.js';

import { RovingTabindexController } from '@patternfly/pfe-core/controllers/roving-tabindex-controller.js';

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
  static isAccordion(target: EventTarget | null): target is BaseAccordion {
    return target instanceof BaseAccordion;
  }

  static isHeader(target: EventTarget | null): target is BaseAccordionHeader {
    return target instanceof BaseAccordionHeader;
  }

  static isPanel(target: EventTarget | null): target is BaseAccordionPanel {
    return target instanceof BaseAccordionPanel;
  }

  static #isAccordionChangeEvent(event: Event): event is AccordionHeaderChangeEvent {
    return event instanceof AccordionHeaderChangeEvent;
  }

  #headerIndex = new RovingTabindexController<BaseAccordionHeader>(this);

  #expandedIndex: number[] = [];

  /**
   * Sets and reflects the currently expanded accordion 0-based indexes.
   * Use commas to separate multiple indexes.
   * ```html
   * <pf-accordion expanded-index="1,2">
   *   ...
   * </pf-accordion>
   * ```
   */
  @property({
    attribute: 'expanded-index',
    converter: NumberListConverter
  })
  get expandedIndex() {
    return this.#expandedIndex;
  }

  set expandedIndex(value) {
    const old = this.#expandedIndex;
    this.#expandedIndex = value;
    if (JSON.stringify(old) !== JSON.stringify(value)) {
      this.requestUpdate('expandedIndex', old);
      this.collapseAll().then(async () => {
        for (const i of this.expandedIndex) {
          await this.expand(i, this);
        }
      });
    }
  }

  get headers() {
    return this.#allHeaders();
  }

  get panels() {
    return this.#allPanels();
  }

  get #activeHeader() {
    const { headers } = this;
    const index = headers.findIndex(header => header.matches(':focus,:focus-within'));
    return index > -1 ? headers.at(index) : undefined;
  }

  protected expandedSets = new Set<number>();

  #logger = new Logger(this);

  // actually is read in #init, by the `||=` operator
  #initialized = false;

  protected override async getUpdateComplete(): Promise<boolean> {
    const c = await super.getUpdateComplete();
    const results = await Promise.all([
      ...this.#allHeaders().map(x => x.updateComplete),
      ...this.#allPanels().map(x => x.updateComplete),
    ]);
    return c && results.every(Boolean);
  }

  #mo = new MutationObserver(() => this.#init());

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('change', this.#onChange as EventListener);
    this.#mo.observe(this, { childList: true });
    this.#init();
  }

  render(): TemplateResult {
    return html`
      <slot></slot>
    `;
  }

  async firstUpdated() {
    const { headers } = this;
    headers.forEach((header, index) => {
      if (header.expanded) {
        this.#expandHeader(header, index);
        const panel = this.#panelForHeader(header);
        if (panel) {
          this.#expandPanel(panel);
        }
      }
    });
  }

  /**
   * Initialize the accordion by connecting headers and panels
   * with aria controls and labels; set up the default disclosure
   * state if not set by the author; and check the URL for default
   * open
   */
  async #init() {
    this.#initialized ||= !!await this.updateComplete;
    this.#headerIndex.initItems(this.headers);
    // Event listener to the accordion header after the accordion has been initialized to add the roving tabindex
    this.addEventListener('focusin', this.#updateActiveHeader);
    this.updateAccessibility();
  }

  #updateActiveHeader() {
    if (this.#activeHeader) {
      this.#headerIndex.updateActiveItem(this.#activeHeader);
    }
  }

  #panelForHeader(header: BaseAccordionHeader) {
    const next = header.nextElementSibling;
    if (!BaseAccordion.isPanel(next)) {
      return void this.#logger.error('Sibling element to a header needs to be a panel');
    } else {
      return next;
    }
  }

  #expandHeader(header: BaseAccordionHeader, index = this.#getIndex(header)) {
    // If this index is not already listed in the expandedSets array, add it
    this.expandedSets.add(index);
    this.#expandedIndex = [...this.expandedSets as Set<number>];
    header.expanded = true;
  }

  #expandPanel(panel: BaseAccordionPanel) {
    panel.expanded = true;
    panel.hidden = false;
  }

  async #collapseHeader(header: BaseAccordionHeader, index = this.#getIndex(header)) {
    if (!this.expandedSets) {
      await this.updateComplete;
    }
    this.expandedSets.delete(index);
    header.expanded = false;
    await header.updateComplete;
  }

  async #collapsePanel(panel: BaseAccordionPanel) {
    await panel.updateComplete;
    if (!panel.expanded) {
      return;
    }

    panel.expanded = false;
    panel.hidden = true;
  }

  #onChange(event: AccordionHeaderChangeEvent) {
    if (BaseAccordion.#isAccordionChangeEvent(event)) {
      const index = this.#getIndex(event.target);
      if (event.expanded) {
        this.expand(index, event.accordion);
      } else {
        this.collapse(index);
      }
    }
  }

  #allHeaders(accordion: BaseAccordion = this): BaseAccordionHeader[] {
    return Array.from(accordion.children).filter(BaseAccordion.isHeader);
  }

  #allPanels(accordion: BaseAccordion = this): BaseAccordionPanel[] {
    return Array.from(accordion.children).filter(BaseAccordion.isPanel);
  }

  #getIndex(el: Element | null) {
    if (BaseAccordion.isHeader(el)) {
      return this.headers.findIndex(header => header.id === el.id);
    }

    if (BaseAccordion.isPanel(el)) {
      return this.panels.findIndex(panel => panel.id === el.id);
    }

    this.#logger.warn('The #getIndex method expects to receive a header or panel element.');
    return -1;
  }

  public updateAccessibility() {
    const { headers } = this;

    // For each header in the accordion, attach the aria connections
    headers.forEach(header => {
      const panel = this.#panelForHeader(header);
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
  public async toggle(index: number) {
    const { headers } = this;
    const header = headers[index];

    if (!header.expanded) {
      await this.expand(index);
    } else {
      await this.collapse(index);
    }
  }

  /**
   * Accepts a 0-based index value (integer) for the set of accordion items to expand.
   * Accepts an optional parent accordion to search for headers and panels.
   */
  public async expand(index: number, parentAccordion?: BaseAccordion) {
    const allHeaders: Array<BaseAccordionHeader> = this.#allHeaders(parentAccordion);

    const header = allHeaders[index];
    if (!header) {
      return;
    }

    const panel = this.#panelForHeader(header);
    if (!panel) {
      return;
    }

    // If the header and panel exist, open both
    this.#expandHeader(header, index),
    this.#expandPanel(panel),

    header.focus();

    this.dispatchEvent(new AccordionExpandEvent(header, panel));

    await this.updateComplete;
  }

  /**
   * Expands all accordion items.
   */
  public async expandAll() {
    this.headers.forEach(header => this.#expandHeader(header));
    this.panels.forEach(panel => this.#expandPanel(panel));
    await this.updateComplete;
  }

  /**
   * Accepts a 0-based index value (integer) for the set of accordion items to collapse.
   */
  public async collapse(index: number) {
    const header = this.headers.at(index);
    const panel = this.panels.at(index);

    if (!header || !panel) {
      return;
    }

    this.#collapseHeader(header);
    this.#collapsePanel(panel);

    this.dispatchEvent(new AccordionCollapseEvent(header, panel));
    await this.updateComplete;
  }

  /**
   * Collapses all accordion items.
   */
  public async collapseAll() {
    this.headers.forEach(header => this.#collapseHeader(header));
    this.panels.forEach(panel => this.#collapsePanel(panel));
    await this.updateComplete;
  }
}
