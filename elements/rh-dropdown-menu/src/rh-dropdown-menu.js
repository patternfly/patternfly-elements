import Rhelement from "../rhelement/rhelement.js";
import "../cp-styles/cp-styles.js";

/*
 * DO NOT EDIT. This will be autopopulated with the
 * html from rhcc-freshnessgrade.html and css from
 * rhcc-freshnessgrade.css
 */
const template = document.createElement("template");
template.innerHTML = ``;
/* end DO NOT EDIT */

class RhDropdownMenu extends Rhelement {
  constructor() {
    super("rh-dropdown-menu", template);
  }

  connectedCallback() {
    const child = this.children[0];

    if (child && child.tagName == "UL") {
      this._assignMenuARIA(child);
      this.shadowRoot.appendChild(child);
    } else {
      console.warn(
        "The first child in the light DOM must be an unordered list"
      );
    }
  }

  disconnectedCallback() {}

  _assignMenuARIA(list) {
    list.setAttribute("role", "menu");
    list.setAttribute("hidden", "hidden");

    let listItems = list.childNodes;

    listItems.forEach(item => {
      if (item.nodeName == "LI") {
        item.setAttribute("role", "none");
        let achild = item.children[0];
        if (achild && achild.tagName == "A") {
          achild.setAttribute("role", "menuitem");
          achild.setAttribute("tabindex", "-1");
        }
      }
    });
  }
}

window.customElements.define("rh-dropdown-menu", RhDropdownMenu);
