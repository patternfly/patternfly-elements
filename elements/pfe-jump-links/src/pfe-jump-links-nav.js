import PFElement from "../../pfelement/dist/pfelement.js";

class PfeJumpLinksNav extends PFElement {
  static get tag() {
    return "pfe-jump-links-nav";
  }

  get templateUrl() {
    return "pfe-jump-links-nav.html";
  }

  get styleUrl() {
    return "pfe-jump-links-nav.scss";
  }

  static get events() {
    return {
      upgrade: `${this.tag}:upgraded`
    };
  }

  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  static get properties() {
    return {
      autobuild: {
        title: "Autobuild",
        type: Boolean
      },
      horizontal: {
        title: "Horizontal",
        type: Boolean,
        observer: "_horizontalHandler"
      },
      srText: {
        title: "Navigation label",
        type: String,
        default: "Jump to section"
      },
      color: {
        title: "Color",
        type: String,
        values: ["lightest", "lighter", "darkest"]
      },
      hideLabel: {
        title: "Hide label",
        type: Boolean
      },
      nesting: {
        title: "Support nested headings",
        type: Boolean,
        default: true
      },
      // @TODO: Deprecated in 2.0
      oldAutobuild: {
        alias: "autobuild",
        attr: "pfe-c-autobuild"
      },
      // @TODO: Deprecated in 2.0
      oldHorizontal: {
        alias: "horizontal",
        attr: "pfe-c-horizontal"
      },
      // @TODO: Deprecated in 2.0
      oldColor: {
        alias: "color",
        attr: "pfe-color"
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

  // Sets up backwards compatibility for tag prefixed slot names
  get logo() {
    return this.getSlot("logo") || this.getSlot(`${this.tag}--logo`);
  }

  get cta() {
    return this.getSlot("link") || this.getSlot(`${this.tag}--link`);
  }

  get heading() {
    return this.getSlot("heading") || this.getSlot(`${this.tag}--heading`);
  }

  constructor() {
    super(PfeJumpLinksNav, { type: PfeJumpLinksNav.PfeType, delayRender: true });

    // Do not render this in IE11
    if (this.isIE11) {
      this.setAttribute("hidden", "");
      return;
    }

    // Global pointer to the associated panel
    // If this is empty, we know that no panel exists for this nav
    this.panel;

    // Cache for build()
    this._building;

    // Global definition for link elements in the ShadowDOM
    this.links;
    this.panelRefs = [];
    this.activeLinks = [];

    // Public API
    this.build = this.build.bind(this);
    this.validateData = this.validateData.bind(this);
    this.getLinkById = this.getLinkById.bind(this);
    this.closeAccordion = this.closeAccordion.bind(this);
    this.rebuild = this.rebuild.bind(this);
    this.setActive = this.setActive.bind(this);
    this.isActive = this.isActive.bind(this);
    this.removeActive = this.removeActive.bind(this);
    this.removeAllActive = this.removeAllActive.bind(this);
    this.upgradeA11y = this.upgradeA11y.bind(this);
    this.upgradeA11yListItem = this.upgradeA11yListItem.bind(this);
    this.connectPanel = this.connectPanel.bind(this);

    //-- Internal-only methods
    this._buildItem = this._buildItem.bind(this);
    this._isValidLightDom = this._isValidLightDom.bind(this);
    this._copyListToShadow = this._copyListToShadow.bind(this);
    this._connectLightDOM = this._connectLightDOM.bind(this);
    // this._reportHeight = this._reportHeight.bind(this);
    this._init = this._init.bind(this);

    // Event handlers
    this._clickHandler = this._clickHandler.bind(this);
    this._upgradePanelHandler = this._upgradePanelHandler.bind(this);
    this._activeItemHandler = this._activeItemHandler.bind(this);
    this._horizontalHandler = this._horizontalHandler.bind(this);
    this._observer = new MutationObserver(this._init);

    // Note: We need the panel connection even if we're not using autobuild to determine where to scroll on click
    // document.body.addEventListener("pfe-jump-links-panel:upgraded", this._upgradePanelHandler);

    // Start listening for if the panel has changed
    // @TODO: add a specialized handler for the change event
    // document.body.addEventListener("pfe-jump-links-panel:change", this._init);

    // If the active item changes, fire the handler
    // document.body.addEventListener("pfe-jump-links-panel:active-navItem", this._activeItemHandler);
  }

  connectedCallback() {
    super.connectedCallback();

    // Do not render this in IE11
    if (this.isIE11) {
      this.setAttribute("hidden", "");
      return;
    }

    // Initialize the navigation
    this._init();
    this.render();

    // Trigger the mutation observer
    // if (!this.autobuild) this._observer.observe(this, PfeJumpLinksNav.observerSettings);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    // this._observer.disconnect();

    // document.body.removeEventListener("pfe-jump-links-panel:upgraded", this._upgradePanelHandler);
    // document.body.removeEventListener("pfe-jump-links-panel:active-navItem", this._activeItemHandler);
    // document.body.removeEventListener("pfe-jump-links-panel:change", this._init);

    this.links.forEach(link => link.removeEventListener("click", this._clickHandler));
  }

  getLinkById(id) {
    if (!id) return;

    let getLink = function(id) {
      // Check if the shadow template contains links
      const links = this.shadowRoot.querySelectorAll("#container li > a");
      if (!links) return;
      const filter = [...links].filter(item => item.hash === `#${id}`);

      if (filter.length <= 0) return;
      // @TODO This is too noisy
      // this.warn(`No link was found with #${id} in the navigation links.`);

      return filter[0];
    };

    let link = getLink(id);

    // @TODO Post-IE11; convert to async / await
    if (this._building) {
      this._building.then(() => {
        link = getLink(id);
      });
    }

    return link;
  }

  closeAccordion() {
    this.shadowRoot.querySelector("pfe-accordion").collapseAll();
  }

  rebuild(navset) {
    // Capture sections from the panel if not provided
    // This is helpful for when this is used as an API
    // re: document.querySelector("pfe-jump-links-nav").rebuild();
    if (!navset) {
      if (this.panel.tagName === "pfe-jump-links-panel") navset = this.panel.sectionRefs;
      else return;
    }

    this.build(navset);
  }

  setActive(link) {
    if (!link) return;

    const listItem = link.closest("li");

    const checkForAncestors = item => {
      item.setAttribute("active", "");

      // if (item.classList.contains("has-sub-section")) {
      //   item.querySelector(":scope > ul").setAttribute("aria-expanded", "true");
      // }

      const parentItem = item.parentElement.closest("li");
      if (!parentItem || parentItem === item) return;

      if (parentItem && item.classList.contains("sub-section")) {
        parentItem.setAttribute("active", "");
        parentItem.querySelector(":scope > ul").setAttribute("aria-expanded", "true");
        item.tabindex = "0";
      }

      checkForAncestors(parentItem);
    };

    checkForAncestors(listItem);
  }

  isActive(link) {
    if (!link) return false;
    const listItem = link.closest("li");
    return listItem.hasAttribute("active");
  }

  removeActive(link) {
    if (!link) return;

    const listItem = link.closest("li");
    listItem.removeAttribute("active");

    const checkForAncestors = item => {
      // parentElement ensures the query doesn't return itself!
      const parentItem = item.parentElement.closest("li");
      if (!parentItem) return;

      if (item.classList.contains("sub-section")) {
        // Only remove status from parent if all children are removed
        const parentLink = parent.querySelector(":scope > a");
        if (this.isActive(parentLink)) {
          let activeChildren = false;
          parent.querySelectorAll("ul > li > a").forEach(link => {
            if (this.isActive(link)) activeChildren = true;
          });

          // If none of the children are active, remove the active settings
          if (!activeChildren) {
            parent.removeAttribute("active");
            parent.setAttribute("aria-expanded", "false");
          }
        }
      } else if (item.classList.contains("has-sub-section")) {
        item.setAttribute("aria-expanded", "false");
      }

      item.removeAttribute("active");

      if (item.classList.contains("has-sub-section")) {
        item.querySelector(":scope > ul").setAttribute("aria-expanded", "false");
      }

      if (parentItem && item.classList.contains("sub-section")) {
        parentItem.removeAttribute("active");
        parentItem.closest("ul").setAttribute("aria-expanded", "false");
        item.tabindex = "-1";
      }

      checkForAncestors(parentItem);
    };

    checkForAncestors(listItem);
  }

  removeAllActive() {
    this.activeLinks.forEach(link => this.removeActive(link));
    // Empty out the active links pointer
    this.activeLinks = [];
  }

  // @TODO: add a link to the WCAG page about role="tree"
  upgradeA11yListItem(item, isSubSection = false) {
    // Create the link to the section
    const link = item.querySelector("a");
    link.classList.add("pfe-jump-links-nav__link");

    item.className = "pfe-jump-links-nav__item"; // Goes on the li tag
    // List items get a role of "treeitem"
    item.role = "treeitem";
    // List items that are visible should be focusable
    item.tabindex = "0";

    if (isSubSection) {
      item.classList.add("sub-section");

      // Subsections are not visible and thus should not be focusable
      link.tabindex = "-1";
    }

    // If active links is initiated before the nav is upgrade, active the link
    if (this.activeLinks.length > 0 && this.activeLinks.includes(link)) this.setActive(link);

    // Build out the nested group
    let nested = item.querySelector(":scope > ul");
    if (nested) {
      nested.role = "group";

      const children = nested.querySelectorAll(":scope > li");
      if (children.length > 0) {
        item.classList.add("has-sub-section");
        item.setAttribute("aria-expanded", "false");
        children.forEach(child => this.upgradeA11yListItem(child, true));
      }
    }
  }

  upgradeA11y() {
    // Turn off the observer while we update the DOM
    // if (!this.autobuild) this._observer.disconnect();

    // Get the light DOM
    const parentList = this.querySelector("ul") || this.querySelector("ol");
    if (!parentList) return;

    // Loop through the markup and apply the appropriate tags
    parentList.classList.add("pfe-jump-links-nav");
    // Note: only the first UL gets the tree role
    parentList.role = "tree";

    // Check to see if there is a heading tag preceeding this list
    const label = parentList.closest("h1[id],h2[id],h3[id],h4[id],h5[id],h6[id]");
    if (label) parentList.setAttribute("aria-labelledby", label.id);

    // Iterate over each list item that is a direct child of the parentList
    const listItems = parentList.querySelectorAll(":scope > li");
    listItems.forEach(item => this.upgradeA11yListItem(item));

    // Trigger the mutation observer
    // if (!this.autobuild) this._observer.observe(this, PfeJumpLinksNav.observerSettings);
  }

  /**
   * Connect the nav to it's associated panel after upgrade
   * Note: this no longer has to be `pfe-jump-links-panel`
   */
  connectPanel(panel) {
    this.panel = panel;

    // If the panel does not have a scrolltarget attribute, go ahead and add it
    if (!this.panel.hasAttribute("scrolltarget")) this.panel.setAttribute("scrolltarget", this.id);

    // Set up a pointer to this nav element in the panel if it doesn't already exist
    if (!this.panel.nav) this.panel.nav = this;

    // Fire rebuild if autobuild is set
    if (this.autobuild) this.rebuild();
  }

  /**
   * Process the upgrade panel custom event to connect the panel to this navigation element
   */
  _upgradePanelHandler(evt) {
    if (!evt && !evt.detail) return;

    let panel = evt.detail.panel;

    // If the target does not match the id of this nav
    // Return but don't remove the event
    if (!(panel && panel.scrolltarget === this.id)) return;

    // Wire up the panel to this element
    this.connectPanel(panel);

    // Stop listening for the panel
    document.body.removeEventListener("pfe-jump-links-panel:upgraded", this._upgradePanelHandler);

    // Stop the panel from listening for the nav upgrade (prevents duplication)
    document.body.removeEventListener(PfeJumpLinksNav.events.upgrade, this.panel._connectToNav);
  }

  _horizontalHandler(oldVal, newVal) {
    if (oldVal === newVal) return;

    // @TODO await updateComplete re:lit
    setTimeout(() => {
      this.cssVariable(`${this.tag}--Height--actual`, `${this.clientHeight}px`, document.body);
    }, 1000);
  }

  /*
   * Build out a list item with the correct attributes and markup
   * reference: https://www.w3.org/WAI/GL/wiki/Using_ARIA_trees
   */
  _buildItem(data) {
    let item = document.createElement("li");

    // Create the link to the section
    let link = document.createElement("a");
    link.href = `#${data.id}`;
    link.textContent = data.label;

    // Add the link to the list
    item.appendChild(link);

    return item;
  }

  _buildList(items, id = null) {
    if (items.length <= 0) return;

    let wrapper = document.createElement("ul");
    if (id) wrapper.setAttribute("aria-labelledby", id);

    // Loop through each item
    items.forEach(item => {
      // Pass the data object to the item builder
      let result = this._buildItem(item);

      // If there are children, set the result to the new list
      // Otherwise, the result is the new list item
      if (item.children && item.children.length > 0) {
        // Pass the children array to a nested list call
        let nested = this._buildList(item.children);
        result.appendChild(nested);
      }

      wrapper.appendChild(result);
    });

    return wrapper;
  }

  /**
   * Build out a navigation element based on data from the panel object
   * @param {Array} set An array of section details
   * @returns {Promise} When the navigation is done being built
   * @TODO Post-IE11: convert to async / await
   **/
  build(set = this.data || []) {
    // If there is no provided array and the global data pointer is empty, escape
    if (!set) return;

    let items = this.validateData(set);

    // Create the list
    let wrapper = this._buildList(items, `heading`);
    console.log(wrapper);
    if (!wrapper.outerHTML) return;

    // Turn off the observer while we update the DOM
    if (this._observer) this._observer.disconnect();

    // Add the new content to the light DOM
    this.innerHTML = wrapper.outerHTML;

    // If it has not yet been rendered, fire it now
    if (!this.rendered) this.render();

    // Copy the light DOM to the shadow DOM
    // Returns a NodeList of links in the shadow DOM navigation
    this._copyListToShadow().then(links => this._connectLightDOM(links));

    // Trigger the mutation observer
    if (this._observer) this._observer.observe(this, PfeJumpLinksNav.observerSettings);
  }

  /**
   * Validate the data array
   * @param {Array} set
   */
  validateData(set = []) {
    if (set.length === 0) return;

    let items = [];
    // Expect:
    //-- id: "sectionOne" (required)
    //-- label: "Section 1" (required)
    //-- ref: h3#sectionOne.pfe-jump-links-panel__section (optional)
    //-- isVisible: false (optional)
    //-- childOf: null (optional)
    Object.keys(set).forEach(key => {
      let data = set[key];

      if (!data.id && !data.ref) {
        this.warn(`Objects requires at least an ID or a pointer to the heading element.`);
        return;
      }

      if (!data.label) {
        this.warn(`Objects requires a label for the heading link.`);
        return;
      }

      // If the ID was provided but not a reference, capture it from the DOM
      if (data.id && !data.ref) {
        data.ref = document.querySelector(`#${data.id}`);
      }

      if (!data.ref) {
        this.warn(
          `If pointing to content inside a ShadowRoot, please provide the ref key with a pointer to that heading element.`
        );
        return;
      }

      if (data.childOf) {
        if (!this.horizontal && !this.nesting) {
          let lastItem = items[items.length - 1];
          if (lastItem)
            lastItem.children.push({
              id: data.id,
              ref: data.ref,
              isVisible: data.isVisible || false,
              label: data.label,
              children: []
            });
        } else {
          this.warn(`Horizontal jump links do not support nested sections. This item was skipped: #${data.id}`);
        }
      } else {
        items.push({
          id: data.id,
          ref: data.ref,
          isVisible: data.isVisible || false,
          label: data.label,
          children: []
        });
      }
    });

    return items;
  }

  /*
   * Validate the light DOM provided for the manually coded navigation
   */
  _isValidLightDom() {
    if (!this.hasLightDOM() || !(this.querySelector("ul") || this.querySelector("ol"))) {
      this.warn(`You must have a <ul> or <ol> tag in the light DOM or use the autobuild attribute.`);
      return false;
    }

    if ((this.logo || this.cta) && !this.horizontal) {
      this.warn(`logo and link slots are %cnot%c supported in vertical jump links`, "font-style: italic", "");
    }

    return true;
  }

  /*
   * Copy the light DOM list to the shadow DOM for control of styling
   */
  _copyListToShadow() {
    return new Promise((resolve, reject) => {
      const menu = this.querySelector("ul") || this.querySelector("ol");

      if (!menu) reject(`No menu elements (ul or ol) could be foundin the light DOM.`);

      // Upgrade the accessibility of the light DOM provided
      // including attaching appropriate classes
      this.upgradeA11y();

      if (!this.rendered) this.render();

      // Copy the menu into the shadow DOM
      this.shadowRoot.querySelector("#container").innerHTML = menu.outerHTML;

      // Return a NodeList of the links
      resolve(this.shadowRoot.querySelectorAll("#container li > a"));
    });
  }

  /*
   * Initialize the navigation element
   */
  _init() {
    // Set up backwards compatibility for slots with old tag-prefixed naming
    ["logo", "cta", "heading"].forEach(region => {
      this.getSlot(`${this.tag}--${region}`).forEach(slot => {
        slot.setAttribute("slot", region);
      });
    });

    // If this is a manually build component but it doesn't have valid light DOM, return
    // Note: The _isValidLightDOM function throws the necessary warnings, no warnings needed here
    if (!this.autobuild && !this._isValidLightDom()) return;

    // Capture the light DOM content from the panel
    // passing that to the build navigation method to render the markup
    if (this.autobuild) {
      // @TODO Set up an API for this instead
      if (this.panel) this.build(this.panel.sectionRefs);
      else return;
    }
  }

  _connectLightDOM(links) {
    // Recapture the panel references; start by emptying it
    this.panelRefs = [];

    // Attach event listeners to each link in the shadow DOM
    links.forEach(link => {
      // Add a click event listener
      link.addEventListener("click", this._clickHandler);

      // Capture the panel reference
      if (this.panel) {
        const ref = this.panel.getRefById(link.hash.replace(/^#/, ""));
        if (ref) this.panelRefs.push(ref);
      }

      // Pass information back the panels when the navigation was manually built
      // if (!this.autobuild) {
      //   console.log(this.panelRefs);
      // }
    });

    // Create a global pointer for the link elements
    this.links = links;

    // If the upgrade was successful, remove the hidden attribute
    if (links.length > 0) this.removeAttribute("hidden");
  }

  /*
   * Handle on click events
   */
  _clickHandler(evt) {
    evt.preventDefault();

    let entry;

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
    let offsetInput = getValue(`${this.tag}--offset`) || 0;
    // Capture the height of the navigation component
    let navigation = getValue(`pfe-navigation--Height--actual`) || 0;
    // Capture the height of the navigation for jump links, including the older, deprecated --pfe-jump-links--nav-height
    let jumpLinksNav = getValue(`pfe-jump-links-nav--Height--actual`) || getValue(`pfe-jump-links--nav-height`) || 0;

    // The total offset value is the user-provided offset plus the height of the navigation plus the height of the jump links navigation
    let offset = parseInt(offsetInput) + parseInt(navigation) + parseInt(jumpLinksNav) + 8 || 200;

    // Fire scroll event to the section referenced
    if (!evt || !evt.path || !evt.path[0] || !evt.path[0].hash) return;

    const id = evt.path[0].hash;
    const key = id.replace(/^#/, "");

    if (!id) return;

    if (this.panel) {
      const refs = this.panel.sectionRefs;
      const capture = Object.values(refs).filter(data => data.id === key);
      if (capture.length === 1) entry = capture[0].ref;

      // Fallback to any ID reference from the panel light or shadow DOM
      if (!entry) entry = this.panel.querySelector(id) || this.panel.shadowRoot.querySelector(id);
    }

    // Fallback to any ID reference from the document
    if (!entry) entry = document.querySelector(id);

    if (!entry) {
      this.warn(`A corresponding panel was not found for ${id}`);
      return;
    }

    // If there are no attached panels, let the default click behavior do it's thing
    /* JavaScript MediaQueryList Interface */
    let behavior = "smooth";
    if (window.matchMedia("(prefers-reduced-motion)").matches) behavior = "auto";

    // Set up the scroll animation
    if (this.panel) offset = this.panel.offsetValue;

    window.scrollTo({
      top: entry.getBoundingClientRect().top + window.pageYOffset - offset,
      behavior: behavior
    });

    // @TODO: Create JSON tokens for media query breakpoints
    // If the window is less than 992px, escape (do nothing)
    if (window.matchMedia("(min-width: 992px)").matches) return;

    // Close the accordion after 750ms
    setTimeout(this.closeAccordion, 750);
  }

  /*
   * Sets a navigation item to active when event surfaced from panel
   */
  _activeItemHandler(evt) {
    // Capture the panel that fired the event
    const panel = evt.detail.panel;
    // @TODO Use this array to highlight all visible items
    const ids = evt.detail.activeIds;

    // If it's not the right panel, get out of here!
    if (!panel || (panel && panel.scrolltarget !== this.id)) return;

    // This this is an autobuild component and the nav is complete, process the activation
    if (!this.autobuild || (this.autobuild && this._building)) {
      // If the array is empty, clear active state
      if (!ids || ids.length === 0) {
        this.removeAllActive();
        return;
      }

      // Capture the first item in the set
      const firstId = ids[0];

      if (!firstId) return;

      // Get the link by ID
      const link = this.getLinkById(firstId);
      const ref = panel.getRefById(firstId);

      if (!link) return;

      // If this is already an active link, do nothing
      if (this.activeLinks.length > 0) {
        if (this.activeLinks.filter(active => active === link).length > 0) return;

        // If there are active links in the pointer, clear the array
        this.removeAllActive();
      }

      // Set the activeLinks array to the new link element
      this.activeLinks.push(link);

      // const checkForAncestors = (ref) => {
      //   if (!ref.childOf) return;

      //   // Get the link for the parent element
      //   const parentLink = this.getLinkById(ref.childOf);
      //   this.activeLinks.unshift(parentLink);

      //   // Get the reference to the parent
      //   const parentRef = panel.getRefById(ref.childOf);
      //   checkForAncestors(parentRef);
      // };

      // // Kick off the parent check
      // if (ref) checkForAncestors(ref);

      // Activate the link
      this.activeLinks.map(link => this.setActive(link));
    } else setTimeout(this._activeItemHandler(evt), 100);
  }
}

export default PfeJumpLinksNav;
