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
      case 'changed':
        accum[name] = {
          status, beforeValue, afterValue,
        };
        break;
      default:
        accum[name] = {
          status, value,
        };
        break;
    }
    return accum;
  }, {});
  return result;
};
export default render;
