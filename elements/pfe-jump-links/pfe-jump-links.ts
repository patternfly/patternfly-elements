import { PfeJumpLinksNav } from './pfe-jump-links-nav.js';
export { PfeJumpLinksPanel } from './pfe-jump-links-panel.js';
export { PfeJumpLinksNav };

import { pfelement } from '@patternfly/pfe-core/decorators.js';
import { customElement } from 'lit/decorators.js';

/**
 * Jump links act as persistent navigation that consists of a list of anchor links.
 * Selecting a link moves a user to content that corresponds with the link selected.
 * A link is displayed as active when the content it links to is visible in the browser window.
 *
 * @cssprop --pfe-jump-links-panel--offset You can control offset in your styling layer as well. This value can be set directly on the component inside a style attribute, e.g. style="--pfe-jump-links-panel--offset: 100;" or using the appropriate selector in another file. Please note that adding an attribute will take precedence over a css value. At the moment only integer values passed to this key are valid. No other values are supported. This means that passing "300px", "2rem","calc(100% - 12px)" will all result in JavaScript errors. You should pass a number that correlates to pixels. To read about the offset attribute, see above.
 */
@customElement('pfe-jump-links') @pfelement()
export class PfeJumpLinks extends PfeJumpLinksNav { }
