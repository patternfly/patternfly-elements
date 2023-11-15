import { createContextWithRoot } from '@patternfly/pfe-core/functions/context.js';

export interface PfDropdownContext {
  disabled: boolean;
}

export const context =
  createContextWithRoot<PfDropdownContext >(Symbol('pf-dropdown-menu-context'));
