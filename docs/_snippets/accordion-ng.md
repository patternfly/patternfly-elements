```shell
npm install @patternfly/elements
```

```ts
import "@patternfly/elements/pfe-accordion/pfe-accordion.js";

import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <pfe-accordion>
      <ng-template ngFor let-item [ngForOf]="data">
        <pfe-accordion-header>
          <h3>{{ item.header }}</h3>
        </pfe-accordion-header>
        <pfe-accordion-panel>
          <p>{{ item.panel }}</p>
        </pfe-accordion-panel>
      </ng-template>
    </pfe-accordion>
  `,
})
export class AppComponent {
  data = [
    { header: "Heading 1", panel: "Here is some content"},
    { header: "Heading 2", panel: "Here is some more content" }
  ];
}
```
