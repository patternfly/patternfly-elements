---
layout: layout-docs.njk
title: Develop a structure
order: 3
tags:
  - develop
---

Run this command from the project root to start the build, watch, and server processes, see others in the project README.
```bash
npm run dev
```

The server will load on `http://localhost:8000` by default.

![npm run live-demo command](/images/develop/develop-structure.png)

Assuming the `dev` command started a server on port 8000, navigate to `http://localhost:8000/demo/pfe-cool-element/` to view your element.

You're off to a good start! You have a new custom element that extends the base LitElement class.

Let's take a look at the `pfe-cool-element.ts` file to see what we have.

```ts
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { pfelement } from '@patternfly/pfe-core/decorators.js';

import styles from './pfe-cool-element.scss';

/**
 * Cool Element
 * @slot - Place element content here
 */
@customElement('pfe-cool-element') @pfelement()
export class PfeCoolElement extends LitElement {
  static readonly styles = [styles];

  render() {
    return html`
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-cool-element': PfeCoolElement;
  }
}
```

First, notice that our element extends from `LitElement` instead of `HTMLElement`. Read more about [Lit](https://lit.dev)

```ts
import { LitElement, html } from 'lit';
```

Second, we define HTML tag name using lit's `@customElement()` [TypeScript decorator](https://www.typescriptlang.org/docs/handbook/decorators.html).
Decorators are a [proposed JavaScript language feature](https://github.com/tc39/proposal-decorators).
TypeScript implements an experimental version of the decorator language feature with a slightly different internal API.

```ts
@customElement('pfe-cool-element') @pfelement()
```

We also apply the `@pfelement()` decorator from `@patternfly/pfe-core`, which provides some common features for all PatternFly Elements,
like colour-context awarerness, and optional performance tracking.

Third, we import an use our component's SASS styles

```ts
import styles from './pfe-cool-element.scss';
```

```ts
static readonly styles = [styles];
```

Of course, web browsers don't know how to import `.scss` files as CSS styles. In the near future, we will use
[import assertions](https://github.com/tc39/proposal-import-assertions) to import [CSS modules](https://github.com/WICG/webcomponents/blob/gh-pages/proposals/css-modules-v1-explainer.md),
but for now, we use some [build-time tricks](https://npm.im/esbuild-plugin-lit-css) to transform our SASS sources into JavaScript objects which work with LitElement.

> For questions on how Custom Elements work, or if you want to learn the basics of shadow DOM, check out Eric Bidelman's post: [Custom Elements v1: Reusable Web Components](https://developers.google.com/web/fundamentals/web-components/customelements).

Now that our dev server is running and we have our element's structure, let's make it actually do something.

<pfe-cta>
  <a href="../html">Next up: Write your HTML</a>
</pfe-cta>
