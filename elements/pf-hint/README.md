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
    <pf-button slot="toggle" plain aria-label="Actions">
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

- `(default)` – Body content of the hint.
- `title` – Optional title that appears above the body copy.
- `footer` – Optional footer content, typically links or buttons.
- `actions` – Optional actions menu (for example, a kebab dropdown in the top-right corner).

## CSS Custom Properties

- `--pf-c-hint--BackgroundColor` – Background color (`var(--pf-global--palette--blue-50, #e7f1fa)`).
- `--pf-c-hint--BorderColor` – Border color (`var(--pf-global--palette--blue-100, #bee1f4)`).
- `--pf-c-hint--BorderWidth` – Border width (`1px`).
- `--pf-c-hint--BorderRadius` – Border radius (`var(--pf-global--BorderRadius--sm, 3px)`).
- `--pf-c-hint--PaddingTop/Right/Bottom/Left` – Padding around the container (`var(--pf-global--spacer--lg, 1.5rem)`).
- `--pf-c-hint__title--FontSize` – Title font size (`1.125rem`).
- `--pf-c-hint__title--FontWeight` – Title font weight (`var(--pf-global--FontWeight--semi-bold, 700)`).
- `--pf-c-hint__body--FontSize` – Body font size (`1rem`).
- `--pf-c-hint__body--Color` – Body text color (`var(--pf-global--Color--100, #151515)`).
- `--pf-c-hint__footer--child--MarginRight` – Spacing between footer children (`1rem`).
- `--pf-c-hint__actions--c-dropdown--MarginTop` – Offset for dropdown actions (`calc(0.375rem * -1)`).

## CSS Parts

- `container`
- `title`
- `body`
- `footer`
- `actions`
