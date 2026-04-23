import { html, LitElement, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';

import { ScrollSpyController } from '@patternfly/pfe-core/controllers/scroll-spy-controller.js';
import { RovingTabindexController } from '@patternfly/pfe-core/controllers/roving-tabindex-controller.js';

import { PfV5JumpLinksItem } from './pf-v5-jump-links-item.js';

import '@patternfly/elements/pf-v5-icon/pf-v5-icon.js';

import style from './pf-v5-jump-links.css';

/**
 * **Jump links** allow users to navigate to sections within a page.
 * @alias Jump Links
 * @fires toggle - when the `expanded` disclosure widget is toggled
 */
@customElement('pf-v5-jump-links')
export class PfV5JumpLinks extends LitElement {
  static readonly styles: CSSStyleSheet[] = [style];

  /** Whether the element features a disclosure widget around the nav items */
  @property({ reflect: true, type: Boolean }) expandable = false;

  /** Whether the expandable element's disclosure widget is expanded */
  @property({ reflect: true, type: Boolean }) expanded = false;

  /** Whether the layout of children is vertical or horizontal. */
  @property({ reflect: true, type: Boolean }) vertical = false;

  /** Whether to center children. */
  @property({ reflect: true, type: Boolean }) centered = false;

  /** Offset to add to the scroll position, potentially for a masthead which content scrolls under. */
  @property({ type: Number }) offset = 0;

  /** Label to add to nav element. Required for accessibility. */
  @property({ reflect: true }) label = 'Jump to section';

  #kids = this.querySelectorAll?.<LitElement>(':is(pf-v5-jump-links-item, pf-v5-jump-links-list)');

  get #items() {
    return Array.from(this.#kids ?? [])
        .flatMap(i => [
          ...i.shadowRoot?.querySelectorAll?.('a') ?? [],
          ...i.querySelectorAll?.('a') ?? [],
        ]);
  }

  #tabindex = RovingTabindexController.of<HTMLAnchorElement>(this, {
    getItems: () => this.#items,
  });

  #spy = new ScrollSpyController(this, {
    rootMargin: `${this.offset}px 0px 0px 0px`,
    tagNames: ['pf-v5-jump-links-item'],
  });

  protected override async getUpdateComplete(): Promise<boolean> {
    const here = await super.getUpdateComplete();
    const ps = await Promise.all(Array.from(this.#kids, x => x.updateComplete));
    return here && ps.every(x => !!x);
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('slotchange', this.#onSlotChange);
    this.addEventListener('select', this.#onSelect);
  }

  override firstUpdated(): void {
    const active = this.querySelector?.<PfV5JumpLinksItem>('pf-v5-jump-links-item[active]');
    if (active) {
      this.#setActiveItem(active);
    }
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('offset')) {
      this.#spy.rootMargin = `${this.offset ?? 0}px 0px 0px 0px`;
    }
  }

  render(): TemplateResult<1> {
    return html`
      <nav id="container" aria-labelledby="label">${this.expandable ? html`
        <details ?open="${this.expanded}" @toggle="${this.#onToggle}">
          <summary>
            <pf-v5-icon icon="chevron-right"></pf-v5-icon>
            <span part="label" id="label">${this.label}</span>
          </summary>
          <div role="listbox" aria-labelledby="label">
            <!-- Place pf-v5-jump-links-items here -->
            <slot></slot>
          </div>
        </details>` : html`
        <span id="label">${this.label}</span>
        <div role="listbox" aria-labelledby="label">
          <!-- Place pf-v5-jump-links-items here -->
          <slot></slot>
        </div>`}
      </nav>
    `;
  }

  #onSlotChange() {
    this.#tabindex.items = this.#items;
  }

  #onSelect(event: Event) {
    if (event.target instanceof PfV5JumpLinksItem) {
      this.#setActiveItem(event.target);
    }
  }

  #setActiveItem(item: PfV5JumpLinksItem) {
    const itemLink = item.shadowRoot?.querySelector?.('a') ?? null;
    if (itemLink) {
      this.#tabindex.atFocusedItemIndex = this.#tabindex.items.indexOf(itemLink);
      this.#spy.setActive(item);
    }
  }

  #onToggle(event: Event) {
    if (event.target instanceof HTMLDetailsElement) {
      this.expanded = event.target.open;
    }
    this.dispatchEvent(new Event('toggle'));
  }
}


declare global {
  interface HTMLElementTagNameMap {
    'pf-v5-jump-links': PfV5JumpLinks;
  }
}
