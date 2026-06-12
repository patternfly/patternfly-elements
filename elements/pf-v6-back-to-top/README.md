# Back to top

`<pf-v6-back-to-top>` is a shortcut that allows users to quickly navigate to the top of a lengthy content page.

## Usage

```html
<!-- Link mode (progressive enhancement, works without JS) -->
<pf-v6-back-to-top href="#top">Back to top</pf-v6-back-to-top>

<!-- Button mode (scrolls via JS) -->
<pf-v6-back-to-top>Back to top</pf-v6-back-to-top>

<!-- Always visible -->
<pf-v6-back-to-top always-visible href="#top">Back to top</pf-v6-back-to-top>
```

## Divergences from React `BackToTop`

### Changed API

| React prop          | Web component           | Difference                                                                 |
|---------------------|-------------------------|---------------------------------------------------------------------------|
| `title`             | Default slot             | React uses a `title` prop for button text; WC uses slotted content.       |
| `isAlwaysVisible`   | `always-visible`         | Boolean attribute instead of React prop.                                  |
| `scrollableSelector`| `scrollable-selector`    | Dash-case attribute for the camelCase property.                           |

### Added

| Web component API      | Notes                                                                                 |
|------------------------|---------------------------------------------------------------------------------------|
| `href`                 | When set, renders as an `<a>` link instead of a `<button>`. Progressive enhancement.  |
| `accessible-label`     | Sets the accessible name when no visible text is slotted.                             |
| Default slot           | Accepts rich content for the button text. Defaults to "Back to top".                  |
