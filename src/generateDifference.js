import _ from 'lodash';
import parse from './parsers.js';

const isObject = (value) => value instanceof Object && !Array.isArray(value);
const areBothObjects = (value1, value2) => isObject(value1) && isObject(value2);
const generateDiff = (data1, data2) => {
  const allKeys = _.sortedUniq(_.sortBy([...Object.keys(data1), ...Object.keys(data2)]));
  const mapped = allKeys.flatMap((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    if (value1 === value2) {
      return { [key]: value1 };
    }
    if (areBothObjects(value1, value2)) {
      return { [key]: generateDiff(value1, value2) };
    }
    if (key in data1 && key in data2) {
      return [{ [key]: value1, status: 'deleted' }, { [key]: value2, status: 'added' }];
    }
    return value1
      ? { [key]: value1, status: 'deleted' }
      : { [key]: value2, status: 'added' };
  });
  return mapped;
};

export default (filepath1, filepath2) => generateDiff(parse(filepath1), parse(filepath2));
