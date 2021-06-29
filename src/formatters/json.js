const jsonFormatter = (diff) => {
  const reduced = diff.reduce((acc, el) => {
    const keys = Object.keys(el);
    const [key] = keys;
    const value = el[key];
    const properValue = Array.isArray(el[key]) ? jsonFormatter(value) : value;
    const valueIfStatusExists = keys.includes('status') ? { [el.status]: properValue } : properValue;
    const newEl = acc[key]
      ? { [key]: { ...acc[key], ...valueIfStatusExists } }
      : { [key]: valueIfStatusExists };
    return { ...acc, ...newEl };
  }, {});
  return reduced;
};
export default jsonFormatter;
