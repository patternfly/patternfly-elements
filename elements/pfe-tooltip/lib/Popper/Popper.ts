/* eslint-disable no-console */
import { observed } from '@patternfly/pfe-core/decorators.js';
import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { Instance, Placement } from '@popperjs/core';
import { createPopper } from '../createPopper';

export type Position = (
    |'top'
    |'bottom'
    |'left'
    |'right'
)

export abstract class BasePopper extends LitElement {
    @observed
    @property({ reflect: true, type: String }) position? = 'top';

    @observed
    @property({ reflect: true, type: Array }) offset = [0, 15];

    @property({ reflect: true, type: Boolean, attribute: 'is-open' }) isOpen = false;

    private _popper?: Instance;

    get #invoker() {
      return this.shadowRoot?.querySelector('.invoker');
    }

    get #tooltip() {
      return this.shadowRoot?.querySelector('.tooltip');
    }

    show() {
      if (this.#tooltip) {
        this.isOpen = true;

        this.#tooltip.classList.remove('hidden');

        this._popper?.update();
      }
    }

    hide() {
      if (this.#tooltip) {
        this.isOpen = false;

        this.#tooltip.classList.add('hidden');
      }
    }

    abstract render(): ReturnType<LitElement['render']>

    protected override firstUpdated(): void {
      if (this.#invoker && this.#tooltip) {
        this._popper = createPopper(this.#invoker, this.#tooltip as HTMLElement, {
          placement: this.position as Placement,
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: this.offset
              }
            },
            {
              name: 'flip',
              options: {
                fallbackPlacements: ['top', 'right', 'left', 'bottom'],
              },
            }
          ]
        });
      }
    }
}
