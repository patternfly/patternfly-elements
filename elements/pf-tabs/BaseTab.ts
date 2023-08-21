import type { PropertyValues } from 'lit';

import { LitElement, html } from 'lit';
import { queryAssignedElements } from 'lit/decorators/query-assigned-elements.js';
import { query } from 'lit/decorators/query.js';

import { getRandomId } from '@patternfly/pfe-core/functions/random.js';
import { ComposedEvent } from '@patternfly/pfe-core';

import style from './BaseTab.css';

export class TabExpandEvent extends ComposedEvent {
  constructor(
    public active: boolean,
    public tab: BaseTab,
  ) {
    super('expand');
  }
}

/**
 * @fires {TabExpandEvent} expand - when a tab is selected
 */
export abstract class BaseTab extends LitElement {
  static readonly styles = [style];

  static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  @queryAssignedElements({ slot: 'icon', flatten: true })
  private icons!: Array<HTMLElement>;

  @query('button') private button!: HTMLButtonElement;

  /** `active` should be observed, and true when the tab is selected */
  abstract active: boolean;

  /** `active` should be observed, and true when the tab is disabled */
  abstract disabled: boolean;

  #internals = this.attachInternals();

  connectedCallback() {
    super.connectedCallback();
    this.id ||= getRandomId(this.localName);
    this.addEventListener('click', this.#clickHandler);
    this.#internals.role = 'tab';
  }

  render() {
    return html`
      <button part="button" ?disabled="${this.disabled}">
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

  focus() {
    this.button.focus();
  }

  #clickHandler() {
    if (!this.disabled && this.#internals.ariaDisabled !== 'true' && this.ariaDisabled !== 'true') {
      this.active = true;
      this.focus(); // safari fix
    }
  }

  #activeChanged() {
    if (this.active && !this.disabled) {
      this.#internals.ariaSelected = 'true';
    } else {
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
