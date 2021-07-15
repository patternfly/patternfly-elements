import { PfeCollapsePanel } from "../../pfe-collapse/dist/pfe-collapse.js";

class PfeAccordionPanel extends PfeCollapsePanel {
  static get tag() {
    return "pfe-accordion-panel";
  }

  get styleUrl() {
    return "pfe-accordion-panel.scss";
  }

  get templateUrl() {
    return "pfe-accordion-panel.html";
  }

  constructor() {
    super(PfeAccordionPanel);
  }
}

export default PfeAccordionPanel;
