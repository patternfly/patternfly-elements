// This is a collection of functions to reuse within PFElements stories.

export function escapeHTML(html) {
  const div = document.createElement("div");
  const text = document.createTextNode(html);
  div.appendChild(text);
  return div.innerHTML;
}

export function dynamicKnobs(properties, bridge) {
  var binding = {};
  let attributes = "";

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
        options.forEach((item, idx) => {
          opts[item] = item;
        });
        // Create the knob
        binding[attr] = bridge["select"](title, opts, defaultValue);
      } else {
        // Create the knob
        binding[attr] = bridge[method](title, defaultValue);
      }
    }
    console.log(attr);
    console.log(binding);
  });

  return binding;
}
