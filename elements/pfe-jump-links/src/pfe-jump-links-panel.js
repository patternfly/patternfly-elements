import PFElement from "../../pfelement/dist/pfelement.js";
import PfeJumpLinksNav from "./pfe-jump-links-nav.js";

class PfeJumpLinksPanel extends PFElement {
  static get tag() {
    return "pfe-jump-links-panel";
  }

  // No template or sass files because it's just a default slot
  get html() {
    return `<slot></slot>`;
  }

  static get events() {
    return {
      change: `${this.tag}:change`,
      activeNavItem: `${this.tag}:active-navItem`,
      upgrade: `${this.tag}:upgraded`
    };
  }

  get offsetValue() {
    let offsetInput = this.offset || this.cssVariable(`${this.tag}--offset`) || 0;
    let navigation = this.cssVariable(`pfe-navigation--Height--actual`) || 0;
    let jumpLinksNav =
      this.cssVariable(`pfe-jump-links-nav--Height--actual`) || this.cssVariable(`pfe-jump-links--nav-height`) || 0;
    return parseInt(offsetInput) + parseInt(navigation) + parseInt(jumpLinksNav) || 200;
  }

  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  static get properties() {
    return {
      offset: {
        title: "Offset",
        type: Number,
        observer: "_offsetChanged"
      },
      scrolltarget: {
        title: "Scroll target",
        type: String
      },
      // @TODO: Deprecated in 1.0
      oldOffset: {
        alias: "offset",
        attr: "pfe-c-offset"
      },
      // @TODO: Deprecated in 1.0
      oldScrolltarget: {
        alias: "scrolltarget",
        attr: "pfe-c-scrolltarget"
      }
    };
  }

  static get observerSettings() {
    return {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true
    };
  }

  constructor() {
    super(PfeJumpLinksPanel, { type: PfeJumpLinksPanel.PfeType });

    this.nav = undefined;

    this.sections = [];
    this.sectionRefs = {};

    this._connectToNav = this._connectToNav.bind(this);
    this._sectionReference = this._sectionReference.bind(this);
    this._parseSections = this._parseSections.bind(this);
    this._init = this._init.bind(this);
    this._intersectionCallback = this._intersectionCallback.bind(this);

    this._observer = new MutationObserver(this._init);
    this._intersectionObserver = new IntersectionObserver(this._intersectionCallback, {
      root: null,
      rootMargin: `${this.offsetValue}px 0px 0px 0px`,
      threshold: 1.0 // @TODO Should this be 0.8?
    });
  }

  connectedCallback() {
    super.connectedCallback();

    this._init().then(() => {
      // If sections exist, emit an event announcing the panel change
      this.emitEvent(PfeJumpLinksPanel.events.upgrade, {
        detail: {
          sections: this.sections,
          navigation: this.sectionRefs
        }
      });
    });

    // Set up a listener for the paired navigation element, if one is not already attached
    if (!this.nav) document.body.addEventListener(PfeJumpLinksNav.events.upgrade, this._connectToNav);

    // Set up the mutation observer to watch the Jump links panel for updates
    this._observer.observe(this, PfeJumpLinksPanel.observerSettings);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._observer.disconnect();
    document.body.removeEventListener(PfeJumpLinksNav.events.upgrade, this._connectToNav);
    this.sections.forEach(section => this._intersectionObserver.disconnect(section));
  }

  /**
   * Connect the panel to it's associated navigation after upgrade
   */
  _connectToNav(evt) {
    // If a nav element is already defined
    if (this.nav) {
      // Stop listening for the nav
      document.body.removeEventListener(PfeJumpLinksNav.events.upgrade, this._connectToNav);

      // Return without additional parsing
      return;
    }

    // If the target does not match the id of this panel
    if (!(evt.detail && evt.detail.nav && evt.detail.nav.id === this.scrolltarget)) {
      // Return but don't remove the event
      return;
    }

    // Assign the pointer to the nav reference
    this.nav = evt.detail.nav;

    // Stop listening for the navigation
    document.body.removeEventListener(PfeJumpLinksNav.events.upgrade, this._connectToNav);

    // Stop the nav from listening for the panel to prevent duplication
    document.body.removeEventListener(PfeJumpLinksPanel.events.upgrade, this.nav._connectToPanel);

    // If the nav does not have a pointer to this panel yet, add one
    if (!this.nav.panel) {
      this.nav.panel = this;

      // Fire the intialization
      this.nav._init();
    } else {
      // If the navigation is set to autobuild, fire the build
      if (this.nav.autobuild) this.nav.rebuild(this.sectionRefs);
    }
  }

  /**
   * Build an object reference to a section
   */
  _sectionReference(section) {
    return {
      id: section.id,
      ref: section,
      // content: section
      isVisible: false,
      // @TODO Document the alt-title in the README
      label: section.getAttribute("nav-label") || section.textContent,
      children: {}
    };
  }

  _parseSections(sections, obj = {}, type = "classes", lastItem = {}) {
    if (sections.length === 0) return obj;

    const section = sections[0];

    // If the section provided does not have the correct classes applied OR
    // If this section does not use an h-tag or is missing an ID
    // Remove it from the list without parsing it
    if (
      (type === "classes" && !section.classList.contains("pfe-jump-links-panel__section")) ||
      (type !== "classes" && !section.tagName.startsWith("H"))
    ) {
      sections.shift();
    }

    // Set defaults for relationship
    let isChild = false;
    let isParent = false;

    // Get details about the item
    const sectionRef = this._sectionReference(section);

    // If the section does not have an ID, add one now
    if (!section.id)
      if (sectionRef.label) {
        section.id = sectionRef.label
          .toLowerCase()
          .split(" ")
          .map(word => `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`)
          .join("");
      } else section.id = this.randomId;

    // If classes are present, determining sibling vs. child relationship
    if (type === "classes") {
      // If the last item has a sub-section class but this one does not, it's a parent element
      // (unless it contains has-sub-section in which case isChild will override)
      if (lastItem && lastItem.ref) {
        isParent = lastItem.ref.classList.contains("sub-section") && !section.classList.contains("sub-section");
        // If this item has a sub-section class but the last one did not, this is a child
        isChild = lastItem.ref.classList.contains("has-sub-section") && section.classList.contains("sub-section");
      }
    } else {
      // Level represents the h-tag level; this helps us determine depth and relationship
      // when no classes are present
      const newLevel = section.tagName.slice(1, 2);

      // Initialize previous level at 0, use last-item to set this value
      let previousLevel = 1;

      // Capture the previous level from the lastItem in the set
      if (lastItem.ref) previousLevel = lastItem.ref.tagName.slice(1, 2);

      // If the new heading is greater than the previous one, this is a child object
      isChild = newLevel > previousLevel;
      // If the new heading is less than the previous one, this is a parent object
      isParent = newLevel < previousLevel;
    }

    // If it is a parent heading, return without iterating the sections
    if (isParent) return obj;

    // Add the reference to the children of the lastItem
    if (isChild) {
      lastItem.children[sectionRef.id] = sectionRef;

      // Remove the entry from the sections
      sections.shift();

      // Add the reference to the children array of the lastItem
      lastItem.children = this._parseSections(sections, lastItem.children, type, sectionRef);

      // Recurse to see if this has siblings or children
      return this._parseSections(sections, obj, type, lastItem);
    }

    // Add the sibling to the object
    obj[sectionRef.id] = sectionRef;

    // Remove the entry from the sections
    sections.shift();

    // Recurse to see if this has siblings or children
    return this._parseSections(sections, obj, type, sectionRef);
  }

  _init() {
    return new Promise((resolve, reject) => {
      // Fetch the light DOM sections via class name
      this.sections = this.querySelectorAll(".pfe-jump-links-panel__section");

      // If sections are found, parse the results and store the refs
      if (this.sections.length > 0) this.sectionRefs = this._parseSections([...this.sections]);

      if (this.sections.length <= 0) {
        this.warn(
          `No elements in ${this.tag} included the .${this.tag}__section class. Grepping instead for h-level tags as a fallback.`
        );

        // Search for sections using h-level tags with IDs (the IDs are critical to the navigation working)
        this.sections = this.querySelectorAll("h1[id],h2[id],h3[id],h4[id],h5[id],h6[id]");
        if (this.sections) this.sectionRefs = this._parseSections([...this.sections], {}, "markup");
        // Escape at this point because we don't need to create spacers if no sections exist
        else return;
      }

      // Attach the intersection observer for each section to determine if it's visible
      for (let index = 0; index < this.sections.length; index++) {
        const heading = this.sections.item(index);

        // Find the top of the next section if it exists
        const nextHeading = this.sections.item(index + 1);
        const bottom = nextHeading ? nextHeading.getBoundingClientRect().top : this.getBoundingClientRect().bottom;

        // Create a container for the section to determine % visible
        // @TODO I think this has to be recalculated on resize...
        this.style.position = "relative";
        let section = document.createElement("span");
        section.style.position = "absolute";
        section.style.top = `${heading.getBoundingClientRect().top - this.getBoundingClientRect().top}px`;
        section.style.left = 0;
        section.style.width = `${heading.offsetWidth}px`;
        section.style.height = `${bottom - heading.getBoundingClientRect().top}px`;
        section.style.border = "1px solid red"; // good for debugging @TODO comment this back out
        heading.appendChild(section);

        this._intersectionObserver.observe(section);
      }

      resolve();
    });
  }

  _intersectionCallback(entries, observer) {
    // Get all the sections that are visible in the viewport
    entries.forEach(entry => {
      let section = entry.target.parentNode;
      if (section.id) {
        let ref = this.sectionRefs[section.id];
        if (ref) ref.isVisible = entry.isIntersecting;
      }
    });

    const ids = Object.values(this.sectionRefs)
      .filter(section => section.isVisible)
      .map(item => item.id);

    this.emitEvent(PfeJumpLinksPanel.events.activeNavItem, {
      detail: {
        activeIds: ids
      }
    });
    // }
  }
}

export default PfeJumpLinksPanel;
