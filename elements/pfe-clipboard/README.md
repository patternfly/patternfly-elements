# PatternFly Element | Clipboard element

A button to copy the current URL to the system clipboard.

## Usage

### Default
```html
<pfe-clipboard role="button" tabindex="0"></pfe-clipboard>
```

### Copy text from an element on the page

Add a valid HTML selector to the target attribute, component will use `document.querySelector` to find the first element that the selector fits.

We recommend using ID's.

```html
<pfe-clipboard role="button" tabindex="0" copy-from="#copy-me"></pfe-clipboard>
<div id="copy-me">This text will get copied</div>

<pfe-clipboard role="button" tabindex="0" copy-from="body .copy-me"></pfe-clipboard>
<div class="copy-me">This text will get copied</div>
```

### Copy arbitrary content
Set the attribute `copy-from="property"` and set the property `contentToCopy` on the component with what should be copied.
```html
<!-- Markup on the page -->
<pfe-clipboard role="button" tabindex="0" copy-from="property" id="copyButton"></pfe-clipboard>
```
```js
// In some JS for the page
window.addEventListener('load', function() {
  document.getElementById('copyButton').contentToCopy('Wakka wakka!');
});
```

### Optionally hide the icon
```html
<pfe-clipboard no-icon role="button" tabindex="0"></pfe-clipboard>
```

### Override the link text
```html
<pfe-clipboard role="button" tabindex="0">
    <span slot="text">hey you, copy this url!</span>
</pfe-clipboard>
```

### Override the copied notification text
```html
<pfe-clipboard role="button" tabindex="0">
    <span slot="text--success">URL Copied to clipboard</span>
</pfe-clipboard>
```
### Override the icon
```html
<pfe-clipboard role="button" tabindex="0">
    <pfe-icon slot="icon" icon="web-icon-globe"></pfe-icon>
</pfe-clipboard>
```

## Override all slots
```html
<pfe-clipboard role="button" tabindex="0">
    <span slot="text">Copy this article URL</span>
    <span slot="text--success">URL Copied to clipboard</span>
    <pfe-icon slot="icon" icon="web-icon-globe"></pfe-icon>
</pfe-clipboard>
```

## Specify the amount of seconds the copy success text should be visible
```html
<pfe-clipboard role="button" tabindex="0" copied-duration="5"></pfe-clipboard>
```

### Accessibility

`<pfe-clipboard>` implements many features of a standard button to provide an accessible
experience for all users. By default, `role="button"` and `tabindex="0"` are added to
inform assistive technology that `<pfe-clipboard>` should be treated as a button.  It listens for
mouse clicks as well as enter and space key presses per the recommendation of
[w3.org](https://www.w3.org/TR/wai-aria-practices-1.1/examples/button/button.html).

## Slots

- `text`: Optionally override the text of the button.

- `icon`: Optionally override the default link svg icon. You can inline svg `<svg slot="icon"></svg>` or use pfe-icon `<pfe-icon slot="icon" icon="web-icon-globe"></pfe-icon>`.

- `text--success`: Optionally override the text of the success state which defaults to `Copied`.

## Attributes

- `copy-from`: Defaults to `url`, decides what should be copied. Possible values are:
  - `url` Will copy the current page's URL.
  - `property` Will copy the text from `contentToCopy` method of the component.
  - A DOMString (e.g. `#copyTarget` or `.code-sample pre`) will use `document.querySelector()` with the given text to find the target and will use `innerText` on most elements or `value` on form fields.
- `no-icon`: Optional boolean attribute that, when present, removes the icon from the template.
- `copied-duration`: Specify the amount of time in seconds the copy success text should be visible.

## Variable hooks

Available hooks for styling:

| Variable name | Default value | Region |
| --- | --- | --- |
| `--pfe-clipboard--Color` | `var(--pfe-broadcasted--link, #06c)` | N/A |
| `--pfe-clipboard--FontWeight` | `var(--pfe-theme--font-weight--light, 300)` | N/A |
| `--pfe-clipboard--FontSize` | `1rem` | N/A |
| `--pfe-clipboard--Padding` | `6px 16px` | N/A |
| `--pfe-clipboard--icon--Width` | `16px` | `icon` |
| `--pfe-clipboard--icon--Height` | `auto` | `icon` |
| `--pfe-clipboard--icon--margin` | `0 0.4825rem 0 0` | `icon` |
| `--pfe-clipboard--icon--Color` | `#6a6e73` | `icon` |
| `--pfe-clipboard--Color--focus` | `var(--pfe-broadcasted--link--focus, #004080)` | N/A |
| `--pfe-clipboard--Color--hover` | `var(--pfe-broadcasted--link--hover, #004080)` | N/A |

## Events
### pfe-clipboard:connected

Let's you know when the component has run connectedCallback, useful for knowing when you can set the `contentToCopy` method and know that it will work.

### pfe-clipboard:copied

Fires when the current url is successfully copied the user's system clipboard.

```
detail: {
    url: String
}
```

## Methods

### contentToCopy

A setter to set the content you would like to copy, only works if `copy-from` attribute is set to `property`. Recommend using `pfe-clipboard:connected` event to know when the component's setter is ready.

### copyTextToClipboard()

Will copy the text the component is set to copy to the system clipboard

If available, it will use the new [Navigator API](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/clipboard) to access the system clipboard. If unavailable, it will use the legacy [execCommand("copy")](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand).

#### Returns

- `Promise<string>` url

```js
document.querySelector("pfe-clipboard").copyURLToClipboard()
    .then(url => console.log(`Successfully copied: ${url}`))
    .catch(error => console.error(error));
```

### copyURLToClipboard()

Deprecrated, will copy the current URL to the clipboard using `copyTextToClipboard`.

#### Returns

- `Promise<string>` url

```javascript
document.querySelector("pfe-clipboard").copyURLToClipboard()
  .then(url => console.log(`Successfully copied: ${url}`))
  .catch(error => console.error(error));
```
## Dependencies

None.

## Dev

    `npm start`

## Test

    `npm run test`

## Build

    `npm run build`

## Demo

From the PFElements root directory, run:

    `npm run demo`

## Code style

Clipboard (and all PFElements) use [Prettier][prettier] to auto-format JS and JSON. The style rules get applied when you commit a change. If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://prettier.io/docs/en/editors.html
[web-component-tester]: https://github.com/Polymer/web-component-tester
