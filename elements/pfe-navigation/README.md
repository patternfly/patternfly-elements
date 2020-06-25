# PatternFly Element | Navigation element
Site navigation for Red Hat web sites

## Usage
Describe how best to use this web component along with best practices.

```html
<pfe-navigation>
    <!-- Default slot -->
    <h2>This is pfe-navigation</h2>
    <!-- Named slots -->
    <div slot="search">search slot</div>
    <div slot="customlinks">customlinks slot</div>
</pfe-navigation>
```

### Accessibility
Explain how this component meets accessibility standards.

## Slots

- `search`: Describe this slot and best practices around what markup it can contain.
- `customlinks`: Describe this slot and best practices around what markup it can contain.

## Attributes

- `pfe-state`: Describe this attribute and what function is serves.

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

Navigation (and all PFElements) use [Prettier][prettier] to auto-format JS and JSON. The style rules get applied when you commit a change. If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://prettier.io/docs/en/editors.html
[web-component-tester]: https://github.com/Polymer/web-component-tester
