import { PfeIcon } from '/pfe.min.js';
import '@rhds/elements/rh-footer/rh-global-footer.js';
import '/element-internals-polyfill/dist/index.js';

// Workaround for bundled pfe-icon: make icon imports absolute, instead of relative to the bundle
PfeIcon.getIconUrl = (set, icon) =>
  new URL(`/components/icon/icons/${set}/${icon}.js`, import.meta.url);
