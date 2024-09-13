import type { Constructor } from '@lit/reactive-element/decorators/base.js';
import type { CustomElementDecorator } from '@lit/reactive-element/decorators/custom-element.js';

/**
 * Allow for custom element classes with private constructors
 */
type CustomElementClass = Omit<typeof HTMLElement, 'new'>;

/**
 * Helper to define a custom element with gracefull error
 * handling for duplicate definition.
 */
function defineElement(tagName: string, classOrTarget: CustomElementConstructor) {
  try {
    customElements.define(
      tagName,
      classOrTarget
    );
  } catch (e) {
    if (e instanceof Error) {
      if (e.message.includes('has already been used with this registry')) {
        console.warn(`Duplicate definition for [${tagName}].`, e);
        return;
      }
    }
    throw e;
  }
}

/**
 * Class decorator factory that defines the decorated class as a custom element.
 * Allows duplicate custom element definitions to fail gracefully with a console
 * warn rather than an unhandled error for duplicate definitions.
 *
 *
 * ```js
 * @customElement('my-element')
 * class MyElement extends LitElement {
 *   render() {
 *     return html``;
 *   }
 * }
 * ```
 * @category Decorator
 * @param tagName The tag name of the custom element to define.
 */
export const customElement =
  (tagName: string): CustomElementDecorator =>
    (
      classOrTarget: CustomElementClass | Constructor<HTMLElement>,
      context?: ClassDecoratorContext<Constructor<HTMLElement>>
    ) => {
      if (context !== undefined) {
        context.addInitializer(() => {
          defineElement(tagName, classOrTarget as CustomElementConstructor);
        });
      } else {
        defineElement(tagName, classOrTarget as CustomElementConstructor);
      }
    };

