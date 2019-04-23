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
   * @license
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
        return '<style>:host{--pfe-card--padding:calc(var(--pfe-theme--container-spacer, 1rem) * 2);--pfe-card_header--size:var(--pfe-theme--font-size--heading--gamma, 21px);--pfe-card--bg:var(--pfe-theme--color--surface--base, #dfdfdf);--pfe-broadcasted--color--text:var(--pfe-theme--color--surface--base--text, #333);--pfe-broadcasted--color--ui-link:var(--pfe-theme--color--surface--base--link, #00538c);--pfe-broadcasted--color--ui-link--visited:var(--pfe-theme--color--surface--base--link--visited, #7551a6);--pfe-broadcasted--color--ui-link--hover:var(--pfe-theme--color--surface--base--link--hover, #00305b);--pfe-broadcasted--color--ui-link--focus:var(--pfe-theme--color--surface--base--link--focus, #00305b);display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;justify-items:flex-start;-webkit-align-self:stretch;-ms-flex-item-align:stretch;align-self:stretch;padding:var(--pfe-card--padding);border:1px solid transparent;border:var(--pfe-theme--surface--border-width,1px) var(--pfe-theme--surface--border-style,solid) transparent;border-radius:0;border-radius:var(--pfe-theme--surface--border-radius,0);background:var(--pfe-card--bg);color:var(--pfe-broadcasted--color--text)}a{color:var(--pfe-broadcasted--color--ui-link)}a:visited{color:var(--pfe-broadcasted--color--ui-link--visited)}a:hover{color:var(--pfe-broadcasted--color--ui-link--hover)}a:focus{color:var(--pfe-broadcasted--color--ui-link--focus)}:host([color=dark]){--pfe-card--bg:var(--pfe-theme--color--surface--darker, #464646);--pfe-broadcasted--color--text:var(--pfe-theme--color--surface--darker--text, #fff);--pfe-broadcasted--color--ui-link:var(--pfe-theme--color--surface--darker--link, #99ccff);--pfe-broadcasted--color--ui-link--visited:var(--pfe-theme--color--surface--darker--link--visited, #b38cd9);--pfe-broadcasted--color--ui-link--hover:var(--pfe-theme--color--surface--darker--link--hover, #cce6ff);--pfe-broadcasted--color--ui-link--focus:var(--pfe-theme--color--surface--darker--link--focus, #cce6ff)}:host([color=darkest]){--pfe-card--bg:var(--pfe-theme--color--surface--darkest, #131313);--pfe-broadcasted--color--text:var(--pfe-theme--color--surface--darkest--text, #fff);--pfe-broadcasted--color--ui-link:var(--pfe-theme--color--surface--darkest--link, #99ccff);--pfe-broadcasted--color--ui-link--visited:var(--pfe-theme--color--surface--darkest--link--visited, #b38cd9);--pfe-broadcasted--color--ui-link--hover:var(--pfe-theme--color--surface--darkest--link--hover, #cce6ff);--pfe-broadcasted--color--ui-link--focus:var(--pfe-theme--color--surface--darkest--link--focus, #cce6ff)}:host([color=light]){--pfe-card--bg:var(--pfe-theme--color--surface--lighter, #ececec);--pfe-broadcasted--color--text:var(--pfe-theme--color--surface--lighter--text, #333);--pfe-broadcasted--color--ui-link:var(--pfe-theme--color--surface--lighter--link, #06c);--pfe-broadcasted--color--ui-link--visited:var(--pfe-theme--color--surface--lighter--link--visited, rebeccapurple);--pfe-broadcasted--color--ui-link--hover:var(--pfe-theme--color--surface--lighter--link--hover, #003366);--pfe-broadcasted--color--ui-link--focus:var(--pfe-theme--color--surface--lighter--link--focus, #003366)}:host([color=lightest]){--pfe-card--bg:var(--pfe-theme--color--surface--lightest, #fff);--pfe-broadcasted--color--text:var(--pfe-theme--color--surface--lightest--text, #333);--pfe-broadcasted--color--ui-link:var(--pfe-theme--color--surface--lightest--link, #06c);--pfe-broadcasted--color--ui-link--visited:var(--pfe-theme--color--surface--lightest--link--visited, rebeccapurple);--pfe-broadcasted--color--ui-link--hover:var(--pfe-theme--color--surface--lightest--link--hover, #003366);--pfe-broadcasted--color--ui-link--focus:var(--pfe-theme--color--surface--lightest--link--focus, #003366)}:host([color=complement]){--pfe-card--bg:var(--pfe-theme--color--surface--complement, #0477a4);--pfe-broadcasted--color--text:var(--pfe-theme--color--surface--complement--text, #fff);--pfe-broadcasted--color--ui-link:var(--pfe-theme--color--surface--complement--link, #99ccff);--pfe-broadcasted--color--ui-link--visited:var(--pfe-theme--color--surface--complement--link--visited, #b38cd9);--pfe-broadcasted--color--ui-link--hover:var(--pfe-theme--color--surface--complement--link--hover, #cce6ff);--pfe-broadcasted--color--ui-link--focus:var(--pfe-theme--color--surface--complement--link--focus, #cce6ff)}:host([color=accent]){--pfe-card--bg:var(--pfe-theme--color--surface--accent, #fe460d);--pfe-broadcasted--color--text:var(--pfe-theme--color--surface--accent--text, #fff);--pfe-broadcasted--color--ui-link:var(--pfe-theme--color--surface--accent--link, #99ccff);--pfe-broadcasted--color--ui-link--visited:var(--pfe-theme--color--surface--accent--link--visited, #b38cd9);--pfe-broadcasted--color--ui-link--hover:var(--pfe-theme--color--surface--accent--link--hover, #cce6ff);--pfe-broadcasted--color--ui-link--focus:var(--pfe-theme--color--surface--accent--link--focus, #cce6ff)}:host([size=small]){--pfe-card--padding:var(--pfe-theme--container-spacer, 1rem)}.pfe-card__body,.pfe-card__footer,.pfe-card__header{display:block;margin:0}.pfe-card__header::slotted(h1:first-child),.pfe-card__header::slotted(h2:first-child),.pfe-card__header::slotted(h3:first-child),.pfe-card__header::slotted(h4:first-child),.pfe-card__header::slotted(h5:first-child),.pfe-card__header::slotted(h6:first-child){margin-top:0!important;font-size:var(--pfe-card_header--size)}.pfe-card__body::slotted(:nth-child(2)){margin-top:0!important}.pfe-card__footer{margin-top:auto;justify-self:flex-end}</style><slot class="pfe-card__header" name="header"></slot>\n<slot class="pfe-card__body"></slot>\n<slot class="pfe-card__footer" name="footer"></slot>';
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
