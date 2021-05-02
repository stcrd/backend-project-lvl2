import _ from 'lodash';

const getMsg = (property, oldValue, newValue) => {
  if (oldValue === undefined) {
    return `Property '${property}' was removed`;
  }
  if (newValue === undefined) {
    return `Property '${property}' was added with value: ${oldValue}`;
  }
  return `Property '${property}' was updated. From ${oldValue} to ${newValue}`;
};
const complexWrap = (value) => (value instanceof Object ? '[complex value]' : value);
const stringWrapper = (rawValue) => (typeof rawValue === 'string' ? `'${rawValue}'` : rawValue);
const getUpdatedKeys = (collection) => {
  const allKeys = collection.map((el) => {
    const [key] = Object.keys(el);
    return key;
  });
  return _.uniq(allKeys.filter((el) => allKeys.indexOf(el) !== allKeys.lastIndexOf(el)));
};
const getRemovedValue = (key, collection) => {
  const [removedEntry] = collection
    .filter((element) => {
      const [removedKey] = Object.keys(element);
      return (removedKey === key && element.status === 'removed');
    });
  return stringWrapper(removedEntry[key]);
};

export default (diff) => {
  const iter = (entries, ancestry) => {
    const updatedKeys = getUpdatedKeys(entries);
    const mapped = entries.map((el) => {
      const [key] = Object.keys(el);
      const value = stringWrapper(el[key]);
      const newAncestry = ancestry ? `${ancestry}.${key}` : `${key}`;

      if (Array.isArray(value)) {
        return iter(value, newAncestry);
      }
      if (el.status === 'removed') {
        return updatedKeys.includes(key) ? '' : getMsg(newAncestry);
      }
      if (el.status === 'added') {
        return updatedKeys.includes(key)
          ? getMsg(newAncestry, complexWrap(getRemovedValue(key, entries)), complexWrap(value))
          : getMsg(newAncestry, complexWrap(value));
      }
      return '';
    });
    return _.compact(mapped).join('\n');
  };
  return iter(diff);
};
