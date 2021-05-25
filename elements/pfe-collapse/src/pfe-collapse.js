import PFElement from "../../pfelement/dist/pfelement.js";

import PfeCollapseToggle from "./pfe-collapse-toggle.js";
import PfeCollapsePanel from "./pfe-collapse-panel.js";

class PfeCollapse extends PFElement {
  static get tag() {
    if (this._pfeClass && this._pfeClass.tag) return this._pfeClass.tag;
    else return "pfe-collapse";
  }

  get templateUrl() {
    return "pfe-collapse.html";
  }

  get styleUrl() {
    return "pfe-collapse.scss";
  }

  get schemaUrl() {
    return "pfe-collapse.json";
  }

  get animates() {
    return this.animation === "false" ? false : true;
  }

  static get events() {
    return {
      change: `${this.tag}:change`
    };
  }

  static get properties() {
    return {
      animation: {
        title: "Animation",
        type: String,
        values: ["false"],
        observer: "_animationChanged"
      },
      // @TODO: Deprecated
      oldAnimation: {
        alias: "animation",
        attr: "pfe-animation"
      }
    };
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }

  constructor(pfeClass, { type = PfeCollapse.PfeType, delayRender = false } = {}) {
    super(pfeClass || PfeCollapse, {
      type: type,
      delayRender: delayRender
    });

    this._pfeClass = pfeClass;

    this.init = this.init.bind(this);
    
    this._linkControls = this._linkControls.bind(this);
    this._allToggles = this._allToggles.bind(this);
    this._allPanels = this._allPanels.bind(this);
    this._panelForToggle = this._panelForToggle.bind(this);

    this._changeHandler = this._changeHandler.bind(this);

    this._observer = new MutationObserver(this.init);

    this.addEventListener("keydown", this._keydownHandler);
    this.addEventListener(PfeCollapse.events.change, this._changeHandler);
    this.addEventListener(PfeCollapse.events.animationStart, this._animationStartHandler);
    this.addEventListener(PfeCollapse.events.animationEnd, this._animationEndHandler);
  }

  connectedCallback() {
    super.connectedCallback();

    Promise.all([customElements.whenDefined(PfeCollapseToggle.tag), customElements.whenDefined(PfeCollapsePanel.tag)]).then(() => {
      this.init();

      this._observer.observe(this, { childList: true });
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener(PfeCollapse.events.change, this._changeHandler);
    this.removeEventListener("keydown", this._keydownHandler);
    this.removeEventListener(PfeCollapse.events.animationStart, this._animationStartHandler);
    this.removeEventListener(PfeCollapse.events.animationEnd, this._animationEndHandler);
    this._observer.disconnect();
  }

  /**
   * Accepts a 0-based index value (integer) for the set of items to expand or collapse.
   * @param {Number} index (default: 0)
   */
  toggle(index = 0) {
    const toggles = this._allToggles();
    if (toggles[index]) toggles[index].toggle();
  }

  /**
   * Accepts a 0-based index value (integer) for the set of items to expand.
   * @param {Number} index (default: 0)
   */
  expand(index = 0) {
    const toggles = this._allToggles();
    if (toggles[index]) {
      toggles[index].expanded = true;
      toggles[index].focus = true;
    }
  }

  /**
   * Accepts a 0-based index value (integer) for the set of items to collapse.
   * @param {Number} index (default: 0)
   */
  collapse(index = 0) {
    const toggles = this._allToggles();
    if (toggles[index]) toggles[index].expanded = false;
  }

  /**
   * Expands all items.
   */
  expandAll() {
    const toggles = this._allToggles();
    toggles.forEach(toggle => (toggle.expanded = true));
    toggles[0].focus = true;
  }

  /**
   * Expands all items.
   */
  expandAll() {
    const toggles = this._allToggles();
    toggles.forEach(toggle => (toggle.expanded = false));
  }

  init() {
    const toggles = this._allToggles();
    // console.log(toggles);
    if (toggles.length > 0) this._linkControls();
  }

  _allToggles() {
    // console.log(PfeCollapseToggle.tag);
    if (!this.isIE11) return [...this.querySelectorAll(`:scope > ${PfeCollapseToggle.tag}`)];
    else return this.children.filter(el => el.tagName.toLowerCase() === PfeCollapseToggle.tag);
  }

  _allPanels() {
    if (!this.isIE11) return [...this.querySelectorAll(`:scope > ${PfeCollapsePanel.tag}`)];
    else return this.children.filter(el => el.tagName.toLowerCase() === PfeCollapsePanel.tag);
  }

  /**
   * Initialize the component by connecting toggles and panels
   * with aria controls and labels
   */
  _linkControls() {
    const toggles = this._allToggles();

    // For each toggle in the set, attach the aria connections
    toggles.forEach(toggle => {
      const panel = this._panelForToggle(toggle);
      // Escape if no matching panel can be found
      if (!panel) return;

      toggle.ariaControls = panel.id;
      panel.ariaLabelledby = toggle.id;
    });
  }

  _panelForToggle(toggle) {
    const next = toggle.nextElementSibling;

    if (!next) return;

    if (next.tagName.toLowerCase() !== PfeCollapsePanel.tag) {
      this.error(`Sibling element to a toggle needs to be a panel.`);
      return;
    }

    return next;
  }

  _animationChanged(oldVal, newVal) {
    if (!newVal) {
      return;
    }

    if (newVal !== "false" && newVal !== "true") {
      return;
    }

    if (this._panel) {
      this._panel.animation = newVal;
    }
  }

  _animationStartHandler() {
    this.classList.add("animating");
  }

  _animationEndHandler() {
    this.classList.remove("animating");
  }

  _changeHandler(evt) {
    if (this.classList.contains("animating")) return;

    const index = this._getIndex(evt.target);

    if (evt.detail.expanded) this.expand(index);
    else this.collapse(index);
  }

  _keydownHandler(evt) {
    let currentIdx = this_toggles.findIndex(toggle => toggle === document.activeElement);
    let nextToggle;

    switch (evt.key) {
      case "ArrowDown":
      case "Down":
      case "ArrowRight":
      case "Right":
        nextToggle = this_toggles[currentIdx + (1 % this_toggles.length)];
        break;
      case "ArrowUp":
      case "Up":
      case "ArrowLeft":
      case "Left":
        nextToggle = headers[(currentIdx - 1 + headers.length) % headers.length];
        break;
      case "Home":
        nextToggle = headers[0];
        break;
      case "End":
        nextToggle = headers[headers.length - 1];
        break;
      default:
        return;
    }

    if (nextToggle) {
      nextToggle.focus = true;

      // @TODO: Should we be auto-opening on focus?
      // const index = this._getIndex(nextToggle);
      // this.expand(index);s
    }
  }

  static create(pfeClass) {
    PFElement.create(pfeClass);
  }
}

PFElement.create(PfeCollapse);
PFElement.create(PfeCollapseToggle);
PFElement.create(PfeCollapsePanel);

export { PfeCollapse, PfeCollapseToggle, PfeCollapsePanel };
