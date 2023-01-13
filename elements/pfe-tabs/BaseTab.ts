import type { PropertyValues } from 'lit';

import { LitElement, html } from 'lit';
import { query, queryAssignedElements } from 'lit/decorators.js';

import { ComposedEvent } from '@patternfly/pfe-core';

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

  static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  @query('button') _button!: HTMLButtonElement;

  @queryAssignedElements({ slot: 'icon', flatten: true })
  private icons!: Array<HTMLElement>;

  /** `active` should be observed, and true when the tab is selected */
  abstract active: boolean;

  /** `active` should be observed, and true when the tab is disabled */
  abstract disabled: boolean;

  #internals = this.attachInternals();

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this.#clickHandler);
  }

  render() {
    return html`
      <button part="button" role="tab">
        <slot name="icon"
              part="icon"
              ?hidden="${!this.icons.length}"
              @slotchange="${() => this.requestUpdate()}"></slot>
        <slot part="text"></slot>
      </button>
    `;
  }

  updated(changed: PropertyValues<this>) {
    this.#internals.ariaSelected = String(this.ariaSelected);
    if (changed.has('active')) {
      this.#activeChanged();
    }
    if (changed.has('disabled')) {
      this.#disabledChanged();
    }
  }

  #clickHandler() {
    if (!this.disabled && this.#internals.ariaDisabled !== 'true') {
      this.active = true;
    }
  }

  #activeChanged() {
    if (this.active && !this.disabled) {
      this._button.removeAttribute('tabindex');
      this.#internals.ariaSelected = 'true';
    } else {
      this._button.tabIndex = -1;
      this.#internals.ariaSelected = 'false';
    }
    this.dispatchEvent(new TabExpandEvent(this.active, this));
  }

  /**
   * if a tab is disabled, then it is also aria-disabled
   * if a tab is removed from disabled its not necessarily
   * not still aria-disabled so we don't remove the aria-disabled
   */
  #disabledChanged() {
    this.#internals.ariaDisabled = String(!!this.disabled);
  }
}
