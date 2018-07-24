import RHElement from "../rhelement/rhelement.js";

class RhDropdownMenu extends RHElement {
  static get tag() {
    return "rh-dropdown-menu";
  }

  get styleUrl() {
    return "rh-dropdown-menu.scss";
  }

  get templateUrl() {
    return "rh-dropdown-menu.html";
  }

  constructor() {
    super(RhDropdownMenu.tag);
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

RHElement.create(RhDropdownMenu);
