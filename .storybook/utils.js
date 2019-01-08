// This is a collection of functions to reuse within PFElements stories.

// Automatic content generation
// https://www.npmjs.com/package/lorem-ipsum
const loremIpsum = require("lorem-ipsum");
const cleaner = require("clean-html");

// Escape HTML to display markup as content
export function escapeHTML(html) {
  const div = document.createElement("div");
  const text = document.createTextNode(html);
  div.appendChild(text);
  return div.innerHTML;
}

// Convert a string to sentence case
String.prototype.sentenceCase = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

// Print attributes based on an object
const listProperties = obj =>
  Object.entries(obj)
    .map(set => {
      let p = set[0];
      let v = set[1];
      let print = set[2] || true;
      return print && v && v !== "null" ? ` ${p}="${v}"` : "";
    })
    .join("");

// Create a tag based on a provided object
export function customTag(obj) {
  return `<${obj.tag ? obj.tag : "div"} ${
    obj.slot ? `slot="${obj.slot}"` : ""
  }${listProperties(obj.attributes || {})}>${obj.content || autoContent()}</${
    obj.tag ? obj.tag : "div"
  }>`;
}

// If a slot is a component or content, render that raw
// if it's got a tag defined, run the custom tag function
const renderSlots = (slots = []) =>
  slots.map(slot => (slot.content ? slot.content : "")).join("");

// Creates a component dynamically based on inputs
export function component(tag, attributes = {}, slots = []) {
  return `<${tag}${listProperties(attributes)}>${
    slots.length > 0 ? renderSlots(slots) : autoContent()
  }</${tag}>`;
}

// Create an automatic heading
export function autoHeading(short = false) {
  let length = short ? Math.random() + 2 : Math.random() * 10 + 5;
  return loremIpsum({ count: length, units: "words" }).sentenceCase();
}

// Create a set of automatic content
export function autoContent(max = 5, min = 1, short = false) {
  return loremIpsum({
    count: Math.floor(Math.random() * max + min),
    sentenceUpperBound: short ? 5 : 15,
    paragraphUpperBound: short ? 2 : 7,
    units: "paragraphs",
    format: "html"
  });
}

// Return Storybook knobs based on an object containing property definitions for the component
export function autoPropKnobs(properties, bridge) {
  var binding = {};
  Object.entries(properties).forEach(prop => {
    let attr = prop[0];
    let title = prop[1].title || attr;
    let defaultValue = prop[1].default || "";
    let type = prop[1].type || "string";
    let options = prop[1].enum || [];
    let hidden = prop[1].hidden || false;

    // Set the default method to text
    let method = "text";
    if (["boolean", "number", "object", "array", "date"].includes(type)) {
      method = type.toLowerCase();
    }

    // If the property is not hidden from the user
    if (!hidden) {
      // If an array of options exists, create a select list
      if (options.length > 0) {
        let opts = {};
        // Convert the array into an object
        options.map(item => (opts[item] = item));

        // If a default is not defined, add a null option
        if (defaultValue === "" || defaultValue === null) {
          opts.null = "none";
          defaultValue = null;
        }

        // Create the knob
        binding[attr] = bridge.select(title, opts, defaultValue, "Attributes");
      } else {
        // Create the knob
        binding[attr] = bridge[method](title, defaultValue, "Attributes");
      }
    }
  });
  return binding;
}

// Create knobs to render input fields for the slots
export function autoContentKnobs(slots, bridge) {
  let binding = {};

  Object.entries(slots).forEach(slot => {
    binding[slot[0]] = bridge.text(slot[1].title, slot[1].default, "Content");
  });

  return binding;
}

export function preview(markup) {
  // Prettify and clean the markup for rendering
  cleaner.clean(
    markup,
    {
      indent: "    ",
      "remove-attributes": [],
      wrap: 0
    },
    html => (markup = html)
  );

  // Return the rendered markup and the code snippet output
  return `${markup}
  <pre style="white-space: pre-wrap; padding: 20px 50px; background-color: #f0f0f0; font-weight: bold; border: 1px solid #bccc;">
    ${escapeHTML(markup)}
  </pre>`;
}
