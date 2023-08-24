import { readFile } from 'node:fs/promises';
import remarkFrontmatter from 'remark-frontmatter';
import remarkLintFrontmatterSchema from 'remark-lint-frontmatter-schema';

export default {
	plugins: [
		remarkFrontmatter,
    [remarkLintFrontmatterSchema, ['error', {
      embed: JSON.parse(await readFile(new URL('./scripts/pfe-changesets.schema.json', import.meta.url), 'utf8')),
      schemas: {
        './changeset/*.md':  ['https://patternflyelements.org/changeset.schema.json']
      } }] ] ],
};
