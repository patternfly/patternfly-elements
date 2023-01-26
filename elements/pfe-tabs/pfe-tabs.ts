import { customElement, property } from 'lit/decorators.js';

import { cascades } from '@patternfly/pfe-core/decorators.js';

import { BaseTabs } from './BaseTabs.js';
import { PfeTab } from './pfe-tab.js';
import { PfeTabPanel } from './pfe-tab-panel.js';

import styles from './pfe-tabs.css';

export type InsetVariant = (
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | 'page'
);

/**
 * Tabs allow users to navigate between views within the same page or context. Variants include
 * horizontal, vertical, inset, and filled. Most tab variations are available as open (default) or
 * box style tabs. Box style tabs also feature a light and dark variation.
 *
 * @attr {number} active-key - DOM Property: `activeKey` {@default `0`}
 *
 * @csspart container - outer container
 * @csspart tabs-container - tabs container
 * @csspart tabs - tablist
 * @csspart panels - panels
 *
 * @slot tab - Must contain one or more `<pfe-tab>`
 * @slot - Must contain one or more `<pfe-panel>`
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
@customElement('pfe-tabs')
export class PfeTabs extends BaseTabs {
  static readonly version = '{{version}}';

  static readonly styles = [...BaseTabs.styles, styles];

  protected static readonly scrollTimeoutDelay = 150;

  static isTab(element: HTMLElement): element is PfeTab {
    return element instanceof PfeTab;
  }

  static isPanel(element: HTMLElement): element is PfeTabPanel {
    return element instanceof PfeTabPanel;
  }

  @property({ reflect: true }) inset?: InsetVariant;

  @cascades('pfe-tab', 'pfe-tab-panel')
  @property({ reflect: true }) box: 'light' | 'dark' | null = null;

  @cascades('pfe-tab', 'pfe-tab-panel')
  @property({ reflect: true, type: Boolean }) vertical = false;

  @cascades('pfe-tab')
  @property({ reflect: true, type: Boolean }) fill = false;

  @cascades('pfe-tab')
  @property({ attribute: 'border-bottom' }) borderBottom: 'true' | 'false' = 'true';

  protected get canShowScrollButtons(): boolean {
    return !this.vertical;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-tabs': PfeTabs;
  }
}
