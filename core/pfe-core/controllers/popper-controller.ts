import { ReactiveController, ReactiveElement } from 'lit';
import { Placement, popperGenerator, eventListeners, popperOffsets, computeStyles, applyStyles, offset, flip, preventOverflow, arrow, hide, Instance } from '@popperjs/core';
import { Logger } from './logger.js';

export const createPopper = popperGenerator({
  defaultModifiers: [eventListeners, popperOffsets, computeStyles, applyStyles, offset, flip, preventOverflow, arrow, hide],
});


export class TooltipDOMController implements ReactiveController {
  #open = false;

  getOpen(): boolean {
    return this.#open;
  }

  #setOpen(isOpen: boolean) {
    this.#open = isOpen;
  }

  private popper: Instance | undefined;

  private logger: Logger;

  constructor(private host: ReactiveElement) {
    this.logger = new Logger(this.host);
    host.addController(this);
  }

  hostConnected(): void {
    this.logger.log('popper controller - host connected');
  }

  show(): void {
    this.#setOpen(true);
    this.popper?.update();
    this.host.requestUpdate();
  }

  hide(): void {
    this.#setOpen(false);
    this.host.requestUpdate();
  }

  create(invoker: Element, tooltip: HTMLElement, placement: Placement, offset?: Array<number>): void {
    this.popper = createPopper(invoker, tooltip, {
      placement,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset
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
