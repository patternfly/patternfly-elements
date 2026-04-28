import '@rhds/elements/rh-footer/rh-footer-universal.js';
import 'element-internals-polyfill';
import { PfV5Icon } from '@patternfly/elements/pf-v5-icon/pf-v5-icon.js';
import '@patternfly/elements/pf-v5-accordion/pf-v5-accordion.js';
import '@patternfly/elements/pf-v5-alert/pf-v5-alert.js';
import '@patternfly/elements/pf-v5-avatar/pf-v5-avatar.js';
import '@patternfly/elements/pf-v5-back-to-top/pf-v5-back-to-top.js';
import '@patternfly/elements/pf-v5-background-image/pf-v5-background-image.js';
import '@patternfly/elements/pf-v5-badge/pf-v5-badge.js';
import '@patternfly/elements/pf-v5-banner/pf-v5-banner.js';
import '@patternfly/elements/pf-v5-button/pf-v5-button.js';
import '@patternfly/elements/pf-v5-card/pf-v5-card.js';
import '@patternfly/elements/pf-v5-chip/pf-v5-chip.js';
import '@patternfly/elements/pf-v5-clipboard-copy/pf-v5-clipboard-copy.js';
import '@patternfly/elements/pf-v5-code-block/pf-v5-code-block.js';
import '@patternfly/elements/pf-v5-dropdown/pf-v5-dropdown.js';
import '@patternfly/elements/pf-v5-helper-text/pf-v5-helper-text.js';
import '@patternfly/elements/pf-v5-hint/pf-v5-hint.js';
import '@patternfly/elements/pf-v5-jump-links/pf-v5-jump-links.js';
import '@patternfly/elements/pf-v5-label/pf-v5-label.js';
import '@patternfly/elements/pf-v5-label-group/pf-v5-label-group.js';
import '@patternfly/elements/pf-v5-modal/pf-v5-modal.js';
import '@patternfly/elements/pf-v5-panel/pf-v5-panel.js';
import '@patternfly/elements/pf-v5-popover/pf-v5-popover.js';
import '@patternfly/elements/pf-v5-progress/pf-v5-progress.js';
import '@patternfly/elements/pf-v5-progress-stepper/pf-v5-progress-stepper.js';
import '@patternfly/elements/pf-v5-search-input/pf-v5-search-input.js';
import '@patternfly/elements/pf-v5-select/pf-v5-select.js';
import '@patternfly/elements/pf-v5-spinner/pf-v5-spinner.js';
import '@patternfly/elements/pf-v5-switch/pf-v5-switch.js';
import '@patternfly/elements/pf-v5-table/pf-v5-table.js';
import '@patternfly/elements/pf-v5-tabs/pf-v5-tabs.js';
import '@patternfly/elements/pf-v5-text-area/pf-v5-text-area.js';
import '@patternfly/elements/pf-v5-text-input/pf-v5-text-input.js';
import '@patternfly/elements/pf-v5-tile/pf-v5-tile.js';
import '@patternfly/elements/pf-v5-timestamp/pf-v5-timestamp.js';
import '@patternfly/elements/pf-v5-tooltip/pf-v5-tooltip.js';

// if `/v2/` path load icons from static directory
if (document.location.href.includes('/v2/')) {
  PfV5Icon.getIconUrl = (set, icon) => {
    const url = new URL(`/v2/components/icon/icons/${set}/${icon}.js`, import.meta.url);
    return url;
  };
}
