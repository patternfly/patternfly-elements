import type { PfeConfig } from '@patternfly/pfe-tools/config';
import type { Manifest } from '@patternfly/pfe-tools/custom-elements-manifest/lib/Manifest.js';

export interface DemoRecord {
  title: string;
  tagName: string;
  tagPrefix: string;
  primaryElementName: string;
  manifest: Manifest;
  slug: string;
  filePath: string;
  permalink: string;
  url: string;
}

export interface PluginOptions extends PfeConfig {
  /** list of extra demo records not included in the custom-elements-manifest. Default [] */
  extraDemos?: DemoRecord[];
}

export interface EleventyPage {
  date: Date;
  /** Path to the input file */
  inputPath: string;
  fileSlug: string;
  filePathStem: string;
  outputFileExtension: string;
  /** final generated permalink pathname */
  url: string;
  /** file output path */
  outputPath: string;
}


export interface EleventyContext {
  page: EleventyPage;
  /** NB: New with 11ty 1.0.0? Maybe it's the pagination value? */
  ctx?: {
    /** The pagination value? */
    _?: unknown;
  };
}

export type RendererName = `render${
  | 'Attributes'
  | 'CssCustomProperties'
  | 'CssParts'
  | 'Events'
  | 'Methods'
  | 'Overview'
  | 'Properties'
  | 'Slots'
}`[];
