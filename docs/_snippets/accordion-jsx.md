```jsx
import {
  Accordion,
  AccordionPanel,
  AccordionHeader,
} from "@patternfly/elements/react/pf-accordion/pf-accordion.js";

export default function App() {
  const data = [
    { header: "Getting Started", panel: <>Read our <a href="/get-started/">Getting started</a> page to learn how to install and use PatternFly Elements.<>},
    { header: "HTML APIs", panel: <>For more information on how to use each PatternFly element, read the <a href="/components/">component docs</a>.<>}
  ];
  return (
    <Accordion>{data.map(({ header, panel }) => (
      <AccordionHeader>
        <h3>{header}</h3>
      </AccordionHeader>
      <AccordionPanel>
        <p>{panel}</p>
      </AccordionPanel>))}
    </Accordion>
  );
}
```
