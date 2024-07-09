import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { queryAssignedElements } from 'lit/decorators/query-assigned-elements.js';
import { classMap } from 'lit/directives/class-map.js';
import { consume } from '@lit/context';

import { observes } from '@patternfly/pfe-core/decorators.js';
import { getRandomId } from '@patternfly/pfe-core/functions/random.js';

import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';

import { TabExpandEvent, context, type PfTabsContext } from './context.js';

import styles from './pf-tab.css';

/**
 * Tab
 * @slot icon
 *       Can contain an `<svg>` or `<pf-icon>`
 * @slot
 *       Tab title text
 * @csspart button - button element
 * @csspart icon - span container for the icon
 * @csspart text - span container for the title text
 * @cssprop     {<length>} --pf-c-tabs--m-box__item--m-current--first-child__link--before--BorderLeftWidth  {@default `1px`}
 * @cssprop     {<length>} --pf-c-tabs--m-box__item--m-current--last-child__link--before--BorderRightWidth  {@default `1px`}
 * @cssprop     {<color>} --pf-c-tabs__link--BackgroundColor            {@default `#f0f0f0`}
 * @cssprop     {<color>} --pf-c-tabs__link--disabled--BackgroundColor  {@default `#d2d2d2`}
 * @cssprop     {<length>} --pf-c-tabs__link--before--BorderTopWidth    {@default `1px`}
 * @cssprop     {<length>} --pf-c-tabs__link--before--BorderBottomWidth {@default `1px`}
 * @cssprop     {<length>} --pf-c-tabs__link--before--BorderLeftWidth   {@default `0`}
 * @cssprop     {<length>} --pf-c-tabs__link--before--BorderRightWidth  {@default `1px`}
 * @cssprop     {<length>} --pf-c-tabs__link--disabled--before--BorderRightWidth  {@default `1px`}
 * @cssprop     {<length>} --pf-c-tabs__link--after--Top    {@default `auto`}
 * @cssprop     {<length>} --pf-c-tabs__link--after--Right  {@default `0`}
 * @cssprop     {<length>} --pf-c-tabs__link--after--Bottom {@default `0`}
 * @cssprop     {<length>} --pf-c-tabs__link--before--Left  {@default `0`}
 * @cssprop     {<length>} --pf-c-tabs__link--PaddingTop    {@default `1rem`}
 * @cssprop     {<length>} --pf-c-tabs__link--PaddingBottom {@default `1rem`}
 * @cssprop     {<length>} --pf-c-tabs__link--disabled--before--BorderBottomWidth {@default `1px`}
 * @cssprop     {<length>} --pf-c-tabs__link--disabled--before--BorderLeftWidth   {@default `1px`}
 * @cssprop     {<color>} --pf-c-tabs__link--before--BorderTopColor     {@default `#d2d2d2`}
 * @cssprop     {<color>} --pf-c-tabs__link--before--BorderRightColor   {@default `#d2d2d2`}
 * @cssprop     {<color>} --pf-c-tabs__link--before--BorderBottomColor  {@default `#d2d2d2`}
 * @cssprop     {<color>} --pf-c-tabs__link--before--BorderLeftColor    {@default `#d2d2d2`}
 * @cssprop     {<length>}  --pf-c-tabs__link--FontSize      {@default `1rem`}
 * @cssprop     {<color>}   --pf-c-tabs__link--Color          {@default `#6a6e73`}
 * @cssprop     {<length>}  --pf-c-tabs__link--OutlineOffset {@default `-0.375rem`}
 * @cssprop     {<color>}  --pf-c-tabs__link--after--BorderColor        {@default `#b8bbbe`}
 * @cssprop     {<length>} --pf-c-tabs__link--after--BorderTopWidth     {@default `0`}
 * @cssprop     {<length>} --pf-c-tabs__link--after--BorderRightWidth   {@default `0`}
 * @cssprop     {<length>} --pf-c-tabs__link--after--BorderBottomWidth  {@default `0`}
 * @cssprop     {<length>} --pf-c-tabs__link--after--BorderLeftWidth    {@default `0`}
 * @cssprop     {<color>} --pf-c-tabs__item--m-current__link--Color {@default `#151515`}
 * @cssprop     {<color>}   --pf-c-tabs__item--m-current__link--after--BorderColor {@default `#06c`}
 * @cssprop     {<length>}  --pf-c-tabs__item--m-current__link--after--BorderWidth {@default `3px`}
 * @cssprop     {<length>} --pf-c-tabs__link--child--MarginRight  {@default `1rem`}
 * @fires {TabExpandEvent} expand - when a tab expands
 */
@customElement('pf-tab')
export class PfTab extends LitElement {
  static readonly styles = [styles];

  @queryAssignedElements({ slot: 'icon', flatten: true })
  private icons!: HTMLElement[];

  @property({ reflect: true, type: Boolean }) active = false;

  @property({ reflect: true, type: Boolean }) disabled = false;

  @consume({ context, subscribe: true })
  @property({ attribute: false })
  private ctx?: PfTabsContext;

  #internals = InternalsController.of(this, { role: 'tab' });

  override connectedCallback() {
    super.connectedCallback();
    this.id ||= getRandomId(this.localName);
    this.addEventListener('click', this.#onClick);
    this.addEventListener('keydown', this.#onKeydown);
    this.addEventListener('focus', this.#onFocus);
  }

  override willUpdate() {
    const { borderBottom, box, fill, manual, vertical } = this.ctx ?? {};
    this.toggleAttribute('fill', fill);
    this.toggleAttribute('manual', manual);
    this.toggleAttribute('vertical', vertical);
    if (box) {
      this.setAttribute('box', box);
    } else {
      this.removeAttribute('box');
    }
    if (borderBottom) {
      this.setAttribute('border-bottom', borderBottom);
    } else {
      this.removeAttribute('border-bottom');
    }
  }

  render() {
    const { active } = this;
    const { box, fill = false, vertical = false } = this.ctx ?? {};
    const light = box === 'light';
    const dark = box === 'dark';
    return html`
      <div id="button"
           part="button"
           class="${classMap({ active, box: !!box, dark, light, fill, vertical })}">
        <slot name="icon"
              part="icon"
              ?hidden="${!this.icons.length}"
              @slotchange="${() => this.requestUpdate()}"></slot>
        <slot part="text"></slot>
      </div>
    `;
  }

  #onClick() {
    if (!this.disabled) {
      this.#activate();
    }
  }

  #onKeydown(event: KeyboardEvent) {
    if (!this.disabled) {
      switch (event.key) {
        case 'Enter': this.#activate();
      }
    }
  }

  #onFocus() {
    if (!this.ctx?.manual && !this.disabled) {
      this.#activate();
    }
  }

  #activate() {
    return this.dispatchEvent(new TabExpandEvent(this));
  }

  @observes('active')
  protected activeChanged(old: boolean) {
    this.#internals.ariaSelected = String(!!this.active);
    if (this.active && !old) {
      this.#activate();
    }
  }

  @observes('disabled')
  protected disabledChanged() {
    this.#internals.ariaDisabled = this.disabled ? 'true' : this.ariaDisabled ?? 'false';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-tab': PfTab;
  }
}
