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

import styles from './pfe-cool-element.scss';

/**
 * Cool Element
 * @slot - Place element content here
 */
@customElement('pfe-cool-element')
export class PfeCoolElement extends LitElement {
  static readonly version = '{{version}}';

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

## Lit

```ts
import { LitElement, html } from 'lit';
```

First, notice that our element extends from `LitElement` instead of `HTMLElement`. Lit provides a few key features on top of standard web components (i.e. `HTMLElement`):

- **Observed Properties**. Any time an observed property changes, the component automatically and performantly updates based on the new state.
- **Declarative Templates**. The `html` [template literal tag function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates) lets you define HTML elements and attributes as well as JavaScript DOM properties and event listeners in a simple, familiar syntax.

Unlike PFE 1.0's `PFElement` base class, Lit template updates (i.e. renders) are _asynchronous_. What this means for developers is that once they set an observed property, they should `await element.updateComplete` to ensure that changes to the DOM are applied if they need to do any work based on the results.

For example, with `PFElement` we could handle the side-effects of our actions immediately:

```js
const element = document.querySelector('pfe-tabs');
// Select the 2nd Tab
element.selectIndex(1);
// Side effects happen immediately,
// so let's get a reference to the newly-active tab
const active = element.querySelector('[aria-selected="true"]');
// Do something with the newly-active tab
```

With `LitElement`, we must wait for our changes to apply before continuing:

```diff-js
  const element = document.querySelector('pfe-tabs');
  // Select the 2nd Tab
  element.selectIndex(1);
- // Side effects happen immediately,
- // so let's get a reference to the newly-active tab
+ // Wait for changes to take effect
+ // and only then get a reference to the newly-active tab
+ await element.updateComplete;
  const active = element.querySelector('[aria-selected="true"]');
  // Do something with the newly-active tab
```

These changes usually take mere milliseconds to occur, so this doesn't affect end-users, but developers should be aware.

Read more about [Lit](https://lit.dev) on their site. 

## TypeScript Decorators

Second, we define HTML tag name using lit's `@customElement()` [TypeScript decorator](https://www.typescriptlang.org/docs/handbook/decorators.html).
Decorators are a [proposed JavaScript language feature](https://github.com/tc39/proposal-decorators).
TypeScript implements an experimental version of the decorator language feature with a slightly different internal API.

```ts
@customElement('pfe-cool-element')
```

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

<a class="cta" href="../html">Next up: Write your HTML</a>
