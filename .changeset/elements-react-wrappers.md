---
"@patternfly/elements": minor
---
PatternFly elements are now available wrapped in React components. While it was 
always possible to use PatternFly elements (or any other custom elements) in 
React apps, this release makes it easier to integrate them into React without 
the need for cumbersome workarounds to React's [poor HTML and DOM support][cee].

Before:

```jsx
import { useEffect, useState, useRef } from 'react';
import '@patternfly/elements/pf-switch/pf-switch.js'

function App () {
  const [checked, setChecked] = useState(false);
  const switchRef = useRef(null);
  useEffect(() => {
    switchRef.current.checked = checked;
  }, [switchRef.current, checked]);
  useEffect(() => {
    switchRef.current.addEventListener('change', () =>
      setChecked(switchRef.current.checked));
  }, [switchRef.current]);
  return (
    <>
      <pf-switch ref={switchRef}></pf-switch>
    </>
  );
}
```

After:

```jsx
import { useState } from 'react';
import { Switch } from '@patternfly/elements/react/pf-switch/pf-switch.js';

function App () {
  const [checked, setChecked] = useState(false);
  return (
    <>
      <Switch checked={checked}
              onChange={({ target }) =>
                setChecked(target.checked)}/>
    </>
  );
}
```

[cee]: https://custom-elements-everywhere.com/#react
