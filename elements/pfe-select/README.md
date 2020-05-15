# PatternFly Element | Select Element

The select component provides a way to create list of options in a form.

There are 3 ways of providing options to your component:

- Users can provide options using ```<select>``` element inside ```<pfe-select>```
- Users can pass custom options as an array of objects to the `pfeOptions` setter function
- Users can append more options by using an `addOptions()` API

Note: pfe-select component can also be used in places where dropdowns are needed but its more suitable for forms. For dropdowns, there will be a separate component.

## Usage

With `<select>` element:

```html
<pfe-select>
  <select>
    <option disabled>Please select an option</option>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
  </select>
</pfe-select>
```
Without `<select>` element:

```html
<pfe-select></pfe-select>
```

For custom options, use the `pfeOptions` setter function to set the options as shown in snippet below:

```js
 let selectWithJSOptionsOnly = document.querySelector("pfe-select");
  customElements.whenDefined("pfe-select").then(() => {
    selectWithJSOptionsOnly.pfeOptions = [
      { text: "Please select an Option", value: "", selected: true },
      { text: 'One', value: '1', selected: false },
      { text: 'Two', value: '2', selected: false },
      { text: 'Three', value: '3', selected: false}
    ];
  });
```

## Slots

### Default slot in pfe-select

Place your `<select>` element with or without `<option>`s' here.

## Attributes

**`pfe-invalid`**
Changes the color and width of border-bottom of `<pfe-select>`

| Value             | Description                                                               |
| ----------------- | ------------------------------------------------------------------------- |
| `true`            | Sets the border-bottom-color to `feedback--critical` theme color and border-bottom-width to 2px |
| `false` (default) | Sets the border-bottom-color to `surface--darker` theme color and border-bottom-width to default 1px         |

## Styling


| Theme Var Hook                                        | Description                                               | Default                                     |
| ----------------------------------------------------- | --------------------------------------------------------- | ------------------------------------------- |
| `--pfe-select--BackgroundColor`                       | Default `<pfe-select>` background color                   | $pfe-color--ui--lightest                  |
| `--pfe-select--BorderWidth`                           | Default `<pfe-select>` border width                       | $pfe-var--ui--border-width                |
| `--pfe-select--BorderBottomWidth`                     | Default `<pfe-select>` border bottom width                | $pfe-var--ui--border-width                |
| `--pfe-select--BorderColor`                           | Default `<pfe-select>` border color                       | $pfe-color--surface--lighter              |
| `--pfe-select--BorderBottomColor`                     | Default `<pfe-select>` border bottom color                | $pfe-color--surface--darker               |
| `--pfe-select--BorderBottomColor--hover`              | Border bottom color on `<pfe-select>` hover               | $pfe-color--surface--ui-link              |
| `--pfe-select--BorderBottomColor--error`              | Border bottom color on `<pfe-select>` error               | $pfe-color--feedback--critical            |
| `--pfe-select--BorderTop`                             | Default `<pfe-select>` border top                         | $pfe-var--pfe-select--BorderWidth $pfe-var--ui--border-style $pfe-var--pfe-select--BorderColor                                                                                                                               |
| `--pfe-select--BorderLeft`                            | Default `<pfe-select>` border left                        | $pfe-var--pfe-select--BorderWidth $pfe-var--ui--border-style $pfe-var--pfe-select--BorderColor                                                                                                                               |
| `--pfe-select--BorderRight`                           | Default `<pfe-select>` border right                       | $pfe-var--pfe-select--BorderWidth $pfe-var--ui--border-style $pfe-var--pfe-select--BorderColor                                                                                                                               |
| `--pfe-select--BorderBottom`                          | Default `<pfe-select>` border bottom                      | $pfe-var--pfe-select--BorderBottomWidth $pfe-var--ui--border-style $pfe-var--pfe-select--BorderBottomColor                                                                                              |
| `--pfe-select--BorderBottom--hover`                   | Border bottom on `<pfe-select>` hover                     | $pfe-var--pfe-select--BorderBottomWidth $pfe-var--ui--border-style $pfe-var--pfe-select--BorderBottomColor--hover                                                                                       |
| `--pfe-select--BackgroundColor`                       | Default `<pfe-select>` background color                   | $pfe-color--ui--lightest                  |
| `--pfe-select--Color`                                 | Default `<pfe-select>` color                              | $pfe-color--text                          |

## Events

### pfe-select:change

Fires when an option is selected or deselected. The detail object contains the
following

```
detail: {
  value: String
}
```

## Test

    npm run test

## Build

    npm run build

## Demo

From the PFElements root directory, run:

    npm start

## Code style

Select (and all PFElements) use [Prettier][prettier] to auto-format JS and JSON. The style rules get applied when you commit a change. If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://github.com/prettier/prettier/#editor-integration
[web-component-tester]: https://github.com/Polymer/web-component-tester
