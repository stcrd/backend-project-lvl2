import _ from 'lodash';
import parse from './parsers.js';

const areBothObjects = (value1, value2) => (value1 instanceof Object && value2 instanceof Object);

const generateDiff = (data1, data2) => {
  const mapShared = (diffKey, value1, value2) => {
    if (value1 === value2) return { status: 'same', diffKey, diffValue: value1 };
    if (areBothObjects(value1, value2)) {
      return { status: 'same', diffKey, diffValue: generateDiff(value1, value2) };
    }
    return [{ status: 'removed', diffKey, diffValue: value1 }, { status: 'added', diffKey, diffValue: value2 }];
  };
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const inBoth = _.intersection(keys1, keys2)
    .flatMap((key) => mapShared(key, data1[key], data2[key]));
  const removed = _.difference(keys1, keys2).map((diffKey) => ({ status: 'removed', diffKey, diffValue: data1[diffKey] }));
  const added = _.difference(keys2, keys1).map((diffKey) => ({ status: 'added', diffKey, diffValue: data2[diffKey] }));

  const merged = [...inBoth, ...removed, ...added];
  return _.sortBy(merged, (entry) => {
    const { diffKey } = entry;
    return diffKey;
  });
};

export default (filepath1, filepath2) => generateDiff(parse(filepath1), parse(filepath2));
