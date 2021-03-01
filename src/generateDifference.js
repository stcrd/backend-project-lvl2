import _ from 'lodash';
import parse from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  const parsedData1 = parse(filepath1);
  const parsedData2 = parse(filepath2);

  const isObject = (value) => value instanceof Object && !Array.isArray(value);

  const generateDiff = (data1, data2) => {
    const allKeys = (_.uniq([...Object.keys(data1), ...Object.keys(data2)])).sort();
    const merged = allKeys.reduce((acc, key) => {
      if (key in data1 && key in data2) {
        if (data1[key] === data2[key]) {
          return [...acc, { [key]: data1[key] }];
        }
        if (isObject(data1[key]) && isObject(data2[key])) {
          return [...acc, { [key]: generateDiff(data1[key], data2[key]) }];
        }
        return [...acc, { [key]: data1[key], status: 'deleted' }, { [key]: data2[key], status: 'added' }];
      }
      if (key in data1) {
        return [...acc, { [key]: data1[key], status: 'deleted' }];
      }
      return [...acc, { [key]: data2[key], status: 'added' }];
    }, []);
    return merged;
  };
  return generateDiff(parsedData1, parsedData2);
};
export default genDiff;
