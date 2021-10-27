---
layout: layout-basic.html
title: Clipboard
description: Gives a preview of information in a small layout
package: pfe-clipboard
packages:
  - pfe-clipboard
  - pfe-cta
  - pfe-icon
tags:
  - component
---


::: section header
# {{ title }}
:::

::: section
## Overview
A button to copy the current URL to the system clipboard.

<pfe-clipboard role="button" tabindex="0"></pfe-clipboard>
:::

::: section
## Installation
```shell
npm install @patternfly/pfe-clipboard
```
:::

::: section
## Usage

### Default
<pfe-clipboard role="button" tabindex="0"></pfe-clipboard>
```html
<pfe-clipboard role="button" tabindex="0"></pfe-clipboard>
```

### Copy text from element
<pfe-clipboard role="button" tabindex="0" copy-from="#textToCopy">
  <span slot="text">This will copy the text in the text field below!</span>
  <span slot="text--success">Making some copies!</span>
</pfe-clipboard>
<input type="text" id="textToCopy" value="This text will be copied!!11"></input>
```html
<pfe-clipboard role="button" tabindex="0" copy-from="#textToCopy">
  <span slot="text">This will copy the text in the text field below!</span>
  <span slot="text--success">Making some copies!</span>
</pfe-clipboard>
<input type="text" id="textToCopy" value="This text will be copied!!11"></input>
```

### Copying text from property
<pfe-clipboard role="button" tabindex="0" copy-from="property" id="propertyCopy"></pfe-clipboard>
<script>
  window.addEventListener('load', function() {
    document.getElementById('propertyCopy').contentToCopy = '    <h2>Clipboard: with custom text & copying text from element</h2>\n    <pfe-clipboard role="button" tabindex="0" copy-from="#textToCopy">\n      <span slot="text">This will copy the text in the text field below!</span>\n      <span slot="text--success">Making some copies!</span>\n    </pfe-clipboard>\n    <input type="text" id="textToCopy" value="This text will be copied!!11"></input>';
  })
</script>
```html
<pfe-clipboard role="button" tabindex="0" copy-from="property" id="propertyCopy"></pfe-clipboard>
<script>
  window.addEventListener('load', function() {
    document.getElementById('propertyCopy').contentToCopy = '    <h2>Clipboard: with custom text & copying text from element</h2>\n    <pfe-clipboard role="button" tabindex="0" copy-from="#textToCopy">\n      <span slot="text">This will copy the text in the text field below!</span>\n      <span slot="text--success">Making some copies!</span>\n    </pfe-clipboard>\n    <input type="text" id="textToCopy" value="This text will be copied!!11"></input>';
  })
</script>
```

### Optionally hide the icon
<pfe-clipboard no-icon role="button" tabindex="0"></pfe-clipboard>
```html
<pfe-clipboard no-icon role="button" tabindex="0"></pfe-clipboard>
```

### Override the link text
<pfe-clipboard role="button" tabindex="0">
  <span slot="text">You can copy this url</span>
</pfe-clipboard>

```html
<pfe-clipboard role="button" tabindex="0">
  <span slot="text">You can copy this url</span>
</pfe-clipboard>
```

### Override the copied notification text
<pfe-clipboard role="button" tabindex="0">
  <span slot="text--success">URL Copied to clipboard</span>
</pfe-clipboard>

```html
<pfe-clipboard role="button" tabindex="0">
  <span slot="text--success">URL Copied to clipboard</span>
</pfe-clipboard>
```

### Override the icon
<pfe-clipboard role="button" tabindex="0">
  <pfe-icon slot="icon" icon="web-icon-globe"></pfe-icon>
</pfe-clipboard>

```html
<pfe-clipboard role="button" tabindex="0">
  <pfe-icon slot="icon" icon="web-icon-globe"></pfe-icon>
</pfe-clipboard>
```

### Override all slots
<pfe-clipboard role="button" tabindex="0">
  <span slot="text">Copy this article URL</span>
  <span slot="text--success">URL Copied to clipboard</span>
  <pfe-icon slot="icon" icon="web-icon-globe"></pfe-icon>
</pfe-clipboard>

```html
<pfe-clipboard role="button" tabindex="0">
  <span slot="text">Copy this article URL</span>
  <span slot="text--success">URL Copied to clipboard</span>
  <pfe-icon slot="icon" icon="web-icon-globe"></pfe-icon>
</pfe-clipboard>
```

### Specify the amount of seconds the copy success text should be visible
<pfe-clipboard role="button" tabindex="0" copied-duration="5"></pfe-clipboard>

```html
<pfe-clipboard role="button" tabindex="0" copied-duration="5"></pfe-clipboard>
```
:::

::: section
## Accessibility

`<pfe-clipboard>` implements many features of a standard button to provide an accessible
experience for all users. By default, `role="button"` and `tabindex="0"` are added to
inform assistive technology that `<pfe-clipboard>` should be treated as a button.  It listens for
mouse clicks as well as enter and space key presses per the recommendation of
[w3.org](https://www.w3.org/TR/wai-aria-practices-1.1/examples/button/button.html).
:::

::: section
## Slots

### text
Optionally override the text of the button.

### icon
Optionally override the default link svg icon. You can inline svg `<svg slot="icon"></svg>` or use pfe-icon. For example: `<pfe-icon slot="icon" icon="web-icon-globe"></pfe-icon>`.

### text--success
Optionally override the text of the success state which defaults to `Copied`.
:::

::: section
## Attributes

### no-icon
Optional boolean attribute that, when present, removes the icon from the template.

### copied-duration
Specify the amount of time in seconds the copy success text should be visible.
:::

::: section
## Methods

### copyTextToClipboard()

Copy arbitrary text to the system clipboard

If available, it will use the new [Navigator API](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/clipboard) to access the system clipboard. If unavailable, it will use the legacy [execCommand("copy")](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand).

#### Returns

- `Promise<string>` text

```javascript
document.querySelector("pfe-clipboard").copyTextToClipboard(text)
  .then(res => console.log(`Successfully copied: ${res}`))
  .catch(error => console.error(error));
```
:::

### copyURLToClipboard()

Copy url to the system clipboard

#### Returns

- `Promise<string>` url

```javascript
document.querySelector("pfe-clipboard").copyURLToClipboard()
  .then(url => console.log(`Successfully copied: ${url}`))
  .catch(error => console.error(error));
```
:::

::: section
## Events
### pfe-clipboard:copied

Fires when the current url is successfully copied the user's system clipboard.

```javascript
detail: {
  url: String
}
```
:::

::: section
## Styling hooks

| Variable name | Default value | Region |
| --- | --- | --- |
| `--pfe-clipboard--Color` | `var(--pfe-broadcasted--link, #06c)` | N/A |
| `--pfe-clipboard--Color--focus` | `var(--pfe-broadcasted--link--focus, #004080)` | N/A |
| `--pfe-clipboard--Color--hover` | `var(--pfe-broadcasted--link--hover, #004080)` | N/A |
| `--pfe-clipboard--FontWeight` | `var(--pfe-theme--font-weight--light, 300)` | N/A |
| `--pfe-clipboard--FontSize` | `1rem` | N/A |
| `--pfe-clipboard--Padding` | `6px 16px` | N/A |
| `--pfe-clipboard--icon--Width` | `16px` | `icon` |
| `--pfe-clipboard--icon--Height` | `auto` | `icon` |
| `--pfe-clipboard--icon--margin` | `0 0.4825rem 0 0` | `icon` |
| `--pfe-clipboard--icon--Color` | `var(--pfe-theme--color--text--muted, #6a6e73)` | `icon` |
| `--pfe-clipboard--icon--Color--hover` | `var(--pfe-theme--color--ui-base--hover, #151515)` | `icon` |
| `--pfe-clipboard--icon--Color--dark` | `var(--pfe-theme--color--text--muted--on-dark, #d2d2d2)` | `icon` |
| `--pfe-clipboard--icon--Color--dark--hover` | `var(--pfe-theme--color--text--on-dark, #fff)` | `icon` |
| `--pfe-clipboard--icon--Color--saturated` | `var(--pfe-theme--color--text--muted--on-saturated, #d2d2d2)` | `icon` |
| `--pfe-clipboard--icon--Color--saturated--hover` | `var(--pfe-theme--color--text--on-saturated, #fff)` | `icon` |
:::