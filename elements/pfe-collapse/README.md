# PatternFly Elements Collapse
     
`pfe-collapse`, `pfe-collapse-toggle`, and `pfe-collapse-panel` are all
elements that are meant to be extended. These elements contain no styling except
for the animation styles for `pfe-collapse-panel`.

Read more about Collapse in the [PatternFly Elements Collapse documentation](https://patternflyelements.org/components/collapse)

##  Installation

Load `<pfe-collapse>` via CDN:

```html
<script src="https://unpkg.com/@patternfly/pfe-collapse?module"></script>
```

Or, if you are using [NPM](https://npm.im), install it

```bash
npm install @patternfly/pfe-collapse
```

Then once installed, import it to your application:

```js
import '@patternfly/pfe-collapse';
```

## Usage

`pfe-collapse` automatically wires up the toggle and panel so when the
`pfe-collapse-toggle` is toggled, it will either open or close the
`pfe-collapse-panel`.

```html
<pfe-collapse>
  <pfe-collapse-toggle>
    This is the toggle
  </pfe-collapse-toggle>
  <pfe-collapse-panel>
    This is the panel
  </pfe-collapse-panel>
</pfe-collapse>
```

### Collapse with a preset ID

```html
<pfe-collapse>
  <pfe-collapse-toggle aria-controls="panel1">
    <h3>Collapse Toggle with preset ID</h3>
  </pfe-collapse-toggle>
  <pfe-collapse-panel id="panel1">
    <p>Panel content</p>
  </pfe-collapse-panel>
</pfe-collapse>
```

### Standalone toggle and panel (not wrapped in a pfe-collapse)

The toggle needs an `aria-controls` attribute that links to the `id` of the
panel.

```html
<pfe-collapse-toggle aria-controls="panel">
  Toggle the Standalone Panel
</pfe-collapse-toggle>
<p>Other content:</p>
<pfe-collapse-panel id="panel">
  <p>Panel content</p>
</pfe-collapse-panel>
```

### Standalone panel

A standalone panel can be opened by any action or event that toggles the
`expanded` property on the panel.

```html
<button>Toggle Panel</button>

<pfe-collapse-panel id="standalone-panel">
  <p>Panel content</p>
</pfe-collapse-panel>
```
```js
const collapse = document.querySelector("#standalone-panel");
const button = document.querySelector("button");
button.addEventListener("click", => collapse.expanded = !collapse.expanded);
```

