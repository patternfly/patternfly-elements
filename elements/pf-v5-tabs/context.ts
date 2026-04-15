import type { Context } from '@lit/context';
import type { PfV5Tab } from './pf-v5-tab.js';

import { createContextWithRoot } from '@patternfly/pfe-core/functions/context.js';

export interface PfV5TabsContext {
  activeTab: PfV5Tab | undefined;
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

export const context: Context<unknown, PfV5TabsContext> =
  createContextWithRoot<PfV5TabsContext>(Symbol('pf-v5-tabs-context'));
