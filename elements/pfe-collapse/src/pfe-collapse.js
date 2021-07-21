import PFElement from "../../pfelement/dist/pfelement.js";

import PfeCollapseToggle from "./pfe-collapse-toggle.js";
import PfeCollapsePanel from "./pfe-collapse-panel.js";

class PfeCollapse extends PFElement {
  static get tag() {
    if (this._pfeClass && this._pfeClass.tag) return this._pfeClass.tag;
    else return "pfe-collapse";
  }

  /**
   * A local alias to the tag.
   */
  get tag() {
    return this._pfeClass.tag || PfeCollapse.tag;
  }

  get html() {
    return `<slot></slot>`;
  }

  get styleUrl() {
    return "pfe-collapse.scss";
  }

  /**
   * Returns a boolean value based on the animation attribute
   * @returns {boolean}
   */
  get animates() {
    return this.animation === "false" ? false : true;
  }

  static get events() {
    return {
      change: `${this.tag}:change`,
    };
  }

  static get properties() {
    return {
      animation: {
        title: "Animation",
        type: String,
        values: ["false"],
        cascade: [PfeCollapsePanel.tag],
      },
      // @TODO: Deprecated
      oldAnimation: {
        alias: "animation",
        attr: "pfe-animation",
      },
    };
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }

  constructor(
    pfeClass = PfeCollapse,
    {
      toggleClass = PfeCollapseToggle,
      panelClass = PfeCollapsePanel,
      type = PfeCollapse.PfeType,
      delayRender = false,
    } = {}
  ) {
    super(pfeClass, {
      type: type,
      delayRender: delayRender,
    });

    // Capture pass-throughs in global pointers
    this._pfeClass = pfeClass;
    this._toggleClass = toggleClass;
    this._panelClass = panelClass;

    // Bind methods to this context
    this._linkControls = this._linkControls.bind(this);
    this._panelForToggle = this._panelForToggle.bind(this);

    // Set up handlers
    this._observer = new MutationObserver(this._linkControls);

    // Attach events
    this.addEventListener("keydown", this._keydownHandler);

    this.addEventListener(this._toggleClass.events.change, this._changeEventHandler);
    this.addEventListener(this._panelClass.events.animationStart, this._animationStartHandler);
    this.addEventListener(this._panelClass.events.animationEnd, this._animationEndHandler);
  }

  connectedCallback() {
    super.connectedCallback();

    // note: This would be perfect for an await post IE11 support
    Promise.all([
      customElements.whenDefined(this._toggleClass.tag),
      customElements.whenDefined(this._panelClass.tag),
    ]).then(() => {
      this._linkControls();

      this._observer.observe(this, { childList: true });
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener("keydown", this._keydownHandler);
    this.removeEventListener(this._panelClass.events.animationStart, this._animationStartHandler);
    this.removeEventListener(this._panelClass.events.animationEnd, this._animationEndHandler);
    this._observer.disconnect();
  }

  /**
   * Accepts a 0-based index value (integer) for the set of items to expand or collapse.
   * @param {Number} index (default: 0)
   */
  toggle(index = 0) {
    const toggles = this._allToggles();
    const item = toggles[index];
    if (item) {
      item.toggle();
    }
  }

  /**
   * Accepts a 0-based index value (integer) for the set of items to expand; fire an event for the change
   * @param {Number} index (default: 0)
   */
  expand(index = 0) {
    const toggles = this._allToggles();
    const item = toggles[index];
    if (item) {
      item.expand();
    }
  }

  /**
   * Accepts a 0-based index value (integer) for the set of items to collapse; fire an event for the change
   * @param {Number} index (default: 0)
   */
  collapse(index = 0) {
    const toggles = this._allToggles();
    const item = toggles[index];
    if (item) {
      item.collapse();
    }
  }

  /**
   * Expands all items; fire an event for each change
   */
  expandAll() {
    const toggles = this._allToggles();
    toggles.forEach((toggle) => {
      toggle.expand();
    });

    // Update focus state
    toggles[0].focus = true;
  }

  /**
   * Collapses all items; fire an event for each change
   */
  collapseAll() {
    const toggles = this._allToggles();
    toggles.forEach((toggle) => {
      toggle.collapse();
    });

    // Update focus state
    toggles[0].focus = true;
  }

  /**
   * Initialize the component by connecting toggles and panels
   * with aria controls and labels
   */
  _linkControls() {
    const toggles = this._allToggles();

    // @TODO: Throw warning here?  Attach an observer?
    if (!toggles) return;

    // For each toggle in the set, attach the aria connections
    toggles.forEach((toggle) => {
      const panel = this._panelForToggle(toggle);
      // Escape if no matching panel can be found
      if (!panel) return;

      // Define the controlled panel
      toggle.controlledPanel = panel;

      // Set up the aria connections
      toggle.ariaControls = panel.id;
      panel.ariaLabelledby = toggle.id;
    });
  }

  _allToggles() {
    if (!this.isIE11) return [...this.querySelectorAll(`:scope > ${this._toggleClass.tag}`)];
    else return this.children.filter((el) => el.tagName.toLowerCase() === this._toggleClass.tag);
  }

  _panelForToggle(toggle) {
    const next = toggle.nextElementSibling;

    if (!next) return;

    if (next.tagName.toLowerCase() !== this._panelClass.tag) {
      this.error(`Sibling element to a toggle needs to be a panel.`);
      return;
    }

    return next;
  }

  _animationStartHandler() {
    this.classList.add("animating");
  }

  _animationEndHandler() {
    this.classList.remove("animating");
  }

  /**
   * Pushes out a generically named event with the necessary details
   * @param {object} event
   */
  _changeEventHandler(event) {
    this.emitEvent(this._pfeClass.events.change, event);
  }

  _keydownHandler(evt) {
    const toggles = this._allToggles();
    let currentIdx = toggles.findIndex((toggle) => toggle === document.activeElement);
    let nextToggle;

    switch (evt.key) {
      case "ArrowDown":
      case "Down":
      case "ArrowRight":
      case "Right":
        nextToggle = toggles[currentIdx + (1 % toggles.length)];
        if (nextToggle) nextToggle.focus = true;
        break;
      case "ArrowUp":
      case "Up":
      case "ArrowLeft":
      case "Left":
        nextToggle = toggles[(currentIdx - 1 + toggles.length) % toggles.length];
        if (nextToggle) nextToggle.focus = true;
        break;
      case "Home":
        evt.preventDefault();
        nextToggle = toggles[0];
        if (nextToggle) nextToggle.focus = true;
        break;
      case "End":
        evt.preventDefault();
        nextToggle = toggles[toggles.length - 1];
        if (nextToggle) nextToggle.focus = true;
        break;
      case " ":
      case "Spacebar":
      case 32:
        evt.stopPropagation();
        evt.preventDefault();
        this.toggle(currentIdx);
        break;
      case "Enter":
      case 13:
        // Prevent browser from scrolling down the page on spacebar
        evt.preventDefault();
        this.toggle(currentIdx);
        break;
      default:
        return;
    }
  }

  // Pointer to the PFElement create method for components extending this
  static create(pfeClass) {
    PFElement.create(pfeClass);
  }
}

PFElement.create(PfeCollapseToggle);
PFElement.create(PfeCollapsePanel);
PFElement.create(PfeCollapse);

export { PfeCollapse, PfeCollapseToggle, PfeCollapsePanel };
