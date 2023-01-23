```shell
npm install @patternfly/elements
```

```jsx
import React from "react";
import "@patternfly/elements/pf-accordion/pf-accordion.js";

export default function App() {
  const data = [
    { header: "Heading 1", panel: "Here is some content"},
    { header: "Heading 2", panel: "Here is some more content" }
  ];

  return (
    <pf-accordion>{data.map(({ header, panel }) => (
      <pf-accordion-header>
        <h3>{header}</h3>
      </pf-accordion-header>
      <pf-accordion-panel>
        <p>{panel}</p>
      </pf-accordion-panel>))}
    </pf-accordion>
  );
}
```
