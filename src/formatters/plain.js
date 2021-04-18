import _ from 'lodash';

const plainFormatter = (diff, ancestry = '') => {
  const mapped = diff.reduce((acc, el) => {
    const [key] = Object.keys(el);
    const value = typeof el[key] === 'string' ? `'${el[key]}'` : el[key];
    const newAncestry = ancestry === '' ? `${key}` : `${ancestry}.${key}`;
    const lastEntry = _.last(acc) || '';
    const [[lastKey, lastValue]] = typeof lastEntry !== 'string' ? Object.entries(lastEntry) : [['', '']];
    const properAcc = typeof lastEntry !== 'string' ? _.slice(acc, 0, acc.length - 1) : acc;

    if (Array.isArray(value)) {
      const modifiedAcc = typeof lastEntry === 'string'
        ? properAcc
        : [...properAcc, `Property '${lastKey}' was removed`];
      return [...modifiedAcc, plainFormatter(value, newAncestry)];
    }
    if (el.status === 'deleted') {
      const modifiedAcc = typeof lastEntry === 'string'
        ? properAcc
        : [...properAcc, `Property '${lastKey}' was removed`];
      return [...modifiedAcc, { [newAncestry]: value }];
    }
    if (el.status === 'added') {
      const newValue = value instanceof Object ? '[complex value]' : value;
      if (typeof lastEntry === 'string') {
        return [...properAcc, `Property '${newAncestry}' was added with value: ${newValue}`];
      }
      if (lastKey !== newAncestry) {
        return [...properAcc, `Property '${lastKey}' was removed`, `Property '${newAncestry}' was added with value: ${newValue}`];
      }
      const properLastValue = lastValue instanceof Object ? '[complex value]' : lastValue;
      return [...properAcc, `Property '${newAncestry}' was updated. From ${properLastValue} to ${newValue}`];
    }
    return acc;
  }, []);
  return mapped.join('\n');
};
export default plainFormatter;
