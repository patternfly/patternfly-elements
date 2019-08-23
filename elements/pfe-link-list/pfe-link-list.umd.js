(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../pfelement/pfelement.umd')) :
  typeof define === 'function' && define.amd ? define(['../pfelement/pfelement.umd'], factory) :
  (global.PfeLinkList = factory(global.PFElement));
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

  var PfeLinkList = function (_PFElement) {
    inherits(PfeLinkList, _PFElement);
    createClass(PfeLinkList, [{
      key: "html",
      get: function get$$1() {
        return "<style>:host{--pfe-link-list--Padding:var(--pfe-theme--container-spacer, 16px);--pfe-link-list__header--FontSize:var(--pfe-theme--font-size--heading--epsilon, 16px);--pfe-link-list__header--Color:var(--pfe-theme--color--surface--base--text, #333);--pfe-broadcasted--color--text:var(--pfe-theme--color--surface--base--text, #333);--pfe-broadcasted--color--ui-link:var(--pfe-theme--color--surface--base--link, #00538c);--pfe-broadcasted--color--ui-link--visited:var(--pfe-theme--color--surface--base--link--visited, #7551a6);--pfe-broadcasted--color--ui-link--hover:var(--pfe-theme--color--surface--base--link--hover, #00305b);--pfe-broadcasted--color--ui-link--focus:var(--pfe-theme--color--surface--base--link--focus, #00305b);display:block;text-align:left}:host([hidden]){display:none}.pfe-link-list__header{color:header;color:var(--pfe-link-list--Color,header);font-family:Overpass,Overpass,Helvetica,helvetica,arial,sans-serif;font-family:var(--pfe-theme--font-family--heading, \"Overpass\", Overpass, Helvetica, helvetica, arial, sans-serif);font-size:1rem;font-weight:500;font-weight:var(--pfe-theme--font-weight--normal,500);margin:0;-webkit-margin-after:0;margin-block-end:0;-webkit-margin-before:0;margin-block-start:0;padding-bottom:12px}.pfe-link-list__header a{color:var(--pfe-broadcasted--color--ui-link);text-decoration:none}.pfe-link-list__header a:hover{color:var(--pfe-broadcasted--color--ui-link--hover)}.pfe-link-list__header a:visited{color:var(--pfe-broadcasted--color--ui-link--visited)}.pfe-link-list__header a:focus{color:var(--pfe-broadcasted--color--ui-link--focus)}.pfe-link-list__list{margin:0;padding:0;list-style:none}.pfe-link-list__list li{font-family:Overpass,Overpass,Helvetica,helvetica,arial,sans-serif;font-family:var(--pfe-theme--font-family, \"Overpass\", Overpass, Helvetica, helvetica, arial, sans-serif);font-weight:300;font-weight:var(--pfe-theme--font-weight--light,300);font-size:1rem}.pfe-link-list__list li:not(:last-child){margin-bottom:12px}.pfe-link-list__list span{display:block;font-size:.7em;line-height:2;color:#797979;color:var(--pfe-theme--color--ui-disabled--text,#797979);text-transform:uppercase}.pfe-link-list__list a{color:var(--pfe-broadcasted--color--ui-link);text-decoration:none}.pfe-link-list__list a:hover{color:var(--pfe-broadcasted--color--ui-link--hover)}.pfe-link-list__list a:visited{color:var(--pfe-broadcasted--color--ui-link--visited)}.pfe-link-list__list a:focus{color:var(--pfe-broadcasted--color--ui-link--focus)}</style><slot hidden></slot>";
      }
    }, {
      key: "schemaUrl",
      get: function get$$1() {
        return "pfe-link-list.json";
      }
    }, {
      key: "templateUrl",
      get: function get$$1() {
        return "pfe-link-list.html";
      }
    }, {
      key: "styleUrl",
      get: function get$$1() {
        return "pfe-link-list.scss";
      }

      // static get observedAttributes() {
      //   return [];
      // }

      // Declare the type of this component

    }], [{
      key: "properties",
      get: function get$$1() {
        return {};
      }
    }, {
      key: "slots",
      get: function get$$1() {
        return { "content": { "title": "Content", "type": "array", "namedSlot": false, "items": { "title": "Body item", "oneOf": [{ "$ref": "raw" }] } } };
      }
    }, {
      key: "tag",
      get: function get$$1() {
        return "pfe-link-list";
      }
    }, {
      key: "PfeType",
      get: function get$$1() {
        return PFElement.PfeTypes.Content;
      }
    }]);

    function PfeLinkList() {
      classCallCheck(this, PfeLinkList);
      return possibleConstructorReturn(this, (PfeLinkList.__proto__ || Object.getPrototypeOf(PfeLinkList)).call(this, PfeLinkList, { type: PfeLinkList.PfeType }));
    }

    createClass(PfeLinkList, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        get(PfeLinkList.prototype.__proto__ || Object.getPrototypeOf(PfeLinkList.prototype), "connectedCallback", this).call(this);

        // Copy the element provided by the lightDOM to the shadowDOM
        var fragment = document.createDocumentFragment();
        [].concat(toConsumableArray(this.children)).map(function (child) {
          // Clone the element and all it's descendants
          var twin = child.cloneNode(true);
          if (/^(H[1-6])$/.test(twin.tagName)) {
            twin.classList.add("pfe-link-list__header");
          } else if (/^(UL)$/.test(twin.tagName)) {
            twin.classList.add("pfe-link-list__list");
          }
          fragment.appendChild(twin);
        });

        this.shadowRoot.appendChild(fragment);
      }

      // disconnectedCallback() {}

      // attributeChangedCallback(attr, oldValue, newValue) {}

    }]);
    return PfeLinkList;
  }(PFElement);

  PFElement.create(PfeLinkList);

  return PfeLinkList;

})));
//# sourceMappingURL=pfe-link-list.umd.js.map
