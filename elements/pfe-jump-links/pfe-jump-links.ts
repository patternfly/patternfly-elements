import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { ScrollSpyController } from '@patternfly/pfe-core/controllers/scroll-spy-controller.js';

import './pfe-jump-links-item.js';
import '@patternfly/pfe-icon';

import style from './pfe-jump-links.scss';

/**
 * **Jump links** allow users to navigate to sections within a page.
 * @fires toggle - when the `expanded` disclosure widget is toggled
 * @slot - Place pfe-jump-links-items here
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

  #spy = new ScrollSpyController(this, {
    rootMargin: `${this.offset}px 0px 0px 0px`,
    tagNames: ['pfe-jump-links-item'],
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
