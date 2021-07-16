import PFElement from "../../pfelement/dist/pfelement.js";

class PfeJumpLinksPanel extends PFElement {
  static get tag() {
    return "pfe-jump-links-panel";
  }

  /**
   * No custom styles for the panel or template mark-up; just a slot
   */
  get html() {
    return `<slot></slot>`;
  }

  static get events() {
    return {
      change: `${this.tag}:change`,
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
        type: Number,
      },
      scrolltarget: {
        title: "Scroll target",
        type: String,
      },
      spacers: {
        title: "Inject spacers",
        type: Boolean,
        default: false,
        observer: "_makeSpacers",
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
  /**
   * @param {NodeList} Returns all elements from the panel's light DOM with the class .pfe-jump-links-panel__section
   */
  get sections() {
    return this.querySelectorAll(`.${this.tag}__section`);
  }

  constructor() {
    super(PfeJumpLinksPanel, { type: PfeJumpLinksPanel.PfeType });

    this._init = this._init.bind(this);
    this._makeSpacers = this._makeSpacers.bind(this);

    this._observer = new MutationObserver(() => {
      this._init();

      // Emit an event indicating a change to the panel
      this.emitEvent(PfeJumpLinksPanel.events.change, {});
    });
  }

  connectedCallback() {
    super.connectedCallback();

    this._init();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._observer.disconnect();
  }

  _makeSpacers() {
    if (!this.spacers) return;
    if (!this.sections || [...this.sections].length <= 0) return;

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

      spacer.style.marginTop = `calc(-1 * (var(--pfe-navigation--Height--actual, 0px) + var(--pfe-jump-links--Height--actual, 0px)))`;
      spacer.style.height = `calc(var(--pfe-navigation--Height--actual, 0px) + var(--pfe-jump-links--Height--actual, 0px))`;
    });

    // Set up the mutation observer
    this._observer.observe(this, PfeJumpLinksPanel.observer);
  }

  _init() {
    // Adding spacers to the panel is opt-in
    // note: this was because determining the scroll-to point
    // was easier with the scroll animation than working through
    // cross-browser support for smooth scroll CSS (looking at Safari)
    this._makeSpacers();
  }
}

export default PfeJumpLinksPanel;
