import type * as CEM from 'custom-elements-manifest';
import dedent from 'dedent';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFile, writeFile, mkdir } from 'node:fs/promises';

function isCustomElementDeclaration(declaration: CEM.Declaration): declaration is CEM.CustomElementDeclaration {
  return !!(declaration as CEM.CustomElementDeclaration).customElement;
}

function getDeprefixedClassName(className: string) {
  const upper = className.replace('Pf', '');
  return `${upper.charAt(0).toUpperCase()}${upper.slice(1)}`;
}

function camel(str: string): string {
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}

function getEventReactPropName(event: CEM.Event) {
  return camel(`on-${event.name}`);
}

class NonCriticalError extends Error { }

async function writeReactWrapper(
  module: CEM.Module,
  decl: CEM.CustomElementDeclaration,
  outDirPathOrURL: string | URL,
) {
  const { path, exports } = module;
  if (!exports) {
    throw new Error(`module has no exports: ${path}`);
  }
  const ceExport = exports.find(ex => ex.declaration.name === decl.name);
  if (!ceExport) {
    throw new Error(`module does not export custom element class: ${decl.name}`);
  }
  const { tagName } = decl;
  if (!tagName) {
    throw new NonCriticalError(`declaration does not have a tag name: ${decl.name}`);
  } else {
    const javascript = dedent;
    const typescript = dedent;
    const { name: Class } = ceExport;
    const events = decl.events ?? [];
    const outDirPath =
        typeof outDirPathOrURL === 'string' ? outDirPathOrURL
      : fileURLToPath(outDirPathOrURL);
    const outPath = join(outDirPath, path);
    await mkdir(dirname(outPath), { recursive: true });
    const reactComponentName = getDeprefixedClassName(Class);
    const eventsMap = `{${events.map(event => `
          ${getEventReactPropName(event)}: '${event.name}'`).join(',')}${events.length ? `,
        ` : ''}}`;
    const eventsInterface = eventsMap.replace(/\s+/g, ' ').replaceAll(',', ';').replace('; }', ' }');
    await writeFile(outPath, javascript`// ${path}
      import { createComponent } from '@lit-labs/react';
      import react from 'react';
      import { ${Class} as elementClass } from '@patternfly/elements/${module.path}';
      export const ${reactComponentName} = createComponent({
        tagName: '${decl.tagName}',
        elementClass,
        react,
        events: ${eventsMap},
      });

    `, 'utf8');
    await writeFile(outPath.replace('.js', '.d.ts'), typescript`// ${path}
      declare module '@patternfly/elements/react/pf-button/pf-button.js' {
          import type { ReactWebComponent } from '@lit-labs/react';
          import type { ${Class} } from '@patternfly/elements/${module.path}';
          export const ${reactComponentName}: ReactWebComponent<${Class}, ${eventsInterface}>;
      }

    `, 'utf8');
    return { tagName, outPath };
  }
}

function isPackage(manifest: unknown): manifest is CEM.Package {
  const maybeManifest = (manifest as CEM.Package);
  return Array.isArray(maybeManifest?.modules) && !!maybeManifest.schemaVersion;
}

async function parseManifest(maybeManifest: unknown): Promise<CEM.Package> {
  let manifest;
  if (maybeManifest instanceof URL ||
    typeof maybeManifest === 'string') {
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

export async function generateReactWrappers(
  customElementsManifestOrPathOrURL: CEM.Package | string | URL,
  outDirPathOrURL: string | URL,
) {
  const manifest = await parseManifest(customElementsManifestOrPathOrURL);
  const written = [];
  try {
    for (const module of manifest.modules) {
      for (const decl of module.declarations ?? []) {
        if (isCustomElementDeclaration(decl)) {
          written.push(await writeReactWrapper(module, decl, outDirPathOrURL));
        }
      }
    }
  } catch (error) {
    if (error instanceof NonCriticalError) {
      // eslint-disable-next-line no-console
      console.info(error.message);
    } else {
      throw error;
    }
  }
  console.group('Wrote React Wrappers');
  for (const { tagName, outPath } of written) {
    console.log(`${tagName}: ${relative(process.cwd(), outPath)}`);
  }
  console.groupEnd();
}
