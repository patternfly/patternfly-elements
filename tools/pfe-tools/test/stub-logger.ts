import type { SinonStub } from 'sinon';

import { Logger } from '@patternfly/pfe-core/controllers/logger.js';
import { stub } from 'sinon';

for (const method of ['log', 'warn', 'error'] as const) {
  before(function() {
    stub(Logger, method);
  });

  after(function() {
    (Logger[method] as SinonStub).restore?.();
  });

  afterEach(function() {
    (Logger[method] as SinonStub).resetHistory?.();
  });
}
