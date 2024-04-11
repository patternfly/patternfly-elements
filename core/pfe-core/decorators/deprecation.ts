import type { ReactiveElement, PropertyDeclaration, ReactiveController } from 'lit';

import { Logger } from '../controllers/logger.js';

export type DeprecationDeclaration<K extends PropertyKey> = PropertyDeclaration & {
  alias: string & K;
  attribute: string;
};

/**
 * Aliases the decorated field to an existing property, and logs a warning if it is used
 * @example deprecating an attribute
 * ```ts
 * @property({ reflect: true, attribute: 'color-palette'})
 * colorPalette: ColorPalette = 'base';
 *
 * @deprecation('colorPalette') color?: ColorPalette;
 * ```
 */
export function deprecation<K extends PropertyKey>(options: DeprecationDeclaration<K>) {
  return function<T extends ReactiveElement, L extends PropertyKey>(
    proto: Partial<Record<K | L, T>>,
    key: string & keyof T
  ) {
    const { alias, ...deprecationOptions } = options;
    const klass = (proto.constructor as typeof ReactiveElement);
    const declaration = klass.getPropertyOptions(alias);
    klass.createProperty(key, { ...declaration, ...deprecationOptions });
    klass.addInitializer(instance => {
      instance.addController(new Deprecation(instance as T, options, key));
    });
  };
}

class Deprecation<T extends ReactiveElement, K extends PropertyKey> implements ReactiveController {
  private logger: Logger;

  private logged = false;

  constructor(
    private host: T,
    private options: DeprecationDeclaration<K>,
    private deprecatedKey: string & keyof T
  ) {
    this.logger = new Logger(host);
  }

  hostUpdate() {
    const { deprecatedKey, options: { alias } } = this;
    if (this.host[deprecatedKey]) {
      if (this.host[alias as keyof T] !== this.host[deprecatedKey]) {
        if (!this.logged) {
          this.logger.warn(`${deprecatedKey} is deprecated, use ${alias} instead`);
          this.logged = true;
        }
        this.host[alias as keyof T] = this.host[deprecatedKey];
      }
    }
  }
}
