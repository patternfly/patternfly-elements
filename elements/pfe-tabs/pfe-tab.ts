import { LitElement, html } from 'lit';
import { customElement, property, query, queryAssignedElements, state } from 'lit/decorators.js';

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

  @query('button') _button!: HTMLButtonElement;

  @queryAssignedElements({ slot: 'icon', flatten: true }) _icons!: Array<HTMLElement>;

  @property({ reflect: true, type: Boolean }) disabled = false;

  @property({ reflect: true }) box: 'light' | 'dark' | null = null;

  @property({ reflect: true, type: Boolean }) vertical = false;

  @state() _hasIcons = false;

  @observed
  @property({ reflect: true, attribute: 'aria-selected' }) selected: 'true' | 'false' = 'false';

  async connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this._clickHandler);
    this.id ||= getRandomId('pfe-tab');
    await this.updateComplete;
    this.#updateAccessibility();
    this._hasIcons = this._icons.length === 0;
  }

  render() {
    return html`
      <button part="button" role="tab">
        <span part="icon" ?hidden="${this._hasIcons}">
          <slot name="icon"></slot>
        </span>
        <span part="text">
          <slot></slot>
        </span>
      </button>
    `;
  }

  button() {
    return this._button;
  }

  setAriaControls(id: string) {
    this._button.setAttribute('aria-controls', id);
  }

  /**
   * When selected property changes, check the new value, if true
   * and not disabled, set tabIndex to 0. Otherwise set to -1
   * @param oldVal {string} - Boolean value in string form
   * @param newVal {string} - Boolean value in string form
   * @returns {void}
   */
  @bound
  protected _selectedChanged(oldVal?: 'false' | 'true', newVal?: 'false' | 'true'): void {
    if (newVal === oldVal) {
      return;
    }
    if (newVal === 'true' && !this.disabled) {
      this.removeAttribute('tabindex');
    } else {
      this.tabIndex = -1;
    }
  }

  #open() {
    this.selected = 'true';
    this.dispatchEvent(new PfeTabExpandEvent(this.selected, this));
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
    this.setAttribute('role', 'tab');
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
