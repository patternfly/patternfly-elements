import '../cp-accordion-heading/cp-accordion-heading.js';
import '../cp-accordion-panel/cp-accordion-panel.js';

// https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
if (!Array.prototype.findIndex) {
  Object.defineProperty(Array.prototype, 'findIndex', {
    value: function(predicate) {
     // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return k.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return k;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return -1.
      return -1;
    }
  });
}

const accordionTemplate = document.createElement('template');
accordionTemplate.innerHTML = `
  <style>:host {
  display: block;
  position: relative;
  overflow: hidden;
  margin: 0; }</style>
  <slot></slot>
`;

if (window.ShadyCSS) {
  ShadyCSS.prepareTemplate(accordionTemplate, 'cp-accordion');
}

class CpAccordion extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(accordionTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    if (window.ShadyCSS) {
      ShadyCSS.styleElement(this);
    }

    this.setAttribute('role', 'tablist');
    this.setAttribute('defined', '');

    this.addEventListener('cp-accordion-change', this._changeHandler);
    this.addEventListener('keydown', this._keydownHandler);
  }

  disconnectedCallback() {
    this.removeEventListener('cp-accordion-change', this._changeHandler);
    this.removeEventListener('keydown', this._keydownHandler);
  }

  toggle(index) {
    const headings = this._allHeadings();
    const panels = this._allPanels();
    const heading = headings[index];
    const panel = panels[index];

    if (!heading || !panel) {
      return;
    }

    if (!heading.expanded) {
      this._expandHeading(heading);
      this._expandPanel(panel);
    } else {
      this._collapseHeading(heading);
      this._collapsePanel(panel);
    }
  }

  expand(index) {
    const headings = this._allHeadings();
    const panels = this._allPanels();
    const heading = headings[index];
    const panel = panels[index];

    if (!heading || !panel) {
      return;
    }

    this._expandHeading(heading);
    this._expandPanel(panel);
  }

  expandAll() {
    const headings = this._allHeadings();
    const panels = this._allPanels();

    headings.forEach(heading => this._expandHeading(heading));
    panels.forEach(panel => this._expandPanel(panel));
  }

  collapse(index) {
    const headings = this._allHeadings();
    const panels = this._allPanels();
    const heading = headings[index];
    const panel = panels[index];

    if (!heading || !panel) {
      return;
    }

    this._collapseHeading(heading);
    this._collapsePanel(panel);
  }

  collapseAll() {
    const headings = this._allHeadings();
    const panels = this._allPanels();

    headings.forEach(heading => heading.expanded = false);
    panels.forEach(panel => panel.expanded = false);
  }

  _changeHandler(evt) {
    const heading = evt.target;
    const panel = evt.target.nextElementSibling;

    if (evt.detail.expanded) {
      this._expandHeading(heading);
      this._expandPanel(panel);
    } else {
      this._collapseHeading(heading);
      this._collapsePanel(panel);
    }
  }

  _toggle(heading, panel) {

  }

  _expandHeading(heading) {
    heading.expanded = true;
  }

  _expandPanel(panel) {
    panel.expanded = true;

    const height = panel.getBoundingClientRect().height;
    this._animate(panel, -height, 0)
  }

  _collapseHeading(heading) {
    heading.expanded = false;
  }

  _collapsePanel(panel) {
    const height = panel.getBoundingClientRect().height;
    this._animate(panel, 0, -height)
      .then(() => {
        panel.expanded = false;
      });
  }

  _animate(panel, start, end) {
    const children = [...this.children];
    const index = children.findIndex(child => child === panel);
    const animatedChildren = children.slice(index);

    this.classList.add('animating');

    children.forEach(child => {
      child.style.position = 'relative';
      child.style.zIndex = 2;
    });

    animatedChildren.forEach(child => {
      child.style.position = 'relative';
      child.style.zIndex = 1;
      child.style.transform = `translateY(${start}px)`;
    });

    return requestAnimationFramePromise()
      .then(_ => requestAnimationFramePromise())
      .then(_ => {
        animatedChildren.forEach(child => {
          child.style.transform = `translateY(${end}px)`;
          child.classList.add('animating');
        })

        return transitionEndPromise(panel);
      })
      .then(_ => {
        animatedChildren.forEach(child => {
          child.style.transform = '';
          child.classList.remove('animating');
        })

        children.forEach(child => {
          child.style.position = '';
          child.style.zIndex = '';
        });

        this.classList.remove('animating');
      });

    // window.requestAnimationFrame(() => {
    //   window.requestAnimationFrame(() => {
    //     animatedChildren.forEach(child => {
    //       child.classList.add('animating');
    //       child.style.transform = `translateY(${end}px)`;
    //
    //       child.addEventListener('transitionend', function transitionEnd() {
    //         child.classList.remove('animating');
    //         child.style.cssText = '';
    //         child.removeEventListener('transitionend', transitionEnd);
    //
    //         children.forEach(child => {
    //           child.classList.remove('animating');
    //           child.style.cssText = '';
    //         });
    //
    //         this.classList.remove('animating');
    //
    //         if (cb) {
    //           cb();
    //         }
    //
    //       }.bind(this));
    //     });
    //   });
    // });
  }

  _keydownHandler(evt) {
    const currentHeading = evt.target;

    if (!this._isHeading(currentHeading)) {
      return;
    }

    let newHeading;

    switch (evt.key) {
      case 'ArrowDown':
      case 'Down':
      case 'ArrowRight':
      case 'Right':
        newHeading = this._nextHeading();
        break;
      case 'ArrowUp':
      case 'Up':
      case 'ArrowLeft':
      case 'Left':
        newHeading = this._previousHeading();
        break;
      case 'Home':
        newHeading = this._firstHeading();
        break;
      case 'End':
        newHeading = this._lastHeading();
        break;
      default:
        return;
    }

    newHeading.shadowRoot.querySelector('button').focus();
  }

  _allHeadings() {
    return [...this.querySelectorAll('cp-accordion-heading')];
  }

  _allPanels() {
    return [...this.querySelectorAll('cp-accordion-panel')];
  }

  _previousHeading() {
    const headings = this._allHeadings();
    let newIndex = headings.findIndex(heading => heading === document.activeElement) - 1;
    return headings[(newIndex + headings.length) % headings.length];
  }

  _nextHeading() {
    const headings = this._allHeadings();
    let newIndex = headings.findIndex(heading => heading === document.activeElement) + 1;
    return headings[newIndex % headings.length];
  }

  _firstHeading() {
    const headings = this._allHeadings();
    return headings[0];
  }

  _lastHeading() {
    const headings = this._allHeadings();
    return headings[headings.length - 1];
  }

  _isHeading(element) {
    return element.tagName.toLowerCase() === 'cp-accordion-heading';
  }
}

window.customElements.define('cp-accordion', CpAccordion);

function transitionEndPromise(element) {
  return new Promise(resolve => {
    element.addEventListener('transitionend', function f() {
      element.removeEventListener('transitionend', f);
      resolve();
    });
  });
}

function requestAnimationFramePromise() {
  return new Promise(resolve => requestAnimationFrame(resolve));
}
