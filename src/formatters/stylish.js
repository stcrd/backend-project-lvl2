import _ from 'lodash';

const stylishFormatter = (diff, depth = 0) => {
  const mapped = diff.reduce((acc, el) => {
    const [key] = Object.keys(el);
    const value = el[key];
    const prefix = { deleted: '  - ', added: '  + ' }[el.status] || '    ';
    if (Array.isArray(value)) {
      return [...acc, `${'    '.repeat(depth)}${prefix}${key}: ${stylishFormatter(value, depth + 1)}`];
    }
    if (value instanceof Object) {
      const newValue = _.flatMap(value, (innerValue, innerKey) => ({ [innerKey]: innerValue }));
      return [...acc, `${'    '.repeat(depth)}${prefix}${key}: ${stylishFormatter(newValue, depth + 1)}`];
    }
    return [...acc, `${'    '.repeat(depth)}${prefix}${key}: ${value}`];
  }, []);
  return `{\n${mapped.join('\n')}\n${'    '.repeat(depth)}}`;
};
export default stylishFormatter;
