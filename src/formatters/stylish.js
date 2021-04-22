import _ from 'lodash';

const stylish = (diff) => {
  const iter = (entries, depth = 0) => {
    const margin = '    '.repeat(depth);
    const getPrefix = (el) => ({ deleted: '  - ', added: '  + ' }[el.status] ?? '    ');
    const mapped = entries.map((el) => {
      const [[key, value]] = Object.entries(el);
      const prefix = getPrefix(el);
      const keyPart = `${margin}${prefix}${key}`;
      if (!(value instanceof Object)) {
        return `${keyPart}: ${value}`;
      }
      const newValue = Array.isArray(value)
        ? value
        : _.map(value, (innerValue, innerKey) => ({ [innerKey]: innerValue }));
      return `${keyPart}: ${iter(newValue, depth + 1)}`;
    });
    return `{\n${mapped.join('\n')}\n${margin}}`;
  };
  return iter(diff);
};
export default stylish;
