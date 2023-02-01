# Tooltip
A tooltip is a floating text area triggered by a user that provides helpful or contextual information.

## Usage
A tooltip is used by wrapping an html element in the pf-tooltip element along with contextual information to be displayed alongside of the element.  

Read more about tooltips in the [PatternFly Elements Tooltip documentation](https://patternflyelements.org/components/tooltip)

##  Installation

Load `<pf-tooltip>` via CDN:

```html
<script src="https://jspm.dev/@patternfly/elements/pf-tooltip/pf-tooltip.js"></script>
```

Or, if you are using [NPM](https://npm.im), install it

```bash
npm install @patternfly/elements
```

Then once installed, import it to your application:

```js
import '@patternfly/elements/pf-tooltip/pf-tooltip.js';
```

## Usage


### Basic Tooltip 
```html
<pf-tooltip> This is An Element
  <div slot="content">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
    incididunt ut labore et dolore magna aliqua. Mi eget mauris pharetra et 
    ultrices.
  </div>
</pf-tooltip>
```

### Tooltip With Left Positioning (also available: top, right, bottom)
```html
<pf-tooltip position="left"> This is An Element
  <div slot="content">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
    incididunt ut labore et dolore magna aliqua. Mi eget mauris pharetra et 
    ultrices.
  </div>
</pf-tooltip>
```

### Tooltip With Left Positioning And Offset
```html
<pf-tooltip position="left" offset="10, 10">
    <div>
        This is An Element 
    </div>
    <div slot="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi eget mauris pharetra et ultrices.
    </div>
</pf-tooltip>
```
