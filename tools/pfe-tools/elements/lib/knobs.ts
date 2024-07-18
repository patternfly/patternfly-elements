import type {
  Attribute,
  ClassField,
  ClassMember,
  CustomElementDeclaration,
  CustomElementField,
  Declaration,
  Slot,
} from 'custom-elements-manifest';

import type { PftElementKnobs } from '../pft-element-knobs.js';

export interface KnobInfo<E> {
  element: E;
  knobId: string;
}

export interface AttributeKnobInfo<E> extends KnobInfo<E> {
  isBoolean: boolean;
  isEnum: boolean;
  isNullable: boolean;
  isNumber: boolean;
  isOptional: boolean;
  values: string[];
}

export interface PropertyKnobInfo<E> extends KnobInfo<E> {
  isBoolean: boolean;
  isEnum: boolean;
  isNullable: boolean;
  isNumber: boolean;
  isOptional: boolean;
  isSerializable: boolean;
  values: string[];
}

export type ContentKnobInfo<E> = KnobInfo<E>;

export type KnobRenderer<T, E extends HTMLElement = HTMLElement> = (
  this: PftElementKnobs<E>,
  member: T,
  info:
    T extends ClassField ? PropertyKnobInfo<E>
  : T extends Attribute ? AttributeKnobInfo<E>
  : T extends Slot[] ? ContentKnobInfo<E>
  : KnobInfo<E>,
) => unknown;

export type PropertyRenderer<E extends HTMLElement> = KnobRenderer<ClassField, E>;
export type AttributeRenderer<E extends HTMLElement> = KnobRenderer<Attribute, E>;
export type ContentRenderer<E extends HTMLElement> = KnobRenderer<Slot[], E>;

export const isAttributelessProperty = (x: ClassMember): x is CustomElementField =>
  x.kind === 'field'
  && !x.privacy
  && !('attribute' in x);

export const isCheckable = (el: HTMLElement): el is HTMLElement & { checked: boolean } =>
  'checked' in el;

export const isValue = (el: HTMLElement): el is HTMLElement & { value: string } =>
  'value' in el;

export const isCustomElementDecl = (decl: Declaration): decl is CustomElementDeclaration =>
  'customElement' in decl;

export const dedent = (str: string): string => {
  const stripped = str.replace(/^\n/, '');
  const match = stripped.match(/^\s+/);
  return match ? stripped.replace(new RegExp(`^${match[0]}`, 'gm'), '') : str;
};

export const isSerializable = (x: unknown): boolean => {
  try {
    JSON.stringify(x);
    return true;
  } catch {
    return false;
  }
};
