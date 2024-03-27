import type { ReactiveController, ReactiveControllerHost } from 'lit';

export class Logger implements ReactiveController {
  private static logDebug: boolean;

  private static instances: WeakMap<ReactiveControllerHost, Logger> = new WeakMap();

  private get prefix() {
    if (this.host instanceof HTMLElement) {
      return `[${this.host.localName}${this.host.id ? `#${this.host.id}` : ''}]`;
    } else {
      return `[${this.host.constructor.name}]`;
    }
  }

  /**
   * A boolean value that indicates if the logging should be printed to the console; used for debugging.
   * For use in a JS file or script tag; can also be added in the constructor of a component during development.
   * @example Logger.debugLog(true);
   * @tags debug
   */
  static debugLog(preference = null) {
    // wrap localStorage references in a try/catch; merely referencing it can
    // throw errors in some locked down environments
    try {
      if (preference !== null) {
        Logger.logDebug = !!preference;
        localStorage.pfeLog = !!preference;
      }
      return localStorage.pfeLog === 'true';
    } catch (e) {
      return Logger.logDebug;
    }
  }

  /* eslint-disable no-console */

  /**
   * A logging wrapper which checks the debugLog boolean and prints to the console if true.
   *
   * @example Logger.debug("Hello");
   */
  static debug(...msgs: unknown[]) {
    if (Logger.debugLog()) {
      console.debug(...msgs);
    }
  }

  /**
   * A logging wrapper which checks the debugLog boolean and prints to the console if true.
   *
   * @example Logger.info("Hello");
   */
  static info(...msgs: unknown[]) {
    if (Logger.debugLog()) {
      console.info(...msgs);
    }
  }

  /**
   * A logging wrapper which checks the debugLog boolean and prints to the console if true.
   *
     * @example Logger.log("Hello");
   */
  static log(...msgs: unknown[]) {
    if (Logger.debugLog()) {
      console.log(...msgs);
    }
  }

  /**
   * A console warning wrapper which formats your output with useful debugging information.
   *
   * @example Logger.warn("Hello");
   */
  static warn(...msgs: unknown[]) {
    console.warn(...msgs);
  }

  /**
   * A console error wrapper which formats your output with useful debugging information.
   * For use inside a component's function.
   * @example Logger.error("Hello");
   */
  static error(...msgs: unknown[]) {
    console.error([...msgs].join(' '));
  }

  /* eslint-enable no-console */

  /**
   * Debug logging that outputs the tag name as a prefix automatically
   *
   * @example this.logger.log("Hello");
   */
  debug(...msgs: unknown[]) {
    Logger.debug(this.prefix, ...msgs);
  }

  /**
   * Info logging that outputs the tag name as a prefix automatically
   *
   * @example this.logger.log("Hello");
   */
  info(...msgs: unknown[]) {
    Logger.info(this.prefix, ...msgs);
  }

  /**
   * Local logging that outputs the tag name as a prefix automatically
   *
   * @example this.logger.log("Hello");
   */
  log(...msgs: unknown[]) {
    Logger.log(this.prefix, ...msgs);
  }

  /**
   * Local warning wrapper that outputs the tag name as a prefix automatically.
   * For use inside a component's function.
   * @example this.logger.warn("Hello");
   */
  warn(...msgs: unknown[]) {
    Logger.warn(this.prefix, ...msgs);
  }

  /**
   * Local error wrapper that outputs the tag name as a prefix automatically.
   * For use inside a component's function.
   * @example this.logger.error("Hello");
   */
  error(...msgs: unknown[]) {
    Logger.error(this.prefix, ...msgs);
  }

  constructor(private host: ReactiveControllerHost) {
    // We only need one logger instance per host
    if (Logger.instances.get(host)) {
      return Logger.instances.get(host) as Logger;
    }
    host.addController(this);
    Logger.instances.set(host, this);
  }

  hostConnected() {
    this.debug('connected');
  }
}
