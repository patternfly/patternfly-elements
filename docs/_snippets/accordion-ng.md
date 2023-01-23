```shell
npm install @patternfly/elements
```

```ts
import "@patternfly/elements/pf-accordion/pf-accordion.js";

import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <pf-accordion>
      <ng-template ngFor let-item [ngForOf]="data">
        <pf-accordion-header>
          <h3>{{ item.header }}</h3>
        </pf-accordion-header>
        <pf-accordion-panel>
          <p>{{ item.panel }}</p>
        </pf-accordion-panel>
      </ng-template>
    </pf-accordion>
  `,
})
export class AppComponent {
  data = [
    { header: "Heading 1", panel: "Here is some content"},
    { header: "Heading 2", panel: "Here is some more content" }
  ];
}
```
