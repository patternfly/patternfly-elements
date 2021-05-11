import PFElement from "../../pfelement/dist/pfelement.js";
import "../../pfe-icon/dist/pfe-icon.js";
import "../../pfe-avatar/dist/pfe-avatar.js";
import "../../pfe-progress-indicator/dist/pfe-progress-indicator.js";

/**
 * Debounce helper function
 * @see https://davidwalsh.name/javascript-debounce-function
 *
 * @param {function} func Function to be debounced
 * @param {number} delay How long until it will be run
 * @param {boolean} immediate Whether it should be run at the start instead of the end of the debounce
 */
function debounce(func, delay, immediate = false) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, delay);
    if (callNow) func.apply(context, args);
  };
}

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

  static get events() {
    return {
      // @todo figure out approach for analytics events
      topLevelSelected: `${this.tag}:top-level-selected`,
      searchSelected: `${this.tag}:search-selected`,
      optionSelected: `${this.tag}:option-selected`,

      expandedItem: `${this.tag}:expanded-item`,
      collapsedItem: `${this.tag}:collapsed-item`,
      shadowDomInteraction: `pfe-shadow-dom-event`,

      // @note v1.x support:
      pfeNavigationItemOpen: `pfe-navigation-item:open`,
      pfeNavigationItemClose: `pfe-navigation-item:close`
    };
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Combo;
  }

  static get properties() {
    return {
      lang: {
        title: "Language support",
        type: String,
        default: "en",
        observer: "_translateStrings"
      },
      // State indicator
      breakpoint: {
        title: "Indicates current layout state",
        // 'mobile' means secondary links && main menu are collapsed, search goes to top of mobile dropdown
        // 'tablet' means main menu is collapsed, search has it's own dropdown
        // 'desktop' means nothing is collapsed, search has it's own dropdown
        type: String
      },
      // State indicator
      openToggle: {
        title: "Currently opened toggle",
        type: String
      },
      // State indicator
      mobileSlide: {
        title: "Indicates an open child element that slides the menu over when open",
        type: Boolean // @todo Value is left empty? Is it boolean?
      },
      // @note If role isn't set, code will check if it has a parent with role="banner",
      // If not role=banner will be added to pfe-navigation
      role: {
        type: String
      },
      sticky: {
        title: "Fix the navigation to the top of the screen",
        type: Boolean
      }
    };
  }

  static get slots() {
    return {};
  }

  constructor() {
    super(PfeNavigation, { type: PfeNavigation.PfeType });

    // Set pointers to commonly used elements
    this._shadowDomOuterWrapper = this.shadowRoot.getElementById("pfe-navigation__wrapper");
    this._mobileToggle = this.shadowRoot.getElementById("mobile__button");
    this._menuDropdownXs = this.shadowRoot.getElementById("mobile__dropdown");
    this._menuDropdownMd = this.shadowRoot.getElementById(`${this.tag}__menu-wrapper`);
    this._secondaryLinksWrapper = this.shadowRoot.getElementById(`${this.tag}__secondary-links-wrapper`);
    this._searchToggle = this.shadowRoot.getElementById("secondary-links__button--search");
    this._searchSlot = this.shadowRoot.getElementById("search-slot");
    this._searchSpotXs = this.shadowRoot.getElementById(`${this.tag}__search-wrapper--xs`);
    this._searchSpotMd = this.shadowRoot.getElementById(`${this.tag}__search-wrapper--md`);
    this._customLinksSlot = this.shadowRoot.getElementById(`${this.tag}--custom-links`);
    this._mobileNavSearchSlot = this.shadowRoot.querySelector('slot[name="pfe-navigation--search"]');
    this._overlay = this.shadowRoot.querySelector(`.${this.tag}__overlay`);
    this._shadowNavWrapper = this.shadowRoot.querySelector(`.${this.tag}__wrapper`);
    this._accountOuterWrapper = this.shadowRoot.getElementById("pfe-navigation__account-wrapper");
    this._accountSlot = this.shadowRoot.getElementById("pfe-navigation__account-slot");
    // Elements that don't exist yet
    this._siteSwitcherToggle = null;
    this._siteSwitcherBackButton = null;
    this._accountComponent = null;
    this._accountToggle = null;
    this._accountLogInLink = null;
    this._currentMobileDropdown = null;

    // @todo Make this selector list a PFE-wide resource?
    this._focusableElements = 'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

    // Set default collapse breakpoints to null (falls back to CSS)
    this._menuBreakpoints = {
      secondaryLinks: null,
      mainMenu: null
    };

    // Used to calculate when menu should collapse,
    // parts that have changed can be set to null and breakpoints recalculated
    this._menuBounds = {
      logoRight: null,
      mainMenuRight: null,
      secondaryLinksLeft: null
    };

    // To track observers and events and remove them when necessary
    this._mobileSliderMutationObservers = {};
    this._mobileSliderFocusTrapEvents = {};
    this._mobileSliderFocusTrapElements = {};
    this._debouncedPreResizeAdjustments = null;
    this._debouncedPostResizeAdjustments = null;
    this._menuBreakpointQueries = {
      secondaryLinks: null,
      mainMenu: null
    };

    // Tracking if window width gets updated
    this.windowInnerWidth = null;
    // Cache element visibility for performance
    this.mainMenuButtonVisible = null;
    this.secondaryLinksSectionCollapsed = null;

    // Ensure 'this' is tied to the component object in these member functions
    const functionsToBind = [
      "_focusOutOfNav",
      "isOpen",
      "getToggleElement",
      "getDropdownElement",
      "_isDevelopment",
      "_getParentToggleAndDropdown",
      "_changeNavigationState",
      "isMobileMenuButtonVisible",
      "isSecondaryLinksSectionCollapsed",
      "_calculateBreakpointAttribute",
      "_processSearchSlotChange",
      "_processCustomDropdowns",
      "_shadowDomInteraction",
      "_processLightDom",
      "_toggleMobileMenu",
      "_toggleSearch",
      "_siteSwitcherBackClickHandler",
      "_dropdownItemToggle",
      "_calculateMenuBreakpoints",
      "_collapseMainMenu",
      "_collapseSecondaryLinks",
      "_moveSearchSlot",
      "_postResizeAdjustments",
      "_generalKeyboardListener",
      "_overlayClickHandler",
      "_getOption",
      "_stickyHandler",
      "_a11yHideMobileMainMenu",
      "_a11yShowMobileMainMenu",
      "_createLogInLink",
      "_processAccountDropdownChange",
      "_processAccountSlotChange",
      "_getLastFocusableItemInMobileSlider"
    ];

    for (let index = 0; index < functionsToBind.length; index++) {
      const functionName = functionsToBind[index];
      if (this[functionName]) {
        this[functionName] = this[functionName].bind(this);
      } else {
        this.error("Tried to bind a function that doesn't exist", functionName);
      }
    }

    // Handle updates to slotted search content
    this._searchSlot.addEventListener("slotchange", this._processSearchSlotChange);
    this._accountSlot.addEventListener("slotchange", this._processAccountSlotChange);

    // Setup mutation observer to watch for content changes
    this._observer = new MutationObserver(this._processLightDom);

    // Ensure we close the whole menu and hide the overlay when the overlay is clicked
    this._overlay.addEventListener("click", this._overlayClickHandler);

    // string translations
    this._navTranslations = {
      en: {
        // @TODO remove - allRH: "All Red Hat",
        language: "English",
        login: "Log In",
        menu: "Menu",
        search: "Search"
      },
      ja: {
        // @TODO remove - allRH: "Web サイト",
        language: "日本語",
        login: "ログイン",
        menu: "メニュー",
        search: "検索"
      },
      ko: {
        // @TODO remove - allRH: "웹사이트",
        language: "한국어",
        login: "로그인",
        menu: "Menu",
        search: "검색"
      },
      zh: {
        // @TODO remove - allRH: "网站",
        language: "简体中文",
        login: "登录",
        menu: "Menu",
        search: "搜索"
      },
      de: {
        // @TODO remove - allRH: "Websites",
        language: "Deutsch",
        login: "Anmelden",
        menu: "Menu",
        search: "Suche"
      },
      fr: {
        // @TODO remove - allRH: "Sites web",
        language: "Français",
        login: "Connexion",
        menu: "Menu",
        search: "Rechercher"
      },
      it: {
        // @TODO remove - allRH: "Website",
        language: "Italiano",
        login: "Accedi",
        menu: "Menu",
        search: "Cerca"
      },
      es: {
        // @TODO remove - allRH: "Websites",
        language: "Español",
        login: "Iniciar sesión",
        menu: "Menu",
        search: "Buscar"
      },
      pt: {
        // @TODO remove - allRH: "Websites",
        language: "Português",
        login: "Login",
        menu: "Menu",
        search: "Pesquisar"
      }
    };

    // @todo Shouldn't go live with this line, but need to debug
    PFElement._debugLog = true;
    // this.log = (...msgs) => console.log(...msgs);
  } // ends constructor()

  connectedCallback() {
    super.connectedCallback();
    // If you need to initialize any attributes, do that here
    if (!this._isDevelopment()) {
      PFElement._debugLog = false;
    }
    this._processLightDom();

    this._observer.observe(this, lightDomObserverConfig);

    const preResizeAdjustments = () => {
      this.classList.add("pfe-navigation--is-resizing");
    };
    this._debouncedPreResizeAdjustments = debounce(preResizeAdjustments, 150, true);
    window.addEventListener("resize", this._debouncedPreResizeAdjustments);
    this._debouncedPostResizeAdjustments = debounce(this._postResizeAdjustments, 150);
    window.addEventListener("resize", this._debouncedPostResizeAdjustments, { passive: true });
    this._calculateBreakpointAttribute();

    // Initial position of this element from the top of the screen
    this.top = this.getBoundingClientRect().top || 0;

    // If the nav is set to sticky, run the sticky handler and attach scroll event to window
    // @TODO if (this.hasAttribute("pfe-sticky") && this.getAttribute("pfe-sticky") != "false") {
    if (this.sticky) {
      // Run the sticky check on first page load
      this._stickyHandler();

      // Attach the scroll event to the window
      window.addEventListener("scroll", () => {
        window.requestAnimationFrame(() => {
          this._stickyHandler();
        });
      });
    }

    // Make sure pfe-navigation or a parent is a header/role=banner element
    // if (!this.hasAttribute("role") && this.getAttribute("role") !== "banner") {
    if (this.role !== "banner") {
      const closestHeader = this.closest('header, [role="banner"]');
      if (!closestHeader) {
        this.role = "banner";
        this.log(`Added role=banner to ${this.tag}`);
      }
    }

    this.classList.add("pfe-navigation--processed");
    this.addEventListener("focusout", this._focusOutOfNav);
  } // end connectedCallback()

  disconnectedCallback() {
    this._observer.disconnect();

    // @todo Remove all listeners to be thorough!
    window.removeEventListener("resize", this._debouncedPreResizeAdjustments);
    window.removeEventListener("resize", this._debouncedPostResizeAdjustments);
    this._slot.removeEventListener("slotchange", this._processSearchSlotChange);
    this._overlay.removeEventListener("click", this._overlayClickHandler);
    this._mobileToggle.removeEventListener("click", this._toggleMobileMenu);
    this._searchToggle.removeEventListener("click", this._toggleSearch);
    this.removeEventListener("keydown", this._generalKeyboardListener);

    const mobileSliderObserverKeys = Object.keys(this._mobileSliderMutationObservers);
    for (let index = 0; index < mobileSliderObserverKeys.length; index++) {
      this._mobileSliderMutationObservers[mobileSliderObserverKeys[index]].disconnect();
    }

    const mobileSliderFocusTrapKeys = Object.keys(this._mobileSliderFocusTrapEvents);
    for (let index = 0; index < mobileSliderFocusTrapKeys.length; index++) {
      const currentId = mobileSliderFocusTrapKeys[index];
      this._mobileSliderFocusTrapElements[currentId].removeEventListener(
        "keydown",
        this._mobileSliderFocusTrapEvents[currentId]
      );
    }

    if (this._menuBreakpointQueries.secondaryLinks) {
      this._menuBreakpointQueries.secondaryLinks.removeEventListener("change", this._collapseMainMenu);
    }
    if (this._menuBreakpointQueries.mainMenu) {
      this._menuBreakpointQueries.mainMenu.removeEventListener("change", this._collapseMainMenu);
    }

    // if (this.hasAttribute("pfe-sticky") && this.getAttribute("pfe-sticky") != "false") {
    if (this.sticky) {
      window.removeEventListener("scroll", () => {
        window.requestAnimationFrame(() => {
          this._stickyHandler();
        });
      });
    }

    // Remove dropdown listeners
    const dropdownButtons = this.shadowRoot.querySelectorAll(".pfe-navigation__menu-link--has-dropdown");
    for (let index = 0; index < dropdownButtons.length; index++) {
      const dropdownButton = dropdownButtons[index];
      dropdownButton.removeEventListener("click", this._dropdownItemToggle);
    }
  } // end disconnectedCallback()

  /**
   * Utility function that is used to display more console logging in non-prod env
   */
  _isDevelopment() {
    return document.domain === "localhost" || document.domain.includes(".foo.") || this.hasAttribute("debug");
  }

  /**
   * Utility function to return DOM Object for a toggle, since it may be in the parent or shadow DOM
   * @param {string} toggleId Id of toggle to retrieve
   * @return {object} DOM Object of desired toggle
   */
  getToggleElement(toggleId) {
    if (toggleId.substr(0, 29) === "pfe-navigation__custom-link--") {
      return this.querySelector(`#${toggleId}`);
    } else {
      return this.shadowRoot.getElementById(toggleId);
    }
  }

  /**
   * Utility function to return DOM Object for a dropdown, since it may be in the parent or shadow DOM
   * @param {string} dropdownId Id of dropdown to retrieve
   * @return {object} DOM Object of desired dropdown
   */
  getDropdownElement(dropdownId) {
    if (dropdownId.substr(0, 33) === "pfe-navigation__custom-dropdown--") {
      return this.querySelector(`#${dropdownId}`);
    } else {
      return this.shadowRoot.getElementById(dropdownId);
    }
  }

  /**
   * Checks to see if anything in the menu, or if a specific part of it is open
   * @param {string} toggleId Optional. Check if specific part of menu is open, if blank will check if anything is open
   * @return {boolean}
   */
  isOpen(toggleId) {
    const openToggleId = this.getAttribute("open-toggle");
    if (openToggleId) {
      if (typeof toggleId === "undefined") {
        // Something is open, and a toggleId wasn't set
        return true;
      }
      if (openToggleId.substr(0, 9) === "main-menu" && toggleId === "mobile__button") {
        return true;
      }
      if (
        toggleId === "mobile__button" &&
        this.isSecondaryLinksSectionCollapsed()
      ) {
        return true;
      }

      // Only checks for prefix so if main-menu is queried and main-menu__dropdown--Link-Name is open it still evaluates as true
      // This prevents the main-menu toggle shutting at mobile when a sub-section is opened
      return toggleId === openToggleId;
    }

    return false;
  }

  /**
   * Use for elements that stop being dropdowns
   *
   * @param {object} toggleElement Toggle Button DOM Element
   * @param {object} dropdownWrapper Dropdown wrapper DOM element
   * @param {boolean} debugNavigationState
   */
  _removeDropdownAttributes(toggleElement, dropdownWrapper) {
    let toggleId = null;

    if (toggleElement) {
      toggleId = toggleElement.id;
      toggleElement.removeAttribute("aria-expanded");
      toggleElement.parentElement.classList.remove("pfe-navigation__menu-item--open");
    }

    // this.log(
    //   "_removeDropdownAttributes",
    //   toggleId,
    //   dropdownWrapper ? dropdownWrapper.getAttribute("id") : 'undefined'
    // );

    if (dropdownWrapper) {
      dropdownWrapper.removeAttribute("aria-hidden");
      dropdownWrapper.classList.remove("pfe-navigation__dropdown-wrapper--invisible");
      dropdownWrapper.style.removeProperty("height");
    }
  }

  /**
   * Utility function to set height of a dropdown
   * Depends on a dropdown having 2 wrappers and the parameter should be the outer wrapper
   * @param {object} dropdownWrapper DOM Object of dropdown wrapper
   */
  _setDropdownHeight(dropdownWrapper) {
    const dropdownHeight = dropdownWrapper.children[0].offsetHeight;
    // @NOTE not sure this is needed since offsetHeight will always return a number
    if (typeof dropdownHeight === "number") {
      dropdownWrapper.style.setProperty("height", `${dropdownHeight}px`);
    } else {
      dropdownWrapper.style.setProperty("height", "auto");
    }
  }

  /**
   * Sets attributes for an open element, but DOES NOT update navigation state
   * Only use to update DOM State to reflect nav state
   * Almost all open/close actions should go through this._changeNavigationState, not this function
   *
   * @param {object} toggleElement Toggle Button DOM Element
   * @param {object} dropdownWrapper Dropdown wrapper DOM element
   * @param {boolean} debugNavigationState
   */
  _addOpenDropdownAttributes(toggleElement, dropdownWrapper) {
    // Toggle Button DOM Element ID attribute
    let toggleId = null;
    // Dropdown wrapper DOM element ID attribute
    let dropdownWrapperId = null;
    // @TODO - this.breakpoint
    const currentBreakpoint = this.getAttribute("breakpoint");
    const isMobileSlider = currentBreakpoint === "mobile" && toggleElement.parentElement.hasAttribute("mobile-slider");
    let isMainMenuToggle = false;
    let isCustomLink = false;

    if (toggleElement) {
      toggleId = toggleElement.id;
      isMainMenuToggle = toggleId.startsWith("main-menu__button--");
      isCustomLink = toggleId.startsWith("pfe-navigation__custom-link--");
    }

    if (dropdownWrapper) {
      dropdownWrapperId = dropdownWrapper.id;
    } else {
      dropdownWrapperId = toggleElement.getAttribute("aria-controls");
      dropdownWrapper = this.getElementById(dropdownWrapperId);
    }

    // this.log(
    //   "_addOpenDropdownAttributes",
    //   toggleId,
    //   dropdownWrapper ? dropdownWrapper.id : 'undefined'
    // );

    if (toggleElement) {
      if (!toggleElement.hasAttribute("aria-expanded")) {
        toggleElement.setAttribute("aria-expanded", "true");
      }
      if (!toggleElement.hasAttribute("aria-controls")) {
        toggleElement.setAttribute("aria-controls", dropdownWrapperId);
      }

      // Main menu specific actions
      if (toggleId.substr(0, 11) === "main-menu__") {
        toggleElement.parentElement.classList.add("pfe-navigation__menu-item--open");
      }
    }

    if (dropdownWrapper) {
      dropdownWrapper.setAttribute("aria-hidden", "false");
      dropdownWrapper.removeAttribute("tabindex");
      dropdownWrapper.classList.remove("pfe-navigation__dropdown-wrapper--invisible");

      // Setting up CSS transforms by setting height with JS
      let setHeight = false;

      // Handle animation state and attributes
      if (toggleId) {
        if (currentBreakpoint === "mobile" && isMobileSlider) {
          this.setAttribute("mobile-slide", "");
        }
        // No animations at desktop, and for expanding elements in mobile menu dropdown
        // (mobile slides over instead of expanding)
        else if (currentBreakpoint === "mobile" && (isMainMenuToggle || isCustomLink)) {
          setHeight = true;
        } else if (currentBreakpoint === "tablet" && isMainMenuToggle) {
          setHeight = true;
        }
      }

      if (setHeight) {
        this._setDropdownHeight(dropdownWrapper);
      }
    }
  }

  /**
   * Sets attributes for a closed element, but DOES NOT update navigation state
   * Only use to update DOM State to reflect nav state
   * Almost all open/close actions should go through this._changeNavigationState, not this function
   *
   * @param {object} toggleElement Toggle Button DOM Element
   * @param {object} dropdownWrapper Dropdown wrapper DOM element
   * @param {number} invisibleDelay Delay on visibility hidden style, in case we need to wait for an animation
   * @param {boolean} debugNavigationState
   */
  _addCloseDropdownAttributes(toggleElement, dropdownWrapper, invisibleDelay = 0) {
    // Toggle Button DOM Element ID attribute
    let toggleId = null;
    // Dropdown wrapper DOM element ID attribute
    let dropdownWrapperId = null;

    if (toggleElement) {
      toggleId = toggleElement.id;
    }
    if (dropdownWrapper) {
      dropdownWrapperId = dropdownWrapper.id;
    }

    // this.log(
    //   "_addCloseDropdownAttributes",
    //   toggleId,
    //   dropdownWrapperId,
    //   invisibleDelay
    // );

    if (toggleElement) {
      toggleElement.setAttribute("aria-expanded", "false");
      if (!toggleElement.setAttribute("aria-controls")) {
        toggleElement.setAttribute("aria-controls", dropdownWrapperId);
      }
      // Main menu specific code
      if (toggleId.substr(0, 9) === "main-menu") {
        toggleElement.parentElement.classList.remove("pfe-navigation__menu-item--open");
      }
    }

    // Handle dropdown wrapper
    if (dropdownWrapper) {
      dropdownWrapper.style.removeProperty("height");
      dropdownWrapper.setAttribute("aria-hidden", "true");
      // Set tabindex in conjuction with aria-hidden true
      dropdownWrapper.setAttribute("tabindex", "-1");

      if (invisibleDelay) {
        // Sometimes need a delay visibility: hidden so animation can finish
        window.setTimeout(
          () => dropdownWrapper.classList.add("pfe-navigation__dropdown-wrapper--invisible"),
          invisibleDelay // Should be slightly longer than the animation time
        );
      } else {
        dropdownWrapper.classList.add("pfe-navigation__dropdown-wrapper--invisible");
      }
    }

    this.removeAttribute("mobile-slide");
    // this.mobileSlide = false; USE THIS
  }

  /**
   * Create dash delimited string with no special chars for use in HTML attributes
   * @param {string}
   * @return {string} String that can be used as a class or ID (no spaces or special chars)
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
   * Figures out if secondary links are collapsed
   * @param {boolean} forceRecalculation
   * @returns {boolean}
   */
  isSecondaryLinksSectionCollapsed(forceRecalculation) {
    // Trying to avoid running getComputedStyle too much by caching it on the web component object
    if (
      forceRecalculation ||
      this.secondaryLinksSectionCollapsed === null ||
      window.innerWidth !== this.windowInnerWidth
    ) {
      this.log("isSecondaryLinksSectionCollapsed recalculated");

      this.secondaryLinksSectionCollapsed =
        window.getComputedStyle(this._secondaryLinksWrapper, false).flexDirection === "column";

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
   * Figures out if the mobile menu toggle (aka hamburger icon) is visible
   * @param {boolean} forceRecalculation
   * @returns {boolean}
   */
  isMobileMenuButtonVisible(forceRecalculation) {
    // Trying to avoid running getComputedStyle too much by caching iton the web component object
    if (forceRecalculation || this.mainMenuButtonVisible === null || window.innerWidth !== this.windowInnerWidth) {
      this.log("isMobileMenuButtonVisible recalculated");

      this.mainMenuButtonVisible = window.getComputedStyle(this._mobileToggle, false).display !== "none";

      // Update the stored windowInnerWidth variable so we don't recalculate for no reason
      if (window.innerWidth !== this.windowInnerWidth) {
        this.windowInnerWidth = window.innerWidth;
        this.isSecondaryLinksSectionCollapsed(true);
      }
    }
    return this.mainMenuButtonVisible;
  }

  /**
   * Sets the current breakpoint as an attribute on the component
   */
  _calculateBreakpointAttribute() {
    let currentBreakpoint = null;
    if (this.isMobileMenuButtonVisible()) {
      if (this.isSecondaryLinksSectionCollapsed()) {
        currentBreakpoint = "mobile";
      } else {
        currentBreakpoint = "tablet";
      }
    } else {
      currentBreakpoint = "desktop";
    }
    this.setAttribute("breakpoint", currentBreakpoint);
    return currentBreakpoint;
  }

  /**
   * Sets this._currentMobileDropdown depending on breakpoint
   */
  _setCurrentMobileDropdown() {
    if (this.isMobileMenuButtonVisible()) {
      if (this.isSecondaryLinksSectionCollapsed()) {
        this._currentMobileDropdown = this._menuDropdownXs;
        // add .pfe-navigation__mobile-site-switcher for mobile only site switcher key events
        this._currentMobileDropdown.classList.add(
          "pfe-navigation__mobile-dropdown",
          "pfe-navigation__mobile-site-switcher"
        );

        // @todo All Red Hat
        // Set variable to mobile only class
        // this._siteSwitcherMobileOnly = this.shadowRoot.querySelector(".pfe-navigation__mobile-site-switcher");

        // remove .pfe-navigation__mobile-site-switcher for site switcher that is not in the mobile dropdown
        if (this._menuDropdownMd) {
          this._menuDropdownMd.classList.remove(
            "pfe-navigation__mobile-dropdown",
            "pfe-navigation__mobile-site-switcher"
          );
        }
      } else {
        if (this._menuDropdownMd) {
          this._currentMobileDropdown = this._menuDropdownMd;
          this._currentMobileDropdown.classList.add("pfe-navigation__mobile-dropdown");
        }
        // remove .pfe-navigation__mobile-site-switcher for site switcher that is not in the mobile dropdown
        this._menuDropdownXs.classList.remove(
          "pfe-navigation__mobile-dropdown",
          "pfe-navigation__mobile-site-switcher"
        );

        // @todo All Red Hat
        // Set variable to null
        // this._siteSwitcherMobileOnly = null;
      }
    } else {
      this._currentMobileDropdown = null;
      // Remove .pfe-navigation__mobile-site-switcher for site switcher that is not in the mobile dropdown
      this._menuDropdownXs.classList.remove("pfe-navigation__mobile-dropdown", "pfe-navigation__mobile-site-switcher");
      if (this._menuDropdownMd) {
        this._menuDropdownMd.classList.remove(
          "pfe-navigation__mobile-dropdown",
          "pfe-navigation__mobile-site-switcher"
        );
      }

      // @todo All Red Hat
      // this._siteSwitcherMobileOnly = null;

      // Ran into a circumstance where these elements didn't exist... ? Don't know how that's possible.
      if (this._menuDropdownXs) {
        this._menuDropdownXs.classList.remove("pfe-navigation__mobile-dropdown");
      }
      if (this._menuDropdownMd) {
        this._menuDropdownMd.classList.remove("pfe-navigation__mobile-dropdown");
      }
    }
  }

  /**
   * Get the dropdownId based on the toggleId
   * @param {string} toggleId ID of a toggle button
   * @return {string} ID of the corresponding dropdown
   */
  _getDropdownId(toggleId) {
    if (toggleId === "mobile__button") {
      if (this._currentMobileDropdown) {
        return this._currentMobileDropdown.id;
      }
    }
    if (toggleId.substr(0, 9) === "main-menu") {
      return this.shadowRoot.getElementById(toggleId).parentElement.dataset.dropdownId;
    }
    if (toggleId.substr(0, 15) === "secondary-links") {
      switch (toggleId) {
        case "secondary-links__button--search":
          return "pfe-navigation__search-wrapper--md";
        case "secondary-links__button--all-red-hat":
          return "secondary-links__dropdown--all-red-hat";
      }
    }

    const toggleElement = this.getToggleElement(toggleId);
    if (toggleElement && toggleElement.hasAttribute("aria-controls")) {
      return toggleElement.getAttribute("aria-controls");
    }
    this.error(`Could not find corresponding dropdown for #${toggleId}`);
  }

  /**
   * Figure out if a toggle is a child of a dropdown, returns DOM Objects for the parent
   * @param {string} toggleId Id attribute of toggle
   * @return {array|false} An array with the DOM object of the toggle and the dropdown, in that order, false if it's not a child
   */
  _getParentToggleAndDropdown(toggleId) {
    if (toggleId.substr(0, 9) === "main-menu" && this.isMobileMenuButtonVisible()) {
      return [this._mobileToggle, this._currentMobileDropdown];
    }
    if (this.isSecondaryLinksSectionCollapsed() && toggleId === "secondary-links__button--all-red-hat") {
      return [this._mobileToggle, this._currentMobileDropdown];
    }
    if (this.isSecondaryLinksSectionCollapsed() && toggleId.substr(0, 29) === "pfe-navigation__custom-link--") {
      return [this._mobileToggle, this._currentMobileDropdown];
    }
    return false;
  }

  /**
   * Manages all dropdowns and ensures only one is open at a time
   * @param {string} toggleId Id to use in open-toggle param
   * @param {string} toState Optional, use to set the end state as 'open' or 'close', instead of toggling the current state
   * @return {boolean} True if the final state is open, false if closed
   */
  _changeNavigationState(toggleId, toState) {
    const debugNavigationState = false; // Should never be committed as true

    this.log("_changeNavigationState", toggleId, toState);

    const isOpen = this.isOpen(toggleId);
    // Set toState param to go to opposite of current state if toState isn't set
    if (typeof toState === "undefined") {
      toState = isOpen ? "close" : "open";
    }
    const dropdownId = this._getDropdownId(toggleId);
    const currentlyOpenToggleId = this.getAttribute("open-toggle");
    const toggleElementToToggle = this.getToggleElement(toggleId);

    /**
     * Local utility function to open a dropdown (shouldn't be used outside of parent function)
     * @param {object} toggleElement Toggle Button DOM Element
     * @param {object} dropdownWrapper Dropdown wrapper DOM element
     */
    const _openDropdown = (toggleElement, dropdownWrapper) => {
      const toggleIdToOpen = toggleElement.id;

      // this.log(
      //   "openDropdown",
      //   toggleIdToOpen,
      //   dropdownWrapper ? dropdownWrapper.getAttribute("id") : "undefined"
      // );

      this._addOpenDropdownAttributes(toggleElement, dropdownWrapper, debugNavigationState);

      this.setAttribute("open-toggle", toggleIdToOpen);

      this.emitEvent(PfeNavigation.events.expandedItem, {
        detail: {
          toggle: toggleElement,
          pane: dropdownWrapper
        }
      });

      this.emitEvent(PfeNavigation.events.pfeNavigationItemOpen, {
        detail: {
          toggle: toggleElement,
          pane: dropdownWrapper
        }
      });

      // Show overlay
      this._overlay.hidden = false;
    };

    /**
     * Local utility function to close a dropdown (shouldn't be used outside of parent function)
     * @param {object} toggleElement Toggle Button DOM Element
     * @param {object} dropdownWrapper Dropdown wrapper DOM element
     * @param {boolean} backOut If we're in a subdropdown, should we keep the parent one open, false will close all dropdowns
     */
    const _closeDropdown = (toggleElement, dropdownWrapper, backOut = true) => {
      const toggleIdToClose = toggleElement.id;

      // this.log(
      //   "_closeDropdown",
      //   toggleIdToClose,
      //   dropdownWrapper ? dropdownWrapper.getAttribute("id") : "undefined",
      //   backOut
      // );

      this._addCloseDropdownAttributes(
        toggleElement,
        dropdownWrapper,
        // Only delay close attributes if secondary links are collapsed (visble)
        this.isSecondaryLinksSectionCollapsed() ? 300 : 0,
        debugNavigationState
      );

      // If we're backing out close child dropdown, but not parent
      let closed = false;
      if (backOut) {
        const parentToggleAndDropdown = this._getParentToggleAndDropdown(toggleIdToClose);
        if (parentToggleAndDropdown) {
          _openDropdown(parentToggleAndDropdown[0], parentToggleAndDropdown[1]);
          closed = true;
        }
      }

      // If we weren't able to back out, close everything by removing the open-toggle attribute
      if (!closed) {
        this.removeAttribute("open-toggle");
        this._overlay.hidden = true;
      }

      this.emitEvent(PfeNavigation.events.collapsedItem, {
        detail: {
          toggle: toggleElement,
          pane: dropdownWrapper
        }
      });

      this.emitEvent(PfeNavigation.events.pfeNavigationItemClose, {
        detail: {
          toggle: toggleElement,
          pane: dropdownWrapper
        }
      });
    };

    // Shut any open dropdowns before we open any other
    if (currentlyOpenToggleId) {
      const parentToggleAndDropdown = this._getParentToggleAndDropdown(toggleId);
      // Don't close a parent dropdown if we're opening the child
      if (!parentToggleAndDropdown || parentToggleAndDropdown[0].id !== currentlyOpenToggleId) {
        const openToggle = this.getToggleElement(currentlyOpenToggleId);
        const openDropdownId = this._getDropdownId(currentlyOpenToggleId);
        _closeDropdown(openToggle, this.getDropdownElement(openDropdownId));
      }
    }

    if (toState !== "close" && toState !== "open") {
      this.error(`toState param was set to ${toState}, can only be 'close' or 'open'`);
    }

    // Update the element we came to update
    if (toState === "close") {
      _closeDropdown(toggleElementToToggle, this.getDropdownElement(dropdownId));
    } else if (toState === "open") {
      _openDropdown(toggleElementToToggle, this.getDropdownElement(dropdownId));
    }

    // Clone state attribute inside of Shadow DOM to avoid compound :host() selectors
    this._shadowDomOuterWrapper.setAttribute("open-toggle", this.getAttribute("open-toggle"));
    return toState === "open";
  } // end _changeNavigationState

  /**
   * Close expanded elements if the focus leaves the nav
   */
  _focusOutOfNav(event) {
    if (this.isOpen()) {
      if (event.relatedTarget && !event.relatedTarget.closest("pfe-navigation")) {
        const openToggleId = this.getAttribute("open-toggle");
        this._changeNavigationState(openToggleId, "close");
      }
    }
  }

  /**
   * Add a class to component wrapper if we have a search slot
   */
  _processSearchSlotChange() {
    if (this.hasSlot("pfe-navigation--search")) {
      this.classList.add("pfe-navigation--has-search");
      this._searchToggle.hidden = false;
    } else {
      this.classList.remove("pfe-navigation--has-search");
      this._searchToggle.hidden = true;
    }
  }

  /**
   * Creates HTML for icon in a secondary link
   * @param {string} icon Name of icon from pfe-icon
   * @return {object} DOM Object for pfe-icon
   */
  _createPfeIcon(icon) {
    const iconElement = document.createElement("pfe-icon");
    iconElement.setAttribute("icon", icon);
    iconElement.setAttribute("size", "sm");
    iconElement.setAttribute("aria-hidden", "true");
    return iconElement;
  }

  /**
   * Update alert count on a custom dropdown
   * @param {object} pfeNavigationDropdown DOM Object for the dropdown we need to update
   */
  _updateAlerts(pfeNavigationDropdown) {
    const toggle = pfeNavigationDropdown.parentElement.parentElement.querySelector(".pfe-navigation__custom-link");
    let alertsContainer = toggle.querySelector(".custom-link__alert-count");
    if (pfeNavigationDropdown.hasAttribute("pfe-alerts")) {
      if (!alertsContainer) {
        alertsContainer = document.createElement("div");
        alertsContainer.classList.add("custom-link__alert-count");
        alertsContainer.innerText = pfeNavigationDropdown.getAttribute("pfe-alerts");
        toggle.querySelector(".custom-link__icon-wrapper").append(alertsContainer);
      } else {
        alertsContainer.innerText = pfeNavigationDropdown.getAttribute("pfe-alerts");
      }
    } else if (alertsContainer) {
      alertsContainer.innerText = "";
    }
  }

  /**
   * Translate strings based on object defined in constructor
   */
  _translateStrings() {
    //translate mobile menu button
    // @TODO - add query selector to constructor
    this.shadowRoot.querySelector("#mobile__button-text").textContent = this._navTranslations[this.lang].menu;

    //translate search string if used
    if (this._searchToggle) {
      // @TODO - add query selector to constructor
      this.shadowRoot.querySelector("#secondary-links__button--search-text").textContent = this._navTranslations[
        this.lang
      ].search;
    }
  }

  /**
   * Process secondary dropdown, a toggle button, behaviors, and necessary attributes
   * @param {array|NodeList} pfeNavigationDropdowns List of DOM object for a pfe-navigation-dropdown tag in the pfe-navigation--custom-links slot
   */
  _processCustomDropdowns(pfeNavigationDropdowns) {
    // Preventing issues in IE11 & Edge
    if (window.ShadyCSS) {
      this._observer.disconnect();
    }
    for (let index = 0; index < pfeNavigationDropdowns.length; index++) {
      const pfeNavigationDropdown = pfeNavigationDropdowns[index];
      if (
        pfeNavigationDropdown.parentElement.getAttribute("slot") === "pfe-navigation--custom-links" &&
        !pfeNavigationDropdown.classList.contains("pfe-navigation__dropdown")
      ) {
        const requiredAttributes = ["pfe-name", "pfe-icon"];
        const attributeValues = {};
        for (let index = 0; index < requiredAttributes.length; index++) {
          const attribute = requiredAttributes[index];
          if (!pfeNavigationDropdown.hasAttribute(attribute)) {
            this.error(
              `A pfe-navigation-dropdown in the custom-links slot is missing the attribute ${attribute}, which is required`
            );
          } else {
            attributeValues[attribute] = pfeNavigationDropdown.getAttribute(attribute);
          }
        }
        if (requiredAttributes.length === Object.keys(attributeValues).length) {
          // Create toggle button
          const toggle = document.createElement("button");
          const iconWrapper = document.createElement("div");
          const toggleMachineName = this._createMachineName(attributeValues["pfe-name"]);
          const dropdownWrapper = document.createElement("div");
          const toggleAndDropdownWrapper = pfeNavigationDropdown.parentElement;
          const toggleId = `pfe-navigation__custom-link--${toggleMachineName}`;
          const dropdownId = `pfe-navigation__custom-dropdown--${toggleMachineName}`;

          toggle.innerText = attributeValues["pfe-name"];
          toggle.classList.add("pfe-navigation__custom-link");
          toggle.setAttribute("id", toggleId);
          toggle.addEventListener("click", this._dropdownItemToggle);

          iconWrapper.classList.add("custom-link__icon-wrapper");
          iconWrapper.prepend(this._createPfeIcon(attributeValues["pfe-icon"]));
          toggle.prepend(iconWrapper);

          // Add Dropdown attributes
          dropdownWrapper.setAttribute("id", dropdownId);
          dropdownWrapper.classList.add("pfe-navigation__dropdown-wrapper");
          dropdownWrapper.classList.add("pfe-navigation__dropdown-wrapper--invisible");
          dropdownWrapper.append(pfeNavigationDropdown);
          pfeNavigationDropdown.classList.add("pfe-navigation__dropdown");
          this._addCloseDropdownAttributes(toggle);

          if (pfeNavigationDropdown.hasAttribute("pfe-width")) {
            switch (pfeNavigationDropdown.getAttribute("pfe-width")) {
              case "single":
                dropdownWrapper.classList.add("pfe-navigation__custom-dropdown--single-column");
                toggleAndDropdownWrapper.classList.add("pfe-navigation__custom-dropdown__wrapper--single-column");
                break;
              case "full":
                dropdownWrapper.classList.add("pfe-navigation__custom-dropdown--full");
                toggleAndDropdownWrapper.classList.add("pfe-navigation__custom-dropdown__wrapper--full");
                break;
            }
          }

          if (pfeNavigationDropdown.classList.contains("pfe-navigation__dropdown--default-styles")) {
            dropdownWrapper.classList.add("pfe-navigation__dropdown-wrapper--default-styles");
          }

          // For some reason setting this earlier causes the value to be null in the DOM
          toggle.setAttribute("aria-controls", dropdownId);
          // Adding closed dropdown attributes
          this._addCloseDropdownAttributes(toggle, dropdownWrapper);

          // Add the toggle to DOM
          toggleAndDropdownWrapper.prepend(toggle);
          toggleAndDropdownWrapper.classList.add("pfe-navigation__custom-dropdown__wrapper");
          toggleAndDropdownWrapper.append(dropdownWrapper);

          // Deal with alerts on dropdown
          this._updateAlerts(pfeNavigationDropdown);

          // Set up observer to catch any updates to the alerts attribute
          const observerCallback = mutationList => {
            // Call updateAlerts for update targets (should only be 1 per update)
            for (let index = 0; index < mutationList.length; index++) {
              this._updateAlerts(mutationList[index].target);
            }
          };

          const alertsObserver = new MutationObserver(observerCallback);
          alertsObserver.observe(pfeNavigationDropdown, { attributeFilter: ["pfe-alerts"] });

          // Process Site Switcher Dropdown
          if (toggleAndDropdownWrapper.classList.contains("pfe-navigation__site-switcher")) {
            this._siteSwitcherToggle = toggle;
            const siteSwitcherBackButtonWrapper = document.createElement("div");
            const siteSwitcherBackButton = document.createElement("button");

            toggleAndDropdownWrapper.setAttribute("mobile-slider", "");

            siteSwitcherBackButtonWrapper.classList.add("pfe-navigation__site-switcher__back-wrapper");

            siteSwitcherBackButton.classList.add("pfe-navigation__site-switcher__back-button");
            // @todo Translate via attribute
            siteSwitcherBackButton.setAttribute(
              "aria-label",
              `Close ${attributeValues["pfe-name"]} and return to menu`
            );
            siteSwitcherBackButton.innerText = "Back to menu";

            siteSwitcherBackButton.addEventListener("click", this._siteSwitcherBackClickHandler);

            this._siteSwitcherBackButton = siteSwitcherBackButton;
            siteSwitcherBackButtonWrapper.append(siteSwitcherBackButton);
            pfeNavigationDropdown.prepend(siteSwitcherBackButtonWrapper);
          }
        }
      }
      // @todo Process custom dropdowns for menus, need to figure out how that'll work
      // else {
      // }
    }

    // Reconnecting mutationObserver for IE11 & Edge
    if (window.ShadyCSS) {
      this._observer.observe(this, lightDomObserverConfig);
    }
  }

  /**
   * Event handler to capture interactions that occur in the shadow DOM
   * @param {object} event
   */
  _shadowDomInteraction(event) {
    const interactionDetail = { target: event.target };
    this.emitEvent(PfeNavigation.events.shadowDomInteraction, {
      detail: interactionDetail
    });
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
    let recalculateMenuBreakpoints = false;
    const ignoredTags = ["PFE-NAVIGATION", "PFE-ICON", "PFE-NAVIGATION-DROPDOWN"];

    // On initialization
    if (!mutationList) {
      cancelLightDomProcessing = false;

      // Process Custom Dropdowns in secondary links area
      const pfeNavigationDropdowns = this.querySelectorAll("pfe-navigation-dropdown");
      this._processCustomDropdowns(pfeNavigationDropdowns);
    }
    // On Mutation we get a mutationList, check to see if there are important changes to react to
    // If not hop out of this function early
    else {
      for (let index = 0; index < mutationList.length; index++) {
        const mutationItem = mutationList[index];
        const oneXSlotsNotIn2x = ["skip", "logo", "trigger", "tray"];

        // Ignore common mutations that we don't care about
        let ignoreThisMutation = false;

        if (mutationItem.type === "childList") {
          for (let index = 0; index < mutationItem.addedNodes.length; index++) {
            const addedNode = mutationItem.addedNodes[index];
            const customDropdownsToProcess = [];
            if (
              addedNode.nodeType === 1 &&
              addedNode.hasAttribute("slot") &&
              addedNode.parentElement.tagName === "PFE-NAVIGATION"
            ) {
              switch (addedNode.getAttribute("slot")) {
                case "pfe-navigation--custom-links":
                  const customDropdown = addedNode.querySelector("pfe-navigation-dropdown");
                  if (customDropdown) {
                    customDropdownsToProcess.push(customDropdown);
                  }
                  break;
              }
            }
            this._processCustomDropdowns(customDropdownsToProcess);

            // Recalculate both breakpoints
            this._menuBounds.mainMenuRight = null;
            this._menuBounds.secondaryLinksLeft = null;
            recalculateMenuBreakpoints = true;
          }
          // for (let index = 0; index < mutationItem.removedNodes.length; index++) {
          //   const removedNode = mutationItem.removedNodes[index];
          // }
        }

        // Capture any changes to pfe-navigation copy those classes shadow DOM wrapper
        // This is to help with styling, due to the limitations of :host()
        if (
          mutationItem.target.tagName === "PFE-NAVIGATION" &&
          mutationItem.type === "attributes" &&
          mutationItem.attributeName === "class"
        ) {
          componentClassesChange = true;
        }

        if (mutationItem.target && mutationItem.type === "attributes") {
          // Updates to PFE elements should be ignored
          if (mutationItem.target.tagName.substring(0, 3) === "PFE") {
            if (
              mutationItem.attributeName === "pfelement" ||
              mutationItem.attributeName === "class" ||
              mutationItem.attributeName === "type"
            ) {
              ignoreThisMutation = true;
            }
          }
        }

        if (!ignoreThisMutation) {
          if (mutationItem.target.tagName === "PFE-NAVIGATION-ACCOUNT") {
            this._processAccountDropdownChange(mutationItem);
          } else if (mutationItem.type === "characterData") {
            // Process text changes
            cancelLightDomProcessing = false;
          }
          // Slotted tags shouldn't cause lightDomProcessing
          // Unless it's a slot from 1.x that we're not using anymore
          else if (
            !mutationItem.target.hasAttribute("slot") ||
            oneXSlotsNotIn2x.includes(mutationItem.target.getAttribute("slot"))
          ) {
            // Elements with slotted parents should also be ignored
            const slottedParent = mutationItem.target.closest("[slot]");
            if (!slottedParent || oneXSlotsNotIn2x.includes(slottedParent.getAttribute("slot"))) {
              // Make sure it's not an ignored tag
              if (!ignoredTags.includes(mutationItem.target.tagName)) {
                if (mutationItem.attributeName) {
                  // We need to update attribute changes
                  cancelLightDomProcessing = false;
                }
                if (mutationItem.type === "childList") {
                  // We need to update on tree changes
                  cancelLightDomProcessing = false;
                }
              }
            }
          }
        }
      }
    }

    // Preventing issues in IE11 & Edge
    if (window.ShadyCSS) {
      this._observer.disconnect();
    }

    // Handle class updates to the parent component
    // Copying them to shadow DOM to avoid compound :host() selectors
    if (componentClassesChange) {
      this._shadowDomOuterWrapper.setAttribute("class", `pfe-navigation__wrapper ${this.getAttribute("class")}`);
    }

    if (cancelLightDomProcessing) {
      // Reconnecting mutationObserver for IE11 & Edge
      if (window.ShadyCSS) {
        this._observer.observe(this, lightDomObserverConfig);
      }

      this.log("Cancelled light DOM processing", mutationList);

      return;
    }

    // Begins the wholesale replacement of most of the shadowDOM -------------------------------
    this.log("_processLightDom: replacing shadow DOM", mutationList);
    // @todo look into only replacing markup that changed via mutationList
    const shadowWrapper = this.shadowRoot.getElementById("pfe-navigation__wrapper");
    const shadowMenuWrapper = this.shadowRoot.getElementById("pfe-navigation__menu-wrapper");
    const newShadowMenuWrapper = document.createElement("nav");
    const shadowLogo = this.shadowRoot.getElementById("pfe-navigation__logo-wrapper");

    ///
    // @note v1.x markup:
    // Address skip links, put them at the beginning of the document
    // @todo Could check if mutationList is set, and if a mutation has occured in the skip links
    ///
    const htmlBody = document.querySelector("body");
    const skipLinks = this.querySelectorAll('[slot="skip"]');
    if (skipLinks) {
      // Wrapper used to make sure we don't duplicate skip links
      const skipLinksWrapper = document.createElement("div");
      skipLinksWrapper.id = "pfe-navigation__1x-skip-links";
      for (let index = 0; index < skipLinks.length; index++) {
        skipLinks[index].removeAttribute("slot");

        // Add visually-hidden to the link tags so we can show them when focused on with CSS
        if (skipLinks[index].tagName === "A") {
          skipLinks[index].classList.add("visually-hidden", "skip-link");
        } else {
          const theRealSkipLinks = skipLinks[index].querySelectorAll("a");
          for (let j = 0; j < theRealSkipLinks.length; j++) {
            theRealSkipLinks[j].classList.add("visually-hidden", "skip-link");
          }
        }
        skipLinksWrapper.append(skipLinks[index]);
      }

      // If we already have an oldSkipLinks, replace it
      const oldSkipLinksWrapper = document.getElementById("pfe-navigation__1x-skip-links");
      if (oldSkipLinksWrapper) {
        oldSkipLinksWrapper.parentElement.replaceChild(skipLinksWrapper, oldSkipLinksWrapper);
      } else {
        // Put skip links as the first thing after the body tag
        htmlBody.prepend(skipLinksWrapper);
      }
    }

    ///
    // Add the logo to the correct part of the shadowDom
    ///
    let lightLogo = this.querySelector("#pfe-navigation__logo-wrapper");
    if (lightLogo) {
      if (shadowLogo) {
        shadowWrapper.replaceChild(lightLogo.cloneNode(true), shadowLogo);
      } else {
        shadowWrapper.prepend(lightLogo.cloneNode(true));
      }
    } else {
      // @note v1.x markup:
      // Address logo
      const logoLink = this.querySelector('[slot="logo"]');
      if (logoLink) {
        const logoLinkCopy = logoLink.cloneNode(true);
        const logoLinkWrapper = document.createElement("div");
        logoLinkWrapper.classList.add("pfe-navigation__logo-wrapper");
        logoLinkWrapper.setAttribute("id", "pfe-navigation__logo-wrapper");

        logoLinkCopy.removeAttribute("slot");
        logoLinkCopy.classList.add("pfe-navigation__logo-link");
        logoLinkWrapper.prepend(logoLinkCopy);

        // Add it to the shadow DOM
        const oldShadowLogoWrapper = this.shadowRoot.getElementById("pfe-navigation__logo-wrapper");
        if (oldShadowLogoWrapper) {
          oldShadowLogoWrapper.parentElement.replaceChild(logoLinkWrapper, oldShadowLogoWrapper);
        } else {
          shadowWrapper.prepend(logoLinkWrapper);
        }
      } else {
        this.error("Cannot find a logo in the component tag.");
      }
    }

    ///
    // Add the menu to the correct part of the shadowDom
    ///
    let lightMenu = this.querySelector("#pfe-navigation__menu");
    let hasOneXMenuMarkup = false;
    const pfeNavigationMain = this.querySelector("pfe-navigation-main");
    if (pfeNavigationMain || this.querySelector("pfe-navigation-item")) {
      hasOneXMenuMarkup = true;
    }

    // @note v1.x markup:
    // Add selectors needed for the menu to behave well in 2.x
    if (!lightMenu) {
      if (pfeNavigationMain) {
        lightMenu = this.querySelector("pfe-navigation-main > ul");
        if (lightMenu && lightMenu.id !== "pfe-navigation__menu") {
          lightMenu.id = "pfe-navigation__menu";
          lightMenu.classList.add("pfe-navigation__menu");

          // Add necessary classes to li
          for (let index = 0; index < lightMenu.children.length; index++) {
            lightMenu.children[index].classList.add("pfe-navigation__menu-item");
          }
        }

        // Add necessary classes to top level links
        const oneXTopLevelLinks = lightMenu.querySelectorAll('[slot="trigger"] a');
        for (let index = 0; index < oneXTopLevelLinks.length; index++) {
          oneXTopLevelLinks[index].classList.add("pfe-navigation__menu-link");
        }
      }
    }

    ///
    // @note v1.x markup:
    // Address secondary links by transforming markup and adding it
    ///
    const oneXSecondaryLinks = [];
    const customDropdownsToProcess = [];
    if (hasOneXMenuMarkup) {
      for (let index = 0; index < this.children.length; index++) {
        const pfeNavigationChild = this.children[index];
        if (pfeNavigationChild.tagName === "PFE-NAVIGATION-ITEM") {
          // Trigger is optional
          const trigger = pfeNavigationChild.querySelector('[slot="trigger"]');
          // Trigger link is also optional
          const triggerLink = trigger ? trigger.querySelector("a") : null;
          // Tray is optional
          const tray = pfeNavigationChild.querySelector('[slot="tray"]');

          // These have to be set depending on the markup
          let shadowTrigger = null;
          let toggleName = null;
          if (triggerLink) {
            shadowTrigger = triggerLink.cloneNode(true);
            toggleName = triggerLink.innerText;
          } else if (trigger) {
            toggleName = trigger.innerText;
            shadowTrigger = trigger.cloneNode(true);
            shadowTrigger.removeAttribute("slot");
          } else {
            const unslottedChildLink = pfeNavigationChild.querySelector("a");
            if (unslottedChildLink) {
              toggleName = unslottedChildLink.innerText;
              shadowTrigger = unslottedChildLink;
            }
            // If we can't find any of that markup we can't transform the markup
            else {
              this.error(
                "Attempted to transform 1.x secondary link and couldn't find what we needed.",
                pfeNavigationChild
              );
              break;
            }
          }
          if (tray) {
            // If it's a dropdown, wrap it in pfe-navigation-dropdown
            const dropdown = document.createElement("pfe-navigation-dropdown");
            dropdown.setAttribute("pfe-width", "full");
            dropdown.setAttribute("pfe-icon", pfeNavigationChild.getAttribute("pfe-icon"));
            dropdown.setAttribute("pfe-name", toggleName);
            dropdown.classList.add("pfe-navigation__dropdown--default-styles", "pfe-navigation__dropdown--1-x");
            dropdown.appendChild(pfeNavigationChild);
            oneXSecondaryLinks.push(dropdown);
            customDropdownsToProcess.push(dropdown);
          } else {
            shadowTrigger.classList.add("pfe-navigation__custom-link");
            shadowTrigger.innerHTML = toggleName;
            shadowTrigger.prepend(this._createPfeIcon(pfeNavigationChild.getAttribute("pfe-icon")));
            oneXSecondaryLinks.push(shadowTrigger);
          }
        }
      }
    }

    for (let index = 0; index < oneXSecondaryLinks.length; index++) {
      const liWrapper = document.createElement("li");
      liWrapper.setAttribute("slot", "pfe-navigation--custom-links");
      liWrapper.append(oneXSecondaryLinks[index]);
      this.append(liWrapper);
    }

    // Process any custom dropdowns
    if (customDropdownsToProcess.length > 0) {
      this._processCustomDropdowns(customDropdownsToProcess);
    }

    ///
    // Process Main Menu
    ///
    if (lightMenu) {
      //--------------------------------------------------
      // Begin best time to manipulate DOM in nav
      // Modify elements when they're in the shadow vars before they get appended to the shadow DOM
      //--------------------------------------------------

      // Add attributres we need on the shadow DOM menu wrapper
      newShadowMenuWrapper.setAttribute("id", "pfe-navigation__menu-wrapper");
      newShadowMenuWrapper.classList.add("pfe-navigation__menu-wrapper");

      // Copy light DOM menu into new wrapper, to be put in shadow DOM after manipulations
      newShadowMenuWrapper.append(lightMenu.cloneNode(true));

      // @note v1.x markup:
      // Address menu items by adding class hooks we need to import into shadowDom
      // and classes we need to maintain appropriate styles
      if (hasOneXMenuMarkup) {
        // Remove pfe-navigation-item tag, but keep the important children elements
        const pfeNavigationItems = newShadowMenuWrapper.querySelectorAll("pfe-navigation-item");
        for (let index = 0; index < pfeNavigationItems.length; index++) {
          const pfeNavigationItem = pfeNavigationItems[index];

          const menuListItem = pfeNavigationItem.closest("li");
          menuListItem.classList.add("pfe-navigation__menu-item");
          // Address menu toggle
          let menuItemLink = pfeNavigationItem.querySelector('[slot="trigger"] a');
          if (!menuItemLink && pfeNavigationItem.children[0].tagName === "A") {
            menuItemLink = pfeNavigationItem.children[0];
          }
          if (menuItemLink) {
            menuItemLink.classList.add("pfe-navigation__menu-link");
            menuListItem.prepend(menuItemLink);
          } else {
            this.error("Wasn't able to process toggle", pfeNavigationItem);
          }

          // Address menu dropdown
          let menuItemDropdown =
            pfeNavigationItem.querySelector(".pfe-navigation-grid") ||
            pfeNavigationItem.querySelector(".pfe-navigation__dropdown") ||
            pfeNavigationItem.querySelector("[slot='tray']");
          if (menuItemDropdown) {
            menuItemDropdown.classList.add("pfe-navigation__dropdown");
            const pfeNavigationItemFooter = pfeNavigationItem.querySelector(".pfe-navigation--footer");
            if (pfeNavigationItemFooter) {
              pfeNavigationItemFooter.classList.add("pfe-navigation__footer");
              menuItemDropdown.append(pfeNavigationItemFooter);
            }
            menuListItem.append(menuItemDropdown);
          } else {
            this.error("Wasn't able to process dropdown", pfeNavigationItem);
          }

          // Remove the rest
          menuListItem.removeChild(pfeNavigationItem);
        }
      }

      // Add menu dropdown toggle behavior
      const dropdowns = newShadowMenuWrapper.querySelectorAll(".pfe-navigation__dropdown");
      for (let index = 0; index < dropdowns.length; index++) {
        const dropdown = dropdowns[index];
        let dropdownLink = dropdown.parentElement.querySelector(".pfe-navigation__menu-link");

        // Convert dropdown links into buttons
        const dropdownButton = document.createElement("button");

        // Move over or add important attributes and content
        dropdownButton.setAttribute("class", dropdownLink.getAttribute("class"));
        dropdownButton.classList.add("pfe-navigation__menu-link--has-dropdown");
        // set aria-expanded to false initially bc they will be closed on page load
        dropdownButton.setAttribute("aria-expanded", "false");

        dropdownButton.innerHTML = dropdownLink.innerHTML;
        // Keep data attributes from link with the button
        const dropdownLinkAttributes = dropdownLink.getAttributeNames();
        for (let index = 0; index < dropdownLinkAttributes.length; index++) {
          const currentAttribute = dropdownLinkAttributes[index];
          if (currentAttribute.startsWith("data-")) {
            dropdownButton.setAttribute(currentAttribute, dropdownLink.getAttribute(currentAttribute));
          }
        }
        dropdownButton.dataset.machineName = this._createMachineName(dropdownLink.text);

        // Add dropdown behavior
        dropdownButton.addEventListener("click", this._dropdownItemToggle);
        dropdownLink.parentElement.replaceChild(dropdownButton, dropdownLink);

        // Set Id's for the button and dropdown and add their ID's to the parent li for easy access
        const dropdownButtonId = `main-menu__button--${dropdownButton.dataset.machineName}`;
        const dropdownId = `main-menu__dropdown--${dropdownButton.dataset.machineName}`;
        dropdownButton.setAttribute("id", dropdownButtonId);
        dropdownButton.parentElement.dataset.buttonId = dropdownButtonId;

        // Create wrapper for dropdown and give it appropriate classes and attributes
        const dropdownWrapper = document.createElement("div");

        dropdownWrapper.classList.add("pfe-navigation__dropdown-wrapper");
        if (dropdown.classList.contains("pfe-navigation__dropdown--single-column")) {
          dropdownWrapper.classList.add("pfe-navigation__dropdown-wrapper--single-column");
        }
        dropdownWrapper.setAttribute("id", dropdownId);
        // set aria-hidden to true initially bc the content is hidden on page load
        dropdownWrapper.setAttribute("aria-hidden", "true");
        // Set tabindex in conjuction with aria-hidden true
        dropdownWrapper.setAttribute("tabindex", "-1");

        dropdownWrapper.classList.add("pfe-navigation__dropdown-wrapper--invisible");
        dropdownWrapper.append(dropdown);
        dropdownButton.parentElement.append(dropdownWrapper);
        dropdownButton.parentElement.dataset.dropdownId = dropdownId;
        dropdownButton.setAttribute("aria-controls", dropdownId);
      }
    }
    //--------------------------------------------------
    // End best time to manipulate DOM in nav
    //--------------------------------------------------

    // Replace the menu in the shadow DOM
    shadowMenuWrapper.parentElement.replaceChild(newShadowMenuWrapper, shadowMenuWrapper);

    // Recalculate main menu breakpoint
    this._menuBounds.mainMenuRight = null;
    recalculateMenuBreakpoints = true;

    // Re-set pointers to commonly used elements that just got paved over
    this._menuDropdownXs = this.shadowRoot.getElementById("mobile__dropdown");
    this._menuDropdownMd = this.shadowRoot.getElementById("pfe-navigation__menu-wrapper");
    if (!this._menuDropdownMd) {
      this.classList.add("pfe-navigation--no-main-menu");
    }

    // Add event listener for selected options
    shadowWrapper.addEventListener("click", this._getOption);

    // Add menu burger behavior
    this._mobileToggle.addEventListener("click", this._toggleMobileMenu);

    // Add search toggle behavior
    this._searchToggle.addEventListener("click", this._toggleSearch);

    // General keyboard listener attached to the entire component
    // @todo/bug: figure out why this event listener only fires once you have tabbed into the menu but not if you have just clicked open menu items with a mouse click on Firefox - functions properly on Chrome
    this.addEventListener("keydown", this._generalKeyboardListener);

    // Give all dropdowns aria-hidden since they're shut by default
    this.shadowRoot.querySelector(".pfe-navigation__dropdown-wrapper").setAttribute("aria-hidden", "true");
    // Set tabindex -1 in conjuction with aria-hidden true
    this.shadowRoot.querySelector(".pfe-navigation__dropdown-wrapper").setAttribute("tabindex", "-1");

    // Give all dropdowns closed attributes by default
    const dropdownWrappers = this.shadowRoot.querySelector(".pfe-navigation__dropdown-wrapper");
    if (dropdownWrappers) {
      for (let index = 0; index < dropdownWrappers.length; index++) {
        const dropdownWrapper = dropdownWrappers[index];
        this._addCloseDropdownAttributes(dropdownWrapper);
      }
    }

    // Set initial on page load aria settings on all original buttons and their dropdowns
    this._addCloseDropdownAttributes(this._mobileToggle, this._currentMobileDropdown);
    this._addCloseDropdownAttributes(this._searchToggle, this._searchSpotMd);

    this._setCurrentMobileDropdown();

    // Make sure search slot is in the right spot, based on breakpoint
    this._moveSearchSlot();
    // Reconnecting mutationObserver for IE11 & Edge
    if (window.ShadyCSS) {
      this._observer.observe(this, lightDomObserverConfig);
    }

    // Timeout lets these run a little later
    if (recalculateMenuBreakpoints) {
      window.setTimeout(this._calculateMenuBreakpoints, 100);
    }

    if (this.isOpen()) {
      this._changeNavigationState(this.getAttribute("open-toggle"), "open");
    }

    // Some cleanup and state management for after render
    const postProcessLightDom = () => {
      // Preventing issues in IE11 & Edge
      if (window.ShadyCSS) {
        this._observer.disconnect();
      }

      if (this.isMobileMenuButtonVisible() && !this.isOpen("mobile__button")) {
        this._addCloseDropdownAttributes(this._mobileToggle, this._currentMobileDropdown);
      }
      const mobileSliderElements = this.querySelectorAll("[mobile-slider]");
      for (let index = 0; index < mobileSliderElements.length; index++) {
        const currentMobileSliderElement = mobileSliderElements[index];
        this._getLastFocusableItemInMobileSlider(currentMobileSliderElement);
        const toggle = currentMobileSliderElement.querySelector(".pfe-navigation__custom-link");
        const dropdown = currentMobileSliderElement.querySelector(".pfe-navigation__dropdown");
        if (toggle && toggle.id && dropdown) {
          this._mobileSliderMutationObservers[toggle.id] = new MutationObserver(() =>
            this._getLastFocusableItemInMobileSlider(currentMobileSliderElement)
          );
          this._mobileSliderMutationObservers[toggle.id].observe(dropdown, { subtree: true, childList: true });
        }
      }

      // Reconnecting mutationObserver for IE11 & Edge
      if (window.ShadyCSS) {
        this._observer.observe(this, lightDomObserverConfig);
      }
    };

    // Add custom event for interactive elements in shadowDom so anayltics can capture them acccurately
    const interactiveShadowDomElements = this.shadowRoot.querySelectorAll(this._focusableElements);
    for (let index = 0; index < interactiveShadowDomElements.length; index++) {
      interactiveShadowDomElements[index].addEventListener("click", this._shadowDomInteraction);
    }
    window.setTimeout(postProcessLightDom, 10);
  } // end _processLightDom()

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
   * Calculate the points where the main menu and secondary links should be collapsed and adds them
   * To recalculate a breakpoint set this.menuBreakpoint[name] to null and run this function.
   */
  _calculateMenuBreakpoints() {
    let recreateMediaQueries = false;

    // Calculate space needed for logo
    if (this._menuBounds.logoRight === null) {
      const logoWrapper = this.shadowRoot.getElementById("pfe-navigation__logo-wrapper");
      if (logoWrapper) {
        const logoBoundingRect = logoWrapper.getBoundingClientRect();
        const logoRight = Math.ceil(logoBoundingRect.right);
        if (logoRight !== this._menuBounds.logoRight) {
          this._menuBounds.logoRight = logoRight;
          recreateMediaQueries = true;
        }
      }
    }

    // Calculate space needed for logo and main menu
    if (!this._menuBounds.mainMenuRight && !this.isMobileMenuButtonVisible()) {
      const navigation = this.shadowRoot.getElementById("pfe-navigation__menu");
      if (navigation) {
        const navigationBoundingRect = navigation.getBoundingClientRect();

        // Gets the length from the left edge of the screen to the right side of the navigation
        const mainMenuRight = Math.ceil(navigationBoundingRect.right);
        if (mainMenuRight !== this._menuBounds.mainMenuRight) {
          this._menuBounds.mainMenuRight = mainMenuRight;
          recreateMediaQueries = true;
        }
      }
    }

    // Calculate space needed for right padding and secondary links
    if (!this._menuBounds.secondaryLinksLeft && !this.isSecondaryLinksSectionCollapsed()) {
      let leftMostSecondaryLink = null;
      let secondaryLinksLeft = null;
      let leftMostSecondaryLinkBoundingRect = null;

      if (this.hasSlot("pfe-navigation--search")) {
        leftMostSecondaryLink = this._searchToggle;
      } else if (this.hasSlot("pfe-navigation--custom-links")) {
        leftMostSecondaryLink = this.getSlot("pfe-navigation--custom-links")[0];
      } else if (this.hasSlot("pfe-navigation--account")) {
        leftMostSecondaryLink = this.getSlot("pfe-navigation--account");
      } else {
        // We don't have a left most secondary link, use padding on the nav
        secondaryLinksLeft = window.getComputedStyle(this._shadowDomOuterWrapper, false).paddingRight;
      }

      if (leftMostSecondaryLink) {
        leftMostSecondaryLinkBoundingRect = leftMostSecondaryLink.getBoundingClientRect();

        // Gets the length from the right edge of the screen to the left side of the left most secondary link
        secondaryLinksLeft = window.innerWidth - Math.ceil(leftMostSecondaryLinkBoundingRect.left);
      }
      if (secondaryLinksLeft && secondaryLinksLeft !== this._menuBounds.secondaryLinksLeft) {
        this._menuBounds.secondaryLinksLeft = window.innerWidth - Math.ceil(leftMostSecondaryLinkBoundingRect.left);
        recreateMediaQueries = true;
      }
    }

    // Get Main Menu Breakpoint
    if (recreateMediaQueries) {
      if (this._menuBounds.secondaryLinksLeft) {
        if (this._menuBounds.mainMenuRight) {
          this._menuBreakpoints.mainMenu = this._menuBounds.mainMenuRight + this._menuBounds.secondaryLinksLeft;
        } else if (this._menuBounds.logoRight) {
          // 20 is some white space so the logo and secondary links have some breathing room
          this._menuBreakpoints.mainMenu = this._menuBounds.logoRight + this._menuBounds.secondaryLinksLeft + 20;
        }

        // Remove old listener
        if (this._menuBreakpointQueries.mainMenu) {
          this._menuBreakpointQueries.mainMenu.removeEventListener("change", this._collapseMainMenu);
        }
        // Create new one
        this._menuBreakpointQueries.mainMenu = window.matchMedia(`(max-width: ${this._menuBreakpoints.mainMenu}px)`);
        this._menuBreakpointQueries.mainMenu.addEventListener("change", this._collapseMainMenu);
      }
    }

    if (this._menuBounds.logoRight && this._menuBounds.secondaryLinksLeft) {
      // 60px is the width of the menu burger + some extra space
      this._menuBreakpoints.secondaryLinks = this._menuBounds.logoRight + this._menuBounds.secondaryLinksLeft + 60;

      // Remove old listener
      if (this._menuBreakpointQueries.secondaryLinks) {
        this._menuBreakpointQueries.secondaryLinks.removeEventListener("change", this._collapseMainMenu);
      }
      // Create new listener
      this._menuBreakpointQueries.secondaryLinks = window.matchMedia(
        `(max-width: ${this._menuBreakpoints.secondaryLinks}px)`
      );
      this._menuBreakpointQueries.secondaryLinks.addEventListener("change", this._collapseSecondaryLinks);
    }

    this.log("Menu Bounds updated, updating mediaQueries", {
      menuBounds: this._menuBounds,
      menuBreakpoints: this._menuBreakpoints
    });
  }

  /**
   * Depending on breakpoint we need to move the search slot to one of two places to make a logical tab order
   */
  _moveSearchSlot() {
    if (this.isSecondaryLinksSectionCollapsed()) {
      this._removeDropdownAttributes(null, this._searchSpotMd);
      if (this._searchSlot.parentElement !== this._searchSpotXs) {
        this._searchSpotXs.appendChild(this._searchSlot);
      }
    } else {
      if (this._searchSlot.parentElement !== this._searchSpotMd) {
        this._searchSpotMd.appendChild(this._searchSlot);
      }
      if (this.isOpen("secondary-links__button--search")) {
        this._addOpenDropdownAttributes(null, this._searchSpotMd);
      } else {
        this._addCloseDropdownAttributes(null, this._searchSpotMd);
      }
    }
  }

  /**
   * Adjustments to behaviors and DOM that need to be made after a resize event
   */
  _postResizeAdjustments() {
    if (this._menuBreakpoints.mainMenu === null || this._menuBreakpoints.secondaryLinks === null) {
      this._calculateMenuBreakpoints();
    }

    const oldMobileDropdown = this._currentMobileDropdown;
    this._setCurrentMobileDropdown();
    const isMobileMenuButtonVisible = this.isMobileMenuButtonVisible();
    const isSecondaryLinksSectionCollapsed = this.isSecondaryLinksSectionCollapsed();
    const openToggleId = this.getAttribute("open-toggle");
    const openToggle = openToggleId ? this.getToggleElement(openToggleId) : null;
    const openDropdownId = openToggleId ? this._getDropdownId(openToggleId) : null;
    const openDropdown = openDropdownId ? this.getDropdownElement(openDropdownId) : null;
    const breakpointWas = this.getAttribute("breakpoint");
    let breakpointIs = null;

    if (isMobileMenuButtonVisible) {
      if (isSecondaryLinksSectionCollapsed) {
        breakpointIs = "mobile";
      } else {
        breakpointIs = "tablet";
      }
    } else {
      breakpointIs = "desktop";
    }

    // If we went from mobile/tablet to desktop
    if (breakpointWas !== "desktop" && breakpointIs === "desktop") {
      this._removeDropdownAttributes(this._mobileToggle, this._currentMobileDropdown);

      // Mobile button doesn't exist on desktop, so we need to clear the state if that's the only thing that's open
      if (openToggleId === "mobile__button") {
        this.removeAttribute("open-toggle");
      }

      // Nothing should have a height set in JS at desktop
      if (openDropdown) {
        openDropdown.style.removeProperty("height");
      }
    }
    // If we went from desktop to tablet/mobile
    else if (breakpointIs !== "desktop" && breakpointWas === "desktop") {
      if (this.isOpen("mobile__button")) {
        this._addOpenDropdownAttributes(this._mobileToggle, this._currentMobileDropdown);
        // Need to show the overlay if the mobile dropdown is open now that it's a dropdown again
        this._overlay.hidden = false;
      } else {
        this._addCloseDropdownAttributes(this._mobileToggle, this._currentMobileDropdown);
      }

      // Manage any items that have heights set in JS
      if (openToggleId) {
        if (openToggleId.substr(0, 19) === "main-menu__button--") {
          this._setDropdownHeight(openDropdown);
        } else if (openToggleId.substr(0, 29) === "pfe-navigation__custom-link--") {
          openDropdown.style.removeProperty("height");
        }
      }
    }
    // If we went from desktop/tablet to mobile
    else if (breakpointWas !== "mobile" && breakpointIs === "mobile") {
      if (openToggle) {
        const mobileSlideParent = openToggle.closest("[mobile-slider]");
        if (mobileSlideParent) {
          this.setAttribute("mobile-slide");
        }
      }
    }

    if (breakpointIs === "mobile" || breakpointIs === "tablet") {
      // Manage any items that have heights set in JS
      if (openToggleId) {
        if (
          openToggleId.substr(0, 19) === "main-menu__button--" ||
          openToggleId.substr(0, 29) === "pfe-navigation__custom-link--"
        ) {
          this._setDropdownHeight(openDropdown);
        }
      }
    }

    // If the mobile dropdown has changed, remove the dropdown attributes from the old one
    if (this._currentMobileDropdown !== oldMobileDropdown && oldMobileDropdown !== null) {
      this._removeDropdownAttributes(null, oldMobileDropdown);
    }

    // Manage overlay state
    if (this.isOpen() && (breakpointIs === "desktop" || breakpointIs === "tablet")) {
      this._overlay.hidden = false;
    } else {
      this._overlay.hidden = true;
    }

    // Make sure search slot is in the right spot, based on breakpoint
    this._moveSearchSlot();

    // ! These lines need to be at the end of this function
    this.classList.remove("pfe-navigation--is-resizing");

    // Set layout state vars for next resize
    this._wasMobileMenuButtonVisible = isMobileMenuButtonVisible;
    this._wasSecondaryLinksSectionCollapsed = isSecondaryLinksSectionCollapsed;

    this.setAttribute("breakpoint", breakpointIs);
  } // end _postResizeAdjustments()

  /**
   * Event listeners for toggles
   */
  _toggleMobileMenu() {
    if (!this.isOpen("mobile__button")) {
      this._changeNavigationState("mobile__button", "open");
      // Show main menu when mobile All Red Hat menu is closed
      this._a11yShowMobileMainMenu();
    } else {
      this._changeNavigationState("mobile__button", "close");
      // @todo: (KS) decide if I need this (i do not think so rn)
      // Hide main menu when mobile All Red Hat menu is open
      // this._a11yHideMobileMainMenu();
    }
  }

  _toggleSearch() {
    this._changeNavigationState("secondary-links__button--search");
    // Event for analytics to grab onto if they want
    this.emitEvent(PfeNavigation.events.searchSelected, {
      composed: true
    });
    // Move focus to search field when Desktop search button is activated
    this._searchFieldFocusHandler();
  }

  _dropdownItemToggle(event) {
    event.preventDefault();
    const dropdownItem = event.target;
    const toggleId = dropdownItem.getAttribute("id");
    this.emitEvent(PfeNavigation.events.topLevelSelected, {
      detail: { value: toggleId }
    });
    this._changeNavigationState(toggleId);
  }

  /**
   * Default Keydown Keyboard event handler
   * @param {object} event
   */
  _generalKeyboardListener(event) {
    // event.which is deprecated
    // see @resource: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/which
    const key = event.key;

    if (key === "Escape") {
      const currentlyOpenToggleId = this.getAttribute("open-toggle");
      const openToggle = this.getDropdownElement(currentlyOpenToggleId);
      const mobileMenuToggle = this.shadowRoot.querySelector("#mobile__button");
      const currentBreakpoint = this.getAttribute("breakpoint");

      event.preventDefault();
      event.stopPropagation();

      // Mobile
      if (currentBreakpoint === "mobile") {
        // close mobile menu
        this._changeNavigationState("mobile__button", "close");
        // Set the focus back onto the mobile menu trigger toggle only when escape is pressed
        mobileMenuToggle.focus();
      }
      // Tablet
      else if (currentBreakpoint === "tablet") {
        // if it's a child of main menu (e.g. currentlyOpenToggleId.startsWith("main-menu") -- accordion dropdown) close mobile__button
        // Else close currentlyOpenToggleId -- desktop menu
        if (currentlyOpenToggleId.substr(0, 9) === "main-menu") {
          this._changeNavigationState("mobile__button", "close");
          // Set the focus back onto the mobile menu trigger toggle only when escape is pressed
          mobileMenuToggle.focus();
        } else {
          this._changeNavigationState(currentlyOpenToggleId, "close");
          // Set the focus back onto the trigger toggle only when escape is pressed
          openToggle.focus();
        }
      } else {
        // Desktop
        // close desktop menu
        this._changeNavigationState(currentlyOpenToggleId, "close");
        // Set the focus back onto the trigger toggle only when escape is pressed
        openToggle.focus();
      }
    }
  }

  /**
   * Back to Menu Event Handler
   * close All Red Hat Menu and go back to Main Mobile Menu and set focus back to All Red Hat Toggle
   * Show main menu
   */
  // @todo All Red Hat
  _siteSwitcherBackClickHandler() {
    this._changeNavigationState("mobile__button", "open");
    // Show main menu when All Red Hat menu is closed
    this._a11yShowMobileMainMenu();
    this._siteSwitcherToggle.focus();
  }

  /**
   * Overlay Event Handler
   * close menu when overlay is clicked
   */
  _overlayClickHandler() {
    const openToggleId = this.getAttribute("open-toggle");
    this._changeNavigationState(openToggleId, "close");
    if (this.isSecondaryLinksSectionCollapsed()) {
      // Mobile
      // close mobile menu
      this._changeNavigationState("mobile__button", "close");
    } else if (this.isMobileMenuButtonVisible()) {
      // Tablet-ish
      // if it's a child of main menu (e.g. openToggleId.startsWith("main-menu") -- accordion dropdown) close mobile__button
      // Else close openToggleId -- desktop menu
      if (openToggleId.substr(0, 9) === "main-menu") {
        this._changeNavigationState("mobile__button", "close");
      } else {
        this._changeNavigationState(openToggleId, "close");
      }
    } else {
      // Desktop
      // close desktop menu
      this._changeNavigationState(openToggleId, "close");
    }
  }

  /**
   * Item Selection Event Handler
   * emit custom event when options are selected
   *
   * Note: if data attributes are added in the light dom, in might make sense to check for those first
   * if present, attribute values could be returned with element text as a fallback
   */
  _getOption(e) {
    if (e.target.tagName === "BUTTON" || e.target.tagName === "A") {
      this.emitEvent(PfeNavigation.events.optionSelected, {
        detail: {
          value: `${
            e.target.hasAttribute("data-analytics-label")
              ? e.target.getAttribute("data-analytics-label")
              : e.target.innerText
          }`,
          nested_level: `${
            e.target.hasAttribute("data-analytics-level")
              ? e.target.getAttribute("data-analytics-level")
              : "data-analytics-level attribute not found"
          }`,
          path: `${
            e.target.hasAttribute("data-analytics")
              ? e.target.getAttribute("data-analytics")
              : "data-analytics attribute not found"
          }`
        }
      });
    }
  }

  /**
   * Sticky Handler
   * turn nav into sticky nav
   */
  _stickyHandler() {
    if (window.pageYOffset >= this.top) {
      this.classList.add("pfe-sticky");
    } else {
      this.classList.remove("pfe-sticky");
    }
  }

  /**
   * Hide main menu from screen readers and keyboard when mobile All Red Hat menu is open
   */
  _a11yHideMobileMainMenu() {
    // Search
    this._searchSpotXs.setAttribute("hidden", "");

    // Main menu
    if (this._menuDropdownMd) {
      this._menuDropdownMd.setAttribute("hidden", "");
    }

    // @todo All Red Hat
    // All Red Hat Toggle
    // this._siteSwitcherToggle.setAttribute("hidden", "");
  }

  /**
   * Show main menu to screen readers and keyboard users when Back to main menu button is pressed
   */
  _a11yShowMobileMainMenu() {
    // Search
    this._searchSpotXs.removeAttribute("hidden", "");

    // Main menu
    if (this._menuDropdownMd) {
      this._menuDropdownMd.removeAttribute("hidden", "");
    }
    // @todo All Red Hat
    // All Red Hat Toggle
    // this._siteSwitcherToggle.removeAttribute("hidden", "");
  }

  /**
   * Set focus to search field when search button is pressed on Desktop
   * if search input exists set to the light dom search input field (either type=text or type=search) so focus is in the correct place for screen readers and keyboards
   */
  _searchFieldFocusHandler() {
    const searchBox = document.querySelector(
      ".pfe-navigation__search  input[type='text'], .pfe-navigation__search  input[type='search']"
    );

    if (searchBox) {
      searchBox.focus();
    }
  }

  /**
   * Utility function to create log in link
   * @param {string} logInUrl URL for login
   * @return {object} DOM Object for link
   */
  _createLogInLink(logInUrl) {
    if (this._accountLogInLink === null) {
      const logInLink = document.createElement("a");
      logInLink.setAttribute("href", logInUrl);
      // @todo Translate
      logInLink.innerText = "Log In";
      logInLink.classList.add("pfe-navigation__log-in-link");
      logInLink.prepend(this._createPfeIcon("web-icon-user"));
      logInLink.id = "pfe-navigation__log-in-link";
      this._accountLogInLink = logInLink;
      return logInLink;
    }
  }

  /**
   * Creates Avatar Markup
   * @param {string} name User's Name
   * @param {string} src Optional, Path to avatar image
   */
  _createPfeAvatar(name, src) {
    const pfeAvatar = document.createElement(`pfe-avatar`);
    pfeAvatar.setAttribute("name", name);
    pfeAvatar.setAttribute("shape", "circle");

    if (typeof src === "string") {
      pfeAvatar.setAttribute("src", src);
    }

    return pfeAvatar;
  }

  /**
   * Create Account menu button
   * @param {string} fullName Full name of the user
   * @param {string} avatarSrc URL for an avatar image
   * @return {object} Reference to toggle
   */
  _createAccountToggle(fullName, avatarSrc) {
    if (this._accountToggle === null) {
      const accountToggle = document.createElement("button");
      accountToggle.classList.add("pfe-navigation__account-toggle");
      accountToggle.id = "pfe-navigation__account-toggle";
      // @todo probably needs more a11y thought
      accountToggle.setAttribute("aria-label", "Open user menu");

      const pfeAvatar = this._createPfeAvatar(fullName, avatarSrc);
      accountToggle.append(pfeAvatar);
      this._accountToggle = accountToggle;

      return accountToggle;
    }
  }

  /**
   * Handle DOM updates on the account dropdown
   * @param {object} mutationItem Part of a mutationObserver event object for the change
   */
  _processAccountDropdownChange(mutationItem) {
    // If the account component doesn't exist yet we can't do anything
    if (!this._accountComponent) {
      // If we don't have accountComponent set yet and we can confirm this is it, set the var.
      if (
        mutationItem.target.getAttribute("slot") === "pfe-navigation--account" &&
        mutationItem.target.parentElement.tagName === "PFE-NAVIGATION"
      ) {
        this._accountComponent = mutationItem.target;
      }
      // If we can't find the accountComponent and it isn't set, we can't do anything else.
      else {
        return;
      }
    }
    if (this._accountLogInLink === null) {
      // Create login link
      if (this._accountComponent) {
        const logInLink = this._accountComponent.getAttribute("login-link");
        if (logInLink) {
          this._accountOuterWrapper.prepend(this._createLogInLink(logInLink));
        }
      }
    } else if (mutationItem.type === "attributes" && mutationItem.attributeName === "login-link") {
      // Deal with login link changes
      this.shadowRoot
        .getElementById("pfe-navigation__log-in-link")
        .setAttribute("href", this._accountComponent.getAttribute("login-link"));
    }

    if (this._accountToggle === null) {
      // Create account toggle
      const fullName = this._accountComponent.getAttribute("full-name");
      if (fullName) {
        this._accountOuterWrapper.prepend(
          this._createAccountToggle(fullName, this._accountComponent.getAttribute("avatar-url"))
        );
        this._accountOuterWrapper.classList.add("pfe-navigation__account-wrapper--logged-in");
        this._accountToggle.setAttribute("aria-controls", this._accountSlot.id);
        this._addCloseDropdownAttributes(this._accountToggle, this._accountSlot);

        this._accountToggle.addEventListener("click", () => {
          this._changeNavigationState(this._accountToggle.id);
        });

        // Recalculate secondary links breakpoint
        this._menuBreakpoints.secondaryLinks = null;
        this._menuBreakpoints.mainMenu = null;
      }
    } else {
      // Deal with account toggle changes
      let prefix = "";
      // Pre 1.x compatability
      if (typeof this.hasSlot === "undefined") {
        prefix = `pfe-`;
      }
      if (mutationItem.type === "attributes") {
        if (mutationItem.attributeName === "avatar-url") {
          this._accountToggle
            .querySelector("pfe-avatar")
            .setAttribute(`${prefix}src`, this._accountComponent.getAttribute("avatar-url"));
        }
        if (mutationItem.attributeName === "full-name") {
          this._accountToggle
            .querySelector("pfe-avatar")
            .setAttribute(`${prefix}full-name`, this._accountComponent.getAttribute("full-name"));
        }
      }
    }

    this._menuBounds.secondaryLinksLeft = null;
    window.setTimeout(this._calculateMenuBreakpoints, 100);
  }

  /**
   * Handle the slot change event
   */
  _processAccountSlotChange() {
    const slottedElements = this.getSlot("pfe-navigation--account");
    if (slottedElements) {
      this._accountOuterWrapper.hidden = false;
      if (this._accountComponent === null) {
        let initAccountDropdown = false;
        for (let index = 0; index < slottedElements.length; index++) {
          if (slottedElements[index].tagName === "PFE-NAVIGATION-ACCOUNT") {
            if (this._accountComponent === null) {
              initAccountDropdown = true;
            }
            this._accountComponent = slottedElements[index];
            this._processAccountDropdownChange();
          }
        }
      }
    } else {
      this._accountOuterWrapper.hidden = true;
    }
  }

  /**
   * Gets the last focusable element in a mobile-slider so we can trap focus
   * @param {object} mobileSwipeParent DOM Element that is slotted and has the mobile-slider attribute
   * @return {object} DOM Reference to last focusable element
   */
  _getLastFocusableItemInMobileSlider(mobileSwipeParent) {
    const dropdown = mobileSwipeParent.querySelector(".pfe-navigation__dropdown");
    let focusableChildren = null;
    if (dropdown) {
      focusableChildren = dropdown.querySelectorAll(this._focusableElements);
    }
    if (focusableChildren.length) {
      const toggle = mobileSwipeParent.querySelector(".pfe-navigation__custom-link");
      const firstFocusableElement = focusableChildren[0];
      const lastFocusableElement = focusableChildren[focusableChildren.length - 1];

      // Initialize arrays for first and last elements and events if they don't exist
      if (!this._mobileSliderFocusTrapElements[toggle.id]) {
        this._mobileSliderFocusTrapElements[toggle.id] = [];
      }
      if (!this._mobileSliderFocusTrapEvents[toggle.id]) {
        this._mobileSliderFocusTrapEvents[toggle.id] = [];
      }

      // If there was any change in the first or last element, redo everything
      if (
        !this._mobileSliderFocusTrapElements[toggle.id] ||
        this._mobileSliderFocusTrapElements[toggle.id]["last"] !== lastFocusableElement ||
        !this._mobileSliderFocusTrapElements[toggle.id] ||
        this._mobileSliderFocusTrapElements[toggle.id]["first"] !== firstFocusableElement
      ) {
        // Preventing issues in IE11 & Edge
        if (window.ShadyCSS && this._mobileSliderMutationObservers[toggle.id]) {
          this._mobileSliderMutationObservers[toggle.id].disconnect();
        }

        // Cleanup any previous last focusable elements
        const previousLastFocusableElement = this._mobileSliderFocusTrapElements[toggle.id]
          ? this._mobileSliderFocusTrapElements[toggle.id]["last"]
          : null;
        if (previousLastFocusableElement) {
          previousLastFocusableElement.removeEventListener(
            "keydown",
            this._mobileSliderFocusTrapEvents[toggle.id]["last"]
          );
        }

        // Setup new last focusable element
        this._mobileSliderFocusTrapElements[toggle.id]["last"] = lastFocusableElement;
        this._mobileSliderFocusTrapEvents[toggle.id]["last"] = event => {
          if (event.key === "Tab") {
            if (this.getAttribute("breakpoint") === "mobile") {
              if (!event.shiftKey) {
                event.preventDefault();
                firstFocusableElement.focus();
                console.log(firstFocusableElement);
              }
            }
          }
        };
        lastFocusableElement.addEventListener("keydown", this._mobileSliderFocusTrapEvents[toggle.id]["last"]);

        // Handle first focusable element
        // Cleanup any previous first focusable elements
        const previousFirstFocusableElement = this._mobileSliderFocusTrapElements[toggle.id]
          ? this._mobileSliderFocusTrapElements[toggle.id]["first"]
          : null;
        if (previousFirstFocusableElement) {
          previousFirstFocusableElement.removeEventListener(
            "keydown",
            this._mobileSliderFocusTrapEvents[toggle.id]["first"]
          );
        }

        // Setup new first focusable element
        this._mobileSliderFocusTrapElements[toggle.id]["first"] = firstFocusableElement;
        this._mobileSliderFocusTrapEvents[toggle.id]["first"] = event => {
          if (event.key === "Tab") {
            if (this.getAttribute("breakpoint") === "mobile") {
              if (event.shiftKey) {
                event.preventDefault();
                lastFocusableElement.focus();
                console.log(lastFocusableElement);
              }
            }
          }
        };
        firstFocusableElement.addEventListener("keydown", this._mobileSliderFocusTrapEvents[toggle.id]["first"]);

        // Reconnecting mutationObserver for IE11 & Edge
        if (window.ShadyCSS && this._mobileSliderMutationObservers[toggle.id]) {
          this._mobileSliderMutationObservers[toggle.id].observe(dropdown, { subtree: true, childList: true });
        }
      }
    } else {
      this.log("Couldn't find any focusable children in a mobile-slide element", mobileSwipeParent);
    }
  }
}

PFElement.create(PfeNavigation);

class PfeNavigationDropdown extends PFElement {
  static get tag() {
    return "pfe-navigation-dropdown";
  }

  get schemaUrl() {
    return "pfe-navigation-dropdown.json";
  }

  get templateUrl() {
    return "pfe-navigation-dropdown.html";
  }

  get styleUrl() {
    return "pfe-navigation-dropdown.scss";
  }

  static get events() {
    return {};
  }

  static get properties() {
    return {};
  }

  static get slots() {
    return {};
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }

  static get observedAttributes() {}

  constructor() {
    super(PfeNavigationDropdown, { type: PfeNavigationDropdown.PfeType });
  }

  connectedCallback() {
    super.connectedCallback();

    ///
    // @note v1.x markup:
    // 1.x secondary links with special slots should appear in dropdown
    ///
    for (let index = 0; index < this.children.length; index++) {
      const child = this.children[index];
      const childSlot = child.getAttribute("slot");

      if (childSlot) {
        const newSlot = document.createElement("slot");
        newSlot.setAttribute("name", childSlot);
        this.shadowRoot.getElementById("dropdown-container").appendChild(newSlot);
      }

      const trigger = this.querySelector('[slot="trigger"]');
      if (trigger) {
        trigger.hidden = true;
      }

      const tray = this.querySelector('[slot="tray"]');
      if (tray) {
        tray.hidden = false;
      }
    }
  }
}

PFElement.create(PfeNavigationDropdown);

export default PfeNavigation;
