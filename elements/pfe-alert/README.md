# PatternFly Element | Alert element
Notify the user about a change in status or other event without blocking other actions in an interface.

## Usage
Describe how best to use this web component along with best practices.

```html
<pfe-alert>
    <!-- Default slot -->
    <h2>This is pfe-alert</h2>
    
</pfe-alert>
```

### Accessibility
Explain how this component meets accessibility standards.

## Slots

- `namedSlot`: Describe each available slot and best practices around what markup it can contain.

## Attributes

- `attr`: Describe each available attribute and what function is serves.

## Variable hooks

Available hooks for styling:

| Variable name | Default value | Region |
| --- | --- | --- |
| `--pfe-pfe-alert--Color` | `#252527` | N/A |

## Events
Describe any events that are accessible external to the web component. There is no need to describe all the internal-only functions.


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

Alert (and all PFElements) use [Prettier][prettier] to auto-format JS and JSON. The style rules get applied when you commit a change. If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://prettier.io/docs/en/editors.html
[web-component-tester]: https://github.com/Polymer/web-component-tester
