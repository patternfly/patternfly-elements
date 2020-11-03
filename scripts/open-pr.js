const branch = require("git-branch");
const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");
const open = require("opn");

// Capture the current branch

// Capture the available PR templates
const get_templates = loc =>
  fs
    .readdirSync(loc)
    .filter(file => file.slice(0, 1) !== ".")
    .map(file => path.basename(file, ".md").replace("_", " "));

const pr_templates = get_templates(".github/PULL_REQUEST_TEMPLATE");

inquirer
  .prompt([
    {
      type: "list",
      name: "template",
      message: "Choose your template:",
      choices: pr_templates,
      filter: response => response.replace(" ", "_") + ".md"
    },
    {
      type: "confirm",
      name: "advanced_questions",
      message: "Additional information?"
    },
    {
      type: "input",
      name: "base_branch",
      message: "Base branch:",
      default: "master",
      when: answers => answers.advanced_questions
    },
    {
      type: "input",
      name: "pr_branch",
      message: "PR branch:",
      default: branch.sync(),
      when: answers => answers.advanced_questions
    }
  ])
  .then(answers =>
    open(
      `https://github.com/patternfly/patternfly-elements/compare/${answers.base_branch ||
        "master"}...${answers.pr_branch || branch.sync()}?template=${answers.template}`
    )
  );
