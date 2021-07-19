const jsonFormatter = (diff) => {
  const getValue = (diffValue, children, status) => {
    const properValue = children ? jsonFormatter(children) : diffValue;
    return status === 'same' ? properValue : { [status]: properValue };
  };
  return diff.reduce((acc, el) => {
    const {
      diffKey, diffValue, children, status,
    } = el;
    const tempValue = getValue(diffValue, children, status);
    const finalValue = acc[diffKey]
      ? { ...acc[diffKey], ...tempValue }
      : tempValue;
    return { ...acc, ...{ [diffKey]: finalValue } };
  }, {});
};
export default jsonFormatter;
