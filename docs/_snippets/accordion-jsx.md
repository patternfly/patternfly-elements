```jsx
import React from "react";
import "@patternfly/elements/pf-accordion/pf-accordion.js";

export default function App() {
  const data = [
    { header: "Getting Started", panel: <>Read our <a href="/get-started/">Getting started</a> page to learn how to install and use PatternFly Elements.<>},
    { header: "HTML APIs", panel: <>For more information on how to use each PatternFly element, read the <a href="/components/">component docs</a>.<>}
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
