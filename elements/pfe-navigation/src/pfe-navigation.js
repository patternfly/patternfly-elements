import PFElement from "../../pfelement/dist/pfelement.js";

// Config for mutation observer to see if things change inside of the component
const lightDomObserverConfig = {
  characterData: true,
  attributes: true,
  subtree: true,
  childList: true
};

class PfeNavigation extends PFElement {
  static get tag() {
    return "pfe-navigation";
  }

  get schemaUrl() {
    return "pfe-navigation.json";
  }

  get templateUrl() {
    return "pfe-navigation.html";
  }

  get styleUrl() {
    return "pfe-navigation.scss";
  }

  // static get events() {
  //   return {
  //   };
  // }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Combo;
  }

  static get observedAttributes() {
    return ["pfe-state"];
  }

  constructor() {
    super(PfeNavigation, { type: PfeNavigation.PfeType });

    this._search = this.shadowRoot.querySelector(`.${this.tag}__search`);
    this._customlinks = this.shadowRoot.querySelector(
      `.${this.tag}__customlinks`
    );

    // Ensure 'this' is tied to the component object in these member functions
    this._processLightDom = this._processLightDom.bind(this);

    // Setup mutation observer to watch for content changes
    this._observer = new MutationObserver(this._processLightDom);
  }

  connectedCallback() {
    super.connectedCallback();
    // If you need to initialize any attributes, do that here

    this._processLightDom();

    this._observer.observe(this, lightDomObserverConfig);

    this.search = this.querySelector(`[slot="${this.tag}--search"]`);
    this.customlinks = this.querySelector(`[slot="${this.tag}--customlinks"]`);

    // Add a slotchange listener to the lightDOM trigger
    // this.search.addEventListener("slotchange", this._init);

    // Add a slotchange listener to the lightDOM trigger
    // this.customlinks.addEventListener("slotchange", this._init);

    const dropdownTrayItemToggle = event => {
      const dropdownTrayItem = event.target;
      if (dropdownTrayItem.getAttribute("aria-expanded") == "true") {
        dropdownTrayItem.setAttribute("aria-expanded", "false");
      } else {
        dropdownTrayItem.setAttribute("aria-expanded", "true");
      }
    };

    const dropdownTrayItems = this.shadowRoot.querySelectorAll(
      '.pfe-navigation__menu-link[aria-haspopup="true"]'
    );
    for (let index = 0; index < dropdownTrayItems.length; index++) {
      const dropdownTrayItem = dropdownTrayItems[index];
      dropdownTrayItem.addEventListener("click", dropdownTrayItemToggle);
    }
  }

  disconnectedCallback() {}

  // Process the attribute change
  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(attr, oldValue, newValue);
  }

  /**
   * Handle initialization or changes in light DOM
   * Clone them into the shadowRoot
   */
  _processLightDom() {
    // Preventing issues in IE11 & Edge
    if (window.ShadyCSS) {
      this._observer.disconnect();
    }

    const shadowWrapper = this.shadowRoot.getElementById("wrapper"),
      oldContentWrapper = this.shadowRoot.getElementById("content"),
      // An element that light dom content will be put into and replaces the shadowWrapper at the end
      newContentWrapper = document.createElement("div");

    this.childNodes.forEach(childNode => {
      const cloneNode = childNode.cloneNode(true);
      if (
        cloneNode.nodeType !== Node.TEXT_NODE &&
        !cloneNode.hasAttribute("slot")
      ) {
        newContentWrapper.append(cloneNode);
      }
    });

    if (oldContentWrapper) {
      shadowWrapper.replaceChild(newContentWrapper, oldContentWrapper);
    } else {
      shadowWrapper.append(newContentWrapper);
    }
    newContentWrapper.setAttribute("id", "content");

    // Reconnecting mutationObserver for IE11 & Edge
    if (window.ShadyCSS) {
      this._observer.observe(this, lightDomObserverConfig);
    }
  }
}

PFElement.create(PfeNavigation);

export default PfeNavigation;
