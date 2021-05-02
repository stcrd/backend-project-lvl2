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

const plainFormatter = (diff) => {
  console.log(JSON.stringify(diff, null, ' '));
  const iter = (entries, ancestry = '') => {
    const mapped = entries.reduce((acc, el) => {
      const [key] = Object.keys(el);
      const value = typeof el[key] === 'string' ? `'${el[key]}'` : el[key];
      const newAncestry = ancestry === '' ? `${key}` : `${ancestry}.${key}`;
      const [lastKey, lastValue] = _.head(acc);
      const iAcc = _.tail(acc);

      if (Array.isArray(value)) {
        return [[], ...iAcc, getMessage(lastKey), iter(value, newAncestry)];
      }
      if (el.status === 'removed') {
        return [[newAncestry, value], ...iAcc, getMessage(lastKey)];
      }
      if (el.status === 'added') {
        if (!lastKey) {
          return [[], ...iAcc, getMessage(newAncestry, complexWrapper(value))];
        }
        if (lastKey !== newAncestry) {
          return [[], ...iAcc, getMessage(lastKey),
            getMessage(newAncestry, complexWrapper(value)),
          ];
        }
        return [[], ...iAcc,
          getMessage(newAncestry, complexWrapper(lastValue), complexWrapper(value)),
        ];
      }
      return acc;
    }, [[]]);
    return _.compact(mapped).flat().join('\n');
  };
  return iter(diff);
};
export default plainFormatter;
