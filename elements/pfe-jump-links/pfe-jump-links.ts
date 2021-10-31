import { PfeJumpLinksNav } from './pfe-jump-links-nav.js';
export { PfeJumpLinksPanel } from './pfe-jump-links-panel.js';
export { PfeJumpLinksNav };

import { pfelement } from '@patternfly/pfe-core/decorators.js';
import { customElement } from 'lit/decorators.js';

/**
 * Jump links act as persistent navigation that consists of a list of anchor links.
 * Selecting a link moves a user to content that corresponds with the link selected.
 * A link is displayed as active when the content it links to is visible in the browser window.
 */
@customElement('pfe-jump-links') @pfelement()
export class PfeJumpLinks extends PfeJumpLinksNav { }
