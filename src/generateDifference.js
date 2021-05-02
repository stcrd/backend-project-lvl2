import _ from 'lodash';
import parse from './parsers.js';

const areBothObjects = (value1, value2) => (value1 instanceof Object && value2 instanceof Object);
const generateDiff = (data1, data2) => {
  const mapShared = (key, obj1, obj2) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (value1 === value2) return { [key]: value1 };
    if (areBothObjects(value1, value2)) {
      return { [key]: generateDiff(value1, value2) };
    }
    return [{ [key]: value1, status: 'removed' }, { [key]: value2, status: 'added' }];
  };
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const inBoth = _.intersection(keys1, keys2).flatMap((key) => mapShared(key, data1, data2));
  const removed = _.difference(keys1, keys2).map((key) => ({ [key]: data1[key], status: 'removed' }));
  const added = _.difference(keys2, keys1).map((key) => ({ [key]: data2[key], status: 'added' }));

  const merged = [...inBoth, ...removed, ...added];
  return _.sortBy(merged, (entry) => {
    const [key] = Object.keys(entry);
    return key;
  });
};

export default (filepath1, filepath2) => generateDiff(parse(filepath1), parse(filepath2));
