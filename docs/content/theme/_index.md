+++
title = "Theming overview"
description = "Use our beautifully designed theme, or modify it to your needs."
weight = 1
draft = false
bref = ""
toc = true
menu = "theme"
tags = [ "theme" ]
wcs = [ "pfe-cta", "pfe-card" ]
+++

## Theming 101

When referring to the "theme" in PatternFly Elements, we are talking about a set of CSS variables that, when built into the styles of the components, allow for a consistent styling across a site. Theme values are generically named using a BEM approach and focus on broad design concepts which makes them reusable in a variety of contexts.

Every component has these theme values in their styles, many utilizing the colors defined in the [palette](/theme/_3_pfe-color-palette/).

You can override any of these values in your "theme", based on the needs of your site. More on that later.

Often components will make decisions about how to best utilize the colors from the palette. A standard call-to-action component (`pfe-cta`), for example, uses the standard link color in its default state (`--pfe-theme--color--ui-link`), but if you set the `priority` attribute value to `primary`, the CTA will make use of the accent color from the palette for the background color instead.

```html
<pfe-cta priority="primary">
    <a href="#">Primary</a>
</pfe-cta>
```

<pfe-cta priority="primary">
    <a href="#">Primary</a>
</pfe-cta>

The `priority="primary"` variation of the `pfe-cta` makes use of the `ui-accent` color for the background because that link should be the brightest, boldest, most attention-grabbing item on the page.

By default, the `pfe-cta` styles call a particular variable stack comprised of a local variable (such as `--pfe-cta--BackgroundColor`), a theme variable (such as `--pfe-theme--color--ui-accent`), and a fallback value (`#06c`).  When putting a component on your page with no additional code, you will see your button using the fallback value, `#06c`.

But what happens if you don't want the standard `ui-accent` on your page to be `#06c`?

Your site can customize the value of any of the available theme assets!  You can change your `ui-accent` color for your entire site to be `#e00` by adding:

```css
:root {
	--pfe-theme--color--ui-accent: #e00;
}
```

(You don't have to use `:root`, it's just a common example in documentation related to CSS variables.)

Any other component making use of that same `ui-accent` value will inherit your customization creating a consistent experience for your users.

## Context

Each component comes equipped to adjust its colors depending on the context inside which it exists. For example, should you need to put a default CTA (which is blue) on a dark blue card, the CTA will need to adapt so that the text remain readable. You can do this by informing the component of its context by giving the `context` attribute the value of `dark`.

<pfe-card color="darkest">
    <pfe-cta>
        <a href="#">Default</a>
	</pfe-cta>
</pfe-card>

```html
<pfe-card color="darkest">
    <pfe-cta>
        <a href="#">Default</a>
	</pfe-cta>
</pfe-card>
```

Should you need to deviate from this color usage, and set your primary CTA to use the complement color from the palette, you may also pass a value of `complement` into the `color`  attribute, like this:

	<pfe-cta priority="primary" color="complement">
		<a href="#">Primary</a>
	</pfe-cta>

Please note that if you are opting to override colors of components, they will no longer automatically respond to the context.
