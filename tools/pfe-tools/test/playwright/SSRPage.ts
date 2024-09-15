import { expect } from '@playwright/test';
import { readFile, readdir } from 'node:fs/promises';
import { fileURLToPath, resolve } from 'node:url';
import { basename } from 'node:path';
import { renderGlobal } from '@patternfly/pfe-tools/ssr/global.js';

import Koa from 'koa';

import type { Browser, Page } from '@playwright/test';
import type { Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import type { LitElement } from 'lit';

interface SSRPageConfig {
  demoDir?: URL;
  demoContent?: string;
  importSpecifiers: string[];
  tagName: string;
  browser: Browser;
}

/**
 * Creates a server which server-renders each html file in the `demoDir` directory,
 * given a list of importSpecifiers.
 */
export class SSRPage {
  private app: Koa;
  private server!: Server;
  private host!: string;
  private demoPaths!: string[];

  public page!: Page;

  constructor(private config: SSRPageConfig) {
    this.app = new Koa();
    this.app.use(this.middleware(config));
  }

  private middleware({ demoContent, demoDir, importSpecifiers }: SSRPageConfig) {
    return async (ctx: Koa.Context, next: Koa.Next) => {
      if (ctx.method === 'GET') {
        if (demoContent) {
          try {
            ctx.response.body = await renderGlobal(
              demoContent,
              importSpecifiers,
            );
          } catch (e) {
            ctx.response.status = 500;
            ctx.response.body = (e as Error).stack;
          }
        } else if (demoDir) {
          const origPath = ctx.request.path.replace(/^\//, '');
          const { href } = demoDir;
          const fileUrl = resolve(href, origPath);
          if (ctx.request.path.endsWith('.html')) {
            try {
              const content = await readFile(fileURLToPath(fileUrl), 'utf-8');
              ctx.response.body = await renderGlobal(content, importSpecifiers);
            } catch (e) {
              ctx.response.status = 500;
              ctx.response.body = (e as Error).stack;
            }
          } else {
            try {
              ctx.response.body = await readFile(fileURLToPath(fileUrl));
            } catch (e) {
              ctx.throw(500, e as Error);
            }
          }
        } else {
          throw new Error('SSRPage must either have a demoDir URL or a demoContent string');
        }
      } else {
        return next();
      }
    };
  }

  private async initPage() {
    this.page ??= await (await this.config.browser.newContext({
      javaScriptEnabled: false,
    }))
        .newPage();
  }

  private async initServer() {
    this.server ??= this.app.listen(0);
    while (!this.server.listening) {
      await new Promise(r => setTimeout(r));
    }
    const { address = 'localhost', port = 0 } = this.server.address() as AddressInfo;
    this.host ??= `http://${address.replace('::', 'localhost')}:${port}/`;
    this.demoPaths ??= (await readdir(this.config.demoDir))
        .filter(x => x.endsWith('.html'))
        .map(x => new URL(x, this.host).href);
  }

  private async close() {
    await new Promise<void>((res, rej) =>
      !this.server ? rej('no server') : this.server?.close(e => e ? rej(e) : res()));
  }

  /**
   * Take a visual regression snapshot and save it to disk
   * @param url url to the demo file
   */
  private async snapshot(url: string) {
    const response = await this.page.goto(url, { waitUntil: 'load' });
    if (response?.status() === 404) {
      throw new Error(`Not Found: ${url}`);
    }
    expect(response?.status(), await response?.text())
        .toEqual(200);
    const snapshot = await this.page.screenshot({ fullPage: true });
    expect(snapshot, new URL(url).pathname)
        .toMatchSnapshot(`${this.config.tagName}-${basename(url)}.png`);
  }

  /**
   * Creates visual regression snapshots for each demo in the server's `demoDir`
   */
  async snapshots(): Promise<void> {
    try {
      await Promise.all([
        this.initServer(),
        this.initPage(),
      ]);
      for (const path of this.demoPaths) {
        await this.snapshot(path);
      }
    } finally {
      await this.close();
    }
  }

  async updateCompleteFor(tagName: string): Promise<void> {
    await this.page.$eval(tagName, el => (el as LitElement).updateComplete);
  }
}
