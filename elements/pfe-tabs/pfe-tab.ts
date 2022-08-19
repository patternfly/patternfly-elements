import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
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

  @property({ reflect: true, type: Boolean }) disabled = false;

  @state()
  private _box = false;

  @state()
  private _vertical = false;

  @observed
  @property({ reflect: true, attribute: 'aria-selected' }) selected: 'true' | 'false' = 'false';

  connectedCallback() {
    super.connectedCallback();
    this.id ||= getRandomId('pfe-tab');
    this.addEventListener('click', this._clickHandler);
    this.#updateAccessibility();
    this.#getParentVariant();
  }

  render() {
    const classes = { box: this._box, vertical: this._vertical };
    return html`
    <div id="container" class="${classMap(classes)}" part="container">
      <span part="text">
        <slot></slot>
      </span>
    <div>
    `;
  }

  #open() {
    this.selected = 'true';
    this.dispatchEvent(new PfeTabExpandEvent(this.selected, this));
  }

  setAriaControls(id: string) {
    this.setAttribute('aria-controls', id);
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
    this.setAttribute('role', 'tab');
    if (this.disabled) {
      this.setAttribute('aria-disabled', this.disabled.toString());
    }
  }

  #getParentVariant() {
    this._box = this.parentElement?.hasAttribute('box') ?? true;
    this._vertical = this.parentElement?.hasAttribute('vertical') ?? true;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-tab': PfeTab;
  }
}
