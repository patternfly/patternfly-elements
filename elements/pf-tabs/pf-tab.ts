import { LitElement, html, isServer, type TemplateResult } from 'lit';
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
 * @fires {TabExpandEvent} expand - when a tab expands
 */
@customElement('pf-tab')
export class PfTab extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  @queryAssignedElements({ slot: 'icon', flatten: true })
  private icons?: HTMLElement[];

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
    const icons = isServer ? [] : this.icons;
    return html`
      <!-- button element -->
      <div id="button"
           part="button"
           class="${classMap({ active, box: !!box, dark, light, fill, vertical })}">
        <!-- slot:
               summary: Can contain an \`<svg>\` or \`<pf-icon>\`
             part:
               summary: container for the icon
        -->
        <slot name="icon"
              part="icon"
              ?hidden="${!icons?.length}"
              @slotchange="${() => this.requestUpdate()}"></slot>
        <!-- slot:
               summary: Tab title text
             part:
               summary: container for the tab text -->
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
