import { expect } from '@playwright/test';
import { readFile, readdir } from 'node:fs/promises';
import { fileURLToPath, resolve } from 'node:url';
import { basename } from 'node:path';
import { renderGlobal } from '../ssr/global.js';

import Koa from 'koa';

import type { Browser, Page } from '@playwright/test';
import type { Server } from 'node:http';
import type { AddressInfo } from 'node:net';

interface SSRDemoConfig {
  demoDir: URL;
  importSpecifiers: string[];
  tagName: string;
  browser: Browser;
}


export class SSRPage {
  private app: Koa;
  private server!: Server;
  private host!: string;
  private page!: Page;
  private demoPaths!: string[];

  constructor(
    private config: SSRDemoConfig,
  ) {
    this.app = new Koa();
    this.app.use(async ctx => {
      ctx.type = 'text/html';
      const origPath = ctx.request.path.replace(/^\//, '');
      const demoDir = config.demoDir.href;
      const fileUrl = resolve(demoDir, origPath);
      ctx.response.body = await renderGlobal(
        await readFile(fileURLToPath(fileUrl), 'utf-8'),
        this.config.importSpecifiers,
      );
    });
  }

  private async initPage() {
    this.page ??= await (await this.config.browser.newContext({ javaScriptEnabled: false }))
        .newPage();
  }

  private async initServer() {
    this.server ??= this.app.listen(0);
    while (!this.server.listening) {
      await new Promise(r => setTimeout(r));
    }
    const { address = 'localhost', port = 0 } = this.server.address() as AddressInfo;
    this.host ??= `http://${address.replace('::', 'localhost')}:${port}/`;
    this.demoPaths ??= (await readdir(this.config.demoDir)).map(x => new URL(x, this.host).href);
  }

  private async close() {
    await new Promise<void>((res, rej) =>
      !this.server ? rej('no server') : this.server?.close(e => e ? rej(e) : res()));
  }

  async snapshots() {
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

  /** Take a snapshot and save it to disk */
  private async snapshot(url: string) {
    const response = await this.page.goto(url, { waitUntil: 'load' });
    expect(response?.status(), { message: response?.statusText() }).toEqual(200);
    const snapshot = await this.page.screenshot({ fullPage: true });
    expect(snapshot).toMatchSnapshot(`${this.config.tagName}-${basename(url)}.png`);
  }
}
