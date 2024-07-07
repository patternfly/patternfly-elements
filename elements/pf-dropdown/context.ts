import type { Context } from '@lit/context';
import { createContextWithRoot } from '@patternfly/pfe-core/functions/context.js';

export interface PfDropdownContext {
  disabled: boolean;
}

export const context: Context<unknown, PfDropdownContext> =
  createContextWithRoot<PfDropdownContext>(Symbol('pf-dropdown-menu-context'));
