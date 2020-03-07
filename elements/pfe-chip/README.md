# PatternFly Element | Chip element
A Chip is used to display items that have been filtered or selected from a larger group. They comprise of a text element and a button component that is used to remove the chip from selection. When the text overflows it is truncated using ellipses. A chip can be grouped by using the &#34;chip-group&#34; layout.

## Usage
Describe how best to use this web component along with best practices.

```html
<pfe-chip>
    <!-- Default slot -->
    <h2>This is pfe-chip</h2>
    <!-- Named slots -->
    <div slot="badge">badge slot</div>
</pfe-chip>
```

### Accessibility
Explain how this component meets accessibility standards.

## Slots

- `badge`: Describe this slot and best practices around what markup it can contain.

## Attributes

- `pfe-aria-label`: Describe this attribute and what function is serves.
- `pfe- aria-labelledby`: Describe this attribute and what function is serves.
- `pfe- aria-hidden`: Describe this attribute and what function is serves.
- `pfe- read-only`: Describe this attribute and what function is serves.
- `pfe- variant`: Describe this attribute and what function is serves.

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

Chip (and all PFElements) use [Prettier][prettier] to auto-format JS and JSON. The style rules get applied when you commit a change. If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://prettier.io/docs/en/editors.html
[web-component-tester]: https://github.com/Polymer/web-component-tester
