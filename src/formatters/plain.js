import _ from 'lodash';

const getMessage = (property, oldValue, newValue) => {
  if (oldValue === undefined) {
    return `Property '${property}' was removed`;
  }
  if (newValue === undefined) {
    return `Property '${property}' was added with value: ${oldValue}`;
  }
  return `Property '${property}' was updated. From ${oldValue} to ${newValue}`;
};
const complexWrapper = (value) => (value instanceof Object ? '[complex value]' : value);
const stringWrapper = (rawValue) => (typeof rawValue === 'string' ? `'${rawValue}'` : rawValue);

const plainFormatter = (diff) => {
  const iter = (entries, ancestry = '') => {
    const allKeys = entries.map((el) => {
      const [key] = Object.keys(el);
      return key;
    });
    const updated = _.uniq(allKeys.filter((el) => allKeys.indexOf(el) !== allKeys.lastIndexOf(el)));
    const mapped = entries.map((el) => {
      const [key] = Object.keys(el);
      const value = stringWrapper(el[key]);
      const newAncestry = ancestry === '' ? `${key}` : `${ancestry}.${key}`;

      if (Array.isArray(value)) {
        return iter(value, newAncestry);
      }
      if (el.status === 'removed') {
        return updated.includes(key) ? '' : getMessage(newAncestry);
      }
      if (el.status === 'added') {
        if (updated.includes(key)) {
          const [removedEntry] = entries
            .filter((element) => {
              const [removedKey] = Object.keys(element);
              return (removedKey === key && element.status === 'removed');
            });
          const removedValue = stringWrapper(removedEntry[key]);
          return getMessage(newAncestry, complexWrapper(removedValue), complexWrapper(value));
        }
        return getMessage(newAncestry, complexWrapper(value));
      }
      return '';
    });
    return _.compact(mapped).flat().join('\n');
  };
  return iter(diff);
};
export default plainFormatter;
