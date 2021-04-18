import _ from 'lodash';

const stylishFormatter = (diff, depth = 0) => {
  const margin = '    '.repeat(depth);
  const mapped = diff.reduce((acc, el) => {
    const [[key, value]] = Object.entries(el);
    const prefix = { deleted: '  - ', added: '  + ' }[el.status] || '    ';
    if (!(value instanceof Object)) {
      return [...acc, `${margin}${prefix}${key}: ${value}`];
    }
    const newValue = Array.isArray(value)
      ? value
      : _.flatMap(value, (innerValue, innerKey) => ({ [innerKey]: innerValue }));
    return [...acc, `${margin}${prefix}${key}: ${stylishFormatter(newValue, depth + 1)}`];
  }, []);
  return `{\n${mapped.join('\n')}\n${margin}}`;
};
export default stylishFormatter;
