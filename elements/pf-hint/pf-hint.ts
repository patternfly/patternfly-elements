import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { classMap } from 'lit/directives/class-map.js';

import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';

import styles from './pf-hint.css';

/**
 * A **hint** is in-app messaging that provides a one-step reminder, explanation,
 * or call to action for a page or modal. Hints provide information about an interaction
 * or prerequisite step that might not be immediately obvious to the user.
 *
 * @summary Provides inline contextual help or information to users
 * @alias Hint
 *
 * @slot - Body content of the hint
 * @slot title - Optional title for the hint
 * @slot footer - Optional footer content, typically containing action links or buttons
 * @slot actions - Optional actions menu (e.g., kebab menu)
 *
 * @csspart container - The hint container element
 * @csspart title - The title element
 * @csspart body - The body element
 * @csspart footer - The footer element
 * @csspart actions - The actions element
 */
@customElement('pf-hint')
export class PfHint extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  #slots = new SlotController(this, 'title', null, 'footer', 'actions');

  render(): TemplateResult<1> {
    const hasActions = !this.#slots.isEmpty('actions');

    return html`
      <div id="container"
           part="container"
           class=${classMap({
             'has-actions': hasActions,
           })}>
        <div id="actions"
             part="actions"
             class="pf-c-hint__actions"
             ?hidden=${this.#slots.isEmpty('actions')}>
          <slot name="actions"></slot>
        </div>
        <div id="title"
             part="title"
             class="pf-c-hint__title"
             ?hidden=${this.#slots.isEmpty('title')}>
          <slot name="title"></slot>
        </div>
        <div id="body"
             part="body"
             class="pf-c-hint__body">
          <slot></slot>
        </div>
        <div id="footer"
             part="footer"
             class="pf-c-hint__footer"
             ?hidden=${this.#slots.isEmpty('footer')}>
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-hint': PfHint;
  }
}
