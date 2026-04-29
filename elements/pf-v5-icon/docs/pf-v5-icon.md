{% renderInstallation %} {% endrenderInstallation %}

<style>
  main.basic pf-v5-icon[circled] {
    margin-right: 8px;
    margin-bottom: 8px;
  }
</style>

{% renderOverview %}
  <pf-v5-icon icon="user" size="xl"></pf-v5-icon>
  <pf-v5-icon icon="lock" size="xl"></pf-v5-icon>
  <pf-v5-icon icon="laptop" size="xl"></pf-v5-icon>
  <pf-v5-icon icon="cloud" size="xl"></pf-v5-icon>
{% endrenderOverview %}

{% band header="Usage" %}
  Place the icon element on the page and give it an icon name from the [default
  icon set][icon-sets]. In most cases, the icon should be labelled using
  `aria-label` or `aria-labelledby`, or removed from the accessibility tree
  with `aria-hidden="true"` or `role="presentation"`, if its content is merely
  presentational and expressed using accessible text copy elsewhere.

  {% htmlexample %}
  <pf-v5-icon icon="user" aria-label="user"></pf-v5-icon>
  <pf-v5-icon icon="lock" aria-label="lock"></pf-v5-icon>
  <pf-v5-icon icon="laptop" aria-label="laptop"></pf-v5-icon>
  <pf-v5-icon icon="cloud" aria-label="cloud"></pf-v5-icon>
  {% endhtmlexample %}

  ### Size
  The default size is 1em, so icon size matches text size.  `2x`, etc, are
  multiples of font size.  `sm`, `md`, etc are fixed pixel-based sizes.

  {% htmlexample %}
  <pf-v5-icon icon="user" size="sm"></pf-v5-icon>
  <pf-v5-icon icon="user" size="md"></pf-v5-icon>
  <pf-v5-icon icon="user" size="lg"></pf-v5-icon>
  <pf-v5-icon icon="user" size="xl"></pf-v5-icon>
  {% endhtmlexample %}
{% endband %}

{% band header="Icon sets" %}
Icon comes with three built-in icon sets:

1. `fas`: Font Awesome Free Solid icons (the default set)
1. `far`: Font Awesome Free Regular icons
1. `patternfly`: PatternFly icons

Use the `set` attribute to pick an alternative icon set.
```html
<pf-v5-icon icon="star"    set="far"></pf-v5-icon>
<pf-v5-icon icon="redhat"  set="fab"></pf-v5-icon>
<pf-v5-icon icon="package" set="patternfly"></pf-v5-icon>
```

### Register a New Icon Set

Icons are JavaScript module which export a [lit renderable][renderable],
typically an inline SVG element [template literal][template-literals] tagged
with the Lit [`svg`][svg-tag] template tag. To register a new icon set, call
the static `addIconSet` method with the set name and a getter function. The
getter function takes the icon set and icon name and returns a promise containing
the icon node, or any other [renderable][renderable] value.

```ts
type IconResolveFunction = (set: string, icon: string) => Promise<Node> | Node;
```

```javascript
import { PfIcon } from '@patternfly/pf-v5-icon';

// Or, in a non-module context:
// const PfIcon = await customElements.whenDefined('pf-v5-icon');

PfIcon.addIconSet('local', (set, icon) =>
  import(`/assets/icons/${set}-${icon}.js`))
    .then(mod => mod.default);
```

### Updating an Existing Icon Set

To updating an existing icon set, you use the same `addIconSet` function. By
defaulting back to then existing `getIconUrl` method, you  you can add a new
icon to an existing set:

```js
PfIcon.addIconSet('patternfly', (set, icon) => {
  switch (icon) {
    // add your custom icons
    case 'my-custom-icon':
    case 'other-custom-icon':
      return import(`/icon-overrides/patternfly-custom/${icon}.js`)
        .then(mod => mod.default);
    // fall back to built-in icons
    default:
      return PfIcon.getIconUrl(set, icon);
  }
});
```

### Override the Default Icon Sets

Icons are [loaded lazily](#loading) by default, so there's no performance
penalty for keeping the default icon sets around and unused. However, if you'd
like to override the default icon sets across the entire page, you can use
`addIconSet` with the `fas`, `far`, and `patternfly` set names:

```js
import { PfIcon } from '@patternfly/pf-v5-icon';

PfIcon.resolve = (set, icon) =>
  import(`/icons/${set}-${icon}.js`))
    .then(mod => mod.default);
```

Now when `<pf-v5-icon>` is loaded from the [RedHat DX 
CDN](https://redhatstatic.com/dx/), it will automatically load icon modules from 
the CDN as well.

{% endband %}

{% band header="Loading" %}

Icons load _lazily_ by default, meaning that the browser will not attempt to
fetch and render the icon until it scrolls into view. You can change this with
the `loading` attribute, which has three values:

1. `lazy` (the default): load icons when they scroll into view
2. `idle`: load each icon on the page as soon as the browser enters an [idle
   state][ric] <small>Or, on less-capable browsers, at the next frame</small>
3. `eager`: each icon will begin to load and render the moment it connects to
   the DOM.

You might choose to enable eager rendering for "above-the-fold" content, but
keep lazy loading for the rest of the page.

```html
<header>
  <h1>
    <pf-v5-icon icon="fire" loading="eager"></pf-v5-icon>
    Hot News!
  </h1>
</header>

<main>
  <article>...</article>
</main>

<footer>
  <h2>
    <pf-v5-icon icon="phone"></pf-v5-icon>
    Contact Us
  </h2>
  ...
</footer>
```
{% endband %}

{% renderSlots %}

If you wish to display some content while the icon loads (or while JS is
disabled), you can slot it into `<pf-v5-icon>`. For instance, when using a
checkmark icon in a server status table, you may wish to display a checkmark
emoji if JS is disabled.

```html
<pf-v5-icon icon="check">✅</pf-v5-icon>
```

It's recommended to use the icon name in the default slot, or
`aria-label(ledby)` so that the icon is accessible to screen readers.

```html
<pf-v5-icon icon="check">check</pf-v5-icon>
```
{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderProperties %}{% endrenderProperties %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}

[renderable]: https://lit.dev/docs/components/rendering/
[template-literals]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
[svg-tag]: https://lit.dev/docs/api/templates/#svg
[ric]: https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback
