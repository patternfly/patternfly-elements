# PatternFly Elements Icon
     
Read more about Icon in the [PatternFly Elements Icon documentation][docs]

##  Installation

Load `<pfe-icon>` via CDN:

```html
<script src="https://unpkg.com/@patternfly/pfe-icon?module"></script>
```

Or, if you are using [NPM](https://npm.im/@patternfly/pfe-icon/), install it

```bash
npm install @patternfly/pfe-icon
```

Then once installed, import it to your application:

```js
import '@patternfly/pfe-icon';
```

## Usage

Place the icon element on the page and give it an icon name from the [default icon set][icon-sets].

```html
<pfe-icon icon="award"></pfe-icon>
```

### Fallback Content

If you wish to display some content while the icon loads (or while JS is disabled),
you can slot it into `<pfe-icon>`. For instance, when using a checkmark icon in a server status
table, you may wish to display a checkmark emoji if JS is disabled.

```html
<pfe-icon icon="check">✅</pfe-icon>
```

### Icon Sets

Icon comes with three built-in icon sets:

1. `fas`: Font Awesome Free Solid icons (the default set)
1. `far`: Font Awesome Free Regular icons
1. `patternfly`: PatternFly icons

Use the `set` attribute to pick an alternative icon set.
```html
<pfe-icon icon="star"    set="far"></pfe-icon>
<pfe-icon icon="redhat"  set="fab"></pfe-icon>
<pfe-icon icon="package" set="patternfly"></pfe-icon>
```

Icon sets are defined in detail in [the docs][icon-sets].

#### Register a New Icon Set

Icons are JavaScript module which export a [lit renderable][renderable], typically an inline SVG
element [template literal][template-literals] tagged with the Lit [`svg`][svg-tag] template tag.
To register a new icon set, call the static `addIconSet` method with the set name and a getter
function. The getter function takes the icon set and icon name and returns a URL object that points 
to the icon's JavaScript module.

```ts
type getter = (set: string, icon: string) => URL
```

```javascript
import { PfeIcon } from '@patternfly/pfe-icon';

// Or, in a non-module context:
// const PfeIcon = await customElements.whenDefined('pfe-icon');

PfeIcon.addIconSet('local', (set, icon) =>
  new URL(`/assets/icons/${set}-${icon}.js`));
```

#### Updating an Existing Icon Set

To updating an existing icon set, you use the same `addIconSet` function.

```javascript
PfeIcon.addIconSet('patternfly', (_, icon) =>
  new URL(`/icons/${icon}.js`, 'https://hosted-icons.com/'));
```

#### Override the Default Icon Sets

Icons are [loaded lazily](#loading) by default, so there's no performance penalty for keeping the
default icon sets arond and unused. However, if you'd like to override the default icon sets across
the entire page, you can override the default `getIconURL` static method:

```js
import { pfeicon } from '@patternfly/pfe-icon';

PfeIcon.getIconURL = (set, icon) =>
  new URL(`/icons/js/${set}/${icon}.js`, 'https://static.redhat.com');
```

To change the default set name, you can also override `PfeIcon.defaultIconSet`

```js
PfeIcon.defaultIconSet = 'patternfly';
```

Now when `<pfe-icon>` is used, it will automatically load icon modules from
`https://static.redhat.com/icons/js/patternfly/...`.

## Loading

Icons load _lazily_ by default, meaning that the browser will not attempt to fetch and render the
icon until it scrolls into view. You can change this with the `loading` attribute, which has three
values:

1. `lazy` (the default): load icons when they scroll into view
2. `idle`: load each icon on the page as soon as the browser enters an [idle state][ric]
    <small>Or, on less-capable browsers, at the next frame</small>
3. `eager`: each icon will begin to load and render the moment it connects to the DOM.

You might choose to enable eager rendering for "above-the-fold" content, but keep lazy loading for
the rest of the page.

```html
<header>
  <h1>
    <pfe-icon icon="fire" loading="eager"></pfe-icon>
    Hot News!
  </h1>
</header>

<main>
  <article>...</article>
</main>

<footer>
  <h2>
    <pfe-icon icon="phone"></pfe-icon>
    Contact Us
  </h2>
  ...
</footer>
```

[docs]: https://patternflyelements.org/components/icon/
[icon-sets]: https://patternflyelements.org/components/icon/#icon-sets
[renderable]: https://lit.dev/docs/components/rendering/
[template-literals]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
[svg-tag]: https://lit.dev/docs/api/templates/#svg
[ric]: https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback
