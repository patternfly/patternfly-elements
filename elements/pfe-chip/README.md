# PatternFly Element | Chip element

A Chip is used to display items that have been filtered or selected from a larger group. They comprise of a text element and a button component that is used to remove the chip from selection. When the text overflows it is truncated using ellipses. A chip can be grouped by using the &#34;chip-group&#34; layout.

## Usage

```html
<pfe-chip>Chip<span slot="badge">7</span></pfe-chip>

<pfe-chip badge="7">Chip</pfe-chip>
```

### Accessibility
Explain how this component meets accessibility standards.

## Slots

- `pfe-chip--badge`: Describe this slot and best practices around what markup it can contain.

## Attributes

- `read-only`: Describe this attribute and what function is serves.
- `overflow`: Describe this attribute and what function is serves.
- `badge`: Describe this attribute and what function is serves.

## Events
Describe any events that are accessible external to the web component. There is no need to describe all the internal-only functions.

### pfe-chip:close

### pfe-chip:load

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

Chip (and all PFElements) use [Prettier][prettier] to auto-format JS and JSON. The style rules get applied when you commit a change. If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://prettier.io/docs/en/editors.html
[web-component-tester]: https://github.com/Polymer/web-component-tester
