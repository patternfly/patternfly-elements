import PFElement from "../../pfelement/dist/pfelement.js";
import PfeJumpLinksNav from "./pfe-jump-links-nav.js";

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
      upgrade: `${this.tag}:upgraded`
    };
  }

  get offsetValue() {
    return this.offset || parseInt(this.customVar, 10) || 0;
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

  get customVar() {
    return this.cssVariable(`${this.tag}--offset`) || 200;
  }

  constructor() {
    super(PfeJumpLinksPanel, { type: PfeJumpLinksPanel.PfeType });

    this.nav = undefined;

    this.visibleSections = [];
    this.sections = [];
    this.sectionRefs = [];

    this._connectToNav = this._connectToNav.bind(this);
    this._init = this._init.bind(this);
    this._sectionReference = this._sectionReference.bind(this);
    this._parseSections = this._parseSections.bind(this);

    // this._makeSpacers = this._makeSpacers.bind(this);
    this._scrollCallback = this._scrollCallback.bind(this);

    this._observer = new MutationObserver(this._init);
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

    // Attach the scroll listener
    window.addEventListener("scroll", this._scrollCallback);

    // Set up the mutation observer to watch the Jump links panel for updates
    this._observer.observe(this, PfeJumpLinksPanel.observerSettings);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this._observer.disconnect();

    window.removeEventListener("scroll", this._scrollCallback);
  }

  /**
   * Connect the panel to it's associated navigation after upgrade
   */
  _connectToNav(evt) {
    console.log(`connect ${this.scrolltarget}`);
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

  // _makeSpacers() {
  //   if (!this.sections) return;

  //   // @TODO: I'm not sure this is accessible; maybe we use animate instead with offset there?
  //   this.sections.forEach(section => {
  //     let parentDiv = section.parentNode;
  //     let spacer = document.createElement("div");

  //     // Insert the spacer before the section heading
  //     parentDiv.insertBefore(spacer, section);

  //     // let spacer = section.previousElementSibling;
  //     spacer.classList.add("pfe-jump-links__section--spacer");

  //     // Move the ID from the section to the new spacer, store a reference
  //     let sectionId = section.id;
  //     spacer.id = sectionId;
  //     section.removeAttribute("id");
  //     section.setAttribute("ref-id", sectionId);
  //   });
  // }

  _sectionReference(section) {
    return {
      id: section.id,
      ref: section,
      label: section.getAttribute("nav-label") || section.textContent,
      offset: this.offsetValue,
      panel: this,
      children: []
    };
  }

  _parseSections(sections, set = [], type = "classes") {
    if (sections.length === 0) return set;

    const section = sections[0];

    if (type === "classes") {
      // If the section provided does not have the correct classes applied
      if (!section.classList.contains("pfe-jump-links-panel__section")) sections.shift();
    } else {
      // If this section does not use an h-tag or is missing an ID, remove it from the list
      if (!section.tagName.startsWith("H") || !section.id) section.shift();
    }

    // Set defaults for relationship
    let isSibling = false;
    let isChild = false;
    let isParent = false;

    // Get details about the item
    const sectionRef = this._sectionReference(section);
    const newLevel = section.tagName.slice(1, 2);
    const lastItem = set.length > 0 ? set[set.length - 1] : {};
    let previousLevel = 0;

    // If the set is empty, this is the first item and can be added directly to it
    if (set.length === 0) {
      set.push(sectionRef);
      sections.shift();
      this._parseSections(sections, set, type);
      return set;
    }

    // Capture the previous level from the lastItem in the set
    if (lastItem && lastItem.ref) previousLevel = lastItem.ref.tagName.slice(1, 2);

    if (type === "classes") {
      // If the last item has a sub-section class but this one does not, it's a parent element
      // (unless it contains has-sub-section in which case isChild will override)
      isParent = lastItem.ref.classList.contains("sub-section") && !section.classList.contains("sub-section");
      // If this item has a sub-section class but the last one did not, this is a child
      isChild = lastItem.ref.classList.contains("has-sub-section") && section.classList.contains("sub-section");
      // If it's not a child and not a parent, it's a sibling
      isSibling = !isChild && !isParent;
    } else {
      // If the headings are equal, this is a sibling object
      isSibling = newLevel === previousLevel;
      // If the new heading is greater than the previous one, this is a child object
      isChild = newLevel > previousLevel;
      // If the new heading is less than the previous one, this is a parent object
      isParent = newLevel < previousLevel;
    }

    // Add the sibling to the set array
    if (isSibling) {
      set.push(sectionRef);
      // Remove the entry from the sections
      sections.shift();
      // Recurse to see if this has siblings or children
      this._parseSections(sections, set, type);
    }

    // Add the reference to the children array of the lastItem
    if (isChild) {
      lastItem.children.push(sectionRef);
      // Remove the entry from the sections
      sections.shift();
      lastItem.children = this._parseSections(sections, lastItem.children, type);
      // Recurse to see if this has siblings or children
      this._parseSections(sections, set, type);
    }

    // If it is a parent heading, return without iterating the sections
    return set;
  }

  // _reportHeight() {
  //   const cssVarName = `--${this.tag}--Height--actual`;
  //   const styles = window.getComputedStyle(this);

  //   let height = styles.getPropertyValue("height");
  //   if (window.matchMedia("(min-width: 992px)").matches) {
  //     height = "0";
  //   }

  //   this.style.setProperty(cssVarName, height);

  //   return height;
  // }

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
        if (this.sections) this.sectionRefs = this._parseSections([...this.sections], [], "markup");
        // Escape at this point because we don't need to create spacers if no sections exist
        else return;
      }

      // @Q? Do we need spacers if there is no offset?
      // if (this.offsetValue && this.offsetValue > 0) this._makeSpacers();

      // @TODO: Handle reduce motion with smooth scroll
      // /* JavaScript MediaQueryList Interface */
      // var motionQuery = window.matchMedia("(prefers-reduced-motion)");
      // if (motionQuery.matches) {
      //   /* reduce motion */
      // }
      // motionQuery.addListener(handleReduceMotionChanged);

      resolve();
    });
  }

  _scrollCallback() {
    // Get all the sections that match this point in the scroll
    let matches = [];
    let hasChange = false;
    let ids = [];
    this.sections.forEach(section => {
      let positionTop = parseInt(section.getBoundingClientRect().top) - this.offsetValue;
      let positionBottom = parseInt(section.getBoundingClientRect().bottom) - this.offsetValue;
      if (window.scrollY <= positionTop && window.scrollY + window.innerHeight > positionBottom) {
        matches.push(section);
        hasChange = !this.visibleSections.includes(section);
        ids.push(section.id);
      }
    });

    if (hasChange) {
      this.visibleSections = matches;

      this.emitEvent(PfeJumpLinksPanel.events.activeNavItem, {
        detail: {
          activeIds: ids
        }
      });
    }
  }
}

export default PfeJumpLinksPanel;
