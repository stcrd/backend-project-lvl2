import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import parse from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('nested json1', () => {
  const expected = {
    common: {
      setting1: 'Value 1',
      setting2: 200,
      setting3: true,
      setting6: { key: 'value', doge: { wow: '' } },
    },
    group1: { baz: 'bas', foo: 'bar', nest: { key: 'value' } },
    group2: { abc: 12345, deep: { id: 45 } },
  };
  expect(parse(getFixturePath('nested1.json')))
    .toEqual(expected);
});

test('nested yaml', () => {
  const expected = {
    common: {
      follow: false,
      setting1: 'Value 1',
      setting3: null,
      setting4: 'blah blah',
      setting5: { key5: 'value5' },
      setting6: { key: 'value', ops: 'vops', doge: { wow: 'so much' } },
    },
    group1: { foo: 'bar', baz: 'bars', nest: 'str' },
    group3: { deep: { id: { number: 45 } }, fee: 100500 },
  };
  expect(parse(getFixturePath('nested2.yml')))
    .toEqual(expected);
});
