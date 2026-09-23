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
