import type { ElementPart } from 'lit';
import type { PartInfo, ElementPartInfo } from 'lit/directive.js';

import { noChange, nothing } from 'lit';
import { directive, Directive, PartType } from 'lit/directive.js';

/**
 * Conditionally exclude an element from the DOM
 * In most cases, ternary operator should be preferred.
 */
export const when = directive(class WhenDirective extends Directive {
  partInfo: ElementPartInfo;

  constructor(partInfo: PartInfo) {
    super(partInfo);
    if (partInfo.type !== PartType.ELEMENT) {
      throw new Error('The `conditional` directive must be used in element position');
    } else {
      this.partInfo = partInfo;
    }
  }

  render(condition: boolean): typeof noChange|typeof nothing {
    return !condition ? nothing : noChange;
  }

  update(part: ElementPart, [condition]: [boolean]) {
    if (!condition) {
      part.element.remove();
    }
    return noChange;
  }
});
