// Import polyfills: NodeList.prototype.forEach
import "./polyfills--pfe-jump-links-nav.js";

import PFElement from "../../pfelement/dist/pfelement.js";
import PfeJumpLinksPanel from "./pfe-jump-links-panel.js";

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
        type: Boolean
      },
      srText: {
        title: "Screen reader text",
        type: String,
        default: "Jump to section"
      },
      color: {
        title: "Color",
        type: String,
        values: ["darkest"]
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

  get header() {
    if (!this.horizontal) return this.shadowRoot.querySelector("pfe-accordion-header");

    return this.getSlot("pfe-jump-links-nav--heading");
  }

  get panel() {
    // Use the ID from the navigation to target the panel elements
    // Automatically if there's only one set of tags on the page
    if (this.id) {
      this.removeAttribute("hidden");
      return document.querySelector(`[scrolltarget=${this.id}]`);
    } else {
      const panels = document.querySelectorAll(PfeJumpLinksPanel.tag);
      if (panels.length === 1) {
        this.removeAttribute("hidden");
        panels[0].id = this.randomId;
        return panels[0];
      } else if (panels.length > 1) {
        this.warn(
          `Cannot locate a panel that is connected to this navigation element.${
            this.id ? ` Please add scrolltarget="${this.id}" to the appropriate panel.` : ""
          }`
        );
      } else {
        this.warn(
          `Cannot locate any panels on this page. Please add a ${PfeJumpLinksPanel.tag} element around the content you want to target.`
        );
      }
    }

    // Hide the navigation if no content can be found
    this.setAttribute("hidden", "");
    return;
  }

  get links() {
    return this._menuContainer.querySelectorAll("a");
  }

  constructor() {
    super(PfeJumpLinksNav, {
      type: PfeJumpLinksNav.PfeType
    });

    this._buildNav = this._buildNav.bind(this);
    this._buildItem = this._buildItem.bind(this);
    this._init = this._init.bind(this);
    this._reportHeight = this._reportHeight.bind(this);
    this.closeAccordion = this.closeAccordion.bind(this);
    this._closeAccordion = this._closeAccordion.bind(this);

    this._observer = new MutationObserver(this._init);
  }

  connectedCallback() {
    super.connectedCallback();

    // Templated elements in the shadow DOM
    this._menuContainer = this.shadowRoot.querySelector("#container");
    this._navTag = this.shadowRoot.querySelector("nav");

    this._init();

    // Trigger the mutation observer
    this._observer.observe(this, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this._observer.disconnect();
    if (this.panel) this.panel.removeEventListener(PfeJumpLinksPanel.events.change, this._init);

    [...this.links].forEach(link => {
      link.removeEventListener("click", this.closeAccordion);
    });
  }

  closeAccordion() {
    // @TODO
    // Create JSON tokens for media query breakpoints
    if (window.matchMedia("(min-width: 992px)").matches) {
      return;
    }
    setTimeout(this._closeAccordion, 750);
  }

  _closeAccordion() {
    this.shadowRoot.querySelector("pfe-accordion").collapseAll();
  }

  rebuild() {
    this._buildNav();
  }

  _buildItem(data, isSubSection = false) {
    let item = document.createElement("li");
    item.className = "pfe-jump-links-nav__item";

    let link = document.createElement("a");
    link.className = "pfe-jump-links-nav__link";
    link.href = `#${data.target}`;
    link.setAttribute("data-target", data.target);
    link.innerHTML = data.content;

    if (data.subsection) link.classList.add("has-sub-section");
    if (isSubSection) link.classList.add("sub-section");

    item.appendChild(link);
    return item;
  }

  _buildNav() {
    Promise.all([customElements.whenDefined(PfeJumpLinksPanel.tag)]).then(() => {
      let list = [];
      if (this.panel) {
        let item = {};
        let has_subsection = false;
        // Build an object with all the information we need to dynamically build the navigation
        this.panel.sections.forEach((sectionHeading, idx) => {
          let is_subsection = sectionHeading.classList.contains("sub-section");

          // Empty out the item object if this isn't a nested section
          if (!has_subsection && !is_subsection) {
            if (Object.keys(item).length > 0) list.push(item);
            item = {};
          }

          // Get ID for the navigation
          let id = sectionHeading.id;
          if (!id && sectionHeading.previousElementSibling && sectionHeading.previousElementSibling.id)
            id = sectionHeading.previousElementSibling.id;

          if (is_subsection) {
            if (item.subsection) {
              item.subsection.push({
                target: id,
                content: sectionHeading.innerHTML
              });
            } else {
              item.subsection = [
                {
                  target: id,
                  content: sectionHeading.innerHTML
                }
              ];
            }
          } else {
            item = {
              target: id,
              content: sectionHeading.innerHTML
            };
          }

          has_subsection = sectionHeading.classList.contains("has-sub-section");

          // If this is the last item in the set, push it to the object now
          if (idx === this.panel.sections.length - 1) list.push(item);
        });
      }

      let wrapper = document.createElement("ul");
      wrapper.className = "pfe-jump-links-nav";

      list.forEach(item => {
        let child = this._buildItem(item);

        if (item.subsection) {
          let nested = document.createElement("ul");
          nested.className = "sub-nav";
          item.subsection.forEach(subsection => {
            nested.appendChild(this._buildItem(subsection, true));
          });

          child.appendChild(nested);
        }

        wrapper.appendChild(child);
      });

      this._menuContainer.innerHTML = wrapper.outerHTML;
    });
  }

  _isValidLightDom() {
    if (!this.hasLightDOM()) {
      this.warn(`You must have a <ul> tag in the light DOM`);
      return false;
    }
    if ((this.hasSlot("pfe-jump-links-nav--logo") || this.hasSlot("pfe-jump-links-nav--link")) && !this.horizontal) {
      this.warn(`logo and link slots NOT supported in vertical jump links`);
    }
    if (this.children[1].tagName !== "UL") {
      if (!this.horizontal) {
        this.warn(`The top-level list of links MUST be a <ul>`);
      }

      return false;
    }
    if (Number.isInteger(Number(this.customVar))) {
      this.warn(
        "Using an integer with a unit is not supported for custom property --pfe-jump-links-panel--offset. The component strips the unit using parseInt(). For example so 1rem would become 1 and behave as if you had entered 1px. Values with a pixel unit will behave correctly."
      );
    }

    return true;
  }

  _reportHeight() {
    const cssVarName = `--${this.tag}--Height--actual`;
    const styles = window.getComputedStyle(this);

    let height = styles.getPropertyValue("height");
    if (window.matchMedia("(min-width: 992px)").matches) {
      height = "0px";
    }

    if (this.panel) this.panel.style.setProperty(cssVarName, height);
  }

  _init() {
    if (window.ShadyCSS) this._observer.disconnect();

    //Check that the light DOM is there
    if (!this.autobuild && this._isValidLightDom()) {
      const menu = this.querySelector("ul");

      // If the class is not already on the list wrapper
      if (!menu.classList.contains("pfe-jump-links-nav")) {
        menu.classList.add("pfe-jump-links-nav");
      }

      // Move the menu into the shadow DOM
      this._menuContainer.innerHTML = menu.outerHTML;

      // Build the label for screen readers
      let label = document.createElement("h2");
      label.className = "sr-only";
      label.setAttribute("hidden", "");
      label.innerText = this.srText;

      this._navTag.prepend(label);
    } else {
      this._buildNav();
    }

    this._reportHeight();

    // @TODO: Is this doing anything?
    // Set up a resize listener
    window.addEventListener("resize", () => {});

    // Attach the event listeners
    [...this.links].forEach(link => {
      link.addEventListener("click", this.closeAccordion);
    });

    if (this.panel && this.autobuild) this.panel.addEventListener(PfeJumpLinksPanel.events.change, this._init);

    // Trigger the mutation observer
    if (window.ShadyCSS) {
      this._observer.observe(this, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true
      });
    }
  }
}

export default PfeJumpLinksNav;
