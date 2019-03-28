# Helper Sass

All of the variables and mixins that are available to pfe-elements.

## Themes

Themes describe the context of an element, especially as relates to background color.

### Variable naming

Several broadcast variables exist and are useful in conveying information to nested light DOM content about surface colors the component may be invoking. To support the various themes, you will see this following added to broadcast variables: `--on-dark`, `--on-saturated` (a variable without an indicator are aligned with the light theme).

Note that state appears after the context, i.e., `--pfe-broadcast--ui-link--on-dark--hover`.

### Attribute support
On an element that's surface color is coming from outside the PatternFly Elements system, an optional `on="dark"`, `on="saturated"`, and `on="light"` context are supported.  Those properties will invoke text and ui-link values for that context and assign them to the broadcasted variables to be optionally picked up. The `on="light"` context is useful for countering a known dark context from a parent element but is not needed normally as light is the default.

## Surface colors

<style>
    .color-preview {
        display: inline-block;
        width: 1em;
        height: 1em;
        vertical-align: middle;
        background-color: var(--bg, #ffffff);
        border: 1px solid #444444;
    }
</style>

| color | hex | associated theme |
|-------|-----| ------- |
| lightest | <span class="color-preview" style="--bg:#ffffff"></span> #ffffff | light |
| lighter | <span class="color-preview" style="--bg:#ececec"></span> #ececec | light |
| base | <span class="color-preview" style="--bg:#dfdfdf"></span> #dfdfdf | light |
| darker | <span class="color-preview" style="--bg:#464646"></span> #464646 | dark |
| darkest | <span class="color-preview" style="--bg:#131313"></span> #131313 | dark |
| accent | <span class="color-preview" style="--bg:#fe460d"></span> #fe460d | saturated |
| complement | <span class="color-preview" style="--bg:#0477a4"></span> #0477a4 | saturated |

### Attribute support

Invoking these colors in a component is easy using the `set-surface-colors` mixin.

```sass
@include set-surface-colors(
    $component-name: foo,
    $colors: (lightest, darkest),
    $properties: (BackgroundColor)
);
```

This would render the following in your component:

```css
:host([pfe-color="lightest"]) {
    --pfe-foo--BackgroundColor: var(--pfe-theme--color--surface--lightest, #fff);
  --pfe-broadcasted--color--text: var(--pfe-theme--text, #333);
  --pfe-broadcasted--color--ui-link: var(--pfe-theme--ui-link, #06c);
  --pfe-broadcasted--color--ui-link--visited: var(--pfe-theme--ui-link--visited, rebeccapurple);
  --pfe-broadcasted--color--ui-link--hover: var(--pfe-theme--ui-link--hover, #003366);
  --pfe-broadcasted--color--ui-link--focus: var(--pfe-theme--ui-link--focus, #003366);
}

:host([pfe-color="darkest"]) {
    --pfe-foo--BackgroundColor: var(--pfe-theme--color--surface--darkest, #131313);
  --pfe-broadcasted--color--text: var(--pfe-theme--text--on-dark, #fff);
  --pfe-broadcasted--color--ui-link: var(--pfe-theme--ui-link--on-dark, #99ccff);
  --pfe-broadcasted--color--ui-link--visited: var(--pfe-theme--ui-link--on-dark--visited, #b38cd9);
  --pfe-broadcasted--color--ui-link--hover: var(--pfe-theme--ui-link--on-dark--hover, #cce6ff);
  --pfe-broadcasted--color--ui-link--focus: var(--pfe-theme--ui-link--on-dark--focus, #cce6ff);
}
```