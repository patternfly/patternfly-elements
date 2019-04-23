(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../pfelement/pfelement.umd')) :
  typeof define === 'function' && define.amd ? define(['../pfelement/pfelement.umd'], factory) :
  (global.PfePagination = factory(global.PFElement));
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

  var PfePagination = function (_PFElement) {
    inherits(PfePagination, _PFElement);
    createClass(PfePagination, [{
      key: "html",
      get: function get$$1() {
        var _this2 = this;

        return "<style>:host {\n  display: block; }\n\n:host([hidden]) {\n  display: none; }\n\n:focus:not(:focus-visible) {\n  outline: none; }\n\nnav *, nav *::before, nav *::after {\n  box-sizing: border-box; }\n\nnav ul {\n  margin: 0;\n  padding: 0;\n  list-style: none;\n  display: flex;\n  align-items: baseline; }\n  nav ul li {\n    margin: 1px;\n    display: flex; }\n    nav ul li .ellipses {\n      display: block;\n      padding: 0 calc(var(--pfe-theme--font-size, 16px) * 0.75);\n      line-height: calc( var(--pfe-theme--font-size, 16px) * 2.5);\n      min-height: calc( var(--pfe-theme--font-size, 16px) * 2.5);\n      min-width: calc( var(--pfe-theme--font-size, 16px) * 2.5); }\n    nav ul li > a {\n      display: block;\n      padding: 0 calc(var(--pfe-theme--font-size, 16px) * 0.75);\n      line-height: calc( var(--pfe-theme--font-size, 16px) * 2.5);\n      min-height: calc( var(--pfe-theme--font-size, 16px) * 2.5);\n      min-width: calc( var(--pfe-theme--font-size, 16px) * 2.5);\n      border: var(--pfe-theme--ui--border-width, 1px) var(--pfe-theme--ui--border-style, solid) transparent;\n      background: var(--pfe-theme--color--ui-subtle, #f3f3f3);\n      color: var(--pfe-theme--color--ui-subtle--text, #333);\n      text-align: center;\n      text-decoration: none;\n      vertical-align: middle; }\n      nav ul li > a:hover, nav ul li > a:focus, nav ul li > a:active {\n        background: var(--pfe-theme--color--ui-base, #0477a4);\n        color: var(--pfe-theme--color--ui-base--text, #fff); }\n      nav ul li > a[aria-current] {\n        background: var(--pfe-theme--color--ui-complement, #464646);\n        color: var(--pfe-theme--color--ui-complement--text, #fff); }\n    nav ul li#next {\n      order: 10; }\n\n#jump {\n  margin: 0 var(--pfe-theme--container-spacer, 1rem); }\n  #jump a {\n    color: var(--pfe-theme--color--ui-link, #06c);\n    text-decoration: none; }\n    #jump a:hover {\n      color: var(--pfe-theme--color--ui-link--hover, #003366);\n      text-decoration: underline; }\n    #jump a:focus {\n      color: var(--pfe-theme--color--ui-link--focus, #003366);\n      text-decoration: underline; }\n\n#currentPageInput {\n  margin-right: calc(var(--pfe-theme--content-spacer, 1rem) * 0.5);\n  padding: 0 calc(var(--pfe-theme--font-size, 16px) * 0.75);\n  line-height: calc(var(--pfe-theme--font-size, 16px) * 2.5);\n  min-height: calc(var(--pfe-theme--font-size, 16px) * 2.5);\n  border: var(--pfe-theme--ui--border-width, 1px) var(--pfe-theme--ui--border-style, solid) var(--pfe-theme--color--surface--border, #dfdfdf);\n  box-shadow: var(--pfe-theme--box-shadow--input, );\n  width: 4em;\n  font-size: inherit; }</style>\n<nav role=\"navigation\" aria-label=\"Pagination\">\n  <ul>\n    " + (this.showJump ? "\n      " + (!this.showPages ? "\n        <li><a href=\"#\" id=\"previous\">" + this.previousText + "</a></li>\n        <li><a href=\"#\" id=\"next\">" + this.nextText + "</a></li>\n      " : "") + "\n      <li id=\"jump\">\n        <form>\n          <input\n            type=\"number\"\n            id=\"currentPageInput\"\n            value=\"" + this.currentPage + "\"\n            min=\"1\"\n            max=\"" + this.totalPages + "\"> of\n          <a href=\"#\" id=\"lastPage\" page=\"" + this.totalPages + "\">" + this.totalPages + "</a>\n        </form>\n      </li>\n    " : "") + "\n    " + (this.showPages ? "\n      <li><a href=\"#\" id=\"previous\">" + this.previousText + "</a></li>\n      " + this.pages.map(function (page) {
          return "\n        <li>\n          " + (page.ellipsize ? "\n            <div class=\"ellipses\">" + page.text + "</div>\n          " : "\n            <a\n              href=\"#\"\n              class=\"page\"\n              page=\"" + page.text + "\"\n              aria-label=\"" + page.ariaLabel + "\"\n              " + (_this2.currentPage == page.text ? " aria-current=\"true\"" : "") + ">\n              " + page.text + "\n            </a>\n          ") + "\n        </li>\n      ";
        }).join("\n") + "\n      <li><a href=\"#\" id=\"next\">" + this.nextText + "</a></li>\n    " : "") + "\n  </ul>\n</nav>";
      }
    }, {
      key: "templateUrl",
      get: function get$$1() {
        return "pfe-pagination.html";
      }
    }, {
      key: "styleUrl",
      get: function get$$1() {
        return "pfe-pagination.scss";
      }
    }, {
      key: "showPages",
      get: function get$$1() {
        return this.hasAttribute("show-pages");
      }
    }, {
      key: "showJump",
      get: function get$$1() {
        return this.hasAttribute("show-jump");
      }
    }, {
      key: "totalPages",
      get: function get$$1() {
        return Number(this.getAttribute("total-pages"));
      }
    }, {
      key: "currentPage",
      get: function get$$1() {
        return Number(this.getAttribute("current-page"));
      },
      set: function set$$1(val) {
        var page = Number(val);

        if (page < 1) {
          page = 1;
        }

        if (page > this.totalPages) {
          page = this.totalPages;
        }

        this.setAttribute("current-page", page);

        this.dispatchEvent(new CustomEvent(PfePagination.tag + ":page-change", {
          detail: {
            page: page
          },
          bubbles: true
        }));
      }
    }], [{
      key: "tag",
      get: function get$$1() {
        return "pfe-pagination";
      }
    }, {
      key: "observedAttributes",
      get: function get$$1() {
        return ["total-pages", "show-jump", "show-pages", "current-page"];
      }
    }]);

    function PfePagination() {
      classCallCheck(this, PfePagination);

      var _this = possibleConstructorReturn(this, (PfePagination.__proto__ || Object.getPrototypeOf(PfePagination)).call(this, PfePagination, {
        delayRender: true
      }));

      _this.previousText = "Previous";
      _this.nextText = "Next";
      _this.pages = [];

      _this._clickHandler = _this._clickHandler.bind(_this);
      _this._submitHandler = _this._submitHandler.bind(_this);
      _this.previousPage = _this.previousPage.bind(_this);
      _this.nextPage = _this.nextPage.bind(_this);
      _this._childrenAvailable = _this._childrenAvailable.bind(_this);
      return _this;
    }

    createClass(PfePagination, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        get(PfePagination.prototype.__proto__ || Object.getPrototypeOf(PfePagination.prototype), "connectedCallback", this).call(this);
        this._isReady();

        this._observer = new MutationObserver(this._childrenAvailable);

        this._observer.observe(this, {
          childList: true
        });
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        this._observer.disconnect();
      }
    }, {
      key: "_isReady",
      value: function _isReady() {
        if (this.firstChild) {
          if (this._observer) {
            this._observer.disconnect();
          }

          this._childrenAvailable();
        }
      }
    }, {
      key: "_childrenAvailable",
      value: function _childrenAvailable() {
        var previousControl = this.querySelector('[control="previous"]');
        var nextControl = this.querySelector('[control="next"]');

        this.previousText = previousControl.textContent || "Previous";
        this.nextText = nextControl.textContent || "Next";

        this._setup();
        this._rendered = true;
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(attr, oldValue, newValue) {
        if (!this._rendered) {
          return;
        }

        this._setup();
      }
    }, {
      key: "previousPage",
      value: function previousPage(event) {
        if (event) {
          event.preventDefault();
        }

        this.currentPage -= 1;
      }
    }, {
      key: "nextPage",
      value: function nextPage(event) {
        if (event) {
          event.preventDefault();
        }

        this.currentPage += 1;
      }
    }, {
      key: "_setup",
      value: function _setup() {
        var _this3 = this;

        this.maxPagesShown = this.showJump && this.showPages ? 7 : 9;

        if (this.maxPagesShown > this.totalPages) {
          this.maxPagesShown = this.totalPages;
        }

        if (this.showPages) {
          var truncatePageNumbers = this.totalPages > this.maxPagesShown;
          var loopPages = truncatePageNumbers ? this.maxPagesShown : this.totalPages;
          var mean = Math.ceil(this.maxPagesShown / 2);
          var minMaxDistance = mean - 1;
          var ellipsizeStart = this.currentPage - minMaxDistance > 1;
          var ellipsizeEnd = this.currentPage + minMaxDistance < this.totalPages;

          this.pages = [];

          this.pages[0] = {
            ellipsize: false,
            ariaLabel: this._getAriaLabel(1),
            text: 1
          };

          for (var i = 1; i <= loopPages - 2; i++) {
            if ((i === 1 && ellipsizeStart || i === this.maxPagesShown - 2 && ellipsizeEnd) && truncatePageNumbers) {
              this.pages[i] = {
                ellipsize: true,
                text: "..."
              };
            } else {
              var pageNumber = this.currentPage - minMaxDistance + i;

              if (!ellipsizeStart) {
                pageNumber = i + 1;
              }

              if (!ellipsizeEnd) {
                pageNumber = this.totalPages - (this.maxPagesShown - 1) + i;
              }

              this.pages[i] = {
                ellipsize: false,
                ariaLabel: this._getAriaLabel(pageNumber),
                text: pageNumber
              };
            }
          }

          this.pages[loopPages - 1] = {
            ellipsize: false,
            ariaLabel: this._getAriaLabel(this.totalPages),
            text: this.totalPages
          };
        }

        this.render();

        this.shadowRoot.querySelector("#previous").addEventListener("click", this.previousPage);
        this.shadowRoot.querySelector("#next").addEventListener("click", this.nextPage);

        if (this.showPages) {
          var pages = [].concat(toConsumableArray(this.shadowRoot.querySelectorAll("a.page")));
          pages.forEach(function (page) {
            page.addEventListener("click", _this3._clickHandler);
          });
        }

        if (this.showJump) {
          var form = this.shadowRoot.querySelector("form");
          form.addEventListener("submit", this._submitHandler);

          var lastPage = this.shadowRoot.querySelector("#lastPage");
          lastPage.addEventListener("click", this._clickHandler);
        }
      }
    }, {
      key: "_clickHandler",
      value: function _clickHandler(event) {
        event.preventDefault();
        this.currentPage = event.currentTarget.getAttribute("page");
      }
    }, {
      key: "_submitHandler",
      value: function _submitHandler(event) {
        event.preventDefault();

        var currentPageInput = this.shadowRoot.querySelector("#currentPageInput");
        this.currentPage = currentPageInput.value;
      }
    }, {
      key: "_getAriaLabel",
      value: function _getAriaLabel(page) {
        return page === this.currentPage ? "Page " + page + ", Current Page" : "Page " + page;
      }
    }]);
    return PfePagination;
  }(PFElement);

  PFElement.create(PfePagination);

  return PfePagination;

})));
//# sourceMappingURL=pfe-pagination.umd.js.map
