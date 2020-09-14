import PFElement from "../../pfelement/dist/pfelement.js";
import PfeAccordion from "../../pfe-accordion/dist/pfe-accordion.js";

class PfeNavigationMain extends PFElement {
  static get tag() {
    return "pfe-navigation-main";
  }

  get templateUrl() {
    return "pfe-navigation-main.html";
  }

  get styleUrl() {
    return "pfe-navigation-main.scss";
  }

  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }

  constructor() {
    super(PfeNavigationMain, { type: PfeNavigationMain.PfeType });

    this._init = this._init.bind(this);
    this._observer = new MutationObserver(this._init);

    this._desktop = this.shadowRoot.querySelector(`.${this.tag}__desktop`);
    this._mobile = this.shadowRoot.querySelector(`.${this.tag}__mobile`);
    this._mobileTemplate = this.shadowRoot.querySelector("#accordion-item");
  }

  connectedCallback() {
    super.connectedCallback();

    // Initialize the mobile view
    this._init();

    // Add a slotchange listener to the lightDOM trigger
    this.addEventListener("slotchange", this._init);
  }

  disconnectedCallback() {
    this.removeEventListener("slotchange", this._init);
  }

  get horizontal() {
    return this.hasAttribute("horizontal");
  }

  set horizontal(bool) {
    bool = Boolean(bool);

    if (bool) {
      this.setAttribute("horizontal", "");
      if (this._desktop) this._desktop.removeAttribute("hidden");
      if (this._mobile) this._mobile.setAttribute("hidden", "");
    } else {
      this.removeAttribute("horizontal");
      if (this._desktop) this._desktop.setAttribute("hidden", "");
      if (this._mobile) this._mobile.removeAttribute("hidden");
    }
  }

  _init() {
    // Get all the nested navigation items
    this.navItems = [...this.querySelectorAll("pfe-navigation-item")];

    // Ensure the necessary a11y is set
    this.setAttribute("role", "navigation");
    this.setAttribute("aria-label", "Main");

    let fragment = new DocumentFragment();

    // For each nested navigation item, tag it with context
    this.navItems.forEach(item => {
      // Build the accordion for mobile by cloning the template
      let clone = this._mobileTemplate.content.cloneNode(true);

      // Build the header
      let header = clone.querySelector("pfe-accordion-header");
      // Clone the trigger, the slot itself typically has the h-level tag
      let trigger = item.querySelector("[slot=trigger]").cloneNode(true);
      // Remove the slot attribute
      trigger.removeAttribute("slot");

      // TODO - build a mutation observer to watch the header and panels separately?
      header.appendChild(trigger);

      //-- Build the panel

      // Capture the tray element
      const tray = item.querySelector("[slot=tray]");
      let panel = clone.querySelector("pfe-accordion-panel");
      if (tray) {
        panel.innerHTML = tray.innerHTML;
      } else {
        header.setAttribute("is-direct-link", "");
      }

      // Attach the header to the clone
      clone.appendChild(header);

      if (tray) {
        // Attach the panel to the clone
        clone.appendChild(panel);
      }

      // Attach the clone to the fragment
      fragment.appendChild(clone);
    });

    // Attach the accordion items once
    this._mobile.appendChild(fragment);
  }
}

export default PfeNavigationMain;
