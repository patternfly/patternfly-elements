// This is a collection of functions to reuse within PFElements stories.
const loremIpsum = require("lorem-ipsum");

export function escapeHTML(html) {
  const div = document.createElement("div");
  const text = document.createTextNode(html);
  div.appendChild(text);
  return div.innerHTML;
}

String.prototype.sentenceCase = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

const listProperties = obj =>
  Object.entries(obj)
    .map(set => (set[1] ? ` ${set[0]}="${set[1]}"` : ""))
    .join("");

export function customTag(data) {
  return `<${data.tag ? data.tag : "div"} slot="${data.slot}"${listProperties(
    data.attributes || {}
  )}>${data.content || autoContent()}</${data.tag ? data.tag : "div"}>`;
}

// If a slot is a component or content, render that raw, if it's got a tag defined, run the custom tag function
const renderSlots = (slots = []) =>
  slots.map(slot => (slot.content ? slot.content : "")).join("");

// Creates a component dynamically based on inputs
export function component(tag, attributes = {}, slots = []) {
  return `<${tag}${listProperties(attributes)}>${
    slots.length > 0 ? renderSlots(slots) : autoContent()
  }</${tag}>`;
}

export function autoHeading(short = false) {
  let length = short ? Math.random() * 2 + 2 : Math.random() * 4 + 2;
  return loremIpsum({ count: length, units: "words" }).sentenceCase();
}

export function autoContent(max = 5, min = 1, short = false) {
  return loremIpsum({
    count: Math.floor(Math.random() * max + min),
    sentenceUpperBound: short ? 5 : 15,
    paragraphUpperBound: short ? 2 : 7,
    units: "paragraphs",
    format: "html"
  });
}

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

        // Create the knob
        binding[attr] = bridge.select(title, opts, defaultValue);
      } else {
        // Create the knob
        binding[attr] = bridge[method](title, defaultValue);
      }
    }
  });
  return binding;
}

export function autoContentKnobs(slots, bridge) {
  let binding = {};

  Object.entries(slots).forEach(slot => {
    binding[slot[0]] = bridge.text(slot[1].title, slot[1].default);
    console.dir(slot);
  });

  return binding;
}
