# Background Image

A **background image** allows you to place an image in the background of your page or area of a page.


##  Installation
Load `<pf-background-image>` via CDN:

```html
<script src="https://jspm.dev/@patternfly/elements/pf-background-image/pf-background-image.js"></script>


Or, if you are using [NPM](https://npm.im), install it

```bash
npm install @patternfly/elements
```

Then once installed, import it to your application:

```js
import '@patternfly/elements/pf-background-image/pf-background-image.js';
```

## Usage

```html
<pf-background-image
    src="image.jpg"
    src-2x="image-576.jpg"
    src-sm="image-768.jpg"
    src-sm-2x="image-768@2x.jpg"
    src-lg="image-1200.jpg"
></pf-background-image>
```

[docs]: https://patternflyelements.org/components/background-image
