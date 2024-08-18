import { LitElement, html, type TemplateResult } from 'lit';
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
 * @cssprop     {<length>} [--pf-c-tabs--m-box__item--m-current--first-child__link--before--BorderLeftWidth=1px]
 * @cssprop     {<length>} [--pf-c-tabs--m-box__item--m-current--last-child__link--before--BorderRightWidth=1px]
 * @cssprop     {<color>} [--pf-c-tabs__link--BackgroundColor=#f0f0f0]
 * @cssprop     {<color>} [--pf-c-tabs__link--disabled--BackgroundColor=#d2d2d2]
 * @cssprop     {<length>} [--pf-c-tabs__link--before--BorderTopWidth=1px]
 * @cssprop     {<length>} [--pf-c-tabs__link--before--BorderBottomWidth=1px]
 * @cssprop     {<length>} [--pf-c-tabs__link--before--BorderLeftWidth=0]
 * @cssprop     {<length>} [--pf-c-tabs__link--before--BorderRightWidth=1px]
 * @cssprop     {<length>} [--pf-c-tabs__link--disabled--before--BorderRightWidth=1px]
 * @cssprop     {<length>} [--pf-c-tabs__link--after--Top=auto]
 * @cssprop     {<length>} [--pf-c-tabs__link--after--Right=0]
 * @cssprop     {<length>} [--pf-c-tabs__link--after--Bottom=0]
 * @cssprop     {<length>} [--pf-c-tabs__link--before--Left=0]
 * @cssprop     {<length>} [--pf-c-tabs__link--PaddingTop=1rem]
 * @cssprop     {<length>} [--pf-c-tabs__link--PaddingBottom=1rem]
 * @cssprop     {<length>} [--pf-c-tabs__link--disabled--before--BorderBottomWidth=1px]
 * @cssprop     {<length>} [--pf-c-tabs__link--disabled--before--BorderLeftWidth=1px]
 * @cssprop     {<color>} [--pf-c-tabs__link--before--BorderTopColor=#d2d2d2]
 * @cssprop     {<color>} [--pf-c-tabs__link--before--BorderRightColor=#d2d2d2]
 * @cssprop     {<color>} [--pf-c-tabs__link--before--BorderBottomColor=#d2d2d2]
 * @cssprop     {<color>} [--pf-c-tabs__link--before--BorderLeftColor=#d2d2d2]
 * @cssprop     {<length>}  [--pf-c-tabs__link--FontSize=1rem]
 * @cssprop     {<color>}   [--pf-c-tabs__link--Color=#6a6e73]
 * @cssprop     {<length>}  [--pf-c-tabs__link--OutlineOffset=-0.375rem]
 * @cssprop     {<color>}  [--pf-c-tabs__link--after--BorderColor=#b8bbbe]
 * @cssprop     {<length>} [--pf-c-tabs__link--after--BorderTopWidth=0]
 * @cssprop     {<length>} [--pf-c-tabs__link--after--BorderRightWidth=0]
 * @cssprop     {<length>} [--pf-c-tabs__link--after--BorderBottomWidth=0]
 * @cssprop     {<length>} [--pf-c-tabs__link--after--BorderLeftWidth=0]
 * @cssprop     {<color>} [--pf-c-tabs__item--m-current__link--Color=#151515]
 * @cssprop     {<color>}   [--pf-c-tabs__item--m-current__link--after--BorderColor=#06c]
 * @cssprop     {<length>}  [--pf-c-tabs__item--m-current__link--after--BorderWidth=3px]
 * @cssprop     {<length>} [--pf-c-tabs__link--child--MarginRight=1rem]
 * @fires {TabExpandEvent} expand - when a tab expands
 */
@customElement('pf-tab')
export class PfTab extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  @queryAssignedElements({ slot: 'icon', flatten: true })
  private icons!: HTMLElement[];

  @property({ reflect: true, type: Boolean }) active = false;

  @property({ reflect: true, type: Boolean }) disabled = false;

  @consume({ context, subscribe: true })
  @property({ attribute: false })
  private ctx?: PfTabsContext;

  #internals = InternalsController.of(this, { role: 'tab' });

  override connectedCallback(): void {
    super.connectedCallback();
    this.id ||= getRandomId(this.localName);
    this.addEventListener('click', this.#onClick);
    this.addEventListener('keydown', this.#onKeydown);
    this.addEventListener('focus', this.#onFocus);
  }

  override willUpdate(): void {
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

  render(): TemplateResult<1> {
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
        case 'Enter':
          this.#activate();
      }
    }
  }

  #onFocus() {
    if (!this.ctx?.manual && !this.disabled) {
      this.#activate();
    }
  }

  async #activate() {
    this.dispatchEvent(new TabExpandEvent(this));
  }

  @observes('active')
  protected activeChanged(old: boolean, active: boolean): void {
    this.#internals.ariaSelected = String(!!active);
    if (active && !old) {
      this.#activate();
    }
  }

  @observes('disabled')
  protected disabledChanged(): void {
    this.#internals.ariaDisabled = this.disabled ? 'true' : this.ariaDisabled ?? 'false';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-tab': PfTab;
  }
}
