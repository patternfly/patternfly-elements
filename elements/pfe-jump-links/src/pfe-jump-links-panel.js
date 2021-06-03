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
      change: `${this.tag}:change`,
      activeNavItem: `${this.tag}:active-navItem`,
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
    return this.querySelectorAll(`.${this.tag}__section`);
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
      this.warn(`This panel does not contain any headings labeled with the ${this.tag}__section class. Please add that class and an ID to any heading you would like surfaced in the jump links navigation.`)
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
    console.log({current: current.getAttribute("data-target"), matches: matches.map(item => item.getAttribute("data-target")).join(", ")});

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
        this.currentActive = currentIdx;
        this.emitEvent(PfeJumpLinksPanel.events.activeNavItem, {
          detail: {
            activeNavItem: currentIdx,
          },
        });
      }
    }
  }
}

export default PfeJumpLinksPanel;
