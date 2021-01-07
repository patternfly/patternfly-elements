import PFElement from "../../pfelement/dist/pfelement.js";
import "../../pfe-icon/dist/pfe-icon.js";

class PfeIconPanel extends PFElement {
  static get tag() {
    return "pfe-icon-panel";
  }

  get styleUrl() {
    return "pfe-icon-panel.scss";
  }

  get templateUrl() {
    return "pfe-icon-panel.html";
  }

  get schemaUrl() {
    return "pfe-icon-panel.json";
  }

  static get properties() {
    return {
      icon: {
        title: "Icon",
        type: String,
        attr: "icon",
        cascade: ["pfe-icon"]
      },
      circled: {
        title: "Circled",
        type: Boolean,
        cascade: ["pfe-icon"]
      },
      oldCircled: {
        alias: "circled",
        attr: "pfe-circled"
      },
      color: {
        title: "Color",
        type: String,
        values: [
          "complement",
          "accent",
          "lightest",
          "base",
          "darker",
          "darkest",
          "critical",
          "important",
          "moderate",
          "success",
          "info"
        ],
        default: "darker",
        cascade: ["pfe-icon"]
      },
      oldColor: {
        alias: "color",
        attr: "pfe-color"
      },
      stacked: {
        title: "Stacked",
        type: Boolean
      },
      oldStacked: {
        alias: "stacked",
        attr: "pfe-stacked"
      },
      centered: {
        title: "Centered",
        type: Boolean
      },
      oldCentered: {
        alias: "centered",
        attr: "pfe-centered"
      }
    };
  }

  constructor() {
    super(PfeIconPanel);
  }
}

PFElement.create(PfeIconPanel);

export default PfeIconPanel;
