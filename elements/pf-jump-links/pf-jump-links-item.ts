import { html, LitElement, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';

import { ifDefined } from 'lit/directives/if-defined.js';

import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';

import style from './pf-jump-links-item.css';

import { observes } from '@patternfly/pfe-core/decorators/observes.js';

/**
 * @cssprop --pf-c-jump-links__link--PaddingTop -- padding around the link
 * @cssprop --pf-c-jump-links__link--PaddingRight
 * @cssprop --pf-c-jump-links__link--PaddingBottom
 * @cssprop --pf-c-jump-links__link--PaddingLeft
 * @cssprop --pf-c-jump-links__link--OutlineOffset
 * @cssprop --pf-c-jump-links__link-text--Color
 */
@customElement('pf-jump-links-item')
export class PfJumpLinksItem extends LitElement {
  static readonly styles: CSSStyleSheet[] = [style];

  static override readonly shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  /** Whether this item is active. */
  @property({ type: Boolean, reflect: true }) active = false;

  /** hypertext reference for this link */
  @property({ reflect: true }) href?: string;

  #internals = InternalsController.of(this, { role: 'listitem' });

  render(): TemplateResult<1> {
    return html`
      <a href="${ifDefined(this.href)}"
         @focus="${this.#onFocus}"
         @click="${this.#onClick}">
        <slot></slot>
      </a>
      <slot name="subsection"></slot>
    `;
  }

  @observes('active')
  protected activeChanged(): void {
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
    'pf-jump-links-item': PfJumpLinksItem;
  }
}
