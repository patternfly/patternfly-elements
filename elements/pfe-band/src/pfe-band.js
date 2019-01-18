import PFElement from "../pfelement/pfelement.js";

// -- Polyfill for supporting Element.closest
// https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
if (!Element.prototype.matches) {
  Element.prototype.matches =
    Element.prototype.msMatchesSelector ||
    Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
  Element.prototype.closest = function(s) {
    var el = this;
    do {
      if (el.matches(s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };
}

// -- Polyfill for supporting Array.includes
// https://tc39.github.io/ecma262/#sec-array.prototype.includes
if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, "includes", {
    value: function(valueToFind, fromIndex) {
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      // 1. Let O be ? ToObject(this value).
      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If len is 0, return false.
      if (len === 0) {
        return false;
      }

      // 4. Let n be ? ToInteger(fromIndex).
      //    (If fromIndex is undefined, this step produces the value 0.)
      var n = fromIndex | 0;

      // 5. If n ≥ 0, then
      //  a. Let k be n.
      // 6. Else n < 0,
      //  a. Let k be len + n.
      //  b. If k < 0, let k be 0.
      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

      function sameValueZero(x, y) {
        return (
          x === y ||
          (typeof x === "number" &&
            typeof y === "number" &&
            isNaN(x) &&
            isNaN(y))
        );
      }

      // 7. Repeat, while k < len
      while (k < len) {
        // a. Let elementK be the result of ? Get(O, ! ToString(k)).
        // b. If SameValueZero(valueToFind, elementK) is true, return true.
        if (sameValueZero(o[k], valueToFind)) {
          return true;
        }
        // c. Increase k by 1.
        k++;
      }

      // 8. Return false
      return false;
    }
  });
}

class PfeBand extends PFElement {
  static get tag() {
    return "pfe-band";
  }

  get schemaUrl() {
    return "pfe-band.json";
  }

  get templateUrl() {
    return "pfe-band.html";
  }

  get styleUrl() {
    return "pfe-band.scss";
  }

  get imageSrc() {
    return this.getAttribute("pfe-img-src");
  }

  get backgroundColor() {
    return this.getAttribute("pfe-color");
  }

  get asidePosition() {
    return {
      desktop: this.getAttribute("pfe-aside-desktop"),
      mobile: this.getAttribute("pfe-aside-mobile"),
      height: this.getAttribute("pfe-aside-height")
    };
  }

  static get observedAttributes() {
    return [
      "pfe-aside-desktop",
      "pfe-aside-mobile",
      "pfe-aside-height",
      "pfe-color",
      "pfe-img-src"
    ];
  }

  static get cascadingAttributes() {
    return {
      "pfe-aside-desktop": ".pfe-band__container",
      "pfe-aside-mobile": ".pfe-band__container",
      "pfe-aside-height": ".pfe-band__container"
    };
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }

  constructor() {
    super(PfeBand, { type: PfeBand.PfeType });
  }

  connectedCallback() {
    super.connectedCallback();
    // Initialize the background image attachment
    if (this.imageSrc) {
      this._imgSrcChanged("pfe-img-src", "", this.imageSrc);
    }
    // Initialize the context setting for the children elements
    if (this.backgroundColor) {
      this._updateContext(this.backgroundColor);
    }
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(attr, oldValue, newValue);
    // Strip the prefix form the attribute
    attr = attr.replace("pfe-", "");
    // If the observer is defined in the attribute properties
    if (this[attr] && this[attr].observer) {
      // Get the observer function
      let observer = this[this[attr].observer].bind(this);
      // If it's a function, allow it to run
      if (typeof observer === "function") observer(attr, oldValue, newValue);
    }
  }

  _basicAttributeChanged(attr, oldValue, newValue) {
    this[attr].value = newValue;
  }

  // Update the color attribute and contexts
  _colorChanged(attr, oldValue, newValue) {
    this[attr].value = newValue;
    // If the new value has a dark background, update children elements
    this._updateContext(newValue);
  }

  // Update the background image
  _imgSrcChanged(attr, oldValue, newValue) {
    // Set the image as the background image
    this.style.backgroundImage = newValue ? `url('${newValue}')` : ``;
  }

  // Set the children's context if parent background is dark
  _updateContext(context) {
    if (["darkest", "darker", "complement", "accent"].includes(context)) {
      ["pfe-cta"].forEach(elementName => {
        const els = [...this.querySelectorAll(`${elementName}`)];
        els.forEach(el => {
          const myContainer = el.closest("[pfe-type=container]");
          if (myContainer === this || myContainer === null) {
            el.setAttribute("on", "dark");
          }
        });
      });
    }
  }
}

PFElement.create(PfeBand);

export { PfeBand as default };
