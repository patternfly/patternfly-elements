# Label
An inline-block element component that provides a distinct visual style for 
metadata in a UI.  Commonly used as visual representations for tags, labels can 
include an optional pf-icon and are available in a solid and outline style 
variant. 

Read more about Label in the [PatternFly Elements Label documentation](https://patternflyelements.org/components/label)

##  Installation

Load `<pf-label>` via CDN:

```html
<script src="https://jspm.dev/@patternfly/elements/pf-label/pf-label.js"></script>
```

Or, if you are using [NPM](https://npm.im), install it

```bash
npm install @patternfly/elements
```

Then once installed, import it to your application:

```js
import '@patternfly/elements/pf-label/pf-label.js';
```

## Usage

Default
```html
<p>Some Text <pf-label>Your label text here</pf-label></p>
```

Color Options: `grey (default), blue ,green, orange, red, purple, cyan`
```html
<p>Some Text <pf-label color="red">Your label text here</pf-label></p>
```

With and Icon:
```html
<p>Some Text <pf-label icon="web-icon-globe">Your label text here</pf-label></p>
```

Outline variant:
```html
<p>Some Text <pf-label outline>Your label text here</pf-label></p>
```

> ### Conveying meaning to assistive technologies
> Using color to add meaning only provides a visual indication, which will not be conveyed to users of assistive technologies – such as screen readers. Ensure that
> information denoted by the color is either obvious from the content itself (e.g. the visible text), or is included through alternative means, such as additional text 
> hidden with the a class.


```html
<pf-label color="red">
 Some text <span class="visually-hidden-class">Some additional info</span>
</pf-label>
```
