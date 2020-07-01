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
    return [`${this.tag}-state`];
  }

  constructor() {
    super(PfeNavigation, { type: PfeNavigation.PfeType });

    this._search = this.shadowRoot.querySelector(`.${this.tag}__search`);
    this._customlinks = this.shadowRoot.querySelector(
      `.${this.tag}__customlinks`
    );

    this.menuToggle = this.shadowRoot.querySelector(
      ".pfe-navigation__menu-toggle"
    );

    // Ensure 'this' is tied to the component object in these member functions
    this.isOpen = this.isOpen.bind(this);
    this._toggleNavigationState = this._toggleNavigationState.bind(this);
    this.isNavigationMobileStyle = this.isNavigationMobileStyle.bind(this);
    this._processLightDom = this._processLightDom.bind(this);
    this._menuToggleEventListener = this._menuToggleEventListener.bind(this);
    this._searchToggleEventListener = this._searchToggleEventListener.bind(
      this
    );
    this._allRedHatToggleEventListener = this._allRedHatToggleEventListener.bind(
      this
    );
    this._dropdownTrayItemToggle = this._dropdownTrayItemToggle.bind(this);

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
  }

  disconnectedCallback() {}

  // Process the attribute change
  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(attr, oldValue, newValue);
  }

  /**
   * Checks to see if anything in the menu, or if a specific part of it is open
   * @param {string} section Optional. Check if specific part of menu is open, if blank will check if anything is open
   * @return {boolean}
   */
  isOpen(section) {
    const navigationState = this.getAttribute(`${this.tag}-state`);
    if (navigationState) {
      if (typeof section === "undefined") {
        // Something is open, and a section wasn't set
        return true;
      }
      // Only checks for prefix so if main-menu is queried and main-menu__tray--Link-Name is open it still evaluates as true
      // This prevents the main-menu toggle shutting at mobile when a sub-section is opened
      return navigationState.startsWith(section);
    }
    return false;
  }

  /**
   * Create dash delimited string with no special chars for use in HTML attributes
   * @param {string} text
   * @return {string}
   */
  _createMachineName(text) {
    return text
      .replace(/[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g, "")
      .trim()
      .replace(/[\s\-]+/g, "-");
  }

  /**
   * Figures out if the mobile menu toggle (aka hamburger icon) is visible
   * @returns {boolean}
   */
  isNavigationMobileStyle() {
    // If an element's offsetParent returns null and isn't position:fixed it or a parent is display: none
    // See https://stackoverflow.com/a/21696585
    return (
      this.shadowRoot.querySelector(".pfe-navigation__menu-toggle")
        .offsetParent !== null
    );
  }

  /**
   * Manages pfe-navigation-state and returns if item is open
   * @param {string} toggleId Id to use in pfe-navigation-state param
   * @return {boolean} Whether or not it's open
   */
  _toggleNavigationState(toggleId) {
    const navigationState = this.getAttribute(`${this.tag}-state`);
    const isOpen = this.isOpen(toggleId);

    // Shut any open trays
    if (navigationState && navigationState.startsWith("main-menu__tray")) {
      const activeTray = this.shadowRoot.querySelector(
        ".pfe-navigation__menu-item--open"
      );
      activeTray
        .querySelector(".pfe-navigation__menu-link")
        .setAttribute("aria-expanded", "false");
      activeTray.classList.remove("pfe-navigation__menu-item--open");
    }

    if (isOpen) {
      // If we're dealing with a section in a burger menu
      if (
        toggleId.startsWith("main-menu__") &&
        this.isNavigationMobileStyle()
      ) {
        // Back out to main-menu
        this.setAttribute(`${this.tag}-state`, "main-menu--open");
      } else {
        // Shut it by removing state attribute
        this.removeAttribute(`${this.tag}-state`, "");
      }
    } else {
      // Open it by adding state attribute & value
      this.setAttribute(`${this.tag}-state`, `${toggleId}--open`);
    }
    return !isOpen;
  }

  /**
   * Handle initialization or changes in light DOM
   * Clone them into the shadowRoot
   * @param {array} mutationList Provided by mutation observer
   */
  _processLightDom(mutationList) {
    if (mutationList) {
      // If we're mutating because an attribute on the web component starting with pfe- changed, don't reprocess dom
      let cancelLightDomProcessing = true;
      for (let index = 0; index < mutationList.length; index++) {
        const mutationItem = mutationList[index];
        if (mutationItem.type !== "attributes") {
          cancelLightDomProcessing = false;
        } else if (!mutationItem.attributeName.startsWith("pfe-")) {
          cancelLightDomProcessing = false;
        }
      }
      if (cancelLightDomProcessing) {
        return;
      }
    }

    // Preventing issues in IE11 & Edge
    if (window.ShadyCSS) {
      this._observer.disconnect();
    }

    // Prettier makes this section significantly less legible because of line length
    // @todo look into only replacing markup that changed via mutationList
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
    if (lightMenu) {
      if (shadowMenu) {
        shadowMenuWrapper.replaceChild(lightMenu.cloneNode(true), shadowMenu);
      } else {
        shadowMenuWrapper.prepend(lightMenu.cloneNode(true));
      }
    }

    // Add the logo to the correct part of the shadowDom
    if (lightLogo) {
      if (shadowLogo) {
        shadowWrapper.replaceChild(lightLogo.cloneNode(true), shadowLogo);
      } else {
        shadowWrapper.prepend(lightLogo.cloneNode(true));
      }
    }

    // Add menu tray toggle behavior
    const dropdownTrayItems = this.shadowRoot.querySelectorAll(
      '.pfe-navigation__menu-link[aria-haspopup="true"]'
    );
    for (let index = 0; index < dropdownTrayItems.length; index++) {
      const dropdownTrayItem = dropdownTrayItems[index];
      dropdownTrayItem.setAttribute(
        "data-machine-name",
        this._createMachineName(dropdownTrayItem.text)
      );
      dropdownTrayItem.addEventListener("click", this._dropdownTrayItemToggle);
    }

    // Add menu burger behavior
    this.menuToggle.addEventListener("click", this._menuToggleEventListener);

    // Add search toggle behavior
    const searchToggle = this.shadowRoot.querySelector(
      ".pfe-navigation__search-toggle"
    );
    searchToggle.addEventListener("click", this._searchToggleEventListener);

    // Add All Red Hat toggle behavior
    const allRedHat = this.shadowRoot.querySelector(
      ".pfe-navigation__all-red-hat-toggle"
    );

    allRedHat.addEventListener("click", this._allRedHatToggleEventListener);

    // Reconnecting mutationObserver for IE11 & Edge
    if (window.ShadyCSS) {
      this._observer.observe(this, lightDomObserverConfig);
    }
  }

  /**
   * Event listeners for toggles
   */
  _menuToggleEventListener() {
    this._toggleNavigationState("main-menu");
  }

  _searchToggleEventListener() {
    this._toggleNavigationState("search");
  }

  _allRedHatToggleEventListener() {
    this._toggleNavigationState("all-red-hat");
  }

  _dropdownTrayItemToggle(event) {
    const dropdownTrayItem = event.target;
    const machineName = dropdownTrayItem.getAttribute("data-machine-name");
    const toggleId = `main-menu__tray--${machineName}`;

    // Don't navigate
    event.preventDefault();

    // Toggle state and manage attributes for a11y and styling
    if (this._toggleNavigationState(toggleId)) {
      dropdownTrayItem.setAttribute("aria-expanded", "true");
      // Manage class on parent li so it's easier to style any child that needs style updates
      dropdownTrayItem.parentElement.classList.add(
        "pfe-navigation__menu-item--open"
      );
    } else {
      dropdownTrayItem.setAttribute("aria-expanded", "false");
      dropdownTrayItem.parentElement.classList.remove(
        "pfe-navigation__menu-item--open"
      );
    }
  }
}

PFElement.create(PfeNavigation);

export default PfeNavigation;
