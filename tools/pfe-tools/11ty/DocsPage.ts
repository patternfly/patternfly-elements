import type { PfeConfig } from '../config.js';
import { getPfeConfig } from '../config.js';
import { Manifest } from '../custom-elements-manifest/lib/Manifest.js';

import slugify from 'slugify';

interface DocsPageOptions extends PfeConfig {
  docsTemplatePath?: string;
  tagName?: string;
  title?: string;
  /** When true, renders an <h1> with the element's title in the element docs overview */
  renderTitleInOverview?: boolean;
}

export class DocsPage {
  static isDocsPage = true;
  tagName: string;
  title: string;
  slug: string;
  description?: string | null;
  summary?: string | null;
  docsTemplatePath?: string;
  constructor(public manifest: Manifest, options?: DocsPageOptions) {
    const config = getPfeConfig(options?.rootDir);
    this.tagName = options?.tagName ?? '';
    this.title = options?.title ?? Manifest.prettyTag(this.tagName);
    this.docsTemplatePath = options?.docsTemplatePath;
    this.summary = this.manifest.getSummary(this.tagName);
    this.description = this.manifest.getDescription(this.tagName);
    const prefix = `${config.tagPrefix.replace(/-$/, '')}-`;
    const aliased = config.aliases[this.tagName] ?? this.tagName.replace(prefix, '');
    this.slug = slugify(aliased, { strict: true, lower: true });
  }
}
