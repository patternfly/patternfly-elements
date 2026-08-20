# Background image

`<pf-v6-background-image>` places an image in the background of a page or area of a page.

## Usage

```html
<pf-v6-background-image src="/assets/images/background.svg"></pf-v6-background-image>
```

The element uses fixed positioning and sits behind all other content at `z-index: -1`.

## Divergences from React `BackgroundImage`

### Not implemented

| React prop  | Notes                                          |
|-------------|-------------------------------------------------|
| `className` | Not needed; shadow DOM provides encapsulation. |
