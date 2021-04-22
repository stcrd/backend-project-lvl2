import _ from 'lodash';

const stylish = (diff, depth = 0) => {
  const margin = '    '.repeat(depth);
  const mapped = diff.map((el) => {
    const [[key, value]] = Object.entries(el);
    const prefix = { deleted: '  - ', added: '  + ' }[el.status] ?? '    ';
    const keyPart = `${margin}${prefix}${key}`;
    if (!(value instanceof Object)) {
      return `${keyPart}: ${value}`;
    }
    const newValue = Array.isArray(value)
      ? value
      : _.map(value, (innerValue, innerKey) => ({ [innerKey]: innerValue }));
    return `${keyPart}: ${stylish(newValue, depth + 1)}`;
  });
  return `{\n${mapped.join('\n')}\n${margin}}`;
};
export default stylish;
