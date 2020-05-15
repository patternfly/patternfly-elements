# PFElements Number Element

## Usage

```html
<pfe-number type="ordinal">4</pfe-number>
```

## Attributes

### number (observed)

Reflects the number that is in the light DOM.

### format (observed)

Reflects the format that is being used to display the number.

### type (observed)

The type of display you want to show.

The options for type are:
- `ordinal`: (1st, 2nd, 3rd, 4th)
- `bytes`: (2 KiB, 9.54 Mib, 93 Gib)
- `abbrev`: (1k, 1m, 1b)
- `percent`: (10%, 50%, 100%)
- `e`: (2.000e+6)
- `thousands`: (97 654 321.123)

## Build

    npm run build

## Demo

From the PFElements root directory, run:

    npm start

## Code style

Number (and all PFElements) use [Prettier][prettier] to auto-format JS and JSON.  The style rules get applied when you commit a change.  If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://prettier.io/docs/en/editors.html
