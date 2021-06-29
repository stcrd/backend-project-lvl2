const jsonFormatter = (diff) => {
  if (!Array.isArray(diff)) return diff;
  return diff.reduce((acc, el) => {
    const [key, status] = Object.keys(el);
    const value = jsonFormatter(el[key]);
    const valueIfStatusExists = status ? { [el.status]: value } : value;
    const newValue = acc[key] ? { ...acc[key], ...valueIfStatusExists } : valueIfStatusExists;
    return { ...acc, ...{ [key]: newValue } };
  }, {});
};
export default jsonFormatter;
