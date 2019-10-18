import PFElement from "../pfelement/pfelement.js";

class PfeScrollspy extends PFElement {
  static get tag() {
    return "pfe-scrollspy";
  }

  get templateUrl() {
    return "pfe-scrollspy.html";
  }

  get styleUrl() {
    return "pfe-scrollspy.scss";
  }

  // static get observedAttributes() {
  //   return [];
  // }

  constructor(pfeClass) {
    super(pfeClass || PfeScrollspy);
    
  }

  connectedCallback() {
    console.log("Called connected callback")
    super.connectedCallback();
  }

  
  // disconnectedCallback() {}

  // attributeChangedCallback(attr, oldValue, newValue) {}
}

class PfeScrollspyNav extends PFElement {
  static get tag() {
    return "pfe-scrollspy-nav";
  }

  get templateUrl() {
    return "pfe-scrollspy-nav.html";
  }

  get styleUrl() {
    return "pfe-scrollspy-nav.scss";
  }

  // static get observedAttributes() {
  //   return [];
  // }

  constructor(pfeClass) {
    super(pfeClass || PfeScrollspyNav);

  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("click", function(e) {
      e.preventDefault();
      let el = document.getElementById(e.target.dataset.target);
      if(el) {
        el = el.offsetTop;
        let options = {
          top: el,
          left: 0,
          behavior: 'smooth'
        }
        window.scrollTo(options);
      }
    })
  }

  disconnectedCallback() {
    this.removeEventListener("click")
  }

  // attributeChangedCallback(attr, oldValue, newValue) {}
}

class PfeScrollspyPanel extends PFElement {
  static get tag() {
    return "pfe-scrollspy-panel";
  }

  get templateUrl() {
    return "pfe-scrollspy-panel.html";
  }

  get styleUrl() {
    return "pfe-scrollspy-panel.scss";
  }

  // static get observedAttributes() {
  //   return [];
  // }

  constructor(pfeClass) {
    super(pfeClass || PfeScrollspyPanel);
  }

  connectedCallback() {
    super.connectedCallback();

    const sections = document.querySelectorAll(".pfe-scrollspy-panel__section");
    const menu_links = document.querySelectorAll(".pfe-scrollspy-nav__item");
    const makeActive = (link) => {
      if(menu_links[link]) {
        menu_links[link].setAttribute("active", "");
      }
    }
    const removeActive = (link) => {
      if (menu_links[link]){
        menu_links[link].removeAttribute("active");
      }
    }
    const removeAllActive = () => [...Array(sections.length).keys()].forEach((link) => removeActive(link));

    const sectionMargin = 200;

    let currentActive = 0;
    window.addEventListener("scroll", function () {
      const current = sections.length - [...sections].reverse().findIndex((section) => window.scrollY >= section.offsetTop - sectionMargin) - 1;

      if (current !== currentActive) {
        removeAllActive();
        currentActive = current;
        makeActive(current);
      }
    });
  }

  disconnectedCallback() {
    window.removeEventListener("scroll");
  }

  // attributeChangedCallback(attr, oldValue, newValue) {}
}


PFElement.create(PfeScrollspy);
PFElement.create(PfeScrollspyNav);
PFElement.create(PfeScrollspyPanel);

export { PfeScrollspy, PfeScrollspyNav, PfeScrollspyPanel };