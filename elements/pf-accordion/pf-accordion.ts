import { LitElement, html, type TemplateResult } from 'lit';
import { observes } from '@patternfly/pfe-core/decorators/observes.js';
import { listen } from '@patternfly/pfe-core/decorators/listen.js';
import { property } from 'lit/decorators/property.js';
import { customElement } from '@patternfly/pfe-core/decorators/custom-element.js';

import { RovingTabindexController } from '@patternfly/pfe-core/controllers/roving-tabindex-controller.js';
import { NumberListConverter } from '@patternfly/pfe-core';
import { Logger } from '@patternfly/pfe-core/controllers/logger.js';

import { PfAccordionHeader, PfAccordionHeaderChangeEvent } from './pf-accordion-header.js';
import { PfAccordionPanel } from './pf-accordion-panel.js';

export * from './pf-accordion-header.js';
export * from './pf-accordion-panel.js';

import style from './pf-accordion.css';

export class PfAccordionExpandEvent extends Event {
  constructor(
    public toggle: PfAccordionHeader,
    public panel: PfAccordionPanel,
  ) {
    super('expand', { bubbles: true, cancelable: true });
  }
}

export class PfAccordionCollapseEvent extends Event {
  constructor(
    public toggle: PfAccordionHeader,
    public panel: PfAccordionPanel,
  ) {
    super('collapse', { bubbles: true, cancelable: true });
  }
}

/**
 * An **accordion** is an interactive container that expands and collapses to hide or reveal nested content. It takes advantage of progressive disclosure to help reduce page scrolling, by allowing users to choose whether they want to show or hide more detailed information as needed.
 * @summary Toggle the visibility of sections of content
 * @fires {AccordionExpandEvent} expand - when a panel expands
 * @fires {AccordionCollapseEvent} collapse - when a panel collapses
 * @slot
 *       Place the `pf-accordion-header` and `pf-accordion-panel` elements here.
 * @cssprop [--pf-c-accordion--BackgroundColor=var(--pf-global--BackgroundColor--100, #fff)]
 * @cssprop [--pf-c-accordion__toggle--PaddingTop=var(--pf-global--spacer--sm, 0.5rem)]
 * @cssprop [--pf-c-accordion__toggle--PaddingRight=var(--pf-global--spacer--md, 1rem)]
 * @cssprop [--pf-c-accordion__toggle--PaddingBottom=var(--pf-global--spacer--sm, 0.5rem)]
 * @cssprop [--pf-c-accordion__toggle--PaddingLeft=var(--pf-global--spacer--md, 1rem)]
 * @cssprop [--pf-c-accordion__toggle--before--BackgroundColor=transparent]
 * @cssprop [--pf-c-accordion__toggle--before--Top=0]
 * @cssprop [--pf-c-accordion__toggle--hover--BackgroundColor=var(--pf-global--BackgroundColor--200, #f0f0f0)]
 * @cssprop [--pf-c-accordion__toggle--focus--BackgroundColor=var(--pf-global--BackgroundColor--200, #f0f0f0)]
 * @cssprop [--pf-c-accordion__toggle--active--BackgroundColor=var(--pf-global--BackgroundColor--200, #f0f0f0)]
 * @cssprop [--pf-c-accordion__toggle--before--Width=var(--pf-global--BorderWidth--lg, 3px)]
 * @cssprop [--pf-c-accordion__toggle--m-expanded--before--BackgroundColor=var(--pf-global--primary-color--100, #06c)]
 * @cssprop [--pf-c-accordion__toggle-text--MaxWidth=calc(100 - var(--pf-global--spacer--lg, 1.5rem))]
 * @cssprop [--pf-c-accordion__toggle--hover__toggle-text--Color=var(--pf-global--link--Color, #06c)]
 * @cssprop [--pf-c-accordion__toggle--active__toggle-text--Color=var(--pf-global--link--Color, #06c)]
 * @cssprop [--pf-c-accordion__toggle--active__toggle-text--FontWeight=var(--pf-global--FontWeight--semi-bold, 700)]
 * @cssprop [--pf-c-accordion__toggle--focus__toggle-text--Color=var(--pf-global--link--Color, #06c)]
 * @cssprop [--pf-c-accordion__toggle--focus__toggle-text--FontWeight=var(--pf-global--FontWeight--semi-bold, 700)]
 * @cssprop [--pf-c-accordion__toggle--m-expanded__toggle-text--Color=var(--pf-global--link--Color, #06c)]
 * @cssprop [--pf-c-accordion__toggle--m-expanded__toggle-text--FontWeight=var(--pf-global--FontWeight--semi-bold, 700)]
 * @cssprop [--pf-c-accordion__toggle-icon--Transition=.2s ease-in 0s]
 * @cssprop [--pf-c-accordion__toggle--m-expanded__toggle-icon--Rotate=90deg]
 * @cssprop [--pf-c-accordion__expanded-content--Color=var(--pf-global--Color--200, #6a6e73)]
 * @cssprop [--pf-c-accordion__expanded-content--FontSize=var(--pf-global--FontSize--sm, 0.875rem)]
 * @cssprop [--pf-c-accordion__expanded-content--m-expanded__expanded-content-body--before--BackgroundColor=var(--pf-global--primary-color--100, #06c)]
 * @cssprop [--pf-c-accordion__expanded-content--m-fixed--MaxHeight=9.375rem]
 * @cssprop [--pf-c-accordion__expanded-content-body--PaddingTop=var(--pf-global--spacer--sm, 0.5rem)]
 * @cssprop [--pf-c-accordion__expanded-content-body--PaddingRight=var(--pf-global--spacer--md, 1rem)]
 * @cssprop [--pf-c-accordion__expanded-content-body--PaddingBottom=var(--pf-global--spacer--sm, 0.5rem)]
 * @cssprop [--pf-c-accordion__expanded-content-body--PaddingLeft=var(--pf-global--spacer--md, 1rem)]
 * @cssprop [--pf-c-accordion__expanded-content-body--expanded-content-body--PaddingTop=0]
 * @cssprop [--pf-c-accordion__expanded-content-body--before--BackgroundColor=transparent]
 * @cssprop [--pf-c-accordion__expanded-content-body--before--Width=var(--pf-global--BorderWidth--lg, 3px)]
 * @cssprop [--pf-c-accordion__expanded-content-body--before--Top=0]
 * @cssprop [--pf-c-accordion--m-display-lg__toggle--PaddingTop=var(--pf-global--spacer--md, 1rem)]
 * @cssprop [--pf-c-accordion--m-display-lg__toggle--PaddingRight=var(--pf-global--spacer--md, 1rem)]
 * @cssprop [--pf-c-accordion--m-display-lg__toggle--PaddingBottom=var(--pf-global--spacer--md, 1rem)]
 * @cssprop [--pf-c-accordion--m-display-lg__toggle--PaddingLeft=var(--pf-global--spacer--lg, 1.5rem)]
 * @cssprop [--pf-c-accordion--m-display-lg__toggle--FontFamily=var(--pf-global--FontFamily--heading--sans-serif, "RedHatDisplay", "Overpass", overpass, helvetica, arial, sans-serif)]
 * @cssprop [--pf-c-accordion--m-display-lg__toggle--FontSize=var(--pf-global--FontSize--xl, 1.25rem)]
 * @cssprop [--pf-c-accordion--m-display-lg__toggle--hover__toggle-text--Color=var(--pf-global--Color--100, #151515)]
 * @cssprop [--pf-c-accordion--m-display-lg__toggle--active__toggle-text--Color=var(--pf-global--Color--100, #151515)]
 * @cssprop [--pf-c-accordion--m-display-lg__toggle--active__toggle-text--FontWeight=var(--pf-global--FontWeight--normal, 400)]
 * @cssprop [--pf-c-accordion--m-display-lg__toggle--focus__toggle-text--Color=var(--pf-global--Color--100, #151515)]
 * @cssprop [--pf-c-accordion--m-display-lg__toggle--focus__toggle-text--FontWeight=var(--pf-global--FontWeight--normal, 400)]
 * @cssprop [--pf-c-accordion--m-display-lg__toggle--m-expanded__toggle-text--Color=var(--pf-global--Color--100, #151515)]
 * @cssprop [--pf-c-accordion--m-display-lg__toggle--m-expanded__toggle-text--FontWeight=var(--pf-global--FontWeight--normal, 400)]
 * @cssprop [--pf-c-accordion--m-display-lg__expanded-content--FontSize=var(--pf-global--FontSize--md, 1rem)]
 * @cssprop [--pf-c-accordion--m-display-lg__expanded-content--Color=var(--pf-global--Color--100, #151515)]
 * @cssprop [--pf-c-accordion--m-display-lg__expanded-content-body--PaddingTop=0]
 * @cssprop [--pf-c-accordion--m-display-lg__expanded-content-body--PaddingRight=var(--pf-global--spacer--md, 1rem)]
 * @cssprop [--pf-c-accordion--m-display-lg__expanded-content-body--PaddingBottom=var(--pf-global--spacer--md, 1rem)]
 * @cssprop [--pf-c-accordion--m-display-lg__expanded-content-body--last-child--PaddingBottom=var(--pf-global--spacer--lg, 1.5rem)]
 * @cssprop [--pf-c-accordion--m-display-lg__expanded-content-body--PaddingLeft=var(--pf-global--spacer--lg, 1.5rem)]
 * @cssprop [--pf-c-accordion--m-bordered--BorderTopWidth=var(--pf-global--BorderWidth--sm, 1px)]
 * @cssprop [--pf-c-accordion--m-bordered--BorderTopColor=var(--pf-global--BorderColor--100, #d2d2d2)]
 * @cssprop [--pf-c-accordion--m-bordered__toggle--before--Top=calc(-1 * var(--pf-global--BorderWidth--sm, 1px))]
 * @cssprop [--pf-c-accordion--m-bordered__toggle--after--BorderColor=var(--pf-global--BorderColor--100, #d2d2d2)]
 * @cssprop [--pf-c-accordion--m-bordered__toggle--after--BorderTopWidth=0]
 * @cssprop [--pf-c-accordion--m-bordered__toggle--after--BorderBottomWidth=var(--pf-global--BorderWidth--sm, 1px)]
 * @cssprop [--pf-c-accordion--m-bordered__expanded-content--m-expanded__expanded-content-body--last-child--after--BorderBottomWidth=var(--pf-global--BorderWidth--sm, 1px)]
 * @cssprop [--pf-c-accordion--m-bordered__expanded-content--m-expanded__expanded-content-body--last-child--after--BorderBottomColor=var(--pf-global--BorderColor--100, #d2d2d2)]
 */
@customElement('pf-accordion')
export class PfAccordion extends LitElement {
  static readonly styles: CSSStyleSheet[] = [style];

  /** When true, only one accordion panel may be expanded at a time */
  @property({ reflect: true, type: Boolean }) single = false;

  /** Whether to apply the `bordered` style variant */
  @property({ type: Boolean, reflect: true }) bordered = false;

  /** Whether to apply the `large` style variant */
  @property({ type: Boolean, reflect: true }) large = false;

  @property({ type: Boolean, reflect: true }) fixed = false;

  /**
   * Sets and reflects the currently expanded accordion 0-based indexes.
   * Use commas to separate multiple indexes.
   * ```html
   * <pf-accordion expanded-index="1,2">
   *   ...
   * </pf-accordion>
   * ```
   */
  @property({ attribute: 'expanded-index', converter: NumberListConverter })
  get expandedIndex(): number[] {
    return this.#expandedIndex;
  }

  set expandedIndex(value) {
    const old = this.#expandedIndex;
    this.#expandedIndex = value;
    this.#tabindex.atFocusedItemIndex = value.at(-1) ?? -1;
    if (JSON.stringify(old) !== JSON.stringify(value)) {
      this.requestUpdate('expandedIndex', old);
      this.collapseAll().then(async () => {
        for (const i of this.expandedIndex) {
          await this.expand(i);
        }
      });
    }
  }

  #logger = new Logger(this);

  // actually is read in #init, by the `||=` operator
  // eslint-disable-next-line no-unused-private-class-members
  #initialized = false;

  #mo = new MutationObserver(() => this.#init());

  #tabindex = RovingTabindexController.of(this, {
    getItems: () => this.headers,
  });

  #expandedIndex: number[] = [];

  protected expandedSets: Set<number> = new Set<number>();

  get #activeHeader() {
    const { headers } = this;
    const index = headers.findIndex(header => header.matches(':focus,:focus-within'));
    return index > -1 ? headers.at(index) : undefined;
  }

  get headers(): PfAccordionHeader[] {
    return this.#allHeaders();
  }

  get panels(): PfAccordionPanel[] {
    return this.#allPanels();
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.#mo.observe(this, { childList: true });
    this.#init();
  }

  render(): TemplateResult<1> {
    return html`
      <slot></slot>
    `;
  }

  async firstUpdated(): Promise<void> {
    let lastExpandedIndex: number;
    const { headers, single } = this;
    const lastExpanded = headers.filter(x => x.hasAttribute('expanded')).pop();
    if (lastExpanded) {
      lastExpandedIndex = headers.indexOf(lastExpanded);
    }
    headers.forEach((header, index) => {
      if (header.expanded && (!single || index === lastExpandedIndex)) {
        this.#expandHeader(header, index);
        const panel = this.#panelForHeader(header);
        if (panel) {
          this.#expandPanel(panel);
        }
      }
    });
  }

  protected override async getUpdateComplete(): Promise<boolean> {
    const c = await super.getUpdateComplete();
    const results = await Promise.all([
      ...this.#allHeaders().map(x => x.updateComplete),
      ...this.#allPanels().map(x => x.updateComplete),
    ]);
    return c && results.every(Boolean);
  }

  @observes('large')
  protected largeChanged(): void {
    for (const el of [...this.headers, ...this.panels]) {
      el.toggleAttribute('large', this.large);
    }
  }

  /**
   * Initialize the accordion by connecting headers and panels
   * with aria controls and labels; set up the default disclosure
   * state if not set by the author; and check the URL for default
   * open
   */
  async #init() {
    this.#initialized ||= !!await this.updateComplete;
    this.updateAccessibility();
  }

  @listen('focusin')
  protected updateActiveHeader(): void {
    if (this.#activeHeader
        && this.#activeHeader !== this.headers.at(this.#tabindex.atFocusedItemIndex)) {
      this.#tabindex.atFocusedItemIndex = this.headers.indexOf(this.#activeHeader);
    }
  }

  #panelForHeader(header: PfAccordionHeader) {
    const next = header.nextElementSibling;
    if (!(next instanceof PfAccordionPanel)) {
      return void this.#logger.error('Sibling element to a header needs to be a panel');
    } else {
      return next;
    }
  }

  #expandHeader(header: PfAccordionHeader, index = this.#getIndex(header)) {
    // If this index is not already listed in the expandedSets array, add it
    this.expandedSets.add(index);
    this.#expandedIndex = [...this.expandedSets as Set<number>];
    header.expanded = true;
  }

  #expandPanel(panel: PfAccordionPanel) {
    panel.expanded = true;
    panel.hidden = false;
  }

  async #collapseHeader(header: PfAccordionHeader, index = this.#getIndex(header)) {
    if (!this.expandedSets) {
      await this.updateComplete;
    }
    this.expandedSets.delete(index);
    header.expanded = false;
    await header.updateComplete;
  }

  async #collapsePanel(panel: PfAccordionPanel) {
    await panel.updateComplete;
    if (!panel.expanded) {
      return;
    }

    panel.expanded = false;
    panel.hidden = true;
  }

  @listen('change')
  protected onChange(event: PfAccordionHeaderChangeEvent): void {
    if (event instanceof PfAccordionHeaderChangeEvent && event.accordion === this) {
      const index = this.#getIndex(event.target);
      if (event.expanded) {
        this.expand(index);
      } else {
        this.collapse(index);
      }
      event.stopPropagation();
    }
  }

  #allHeaders(accordion: PfAccordion = this): PfAccordionHeader[] {
    return Array.from(accordion.children ?? []).filter((x): x is PfAccordionHeader =>
      x instanceof PfAccordionHeader);
  }

  #allPanels(accordion: PfAccordion = this): PfAccordionPanel[] {
    return Array.from(accordion.children ?? []).filter((x): x is PfAccordionPanel =>
      x instanceof PfAccordionPanel);
  }

  #getIndex(el: Element | null) {
    if (el instanceof PfAccordionHeader) {
      return this.headers.findIndex(header => header.id === el.id);
    }

    if (el instanceof PfAccordionPanel) {
      return this.panels.findIndex(panel => panel.id === el.id);
    }

    this.#logger.warn('The #getIndex method expects to receive a header or panel element.');
    return -1;
  }

  public updateAccessibility(): void {
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
   * Accepts a 0-based index value (integer) for the set of accordion items to expand.
   * Accepts an optional parent accordion to search for headers and panels.
   * @param index index (0-based) of the panel to expand
   */
  public async expand(index: number): Promise<void> {
    if (index === -1) {
      return;
    }

    // Get all the headers and capture the item by index value
    if (this.single) {
      await Promise.all([
        ...this.headers.map((header, index) => header.expanded && this.collapse(index)),
      ]);
    }

    const header = this.headers[index];
    if (!header) {
      return;
    }

    const panel = this.#panelForHeader(header);
    if (!panel) {
      return;
    }

    // If the header and panel exist, open both
    this.#expandHeader(header, index);
    this.#expandPanel(panel);

    this.dispatchEvent(new PfAccordionExpandEvent(header, panel));

    await this.updateComplete;
  }

  /**
   * Accepts a 0-based index value (integer) for the set of accordion items to collapse.
   * @param index index (0-based) of the panel to collapse
   */
  public async collapse(index: number): Promise<void> {
    const header = this.headers.at(index);
    const panel = this.panels.at(index);

    if (!header || !panel) {
      return;
    }

    this.#collapseHeader(header);
    this.#collapsePanel(panel);

    this.dispatchEvent(new PfAccordionCollapseEvent(header, panel));
    await this.updateComplete;
  }

  /**
   * Accepts a 0-based index value (integer) for the set of accordion items to expand or collapse.
   * @param index index (0-based) of the panel to toggle
   */
  public async toggle(index: number): Promise<void> {
    const { headers } = this;
    const header = headers[index];

    if (!header.expanded) {
      await this.expand(index);
    } else {
      await this.collapse(index);
    }
  }

  /**
   * Expands all accordion items.
   */
  public async expandAll(): Promise<void> {
    this.headers.forEach(header => this.#expandHeader(header));
    this.panels.forEach(panel => this.#expandPanel(panel));
    await this.updateComplete;
  }


  /**
   * Collapses all accordion items.
   */
  public async collapseAll(): Promise<void> {
    this.headers.forEach(header => this.#collapseHeader(header));
    this.panels.forEach(panel => this.#collapsePanel(panel));
    await this.updateComplete;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-accordion': PfAccordion;
  }
}
