const getKey = (node) => {
  if (node.diffKey === undefined) {
    const [key] = Object.keys(node);
    return key;
  }
  return node.diffKey;
};
const getValue = (node) => {
  if (node.diffValue === undefined) {
    if (node.children === undefined) {
      const [value] = Object.values(node);
      return value;
    }
    return node.children;
  }
  return node.diffValue;
};

export { getKey, getValue };
