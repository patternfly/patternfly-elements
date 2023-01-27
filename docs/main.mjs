import { PfIcon } from '@patternfly/elements/pf-icon/pf-icon.js';
import '@rhds/elements/rh-footer/rh-global-footer.js';
import 'element-internals-polyfill';

// Workaround for bundled pf-icon: make icon imports absolute, instead of relative to the bundle
PfIcon.getIconUrl = (set, icon) =>
  new URL(`/components/pf-icon/icons/${set}/${icon}.js`, import.meta.url);
