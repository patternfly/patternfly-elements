---
layout: layout-basic.njk
title: Typography
tags:
  - theming
---
<header class="band">
  <h1>{{ title }}</h1>
</header>

{% band header="General" %}
  The pfe-styles component ships with a variety of stylesheets to allow developers to opt-into what they need, and leave behind what they don't. We leverage naming conventions that match up with the [core PatternFly project](https://github.com/patternfly/patternfly), and we follow best practices from the web and accessibility.
{% endband %}

{% band level=3, header="pfe-base.css " %}
  - This stylesheet provides normalize styles and styles for standard typographical HTML tags such as `<ul>`, `<h2>`, etc.
  - The typographical elements are opt-in, in that you must use the wrapper class of `.pfe-c-content` around them for them to be applied.
  - The "normalize" settings are very lightweight and help clear up common issues with default browser styles such as collapsing borders on tables or clearing padding and margins on `ul` tags.
  - We recommend loading this as a standard stylesheet in your project
{% endband %}

{% band level=3, header="pfe-typography-classes.css" %}
  - This stylesheet includes modifier classes you may use with any markup to invoke those particular heading styles. Please see the [documentation](https://ux.redhat.com/foundations/typography) for additional details on styles. This is very useful if you do not already have typographical classes defined.

  The styles relating to typography lean on core PatternFly variables, so the prefix is `--pf` instead of `--pfe` by design, so that one set of common variables can influence both PatternFly and PatternFly Elements components. The classes, however, continue to use the `.pfe` prefix to keep them distinctive from PF core to avoid conflicts.
{% endband %}

{% band header="CSS" %}
  These typographical classes can be applied to any element, giving you lots of control over where and how you utilize them.

  ```html
  <div class="pfe-c-content">
     <h3>Style a whole block of content</h3>
    <p>with the content class</p>
     <ul>
       <li>hello</li>
       <li>world</li>
    </ul>
  </div>

  <h2 class="pfe-title--6xl">Or style each headline</h2>
  <h2 class="pfe-title--3xl">with specific classes</h2>
  <h2 class="pfe-title--xs">as needed.</h2>
  <p class="pfe-text--lg">There are body copy typography classes too.</p>
  ```

  <a class="cta" href="https://patternflyelements.org/elements/pfe-styles/demo/#typography">View the demo page of all CSS typography classes</a>
{% endband %}


{% band header="Sass" %}
  There are also a variety of mixins, extends, and variables available in pfe-sass. We recommend checking out the [sass doc](https://patternflyelements.com/elements/pfe-sass/demo/#typography-mixin-pfe-typography) for extensive information about how to use these tools. 
{% endband %}
