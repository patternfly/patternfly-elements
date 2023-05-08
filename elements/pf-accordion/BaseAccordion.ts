import type { TemplateResult } from 'lit';

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators/property.js';

import { observed } from '@patternfly/pfe-core/decorators.js';

import { NumberListConverter, ComposedEvent } from '@patternfly/pfe-core';
import { Logger } from '@patternfly/pfe-core/controllers/logger.js';

import { AccordionHeaderChangeEvent, BaseAccordionHeader } from './BaseAccordionHeader.js';
import { BaseAccordionPanel } from './BaseAccordionPanel.js';

import style from './BaseAccordion.css';

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

  static isAccordion(target: EventTarget | null): target is BaseAccordion {
    return target instanceof BaseAccordion;
  }

  static isHeader(target: EventTarget | null): target is BaseAccordionHeader {
    return target instanceof BaseAccordionHeader;
  }

  static isPanel(target: EventTarget | null): target is BaseAccordionPanel {
    return target instanceof BaseAccordionPanel;
  }

  /**
   * Sets and reflects the currently expanded accordion 0-based indexes.
   * Use commas to separate multiple indexes.
   * ```html
   * <pf-accordion expanded-index="1,2">
   *   ...
   * </pf-accordion>
   * ```
   */
  @observed(async function expandedIndexChanged(this: BaseAccordion, oldVal: unknown, newVal: unknown) {
    if (oldVal && oldVal !== newVal) {
      await this.collapseAll();
      for (const i of this.expandedIndex) {
        await this.expand(i, this);
      }
    }
  })
  @property({
    attribute: 'expanded-index',
    converter: NumberListConverter
  }) expandedIndex: number[] = [];

  get headers() {
    return this.#allHeaders();
  }

  get panels() {
    return this.#allPanels();
  }

  protected expandedSets = new Set<number>();

  #logger = new Logger(this);

  #styles = getComputedStyle(this);

  #transitionDuration = this.#getAnimationDuration();

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
    this.#headerIndex.initItems(this.headers);
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
    // Event listener to the accordion header after the accordion has been initialized to add the roving tabindex
    this.addEventListener('focusin', this.#updateActiveHeader as EventListener);
    this.updateAccessibility();
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
    header.expanded = true;
  }

  async #expandPanel(panel: BaseAccordionPanel) {
    panel.expanded = true;
    panel.hidden = false;

    await panel.updateComplete;

    const rect = panel.getBoundingClientRect();

    this.#animate(panel, 0, rect.height);
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

    const rect = panel.getBoundingClientRect();

    panel.expanded = false;
    panel.hidden = true;

    this.#animate(panel, rect.height, 0);
    await panel.updateComplete;
  }

  #getAnimationDuration(): number {
    if ('computedStyleMap' in this) {
      // @ts-expect-error: https://caniuse.com/?search=computedStyleMap
      return this.computedStyleMap().get('transition-duration')?.to('ms').value;
    } else {
      const { transitionDuration } = this.#styles;

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

  async #animate(panel: BaseAccordionPanel, start: number, end: number) {
    if (panel) {
      const header = panel.previousElementSibling;

      const transitionDuration = this.#getAnimationDuration();
      if (transitionDuration) {
        this.#transitionDuration = transitionDuration;
      }

      const duration = this.#transitionDuration ?? 0;

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

  #onChange(event: AccordionHeaderChangeEvent) {
    if (this.classList.contains('animating')) {
      return;
    }

    const index = this.#getIndex(event.target as Element);

    if (event.expanded) {
      this.expand(index, event.accordion);
    } else {
      this.collapse(index);
    }
  }

  /**
   * @see https://www.w3.org/TR/wai-aria-practices/#accordion
   */
  async #onKeydown(evt: KeyboardEvent) {
    const currentHeader = evt.target as Element;

    if (!BaseAccordion.isHeader(currentHeader)) {
      return;
    }

    let newHeader: BaseAccordionHeader | undefined;

    switch (evt.key) {
      case 'ArrowDown':
        evt.preventDefault();
        newHeader = this.#nextHeader();
        break;
      case 'ArrowUp':
        evt.preventDefault();
        newHeader = this.#previousHeader();
        break;
      case 'Home':
        evt.preventDefault();
        newHeader = this.#firstHeader();
        break;
      case 'End':
        evt.preventDefault();
        newHeader = this.#lastHeader();
        break;
    }

    newHeader?.focus?.();
  }

  #allHeaders(accordion: BaseAccordion = this): BaseAccordionHeader[] {
    return Array.from(accordion.children).filter(BaseAccordion.isHeader);
  }

  #allPanels(accordion: BaseAccordion = this): BaseAccordionPanel[] {
    return Array.from(accordion.children).filter(BaseAccordion.isPanel);
  }

  #previousHeader() {
    const { headers } = this;
    const newIndex = headers.findIndex(header => header.matches(':focus,:focus-within')) - 1;
    return headers[(newIndex + headers.length) % headers.length];
  }

  #nextHeader() {
    const { headers } = this;
    const newIndex = headers.findIndex(header => header.matches(':focus,:focus-within')) + 1;
    return headers[newIndex % headers.length];
  }

  #firstHeader() {
    return this.headers.at(0);
  }

  #lastHeader() {
    return this.headers.at(-1);
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
    if (index === -1) {
      return;
    }

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
