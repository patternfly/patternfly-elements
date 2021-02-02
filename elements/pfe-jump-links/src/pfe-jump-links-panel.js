import PFElement from "../../pfelement/dist/pfelement.js";

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

  get offsetValue() {
    if (Number.isInteger(Number(this.cssVariable(`${this.tag}--offset`)))) {
      this.warn(
        `Using an integer with a unit (other than px) is not supported for custom property --${this.tag}--offset. The component strips the unit using parseInt(). For example so 1rem would become 1 and behave as if you had entered 1px.`
      );
    }

    // Note that the offset attribute will override a value stored in the offset CSS variable
    let offsetInput = this.offset || this.cssVariable(`${this.tag}--offset`) || 0;
    // Capture the height of the navigation component
    let navigation = this.cssVariable(`pfe-navigation--Height--actual`) || 0;
    // Capture the height of the navigation for jump links, including the older, deprecated --pfe-jump-links--nav-height
    let jumpLinksNav =
      this.cssVariable(`pfe-jump-links-nav--Height--actual`) || this.cssVariable(`pfe-jump-links--nav-height`) || 0;

    // The total offset value is the user-provided offset plus the height of the navigation plus the height of the jump links navigation
    return parseInt(offsetInput) + parseInt(navigation) + parseInt(jumpLinksNav) || 200;
  }

  constructor() {
    super(PfeJumpLinksPanel, { type: PfeJumpLinksPanel.PfeType });

    // Global pointer to the associated navigation
    // If this is empty, we know that no nav is attached to this panel yet
    this.nav = undefined;

    // Placeholders for the sections list and reference object
    // This global variable stores a NodeList of all the sections
    this.sections = [];
    // This global variable stores an object using IDs as the keys
    // for each section in the panel, these objects are built using `_sectionReference`
    this.sectionRefs = {};

    // Connect the internal only methods to the this context
    this._connectToNav = this._connectToNav.bind(this);
    this._sectionReference = this._sectionReference.bind(this);
    this._parseSections = this._parseSections.bind(this);
    this._init = this._init.bind(this);
    this._buildSectionContainers = this._buildSectionContainers.bind(this);
    this._intersectionCallback = this._intersectionCallback.bind(this);
    this._resizeHandler = this._resizeHandler.bind(this);

    // Define the observers
    this._observer = new MutationObserver(this._init);
    this._intersectionObserver = new IntersectionObserver(this._intersectionCallback, {
      root: null,
      rootMargin: `${this.offsetValue}px 0px 0px 0px`,
      // Threshold is an array of intervals that fire intersection observer event
      // @TODO: Update this to be a dynamic property
      threshold: Array(100)
        .fill()
        .map((_, i) => i / 100 || 0) // [0, 0.01, 0.02, 0.03, 0.04, ...]
    });
    this._resizeObserver = new ResizeObserver(this._resizeHandler);
  }

  connectedCallback() {
    super.connectedCallback();

    // Fire the initalize method and when complete, announce the upgrade to the document
    this._init()
      .then(() => {
        // Once the upgrade is complete, emit an event announcing the panel upgrade
        this.emitEvent(PfeJumpLinksPanel.events.upgrade, {
          detail: {
            sections: this.sections,
            navigation: this.sectionRefs
          }
        });
      })
      // @TODO Do we need to handle the failure?
      .catch();

    // Set up a listener for the paired navigation element, if one is not already attached
    if (!this.nav) document.body.addEventListener("pfe-jump-links-nav:upgraded", this._connectToNav);

    // Set up the mutation observer to watch the Jump links panel for updates
    this._observer.observe(this, PfeJumpLinksPanel.observerSettings);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._observer.disconnect();
    this._resizeObserver.disconnect();
    document.body.removeEventListener("pfe-jump-links-nav:upgraded", this._connectToNav);
    this.sections.forEach(section => this._intersectionObserver.disconnect(section));
  }

  /**
   * Connect the panel to it's associated navigation after upgrade
   */
  _connectToNav(evt) {
    // If a nav element is already defined
    if (this.nav) {
      // Stop listening for the nav
      document.body.removeEventListener("pfe-jump-links-nav:upgraded", this._connectToNav);

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
    document.body.removeEventListener("pfe-jump-links-nav:upgraded", this._connectToNav);

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
      if (lastItem.ref) lastItem.children[sectionRef.id] = sectionRef;

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
        else resolve();
      }

      this.style.position = "relative";

      // Attach the intersection observer for each section to determine if it's visible
      this._buildSectionContainers();

      // Attach the resize observer
      this._resizeObserver.observe(this);

      resolve();
    });
  }

  // @TODO I think this has to be recalculated on resize...
  _buildSectionContainers() {
    // Attach the intersection observer for each section to determine if it's visible
    for (let index = 0; index < this.sections.length; index++) {
      let isNewEl = false;

      const heading = this.sections.item(index);

      // Find the top of the next section if it exists
      const nextHeading = this.sections.item(index + 1);

      // Default the bottom of the section to the bottom of the panel
      let bottom = this.getBoundingClientRect().bottom;

      // Otherwise the bottom of the section is the top of the next heading element
      if (nextHeading) {
        bottom = nextHeading.getBoundingClientRect().top;
      }

      // Create a container for the section to determine % visible
      let container = heading.querySelector(`span[section-container]`);

      if (!container) {
        isNewEl = true;
        container = document.createElement("span");
        container.setAttribute("section-container", "");
        container.style.position = "absolute";
        container.style.border = "1px solid red"; // good for debugging @TODO comment this back out
      }

      container.style.top = `${heading.getBoundingClientRect().top - this.getBoundingClientRect().top}px`;
      container.style.left = 0;
      container.style.width = `${heading.offsetWidth}px`;
      container.style.height = `${bottom - heading.getBoundingClientRect().top}px`;

      if (isNewEl) heading.appendChild(container);
    }
  }

  _resizeHandler(entries) {
    console.log(entries);
    this._buildSectionContainers();
  }

  _intersectionCallback(entries, observer) {
    // Get all the sections that are visible in the viewport
    entries.forEach(entry => {
      let section = entry.target.parentNode;
      if (section.id) {
        let ref = this.sectionRefs[section.id];
        if (ref) ref.isVisible = entry.isIntersecting;
        if (ref) ref.intersectionRatio = entry.intersectionRatio;
      }
    });

    const ids = Object.values(this.sectionRefs)
      // We want only sections that are visible
      .filter(section => section.isVisible)
      // Sort the items by largest intersectionRatio which will be the item
      // that is the most visible on the screen.
      // @todo we could take into account other variables like how big the section is on the page
      .sort((a, b) => a.intersectionRatio - b.intersectionRatio)
      .reverse()
      // Now that they are sorted, all we need is the section id
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
