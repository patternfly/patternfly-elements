(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../pfelement/pfelement.umd')) :
  typeof define === 'function' && define.amd ? define(['../pfelement/pfelement.umd'], factory) :
  (global.PfeCard = factory(global.PFElement));
}(this, (function (PFElement) { 'use strict';

  PFElement = PFElement && PFElement.hasOwnProperty('default') ? PFElement['default'] : PFElement;

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  };

  var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  var toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  };

  /*
   * Copyright 2019 Red Hat, Inc.
   * 
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   * 
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   * 
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   * 
  */

  // -- Polyfill for supporting Element.closest
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
  }

  if (!Element.prototype.closest) {
    Element.prototype.closest = function (s) {
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
      value: function value(valueToFind, fromIndex) {
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
          return x === y || typeof x === "number" && typeof y === "number" && isNaN(x) && isNaN(y);
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

  var PfeCard = function (_PFElement) {
    inherits(PfeCard, _PFElement);
    createClass(PfeCard, [{
      key: 'html',
      get: function get$$1() {
        return '<style>:host {\n  --pfe-card--padding:                          calc(var(--pfe-theme--container-spacer, 1rem) * 2);\n  --pfe-card_header--size:                      var(--pfe-theme--font-size--heading--gamma, 21px);\n  --pfe-card--bg:                               var(--pfe-theme--color--surface--base, #dfdfdf);\n  --pfe-broadcasted--color--text:               var(--pfe-theme--color--surface--base--text, #333);\n  --pfe-broadcasted--color--ui-link:            var(--pfe-theme--color--surface--base--link, #00538c);\n  --pfe-broadcasted--color--ui-link--visited:   var(--pfe-theme--color--surface--base--link--visited, #7551a6);\n  --pfe-broadcasted--color--ui-link--hover:     var(--pfe-theme--color--surface--base--link--hover, #00305b);\n  --pfe-broadcasted--color--ui-link--focus:     var(--pfe-theme--color--surface--base--link--focus, #00305b);\n  display: flex;\n  flex-direction: column;\n  justify-items: flex-start;\n  padding: var(--pfe-card--padding);\n  border: var(--pfe-theme--surface--border-width, 1px) var(--pfe-theme--surface--border-style, solid) transparent;\n  border-radius: var(--pfe-theme--surface--border-radius, 0);\n  background: var(--pfe-card--bg);\n  color: var(--pfe-broadcasted--color--text); }\n\na {\n  color: var(--pfe-broadcasted--color--ui-link); }\n\na:visited {\n  color: var(--pfe-broadcasted--color--ui-link--visited); }\n\na:hover {\n  color: var(--pfe-broadcasted--color--ui-link--hover); }\n\na:focus {\n  color: var(--pfe-broadcasted--color--ui-link--focus); }\n\n:host([color="dark"]) {\n  --pfe-card--bg:                               var(--pfe-theme--color--surface--darker, #464646);\n  --pfe-broadcasted--color--text:               var(--pfe-theme--color--surface--darker--text, #fff);\n  --pfe-broadcasted--color--ui-link:            var(--pfe-theme--color--surface--darker--link, #99ccff);\n  --pfe-broadcasted--color--ui-link--visited:   var(--pfe-theme--color--surface--darker--link--visited, #b38cd9);\n  --pfe-broadcasted--color--ui-link--hover:     var(--pfe-theme--color--surface--darker--link--hover, #cce6ff);\n  --pfe-broadcasted--color--ui-link--focus:     var(--pfe-theme--color--surface--darker--link--focus, #cce6ff); }\n\n:host([color="darkest"]) {\n  --pfe-card--bg:                               var(--pfe-theme--color--surface--darkest, #131313);\n  --pfe-broadcasted--color--text:               var(--pfe-theme--color--surface--darkest--text, #fff);\n  --pfe-broadcasted--color--ui-link:            var(--pfe-theme--color--surface--darkest--link, #99ccff);\n  --pfe-broadcasted--color--ui-link--visited:   var(--pfe-theme--color--surface--darkest--link--visited, #b38cd9);\n  --pfe-broadcasted--color--ui-link--hover:     var(--pfe-theme--color--surface--darkest--link--hover, #cce6ff);\n  --pfe-broadcasted--color--ui-link--focus:     var(--pfe-theme--color--surface--darkest--link--focus, #cce6ff); }\n\n:host([color="light"]) {\n  --pfe-card--bg:                               var(--pfe-theme--color--surface--lighter, #ececec);\n  --pfe-broadcasted--color--text:               var(--pfe-theme--color--surface--lighter--text, #333);\n  --pfe-broadcasted--color--ui-link:            var(--pfe-theme--color--surface--lighter--link, #06c);\n  --pfe-broadcasted--color--ui-link--visited:   var(--pfe-theme--color--surface--lighter--link--visited, rebeccapurple);\n  --pfe-broadcasted--color--ui-link--hover:     var(--pfe-theme--color--surface--lighter--link--hover, #003366);\n  --pfe-broadcasted--color--ui-link--focus:     var(--pfe-theme--color--surface--lighter--link--focus, #003366); }\n\n:host([color="lightest"]) {\n  --pfe-card--bg:                               var(--pfe-theme--color--surface--lightest, #fff);\n  --pfe-broadcasted--color--text:               var(--pfe-theme--color--surface--lightest--text, #333);\n  --pfe-broadcasted--color--ui-link:            var(--pfe-theme--color--surface--lightest--link, #06c);\n  --pfe-broadcasted--color--ui-link--visited:   var(--pfe-theme--color--surface--lightest--link--visited, rebeccapurple);\n  --pfe-broadcasted--color--ui-link--hover:     var(--pfe-theme--color--surface--lightest--link--hover, #003366);\n  --pfe-broadcasted--color--ui-link--focus:     var(--pfe-theme--color--surface--lightest--link--focus, #003366); }\n\n:host([color="complement"]) {\n  --pfe-card--bg:                               var(--pfe-theme--color--surface--complement, #0477a4);\n  --pfe-broadcasted--color--text:               var(--pfe-theme--color--surface--complement--text, #fff);\n  --pfe-broadcasted--color--ui-link:            var(--pfe-theme--color--surface--complement--link, #99ccff);\n  --pfe-broadcasted--color--ui-link--visited:   var(--pfe-theme--color--surface--complement--link--visited, #b38cd9);\n  --pfe-broadcasted--color--ui-link--hover:     var(--pfe-theme--color--surface--complement--link--hover, #cce6ff);\n  --pfe-broadcasted--color--ui-link--focus:     var(--pfe-theme--color--surface--complement--link--focus, #cce6ff); }\n\n:host([color="accent"]) {\n  --pfe-card--bg:                               var(--pfe-theme--color--surface--accent, #fe460d);\n  --pfe-broadcasted--color--text:               var(--pfe-theme--color--surface--accent--text, #fff);\n  --pfe-broadcasted--color--ui-link:            var(--pfe-theme--color--surface--accent--link, #99ccff);\n  --pfe-broadcasted--color--ui-link--visited:   var(--pfe-theme--color--surface--accent--link--visited, #b38cd9);\n  --pfe-broadcasted--color--ui-link--hover:     var(--pfe-theme--color--surface--accent--link--hover, #cce6ff);\n  --pfe-broadcasted--color--ui-link--focus:     var(--pfe-theme--color--surface--accent--link--focus, #cce6ff); }\n\n:host([size="small"]) {\n  --pfe-card--padding:        var(--pfe-theme--container-spacer, 1rem); }\n\n.pfe-card__header,\n.pfe-card__body,\n.pfe-card__footer {\n  display: block;\n  margin: 0; }\n\n.pfe-card__header::slotted(h1:first-child),\n.pfe-card__header::slotted(h2:first-child),\n.pfe-card__header::slotted(h3:first-child),\n.pfe-card__header::slotted(h4:first-child),\n.pfe-card__header::slotted(h5:first-child),\n.pfe-card__header::slotted(h6:first-child) {\n  margin-top: 0 !important;\n  font-size: var(--pfe-card_header--size); }\n\n.pfe-card__body::slotted(*:nth-child(2)) {\n  margin-top: 0 !important; }\n\n.pfe-card__footer {\n  margin-top: auto;\n  justify-self: flex-end; }</style>\n<slot class="pfe-card__header" name="header"></slot>\n<slot class="pfe-card__body"></slot>\n<slot class="pfe-card__footer" name="footer"></slot>';
      }
    }, {
      key: 'styleUrl',
      get: function get$$1() {
        return "pfe-card.scss";
      }
    }, {
      key: 'templateUrl',
      get: function get$$1() {
        return "pfe-card.html";
      }
    }, {
      key: 'backgroundColor',
      get: function get$$1() {
        return this.getAttribute("color") || "base";
      }
    }], [{
      key: 'tag',
      get: function get$$1() {
        return "pfe-card";
      }
    }, {
      key: 'observedAttributes',
      get: function get$$1() {
        return ["color"];
      }

      // Declare the type of this component

    }, {
      key: 'PfeType',
      get: function get$$1() {
        return PFElement.PfeTypes.Container;
      }
    }]);

    function PfeCard() {
      classCallCheck(this, PfeCard);
      return possibleConstructorReturn(this, (PfeCard.__proto__ || Object.getPrototypeOf(PfeCard)).call(this, PfeCard, { type: PfeCard.PfeType }));
    }

    createClass(PfeCard, [{
      key: 'connectedCallback',
      value: function connectedCallback() {
        get(PfeCard.prototype.__proto__ || Object.getPrototypeOf(PfeCard.prototype), 'connectedCallback', this).call(this);
        // Initialize the context setting for the children elements
        if (this.backgroundColor) {
          this._updateContext(this.backgroundColor);
        }
      }
    }, {
      key: 'attributeChangedCallback',
      value: function attributeChangedCallback(attr, oldValue, newValue) {
        get(PfeCard.prototype.__proto__ || Object.getPrototypeOf(PfeCard.prototype), 'attributeChangedCallback', this).call(this, attr, oldValue, newValue);
        if (attr === "color") {
          this._colorChanged(attr, oldValue, newValue);
        }
      }

      // Update the color attribute and contexts

    }, {
      key: '_colorChanged',
      value: function _colorChanged(attr, oldValue, newValue) {
        // If the new value has a dark background, update children elements
        this._updateContext(newValue);
      }

      // Set the children's context if parent background is dark

    }, {
      key: '_updateContext',
      value: function _updateContext(context) {
        var _this2 = this;

        if (["darkest", "dark", "complement", "accent"].includes(context)) {
          ["pfe-cta"].forEach(function (elementName) {
            var els = [].concat(toConsumableArray(_this2.querySelectorAll('' + elementName)));
            els.forEach(function (el) {
              var myContainer = el.closest("[pfe-type=container]");
              if (myContainer === _this2 || myContainer === null) {
                el.setAttribute("on", "dark");
              }
            });
          });
        }
      }
    }]);
    return PfeCard;
  }(PFElement);

  PFElement.create(PfeCard);

  return PfeCard;

})));
//# sourceMappingURL=pfe-card.umd.js.map
