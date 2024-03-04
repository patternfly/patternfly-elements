import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { state } from 'lit/decorators/state.js';
import { consume } from '@lit/context';

import { getRandomId } from '@patternfly/pfe-core/functions/random.js';
import { type PfTabsContext, context } from './context.js';

import styles from './pf-tab-panel.css';

/**
 * @slot - Tab panel content
 *
 * @cssprop {<color>} --pf-c-tab-content--m-light-300 {@default `#f0f0f0`}
 *
 * @csspart container - container for the panel content
 */
@customElement('pf-tab-panel')
export class PfTabPanel extends LitElement {
  static readonly styles = [styles];

  #internals = this.attachInternals();

  @consume({ context, subscribe: true })
  @state() private ctx?: PfTabsContext;

  render() {
    return html`
      <slot></slot>
    `;
  }

  override connectedCallback() {
    super.connectedCallback();
    this.id ||= getRandomId('pf-tab-panel');
    this.hidden ??= true;
    this.#internals.role = 'tabpanel';

    /*
     To make it easy for screen reader users to navigate from a tab
     to the beginning of content in the active tabpanel, the tabpanel
     element has tabindex="0" to include the panel in the page Tab sequence.
     It is recommended that all tabpanel elements in a tab set are focusable
     if there are any panels in the set that contain content where the first
     element in the panel is not focusable.
     https://www.w3.org/WAI/ARIA/apg/example-index/tabs/tabs-automatic
    */
    this.tabIndex = 0;
  }

  override willUpdate() {
    const { box, vertical } = this.ctx ?? {};
    this.toggleAttribute('vertical', vertical);
    if (box) {
      this.setAttribute('box', box);
    } else {
      this.removeAttribute('box');
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-tab-panel': PfTabPanel;
  }
}
