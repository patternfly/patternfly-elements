---
"@patternfly/pfe-core": minor
---

Add `MatchMediaController`

```ts
import { property } from "lit/decorators.js";
import { MatchMediaController } from "@patternfly/pfe-core/controllers/match-media-controller.js";

export class PfeMatched extends LitElement {
  @property({ type: Boolean, reflect: true, attribute: "is-mobile" })
  isMobile = false;

  protected matchMedia = new MatchMediaController(this, `(max-width: 1000px)`, {
    onChange: ({ matches }) => (this.isMobile = matches)
  });
}
```
