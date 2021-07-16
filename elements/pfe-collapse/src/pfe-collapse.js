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

    this._pfeClass = pfeClass;
    this._toggleClass = toggleClass;
    this._panelClass = panelClass;

    this._linkControls = this._linkControls.bind(this);
    this._panelForToggle = this._panelForToggle.bind(this);

    this._changeHandler = this._changeHandler.bind(this);

    this._observer = new MutationObserver(this._linkControls);

    this.addEventListener("keydown", this._keydownHandler);
    this.addEventListener(PfeCollapsePanel.events.animationStart, this._animationStartHandler);
    this.addEventListener(PfeCollapsePanel.events.animationEnd, this._animationEndHandler);
  }

  connectedCallback() {
    super.connectedCallback();

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
    const item = toggles[index];
    if (item) {
      item.toggle();

      this.emitEvent(PfeCollapse.events.change, {
        detail: {
          expanded: item.expanded,
          toggle: item,
          panel: item.controlledPanel,
        },
      });
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

      this.emitEvent(PfeCollapse.events.change, {
        detail: {
          expanded: item.expanded,
          toggle: item,
          panel: item.controlledPanel,
        },
      });
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

      this.emitEvent(PfeCollapse.events.change, {
        detail: {
          expanded: item.expanded,
          toggle: item,
          panel: item.controlledPanel,
        },
      });
    }
  }

  /**
   * Expands all items; fire an event for each change
   */
  expandAll() {
    const toggles = this._allToggles();
    toggles.forEach((toggle) => {
      toggle.expand();

      this.emitEvent(PfeCollapse.events.change, {
        detail: {
          expanded: toggle.expanded,
          toggle: toggle,
          panel: toggle.controlledPanel,
        },
      });
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

      this.emitEvent(PfeCollapse.events.change, {
        detail: {
          expanded: toggle.expanded,
          toggle: toggle,
          panel: toggle.controlledPanel,
        },
      });
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

  // _getIndex() {}

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
      // this.expand(index);
    }
  }

  static create(pfeClass) {
    PFElement.create(pfeClass);
  }
}

PFElement.create(PfeCollapseToggle);
PFElement.create(PfeCollapsePanel);
PFElement.create(PfeCollapse);

export { PfeCollapse, PfeCollapseToggle, PfeCollapsePanel };
