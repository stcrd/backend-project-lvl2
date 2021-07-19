const jsonFormatter = (diff) => diff
  .reduce((acc, el) => {
    const {
      diffKey, diffValue, children, status,
    } = el;
    const properValue = children ? jsonFormatter(children) : diffValue;
    const valueIfStatusExists = status === 'same'
      ? properValue
      : { [el.status]: properValue };
    const finalValue = acc[diffKey]
      ? { ...acc[diffKey], ...valueIfStatusExists }
      : valueIfStatusExists;
    return { ...acc, ...{ [diffKey]: finalValue } };
  }, {});
export default jsonFormatter;
