import type { ReactiveController } from 'lit';
import type { Context, ContextCallback, UnknownContext } from '../context.js';

import { ReactiveElement } from 'lit';
import { ContextEvent, createContext } from '../context.js';
import { bound } from '../decorators/bound.js';
import { Logger } from './logger.js';
import { StyleController } from './style-controller.js';

import CONTEXT_BASE_STYLES from './color-context.css';

/**
 * A `ColorPalette` is a collection of specific color values
 * Choosing a palette sets both color properties and, if the component is a context provider,
 * implies a color theme for descendents.
 *
 * `ColorPalette` is associated with the `color-palette` attribute
 */
export type ColorPalette = (
  | 'base'
  | 'accent'
  | 'complement'
  | 'lighter'
  | 'lightest'
  | 'darker'
  | 'darkest'
);

/**
 * A Color theme is a context-specific restriction on the available color palettes
 *
 * `ColorTheme` is associated with the `on` attribute and the `--context` css property
 */
export type ColorTheme = (
  | 'dark'
  | 'light'
  | 'saturated'
);

export interface ColorContextOptions {
  prefix?: string;
  attribute?: string;
}

/**
* Maps from consumer host elements to already-fired request events
* We hold these in memory in order to re-fire the events every time a new provider connects.
* This is a hedge against cases where an early-upgrading provider claims an early-upgrading
* consumer before a late-upgrading provider has a chance to register as the rightful provider
* @example Monkey-in-the-middle error
*          In this example, we must re-fire the event from eager-consumer when late-provider
*          upgrades, so as to ensure that late-provider claims it for itself
*          ```html
*          <early-provider>
*            <late-provider>
*              <eager-consumer>
*            </late-provider>
*          </early-provider>
*          ```
*/
const contextEvents = new Map<ReactiveElement, ContextEvent<UnknownContext>>();

/**
 * Color context is derived from the `--context` css custom property,
 * which can be set by the `on` attribute, but *must* be set by the `color-palette` attribute
 * This property is set (in most cases) in `color-context.css`,
 * which is added to components via `StyleController`.
 *
 * In this way, we avoid the need to execute javascript in order to convert from a given
 * `ColorPalette` to a given `ColorTheme`, since those relationships are specified in CSS.
 */
abstract class ColorContextController implements ReactiveController {
  abstract update(next: ColorTheme | null): void;

  protected abstract attribute: string;

  /** The context object which describes the host's colour context */
  protected context: Context<ColorTheme|null>;

  /** The style controller which provides the necessary CSS. */
  protected styleController: StyleController;

  /** Prefix for colour context. Set this in Options to create a separate context */
  protected prefix = 'pfe-';

  /** The last-known color context on the host */
  protected last: ColorTheme|null = null;

  protected logger: Logger;

  hostUpdate?(): void

  constructor(protected host: ReactiveElement, options?: ColorContextOptions) {
    this.prefix = options?.prefix ?? 'pfe-';
    this.context = createContext(`${this.prefix}-color-context`);
    this.logger = new Logger(host);
    this.styleController = new StyleController(host, CONTEXT_BASE_STYLES);
    host.addController(this as ReactiveController);
  }
}

/**
 * `ColorContextProvider` is responsible to derive a context value from CSS and provide it to its
 * descendents.
 */
export class ColorContextProvider extends ColorContextController implements ReactiveController {
  protected attribute: string;

  /** Cache of context callbacks. Call each to update consumers */
  private callbacks = new Set<ContextCallback<ColorTheme|null>>();

  /** Mutation observer which updates consumers when `on` or `color-palette` attributes change. */
  private mo = new MutationObserver(() => this.update(this.contextVariable));

  /**
   * Cached (live) computed style declaration
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle
   */
  protected style: CSSStyleDeclaration;

  /** Return the current CSS `--context` value, or null */
  protected get contextVariable(): ColorTheme | null {
    return this.style.getPropertyValue('--context').trim() as ColorTheme || null;
  }

  constructor(host: ReactiveElement, options?: ColorContextOptions) {
    super(host, options);
    this.style = window.getComputedStyle(host);
    this.attribute = options?.attribute ?? 'color-palette';
  }

  /**
   * When a context provider connects, it listens for context-request events
   * it also fires all previously fired context-request events from their hosts,
   * in case this context provider upgraded after and is closer to a given consumer.
   */
  hostConnected() {
    this.host.addEventListener('context-request', this.onChildContextEvent);
    this.mo.observe(this.host, { attributes: true, attributeFilter: [this.attribute, 'on'] });
    this.update(this.contextVariable);
    for (const [host, fired] of contextEvents) {
      host.dispatchEvent(fired);
    }
  }

  /**
   * When a context provider disconnects, it disconnects its mutation observer
   */
  hostDisconnected() {
    this.callbacks.forEach(x => this.callbacks.delete(x));
    this.mo.disconnect();
  }

  /** Was the context event fired requesting our colour-context context? */
  private isColorContextEvent(
    event: ContextEvent<UnknownContext>
  ): event is ContextEvent<Context<ColorTheme|null>> {
    return (
      event.target !== this.host &&
      event.context.name === `${this.prefix}-color-context`
    );
  }

  /**
   * Provider part of context API
   * When a child connects, claim its context-request event
   * and add its callback to the Set of children if it requests multiple updates
   */
  @bound private onChildContextEvent(event: ContextEvent<UnknownContext>) {
    // only handle ContextEvents relevant to colour context
    if (this.isColorContextEvent(event)) {
      // claim the context-request event for ourselves (required by context protocol)
      event.stopPropagation();

      // Run the callback to initialize the child's colour-context
      event.callback(this.contextVariable);

      // Cache the callback for future updates, if requested
      if (event.multiple) {
        this.callbacks.add(event.callback);
      }
    }
  }

  /** Sets the `on` attribute on the host and any children that requested multiple updates */
  @bound public update(next: ColorTheme | null) {
    for (const cb of this.callbacks) {
      cb(next);
    }
  }
}

/**
 * A color context consumer receives sets it's `on` attribute based on the context provided
 * by the closes color context provider.
 * The consumer has no direct access to the context, it must receive it from the provider.
 */
export class ColorContextConsumer extends ColorContextController implements ReactiveController {
  protected attribute: string;

  private dispose?: () => void;

  private override: ColorTheme | null = null;

  constructor(host: ReactiveElement, options?: ColorContextOptions) {
    super(host, options);
    this.attribute ??= 'on';
  }

  /**
   * When a color context consumer connects,
   * it requests colour context from the closest context provider,
   * then updates it's host's `on` attribute
   */
  hostConnected() {
    const event = new ContextEvent(this.context, this.contextCallback, true);
    this.override = this.host.getAttribute(this.attribute) as ColorTheme;
    this.host.dispatchEvent(event);
    contextEvents.set(this.host, event);
  }

  /**
   * When a color context consumer disconnects,
   * it removes itself from the collection of components which request color context
   * then updates it's host's `on` attribute
   */
  hostDisconnected() {
    this.dispose?.();
    this.dispose = undefined;
    contextEvents.delete(this.host);
  }

  /** Register the dispose callback for hosts that requested multiple updates, then update the colour-context */
  @bound private contextCallback(value: ColorTheme|null, dispose?: () => void) {
    // protect against changing providers
    if (dispose && dispose !== this.dispose) {
      this.dispose?.();
      this.dispose = dispose;
    }
    this.update(value);
  }

  /** Sets the `on` attribute on the host and any children that requested multiple updates */
  @bound public update(next: ColorTheme|null) {
    if (!this.override && next !== this.last) {
      this.last = next;
      this.logger.log(`setting context from ${this.host.getAttribute(this.attribute)} to ${next}`);
      if (next == null) {
        this.host.removeAttribute(this.attribute);
      } else {
        this.host.setAttribute(this.attribute, next);
      }
    }
  }
}

