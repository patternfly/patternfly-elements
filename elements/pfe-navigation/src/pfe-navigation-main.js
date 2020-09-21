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
}

export default PfeNavigationMain;
