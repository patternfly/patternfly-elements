import PFElement from "../../pfelement/dist/pfelement.js";

class PfeJumpLinksPanel extends PFElement {
  static get tag() {
    return "pfe-jump-links-panel";
  }

  get templateUrl() {
    return "pfe-jump-links-panel.html";
  }

  get styleUrl() {
    return "pfe-jump-links-panel.scss";
  }

  static get events() {
    return {
      change: `${this.tag}:change`,
      activeNavItem: `${this.tag}:active-navItem`,
    };
  }

  static get observer() {
    return {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
    };
  }

  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  get offsetValue() {
    return this.offset || parseInt(this.customVar, 10) || 0;
  }

  static get properties() {
    return {
      offset: {
        title: "Offset",
        type: Number,
        observer: "_offsetChanged",
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
    return this.querySelectorAll(".pfe-jump-links-panel__section");
  }

  get customVar() {
    return this.cssVariable(`${this.tag}--offset`) || 200;
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
  }

  connectedCallback() {
    super.connectedCallback();

    this._makeSpacers();
    this._isValidMarkup();

    this._init();
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this._observer.disconnect();

    window.removeEventListener("scroll", this._scrollCallback);
  }

  _isValidMarkup() {
    if (this.childElementCount === 1) {
      this.warn(
        "pfe-jump-links-panel must contain more than one child element. Having a top-level 'wrapper' will prevent appropriate styles from being applied."
      );
    }
  }

  _makeSpacers() {
    if (!this.sections || this.sections.length <= 0) return;

    // Check for manually or previously added spacers, remove them
    const spacers = this.querySelectorAll(".pfe-jump-links__section--spacer");
    [...spacers].forEach(spacer => {
      spacer.remove();
    });

    [...this.sections].forEach((section) => {
      let parentDiv = section.parentNode;
      let div = document.createElement("div");

      parentDiv.insertBefore(div, section);

      let spacer = section.previousElementSibling;
      spacer.classList.add("pfe-jump-links__section--spacer");
      spacer.id = section.id;
      section.removeAttribute("id");
      spacer.style.marginTop = "calc(-1 * (var(--pfe-navigation--Height--actual, 100px) + var(--pfe-jump-links--nav-height, 0px)))";
      spacer.style.height = "calc(var(--pfe-navigation--Height--actual, 100px) + var(--pfe-jump-links--nav-height, 0px))";
    });
  }

  _init() {
    if (window.ShadyCSS) this._observer.disconnect();

    window.addEventListener("scroll", () => {
      clearTimeout(this._scrollCallback._tId);
      this._scrollCallback._tId = setTimeout(() => {
        this._scrollCallback();
      }, 50);
    });

    this.emitEvent(PfeJumpLinksPanel.events.change);

    this._makeActive(this.currentActive);

    // Set up the mutation observer
    this._observer.observe(this, PfeJumpLinksPanel.observer);
  }

  _makeActive(link) {
    this.currentActive = [...this.sections].indexOf(link);
    this.emitEvent(PfeJumpLinksPanel.events.activeNavItem, {
      detail: {
        activeNavItem: link,
      },
    });
  }

  _removeActive(link) {
    this.emitEvent(PfeJumpLinksPanel.events.activeNavItem, {
      detail: {
        activeNavItem: null,
      },
    });
  }

  _removeAllActive() {
    this.emitEvent(PfeJumpLinksPanel.events.activeNavItem, {
      detail: {
        activeNavItem: null,
      },
    });
  }

  _scrollCallback() {
    // Make an array from the node list
    const sections = [...this.sections];

    // Get all the sections that match this point in the scroll
    const matches = sections.filter((section) => {
      return (
        section.getBoundingClientRect().top > this.offsetValue &&
        section.getBoundingClientRect().bottom < window.innerHeight
      );
    });

    // Don't change anything if no items were found
    if (matches.length === 0) return;

    // Identify the first one queried as the current section
    let current = matches[0];

    // If there is more than 1 match, check it's distance from the top
    // whichever is within 200px, that is our current.
    if (matches.length > 1) {
      const close = matches.filter((section) => section.getBoundingClientRect().top <= 200);
      // If 1 or more items are found, use the last one.
      if (close.length > 0) current = close[close.length - 1];
    }

    if (current) {
      const currentIdx = sections.indexOf(current);

      // If that section isn't already active,
      // remove active from the other links and make it active
      if (currentIdx !== this.currentActive) {
        this._removeAllActive();
        this._makeActive(currentIdx);
      }
    }
  }
}

export default PfeJumpLinksPanel;
