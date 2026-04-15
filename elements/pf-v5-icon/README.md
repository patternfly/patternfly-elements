# PatternFly Elements Icon
     
Read more about Icon in the [PatternFly Elements Icon documentation][docs]

##  Installation

Load `<pf-v5-icon>` via CDN:

```html
<script src="https://jspm.dev/@patternfly/elements/pf-v5-icon/pf-v5-icon.js"></script>
```

Or, if you are using [NPM](https://npm.im/@patternfly/elements/), install it

```bash
npm install @patternfly/elements
```

Then once installed, import it to your application:

```js
import '@patternfly/elements/pf-v5-icon/pf-v5-icon.js';
```

## Usage

Place the icon element on the page and give it an icon name from the [default icon set][icon-sets].
In most cases, the icon should be labelled using `aria-label` or `aria-labelledby`, or removed from
the accessibility tree with `aria-hidden="true"` or `role="presentation"`, if its content is merely
presentational and expressed using accessible text copy elsewhere.

```html
<pf-v5-icon icon="award" aria-label="Awards"></pf-v5-icon>
```

### Fallback Content

If you wish to display some content while the icon loads (or while JS is disabled),
you can slot it into `<pf-v5-icon>`. For instance, when using a checkmark icon in a 
server status table, you may wish to display a checkmark emoji if JS is disabled.

```html
<pf-v5-icon icon="check">✅</pf-v5-icon>
```

### Icon Sets

Icon comes with three built-in icon sets:

1. `fas`: Font Awesome Free Solid icons (the default set)
1. `far`: Font Awesome Free Regular icons
1. `fab`: Font Awesome Free Bold icons
1. `patternfly`: PatternFly icons

Use the `set` attribute to pick an alternative icon set.
```html
<pf-v5-icon icon="star"    set="far"></pf-v5-icon>
<pf-v5-icon icon="redhat"  set="fab"></pf-v5-icon>
<pf-v5-icon icon="package" set="patternfly"></pf-v5-icon>
```

It is possible to add custom icon sets or override the default sets.
Icon sets are defined in detail in [the docs][icon-sets].

### Bundling and custom loading behaviour

When bundling `<pf-v5-icon>` with other modules (e.g. using webpack, rollup,
esbuild, vite, or similar tools), icon imports will be code-split into chunks,
as they are imported from the `@patternfly/icons` package. Ensure that your
bundler is configured to permit dynamic imports, or mark the `@patternfly/icons`
package as "external" and apply an [import map][importmap] to your page instead.
If you would like to
customize the loading behaviour, override the `PfIcon.resolve()` static method.
This methods takes two arguments: the icon set (a string) and the icon name
(a string), and returns a promise of the icon contents, which is a DOM node, or
[anything else that lit-html can render][renderable].

```js
import { PfIcon } from '/pfe.min.js';
PfIcon.resolve = async function(set, icon) {
  try {
    const { default: content } = await import(`/assets/icons/${set}/${icon}.js`);
    if (content instanceof Node) {
      return content.cloneNode(true);
    }
  } catch (e) {
    return '';
  }
}
```

## Loading

Icons load _lazily_ by default, meaning that the browser will not attempt to fetch and render the
icon until it scrolls into view. You can change this with the `loading` attribute;
see the [docs][docs] for more info.

[docs]: https://patternflyelements.org/components/icon/
[icon-sets]: https://patternflyelements.org/components/icon/#icon-sets
[renderable]: https://lit.dev/docs/components/rendering/#renderable-values
[importmap]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap
