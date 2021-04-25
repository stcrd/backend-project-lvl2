import _ from 'lodash';
import parse from './parsers.js';

const isObject = (value) => value instanceof Object && !Array.isArray(value);

const genDiff = (filepath1, filepath2) => {
  const parsedData1 = parse(filepath1);
  const parsedData2 = parse(filepath2);

  const generateDiff = (data1, data2) => {
    const allKeys = _.sortedUniq(_.sortBy([...Object.keys(data1), ...Object.keys(data2)]));
    const merged = allKeys.flatMap((key) => {
      const value1 = data1[key];
      const value2 = data2[key];
      if (value1 === value2) {
        return { [key]: value1 };
      }
      if (isObject(value1) && isObject(value2)) {
        return { [key]: generateDiff(value1, value2) };
      }
      if (key in data1 && key in data2) {
        return [{ [key]: value1, status: 'deleted' }, { [key]: value2, status: 'added' }];
      }
      return value1
        ? { [key]: value1, status: 'deleted' }
        : { [key]: value2, status: 'added' };
    });
    return merged;
  };
  return generateDiff(parsedData1, parsedData2);
};
export default genDiff;
