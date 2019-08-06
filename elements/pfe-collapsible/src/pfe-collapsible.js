import PFElement from "../pfelement/pfelement.js";

function generateId() {
  return Math.random()
    .toString(36)
    .substr(2, 9);
}

class PfeCollapsibleToggle extends PFElement {
  static get tag() {
    return "pfe-collapsible-toggle";
  }

  get templateUrl() {
    return "pfe-collapsible-toggle.html";
  }

  get styleUrl() {
    return "pfe-collapsible-toggle.scss";
  }

  get pfeId() {
    return this.getAttribute("pfe-id");
  }

  set pfeId(id) {
    if (!id) {
      return;
    }

    this.setAttribute("pfe-id", id);
  }

  get expanded() {
    return this.getAttribute("aria-expanded") === "true";
  }

  set expanded(val) {
    const value = Boolean(val);
    this.setAttribute("aria-expanded", value);
  }

  static get observedAttributes() {
    return ["aria-controls"];
  }

  constructor(pfeClass, { setTabIndex = true, addKeydownHandler = true } = {}) {
    super(pfeClass || PfeCollapsibleToggle);

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

    if (this.id && this.id !== "") {
      this.pfeId = this.id;
    }

    const generatedId = `${PfeCollapsibleToggle.tag}-${generateId()}`;

    if (!this.id) {
      this.id = generatedId;
    }

    if (!this.pfeId) {
      this.pfeId = generatedId;
    }

    this.setAttribute("role", "button");

    if (this._setTabIndex) {
      this.setAttribute("tabindex", 0);
    }
  }

  disconnectedCallback() {
    this.removeEventListener("click", this._clickHandler);

    if (this._addKeydownHandler) {
      this.removeEventListener("keydown", this._keydownHandler);
    }
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    super.attributeChangedCallback(attr, oldVal, newVal);

    if (!newVal) {
      return;
    }

    // this can be an issue if the pfe-collapsible is located within
    // a shadow root
    if (this.getRootNode) {
      this.controlledPanel = this.getRootNode().querySelector(`#${newVal}`);
    } else {
      this.controlledPanel = document.querySelector(`#${newVal}`);
    }
  }

  toggle() {
    this.expanded = !this.expanded;

    if (this.controlledPanel) {
      this.controlledPanel.expanded = this.expanded;

      this.dispatchEvent(
        new CustomEvent(`${PfeCollapsible.tag}:change`, {
          detail: {
            expanded: this.expanded,
            toggle: this,
            panel: this.controlledPanel
          },
          bubbles: true
        })
      );
    } else {
      console.warn(
        `${this.tag}: This toggle doesn't have a panel associated with it`
      );
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
}

class PfeCollapsiblePanel extends PFElement {
  static get tag() {
    return "pfe-collapsible-panel";
  }

  get templateUrl() {
    return "pfe-collapsible-panel.html";
  }

  get styleUrl() {
    return "pfe-collapsible-panel.scss";
  }

  get pfeId() {
    return this.getAttribute("pfe-id");
  }

  set pfeId(id) {
    if (!id) {
      return;
    }

    this.setAttribute("pfe-id", id);
  }

  get animates() {
    return this.getAttribute("pfe-animation") === "false" ? false : true;
  }

  get expanded() {
    return this.hasAttribute("pfe-expanded");
  }

  set expanded(val) {
    const value = Boolean(val);

    if (value) {
      this.setAttribute("pfe-expanded", "");

      if (this.animates) {
        const height = this.getBoundingClientRect().height;
        this._fireAnimationEvent("opening");
        this._animate(0, height);
      }
    } else {
      if (this.hasAttribute("pfe-expanded")) {
        const height = this.getBoundingClientRect().height;
        this.removeAttribute("pfe-expanded");

        if (this.animates) {
          this._fireAnimationEvent("closing");
          this._animate(height, 0);
        }
      }
    }
  }

  constructor(pfeClass) {
    super(pfeClass || PfeCollapsiblePanel);
  }

  connectedCallback() {
    super.connectedCallback();

    this.expanded = false;

    if (this.id && this.id !== "") {
      this.pfeId = this.id;
    }

    const generatedId = `${PfeCollapsiblePanel.tag}-${generateId()}`;

    if (!this.id) {
      this.id = generatedId;
    }

    if (!this.pfeId) {
      this.pfeId = generatedId;
    }
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
    event.target.removeEventListener(
      "transitionend",
      this._transitionEndHandler
    );

    this.dispatchEvent(
      new CustomEvent(`${PfeCollapsiblePanel.tag}:animation-complete`, {
        detail: {
          expanded: this.expanded,
          panel: this
        },
        bubbles: true
      })
    );
  }

  _fireAnimationEvent(state) {
    this.dispatchEvent(
      new CustomEvent(`${PfeCollapsiblePanel.tag}:animating`, {
        detail: {
          state: state,
          panel: this
        },
        bubbles: true
      })
    );
  }
}

class PfeCollapsible extends PFElement {
  static get tag() {
    return "pfe-collapsible";
  }

  get templateUrl() {
    return "pfe-collapsible.html";
  }

  get styleUrl() {
    return "pfe-collapsible.scss";
  }

  get schemaUrl() {
    return "pfe-collapsible.json";
  }

  get animates() {
    return this.getAttribute("pfe-animation") === "false" ? false : true;
  }

  static get observedAttributes() {
    return ["pfe-animation"];
  }

  constructor(pfeClass) {
    super(pfeClass || PfeCollapsible);

    this._toggle = null;
    this._panel = null;
    this._linkControls = this._linkControls.bind(this);
    this._changeHandler = this._changeHandler.bind(this);
    this._observer = new MutationObserver(this._linkControls);

    this.addEventListener(`${PfeCollapsible.tag}:change`, this._changeHandler);
    this.addEventListener(`${PfeCollapsiblePanel.tag}:animating`, this._animatingHandler);
    this.addEventListener(`${PfeCollapsiblePanel.tag}:animation-complete`, this._animationCompleteHandler);
  }

  connectedCallback() {
    super.connectedCallback();

    Promise.all([
      customElements.whenDefined(PfeCollapsiblePanel.tag),
      customElements.whenDefined(PfeCollapsibleToggle.tag)
    ]).then(() => {
      if (this.children.length) {
        this._linkControls();
      }

      this._observer.observe(this, { childList: true });
    });
  }

  disconnectedCallback() {
    this.removeEventListener(`${PfeCollapsible.tag}:change`, this._changeHandler);
    this.removeEventListener(`${PfeCollapsiblePanel.tag}:animating`, this._animatingHandler);
    this.removeEventListener(`${PfeCollapsiblePanel.tag}:animation-complete`, this._animationCompleteHandler);
    this._observer.disconnect();
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    super.attributeChangedCallback(attr, oldVal, newVal);

    if (!newVal) {
      return;
    }

    if (newVal !== "false" && newVal !== "true") {
      return;
    }

    if (this._panel) {
      this._panel.setAttribute("pfe-animation", newVal);
    }
  }

  toggle() {
    this._toggle.toggle();
  }

  _linkControls() {
    this._toggle = this.querySelector(PfeCollapsibleToggle.tag);
    this._panel = this.querySelector(PfeCollapsiblePanel.tag);

    this._toggle.setAttribute("aria-controls", this._panel.pfeId);
  }

  _animatingHandler() {
    this.classList.add("animating");
  }

  _animationCompleteHandler() {
    this.classList.remove("animating");
  }

  _changeHandler(event) {

  }
}

PFElement.create(PfeCollapsible);
PFElement.create(PfeCollapsibleToggle);
PFElement.create(PfeCollapsiblePanel);

export { PfeCollapsible, PfeCollapsibleToggle, PfeCollapsiblePanel };
