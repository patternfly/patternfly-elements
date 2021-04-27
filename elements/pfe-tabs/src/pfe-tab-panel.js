import PFElement from "../../pfelement/dist/pfelement.js";

const TAB_PANEL_MUTATION_CONFIG = {
  childList: true,
  subtree: true
};

class PfeTabPanel extends PFElement {
  static get tag() {
    return "pfe-tab-panel";
  }

  get styleUrl() {
    return "pfe-tab-panel.scss";
  }

  get templateUrl() {
    return "pfe-tab-panel.html";
  }

  static get properties() {
    return {
      selected: {
        title: "Selected tab",
        type: Boolean,
        default: false,
        attr: "aria-selected",
        observer: "_selectedHandler"
      },
      hidden: {
        title: "Visibility",
        type: Boolean,
        default: false
      },
      role: {
        type: String,
        default: "tabpanel"
      },
      tabindex: {
        type: Number,
        default: 0
      },
      labelledby: {
        type: String,
        attr: "aria-labelledby"
      },
      variant: {
        title: "Variant",
        type: String,
        enum: ["wind", "earth"]
      },
      // @TODO: Deprecated in 1.0
      oldPfeId: {
        type: String,
        attr: "pfe-id",
        observer: "_oldPfeIdChanged"
      }
    };
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }

  constructor() {
    super(PfeTabPanel, { type: PfeTabPanel.PfeType });

    this._init = this._init.bind(this);
    this._observer = new MutationObserver(this._init);
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.hasLightDOM()) this._init();
    this._observer.observe(this, TAB_PANEL_MUTATION_CONFIG);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._observer.disconnect();
  }

  _init() {
    if (window.ShadyCSS) this._observer.disconnect();

    // If an ID is not defined, generate a random one
    if (!this.id) this.id = this.randomId;

    // Force role to be set to tab
    this.role = "tabpanel";

    if (this.previousElementSibling && this.previousElementSibling.selected !== "true") {
      this.hidden = true;
    }

    if (window.ShadyCSS) this._observer.observe(this, TAB_PANEL_MUTATION_CONFIG);
  }

  _oldPfeIdChanged(oldVal, newVal) {
    if (!this.id) this.id = newVal;
  }
}

export default PfeTabPanel;
