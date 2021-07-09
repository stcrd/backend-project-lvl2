const jsonFormatter = (diff) => diff
  .reduce((acc, el) => {
    const { diffKey, diffValue, status } = el;
    const properValue = Array.isArray(diffValue) ? jsonFormatter(diffValue) : diffValue;
    const valueIfStatusExists = status === 'same'
      ? properValue
      : { [el.status]: properValue };
    const finalValue = acc[diffKey]
      ? { ...acc[diffKey], ...valueIfStatusExists }
      : valueIfStatusExists;
    return { ...acc, ...{ [diffKey]: finalValue } };
  }, {});
export default jsonFormatter;
