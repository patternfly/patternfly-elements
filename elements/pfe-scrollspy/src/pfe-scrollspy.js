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
    return "pfe-scrollspy.scss";
  }

  // static get observedAttributes() {
  //   return [];
  // }

  constructor(pfeClass) {
    super(pfeClass || PfeScrollspyNav);

  }

  connectedCallback() {
    console.log("Called connected callback")
    super.connectedCallback();
  }

  // disconnectedCallback() {}

  // attributeChangedCallback(attr, oldValue, newValue) {}

  scrollToNavTarget(top=0, left=0, smooth=true) {
    let options = {
      top: 100,
      left: 100,
      behavior: 'smooth'
    }
    window.scrollTo(options);
  }
}

class PfeScrollspyPanel extends PFElement {
  static get tag() {
    return "pfe-scrollspy-panel";
  }

  get templateUrl() {
    return "pfe-scrollspy-panel.html";
  }

  get styleUrl() {
    return "pfe-scrollspy.scss";
  }

  // static get observedAttributes() {
  //   return [];
  // }

  constructor(pfeClass) {
    super(pfeClass || PfeScrollspyPanel);

  }

  connectedCallback() {
    super.connectedCallback();
  }

  // disconnectedCallback() {}

  // attributeChangedCallback(attr, oldValue, newValue) {}
}


PFElement.create(PfeScrollspy);
PFElement.create(PfeScrollspyNav);
PFElement.create(PfeScrollspyPanel);

export { PfeScrollspy, PfeScrollspyNav, PfeScrollspyPanel };



















// const [scrollSpy, setScrollSpy] = useState({ visible: false });
// const [sections, setSections] = useState()
// let sectionsList = [];
// useEffect(() => {
//   setSections(document.querySelectorAll(".section"));
// }, [])

// if (sections) {
//   sections.forEach((section) =>
//     sectionsList.push(section)
//   )
// }

// function scrollToSection(e) {
//   let scrollOptions = {
//     left: 0,
//     //@ts-ignore
//     top: document.getElementById(e).offsetTop + 500,
//     behavior: 'smooth'
//   }
//   //@ts-ignore
//   window.scrollTo(scrollOptions);
// }

// function setSidebarNavClass(id) {
//   let link = document.querySelector(`a[data-target="${id}"]`);
//   //@ts-ignore
//   link.classList.add("pf-m-current");
// }

// function removeSidebarNavClass(id) {
//   let link = document.querySelector(`a[data-target="${id}"]`);
//   //@ts-ignore
//   link.classList.remove("pf-m-current");
// }

// function handler(entries, observer) {
//   entries.forEach((entry) => {
//     if (entry.isIntersecting) {
//       setSidebarNavClass(entry.target.id);
//     } else {
//       removeSidebarNavClass(entry.target.id);
//     }
//   })
// }

// let observerOptions = {
//   root: null,
//   rootMargin: '-200px',
//   threshold: 0
// }
// let observer = new IntersectionObserver(handler, observerOptions);
// let elements = document.querySelectorAll(".section");

// elements.forEach((element) => observer.observe(element));