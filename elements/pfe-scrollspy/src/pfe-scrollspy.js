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
      el = el.offsetTop;
      let options = {
        top: el,
        left: 0,
        behavior: 'smooth'
      }
      window.scrollTo(options);
    })
  }

  disconnectedCallback() {
    this.removeEventListener("click")
  }

  // attributeChangedCallback(attr, oldValue, newValue) {}
  handleClick(e) {
    e.preventDefault();
    console.log(e.target);
    // (function(e) {
    //   let options = {
    //     top: 100,
    //     left: 100,
    //     behavior: 'smooth'
    //   }
    //   window.scrollTo(options);
    // })();
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

    // functions to add and remove the active class from links as appropriate
    // const makeActive = (link) => menu_links[link].classList.add("pfe-active");
    const makeActive = (link) => menu_links[link].setAttribute("active", "");
    // const removeActive = (link) => menu_links[link].classList.remove("pfe-active");
    const removeActive = (link) => menu_links[link].removeAttribute("active");
    const removeAllActive = () => [...Array(sections.length).keys()].forEach((link) => removeActive(link));

    // change the active link a bit above the actual section
    // this way it will change as you're approaching the section rather
    // than waiting until the section has passed the top of the screen
    const sectionMargin = 200;

    // keep track of the currently active link
    // use this so as not to change the active link over and over
    // as the user scrolls but rather only change when it becomes
    // necessary because the user is in a new section of the page
    let currentActive = 0;
    window.addEventListener("scroll", function () {
      // console.log(sections);
      // console.log(menu_links);
      const current = sections.length - [...sections].reverse().findIndex((section) => window.scrollY >= section.offsetTop - sectionMargin) - 1;
      console.log(current);

      if (current !== currentActive) {
        removeAllActive();
        currentActive = current;
        makeActive(current);
      }
    });
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