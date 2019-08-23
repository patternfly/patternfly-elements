import PFElement from "../pfelement/pfelement.js";
import PfeCollapse from "../pfe-collapse/pfe-collapse.js";

class PfeFooter extends PFElement {
  static get tag() {
    return "pfe-footer";
  }

  get templateUrl() {
    return "pfe-footer.html";
  }

  get styleUrl() {
    return "pfe-footer.scss";
  }

  get sectionExpanded() {
    return this.hasAttribute("aria-expanded");
  }

  get hasFooterLinks() {
    return this.querySelector("[pfe-footer-links]") !== null;
  }

  set sectionExpanded(val) {
    const value = Boolean(val);

    if (val) {
      this.setAttribute("pfe-expanded", true);
      this.querySelector('button').setAttribute("aria-expanded", true);
    } else {
      this.removeAttribute("pfe-expanded");
      this.querySelector('button').setAttribute("aria-expanded", false);
    }
  }

  static get observedAttributes() {
    return ["aria-expanded"];
  }

  constructor() {
    super(PfeFooter, { delayRender: true });
  }

  connectedCallback() {
    super.connectedCallback();

    let footerLinkSections = [...this.querySelectorAll('[pfe-footer-links] section')];
    footerLinkSections.forEach(section => this._makeFooterLinkSections(section));
    this._sections = footerLinkSections;

    // Render shadowDOM
    this.render();

    // this._makeFooterLinkSectionsCollapsible(this.shadowRoot.querySelector('.pfe-footer-links'));

    this._moveSlotToShadowDom('pfe-footer-info', '.pfe-footer-info');

  }

  _moveSlotToShadowDom(slotName, toSelector) {
    let slotted = [
      ...this.querySelectorAll(`[slot='${slotName}']`) // floperator
    ];
    let shadowParent = this.shadowRoot.querySelector(toSelector);
    slotted.forEach(slot => shadowParent.appendChild(slot));

    // let windowWidth = window.innerWidth;
  }

  _makeFooterLinkSections(section) {
    section.buttonText = section.querySelector("h2").innerHTML;
    section.list = section.querySelector("ul").outerHTML;
    // Add ARIA-labelledby from the ul and h2
  }

  // _makeFooterLinkSectionsCollapsible(footerLinks) {
  //   let sections = [
  //     ...footerLinks.querySelectorAll("section")
  //   ];
  //     console.log(sections);
  //   // sections.forEach(section => {
  //   //   console.log(section);
  //   //   section.setAttribute("pfe-expanded", true);
  //   //   section.querySelector("button").setAttribute("aria-expanded", true);
  //   // });
  // }

  _clickHandler(event) {
    this.dispatchEvent(
      new CustomEvent(`${RhFooter.tag}:change`, {
        detail: { expanded: !this.expanded },
        bubbles: true
      })
    );
  }

  // disconnectedCallback() {}

  // attributeChangedCallback(attr, oldValue, newValue) {}
}

PFElement.create(PfeFooter);

export default PfeFooter;
