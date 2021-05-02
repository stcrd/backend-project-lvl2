import _ from 'lodash';

const getMessage = (property, oldValue, newValue) => {
  if (oldValue === undefined) {
    return property ? `Property '${property}' was removed` : '';
  }
  if (newValue === undefined) {
    return `Property '${property}' was added with value: ${oldValue}`;
  }
  return `Property '${property}' was updated. From ${oldValue} to ${newValue}`;
};
const complexWrapper = (value) => (value instanceof Object ? '[complex value]' : value);
const stringWrapper = (el, key) => (typeof el[key] === 'string' ? `'${el[key]}'` : el[key]);

const plainFormatter = (diff) => {
  const iter = (entries, ancestry = '') => {
    const allKeys = entries.map((el) => {
      const [key] = Object.keys(el);
      return key;
    });
    const updated = _.uniq(allKeys.filter((el) => allKeys.indexOf(el) !== allKeys.lastIndexOf(el)));
    const updatedEntries = entries.filter((item) => {
      const [key] = Object.keys(item);
      return updated.includes(key);
    });
    console.log(`updated entries: ${JSON.stringify(updatedEntries)}`);
    const mapped = entries.reduce((acc, el) => {
      const [key] = Object.keys(el);
      const value = stringWrapper(el, key);
      const newAncestry = ancestry === '' ? `${key}` : `${ancestry}.${key}`;

      if (Array.isArray(value)) {
        return [...acc, iter(value, newAncestry)];
      }
      if (el.status === 'removed') {
        return updated.includes(key) ? acc : [...acc, getMessage(newAncestry)];
      }
      if (el.status === 'added') {
        if (updated.includes(key)) {
          const [removedEntry] = updatedEntries.filter((element) => {
            const [removedKey] = Object.keys(element);
            return removedKey === key && element.status === 'removed';
          });
          const [rawRemovedValue] = Object.values(removedEntry);
          const removedValue = (typeof rawRemovedValue === 'string' ? `'${rawRemovedValue}'` : rawRemovedValue);
          return [
            ...acc,
            getMessage(newAncestry, complexWrapper(removedValue), complexWrapper(value)),
          ];
        }
        return [...acc, getMessage(newAncestry, complexWrapper(value))];
      }
      return acc;
    }, []);
    return _.compact(mapped).flat().join('\n');
  };
  return iter(diff);
};
export default plainFormatter;
