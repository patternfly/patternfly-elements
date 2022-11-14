import { LitElement, html } from 'lit';
import { property, queryAssignedElements } from 'lit/decorators.js';

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

  static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  @queryAssignedElements({ slot: 'icon', flatten: true })
  private icons!: Array<HTMLElement>;

  @observed
  @property({ reflect: true, type: Boolean }) active = false;

  @observed
  @property({ reflect: true, type: Boolean }) disabled = false;

  #internals = this.attachInternals();

  get ariaSelected() {
    return this.#internals.ariaSelected ?? 'false';
  }

  get ariaDisabled() {
    return this.getAttribute('aria-disabled');
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this.#clickHandler);
  }

  render() {
    return html`
      <button part="button" role="tab">
        <span part="icon"
              ?hidden="${!this.icons.length}"
              @slotchange="${() => this.requestUpdate()}">
          <slot name="icon"></slot>
        </span>
        <span part="text">
          <slot></slot>
        </span>
      </button>
    `;
  }

  updated() {
    this.#internals.ariaSelected = String(this.ariaSelected);
  }

  #clickHandler() {
    if (!this.disabled && this.ariaDisabled !== 'true') {
      this.active = true;
    }
  }

  @bound
  _activeChanged(oldVal: boolean, newVal: boolean) {
    if (oldVal === newVal) {
      return;
    }
    if (newVal && !this.disabled) {
      this.removeAttribute('tabindex');
      this.#internals.ariaSelected = 'true';
    } else {
      this.tabIndex = -1;
      this.#internals.ariaSelected = 'false';
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
      this.setAttribute('aria-disabled', 'true');
    }
  }
}
