import { PfeIcon } from '@patternfly/elements';
import '@rhds/elements/rh-footer/rh-global-footer.js';
import 'element-internals-polyfill';

// Workaround for bundled pfe-icon: make icon imports absolute, instead of relative to the bundle
PfeIcon.getIconUrl = (set, icon) =>
  new URL(`/components/icon/icons/${set}/${icon}.js`, import.meta.url);
