---
"@patternfly/elements": major
---
`<pf-clipboard-copy>`: Removed `BaseClipboardCopy` class.
Reimplement (recommended) or extend `PfClipboardCopy`.
Renames `AvatarLoadEvent` to `PfAvatarLoadEvent` and moves it to `pf-avatar.js`.

**Before**:

```js
import {
  ClipboardCopyCopiedEvent
} from '@patternfly/elements/pf-clipboard-copy/BaseClipboardCopy.js';

addEventListener('copy', function(event) {
  if (event instanceof ClipboardCopyCopiedEvent) {
    // ...
  }
});
```

**After**:

```js
import {
  PfClipboardCopyCopiedEvent
} from '@patternfly/elements/pf-clipboard-copy/pf-clipboard-copy.js';

addEventListener('copy', function(event) {
  if (event instanceof PfClipboardCopyCopiedEvent) {
    // ...
  }
});
```

