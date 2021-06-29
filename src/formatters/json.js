const jsonFormatter = (diff) => diff
  .reduce((acc, el) => {
    const [key, status] = Object.keys(el);
    const value = el[key];
    const properValue = Array.isArray(value) ? jsonFormatter(value) : value;
    const valueIfStatusExists = status ? { [el.status]: properValue } : properValue;
    const finalValue = acc[key] ? { ...acc[key], ...valueIfStatusExists } : valueIfStatusExists;
    return { ...acc, ...{ [key]: finalValue } };
  }, {});
export default jsonFormatter;
