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

  @property({ reflect: true }) href?: string;

  @observed('activeChanged')
  @property({ type: Boolean, reflect: true }) active = false;

  private activeChanged() {
    this.#internals.ariaCurrent = this.active ? 'location' : null;
  }

  override connectedCallback() {
    super.connectedCallback();
    this.#internals.role = 'listitem';
  }

  #internals = new InternalsController(this);

  render() {
    return html`
      <a href="${ifDefined(this.href)}">
        <slot></slot>
      </a>
      <slot name="subsection"></slot>
    `;
  }
}


declare global {
  interface HTMLElementTagNameMap {
    'pfe-jump-links-item': PfeJumpLinksItem;
  }
}
