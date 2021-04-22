import _ from 'lodash';

const getPrefix = (el) => ({ deleted: '  - ', added: '  + ' }[el.status] ?? '    ');
const getProperValue = (value) => {
  if (!(value instanceof Object) || Array.isArray(value)) {
    return value;
  }
  return _.map(value, (innerValue, innerKey) => ({ [innerKey]: innerValue }));
};

const stylish = (diff) => {
  const iter = (entries, depth = 0) => {
    if (!Array.isArray(entries)) return `${entries}`;
    const margin = '    '.repeat(depth);
    const mapped = entries.map((el) => {
      const [[key, value]] = Object.entries(el);
      const prefix = getPrefix(el);
      const properValue = getProperValue(value);
      return `${margin}${prefix}${key}: ${iter(properValue, depth + 1)}`;
    });
    return `{\n${mapped.join('\n')}\n${margin}}`;
  };
  return iter(diff);
};
export default stylish;
