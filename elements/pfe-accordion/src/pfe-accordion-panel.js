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

  static get properties() {
    return Object.assign(PfeCollapsePanel.properties, {
      _id: {
        type: String,
        default: el => `${el.randomId.replace("pfe", el.tag)}`
      },
      // role: {
      //   type: String,
      //   default: "region"
      // },
      // @TODO Deprecated pfe-id in 1.0
      oldPfeId: {
        type: String,
        alias: "_id",
        attr: "pfe-id"
      }
      // expanded: {
      //   title: "Expanded",
      //   type: Boolean,
      //   default: false
      // },
      // ariaLabelledby: {
      //   type: String
      // }
    });
  }

  constructor() {
    super(PfeAccordionPanel);
  }
}

export default PfeAccordionPanel;
