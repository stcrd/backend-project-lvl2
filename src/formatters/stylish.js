import _ from 'lodash';
import { getKey, getValue } from '../getters';

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
