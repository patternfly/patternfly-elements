import PFElement from "../pfelement/pfelement.js";
import PfeAccordion from "../pfe-accordion/pfe-accordion.js";

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

  // Used in the template to determine where to print the icon
  get hasIcon() {
    return this.hasAttribute("pfe-icon");
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

    this.dispatchEvent(
      new CustomEvent(`${this.tag}:toggle`, {
        detail: {
          navigationItem: this,
          action: "open"
        },
        bubbles: true,
        composed: true
      })
    );
  }

  close(event) {
    if (event) event.preventDefault();

    this.dispatchEvent(
      new CustomEvent(`${this.tag}:toggle`, {
        detail: {
          navigationItem: this,
          action: "close"
        },
        bubbles: true,
        composed: true
      })
    );
  }

  toggle(event) {
    if (event) event.preventDefault();

    this.dispatchEvent(
      new CustomEvent(`${this.tag}:toggle`, {
        detail: {
          navigationItem: this
        },
        bubbles: true,
        composed: true
      })
    );
  }

  constructor() {
    super(PfeNavigationItem);

    this.nested = false;
    this.expanded = false;
    this.trigger = null;
    this.tray = null;
    this.directLink = null;
    this.linkUrl = null;

    this._trigger = this.shadowRoot.querySelector(`.${this.tag}__trigger`);
    this._tray = this.shadowRoot.querySelector(`.${this.tag}__tray`);
    this._icon = this.shadowRoot.querySelector(`.${this.tag}__trigger--icon`);

    // Externally accessible events
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.toggle = this.toggle.bind(this);

    this._init = this._init.bind(this);
    this._keyupHandler = this._keyupHandler.bind(this);
    this._suppressLink = this._suppressLink.bind(this);
    this._navigateToUrl = this._navigateToUrl.bind(this);
    this._directLinkHandler = this._directLinkHandler.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    // If no slots have been assigned, assign it to the trigger slot
    const unassigned = [...this.children].filter(child => !child.hasAttribute("slot"));
    unassigned.map(item => item.setAttribute("slot", "trigger"));

    // Get the LightDOM trigger & tray content
    this.trigger = this.querySelector(`[slot="trigger"]`);
    this.tray = this.querySelector(`[slot="tray"]`);

    // Check for any nested navigation items
    this.nestedItems = [];

    // If a light DOM tray exists, check for descendents
    if (this.tray) {
      this.nestedItems = this.nestedItems.concat([...this.tray.querySelectorAll(`${this.tag}`)]);
      this.nestedItems = this.nestedItems.concat([...this.tray.querySelectorAll("slot")].map(slot => {
        return slot.assignedElements().map(node => {
          return [...node.querySelectorAll(`${this.tag}`)];
        });
      }).flat(3));
    }

    this._init();

    // Add a slotchange listener to the lightDOM trigger
    this.trigger.addEventListener("slotchange", this._init);
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(attr, oldValue, newValue);
  }

  disconnectedCallback() {
    this.trigger.removeEventListener("slotchange", this._init);

    if (this.tray) {
      this.removeEventListener("keyup", this._keyupHandler);

      this._trigger.removeEventListener("click", this.toggle);
      if (this.directLink) {
        this.directLink.removeEventListener("click", this._suppressLink);
      }
    } else {
      this._trigger.removeEventListener("click", this._navigateToUrl);
      this._trigger.removeEventListener("keyup", this._directLinkHandler);
    }
  }

  _init() {
    this.directLink = this.trigger.querySelector("a");

    // If there is a tray element, add click events
    if (this.tray) {
      // Toggle the navigation when the trigger is clicked
      this._trigger.addEventListener("click", this.toggle);
      // Attaching to the parent element allows the exit key to work inside the tray too
      this.addEventListener("keyup", this._keyupHandler);

      // Turn off the fallback link
      if (this.directLink) {
        this.directLink.setAttribute("tabindex", "-1");
        this.directLink.addEventListener("click", this._suppressLink);
      }
    } else {
      this.linkUrl = this.directLink ? this.directLink.href : "#";
      this._trigger.addEventListener("click", this._navigateToUrl);
      this._trigger.addEventListener("keyup", this._directLinkHandler);
    }
  }

  _suppressLink(event) {
    event.preventDefault();
  }

  _navigateToUrl(event) {
    event.preventDefault();
    window.location.href = this.linkUrl;
  }

  _directLinkHandler(event) {
    let key = event.key || event.keyCode;
    switch (key) {
      case "Spacebar":
      case "Enter":
      case " ":
        this._navigateToUrl(event);
        break;
      default:
        return;
    }
  }

  _keyupHandler(event) {
    let key = event.key || event.keyCode;
    switch (key) {
      case "Spacebar":
      case "Enter":
      case " ":
        // Check that the event is on the trigger element
        if (event && event.path && event.path[0] && event.path[0].classList.contains(`${this.tag}__trigger`)) {
          this.toggle(event);
        }
        break;
      case "Esc":
      case "Escape":
      case 27:
        this.close(event);
        this.focus();
        break;
      default:
        return;
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

  closeAllNavigationItems() {
    this.dispatchEvent(
      new CustomEvent("pfe-navigation-item:toggle", {
        detail: {
          action: "close"
        },
        bubbles: true,
        composed: true
      })
    );
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
    this._toggledHandler = this._toggledHandler.bind(this);
    this._closeAllNavigationItems = this._closeAllNavigationItems.bind(this);
    this._observerHandler = this._observerHandler.bind(this);
    this._resizeHandler = this._resizeHandler.bind(this);
    this._stickyHandler = this._stickyHandler.bind(this);
    this.closeAllNavigationItems = this.closeAllNavigationItems.bind(this);
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
    // Initial position of this element from the top of the screen
    this.top = this.getBoundingClientRect().top || 0;

  }

  connectedCallback() {
    super.connectedCallback();

    // If this element contains light DOM, initialize it
    if (this.children.length) {
      // If only one value exists in the array, it starts at that size and goes up
      this.breakpoints = {
        main: [0, 1200], // visible from 0 - 1200px
        search: [768],   // visible from 768px +
        "mobile-search": [0, 767],
        language: [768],
        "mobile-language": [0, 767],
        login: [768],
        "mobile-login": [0, 767]
      };

      // Kick off the initialization of the light DOM elements
      this.initialized = this._init();

      // Listen for the toggled event on the navigation children
      this.addEventListener("pfe-navigation-item:toggle", this._toggledHandler);

      // Watch for screen resizing
      window.addEventListener("resize", this._resizeHandler);
    } else {
      console.error("This component does not have any light DOM children.  Please check documentation for requirements.");
    }
  }

  disconnectedCallback() {
    // Remove the custom listener for the toggled event
    this.removeEventListener("pfe-navigation-item:toggle", this._toggledHandler);

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

  _closeAllNavigationItems() {
    // Close any open navigation items
    this._activeNavigationItems = this._activeNavigationItems.filter(item => {
      item.expanded = false;
      return false;
    });

    this.overlay = this._activeNavigationItems.length > 0;
  }

  _toggledHandler(event) {
    let close = event && event.detail ? event.detail.action === "close" : false;
    let newItem = event && event.detail ? event.detail.navigationItem : null;
    let currentItems = this._activeNavigationItems;

    // Check if the new item shares a parent with the current one and that the parent is visible
    let openSibling = currentItems.filter(item => newItem && newItem.parent && newItem.parent === item.parent && newItem.parent.visible);
    let hasOpenParent = newItem && newItem.parent && newItem.parent.visible && currentItems.includes(newItem.parent);
    let isOpen = currentItems.includes(newItem);

    // If the action is specifically to close the item or there is a new item and it isn't visibly nested
    if (close || (!newItem && currentItems.length > 0) || (newItem && newItem.visible && !hasOpenParent)) {
      // Close the items in the array and remove them
      currentItems.map(item => {
        item.expanded = false;
      });
      this._activeNavigationItems = [];
    }
    // If there is a new item and it isn't visibly nested
    else if (newItem && newItem.visible && hasOpenParent && openSibling.length > 0) {
      // Close the items in the array and remove them
      this._activeNavigationItems = currentItems.filter(item => {
        if (item !== newItem.parent) {
          item.expanded = false;
        } else {
          return item;
        }
      });
    }

    // If the clicked item is open, close itself
    if (isOpen) {
      newItem.expanded = false;
      // Remove this item from the active items
      this._activeNavigationItems = currentItems.filter(item => item !== newItem);
    }
    // If there are no open items and it's a visible element
    else if(newItem && !isOpen && !close) {
      // Open that item and add it to the active array
      newItem.expanded = true;
      this._activeNavigationItems.push(newItem);
    } else {
      this._closeAllNavigationItems();
    }

    // The overlay is open if any active items exist
    this.overlay = (this._activeNavigationItems.length > 0);

    return;
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
      this._closeAllNavigationItems();
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
        if (width > start && (!end || (end && width < end))) {
          isVisible = true;
        }

        this.slots[label].nodes.forEach(node => {
          if (label !== "main") {
            node.visible = isVisible;
          } else {
            isVisible ? node.removeAttribute("show_content") : node.setAttribute("show_content", "");
            this._menuItem.visible = isVisible;
            node.navItems.forEach(item => isVisible ? item.removeAttribute("parent_hidden") : item.setAttribute("parent_hidden", ""));
          }
        });
      }
    });
  }

  _init() {
    let ret = false;
    if(!this.initialized) {
      // @IE11 This is necessary so the script doesn't become non-responsive
      if (window.ShadyCSS) {
        this._observer.disconnect();
      }

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
