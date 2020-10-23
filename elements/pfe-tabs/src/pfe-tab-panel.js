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

  get pfeId() {
    return this.getAttribute("pfe-id");
  }

  set pfeId(id) {
    if (!id) {
      return;
    }

    this.setAttribute("pfe-id", id);
  }

  constructor() {
    super(PfeTabPanel);

    this._init = this._init.bind(this);
    this._observer = new MutationObserver(this._init);
  }

  connectedCallback() {
    super.connectedCallback();

    this._init();
    this._observer.observe(this, TABS_MUTATION_CONFIG);
  }

  disconnectedCallback() {
    this._observer.disconnect();
  }

  _init() {
    if (window.ShadyCSS) {
      this._observer.disconnect();
    }

    if (!this.pfeId) {
      this.pfeId = `${PfeTabPanel.tag}-${generateId()}`;
    }

    if (this.getAttribute("role") !== "tabpanel") {
      this.setAttribute("role", "tabpanel");
    }

    if (!this.hasAttribute("tabindex")) {
      this.setAttribute("tabindex", 0);
    }

    if (this.previousElementSibling.getAttribute("aria-selected") !== "true") {
      this.hidden = true;
    }

    if (window.ShadyCSS) {
      this._observer.observe(this, TABS_MUTATION_CONFIG);
    }
  }
}

export default PfeTabPanel;
