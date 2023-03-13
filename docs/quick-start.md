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
        <pf-tab slot="tab" id="tab1">
          <h3>Tab 1</h3>
        </pf-tab>
        <pf-tab-panel>
          <h3>Content 1</h3>
          <p>Lorem ipsum dolor sit amet, <a href="#">link</a> consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </pf-tab-panel>
        <pf-tab role="heading" slot="tab" id="tab2">
          <h3>Tab 2</h3>
        </pf-tab>
        <pf-tab-panel>
          <h3>Content 2</h3>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis eius illum, ut vel quis porro voluptatum amet! Enim, sequi. Laudantium magnam officia dolore debitis quas eius placeat beatae illo obcaecati?</p>
        </pf-tab-panel>
        <pf-tab role="heading" slot="tab" id="tab3">
          <h3>Tab 3</h3>
        </pf-tab>
        <pf-tab-panel>
          <h3>Content 3</h3>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea animi enim eum ipsum laudantium eius deleniti quos illo id veritatis. Vero veritatis architecto aliquam non voluptate quibusdam saepe in cum.</p>
        </pf-tab-panel>
      </pf-tabs>
    </section>
  </main>
</body>
</html>
```

[Lit Playground](https://lit.dev/playground/#project=W3sibmFtZSI6ImluZGV4Lmh0bWwiLCJjb250ZW50IjoiPCFET0NUWVBFIGh0bWw-XG48aHRtbCBsYW5nPVwiZW5cIj5cbjxoZWFkPlxuICA8bWV0YSBjaGFyc2V0PVwiVVRGLThcIj5cbiAgPG1ldGEgbmFtZT1cInZpZXdwb3J0XCIgY29udGVudD1cIndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLjBcIj5cbiAgPG1ldGEgbmFtZT1cImRlc2NyaXB0aW9uXCIgY29udGVudD1cIlBhdHRlcm5GbHkgRWxlbWVudHMgLSBRdWljayBzdGFydFwiPlxuICA8dGl0bGU-UGF0dGVybkZseSBFbGVtZW50cyAtIFF1aWNrIHN0YXJ0PC90aXRsZT5cbiAgPGxpbmsgaHJlZj1cImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9UmVkK0hhdCtEaXNwbGF5OndnaHRANDAwOzUwMDs3MDAmZmFtaWx5PVJlZCtIYXQrVGV4dCZkaXNwbGF5PXN3YXBcIiByZWw9XCJzdHlsZXNoZWV0XCI-XG4gIDxzdHlsZT5cbiAgICBodG1sLFxuICAgIGJvZHkge1xuICAgICAgbWFyZ2luOiAwO1xuICAgICAgcGFkZGluZzogMXJlbTtcbiAgICAgIGZvbnQtZmFtaWx5OiBcIlJlZCBIYXQgVGV4dFwiO1xuICAgIH1cblxuICAgIGgxLCBoMiwgaDMsIGg0IHtcbiAgICAgIGZvbnQtZmFtaWx5OiBcIlJlZCBIYXQgRGlzcGxheVwiO1xuICAgIH1cbiAgPC9zdHlsZT5cbiAgPCEtLVxuICAgIEpTUE0gR2VuZXJhdG9yIEltcG9ydCBNYXBcbiAgICBFZGl0IFVSTDogaHR0cHM6Ly9nZW5lcmF0b3IuanNwbS5pby8jVTJWaFlHQmtETTByeVN6SlNVMWhjQ2hJTENsSkxjcEx5Nm5VVDgxSnpVM05LeWwyTU5JejBETUFBRFdDNXZFcEFBXG4gIC0tPlxuICA8c2NyaXB0IHR5cGU9XCJpbXBvcnRtYXBcIj5cbiAge1xuICAgIFwiaW1wb3J0c1wiOiB7XG4gICAgICBcIkBwYXR0ZXJuZmx5L2VsZW1lbnRzXCI6IFwiaHR0cHM6Ly9nYS5qc3BtLmlvL25wbTpAcGF0dGVybmZseS9lbGVtZW50c0AyLjAuMC9wZmUubWluLmpzXCJcbiAgICB9LFxuICAgIFwic2NvcGVzXCI6IHtcbiAgICAgIFwiaHR0cHM6Ly9nYS5qc3BtLmlvL1wiOiB7XG4gICAgICAgIFwiQGZsb2F0aW5nLXVpL2NvcmVcIjogXCJodHRwczovL2dhLmpzcG0uaW8vbnBtOkBmbG9hdGluZy11aS9jb3JlQDEuMi4zL2Rpc3QvZmxvYXRpbmctdWkuY29yZS5icm93c2VyLm1qc1wiLFxuICAgICAgICBcIkBmbG9hdGluZy11aS9kb21cIjogXCJodHRwczovL2dhLmpzcG0uaW8vbnBtOkBmbG9hdGluZy11aS9kb21AMS4yLjQvZGlzdC9mbG9hdGluZy11aS5kb20uYnJvd3Nlci5tanNcIixcbiAgICAgICAgXCJAbGl0L3JlYWN0aXZlLWVsZW1lbnRcIjogXCJodHRwczovL2dhLmpzcG0uaW8vbnBtOkBsaXQvcmVhY3RpdmUtZWxlbWVudEAxLjYuMS9kZXZlbG9wbWVudC9yZWFjdGl2ZS1lbGVtZW50LmpzXCIsXG4gICAgICAgIFwiQGxpdC9yZWFjdGl2ZS1lbGVtZW50L2RlY29yYXRvcnMvXCI6IFwiaHR0cHM6Ly9nYS5qc3BtLmlvL25wbTpAbGl0L3JlYWN0aXZlLWVsZW1lbnRAMS42LjEvZGV2ZWxvcG1lbnQvZGVjb3JhdG9ycy9cIixcbiAgICAgICAgXCJsaXRcIjogXCJodHRwczovL2dhLmpzcG0uaW8vbnBtOmxpdEAyLjYuMS9pbmRleC5qc1wiLFxuICAgICAgICBcImxpdC1lbGVtZW50L2xpdC1lbGVtZW50LmpzXCI6IFwiaHR0cHM6Ly9nYS5qc3BtLmlvL25wbTpsaXQtZWxlbWVudEAzLjIuMi9kZXZlbG9wbWVudC9saXQtZWxlbWVudC5qc1wiLFxuICAgICAgICBcImxpdC1odG1sXCI6IFwiaHR0cHM6Ly9nYS5qc3BtLmlvL25wbTpsaXQtaHRtbEAyLjYuMS9kZXZlbG9wbWVudC9saXQtaHRtbC5qc1wiLFxuICAgICAgICBcImxpdC1odG1sL1wiOiBcImh0dHBzOi8vZ2EuanNwbS5pby9ucG06bGl0LWh0bWxAMi42LjEvZGV2ZWxvcG1lbnQvXCIsXG4gICAgICAgIFwibGl0L1wiOiBcImh0dHBzOi8vZ2EuanNwbS5pby9ucG06bGl0QDIuNi4xL1wiLFxuICAgICAgICBcInRzbGliXCI6IFwiaHR0cHM6Ly9nYS5qc3BtLmlvL25wbTp0c2xpYkAyLjUuMC90c2xpYi5lczYuanNcIlxuICAgICAgfVxuICAgIH1cbiAgfVxuICA8L3NjcmlwdD5cbiAgPCEtLSBFUyBNb2R1bGUgU2hpbXM6IEltcG9ydCBtYXBzIHBvbHlmaWxsIGZvciBtb2R1bGVzIGJyb3dzZXJzIHdpdGhvdXQgaW1wb3J0IG1hcHMgc3VwcG9ydCAoYWxsIGV4Y2VwdCBDaHJvbWUgODkrKSAtLT5cbiAgPHNjcmlwdCBhc3luYyBzcmM9XCJodHRwczovL2dhLmpzcG0uaW8vbnBtOmVzLW1vZHVsZS1zaGltc0AxLjUuMS9kaXN0L2VzLW1vZHVsZS1zaGltcy5qc1wiIGNyb3Nzb3JpZ2luPVwiYW5vbnltb3VzXCI-PC9zY3JpcHQ-XG4gIFxuICA8c2NyaXB0IHR5cGU9XCJtb2R1bGVcIj5cbiAgICBpbXBvcnQgKiBhcyBFbGVtZW50cyBmcm9tIFwiQHBhdHRlcm5mbHkvZWxlbWVudHNcIjtcbiAgPC9zY3JpcHQ-XG48L2hlYWQ-XG48Ym9keT5cbiAgPGhlYWRlcj5cbiAgICA8aDE-UGF0dGVybkZseSBFbGVtZW50czwvaDE-XG4gIDwvaGVhZGVyPlxuICA8bWFpbj5cbiAgICA8c2VjdGlvbiBjbGFzcz1cImJhbmRcIj5cbiAgICAgIDxoMj5DYXJkIGNvbXBvbmVudHM8L2gyPlxuICAgICAgPHBmLWNhcmQ-XG4gICAgICAgIDxoMyBzbG90PVwiaGVhZGVyXCI-Q2FyZCAxPC9oMz5cbiAgICAgICAgPHA-TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gT21uaXMgbGFib3Jpb3NhbSBldW0gc2FlcGUgZWl1cyB0ZW1wb3JhIHNlcXVpIGVsaWdlbmRpIHJlcHVkaWFuZGFlIGFzcGVybmF0dXIgYmVhdGFlIHRvdGFtIHZvbHVwdGF0dW0gZmFjZXJlIHVuZGUsIHZpdGFlIGludmVudG9yZSBldmVuaWV0IGFjY3VzYW11cyBudWxsYSByZWN1c2FuZGFlIGFsaXF1YW0uPC9wPlxuICAgICAgICA8YSBzbG90PVwiZm9vdGVyXCIgY2xhc3M9XCJjdGEgcHJpbWFyeVwiIGhyZWY9XCJodHRwczovL3BhdHRlcm5mbHllbGVtZW50cy5vcmdcIj5Nb3JlIGFib3V0IFBhdHRlcm5GbHkgRWxlbWVudHM8L2E-XG4gICAgICA8L3BmLWNhcmQ-XG4gICAgICA8cGYtY2FyZD5cbiAgICAgICAgPGgzIHNsb3Q9XCJoZWFkZXJcIj5DYXJkIDI8L2gzPlxuICAgICAgICA8cD5Mb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gRWFxdWUgbmVjZXNzaXRhdGlidXMgc2FwaWVudGUgYWxpcXVhbSByZWN1c2FuZGFlIG1heGltZSBjb25zZWN0ZXR1ciBtYWduYW0gaXBzYSB2ZW5pYW0gZXhwZWRpdGEgbW9sZXN0aWFlLiBRdWlzIG9mZmljaWEgbWluaW1hIGxpYmVybyByZXBlbGxhdCBsYWJvcmlvc2FtIHNpdCBuZW1vIHBvcnJvIGxhYm9ydW0uPC9wPlxuICAgICAgICA8YSBjbGFzcz1cImN0YVwiIHNsb3Q9XCJmb290ZXJcIiBocmVmPVwiaHR0cHM6Ly9wYXR0ZXJuZmx5ZWxlbWVudHMub3JnL2dldC1zdGFydGVkXCI-R2V0IHN0YXJ0ZWQ8L2E-XG4gICAgICA8L3BmLWNhcmQ-XG4gICAgICA8cGYtY2FyZD5cbiAgICAgICAgPGgzIHNsb3Q9XCJoZWFkZXJcIj5DYXJkIDM8L2gzPlxuICAgICAgICA8cD5Mb3JlbSBpcHN1bSBkb2xvciwgc2l0IGFtZXQgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gVm9sdXB0YXRlIGl1c3RvIGxhYm9yaW9zYW0gbW9sZXN0aWFzLCBxdWlkZW0gYWIgdm9sdXB0YXRlcyBuaWhpbCBlYXJ1bSBzZWQhIEVzc2UgcmVwZWxsYXQgcXVvIHV0IG51bXF1YW0gbW9sbGl0aWEgcXVpcyBzYWVwZSBhc3Blcm5hdHVyIGZ1Z2EgZXJyb3IgaW4hPC9wPlxuICAgICAgICA8YSBjbGFzcz1cImN0YVwiIHNsb3Q9XCJmb290ZXJcIiBocmVmPVwiaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvV2ViX0NvbXBvbmVudHNcIj5BYm91dCB3ZWIgY29tcG9uZW50czwvYT5cbiAgICAgIDwvcGYtY2FyZD5cbiAgICAgIDxhIGNsYXNzPVwiY3RhXCIgc2xvdD1cImZvb3RlclwiIGhyZWY9XCJodHRwczovL3BhdHRlcm5mbHllbGVtZW50cy5vcmcvY29tcG9uZW50c1wiPlZpZXcgYWxsIG9mIHRoZSBjb21wb25lbnRzPC9hPlxuICAgIDwvc2VjdGlvbj5cbiAgICA8c2VjdGlvbj5cbiAgICAgIDxoMj5BY2NvcmRpb24gY29tcG9uZW50PC9oMj5cbiAgICAgIDxwZi1hY2NvcmRpb24-XG4gICAgICAgIDxwZi1hY2NvcmRpb24taGVhZGVyPlxuICAgICAgICAgIDxoMz5XaHkgZG8gd2l6YXJkcyBuZWVkIG1vbmV5IGlmIHRoZXkgY291bGQganVzdCBjcmVhdGUgaXQ_PC9oMz5cbiAgICAgICAgPC9wZi1hY2NvcmRpb24taGVhZGVyPlxuICAgICAgICA8cGYtYWNjb3JkaW9uLXBhbmVsPlxuICAgICAgICAgIDxwPlRoZXJlIGlzIGxlZ2lzbGF0aW9uIHRoYXQgZGVjaWRlcyB3aGF0IHlvdSBjYW4gY29uanVyZSBhbmQgd2hhdCB5b3UgY2FuIG5vdC4gQmVjYXVzZSB0aGluZ3MgdGhhdCB5b3UgY29uanVyZSBvdXQgb2YgdGhpbiBhaXIgd2lsbCBub3QgbGFzdCwgaXQgaXMgaWxsZWdhbCBpbiB0aGUgd2l6YXJkaW5nIHdvcmxkLjwvcD5cbiAgICAgICAgPC9wZi1hY2NvcmRpb24tcGFuZWw-XG4gICAgICAgIDxwZi1hY2NvcmRpb24taGVhZGVyPlxuICAgICAgICAgIDxoMz5XaHkgZG9lc24ndCBIYXJyeSBoYXZlIGEgcG9ydHJhaXQgb2YgaGlzIHBhcmVudHM_PC9oMz5cbiAgICAgICAgPC9wZi1hY2NvcmRpb24taGVhZGVyPlxuICAgICAgICA8cGYtYWNjb3JkaW9uLXBhbmVsPlxuICAgICAgICAgIDxwPjxhIGhyZWY9XCIjXCI-VGhlIGNoYXJhY3RlcnMgaW4gdGhlIHBvcnRyYWl0czwvYT4gYXJlIG5vdCBhY3R1YWxseSBnaG9zdHMuIFRoZXkgbWFpbmx5IGFyZSB0aGVyZSBqdXN0IHRvIHJlcGVhdCBjb21tb24gcGhyYXNlcyBvciBzZXJ2ZSBhcyBhIGdlbmVyYWwgPGEgaHJlZj1cImZvb2JhcmJhei5jb21cIj5yZXByZXNlbnRhdGlvbiBvZiB0aGUgaW5kaXZpZHVhbDwvYT4gdGhleSBkZXBpY3QuIEEgcG9ydHJhaXQgb2YgaGlzIHBhcmVudHMgd291bGQgbm90IGJlIG9mIG11Y2ggaGVscCB0byBIYXJyeS48L3A-XG4gICAgICAgIDwvcGYtYWNjb3JkaW9uLXBhbmVsPlxuICAgICAgICA8cGYtYWNjb3JkaW9uLWhlYWRlcj5cbiAgICAgICAgICA8aDM-V2h5IGlzIEhhcnJ5IGNvbnNpZGVyZWQgYSBoYWxmLWJsb29kIGlmIGJvdGggb2YgaGlzIHBhcmVudHMgY291bGQgdXNlIG1hZ2ljPzwvaDM-XG4gICAgICAgIDwvcGYtYWNjb3JkaW9uLWhlYWRlcj5cbiAgICAgICAgPHBmLWFjY29yZGlvbi1wYW5lbD5cbiAgICAgICAgICA8cD5CZWNhdXNlIEhhcnJ5J3MgZ3JhbmRwYXJlbnRzIHdlcmUgbm90IGFibGUgdG8gZG8gbWFnaWMuIFRoaXMgaXMgZ2VuZXJhbGx5IGZyb3duZWQgdXBvbiBieSB0aG9zZSB3aG8gY29uc2lkZXIgdGhlbXNlbHZlcyBwdXJlLCBzdWNoIGFzIHRoZSBNYWxmb3kncyBvciBvdGhlciBhbnRhZ29uaXN0cy48L3A-XG4gICAgICAgIDwvcGYtYWNjb3JkaW9uLXBhbmVsPlxuICAgICAgICA8cGYtYWNjb3JkaW9uLWhlYWRlcj5cbiAgICAgICAgICA8aDM-SXMgSG9nd2FydHMgdGhlIG9ubHkgd2l6YXJkaW5nIHNjaG9vbD88L2gzPlxuICAgICAgICA8L3BmLWFjY29yZGlvbi1oZWFkZXI-XG4gICAgICAgIDxwZi1hY2NvcmRpb24tcGFuZWw-XG4gICAgICAgICAgPHA-Tm8hIEl0IGhhcyBiZWVuIHJldmVhbGVkIHRoYXQgdGhlcmUgYXJlIGFjdHVhbGx5IDExIGxvbmcgZXN0YWJsaXNoZWQgYW5kIHByZXN0aWdpb3VzIHNjaG9vbHMgYXJvdW5kIHRoZSBnbG9iZS4gVGhlc2UgaW5jbHVkZSBDYXN0ZWxvYnJ1eG8gaW4gdGhlIHJhaW5mb3Jlc3Qgb2YgQnJhemlsLCBEdXJtc3RyYW5nIEluc3RpdHV0ZSAod2hlcmVhcyBub2JvZHkgaXMgY2VydGFpbiBvZiBpdOKAmXMgd2hlcmVhYm91dHMpLCBhbmQgSWx2ZXJtb3JueSwgcmlnaHQgaGVyZSBpbiB0aGUgVW5pdGVkIFN0YXRlcy48L3A-XG4gICAgICAgIDwvcGYtYWNjb3JkaW9uLXBhbmVsPlxuICAgICAgICA8cGYtYWNjb3JkaW9uLWhlYWRlcj5cbiAgICAgICAgICA8aDM-V2hlcmUgZG8gdGhlIG1haW4gY2hhcmFjdGVycyB3b3JrIGFzIGFkdWx0cz88L2gzPlxuICAgICAgICA8L3BmLWFjY29yZGlvbi1oZWFkZXI-XG4gICAgICAgIDxwZi1hY2NvcmRpb24tcGFuZWw-XG4gICAgICAgICAgPHA-SGFycnkgYW5kIEhlcm1pb25lIGFyZSBhdCB0aGUgTWluaXN0cnk6IGhlIGVuZHMgdXAgbGVhZGluZyB0aGUgQXVyb3IgZGVwYXJ0bWVudC4gUm9uIGhlbHBzIEdlb3JnZSBhdCB0aGUgam9rZSBzaG9wIGFuZCBkb2VzIHZlcnkgd2VsbC4gR2lubnkgYmVjb21lcyBhIHByb2Zlc3Npb25hbCBRdWlkZGl0Y2ggcGxheWVyIGFuZCB0aGVuIHNwb3J0c3dyaXRlciBmb3IgdGhlIERhaWx5IFByb3BoZXQuPC9wPlxuICAgICAgICAgIDxwPjxhIGhyZWY9XCJodHRwczovL3d3dy5wb3R0ZXJtb3JlLmNvbS9jb2xsZWN0aW9uL2NoYXJhY3RlcnNcIiB0YXJnZXQ9XCJibGFua1wiPlJlYWQgbW9yZSBhYm91dCB0aGUgY2hhcmFjdGVyczwvYT48L3A-XG4gICAgICAgIDwvcGYtYWNjb3JkaW9uLXBhbmVsPlxuICAgICAgPC9wZi1hY2NvcmRpb24-XG4gICAgPC9zZWN0aW9uPlxuICAgIDxzZWN0aW9uPlxuICAgICAgPGgyPlRhYnMgY29tcG9uZW50PC9oMj5cbiAgICAgIDxwZi10YWJzPlxuICAgICAgICA8cGYtdGFiIHNsb3Q9XCJ0YWJcIiBpZD1cInRhYjFcIj5cbiAgICAgICAgICA8aDM-VGFiIDE8L2gzPlxuICAgICAgICA8L3BmLXRhYj5cbiAgICAgICAgPHBmLXRhYi1wYW5lbD5cbiAgICAgICAgICA8aDM-Q29udGVudCAxPC9oMz5cbiAgICAgICAgICA8cD5Mb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgPGEgaHJlZj1cIiNcIj5saW5rPC9hPiBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LCBzZWQgZG8gZWl1c21vZCB0ZW1wb3IgaW5jaWRpZHVudCB1dCBsYWJvcmUgZXQgZG9sb3JlIG1hZ25hIGFsaXF1YS4gVXQgZW5pbSBhZCBtaW5pbSB2ZW5pYW0sIHF1aXMgbm9zdHJ1ZCBleGVyY2l0YXRpb24gdWxsYW1jbyBsYWJvcmlzIG5pc2kgdXQgYWxpcXVpcCBleCBlYSBjb21tb2RvIGNvbnNlcXVhdC4gRHVpcyBhdXRlIGlydXJlIGRvbG9yIGluIHJlcHJlaGVuZGVyaXQgaW4gdm9sdXB0YXRlIHZlbGl0IGVzc2UgY2lsbHVtIGRvbG9yZSBldSBmdWdpYXQgbnVsbGEgcGFyaWF0dXIuIEV4Y2VwdGV1ciBzaW50IG9jY2FlY2F0IGN1cGlkYXRhdCBub24gcHJvaWRlbnQsIHN1bnQgaW4gY3VscGEgcXVpIG9mZmljaWEgZGVzZXJ1bnQgbW9sbGl0IGFuaW0gaWQgZXN0IGxhYm9ydW0uPC9wPlxuICAgICAgICA8L3BmLXRhYi1wYW5lbD5cbiAgICAgICAgPHBmLXRhYiByb2xlPVwiaGVhZGluZ1wiIHNsb3Q9XCJ0YWJcIiBpZD1cInRhYjJcIj5cbiAgICAgICAgICA8aDM-VGFiIDI8L2gzPlxuICAgICAgICA8L3BmLXRhYj5cbiAgICAgICAgPHBmLXRhYi1wYW5lbD5cbiAgICAgICAgICA8aDM-Q29udGVudCAyPC9oMz5cbiAgICAgICAgICA8cD5Mb3JlbSBpcHN1bSBkb2xvciwgc2l0IGFtZXQgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gT2ZmaWNpaXMgZWl1cyBpbGx1bSwgdXQgdmVsIHF1aXMgcG9ycm8gdm9sdXB0YXR1bSBhbWV0ISBFbmltLCBzZXF1aS4gTGF1ZGFudGl1bSBtYWduYW0gb2ZmaWNpYSBkb2xvcmUgZGViaXRpcyBxdWFzIGVpdXMgcGxhY2VhdCBiZWF0YWUgaWxsbyBvYmNhZWNhdGk_PC9wPlxuICAgICAgICA8L3BmLXRhYi1wYW5lbD5cbiAgICAgICAgPHBmLXRhYiByb2xlPVwiaGVhZGluZ1wiIHNsb3Q9XCJ0YWJcIiBpZD1cInRhYjNcIj5cbiAgICAgICAgICA8aDM-VGFiIDM8L2gzPlxuICAgICAgICA8L3BmLXRhYj5cbiAgICAgICAgPHBmLXRhYi1wYW5lbD5cbiAgICAgICAgICA8aDM-Q29udGVudCAzPC9oMz5cbiAgICAgICAgICA8cD5Mb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCBjb25zZWN0ZXR1ciwgYWRpcGlzaWNpbmcgZWxpdC4gRWEgYW5pbWkgZW5pbSBldW0gaXBzdW0gbGF1ZGFudGl1bSBlaXVzIGRlbGVuaXRpIHF1b3MgaWxsbyBpZCB2ZXJpdGF0aXMuIFZlcm8gdmVyaXRhdGlzIGFyY2hpdGVjdG8gYWxpcXVhbSBub24gdm9sdXB0YXRlIHF1aWJ1c2RhbSBzYWVwZSBpbiBjdW0uPC9wPlxuICAgICAgICA8L3BmLXRhYi1wYW5lbD5cbiAgICAgIDwvcGYtdGFicz5cbiAgICA8L3NlY3Rpb24-XG4gIDwvbWFpbj5cbjwvYm9keT5cbjwvaHRtbD4ifSx7Im5hbWUiOiJwYWNrYWdlLmpzb24iLCJjb250ZW50Ijoie1xuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJsaXRcIjogXCJeMi4wLjBcIixcbiAgICBcIkBsaXQvcmVhY3RpdmUtZWxlbWVudFwiOiBcIl4xLjAuMFwiLFxuICAgIFwibGl0LWVsZW1lbnRcIjogXCJeMy4wLjBcIixcbiAgICBcImxpdC1odG1sXCI6IFwiXjIuMC4wXCJcbiAgfVxufSIsImhpZGRlbiI6dHJ1ZX1d) example of the HTML above

</section>
