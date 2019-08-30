import PFElement from "../pfelement/pfelement.js";

if (!("path" in Event.prototype)) {
  Object.defineProperty(Event.prototype, "path", {
    get: function() {
      var path = [];
      var currentElem = this.target;
      while (currentElem) {
        path.push(currentElem);
        currentElem = currentElem.parentElement;
      }
      if (path.indexOf(window) === -1 && path.indexOf(document) === -1)
        path.push(document);
      if (path.indexOf(window) === -1)
        path.push(window);
      return path;
    }
  });
}

if (!Array.prototype.filter){
  Array.prototype.filter = function(func, thisArg) {
    'use strict';
    if ( ! ((typeof func === 'Function' || typeof func === 'function') && this) )
        throw new TypeError();
   
    var len = this.length >>> 0,
        res = new Array(len), // preallocate array
        t = this, c = 0, i = -1;

    var kValue;
    if (thisArg === undefined){
      while (++i !== len){
        // checks to see if the key was set
        if (i in this){
          kValue = t[i]; // in case t is changed in callback
          if (func(t[i], i, t)){
            res[c++] = kValue;
          }
        }
      }
    }
    else{
      while (++i !== len){
        // checks to see if the key was set
        if (i in this){
          kValue = t[i];
          if (func.call(thisArg, t[i], i, t)){
            res[c++] = kValue;
          }
        }
      }
    }
   
    res.length = c; // shrink down array to proper size
    return res;
  };
}

class PfeNavigationItem extends PFElement {
  static get tag() {
    return "pfe-navigation-item";
  }

  get templateUrl() {
    return "pfe-navigation-item.html";
  }

  get styleUrl() {
    return "pfe-navigation-item.scss";
  }

  get schemaUrl() {
    return "pfe-navigation-item.json";
  }

  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }

  static get observedAttributes() {
    return ["pfe-icon"];
  }

  get nested() {
    return this.hasAttribute("is_nested");
  }

  set nested(isNested) {
    isNested = Boolean(isNested);

    if (isNested) {
      this.setAttribute("is_nested", "");
    } else {
      this.removeAttribute("is_nested");
    }
  }

  get expanded() {
    return this.classList.contains("expanded");
  }

  set expanded(isExpanded) {
    isExpanded = Boolean(isExpanded);

    if (isExpanded) {
      this.classList.add("expanded");

      if (this._trigger) {
        this._trigger.setAttribute("aria-expanded", true);
      }

      if (this.tray) {
        this.tray.removeAttribute("hidden");
      }

      if (this._tray) {
        this._tray.setAttribute("aria-expanded", true);
      }
    } else {
      this.classList.remove("expanded");

      if (this._trigger) {
        this._trigger.setAttribute("aria-expanded", false);
      }

      if (this.tray) {
        this.tray.setAttribute("hidden", "");
      }

      if (this._tray) {
        this._tray.setAttribute("aria-expanded", false);
      }
    }
  }

  get visible() {
    return !this.hasAttribute("hidden");
  }

  set visible(isVisible) {
    isVisible = Boolean(isVisible);

    if (isVisible) {
      this.removeAttribute("hidden");
    } else {
      this.setAttribute("hidden", "");
    }
  }

  open(event) {
    if (event) event.preventDefault();

    // Close the other active item(s) unless it's this item's parent
    console.log(this.navigationWrapper);
    if (this.navigationWrapper) {
      this.navigationWrapper._activeNavigationItems = this.navigationWrapper._activeNavigationItems.filter(item => {
        let stayOpen = item === this.parent;
        if (!stayOpen) item.close();
        return stayOpen;
      });

      // Open that item and add it to the active array
      this.navigationWrapper._activeNavigationItems.push(this);

      this.expanded = true;
      this.navigationWrapper.overlay = true;
    }

    // Dispatch the event
    this.dispatchEvent(
      new CustomEvent(`${this.tag}:open`, {
        detail: {},
        bubbles: true,
        composed: true
      })
    );
  }

  close(event) {
    if (event) event.preventDefault();

    // Close the children elements
    this.navigationWrapper._activeNavigationItems = this.navigationWrapper._activeNavigationItems.filter(item => {
      let close = this.nestedItems && this.nestedItems.includes(item);
      if (close) item.close();
      return !close && item !== this;
    });

    this.expanded = false;

    // Clear the overlay
    this.navigationWrapper.overlay = this.navigationWrapper._activeNavigationItems.length > 0;

    this.focus();

    // Dispatch the event
    this.dispatchEvent(
      new CustomEvent(`${this.tag}:close`, {
        detail: {},
        bubbles: true,
        composed: true
      })
    );
  }

  toggle(event) {
    if (event) event.preventDefault();

    if (this.visible && !this.expanded) {
      this.open(event);
    } else {
      this.close(event);
    }
  }

  constructor() {
    super(PfeNavigationItem);

    // States
    this.nested = false;
    this.expanded = false;

    // Objects
    this.trigger = null;
    this.tray = null;
    this.directLink = null;
    this.linkUrl = null;

    // Lists
    this.nestedItems = [];

    // Shadow elements
    this._trigger = this.shadowRoot.querySelector(`.${this.tag}__trigger`);
    this._tray = this.shadowRoot.querySelector(`.${this.tag}__tray`);

    // Externally accessible events
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.toggle = this.toggle.bind(this);

    // Initializers
    this._init__trigger = this._init__trigger.bind(this);
    this._init__tray = this._init__tray.bind(this);

    // Event handlers
    this._keydownHandler = this._keydownHandler.bind(this);
    this._keyupHandler = this._keyupHandler.bind(this);
    this._navigateToUrl = this._navigateToUrl.bind(this);
    this._directLinkHandler = this._directLinkHandler.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    console.log("Navigation item");
    console.log(this);

    this._init__trigger();
    this._init__tray();

    // Add a slotchange listeners to the lightDOM elements
    if (this.trigger) this.trigger.addEventListener("slotchange", this._init__trigger);
    if (this.tray) this.tray.addEventListener("slotchange", this._init__tray);
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(attr, oldValue, newValue);
  }

  disconnectedCallback() {
    this.trigger.removeEventListener("slotchange", this._init);

    if (this.tray) {
      this.tray.removeEventListener("slotchange", this._init);

      this.removeEventListener("keydown", this._keydownHandler);
      this.removeEventListener("keyup", this._exit);

      this._trigger.removeEventListener("click", this.toggle);
      this._trigger.removeEventListener("keyup", this._keyupHandler);
    } else {
      this._trigger.removeEventListener("click", this._navigateToUrl);
      this._trigger.removeEventListener("keyup", this._directLinkHandler);
    }
  }

  _init__trigger() {
    // If no slots have been assigned, assign it to the trigger slot
    const unassigned = [...this.children].filter(child => !child.hasAttribute("slot"));
    unassigned.map(item => item.setAttribute("slot", "trigger"));

    // Get the LightDOM trigger & tray content
    this.trigger = this.querySelector(`[slot="trigger"]`);

    this.directLink = this.trigger.querySelector("a");
    this.linkUrl = this.directLink ? this.directLink.href : "#";

    // Turn off the fallback link
    if (this.directLink) {
      this.directLink.setAttribute("tabindex", "-1");
    }

    // Assume direct links until tray is processed
    if (this.trigger) this.trigger.setAttribute("tabindex", 0);

    this._trigger.addEventListener("click", this._navigateToUrl);
    this._trigger.addEventListener("keyup", this._directLinkHandler);
  }

  _init__tray() {
    // Get the LightDOM trigger & tray content
    this.tray = this.querySelector(`[slot="tray"]`);

    //-- Check for any nested navigation items
    // If a light DOM tray exists, check for descendents
    if (this.tray) {
      this.nestedItems = this.nestedItems.concat([...this.tray.querySelectorAll(`${this.tag}`)]);
      let array = [];

      // Search the tray for nested slots
      if (!window.ShadyCSS) {
        [...this.tray.querySelectorAll("slot")].forEach(slot => {
          [...slot.assignedElements()].forEach(node => {
            array = array.concat([...node.querySelectorAll(`${this.tag}`)]);
          });
        });
      }

      this.nestedItems = this.nestedItems.concat(array.filter(el => {
        return !this.nestedItems.includes(el);
      }));

      console.log(this.nestedItems);
      
      this._init__handlers();
    }
  }

  _init__handlers() {
    this._trigger.removeEventListener("click", this._navigateToUrl);
    this._trigger.removeEventListener("keyup", this._directLinkHandler);

    // Toggle the navigation when the trigger is clicked
    this._trigger.addEventListener("click", this.toggle);

    // Attaching to the parent element allows the exit key to work inside the tray too
    this.addEventListener("keyup", this._exit);
    this.addEventListener("keydown", this._keydownHandler);

    this._trigger.addEventListener("keyup", this._keyupHandler);
  }

  _navigateToUrl(event) {
    event.preventDefault();
    window.location.href = this.linkUrl;
  }

  _directLinkHandler(event) {
    let key = event.key || event.keyCode;
    switch (key) {
      case "Spacebar":
      case " ":
      case 32:
      case "Enter":
      case 13:
        this._navigateToUrl(event);
        break;
      default:
        return;
    }
  }

  _keydownHandler(event) {
    let key = event.key || event.keyCode;
    let clicked = event.path && event.path.length > 0 ? event.path[0] : this;

    switch (key) {
      case "Spacebar":
      case " ":
      case 32:
        if (!["INPUT", "TEXTAREA", "SELECT"].includes(clicked.tagName)) {
          event.preventDefault();
        }
        break;
    }
  }

  _keyupHandler(event) {
    let key = event.key || event.keyCode;
    let clicked = event.path && event.path.length > 0 ? event.path[0] : this;

    switch (key) {
      case "Spacebar":
      case " ":
      case 32:
        if (!["INPUT", "TEXTAREA", "SELECT"].includes(clicked.tagName)) {
          this.toggle(event);
        }
        break;
      case "Enter":
      case 13:
        if (!["A"].includes(clicked.tagName)) {
          this.toggle(event);
        }
        break;
    }
  }

  // Note: Escape will always exit the entire menu
  _exit(event) {
    let key = event.key || event.keyCode;
    switch (key) {
      case "Esc":
      case "Escape":
      case 27:
        this.close(event);
        break;
    }
  }
}

class PfeNavigationMain extends PFElement {
  static get tag() {
    return "pfe-navigation-main";
  }

  get templateUrl() {
    return "pfe-navigation-main.html";
  }

  get styleUrl() {
    return "pfe-navigation-main.scss";
  }

  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }

  static get observedAttributes() {
    return ["show_content"];
  }

  constructor() {
    super(PfeNavigationMain);

    this._init = this._init.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    console.log("Navigation main");

    this._init();

    // Add a slotchange listener to the lightDOM trigger
    this.addEventListener("slotchange", this._init);
  }

  disconnectedCallback() {
    this.removeEventListener("slotchange", this._init);
  }

  _init() {
    // Get all the nested navigation items
    this.navItems = this.querySelectorAll("pfe-navigation-item");
    // Find the first nested element
    this.first = this.navItems.item(0);
    // Find the last nested element
    this.last = this.navItems.item(this.navItems.length - 1);

    // Ensure the necessary a11y is set
    this.setAttribute("role", "navigation");
    this.setAttribute("aria-label", "Main");

    // For each nested navigation item, tag it with context
    this.navItems.forEach(item => {
      item.nested = true;
    });

    // Tag the first and last navigation items for styling in mobile
    if (this.first) this.first.setAttribute("first", "");
    if (this.last) this.last.setAttribute("last", "");
  }
}

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

  get schemaUrl() {
    return "pfe-navigation.json";
  }

  get overlay() {
    return !this._overlay.hasAttribute("hidden");
  }

  set overlay(state) {
    if (state) {
      // Add the overlay to the page
      this._overlay.removeAttribute("hidden");
      // This prevents background scroll while nav is open
      document.body.style.overflow = "hidden";
    } else {
      // Remove the overlay from the page
      this._overlay.setAttribute("hidden", "");
      // Allow background to scroll again
      document.body.style.overflow = "auto";

    }
  }

  constructor() {
    super(PfeNavigation);

    // Attach functions for use below
    this._init = this._init.bind(this);
    this._setVisibility = this._setVisibility.bind(this);

    // -- handlers
    this._observerHandler = this._observerHandler.bind(this);
    this._keydownHandler = this._keydownHandler.bind(this);
    this._resizeHandler = this._resizeHandler.bind(this);
    this._stickyHandler = this._stickyHandler.bind(this);
    this._outsideListener = this._outsideListener.bind(this);
    this._observer = new MutationObserver(this._observerHandler);

    // Capture shadow elements
    this._overlay = this.shadowRoot.querySelector(".pfe-navigation__overlay");
    this._menuItem = this.shadowRoot.querySelector("pfe-navigation-item[pfe-icon='menu']");

    // Initialize active navigation item to empty array
    this._activeNavigationItems = [];
    
    // Set the state of this element to false until initialized
    this.initialized = false;
    this.overlay = false;

  }

  connectedCallback() {
    super.connectedCallback();

    console.log("Navigation");

    // If this element contains light DOM, initialize it
    if (this.children.length) {
      // If only one value exists in the array, it starts at that size and goes up
      this.breakpoints = {
        main: [0, 1199], // visible from 0 - 1200px
        search: [768],   // visible from 768px +
        "mobile-search": [0, 767],
        language: [768],
        "mobile-language": [0, 767],
        login: [768],
        "mobile-login": [0, 767]
      };

      // Kick off the initialization of the light DOM elements
      this.initialized = this._init();

      // Listen for tab events
      this.addEventListener("keydown", this._keydownHandler);

      // Watch for screen resizing
      window.addEventListener("resize", this._resizeHandler);
    } else {
      console.error("This component does not have any light DOM children.  Please check documentation for requirements.");
    }
  }

  disconnectedCallback() {
    // Remove the scroll, resize, and outside click event listeners
    window.removeEventListener("resize", this._resizeHandler);
    window.removeEventListener("scroll", this._stickyHandler);
    document.removeEventListener("click", this._outsideListener);

    this._observer.disconnect();
  }

  _observerHandler(mutationsList) {
    // Reset the state to false, rerun the initializer
    this.initialized = false;
    this.initialized = this._init();
  }

  _resizeHandler(event) {
    // Set the visibility of items
    this._setVisibility(this.offsetWidth);

    // Check what the active item is
    this._activeNavigationItems.forEach(item => {
      // If the item is open but not visible, update it to hidden
      if (item.expanded && !item.visible) {
        item.expanded = false;
        this._activeNavigationItems = this._activeNavigationItems.filter(i => i !== item);
      } else if (item.expanded && item.parent && item.parent.visible) {
        item.parent.expanded = true; // Ensure the parent is open
        // If the parent item doesn't exist in the active array, add it
        if (!this._activeNavigationItems.includes(item.parent)) {
          this._activeNavigationItems.push(item.parent);
        }
      }
    });

    this.overlay = this._activeNavigationItems.length > 0;
  }

  _stickyHandler() {
    if(window.pageYOffset >= this.top) {
      this.classList.add("sticky");
    } else {
      this.classList.remove("sticky");
    }
  }

  _outsideListener(event) {
    if ((event.target !== this && event.target.closest("pfe-navigation") === null) || event.path.length > 0 && event.path[0] === this._overlay) {
      this._activeNavigationItems.map(item => item.close());
    }
  }

  _setVisibility(width) {
    Object.entries(this.breakpoints).map(item => {
      let label = item[0];
      let bps = item[1];
      let start = bps[0];
      let end = bps[1];
      let isVisible = false;

      // If the slot exists, set attribute based on supported breakpoints
      if (this.slots[label] && this.slots[label].nodes.length > 0) {
        if (width >= start && (!end || (end && width <= end))) {
          isVisible = true;
        }

        this.slots[label].nodes.forEach(node => {
          switch(label) {
            case "main":
                isVisible ? node.removeAttribute("show_content") : node.setAttribute("show_content", "");
                this._menuItem.visible = isVisible;
                node.navItems.forEach(item => isVisible ? item.removeAttribute("parent_hidden") : item.setAttribute("parent_hidden", ""));
                break;
            case (label.match(/^mobile/) || {}).input:
              if (isVisible) {
                // Set an attribute to show this region (strip the mobile prefix)
                this._menuItem.setAttribute(`show_${label.slice(7)}`, "");
                node.removeAttribute("hidden");
              } else {
                this._menuItem.removeAttribute(`show_${label.slice(7)}`);
                node.setAttribute("hidden", "");
              }
              break;
            default:
              node.visible = isVisible;
              break;
          }
        });
      }
    });
  }

  _keydownHandler(event) {
    let key = event.key || event.keyCode;

    switch(key) {
      case "Tab":
      case 9:
        // If the overlay is active, trap focus
        if ( event.shiftKey ) {
          if ([this.firstItem, this.firstItem.trigger].includes(document.activeElement) && this.overlay) {
            this.lastItem.trigger.focus();
            event.preventDefault();
          }
        }
        else {
          if ([this.lastItem, this.lastItem.trigger].includes(document.activeElement) && this.overlay) {
            if (this.firstItem.trigger) this.firstItem.trigger.focus();
            else this.firstItem.focus();
            event.preventDefault();
          }
        }
        break;
    }
  }

  _init() {
    let ret = false;
    if(!this.initialized) {
      // @IE11 This is necessary so the script doesn't become non-responsive
      if (window.ShadyCSS) {
        this._observer.disconnect();
      }

      // Initial position of this element from the top of the screen
      this.top = this.getBoundingClientRect().top || 0;

      // Get all nav items contained in this element
      this.navItems = [...this.querySelectorAll("pfe-navigation-item")];

      // Get the first and last focusable items in the navigation
      if (this.has_slot("skip")) {
        this.firstItem = this.slots.skip.nodes[0];
        // Allow the items assigned to this slot to be focusable
        this.slots.skip.nodes.forEach(item => item.setAttribute("tabindex", 0));
      }
      else if (this.has_slot("logo")) {
        this.firstItem = this.slots.logo.nodes[0];
      }
      else {
        this.firstItem = this.navItems[0];
      }

      this.lastItem = this.navItems[this.navItems.length - 1];

      // Add the menu element to the list of navigation items
      // do this manually because menu item is in the shadow dom
      if (this._menuItem) this.navItems.push(this._menuItem);

      // Attach a reference to the navigation container to the children
      this.navItems.forEach(item => {
        item.navigationWrapper = this;
      });

      // Connect the shadow menu with the main component
      let mainNav = this.querySelector("pfe-navigation-main");
      if (mainNav && mainNav.navItems) {
        mainNav.navItems.forEach(item => {
          item.parent = this._menuItem;
        });
      }

      // Start by setting the visibility of the slots
      this._setVisibility(this.offsetWidth);

      // If the nav is set to sticky, inject the height of the nav to the next element in the DOM
      if(this.hasAttribute("pfe-sticky") && this.getAttribute("pfe-sticky") != "false") {
        // Run the sticky check on first page load
        this._stickyHandler();

        // Attach the scroll event to the window
        window.addEventListener("scroll", this._stickyHandler);
      }

      // Listen for clicks outside the navigation element
      if(this.hasAttribute("pfe-close-on-click") && this.getAttribute("pfe-close-on-click") === "external") {
        document.addEventListener("click", this._outsideListener);
      }

      // @IE11 This is necessary so the script doesn't become non-responsive
      if (window.ShadyCSS) {
        setTimeout(() => {
          this._observer.observe(this, {
            childList: true,
            subtree: true,
            characterData: true
          });
        }, 0);
      }
    }

    return true;
  }
}

PFElement.create(PfeNavigationItem);
PFElement.create(PfeNavigationMain);
PFElement.create(PfeNavigation);

export default PfeNavigation;
