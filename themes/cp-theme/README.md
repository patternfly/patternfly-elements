# # WIP 🐣: Customer Portal Theme for RHElements

Styles RHElements for the Red Hat Customer Portal.

## Usage

`cp-theme` requires [Overpass font][overpass] to be included via CDN.

### RequireJS / UMD
```html
<link rel="stylesheet" href="http://overpass-30e2.kxcdn.com/overpass.css" />
<script>require(['/path/to/themes/cp-theme/cp-theme.umd.js'])</script>
```

### W3C Spec
```html
<link rel="stylesheet" href="http://overpass-30e2.kxcdn.com/overpass.css" />
<link rel="stylesheet" href="/path/to/themes/cp-theme/cp-theme.css" />
```

## Test

    npm run test

## Build

    npm run build

## Demo

From the RHElements root directory, run:

    npm start

## Code style

Cta (and all RHElements) use [Prettier][prettier] to auto-format JS and JSON. The style rules get applied when you commit a change. If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[overpass]: http://overpassfont.org/
[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://prettier.io/docs/en/editors.html
[web-component-tester]: https://github.com/Polymer/web-component-tester
