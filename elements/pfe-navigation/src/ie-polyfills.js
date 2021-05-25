/**
 * ChildNode.append() polyfill
 * https://gomakethings.com/adding-an-element-to-the-end-of-a-set-of-elements-with-vanilla-javascript/
 * @author Chris Ferdinandi
 * @license MIT
 */
(function(elem) {
  // Check if element is a node
  // https://github.com/Financial-Times/polyfill-service
  var isNode = function(object) {
    // DOM, Level2
    if (typeof Node === "function") {
      return object instanceof Node;
    }

    // Older browsers, check if it looks like a Node instance)
    return object && typeof object === "object" && object.nodeName && object.nodeType >= 1 && object.nodeType <= 12;
  };

  // Add append() method to prototype
  for (var i = 0; i < elem.length; i++) {
    if (!window[elem[i]] || "append" in window[elem[i]].prototype) continue;
    window[elem[i]].prototype.append = function() {
      var argArr = Array.prototype.slice.call(arguments);
      var docFrag = document.createDocumentFragment();

      for (var n = 0; n < argArr.length; n++) {
        docFrag.appendChild(isNode(argArr[n]) ? argArr[n] : document.createTextNode(String(argArr[n])));
      }

      this.appendChild(docFrag);
    };
  }
})(["Element", "CharacterData", "DocumentType"]);

/**
 * Prepend Polyfill
 * @see https://vanillajstoolkit.com/polyfills/prepend/
 * ChildNode.prepend() polyfill
 * https://github.com/jserz/js_piece/blob/master/DOM/ParentNode/append()/append().md
 */
(function(arr) {
  arr.forEach(function(item) {
    if (item.hasOwnProperty("prepend")) {
      return;
    }
    Object.defineProperty(item, "prepend", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function prepend() {
        var argArr = Array.prototype.slice.call(arguments),
          docFrag = document.createDocumentFragment();

        argArr.forEach(function(argItem) {
          var isNode = argItem instanceof Node;
          docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
        });

        this.insertBefore(docFrag, this.firstChild);
      }
    });
  });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);

/**
 * Includes Polyfill
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes#polyfill
 */
if (!String.prototype.includes) {
  String.prototype.includes = function(search, start) {
    "use strict";

    if (search instanceof RegExp) {
      throw TypeError("first argument must not be a RegExp");
    }
    if (start === undefined) {
      start = 0;
    }
    return this.indexOf(search, start) !== -1;
  };
}

/**
 * StartsWith Polyfill
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith#polyfill
 */
if (!String.prototype.startsWith) {
  Object.defineProperty(String.prototype, "startsWith", {
    value: function(search, rawPos) {
      var pos = rawPos > 0 ? rawPos | 0 : 0;
      return this.substring(pos, pos + search.length) === search;
    }
  });
}

/**
 * Closest Polyfill
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill
 */
if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}
if (!Element.prototype.closest) {
  Element.prototype.closest = function(s) {
    var el = this;

    do {
      if (Element.prototype.matches.call(el, s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };
}

/**
 * Element.getAttributeNames Polyfill
 */
if (Element.prototype.getAttributeNames == undefined) {
  Element.prototype.getAttributeNames = function() {
    var attributes = this.attributes;
    var length = attributes.length;
    var result = new Array(length);
    for (var i = 0; i < length; i++) {
      result[i] = attributes[i].name;
    }
    return result;
  };
}
