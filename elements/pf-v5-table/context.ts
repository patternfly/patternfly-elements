import { createContextWithRoot } from '@patternfly/pfe-core/functions/context.js';

export const thRoleContext: {
  __context__: unknown;
} = createContextWithRoot<'rowheader' | 'columnheader'>('pf-v5-th-role');
