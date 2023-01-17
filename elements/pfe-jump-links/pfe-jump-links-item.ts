import { html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

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

  @query('a') link!:HTMLAnchorElement;
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
      <a href="${ifDefined(this.href)}" @focus="${this.#onFocus}" @click="${this.#onClick}">
        <slot></slot>
      </a>
      <slot name="subsection"></slot>
    `;
  }

  focus(): void {
    this.link.focus();
  }

  private activeChanged() {
    this.#internals.ariaCurrent = this.active ? 'location' : null;
  }

  #onClick() {
    this.dispatchEvent(new Event('select', { bubbles: true }));
  }

  #onFocus() {
    this.dispatchEvent(new Event('focus', { bubbles: true }));
  }
}


declare global {
  interface HTMLElementTagNameMap {
    'pfe-jump-links-item': PfeJumpLinksItem;
  }
}
