import _ from 'lodash';

const getKey = (node) => {
  if (node.diffKey === undefined) {
    const [key] = Object.keys(node);
    return key;
  }
  return node.diffKey;
};
const getValue = (node) => {
  if (node.diffValue === undefined) {
    if (node.children === undefined) {
      const [value] = Object.values(node);
      return value;
    }
    return node.children;
  }
  return node.diffValue;
};
const getProperValue = (value) => {
  if (!(value instanceof Object) || Array.isArray(value)) {
    return value;
  }
  return _.map(value, (innerValue, innerKey) => ({ [innerKey]: innerValue }));
};

export default (diff) => {
  const iter = (entries, depth = 0) => {
    if (!Array.isArray(entries)) return `${entries}`;
    const margin = '    '.repeat(depth);
    const mapped = entries.map((el) => {
      const status = el.status || 'same';
      const prefix = { removed: '  - ', added: '  + ', same: '    ' }[status];
      const key = getKey(el);
      const value = getValue(el);
      const properValue = getProperValue(value);
      return `${margin}${prefix}${key}: ${iter(properValue, depth + 1)}`;
    });
    return `{\n${mapped.join('\n')}\n${margin}}`;
  };
  return iter(diff);
};
