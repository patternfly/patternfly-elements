import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { ComposedEvent } from '@patternfly/pfe-core';
import { pfelement, bound, observed, initializer } from '@patternfly/pfe-core/decorators.js';
import { pfeEvent } from '@patternfly/pfe-core/functions/pfeEvent.js';
import { Logger } from '@patternfly/pfe-core/controllers/logger.js';

// @TODO This needs a click handler for if the accordion is stuck to the top
// and the user clicks outside the accordion element (should close accordion).

export class PanelContentChangeEvent extends ComposedEvent {
  constructor() {
    super('content-change');
  }
}

/**
 * @fires {PanelContentChangeEvent} content-change - when panel contents changes.
 *
 * @fires {CustomEvent<{}>} pfe-jump-links-panel:change - when panel contents changes. {@deprecated Use `content-change`}
 *
 * @slot - Panel content
 */
@customElement('pfe-jump-links-panel') @pfelement()
export class PfeJumpLinksPanel extends LitElement {
  static readonly version = '{{version}}';

  static instances = new Set<PfeJumpLinksPanel>();

  private logger = new Logger(this);

  /** Offset */
  @property({ type: Number }) offset?: number;

  /** Scroll target */
  // NB: attribute is `scrolltarget` - NOT `scroll-target`
  @property({ reflect: true }) scrolltarget?: string;

  /** Inject spacers */
  @observed @property({ type: Boolean, reflect: true }) spacers = false;

  /**
   * @param {NodeList} Returns all elements from the panel's light DOM with the class .pfe-jump-links-panel__section
   */
  get sections() {
    return this.querySelectorAll('.pfe-jump-links-panel__section');
  }

  render() {
    return html`
      <slot></slot>
    `;
  }

  @bound private _isValidMarkup() {
    if ([...this.sections].length === 0) {
      this.logger.warn(
        `This panel does not contain any headings labeled with the pfe-jump-links-panel__section class.`,
        `Please add that class and an ID to any heading you would like surfaced in the jump links navigation.`
      );
    }
  }

  @bound private _spacersChanged() {
    if (!this.spacers) {
      return;
    }
    if (!this.sections || [...this.sections].length <= 0) {
      return;
    }

    [...this.sections].forEach(section => {
      const parentEl = section.parentNode;
      let spacer = section.previousElementSibling as HTMLElement;

      // If the previous element is not a spacer, create one
      if (!spacer || !spacer.classList.contains('pfe-jump-links__section--spacer')) {
        spacer = document.createElement('div');
        spacer.classList.add('pfe-jump-links__section--spacer');
        parentEl?.insertBefore(spacer, section);
      }

      // Move the ID from the section to the spacer
      if (section.id && (!spacer.id || spacer.id !== section.id)) {
        spacer.id = section.id;
        section.removeAttribute('id');
        section.setAttribute('data-target', spacer.id);
      }

      spacer.style.marginTop = `calc(-1 * (var(--pfe-navigation--Height--actual, 0px) + var(--pfe-jump-links--Height--actual, 0px)))`;
      spacer.style.height = `calc(var(--pfe-navigation--Height--actual, 0px) + var(--pfe-jump-links--Height--actual, 0px))`;
    });
  }

  @initializer({ observe: { childList: true, subtree: true } })
  protected _init(records: MutationRecord[]) {
    PfeJumpLinksPanel.instances.add(this);
    // When called by the mutation observer from `@initializer`
    // Emit an event indicating a change to the panel
    if (records) {
      this.dispatchEvent(new PanelContentChangeEvent());
      this.dispatchEvent(pfeEvent('pfe-jump-links-panel:change'));
    }

    // Validate and throw warnings about improper markup
    this._isValidMarkup();

    // Adding spacers to the panel is opt-in
    // note: this was because determining the scroll-to point
    // was easier with the scroll animation than working through
    // cross-browser support for smooth scroll CSS (looking at Safari)
    this._spacersChanged();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    PfeJumpLinksPanel.instances.delete(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-jump-links-panel': PfeJumpLinksPanel;
  }
}
