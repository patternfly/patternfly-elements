import '/docs/zero-md.js';
import { PfIcon } from '@patternfly/elements/pf-icon/pf-icon.js';

PfIcon.addIconSet('rh', (set, icon) =>
  new URL(`./icons/${set}/${icon}.js`, import.meta.url));
