import '@patternfly/elements/pf-select/pf-select.js';
import { PfIcon } from '@patternfly/elements/pf-icon/pf-icon.js';
PfIcon.addIconSet('pf', (set, icon) => new URL(`./icons/${set}/${icon}.js`, import.meta.url));
