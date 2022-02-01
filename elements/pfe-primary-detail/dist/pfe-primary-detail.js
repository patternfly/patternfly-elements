import PFElement from '../../pfelement/dist/pfelement.js';

/*!
 * PatternFly Elements: PfePrimaryDetail 1.12.3
 * @license
 * Copyright 2020 Red Hat, Inc.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
*/

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
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, delay);
    if (callNow) func.apply(context, args);
  };
}

// @todo Add functions to open a specific item by index or ID
class PfePrimaryDetail extends PFElement {

  // Injected at build-time
  static get version() {
    return "1.12.3";
  }

  // Injected at build-time
  get html() {
    return `
<style>*{-webkit-box-sizing:border-box;box-sizing:border-box}:host{display:block;border:1px solid #d2d2d2;border:var(--pfe-primary-details--Border,var(--pfe-theme--ui--border-width--sm,1px) var(--pfe-theme--ui--border-style,solid) var(--pfe-theme--color--ui--border--lighter,#d2d2d2));overflow:hidden}:host([hidden]){display:none}#wrapper{display:-ms-grid;display:grid;-ms-grid-columns:1fr 2fr;grid-template-columns:1fr 2fr;-ms-grid-columns:var(--pfe-primary-details--GridTemplateColumns,1fr 2fr);grid-template-columns:var(--pfe-primary-details--GridTemplateColumns,1fr 2fr);-webkit-box-align:stretch;-webkit-align-items:stretch;-ms-flex-align:stretch;align-items:stretch;-webkit-box-pack:stretch;-webkit-justify-content:stretch;-ms-flex-pack:stretch;justify-content:stretch;overflow:hidden;-webkit-transition:-webkit-transform .25s ease-in-out;transition:-webkit-transform .25s ease-in-out;transition:transform .25s ease-in-out;transition:transform .25s ease-in-out,-webkit-transform .25s ease-in-out;will-change:transform;-webkit-backface-visibility:visible;backface-visibility:visible}@media (prefers-reduced-motion){#wrapper{-webkit-transition:none;transition:none;will-change:auto}}:host([breakpoint=compact]) #wrapper{display:-ms-grid;display:grid;-ms-grid-columns:50% 0 50%;grid-template-columns:50% 50%;gap:0;width:200%}:host([breakpoint=compact]) #wrapper.active{-webkit-transform:translateX(-50%);transform:translateX(-50%)}:host([breakpoint=compact]) #details-nav,:host([breakpoint=compact]) #details-nav__footer{-ms-grid-row-align:stretch;align-self:stretch;-ms-grid-column-align:stretch;justify-self:stretch;-ms-grid-row:1;grid-row:1;-ms-grid-column:1;grid-column:1}:host([breakpoint=compact]) #details-nav__footer{-ms-grid-row:2;grid-row:2}#details-nav{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;margin:0 2px;padding:9px 0;border-right:1px solid #d2d2d2;border-right:var(--pfe-primary-details--Border,var(--pfe-theme--ui--border-width--sm,1px) var(--pfe-theme--ui--border-style,solid) var(--pfe-theme--color--ui--border--lighter,#d2d2d2))}:host([breakpoint=compact]) #details-nav{border:0}:host([breakpoint=compact]) #details-nav__footer{-ms-grid-row:2;grid-row:2}::slotted([slot=details-nav]){position:relative;display:block!important;-webkit-appearance:none!important;-moz-appearance:none!important;appearance:none!important;background:0 0!important;border:0!important;margin:0!important;padding:.5em 1.5em .5em .75em!important;font:inherit;line-height:1.5;text-align:left!important;color:#151515!important;color:var(--pfe-primary-details__nav--Color,var(--pfe-theme--color--text,#151515))!important;cursor:pointer!important}::slotted([slot=details-nav]):before{content:'';position:absolute;top:50%;right:0;margin-right:16px;display:block;width:.75em;height:.75em;-webkit-box-shadow:inset -.1875em -.1875em 0 .0625em #000;box-shadow:inset -.1875em -.1875em 0 .0625em #000;-webkit-transform:translate(-50%,-50%) scale(.6) rotate(314deg);transform:translate(-50%,-50%) scale(.6) rotate(314deg)}:host([breakpoint=desktop]) ::slotted([slot=details-nav]):before{content:none}::slotted([aria-expanded=true]),::slotted([aria-selected=true]){color:#06c!important;color:var(--pfe-primary-details__nav--Color--active,var(--pfe-theme--color--link,#06c))!important;background:#f0f0f0!important;background:var(--pfe-primary-details__nav--Background--active,#f0f0f0)!important}#details-wrapper{padding:.5em 1.5em;background:#fff;background:var(--pfe-primary-details__details--Background,var(--pfe-theme--color--surface--lightest,#fff))}:host([breakpoint=compact]) #details-wrapper{-ms-grid-row:1;-ms-grid-row-span:2;grid-row:1/span 2;-ms-grid-column:2;grid-column:2;padding-top:0}:host([consistent-height]) #details-wrapper{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}@supports (display:grid){:host([consistent-height]) #details-wrapper{display:-ms-grid;display:grid;-ms-grid-rows:1fr;-ms-grid-columns:1fr;grid-template:1fr/1fr;justify-items:start;-webkit-box-align:start;-webkit-align-items:start;-ms-flex-align:start;align-items:start}}:host([consistent-height][breakpoint=compact]) #details-wrapper:before{content:'';display:block;-ms-grid-row:1;grid-row:1;-ms-grid-column:1;grid-column:1;-ms-grid-row-align:end;align-self:end;border-bottom:1px solid #d2d2d2;border-bottom:var(--pfe-primary-details--Border,var(--pfe-theme--ui--border-width--sm,1px) var(--pfe-theme--ui--border-style,solid) var(--pfe-theme--color--ui--border--lighter,#d2d2d2));width:calc(100% + 3em);margin-left:-1.5em}#details-wrapper__header{display:none;-ms-grid-row:1;-ms-grid-row-span:1;grid-row:1/span 1;-ms-grid-column:1;-ms-grid-column-span:1;grid-column:1/span 1;-ms-grid-row-align:start;align-self:start;-ms-grid-column-align:stretch;justify-self:stretch}:host([breakpoint=compact]) #details-wrapper__header{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:start;-webkit-align-items:flex-start;-ms-flex-align:start;align-items:flex-start}#details-wrapper__back{display:none;position:relative;-webkit-align-self:stretch;-ms-flex-item-align:stretch;-ms-grid-row-align:stretch;align-self:stretch;border:0;margin:2px 0 0;background:0 0;font-size:inherit;font-family:inherit;font-weight:700;cursor:pointer;text-align:left}#details-wrapper__back:focus{outline:1px dashed #000!important;outline-width:2px!important}:host([breakpoint=compact]) #details-wrapper__back{display:block;visibility:hidden}:host([breakpoint=compact]) .active #details-wrapper__back{visibility:visible;width:100%;padding-left:16px}#details-wrapper__back:before{content:'';position:absolute;top:50%;left:.5em;display:block;width:.75em;height:.75em;-webkit-box-shadow:inset -.1875em -.1875em 0 .0625em #000;box-shadow:inset -.1875em -.1875em 0 .0625em #000;-webkit-transform:translate(-50%,-50%) scale(.6) rotate(135deg);transform:translate(-50%,-50%) scale(.6) rotate(135deg)}#details-wrapper__heading{margin:0;padding:0;font-size:inherit;line-height:1.5;padding:.5em 0}:host([consistent-height]) ::slotted([slot=details]){display:block!important;-ms-grid-row:1!important;-ms-grid-row-span:1!important;grid-row:1/span 1!important;-ms-grid-column:1!important;-ms-grid-column-span:1!important;grid-column:1/span 1!important}:host([consistent-height][breakpoint=compact]) ::slotted([slot=details]){-ms-grid-row:2!important;-ms-grid-row-span:1!important;grid-row:2/span 1!important}::slotted([hidden]){visibility:hidden!important;position:absolute!important}:host([consistent-height]) ::slotted([hidden]){position:static!important}::slotted([slot=details-nav--footer]){border-right:1px solid #d2d2d2!important;border-right:var(--pfe-primary-details--Border,var(--pfe-theme--ui--border-width--sm,1px) var(--pfe-theme--ui--border-style,solid) var(--pfe-theme--color--ui--border--lighter,#d2d2d2))!important}::slotted(.is-focused:focus),::slotted(.is-focused:hover){outline:1px dashed #000!important;outline-width:2px!important} /*# sourceMappingURL=pfe-primary-detail.min.css.map */</style>
<div id="wrapper" data-pristine>
  <div id="details-nav">
    <slot name="details-nav--header"></slot>
    <slot name="details-nav"></slot>
  </div>
  <div id="details-wrapper">
    <div id="details-wrapper__header">
      <button id="details-wrapper__back"><div id="details-wrapper__heading"></div></button>
    </div>
    <slot name="details"></slot>
  </div>
  <div id="details-nav__footer">
    <slot name="details-nav--footer"></slot>
  </div>
</div>`;
  }

  static get tag() {
    return "pfe-primary-detail";
  }

  static get meta() {
    return {
      title: "Primary detail",
      description: "Reworks title/description content into a vertical-tabs like interface.",
    };
  }

  get templateUrl() {
    return "pfe-primary-detail.html";
  }

  get styleUrl() {
    return "pfe-primary-detail.scss";
  }

  static get events() {
    return {
      hiddenTab: `${this.tag}:hidden-tab`,
      shownTab: `${this.tag}:shown-tab`,
    };
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }

  static get properties() {
    return {
      // Set aria-orientation (doesn't change)
      orientation: {
        title: "Orientation",
        type: String,
        attr: "aria-orientation",
        default: "vertical",
      },
      // Set aria role (doesn't change)
      role: {
        type: String,
        default: "tablist",
      },
      // The min-width of the _component_ where it has a desktop layout
      breakpointWidth: {
        type: Number,
        default: 800,
      },
      // Read only: Displays the id of an open 'detailNav' element
      active: {
        type: String,
      },
      // Read only: Displays what breakpoint is currently being used
      breakpoint: {
        type: String,
        values: ["compact", "desktop"],
      },
    };
  }

  static get slots() {
    return {
      // Content that shows above the navigation column
      detailsNavHeader: {
        title: "Details Nav Header",
        type: "array",
        namedSlot: true,
      },
      // Column of headings to expland the related contents
      detailsNav: {
        title: "Details Nav",
        type: "array",
        namedSlot: true,
      },
      // Content that shows below the navigation column
      detailsNavFooter: {
        title: "Details Nav Footer",
        type: "array",
        namedSlot: true,
      },
      // Content content that is shown when it's corresponding "Details Nav" item is active
      details: {
        title: "Details",
        type: "array",
        namedSlot: true,
      },
    };
  }

  constructor() {
    super(PfePrimaryDetail, { type: PfePrimaryDetail.PfeType });

    // Make sure 'this' is set to the instance of the component in child methods
    this._handleHideShow = this._handleHideShow.bind(this);
    this._initDetailsNav = this._initDetailsNav.bind(this);
    this._initDetail = this._initDetail.bind(this);
    this.closeAll = this.closeAll.bind(this);
    this._processLightDom = this._processLightDom.bind(this);
    this._keyboardControls = this._keyboardControls.bind(this);
    this._setBreakpoint = this._setBreakpoint.bind(this);
    this._setDetailsNavVisibility = this._setDetailsNavVisibility.bind(this);
    this._updateBackButtonState = this._updateBackButtonState.bind(this);
    this._manageWrapperAttributes = this._manageWrapperAttributes.bind(this);

    // Place to store references to the slotted elements
    this._slots = {
      detailsNav: null,
      details: null,
      detailsNavHeader: null,
      detailsNavFooter: null,
    };

    // Setup mutation observer to watch for content changes
    this._childObserver = new MutationObserver(this._processLightDom);
    this._attributesObserver = new MutationObserver(this._manageWrapperAttributes);

    // Commonly used shadow DOM elements
    this._wrapper = this.shadowRoot.getElementById("wrapper");
    this._detailsNav = this.shadowRoot.getElementById("details-nav");
    this._detailsWrapper = this.shadowRoot.getElementById("details-wrapper");
    this._detailsWrapperHeader = this.shadowRoot.getElementById("details-wrapper__header");
    this._detailsWrapperHeading = this.shadowRoot.getElementById("details-wrapper__heading");
    this._detailsBackButton = this.shadowRoot.getElementById("details-wrapper__back");

    this._debouncedSetBreakpoint = null;
    this._windowInnerWidth;

    // @todo: decide if we need this anymore
    // Store all focusable element types in variable
    this._focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  }

  connectedCallback() {
    super.connectedCallback();

    // Add appropriate markup and behaviors if DOM is ready
    if (this.hasLightDOM()) {
      this._processLightDom();
    }

    // Lower debounce delay for automated testing
    const debounceDelay = this.hasAttribute("automated-testing") ? 0 : 100;

    this._debouncedSetBreakpoint = debounce(this._setBreakpoint, debounceDelay);
    window.addEventListener("resize", this._debouncedSetBreakpoint);

    // Process the light DOM on any update
    this._childObserver.observe(this, { childList: true });
    this._attributesObserver.observe(this, { attributes: true, attributeFilter: ["active"] });

    this._detailsBackButton.addEventListener("click", this.closeAll);

    // A11y: add keydown event listener to activate keyboard controls
    this.addEventListener("keydown", this._keyboardControls);
  }

  disconnectedCallback() {
    this._childObserver.disconnect();
    this._attributesObserver.disconnect();

    window.removeEventListener("resize", this._debouncedSetBreakpoint);

    if (this._slots.detailsNav) {
      for (let index = 0; index < this._slots.detailsNav.length; index++) {
        this._slots.detailsNav[index].removeEventListener("click", this._handleHideShow);
      }
    }

    // Remove keydown event listener if component disconnects
    this.removeEventListener("keydown", this._keyboardControls);
  }

  /**
   * Adds active class to shadow DOM if component is active to avoid animation jank
   * @note For some reason, when using :host([active]) to transformX, entering an active state got a janky animation.
   * Using active class that lives in the shadow root does not  ¯\_(ツ)_/¯
   */
  _manageWrapperAttributes() {
    if (this.hasAttribute("active")) {
      this._wrapper.classList.add("active");
    } else {
      this._wrapper.classList.remove("active");
    }
  }

  /**
   * Updates markup of details-nav elements to be toggle buttons
   * @param {object} toggle Slotted element (probably a headline, unless it's been initialized already)
   * @param {integer} index The index of the item in the details-nav slot
   */
  _initDetailsNav(detailNavElement, index) {
    const createToggleButton = detailNavElement.tagName !== "BUTTON";
    let toggle = null;

    if (createToggleButton) {
      const attr = detailNavElement.attributes;
      toggle = document.createElement("button");

      toggle.innerHTML = detailNavElement.innerHTML;
      toggle.setAttribute("role", "tab");

      // list of attributes that we DO NOT want to pass to our shadow DOM.
      const denyListAttributes = ["style", "role"];

      // Copy over attributes from original element that aren't in denyList
      [...attr].forEach((detailNavElement) => {
        if (!denyListAttributes.includes(detailNavElement.name)) {
          toggle.setAttribute(detailNavElement.name, detailNavElement.value);
        }
      });

      // Keeping track of tagName which is used in mobile layout to maintain heading order
      toggle.dataset.wasTag = detailNavElement.tagName;

      // If the detailNavElement does not have a ID, set a unique ID
      if (!detailNavElement.id) {
        toggle.setAttribute("id", `pfe-detail-toggle-${Math.random().toString(36).substr(2, 9)}`);
      }
    } else {
      toggle = detailNavElement;
    }

    // If the detailNavElement does not have a ID, set a unique ID
    if (!detailNavElement.id) {
      detailNavElement.setAttribute("id", `pfe-detail-toggle-${Math.random().toString(36).substr(2, 9)}`);
    }

    toggle.addEventListener("click", this._handleHideShow);
    toggle.dataset.index = index;

    // Store a reference to our new detailsNav item
    this._slots.detailsNav[index] = toggle;

    if (createToggleButton) {
      // Using replaceChild to avoid IE issues
      detailNavElement.parentElement.replaceChild(toggle, detailNavElement);
    }
  }

  /**
   * Process detail wrapper elements
   * @param {object} detail DOM Object of detail wrapper
   * @param {integer} index The index of the item when detail wrappers are queried
   */
  _initDetail(detail, index) {
    detail.dataset.index = index;

    // If the toggle does not have a ID, set a unique ID
    if (!detail.hasAttribute("id")) {
      detail.setAttribute("id", `pfe-detail-${Math.random().toString(36).substr(2, 9)}`);
    }

    detail.setAttribute("role", "tabpanel");
    // Set initial tabindex state for detail panel, -1 one when panel is inactive
    detail.setAttribute("tabindex", "-1");

    const toggleId = this._slots.detailsNav[index].getAttribute("id");
    if (!detail.hasAttribute("aria-labelledby") && toggleId) {
      detail.setAttribute("aria-labelledby", toggleId);
    }

    // Swing back to detailsNav to add aria-controls, now that details have an Id
    if (!this._slots.detailsNav[index].hasAttribute("aria-controls") && detail.id) {
      this._slots.detailsNav[index].setAttribute("aria-controls", detail.id);
    }

    // Leave a reliable indicator that this has been initialized so we don't do it again
    detail.dataset.processed = true;
  }

  /**
   * Evaluate whether component is smaller than breakpoint
   * Then manage state of component and manage active/inactive elements
   */
  _setBreakpoint() {
    // We don't need to do anything if the page width is unchanged
    if (this._windowInnerWidth === window.innerWidth) {
      return;
    }

    const breakpointWas = this.breakpoint;
    const breakpointIs = this.offsetWidth < this.breakpointWidth ? "compact" : "desktop";

    this.breakpoint = breakpointIs;

    // If nothing has been touched and we move to mobile, the details nav should be shown,
    // not the item that was opened by default so the desktop design would work
    if (this._wrapper.hasAttribute("data-pristine") && breakpointIs === "compact") {
      const activeToggle = this.active ? document.getElementById(this.active) : false;
      if (activeToggle) {
        this._addCloseAttributes(activeToggle);
        this.removeAttribute("active");
      }
    }

    // If the breakpoint changed we need to set all aria attributes since the UI design pattern changes
    if (breakpointWas !== breakpointIs) {
      for (let index = 0; index < this._slots.detailsNav.length; index++) {
        const detailNavItem = this._slots.detailsNav[index];
        if (detailNavItem.id === this.active) {
          this._addActiveAttributes(detailNavItem);
        } else {
          this._addCloseAttributes(detailNavItem);
        }
      }
    }

    // If we've switched breakpoints or one wasn't set
    if (breakpointWas !== "desktop" && breakpointIs === "desktop") {
      // Desktop should never have nothing selected, default to first item if nothing is selected
      if (!this.active) {
        this._handleHideShow({ target: this._slots.detailsNav[0] });
      }

      // Make sure the left column items are visible
      this._setDetailsNavVisibility(true);
    } else if (breakpointWas !== "compact" && breakpointIs === "compact") {
      // Hide the left column if it is out of view
      if (this.active) {
        this._setDetailsNavVisibility(false);
      }
    }

    this._windowInnerWidth = window.innerWidth;
  }

  /**
   * Utility function to hide elements in details nav
   * @param {boolean} visible True to show nav elements, false to hide
   */
  _setDetailsNavVisibility(visible) {
    const leftColumnSlots = ["detailsNav", "detailsNavHeader", "detailsNavFooter"];
    // Manage detailsNav elements hidden attribute
    for (let index = 0; index < leftColumnSlots.length; index++) {
      const slotName = leftColumnSlots[index];
      for (let j = 0; j < this._slots[slotName].length; j++) {
        const detailNavItem = this._slots[slotName][j];
        detailNavItem.hidden = !visible;
      }
    }
  }

  /**
   * Adds nav functionality and adds additional HTML/attributes to markup
   */
  _processLightDom() {
    // Update slots
    this._slots = {
      detailsNav: this.getSlot("details-nav"),
      details: this.getSlot("details"),
      detailsNavHeader: this.getSlot("details-nav--header"),
      detailsNavFooter: this.getSlot("details-nav--footer"),
    };

    if (this._slots.detailsNav.length !== this._slots.details.length) {
      this.error(
        `The number of item headings does not match the number of item details. Found ${this._slots.detailsNav.length} item headings & ${this._slots.details.length} item details.`
      );
      return;
    }

    // Get active detailNavItem and corresponding details, if we have active elements
    const activeDetailNavId = this.active;
    let activeDetailId = null;
    if (activeDetailNavId) {
      activeDetailId = document.getElementById(activeDetailNavId).getAttribute("aria-controls");
    }

    // Setup left sidebar navigation
    this._slots.detailsNav.forEach((toggle, index) => {
      this._initDetailsNav(toggle, index);
    });

    // Setup item detail elements
    this._slots.details.forEach((detail, index) => {
      this._initDetail(detail, index);
      // Make sure all inactive detailNav and detail elements have closed attributes
      if (detail.id !== activeDetailId) {
        this._addCloseAttributes(this._slots.detailsNav[index], detail);
      }
    });

    this._setBreakpoint();

    // Desktop layout requires that something is active, if nothing is active make first item active
    if (!this.active && this.breakpoint === "desktop") {
      this._handleHideShow({ target: this._slots.detailsNav[0] });
    }
  } // end _processLightDom()

  /**
   * Add the appropriate active/open attributes
   * @param {Object} toggle DOM element in the details-nav slot
   * @param {Object} detail Optional, DOM element in the details slot
   */
  _addActiveAttributes(toggle, detail) {
    // Get detail element if one isn't set
    if (!detail) {
      detail = document.getElementById(toggle.getAttribute("aria-controls"));
    }

    detail.hidden = false;
    detail.removeAttribute("aria-hidden");
    detail.removeAttribute("tabindex");

    if (this.breakpoint === "desktop") {
      // Ideal toggle markup at desktop
      // [aria-selected=true]:not([aria-expanded])
      toggle.setAttribute("aria-selected", "true");
      toggle.removeAttribute("aria-expanded");
    }
    // Compact layout
    else {
      // Ideal toggle markup at mobile
      // [aria-expanded=true]:not([aria-selected])
      toggle.setAttribute("aria-expanded", "true");
      toggle.removeAttribute("aria-selected");
    }
  }

  /**
   * Set appropriate inactive/closed attributes
   * @param {Object} toggle DOM element in the details-nav slot
   * @param {Object} detail Optional, DOM element in the details slot
   */
  _addCloseAttributes(toggle, detail) {
    if (!detail) {
      detail = document.getElementById(toggle.getAttribute("aria-controls"));
    }

    detail.hidden = true;
    /**
     * A11y note:
     * tabindex = -1 removes element from the tab sequence, set when tab is not selected
     * so that only the active tab (selected tab) is in the tab sequence.
     * @see https://www.w3.org/TR/wai-aria-practices/examples/tabs/tabs-2/tabs.html
     */
    detail.setAttribute("tabindex", "-1");
    detail.setAttribute("aria-hidden", "true");

    if (this.breakpoint === "desktop") {
      // Ideal toggle markup at desktop
      // [aria-selected=false]:not([aria-expanded])
      toggle.setAttribute("aria-selected", "false");
      toggle.removeAttribute("aria-expanded");
    }
    // Compact layout
    else {
      // aria-expanded attr on toggle since mobile view UI is a drawer dropdown
      // Ideal toggle markup at mobile
      // [aria-expanded=false]:not([aria-selected])
      toggle.setAttribute("aria-expanded", "false");
      toggle.removeAttribute("aria-selected");
    }
  }

  /**
   * Manages the back button's state attributes
   */
  _updateBackButtonState() {
    // Element is hidden with CSS at desktop layout
    if (this.breakpoint === "compact") {
      if (this.active) {
        this._detailsBackButton.setAttribute("aria-expanded", "true");
      } else {
        this._detailsBackButton.setAttribute("aria-expanded", "false");
      }
    }
  }

  /**
   * Handles changes in state
   * @param {object} e Event object
   */
  _handleHideShow(e) {
    const nextToggle = e.target;

    // Detect if handleHideShow was called by an event listener or manually in code
    if (typeof e === "object" && e instanceof Event) {
      // If the user has interacted with the component remove the pristine attribute
      this._wrapper.removeAttribute("data-pristine");
    }

    if (typeof nextToggle === "undefined") {
      return;
    }
    // If the clicked toggle is already open, no need to do anything
    else if (nextToggle.getAttribute("aria-selected") === "true" && nextToggle.id === this.active) {
      return;
    }

    const nextDetails = this._slots.details[parseInt(nextToggle.dataset.index)];
    const previousToggle = this.active ? document.getElementById(this.active) : false;
    const currentToggle = document.getElementById(this.active);

    // Update attribute to show which toggle is active
    this.active = nextToggle.id;

    // Create the appropriate heading for the top of the content column
    let newHeading = null;
    if (nextToggle.dataset.wasTag && nextToggle.dataset.wasTag.substr(0, 1) === "H") {
      newHeading = document.createElement(nextToggle.dataset.wasTag);
    } else {
      newHeading = document.createElement("strong");
    }
    newHeading.innerText = nextToggle.innerText;
    newHeading.id = this._detailsWrapperHeading.id;
    // Replace old heading
    this._detailsWrapperHeading.parentElement.replaceChild(newHeading, this._detailsWrapperHeading);
    this._detailsWrapperHeading = newHeading;

    // Make sure the aria-controls attribute is set to the details wrapper
    this._detailsBackButton.setAttribute("aria-controls", nextDetails.id);

    // Shut previously active detail
    if (currentToggle) {
      const currentDetails = this._slots.details[parseInt(currentToggle.dataset.index)];

      this._addCloseAttributes(currentToggle, currentDetails);

      this.emitEvent(PfePrimaryDetail.events.hiddenTab, {
        detail: {
          tab: currentToggle,
          details: currentDetails,
        },
      });
    }

    // Add active attributes to Next Item
    this._addActiveAttributes(nextToggle, nextDetails);

    // At compact make sure elements in left sidebar are hidden, otherwise make sure they're shown
    if (this.getAttribute("breakpoint") === "compact") {
      if (this.active) {
        this._setDetailsNavVisibility(false);
        this._detailsBackButton.focus();
      } else {
        this._setDetailsNavVisibility(true);
        if (previousToggle) {
          previousToggle.focus();
        }
      }
    }

    this.emitEvent(PfePrimaryDetail.events.shownTab, {
      detail: {
        tab: nextToggle,
        details: nextDetails,
      },
    });

    this._updateBackButtonState();
  } // end _handleHideShow()

  /**
   * Closes the open toggle and details
   */
  closeAll() {
    this._setDetailsNavVisibility(true);

    if (this.active) {
      const detailNav = document.getElementById(this.active);
      const details = document.getElementById(detailNav.getAttribute("aria-controls"));
      this._addCloseAttributes(detailNav, details);
      this.emitEvent(PfePrimaryDetail.events.hiddenTab, {
        detail: {
          tab: detailNav,
          details: details,
        },
      });

      // Set focus back to toggle that was activated
      detailNav.focus();
      this.removeAttribute("active");
    }
  }

  /**
   * Check if active element is a tab toggle
   * @param {object} element Target slotted element
   */
  _isToggle(element) {
    return element.getAttribute("slot") === "details-nav";
  }

  /**
   * Check if active element is a tab panel
   * @param {object} element Target slotted element
   */
  _isPanel(element) {
    return element.getAttribute("slot") === "details";
  }

  /**
   * Get the corresponding active tab panel for the active tab toggle
   * @return {object} DOM Element for active panel
   */
  _getFocusedPanel() {
    const toggles = this._slots.detailsNav;
    let newIndex = toggles.findIndex((toggle) => toggle === document.activeElement);

    return toggles[newIndex % toggles.length].nextElementSibling;
  }

  /**
   * Get previous toggle in relation to the active toggle
   * @return {object} DOM Element for toggle before the active one
   */
  _getPrevToggle() {
    const toggles = this._slots.detailsNav;
    let newIndex = toggles.findIndex((toggle) => toggle === document.activeElement) - 1;

    return toggles[(newIndex + toggles.length) % toggles.length];
  }

  /**
   * Get currently active toggle
   * @return {object} DOM Element for active toggle
   */
  _getFocusedToggle() {
    return document.getElementById(this.active);
  }

  /**
   * Get next toggle in list order from currently focused
   * @return {object} DOM Element for element after active toggle
   */
  _getNextToggle() {
    const toggles = this._slots.detailsNav;
    let newIndex = toggles.findIndex((toggle) => toggle === document.activeElement) + 1;

    return toggles[newIndex % toggles.length];
  }

  /**
   * Manual user activation vertical tab
   * @param {event} Target event
   */
  _keyboardControls(event) {
    const currentElement = event.target;
    let newToggle;

    switch (event.key) {
      case "Escape":
        // Only closing all at compact sizes since something should always be selected at non-compact
        if (this.getAttribute("breakpoint") === "compact") {
          this.closeAll();
        }
        break;
      // case "Tab":
      // Tab (Default tab behavior)
      /// When focus moves into the tab list, places focus on the active tab element
      /// When the focus is in the tab list, move focus away from active tab element to next element in tab order which is the tabpanel element
      /// When focus is moved outside of the tab list focus moves to the next focusable item in the DOM order

      case "ArrowUp":
      case "Up":
      case "ArrowLeft":
      case "Left":
        if (!this._isToggle(currentElement)) {
          return;
        }
        event.preventDefault(); // Prevent scrolling
        // Up Arrow/Left Arrow
        /// When tab has focus:
        /// Moves focus to the next tab
        /// If focus is on the last tab, moves focus to the first tab
        newToggle = this._getPrevToggle();
        break;

      case "ArrowDown":
      case "Down":
      case "ArrowRight":
      case "Right":
        if (!this._isToggle(currentElement)) {
          return;
        }
        event.preventDefault(); // Prevent scrolling
        // Down Arrow/Right Arrow
        /// When tab has focus:
        /// Moves focus to previous tab
        /// If focus is on the first tab, moves to the last tab
        /// Activates the newly focused tab

        newToggle = this._getNextToggle();
        break;

      case "Home":
        if (!this._isToggle(currentElement)) {
          return;
        }
        event.preventDefault(); // Prevent scrolling
        // Home
        //// When a tab has focus, moves focus to the first tab

        newToggle = this._slots.detailsNav[0];
        break;

      case "End":
        if (!this._isToggle(currentElement)) {
          return;
        }
        event.preventDefault(); // Prevent scrolling
        // End
        /// When a tab has focus, moves focus to the last tab

        newToggle = this._slots.detailsNav[this._slots.detailsNav.length - 1];
        break;

      default:
        return;
    }

    if (newToggle) newToggle.focus();
  } // end _keyboardControls()
} // end Class

PFElement.create(PfePrimaryDetail);

export default PfePrimaryDetail;
//# sourceMappingURL=pfe-primary-detail.js.map
