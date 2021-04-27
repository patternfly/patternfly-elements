import PFElement from "../../pfelement/dist/pfelement.js";

class PfePageStatus extends PFElement {
  static get tag() {
    return "pfe-page-status";
  }

  get schemaUrl() {
    return "pfe-page-status.json";
  }

  get templateUrl() {
    return "pfe-page-status.html";
  }

  get styleUrl() {
    return "pfe-page-status.scss";
  }

  static get properties() {
    return {
      status: {
        title: "Status",
        type: String,
        values: [
          "default",
          "moderate",
          "warning",
          "important",
          "critical",
          "success",
          "info",
          "normal",
          "accent",
          "complement"
        ],
        default: "default"
      },
      // @TODO: Deprecated in 1.0
      oldStatus: {
        alias: "status",
        attr: "pfe-status"
      }
    };
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  constructor() {
    super(PfePageStatus);
  }
}

PFElement.create(PfePageStatus);

export default PfePageStatus;
