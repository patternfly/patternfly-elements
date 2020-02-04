import PFElement from "../../pfelement/dist/pfelement.js";

// Object.assign needs a polyfill as its not supported in IE11
if (typeof Object.assign !== 'function') {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, "assign", {
    value: function assign(target, varArgs) { // .length of function is 2
      'use strict';
      if (target === null || target === undefined) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource !== null && nextSource !== undefined) {
          for (var nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true
  });
}

class PfeDropdownItem extends PFElement {
  static get tag() {
    return "pfe-dropdown-item";
  }

  get templateUrl() {
    return "pfe-dropdown-item.html";
  }

  get styleUrl() {
    return "pfe-dropdown-item.scss";
  }

  constructor() {
    super(PfeDropdownItem);
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

export default PfeDropdownItem;
