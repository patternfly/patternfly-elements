import PFElement from "../../pfelement/dist/pfelement.js";

import PfeJumpLinksNav from "./pfe-jump-links-nav.js";
import PfeJumpLinksPanel from "./pfe-jump-links-panel.js";

// @TODO: Deprecate the parent wrapper?
class PfeJumpLinks extends PFElement {
  static get tag() {
    return "pfe-jump-links";
  }

  get schemaUrl() {
    return "pfe-jump-links.json";
  }

  get templateUrl() {
    return "pfe-jump-links.html";
  }

  get styleUrl() {
    return "pfe-jump-links.scss";
  }

  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  constructor() {
    super(PfeJumpLinks, { type: PfeJumpLinks.PfeType });
  }
}

PFElement.create(PfeJumpLinksPanel);
PFElement.create(PfeJumpLinksNav);
PFElement.create(PfeJumpLinks);

export default PfeJumpLinks;
