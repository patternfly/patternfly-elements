```shell
npm install @patternfly/elements
```

```jsx
import React from "react";
import "@patternfly/elements/pfe-accordion/pfe-accordion.js";

export default function App() {
  const data = [
    { header: "Heading 1", panel: "Here is some content"},
    { header: "Heading 2", panel: "Here is some more content" }
  ];

  return (
    <pfe-accordion>{data.map(({ header, panel }) => (
      <pfe-accordion-header>
        <h3>{header}</h3>
      </pfe-accordion-header>
      <pfe-accordion-panel>
        <p>{panel}</p>
      </pfe-accordion-panel>))}
    </pfe-accordion>
  );
}
```
