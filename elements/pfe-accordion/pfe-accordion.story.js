import { storiesOf } from "@storybook/polymer";
import { withKnobs, text, select } from "@storybook/addon-knobs/polymer";
import { escapeHTML } from "../../.storybook/utils.js";
import "./pfe-accordion";

const stories = storiesOf("Accordion", module);
stories.addDecorator(withKnobs);

stories.add("pfe-accordion", () => {
  const color = select("Header color", {
    lightest: "Lightest",
    striped: "Striped",
    base: "Base",
    dark: "Dark",
    darkest: "Darkest",
    accent: "Accent",
    complement: "Complement"
  });

  return `
  <pfe-accordion${color ? ` color="${color}"` : ""}>
    <pfe-accordion-header>
      <h2>Why do wizards need money if they could just create it?</h2>
    </pfe-accordion-header>
    <pfe-accordion-panel>
      <p>There is legislation that decides what you can conjure and what you can not. Because things that you conjure out of thin air will not last, it is illegal in the wizarding world.</p>
    </pfe-accordion-panel>
    <pfe-accordion-header>
      <h2>Why doesn't Harry have a portrait of his parents?</h2>
    </pfe-accordion-header>
    <pfe-accordion-panel>
      <p>The characters in the portraits are not actually ghosts. They mainly are there just to repeat common phrases or serve as a general representation of the individual they depict. A portrait of his parents would not be of much help to Harry.</p>
    </pfe-accordion-panel>
    <pfe-accordion-header>
      <h2>Why is Harry considered a half-blood if both of his parents could use magic?</h2>
    </pfe-accordion-header>
    <pfe-accordion-panel>
      <p>Because Harry's grandparents were not able to do magic. This is generally frowned upon by those who consider themselves pure, such as the Malfoy's or other antagonists.</p>
    </pfe-accordion-panel>
    <pfe-accordion-header>
      <h2>Is Hogwarts the only wizarding school?</h2>
    </pfe-accordion-header>
    <pfe-accordion-panel>
      <p>No! It has been revealed that there are actually 11 long established and prestigious schools around the globe. These include Castelobruxo in the rainforest of Brazil, Durmstrang Institute (whereas nobody is certain of it’s whereabouts), and Ilvermorny, right here in the United States.</p>
    </pfe-accordion-panel>
    <pfe-accordion-header>
      <h2>Where do the main characters work as adults?</h2>
    </pfe-accordion-header>
    <pfe-accordion-panel>
      <p>Harry and Hermione are at the Ministry: he ends up leading the Auror department. Ron helps George at the joke shop and does very well. Ginny becomes a professional Quidditch player and then sportswriter for the Daily Prophet.</p>
      <p><a href="https://www.pottermore.com/collection/characters" target="blank">Read more about the characters</a></p>
    </pfe-accordion-panel>
  </pfe-accordion>
  `;
});
