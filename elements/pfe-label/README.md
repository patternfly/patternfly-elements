# Label
An inline-block element component that provides a distinct visual style for metadata in a UI.  Commonly used as a visual representations for tags, labels can include an optional pfe-icon and also come in an outline style variant. 

Read more about Label in the [PatternFly Elements Label documentation](https://patternflyelements.org/components/label)

##  Installation

Load `<pfe-label>` via CDN:

```html
<script src="https://unpkg.com/@patternfly/pfe-label?module"></script>
```

Or, if you are using [NPM](https://npm.im), install it

```bash
npm install @patternfly/pfe-label
```

Then once installed, import it to your application:

```js
import '@patternfly/pfe-label';
```

## Usage

Default
```html
<p>Some Text <pfe-label>Your label text here</pfe-label>
```

Color Options: `grey (default), blue ,green, orange, red, purple, cyan`
```html
<p>Some Text <pfe-label color="red">Your label text here</pfe-label>
```

With and Icon:
```html
<p>Some Text <pfe-label icon="web-icon-globe">Your label text here</pfe-label>
```

Outline variant:
```html
<p>Some Text <pfe-label outline>Your label text here</pfe-label>
```



> ### Conveying meaning to assistive technologies
> Using color to add meaning only provides a visual indication, which will not be conveyed to users of assistive technologies – such as screen readers. Ensure that
> information denoted by the color is either obvious from the content itself (e.g. the visible text), or is included through alternative means, such as additional text 
> hidden with the a class.


```html
<pfe-label color="red">
 Some text <span class="visually-hidden-class">Some additional info</span>
</pfe-label>
```
