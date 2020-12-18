# PatternFly Element | Codeblock element
Render code in a styled and fromatted way

## Usage
Describe how best to use this web component along with best practices.

```html
<pfe-codeblock>
    <!-- Default slot -->
    <h2>This is pfe-codeblock</h2>
    
</pfe-codeblock>
```

### Accessibility
Explain how this component meets accessibility standards.

## Slots

- `namedSlot`: Describe each available slot and best practices around what markup it can contain.

## Attributes

- `pfe-codeLanguage`: Describe this attribute and what function is serves.
- `pfe-codeLineNumbers`: Describe this attribute and what function is serves.
- `pfe-codeLineNumberStart`: Describe this attribute and what function is serves.
- `pfe-codeTheme`: Describe this attribute and what function is serves.

## Variable hooks

Available hooks for styling:

| Variable name | Default value | Region |
| --- | --- | --- |
| `--pfe-pfe-codeblock--Color` | `#252527` | N/A |

## Events
Describe any events that are accessible external to the web component. There is no need to describe all the internal-only functions.

### pfe-codeblock:change

### pfe-codeblock:click


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

Codeblock (and all PFElements) use [Prettier][prettier] to auto-format JS and JSON. The style rules get applied when you commit a change. If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://prettier.io/docs/en/editors.html
[web-component-tester]: https://github.com/Polymer/web-component-tester
