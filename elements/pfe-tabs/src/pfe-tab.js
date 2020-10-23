import PFElement from "../../pfelement/dist/pfelement.js";

class PfeTab extends PFElement {
  static get tag() {
    return "pfe-tab";
  }

  get styleUrl() {
    return "pfe-tab.scss";
  }

  get templateUrl() {
    return "pfe-tab.html";
  }

  static get properties() {
    return {
      selected: {
        title: "Selected tab",
        type: Boolean,
        default: false,
        attr: "aria-selected",
        observer: "_selectedHandler"
      }
    };
  }

  constructor() {
    super(PfeTab);

    this._tabItem;
    this._init = this._init.bind(this);
    this._setTabContent = this._setTabContent.bind(this);
    this._observer = new MutationObserver(this._init);
  }

  connectedCallback() {
    super.connectedCallback();

    this._tabItem = this.shadowRoot.querySelector(`.${this.tag}`);

    if (this.children.length || this.textContent.trim().length) {
      this._init();
    }

    this._observer.observe(this, TAB_CONTENT_MUTATION_CONFIG);
  }

  _selectedHandler() {
    this.setAttribute("tabindex", this.selected ? 0 : -1);
  }

  disconnectedCallback() {
    this._observer.disconnect();
  }

  _init() {
    if (window.ShadyCSS) {
      this._observer.disconnect();
    }

    // Copy the tab content into the template
    this._setTabContent();

    if (!this.id) {
      this.id = `${PfeTab.tag}-${generateId()}`;
    }

    if (this.getAttribute("role") !== "tab") {
      this.setAttribute("role", "tab");
    }

    if (!this.hasAttribute("aria-selected")) {
      this.setAttribute("aria-selected", "false");
    }

    if (!this.hasAttribute("tabindex")) {
      this.setAttribute("tabindex", -1);
    }

    if (this.parentNode.hasAttribute("vertical")) {
      this.setAttribute("vertical", "");
    }

    if (window.ShadyCSS) {
      this._observer.observe(this, TAB_CONTENT_MUTATION_CONFIG);
    }
  }

  _setTabContent() {
    // Copy the tab content into the template
    const label = this.textContent.trim().replace(/\s+/g, " ");

    if (!label) {
      console.warn(`${this.tag}: There does not appear to be any content in the tab region.`);
      return;
    }

    let semantics = "";
    // Get the semantics of the content
    if (this.children.length > 0) {
      // We only care about the first child that is a tag
      if (this.firstElementChild && this.firstElementChild.tagName.match(/^H[1-6]/)) {
        semantics = this.firstElementChild.tagName.toLowerCase();
      }
    }

    // Create an h-level tag for the shadow tab, default h3
    let heading = document.createElement("h3");

    // Use the provided semantics if provided
    if (semantics.length > 0) {
      heading = document.createElement(semantics);
    }

    // Assign the label content to the new heading
    heading.textContent = label;

    // Attach the heading to the tabItem
    this._tabItem.innerHTML = "";
    this._tabItem.appendChild(heading);
  }
}

export default PfeTab;
