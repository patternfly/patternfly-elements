import { $ } from 'execa';
import { writeFile } from 'node:fs/promises';

const { stdout } = (await $`npm query .workspace`);

const workspaces = JSON.parse(stdout);
const packages = workspaces.map(x => x.name);

/** @type{import('json-schema').JSONSchema7} */
const schema = {
  $id: 'https://patternflyelements.org/changeset.schema.json',
  title: 'PatternFly Elements changeset',
  description: 'a changelog entry for PatternFly Elements',
  type: 'object',
  properties: Object.fromEntries(packages.map(name => [name, { type: 'string', enum: ['patch', 'minor', 'major'] }])),
  anyOf: packages.map(name => ({ required: [name] })),
  additionalProperties: false,
};

await writeFile(
  new URL('./pfe-changesets.schema.json', import.meta.url),
  `${JSON.stringify(schema, null, 2)}\n`,
  'utf8'
);
