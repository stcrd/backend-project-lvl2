import _ from 'lodash';

const getProperValue = (value) => {
  if (!(value instanceof Object) || Array.isArray(value)) {
    return value;
  }
  const properValue = _.map(value, (innerValue, innerKey) => ({ [innerKey]: innerValue }));
  return properValue;
};

export default (diff) => {
  const iter = (entries, depth = 0) => {
    if (!Array.isArray(entries)) return `${entries}`;
    const margin = '    '.repeat(depth);
    const mapped = entries.map((el) => {
      const status = el.status || 'same';
      const key = el.diffKey === undefined ? Object.keys(el)[0] : el.diffKey;
      const value = el.diffValue === undefined ? Object.values(el)[0] : el.diffValue;
      const prefix = { removed: '  - ', added: '  + ', same: '    ' }[status];
      const properValue = getProperValue(value);
      return `${margin}${prefix}${key}: ${iter(properValue, depth + 1)}`;
    });
    return `{\n${mapped.join('\n')}\n${margin}}`;
  };
  return iter(diff);
};
