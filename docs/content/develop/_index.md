+++
title = "Development Overview"
description = "Build and create reusable web components."
weight = 1
draft = false
bref = ""
toc = true
menu = "theme"
tags = [ "theme" ]
+++


## The PatternFly Elements pattern library

Before getting started, it's important to note that because this is a library, each of the components within it are designed to work together. For this reason, elements should follow some basic guidelines:

## Guidelines for building a PatternFly Element

1. An element should be designed to be simple and easy to understand. If it seems complicated, ask:
    - Why is it complicated? Functionality? Content? Design?
    - Can it be broken up into smaller pieces? Maybe you can turn 1 component into 2 or 3 separate ones and use a combo component to bring them back together.
    - Are there any existing components that can do some of the heavy lifting for you or be altered to do some of what you want?
2. A component can only be one of these types: `content`, `container` or `combo`. 
    - If it is a `content` component,  then its slots and inputs should focus largely on typography. These tend to be heavier on styles than markup or functionality. Examples include: `pfe-header`
    - If it is a `container` component, then it should focus on creating sections in which components can be placed. These will handle surface colors, padding, some layout, but no typography styles. Examples include: `pfe-card`, `pfe-band`
    - If it is a `combo` component, then it should not contain any styles of its own (exception: you might need to set the display value of the host) but rather, it will pull together other components into a set that is logical for content editors or developers. These components can also make decisions about the way the children components are laid out or which components are called based on built-in logic for that combo.
3. Components should be context aware, if possible.
    - `Content` components should be equipped with styles for light, dark, and saturated backgrounds.
4. Framework agnostic
    - A PatternFly Element should "just work" when you drop it onto any page (provided the proper polyfills are there). It should have ALL the styles it needs, when coupled with a PFE Theme.

## Container Elements

A container never directly styles the children inside it. It is built to manage only their horizontal or vertical alignment and spacing. For example, in a card, you might apply margins around the slots, but you would not apply padding or color to the content inside of slots.

**Example: [Card](https://github.com/patternfly/patternfly-elements/blob/master/elements/pfe-card/src)**

This component has background color options and attributes to change the vertical spacing between the slots but does not have any influence on the general styles or typography of its children.


## Content Elements

A component always touches all four sides of its parent container. For example, if you are creating a teaser component, it should not have padding or margins around the type. It might, however have margins between the headline and author.

**Example: [Call-to-action](https://github.com/patternfly/patternfly-elements/blob/master/elements/pfe-cta/src)**

This component has attributes which invoke the multiple style changes on a call-to-action link. It has styles built-in so that colors will automatically adjust to surfaces.

## Combo Elements

These elements are designed to create easy-to-use combinations of other smaller components. Ideally they also bundle up attributes into a few configurations.

**Example: [Hide-show](https://github.com/patternfly/patternfly-elements/blob/master/elements/pfe-hide-show)**


## Opt-in Features
- General features would be opt-in except for those that are declared by the design system. If the design system calls for previous and next buttons, you can opt-out but the default should match the suggested use.




# Attribute naming 

Attributes should include the `pfe-` prefix in order to:

- avoid collisions with other libraries, known and unknown as well as new HTML tags and attributes
- ensure folks who have no prefixing on their existing sites can use PF Elements without worry of collisiding CSS or JavaScript
- have a single-source-of-truth, i.e. one class or attribute for styling vs. chaining attributes


## General
- Attribute names should be specific so they are easy to read and understand. 
- Use standard [HTML global attributes](https://www.w3schools.com/tags/ref_standardattributes.asp) and / or proper [ARIA attributes](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) when appropriate
    - Example: `<pfe-pagination hidden>` `<pfe-cta title="RHEL features">`
- Optional component features should be activated with a unique attribute instead of values within a generic attribute
    - The pagination component has opt-in features like enbaling the previous and next buttons. Ideally items are treated like booleans and can be toggled on if the attribute name is present on the tag. However if a feature requires a specific value to be passed in, such as a a number of results shown per page, it is fine to look for a value.
    - Example: 
        - YES: `<pfe-pagination pfe-prev-next pfe-jump-nav pfe-results="10">`
        - NO: `<pfe-pagination pfe-features="prev next caret">`


## Example attributes with values
Some attributes are standardized. 

- `pfe-type="content"`
    - Automatically added
    - Intended to provide context about parent child relationships and separation of concerns
    - Other values: `container, combo`
- `pfe-orientation="vertical"`
    - To change alignment of a container component 
    - Other values: `horizontal`
- `pfe-state="expanded"`
    - To reflect the desired state of a component on render. It may be toggled.
    - Other values: `collapsed`
- `pfe-variant="earth"`
    - The purpose is to group various styles together into one batch of settings, and to be abstract enough to allow for the evolution of the design system. The values are arbirtary and do not convey information about the styles.
    - Other values: `earth, wind, fire, water`
- `pfe-surface-color="complement"`
    - Purpose: Invoke palette color overrides
    - Example values: `base, accent`

### Variant attribute

The variant attribute (`pfe-variant`) is used across all our components. It allows multiple styles to be grouped together into batches.  These styles are connected in the design system and allows for one pattern to communicate effectively in different design situations.  

For example, the tab component's default look resembles a manilla folder design with square boxes around each tab and no line below the active tab.  Other visual treatments of this same pattern might include one thick solid underline beneath or beside the tabs or making each tab resemble a button.  
- `pfe-variant="fire"`
- Other values: `earth`, `wind`, `water`
