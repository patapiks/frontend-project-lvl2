const stringify = (value) => {
  if (typeof (value) === 'string') return `'${value}'`;
  return value;
};

const render = (tree, parentsName = '') => {
  const result = tree.reduce((acc, currentValue) => {
    const {
      name, value, beforeValue, afterValue, status, children,
    } = currentValue;
    const accum = acc;
    const path = [];

    switch (status) {
      case 'deleted':
        accum.push(`Propperty '${parentsName}${name}' was deleted`);
        break;
      case 'added':
        accum.push(typeof (value) === 'object'
          ? `Propperty '${parentsName}${name}' was added with value: [complex value]`
          : `Propperty '${parentsName}${name}' was added with value: ${stringify(value)}`);
        break;
      case 'changed':
        accum.push(typeof (afterValue) === 'object'
          ? `Propperty '${parentsName}${name}' was changed from ${stringify(beforeValue)} to [complex value]`
          : `Propperty '${parentsName}${name}' was changed from [complex value] to ${stringify(afterValue)}`);
        break;
      case 'changedObj':
        path.push(`${parentsName}${name}.`);
        accum.push(render(children, path.join('.')));
        break;
      default:
        break;
    }
    return accum;
  }, []);
  return result.join('\n');
};
export default render;
