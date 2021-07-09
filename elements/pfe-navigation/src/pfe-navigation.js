// -- @TODO Set icons to hide if they all fail to load, else set them to preserve space

// Import polyfills: filter, matches, closest, includes, path
import "./polyfills--pfe-navigation.js";

import PFElement from "../../pfelement/dist/pfelement.js";
import PfeNavigationItem from "./pfe-navigation-item.js";
import PfeNavigationMain from "./pfe-navigation-main.js";
import PfeAccordion from "../../pfe-accordion/dist/pfe-accordion.js";

class PfeNavigation extends PFElement {
  static get tag() {
    return "pfe-navigation";
  }

  get templateUrl() {
    return "pfe-navigation.html";
  }

  get styleUrl() {
    return "pfe-navigation.scss";
  }

  static get observerProperties() {
    return {
      childList: true,
      subtree: true,
      characterData: true,
    };
  }

  get overlay() {
    return !this._overlay.hasAttribute("hidden");
  }

  set overlay(showOverlay) {
    if (showOverlay) {
      // Add the overlay to the page
      this._overlay.removeAttribute("hidden");

      // This prevents background scroll while nav is open
      // Capture any initial style from the document
      this._overflowStyleInit = document.body.style.overflow;
      // Apply the overflow hidden to prevent scrolling
      document.body.style.overflow = "hidden";

      this._wrapper.setAttribute("aria-expanded", "true");
    } else {
      // Remove the overlay from the page
      this._overlay.setAttribute("hidden", "");

      // Allow background to scroll again by returning it to the initial state or null (which removes it)
      document.body.style.overflow = this._overflowStyleInit || null;

      this._wrapper.setAttribute("aria-expanded", "false");
    }
  }

  //-- Key values map to slot names, accepts an array for [min, max] breakpoint
  //-- leave off 'px', if slot name includes a dash, quote the key
  get sectionBreakpoints() {
    // If an override is provided, use that
    if (this._sectionBreakpoints) return this._sectionBreakpoints;

    // If only one value exists in the array, it starts at that size and goes up
    return {
      main: [0, 1023], // visible from 0 - 1200px
      search: [640], // visible from 768px +
      "mobile-search": [0, 639],
      language: [640],
      "mobile-language": [0, 639],
      login: [640],
      "mobile-login": [0, 639],
    };
  }

  /**
   * @param  {Object} customBP
   */
  set sectionBreakpoints(customBP) {
    this._sectionBreakpoints = customBP;
  }

  static get properties() {
    return {
      fullWidth: {
        title: "Full Width",
        type: Boolean,
        cascade: ["pfe-navigation-item"],
      },
      horizontal: {
        title: "Horizontal display",
        type: Boolean,
        observer: "_displayHandler",
      },
      sticky: {
        title: "Sticky navigation support",
        type: Boolean,
        observer: "_stickyHandler",
      },
      closeOnClick: {
        title: "Navigation should close via external clicks",
        type: Boolean,
        // observer: "_closeOnClickHandler",
      },
      pfeFullWidth: {
        alias: "fullWidth",
      },
      oldSticky: {
        alias: "sticky",
      },
      oldCloseOnClick: {
        alias: "closeOnClick",
      },
    };
  }

  constructor() {
    super(PfeNavigation);

    // Attach functions for use below
    this._init = this._init.bind(this);
    this._buildMobileAccordion = this._buildMobileAccordion.bind(this);
    this._setVisibility = this._setVisibility.bind(this);
    this._checkStickyState = this._checkStickyState.bind(this);

    // Attribute handlers
    this._stickyHandler = this._stickyHandler.bind(this);
    // this._closeOnClickHandler = this._closeOnClickHandler.bind(this);
    this._displayHandler = this._displayHandler.bind(this);

    // Event handlers
    this._accordionEventMap = this._accordionEventMap.bind(this);
    this._resizeHandler = this._resizeHandler.bind(this);
    this._focusHandler = this._focusHandler.bind(this);
    this._blurHandler = this._blurHandler.bind(this);
    this._overlayClickHandler = this._overlayClickHandler.bind(this);

    this._observer = new MutationObserver(this._init);

    this._desktop = this.shadowRoot.querySelector(`.${this.tag}__main--horizontal`);
    this._mobile = this.shadowRoot.querySelector(`.${this.tag}__main--dropdown`);
    this._mobileTemplate = this.shadowRoot.querySelector("#accordion-item");

    // Capture shadow elements
    this._overlay = this.shadowRoot.querySelector(`.${this.tag}__overlay`);
    this._wrapper = this.shadowRoot.querySelector(`.${this.tag}__wrapper`);
    this._menuItem = this.shadowRoot.querySelector(`${PfeNavigationItem.tag}[is-menu-dropdown]`);

    this._slots = {
      skip: this.shadowRoot.querySelector(`.${this.tag}__skip`),
      language: this.shadowRoot.querySelector(`${PfeNavigationItem.tag}[is-language]`),
      login: this.shadowRoot.querySelector(`${PfeNavigationItem.tag}[is-login]`),
    };

    // Initialize
    this._navigationItems = [];
    this.overlay = false;
  }

  connectedCallback() {
    super.connectedCallback();

    // Attach an observer for dynamically injected content
    this._observer.observe(this, PfeNavigation.observerProperties);

    // If this element contains no light DOM, escape now
    if (!this.hasLightDOM()) return;

    // @TODO Post-IE11 support, swap these to `await`
    // Wait until the item and main navigation are defined
    Promise.all([
      customElements.whenDefined(PfeNavigationItem.tag),
      customElements.whenDefined(PfeNavigationMain.tag),
      customElements.whenDefined(PfeAccordion.tag),
    ]).then(() => this._init());
  }

  // TODO come back to this
  disconnectedCallback() {
    super.disconnectedCallback();

    // Remove the scroll, resize, and outside click event listeners
    window.removeEventListener("resize", this._resizeHandler);

    if (this.sticky) window.removeEventListener("scroll", this._checkStickyState);

    this.removeEventListener(PfeAccordion.events.change, this._accordionEventMap);

    if (this.hasSlot("skip")) {
      [...this.querySelectorAll("[slot=skip] a")].map((link) => link.removeEventListener("focus", this._focusHandler));
      [...this.querySelectorAll("[slot=skip] a")].map((link) => link.removeEventListener("blur", this._blurHandler));
    }

    this._observer.disconnect();
  }

  /**
   * Handles the indicators for when the navigation is in a sticky state or not
   */
  _checkStickyState() {
    // If sticky navigation is not supported, remove the attribute and return
    if (!this.sticky) {
      this.removeAttribute("is-sticky");
      return;
    }

    if (window.pageYOffset >= this.top) this.setAttribute("is-sticky", "");
    else this.removeAttribute("is-sticky");
  }

  /**
   * Sets the visibility of elements based on breakpoints
   */
  _setVisibility() {
    Object.keys(this.sectionBreakpoints).forEach((label) => {
      let bps = this.sectionBreakpoints[label];
      // First item in the array is the min-width
      let start = Number.parseInt(bps[0]);
      // Second item in the array is the max-width
      let end = Number.parseInt(bps[1]);

      // Throw a warning if more than 2 items are in the array
      if (bps.length > 2)
        this.warn(`Breakpoint provided for ${label} was provided with more than 2 items in the array. Please see documentation.`);

      if (Number.isNaN(start))
        this.warn(`Breakpoints provided for ${label} were not a valid number: ${start}.`);

      // If the slot does not exist, the start value is not a number, escape now
      if (Number.isNaN(start) || !this.hasSlot(label)) return;

      const slot = this.getSlot(label);

      // If the slot does not have any children
      if (!slot.children || slot.children.length === 0) return;
        
      // Get the width of the navigation element
      const width = this.getBoundingClientRect().width;

      //  Initialize the visibility boolean to false
      let isVisible = false;

      // Iterate over each node in the slot, set attribute based on supported sectionBreakpoints
      slot.children.forEach((node) => {
        // If the browser width falls between the start & end points (if the end point is defined)
        if (width >= start && (!end || (end && width <= end))) {
          isVisible = true;
        }

        switch (label) {
          case "main":
            // "isVisible" maps to the horizontal state of the main tag
            this.querySelector(PfeNavigationMain.tag).horizontal = isVisible;

            if (!isVisible) {
              this._menuItem.close();
              this._menuItem.removeAttribute("horizontal");
            } else {
              this._menuItem.setAttribute("horizontal", "");
            }

            break;

          default:
            const shadowSlot = this._slots[label.slice(7)];

            // If it's a navigation item, use the built in setters
            if (node.tagName === PfeNavigationItem.tag.toUpperCase()) {
              node.visible = isVisible;
            }

            // Otherwise, this is raw mark-up and we need to toggle it using the hidden attribute
            if (isVisible) {
              // Preferably toggle it from the shadow version only
              if (shadowSlot) shadowSlot.removeAttribute("hidden");
              // Remove hidden from the node either way
              node.removeAttribute("hidden");
            } else {
              // If it's not visible, add the hidden attribute
              // Preferably toggle it from the shadow version only
              if (shadowSlot) {
                node.removeAttribute("hidden");
                shadowSlot.setAttribute("hidden", "");
              } else {
                node.setAttribute("hidden", "");
              }
            }
            break;
        }
      });
    });
  }

  _init() {
    this._observer.disconnect();

    // Initial position of this element from the top of the screen
    this.top = this.getBoundingClientRect().top || 0;

    // Get all nav items contained in this element
    // was: navItems
    this._navigationItems = [...this.querySelectorAll(`${PfeNavigationItem.tag}`)];

    // Get any nav items contained in the shadow DOM
    if (this.shadowRoot.querySelectorAll(`${PfeNavigationItem.tag}`)) {
      this._navigationItems = this._navigationItems.concat([
        ...this.shadowRoot.querySelectorAll(`${PfeNavigationItem.tag}`),
      ]);
    }

    // Build the mobile accordion
    this._buildMobileAccordion();

    // Then set the visibility of the slots
    this._setVisibility();

    // Listen for clicks on the overlay element
    if (this.hasAttribute("pfe-close-on-click") && this.getAttribute("pfe-close-on-click") === "external") {
      this._overlay.addEventListener("click", this._overlayClickHandler);
    }

    // report the height of this pfe-navigation element
    this._reportHeight();

    // Watch the light DOM link for focus and blur events
    if (this.hasSlot("skip")) {
      [...this.querySelectorAll("[slot=skip] a")].map((link) => link.addEventListener("focus", this._focusHandler));
      [...this.querySelectorAll("[slot=skip] a")].map((link) => link.addEventListener("blur", this._blurHandler));
    }

    // make sure we close all of the nav items and hide the overlay
    // when it's clicked
    this._overlay.addEventListener("click", this._overlayClickHandler);

    // Listen for open and close events - change event?
    this.addEventListener(PfeNavigationItem.events.open, this._overlayClickHandler);
    this.addEventListener(PfeNavigationItem.events.close, this._overlayClickHandler);

    // @IE11 This is necessary so the script doesn't become non-responsive
    if (window.ShadyCSS) {
      setTimeout(() => {
        this._observer.observe(this, PfeNavigation.observerProperties);
        return true;
      }, 0);
    }
  }

  _buildMobileAccordion() {
    let fragment = new DocumentFragment();

    // For each nested navigation item, tag it with context
    [...this.querySelectorAll(PfeNavigationItem.tag)].forEach((item) => {
      let randomID = this.randomId;

      // Build the accordion for mobile by cloning the template
      let clone = this._mobileTemplate.content.cloneNode(true);

      // Build the header
      let header = clone.querySelector("pfe-accordion-header");
      // Create an ID for the navigation item and the header if it doesn't exist
      if (!item.id) {
        item.id = randomID;
        header.setAttribute("connected-to", randomID);
      } else {
        header.setAttribute("connected-to", item.id);
      }

      // Clone the trigger, the slot itself typically has the h-level tag
      let trigger = item.querySelector(":not([slot='tray'])").cloneNode(true);
      // Remove the slot attribute
      trigger.removeAttribute("slot");

      // TODO - build a mutation observer to watch the header and panels separately?
      header.appendChild(trigger);

      //-- Build the panel

      // Capture the tray element
      const tray = item.querySelector("[slot=tray]");
      let panel = clone.querySelector("pfe-accordion-panel");
      if (tray) {
        panel.innerHTML = tray.innerHTML;
      } else {
        header.setAttribute("is-direct-link", "");
      }

      // Attach the header to the clone
      clone.appendChild(header);

      if (tray) {
        // Attach the panel to the clone
        clone.appendChild(panel);
      }

      // Attach the clone to the fragment
      fragment.appendChild(clone);
    });

    // Attach the accordion items once
    this._mobile.appendChild(fragment);

    this.addEventListener(PfeAccordion.events.change, this._accordionEventMap);
  }

  // Clicking on the accordion should map to a click on a nav item
  _accordionEventMap(event) {
    if (event.detail) {
      let accordionItem = event.detail.el;
      let navItemId = accordionItem ? accordionItem.getAttribute("connected-to") : null;
      let navItem = navItemId ? this._navigationItems.find((item) => item.id === navItemId) : null;
      if (navItem) navItem.toggle(event);
      else console.warn(`A ${PfeNavigationItem.tag} with id ${navItemId} could not be found.`);
    }
  }

  // Close everything when the overlay is clicked
  _overlayClickHandler() {
    this._navigationItems.map((item) => {
      if (item.isVisible && item.expanded) item.close();
    });
    // Close the overlay
    this.overlay = false;
  }

  /**
   * Set a global CSS variable reporting the height of this navigation item.
   * Used to position sticky subnavigation items under this.
   *
   * The name of the global CSS variable is `--pfe-navigation--Height--actual`.
   */
  _reportHeight() {
    const cssVarName = `--${this.tag}--Height--actual`;
    const height = this.clientHeight + "px";
    document.body.style.setProperty(cssVarName, height);
  }

  // On skip focus, add a focus class
  _focusHandler() {
    this._slots.skip.classList.add("focus-within");
  }

  // On skip focus out, remove the focus class
  _blurHandler() {
    this._slots.skip.classList.remove("focus-within");
  }

  /**
   * Resets the display if necessary when the viewport is resized
   */
  _resizeHandler() {
    // Set the visibility of items
    this._setVisibility();

    // Check what the active item is
    this._activeNavigationItems.forEach((item) => {
      // If the item is open but not visible, update it to hidden
      if (item.expanded && !item.visible) {
        item.expanded = false;
        this._activeNavigationItems = this._activeNavigationItems.filter((i) => i !== item);
      } else if (item.expanded && item.parent && item.parent.visible) {
        // if the parent is the mobile menu item and the size of the window is within
        // the main breakpoint, make sure that the mobile menu is expanded
        if (item.parent === this._menuItem && window.innerWidth <= this.sectionBreakpoints.main[1]) {
          item.parent.expanded = true; // Ensure the parent is open
        }
      }
    });

    // update the reported height
    this._reportHeight();
  }

  /**
   * Handles the settings for horizontal or dropdown navigation states
   * @param  {Boolean} oldVal old property state
   * @param  {Boolean} newVal new property state
   */
  _displayHandler(oldVal, newVal) {
    if (oldVal === newVal) return;

    if (this._desktop) {
      if (newVal) this._desktop.removeAttribute("hidden");
      else this._desktop.setAttribute("hidden", "");
    }

    if (this._mobile) {
      if (newVal) this._mobile.setAttribute("hidden", "");
      else this._mobile.removeAttribute("hidden");
    }
  }

  /**
   * Handles the settings for sticky opt-in
   * @param  {Boolean} oldVal old property state
   * @param  {Boolean} newVal new property state
   */
  _stickyHandler(oldVal, newVal) {
    if (oldVal === newVal) return;

    if (newVal) {
      // Run the sticky check
      this._checkStickyState();

      // Attach the scroll event to the window
      window.addEventListener("scroll", this._checkStickyState);
    } else {
      // Remove the scroll event from the window
      window.removeEventListener("scroll", this._checkStickyState);
    }
  }
}

PFElement.create(PfeNavigationItem);
PFElement.create(PfeNavigationMain);
PFElement.create(PfeNavigation);

export default PfeNavigation;
