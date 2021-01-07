import PFElement from "../../pfelement/dist/pfelement.js";

function generateId() {
  return Math.random()
    .toString(36)
    .substr(2, 9);
}

class PfeCollapseToggle extends PFElement {
  static get tag() {
    return "pfe-collapse-toggle";
  }

  get templateUrl() {
    return "pfe-collapse-toggle.html";
  }

  get styleUrl() {
    return "pfe-collapse-toggle.scss";
  }

  get expanded() {
    return this.getAttribute("aria-expanded") === "true";
  }

  set expanded(val) {
    const value = Boolean(val);
    this.setAttribute("aria-expanded", value);
  }

  static get properties() {
    return {
      ariaExpanded: {
        title: "Aria expanded",
        type: String,
        prefix: false,
        values: ["true", "false"]
      },
      ariaControls: {
        title: "Aria controls",
        type: String,
        prefix: false,
        observer: "_ariaControlsChanged"
      }
    };
  }

  constructor(pfeClass, { setTabIndex = true, addKeydownHandler = true } = {}) {
    super(pfeClass || PfeCollapseToggle);

    this.controlledPanel = false;
    this._setTabIndex = setTabIndex;
    this._addKeydownHandler = addKeydownHandler;

    this.addEventListener("click", this._clickHandler);

    if (addKeydownHandler) {
      this.addEventListener("keydown", this._keydownHandler);
    }
  }

  connectedCallback() {
    super.connectedCallback();

    this.expanded = false;

    this.id = this.id || `${PfeCollapseToggle.tag}-${generateId()}`;

    this.setAttribute("role", "button");

    if (this._setTabIndex) {
      this.setAttribute("tabindex", 0);
    }

    if (!this.controlledPanel) {
      this._connectPanel(this.getAttribute("aria-controls"));
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener("click", this._clickHandler);

    if (this._addKeydownHandler) {
      this.removeEventListener("keydown", this._keydownHandler);
    }
  }

  _ariaControlsChanged(oldVal, newVal) {
    if (!newVal) {
      return;
    }

    this._connectPanel(newVal);
  }

  toggle() {
    if (this.hasAttribute("disabled")) {
      return;
    }

    this.expanded = !this.expanded;

    // one last try to hook up a panel
    if (!this.controlledPanel) {
      this._connectPanel(this.getAttribute("aria-controls"));
    }

    if (this.controlledPanel) {
      this.controlledPanel.expanded = this.expanded;

      this.emitEvent(PfeCollapse.events.change, {
        detail: {
          expanded: this.expanded,
          toggle: this,
          panel: this.controlledPanel
        }
      });
    } else {
      this.warn(`This toggle doesn't have a panel associated with it`);
    }
  }

  _clickHandler() {
    this.toggle();
  }

  _keydownHandler(event) {
    const key = event.key;

    switch (key) {
      case " ":
      case "Spacebar":
      case "Enter":
        this.toggle();
        break;
    }
  }

  _connectPanel(id) {
    // this can be an issue if the pfe-collapse is located within
    // a shadow root
    if (this.getRootNode) {
      this.controlledPanel = this.getRootNode().querySelector(`#${id}`);
    } else {
      this.controlledPanel = document.querySelector(`#${id}`);
    }
  }
}

class PfeCollapsePanel extends PFElement {
  static get tag() {
    return "pfe-collapse-panel";
  }

  static get events() {
    return {
      animationStart: `${this.tag}:animation-start`,
      animationEnd: `${this.tag}:animation-end`
    };
  }

  get templateUrl() {
    return "pfe-collapse-panel.html";
  }

  get styleUrl() {
    return "pfe-collapse-panel.scss";
  }

  get animates() {
    return this.animation === "false" ? false : true;
  }

  get expanded() {
    return this.hasAttribute("expanded") || this.hasAttribute("pfe-expanded"); // @TODO: Deprecated
  }

  set expanded(val) {
    const value = Boolean(val);

    if (value) {
      this.setAttribute("pfe-expanded", ""); // @TODO: Deprecated
      this.setAttribute("expanded", "");

      if (this.animates) {
        const height = this.getBoundingClientRect().height;
        this._fireAnimationEvent("opening");
        this._animate(0, height);
      }
    } else {
      if (this.hasAttribute("expanded") || this.hasAttribute("pfe-expanded")) {
        // @TODO: Deprecated
        const height = this.getBoundingClientRect().height;
        this.removeAttribute("expanded");
        this.removeAttribute("pfe-expanded"); // @TODO: Deprecated

        if (this.animates) {
          this._fireAnimationEvent("closing");
          this._animate(height, 0);
        }
      }
    }
  }

  static get properties() {
    return {
      animation: {
        title: "Animation",
        type: String,
        values: ["false"]
      },
      // @TODO: Deprecated
      oldAnimation: {
        alias: "animation",
        attr: "pfe-animation"
      }
    };
  }

  constructor(pfeClass) {
    super(pfeClass || PfeCollapsePanel);
  }

  connectedCallback() {
    super.connectedCallback();

    this.expanded = false;

    this.id = this.id || `${PfeCollapsePanel.tag}-${generateId()}`;
  }

  _animate(start, end) {
    this.classList.add("animating");
    this.style.height = `${start}px`;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.style.height = `${end}px`;
        this.classList.add("animating");
        this.addEventListener("transitionend", this._transitionEndHandler);
      });
    });
  }

  _transitionEndHandler(event) {
    event.target.style.height = "";
    event.target.classList.remove("animating");
    event.target.removeEventListener("transitionend", this._transitionEndHandler);

    this.emitEvent(PfeCollapsePanel.events.animationEnd, {
      detail: {
        expanded: this.expanded,
        panel: this
      }
    });
  }

  _fireAnimationEvent(state) {
    this.emitEvent(PfeCollapsePanel.events.animationStart, {
      detail: {
        state: state,
        panel: this
      }
    });
  }
}

class PfeCollapse extends PFElement {
  static get tag() {
    return "pfe-collapse";
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

  constructor(pfeClass) {
    super(pfeClass || PfeCollapse);

    this._toggle = null;
    this._panel = null;
    this._linkControls = this._linkControls.bind(this);
    this._changeHandler = this._changeHandler.bind(this);
    this._observer = new MutationObserver(this._linkControls);

    this.addEventListener(PfeCollapse.events.change, this._changeHandler);
    this.addEventListener(PfeCollapse.events.animationStart, this._animationStartHandler);
    this.addEventListener(PfeCollapse.events.animationEnd, this._animationEndHandler);
  }

  connectedCallback() {
    super.connectedCallback();

    Promise.all([
      customElements.whenDefined(PfeCollapsePanel.tag),
      customElements.whenDefined(PfeCollapseToggle.tag)
    ]).then(() => {
      if (this.hasLightDOM()) this._linkControls();

      this._observer.observe(this, { childList: true });
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener(PfeCollapse.events.change, this._changeHandler);
    this.removeEventListener(PfeCollapse.events.animationStart, this._animationStartHandler);
    this.removeEventListener(PfeCollapse.events.animationEnd, this._animationEndHandler);
    this._observer.disconnect();
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

  toggle() {
    this._toggle.toggle();
  }

  _linkControls() {
    this._toggle = this.querySelector(PfeCollapseToggle.tag);
    this._panel = this.querySelector(PfeCollapsePanel.tag);

    this._toggle.setAttribute("aria-controls", this._panel.id);
  }

  _animationStartHandler() {
    this.classList.add("animating");
  }

  _animationEndHandler() {
    this.classList.remove("animating");
  }

  _changeHandler(event) {}
}

PFElement.create(PfeCollapse);
PFElement.create(PfeCollapseToggle);
PFElement.create(PfeCollapsePanel);

export { PfeCollapse, PfeCollapseToggle, PfeCollapsePanel };
