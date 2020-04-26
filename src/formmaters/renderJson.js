const render = (tree) => {
  const result = tree.reduce((acc, currentValue) => {
    const {
      name, value, beforeValue, afterValue, status, children,
    } = currentValue;
    const accum = acc;

    switch (status) {
      case 'changedObj':
        accum[name] = render(children);
        break;
      case 'added':
      case 'deleted':
      case 'unchanged':
        accum[name] = {
          status, value,
        };
        break;
      case 'changed':
        accum[name] = {
          status, beforeValue, afterValue,
        };
        break;
      default:
        break;
    }
    return accum;
  }, {});
  return result;
};
export default render;
