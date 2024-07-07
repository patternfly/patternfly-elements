import type * as CEM from 'custom-elements-manifest';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFile, writeFile, mkdir } from 'node:fs/promises';

import Chalk from 'chalk';

interface ReactWrapperData {
  Class: string;
  reactComponentName: string;
  eventsMap: string;
  eventsInterface: string;
  tagName: string;
}

const javascript = String.raw;
const typescript = String.raw;

function isCustomElementDeclaration(
  declaration: CEM.Declaration,
): declaration is CEM.CustomElementDeclaration {
  return !!(declaration as CEM.CustomElementDeclaration).customElement;
}

function isExported(exports: CEM.Export[] | undefined) {
  return function(declaration: CEM.Declaration): boolean {
    return !!exports?.some(exp => exp.kind === 'js' && exp.declaration.name === declaration.name);
  };
}

/**
 * Remove a prefix from a class name
 * @param className ecmascript class name e.g. PfJazzHands
 * @param prefix class name prefix e.g. Pf
 */
function getDeprefixedClassName(className: string, prefix: string) {
  const [fst, ...tail] = className.replace(prefix, '');
  return `${fst.toUpperCase()}${tail.join('')}`;
}

/**
 * simple function to convert string from dash to camel case
 * @param str string to convert to camelcase
 */
function camel(str: string): string {
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}

function getEventReactPropName(event: CEM.Event) {
  return camel(`on-${event.name}`);
}

class NonCriticalError extends Error { }

function isPackage(manifest: unknown): manifest is CEM.Package {
  const maybeManifest = (manifest as CEM.Package);
  return Array.isArray(maybeManifest?.modules) && !!maybeManifest.schemaVersion;
}

const getReactWrapperData = (
  module: CEM.Module,
  classPrefix: string,
  elPrefix: string,
) =>
  (decl: CEM.CustomElementDeclaration) => {
    const ceExport = module.exports?.find(ex => ex.declaration.name === decl.name);
    if (!ceExport) {
      throw new Error(`module ${module.path} does not export custom element class: ${decl.name}`);
    }
    if (!decl.tagName) {
      throw new NonCriticalError(`declaration does not have a tag name: ${decl.name}`);
    }
    const { tagName, name: Class } = decl;
    const events = decl.events ?? [];
    const reactComponentName = getDeprefixedClassName(Class, classPrefix);
    const eventsMap = `{${events.map(event => `
    ${getEventReactPropName(event)}: '${event.name}'`).join(',')}${events.length ? `,
  ` : ''}}`;
    const eventsInterface = eventsMap
        .replace(/\s+/g, ' ')
        .replaceAll(',', ';')
        .replace('; }', ' }');
    return {
      Class: decl.name,
      reactComponentName,
      eventsMap,
      eventsInterface,
      elPrefix,
      tagName,
    };
  };

function genJavascriptModule(module: CEM.Module, pkgName: string, data: ReactWrapperData[]) {
  return javascript`// ${module.path}
import { createComponent } from '@lit/react';
import react from 'react';${data.map(x => javascript`
import { ${x.Class} } from '${pkgName}/${module.path}';`).join('')}${data.map(x => javascript`
export const ${x.reactComponentName} = createComponent({
  tagName: '${x.tagName}',
  elementClass: ${x.Class},
  react,
  events: ${x.eventsMap},
});`).join('\n')}
`;
}

function genTypescriptModule(module: CEM.Module, pkgName: string, data: ReactWrapperData[]) {
  return typescript`// ${module.path}
import type { ReactWebComponent } from '@lit/react';${data.map(x => typescript`
import type { ${x.Class} } from '${pkgName}/${module.path}';`).join('')}${data.map(x => typescript`
export const ${x.reactComponentName}: ReactWebComponent<${x.Class}, ${x.eventsInterface}>;`).join('\n')}
  `;
}

function genWrapperModules(
  module: CEM.Module,
  pkgName: string,
  elPrefix: string,
  classPrefix: string,
) {
  const data: ReactWrapperData[] = (module.declarations ?? [])
      .filter(isCustomElementDeclaration)
      .filter(isExported(module.exports))
      .map(getReactWrapperData(module, classPrefix, elPrefix));
  const js = genJavascriptModule(module, pkgName, data);
  const ts = genTypescriptModule(module, pkgName, data);
  const tagNames = data.map(x => x.tagName);
  return { js, ts, tagNames };
}

async function writeReactWrappers(
  js: string,
  ts: string,
  tagNames: string[],
  path: string,
  outDirPathOrURL: string | URL,
) {
  const outDirPath =
      typeof outDirPathOrURL === 'string' ? outDirPathOrURL
    : fileURLToPath(outDirPathOrURL);
  const outPath = join(outDirPath, path);
  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, js, 'utf8');
  await writeFile(outPath.replace('.js', '.d.ts'), ts, 'utf8');
  return { tagNames, outPath };
}

async function parseManifest(maybeManifest: unknown): Promise<CEM.Package> {
  let manifest;
  if (maybeManifest instanceof URL
    || typeof maybeManifest === 'string') {
    manifest = JSON.parse(await readFile(maybeManifest, 'utf-8'));
  } else {
    manifest = maybeManifest;
  }
  if (!isPackage(manifest)) {
    throw new Error('could not parse manifest');
  } else {
    return manifest;
  }
}

/**
 * Given a custom elements manifest (or a path to its file),
 * generate a suite of react wrapper components
 * @param customElementsManifestOrPathOrURL manifest object; or string or url path
 * @param outDirPathOrURL directory to write wrapper components to
 * @param packageName npm package name of the manifest
 * @param elPrefix element tag prefix e.g. `pf`
 * @param classPrefix e.g. `Pf`
 */
export async function generateReactWrappers(
  customElementsManifestOrPathOrURL: CEM.Package | string | URL,
  outDirPathOrURL: string | URL,
  packageName = '@patternfly/elements',
  elPrefix = 'pf',
  classPrefix = `${elPrefix.charAt(0).toUpperCase()}${elPrefix.slice(1)}`,
): Promise<void> {
  /* eslint-disable no-console */
  const manifest = await parseManifest(customElementsManifestOrPathOrURL);
  const written = [];
  console.group(Chalk.green`Writing React Wrappers`);
  try {
    for (const module of manifest.modules) {
      if (!module.exports) {
        throw new Error(`module has no exports: ${module.path}`);
      }
      const { js, ts, tagNames } = genWrapperModules(module, packageName, elPrefix, classPrefix);
      written.push(await writeReactWrappers(js, ts, tagNames, module.path, outDirPathOrURL));
    }
  } catch (error) {
    if (error instanceof NonCriticalError) {
      console.info(`⚠️ ${error.message}`);
    } else {
      throw error;
    }
  } finally {
    console.groupEnd();
  }
  console.group(Chalk.greenBright`Wrote React Wrappers`);
  for (const { tagNames, outPath } of written) {
    const names = tagNames.map(x => Chalk.blue`${x}`).join().replace(', ', '');
    const path = relative(process.cwd(), outPath);
    console.log(`${names}: ${path}`);
  }
  console.groupEnd();
  /* eslint-enable no-console */
}
