import _ from 'lodash';

const getRemovedMsg = (property) => (property ? `Property '${property}' was removed` : '');
const getAddedMsg = (property, value) => `Property '${property}' was added with value: ${value}`;
const getUpdatedMsg = (property, oldValue, newValue) => `Property '${property}' was updated. From ${oldValue} to ${newValue}`;
const complexWrapper = (value) => (_.isObject(value) ? '[complex value]' : value);

const plainFormatter = (diff) => {
  const iter = (entries, ancestry = '') => {
    const mapped = entries.reduce((acc, el) => {
      const [key] = Object.keys(el);
      const value = typeof el[key] === 'string' ? `'${el[key]}'` : el[key];
      const newAncestry = ancestry === '' ? `${key}` : `${ancestry}.${key}`;
      const [lastKey, lastValue] = _.head(acc);
      const iAcc = _.tail(acc);

      if (Array.isArray(value)) {
        return [[], ...iAcc, getRemovedMsg(lastKey), iter(value, newAncestry)];
      }
      if (el.status === 'deleted') {
        return [[newAncestry, value], ...iAcc, getRemovedMsg(lastKey)];
      }
      if (el.status === 'added') {
        if (!lastKey) {
          return [[], ...iAcc, getAddedMsg(newAncestry, complexWrapper(value))];
        }
        if (lastKey !== newAncestry) {
          return [[], ...iAcc, getRemovedMsg(lastKey),
            getAddedMsg(newAncestry, complexWrapper(value)),
          ];
        }
        return [[], ...iAcc,
          getUpdatedMsg(newAncestry, complexWrapper(lastValue), complexWrapper(value)),
        ];
      }
      return acc;
    }, [[]]);
    return _.compact(mapped).flat().join('\n');
  };
  return iter(diff);
};
export default plainFormatter;
