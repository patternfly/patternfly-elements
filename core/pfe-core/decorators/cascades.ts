import type { ReactiveElement } from 'lit';

import { CascadeController } from '../controllers/cascade-controller.js';

/**
 * Cascades the decorated attribute to children
 * @deprecated: use context, especially via `@patternfly/pfe-core/functions/context.js`;
 */
export function cascades<T extends ReactiveElement>(...items: string[]): PropertyDecorator {
  return function(proto: T, key: string & keyof T) {
    (proto.constructor as typeof ReactiveElement).addInitializer(x => {
      const instance = x as ReactiveElement;
      // You can have multiple `@cascades` decorators on an element
      // and it will only get one CascadeController for all of them
      if (!CascadeController.instances.has(instance)) {
        CascadeController.instances.set(instance, new CascadeController(instance));
      }

      CascadeController.instances.get(instance)?.initProp(key, items);
    });
  } as PropertyDecorator;
}
