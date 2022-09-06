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

It is possible to add custom icon sets or override the default sets.
Icon sets are defined in detail in [the docs][icon-sets].

## Loading

Icons load _lazily_ by default, meaning that the browser will not attempt to fetch and render the
icon until it scrolls into view. You can change this with the `loading` attribute;
see the [docs][docs] for more info.

[docs]: https://patternflyelements.org/components/icon/
[icon-sets]: https://patternflyelements.org/components/icon/#icon-sets
