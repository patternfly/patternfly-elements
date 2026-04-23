import '@rhds/elements/rh-footer/rh-footer-universal.js';
import 'element-internals-polyfill';
import { PfV5Icon } from '@patternfly/elements/pf-v5-icon/pf-v5-icon.js';

// if `/v2/` path load icons from static directory
if (document.location.href.includes('/v2/')) {
  PfV5Icon.getIconUrl = (set, icon) => {
    const url = new URL(`/v2/components/icon/icons/${set}/${icon}.js`, import.meta.url);
    return url;
  };
}
