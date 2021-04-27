---
layout: layout-basic.html
title: Quick start
---

::: section header
# {{ title }}
:::

::: section
## Quick start template
Use the markup below to start exploring PatternFly Elements. The template below includes the [card](/components/card), [band](/components/band), [call-to-action](/components/call-to-action), [accordion](/components/accordion), and [tabs](/components/tabs) components as well the grid system and alignment helpers included with PatternFly Elements.

The template below utilizes [UNPKG](https://unpkg.com/) to deliver PatternFly Elements to the page. This is fine for development and exploration, but it's highly recommended that you install PatternFly Elements from npm for use in production.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="PatternFly Elements - Quick start">
  <title>PatternFly Elements - Quick start</title>
  <link rel="stylesheet" href="https://unpkg.com/@patternfly/pfelement/dist/pfelement.min.css">
  <link rel="stylesheet" href="https://unpkg.com/@patternfly/pfe-styles/dist/pfe-layouts.min.css">
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
  <script type="module">
    import "https://unpkg.com/@patternfly/pfe-card/dist/pfe-card.min.js";
    import "https://unpkg.com/@patternfly/pfe-band/dist/pfe-band.min.js";
    import "https://unpkg.com/@patternfly/pfe-cta/dist/pfe-cta.min.js";
    import "https://unpkg.com/@patternfly/pfe-accordion/dist/pfe-accordion.min.js";
    import "https://unpkg.com/@patternfly/pfe-tabs/dist/pfe-tabs.min.js";
  </script>
</head>
<body unresolved>
  <header>
    <pfe-band color="accent">
      <h1>PatternFly Elements</h1>
    </pfe-band>
  </header>
  <main>
    <pfe-band color="lightest">
      <h2 slot="pfe-band--header">Card components</h2>
      <div class="pfe-l-grid pfe-m-gutters pfe-m-all-4-col">
        <pfe-card>
          <h3 slot="pfe-card--header">Card 1</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis laboriosam eum saepe eius tempora sequi eligendi repudiandae aspernatur beatae totam voluptatum facere unde, vitae inventore eveniet accusamus nulla recusandae aliquam.</p>
          <div slot="pfe-card--footer">
            <pfe-cta>
              <a href="https://patternflyelements.org">More about PatternFly Elements</a>
            </pfe-cta>
          </div>
        </pfe-card>
        <pfe-card>
          <h3 slot="pfe-card--header">Card 2</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque necessitatibus sapiente aliquam recusandae maxime consectetur magnam ipsa veniam expedita molestiae. Quis officia minima libero repellat laboriosam sit nemo porro laborum.</p>
          <div slot="pfe-card--footer">
            <pfe-cta>
              <a href="https://patternflyelements.org/get-started">Get started</a>
            </pfe-cta>
          </div>
        </pfe-card>
        <pfe-card>
          <h3 slot="pfe-card--header">Card 3</h3>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate iusto laboriosam molestias, quidem ab voluptates nihil earum sed! Esse repellat quo ut numquam mollitia quis saepe aspernatur fuga error in!</p>
          <div slot="pfe-card--footer">
            <pfe-cta>
              <a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components">About web components</a>
            </pfe-cta>
          </div>
        </pfe-card>
      </div>
      <br>
      <div slot="pfe-band--footer" class="pfe-l--text-align--center">
        <pfe-cta>
          <a href="https://patternflyelements.org/components">View all of the components</a>
        </pfe-cta>
      </div>
    </pfe-band>
    <pfe-band>
      <h2 slot="pfe-band--header">Accordion component</h2>
      <pfe-accordion>
        <pfe-accordion-header>
          <h3>Why do wizards need money if they could just create it?</h3>
        </pfe-accordion-header>
        <pfe-accordion-panel>
          <p>There is legislation that decides what you can conjure and what you can not. Because things that you conjure out of thin air will not last, it is illegal in the wizarding world.</p>
        </pfe-accordion-panel>
        <pfe-accordion-header>
          <h3>Why doesn't Harry have a portrait of his parents?</h3>
        </pfe-accordion-header>
        <pfe-accordion-panel>
          <p><a href="#">The characters in the portraits</a> are not actually ghosts. They mainly are there just to repeat common phrases or serve as a general <a href="foobarbaz.com">representation of the individual</a> they depict. A portrait of his parents would not be of much help to Harry.</p>
        </pfe-accordion-panel>
        <pfe-accordion-header>
          <h3>Why is Harry considered a half-blood if both of his parents could use magic?</h3>
        </pfe-accordion-header>
        <pfe-accordion-panel>
          <p>Because Harry's grandparents were not able to do magic. This is generally frowned upon by those who consider themselves pure, such as the Malfoy's or other antagonists.</p>
        </pfe-accordion-panel>
        <pfe-accordion-header>
          <h3>Is Hogwarts the only wizarding school?</h3>
        </pfe-accordion-header>
        <pfe-accordion-panel>
          <p>No! It has been revealed that there are actually 11 long established and prestigious schools around the globe. These include Castelobruxo in the rainforest of Brazil, Durmstrang Institute (whereas nobody is certain of it’s whereabouts), and Ilvermorny, right here in the United States.</p>
        </pfe-accordion-panel>
        <pfe-accordion-header>
          <h3>Where do the main characters work as adults?</h3>
        </pfe-accordion-header>
        <pfe-accordion-panel>
          <p>Harry and Hermione are at the Ministry: he ends up leading the Auror department. Ron helps George at the joke shop and does very well. Ginny becomes a professional Quidditch player and then sportswriter for the Daily Prophet.</p>
          <p><a href="https://www.pottermore.com/collection/characters" target="blank">Read more about the characters</a></p>
        </pfe-accordion-panel>
      </pfe-accordion>
    </pfe-band>
    <pfe-band color="darkest">
      <h2 slot="pfe-band--header">Tabs component</h2>
      <pfe-tabs>
        <pfe-tab role="heading" slot="tab" id="tab1">
          <h3>Tab 1</h3>
        </pfe-tab>
        <pfe-tab-panel role="region" slot="panel">
          <h3>Content 1</h3>
          <p>Lorem ipsum dolor sit amet, <a href="#">link</a> consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </pfe-tab-panel>
        <pfe-tab role="heading" slot="tab" id="tab2">
          <h3>Tab 2</h3>
        </pfe-tab>
        <pfe-tab-panel role="region" slot="panel">
          <h3>Content 2</h3>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis eius illum, ut vel quis porro voluptatum amet! Enim, sequi. Laudantium magnam officia dolore debitis quas eius placeat beatae illo obcaecati?</p>
        </pfe-tab-panel>
        <pfe-tab role="heading" slot="tab" id="tab3">
          <h3>Tab 3</h3>
        </pfe-tab>
        <pfe-tab-panel role="region" slot="panel">
          <h3>Content 3</h3>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea animi enim eum ipsum laudantium eius deleniti quos illo id veritatis. Vero veritatis architecto aliquam non voluptate quibusdam saepe in cum.</p>
        </pfe-tab-panel>
      </pfe-tabs>
    </pfe-band>
  </main>
</body>
</html>
```
:::