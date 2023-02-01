# Popover

A Popover displays content in a non-modal dialog and adds contextual information or provides resources via text and links.

## Usage

Read more about popovers in the [PatternFly Elements Popover documentation](https://patternflyelements.org/components/popover)

## Installation

Load `<pfe-popover>` via CDN:

```html
<script src="https://unpkg.com/@patternfly/pfe-popover?module"></script>
```

Or, if you are using [NPM](https://npm.im), install it

```bash
npm install @patternfly/pfe-popover
```

Then once installed, import it to your application:

```js
import '@patternfly/pfe-popover';
```

## Usage

### Basic Tooltip

```html
<pfe-popover
  heading="Popover heading"
  body="Popovers are triggered by click rather than hover."
  footer="Popover footer"
>
  <pfe-button>Toggle popover</pfe-button>
</pfe-popover>
```

```html
<pfe-popover>
  <h3 slot="heading">Popover heading</h3>
  <div slot="body">Popovers are triggered by click rather than hover.</div>
  <span slot="footer">Popover footer</span>
  <pfe-button>Toggle popover</pfe-button>
</pfe-popover>
```
