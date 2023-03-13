import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';

import { ScrollSpyController } from '@patternfly/pfe-core/controllers/scroll-spy-controller.js';
import { RovingTabindexController } from '@patternfly/pfe-core/controllers/roving-tabindex-controller.js';

import '@patternfly/elements/pf-icon/pf-icon.js';

import style from './pf-jump-links.css';

/**
 * Jump links allow users to navigate to sections within a page.
 *
 * @fires toggle - when the `expanded` disclosure widget is toggled
 * @slot - Place pf-jump-links-items here
 *
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
 *
 * @cssprop --pf-c-jump-links__toggle--MarginTop -- padding around the expandable jump links disclosure widget.
 * @cssprop --pf-c-jump-links__toggle--MarginBottom
 * @cssprop --pf-c-jump-links__toggle--MarginBottom--base
 * @cssprop --pf-c-jump-links__toggle--MarginLeft
 * @cssprop --pf-c-jump-links__toggle-text--Color
 * @cssprop --pf-c-button--PaddingTop -- padding around the expandable jump links disclosure widget.
 * @cssprop --pf-c-button--PaddingRight
 * @cssprop --pf-c-button--PaddingBottom
 * @cssprop --pf-c-button--PaddingLeft
 *
 * @cssprop --pf-c-jump-links__toggle-icon--Rotate
 * @cssprop --pf-c-jump-links__toggle-icon--Transition
 * @cssprop --pf-c-jump-links__toggle-text--MarginLeft
 *
 * @cssprop --pf-c-jump-links--m-expanded__toggle--MarginBottom
 * @cssprop --pf-c-jump-links--m-expanded__toggle-icon--Rotate
 * @cssprop --pf-c-jump-links--m-expanded__toggle-icon--Color
 *
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

  #init = false;

  #rovingTabindexController = new RovingTabindexController(this);

  #spy = new ScrollSpyController(this, {
    rootMargin: `${this.offset}px 0px 0px 0px`,
    tagNames: ['pf-jump-links-item'],
  });

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener('select', this.#onSelect);
  }

  override updated(changed: Map<string, unknown>) {
    if (changed.has('offset')) {
      this.#spy.rootMargin = `${this.offset ?? 0}px 0px 0px 0px`;
    }
  }

  render() {
    return html`
      <nav id="container" @slotchange="${this.#updateItems}">${this.expandable ? html`
        <details ?open="${this.expanded}" @toggle="${this.#onToggle}">
          <summary>
            <pf-icon icon="chevron-right"></pf-icon>
            <span id="label">${this.label}</span>
          </summary>
          <slot role="listbox" @slotchange="${this.#updateItems}"></slot>
        </details>` : html`
        <span id="label">${this.label}</span>
        <slot role="listbox" @slotchange="${this.#updateItems}"></slot>`}
      </nav>
    `;
  }

  #updateItems() {
    const items = Array.from(this.querySelectorAll(':is(pf-jump-links-item, pf-jump-links-list)'))
      .flatMap(i => [
        ...i.shadowRoot?.querySelectorAll('a') ?? [],
        ...i.querySelectorAll('a') ?? [],
      ]);
    if (this.#init) {
      this.#rovingTabindexController.updateItems(items);
    } else {
      this.#rovingTabindexController.initItems(items);
      this.#init = true;
    }
  }

  async #onSelect(event: Event) {
    this.#spy.setActive(event.target);
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
