---
layout: layout-basic.html
title: Create a PatternFly Element
order: 2
tags:
  - develop
---
<script type="module" src="/elements/pfe-cta/dist/pfe-cta.min.js"></script>

::: section header
# {{ title }}
:::

::: section
## Prerequisites

Before you begin, make sure you've followed the [Prerequisites](/docs/develop/setup#prerequisites) in [Setup](/docs/develop/setup).

## The PatternFly Element Generator

Use the PatternFly Element generator to start the scaffolding process. From the root directory of the PatternFly Elements  repository, run the following command.

```bash
npm run new
```

The generator will ask you a series of questions to set up your project.

1. What would you like to create?
    - Content, container, or combo
    - If it is a `content` component, then its slots and inputs should focus largely on typography. These tend to be heavier on styles than markup or functionality.
    - If it is a `container` component, then it should focus on creating sections in which components can be placed. These will handle surface colors, padding, some layout, but no typography styles.
    - If it is a `combo` component, then it should not contain any styles of its own (exception: you might need to set the display value of the host) but rather, it will pull together other components into a set that is logical for content editors or developers. These components can also make decisions about the way the children components are laid out or which components are called based on built-in logic for that combo.
    - If you don't know, that's fine. Just pick one, it can always be adjusted later.
2.  Your element name:
    - Your element's name should be lowercase and needs to contain at least one hyphen. For rules on naming custom elements, refer to the W3C [Custom Elements Working Draft](https://www.w3.org/TR/custom-elements/#valid-custom-element-name).
    - Red Hat prefixes elements with `pfe-` for global components and then namespaces web property specific ones like `cp-` for the Customer Portal. However, prefix your elements with whatever fits your project.
    - As an example, we'll create `pfe-cool-element`.
  
3.  Author name:
    - Add your name
    - NOTE: we will update the generator in the future to include an email address and GitHub profile.

4.  Do you want to use Sass with this element? (Yes or No)

5.  If yes to question #3, Do you want to use existing Sass dependencies? (pfe-sass or No thanks. I'll provide my own later)
    - pfe-sass includes the pfe-sass node module with all of the mixins and variables used in PatternFly Elements .

6. Describe the element's purpose or goal

7. List any attributes for the element, separated by commas (i.e., color, priority)

8. List any named slots for the element, separated by commas (i.e., header, footer)

9. List any events you want registered for the element, separated by commas (i.e., change, click)

After answering the questions, your new component will be created and bootstrapped in the repository.

Once that's done, switch directories to the element you just created. We'll cd into the pfe-cool-element directory.

```bash
cd elements/pfe-cool-element
```

Open your code editor to view the structure of the element. It's important to note the `/src`, `/demo` and `/test` directories. The `/src` directory is reserved for development and you can write tests in `/test` directory. Finally, the `/demo` directory lets you preview your element locally using the pfe-cool-element.js and pfe-cool-element.umd.js files.

<pfe-cta>
    <a href="../structure">Next up: Structure</a>
</pfe-cta>
:::