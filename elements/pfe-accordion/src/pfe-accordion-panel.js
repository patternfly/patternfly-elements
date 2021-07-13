import PFElement from "../../pfelement/dist/pfelement.js";

class PfeAccordionPanel extends PFElement {
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
    return {
      _id: {
        type: String,
        default: (el) => `${el.randomId.replace("pfe", el.tag)}`,
        prefix: false,
      },
      role: {
        type: String,
        default: "region",
        prefix: false,
      },
      // @TODO Deprecated pfe-id in 1.0
      oldPfeId: {
        type: String,
        alias: "_id",
        attr: "pfe-id",
      },
      expanded: {
        title: "Expanded",
        type: Boolean,
        default: false,
      },
      ariaLabelledby: {
        type: String,
        prefix: false,
      },
    };
  }

  constructor() {
    super(PfeAccordionPanel);
  }

  connectedCallback() {
    super.connectedCallback();

    this.setAttribute("tabindex", "-1");
  }
}

export default PfeAccordionPanel;
