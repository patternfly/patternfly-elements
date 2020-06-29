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
    return ["pfe-navigation-state"];
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

    const webComponent = this;

    // Add a slotchange listener to the lightDOM trigger
    // this.search.addEventListener("slotchange", this._init);

    // Add a slotchange listener to the lightDOM trigger
    // this.customlinks.addEventListener("slotchange", this._init);

    const dropdownTrayItemToggle = event => {
      // @todo Make sure other things aren't open, including other trays
      const dropdownTrayItem = event.target;
      if (dropdownTrayItem.getAttribute("aria-expanded") == "true") {
        dropdownTrayItem.setAttribute("aria-expanded", "false");
        dropdownTrayItem.parentElement.classList.remove(
          "pfe-navigation__menu-item--open"
        );
      } else {
        dropdownTrayItem.setAttribute("aria-expanded", "true");
        dropdownTrayItem.parentElement.classList.add(
          "pfe-navigation__menu-item--open"
        );
      }
    };

    // Add menu tray toggle behavior
    const dropdownTrayItems = this.shadowRoot.querySelectorAll(
      '.pfe-navigation__menu-link[aria-haspopup="true"]'
    );
    for (let index = 0; index < dropdownTrayItems.length; index++) {
      const dropdownTrayItem = dropdownTrayItems[index];
      dropdownTrayItem.addEventListener("click", dropdownTrayItemToggle);
    }

    // Add menu burger behavior
    const menuToggle = this.shadowRoot.querySelector(
      ".pfe-navigation__menu-toggle"
    );
    menuToggle.addEventListener("click", () => {
      const isOpen =
        webComponent.hasAttribute("pfe-navigation-state", "main-menu-open") &&
        webComponent.getAttribute("pfe-navigation-state") === "main-menu-open";

      if (isOpen) {
        webComponent.setAttribute("pfe-navigation-state", "");
      } else {
        webComponent.setAttribute("pfe-navigation-state", "main-menu-open");
      }
    });

    // Add search toggle behavior
    const searchToggle = this.shadowRoot.querySelector(
      ".pfe-navigation__search-toggle"
    );
    searchToggle.addEventListener("click", () => {
      const isOpen =
        webComponent.hasAttribute("pfe-navigation-state", "search-open") &&
        webComponent.getAttribute("pfe-navigation-state") === "search-open";

      if (isOpen) {
        webComponent.setAttribute("pfe-navigation-state", "");
      } else {
        webComponent.setAttribute("pfe-navigation-state", "search-open");
      }
    });

    // Add All Red Hat toggle behavior
    const allRedHat = this.shadowRoot.querySelector(
      ".pfe-navigation__all-red-hat-toggle"
    );
    allRedHat.addEventListener("click", () => {
      const isOpen =
        webComponent.hasAttribute("pfe-navigation-state", "all-red-hat-open") &&
        webComponent.getAttribute("pfe-navigation-state") ===
          "all-red-hat-open";

      if (isOpen) {
        webComponent.setAttribute("pfe-navigation-state", "");
      } else {
        webComponent.setAttribute("pfe-navigation-state", "all-red-hat-open");
      }
    });
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

    // Prettier makes this section significantly less legible because of line length
    const shadowWrapper = this.shadowRoot.getElementById(
      "pfe-navigation__wrapper"
    );
    const shadowMenuWrapper = this.shadowRoot.getElementById(
      "pfe-navigation__menu-wrapper"
    );
    const shadowLogo = this.shadowRoot.getElementById(
      "pfe-navigation__logo-wrapper"
    );
    const lightLogo = this.querySelector("#pfe-navigation__logo-wrapper");
    const shadowMenu = this.shadowRoot.getElementById("pfe-navigation__menu");
    const lightMenu = this.querySelector("#pfe-navigation__menu");

    // Add the menu to the correct part of the shadowDom
    if (shadowMenu) {
      shadowMenuWrapper.replaceChild(lightMenu, shadowMenu);
      // @todo re-attach events
    } else {
      shadowMenuWrapper.prepend(lightMenu);
    }

    // Add the logo to the correct part of the shadowDom
    if (shadowLogo) {
      shadowWrapper.replaceChild(lightLogo, shadowLogo);
      // @todo re-attach events
    } else {
      shadowWrapper.prepend(lightLogo);
    }

    // this.childNodes.forEach(childNode => {
    //   const cloneNode = childNode.cloneNode(true);
    //   if (
    //     cloneNode.nodeType !== Node.TEXT_NODE &&
    //     !cloneNode.hasAttribute("slot")
    //   ) {
    //     newContentWrapper.append(cloneNode);
    //   }
    // });

    // if (oldContentWrapper) {
    //   shadowWrapper.replaceChild(newContentWrapper, oldContentWrapper);
    // } else {
    //   shadowWrapper.append(newContentWrapper);
    // }
    // newContentWrapper.setAttribute("id", "content");

    // Reconnecting mutationObserver for IE11 & Edge
    if (window.ShadyCSS) {
      this._observer.observe(this, lightDomObserverConfig);
    }
  }
}

PFElement.create(PfeNavigation);

export default PfeNavigation;
