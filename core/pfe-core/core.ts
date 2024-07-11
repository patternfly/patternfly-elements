import type { ComplexAttributeConverter } from 'lit';

export type RequireProps<T, Ps extends keyof T> = T & {
  [P in Ps]-?: T[P];
};

function makeConverter<T>(
  f: (x: string, type?: unknown) => T,
): ComplexAttributeConverter<null | T[]> {
  return {
    fromAttribute(value: string) {
      if (typeof value !== 'string') {
        return null;
      } else {
        return value.split(',').map(f);
      }
    },
    toAttribute(value: T[]) {
      return value.join(',');
    },
  };
}

/**
 * A LitElement property converter which represents a list of numbers as a comma separated string
 * @see https://lit.dev/docs/components/properties/#conversion-converter
 */
export const NumberListConverter: ComplexAttributeConverter<number[] | null, unknown> =
  makeConverter(x => parseInt(x?.trim(), 10));

/**
 * A LitElement property converter which represents a list of strings as a comma separated string
 * @see https://lit.dev/docs/components/properties/#conversion-converter
 */
export const StringListConverter: ComplexAttributeConverter<string[] | null, unknown> =
  makeConverter(x => x.trim());

/**
 * A composed, bubbling event for UI interactions
 * e.g. when an accordion panel opens.
 */
export class ComposedEvent extends Event {
  constructor(type: string, init?: EventInit) {
    super(type, {
      bubbles: true,
      composed: true,
      ...init,
    });
  }
}

