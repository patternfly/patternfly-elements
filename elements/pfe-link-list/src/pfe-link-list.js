import PFElement from "../pfelement/pfelement.js";

class PfeLinkList extends PFElement {
  static get tag() {
    return "pfe-link-list";
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

  constructor() {
    super(PfeLinkList);
  }
  connectedCallback() {
    super.connectedCallback();
    // Define the name of the slots
     const slots = {
       header: "pfe-link-list--header",
       list: "pfe-link-list--list"
     };
     // Copy the content of the main and utility slots into the ShadowDOM
     Object.values(slots).forEach(slotName => {
       const fraggle = document.createDocumentFragment();
       // Get the content and the slots
       const contents = [...this.querySelectorAll(`[slot="${slotName}"]`)];
       const slot = this.shadowRoot.querySelector(`[name="${slotName}"]`);
       console.log(contents);
       console.log(fraggle);
       contents.forEach(content => {
         fraggle.appendChild(content);
       });
       // If the slot and contents exist, append the fragment to the DOM
       if (slot && contents.length) {
         slot.appendChild(fraggle);
       }
     });
  }

  // disconnectedCallback() {}

  // attributeChangedCallback(attr, oldValue, newValue) {}
}

PFElement.create(PfeLinkList);

export default PfeLinkList;
