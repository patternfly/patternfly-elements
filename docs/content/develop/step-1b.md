+++
title = "Create a PatternFly Element"
description = ""
weight = 30
draft = false
bref = ""
toc = true
menu = "develop"
tags = [ "develop" ]
+++

<!-- # Step 1: Scaffold an Element -->

## Prerequisites

Before you begin, make sure you've followed the [Prerequisites]({{ "/get-started.html#prerequisites" | relative_url }}) in [Getting Started]({{ "/docs/get-started.html" | relative_url }}).

## The PatternFly Element Generator

Use the PatternFly Element generator to start the scaffolding process. From the root directory of the PatternFly Elements  repository, run the following command.

```
npm run new
```

The generator will ask you a series of questions to set up your project.

1.  Your element name:
  - Your element's name should be lowercase and needs to contain at least one hyphen. For rules on naming custom elements, refer to the W3C [Custom Elements Working Draft](https://www.w3.org/TR/custom-elements/#valid-custom-element-name).
  - Red Hat prefixes elements with `pfe-` for global components and then namespaces web property specific ones like `cp-` for the Customer Portal. However, prefix your elements with whatever fits your project.
  - As an example, we'll create `pfe-cool-element`.
  
2.  Author name:
  - Add your name
  - NOTE: we will update the generator in the future to include an email address and GitHub profile.

3.  Do you want to use Sass with this element? (Yes or No)

4.  If yes to question #3, Do you want to use existing Sass dependencies? (pfe-sass or No thanks. I'll provide my own later)
  - pfe-sass includes the pfe-sass node module with all of the mixins and variables used in PatternFly Elements .

After answering the questions, you'll see something like this:

![npm run new command](/npm-run-new.png)

Once that's done, switch directories to the element you just created. We'll cd into the pfe-cool-element directory.

```
cd elements/pfe-cool-element
```

Open your code editor to view the structure of the element. It's important to note the `/src`, `/demo` and `/test` directories and the pfe-cool-element.js and pfe-cool-element.compiled.js files. The `/src` directory is reserved for development and you can write tests in `/test` directory. Finally, the `/demo` directory lets you preview your element locally using the pfe-cool-element.js and pfe-cool-element.umd.js files.

[Move to Step 2: Develop (Templates & slots)](../templates/)
