import _ from 'lodash';
import parse from './src/parsers.js';

const genDiff = (filepath1, filepath2) => {
  const { parsedData1, parseData2 } = parse(filepath1, filepath2);

  const getLine = (status, key) => {
    const prefixes = { noChange: '    ', deleted: '  - ', added: '  + ' };
    const value = status === 'added' ? parseData2[key] : parsedData1[key];
    return `${prefixes[status]}${key}: ${value}`;
  };

  const allKeys = [...Object.keys(parsedData1), ...Object.keys(parseData2)];
  const sortedUniqKeys = _.uniq(allKeys.sort());

  const entries = sortedUniqKeys
    .reduce((acc, key) => {
      if (key in parsedData1 && key in parseData2) {
        const newEntry = parsedData1[key] === parseData2[key]
          ? [getLine('noChange', key)]
          : [getLine('deleted', key), getLine('added', key)];
        return [...acc, ...newEntry];
      }
      const newEntry = key in parsedData1 ? [getLine('deleted', key)] : [getLine('added', key)];
      return [...acc, ...newEntry];
    }, [])
    .join('\n');

  return `{\n${entries}\n}`;
};
export default genDiff;
