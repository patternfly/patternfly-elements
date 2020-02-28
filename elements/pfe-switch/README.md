# PatternFly Element | Switch element
Creates a fancy switch element from checkbox markup

## Usage
Describe how best to use this web component along with best practices.

```html
<pfe-switch>
    <!-- Default slot -->
    <h2>This is pfe-switch</h2>
    <!-- Named slots -->
    <div slot="message-on">message-on slot</div>
    <div slot="message-off">message-off slot</div>
</pfe-switch>
```

### Accessibility
Explain how this component meets accessibility standards.

## Slots

- `message-on`: Describe this slot and best practices around what markup it can contain.
- `message-off`: Describe this slot and best practices around what markup it can contain.

## Attributes

- `pfe-form`: Describe this attribute and what function is serves.

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

Switch (and all PFElements) use [Prettier][prettier] to auto-format JS and JSON. The style rules get applied when you commit a change. If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://prettier.io/docs/en/editors.html
[web-component-tester]: https://github.com/Polymer/web-component-tester
