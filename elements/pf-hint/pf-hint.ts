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
          <!-- summary: Actions menu (e.g., kebab dropdown) -->
          <slot name="actions"></slot>
        </div>
        <div id="title"
             part="title"
             class="pf-c-hint__title"
             ?hidden=${this.#slots.isEmpty('title')}>
          <!-- summary: Optional title for the hint -->
          <slot name="title"></slot>
        </div>
        <div id="body"
             part="body"
             class="pf-c-hint__body">
          <!-- summary: Body content of the hint. Main informational text. -->
          <slot></slot>
        </div>
        <div id="footer"
             part="footer"
             class="pf-c-hint__footer"
             ?hidden=${this.#slots.isEmpty('footer')}>
          <!-- summary: Optional footer content, typically containing action links or buttons -->
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
