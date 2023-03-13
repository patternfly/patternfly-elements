---
layout: layout-basic.njk
title: Quick start
---

<header class="band">
  <h1>{{ title }}</h1>
</header>

<section class="band">

## Quick start template
Use the markup below to start exploring PatternFly Elements. The template below 
includes the [card](/components/card), [accordion](/components/accordion), and 
[tabs](/components/tabs) components, however, all components are accessible in the
importmap.

The template below utilizes [JSPM](https://jspm.dev/) to deliver PatternFly 
Elements to the page. This is fine for development and exploration, but it's 
highly recommended that you install PatternFly Elements from npm for use in 
production.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="PatternFly Elements - Quick start">
  <title>PatternFly Elements - Quick start</title>
  <link href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@400;500;700&family=Red+Hat+Text&display=swap" rel="stylesheet">
  <style>
    html,
    body {
      margin: 0;
      font-family: "Red Hat Text";
    }

    h1, h2, h3, h4 {
      font-family: "Red Hat Display";
    }
  </style>
  <!--
    JSPM Generator Import Map
    Edit URL: https://generator.jspm.io/#U2VhYGBkDM0rySzJSU1hcChILClJLcpLy6nUT81JzU3NKyl2MNIz0DMAADWC5vEpAA
  -->
  <script type="importmap">
  {
    "imports": {
      "@patternfly/elements": "https://ga.jspm.io/npm:@patternfly/elements@2.0.0/pfe.min.js"
    },
    "scopes": {
      "https://ga.jspm.io/": {
        "@floating-ui/core": "https://ga.jspm.io/npm:@floating-ui/core@1.2.3/dist/floating-ui.core.browser.mjs",
        "@floating-ui/dom": "https://ga.jspm.io/npm:@floating-ui/dom@1.2.4/dist/floating-ui.dom.browser.mjs",
        "@lit/reactive-element": "https://ga.jspm.io/npm:@lit/reactive-element@1.6.1/development/reactive-element.js",
        "@lit/reactive-element/decorators/": "https://ga.jspm.io/npm:@lit/reactive-element@1.6.1/development/decorators/",
        "lit": "https://ga.jspm.io/npm:lit@2.6.1/index.js",
        "lit-element/lit-element.js": "https://ga.jspm.io/npm:lit-element@3.2.2/development/lit-element.js",
        "lit-html": "https://ga.jspm.io/npm:lit-html@2.6.1/development/lit-html.js",
        "lit-html/": "https://ga.jspm.io/npm:lit-html@2.6.1/development/",
        "lit/": "https://ga.jspm.io/npm:lit@2.6.1/",
        "tslib": "https://ga.jspm.io/npm:tslib@2.5.0/tslib.es6.js"
      }
    }
  }
  </script>
  <!-- ES Module Shims: Import maps polyfill for modules browsers without import maps support (all except Chrome 89+) -->
  <script async src="https://ga.jspm.io/npm:es-module-shims@1.5.1/dist/es-module-shims.js" crossorigin="anonymous"></script>
  
  <script type="module">
    import * as Elements from "@patternfly/elements";
  </script>
</head>
<body>
  <header>
    <h1>PatternFly Elements</h1>
  </header>
  <main>
    <section class="band">
      <h2>Card components</h2>
      <pf-card>
        <h3 slot="header">Card 1</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis laboriosam eum saepe eius tempora sequi eligendi repudiandae aspernatur beatae totam voluptatum facere unde, vitae inventore eveniet accusamus nulla recusandae aliquam.</p>
        <a slot="footer" class="cta primary" href="https://patternflyelements.org">More about PatternFly Elements</a>
      </pf-card>
      <pf-card>
        <h3 slot="header">Card 2</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque necessitatibus sapiente aliquam recusandae maxime consectetur magnam ipsa veniam expedita molestiae. Quis officia minima libero repellat laboriosam sit nemo porro laborum.</p>
        <a class="cta" slot="footer" href="https://patternflyelements.org/get-started">Get started</a>
      </pf-card>
      <pf-card>
        <h3 slot="header">Card 3</h3>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate iusto laboriosam molestias, quidem ab voluptates nihil earum sed! Esse repellat quo ut numquam mollitia quis saepe aspernatur fuga error in!</p>
        <a class="cta" slot="footer" href="https://developer.mozilla.org/en-US/docs/Web/Web_Components">About web components</a>
      </pf-card>
      <a class="cta" slot="footer" href="https://patternflyelements.org/components">View all of the components</a>
    </section>
    <section>
      <h2>Accordion component</h2>
      <pf-accordion>
        <pf-accordion-header>
          <h3>Why do wizards need money if they could just create it?</h3>
        </pf-accordion-header>
        <pf-accordion-panel>
          <p>There is legislation that decides what you can conjure and what you can not. Because things that you conjure out of thin air will not last, it is illegal in the wizarding world.</p>
        </pf-accordion-panel>
        <pf-accordion-header>
          <h3>Why doesn't Harry have a portrait of his parents?</h3>
        </pf-accordion-header>
        <pf-accordion-panel>
          <p><a href="#">The characters in the portraits</a> are not actually ghosts. They mainly are there just to repeat common phrases or serve as a general <a href="foobarbaz.com">representation of the individual</a> they depict. A portrait of his parents would not be of much help to Harry.</p>
        </pf-accordion-panel>
        <pf-accordion-header>
          <h3>Why is Harry considered a half-blood if both of his parents could use magic?</h3>
        </pf-accordion-header>
        <pf-accordion-panel>
          <p>Because Harry's grandparents were not able to do magic. This is generally frowned upon by those who consider themselves pure, such as the Malfoy's or other antagonists.</p>
        </pf-accordion-panel>
        <pf-accordion-header>
          <h3>Is Hogwarts the only wizarding school?</h3>
        </pf-accordion-header>
        <pf-accordion-panel>
          <p>No! It has been revealed that there are actually 11 long established and prestigious schools around the globe. These include Castelobruxo in the rainforest of Brazil, Durmstrang Institute (whereas nobody is certain of it’s whereabouts), and Ilvermorny, right here in the United States.</p>
        </pf-accordion-panel>
        <pf-accordion-header>
          <h3>Where do the main characters work as adults?</h3>
        </pf-accordion-header>
        <pf-accordion-panel>
          <p>Harry and Hermione are at the Ministry: he ends up leading the Auror department. Ron helps George at the joke shop and does very well. Ginny becomes a professional Quidditch player and then sportswriter for the Daily Prophet.</p>
          <p><a href="https://www.pottermore.com/collection/characters" target="blank">Read more about the characters</a></p>
        </pf-accordion-panel>
      </pf-accordion>
    </section>
    <section>
      <h2>Tabs component</h2>
      <pf-tabs>
        <pf-tab slot="tab">Users</pf-tab>
        <pf-tab-panel>Users</pf-tab-panel>
        <pf-tab slot="tab" active>Containers</pf-tab>
        <pf-tab-panel>Containers</pf-tab-panel>
        <pf-tab slot="tab">Database</pf-tab>
        <pf-tab-panel>Database</pf-tab-panel>
      </pf-tabs>
    </section>
  </main>
</body>
</html>
```

[Lit Playground](https://lit.dev/playground/#project=W3sibmFtZSI6ImluZGV4Lmh0bWwiLCJjb250ZW50IjoiPCFET0NUWVBFIGh0bWw-XG48aHRtbCBsYW5nPVwiZW5cIj5cbjxoZWFkPlxuICA8bWV0YSBjaGFyc2V0PVwiVVRGLThcIj5cbiAgPG1ldGEgbmFtZT1cInZpZXdwb3J0XCIgY29udGVudD1cIndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLjBcIj5cbiAgPG1ldGEgbmFtZT1cImRlc2NyaXB0aW9uXCIgY29udGVudD1cIlBhdHRlcm5GbHkgRWxlbWVudHMgLSBRdWljayBzdGFydFwiPlxuICA8dGl0bGU-UGF0dGVybkZseSBFbGVtZW50cyAtIFF1aWNrIHN0YXJ0PC90aXRsZT5cbiAgPGxpbmsgaHJlZj1cImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9UmVkK0hhdCtEaXNwbGF5OndnaHRANDAwOzUwMDs3MDAmZmFtaWx5PVJlZCtIYXQrVGV4dCZkaXNwbGF5PXN3YXBcIiByZWw9XCJzdHlsZXNoZWV0XCI-XG4gIDxzdHlsZT5cbiAgICBodG1sLFxuICAgIGJvZHkge1xuICAgICAgbWFyZ2luOiAwO1xuICAgICAgZm9udC1mYW1pbHk6IFwiUmVkIEhhdCBUZXh0XCI7XG4gICAgfVxuXG4gICAgaDEsIGgyLCBoMywgaDQge1xuICAgICAgZm9udC1mYW1pbHk6IFwiUmVkIEhhdCBEaXNwbGF5XCI7XG4gICAgfVxuICA8L3N0eWxlPlxuICA8IS0tXG4gICAgSlNQTSBHZW5lcmF0b3IgSW1wb3J0IE1hcFxuICAgIEVkaXQgVVJMOiBodHRwczovL2dlbmVyYXRvci5qc3BtLmlvLyNVMlZoWUdCa0RNMHJ5U3pKU1UxaGNDaElMQ2xKTGNwTHk2blVUODFKelUzTkt5bDJNTkl6MERNQUFEV0M1dkVwQUFcbiAgLS0-XG4gIDxzY3JpcHQgdHlwZT1cImltcG9ydG1hcFwiPlxuICB7XG4gICAgXCJpbXBvcnRzXCI6IHtcbiAgICAgIFwiQHBhdHRlcm5mbHkvZWxlbWVudHNcIjogXCJodHRwczovL2dhLmpzcG0uaW8vbnBtOkBwYXR0ZXJuZmx5L2VsZW1lbnRzQDIuMC4wL3BmZS5taW4uanNcIlxuICAgIH0sXG4gICAgXCJzY29wZXNcIjoge1xuICAgICAgXCJodHRwczovL2dhLmpzcG0uaW8vXCI6IHtcbiAgICAgICAgXCJAZmxvYXRpbmctdWkvY29yZVwiOiBcImh0dHBzOi8vZ2EuanNwbS5pby9ucG06QGZsb2F0aW5nLXVpL2NvcmVAMS4yLjMvZGlzdC9mbG9hdGluZy11aS5jb3JlLmJyb3dzZXIubWpzXCIsXG4gICAgICAgIFwiQGZsb2F0aW5nLXVpL2RvbVwiOiBcImh0dHBzOi8vZ2EuanNwbS5pby9ucG06QGZsb2F0aW5nLXVpL2RvbUAxLjIuNC9kaXN0L2Zsb2F0aW5nLXVpLmRvbS5icm93c2VyLm1qc1wiLFxuICAgICAgICBcIkBsaXQvcmVhY3RpdmUtZWxlbWVudFwiOiBcImh0dHBzOi8vZ2EuanNwbS5pby9ucG06QGxpdC9yZWFjdGl2ZS1lbGVtZW50QDEuNi4xL2RldmVsb3BtZW50L3JlYWN0aXZlLWVsZW1lbnQuanNcIixcbiAgICAgICAgXCJAbGl0L3JlYWN0aXZlLWVsZW1lbnQvZGVjb3JhdG9ycy9cIjogXCJodHRwczovL2dhLmpzcG0uaW8vbnBtOkBsaXQvcmVhY3RpdmUtZWxlbWVudEAxLjYuMS9kZXZlbG9wbWVudC9kZWNvcmF0b3JzL1wiLFxuICAgICAgICBcImxpdFwiOiBcImh0dHBzOi8vZ2EuanNwbS5pby9ucG06bGl0QDIuNi4xL2luZGV4LmpzXCIsXG4gICAgICAgIFwibGl0LWVsZW1lbnQvbGl0LWVsZW1lbnQuanNcIjogXCJodHRwczovL2dhLmpzcG0uaW8vbnBtOmxpdC1lbGVtZW50QDMuMi4yL2RldmVsb3BtZW50L2xpdC1lbGVtZW50LmpzXCIsXG4gICAgICAgIFwibGl0LWh0bWxcIjogXCJodHRwczovL2dhLmpzcG0uaW8vbnBtOmxpdC1odG1sQDIuNi4xL2RldmVsb3BtZW50L2xpdC1odG1sLmpzXCIsXG4gICAgICAgIFwibGl0LWh0bWwvXCI6IFwiaHR0cHM6Ly9nYS5qc3BtLmlvL25wbTpsaXQtaHRtbEAyLjYuMS9kZXZlbG9wbWVudC9cIixcbiAgICAgICAgXCJsaXQvXCI6IFwiaHR0cHM6Ly9nYS5qc3BtLmlvL25wbTpsaXRAMi42LjEvXCIsXG4gICAgICAgIFwidHNsaWJcIjogXCJodHRwczovL2dhLmpzcG0uaW8vbnBtOnRzbGliQDIuNS4wL3RzbGliLmVzNi5qc1wiXG4gICAgICB9XG4gICAgfVxuICB9XG4gIDwvc2NyaXB0PlxuICA8IS0tIEVTIE1vZHVsZSBTaGltczogSW1wb3J0IG1hcHMgcG9seWZpbGwgZm9yIG1vZHVsZXMgYnJvd3NlcnMgd2l0aG91dCBpbXBvcnQgbWFwcyBzdXBwb3J0IChhbGwgZXhjZXB0IENocm9tZSA4OSspIC0tPlxuICA8c2NyaXB0IGFzeW5jIHNyYz1cImh0dHBzOi8vZ2EuanNwbS5pby9ucG06ZXMtbW9kdWxlLXNoaW1zQDEuNS4xL2Rpc3QvZXMtbW9kdWxlLXNoaW1zLmpzXCIgY3Jvc3NvcmlnaW49XCJhbm9ueW1vdXNcIj48L3NjcmlwdD5cbiAgXG4gIDxzY3JpcHQgdHlwZT1cIm1vZHVsZVwiPlxuICAgIGltcG9ydCAqIGFzIEVsZW1lbnRzIGZyb20gXCJAcGF0dGVybmZseS9lbGVtZW50c1wiO1xuICA8L3NjcmlwdD5cbjwvaGVhZD5cbjxib2R5PlxuICA8aGVhZGVyPlxuICAgIDxoMT5QYXR0ZXJuRmx5IEVsZW1lbnRzPC9oMT5cbiAgPC9oZWFkZXI-XG4gIDxtYWluPlxuICAgIDxzZWN0aW9uIGNsYXNzPVwiYmFuZFwiPlxuICAgICAgPGgyPkNhcmQgY29tcG9uZW50czwvaDI-XG4gICAgICA8cGYtY2FyZD5cbiAgICAgICAgPGgzIHNsb3Q9XCJoZWFkZXJcIj5DYXJkIDE8L2gzPlxuICAgICAgICA8cD5Mb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBPbW5pcyBsYWJvcmlvc2FtIGV1bSBzYWVwZSBlaXVzIHRlbXBvcmEgc2VxdWkgZWxpZ2VuZGkgcmVwdWRpYW5kYWUgYXNwZXJuYXR1ciBiZWF0YWUgdG90YW0gdm9sdXB0YXR1bSBmYWNlcmUgdW5kZSwgdml0YWUgaW52ZW50b3JlIGV2ZW5pZXQgYWNjdXNhbXVzIG51bGxhIHJlY3VzYW5kYWUgYWxpcXVhbS48L3A-XG4gICAgICAgIDxhIHNsb3Q9XCJmb290ZXJcIiBjbGFzcz1cImN0YSBwcmltYXJ5XCIgaHJlZj1cImh0dHBzOi8vcGF0dGVybmZseWVsZW1lbnRzLm9yZ1wiPk1vcmUgYWJvdXQgUGF0dGVybkZseSBFbGVtZW50czwvYT5cbiAgICAgIDwvcGYtY2FyZD5cbiAgICAgIDxwZi1jYXJkPlxuICAgICAgICA8aDMgc2xvdD1cImhlYWRlclwiPkNhcmQgMjwvaDM-XG4gICAgICAgIDxwPkxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBFYXF1ZSBuZWNlc3NpdGF0aWJ1cyBzYXBpZW50ZSBhbGlxdWFtIHJlY3VzYW5kYWUgbWF4aW1lIGNvbnNlY3RldHVyIG1hZ25hbSBpcHNhIHZlbmlhbSBleHBlZGl0YSBtb2xlc3RpYWUuIFF1aXMgb2ZmaWNpYSBtaW5pbWEgbGliZXJvIHJlcGVsbGF0IGxhYm9yaW9zYW0gc2l0IG5lbW8gcG9ycm8gbGFib3J1bS48L3A-XG4gICAgICAgIDxhIGNsYXNzPVwiY3RhXCIgc2xvdD1cImZvb3RlclwiIGhyZWY9XCJodHRwczovL3BhdHRlcm5mbHllbGVtZW50cy5vcmcvZ2V0LXN0YXJ0ZWRcIj5HZXQgc3RhcnRlZDwvYT5cbiAgICAgIDwvcGYtY2FyZD5cbiAgICAgIDxwZi1jYXJkPlxuICAgICAgICA8aDMgc2xvdD1cImhlYWRlclwiPkNhcmQgMzwvaDM-XG4gICAgICAgIDxwPkxvcmVtIGlwc3VtIGRvbG9yLCBzaXQgYW1ldCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBWb2x1cHRhdGUgaXVzdG8gbGFib3Jpb3NhbSBtb2xlc3RpYXMsIHF1aWRlbSBhYiB2b2x1cHRhdGVzIG5paGlsIGVhcnVtIHNlZCEgRXNzZSByZXBlbGxhdCBxdW8gdXQgbnVtcXVhbSBtb2xsaXRpYSBxdWlzIHNhZXBlIGFzcGVybmF0dXIgZnVnYSBlcnJvciBpbiE8L3A-XG4gICAgICAgIDxhIGNsYXNzPVwiY3RhXCIgc2xvdD1cImZvb3RlclwiIGhyZWY9XCJodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9XZWJfQ29tcG9uZW50c1wiPkFib3V0IHdlYiBjb21wb25lbnRzPC9hPlxuICAgICAgPC9wZi1jYXJkPlxuICAgICAgPGEgY2xhc3M9XCJjdGFcIiBzbG90PVwiZm9vdGVyXCIgaHJlZj1cImh0dHBzOi8vcGF0dGVybmZseWVsZW1lbnRzLm9yZy9jb21wb25lbnRzXCI-VmlldyBhbGwgb2YgdGhlIGNvbXBvbmVudHM8L2E-XG4gICAgPC9zZWN0aW9uPlxuICAgIDxzZWN0aW9uPlxuICAgICAgPGgyPkFjY29yZGlvbiBjb21wb25lbnQ8L2gyPlxuICAgICAgPHBmLWFjY29yZGlvbj5cbiAgICAgICAgPHBmLWFjY29yZGlvbi1oZWFkZXI-XG4gICAgICAgICAgPGgzPldoeSBkbyB3aXphcmRzIG5lZWQgbW9uZXkgaWYgdGhleSBjb3VsZCBqdXN0IGNyZWF0ZSBpdD88L2gzPlxuICAgICAgICA8L3BmLWFjY29yZGlvbi1oZWFkZXI-XG4gICAgICAgIDxwZi1hY2NvcmRpb24tcGFuZWw-XG4gICAgICAgICAgPHA-VGhlcmUgaXMgbGVnaXNsYXRpb24gdGhhdCBkZWNpZGVzIHdoYXQgeW91IGNhbiBjb25qdXJlIGFuZCB3aGF0IHlvdSBjYW4gbm90LiBCZWNhdXNlIHRoaW5ncyB0aGF0IHlvdSBjb25qdXJlIG91dCBvZiB0aGluIGFpciB3aWxsIG5vdCBsYXN0LCBpdCBpcyBpbGxlZ2FsIGluIHRoZSB3aXphcmRpbmcgd29ybGQuPC9wPlxuICAgICAgICA8L3BmLWFjY29yZGlvbi1wYW5lbD5cbiAgICAgICAgPHBmLWFjY29yZGlvbi1oZWFkZXI-XG4gICAgICAgICAgPGgzPldoeSBkb2Vzbid0IEhhcnJ5IGhhdmUgYSBwb3J0cmFpdCBvZiBoaXMgcGFyZW50cz88L2gzPlxuICAgICAgICA8L3BmLWFjY29yZGlvbi1oZWFkZXI-XG4gICAgICAgIDxwZi1hY2NvcmRpb24tcGFuZWw-XG4gICAgICAgICAgPHA-PGEgaHJlZj1cIiNcIj5UaGUgY2hhcmFjdGVycyBpbiB0aGUgcG9ydHJhaXRzPC9hPiBhcmUgbm90IGFjdHVhbGx5IGdob3N0cy4gVGhleSBtYWlubHkgYXJlIHRoZXJlIGp1c3QgdG8gcmVwZWF0IGNvbW1vbiBwaHJhc2VzIG9yIHNlcnZlIGFzIGEgZ2VuZXJhbCA8YSBocmVmPVwiZm9vYmFyYmF6LmNvbVwiPnJlcHJlc2VudGF0aW9uIG9mIHRoZSBpbmRpdmlkdWFsPC9hPiB0aGV5IGRlcGljdC4gQSBwb3J0cmFpdCBvZiBoaXMgcGFyZW50cyB3b3VsZCBub3QgYmUgb2YgbXVjaCBoZWxwIHRvIEhhcnJ5LjwvcD5cbiAgICAgICAgPC9wZi1hY2NvcmRpb24tcGFuZWw-XG4gICAgICAgIDxwZi1hY2NvcmRpb24taGVhZGVyPlxuICAgICAgICAgIDxoMz5XaHkgaXMgSGFycnkgY29uc2lkZXJlZCBhIGhhbGYtYmxvb2QgaWYgYm90aCBvZiBoaXMgcGFyZW50cyBjb3VsZCB1c2UgbWFnaWM_PC9oMz5cbiAgICAgICAgPC9wZi1hY2NvcmRpb24taGVhZGVyPlxuICAgICAgICA8cGYtYWNjb3JkaW9uLXBhbmVsPlxuICAgICAgICAgIDxwPkJlY2F1c2UgSGFycnkncyBncmFuZHBhcmVudHMgd2VyZSBub3QgYWJsZSB0byBkbyBtYWdpYy4gVGhpcyBpcyBnZW5lcmFsbHkgZnJvd25lZCB1cG9uIGJ5IHRob3NlIHdobyBjb25zaWRlciB0aGVtc2VsdmVzIHB1cmUsIHN1Y2ggYXMgdGhlIE1hbGZveSdzIG9yIG90aGVyIGFudGFnb25pc3RzLjwvcD5cbiAgICAgICAgPC9wZi1hY2NvcmRpb24tcGFuZWw-XG4gICAgICAgIDxwZi1hY2NvcmRpb24taGVhZGVyPlxuICAgICAgICAgIDxoMz5JcyBIb2d3YXJ0cyB0aGUgb25seSB3aXphcmRpbmcgc2Nob29sPzwvaDM-XG4gICAgICAgIDwvcGYtYWNjb3JkaW9uLWhlYWRlcj5cbiAgICAgICAgPHBmLWFjY29yZGlvbi1wYW5lbD5cbiAgICAgICAgICA8cD5ObyEgSXQgaGFzIGJlZW4gcmV2ZWFsZWQgdGhhdCB0aGVyZSBhcmUgYWN0dWFsbHkgMTEgbG9uZyBlc3RhYmxpc2hlZCBhbmQgcHJlc3RpZ2lvdXMgc2Nob29scyBhcm91bmQgdGhlIGdsb2JlLiBUaGVzZSBpbmNsdWRlIENhc3RlbG9icnV4byBpbiB0aGUgcmFpbmZvcmVzdCBvZiBCcmF6aWwsIER1cm1zdHJhbmcgSW5zdGl0dXRlICh3aGVyZWFzIG5vYm9keSBpcyBjZXJ0YWluIG9mIGl04oCZcyB3aGVyZWFib3V0cyksIGFuZCBJbHZlcm1vcm55LCByaWdodCBoZXJlIGluIHRoZSBVbml0ZWQgU3RhdGVzLjwvcD5cbiAgICAgICAgPC9wZi1hY2NvcmRpb24tcGFuZWw-XG4gICAgICAgIDxwZi1hY2NvcmRpb24taGVhZGVyPlxuICAgICAgICAgIDxoMz5XaGVyZSBkbyB0aGUgbWFpbiBjaGFyYWN0ZXJzIHdvcmsgYXMgYWR1bHRzPzwvaDM-XG4gICAgICAgIDwvcGYtYWNjb3JkaW9uLWhlYWRlcj5cbiAgICAgICAgPHBmLWFjY29yZGlvbi1wYW5lbD5cbiAgICAgICAgICA8cD5IYXJyeSBhbmQgSGVybWlvbmUgYXJlIGF0IHRoZSBNaW5pc3RyeTogaGUgZW5kcyB1cCBsZWFkaW5nIHRoZSBBdXJvciBkZXBhcnRtZW50LiBSb24gaGVscHMgR2VvcmdlIGF0IHRoZSBqb2tlIHNob3AgYW5kIGRvZXMgdmVyeSB3ZWxsLiBHaW5ueSBiZWNvbWVzIGEgcHJvZmVzc2lvbmFsIFF1aWRkaXRjaCBwbGF5ZXIgYW5kIHRoZW4gc3BvcnRzd3JpdGVyIGZvciB0aGUgRGFpbHkgUHJvcGhldC48L3A-XG4gICAgICAgICAgPHA-PGEgaHJlZj1cImh0dHBzOi8vd3d3LnBvdHRlcm1vcmUuY29tL2NvbGxlY3Rpb24vY2hhcmFjdGVyc1wiIHRhcmdldD1cImJsYW5rXCI-UmVhZCBtb3JlIGFib3V0IHRoZSBjaGFyYWN0ZXJzPC9hPjwvcD5cbiAgICAgICAgPC9wZi1hY2NvcmRpb24tcGFuZWw-XG4gICAgICA8L3BmLWFjY29yZGlvbj5cbiAgICA8L3NlY3Rpb24-XG4gICAgPHNlY3Rpb24-XG4gICAgICA8aDI-VGFicyBjb21wb25lbnQ8L2gyPlxuICAgICAgPHBmLXRhYnM-XG4gICAgICAgIDxwZi10YWIgc2xvdD1cInRhYlwiPlVzZXJzPC9wZi10YWI-XG4gICAgICAgIDxwZi10YWItcGFuZWw-VXNlcnM8L3BmLXRhYi1wYW5lbD5cbiAgICAgICAgPHBmLXRhYiBzbG90PVwidGFiXCIgYWN0aXZlPkNvbnRhaW5lcnM8L3BmLXRhYj5cbiAgICAgICAgPHBmLXRhYi1wYW5lbD5Db250YWluZXJzPC9wZi10YWItcGFuZWw-XG4gICAgICAgIDxwZi10YWIgc2xvdD1cInRhYlwiPkRhdGFiYXNlPC9wZi10YWI-XG4gICAgICAgIDxwZi10YWItcGFuZWw-RGF0YWJhc2U8L3BmLXRhYi1wYW5lbD5cbiAgICAgIDwvcGYtdGFicz5cbiAgICA8L3NlY3Rpb24-XG4gIDwvbWFpbj5cbjwvYm9keT5cbjwvaHRtbD4ifSx7Im5hbWUiOiJwYWNrYWdlLmpzb24iLCJjb250ZW50Ijoie1xuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJsaXRcIjogXCJeMi4wLjBcIixcbiAgICBcIkBsaXQvcmVhY3RpdmUtZWxlbWVudFwiOiBcIl4xLjAuMFwiLFxuICAgIFwibGl0LWVsZW1lbnRcIjogXCJeMy4wLjBcIixcbiAgICBcImxpdC1odG1sXCI6IFwiXjIuMC4wXCJcbiAgfVxufSIsImhpZGRlbiI6dHJ1ZX1d) example of the HTML above

</section>
