import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';

import { ScrollSpyController } from '@patternfly/pfe-core/controllers/scroll-spy-controller.js';
import { RovingTabindexController } from '@patternfly/pfe-core/controllers/roving-tabindex-controller.js';

import { PfJumpLinksItem } from './pf-jump-links-item.js';

import '@patternfly/elements/pf-icon/pf-icon.js';

import style from './pf-jump-links.css';

/**
 * **Jump links** allow users to navigate to sections within a page.
 * @fires toggle - when the `expanded` disclosure widget is toggled
 * @slot - Place pf-jump-links-items here
 * @cssprop --pf-c-jump-links__list--Display
 * @cssprop --pf-c-jump-links__list--FlexDirection
 * @cssprop --pf-c-jump-links__list--PaddingTop -- padding around the list of links
 * @cssprop --pf-c-jump-links__list--PaddingRight
 * @cssprop --pf-c-jump-links__list--PaddingBottom
 * @cssprop --pf-c-jump-links__list--PaddingLeft
 * @cssprop --pf-c-jump-links__list--Visibility
 * @cssprop --pf-c-jump-links__list--before--BorderColor
 * @cssprop --pf-c-jump-links__list--before--BorderTopWidth
 * @cssprop --pf-c-jump-links__list--before--BorderRightWidth
 * @cssprop --pf-c-jump-links__list--before--BorderBottomWidth
 * @cssprop --pf-c-jump-links__list--before--BorderLeftWidth
 * @cssprop --pf-c-jump-links__toggle--MarginBottom--base
 * @cssprop --pf-c-jump-links__toggle--MarginTop -- padding around the expandable jump links disclosure widget.
 * @cssprop --pf-c-jump-links__toggle--MarginBottom
 * @cssprop --pf-c-jump-links__toggle--MarginBottom--base
 * @cssprop --pf-c-jump-links__toggle--MarginLeft
 * @cssprop --pf-c-jump-links__toggle-text--Color
 * @cssprop --pf-c-button--PaddingTop -- padding around the expandable jump links disclosure widget.
 * @cssprop --pf-c-button--PaddingRight
 * @cssprop --pf-c-button--PaddingBottom
 * @cssprop --pf-c-button--PaddingLeft
 * @cssprop --pf-c-jump-links__toggle-icon--Rotate
 * @cssprop --pf-c-jump-links__toggle-icon--Transition
 * @cssprop --pf-c-jump-links__toggle-text--MarginLeft
 * @cssprop --pf-c-jump-links--m-expanded__toggle--MarginBottom
 * @cssprop --pf-c-jump-links--m-expanded__toggle-icon--Rotate
 * @cssprop --pf-c-jump-links--m-expanded__toggle-icon--Color
 * @cssprop --pf-c-jump-links--m-vertical__list--PaddingTop
 * @cssprop --pf-c-jump-links--m-vertical__list--PaddingRight
 * @cssprop --pf-c-jump-links--m-vertical__list--PaddingBottom
 * @cssprop --pf-c-jump-links--m-vertical__list--PaddingLeft
 * @cssprop --pf-c-jump-links--m-vertical__list--before--BorderTopWidth
 * @cssprop --pf-c-jump-links--m-vertical__list--before--BorderLeftWidth
 * @cssprop --pf-c-jump-links--m-vertical__item--m-current__link--before--BorderTopWidth
 * @cssprop --pf-c-jump-links--m-vertical__item--m-current__link--before--BorderLeftWidth
 * @cssprop --pf-c-jump-links--m-vertical__list--FlexDirection
 */
@customElement('pf-jump-links')
export class PfJumpLinks extends LitElement {
  static readonly styles = [style];

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

  /** Label to add to nav element. */
  @property() label?: string;

  #kids = this.querySelectorAll<LitElement>(':is(pf-jump-links-item, pf-jump-links-list)');

  #tabindex?: RovingTabindexController<HTMLAnchorElement>;

  #spy = new ScrollSpyController(this, {
    rootMargin: `${this.offset}px 0px 0px 0px`,
    tagNames: ['pf-jump-links-item'],
  });

  protected override async getUpdateComplete(): Promise<boolean> {
    const here = await super.getUpdateComplete();
    const ps = await Promise.all(Array.from(this.#kids, x => x.updateComplete));
    return here && ps.every(x => !!x);
  }

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener('slotchange', this.#updateItems);
    this.addEventListener('select', this.#onSelect);
  }

  override firstUpdated() {
    this.#tabindex = new RovingTabindexController<HTMLAnchorElement>(this, {
      getItems: () => {
        const items = Array.from(this.#kids)
            .flatMap(i => [
              ...i.shadowRoot?.querySelectorAll('a') ?? [],
              ...i.querySelectorAll('a') ?? [],
            ]);
        return items;
      },
    });
    const active = this.querySelector<PfJumpLinksItem>('pf-jump-links-item[active]');
    if (active) {
      this.#setActiveItem(active);
    }
  }

  override updated(changed: Map<string, unknown>) {
    if (changed.has('offset')) {
      this.#spy.rootMargin = `${this.offset ?? 0}px 0px 0px 0px`;
    }
  }

  render() {
    return html`
      <nav id="container">${this.expandable ? html`
        <details ?open="${this.expanded}" @toggle="${this.#onToggle}">
          <summary>
            <pf-icon icon="chevron-right"></pf-icon>
            <span id="label">${this.label}</span>
          </summary>
          <div role="listbox" aria-labelledby="label">
            <slot></slot>
          </div>
        </details>` : html`
        <span id="label">${this.label}</span>
        <div role="listbox" aria-labelledby="label">
          <slot></slot>
        </div>`}
      </nav>
    `;
  }

  #updateItems() {
    this.#tabindex?.updateItems();
  }

  #onSelect(event: Event) {
    if (event.target instanceof PfJumpLinksItem) {
      this.#setActiveItem(event.target);
    }
  }

  #setActiveItem(item: PfJumpLinksItem) {
    this.#tabindex?.setActiveItem(item.shadowRoot?.querySelector('a') ?? undefined);
    this.#spy.setActive(item);
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
    'pf-jump-links': PfJumpLinks;
  }
}
