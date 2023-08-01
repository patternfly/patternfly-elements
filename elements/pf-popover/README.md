# Popover

A Popover displays content in a non-modal dialog and adds contextual information or provides resources via text and links.

## Usage

Read more about popovers in the [PatternFly Elements Popover documentation](https://patternflyelements.org/components/popover)

## Installation

Load `<pf-popover>` via CDN:

```html
<script src="https://jspm.dev/@patternfly/elements/pf-popover/pf-popover.js"></script>
```

Or, if you are using [NPM](https://npm.im), install it

```bash
npm install @patternfly/elements
```

Then once installed, import it to your application:

```js
import '@patternfly/elements/pf-popover/pf-popover.js';
```

## Usage

### Basic Popover

```html
<pf-popover heading="Popover heading"
            body="Popovers are triggered by click rather than hover."
            footer="Popover footer">
  <pf-button>Toggle popover</pf-button>
</pf-popover>
```

```html
<pf-popover>
  <h3 slot="heading">Popover heading</h3>
  <div slot="body">Popovers are triggered by click rather than hover.</div>
  <span slot="footer">Popover footer</span>
  <pf-button>Toggle popover</pf-button>
</pf-popover>
```
