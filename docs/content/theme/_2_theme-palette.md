
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


## List of theme palette variables

These variables are global hooks to override colors, fonts, spacing and more throughout the library of web components. Generally this is all you need, though component specific variables are also available. Feel free to copy this list and define the values needed for your site or application. Please note that the logo URL paths are empty here.

```
:root {
  --pfe-theme--color--ui-base: #0076e0;
  --pfe-theme--color--ui-base--text: #ffffff;
  --pfe-theme--color--ui-base--hover: #004080;
  --pfe-theme--color--ui-base--text--hover: #ffffff;
  --pfe-theme--color--ui-complement: #151515;
  --pfe-theme--color--ui-complement--text: #ffffff;
  --pfe-theme--color--ui-complement--hover: #464646;
  --pfe-theme--color--ui-complement--text--hover: #ffffff;
  --pfe-theme--color--ui-accent: #ee0000;
  --pfe-theme--color--ui-accent--text: #ffffff;
  --pfe-theme--color--ui-accent--hover: #d40000;
  --pfe-theme--color--ui-accent--text--hover: #ffffff;
  --pfe-theme--color--ui-disabled: #d2d2d2;
  --pfe-theme--color--ui-disabled--text: #707070;
  --pfe-theme--color--ui-disabled--hover: #d2d2d2;
  --pfe-theme--color--ui-disabled--text--hover: #aaaaaa;
  --pfe-theme--color--surface--lightest: #ffffff;
  --pfe-theme--color--surface--lightest--theme: light;
  --pfe-theme--color--surface--lighter: #f0f0f0;
  --pfe-theme--color--surface--lighter--theme: light;
  --pfe-theme--color--surface--base: #dddddd;
  --pfe-theme--color--surface--base--theme: light;
  --pfe-theme--color--surface--darker: #444444;
  --pfe-theme--color--surface--darker--theme: dark;
  --pfe-theme--color--surface--darkest: #1a1a1a;
  --pfe-theme--color--surface--darkest--theme: dark;
  --pfe-theme--color--surface--complement: #10565c;
  --pfe-theme--color--surface--complement--theme: saturated;
  --pfe-theme--color--surface--accent: #ee0000;
  --pfe-theme--color--surface--accent--theme: saturated;
  --pfe-theme--ui--border-width: 1px;
  --pfe-theme--ui--border-style: solid;
  --pfe-theme--ui--border-radius: 3px;
  --pfe-theme--surface--border-width: 1px;
  --pfe-theme--surface--border-style: solid;
  --pfe-theme--surface--border-radius: 3px;
  --pfe-theme--surface--border: #d2d2d2;
  --pfe-theme--surface--border-lightest: #ededed;
  --pfe-theme--surface--border-darkest: #333333;
  --pfe-theme--logo--favicon: url( );
  --pfe-theme--logo--svg: url( );
  --pfe-theme--logo--svg--on-dark: url( );
  --pfe-theme--logo--png: url( );
  --pfe-theme--logo--png--on-dark: url( );
  --pfe-theme--container-spacer: 16px;
  --pfe-theme--container-padding: 16px;
  --pfe-theme--content-spacer: 30px;
  --pfe-theme--animation-timing: 0.2s ease-in 0s;
  --pfe-theme--box-shadow--sm: 0 0.0625rem 0.125rem 0 rgba(37, 37, 39, 0.1);
  --pfe-theme--box-shadow--md: 0 0.125rem 0.0625rem 0.0625rem rgba(37, 37, 39, 0.1), 0 0.25rem 0.6875rem 0.375rem rgba(37, 37, 39, 0.1);
  --pfe-theme--box-shadow--lg: 0 0.1875rem 0.4375rem 0.1875rem rgba(37, 37, 39, 0.1), 0 0.6875rem 1.5rem 1rem rgba(37, 37, 39, 0.1);
  --pfe-theme--box-shadow--inset: inset 0 0 0.625rem 0 rgba(37, 37, 39, 0.1);
  --pfe-theme--zindex--modal: 1001;
  --pfe-theme--zindex--navigation: 103;
  --pfe-theme--zindex--subnavigation: 95;
  --pfe-theme--zindex--content: 0;
  --pfe-theme--font-size--xxl: 48px;
  --pfe-theme--font-size--xl: 40px;
  --pfe-theme--font-size--alpha: 36px;
  --pfe-theme--font-size--beta: 28px;
  --pfe-theme--font-size--gamma: 24px;
  --pfe-theme--font-size--delta: 20px;
  --pfe-theme--font-size--epsilon: 18px;
  --pfe-theme--font-size--zeta: 16px;
  --pfe-theme--font-size: 18px;
  --pfe-theme--line-height--xxl: 1.2;
  --pfe-theme--line-height--xl: 1.2;
  --pfe-theme--line-height--alpha: 1.3;
  --pfe-theme--line-height--beta: 1.3;
  --pfe-theme--line-height--gamma: 1.3;
  --pfe-theme--line-height--delta: 1.5;
  --pfe-theme--line-height--epsilon: 1.5;
  --pfe-theme--line-height--zeta: 1.5;
  --pfe-theme--line-height: 1.5;
  --pfe-theme--font-weight--xxl: 300;
  --pfe-theme--font-weight--xl: 300;
  --pfe-theme--font-weight--alpha: 400;
  --pfe-theme--font-weight--beta: 400;
  --pfe-theme--font-weight--gamma: 400;
  --pfe-theme--font-weight--delta: 400;
  --pfe-theme--font-weight--epsilon: 400;
  --pfe-theme--font-weight--zeta: 400;
  --pfe-theme--font-weight: 400;
  --pfe-theme--font-family: "RedHatText", "Overpass", Overpass, Helvetica, Arial, sans-serif;
  --pfe-theme--font-family--heading: "RedHatDisplay", "Overpass", Overpass, Helvetica, Arial, sans-serif;
  --pfe-theme--font-family--code: "Overpass Mono", Consolas, Monaco, Andale Mono, monospace;
  --pfe-theme--color--text: #151515;
  --pfe-theme--color--text--on-dark: #fff;
  --pfe-theme--color--text--on-saturated: #eee;
  --pfe-theme--color--link: #0066cc;
  --pfe-theme--color--link--hover: #004080;
  --pfe-theme--color--link--focus: #004080;
  --pfe-theme--color--link--visited: #0066cc;
  --pfe-theme--color--link--on-dark: #73bcf7;
  --pfe-theme--color--link--hover--on-dark: #2b9af3;
  --pfe-theme--color--link--focus--on-dark: #2b9af3;
  --pfe-theme--color--link--visited--on-dark: #73bcf7;
  --pfe-theme--color--link--on-saturated: #ffffff;
  --pfe-theme--color--link--hover--on-saturated: #d2d3d5;
  --pfe-theme--color--link--focus--on-saturated: #d2d3d5;
  --pfe-theme--color--link--visited--on-saturated: #ffffff;
  --pfe-theme--link-decoration: none;
  --pfe-theme--link-decoration--hover: underline;
  --pfe-theme--link-decoration--focus: underline;
  --pfe-theme--link-decoration--visited: none;
  --pfe-theme--link-decoration--on-dark: none;
  --pfe-theme--link-decoration--hover--on-dark: underline;
  --pfe-theme--link-decoration--focus--on-dark: underline;
  --pfe-theme--link-decoration--visited--on-dark: none;
  --pfe-theme--link-decoration--on-saturated: underline;
  --pfe-theme--link-decoration--hover--on-saturated: underline;
  --pfe-theme--link-decoration--focus--on-saturated: underline;
  --pfe-theme--link-decoration--visited--on-saturated: underline; 
  }
 ```