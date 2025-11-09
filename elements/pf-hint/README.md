# PatternFly Elements Hint

A **hint** is in-app messaging that provides a one-step reminder, explanation, or call to action for a page or modal. Hints provide information about an interaction or prerequisite step that might not be immediately obvious to the user.

Read more about Hint in the [PatternFly Elements Hint documentation](https://patternflyelements.org/components/hint)

## Installation

Load `<pf-hint>` via CDN:

```html
<script src="https://jspm.dev/@patternfly/elements/pf-hint/pf-hint.js"></script>
```

Or, if you are using [NPM](https://npm.im/), install it

```bash
npm install @patternfly/elements
```

Then once installed, import it to your application:

```js
import '@patternfly/elements/pf-hint/pf-hint.js';
```

## Usage

### Default with no title

Basic hint without a title, used for simple informational messages.

```html
<pf-hint>
  Welcome to the new documentation experience.
  <a href="#">Learn more about the improved features</a>.
</pf-hint>
```

### Hint with title

Add a title to your hint to provide more context to the user.

```html
<pf-hint>
  <span slot="title">Do more with Find it Fix it capabilities</span>
  Upgrade to Red Hat Smart Management to remediate all your systems across regions and geographies.
</pf-hint>
```

### Hint with footer

```html
<pf-hint>
  <span slot="title">Do more with Find it Fix it capabilities</span>
  Upgrade to Red Hat Smart Management to remediate all your systems across regions and geographies.
  <pf-button slot="footer" variant="link" inline>
    <a href="#">Try it for 90 days</a>
  </pf-button>
</pf-hint>
```

### Hint with actions

```html
<pf-hint>
  <pf-dropdown slot="actions">
    <pf-button slot="trigger" plain aria-label="Actions">
      <pf-icon icon="ellipsis-v"></pf-icon>
    </pf-button>
    <pf-dropdown-menu>
      <pf-dropdown-item>
        <a href="#">Link</a>
      </pf-dropdown-item>
      <pf-dropdown-item>
        <button type="button">Action</button>
      </pf-dropdown-item>
    </pf-dropdown-menu>
  </pf-dropdown>
  <span slot="title">Do more with Find it Fix it capabilities</span>
  Upgrade to Red Hat Smart Management to remediate all your systems across regions and geographies.
</pf-hint>
```

## Slots

| Slot      | Description                                                                |
| --------- | -------------------------------------------------------------------------- |
| (default) | Body content of the hint                                                   |
| `title`   | Optional title for the hint                                                |
| `footer`  | Optional footer content, typically containing action links or buttons      |
| `actions` | Optional actions menu (e.g., kebab dropdown menu in the top-right corner)  |

## CSS Custom Properties

| Property                          | Description                          | Default                                        |
| --------------------------------- | ------------------------------------ | ---------------------------------------------- |
| `--pf-c-hint--BackgroundColor`    | Background color of the hint         | `var(--pf-global--BackgroundColor--light-300)` |
| `--pf-c-hint--BorderRadius`       | Border radius of the hint container  | `var(--pf-global--BorderRadius--sm)`           |
| `--pf-c-hint--Padding`            | Padding around the hint content      | `var(--pf-global--spacer--md)`                 |
| `--pf-c-hint__title--FontSize`    | Font size of the title               | `var(--pf-global--FontSize--md)`               |
| `--pf-c-hint__title--FontWeight`  | Font weight of the title             | `var(--pf-global--FontWeight--semi-bold)`      |
| `--pf-c-hint__body--FontSize`     | Font size of the body text           | `var(--pf-global--FontSize--sm)`               |
| `--pf-c-hint__body--Color`        | Color of the body text               | `var(--pf-global--Color--100)`                 |

## CSS Parts

| Part        | Description              |
| ----------- | ------------------------ |
| `container` | The hint container       |
| `title`     | The title element        |
| `body`      | The body element         |
| `footer`    | The footer element       |
| `actions`   | The actions element      |
