import '@rhds/elements/rh-footer/rh-global-footer.js';
import 'element-internals-polyfill';
import { PfIcon } from '@patternfly/elements/pf-icon/pf-icon.js';

// if `/v2/` path load icons from static directory
if (document.location.href.includes('/v2/')) {
  // Workaround for bundled pf-icon: make icon imports absolute, instead of relative to the bundle
  PfIcon.getIconUrl = (set, icon) => {
    const url = new URL(`/v2/components/icon/icons/${set}/${icon}.js`, import.meta.url);
    return url;
  };
}
