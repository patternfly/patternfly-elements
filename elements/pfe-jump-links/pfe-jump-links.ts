import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { ScrollSpyController } from '@patternfly/pfe-core/controllers/scroll-spy-controller.js';
import { RovingTabindexController } from '../../core/pfe-core/controllers/roving-tabindex-controller.js';
import type { FocusableElement, FocusableElements } from '../../core/pfe-core/controllers/roving-tabindex-controller.js';

import './pfe-jump-links-item.js';
import '@patternfly/pfe-icon';

import style from './pfe-jump-links.scss';

/**
 * **Jump links** allow users to navigate to sections within a page.
 * @fires toggle - when the `expanded` disclosure widget is toggled
 * @slot - Place pfe-jump-links-items here
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
@customElement('pfe-jump-links')
export class PfeJumpLinks extends LitElement {
  static readonly styles = [style];

  @property({ reflect: true, type: Boolean }) expandable = false;

  @property({ reflect: true, type: Boolean }) expanded = false;

  @property({ reflect: true, type: Boolean }) vertical = false;

  @property({ reflect: true, type: Boolean }) centered = false;

  @property({ type: Number }) offset = 0;

  @property() label?: string;

  #init = false;
  #rovingTabindexController = new RovingTabindexController(this);

  #spy = new ScrollSpyController(this, {
    rootMargin: `${this.offset}px 0px 0px 0px`,
    tagNames: ['pfe-jump-links-item'],
  });

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener('select', this.#onSelect);
    this.addEventListener('focus', this.#onFocus);
  }

  override updated(changed: Map<string, unknown>) {
    if (changed.has('offset')) {
      this.#spy.rootMargin = `${this.offset ?? 0}px 0px 0px 0px`;
    }
  }

  #initLinks() {
    const items = [...this.querySelectorAll('pfe-jump-links-item')];
    const links = items.map(item=>item.shadowRoot?.querySelector('a') as FocusableElement);
    this.#rovingTabindexController.initItems(links);
  }

  render() {
    return html`
      <nav id="container">${this.expandable ? html`
        <details ?open="${this.expanded}" @toggle="${this.#onToggle}">
          <summary>
            <pfe-icon icon="chevron-right"></pfe-icon>
            <span id="label">${this.label}</span>
          </summary>
          <slot role="listbox"></slot>
        </details>` : html`
        <span id="label">${this.label}</span>
        <slot role="listbox"></slot>`}
      </nav>
    `;
  }

  #onFocus() {
    if (!this.#init) {
      this.#initLinks();
      this.#init = true;
    } else {
      this.removeEventListener('focus', this.#onFocus);
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
    'pfe-jump-links': PfeJumpLinks;
  }
}
