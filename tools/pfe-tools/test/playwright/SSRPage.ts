import { expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { renderGlobal } from '../ssr/global.js';

import Koa from 'koa';

import type { Page } from '@playwright/test';
import type { Server } from 'node:http';
import type { AddressInfo } from 'node:net';

interface SSRDemoConfig {
  demoURL: URL;
  importSpecifiers: string[];
}

export class SSRPage {
  private app: Koa;
  private server!: Server;
  private host!: string;

  constructor(
    public tagName: string,
    public page: Page,
    private config: SSRDemoConfig,
  ) {
    this.app = new Koa();
  }

  private async serve() {
    const html = await readFile(this.config.demoURL, 'utf-8');
    this.app.use(async ctx => {
      ctx.type = 'text/html';
      ctx.response.body = await renderGlobal(html, this.config.importSpecifiers);
    });
    this.server = this.app.listen(0);
    while (!this.server.listening) {
      await new Promise(r => setTimeout(r));
    }
    const { address = 'localhost', port = 0 } = this.server.address() as AddressInfo;
    this.host = `http://${address.replace('::', 'localhost')}:${port}/`;
  }

  private async close() {
    await new Promise((res, rej) =>
      !this.server ? rej('no server') : this.server?.close(e => e ? rej(e) : res()));
  }

  /** Take a snapshot and save it to disk */
  async snapshot() {
    try {
      await this.serve();
      const path = new URL(new URL(this.config.demoURL).pathname, this.host);
      const response = await this.page.goto(path.toString(), { waitUntil: 'load' });
      expect(response?.status(), { message: response?.statusText() }).toEqual(200);
      expect(await this.page.screenshot({ fullPage: true })).toMatchSnapshot(`${this.tagName}.png`);
    } finally {
      await this.close();
    }
  }
}
