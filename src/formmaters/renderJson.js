const render = (tree) => {
  const result = tree.reduce((acc, currentValue) => {
    const {
      name, value, beforeValue, afterValue, status, children,
    } = currentValue;
    const accum = acc;
    // console.log(accum);

    switch (status) {
      case 'added':
      case 'unchanged':
      case 'deleted':
        accum.push({
          name, status, value, beforeValue, afterValue,
        });
        break;
      case 'changed':
        accum.push({ name, status });
        break;
      case 'changedObj':
        accum.push({ name, value: render(children) });
        break;
      default:
        break;
    }
    return accum;
  }, []);
  return result;
};
export default render;
