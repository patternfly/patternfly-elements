/* eslint-env node */
import branch from 'git-branch';
import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import open from 'open';

// Capture the available PR templates
const getTemplates = loc =>
  fs
    .readdirSync(loc)
    .filter(file => file.slice(0, 1) !== '.')
    .map(file => path.basename(file, '.md').replace('_', ' '));

const prTemplates = getTemplates('.github/PULL_REQUEST_TEMPLATE');

const getLabels = filename => {
  // Format for grepping: <!-- Labels: feature -->
  // If the file exists
  if (fs.existsSync(filename)) {
    const lines = fs.readFileSync(filename, { encoding: 'utf8' }).split(/\r?\n/);
    if (lines.length > 0) {
      // Get the line containing the set of labels
      const results = lines.filter(line => line.includes('<!-- Labels:'));
      if (results.length > 0) {
        // Get just the labels from that string
        const string = results[0].slice(results[0].indexOf('Labels:') + 7, results[0].indexOf('-->'));
        // Pull them from a string into an array
        const labels = string.trim().split(',');
        // Pass that array back, remove whitespace
        return labels.map(item => item.trim());
      }
    }
  }
  // If nothing is found, return an empty string
  return [];
};

inquirer
  .prompt([
    {
      type: 'list',
      name: 'template',
      message: 'Choose your template:',
      choices: prTemplates,
      filter: response => `${response.replace(' ', '_')}.md`
    },
    {
      type: 'confirm',
      name: 'advanced_questions',
      message: 'Additional information?'
    },
    {
      type: 'input',
      name: 'base_branch',
      message: 'Base branch:',
      default: 'main',
      when: answers => answers.advanced_questions
    },
    {
      type: 'input',
      name: 'pr_branch',
      message: 'PR branch:',
      default: branch.sync(),
      when: answers => answers.advanced_questions
    }
  ])
  .then(answers => {
    // Get the labels from the template
    const labels = getLabels(`./.github/PULL_REQUEST_TEMPLATE/${answers.template}`) || [];

    open(`https://github.com/patternfly/patternfly-elements/compare/${answers.base_branch ||
    'main'}...${answers.pr_branch || branch.sync()}?template=${answers.template}&labels=${encodeURIComponent(labels.join(','))}`);
  });
