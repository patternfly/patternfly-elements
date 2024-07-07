import type { Context } from '@lit/context';
import type { PfTab } from './pf-tab.js';

import { createContextWithRoot } from '@patternfly/pfe-core/functions/context.js';

export interface PfTabsContext {
  activeTab: PfTab | undefined;
  box: 'light' | 'dark' | null;
  fill: boolean;
  vertical: boolean;
  manual: boolean;
  borderBottom: 'true' | 'false';
}

export class TabExpandEvent<Tab> extends Event {
  constructor(
    public tab: Tab,
  ) {
    super('expand', { bubbles: true, cancelable: true });
  }
}

export const context: Context<unknown, PfTabsContext> =
  createContextWithRoot<PfTabsContext>(Symbol('pf-tabs-context'));
