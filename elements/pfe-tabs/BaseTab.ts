import { LitElement, html } from 'lit';
import { property, query, queryAssignedElements, state } from 'lit/decorators.js';

import { ComposedEvent } from '@patternfly/pfe-core';
import { bound, observed } from '@patternfly/pfe-core/decorators.js';

import style from './BaseTab.scss';

export class TabExpandEvent extends ComposedEvent {
  constructor(
    public selected: 'true' | 'false',
    public tab: BaseTab,
  ) {
    super('tab-expand');
  }
}

export abstract class BaseTab extends LitElement {
  static readonly styles = [style];

  @query('button') _button!: HTMLButtonElement;

  @queryAssignedElements({ slot: 'icon', flatten: true }) _icons!: Array<HTMLElement>;

  @observed
  @property({ reflect: true, type: Boolean }) disabled = false;

  @property({ reflect: true, type: Boolean }) vertical = false;

  @state() _hasIcons = false;

  @observed
  @property({ reflect: true, attribute: 'aria-selected' }) selected: 'true' | 'false' = 'false';

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this._clickHandler);
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

  firstUpdated(): void {
    this.#updateAccessibility();
    this._hasIcons = this._icons.length === 0;
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

  @bound
  protected _disabledChanged(oldVal?: 'false' | 'true', newVal?: 'false' | 'true'): void {
    if (newVal === oldVal) {
      return;
    }
    this.#updateAccessibility();
  }

  @bound
  private _clickHandler(event: MouseEvent) {
    event.preventDefault();
    if (this.disabled || this.hasAttribute('aria-disabled')) {
      return;
    }
    this.open();
  }

  #updateAccessibility() {
    this.setAttribute('role', 'tab');
    if (this.disabled) {
      this.setAttribute('aria-disabled', this.disabled.toString());
    }
  }

  open() {
    this.selected = 'true';
    this.dispatchEvent(new TabExpandEvent(this.selected, this));
  }

  focusButton() {
    this._button.focus();
  }

  setAriaControls(id: string) {
    this.setAttribute('aria-controls', id);
  }
}
