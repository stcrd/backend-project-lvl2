const defaultFormater = (diff) => {
  const mapped = diff.map((el) => {
    const [key] = Object.keys(el);
    const value = el[key];
    const prefix = { deleted: '  - ', added: '  + ' }[el.status] || '    ';
    return `${prefix}${key}: ${value}`;
  });
  return `{\n${mapped.join('\n')}\n}`;
};
export default defaultFormater;
