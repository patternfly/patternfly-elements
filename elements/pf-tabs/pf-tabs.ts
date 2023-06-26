import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';

import { cascades } from '@patternfly/pfe-core/decorators.js';

import { PfTab } from './pf-tab.js';
import { PfTabPanel } from './pf-tab-panel.js';

import { TabsController } from './TabsController.js';
import { OverflowController } from '@patternfly/pfe-core/controllers/overflow-controller.js';
import { getRandomId } from '@patternfly/pfe-core/functions/random.js';
import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

import BaseStyles from './BaseTabs.css';
import styles from './pf-tabs.css';

/**
 * **Tabs** allow users to navigate between views within the same page or context.
 *
 * @attr {number} active-key - DOM Property: `activeKey` {@default `0`}
 *
 * @csspart container - outer container
 * @csspart tabs-container - tabs container
 * @csspart tabs - tablist
 * @csspart panels - panels
 *
 * @slot tab - Must contain one or more `<pf-tab>`
 * @slot - Must contain one or more `<pf-panel>`
 *
 * @cssprop     {<length>} --pf-c-tabs--Width {@default `auto`}
 * @cssprop     {<length>} --pf-c-tabs--inset {@default `0`}
 *
 * @cssprop     {<color>}   --pf-c-tabs--before--BorderColor       {@default `#d2d2d2`}
 * @cssprop     {<length>}  --pf-c-tabs--before--BorderTopWidth    {@default `0`}
 * @cssprop     {<length>}  --pf-c-tabs--before--BorderRightWidth  {@default `0`}
 * @cssprop     {<length>}  --pf-c-tabs--before--BorderBottomWidth {@default `1px`}
 * @cssprop     {<length>}  --pf-c-tabs--before---BorderLeftWidth  {@default `0`}
 *
 * @cssprop     {<length>}  --pf-c-tabs--m-vertical--MaxWidth      {@default `15.625rem`}
 *
 * @cssprop     {<color>}   --pf-c-tabs--m-vertical__list--before--BorderColor       {@default `#d2d2d2`}
 * @cssprop     {<length>}  --pf-c-tabs--m-vertical__list--before--BorderTopWidth    {@default `0`}
 * @cssprop     {<length>}  --pf-c-tabs--m-vertical__list--before--BorderRightWidth  {@default `0`}
 * @cssprop     {<length>}  --pf-c-tabs--m-vertical__list--before--BorderBottomWidth {@default `0`}
 * @cssprop     {<length>}  --pf-c-tabs--m-vertical__list--before--BorderLeftWidth   {@default `1px`}
 *
 * @cssprop     {<length>}  --pf-c-tabs--m-vertical--m-box--inset  {@default `2rem`}
 *
 * @cssprop     {<display>} --pf-c-tabs__list--Display  {@default `flex`}
 *
 * @cssprop     {<length>}  --pf-c-tabs__scroll-button--Width                         {@default `3rem`}
 * @cssprop     {<color>}   --pf-c-tabs__scroll-button--Color                         {@default `#151515`}
 * @cssprop     {<color>}   --pf-c-tabs__scroll-button--BackgroundColor               {@default `#ffffff`}
 * @cssprop     {<length>}  --pf-c-tabs__scroll-button--OutlineOffset                 {@default `-0.25rem`}
 * @cssprop     {<time>}    --pf-c-tabs__scroll-button--TransitionDuration--margin    {@default `.125s`}
 * @cssprop     {<time>}    --pf-c-tabs__scroll-button--TransitionDuration--transform {@default `.125s`}
 * @cssprop     {<color>}   --pf-c-tabs__scroll-button--hover--Color                  {@default `#06c`}
 *
 * @cssprop     {<color>}   --pf-c-tabs__scroll-button--before--BorderColor           {@default `#d2d2d2`}
 * @cssprop     {<length>}  --pf-c-tabs__scroll-button--before--BorderRightWidth      {@default `0`}
 * @cssprop     {<length>}  --pf-c-tabs__scroll-button--before--BorderBottomWidth     {@default `1px`}
 * @cssprop     {<length>}  --pf-c-tabs__scroll-button--before--BorderLeftWidth       {@default `0`}
 * @cssprop     {<length>}  --pf-c-tabs__scroll-button--before--border-width--base    {@default `1px`}
 *
 * @cssprop     {<color>} --pf-c-tabs__scroll-button--disabled--Color                 {@default `#d2d2d2`}
 */
@customElement('pf-tabs')
export class PfTabs extends LitElement {
  static readonly styles = [BaseStyles, styles];

  @cascades('pf-tab', 'pf-tab-panel')
  @property({ reflect: true }) box: 'light' | 'dark' | null = null;

  @cascades('pf-tab', 'pf-tab-panel')
  @property({ reflect: true, type: Boolean }) vertical = false;

  @cascades('pf-tab')
  @property({ reflect: true, type: Boolean }) fill = false;

  @cascades('pf-tab')
  @property({ attribute: 'border-bottom' }) borderBottom: 'true' | 'false' = 'true';

  /**
   * Tab activation
   * Tabs can be either [automatic](https://w3c.github.io/aria-practices/examples/tabs/tabs-automatic.html) activated
   * or [manual](https://w3c.github.io/aria-practices/examples/tabs/tabs-manual.html)
   */
  @property({ reflect: true, type: Boolean }) manual = false;

  #tabs = new TabsController(this, {
    isTab: (x?: Node): x is PfTab => x instanceof PfTab,
    isPanel: (x?: Node): x is PfTabPanel => x instanceof PfTabPanel,
  });

  #overflow = new OverflowController(this);

  override connectedCallback() {
    super.connectedCallback();
    this.id ||= getRandomId(this.localName);
  }

  updated() {
    const tabsList = this.shadowRoot?.getElementById('tabs');
    if (tabsList) {
      this.#overflow.init(tabsList, this.#tabs.tabs);
    }
  }

  override render() {
    return html`
      <div part="container" class="${classMap({ overflow: this.#overflow.showScrollButtons })}">
        <div part="tabs-container">${!this.#overflow.showScrollButtons ? '' : html`
          <button id="previousTab" tabindex="-1"
              aria-label="${this.getAttribute('label-scroll-left') ?? 'Scroll left'}"
              ?disabled="${!this.#overflow.overflowLeft}"
              @click="${this.#scrollLeft}">
            <pf-icon icon="angle-left" set="fas" loading="eager"></pf-icon>
          </button>`}
          <slot id="tabs"
                name="tab"
                part="tabs"
                role="tablist"
                @scroll="${this.#overflow.onScroll}"></slot> ${!this.#overflow.showScrollButtons ? '' : html`
          <button id="nextTab" tabindex="-1"
              aria-label="${this.getAttribute('label-scroll-right') ?? 'Scroll right'}"
              ?disabled="${!this.#overflow.overflowRight}"
              @click="${this.#scrollRight}">
            <pf-icon icon="angle-right" set="fas" loading="eager"></pf-icon>
          </button>`}
        </div>
        <slot part="panels"></slot>
      </div>
    `;
  }

  #scrollLeft() {
    this.#overflow.scrollLeft();
  }

  #scrollRight() {
    this.#overflow.scrollRight();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-tabs': PfTabs;
  }
}
