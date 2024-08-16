---
"@patternfly/elements": major
---
`<pf-avatar>`: Removed `BaseAvatar` class. Reimplement (recommended) or extend `PfAvatar`.
Renames `AvatarLoadEvent` to `PfAvatarLoadEvent` and moves it to `pf-avatar.js`.

**Before**:

```js
import { AvatarLoadEvent } from '@patternfly/elements/pf-avatar/BaseAvatar.js';

addEventListener('load', function(event) {
  if (event instanceof AvatarLoadEvent) {
    // ...
  }
});
```

**After**:

```js
import { PfAvatarLoadEvent } from '@patternfly/elements/pf-avatar/pf-avatar.js';

addEventListener('load', function(event) {
  if (event instanceof PfAvatarLoadEvent) {
    // ...
  }
});
```
