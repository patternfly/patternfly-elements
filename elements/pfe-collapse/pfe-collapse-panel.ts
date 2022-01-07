import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { ComposedEvent } from '@patternfly/pfe-core';
import { getRandomId } from '@patternfly/pfe-core/functions/random.js';
import { observed, pfelement } from '@patternfly/pfe-core/decorators.js';
import { pfeEvent } from '@patternfly/pfe-core/functions/pfeEvent.js';

import style from './pfe-collapse-panel.scss';

export { style };

export class AnimationStartEvent extends ComposedEvent {
  constructor(
    /** @summary A reference to the panel which started animating */
    public panel: PfeCollapsePanel,
    /** @summary The state of the panel which started animating */
    public state: 'opening'|'closing'
  ) {
    super('animation-start');
  }
}

export class AnimationEndEvent extends ComposedEvent {
  constructor(
    /** @summary A reference to the panel which finished animating */
    public panel: PfeCollapsePanel,
    /** @summary Whether the panel is open */
    public expanded: boolean
  ) {
    super('animation-end');
  }
}

/**
 * @slot - Add the collapse panel content here.
 * @fires {AnimationStartEvent} animation-start
 *        Fired when `pfe-collapse-panel` begins animating the expansion or collapse
 *        of the panel.
 *
 * @fires {AnimationEndEvent} animation-end
 *        Fired when `pfe-collapse-panel` ends animating the expansion or collapse of the panel.
 */
@customElement('pfe-collapse-panel') @pfelement()
export class PfeCollapsePanel extends LitElement {
  static readonly styles = [style];

  /**
   * Sets and reflects the expanded state of the panel.
   */
  @observed
  @property({ type: Boolean, reflect: true })
    expanded = false;

  /**
   * `animation` can also be added to a `pfe-collapse-panel`.
   *
   * ```html
   * <pfe-collapse-panel animation="false">
   *   ...
   * </pfe-collapse-panel>
   * ```
   */
  @property({ reflect: true }) animation?: 'true'|'false';

  /** Whether or not the component will animate */
  private get animates(): boolean {
    return this.animation !== 'false';
  }

  connectedCallback() {
    super.connectedCallback();
    this.expanded = false;
    this.id ||= getRandomId('pfe-collapse-panel');
  }

  render() {
    return html`
      <slot></slot>
    `;
  }

  protected _expandedChanged(oldVal: boolean, newVal: boolean) {
    if (newVal) {
      this._maybeAnimate('opening');
    } else if (oldVal) {
      this._maybeAnimate('closing');
    }
  }

  private async _maybeAnimate(state: 'opening'|'closing') {
    if (this.animates) {
      if (state === 'opening') {
        await this.updateComplete;
      }

      const { height } = this.getBoundingClientRect();

      this._fireAnimationEvent(state);

      const args: [number, number] = [0, height];
      if (state === 'closing') {
        args.reverse();
      }
      this._animate(...args);
    }
  }

  private _animate(start: number, end: number) {
    this.classList.add('animating');
    this.style.height = `${start}px`;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.style.height = `${end}px`;
        this.classList.add('animating');
        this.addEventListener('transitionend', this._transitionEndHandler, { once: true });
      });
    });
  }

  private _transitionEndHandler(event: TransitionEvent) {
    const target = event.target as HTMLElement;
    target.style.height = '';
    target.classList.remove('animating');

    const panel = this; // eslint-disable-line @typescript-eslint/no-this-alias
    const { expanded } = this;
    /**
     * @deprecated use animation-end
     * @fires pfe-collapse-panel:animation-end
     */
    this.dispatchEvent(pfeEvent('pfe-collapse-panel:animation-end', { expanded, panel }));
    this.dispatchEvent(new AnimationEndEvent(this, expanded));
  }

  private _fireAnimationEvent(state: 'opening'|'closing') {
    /**
     * @deprecated use animation-start
     * @fires pfe-collapse-panel:animation-start
     */
    this.dispatchEvent(pfeEvent('pfe-collapse-panel:animation-start', { state, panel: this }));
    this.dispatchEvent(new AnimationStartEvent(this, state));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-collapse-panel': PfeCollapsePanel;
  }
}
