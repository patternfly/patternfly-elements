/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 * Adapted from @lit-labs/gen-manifest, a private dependency of
 * lit-cli in the lit/lit repo. To be removed when gen-manifest is published
 */


import type * as Analyzer from '@lit-labs/analyzer';
import type * as CEM from 'custom-elements-manifest/schema';

/**
 * For optional entries in the manifest, if the value has no meaningful value
 * (i.e. it's an empty string or array or `false`), return `undefined` so that
 * we don't serialize a key with a meaningless value to JSON, to cut down size
 * of the manifest (note that `JSON.serialize` will not emit keys with
 * `undefined` values)
 */
const ifNotEmpty = <T>(v: T): T | undefined => {
  if (
    (v as unknown) === false ||
    ((typeof v === 'string' || Array.isArray(v)) && v.length === 0)
  ) {
    return undefined;
  }
  return v;
};

/**
 * Transform the given value only if it had a meaningful value, otherwise
 * return `undefined` so that it is not serialized to JSON.
 */
const transformIfNotEmpty = <T, R>(
  value: T,
  transformer: (v: NonNullable<T>) => R
): R | undefined => {
  const v = ifNotEmpty(value);
  if (v !== undefined) {
    return ifNotEmpty(transformer(v as NonNullable<T>));
  }
  return undefined;
};

export const generateManifest = (analysis: Analyzer.Package) => convertPackage(analysis);

const convertPackage = (pkg: Analyzer.Package): CEM.Package => {
  return {
    schemaVersion: '1.0.0',
    modules: [...pkg.modules.filter(x=>x.jsPath !== 'not/implemented').map(convertModule)],
  };
};

const convertExportName = (name: string, module: Analyzer.Module) => {
  console.group('convertExportName', name);
  const exportObj = convertJavascriptExport(name, module.getExportReference(name));
  console.log(exportObj);
  console.groupEnd();
  return exportObj;
};

const convertModule = (module: Analyzer.Module): CEM.Module => {
  console.group('convertModule', module.jsPath);
  const description = ifNotEmpty(module.description);
  console.log({ description });
  const summary = ifNotEmpty(module.summary);
  console.log({ summary });
  const deprecated = ifNotEmpty(module.deprecated);
  console.log({ deprecated });
  const declarations = transformIfNotEmpty(module.declarations, d =>
    d.map(convertDeclaration)
  );
  console.log({ declarations });
  const exports = ifNotEmpty([
    ...module.exportNames.map(name => convertExportName(name, module)),
    ...module.getCustomElementExports().map(convertCustomElementExport),
  ]);
  console.log({ exports });
  const m = {
    kind: 'javascript-module',
    path: module.jsPath,
    description,
    summary,
    deprecated,
    declarations,
    exports,
  };
  console.log('succeeded');
  console.groupEnd();
  return m as CEM.Module;
};

const convertCommonInfo = (info: Analyzer.DeprecatableDescribed) => {
  return {
    description: ifNotEmpty(info.description),
    summary: ifNotEmpty(info.summary),
    deprecated: ifNotEmpty(info.deprecated),
  };
};

const convertCommonDeclarationInfo = (declaration: Analyzer.Declaration) => {
  return {
    name: declaration.name,
    ...convertCommonInfo(declaration),
  };
};

const convertDeclaration = (declaration: Analyzer.Declaration): CEM.Declaration => {
  console.group('convertDeclaration', declaration.name);
  if (declaration.isLitElementDeclaration()) {
    console.log('isLitElementDeclaration');
    console.groupEnd();
    return convertLitElementDeclaration(declaration);
  } else if (declaration.isClassDeclaration()) {
    console.log('isClassDeclaration');
    console.groupEnd();
    return convertClassDeclaration(declaration);
  } else if (declaration.isVariableDeclaration()) {
    console.log('isVariableDeclaration');
    console.groupEnd();
    return convertVariableDeclaration(declaration);
  } else if (declaration.isFunctionDeclaration()) {
    console.log('isFunctionDeclaration');
    console.groupEnd();
    return convertFunctionDeclaration(declaration);
  } else {
    console.log('failed');
    console.groupEnd();
    // TODO: MixinDeclaration
    // TODO: CustomElementMixinDeclaration;
    throw new Error(
      `Unknown declaration: ${(declaration as object).constructor.name}`
    );
  }
};

const convertJavascriptExport = (
  name: string,
  reference: Analyzer.Reference
): CEM.JavaScriptExport => {
  console.group('convertJavascriptExport', name);
  const e = {
    kind: 'js',
    name,
    declaration: convertReference(reference),
  };
  console.groupEnd();
  return e as CEM.JavaScriptExport;
};

const convertCustomElementExport = (
  declaration: Analyzer.LitElementExport
): CEM.CustomElementExport => {
  console.group('convertCustomElementExport', declaration.name);
  const d = {
    kind: 'custom-element-definition',
    name: declaration.tagname,
    declaration: {
      name: declaration.name,
    },
  };
  console.log(d);
  console.groupEnd();
  return d as CEM.CustomElementExport;
};

const convertLitElementDeclaration = (
  declaration: Analyzer.LitElementDeclaration
): CEM.CustomElementDeclaration => {
  return {
    ...convertClassDeclaration(declaration),
    tagName: declaration.tagname,
    customElement: true,
    // attributes: [], // TODO
    events: transformIfNotEmpty(declaration.events, v =>
      Array.from(v.values()).map(convertEvent)
    ),
    slots: transformIfNotEmpty(declaration.slots, v =>
      Array.from(v.values())
    ),
    cssParts: transformIfNotEmpty(declaration.cssParts, v =>
      Array.from(v.values())
    ),
    cssProperties: transformIfNotEmpty(declaration.cssProperties, v =>
      Array.from(v.values())
    ),
    // demos: [], // TODO
  };
};

const convertClassDeclaration = (
  declaration: Analyzer.ClassDeclaration
): CEM.ClassDeclaration => {
  return {
    kind: 'class',
    ...convertCommonDeclarationInfo(declaration),
    superclass: transformIfNotEmpty(
      declaration.heritage.superClass,
      convertReference
    ),
    // mixins: [], // TODO
    members: ifNotEmpty([
      ...Array.from(declaration.fields).map(convertClassField),
      ...Array.from(declaration.staticFields).map(convertClassField),
      ...Array.from(declaration.methods).map(convertClassMethod),
      ...Array.from(declaration.staticMethods).map(convertClassMethod),
    ]),
    // source: {href: 'TODO'}, // TODO
  };
};

const convertCommonMemberInfo = (member: Analyzer.ClassField | Analyzer.ClassMethod) => {
  return {
    static: ifNotEmpty(member.static),
    privacy: ifNotEmpty(member.privacy),
    inheritedFrom: transformIfNotEmpty(member.inheritedFrom, convertReference),
    source: ifNotEmpty(member.source),
  };
};

const convertFunctionDeclaration = (
  declaration: Analyzer.FunctionDeclaration
): CEM.FunctionDeclaration => {
  return {
    kind: 'function',
    ...convertCommonDeclarationInfo(declaration),
    ...convertCommonFunctionLikeInfo(declaration),
  };
};

const convertCommonFunctionLikeInfo = (functionLike: Analyzer.FunctionDeclaration) => {
  return {
    parameters: transformIfNotEmpty(functionLike.parameters, p =>
      p.map(convertParameter)
    ),
    return: transformIfNotEmpty(functionLike.return, convertReturn),
  };
};

const convertReturn = (ret: Analyzer.Return) => {
  return {
    type: transformIfNotEmpty(ret.type, convertType),
    summary: ifNotEmpty(ret.summary),
    description: ifNotEmpty(ret.description),
  };
};

const convertCommonPropertyLikeInfo = (
  propertyLike: Analyzer.Parameter | Analyzer.ClassField
) => {
  return {
    type: transformIfNotEmpty(propertyLike.type, convertType),
    default: ifNotEmpty(propertyLike.default),
  };
};

const convertParameter = (param: Analyzer.Parameter): CEM.Parameter => {
  return {
    name: param.name,
    ...convertCommonInfo(param),
    ...convertCommonPropertyLikeInfo(param),
    optional: ifNotEmpty(param.optional),
    rest: ifNotEmpty(param.rest),
  };
};

const convertClassField = (field: Analyzer.ClassField): CEM.ClassField => {
  return {
    kind: 'field',
    ...convertCommonDeclarationInfo(field),
    ...convertCommonMemberInfo(field),
    ...convertCommonPropertyLikeInfo(field),
  };
};

const convertClassMethod = (method: Analyzer.ClassMethod): CEM.ClassMethod => {
  return {
    kind: 'method',
    ...convertCommonDeclarationInfo(method),
    ...convertCommonMemberInfo(method),
    ...convertCommonFunctionLikeInfo(method),
  };
};

const convertVariableDeclaration = (
  declaration: Analyzer.VariableDeclaration
): CEM.VariableDeclaration => {
  return {
    kind: 'variable',
    ...convertCommonDeclarationInfo(declaration),
    type: transformIfNotEmpty(declaration.type, convertType) ?? {
      text: 'unknown',
    }, // TODO(kschaaf) type isn't optional in CEM
  };
};

const convertEvent = (event: Analyzer.Event): CEM.Event => {
  return {
    name: event.name,
    type: transformIfNotEmpty(event.type, convertType) ?? { text: 'Event' }, // TODO(kschaaf) type isn't optional in CEM
    description: ifNotEmpty(event.description),
    summary: ifNotEmpty(event.summary),
  };
};

const convertType = (type: Analyzer.Type): CEM.Type => {
  return {
    text: type.text,
    references: transformIfNotEmpty(type.references, r =>
      convertTypeReferences(type.text, r)
    ),
  };
};

const convertTypeReferences = (
  text: string,
  references: Analyzer.Reference[]
): CEM.TypeReference[] => {
  const cemReferences: CEM.TypeReference[] = [];
  let curr = 0;
  for (const ref of references) {
    const start = text.indexOf(ref.name, curr);
    if (start < 0) {
      throw new Error(
        `Could not find type reference '${ref.name}' in type '${text}'`
      );
    }
    curr = start + ref.name.length;
    cemReferences.push({
      ...convertReference(ref),
      start,
      end: curr,
    });
  }
  return cemReferences;
};

const convertReference = (reference: Analyzer.Reference): CEM.TypeReference => {
  console.group('convertReference', reference.name);
  const refObj: CEM.TypeReference = {
    name: reference.name,
  };
  if (reference.isGlobal) {
    refObj.package = 'global:';
  } else if (reference.package !== undefined) {
    refObj.package = reference.package;
  }
  if (reference.module !== undefined) {
    refObj.module = reference.module;
  }
  console.log(refObj);
  console.groupEnd();
  return refObj;
};
