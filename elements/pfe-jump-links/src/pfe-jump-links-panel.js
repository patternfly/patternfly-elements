import PFElement from "../../pfelement/dist/pfelement.js";

class PfeJumpLinksPanel extends PFElement {
  static get tag() {
    return "pfe-jump-links-panel";
  }

  get html() {
    return `<slot></slot>`;
  }

  static get events() {
    return {
      change: `${this.tag}:change`
    };
  }

  static get observer() {
    return {
      childList: true,
      subtree: true,
      // characterData: true,
      // attributes: true,
    };
  }

  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  static get properties() {
    return {
      offset: {
        title: "Offset",
        type: Number
      },
      scrolltarget: {
        title: "Scroll target",
        type: String,
      },
      // @TODO: Deprecated in 1.0
      oldOffset: {
        alias: "offset",
        attr: "pfe-c-offset",
      },
      // @TODO: Deprecated in 1.0
      oldScrolltarget: {
        alias: "scrolltarget",
        attr: "pfe-c-scrolltarget",
      },
    };
  }

  get sections() {
    return this.querySelectorAll(`.${this.tag}__section`);
  }

  constructor() {
    super(PfeJumpLinksPanel, { type: PfeJumpLinksPanel.PfeType });

    this.currentActive = 0;
    this.current = -1;

    this._init = this._init.bind(this);
    this._makeSpacers = this._makeSpacers.bind(this);
    this._isValidMarkup = this._isValidMarkup.bind(this);

    this._scrollCallback = this._scrollCallback.bind(this);
    this._observer = new MutationObserver(this._init);

    window.addEventListener("scroll", () => {
      clearTimeout(this._scrollCallback._tId);
      this._scrollCallback._tId = setTimeout(() => {
        this._scrollCallback();
      }, 10);
    });
  }

  connectedCallback() {
    super.connectedCallback();

    this._init();
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this._observer.disconnect();

    window.removeEventListener("scroll", this._scrollCallback);
  }

  _isValidMarkup() {
    if (this.sections.length === 0) {
      this.warn(
        `This panel does not contain any headings labeled with the ${this.tag}__section class. Please add that class and an ID to any heading you would like surfaced in the jump links navigation.`
      );
    }
  }

  _makeSpacers() {
    if (!this.sections || this.sections.length <= 0) return;

    // Disconnect the mutation observer to update the spacers
    this._observer.disconnect();

    [...this.sections].forEach((section) => {
      const parentEl = section.parentNode;
      let spacer = section.previousElementSibling;

      // If the previous element is not a spacer, create one
      if (!spacer || !spacer.classList.contains("pfe-jump-links__section--spacer")) {
        spacer = document.createElement("div");
        spacer.classList.add("pfe-jump-links__section--spacer");
        parentEl.insertBefore(spacer, section);
      }

      // Move the ID from the section to the spacer
      if (section.id && (!spacer.id || spacer.id !== section.id)) {
        spacer.id = section.id;
        section.removeAttribute("id");
        section.setAttribute("data-target", spacer.id);
      }

      spacer.style.marginTop = `calc(-1 * (var(--pfe-navigation--Height--actual, 100px) + var(--pfe-jump-links--nav-height, 0px)))`;
      spacer.style.height = `calc(var(--pfe-navigation--Height--actual, 100px) + var(--pfe-jump-links--nav-height, 0px))`;
    });

    // Set up the mutation observer
    this._observer.observe(this, PfeJumpLinksPanel.observer);
  }

  _init() {
    // Validate and throw warnings about improper markup
    this._isValidMarkup();
    this._makeSpacers();
    this.emitEvent(PfeJumpLinksPanel.events.change);
  }
}

export default PfeJumpLinksPanel;
