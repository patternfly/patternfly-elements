# WIP 🐣: RHElements Avatar Element

`rh-avatar` is an element for displaying a user's avatar image.  If the user in question has provided a custom avatar, provide it and it will be displayed.  If they don't, a nice colored pattern will be generated based on their name.  A specific name will always generate the same pattern, so users' avatars will stay static without the need for storing their generated image.


## Usage

```html
<rh-avatar name="Eleanore Stillwagon"></rh-avatar>

<rh-avatar name="Libbie Koscinski" shape="rounded" pattern="squares"></rh-avatar>

<rh-avatar name="Blanca Rohloff" show-initials pattern="triangles"></rh-avatar>

<rh-avatar name="Edwardo Lindsey" src="https://clayto.com/2014/03/rgb-webgl-color-cube/colorcube.jpg"></rh-avatar>
```

## Attributes

### name (observed) (required)

The user's name, either given name and family name, or username.  When displaying a pattern, the name will be used to seed the pattern generator.  The name is also used for displaying initials.

### src (observed)

The URL to the user's custom avatar image.  It will be displayed instead of a random pattern.

### pattern (observed)

The type of pattern to display.  Currently supported values are `"squares"` and `"triangles"`.

| squares | triangles |
| --- | --- |
| ![squares image](squares.png) | ![triangles image](triangles.png) |

### shape (observed)

The shape of the avatar itself.  Supported values are `"square"` (default), `"rounded"`, and `"circle"`.

### show-initials

This attribute indicates that the user's initials should be shown on top of the pattern.  It is not observed, per se, but it does respond when the attribute is added and removed, via CSS instead of `observedAttributes`.

## Styling

| Theme Var Hook | Description | Default |
| -------------- | ----------- | ------- |
| `--rh-avatar--colors` | A space-delimited list of colors to use for generated patterns.  Only hex values are supported, ex: `#fc0` or `#0fcb41`.  Any number of colors may be provided. | `#3B0083 #f0ab00 #007a87 #00b9e4 #92d400` |

## Test

    npm run test

## Build

    npm run build

## Demo

From the RHElements root directory, run:

    npm start

## Code style

Avatar (and all RHElements) use [Prettier][prettier] to auto-format JS and JSON. The style rules get applied when you commit a change. If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://prettier.io/docs/en/editors.html
[web-component-tester]: https://github.com/Polymer/web-component-tester

