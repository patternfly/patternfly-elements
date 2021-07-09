import PFElement from "../../pfelement/dist/pfelement.js";

import PfeJumpLinksNav from "./pfe-jump-links-nav.js";
import PfeJumpLinksPanel from "./pfe-jump-links-panel.js";

// @TODO Migrate pfe-jump-links-nav to pfe-jump-links in 2.0?
// class PfeJumpLinks extends PfeJumpLinksNav {
//     static get tag() {
//       return "pfe-jump-links";
//     }
// }
// PFElement.create(PfeJumpLinks);

PFElement.create(PfeJumpLinksNav);
PFElement.create(PfeJumpLinksPanel);

export default { PfeJumpLinksNav, PfeJumpLinksPanel };
