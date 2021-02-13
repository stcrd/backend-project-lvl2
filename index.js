import fs from 'fs';
import _ from 'lodash';
import path from 'path';

const genDiff = (filepath1, filepath2) => {
  const rawJson1 = fs.readFileSync(path.resolve(filepath1));
  const rawJson2 = fs.readFileSync(path.resolve(filepath2));
  const json1 = JSON.parse(rawJson1);
  const json2 = JSON.parse(rawJson2);

  const getLine = (status, key) => {
    const prefixes = { noChange: '    ', deleted: '  - ', added: '  + ' };
    const value = status === 'added' ? json2[key] : json1[key];
    return `${prefixes[status]}${key}: ${value}`;
  };

  const allKeys = [...Object.keys(json1), ...Object.keys(json2)];
  const sortedUniqKeys = _.uniq(allKeys.sort());

  const entries = sortedUniqKeys
    .reduce((acc, key) => {
      if (key in json1 && key in json2) {
        const newEntry = json1[key] === json2[key]
          ? [getLine('noChange', key)]
          : [getLine('deleted', key), getLine('added', key)];
        return [...acc, ...newEntry];
      }
      const newEntry = key in json1 ? [getLine('deleted', key)] : [getLine('added', key)];
      return [...acc, ...newEntry];
    }, [])
    .join('\n');

  return `{\n${entries}\n}`;
};
export default genDiff;
