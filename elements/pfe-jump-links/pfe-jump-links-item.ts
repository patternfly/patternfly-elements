import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { ifDefined } from 'lit/directives/if-defined.js';

import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';

import style from './pfe-jump-links-item.scss';

import { observed } from '@patternfly/pfe-core/decorators/observed.js';

/**
 * **Jump links** allow users to navigate to sections within a page.
 */
@customElement('pfe-jump-links-item')
export class PfeJumpLinksItem extends LitElement {
  static readonly styles = [style];

  #internals = new InternalsController(this);

  @observed('activeChanged')
  @property({ type: Boolean, reflect: true }) active = false;

  @property({ reflect: true }) href?: string;

  override connectedCallback() {
    super.connectedCallback();
    this.activeChanged();
    this.#internals.role = 'listitem';
  }

  render() {
    return html`
      <a href="${ifDefined(this.href)}" @click="${this.#onClick}">
        <slot></slot>
      </a>
      <slot name="subsection"></slot>
    `;
  }

  private activeChanged() {
    this.#internals.ariaCurrent = this.active ? 'location' : null;
  }

  #onClick() {
    this.dispatchEvent(new Event('select', { bubbles: true }));
  }
}


declare global {
  interface HTMLElementTagNameMap {
    'pfe-jump-links-item': PfeJumpLinksItem;
  }
}
