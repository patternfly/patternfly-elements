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

    // Copy the element provided by the lightDOM to the shadowDOM
    const fragment = document.createDocumentFragment();
    [...this.children].map(child => {
      // Clone the element and all it's descendants
      const twin = child.cloneNode(true);
      if(/^(H[1-6])$/.test(twin.tagName)) {
        twin.classList.add("pfe-link-list__header");
      } else if(/^(UL)$/.test(twin.tagName)) {
        twin.classList.add("pfe-link-list__list");
      }
      fragment.appendChild(twin);
    });
    
    this.shadowRoot.appendChild(fragment);
  }

  // disconnectedCallback() {}

  // attributeChangedCallback(attr, oldValue, newValue) {}
}

PFElement.create(PfeLinkList);

export default PfeLinkList;
