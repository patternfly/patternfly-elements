import { customElement, property } from 'lit/decorators.js';

import { cascades } from '@patternfly/pfe-core/decorators.js';

import { BaseTabs } from './BaseTabs.js';
import { PfeTab } from './pfe-tab.js';
import { PfeTabPanel } from './pfe-tab-panel.js';

import style from './BaseTabs.scss';
import pfeStyle from './pfe-tabs.scss';

/**
 * @slot - Add the heading for your tab here.
 */
@customElement('pfe-tabs')
export class PfeTabs extends BaseTabs {
  static readonly styles = [style, pfeStyle];

  @cascades('pfe-tab', 'pfe-tab-panel')
  @property({ reflect: true }) box: 'light' | 'dark' | null = null;

  @cascades('pfe-tab', 'pfe-tab-panel')
  @property({ reflect: true, type: Boolean }) vertical = false;

  @cascades('pfe-tab')
  @property({ reflect: true, type: Boolean }) fill = false;

  @property({ attribute: 'border-bottom' }) borderBottom: 'true' | 'false' = 'true';

  static isTab(element: HTMLElement): element is PfeTab {
    return element instanceof PfeTab;
  }

  static isPanel(element: HTMLElement): element is PfeTabPanel {
    return element instanceof PfeTabPanel;
  }

  protected _allTabs(): PfeTab[] {
    const tabs = this._tabs as PfeTab[];
    return tabs.filter(tab => PfeTabs.isTab(tab));
  }

  protected _allPanels(): PfeTabPanel[] {
    const panels = this._panels as PfeTabPanel[];
    return panels.filter(panel => PfeTabs.isPanel(panel));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-tabs': PfeTabs;
  }
}
