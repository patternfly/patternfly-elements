import type { ReactiveController, ReactiveElement } from 'lit';
import type { ContextTheme } from '../core.js';
import type { Context, UnknownContext } from '../context.js';

import { ContextEvent, createContext } from '../context.js';
import { bound } from '../decorators/bound.js';
import { Logger } from './logger.js';

export class ColorContextController implements ReactiveController {
  private callbacks = new Set<ColorContextController['update']>();

  private context: Context<ContextTheme|null>;

  private style: CSSStyleDeclaration;

  private logger: Logger;

  private dispose?: () => void;

  constructor(private host: ReactiveElement, private prefix = 'pfe') {
    this.style = window.getComputedStyle(host);
    this.context = createContext(`${this.prefix}-color-context`, this.contextVariable);
    this.logger = new Logger(host);
    host.addController(this);
  }

  /**
   * When a context-aware component connects:
   * 1. Request Context from the closest context provider (being another context-aware component)
   * 2. Listen for child components' context-request events (become a provider)
   */
  hostConnected() {
    // register as a context consumer on the nearest context-aware ancestor
    this.host.dispatchEvent(new ContextEvent(this.context, this.contextCallback, true));
    // become a context provider
    this.host.addEventListener('context-request', this.onChildContextEvent);
    // 💃 🕺
    this.update();
  }

  /**
   * When a context-aware component disconnects:
   * 1. Remove all the components children from the cache of connected components
   */
  hostDisconnected() {
    this.dispose?.();
    this.dispose = undefined;
    this.callbacks.forEach(x => this.callbacks.delete(x));
  }

  /**
   * On every host update (i.e. render), update the host's and all it's children's context
   */
  hostUpdate() {
    this.update();
  }

  /** Was the context event fired requesting our colour-context context? */
  private isColorContextEvent(
    event: ContextEvent<UnknownContext>
  ): event is ContextEvent<Context<ContextTheme|null>> {
    return event.context.name === `${this.prefix}-color-context`;
  }

  /** Return the current CSS `--context` value, or null */
  private get contextVariable(): ContextTheme | null {
    return this.style.getPropertyValue('--context').trim() as ContextTheme || null;
  }

  /** Register the dispose callback for hosts that requested multiple updates, then update the colour-context */
  @bound private contextCallback(value?: ContextTheme|null, dispose?: () => void) {
    // protect against changing providers
    if (dispose && dispose !== this.dispose)
      this.dispose?.();
    this.update(value);
    this.dispose = dispose;
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
      // Cache the callback for future updates, if requested
      if (event.multiple)
        this.callbacks.add(event.callback);

      // Run the callback to initialize the child's colour-context
      event.callback(this.host.getAttribute('on') as ContextTheme);
    }
  }

  /** Sets the `on` attribute on the host and any children that requested multiple updates */
  @bound public update(fallback?: ContextTheme|null) {
    // NB: We query the existing CSSStyleDeclaration on _every_. _single_. _update_.
    const incoming = this.contextVariable || fallback;
    const current = this.host.getAttribute('on');
    if (incoming !== current) {
      const next = `${incoming ?? null}`;
      this.logger.log(`Resetting context from ${current} to ${next}`);
      this.host.setAttribute('on', next);
      for (const cb of this.callbacks)
        cb(incoming);
    }
  }
}
