import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';

import { getPrefixes, matchPrefix, deslugify } from './config.js';

describe('getPrefixes', function() {
  it('should return array from single string', function() {
    assert.deepStrictEqual(getPrefixes({ tagPrefix: 'pf' }), ['pf']);
  });

  it('should return array as-is', function() {
    assert.deepStrictEqual(getPrefixes({ tagPrefix: ['pf-v5', 'pf-v6'] }), ['pf-v5', 'pf-v6']);
  });

  it('should filter empty strings', function() {
    assert.deepStrictEqual(getPrefixes({ tagPrefix: ['pf-v5', '', 'pf-v6'] }), ['pf-v5', 'pf-v6']);
  });

  it('should throw when tagPrefix is undefined', function() {
    assert.throws(() => getPrefixes({ tagPrefix: undefined }), {
      message: 'tagPrefix must contain at least one non-empty prefix',
    });
  });

  it('should throw when tagPrefix is empty array', function() {
    assert.throws(() => getPrefixes({ tagPrefix: [] }), {
      message: 'tagPrefix must contain at least one non-empty prefix',
    });
  });

  it('should throw when all entries are empty strings', function() {
    assert.throws(() => getPrefixes({ tagPrefix: ['', ''] }), {
      message: 'tagPrefix must contain at least one non-empty prefix',
    });
  });
});

describe('matchPrefix', function() {
  it('should match pf-v5 prefix', function() {
    assert.strictEqual(matchPrefix('pf-v5-button', { tagPrefix: ['pf-v5', 'pf-v6'] }), 'pf-v5-');
  });

  it('should match pf-v6 prefix', function() {
    assert.strictEqual(matchPrefix('pf-v6-card', { tagPrefix: ['pf-v5', 'pf-v6'] }), 'pf-v6-');
  });

  it('should fall back to first prefix when no match', function() {
    assert.strictEqual(matchPrefix('custom-element', { tagPrefix: ['pf-v5', 'pf-v6'] }), 'pf-v5-');
  });

  it('should work with single string prefix', function() {
    assert.strictEqual(matchPrefix('pf-button', { tagPrefix: 'pf' }), 'pf-');
  });

  it('should strip trailing dash from config before adding canonical dash', function() {
    assert.strictEqual(matchPrefix('pf-v5-button', { tagPrefix: 'pf-v5-' }), 'pf-v5-');
  });
});

describe('deslugify', function() {
  it('should return prefixed slug when slug already has a configured prefix', function() {
    const result = deslugify('pf-v5-button');
    assert.strictEqual(result, 'pf-v5-button');
  });

  it('should return prefixed slug for pf-v6 prefix', function() {
    const result = deslugify('pf-v6-card');
    assert.strictEqual(result, 'pf-v6-card');
  });

  it('should prepend first prefix when slug has no prefix', function() {
    const result = deslugify('button');
    assert.strictEqual(result, 'pf-v5-button');
  });
});
