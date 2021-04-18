import _ from 'lodash';

const stylish = (diff, depth = 0) => {
  const margin = '    '.repeat(depth);
  if (!(diff instanceof Object)) return diff;
  const mapped = diff.reduce((acc, el) => {
    const [[key, value]] = Object.entries(el);
    const prefix = { deleted: '  - ', added: '  + ' }[el.status] || '    ';
    const newValue = (Array.isArray(value) || !(value instanceof Object))
      ? value
      : _.flatMap(value, (innerValue, innerKey) => ({ [innerKey]: innerValue }));
    return [...acc, `${margin}${prefix}${key}: ${stylish(newValue, depth + 1)}`];
  }, []);
  return `{\n${mapped.join('\n')}\n${margin}}`;
};
export default stylish;
