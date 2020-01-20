import PFElement from "../../pfelement/dist/pfelement.js";

class PfeBurgerButton extends PFElement {
  static get tag() {
    return "pfe-burger-button";
  }

  get templateUrl() {
    return "pfe-burger-button.html";
  }

  get styleUrl() {
    return "pfe-burger-button.scss";
  }

  // static get observedAttributes() {
  //   return [];
  // }

  constructor() {
    super(PfeBurgerButton);
  }

  connectedCallback() {
    super.connectedCallback();

    // Add click listener to burger button
    const button = this.shadowRoot.querySelector('button');
    if (button !== null) {
      button.addEventListener('click', () => {
        if (button.hasAttribute('pfe-active')) {
          button.removeAttribute('pfe-active');
        }
        else {
          button.setAttribute('pfe-active', 'true');
        }
      });
    }
  }

  // disconnectedCallback() {}

  // attributeChangedCallback(attr, oldValue, newValue) {}
}

PFElement.create(PfeBurgerButton);

export default PfeBurgerButton;
