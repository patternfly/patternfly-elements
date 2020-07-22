import PFElement from "../../pfelement/dist/pfelement.js";

// @todo Figure out cooler way to include these utilty functions
/**
 * Optimized resize handler
 * @see https://wiki.developer.mozilla.org/en-US/docs/Web/API/Window/resize_event$revision/1380246
 *
 * @example
 *     optimizedResize.add(() => console.log('Resource conscious resize callback!'));
 */
const optimizedResize = (function() {
  let callbacks = [],
    running = false;
  // Fired on resize event
  const onResize = () => {
    if (!running) {
      running = true;
      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(runCallbacks);
      } else {
        setTimeout(runCallbacks, 66);
      }
    }
  };

  // Run the callbacks
  const runCallbacks = () => {
    callbacks.forEach(function(callback) {
      callback();
    });
    running = false;
  };

  // Adds callback to loop
  const addCallback = callback => {
    if (callback) {
      callbacks.push(callback);
    }
  };

  return {
    // Public method to add additional callback
    add: function add(callback) {
      if (!callbacks.length) {
        window.addEventListener("resize", onResize);
      }
      addCallback(callback);
    }
  };
})();

/**
 * Debounce helper
 * @see https://codeburst.io/throttling-and-debouncing-in-javascript-b01cad5c8edf
 *
 * @example
 *     debounce(
 *       () => console.log('debounced'),
 *       3000
 *     );
 */
const debounce = (func, delay) => {
  let inDebounce;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
  };
};

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
    this._customlinks = this.shadowRoot.querySelector(`.${this.tag}__customlinks`);

    this.menuToggle = this.shadowRoot.querySelector(".pfe-navigation__menu-toggle");

    // Set default breakpoints to null (falls back to CSS)
    this.menuBreakpoints = {
      secondaryLinks: null,
      mainMenu: null
    };

    // Ensure 'this' is tied to the component object in these member functions
    this.isOpen = this.isOpen.bind(this);
    this._toggleNavigationState = this._toggleNavigationState.bind(this);
    this.isNavigationMobileStyle = this.isNavigationMobileStyle.bind(this);
    this._processLightDom = this._processLightDom.bind(this);
    this._menuToggleEventListener = this._menuToggleEventListener.bind(this);
    this._searchToggleEventListener = this._searchToggleEventListener.bind(this);
    this._allRedHatToggleEventListener = this._allRedHatToggleEventListener.bind(this);
    this._dropDownItemToggle = this._dropDownItemToggle.bind(this);
    this._addMenuBreakpoints = this._addMenuBreakpoints.bind(this);
    this._collapseMainMenu = this._collapseMainMenu.bind(this);
    this._collapseSecondaryLinks = this._collapseSecondaryLinks.bind(this);
    this._getDropdownHeights = this._getDropdownHeights.bind(this);

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
      // Only checks for prefix so if main-menu is queried and main-menu__dropdown--Link-Name is open it still evaluates as true
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
    return this.shadowRoot.querySelector(".pfe-navigation__menu-toggle").offsetParent !== null;
  }

  /**
   * Manages pfe-navigation-state and returns if item is open
   * @param {string} toggleId Id to use in pfe-navigation-state param
   * @return {boolean} Whether or not it's open
   */
  _toggleNavigationState(toggleId) {
    const navigationState = this.getAttribute(`${this.tag}-state`);
    const shadowDOMOuterWrapper = this.shadowRoot.getElementById("pfe-navigation__wrapper");
    const isOpen = this.isOpen(toggleId);

    // Shut any open dropdowns
    if (navigationState && navigationState.startsWith("main-menu__dropdown")) {
      const activeDropdown = this.shadowRoot.querySelector(".pfe-navigation__menu-item--open");

      activeDropdown.querySelector(".pfe-navigation__menu-link").setAttribute("aria-expanded", "false");
      activeDropdown.classList.remove("pfe-navigation__menu-item--open");
    }

    if (isOpen) {
      // If we're dealing with a section in a burger menu
      if (toggleId.startsWith("main-menu__") && this.isNavigationMobileStyle()) {
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

    // Clone state attribute inside of Shadow DOM to avoid compound :host() selectors
    shadowDOMOuterWrapper.setAttribute(`${this.tag}-state`, this.getAttribute(`${this.tag}-state`));
    return !isOpen;
  }

  /**
   * Handle initialization or changes in light DOM
   * Clone them into the shadowRoot
   * @param {array} mutationList Provided by mutation observer
   */
  _processLightDom(mutationList) {
    // If we're mutating because an attribute on the web component starting with pfe- changed, don't reprocess dom
    let cancelLightDomProcessing = true;
    let componentClassesChange = false;

    if (mutationList) {
      for (let index = 0; index < mutationList.length; index++) {
        const mutationItem = mutationList[index];
        if (mutationItem.target.tagName !== "PFE-NAVIGATION") {
          if (!mutationItem.attributeName.startsWith("pfe-")) {
            // If it's a pfe- attribute, assume we don't need to process the light dom
            cancelLightDomProcessing = false;
          }
        } else if (mutationItem.type === "attributes" && mutationItem.attributeName === "class") {
          componentClassesChange = true;
        }
      }
    } else {
      // If there isn't a mutationList it's because this is on init
      cancelLightDomProcessing = false;
    }

    // Preventing issues in IE11 & Edge
    if (window.ShadyCSS) {
      this._observer.disconnect();
    }

    // Handle class updates to the parent component
    // Copying them to shadow DOM to avoid compound :host() selectors
    if (componentClassesChange) {
      const shadowDOMOuterWrapper = this.shadowRoot.getElementById("pfe-navigation__wrapper");
      shadowDOMOuterWrapper.setAttribute("class", `pfe-navigation__wrapper ${this.getAttribute("class")}`);
    }

    if (cancelLightDomProcessing) {
      // Reconnecting mutationObserver for IE11 & Edge
      if (window.ShadyCSS) {
        this._observer.observe(this, lightDomObserverConfig);
      }
      return;
    }

    // Begins the wholesale replacement of the shadowDOM -------------------------------
    if (document.domain === "localhost") {
      // Leaving this so we spot when the shadowDOM is being replaced when it shouldn't be
      // But don't want it firing in prod
      console.log("replacing shadow DOM", mutationList);
    }
    // Prettier makes this section significantly less legible because of line length
    // @todo look into only replacing markup that changed via mutationList
    const shadowWrapper = this.shadowRoot.getElementById("pfe-navigation__wrapper");
    const shadowMenuWrapper = this.shadowRoot.getElementById("pfe-navigation__menu-wrapper");
    const shadowLogo = this.shadowRoot.getElementById("pfe-navigation__logo-wrapper");
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

    // Add menu dropdown toggle behavior
    const dropDownItems = this.shadowRoot.querySelectorAll('.pfe-navigation__menu-link[aria-haspopup="true"]');
    for (let index = 0; index < dropDownItems.length; index++) {
      const dropDownItem = dropDownItems[index];
      dropDownItem.dataset.machineName = this._createMachineName(dropDownItem.text);
      dropDownItem.addEventListener("click", this._dropDownItemToggle);
    }

    // Add menu burger behavior
    this.menuToggle.addEventListener("click", this._menuToggleEventListener);

    // Add search toggle behavior
    const searchToggle = this.shadowRoot.querySelector(".pfe-navigation__search-toggle");
    searchToggle.addEventListener("click", this._searchToggleEventListener);

    // Add All Red Hat toggle behavior
    const allRedHat = this.shadowRoot.querySelector(".pfe-navigation__all-red-hat-toggle");

    allRedHat.addEventListener("click", this._allRedHatToggleEventListener);

    // Give all dropdowns aria-hidden since they're shut by default
    this.shadowRoot.querySelector(".pfe-navigation__dropdown-wrapper").setAttribute("aria-hidden", true);

    // Reconnecting mutationObserver for IE11 & Edge
    if (window.ShadyCSS) {
      this._observer.observe(this, lightDomObserverConfig);
    }

    if (!this.isNavigationMobileStyle()) {
      // Timeout lets this run when there's a spare cycle
      window.setTimeout(this._addMenuBreakpoints, 0); // @todo ask Kyle if this is a cool kid thing
      window.setTimeout(this._getDropdownHeights, 0);
    }
  }

  /**
   * Calculate the points where the main menu and secondary links should be collapsed and adds them
   */
  _addMenuBreakpoints() {
    const navigation = this.shadowRoot.getElementById("pfe-navigation__menu");
    const navigationBoundingRect = navigation.getBoundingClientRect();
    // Gets the length from the left edge of the screen to the right side of the navigation
    const navigationSpaceNeeded = Math.ceil(navigationBoundingRect.right);

    let leftMostSecondaryLink = this.shadowRoot.querySelector(".pfe-navigation__search-toggle");
    // @todo if Search isn't present, check for custom links, if that isn't present use All Red Hat

    const leftMostSecondaryLinkBoundingRect = leftMostSecondaryLink.getBoundingClientRect();
    // Gets the length from the right edge of the screen to the left side of the left most secondary link
    const secondaryLinksSpaceNeeded = window.innerWidth - Math.ceil(leftMostSecondaryLinkBoundingRect.left);

    const logoWrapper = this.shadowRoot.getElementById("pfe-navigation__logo-wrapper");
    const logoBoundingRect = logoWrapper.getBoundingClientRect();
    const logoSpaceNeeded = Math.ceil(logoBoundingRect.right);

    // console.log(navigationSpaceNeeded, secondaryLinksSpaceNeeded, navigationSpaceNeeded && secondaryLinksSpaceNeeded)

    if (navigationSpaceNeeded && secondaryLinksSpaceNeeded && logoSpaceNeeded) {
      // 8px is spacing between menu items at desktop
      // console.log(navigationSpaceNeeded, secondaryLinksSpaceNeeded, logoSpaceNeeded);
      this.menuBreakpoints.mainMenu = navigationSpaceNeeded + secondaryLinksSpaceNeeded + 8;
      // 60px is the width of the menu burger + some extra space
      this.menuBreakpoints.secondaryLinks = logoSpaceNeeded + secondaryLinksSpaceNeeded + 60;

      // console.log('adding breakpoints', this.menuBreakpoints);
      const mainMenuBreakpoint = window.matchMedia(`(max-width: ${this.menuBreakpoints.mainMenu}px)`);
      mainMenuBreakpoint.addListener(this._collapseMainMenu);

      const secondaryLinksBreakpoint = window.matchMedia(`(max-width: ${this.menuBreakpoints.secondaryLinks}px)`);
      secondaryLinksBreakpoint.addListener(this._collapseSecondaryLinks);
    }
  }
  /**
   * Caches the heights of the dropdowns for animation
   */
  _getDropdownHeights() {
    const dropdowns = this.shadowRoot.querySelectorAll(".pfe-navigation__dropdown");
    for (let index = 0; index < dropdowns.length; index++) {
      const dropdown = dropdowns[index];
      const dropdownHeight = dropdown.offsetHeight;
      dropdown.parentElement.dataset.height = dropdownHeight;
      // console.log(dropdown, dropdownHeight);
    }
  }

  /**
   * Behavior for main menu breakpoint
   * @param {object} event Event from MediaQueryList
   */
  _collapseMainMenu(event) {
    if (event.matches) {
      this.classList.add("pfe-navigation--collapse-main-menu");
    } else {
      this.classList.remove("pfe-navigation--collapse-main-menu");
    }
  }

  /**
   * Behavior for secondary links breakpoint
   * @param {object} event Event from MediaQueryList
   */
  _collapseSecondaryLinks(event) {
    if (event.matches) {
      this.classList.add("pfe-navigation--collapse-secondary-links");
    } else {
      this.classList.remove("pfe-navigation--collapse-secondary-links");
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

  _dropDownItemToggle(event) {
    const dropDownItem = event.target;
    const machineName = dropDownItem.dataset.machineName;
    const toggleId = `main-menu__dropdown--${machineName}`;
    const dropDownWrapper = dropDownItem.parentElement.querySelector(".pfe-navigation__dropdown-wrapper");

    // Don't navigate
    event.preventDefault();

    // Toggle state and manage attributes for a11y and styling
    if (this._toggleNavigationState(toggleId)) {
      dropDownItem.setAttribute("aria-expanded", "true");
      // Manage class on parent li so it's easier to style any child that needs style updates
      dropDownItem.parentElement.classList.add("pfe-navigation__menu-item--open");
      dropDownWrapper.setAttribute("aria-hidden", false);
      if (!this.isNavigationMobileStyle() && parseInt(dropDownWrapper.dataset.height) > 30) {
        dropDownWrapper.style.setProperty("height", `${dropDownWrapper.dataset.height}px`);
      }
    } else {
      dropDownItem.setAttribute("aria-expanded", "false");
      dropDownItem.parentElement.classList.remove("pfe-navigation__menu-item--open");
      dropDownWrapper.setAttribute("aria-hidden", true);
      if (dropDownWrapper.hasAttribute("style")) {
        dropDownWrapper.style.removeProperty("height");
      }
    }
  }
}

PFElement.create(PfeNavigation);

export default PfeNavigation;
