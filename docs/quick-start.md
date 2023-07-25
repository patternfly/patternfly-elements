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
  {% generateImportMap %}
    <script type="module">
      import * as Elements from "@patternfly/elements";
    </script>
  {% endgenerateImportMap %}
  
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

[Lit Playground](https://lit.dev/playground/#gist=77a0cb2d080de958f4415a4716908bf9) example of the HTML above

</section>
