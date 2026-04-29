import type { Context } from '@lit/context';
import { createContextWithRoot } from '@patternfly/pfe-core/functions/context.js';

export interface PfV5DropdownContext {
  disabled: boolean;
}

export const context: Context<unknown, PfV5DropdownContext> =
  createContextWithRoot<PfV5DropdownContext>(Symbol('pf-v5-dropdown-menu-context'));
