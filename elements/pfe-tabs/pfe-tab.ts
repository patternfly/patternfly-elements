import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

import { pfelement, bound, observed, initializer } from '@patternfly/pfe-core/decorators.js';
import { getRandomId } from '@patternfly/pfe-core/functions/random.js';
import { Logger } from '@patternfly/pfe-core/controllers/logger.js';

import style from './pfe-tab.scss';

function isSlotElement(el?: Node|null): el is HTMLSlotElement {
  return el instanceof HTMLElement && el.tagName === 'SLOT';
}

/**
 * @slot - Add the heading for your tab here.
 */
@customElement('pfe-tab') @pfelement()
export class PfeTab extends LitElement {
  static readonly styles = [style];

  /** If the tab is selected */
  @observed
  @property({ reflect: true, attribute: 'aria-selected' })
  selected: 'true'|'false' = 'false';

  /** Connected panel ID */
  @property({ reflect: true, attribute: 'aria-controls' }) controls?: string;

  /** Variant */
  @property({ reflect: true }) variant: 'wind'|'earth' = 'wind';

  /** @deprecated `tabIndex` property reflects per spec */
  get tabindex() { return this.tabIndex; }
  set tabindex(v: number) { this.tabIndex = v; }

  @query('#tab') private _tabItem?: HTMLElement;

  private logger = new Logger(this);

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'tab'); // override user role
  }

  render() {
    return html`
      <span id="tab"></span>
    `;
  }

  protected _selectedChanged() {
    this.tabIndex = this.selected === 'true' ? 0 : -1;
  }

  @initializer({ observe: { characterData: true, childList: true, subtree: true } })
  protected _init() {
    // Copy the tab content into the template
    this._setTabContent();

    // If an ID is not defined, generate a random one
    this.id ||= getRandomId();
  }

  @bound private _getTabElement(): Element|void {
    // Check if there is no nested element or nested textNodes
    if (!this.firstElementChild && !this.firstChild) {
      this.logger.warn(`No tab content provided`);
      return;
    }

    if (this.firstElementChild && this.firstElementChild.tagName) {
      // If the first element is a slot, query for it's content
      if (isSlotElement(this.firstElementChild)) {
        const slotted = this.firstElementChild.assignedElements();
        // If there is no content inside the slot, return empty with a warning
        if (slotted.length === 0) {
          this.logger.warn(`No heading information exists within this slot.`);
          return;
        }
        // If there is more than 1 element in the slot, capture the first h-tag
        if (slotted.length > 1) this.logger.warn(`Tab heading currently only supports 1 heading tag.`);
        const htags =
          slotted.filter(slot => slot.tagName.match(/^H[1-6]/) || slot.tagName === 'P');
        if (htags.length > 0) return htags[0];
        else return;
      } else if (
        this.firstElementChild.tagName.match(/^H[1-6]/) ||
        this.firstElementChild.tagName === 'P'
      )
        return this.firstElementChild;
      else
        this.logger.warn(`Tab heading should contain at least 1 heading tag for correct semantics.`);
    }

    return;
  }

  @bound private async _setTabContent() {
    await this.updateComplete;
    let label = '';
    let semantics = 'h3';

    const tabElement = this._getTabElement();
    if (tabElement) {
      // Copy the tab content into the template
      label = tabElement?.textContent?.trim().replace(/\s+/g, ' ') ?? '';
      semantics = tabElement.tagName.toLowerCase();
    }

    if (!tabElement) {
      // If no element is found, try for a text node
      if (this.textContent?.trim().replace(/\s+/g, ' '))
        label = this.textContent.trim().replace(/\s+/g, ' ');
    }

    if (!label) {
      this.logger.warn(`There does not appear to be any content in the tab region.`);
      return;
    }

    // Create an h-level tag for the shadow tab, default h3
    // or use the provided semantics from light DOM
    const heading = document.createElement(semantics);

    // Assign the label content to the new heading
    heading.textContent = label;

    // Attach the heading to the tabItem
    if (this._tabItem) {
      this._tabItem.innerHTML = '';
      this._tabItem.appendChild(heading);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-tab': PfeTab;
  }
}
