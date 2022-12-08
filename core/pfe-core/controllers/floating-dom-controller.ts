import { computePosition, shift, arrow, offset, autoUpdate } from '@floating-ui/dom';
import type { Placement } from '@floating-ui/dom';
import type { ReactiveController, ReactiveElement } from 'lit';

/**
 * Controls floating DOM within a web component, e.g. tooltips and popovers
 */
export class FloatingDOMController implements ReactiveController {
  #open = false;
  #initialized = false;
  #cleanup?: () => void;
  #calcPosition = true;

  /**
   * When true, the floating DOM is visible
   */
  get open() {
    return this.#open;
  }

  set open(value: boolean) {
    this.#open = value;

    this.host.requestUpdate();
  }

  get initialized() {
    return this.#initialized;
  }

  set initialized(v: boolean) {
    this.#initialized = v; this.host.requestUpdate();
  }

  get cleanup() {
    return this.#cleanup;
  }

  set cleanup(v: any) {
    this.#cleanup = v;
    this.host.requestUpdate();
  }

  get calcPosition() {
    return this.#calcPosition;
  }

  set calcPosition(v: any) {
    this.#calcPosition = v;
    this.host.requestUpdate();
  }

  setAutoUpdate(invoker: Element, content: HTMLElement) {
    if (!this.cleanup) {
      this.cleanup = autoUpdate(
        invoker,
        content,
        () => {
          if (!this.calcPosition) {
            this.calcPosition = true;
          }
        }
      );
    }
  }

  removeAutoUpdate() {
    if (this.#cleanup) {
      this.#cleanup();
    }
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

  computeElementPosition(invoker: Element, content: HTMLElement, arrowElement: HTMLElement, providedPlacement: Placement = 'left', offsetNumbers?: number[]) {
    if (invoker && content) {
      computePosition(invoker!, content, {
        strategy: 'absolute',
        placement: providedPlacement,
        middleware: [
          offset(offsetNumbers ? offsetNumbers[0] : 0),
          shift(),
          arrow({
            element: arrowElement
          }),
        ]
      }).then(({ x, y, placement, middlewareData }) => {
        Object.assign(content!.style, {
          top: `${y}px`,
          left: `${x}px`,
        });

        if (middlewareData.arrow) {
          const { y: arrowY, x: arrowX } = middlewareData.arrow;

          // @ts-ignore
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
      this.calcPosition = false;
    }
    this.initialized ||= true;
  }

  /** Initialize the floating DOM */
  create(invoker: Element, content: HTMLElement, arrowElement: HTMLElement, providedPlacement: any = 'left', offsetNumbers?: number[]): void {
    if (invoker && content) {
      this.setAutoUpdate(invoker, content);
      this.computeElementPosition(invoker, content, arrowElement, providedPlacement, offsetNumbers);
    }
  }
}
