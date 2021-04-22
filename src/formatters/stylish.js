import _ from 'lodash';

const stylish = (diff) => {
  const getPrefix = (el) => ({ deleted: '  - ', added: '  + ' }[el.status] ?? '    ');
  const getProperValue = (value) => {
    if (!(value instanceof Object)) {
      return value;
    }
    const newValue = Array.isArray(value)
      ? value
      : _.map(value, (innerValue, innerKey) => ({ [innerKey]: innerValue }));
    return newValue;
  };

  const iter = (entries, depth = 0) => {
    if (!Array.isArray(entries)) return `${entries}`;
    const margin = '    '.repeat(depth);
    const mapped = entries.map((el) => {
      const [[key, value]] = Object.entries(el);
      const prefix = getPrefix(el);
      const keyPart = `${margin}${prefix}${key}`;
      const properValue = getProperValue(value);
      return `${keyPart}: ${iter(properValue, depth + 1)}`;
    });
    return `{\n${mapped.join('\n')}\n${margin}}`;
  };
  return iter(diff);
};
export default stylish;
