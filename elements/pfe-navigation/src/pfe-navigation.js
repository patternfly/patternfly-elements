import PFElement from "../../pfelement/dist/pfelement.js";
import PfeIcon from "../../pfe-icon/dist/pfe-icon.js";
import "../../pfe-progress-indicator/dist/pfe-progress-indicator.js";

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
    return [`${this.tag}-open-toggle`];
  }

  constructor() {
    super(PfeNavigation, { type: PfeNavigation.PfeType });

    this._search = this.shadowRoot.querySelector(`.${this.tag}__search`);
    this._customlinks = this.shadowRoot.querySelector(`.${this.tag}__customlinks`);
    this._siteSwitcherWrap = this.shadowRoot.querySelector(".pfe-navigation__all-red-hat-wrapper__inner");
    this._siteSwitchLoadingIndicator = this.shadowRoot.querySelector("#site-loading");

    this.menuToggle = this.shadowRoot.querySelector(".pfe-navigation__menu-toggle");

    // Set default breakpoints to null (falls back to CSS)
    this.menuBreakpoints = {
      secondaryLinks: null,
      mainMenu: null
    };

    this.windowInnerWidth = null;
    this.mainMenuButtonVisible = null;
    this.secondaryLinksSectionCollapsed = null;

    // Ensure 'this' is tied to the component object in these member functions
    this.isOpen = this.isOpen.bind(this);
    this._changeNavigationState = this._changeNavigationState.bind(this);
    this.isMobileMenuButtonVisible = this.isMobileMenuButtonVisible.bind(this);
    this.isSecondaryLinksSectionCollapsed = this.isSecondaryLinksSectionCollapsed.bind(this);
    this._processLightDom = this._processLightDom.bind(this);
    this._toggleMobileMenu = this._toggleMobileMenu.bind(this);
    this._toggleSearch = this._toggleSearch.bind(this);
    this._toggleAllRedHat = this._toggleAllRedHat.bind(this);
    this._dropdownItemToggle = this._dropdownItemToggle.bind(this);
    this._addMenuBreakpoints = this._addMenuBreakpoints.bind(this);
    this._collapseMainMenu = this._collapseMainMenu.bind(this);
    this._collapseSecondaryLinks = this._collapseSecondaryLinks.bind(this);
    this._getDropdownHeights = this._getDropdownHeights.bind(this);
    this._menuToggleKeyboardListener = this._menuToggleKeyboardListener.bind(this);
    this._generalKeyboardListener = this._generalKeyboardListener.bind(this);

    // Setup mutation observer to watch for content changes
    this._observer = new MutationObserver(this._processLightDom);
  }

  connectedCallback() {
    super.connectedCallback();
    // If you need to initialize any attributes, do that here

    this._processLightDom();
    this._requestSiteSwitcher();

    this._observer.observe(this, lightDomObserverConfig);

    this.search = this.querySelector(`[slot="${this.tag}--search"]`);
    this.customlinks = this.querySelector(`[slot="${this.tag}--customlinks"]`);

    // Add a slotchange listener to the lightDOM trigger
    // this.search.addEventListener("slotchange", this._init);

    // Add a slotchange listener to the lightDOM trigger
    // this.customlinks.addEventListener("slotchange", this._init);

    // Update the stored height of a dropdown (used for animation) when the page is resized
    // But only once, after they've stopped resizing after the time in debounce
    optimizedResize.add(debounce(this._getDropdownHeights, 150));
  }

  disconnectedCallback() {}

  // Process the attribute change
  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(attr, oldValue, newValue);
  }

  /**
   * Checks to see if anything in the menu, or if a specific part of it is open
   * @param {string} toggleId Optional. Check if specific part of menu is open, if blank will check if anything is open
   * @return {boolean}
   */
  isOpen(toggleId) {
    const openToggleId = this.getAttribute(`${this.tag}-open-toggle`);
    if (openToggleId) {
      if (typeof toggleId === "undefined") {
        // Something is open, and a toggleId wasn't set
        return true;
      }
      // Only checks for prefix so if main-menu is queried and main-menu__dropdown--Link-Name is open it still evaluates as true
      // This prevents the main-menu toggle shutting at mobile when a sub-section is opened
      return toggleId === openToggleId;
    }
    return false;
  }

  /**
   * Create dash delimited string with no special chars for use in HTML attributes
   * @param {string} text
   * @return {string}
   */
  _createMachineName(text) {
    return (
      text
        // Get rid of special characters
        .replace(/[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g, "")
        // Get rid of extra space
        .trim()
        // Replace remaining single spaces between words with -
        .replace(/[\s\-]+/g, "-")
    );
  }

  /**
   * Figures out if the mobile menu toggle (aka hamburger icon) is visible
   * @param {boolean} forceRecalculation
   * @returns {boolean}
   */
  isMobileMenuButtonVisible(forceRecalculation) {
    // Trying to avoid running getComputedStyle too much by caching iton the web component object
    if (forceRecalculation || this.mainMenuButtonVisible === null || window.innerWidth !== this.windowInnerWidth) {
      if (document.domain === "localhost") {
        console.log(`${this.tag} isMobileMenuButtonVisible: Recalculating menu button visibility`);
      }
      const mobileButton = this.shadowRoot.getElementById("mobile__button");
      this.mainMenuButtonVisible = window.getComputedStyle(mobileButton, false).display !== "none";

      // Update the stored windowInnerWidth variable so we don't recalculate for no reason
      if (window.innerWidth !== this.windowInnerWidth) {
        this.windowInnerWidth = window.innerWidth;
        this.isSecondaryLinksSectionCollapsed(true);
      }
    }
    return this.mainMenuButtonVisible;
  }

  /**
   * Figures out if the mobile menu toggle (aka hamburger icon) is visible
   * @param {boolean} forceRecalculation
   * @returns {boolean}
   */
  isSecondaryLinksSectionCollapsed(forceRecalculation) {
    // @todo Find reliable way to check if secondary links are collapsed (search and all red hat buttons probably aren't it)

    // Trying to avoid running getComputedStyle too much by caching iton the web component object
    if (
      forceRecalculation ||
      this.secondaryLinksSectionCollapsed === null ||
      window.innerWidth !== this.windowInnerWidth
    ) {
      if (document.domain === "localhost") {
        console.log(`${this.tag} isSecondaryLinksSectionCollapsed: Recalculating menu button visibility`);
      }
      const searchButton = this.shadowRoot.getElementById("secondary-links__button--search");
      this.secondaryLinksSectionCollapsed = window.getComputedStyle(searchButton, false).display === "none";

      // Update the stored windowInnerWidth variable so we don't recalculate for no reason
      if (window.innerWidth !== this.windowInnerWidth) {
        this.windowInnerWidth = window.innerWidth;
        // Update the other layout state function, but avoid infinite loop :P
        this.isMobileMenuButtonVisible(true);
      }
    }
    return this.secondaryLinksSectionCollapsed;
  }

  /**
   * Get the dropdownId based on the toggleId
   * @param {string} toggleId ID of a toggle button
   * @return {string} ID of the corresponding dropdown
   */
  _getDropdownId(toggleId) {
    let dropdownId = null;
    if (toggleId.startsWith("secondary-links")) {
      switch (toggleId) {
        case "secondary-links__button--search":
          dropdownId = "secondary-links__dropdown--search";
          break;
        case "secondary-links__button--all-red-hat":
          dropdownId = "secondary-links__dropdown--all-red-hat";
          break;
      }
    } else if (toggleId === "mobile__button") {
      dropdownId = "mobile__dropdown";
    } else if (toggleId.startsWith("main-menu")) {
      dropdownId = this.shadowRoot.getElementById(toggleId).parentElement.dataset.dropdownId;
    }

    if (dropdownId) {
      return dropdownId;
    }
    console.error(`${this.tag}: Could not find corresponding dropdown for #${toggleId}`);
  }

  /**
   * Manages all dropdowns and ensures only one is open at a time
   * @param {string} toggleId Id to use in pfe-navigation-open-toggle param
   * @param {string} toState Optional, use to set the end state as 'open' or 'close', instead of toggling the current state
   * @return {boolean} True if the final state is open, false if closed
   */
  _changeNavigationState(toggleId, toState) {
    // console.log('_changeNavigationState', toggleId, toState);
    const isOpen = this.isOpen(toggleId);
    // Set toState param to go to opposite of current state if toState isn't set
    if (typeof toState === "undefined") {
      toState = isOpen ? "close" : "open";
      // console.log('Setting toState', toState);
    }
    const dropdownId = this._getDropdownId(toggleId);
    const openToggleId = this.getAttribute(`${this.tag}-open-toggle`);
    const shadowDomOuterWrapper = this.shadowRoot.getElementById("pfe-navigation__wrapper");
    const toggleElementToToggle = this.shadowRoot.getElementById(toggleId);

    /**
     * Local utility function to open a dropdown (shouldn't be used outside of parent function)
     * @param {object} toggleElement Toggle Button DOM Element
     * @param {object} dropdownElement Dropdown wrapper DOM element
     */
    const _openDropdown = (toggleElement, dropdownElement) => {
      const toggleId = toggleElement.getAttribute("id");
      // console.log('_openDropdown', toggleId, dropdownElement.getAttribute('id'));
      toggleElement.setAttribute("aria-expanded", "true");
      dropdownElement.setAttribute("aria-hidden", "false");
      // Updating height via JS so we can animate it for CSS transitions
      if (parseInt(dropdownElement.dataset.height) > 30) {
        dropdownElement.style.setProperty("height", `${dropdownElement.dataset.height}px`);
      }
      // Main menu specific actions
      if (toggleElement.getAttribute("id").startsWith("main-menu__")) {
        toggleElement.parentElement.classList.add("pfe-navigation__menu-item--open");
      }

      this.setAttribute(`${this.tag}-open-toggle`, toggleId);
    };

    /**
     * Local utility function to close a dropdown (shouldn't be used outside of parent function)
     * @param {object} toggleElement Toggle Button DOM Element
     * @param {object} dropdownElement Dropdown wrapper DOM element
     * @param {boolean} backOut If we're in a subdropdown, should we keep the parent one open, false will close all dropdowns
     */
    const _closeDropdown = (toggleElement, dropdownElement, backOut = true) => {
      // console.log('_openDropdown', toggleElement.getAttribute('id'), dropdownElement.getAttribute('id'), backOut);
      const toggleId = toggleElement.getAttribute("id");

      toggleElement.setAttribute("aria-expanded", "false");
      if (dropdownElement.hasAttribute("style")) {
        dropdownElement.style.removeProperty("height");
      }
      // Delay aria-hidden so animations can finish
      // @todo/note: I do not think we need to delay the change of the aria-hidden state since aria-hidden hides the content of the page from screen readers, as soon as the dropdown is closed by the screen reader user the dropdown should get aria-hidden="true" immediately
      // @note: tested with a screen reader and things seem to be functioning well without the time delay.
      // @note: when the delay is on it seems to be causing issues with the toggling of the aria-hidden states sometimes
      // window.setTimeout(() => {
      //   dropdownElement.setAttribute("aria-hidden", "true");
      // }, 500);
      dropdownElement.setAttribute("aria-hidden", "true");

      // Main menu specific code
      if (toggleId.startsWith("main-menu")) {
        toggleElement.parentElement.classList.remove("pfe-navigation__menu-item--open");
      }

      if (backOut && toggleId.startsWith("main-menu") && this.isMobileMenuButtonVisible()) {
        // Back out to main-menu
        _openDropdown(
          this.shadowRoot.getElementById("mobile__button"),
          this.shadowRoot.getElementById("mobile__dropdown")
        );
      } else {
        // Shut it by removing state attribute
        this.removeAttribute(`${this.tag}-open-toggle`, "");
      }
    };

    // Shut any open dropdowns
    if (openToggleId) {
      const openToggle = this.shadowRoot.getElementById(openToggleId);
      const toggleIdStartsWithMainMenu = toggleId.startsWith("main-menu");
      // Don't close a parent dropdown if we're toggling the child
      if (!toggleIdStartsWithMainMenu || (toggleIdStartsWithMainMenu && openToggleId !== "mobile__button")) {
        const openDropdownId = this._getDropdownId(openToggleId);
        // console.log('openToggleId', openToggleId, openDropdownId);
        _closeDropdown(openToggle, this.shadowRoot.getElementById(openDropdownId));
      }
    }

    if (toState !== "close" && toState !== "open") {
      console.error(`${this.tag}: toState param was set to ${toState}, can only be 'close' or 'open'`);
    }

    // Update the element we came to update
    if (toState === "close") {
      // console.log('toState closed', toggleElementToToggle.getAttribute('id'));
      _closeDropdown(toggleElementToToggle, this.shadowRoot.getElementById(dropdownId));
    } else if (toState === "open") {
      // console.log('toState open', toggleElementToToggle.getAttribute('id'));
      _openDropdown(toggleElementToToggle, this.shadowRoot.getElementById(dropdownId));
    }

    // Clone state attribute inside of Shadow DOM to avoid compound :host() selectors
    shadowDomOuterWrapper.setAttribute(`${this.tag}-open-toggle`, this.getAttribute(`${this.tag}-open-toggle`));
    return toState === "open";
  }

  /**
   * Handle initialization or changes in light DOM
   * Clone them into the shadowRoot
   * @param {array} mutationList Provided by mutation observer
   */
  // @todo: processLightDom seems to be firing twice, need to look into this and see whether that is okay or if it needs to be fixed, seems like it is not a good thing but not sure if it is avoidable or not
  _processLightDom(mutationList) {
    // If we're mutating because an attribute on the web component starting with pfe- changed, don't reprocess dom
    let cancelLightDomProcessing = true;
    let componentClassesChange = false;
    const cancelLightDomProcessingTags = ["PFE-NAVIGATION", "PFE-ICON"];

    if (mutationList) {
      for (let index = 0; index < mutationList.length; index++) {
        const mutationItem = mutationList[index];
        if (!cancelLightDomProcessingTags.includes(mutationItem.target.tagName)) {
          if (!mutationItem.attributeName.startsWith("pfe-")) {
            // If it's a pfe- attribute, assume we don't need to process the light dom
            cancelLightDomProcessing = false;
          }
        } else if (
          mutationItem.target.tagName === "PFE-NAVIGATION" &&
          mutationItem.type === "attributes" &&
          mutationItem.attributeName === "class"
        ) {
          componentClassesChange = true;
        }
      }
    } else {
      // If there isn't a mutationList it's because this is on connectedCallback
      cancelLightDomProcessing = false;
    }

    // Preventing issues in IE11 & Edge
    if (window.ShadyCSS) {
      this._observer.disconnect();
    }

    // Handle class updates to the parent component
    // Copying them to shadow DOM to avoid compound :host() selectors
    if (componentClassesChange) {
      const shadowDomOuterWrapper = this.shadowRoot.getElementById("pfe-navigation__wrapper");
      shadowDomOuterWrapper.setAttribute("class", `pfe-navigation__wrapper ${this.getAttribute("class")}`);
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
      console.log(`${this.tag} _processLightDom: replacing shadow DOM`, mutationList);
    }
    // Prettier makes this section significantly less legible because of line length
    // @todo look into only replacing markup that changed via mutationList
    // @todo Clone Node breaks event listeners, might need to think on this, we'll need to be able to maintain the lightDOM
    const shadowWrapper = this.shadowRoot.getElementById("pfe-navigation__wrapper");
    const shadowMenuWrapper = this.shadowRoot.getElementById("pfe-navigation__menu-wrapper");
    const newShadowMenuWrapper = document.createElement("nav");
    const shadowLogo = this.shadowRoot.getElementById("pfe-navigation__logo-wrapper");
    const lightLogo = this.querySelector("#pfe-navigation__logo-wrapper");
    const lightMenu = this.querySelector("#pfe-navigation__menu");

    // Add attributres we need on the shadow DOM menu wrapper
    newShadowMenuWrapper.setAttribute("id", "pfe-navigation__menu-wrapper");
    newShadowMenuWrapper.classList.add("pfe-navigation__menu-wrapper");

    // Add the logo to the correct part of the shadowDom
    if (lightLogo) {
      if (shadowLogo) {
        shadowWrapper.replaceChild(lightLogo.cloneNode(true), shadowLogo);
      } else {
        shadowWrapper.prepend(lightLogo.cloneNode(true));
      }
    }

    // Copy light DOM menu into new wrapper, to be put in shadow DOM after manipulations
    newShadowMenuWrapper.append(lightMenu.cloneNode(true));

    // Add menu dropdown toggle behavior
    const dropdowns = newShadowMenuWrapper.querySelectorAll(".pfe-navigation__dropdown");
    for (let index = 0; index < dropdowns.length; index++) {
      const dropdown = dropdowns[index];
      const dropdownLink = dropdown.parentElement.querySelector(".pfe-navigation__menu-link");

      // Convert dropdown links into buttons
      const dropdownButton = document.createElement("button");
      // Move over or add important attributes and content
      dropdownButton.setAttribute("class", dropdownLink.getAttribute("class"));
      dropdownButton.classList.add("pfe-navigation__menu-link--has-dropdown");
      dropdownButton.setAttribute("aria-expanded", "false");
      dropdownButton.innerHTML = dropdownLink.innerHTML;
      dropdownButton.dataset.machineName = this._createMachineName(dropdownLink.text);

      // Add dropdown behavior
      dropdownButton.addEventListener("click", this._dropdownItemToggle);
      dropdownLink.parentElement.replaceChild(dropdownButton, dropdownLink);

      // Set Id's for the button and dropdown and add their ID's to the parent li for easy access
      const dropdownButtonId = `main-menu__button--${dropdownButton.dataset.machineName}`;
      const dropdownId = `main-menu__dropdown--${dropdownButton.dataset.machineName}`;
      dropdownButton.setAttribute("id", dropdownButtonId);
      dropdownButton.setAttribute("aria-expanded", "false");
      dropdownButton.parentElement.dataset.buttonId = dropdownButtonId;

      // Create wrapper for dropdown and give it appropriate classes and attributes
      const dropdownWrapper = document.createElement("div");
      // Find other dropdowns by using the .dropdown-content class (such as Search/All Red Hat)
      // @todo: figure out if this is causing inconsistent toggling of aria-hidden
      // const otherDropDowns = this.shadowRoot.querySelector(".dropdown-content");

      dropdownWrapper.classList.add("pfe-navigation__dropdown-wrapper");
      if (dropdown.classList.contains("pfe-navigation__dropdown--single-column")) {
        dropdownWrapper.classList.add("pfe-navigation__dropdown-wrapper--single-column");
      }
      dropdownWrapper.setAttribute("id", dropdownId);
      dropdownWrapper.setAttribute("aria-hidden", "true");
      // dynamically set aria-hidden="true" by default for other dropdowns bc they are closed by default
      // @note: commented out bc it is not fully working yet
      // otherDropDowns.setAttribute("aria-hidden", "true");
      dropdownWrapper.append(dropdown);
      dropdownButton.parentElement.append(dropdownWrapper);
      dropdownButton.parentElement.dataset.dropdownId = dropdownId;
      dropdownButton.setAttribute("aria-controls", dropdownId);
    }

    // Replace the menu in the shadow DOM
    shadowMenuWrapper.parentElement.replaceChild(newShadowMenuWrapper, shadowMenuWrapper);

    // Add menu burger behavior
    this.menuToggle.addEventListener("click", this._toggleMobileMenu);
    this.menuToggle.addEventListener("keydown", this._menuToggleKeyboardListener);

    // Add search toggle behavior
    const searchToggle = this.shadowRoot.querySelector(".pfe-navigation__search-toggle");
    searchToggle.addEventListener("click", this._toggleSearch);

    // Add All Red Hat toggle behavior
    const allRedHat = this.shadowRoot.querySelector(".pfe-navigation__all-red-hat-toggle");

    allRedHat.addEventListener("click", this._toggleAllRedHat);

    // General keyboard listener attached to the entire component
    this.addEventListener("keydown", this._generalKeyboardListener);

    // Give all dropdowns aria-hidden since they're shut by default
    // @todo/note: this only adds aria-hidden to the main menu dropdown links and not the utility buttons (Search/All Red Hat), added aria-hidden attr in the pfe-nav shadow DOM template for now, need to figure out best way to do this dynamically
    this.shadowRoot.querySelector(".pfe-navigation__dropdown-wrapper").setAttribute("aria-hidden", "true");

    // Give Search dropdown, All Red Hat Dropdown aria-hidden since they're shut by default
    // @todo: added this logic, uses .dropdown-content class on the dropdown content divs, need to verify that this logic is reasonable and if so add the notes to the documentation about the class
    // @todo: need to figure out best way to manage the dynamic setting of aria-hidden when custom link gets used as a dropdown instead by content editors and other dev teams
    // @todo/note: tried this method of dynamically setting the aria-hidden attr for other dropdowns but I was having an issue with inconsistent toggling of the aria-hidden attr for the search dropdown so commented it out for now, this code might be conflicting with logic elsewhere for aria-hidden?
    // this.shadowRoot.querySelectorAll(".dropdown-content").forEach(element => {
    //   element.setAttribute("aria-hidden", "true");
    //   // added this for local testing
    //   if (document.domain === "localhost") {
    //     console.log(`inside of forEach for .dropdown-content`);
    //     console.log(element);
    //   }
    // });

    // Process pfe-navigation-dropdowns
    const pfeNavigationDropdowns = this.querySelectorAll("pfe-navigation-dropdown");
    for (let index = 0; index < pfeNavigationDropdowns.length; index++) {
      const dropdown = pfeNavigationDropdowns[index];
      const toggleName = dropdown.getAttribute("pfe-name");
      const toggleIconName = dropdown.getAttribute("pfe-icon");
      if (toggleIconName && toggleName) {
        const toggle = document.createElement("button");
        const toggleIcon = document.createElement("pfe-icon");
        toggle.innerText = toggleName;
        toggle.classList.add("pfe-navigation__custom-link");
        toggle.setAttribute("id", `pfe-navigation__custom-link-- ${this._createMachineName(toggleName)}`);
        toggleIcon.setAttribute("icon", toggleIconName);
        toggleIcon.setAttribute("pfe-size", "md");
        toggleIcon.setAttribute("aria-hidden", "true");
        toggle.prepend(toggleIcon);

        // @todo Move the button to it's final location
        this.shadowRoot.getElementById("pfe-navigation__outer-menu-wrapper__inner").append(toggle);
      } else {
        if (!toggleIconName) {
          console.error(
            `${this.tag}: pfe-navigation-toggle is required to have a pfe-name attribute for accessibility.`
          );
        }
        if (!toggleIconName) {
          console.error(
            `${this.tag}: pfe-navigation-toggle is required to have a pfe-icon attribute for design consistency.`
          );
        }
      }
    }

    // Reconnecting mutationObserver for IE11 & Edge
    if (window.ShadyCSS) {
      this._observer.observe(this, lightDomObserverConfig);
    }

    // Some cleanup and state management for after render
    const postProcessLightDom = () => {
      if (this.isMobileMenuButtonVisible()) {
        // @todo add aria-hidden and aria-expanded attributes to appropriate elements for mobile dropdown if we're at a mobile breakpoint
      }
    };

    // Timeout lets this run when there's a spare cycle
    window.setTimeout(this._addMenuBreakpoints, 0);
    window.setTimeout(this._getDropdownHeights, 0);
    window.setTimeout(postProcessLightDom, 250);
  }

  /**
   * Calculate the points where the main menu and secondary links should be collapsed and adds them
   * @todo Run this if layout breaks nav-expand breakpoint and secondary-links-expand breakpoint
   * @todo Clear/update inline heights on resize
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
    if (document.domain === "localhost") {
      console.log(`${this.tag} _getDropdownHeights: Getting all dropdown heights`);
    }
    const mainMenuDropdowns = this.shadowRoot.querySelectorAll(".pfe-navigation__dropdown");
    for (let index = 0; index < mainMenuDropdowns.length; index++) {
      const dropdown = mainMenuDropdowns[index];
      const dropdownHeight = dropdown.offsetHeight;
      dropdown.parentElement.dataset.height = dropdownHeight;
      // Update the height inline style of any open dropdown
      if (dropdown.parentElement.hasAttribute("style") && dropdown.parentElement.style.height) {
        dropdown.parentElement.style.height = `${dropdownHeight}px`;
      }
    }

    const otherDropdowns = [];
    // Get height of mobile menu if we're using a mobile menu
    if (this.isMobileMenuButtonVisible()) {
      otherDropdowns.push(this.shadowRoot.querySelector(".pfe-navigation__outer-menu-wrapper__inner"));
    }

    // Get height of secondary links if they're not in the mobile menu
    if (!this.isSecondaryLinksSectionCollapsed()) {
      console.log("adding otherDropdowns");
      otherDropdowns.push(this.querySelector('[slot="pfe-navigation--search"]'));
      otherDropdowns.push(this.shadowRoot.querySelector(".pfe-navigation__all-red-hat-wrapper__inner"));
    }

    for (let index = 0; index < otherDropdowns.length; index++) {
      // @todo Not working yet These other dropdowns need style & JS logic love
      const dropdown = otherDropdowns[index];
      const dropdownHeight = dropdown.offsetHeight;
      dropdown.parentElement.dataset.height = dropdownHeight;
      // Update the height inline style of any open dropdown
      if (dropdown.parentElement.hasAttribute("style") && dropdown.parentElement.style.height) {
        dropdown.parentElement.style.height = `${dropdownHeight}px`;
      }
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
  _toggleMobileMenu() {
    this._changeNavigationState("mobile__button");
  }

  _toggleSearch() {
    this._changeNavigationState("secondary-links__button--search");
  }

  _toggleAllRedHat() {
    this._changeNavigationState("secondary-links__button--all-red-hat");
  }

  _dropdownItemToggle(event) {
    event.preventDefault();
    const dropdownItem = event.target;
    const toggleId = dropdownItem.getAttribute("id");
    this._changeNavigationState(toggleId);
  }

  /**
   * Default Toggle Button Keyboard event handler
   * @param {object} event
   */
  _menuToggleKeyboardListener(event) {
    // var target = event.target;
    var keyCode = event.which;

    // RIGHT
    if (keyCode === 39) {
      // event.preventDefault();
      // event.stopPropagation();
      // menuToggleOpen($menuToggleButton, $menuToggleTarget, postOpenCallback, postShutCallback);
    }
    // LEFT
    else if (keyCode === 37) {
      // event.preventDefault();
      // event.stopPropagation();
      // console.log('Left Button', $menuToggleButton);
      // menuToggleShut(
      //   $menuToggleButton,
      //   $menuToggleTarget,
      //   postShutCallback
      // );
    }
    // DOWN
    else if (keyCode === 40) {
      // event.preventDefault();
      // event.stopPropagation();
      // menuToggleOpen($menuToggleButton, $menuToggleTarget, postOpenCallback, postShutCallback);
    }
    // UP
    else if (keyCode === 38) {
      // event.preventDefault();
      // event.stopPropagation();
      // console.log('Up Button', $menuToggleButton);
      // menuToggleShut($menuToggleButton, $menuToggleTarget, postShutCallback);
    }
    // ESCAPE
    else if (keyCode === 27) {
      // console.log('pressed escape, toggle button', $menuToggleButton);
      event.preventDefault();
      event.stopPropagation();
      this._changeNavigationState("mobile__button", "close");
      // menuToggleShut($menuToggleButton, $menuToggleTarget, postShutCallback);
    }
    // Space or Enter
    else if (keyCode === 13 || keyCode === 32) {
      // event.preventDefault();
      // event.stopPropagation();
      // menuToggleToggleState(
      //   $menuToggleButton,
      //   $menuToggleTarget,
      //   postOpenCallback,
      //   postShutCallback
      // );
    }
  }

  /**
   * Default Toggle Button Keyboard event handler
   * @param {object} event
   */
  _generalKeyboardListener(event) {
    const target = event.target;
    const keyCode = event.which;

    // RIGHT
    if (keyCode === 39) {
      // event.preventDefault();
      // event.stopPropagation();
      // menuToggleOpen($menuToggleButton, $menuToggleTarget, postOpenCallback, postShutCallback);
    }
    // LEFT
    else if (keyCode === 37) {
      // event.preventDefault();
      // event.stopPropagation();
      // console.log('Left Button', $menuToggleButton);
      // menuToggleShut(
      //   $menuToggleButton,
      //   $menuToggleTarget,
      //   postShutCallback
      // );
    }
    // DOWN
    else if (keyCode === 40) {
      // event.preventDefault();
      // event.stopPropagation();
      // menuToggleOpen($menuToggleButton, $menuToggleTarget, postOpenCallback, postShutCallback);
    }
    // UP
    else if (keyCode === 38) {
      // event.preventDefault();
      // event.stopPropagation();
      // console.log('Up Button', $menuToggleButton);
      // menuToggleShut($menuToggleButton, $menuToggleTarget, postShutCallback);
    }
    // ESCAPE
    else if (keyCode === 27) {
      // console.log('pressed escape, toggle button', $menuToggleButton);
      event.preventDefault();
      event.stopPropagation();
      const openToggleId = this.getAttribute(`${this.tag}-open-toggle`);
      if (openToggleId) {
        this._changeNavigationState(openToggleId, "close");
      }
    }
    // Space or Enter
    else if (keyCode === 13 || keyCode === 32) {
      // event.preventDefault();
      // event.stopPropagation();
      // menuToggleToggleState(
      //   $menuToggleButton,
      //   $menuToggleTarget,
      //   postOpenCallback,
      //   postShutCallback
      // );
    }
  }

  _requestSiteSwitcher() {
    const promise = new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", "../../pfe-navigation/mock/site-switcher.html");
      xhr.responseType = "text";

      xhr.onload = () => {
        if (xhr.status >= 400) {
          reject(xhr.responseText);
        } else {
          resolve(xhr.responseText);
          this._siteSwitcherWrap.innerHTML = xhr.responseText;
        }
      };

      xhr.onerror = err => {
        this._siteSwitchLoadingIndicator.setAttribute("hidden", true);
        reject(err, "Something went wrong.");
      };

      xhr.send();
    });
  }
}

PFElement.create(PfeNavigation);

export default PfeNavigation;
