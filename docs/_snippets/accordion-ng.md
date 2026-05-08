{%raw%}
```ts
import "@patternfly/elements/pf-v6-accordion/pf-v6-accordion.js";

import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <pf-v6-accordion>
      <ng-template ngFor let-item [ngForOf]="data">
        <pf-v6-accordion-header>
          <h3>{{ item.header }}</h3>
        </pf-v6-accordion-header>
        <pf-v6-accordion-panel>
          <p>{{ item.panel }}</p>
        </pf-v6-accordion-panel>
      </ng-template>
    </pf-v6-accordion>
  `,
})
export class AppComponent {
  data = [
    { header: "Heading 1", panel: "Here is some content"},
    { header: "Heading 2", panel: "Here is some more content" }
  ];
}
```
{%endraw%}
