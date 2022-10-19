import { LitElement, html } from 'lit';
import { property, query, queryAssignedElements, state } from 'lit/decorators.js';

import { Logger } from '@patternfly/pfe-core/controllers/logger.js';
import { ComposedEvent } from '@patternfly/pfe-core';
import { bound, observed } from '@patternfly/pfe-core/decorators.js';

import style from './BaseTab.scss';

export class TabExpandEvent extends ComposedEvent {
  constructor(
    public active: boolean,
    public tab: BaseTab,
  ) {
    super('expand');
  }
}

export abstract class BaseTab extends LitElement {
  static readonly styles = [style];

  @query('button') _button!: HTMLButtonElement;

  @queryAssignedElements({ slot: 'icon', flatten: true }) _icons!: Array<HTMLElement>;

  @observed
  @property({ reflect: true, type: Boolean }) active = false;

  @observed
  @property({ reflect: true, type: Boolean }) disabled = false;

  @state() _hasIcons = false;

  #logger = new Logger(this);

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this.#clickHandler);
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

  #clickHandler() {
    if (!this.disabled && this.ariaDisabled !== 'true') {
      this.active = true;
    }
  }

  #updateAccessibility(): void {
    this.setAttribute('role', 'tab');
  }

  @bound
  _activeChanged(oldVal: boolean, newVal: boolean) {
    if (oldVal === newVal) {
      return;
    }
    if (newVal && !this.disabled) {
      this.removeAttribute('tabindex');
      this.ariaSelected = 'true';
    } else {
      this.tabIndex = -1;
      this.ariaSelected = 'false';
    }
    this.dispatchEvent(new TabExpandEvent(newVal, this));
  }

  @bound
  _disabledChanged(oldVal: boolean, newVal: boolean) {
    if (oldVal === newVal) {
      return;
    }
    // if a tab is disabled, then it is also aria-disabled
    // if a tab is removed from disabled its not necessarily
    // not still aria-disabled so we don't remove the aria-disabled
    if (newVal === true) {
      this.ariaDisabled = 'true';
    }
  }

  setAriaControls(id: string): void {
    this.setAttribute('aria-controls', id);
  }

  focusButton(): void {
    this._button.focus();
  }
}
