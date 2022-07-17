# Tooltip
A tooltip is a floating text area triggered by a user that provides helpful or contextual information.

## Usage
A tooltip is used by wrapping an html element in the pfe-tooltip element along with contextual information to be displayed alongside of the element.  

Read more about Jump Links in the [PatternFly Elements Tooltip documentation](https://patternflyelements.org/components/tooltip)

##  Installation

Load `<pfe-tooltip>` via CDN:

```html
<script src="https://unpkg.com/@patternfly/pfe-tooltip?module"></script>
```

Or, if you are using [NPM](https://npm.im), install it

```bash
npm install @patternfly/pfe-tooltip
```

Then once installed, import it to your application:

```js
import '@patternfly/pfe-tooltip';
```

## Usage


### Basic Tooltip 
```html
<pfe-tooltip>
    <div>
        This is An Element 
    </div>
    <div slot="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi eget mauris pharetra et ultrices.
    </div>
</pfe-tooltip>
```

### Tooltip With Left Positioning (also available: top, right, bottom)
```html
<pfe-tooltip position="left">
    <div>
        This is An Element 
    </div>
    <div slot="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi eget mauris pharetra et ultrices.
    </div>
</pfe-tooltip>
```

### Tooltip With Left Positioning And Offset
```html
<pfe-tooltip position="left" offset="10, 10">
    <div>
        This is An Element 
    </div>
    <div slot="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi eget mauris pharetra et ultrices.
    </div>
</pfe-tooltip>
```
