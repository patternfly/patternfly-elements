import { PfeCollapsePanel } from "../../pfe-collapse/dist/pfe-collapse.js";

class PfeAccordionPanel extends PfeCollapsePanel {
  static get tag() {
    return "pfe-accordion-panel";
  }

  get styleUrl() {
    return "pfe-accordion-panel.scss";
  }

  get html() {
    return `
  <div id="container" class="pf-c-accordion__expanded-content">
    <slot></slot>
  </div>`;
  }

  constructor() {
    super(PfeAccordionPanel);
  }
}

export default PfeAccordionPanel;
