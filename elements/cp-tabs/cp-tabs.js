/**
 * Credit to: https://github.com/GoogleChromeLabs/howto-components/tree/master/elements/howto-tabs
*/

import Rhelement from '../rhelement/rhelement.js';

/*
 * DO NOT EDIT. This will be autopopulated with the
 * html from cp-tabs.html and css from
 * cp-tabs.scss
 */
const template = document.createElement('template');
template.innerHTML = `
<style>:host {
  display: flex;
  flex-wrap: wrap; }

::slotted([slot=tab]) {
  border: 1px solid black;
  padding: 20px; }

::slotted([slot=panel]) {
  flex-basis: 100%;
  padding: 20px;
  background-color: lightgray; }


:host:not(:defined), ::slotted([slot=tab]):not(:defined), ::slotted([slot=panel]):not(:defined) {
  display: block; }</style>
<slot name="tab"></slot>
<slot name="panel"></slot>
`;
/* end DO NOT EDIT */

/* Key Codes for keyboard actions */
const KEYCODE = {
  LEFT: 37,
  RIGHT: 39,
  HOME: 36,
  END: 35
};

/* Container element for tabs and panels */

class CpTabs extends Rhelement {
  constructor() {
    super('cp-tabs', template);

    this._onSlotChange = this._onSlotChange.bind(this);

    this._tabSlot = this.shadowRoot.querySelector('slot[name=tab]');
    this._panelSlot = this.shadowRoot.querySelector('slot[name=panel]');
    
    this._tabSlot.addEventListener('slotchange', this._onSlotChange);
    this._panelSlot.addEventListener('slotchange', this._onSlotChange);
    
  }

  connectedCallback(){
    this.addEventListener('keydown', this._onKeyDown);
    this.addEventListener('click', this._onClick);

    if (!this.hasAttribute('role'))
        this.setAttribute('role', 'tablist');
    
    // For browsers that doesn't support slotchange event.
    Promise.all([
      customElements.whenDefined('cp-tab'),
      customElements.whenDefined('cp-panel'),
    ])
      .then(_ => this._linkPanels());

  }

  disconnectedCallback() {
    this.removeEventListener('keydown', this._onKeyDown);
    this.removeEventListener('click', this._onClick);
  }

  _onSlotChange() {
    this._linkPanels();
  }

  _linkPanels() {
    const tabs = this._allTabs();

    tabs.forEach(tab => {
      console.log(tab)

      const panel = this._panelForTab(tab);

      if (panel.tagName.toLowerCase() !== 'cp-panel') {
        console.error(`Tab #${tab.id} is not should control a <cp-panel>`);
        return;
      }
      // Setting up aria-labelledby attribute for panels
      panel.setAttribute('aria-labelledby', tab.id);
    });

    const selectedTab = tabs.find(tab => tab.selected) || tabs[0];

    this._selectTab(selectedTab);
  }

  _allPanels() {
    return Array.from(this.querySelectorAll('cp-panel'));
  }

  _allTabs() {
    return Array.from(this.querySelectorAll('cp-tab'));
  }

  _panelForTab(tab) {
    const panelId = tab.getAttribute('aria-controls');
    return this.querySelector(`#${panelId}`);
  }

  _prevTab() {
    const tabs = this._allTabs();
    let newIdx = tabs.findIndex(tab => tab.selected) - 1;
    return tabs[(newIdx + tabs.length) % tabs.length];
  }

  _firstTab() {
    const tabs = this._allTabs();
    return tabs[0];
  }

  _lastTab() {
    const tabs = this._allTabs();
    return tabs[tabs.length - 1];
  }

  _nextTab() {
    const tabs = this._allTabs();
    let newIdx = tabs.findIndex(tab => tab.selected) + 1;
    return tabs[newIdx % tabs.length];
  }

  reset() {
    const tabs = this._allTabs();
    const panels = this._allPanels();

    tabs.forEach(tab => tab.selected = false);
    panels.forEach(panel => panel.hidden = true);
  }

  _selectTab(newTab) {
    this.reset();
    const newPanel = this._panelForTab(newTab);
    if (!newPanel)
        throw new Error(`No panel with id ${newPanelId}`);
    newTab.selected = true;
    newPanel.hidden = false;
    newTab.focus();
  }

  // Main function 1: Handles the keyboard actions
  _onKeyDown(event) {

    var orientation = this.getAttribute('aria-orientation');

    if (event.target.getAttribute('role') !== 'tab')
      return;

    if (event.altKey)
      return;

    let newTab;
    switch (event.keyCode) {
      case KEYCODE.LEFT:
        newTab = this._prevTab();
        break;

      case KEYCODE.RIGHT:
        newTab = this._nextTab();
        break;

      case KEYCODE.HOME:
        newTab = this._firstTab();
        break;

      case KEYCODE.END:
        newTab = this._lastTab();
        break;
      // case KEYCODE.TAB:
      //   newTab = this._firstTab();
      //   //console.log(this._selectTab())
      //   const panel = this._panelForTab(newTab);
      //   panel.focus();
      //   break;

      default:
        return;
    }

    event.preventDefault();
    this._selectTab(newTab);
    }

  // Main function 2
  _onClick(event) {
    if (event.target.getAttribute('role') !== 'tab')
      return;
    this._selectTab(event.target);
  }

}

window.customElements.define('cp-tabs', CpTabs);

/*************************************************  
** TAB COMPONENT
**************************************************/
let howtoTabCounter = 0;

class CpTab extends HTMLElement {

  // The attributes that we want to observe
  static get observedAttributes() {
    return ['selected'];
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.setAttribute('role', 'tab');

    // If there is no tab id
    if (!this.id)
      this.id = `cp-tab-generated-${howtoTabCounter++}`;

    this.setAttribute('aria-selected', 'false');
    this.setAttribute('tabindex', -1);
    this._upgradeProperty('selected');
  }

  _upgradeProperty(prop) {
    if (this.hasOwnProperty(prop)) {
      let value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }

  attributeChangedCallback() {
    const value = this.hasAttribute('selected');
    this.setAttribute('aria-selected', value);
    this.setAttribute('tabindex', value ? 0 : -1);
  }

  set selected(value) {
    value = Boolean(value);
    if (value)
      this.setAttribute('selected', '');
    else
      this.removeAttribute('selected');
  }

  get selected() {
    return this.hasAttribute('selected');
  }
}

customElements.define('cp-tab', CpTab);

/*************************************************  
** TAB COMPONENT
**************************************************/
let howtoPanelCounter = 0;

class CpPanel extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.setAttribute('role', 'tabpanel');
    
    // If there is no panel id
    if (!this.id)
      // OPTION 1: 
      // Throw an error because, you can't generate auto id's for panels
      // and match their tabs. 
      throw new Error(`Every panel has be have an ID to match with a tab.`);
      /* OPTION 2 :
      ** Generate if for panels. They will automatically be set for tabs' aria-controls.
      ** this.id = `howto-panel-generated-${howtoPanelCounter++}`;
      */
  }
}
customElements.define('cp-panel', CpPanel);