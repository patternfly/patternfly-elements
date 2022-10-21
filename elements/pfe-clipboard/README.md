# PatternFly Elements Clipboard
     
A button to copy the current URL to the system clipboard.

Read more about Clipboard in the [PatternFly Elements Clipboard documentation](https://patternflyelements.org/components/clipboard)

##  Installation

Load `<pfe-clipboard>` via CDN:

```html
<script src="https://unpkg.com/@patternfly/pfe-clipboard?module"></script>
```

Or, if you are using [NPM](https://npm.im), install it

```bash
npm install @patternfly/pfe-clipboard
```

Then once installed, import it to your application:

```js
import '@patternfly/pfe-clipboard';
```

## Usage

### Default
```html
<pfe-clipboard></pfe-clipboard>
```

### Copy text from an element on the page

Add a valid HTML selector to the target attribute, component will use `document.querySelector` to find the first element that the selector fits.

We recommend using ID's.

```html
<pfe-clipboard copy-from="#copy-me"></pfe-clipboard>
<div id="copy-me">This text will get copied</div>

<pfe-clipboard copy-from="body .copy-me"></pfe-clipboard>
<div class="copy-me">This text will get copied</div>
```

### Copy arbitrary content
Set the attribute `copy-from="property"` and set the property `contentToCopy` on the component with what should be copied.
```html
<!-- Markup on the page -->
<pfe-clipboard copy-from="property" id="copyButton"></pfe-clipboard>
```
```js
document.getElementById('copyButton').contentToCopy('Wakka wakka!');
```

### Optionally hide the icon
```html
<pfe-clipboard no-icon></pfe-clipboard>
```

### Override the link text
```html
<pfe-clipboard>
  <span slot="label">hey you, copy this url!</span>
</pfe-clipboard>
```

### Override the copied notification text
```html
<pfe-clipboard>
    <span slot="success">URL Copied to clipboard</span>
</pfe-clipboard>
```
### Override the icon
```html
<pfe-clipboard>
    <pfe-icon slot="icon" icon="globe"></pfe-icon>
</pfe-clipboard>
```

## Override all slots
```html
<pfe-clipboard>
  <span slot="label">Copy this article URL</span>
  <span slot="success">URL Copied to clipboard</span>
  <pfe-icon slot="icon" icon="globe"></pfe-icon>
</pfe-clipboard>
```

## Specify the amount of seconds the copy success text should be visible
```html
<pfe-clipboard copied-duration="5"></pfe-clipboard>
```

### Accessibility

`<pfe-clipboard>` implements many features of a standard button to provide an accessible
experience for all users. By default, `role="button"` and `tabindex="0"` are added to
inform assistive technology that `<pfe-clipboard>` should be treated as a button.  It listens for
mouse clicks as well as enter and space key presses per the recommendation of
[w3.org](https://www.w3.org/TR/wai-aria-practices-1.1/examples/button/button.html).

