import type { ReactiveElement } from 'lit';
import type { ColorContextOptions } from '../controllers/color-context.js';

import { ColorContextConsumer, ColorContextProvider } from '../controllers/color-context.js';

export function colorContextProvider<T extends ReactiveElement>(options?: ColorContextOptions) {
  return function(proto: T, _key: string) {
    (proto.constructor as typeof ReactiveElement).addInitializer(instance => {
      // @ts-expect-error: this is strictly for debugging purposes
      instance.__colorContextProvider =
        new ColorContextProvider(instance, options);
    });
  };
}

export function colorContextConsumer<T extends ReactiveElement>(options?: ColorContextOptions) {
  return function(proto: T, _key: string) {
    (proto.constructor as typeof ReactiveElement).addInitializer(instance => {
      // @ts-expect-error: this is strictly for debugging purposes
      instance.__colorContextConsumer =
        new ColorContextConsumer(instance, options);
    });
  };
}
