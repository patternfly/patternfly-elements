import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { queryAssignedElements } from 'lit/decorators/query-assigned-elements.js';
import { query } from 'lit/decorators/query.js';

import { observed } from '@patternfly/pfe-core/decorators.js';
import { getRandomId } from '@patternfly/pfe-core/functions/random.js';

import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';

import {
  boxContext,
  fillContext,
  verticalContext,
  manualContext,
  borderBottomContext,
} from './pf-tabs.js';

import styles from './pf-tab.css';
import { consume } from '@lit/context/lib/decorators/consume.js';

export class TabExpandEvent<Tab> extends Event {
  constructor(
    public tab: Tab,
  ) {
    super('expand', { bubbles: true, cancelable: true });
  }
}

/**
 * Tab
 *
 * @slot icon
 *       Can contain an `<svg>` or `<pf-icon>`
 * @slot
 *       Tab title text
 *
 * @csspart button - button element
 * @csspart icon - span container for the icon
 * @csspart text - span container for the title text
 *
 * @cssprop     {<length>} --pf-c-tabs--m-box__item--m-current--first-child__link--before--BorderLeftWidth  {@default `1px`}
 * @cssprop     {<length>} --pf-c-tabs--m-box__item--m-current--last-child__link--before--BorderRightWidth  {@default `1px`}
 *
 * @cssprop     {<color>} --pf-c-tabs__link--BackgroundColor            {@default `#f0f0f0`}
 * @cssprop     {<color>} --pf-c-tabs__link--disabled--BackgroundColor  {@default `#d2d2d2`}
 *
 * @cssprop     {<length>} --pf-c-tabs__link--before--BorderTopWidth    {@default `1px`}
 * @cssprop     {<length>} --pf-c-tabs__link--before--BorderBottomWidth {@default `1px`}
 * @cssprop     {<length>} --pf-c-tabs__link--before--BorderLeftWidth   {@default `0`}
 * @cssprop     {<length>} --pf-c-tabs__link--before--BorderRightWidth  {@default `1px`}
 *
 * @cssprop     {<length>} --pf-c-tabs__link--disabled--before--BorderRightWidth  {@default `1px`}
 *
 * @cssprop     {<length>} --pf-c-tabs__link--after--Top    {@default `auto`}
 * @cssprop     {<length>} --pf-c-tabs__link--after--Right  {@default `0`}
 * @cssprop     {<length>} --pf-c-tabs__link--after--Bottom {@default `0`}
 * @cssprop     {<length>} --pf-c-tabs__link--before--Left  {@default `0`}
 *
 * @cssprop     {<length>} --pf-c-tabs__link--PaddingTop    {@default `1rem`}
 * @cssprop     {<length>} --pf-c-tabs__link--PaddingBottom {@default `1rem`}
 *
 * @cssprop     {<length>} --pf-c-tabs__link--disabled--before--BorderBottomWidth {@default `1px`}
 * @cssprop     {<length>} --pf-c-tabs__link--disabled--before--BorderLeftWidth   {@default `1px`}
 *
 * @cssprop     {<color>} --pf-c-tabs__link--before--BorderTopColor     {@default `#d2d2d2`}
 * @cssprop     {<color>} --pf-c-tabs__link--before--BorderRightColor   {@default `#d2d2d2`}
 * @cssprop     {<color>} --pf-c-tabs__link--before--BorderBottomColor  {@default `#d2d2d2`}
 * @cssprop     {<color>} --pf-c-tabs__link--before--BorderLeftColor    {@default `#d2d2d2`}
 *
 * @cssprop     {<length>}  --pf-c-tabs__link--FontSize      {@default `1rem`}
 * @cssprop     {<color>}   --pf-c-tabs__link--Color          {@default `#6a6e73`}
 * @cssprop     {<length>}  --pf-c-tabs__link--OutlineOffset {@default `-0.375rem`}
 *
 * @cssprop     {<color>}  --pf-c-tabs__link--after--BorderColor        {@default `#b8bbbe`}
 * @cssprop     {<length>} --pf-c-tabs__link--after--BorderTopWidth     {@default `0`}
 * @cssprop     {<length>} --pf-c-tabs__link--after--BorderRightWidth   {@default `0`}
 * @cssprop     {<length>} --pf-c-tabs__link--after--BorderBottomWidth  {@default `0`}
 * @cssprop     {<length>} --pf-c-tabs__link--after--BorderLeftWidth    {@default `0`}
 *
 * @cssprop     {<color>} --pf-c-tabs__item--m-current__link--Color {@default `#151515`}
 *
 * @cssprop     {<color>}   --pf-c-tabs__item--m-current__link--after--BorderColor {@default `#06c`}
 * @cssprop     {<length>}  --pf-c-tabs__item--m-current__link--after--BorderWidth {@default `3px`}
 *
 * @cssprop     {<length>} --pf-c-tabs__link--child--MarginRight  {@default `1rem`}
 *
 * @fires {TabExpandEvent} expand - when a tab expands
 */
@customElement('pf-tab')
export class PfTab extends LitElement {
  static readonly styles = [styles];

  static override shadowRootOptions: ShadowRootInit = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  @query('#button') private button!: HTMLButtonElement;

  @queryAssignedElements({ slot: 'icon', flatten: true })
  private icons!: Array<HTMLElement>;

  @observed
  @property({ reflect: true, type: Boolean }) active = false;

  @observed
  @property({ reflect: true, type: Boolean }) disabled = false;

  @consume({ context: boxContext }) @property({ reflect: true }) box: 'light' | 'dark' | null = null;

  @consume({ context: verticalContext }) @property({ type: Boolean, reflect: true }) vertical = false;

  @consume({ context: fillContext }) @property({ type: Boolean, reflect: true }) fill = false;

  @consume({ context: manualContext }) @property({ type: Boolean, reflect: true }) manual = false;

  @consume({ context: borderBottomContext }) @property({ attribute: 'border-bottom' }) borderBottom: 'true' | 'false' = 'false';

  #internals = InternalsController.of(this, { role: 'tab' });

  override connectedCallback() {
    super.connectedCallback();
    this.id ||= getRandomId(this.localName);
  }

  render() {
    return html`
      <div id="button"
           part="button"
           ?disabled="${this.disabled}"
           tabindex="${this.active ? 0 : -1}"
           @click="${this.#onClick}"
           @keydown="${this.#onKeydown}"
           @focus="${this.#onFocus}">
        <slot name="icon"
              part="icon"
              ?hidden="${!this.icons.length}"
              @slotchange="${() => this.requestUpdate()}"></slot>
        <slot part="text"></slot>
      </div>
    `;
  }

  #onClick() {
    if (!this.disabled && this.#internals.ariaDisabled !== 'true') {
      this.#activate();
      this.focus();
    }
  }

  #onKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case 'Enter':
        if (!this.disabled) {
          this.#activate();
          this.focus();
        }
    }
  }

  #onFocus() {
    if (this.manual || this.#internals.ariaDisabled === 'true') {
      return;
    }
    this.#activate();
  }

  #activate() {
    this.active = true;
  }

  private _activeChanged(oldVal: boolean, newVal: boolean) {
    if (newVal && oldVal !== newVal) {
      this.dispatchEvent(new TabExpandEvent(this));
    }
  }

  private _disabledChanged() {
    this.#internals.ariaDisabled = this.disabled ? 'true' : this.ariaDisabled ?? 'false';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-tab': PfTab;
  }
}
