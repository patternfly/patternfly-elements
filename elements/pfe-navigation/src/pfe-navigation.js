// -- @TODO Needing to manually add polyfills at the moment; check into why babel is not doing this
// -- @TODO Set icons to hide if they all fail to load, else set them to preserve space

// -- POLYFILL: Array.prototype.filter
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

// -- POLYFILL: Element.prototype.matches
if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector || 
                              Element.prototype.webkitMatchesSelector;
}

// -- POLYFILL: Element.prototype.closest
if (!Element.prototype.closest) {
  Element.prototype.closest = function(s) {
    var el = this;

    do {
      if (el.matches(s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };
}

// -- POLYFILL: Array.prototype.includes
if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, 'includes', {
    value: function (searchElement, fromIndex) {

      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If len is 0, return false.
      if (len === 0) {
        return false;
      }

      // 4. Let n be ? ToInteger(fromIndex).
      //    (If fromIndex is undefined, this step produces the value 0.)
      var n = fromIndex | 0;

      // 5. If n ≥ 0, then
      //  a. Let k be n.
      // 6. Else n < 0,
      //  a. Let k be len + n.
      //  b. If k < 0, let k be 0.
      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

      function sameValueZero(x, y) {
        return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
      }

      // 7. Repeat, while k < len
      while (k < len) {
        // a. Let elementK be the result of ? Get(O, ! ToString(k)).
        // b. If SameValueZero(searchElement, elementK) is true, return true.
        // c. Increase k by 1.
        if (sameValueZero(o[k], searchElement)) {
          return true;
        }
        k++;
      }

      // 8. Return false
      return false;
    }
  });
}

// -- POLYFILL: Event.prototype.path
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

import PFElement from "../../pfelement/dist/pfelement.js";
import PfeNavigationItem from "./pfe-navigation-item.js";
import PfeNavigationMain from "./pfe-navigation-main.js";

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
      this._wrapper.setAttribute("expanded", "");
      // This prevents background scroll while nav is open
      document.body.style.overflow = "hidden";
    } else {
      // Remove the overlay from the page
      this._overlay.setAttribute("hidden", "");
      this._wrapper.removeAttribute("expanded");
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
    this._resizeHandler = this._resizeHandler.bind(this);
    this._stickyHandler = this._stickyHandler.bind(this);
    this._outsideListener = this._outsideListener.bind(this);
    this._observer = new MutationObserver(this._init);

    // Capture shadow elements
    this._overlay = this.shadowRoot.querySelector(`.${this.tag}__overlay`);
    this._wrapper = this.shadowRoot.querySelector(`.${this.tag}__wrapper`);
    this._menuItem = this.shadowRoot.querySelector(`${PfeNavigationItem.tag}[pfe-icon="web-mobile-menu"]`);

    this._slots = {
      language: this.shadowRoot.querySelector(`${PfeNavigationItem.tag}[pfe-icon="web-user"]`),
      login: this.shadowRoot.querySelector(`${PfeNavigationItem.tag}[pfe-icon="web-globe"]`)
    };

    // Initialize active navigation item to empty array
    this._activeNavigationItems = [];
    this.overlay = false;
  }

  connectedCallback() {
    super.connectedCallback();

    Promise.all([
      customElements.whenDefined(PfeNavigationItem.tag),
      customElements.whenDefined(PfeNavigationMain.tag)
    ]).then(() => {
      // If this element contains light DOM, initialize it
      if (this.children.length) {
        // If only one value exists in the array, it starts at that size and goes up
        this.breakpoints = {
          main: [0, 1023], // visible from 0 - 1200px
          search: [640],   // visible from 768px +
          "mobile-search": [0, 639],
          language: [640],
          "mobile-language": [0, 639],
          login: [640],
          "mobile-login": [0, 639]
        };

        // Kick off the initialization of the light DOM elements
        this._init();

        // Watch for screen resizing
        window.addEventListener("resize", this._resizeHandler);
      } else {
        console.error("This component does not have any light DOM children.  Please check documentation for requirements.");
      }

      this._observer.observe(this, { childList: true });
    });
  }

  disconnectedCallback() {
    // Remove the scroll, resize, and outside click event listeners
    window.removeEventListener("resize", this._resizeHandler);

    if(this.hasAttribute("pfe-close-on-click") && this.getAttribute("pfe-close-on-click") === "external") {
      document.removeEventListener("click", this._outsideListener);
    }

    if(this.hasAttribute("pfe-sticky") && this.getAttribute("pfe-sticky") != "false") {
      window.removeEventListener("scroll", this._stickyHandler);
    }

    this._observer.disconnect();
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
    // Check if the clicked element is the navigation object
    let isSelf = event.target === this;
    // Check if the clicked element contains or is contained by the navigation element
    let isChild = event.target.closest("pfe-navigation");
    let insideWrapper = event.target.tagName.includes("-") ? event.target.shadowRoot.querySelector("pfe-navigation") : null;
    // Check if the clicked element is the overlay object
    let isOverlay = event && event.path && event.path.length > 0 && event.path[0] === this._overlay;
    // Check states to determine if the navigation items should close
    if (isOverlay || (!isSelf && !(isChild || insideWrapper))) {
      this._activeNavigationItems.map(item => item.close());
    }
  }

  _setVisibility(width) {
    Object.keys(this.breakpoints).forEach(label => {
      let bps = this.breakpoints[label];
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
              if (isVisible) {
                node.removeAttribute("show_content");
                this._menuItem.removeAttribute("show_links");
              } else {
                node.setAttribute("show_content", "");
                this._menuItem.setAttribute("show_links", "");
                this._menuItem.expanded = false;
                this._menuItem.tray.removeAttribute("hidden");
                // Remove menuItem from active items
                this._activeNavigationItems = this._activeNavigationItems.filter(item => item !== this._menuItem);
              }
              node.navItems.forEach(item => {
                if (isVisible) {
                  item.removeAttribute("parent_hidden");
                 } else {
                   item.setAttribute("parent_hidden", "");
                 }
                });
              break;
            case (label.match(/^mobile/) || {}).input:
              if (isVisible) {
                // Set an attribute to show this region (strip the mobile prefix)
                this._menuItem.setAttribute(`show_${label.slice(7)}`, "");
                if (this._slots[label.slice(7)]) this._slots[label.slice(7)].removeAttribute("hidden");
                node.removeAttribute("hidden");
              } else {
                this._menuItem.removeAttribute(`show_${label.slice(7)}`);
                if (this._slots[label.slice(7)]) this._slots[label.slice(7)].setAttribute("hidden", "");
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

  _init() {
    // @IE11 This is necessary so the script doesn't become non-responsive
    if (window.ShadyCSS) {
      this._observer.disconnect();
    }

    // Initial position of this element from the top of the screen
    this.top = this.getBoundingClientRect().top || 0;

    // Get all nav items contained in this element
    this.navItems = [...this.querySelectorAll("pfe-navigation-item")];

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

    // Remove focusability from mobile links
    Object.keys(this.slots).forEach(section => {
      if (section.match(/^mobile-(login|language)/)) {
        this.slots[section].nodes.forEach(node => {
          node.setAttribute("tabindex", -1);
        });
      }
    });

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
}

PFElement.create(PfeNavigationItem);
PFElement.create(PfeNavigationMain);
PFElement.create(PfeNavigation);

export default PfeNavigation;
