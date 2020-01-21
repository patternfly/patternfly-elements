
+++
title = "Theme palette"
description = ""
weight = 2
draft = false
bref = ""
toc = true
menu = "theme"
tags = [ "theme" ]
+++

<style>
    .color-preview {
        display: inline-block;
        width: 1em;
        height: 1em;
        vertical-align: middle;
        background-color: var(--bg, #fff);
        border: 1px solid #444;
    }
</style>

## List of theme palette variables

These variables are global hooks to override colors, fonts, spacing and more throughout the library of web components. Generally this is all you need, though component specific variables are also available. Feel free to copy this list and define the values needed for your site or application. Please note that the logo URL paths are empty here.

| Variable name | Type       | Project default |
| ------------- | ---------- | --- |
| `--pfe-theme--color--ui-base` | Color | <span class="color-preview" style="--bg:#0477a4"></span> #0477a4 |
| `--pfe-theme--color--ui-base--hover` | Color | <span class="color-preview" style="--bg:#022f40"></span> #022f40 |
| `--pfe-theme--color--ui-base--focus` | Color | <span class="color-preview" style="--bg:#022f40"></span> #022f40 |
| `--pfe-theme--color--ui-base--text` | Color | <span class="color-preview" style="--bg:#ffffff"></span> #ffffff |
| `--pfe-theme--color--ui-base--text--hover` | Color | <span class="color-preview" style="--bg:#ffffff"></span> #ffffff |
| `--pfe-theme--color--ui-base--text--focus` | Color | <span class="color-preview" style="--bg:#ffffff"></span> #ffffff |
| `--pfe-theme--color--ui-complement` | Color | <span class="color-preview" style="--bg:#464646"></span> #464646 |
| `--pfe-theme--color--ui-complement--text` | Color | <span class="color-preview" style="--bg:#ffffff"></span> #ffffff |
| `--pfe-theme--color--ui-complement--hover` | Color | <span class="color-preview" style="--bg:#131313"></span> #131313 |
| `--pfe-theme--color--ui-complement--text--hover` | Color | <span class="color-preview" style="--bg:#ffffff"></span> #ffffff |
| `--pfe-theme--color--ui-accent` | Color | <span class="color-preview" style="--bg:#e00"></span> #e00 |
| `--pfe-theme--color--ui-accent--hover` | Color | <span class="color-preview" style="--bg:#880000"></span> #880000 |
| `--pfe-theme--color--ui-accent--focus` | Color | <span class="color-preview" style="--bg:#880000"></span> #880000 |
| `--pfe-theme--color--ui-accent--text` | Color | <span class="color-preview" style="--bg:#ffffff"></span> #ffffff |
| `--pfe-theme--color--ui-accent--text--hover` | Color | <span class="color-preview" style="--bg:#ffffff"></span> #ffffff |
| `--pfe-theme--color--ui-accent--text--focus` | Color | <span class="color-preview" style="--bg:#ffffff"></span> #ffffff |
| `--pfe-theme--color--ui-disabled` | Color | <span class="color-preview" style="--bg:#d2d2d2"></span> #d2d2d2 |
| `--pfe-theme--color--ui-disabled--hover` | Color | <span class="color-preview" style="--bg:#d2d2d2"></span> #d2d2d2 |
| `--pfe-theme--color--ui-disabled--text` | Color | <span class="color-preview" style="--bg:#797979"></span> #797979 |
| `--pfe-theme--color--ui-disabled--text--hover` | Color | <span class="color-preview" style="--bg:#797979"></span> #797979 |
| `--pfe-theme--color--ui-disabled--text--focus` | Color | <span class="color-preview" style="--bg:#797979"></span> #797979 |
| `--pfe-theme--color--surface--lightest` | Color | <span class="color-preview" style="--bg:#ffffff"></span> #ffffff |
| `--pfe-theme--color--surface--lightest--theme` | Theme descriptions (light, dark, saturated) | light |
| `--pfe-theme--color--surface--lighter` | Color | <span class="color-preview" style="--bg:#ececec"></span> #ececec |
| `--pfe-theme--color--surface--lighter--theme` | Theme descriptions | light |
| `--pfe-theme--color--surface--base` | Color | <span class="color-preview" style="--bg:#dfdfdf"></span> #dfdfdf |
| `--pfe-theme--color--surface--base--theme` | Theme descriptions | light |
| `--pfe-theme--color--surface--darker` | Color | <span class="color-preview" style="--bg:#464646"></span> #464646 |
| `--pfe-theme--color--surface--darker--theme` | Theme descriptions | dark |
| `--pfe-theme--color--surface--darkest` | Color | <span class="color-preview" style="--bg:#131313"></span> #131313 |
| `--pfe-theme--color--surface--darkest--theme` | Theme descriptions | dark |
| `--pfe-theme--color--surface--complement` | Color | <span class="color-preview" style="--bg:#0477a4"></span> #0477a4 |
| `--pfe-theme--color--surface--complement--theme` | Theme descriptions | saturated |
| `--pfe-theme--color--surface--accent` | Color | <span class="color-preview" style="--bg:#e00"></span> #e00 |
| `--pfe-theme--color--surface--accent--theme` | Theme descriptions | saturated |
| `--pfe-theme--ui--border-width` | Size | 1px |
| `--pfe-theme--ui--border-style` | Border settings | solid |
| `--pfe-theme--ui--border-radius` | Size | 2px |
| `--pfe-theme--surface--border-width` | Size | 1px |
| `--pfe-theme--surface--border-width--heavy` | Size | 4px |
| `--pfe-theme--surface--border-style` | Border settings | solid |
| `--pfe-theme--surface--border-radius` | Size | 3px |
| `--pfe-theme--surface--border--lightest` | Color | <span class="color-preview" style="--bg:#b5b5b5"></span> #b5b5b5 |
| `--pfe-theme--surface--border--lighter` | Color | <span class="color-preview" style="--bg:#b5b5b5"></span> #b5b5b5 |
| `--pfe-theme--surface--border` | Color | <span class="color-preview" style="--bg:#d2d2d2"></span> #d2d2d2 |
| `--pfe-theme--surface--border--darker` | Color | <span class="color-preview" style="--bg:#dfdfdf"></span> #dfdfdf |
| `--pfe-theme--surface--border--darkest` | Color | <span class="color-preview" style="--bg:#a8a8a8"></span> #a8a8a8 |
| `--pfe-theme--container-spacer` | Size | 16px |
| `--pfe-theme--container-padding` | Size | 16px |
| `--pfe-theme--content-spacer` | Size | 24px |
| `--pfe-theme--animation-timing` | Animation settings | cubic-bezier(0.465, 0.183, 0.153, 0.946) |
| `--pfe-theme--box-shadow--sm` | Box shadow | 0 pfe-size-prem(1) pfe-size-prem(2) 0 rgba(19, 19, 19, 0.2) |
| `--pfe-theme--box-shadow--md` | Box shadow | var(--pfe-theme--box-shadow--md, 0 0.125rem 0.0625rem 0.0625rem rgba(19, 19, 19, 0.12), 0 0.25rem 0.6875rem 0.375rem rgba(19, 19, 19, 0.05)) |
| `--pfe-theme--box-shadow--lg` | Box shadow | var(--pfe-theme--box-shadow--lg, 0 0.1875rem 0.4375rem 0.1875rem rgba(19, 19, 19, 0.13), 0 0.6875rem 1.5rem 1rem rgba(19, 19, 19, 0.12)) |
| `--pfe-theme--box-shadow--inset` | Box shadow | var(--pfe-theme--box-shadow--inset, inset 0 0 0.625rem 0 #f3f3f3) |
| `--pfe-theme--zindex--modal` | Number | 99 |
| `--pfe-theme--zindex--navigation` | Number | 98 |
| `--pfe-theme--zindex--content` | Number | 0 |
| `--pfe-theme--font-size--heading--alpha` | Size | 32px |
| `--pfe-theme--font-size--heading--beta` | Size | 24px |
| `--pfe-theme--font-size--heading--gamma` | Size | 21px |
| `--pfe-theme--font-size--heading--delta` | Size | 18px |
| `--pfe-theme--font-size--heading--epsilon` | Size | 16px |
| `--pfe-theme--font-size--heading--zeta` | Size | 14px |
| `--pfe-theme--font-size` | Size | 16px |
| `--pfe-theme--line-height` | Line-height | 1.5 |
| `--pfe-theme--font-weight--light` | Font weight | 300 |
| `--pfe-theme--font-weight--normal` | Font weight | 500 |
| `--pfe-theme--font-weight--semi-bold` | Font weight | 600 |
| `--pfe-theme--font-weight--bold` | Font weight | 700 |
| `--pfe-theme--font-family` | Font | "Overpass", Overpass, Helvetica, helvetica, arial, sans-serif |
| `--pfe-theme--font-family--heading` | Font | "Overpass", Overpass, Helvetica, helvetica, arial, sans-serif |
| `--pfe-theme--font-family--code` | Font | "Overpass Mono", Consolas, Monaco, 'Andale Mono', monospace |
| `--pfe-theme--color--text` | Color | <span class="color-preview" style="--bg:#333333"></span> #333333 |
| `--pfe-theme--color--text--on-dark` | Color | <span class="color-preview" style="--bg:#fff"></span> #fff |
| `--pfe-theme--color--text--on-saturated` | Color | <span class="color-preview" style="--bg:#eee"></span> #eee |
| `--pfe-theme--color--link` | Color | <span class="color-preview" style="--bg:#0066cc"></span> #0066cc |
| `--pfe-theme--color--link--hover` | Color | <span class="color-preview" style="--bg:#004080"></span> #004080 |
| `--pfe-theme--color--link--focus` | Color | <span class="color-preview" style="--bg:#004080"></span> #004080 |
| `--pfe-theme--color--link--visited` | Color | <span class="color-preview" style="--bg:#0066cc"></span> #0066cc |
| `--pfe-theme--color--link--on-dark` | Color | <span class="color-preview" style="--bg:#73bcf7"></span> #73bcf7 |
| `--pfe-theme--color--link--hover--on-dark` | Color | <span class="color-preview" style="--bg:#2b9af3"></span> #2b9af3 |
| `--pfe-theme--color--link--focus--on-dark` | Color | <span class="color-preview" style="--bg:#2b9af3"></span> #2b9af3 |
| `--pfe-theme--color--link--visited--on-dark` | Color | <span class="color-preview" style="--bg:#73bcf7"></span> #73bcf7 |
| `--pfe-theme--color--link--on-saturated` | Color | <span class="color-preview" style="--bg:#ffffff"></span> #ffffff |
| `--pfe-theme--color--link--hover--on-saturated` | Color | <span class="color-preview" style="--bg:#d2d3d5"></span> #d2d3d5 |
| `--pfe-theme--color--link--focus--on-saturated` | Color | <span class="color-preview" style="--bg:#d2d3d5"></span> #d2d3d5 |
| `--pfe-theme--color--link--visited--on-saturated` | Color | <span class="color-preview" style="--bg:#ffffff"></span> #ffffff |
| `--pfe-theme--link-decoration` | Text decoration | none |
| `--pfe-theme--link-decoration--hover` | Text decoration | underline |
| `--pfe-theme--link-decoration--focus` | Text decoration | underline |
| `--pfe-theme--link-decoration--visited` | Text decoration | none |
| `--pfe-theme--link-decoration--on-dark` | Text decoration | none |
| `--pfe-theme--link-decoration--hover--on-dark` | Text decoration | underline |
| `--pfe-theme--link-decoration--focus--on-dark` | Text decoration | underline |
| `--pfe-theme--link-decoration--visited--on-dark` | Text decoration | none |
| `--pfe-theme--link-decoration--on-saturated` | Text decoration | underline |
| `--pfe-theme--link-decoration--hover--on-saturated` | Text decoration | underline |
| `--pfe-theme--link-decoration--focus--on-saturated` | Text decoration | underline |
| `--pfe-theme--link-decoration--visited--on-saturated` | Text decoration | underline | 