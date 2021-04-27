import PFElement from "../../pfelement/dist/pfelement.js";

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
<<<<<<< HEAD
    super(PfeNavigationMain, { type: PfeNavigationMain.PfeType });
  }

  // get horizontal() {
  //   return this.hasAttribute("horizontal");
  // }

  // set horizontal(bool) {
  //   bool = Boolean(bool);

  //   if (bool) {
  //     this.setAttribute("horizontal", "");
  //     if (this._desktop) this._desktop.removeAttribute("hidden");
  //     if (this._mobile) this._mobile.setAttribute("hidden", "");
  //   } else {
  //     this.removeAttribute("horizontal");
  //     if (this._desktop) this._desktop.setAttribute("hidden", "");
  //     if (this._mobile) this._mobile.removeAttribute("hidden");
  //   }
  // }
=======
    super(PfeNavigationMain);

    this._init = this._init.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    this._init();

    // Add a slotchange listener to the lightDOM trigger
    this.addEventListener("slotchange", this._init);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("slotchange", this._init);
  }

  _init() {
    // Get all the nested navigation items
    this.navItems = [...this.querySelectorAll("pfe-navigation-item")];

    // Find the first nested element
    this.first = this.navItems.length > 0 ? this.navItems[0] : null;
    // Find the last nested element
    this.last = this.navItems[this.navItems.length - 1];

    // Ensure the necessary a11y is set
    this.setAttribute("role", "navigation");
    this.setAttribute("aria-label", "Main");

    // For each nested navigation item, tag it with context
    this.navItems.forEach(item => {
      item.nested = true;
    });

    // Tag the first and last navigation items for styling in mobile
    if (this.first) this.first.setAttribute("first", "");
    if (this.last) this.last.setAttribute("last", "");
  }
>>>>>>> 4454e8389b7d09ecd2cf1501cb3fda6e61f94020
}

export default PfeNavigationMain;
