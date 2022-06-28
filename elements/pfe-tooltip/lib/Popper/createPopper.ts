import { popperGenerator } from '@popperjs/core';

import { eventListeners, popperOffsets, computeStyles, applyStyles, offset, flip, preventOverflow, arrow, hide } from '@popperjs/core';
export const createPopper = popperGenerator({
  defaultModifiers: [eventListeners, popperOffsets, computeStyles, applyStyles, offset, flip, preventOverflow, arrow, hide],
});
