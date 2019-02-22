import PFElement from "../pfelement/pfelement.js";

class PfeNavigationItem extends PFElement {
  static get tag() {
    return "pfe-navigation-item";
  }

  get schemaUrl() {
    return "pfe-navigation-item.json";
  }

  get templateUrl() {
    return "pfe-navigation-item.html";
  }

  get styleUrl() {
    return "pfe-navigation-item.scss";
  }

  // static get observedAttributes() {
  //   return [];
  // }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }

  constructor() {
    super(PfeNavigationItem, { type: PfeNavigationItem.PfeType });
  }

  connectedCallback() {
    super.connectedCallback();
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(attr, oldValue, newValue);
    // Strip the prefix from the attribute
    attr = attr.replace("pfe-", "");
    // If the observer is defined in the attribute properties
    if (this[attr] && this[attr].observer) {
      // Get the observer function
      let observer = this[this[attr].observer].bind(this);
      // If it's a function, allow it to run
      if (typeof observer === "function") observer(attr, oldValue, newValue);
    }
  }

  // Update the icon attribute and return the SVG
  _updateIcon(attr, oldValue, newValue){
    switch (newValue) {
      case "Search":
        // Get the search SVG
      case "Globe":
        // Get the globe SVG
      case "Person":
        // Get the person SVG
      case "App":
        // Get the person SVG
      default:
        // @TODO is there a default icon?
    }
  }

  _moveElements() {
    //   <section pfe-nav-item--tray-region="main" class="pile-o-links  pfe-l-grid …">
    //   <pfe-link-list role="region">
    //     <h2><a href="#">Flagship Products</a></h2>
    //     <ul>
    //       <li><a href="#">Awesome</a></li>
    //       <li><a href="#">So good</a></li>
    //     </ul>
    //   </pfe-link-list>
    //   <pfe-link-list role="region">
    //     <h2><a href="#">Collaborations</a></h2>
    //     <ul>
    //       <li><a href="#">Collab #1</a></li>
    //       <li><a href="#">Collab #2</a></li>
    //     </ul>
    //   </pfe-link-list>
    // </section>
    // <aside pfe-nav-item--tray-region="aside">Promo with captions, fancy other stuff</aside>
    // <footer pfe-nav-item--tray-region="footer" class>
    //   <pfe-cta>link</pfe-cta>
    // </footer>
  }

  // disconnectedCallback() {}

  // attributeChangedCallback(attr, oldValue, newValue) {}
}

PFElement.create(PfeNavigationItem);

export default PfeNavigationItem;
