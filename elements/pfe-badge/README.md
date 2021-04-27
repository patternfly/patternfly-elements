# PatternFly Element | Badge Element

The badge component provides a way to have small numerical descriptors for UI elements. To provide context to your badge, it is highly encouraged that you also include an `aria-label` attribute in your markup.

```html
<section>
    <pfe-badge aria-label="2 unread messages" number="2" threshold="10">2</pfe-badge>
</section>
```

Please refer to the [specification](https://www.w3.org/TR/wai-aria/#aria-label) for additional details.

## Usage

With the `threshold` attribute:

```html
<section>
    <pfe-badge number="1" threshold="10">1</pfe-badge>
    <pfe-badge number="17" threshold="20">17</pfe-badge>
    <pfe-badge number="900" threshold="100">900</pfe-badge>
</section>
```
With multiple state options for the `state` attribute:

```html
<section>
    <pfe-badge state="info" number="10">10</pfe-badge>
    <pfe-badge state="success" number="20">20</pfe-badge>
    <pfe-badge state="moderate" number="30">30</pfe-badge>
    <pfe-badge state="important" number="40">40</pfe-badge>
    <pfe-badge state="critical" number="50">50</pfe-badge>
    <pfe-badge state="default" number="60">60</pfe-badge>
</section>
```

## Attributes

<style>
    .color-preview {
        display: inline-block;
        width: 1em;
        height: 1em;
        vertical-align: middle;
        border: 1px solid #444;
    }
</style>

There are several attributes available for customizing the visual treatment of pfe-badge.

- `number`: Sets a numeric value for a badge. You can pair it with `threshold` attribute to add a `+` sign if the number exceeds the threshold value.

- `threshold`: Sets a threshold for the numeric value and adds `+` sign if the numeric value exceeds the threshold value.

- `state`: Options include moderate, important, critical, success, info. The badge has a default
`background-color`: <span class="color-preview" style="background-color:#b5b5b5"></span> #b5b5b5 and
`color`: <span class="color-preview" style="background-color:#333"></span> #333333

    | state     | theme color                                                                    |
    |-----------|--------------------------------------------------------------------------------|
    | info      | background-color: <span class="color-preview" style="background-color:#0277bd"></span> #0277bd color: <span class="color-preview" style="background-color:#fff"></span> #ffffff    |
    | moderate  | background-color: <span class="color-preview" style="background-color:#d89900"></span> #d89900 color: <span class="color-preview" style="background-color:#fff"></span> #ffffff    |
    | success   | background-color: <span class="color-preview" style="background-color:#2e7d32"></span> #2e7d32 color: <span class="color-preview" style="background-color:#fff"></span> #ffffff    |
    | critical  | background-color: <span class="color-preview" style="background-color:#c90000"></span> #c90000 color: <span class="color-preview" style="background-color:#fff"></span> #ffffff    |
    | important | background-color: <span class="color-preview" style="background-color:#ef3900"></span> #ef3900 color: <span class="color-preview" style="background-color:#fff"></span> #ffffff    |

## Styling


| Theme hook                                        | Description                                               | Default                                     |
| ----------------------------------------------------- | --------------------------------------------------------- | ------------------------------------------- |
| `--pfe-badge--BackgroundColor`                        | Default `<pfe-badge>` background color                    | $pfe-color--feedback--default--lightest     |
| `--pfe-badge--BorderRadius`                           | Default `<pfe-badge>` border radius                       | $pfe-var--ui--border-radius * 30            |
| `--pfe-badge--Color`                                  | Default `<pfe-badge>` color                               | $pfe-color--text                            |
| `--pfe-badge--FontSize`                               | Default `<pfe-badge>` font size                           | $pfe-var--font-size * 0.75                  |
| `--pfe-badge--FontWeight`                             | Default `<pfe-badge>` font weight                         | $pfe-var--font-weight--semi-bold            |
| `--pfe-badge--MinWidth`                               | Default `<pfe-badge>` min width                           | $pfe-var--ui--border-width * 2              |
| `--pfe-badge--PaddingLeft`                            | Default `<pfe-badge>` padding left                        | $pfe-var--container-padding * 0.5           |
| `--pfe-badge--PaddingRight`                           | Default `<pfe-badge>` padding right                       | $pfe-var--container-padding * 0.5           |


## Test

    npm run test

## Build

    npm run build

## Demo

From the PFElements root directory, run:

    npm start

## Code style

Badge (and all PFElements) use [Prettier][prettier] to auto-format JS and JSON. The style rules get applied when you commit a change. If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://github.com/prettier/prettier/#editor-integration
[web-component-tester]: https://github.com/Polymer/web-component-tester
