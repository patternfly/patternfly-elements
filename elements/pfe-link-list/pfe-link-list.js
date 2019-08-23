import PFElement from '../pfelement/pfelement.js';

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

class PfeLinkList extends PFElement {

  get html() {
    return `<style>:host{--pfe-link-list--Padding:var(--pfe-theme--container-spacer, 16px);--pfe-link-list__header--FontSize:var(--pfe-theme--font-size--heading--epsilon, 16px);--pfe-link-list__header--Color:var(--pfe-theme--color--surface--base--text, #333);--pfe-broadcasted--color--text:var(--pfe-theme--color--surface--base--text, #333);--pfe-broadcasted--color--ui-link:var(--pfe-theme--color--surface--base--link, #00538c);--pfe-broadcasted--color--ui-link--visited:var(--pfe-theme--color--surface--base--link--visited, #7551a6);--pfe-broadcasted--color--ui-link--hover:var(--pfe-theme--color--surface--base--link--hover, #00305b);--pfe-broadcasted--color--ui-link--focus:var(--pfe-theme--color--surface--base--link--focus, #00305b);display:block;text-align:left}:host([hidden]){display:none}.pfe-link-list__header{color:header;color:var(--pfe-link-list--Color,header);font-family:Overpass,Overpass,Helvetica,helvetica,arial,sans-serif;font-family:var(--pfe-theme--font-family--heading, "Overpass", Overpass, Helvetica, helvetica, arial, sans-serif);font-size:1rem;font-weight:500;font-weight:var(--pfe-theme--font-weight--normal,500);margin:0;-webkit-margin-after:0;margin-block-end:0;-webkit-margin-before:0;margin-block-start:0;padding-bottom:12px}.pfe-link-list__header a{color:var(--pfe-broadcasted--color--ui-link);text-decoration:none}.pfe-link-list__header a:hover{color:var(--pfe-broadcasted--color--ui-link--hover)}.pfe-link-list__header a:visited{color:var(--pfe-broadcasted--color--ui-link--visited)}.pfe-link-list__header a:focus{color:var(--pfe-broadcasted--color--ui-link--focus)}.pfe-link-list__list{margin:0;padding:0;list-style:none}.pfe-link-list__list li{font-family:Overpass,Overpass,Helvetica,helvetica,arial,sans-serif;font-family:var(--pfe-theme--font-family, "Overpass", Overpass, Helvetica, helvetica, arial, sans-serif);font-weight:300;font-weight:var(--pfe-theme--font-weight--light,300);font-size:1rem}.pfe-link-list__list li:not(:last-child){margin-bottom:12px}.pfe-link-list__list span{display:block;font-size:.7em;line-height:2;color:#797979;color:var(--pfe-theme--color--ui-disabled--text,#797979);text-transform:uppercase}.pfe-link-list__list a{color:var(--pfe-broadcasted--color--ui-link);text-decoration:none}.pfe-link-list__list a:hover{color:var(--pfe-broadcasted--color--ui-link--hover)}.pfe-link-list__list a:visited{color:var(--pfe-broadcasted--color--ui-link--visited)}.pfe-link-list__list a:focus{color:var(--pfe-broadcasted--color--ui-link--focus)}</style><slot hidden></slot>`;
  }

  static get properties() {
    return {};
  }

  static get slots() {
    return {"content":{"title":"Content","type":"array","namedSlot":false,"items":{"title":"Body item","oneOf":[{"$ref":"raw"}]}}};
  }
  static get tag() {
    return "pfe-link-list";
  }

  get schemaUrl() {
    return "pfe-link-list.json";
  }

  get templateUrl() {
    return "pfe-link-list.html";
  }

  get styleUrl() {
    return "pfe-link-list.scss";
  }

  // static get observedAttributes() {
  //   return [];
  // }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  constructor() {
    super(PfeLinkList, { type: PfeLinkList.PfeType });
  }

  connectedCallback() {
    super.connectedCallback();

    // Copy the element provided by the lightDOM to the shadowDOM
    const fragment = document.createDocumentFragment();
    [...this.children].map(child => {
      // Clone the element and all it's descendants
      const twin = child.cloneNode(true);
      if(/^(H[1-6])$/.test(twin.tagName)) {
        twin.classList.add("pfe-link-list__header");
      } else if(/^(UL)$/.test(twin.tagName)) {
        twin.classList.add("pfe-link-list__list");
      }
      fragment.appendChild(twin);
    });
    
    this.shadowRoot.appendChild(fragment);
  }

  // disconnectedCallback() {}

  // attributeChangedCallback(attr, oldValue, newValue) {}
}

PFElement.create(PfeLinkList);

export default PfeLinkList;
//# sourceMappingURL=pfe-link-list.js.map
