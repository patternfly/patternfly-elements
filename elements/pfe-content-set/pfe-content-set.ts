import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

import { pfelement, bound, observed, cascades } from '@patternfly/pfe-core/decorators.js';
import { getRandomId } from '@patternfly/pfe-core/functions/random.js';

import { CascadeController } from '@patternfly/pfe-core/controllers/cascade-controller.js';
import { Logger } from '@patternfly/pfe-core/controllers/logger.js';

import { PfeAccordion } from '@patternfly/pfe-accordion';
import { PfeTabs } from '@patternfly/pfe-tabs';

import '@patternfly/pfe-accordion';
import '@patternfly/pfe-tabs';

import style from './pfe-content-set.scss';

const ACCORDION_TEMPLATE = document.createElement('template');
ACCORDION_TEMPLATE.innerHTML = `
  <pfe-accordion-header content-type="header"></pfe-accordion-header>
  <pfe-accordion-panel content-type="panel"></pfe-accordion-panel>`;

const TABS_TEMPLATE = document.createElement('template');
TABS_TEMPLATE.innerHTML = `
  <pfe-tab content-type="header" slot="tab"></pfe-tab>
  <pfe-tab-panel content-type="panel" slot="panel"></pfe-tab-panel>`;

/**
 * Content set brings together the utilities of the accordion and tabs components.
 * Effectively both of these components do the same job, which is to encapsulate chunks
 * of information under headings for easier browsing.
 * Hiding some information and allowing the user to toggle through the headings to show
 * other bits of information.
 *
 * Since tabs can pose a layout issue on mobile because of the lack of horizontal space,
 * this component will first assess the width of the parent container.
 * If the width of pfe-content-set is less than or equal to 700px, the component will
 * render the content within the `<pfe-accordion>` component. If it is larger than this
 * value, the content will be rendered within the `<pfe-tabs>` component.
 */
@customElement('pfe-content-set') @pfelement()
export class PfeContentSet extends LitElement {
  static readonly styles = [style];

  @query('#container') private container?: HTMLElement;

  private _resizeTimeout?: number;

  private _observer = new MutationObserver(this._mutationHandler);

  private cascade = new CascadeController(this);

  private logger = new Logger(this);

  /** Vertical orientation */
  @cascades('pfe-tabs')
  @property({ type: Boolean, reflect: true }) vertical = false;

  /** Index of the selected tab */
  @cascades('pfe-tabs')
  @property({ type: Number, reflect: true, attribute: 'selected-index' }) selectedIndex?: number;

  /** Tab alignment */
  @cascades('pfe-tabs')
  @property({ type: String, reflect: true, attribute: 'tab-align' }) tabAlign?: 'center';

  /** Variant */
  @cascades('pfe-tabs')
  @property({ type: String, reflect: true }) variant: 'wind'|'earth' = 'wind';

  /** Tab History */
  @cascades('pfe-tabs')
  @property({ type: Boolean, reflect: true, attribute: 'tab-history' }) tabHistory = false;

  /** Disclosure */
  @cascades('pfe-accordion')
  @property({ type: String, reflect: true }) disclosure?: 'true'|'false';

  /** Custom breakpoint */
  @observed
  @property({ type: String, reflect: true }) breakpoint = '700';

  @observed
  @property() align?: 'center';

  get breakpointValue() {
    return parseInt(this.breakpoint.replace(/\D/g, ''));
  }

  /**
   * Getter: should this be rendered as a tabset based on the breakpoint size
   * @returns  Is this a tabset?
   */
  get isTab(): boolean {
    const parent = this.parentNode as HTMLElement;
    return (
        parent ? parent.offsetWidth > this.breakpointValue
      : window.outerWidth > this.breakpointValue
    );
  }

  /**
   * Getter: Alias now for this.view
   * @returns  The rendering component
   */
  get viewAll(): Node|null {
    return this.view;
  }

  /**
   * Getter: Capture the rendering component from the shadow DOM
   * @returns  The rendering component from the shadow DOM
   */
  get view(): HTMLElement|null {
    if (!this.hasUpdated) {
      return null;
    }
    return this.shadowRoot?.querySelector(this.expectedTag) ?? null;
  }

  /**
   * Getter: should this be rendered as a tabset based on the breakpoint size
   * @returns {boolean} Is this a tabset?
   */
  get expectedTag(): string {
    return this.isTab ? 'pfe-tabs' : 'pfe-accordion';
  }

  /**
   * Getter: Capture the tabs component from the _view slot (if it exists)
   * @returns  The tabs component from the _view slot
   */
  get tabs(): Node|null {
    return this.querySelector(`pfe-tabs[slot="_view"]`);
  }

  /**
   * Getter: Capture the accordion component from the _view slot (if it exists)
   * @returns  The accordion component from the _view slot
   */
  get accordion(): Node|null {
    return this.querySelector(`pfe-accordion[slot="_view"]`);
  }

  /**
   * Whether or not this component contains any light DOM.
   */
  hasLightDOM(): boolean {
    return this.children.length > 0 || (this.textContent ?? '').trim().length > 0;
  }

  /**
   * Getter: Validates the incoming light DOM for some usable content
   * @returns  Returns true if some usable light DOM exists
   */
  get hasValidLightDOM(): boolean {
    // If any light DOM exists, validate it meets the requirements for rendering
    if (this.hasLightDOM()) {
      let valid = false;
      // Loop through the assigned nodes
      [...this.children].forEach(node => {
        // Validate that any non-text nodes have the right attributes present
        // They don't have to be in the right order, just that they exist at all lets us progress
        if (
          node.nodeName !== '#text' &&
          (this._isHeader(node) ||
            this._isPanel(node) ||
            (node.tagName && node.tagName.toLowerCase() === this.expectedTag))
        ) {
          valid = true;
        }
      });
      return valid;
    } else {
      return false;
    }
  }

  connectedCallback() {
    super.connectedCallback();

    // Validate that the light DOM data exists before building
    if (this.hasValidLightDOM) {
      this._build();
    }

    window.addEventListener('resize', () => {
      clearTimeout(this._resizeTimeout);
      this._resizeTimeout = window.setTimeout(this._resizeHandler, 100);
    });

    this._observer.observe(this, {
      characterData: false,
      childList: true,
      subtree: false,
    });
  }

  render() {
    return html`
      <div id="container"></div>
    `;
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this._observer.disconnect();

    window.removeEventListener('resize', () => {
      clearTimeout(this._resizeTimeout);
      this._resizeTimeout = window.setTimeout(this._resizeHandler, 100);
    });
  }

  /**
   * Mutation handler
   * Read in and parse the mutation list, rebuilding as necessary
   */
  @bound private _mutationHandler(mutationsList?: MutationRecord[]) {
    if (mutationsList) {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          if (mutation.addedNodes?.length) {
            // Check the added nodes to make sure it's not assigned to the _view slot
            const nodes = mutation.addedNodes;
            if (nodes.length > 0) {
              this._addNodes(nodes);
            }
          }
          if (mutation.removedNodes?.length) {
            // Check the added nodes to make sure it's not assigned to the _view slot
            const nodes = mutation.removedNodes;
            if (nodes.length > 0) {
              this._removeNodes(nodes);
            }
          }
        }
      }

      return;
    }

    // If no mutation list is provided, rebuild the whole thing
    this._build();
  }

  /**
   * Checks if the element provided is a header region
   * @returns  True if the element provided is a header region
   */
  @bound private _isHeader(el: Node|null): el is HTMLElement {
    // Ensure that we don't throw an error if we encounter a web component
    // yet to be defined.
    return (
      el instanceof HTMLElement &&
      (
        el.hasAttribute('pfe-content-set--header') ||
        !!el.tagName.match(/H[1-6]/)
      )
    );
  }

  /**
   * Checks if the element provided is a panel region
   * @returns  True if the element provided is a panel region
   */
  @bound private _isPanel(el: Node|null): el is HTMLElement {
    // Ensure that we don't throw an error if we encounter a web component
    // yet to be defined.
    if (el instanceof Element && typeof el?.previousElementSibling !== 'undefined') {
      return !!this._isHeader(el.previousElementSibling);
    }

    return false;
  }

  /**
   * Reflect the addition of nodes from light DOM into the rendered view
   */
  @bound private _addNodes(list: NodeList) {
    this._build(list);

    // @TODO: Build in some logic for injecting a single node rather than rebuild
    // list.forEach(item => this._addNode(item));
  }

  /**
   * Reflect the removal of nodes from light DOM into the rendered view
   */
  @bound private _removeNodes(list: NodeList) {
    list.forEach(item => this._removeNode(item));

    // If a container doesn't exist, escape now
    if (!this.view) {
      return;
    }

    // Check if the container is empty, hide
    if (!this.view.hasChildNodes()) {
      this.view.setAttribute('hidden', '');
    } else {
      this.view.removeAttribute('hidden');
    }
  }

  /**
   * Find a connection between a node in light DOM that was added or removed
   * and the matching node in the rendered component; this makes upgrades more
   * efficient so we're not rebuilding everything every time.
   * @returns  Returns the node in the rendered component that maps to the light DOM node provided
   */
  @bound private _findConnection(node: Node): Node|null {
    let connection = null;

    if (!this.view) {
      return connection;
    }

    // If this node is mapped to one in the upgraded component
    if (node instanceof Element && node.hasAttribute('slot')) {
      const id = node.getAttribute('slot');
      if (id) {
        connection = this.view.querySelector(`[name="${id}"]`);
      }
      if (!connection) {
        this.logger.warn(`no slot could be found with [name="${id}"]`);
      }
    }

    // Return the connection
    return connection;
  }

  /**
   * Reflect the removal of a node from light DOM into the rendered view
   */
  @bound private _addNode(node: Node) {
    if (!this.view) {
      return;
    }

    // @TODO: Build in some logic for injecting a single node rather than rebuild

    // Fire a full rebuild if it can't determine the mapped element
    this._build();
  }

  /**
   * Reflect the removal of a node from light DOM into the rendered view
   */
  @bound private _removeNode(node: Node) {
    if (!this.view) {
      return;
    }

    const connection = this._findConnection(node);
    if (connection) {
      let header; let panel;
      const el = connection.parentElement as HTMLElement;

      // Look for the sibling element
      if (
        el.getAttribute('content-type') === 'header' &&
        el.nextElementSibling &&
        el.nextElementSibling.getAttribute('content-type') === 'panel'
      ) {
        header = el;
        panel = el.nextElementSibling;
      } else if (
        el.getAttribute('content-type') === 'panel' &&
        el.previousElementSibling &&
        el.previousElementSibling.getAttribute('content-type') === 'header'
      ) {
        header = el.previousElementSibling;
        panel = el;
      }

      // This will remove the sibling element from the
      // shadow template but not the light DOM
      if (header) {
        header.remove();
      }
      if (panel) {
        panel.remove();
      }
    } else
    // Fire a full rebuild if it can't determine the mapped element
    {
      this._build();
    }
  }

  @bound private _updateNode(node: HTMLElement, textContent: string) {
    if (!this.view) {
      return;
    }

    const connection = this._findConnection(node);
    if (connection) {
      if (textContent) {
        connection.textContent = textContent;
      } else if (connection instanceof HTMLElement) {
        connection.innerHTML = node.innerHTML;
      }
    } else
    // Fire a full rebuild if it can't determine the mapped element
    {
      this._build();
    }
  }

  /**
   * Manage the building of the rendering component
   * Optionally accepts the input of new nodes added to the DOM
   */
  @bound private async _build(addedNodes: HTMLCollection|NodeList = this.children) {
    // If sets is not null, build them using the template
    if (addedNodes.length) {
      const template = this.expectedTag === 'pfe-tabs' ? TABS_TEMPLATE : ACCORDION_TEMPLATE;
      const sets = await this._buildSets(addedNodes, template);

      sets.id = this.id || getRandomId();

      if (this.container) {
        this.container.innerHTML = '';
        this.container.appendChild(sets);

        this.cascade.cascadeProperties(addedNodes);
        this.removeAttribute('hidden');
        sets.updateAccessibility();
        await this.updateComplete;
        await sets.updateComplete;
      }
    } else {
      this.setAttribute('hidden', '');
    }
  }

  // TODO: make template a lit template
  @bound private async _buildSets(
    sets: HTMLCollection|NodeList,
    template: HTMLTemplateElement
  ): Promise<PfeAccordion | PfeTabs> {
    const tagElement = document.createElement(this.expectedTag) as PfeAccordion|PfeTabs;

    for (let i = 0; i < sets.length; i = i + 2) {
      const header = sets[i];
      const panel = sets[i + 1];

      // Capture the template markup as a cloned node
      const templateFragment = template.content.cloneNode(true) as DocumentFragment;

      if (!header) {
        this.logger.warn(`no element found at position ${i} of the light DOM input.`);
      }
      if (!panel) {
        this.logger.warn(`no element found at position ${i + 1} of the light DOM input.`);
      }

      if (this._isHeader(header) && this._isPanel(panel)) {
        // Capture the line-item from the template
        [header, panel].forEach((region, idx) => {
          const section = idx === 0 ? 'header' : 'panel';

          const piece = templateFragment.querySelector(`[content-type="${section}"]`)?.cloneNode?.(true);

          if (piece instanceof Element) {
            // Create a new slot for the shadow template and create a random name for it
            const slot = document.createElement('slot');
            slot.name = getRandomId(section);

            // Append the new slot into the template item
            piece.appendChild(slot);

            // Connect the light DOM region to the newly create slot
            region.setAttribute('slot', slot.name);

            // Capture the ID from the region or the pfe-id if they exist
            if (region.id) {
              piece.id = region.id;
            }

            // Attach the template item to the element tag
            tagElement.appendChild(piece);
          }
        });
      }
    }
    return tagElement as PfeTabs|PfeAccordion;
  }

  @bound private _alignChanged(oldVal: this['align'], newVal: this['align']) {
    if (oldVal !== newVal) {
      this.tabAlign = newVal;
    }
  }

  @bound private _resizeHandler() {
    if (!this.view || (this.view?.tagName.toLowerCase() !== this.expectedTag)) {
      this._build();
    }
  }

  @bound protected _breakpointChanged() {
    // If the correct rendering element isn't in use yet, build it from scratch
    if (!this.view || (this.view?.tagName.toLowerCase() !== this.expectedTag)) {
      this._build();
    }
  }

  /**
   * Run the internal build task
   */
  @bound build() {
    // Fire the build of the internals for the new component
    return this._build();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-content-set': PfeContentSet;
  }
}
