---
"@patternfly/pfe-core": major
---
`@cascades`: deprecated `@cascades` decorator and `CascadeController`. Use context instead.

**BEFORE**: The element in charge of the context cascades data down to
specifically named children.

```ts
import { LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { cascades } from '@patternfly/pfe-core/decorators/cascades.js';

class MyMood extends LitElement {
  @cascades('my-eyes', 'my-mouth')
  @property() mood: 'happy'|'sad'|'mad'|'glad';
}
```

**AFTER**: children subscribe to updates from the context provider.

```ts
import { LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { provide } from '@lit/context';
import { createContextWithRoot } from '@patternfly/pfe-core/functions/context.js';

export type Mood = 'happy'|'sad'|'mad'|'glad';

export const moodContext = createContextWithRoot<Mood>(Symbol('mood'));

class MyMood extends LitElement {
  @provide({ context: moodContext })
  @property() mood: Mood;
}
```

```ts
import { LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { consume } from '@lit/context';
import { moodContext, type Mood } from './my-mood.js';

class MyEyes extends LitElement {
  @consume({ context: moodContext, subscribe: true })
  @state() private mood: Mood;
}
```
