import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseJumpLinks } from './BaseJumpLinks.js';

import './pfe-jump-links-item.js';
import '@patternfly/pfe-icon';

import style from './pfe-jump-links.scss';

/**
 * **Jump links** allow users to navigate to sections within a page.
 */
@customElement('pfe-jump-links')
export class PfeJumpLinks extends BaseJumpLinks {
  static readonly styles = [style];

  @property({ reflect: true, type: Boolean }) expandable = false;

  @property({ reflect: true, type: Boolean }) expanded = false;

  @property() label?: string;

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

  #onToggle(event: Event) {
    if (event.target instanceof HTMLDetailsElement) {
      this.expanded = event.target.open;
    }
  }
}


declare global {
  interface HTMLElementTagNameMap {
    'pfe-jump-links': PfeJumpLinks;
  }
}
