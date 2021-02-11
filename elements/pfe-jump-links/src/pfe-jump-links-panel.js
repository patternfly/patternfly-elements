import PFElement from "../../pfelement/dist/pfelement.js";

class PfeJumpLinksPanel extends PFElement {
  static get tag() {
    return "pfe-jump-links-panel";
  }

  // No template or sass files because it's just a default slot
  get html() {
    return `<style>:host { display: block; } :host([hidden]) { display: none; }</style><slot></slot>`;
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
      characterData: true
    };
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
      rootMargin: `${this.offsetValue}px 0px 0px 0px`,
      // Threshold is an array of intervals that fire intersection observer event
      // @TODO: Update this to be a dynamic property [0, 0.01, 0.02, 0.03, 0.04, ...]
      threshold: Array(100)
        .fill()
        .map((_, i) => i / 100 || 0)
    });
    this._resizeObserver = new ResizeObserver(this._resizeHandler);

    // Set up a listener for the paired navigation element, if one is not already attached
    if (!this.nav) document.body.addEventListener("pfe-jump-links-nav:upgraded", this._connectToNav);
  }

  connectedCallback() {
    super.connectedCallback();

    // Fire the initalize method and when complete, announce the upgrade to the document
    this._init();

    // Once the upgrade is complete, emit an event announcing the panel upgrade
    if (this.sections) {
      this.emitEvent(PfeJumpLinksPanel.events.upgrade, {
        detail: {
          panel: this,
          sections: this.sections,
          navigation: this.sectionRefs
        }
      });
    }

    // Set up the mutation observer to watch the Jump Links Panel for updates
    this._observer.observe(this, PfeJumpLinksPanel.observerSettings);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._observer.disconnect();
    this._resizeObserver.disconnect();

    this.querySelectorAll("[section-container]").forEach(container => this._intersectionObserver.disconnect(container));

    document.body.removeEventListener("pfe-jump-links-nav:upgraded", this._connectToNav);
  }

  get offsetValue() {
    // Throw a warning if the returned value is using something other than px for units
    const getValue = variableName => {
      const value = this.cssVariable(variableName);
      if (!value) return;
      if (!Number.isInteger(Number(value)) && !value.match(/px$/)) {
        this.warn(
          `Using an integer with a unit (other than px) is not supported for custom property ${variableName}. Received ${value}. The component strips the unit using parseInt(). For example, 1rem would become 1 and behave as if you had entered 1px.`
        );
      }
      return value;
    };

    // Note that the offset attribute will override a value stored in the offset CSS variable
    let offsetInput = this.offset || getValue(`${this.tag}--offset`) || 0;
    // Capture the height of the navigation component
    let navigation = getValue(`pfe-navigation--Height--actual`) || 0;
    // Capture the height of the navigation for jump links, including the older, deprecated --pfe-jump-links--nav-height
    let jumpLinksNav = getValue(`pfe-jump-links-nav--Height--actual`) || getValue(`pfe-jump-links--nav-height`) || 0;

    // The total offset value is the user-provided offset plus the height of the navigation plus the height of the jump links navigation
    return parseInt(offsetInput) + parseInt(navigation) + parseInt(jumpLinksNav) + 8 || 200;
  }

  /**
   * Connect the panel to it's associated navigation after upgrade
   */
  _connectToNav(evt) {
    // If the target does not match the id of this panel
    if (!(evt.detail && evt.detail.nav && evt.detail.nav.id === this.scrolltarget)) {
      // Return but don't remove the event
      return;
    }

    // Assign the pointer to the nav reference
    this.nav = evt.detail.nav;

    // If a nav element is already defined, return without additional parsing
    if (this.nav) {
      // Stop listening for the navigation
      document.body.removeEventListener("pfe-jump-links-nav:upgraded", this._connectToNav);

      // Stop the nav from listening for the panel to prevent duplication
      document.body.removeEventListener(PfeJumpLinksPanel.events.upgrade, this.nav._upgradePanelHandler);

      // Add the offset variable to the navigation component
      this.cssVariable(`--pfe-jump-links-nav--offset`, `${this.offsetValue}px`, this.nav);

      // If the nav does not have a pointer to this panel yet, add one
      if (!this.nav.panel) {
        this.nav.connectPanel(this);

        // Fire the intialization
        this.nav._init();
      } else {
        // If the navigation is set to autobuild, fire the build
        if (this.nav.autobuild) this.nav.rebuild(this.sectionRefs);
      }
    }
  }

  /**
   * Build an object reference to a section
   */
  _sectionReference(section) {
    return {
      id: section.id,
      ref: section,
      isVisible: false,
      // @TODO Document the nav-label in the README
      label: (section.getAttribute("nav-label") || section.textContent).trim(),
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
          .replace(/\./, "")
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
    }

    this.style.position = "relative";

    // Attach the intersection observer for each section to determine if it's visible
    this._buildSectionContainers();

    // Set the offset value as a variable on the document for sticky nav elements to use
    if (this.nav) this.cssVariable(`--pfe-jump-links-nav--offset`, `${this.offsetValue}px`, this.nav);

    // Attach the resize observer
    this._resizeObserver.observe(this);
  }

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
      if (nextHeading) bottom = nextHeading.getBoundingClientRect().top;

      // Create a container for the section to determine % visible
      let container = heading.querySelector(`span[section-container]`);

      if (!container) {
        isNewEl = true;
        container = document.createElement("span");
        container.setAttribute("section-container", "");
        container.style.position = "absolute";
        container.style.left = 0;

        // Set up the intersection observer fresh
        this._intersectionObserver.observe(container);
      }

      container.style.top = `${heading.getBoundingClientRect().top - this.getBoundingClientRect().top}px`;
      container.style.width = `${this.offsetWidth}px`;
      container.style.height = `${bottom - heading.getBoundingClientRect().top}px`;

      if (isNewEl) heading.appendChild(container);
    }
  }

  _resizeHandler(entries) {
    // Disconnect the observer while we process
    this._resizeObserver.disconnect();

    this._buildSectionContainers();

    // Attach the resize observer
    this._resizeObserver.observe(this);
  }

  /**
   * This handler processes the results of the intersection observer
   */
  _intersectionCallback(entries, observer) {
    // Get all the sections that are visible in the viewport
    entries.forEach(entry => {
      let section = entry.target.parentNode;
      if (section.id) {
        let ref = this.sectionRefs[section.id];
        if (ref) {
          ref.isVisible = entry.isIntersecting;
          // if (entry.isIntersecting) console.log(entry);
          ref.intersectionRatio = entry.intersectionRatio;
        }
      }
    });

    this.updateActiveState();
  }

  updateActiveState() {
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

    // console.dir(ids);
    this.emitEvent(PfeJumpLinksPanel.events.activeNavItem, {
      detail: {
        activeIds: ids
      }
    });
  }
}

export default PfeJumpLinksPanel;
