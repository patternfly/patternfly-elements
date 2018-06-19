import Rhelement from "../rhelement/rhelement.js";

/*
 * DO NOT EDIT. This will be autopopulated with the
 * html from rh-dropdown-menu.html and css from
 * rh-dropdown-menu.css
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
