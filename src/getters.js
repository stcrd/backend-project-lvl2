const getKey = (node) => node.diffKey || Object.keys(node)[0];

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
