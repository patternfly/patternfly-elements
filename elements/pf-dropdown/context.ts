import { createContextWithRoot } from '@patternfly/pfe-core/functions/context.js';

export interface PfDropdownMenuContext {
  disabled: boolean;
}

export const context = createContextWithRoot<boolean>(Symbol('pf-dropdown-menu-context'));
