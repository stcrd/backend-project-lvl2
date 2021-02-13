import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('two non-empty jsons', () => {
  const expected = '{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}';
  expect(genDiff(getFixturePath('not-empty1.json'), getFixturePath('not-empty2.json')))
    .toEqual(expected);
});

test('empty source, non-empty target', () => {
  const expected = '{\n  + host: hexlet.io\n  + timeout: 20\n  + verbose: true\n}';
  expect(genDiff(getFixturePath('empty.json'), getFixturePath('not-empty2.json')))
    .toEqual(expected);
});

test('non-empty source, empty target', () => {
  const expected = '{\n  - host: hexlet.io\n  - timeout: 20\n  - verbose: true\n}';
  expect(genDiff(getFixturePath('not-empty2.json'), getFixturePath('empty.json')))
    .toEqual(expected);
});

test('both empty', () => {
  const expected = '{\n\n}';
  expect(genDiff(getFixturePath('empty.json'), getFixturePath('empty.json')))
    .toEqual(expected);
});
