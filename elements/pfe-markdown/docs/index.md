---
layout: layout-basic.html
title: Markdown
description: Takes markdown as input and displays it as HTML
package: pfe-markdown
packages:
  - pfe-markdown
tags:
  - component
---

::: section header
# {{ title }}
:::

::: section
## Overview
Markdown takes markdown as input and displays it as HTML. This element uses the [marked.js library](https://marked.js.org/#/README.md#README.md) to convert the markdown to HTML.

<pfe-markdown>
  <div pfe-markdown-container># Heading Level 1
## Heading Level 2
This is a paragraph with [a link](https://patternflyelements.org).</div>
</pfe-markdown>
:::

::: section
## Installation

```shell
npm install @patternfly/{{ package }}
```
:::

::: section
## Usage

```html
<pfe-markdown>
  <div pfe-markdown-container># Heading Level 1
## Heading Level 2
This is a paragraph with [a link](https://patternflyelements.org).</div>
</pfe-markdown>
```

It is important that the div with the `pfe-markdown-container` attribute is present. Without it, the element won't work. This element does not actually use the shadow DOM to display it's contents.

At runtime, a child div with an attribute of `pfe-markdown-render` is appended to the light DOM and the `pfe-markdown-container` div is hidden with an inline style. The purpose behind this is so that all of the styles that are present in the light DOM are available to the converted markdown.
:::

::: section
## Slots
There is a default slot but it is just used to capture the light DOM and hide it.
:::

::: section
## Attributes
None
:::

::: section
## Methods
None
:::

::: section
## Events
None
:::

::: section
## Styling hooks
None
:::