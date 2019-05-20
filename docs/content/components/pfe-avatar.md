# pfe-avatar

Here is a description of my web component.

## Attributes

| Attribute     | Type  |
|---------------|-------|
| `my-attr`     | `any` |
| `pfe-name`    | `any` |
| `pfe-pattern` | `any` |
| `pfe-shape`   | `any` |
| `pfe-src`     | `any` |

## Properties

| Property  | Attribute     | Type     | Description                                      |
|-----------|---------------|----------|--------------------------------------------------|
| `myProp`  |               | `string` | You can use this jsdoc tag to document properties. |
| `name`    | `pfe-name`    | `any`    |                                                  |
| `pattern` | `pfe-pattern` | `any`    | The shape used in the geometric pattern for anonymous users. |
| `src`     | `pfe-src`     | `any`    |                                                  |
| `value`   |               | `any`    |                                                  |

## CSS Custom Properties

| Property               | Description                                      |
|------------------------|--------------------------------------------------|
| `--pfe-avatar--colors` | the color palette for anonymous avatars.  The value can be a series of hex color values separated by spaces, for example: `--pfe-avatar--colors: "#67accf #448087 #709c6b #a35252 #826cbb"` |
| `--pfe-avatar--width`  | the width (and height, it's a square) of the avatar. |
