import { storiesOf } from "@storybook/polymer";
import {
  withKnobs,
  text,
  select,
  boolean
} from "@storybook/addon-knobs/polymer";
import "./rh-accordion";

const keyboardStory = storiesOf("Accordion", module);
const stories = storiesOf("Accordion", module);
stories.addDecorator(withKnobs);

keyboardStory.add(
  "rh-accordion (keyboard demo)",
  () => `
  <rh-accordion>
    <rh-accordion-header>
      <h2>Why do wizards need money if they could just create it?</h2>
    </rh-accordion-header>
    <rh-accordion-panel>
      <p>There is legislation that decides what you can conjure and what you can not. Because things that you conjure out of thin air will not last, it is illegal in the wizarding world.</p>
    </rh-accordion-panel>
    <rh-accordion-header>
      <h2>Why doesn't Harry have a portrait of his parents?</h2>
    </rh-accordion-header>
    <rh-accordion-panel>
      <p>The characters in the portraits are not actually ghosts. They mainly are there just to repeat common phrases or serve as a general representation of the individual they depict. A portrait of his parents would not be of much help to Harry.</p>
    </rh-accordion-panel>
    <rh-accordion-header>
      <h2>Why is Harry considered a half-blood if both of his parents could use magic?</h2>
    </rh-accordion-header>
    <rh-accordion-panel>
      <p>Because Harry's grandparents were not able to do magic. This is generally frowned upon by those who consider themselves pure, such as the Malfoy's or other antagonists.</p>
    </rh-accordion-panel>
    <rh-accordion-header>
      <h2>Is Hogwarts the only wizarding school?</h2>
    </rh-accordion-header>
    <rh-accordion-panel>
      <p>No! It has been revealed that there are actually 11 long established and prestigious schools around the globe. These include Castelobruxo in the rainforest of Brazil, Durmstrang Institute (whereas nobody is certain of it’s whereabouts), and Ilvermorny, right here in the United States.</p>
    </rh-accordion-panel>
    <rh-accordion-header>
      <h2>Where do the main characters work as adults?</h2>
    </rh-accordion-header>
    <rh-accordion-panel>
      <p>Harry and Hermione are at the Ministry: he ends up leading the Auror department. Ron helps George at the joke shop and does very well. Ginny becomes a professional Quidditch player and then sportswriter for the Daily Prophet.</p>
      <p><a href="https://www.pottermore.com/collection/characters" target="blank">Read more about the characters</a></p>
    </rh-accordion-panel>
  </rh-accordion>
  `
);

stories.add("rh-accordion", () => {
  let accordionColor = "";

  const colorOptions = {
    lightest: "lightest",
    striped: "striped",
    base: "base",
    default: "default",
    dark: "dark",
    darkest: "darkest",
    complement: "complement",
    accent: "accent"
  };

  const colorValue = select("Color", colorOptions, "default");
  accordionColor = colorValue != "default" ? ` color="${colorValue}"` : "";

  return `
  <style>
    .at-a-glance rh-accordion {
      margin-bottom: 30px;
    }
  </style>

  <section>
    <h2>Your RHElement</h2>
    <rh-accordion${accordionColor}>
      <rh-accordion-header>
        <h2>Why do wizards need money if they could just create it?</h2>
      </rh-accordion-header>
      <rh-accordion-panel>
        <p>There is legislation that decides what you can conjure and what you can not. Because things that you conjure out of thin air will not last, it is illegal in the wizarding world.</p>
      </rh-accordion-panel>
      <rh-accordion-header>
        <h2>Why doesn't Harry have a portrait of his parents?</h2>
      </rh-accordion-header>
      <rh-accordion-panel>
        <p>The characters in the portraits are not actually ghosts. They mainly are there just to repeat common phrases or serve as a general representation of the individual they depict. A portrait of his parents would not be of much help to Harry.</p>
      </rh-accordion-panel>
      <rh-accordion-header>
        <h2>Why is Harry considered a half-blood if both of his parents could use magic?</h2>
      </rh-accordion-header>
      <rh-accordion-panel>
        <p>Because Harry's grandparents were not able to do magic. This is generally frowned upon by those who consider themselves pure, such as the Malfoy's or other antagonists.</p>
      </rh-accordion-panel>
    </rh-accordion>
  </section>
  <section>
    <h2>Markup</h2>
    <pre><code>&lt;rh-accordion${accordionColor}&gt;
  &lt;rh-accordion-header&gt;
    &lt;h2&gt;Why do wizards need money if they could just create it?&lt;/h2&gt;
  &lt;/rh-accordion-header&gt;
  &lt;rh-accordion-panel&gt;
    &lt;p>There is legislation that decides what you can conjure and what you can not. Because things that you conjure out of thin air will not last, it is illegal in the wizarding world.&lt;/p&gt;
  &lt;/rh-accordion-panel&gt;
&lt;/rh-accordion&gt;</code></pre>
  </section>
  <section class="at-a-glance">
    <h2>At a glance</h2>
    <h3>Default</h3>
    <rh-accordion>
      <rh-accordion-header>
        <h2>Why do wizards need money if they could just create it?</h2>
      </rh-accordion-header>
      <rh-accordion-panel>
        <p>There is legislation that decides what you can conjure and what you can not. Because things that you conjure out of thin air will not last, it is illegal in the wizarding world.</p>
      </rh-accordion-panel>
      <rh-accordion-header>
        <h2>Why doesn't Harry have a portrait of his parents?</h2>
      </rh-accordion-header>
      <rh-accordion-panel>
        <p>The characters in the portraits are not actually ghosts. They mainly are there just to repeat common phrases or serve as a general representation of the individual they depict. A portrait of his parents would not be of much help to Harry.</p>
      </rh-accordion-panel>
      <rh-accordion-header>
        <h2>Why is Harry considered a half-blood if both of his parents could use magic?</h2>
      </rh-accordion-header>
      <rh-accordion-panel>
        <p>Because Harry's grandparents were not able to do magic. This is generally frowned upon by those who consider themselves pure, such as the Malfoy's or other antagonists.</p>
      </rh-accordion-panel>
      <rh-accordion-header>
        <h2>Is Hogwarts the only wizarding school?</h2>
      </rh-accordion-header>
      <rh-accordion-panel>
        <p>No! It has been revealed that there are actually 11 long established and prestigious schools around the globe. These include Castelobruxo in the rainforest of Brazil, Durmstrang Institute (whereas nobody is certain of it’s whereabouts), and Ilvermorny, right here in the United States.</p>
      </rh-accordion-panel>
      <rh-accordion-header>
        <h2>Where do the main characters work as adults?</h2>
      </rh-accordion-header>
      <rh-accordion-panel>
        <p>Harry and Hermione are at the Ministry: he ends up leading the Auror department. Ron helps George at the joke shop and does very well. Ginny becomes a professional Quidditch player and then sportswriter for the Daily Prophet.</p>
        <p><a href="https://www.pottermore.com/collection/characters" target="blank">Read more about the characters</a></p>
      </rh-accordion-panel>
    </rh-accordion>

    <h3>Lightest</h3>
    <rh-accordion color="lightest">
      <rh-accordion-header>
        <h2>Why do wizards need money if they could just create it?</h2>
      </rh-accordion-header>
      <rh-accordion-panel>
        <p>There is legislation that decides what you can conjure and what you can not. Because things that you conjure out of thin air will not last, it is illegal in the wizarding world.</p>
      </rh-accordion-panel>
      <rh-accordion-header>
        <h2>Why doesn't Harry have a portrait of his parents?</h2>
      </rh-accordion-header>
      <rh-accordion-panel>
        <p>The characters in the portraits are not actually ghosts. They mainly are there just to repeat common phrases or serve as a general representation of the individual they depict. A portrait of his parents would not be of much help to Harry.</p>
      </rh-accordion-panel>
      <rh-accordion-header>
        <h2>Why is Harry considered a half-blood if both of his parents could use magic?</h2>
      </rh-accordion-header>
      <rh-accordion-panel>
        <p>Because Harry's grandparents were not able to do magic. This is generally frowned upon by those who consider themselves pure, such as the Malfoy's or other antagonists.</p>
      </rh-accordion-panel>
      <rh-accordion-header>
        <h2>Is Hogwarts the only wizarding school?</h2>
      </rh-accordion-header>
      <rh-accordion-panel>
        <p>No! It has been revealed that there are actually 11 long established and prestigious schools around the globe. These include Castelobruxo in the rainforest of Brazil, Durmstrang Institute (whereas nobody is certain of it’s whereabouts), and Ilvermorny, right here in the United States.</p>
      </rh-accordion-panel>
      <rh-accordion-header>
        <h2>Where do the main characters work as adults?</h2>
      </rh-accordion-header>
      <rh-accordion-panel>
        <p>Harry and Hermione are at the Ministry: he ends up leading the Auror department. Ron helps George at the joke shop and does very well. Ginny becomes a professional Quidditch player and then sportswriter for the Daily Prophet.</p>
        <p><a href="https://www.pottermore.com/collection/characters" target="blank">Read more about the characters</a></p>
      </rh-accordion-panel>
    </rh-accordion>

    <h3>Striped</h3>
    <rh-accordion color="striped">
      <rh-accordion-header>
        <h2>Why do wizards need money if they could just create it?</h2>
      </rh-accordion-header>
      <rh-accordion-panel>
        <p>There is legislation that decides what you can conjure and what you can not. Because things that you conjure out of thin air will not last, it is illegal in the wizarding world.</p>
      </rh-accordion-panel>
      <rh-accordion-header>
        <h2>Why doesn't Harry have a portrait of his parents?</h2>
      </rh-accordion-header>
      <rh-accordion-panel>
        <p>The characters in the portraits are not actually ghosts. They mainly are there just to repeat common phrases or serve as a general representation of the individual they depict. A portrait of his parents would not be of much help to Harry.</p>
      </rh-accordion-panel>
      <rh-accordion-header>
        <h2>Why is Harry considered a half-blood if both of his parents could use magic?</h2>
      </rh-accordion-header>
      <rh-accordion-panel>
        <p>Because Harry's grandparents were not able to do magic. This is generally frowned upon by those who consider themselves pure, such as the Malfoy's or other antagonists.</p>
      </rh-accordion-panel>
      <rh-accordion-header>
        <h2>Is Hogwarts the only wizarding school?</h2>
      </rh-accordion-header>
      <rh-accordion-panel>
        <p>No! It has been revealed that there are actually 11 long established and prestigious schools around the globe. These include Castelobruxo in the rainforest of Brazil, Durmstrang Institute (whereas nobody is certain of it’s whereabouts), and Ilvermorny, right here in the United States.</p>
      </rh-accordion-panel>
      <rh-accordion-header>
        <h2>Where do the main characters work as adults?</h2>
      </rh-accordion-header>
      <rh-accordion-panel>
        <p>Harry and Hermione are at the Ministry: he ends up leading the Auror department. Ron helps George at the joke shop and does very well. Ginny becomes a professional Quidditch player and then sportswriter for the Daily Prophet.</p>
        <p><a href="https://www.pottermore.com/collection/characters" target="blank">Read more about the characters</a></p>
      </rh-accordion-panel>
    </rh-accordion>

    <h3>Base</h3>
    <rh-accordion color="base">
      <rh-accordion-header>
        <h2>Why do wizards need money if they could just create it?</h2>
      </rh-accordion-header>
      <rh-accordion-panel>
        <p>There is legislation that decides what you can conjure and what you can not. Because things that you conjure out of thin air will not last, it is illegal in the wizarding world.</p>
      </rh-accordion-panel>
      <rh-accordion-header>
        <h2>Why doesn't Harry have a portrait of his parents?</h2>
      </rh-accordion-header>
      <rh-accordion-panel>
        <p>The characters in the portraits are not actually ghosts. They mainly are there just to repeat common phrases or serve as a general representation of the individual they depict. A portrait of his parents would not be of much help to Harry.</p>
      </rh-accordion-panel>
      <rh-accordion-header>
        <h2>Why is Harry considered a half-blood if both of his parents could use magic?</h2>
      </rh-accordion-header>
      <rh-accordion-panel>
        <p>Because Harry's grandparents were not able to do magic. This is generally frowned upon by those who consider themselves pure, such as the Malfoy's or other antagonists.</p>
      </rh-accordion-panel>
      <rh-accordion-header>
        <h2>Is Hogwarts the only wizarding school?</h2>
      </rh-accordion-header>
      <rh-accordion-panel>
        <p>No! It has been revealed that there are actually 11 long established and prestigious schools around the globe. These include Castelobruxo in the rainforest of Brazil, Durmstrang Institute (whereas nobody is certain of it’s whereabouts), and Ilvermorny, right here in the United States.</p>
      </rh-accordion-panel>
      <rh-accordion-header>
        <h2>Where do the main characters work as adults?</h2>
      </rh-accordion-header>
      <rh-accordion-panel>
        <p>Harry and Hermione are at the Ministry: he ends up leading the Auror department. Ron helps George at the joke shop and does very well. Ginny becomes a professional Quidditch player and then sportswriter for the Daily Prophet.</p>
        <p><a href="https://www.pottermore.com/collection/characters" target="blank">Read more about the characters</a></p>
      </rh-accordion-panel>
    </rh-accordion>

    <h3>Dark</h3>
    <rh-accordion color="dark">
      <rh-accordion-header>
        <h2>Why do wizards need money if they could just create it?</h2>
      </rh-accordion-header>
      <rh-accordion-panel>
        <p>There is legislation that decides what you can conjure and what you can not. Because things that you conjure out of thin air will not last, it is illegal in the wizarding world.</p>
      </rh-accordion-panel>
      <rh-accordion-header>
        <h2>Why doesn't Harry have a portrait of his parents?</h2>
      </rh-accordion-header>
      <rh-accordion-panel>
        <p>The characters in the portraits are not actually ghosts. They mainly are there just to repeat common phrases or serve as a general representation of the individual they depict. A portrait of his parents would not be of much help to Harry.</p>
      </rh-accordion-panel>
      <rh-accordion-header>
        <h2>Why is Harry considered a half-blood if both of his parents could use magic?</h2>
      </rh-accordion-header>
      <rh-accordion-panel>
        <p>Because Harry's grandparents were not able to do magic. This is generally frowned upon by those who consider themselves pure, such as the Malfoy's or other antagonists.</p>
      </rh-accordion-panel>
      <rh-accordion-header>
        <h2>Is Hogwarts the only wizarding school?</h2>
      </rh-accordion-header>
      <rh-accordion-panel>
        <p>No! It has been revealed that there are actually 11 long established and prestigious schools around the globe. These include Castelobruxo in the rainforest of Brazil, Durmstrang Institute (whereas nobody is certain of it’s whereabouts), and Ilvermorny, right here in the United States.</p>
      </rh-accordion-panel>
      <rh-accordion-header>
        <h2>Where do the main characters work as adults?</h2>
      </rh-accordion-header>
      <rh-accordion-panel>
        <p>Harry and Hermione are at the Ministry: he ends up leading the Auror department. Ron helps George at the joke shop and does very well. Ginny becomes a professional Quidditch player and then sportswriter for the Daily Prophet.</p>
        <p><a href="https://www.pottermore.com/collection/characters" target="blank">Read more about the characters</a></p>
      </rh-accordion-panel>
    </rh-accordion>

    <h3>Darkest</h3>
    <rh-accordion color="darkest">
      <rh-accordion-header>
        <h2>Why do wizards need money if they could just create it?</h2>
      </rh-accordion-header>
      <rh-accordion-panel>
        <p>There is legislation that decides what you can conjure and what you can not. Because things that you conjure out of thin air will not last, it is illegal in the wizarding world.</p>
      </rh-accordion-panel>
      <rh-accordion-header>
        <h2>Why doesn't Harry have a portrait of his parents?</h2>
      </rh-accordion-header>
      <rh-accordion-panel>
        <p>The characters in the portraits are not actually ghosts. They mainly are there just to repeat common phrases or serve as a general representation of the individual they depict. A portrait of his parents would not be of much help to Harry.</p>
      </rh-accordion-panel>
      <rh-accordion-header>
        <h2>Why is Harry considered a half-blood if both of his parents could use magic?</h2>
      </rh-accordion-header>
      <rh-accordion-panel>
        <p>Because Harry's grandparents were not able to do magic. This is generally frowned upon by those who consider themselves pure, such as the Malfoy's or other antagonists.</p>
      </rh-accordion-panel>
      <rh-accordion-header>
        <h2>Is Hogwarts the only wizarding school?</h2>
      </rh-accordion-header>
      <rh-accordion-panel>
        <p>No! It has been revealed that there are actually 11 long established and prestigious schools around the globe. These include Castelobruxo in the rainforest of Brazil, Durmstrang Institute (whereas nobody is certain of it’s whereabouts), and Ilvermorny, right here in the United States.</p>
      </rh-accordion-panel>
      <rh-accordion-header>
        <h2>Where do the main characters work as adults?</h2>
      </rh-accordion-header>
      <rh-accordion-panel>
        <p>Harry and Hermione are at the Ministry: he ends up leading the Auror department. Ron helps George at the joke shop and does very well. Ginny becomes a professional Quidditch player and then sportswriter for the Daily Prophet.</p>
        <p><a href="https://www.pottermore.com/collection/characters" target="blank">Read more about the characters</a></p>
      </rh-accordion-panel>
    </rh-accordion>

    <h3>Complement</h3>
    <rh-accordion color="complement">
      <rh-accordion-header>
        <h2>Why do wizards need money if they could just create it?</h2>
      </rh-accordion-header>
      <rh-accordion-panel>
        <p>There is legislation that decides what you can conjure and what you can not. Because things that you conjure out of thin air will not last, it is illegal in the wizarding world.</p>
      </rh-accordion-panel>
      <rh-accordion-header>
        <h2>Why doesn't Harry have a portrait of his parents?</h2>
      </rh-accordion-header>
      <rh-accordion-panel>
        <p>The characters in the portraits are not actually ghosts. They mainly are there just to repeat common phrases or serve as a general representation of the individual they depict. A portrait of his parents would not be of much help to Harry.</p>
      </rh-accordion-panel>
      <rh-accordion-header>
        <h2>Why is Harry considered a half-blood if both of his parents could use magic?</h2>
      </rh-accordion-header>
      <rh-accordion-panel>
        <p>Because Harry's grandparents were not able to do magic. This is generally frowned upon by those who consider themselves pure, such as the Malfoy's or other antagonists.</p>
      </rh-accordion-panel>
      <rh-accordion-header>
        <h2>Is Hogwarts the only wizarding school?</h2>
      </rh-accordion-header>
      <rh-accordion-panel>
        <p>No! It has been revealed that there are actually 11 long established and prestigious schools around the globe. These include Castelobruxo in the rainforest of Brazil, Durmstrang Institute (whereas nobody is certain of it’s whereabouts), and Ilvermorny, right here in the United States.</p>
      </rh-accordion-panel>
      <rh-accordion-header>
        <h2>Where do the main characters work as adults?</h2>
      </rh-accordion-header>
      <rh-accordion-panel>
        <p>Harry and Hermione are at the Ministry: he ends up leading the Auror department. Ron helps George at the joke shop and does very well. Ginny becomes a professional Quidditch player and then sportswriter for the Daily Prophet.</p>
        <p><a href="https://www.pottermore.com/collection/characters" target="blank">Read more about the characters</a></p>
      </rh-accordion-panel>
    </rh-accordion>

    <h3>Accent</h3>
    <rh-accordion color="accent">
      <rh-accordion-header>
        <h2>Why do wizards need money if they could just create it?</h2>
      </rh-accordion-header>
      <rh-accordion-panel>
        <p>There is legislation that decides what you can conjure and what you can not. Because things that you conjure out of thin air will not last, it is illegal in the wizarding world.</p>
      </rh-accordion-panel>
      <rh-accordion-header>
        <h2>Why doesn't Harry have a portrait of his parents?</h2>
      </rh-accordion-header>
      <rh-accordion-panel>
        <p>The characters in the portraits are not actually ghosts. They mainly are there just to repeat common phrases or serve as a general representation of the individual they depict. A portrait of his parents would not be of much help to Harry.</p>
      </rh-accordion-panel>
      <rh-accordion-header>
        <h2>Why is Harry considered a half-blood if both of his parents could use magic?</h2>
      </rh-accordion-header>
      <rh-accordion-panel>
        <p>Because Harry's grandparents were not able to do magic. This is generally frowned upon by those who consider themselves pure, such as the Malfoy's or other antagonists.</p>
      </rh-accordion-panel>
      <rh-accordion-header>
        <h2>Is Hogwarts the only wizarding school?</h2>
      </rh-accordion-header>
      <rh-accordion-panel>
        <p>No! It has been revealed that there are actually 11 long established and prestigious schools around the globe. These include Castelobruxo in the rainforest of Brazil, Durmstrang Institute (whereas nobody is certain of it’s whereabouts), and Ilvermorny, right here in the United States.</p>
      </rh-accordion-panel>
      <rh-accordion-header>
        <h2>Where do the main characters work as adults?</h2>
      </rh-accordion-header>
      <rh-accordion-panel>
        <p>Harry and Hermione are at the Ministry: he ends up leading the Auror department. Ron helps George at the joke shop and does very well. Ginny becomes a professional Quidditch player and then sportswriter for the Daily Prophet.</p>
        <p><a href="https://www.pottermore.com/collection/characters" target="blank">Read more about the characters</a></p>
      </rh-accordion-panel>
    </rh-accordion>
  </section>
  `;
});
