import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { ifDefined } from 'lit/directives/if-defined.js';

import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';

import style from './pfe-jump-links-item.scss';

import { observed } from '@patternfly/pfe-core/decorators/observed.js';

/**
 * @cssprop --pf-c-jump-links__link--PaddingTop -- padding around the link
 * @cssprop --pf-c-jump-links__link--PaddingRight
 * @cssprop --pf-c-jump-links__link--PaddingBottom
 * @cssprop --pf-c-jump-links__link--PaddingLeft
 * @cssprop --pf-c-jump-links__link--OutlineOffset
 * @cssprop --pf-c-jump-links__link-text--Color
 */
@customElement('pfe-jump-links-item')
export class PfeJumpLinksItem extends LitElement {
  static readonly styles = [style];

  @observed('activeChanged')
  @property({ type: Boolean, reflect: true }) active = false;

  @property({ reflect: true }) href?: string;

  #internals = new InternalsController(this, {
    role: 'listitem'
  });

  override connectedCallback() {
    super.connectedCallback();
    this.activeChanged();
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
