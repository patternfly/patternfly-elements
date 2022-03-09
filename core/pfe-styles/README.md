# PatternFly Elements Styles

## Usage

PatternFly Elements Styles are available to provide helper styles that can be directly included on your page.  This currently includes CSS for layouts, context, typography, and our flavor of "normalize".


### Including stylesheets from pfe-styles

To get started, include a link to the css file of your choice: 

```
<link rel="stylesheet" type="text/css" href="/path/to/pfe-layouts.min.css">
```

Since PatternFly Elements Styles are not web components, their classes can be applied to any element, giving you lots of control over where and how you utilize them.

- `pfe-base.css` 
    - This stylesheet provides normalize styles and styles for standard typographical HTML tags such as `<ul>`, `<h2>`, etc. 
    - The typographical elements are opt-in, in that you must use the wrapper class of `.pfe-c-content` around them for them to be applied.
    - The "normalize" settings are very lightweight and help clear common issues with default browser styles such as collapsing borders on tables or clearing padding and margins on `ul` tags.
    - We recommend loading this as a standard stylesheet in your project
- `pfe-typography-classes.css` 
    - This stylesheet includes modifier clases you may use with any markup to invoke those particular heading styles. Please see the [documentation](https://ux.redhat.com/foundations/typography) for additional details on styles. This is very useful if you do not already have typographical classes defined.
- `pfe-vars-as-px.css`
    - This is a demo file to show how you may reset the core t-shirt sizing variables using pixels, if you are unable to use REM units in your project.  
- `pfe-context.css` 
    - This set is available to help in managing context in raw markup. Components will handle setting context for you when they are used to set surface colors but if you have raw HTML setting the surface color, we recommend making use of this lightweight set of styles that update the broadcast variables for you or let you use the built-in surface colors.
    - If you manually set a background color to #000, you can add the `.on-dark` class to your element and it will load the broadcast variables for a dark context.
    - If you want to manually set an element to the accent surface color, you can use `.surface--accent` to set the background color along with appropriate context variables.
    - All of this is to make development just a little easier but is entirely optional.
- **(mobile styles)** 
    - Please inspect the [mobile typography demo page](http://patternflyelements.com/elements/pfe-styles/demo/typography-mobile.html) for examples of how to scale type for smaller devices.

## Types of projects

### Brand new project

If you are starting a new project, you will likely want to load all the stylesheets to get you up and running quickly.   

----


# Typography

## General

- The pfe-styles component ships with a variety of stylesheets to allow developers to opt-into what they need, and leave behind what they don't. We leverage naming conventions that match up with the [core PatternFly project](https://github.com/patternfly/patternfly), and we follow best practices from the web and accessibility.
- The styles relating to typography lean on core PatternFly variables, so the prefix is `--pf` instead of `--pfe` by design, so that one set of common variables can influence both PatternFly and PatternFly Elements components. The classes, however, continue to use the `.pfe` prefix to keep them distinctive from PF core to avoid conflicts.
- New font-size variables use t-shirt sizing as a naming convention. Greek named variables have been deprecated. Please see the typography chart to understand the new names & sizes as compared with the old names. 
-  There are sass variables storing pixel values in PFE because we want the fallbacks to either be in REM, but we want to be able to read & understand it in pixels. We are not using PF core vars because they do the conversion within the variable itself. By splitting it out, we can print the pf-vars-px.css file for folks who can't use REMs.

## Concepts

### Inheritance

PatternFly Elements expects that content in the light DOM should rely on CSS inheritance, in that the general typography is set on the root and body elements and should cascade down to all child elements unless overridden. In this way, less CSS overall is required.

When it comes to typography modifier classes, please note:

 - All HTML typographical elements are wrapped in the class `.pfe-c-content` to avoid collisions and add specificity.
 - HTML Headings come with all the styles by default
 - Text classes come with font size only, because text is inheriting the default line-height, font-weight and font-family from the body tag.


### Separation of concerns

Typography is handled 3 different ways, depending on what is being styled. There are styles that address HTML elements in the light DOM ("content"), classes that are useful for modifying type for a specific use case ("modifiers"), and styles that are useful for PatternFly Element web components, both in the Shadow DOM and Light DOM.

### Empty local variables

When you inspect a snippet of text styled by PFE (either in the Light DOM or the Shadow DOM), you will notice a stack of variables, or CSS custom properties, before the fallback value. Each of these variables is empty by default, which provides a variety of ways that developers using the components may override these styles.

If we break down this stack, it can be categorized as follows, in this order:

- **specific** - `--pf-c-text--m-lg--FontSize` 
    - The first CSS variable is directly related to the modifier class, component, or HTML content. 
- **general** - `--pf-global--FontSize--lg`
    - The next variable requests a global or system level variable. The main reason these exist, is that you may wish to scale up or down all typography, or to change the unit from rem to pixels or something else. 
- **fallback value** - `1rem `
    - Finally the final fallback is in rem units, for better accessibility. 

Let's take a look at an example from each kind of typography:


#### Content variables

```css
  font-size: var(--pf-c--FontSize, var(--pf-c-content--FontSize, var(--pf-global--FontSize--md, 1rem)));
```

After the project abbreviation, the first variable is really just an empty hook for components to use. `--pf-c--FontSize` should be overridden within the scope of a particular component, such as:

```css
pfe-accordion {
  --pf-c--FontSize: 19px;
}
```

The next variable includes `content` which is any HTML typographical element, such as an `<h1>`, `<p>`, `<ul>` and so on. The final modifier at the end of the variable refers to the property, such as `FontSize`.

Finally the last variable includes the word `global` to indicate that changing this would impact all components and classes. The modifer indicates the CSS property, and the "t-shirt" size. 

```
$pf-global--FontSize--6xl: 48px;
$pf-global--FontSize--5xl: 40px;
$pf-global--FontSize--4xl: 36px;
$pf-global--FontSize--3xl: 28px;
$pf-global--FontSize--2xl: 24px;
$pf-global--FontSize--xl: 20px;
$pf-global--FontSize--lg: 18px;
$pf-global--FontSize--md: 16px;
$pf-global--FontSize--sm: 14px;
$pf-global--FontSize--xs: 12px;
```


#### Modifier class variables

```css
font-size: var(--pf-c-title--m-5xl--FontSize, var(--pf-global--FontSize--5xl, 2.5rem)) !important;
```

Here the system is the same, with the exception of the first variable. The name includes either `title` or `text` followed by `--m` for "modifier class". These variables only impact the modifier class by the same name. 

For example, adding this override:
```
:root {
  --pf-c--title--m-3xl--FontSize: 37px;
}
```

Would only impact this CSS modifier class: `.pfe-title--3xl`.



#### Component variables

Finally, components include "local" variables, meaning they are named for that particular component and sometimes a region within that component. 

```css
font-size: var(--pfe-cta--FontSize, var(--pf-global--FontSize--lg, 1.125rem));
  
font-size: var(--pfe-accordion--FontSize--header, calc(var(--pfe-theme--font-size, 1rem) * 1.1));
```

This ensures that developers will not need to override using the component name, but rather they can override variables only, if needed:

```css
:root {
--pfe-cta--FontSize: 17px;
--pfe-accordion--FontSize--header: 21px;
}
```

## pfe-sass: mixins, extends

Worth mentioning, there are a variety of mixins, extends, and variables available in pfe-sass which make it easy to call typographical styles within custom classes. We recommend checking out the sass doc for extensive information about how to use these tools. 

```scss
.custom-title--foo  {
  @include pfe-title(5xl); 
}
```
 
# Overrides 

Here are some examples of how to leverage the empty CSS variable hooks throughout the system. Please also see `pfe-styles/_temp/pfe-vars.css` for a full list of system vars (does not include component vars). Note that the examples below use pixels but we suggest using rem units if possible.

#### Need to override all global font sizes?

```css
:root {
  --pf-global--FontSize--6xl:  52px;
  --pf-global--FontSize--5xl:  44px;
  --pf-global--FontSize--4xl:  40px;
  --pf-global--FontSize--3xl:  29px;
  --pf-global--FontSize--2xl:  25px;
  --pf-global--FontSize--xl:   21px;
  --pf-global--FontSize--lg:   17px;
  --pf-global--FontSize--md:   15px;
  --pf-global--FontSize--sm:   13px;
  --pf-global--FontSize--xs:   11px; 
}
```

#### Need to override all HTML heading & paragraph sizes 

```css
:root {
  --pf-c-content--h1--FontSize: 38px;
  --pf-c-content--h2--FontSize: 34px;
  --pf-c-content--h3--FontSize: 32px;
  --pf-c-content--h4--FontSize: 29px;
  --pf-c-content--h5--FontSize: 25px;
  --pf-c-content--h6--FontSize: 21px;
  --pf-c-content--FontSize:     14px;
}
```

#### Need to override a few title modifier class sizes

```css
:root {
  --pf-c-title--m-6xl--FontSize: 55px;
  --pf-c-title--m-3xl--FontSize: 38px; 
  --pf-c-title--m-xl--FontSize:  21px;
  --pf-c-title--m-sm--FontSize:  19px;
}
```

#### Need to override the typography for one component, everywhere

```css
:root {
  --pfe-clipboard--FontSize: 19px;
}
```

#### Need to override the typography for one component or one heading on one page

```css
.resources-page {
  --pf-c-title--m-3xl--FontSize: 38px; 
  --pfe-clipboard--FontSize: 19px;
}
```

-----

# Layouts

PatternFly Elements Layouts, like Bootstrap, is based on a 12 column grid with similar breakpoints available. We've just made the usage simpler.


#### Grid

The numbers refer to the width of the children, and the unit is *how many columns* that item occupies. For example, if you are looking for a simple layout where each child is 50% wide, and they each sit side by side, you should use `.pfe-m-all-6-col-on-xl` which tells each child to occupy 6 (out of 12) columns on an xl screen.

Use this equation to determine the number you need, per breakpoint:



| 12 | (divided by) 3 | = 4 |
|---|---|---|
| How many columns total in the grid |  How many children are there? |   Number to use in the class, on the parent `.pfe-m-all-4-col-on-xl` | 



```html
<div class="pfe-l-grid pfe-m-gutters pfe-m-all-4-col">
  <div>4 cols wide</div>
  <div>4 cols wide</div>
  <div>4 cols wide</div>
  <div>4 cols wide</div>
  <div>4 cols wide</div>
</div>
```

##### Grid Layout Classes &amp; Modifiers

**Parent Grid Element classes:**

| Class | Description |
| -------------- | ----------- |
| `pfe-l-grid` | Base grid class *required* |
| `pfe-l-grid-fill-height` | Allows children elements to fill their container's height completely; equivalent of flex-grow |
| `pfe-m-gutters` | Adds gutters based on `--pfe-theme--container-spacer` |
| `pfe-m-all-*[1-12]*-col` | Sets width of children in grid to *[1-12]* columns |
| `pfe-m-all-*[1-12]*-col-on-[xs-xl]` | Sets width of children to *[1-12]* columns on specified breakpoint *[xs-xl]* |

**Child Grid Element Classes:**

| Class | Description |
| -------------- | ----------- |
| `pfe-l-grid__item` | Base grid item class *optional* |
| `pfe-m-*[1-12]*-col` | Sets width of this child to *[1-12]* columns |
| `pfe-m-*[1-12]*-col-on-[xs-xl]` | Sets width of this child to *[1-12]* columns on specified breakpoint *[xs-xl]* |
| `pfe-m-startat-*[1-12]*-col` | Start/indent this child to column #*[1-12]* |
| `pfe-m-startat-*[1-12]*-col-on-[xs-xl]` | Start/indent this child to column #*[1-12]* on specified breakpoint *[xs-xl]* |

Example:

```html
<div class="pfe-l-grid pfe-m-gutters pfe-m-all-4-col">
  <div class="pfe-m-8-col">8 cols wide</div>
  <div>4 cols wide</div>
  <div class="pfe-m-startat-9-col">4 cols, indented</div>
  <div class="pfe-m-8-col">8 cols wide</div>
  <div>4 cols wide</div>
</div>
```

##### Breakpoints

```css
// Small devices
@media (min-width: 576px) { ... }

// Medium devices
@media (min-width: 768px) { ... }

// Large devices
@media (min-width: 992px) { ... }

// Extra large devices
@media (min-width: 1200px) { ... }
```

#### Bullseye

Use a bullseye layout when there is a single child element, and that child is centered both vertically and horizontally in the parent.

| Class | Description |
| -------------- | ----------- |
| `pfe-l-bullseye` | Centers child element vertically &amp; horizontally |

Example:

```html
<div class="pfe-l-bullseye">
  <div>Perfectly centered child</div>
</div>
```

#### Text Alignment

Text alignment helper classes can also be applied to any block-level element.

| Class | Description |
| -------------- | ----------- |
| `pfe-l--text-align--left` | Align text to left |
| `pfe-l--text-align--center` | Align text to center |
| `pfe-l--text-align--right` | Align text to right |



#### List Styles

Add customimzed styling to list items.  We currently support the following list styles:

| Class               | Type | Description                              | Hooks |
| ------------------- | ---- | ---------------------------------------- | --- |
| `pfe-list--primary` | ol   | Primary visual design for ordered lists. | `--pfe-list-ol--primary--gap: pfe-var(content-spacer);` |
|                     |      |                                          |`--pfe-list-ol--primary--spacer: pfe-var(content-spacer);` |
|                     |      |                                          |`--pfe-list-ol--primary__circle--size: 56px;` |
|                     |      |                                          |`--pfe-list-ol--primary__circle--color: 238,0,0;` |
|                     |      |                                          |`--pfe-list-ol--primary__circle--BackgroundColor: rgba(238,0,0, 0.7);` |
|                     |      |                                          |`--pfe-list-ol--primary__circle--FontSize: 24px;` |

Example:

```html
<ol class="pfe-list--primary">
  <li>First step</li>
  <li>Second step</li>
  <li>Third step</li>
</ol>
```

## Developers

### Testing

    npm run test


- Note, the file `/temp/pfe-vars.css` may be extremely useful to understand what PFE variables are available to override. Note that these variables are intentionally left empty in the stylesheets so that the value used is actually the fallback at the end of the stack. By populating these CSS variables, you are opting out of system defaults and into customizations. Please see [theming documentation](https://patternfly.github.io/patternfly-elements/theme/) for more information.
### Build

    npm run build

### Demo

From the PatternFly Elements root directory, run:

    npm start

### Code style

Card (and all PatternFly Elements) use [Prettier][prettier] to auto-format JS and JSON. The style rules get applied when you commit a change. If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://prettier.io/docs/en/editors.html
[web-component-tester]: https://github.com/Polymer/web-component-tester
