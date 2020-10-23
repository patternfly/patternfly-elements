import PFElement from "../../pfelement/dist/pfelement.js";

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
      }
    };
  }

  constructor() {
    super(PfeTabPanel);

    this._init = this._init.bind(this);
    this._observer = new MutationObserver(this._init);
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.hasLightDOM()) this._init();
    this._observer.observe(this, {
      childList: true,
      subtree: true
    });
  }

  disconnectedCallback() {
    this._observer.disconnect();
  }

  _init() {
    if (window.ShadyCSS) {
      this._observer.disconnect();
    }

    if (!this.id) {
      this.id = this.randomId;
    }

    if (this.previousElementSibling.getAttribute("aria-selected") !== "true") {
      this.hidden = true;
    }

    if (window.ShadyCSS) {
      this._observer.observe(this, {
        childList: true,
        subtree: true
      });
    }
  }
}

export default PfeTabPanel;
