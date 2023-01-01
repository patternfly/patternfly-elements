```shell
npm install @patternfly/pfe-accordion@next
```

```jsx
import React from "react";
import "@patternfly/pfe-accordion";

export default function App() {
  const data = [
    { header: "Heading 1", panel: "Here is some content"},
    { header: "Heading 2", panel: "Here is some more content" }
  ];

  return (
    <pfe-accordion>
      {data.map(accordion =>
        <>
          <pfe-accordion-header>
            <h3>{accordion.header}</h3>
          </pfe-accordion-header>
          <pfe-accordion-panel>
            <p>{accordion.panel}</p>
          </pfe-accordion-panel>
        </>
      )}
    </pfe-accordion>
  );
}
```
