---
layout: layout-docs.njk
title: Creating an Import Map
order: 75
tags:
  - develop
---

<style>
  img {
    max-width: 100%;
  }
</style>

{% band %}

## What are import maps?
Import maps are a feature of modern web browsers that allow developers to specify a mapping between a module specifier and the location of the module's implementation. This enables developers to use short, easy-to-remember module specifiers in their code, while the import map takes care of resolving the correct URL for the module.

### Why use import maps and bare import specifiers?
Prior to the adoption of import maps, developers had to manually specify the full URL of each module they wanted to import in their code. This made code harder to read and write, and made it more difficult to manage dependencies as they evolved over time.

Import maps provide a way for developers to use shorter and more descriptive module specifiers in their code, which can improve code readability and maintainability. Instead of having to remember and type out lengthy URLs for each module, developers can use simple and memorable module specifiers that map to the correct URLs in the import map.

Bare import specifiers are a shorthand for module specifiers that are used in JavaScript code. They allow developers to write simpler and more concise module specifiers, without having to specify the full URL of the module.

Example:
```javascript
// Import map
{
  "imports": {
    "@patternfly/elements/pf-card/pf-card.js": "path/to/pf-card.js"
  }
}

// Bare module import specifier
import '@patternfly/elements/pf-card/pf-card.js';
```

### Using generator.jspm.io
[generator.jspm.io](https://generator.jspm.io) is a website that provides a free service to generate import maps for your JavaScript projects using the [jspm.io](https://jspm.io) content delivery network (CDN). [generator.jspm.io](https://generator.jspm.io) provides a simple interface for generating import maps for your JavaScript projects. 

To use it, follow these steps:

1. Open your web browser and navigate to [generator.jspm.io](https://generator.jspm.io).
2. Enter the module specifiers you want to map in the "Add Dependency" field. Each module specifier should be on a separate line.
3. Change the version of the module using the dropdown, if necessary.
4. Modify the entry point of the module by clicking "Add Package Export", if necessary.
3. The importmap JSON and script tags update in real time as you add dependencies.
4. Copy the generated import map `<script type="importmap">...</script>`.
5. Paste that importmap script tag into the `<head>` of your HTML document.

Once you've generated your import map and added it to your project, you can use it in your JavaScript code by specifying bare import specifiers for your modules. The import map will automatically resolve the correct URL for each module specifier at runtime.

```html
<!--
  JSPM Generator Import Map
  Edit URL: https://generator.jspm.io/#U2NgYGBkDM0rySzJSU1hcChILClJLcpLy6nUT81JzU3NKyl2MNIz0DPQL0jTTU4sSoHRelnFAN524ZI8AA
-->
<script type="importmap">
{
  "imports": {
    "@patternfly/elements/pf-card/pf-card.js": "https://ga.jspm.io/npm:@patternfly/elements@2.0.0/pf-card/pf-card.js"
  },
  "scopes": {
    "https://ga.jspm.io/": {
      "@lit/reactive-element": "https://ga.jspm.io/npm:@lit/reactive-element@1.6.1/reactive-element.js",
      "@lit/reactive-element/decorators/": "https://ga.jspm.io/npm:@lit/reactive-element@1.6.1/decorators/",
      "@patternfly/pfe-core/controllers/slot-controller.js": "https://ga.jspm.io/npm:@patternfly/pfe-core@2.0.0/controllers/slot-controller.js",
      "lit": "https://ga.jspm.io/npm:lit@2.6.1/index.js",
      "lit-element/lit-element.js": "https://ga.jspm.io/npm:lit-element@3.2.2/lit-element.js",
      "lit-html": "https://ga.jspm.io/npm:lit-html@2.6.1/lit-html.js",
      "lit-html/": "https://ga.jspm.io/npm:lit-html@2.6.1/",
      "lit/": "https://ga.jspm.io/npm:lit@2.6.1/",
      "tslib": "https://ga.jspm.io/npm:tslib@2.5.0/modules/index.js"
    }
  }
}
</script>
```

```javascript
<script type="module">
  // resolves to https://ga.jspm.io/npm:@patternfly/elements@2.0.0/pf-card/pf-card.js
  import '@patternfly/elements/pf-card/pf-card.js';  
</script>
```

Overall, [generator.jspm.io](https://generator.jspm.io) provides a simple and convenient way to generate import maps for your JavaScript projects. By using import maps and bare import specifiers, you can write cleaner, more concise code that is easier to read and maintain over time.

### Writing import maps manually

If you prefer not to use a tool like [generator.jspm.io](https://generator.jspm.io) and its CDN, you can write them manually. Here's how:

1. Create a new `<script type="importmap"></script>` tag.
2. Edit the contents of the script tag to specify the mapping between your module specifiers and the URLs of their implementations. For example:

```javascript
<script type="importmap">
{
  "imports": {
    "module-specifier": "path/to/module.js"
  }
}
</script>
```

Replace "module-specifier" the module you want to map, and "path/to/module.js" with the relative path to the module's implementation.

Writing import maps manually can be a bit more tedious and error prone than using a generator like [generator.jspm.io](https://generator.jspm.io), but it gives you more control over the structure and content of your import map. If you're comfortable working with JSON files and URLs, writing import maps manually can be a good option.

### Using multiple versions of the same module

Import maps allow you to specify multiple versions of the same module. This can be useful if you want to use different versions of the same module in different parts of your application. For example, you might want to use a newer version of a module in a new feature, while continuing to use an older version of the module in other parts of your application.

```javascript
<script type="importmap">
{
  "imports": {
    "module-specifier@2": "path/to/v2/module.js",
    "module-specifier@3": "path/to/v3/module.js",
  }
}
</script>
```

### Scoped import maps

By utilizing import maps scopes, you can specify the same module specifier for different parts of your application.

```javascript
<script type="importmap">
{
  "imports": {
    "module-specifier": "path/to/module.js"
  },
  "scopes": {
    "/path/to/feature/": {
      "module-specifier": "path/to/v2/module.js"
    }
  }
}
```

To go into more detail about import maps visit [developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap) or the [import map specification](https://html.spec.whatwg.org/multipage/webappapis.html#import-maps). 

{% endband %}
