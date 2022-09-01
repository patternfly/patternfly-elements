import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { ComposedEvent } from '@patternfly/pfe-core';
import { bound, observed } from '@patternfly/pfe-core/decorators.js';
import { getRandomId } from '@patternfly/pfe-core/functions/random.js';
import { Logger } from '@patternfly/pfe-core/controllers/logger.js';

import style from './pfe-tab.scss';


export class PfeTabExpandEvent extends ComposedEvent {
  constructor(
    public selected: 'true' | 'false',
    public tab: PfeTab,
  ) {
    super('tab-expand');
  }
}

/**
 * @slot - Add the heading for your tab here.
 */
@customElement('pfe-tab')
export class PfeTab extends LitElement {
  static readonly version = '{{version}}';

  static readonly styles = [style];

  #logger = new Logger(this);

  @query('button') _button: HTMLButtonElement;

  @property({ reflect: true, type: Boolean }) disabled = false;

  @property({ reflect: true }) box: 'light' | 'dark' | null = null;

  @property({ reflect: true, type: Boolean }) vertical = false;

  @observed
  @property({ reflect: true, attribute: 'aria-selected' }) selected: 'true' | 'false' = 'false';

  async connectedCallback() {
    super.connectedCallback();
    this.id ||= getRandomId('pfe-tab');
    this.addEventListener('click', this._clickHandler);
    this.#updateAccessibility();
    await this.updateComplete;
  }

  render() {
    const classes = { 'box-light': this._box === 'light', 'box-dark': this._box === 'dark', 'vertical': this._vertical };
    return html`
    <button class="${classMap(classes)}" part="button" ?disabled="${this.disabled}">
      <span part="text">
        <slot></slot>
      </span>
    </button>
    `;
  }

  #open() {
    this.selected = 'true';
    this.dispatchEvent(new PfeTabExpandEvent(this.selected, this));
  }

  setAriaControls(id: string) {
    this._button.setAttribute('aria-controls', id);
  }

  /**
   * When selected property changes, check the new value, if true
   * run the `#open()` method, if false run the `#close()` method.
   * @param oldVal {string} - Boolean value in string form
   * @param newVal {string} - Boolean value in string form
   * @returns {void}
   */
  @bound
  protected _selectedChanged(oldVal?: 'false' | 'true', newVal?: 'false' | 'true'): void {
    if (newVal === oldVal) {
      return;
    }
    if (newVal) {
      if (this.selected === 'true' && !this.disabled) {
        this.tabIndex = 0;
      } else {
        this.tabIndex = -1;
      }
    }
  }

  @bound
  private _clickHandler(event: MouseEvent) {
    event.preventDefault();
    if (this.disabled || this.hasAttribute('aria-disabled')) {
      return;
    }
    this.#open();
  }

  async #updateAccessibility() {
    await this.updateComplete;
    this._button.setAttribute('role', 'tab');
    if (this.disabled) {
      this.setAttribute('aria-disabled', this.disabled.toString());
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-tab': PfeTab;
  }
}
