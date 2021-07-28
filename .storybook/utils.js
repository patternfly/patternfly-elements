// This is a collection of functions to reuse within PFElements stories.
// import { Color } from "./color.js";
import * as bridge from "@storybook/addon-knobs";

// Automatic content generation
// https://www.npmjs.com/package/lorem-ipsum
import { loremIpsum } from "lorem-ipsum";

// This is a collection of functions to reuse within PFElements stories.
const _ = require("lodash");

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

export function htmlDecode(input){
  var e = document.createElement('textarea');
  e.innerHTML = input;
  // handle case of empty input
  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
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
      if (_.isBoolean(v) && !v) return;

      // If no print value is provided, default to true
      if (_.isUndefined(print)) print = true;

      // If printing is allowed, the value exists and is not null
      if (print && !(_.isUndefined(v) || _.isNull(v) || v === "null")) {
        string += p;
        // If the value is a string and the value is not equal to the string "true"
        if ((_.isString(v) && v !== "true") || _.isNumber(v)) {
          string += "=";
          if (_.isString(v) || _.isNumber(v)) {
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
  return `${start}${!obj.empty ? obj.content || autoContent() : ""}${end}`;
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
  if (!_.isNull(result) && result.length > 0 && _.isString(result[1])) {
    obj.tag = result[1];
    // If results remain in the array, get the attributes
    if (result.length > 1 && _.isString(result[2])) {
      // Break the attributes apart using the spaces
      let attr = result[2].trim().match(/[\w|-]+="[^"]+"/g);
      // If any attributes exist, break them down further
      if (attr !== null) {
        _.each(attr, set => {
          // Break the attributes apart using the equal sign
          let items = set.trim().split("=");
          // If items are returned and they are both strings, add them to the attributes object
          if (items.length > 1 && _.isString(items[0]) && _.isString(items[1])) {
            obj.attributes[items[0].trim()] = items[1].replace(quotes, "").trim();
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
      let has_tag = !_.isUndefined(slot.tag);
      let has_slot = !_.isUndefined(slot.slot) && slot.slot.length > 0;
      let has_attr = !_.isUndefined(slot.attributes) && Object.keys(slot.attributes).length > 0;
      if (!has_tag && (has_slot || has_attr)) {
        let parsed = parseMarkup(slot.content);
        Object.assign(slot, parsed);
      }
      return htmlDecode(slot.content) || (slot.tag && selfClosing.includes(slot.tag))
        ? customTag({
            tag: slot.tag,
            slot: slot.slot,
            attributes: slot.attributes,
            content: htmlDecode(slot.content)
          })
        : "";
    })
    .join("");

// Creates a component dynamically based on inputs
export const component = (tag, attributes = {}, slots = [], noSlot = false) =>
  `<${tag}${listProperties(attributes)}>${
    slots.length > 0 ? renderSlots(slots) : !noSlot ? autoContent() : ""
  }</${tag}>`;

// Create an automatic heading
export const autoHeading = (short = false) =>
  _.upperFirst(
    loremIpsum({
      count: Number.parseInt(short ? Math.random() + 3 : Math.random() * 10 + 5),
      units: "words"
    })
  );

// Create a set of automatic content
export const autoContent = (max = 5, min = 1, short = false) =>
  loremIpsum({
    count: Math.floor(Math.random() * max + min),
    sentenceUpperBound: short ? 5 : 10,
    paragraphLowerBound: 1,
    paragraphUpperBound: short ? 2 : 5,
    units: "paragraphs",
    format: "html"
  });

// Return Storybook knobs based on an object containing property definitions for the component
export const autoPropKnobs = (pfeClass, overrides, sectionId) => {
  let properties = pfeClass._getCache("properties") || pfeClass.schemaProperties;
  // Merge in overrides
  if (overrides) _.merge(properties, overrides);

  var binding = {};

  Object.entries(properties).forEach(prop => {
    // Don't print alias' in storybook
    if (prop[1] && prop[1].alias) return;

    // Don't print global-scope attributes
    if (["pfelement", "on", "_style", "type"].includes(prop[0])) return;

    // Don't print context (handled in the `context` method)
    if (["context"].includes(prop[0])) return;

    let attr = prop[1].attr || pfeClass._getCache("prop2attr")[prop[0]] || prop[0];
    let title = prop[1].title || attr;
    let type = "string";
    let defaultValue = prop[1].default;
    let options = prop[1].values || prop[1].enum || [];
    let hidden = prop[1].hidden;
    let required = prop[1].required;

    if (prop[1] && prop[1].type) {
      switch (prop[1].type) {
        case Number:
          type = "number";
          break;
        case Boolean:
          type = "boolean";
          break;
        default:
          type = "string";
      }
    }

    // Initialize booleans to false if undefined
    _.each([hidden, required], item => {
      if (_.isUndefined(item)) {
        item = false;
      }
    });

    // Set the default method to text
    let method = ["boolean", "number", "object", "array", "date"].includes(type) ? type : "text";

    // If the property is not hidden from the user
    if (!hidden) {
      if (type === "boolean" || (type === "string" && options.length > 0 && _.isEqual(options, ["true", "false"]))) {
        binding[attr] = bridge.boolean(_.upperFirst(title), defaultValue || false, sectionId || null);
      }

      // If an array of options exists, create a select list
      else if (options.length > 0) {
        let opts = {};

        // If this is not a required field, add a null option
        if (!required) {
          opts["-- Not selected --"] = null;
        }

        // Convert the array into an object
        _.each(options, item => (opts[item] = item.trim()));

        // Create the knob
        binding[attr] = bridge.select(_.upperFirst(title), opts, defaultValue || undefined, sectionId);
      } else {
        // Create the knob
        binding[attr] = bridge[method](_.upperFirst(title), defaultValue || undefined, sectionId);
      }
    }
  });

  return binding;
};

export function context() {
  let contexts = [
    {
      label: "lightest",
      context: "light",
      color: "#fff"
    },
    {
      label: "lighter",
      context: "light",
      color: "#f0f0f0"
    },
    {
      label: "base",
      context: "light",
      color: "#f0f0f0"
    },
    {
      label: "darker",
      context: "dark",
      color: "#3c3f42"
    },
    {
      label: "darkest",
      context: "dark",
      color: "#151515"
    },
    {
      label: "accent",
      context: "saturated",
      color: "#004080"
    },
    {
      label: "complement",
      context: "saturated",
      color: "#002952"
    },
    {
      label: "custom",
      color: null
    }
  ];

  let context = bridge.select("Context", contexts, "lightest");
  let customColor = null;
  let customAttr = null;

  if (context.label === "custom") {
    customColor = bridge.color("Custom background color", "#fff");
    customAttr = bridge.select("Custom context", ["light", "dark", "saturated"], "light");

    // @TODO dynamic context applied
    // let customColor = new Color(userColor);
    // let text = new Color("rgba(0,0,0,1)");
    // console.log(customColor.accessible(text));
  }

  document.querySelector("body").style.backgroundColor = customColor || context.color || "#fff";
  document.querySelector("body").style.setProperty("--context", context.context || customAttr || "light");
}

// Create knobs to render input fields for the slots
export const autoContentKnobs = slots => {
  let binding = {};

  Object.entries(slots).forEach(slot => {
    binding[slot[0]] = bridge.text(slot[1].title, slot[1].default, "Content");
  });

  return binding;
};

// Return the rendered markup and the code snippet output
export const demo = markup => `${markup}`;

// prettier-ignore-start
export const code = markup => {
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
        "button",
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
        "ul",
        "li",
        "table",
        "title",
        "td",
        "tr",
        // "a",
        "input",
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
  return `
    <script type="module" src="../../pfe-codeblock/dist/pfe-codeblock"></script>
    <pfe-codeblock code-language="markup" code-line-numbers>
      <pre codeblock-container><code>${escapeHTML(markup.replace(/\=\"\"/g, ""))}</code></pre>
    </pfe-codeblock>
  `;
};
// prettier-ignore-end

export const preview = markup => demo(markup) + code(markup);
