# PatternFly Element | Clipboard element
Copy current URL to clipboard.

## Usage
Describe how best to use this web component along with best practices.

```html
<pfe-clipboard>
    <!-- Default slot -->
    <h2>This is pfe-clipboard</h2>
    <!-- Named slots -->
    <div slot="icon">icon slot</div>
</pfe-clipboard>
```

### Accessibility
Explain how this component meets accessibility standards.

## Slots

- `icon`: Describe this slot and best practices around what markup it can contain.

## Attributes

- `attr`: Describe each available attribute and what function is serves.

## Variable hooks

Available hooks for styling:

| Variable name | Default value | Region |
| --- | --- | --- |
| `--pfe-pfe-clipboard--Color` | `#252527` | N/A |

## Events
Describe any events that are accessible external to the web component. There is no need to describe all the internal-only functions.

### pfe-clipboard:click


## Dependencies
Describe any dependent elements or libraries here too.

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
