import PFElement from "../pfelement/pfelement.js";

class PfeLinkList extends PFElement {
  static get tag() {
    return "pfe-link-list";
  }

  get schemaUrl() {
    return "pfe-link-list.json";
  }

  get templateUrl() {
    return "pfe-link-list.html";
  }

  get styleUrl() {
    return "pfe-link-list.scss";
  }

  // static get observedAttributes() {
  //   return [];
  // }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  constructor() {
    super(PfeLinkList, { type: PfeLinkList.PfeType });
  }
  connectedCallback() {
    super.connectedCallback();

    // Define the name of the slots
    const slots = {
      "pfe-link-list--header": "[pfe-id=\"pfe-link-list--header\"]",
      "pfe-link-list--list": "[pfe-id=\"pfe-link-list--list\"]",
    };

    // Move the content from the main and utility slots into the shadowDOM
    this._pfeClass.moveToShadowDOM(slots, this);

    [{
      class: "header",
      selector: "*",
      attributes: ["class"]
    }, {
      class: "list",
      selector: "ul",
      attributes: ["class"]
    }].forEach((section) => {
      let wrapper = this.shadowRoot.querySelector(`.pfe-link-list__${section.class}`);
      let child   = this.shadowRoot.querySelector(`.pfe-link-list__${section.class} > ${section.selector}`);
  
      // Swap the placeholder element from the template with the element provided by the lightDOM
      this._pfeClass._swapElements(wrapper, child, section.attributes);
    });
  }

  // disconnectedCallback() {}

  // attributeChangedCallback(attr, oldValue, newValue) {}
}

PFElement.create(PfeLinkList);

export default PfeLinkList;
