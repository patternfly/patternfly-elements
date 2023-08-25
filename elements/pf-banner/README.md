# Patternfly Elements Banner
A banner is a 1-line, full color, full width container that can be used to communicate short snippets of information to users. Banners are un-intrusive and non-dismissible.

Read more about Button in the [PatternFly Elements Banner documentation](https://patternflyelements.org/components/banner)

## Installation
Load `<pf-banner>` via CDN:

```html
<script src="https://jspm.dev/@patternfly/elements/pf-banner/pf-banner.js"></script>
```
Or, if you are using [NPM](https://npm.im/), install it

```bash
npm install @patternfly/elements
```
Then once installed, import it to your application:

```js
import '@patternfly/elements/pf-banner/pf-banner.js';
```


## Usage

```html
<pf-banner>
  Default banner
</pf-banner>
```


## Attributes

### Variant
Banners have five different variants. The available variants are `default`, `info`, `success`, `danger`, and `warning`.

```html
<pf-banner variant="info">
  Info banner
</pf-banner>
```

### Icon
Banners can have an icon attribute for a shorthand to Patternfly Icons. To see available icons, visit the [Patternfly Elements Icons documentation](https://patternflyelements.com/components/icons/).

```html
<pf-banner variant="info" icon="info">
  Info banner
</pf-banner>
```

### Sticky
Banners can be sticky, so they stick to the top of the parent. 

```html
<pf-banner sticky>
  Sticky banner
</pf-banner>
```
