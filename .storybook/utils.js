// This is a collection of functions to reuse within PFElements stories.

// Automatic content generation
// https://www.npmjs.com/package/lorem-ipsum
const loremIpsum = require("lorem-ipsum");
// HTML cleaner
// https://www.npmjs.com/package/clean-html
const cleaner = require("clean-html");

// Most common self-closing tags = br, hr, img, input, link
const selfClosing = ["br", "hr", "img", "input", "link"];

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
export const listProperties = obj =>
  Object.entries(obj)
    .map(set => {
      let string = " ";
      let p = set[0];
      let v = set[1];
      let print = set[2];

      // exit if the value is a boolean and is false
      if (typeof v === "boolean" && !v) {
        return;
      }

      // If no print value is provided, default to true
      if (typeof print === "undefined") {
        print = true;
      }

      // If printing is allowed, the value exists and is not null
      if (print && typeof v !== "undefined" && v !== null && v !== "null") {
        string += p;
        // If the value is a string and the value is not equal to the string "true"
        if (typeof v === "string" && v !== "true") {
          string += "=";
          if (typeof v === "string") {
            // If it's a string, use quotation marks around it
            string += `"${v}"`;
          } else {
            // Use, use it raw
            string += v;
          }
        }
      }
      return string;
    })
    .join(" ");

// Create a tag based on a provided object
// Accepts an object that can contain (all optional):
// -- tag: html tag such as h1 or p, default is div
// -- slot: rendered as slot="<input>"
// -- attributes: passed through the listProperties function
// -- content: Accepts html or plain text or renders default content
export function customTag(obj) {
  let start = "";
  let end = "";

  // If a tag is defined, or it has slots or attributes to apply
  // render an open and close tag
  if (obj.tag || obj.slot || obj.attributes) {
    // If a tag is defined, use that, else use a div
    if (obj.tag) {
      start += `<${obj.tag}`;
      end += !selfClosing.includes(obj.tag) ? `</${obj.tag}>` : "";
    } else {
      start += "<div";
      end += "</div>";
    }
    start += obj.slot ? ` slot="${obj.slot}"` : "";
    start += obj.attributes ? listProperties(obj.attributes || {}) : "";
    start += !selfClosing.includes(obj.tag) ? ">" : "/>";
  }
  return `${start}${
    typeof obj.content !== "undefined" ? obj.content || autoContent() : ""
  }${end}`;
}

const parseMarkup = string => {
  // Define the regex for use below
  let find = /<(\w+[-\w]*)(.*?)>/;
  let quotes = /['\"]+/g;
  // Initialize the empty return object
  let obj = {};
  // Initialize the attributes object
  obj.attributes = {};
  // Capture the tag name and properties
  let result = string.match(find);
  // If results remain in the array, get the tag
  if (result !== null && result.length > 0 && typeof result[1] === "string") {
    obj.tag = result[1];
    // If results remain in the array, get the attributes
    if (result.length > 1 && typeof result[2] === "string") {
      // Break the attributes apart using the spaces
      let attr = result[2].trim().match(/[\w|-]+="[^"]+"/g);
      // If any attributes exist, break them down further
      if (attr !== null) {
        attr.forEach(set => {
          // Break the attributes apart using the equal sign
          let items = set.trim().split("=");
          // If items are returned and they are both strings, add them to the attributes object
          if (
            items.length > 1 &&
            typeof items[0] === "string" &&
            typeof items[1] === "string"
          ) {
            obj.attributes[items[0].trim()] = items[1]
              .replace(quotes, "")
              .trim();
          }
        });
      }
    }
    // Strip the original string of the wrapper element
    obj.content = string.replace(new RegExp(`<\/?${obj.tag}.*?>`, "g"), "");
  } else {
    obj.tag = "div";
    obj.content = string;
  }
  // Return the new object with the metadata
  return obj;
};

// If a slot is a component or content, render that raw
// if it's got a tag defined, run the custom tag function
const renderSlots = (slots = []) =>
  slots
    .map(slot => {
      // If there are slot or attribute values but no tag defined
      // Grep the content to see if we can use the first tag passed in
      let has_tag = typeof slot.tag !== "undefined";
      let has_slot = typeof slot.slot !== "undefined" && slot.slot.length > 0;
      let has_attr =
        typeof slot.attributes !== "undefined" &&
        Object.keys(slot.attributes).length > 0;
      if (!has_tag && (has_slot || has_attr)) {
        let parsed = parseMarkup(slot.content);
        Object.assign(slot, parsed);
      }
      return slot.content || (slot.tag && selfClosing.includes(slot.tag))
        ? customTag({
            tag: slot.tag,
            slot: slot.slot,
            attributes: slot.attributes,
            content: slot.content
          })
        : "";
    })
    .join("");

// Creates a component dynamically based on inputs
export function component(tag, attributes = {}, slots = [], noSlot = false) {
  return `<${tag}${listProperties(attributes)}>${
    slots.length > 0 ? renderSlots(slots) : !noSlot ? autoContent() : ""
  }</${tag}>`;
}

// Create an automatic heading
export function autoHeading(short = false) {
  let length = short ? Math.random() + 1 : Math.random() * 10 + 5;
  return loremIpsum({
    count: length,
    units: "words"
  }).sentenceCase();
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
    let type = prop[1].type || "string";
    let defaultValue = prop[1].default;
    let options = prop[1].enum || [];
    let hidden = prop[1].hidden;
    let required = prop[1].required;
    let prefixed = prop[1].prefixed;

    // Convert the type to lowercase values
    type = type.toLowerCase();

    // Initialize booleans to false if undefined
    if (typeof hidden === "undefined") {
      hidden = false;
    }

    if (typeof required === "undefined") {
      required = false;
    }

    if (typeof prefixed === "undefined") {
      prefixed = false;
    }

    if (prefixed) {
      attr = `pfe-${attr}`;
    }

    // Set the default method to text
    let method = "text";
    if (["boolean", "number", "object", "array", "date"].includes(type)) {
      method = type;
    }

    // If the property is not hidden from the user
    if (!hidden) {
      // If an array of options exists, create a select list
      if (options.length > 0) {
        let opts = {};

        // If this is not a required field, add a null option
        if (!required) {
          opts["-- Not selected --"] = null;
        }

        // Convert the array into an object
        options.map(item => (opts[item.sentenceCase()] = item));

        // If the default value is not defined, use the new null option as the default
        if (defaultValue === "" || defaultValue === null) {
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

export function demo(markup) {
  // Return the rendered markup and the code snippet output
  return `${markup}`;
}

// prettier-ignore-start
export function code(markup) {
  // Prettify and clean the markup for rendering
  cleaner.clean(
    markup,
    {
      indent: "    ",
      "remove-attributes": [],
      "break-around-tags": [
        "body",
        "blockquote",
        "br",
        "div",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "head",
        "hr",
        "link",
        "meta",
        "p",
        "table",
        "title",
        "td",
        "tr",
        "a",
        "section",
        "article",
        "footer",
        "aside"
      ],
      wrap: 0
    },
    html => (markup = html)
  );

  // Return the rendered markup and the code snippet output
  return `<pre style="white-space: pre-wrap; padding: 20px 50px; background-color: #f0f0f0; font-weight: bold; border: 1px solid #bccc;">${escapeHTML(
    markup.replace(/\=\"\"/g, "")
  )}</pre>`;
}
// prettier-ignore-end

export function preview(markup) {
  return demo(markup) + code(markup);
}
