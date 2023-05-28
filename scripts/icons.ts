/**
 * TODO: remove this file altogether in @patternfly/elements 3.0.0
 * Why are we doing this in 2.x?
 * 1. We wanted to ship icon files separately from `@patternfly/elements`
 * 2. We didn't want that change to be breaking i.e. by removing those icon files from pfe
 * 3. pfe 2 shipped fontawesome 6, but `@patternfly/icons` ships fa 5
 * 4. Therefore, we first build out fa 6 into the pfe package,
 *    then overwrite any files with similar names using fa 5, by copying over the files from `@patternfly/icons`
 */
import { $ } from 'execa';

async function build(setName: string, icons: import('@fortawesome/free-solid-svg-icons').IconPack) {
  const { mkdir, writeFile } = await import('node:fs/promises');
  delete icons.faFontAwesomeLogoFull;
  const dir = new URL(`../elements/pf-icon/icons/${setName}/`, import.meta.url);
  await mkdir(dir, { recursive: true });
  for (const { iconName, icon: [width, height, , , path] } of Object.values(icons)) {
    const name = iconName === '500px' ? 'five-hundred-px' : iconName;
    const license = 'fontawesome. CC-BY-4.0';
    await writeFile(
      new URL(`./${name}.js`, dir),
      [
        'const t = document.createElement(\'template\');',
        't.innerHTML=`',
        `<!-- © ${license} licensed -->`,
        `<svg xmlns="http://www.w3.org/2000/svg" `,
        `data-icon-name="${name}" `,
        `height="${height}" `,
        `width="${width}" `,
        `viewBox="${[0, 0, width, height].join(' ')}">`,
        `<path d="${path}" /></svg>\`;`,
        `export default t.content.cloneNode(true);`
      ].join(''),
      'utf8',
    );
  }
}

(async function() {
  // 1: build deprecated fa 6 icons
  await build('fab', await import('@fortawesome/free-brands-svg-icons').then(x => x.fab));
  await build('far', await import('@fortawesome/free-regular-svg-icons').then(x => x.far));
  await build('fas', await import('@fortawesome/free-solid-svg-icons').then(x => x.fas));
  // 2: overwrite with icons from `@patternfly/icons`
  const $$ = $({ cwd: process.cwd() });
  await $$`cp -R node_modules/@patternfly/icons/ elements/pf-icon/`;
  await $$`rm -rf elements/pf-icon/icons/.changeset`;
  await $$`rm -f elements/pf-icon/icons/README.md`;
  await $$`rm -f elements/pf-icon/icons/package.json`;
  await $$`rm -f elements/pf-icon/icons/**/*.md`;
  await $$`rm -f elements/pf-icon/icons/**/*.json`;
  await $$`rm -f elements/pf-icon/icons/LICENSE`;
})();
