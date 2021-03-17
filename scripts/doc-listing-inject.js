#!/usr/bin/env node

process.env.FORCE_COLOR = 3;

const glob = require("glob");
const fs = require("fs");
const path = require("path");
const leasot = require("leasot");
const template = require("lodash.template");
const tools = require("./tools.js");

const elementsDir = path.join(__dirname, "../elements");
const index = path.join(__dirname, "../examples/index.html");
const wrapper = path.join(__dirname, "../examples/wrapper.html");

// Reduce list to only those with demo pages
let elementNames = tools.getElementNames(folder => fs.existsSync(`${elementsDir}/${folder}/demo/index.html`));

let items = [];
let polyfills = [];

// -> todos contains the array of todos/fixme/polyfills, parsed
glob(`${elementsDir}/*/src/*.js`, (er, files) => {
  files.forEach(file => {
    let all = [];
    all = all.concat(
      leasot.parse(fs.readFileSync(file, "utf8"), {
        extension: ".js",
        customTags: ["POLYFILL"],
        filename: file
      })
    );
    all.forEach(entry => {
      if (entry.tag === "TODO") items.push(entry);
      else polyfills.push(entry);
    });
  });

  let regex = new RegExp(/\[(.*?)\]\((.*?)\)/g);

  // -> markdown output of the todos
  const cleanPaths = markdown =>
    markdown.replace(
      regex,
      (full, label, link) =>
        "[" +
        path
          .basename(label, ".js")
          .split("--")
          .slice(-1)
          .pop() +
        "](" +
        path.relative(__dirname, link) +
        ")"
    );

  const removeHeadings = markdown => markdown.replace(/^\#+.+/g, "");

  const tidyMarkdown = markdown => {
    markdown = cleanPaths(markdown);
    markdown = removeHeadings(markdown);
    return markdown;
  };

  let output = tidyMarkdown(leasot.report(items, "markdown"));
  let outputPolyfills = tidyMarkdown(leasot.report(polyfills, "markdown"));

  let markup = "";
  let cardTemplate = (element, title, description, image) => {
    let label = title
      ? title
      : element
          .split("-")
          .splice(1)
          .join(" ");
    return `
    <pfe-card color="lightest" style="padding: 0" id="${element}">
      <pfe-card border color="${
        image ? "lightest" : "lighter"
      }" size="small" style="min-height: 240px; justify-content: center;">
        <a class="img-link" href="../elements/${element}/demo">
          <img ${
            image
              ? `src="/elements/${element}/${image}" style="max-height: 200px"`
              : `src="/brand/rh-icon-website.svg" style="max-width: 100px"`
          } alt="">
        </a>
      </pfe-card>
      <h2><a href="../elements/${element}/demo">${label.charAt(0).toUpperCase()}${label.slice(1)}</a></h2>${
      description
        ? `
      <p>${description}</p>`
        : ""
    }
      <!--pfe-cta><a
            href="../storybook?path=/story/${label.toLowerCase()}--${element}">Storybook</a></pfe-cta-->
    </pfe-card>
  `;
  };

  elementNames.forEach(element => {
    const title = require(`${elementsDir}/${element}/package.json`).pfelement.title;
    const description = require(`${elementsDir}/${element}/package.json`).description;
    const image = require(`${elementsDir}/${element}/package.json`).pfelement.preview;
    markup += `\n\t\t\t\t${cardTemplate(element, title, description, image)}`;
  });

  markup += "\n\t\t\t";

  // Read and interpolate template
  const tmpl = fs.readFileSync(wrapper, "utf8");
  const compiledTpl = template(tmpl);
  const newContents = compiledTpl({
    components: markup,
    todo: items.length > 0 ? output : "",
    polyfill: polyfills.length > 0 ? outputPolyfills : ""
  });

  // // Read in the wrapper template
  fs.readFile(wrapper, (err, data) => {
    if (err) throw err;
    //   // Output the updated index file
    fs.writeFile(index, newContents, function(err) {
      if (err) throw err;
    });
  });
});
