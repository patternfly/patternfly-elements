import { computePosition, Placement, shift, arrow } from '@floating-ui/dom';
import type { ReactiveController, ReactiveElement } from 'lit';

/**
 * Controls floating DOM within a web component, e.g. tooltips and popovers
 */
export class FloatingDOMController implements ReactiveController {
  #open = false;

  #popper: undefined;

  #initialized = false;

  get initialized() {
    return this.#initialized;
  }

  set initialized(v: boolean) {
    this.#initialized = v; this.host.requestUpdate();
  }

  /**
   * When true, the floating DOM is visible
   */
  get open() {
    return this.#open;
  }

  set open(value: boolean) {
    this.#open = value;
    // if (value) {
    //   this.#popper?.update();
    // }
    this.host.requestUpdate();
  }

  constructor(private host: ReactiveElement) {
    host.addController(this);
  }

  hostConnected?(): void;

  /** Show the floating DOM */
  show(): void {
    this.open = true;
  }

  /** Hide the floating DOM */
  hide(): void {
    this.open = false;
  }

  /** Initialize the floating DOM */
  create(invoker: Element, content: HTMLElement, arrowElement: HTMLElement, placement: Placement = 'left', offsetNumbers?: number[]): void {
    if (invoker && content) {
      computePosition(invoker!, content, {
        strategy: 'absolute',
        placement,
        middleware: [
          // offset(offsetNumbers !== undefined ? offsetNumbers[0] : [0]),
          shift(),
          arrow({
            element: arrowElement
          }),
        ]
      }).then(({ x, y, middlewareData }) => {
        Object.assign(content!.style, {
          top: `${y}px`,
          left: `${x}px`,
        });

        if (middlewareData.arrow) {
          const { y: arrowY, x: arrowX } = middlewareData.arrow;

          let staticSide = {
            top: 'bottom',
            right: 'left',
            bottom: 'top',
            left: 'right',
          }[placement.split('-')[0]];

          if (staticSide === undefined) {
            staticSide = 'left';
          }

          Object.assign(arrowElement!.style, {
            left: arrowX != null ? `${arrowX}px` : '',
            top: arrowY != null ? `${arrowY}px` : '',
            right: '',
            bottom: '',
            [staticSide]: '-4px',
          });
        }
      });
      this.initialized ||= true;
    }
  }
}
