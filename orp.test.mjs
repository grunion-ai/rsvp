import test from 'node:test';
import assert from 'node:assert/strict';
import { orpIndex, tokenize, holdMs, totalMs } from './orp.js';

test('orp index follows word length bands', () => {
  assert.equal(orpIndex('a'), 0);
  assert.equal(orpIndex('read'), 1);
  assert.equal(orpIndex('reading'), 2);
  assert.equal(orpIndex('presentation'), 3);
  assert.equal(orpIndex('incomprehensibilities'), 4);
});

test('tokenize collapses whitespace and drops empties', () => {
  assert.deepEqual(tokenize('  one\n two   three '), ['one', 'two', 'three']);
});

test('hold time scales with punctuation and length', () => {
  assert.equal(holdMs('word', 300), 200);
  assert.equal(holdMs('word.', 300), 320);
  assert.equal(holdMs('word,', 300), 260);
  assert.equal(holdMs('presentation', 300), 240);
  assert.equal(holdMs('presentation.', 300), 384);
});

test('total time sums the holds', () => {
  assert.equal(totalMs(['a', 'b.'], 600), 100 + 160);
});

import { rampFactor, pace } from './orp.js';

test('ramp climbs from 60% to full speed over the first 30 words', () => {
  assert.equal(rampFactor(0), 0.6);
  assert.equal(rampFactor(15), 0.8);
  assert.equal(rampFactor(30), 1);
  assert.equal(rampFactor(500), 1);
});

test('pace holds longer while ramping, on numbers, and on very long words', () => {
  assert.equal(pace('word', 300, 30), 200);
  assert.equal(pace('word', 300, 0), 333);
  assert.equal(pace('2026', 300, 30), 280);
  assert.equal(pace('presentation', 300, 30), 240);
  assert.equal(pace('incomprehensibilities', 300, 30), 280);
  assert.equal(pace('word.', 300, 30), 320);
});
