# PatternFly Elements Icon
     
Read more about Icon in the [PatternFly Elements Icon documentation][docs]

##  Installation

Load `<pfe-icon>` via CDN:

```html
<script src="https://unpkg.com/@patternfly/elements/pfe-icon/pfe-icon.js?module"></script>
```

Or, if you are using [NPM](https://npm.im/@patternfly/pfe-icon/), install it

```bash
npm install @patternfly/elements
```

Then once installed, import it to your application:

```js
import '@patternfly/elements/pfe-icon/pfe-icon.js';
```

## Usage

Place the icon element on the page and give it an icon name from the [default icon set][icon-sets].
In most cases, the icon should be labelled using `aria-label` or `aria-labelledby`, or removed from
the accessibility tree with `aria-hidden="true"` or `role="presentation"`, if its content is merely
presentational and expressed using accessible text copy elsewhere.

```html
<pfe-icon icon="award" aria-label="Awards"></pfe-icon>
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

It is possible to add custom icon sets or override the default sets.
Icon sets are defined in detail in [the docs][icon-sets].

### Bundling

When bundling PfeIcon with other modules, the default icon imports will be
relative to the bundle, not the source file, so be sure to either register all
the icon sets you'll need, or override the default getter.

```js
// Workaround for bundled pfe-icon: make icon imports absolute, instead of relative to the bundle
import { PfeIcon } from '/pfe.min.js';
PfeIcon.getIconUrl = (set, icon) =>
  new URL(`/assets/icons/${set}/${icon}.js`, import.meta.url);
  // default: new URL(`./icons/${set}/${icon}.js`, import.meta.url);
```

## Loading

Icons load _lazily_ by default, meaning that the browser will not attempt to fetch and render the
icon until it scrolls into view. You can change this with the `loading` attribute;
see the [docs][docs] for more info.

[docs]: https://patternflyelements.org/components/icon/
[icon-sets]: https://patternflyelements.org/components/icon/#icon-sets
