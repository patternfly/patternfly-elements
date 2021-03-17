const fs = require("fs");
const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");
const shell = require("shelljs");

const spandx = require("spandx");
const spandxConfig = require("../spandx.config");

// Set the server not to open for testing
// Object.assign(spandxConfig, {
//   open: true,
//   silent: true
// });

spandx.init(spandxConfig).then(async (instance) => {
  path = instance.getOption("urls").get("local");
  const url = new URL(path);

  const build = await shell.exec(`npm run build pfe-accordion`);

  const chrome = await chromeLauncher.launch({
    chromeFlags: ["--headless"]
  });

  const options = {
    logLevel: "info",
    output: "html",
    onlyCategories: ["performance"],
    port: chrome.port
  };

  const runnerResult = await lighthouse(`http://${url.hostname}:${url.port}/elements/pfe-accordion/demo`, options);

  // `.report` is the HTML report as a string
  const reportHtml = runnerResult.report;
  fs.writeFileSync("lhreport.html", reportHtml);

  // `.lhr` is the Lighthouse Result as a JS object
  console.log("Report is done for", runnerResult.lhr.finalUrl);
  console.log("Performance score was", runnerResult.lhr.categories.performance.score * 100);

  await chrome.kill();
});
