const stringify = (value) => {
  if (typeof (value) === 'string') return `'${value}'`;
  return value;
};

const render = (tree, parentsName = '') => {
  const result = tree.reduce((acc, currentValue) => {
    const {
      name, value, beforeValue, afterValue, status, children,
    } = currentValue;
    let accum = acc;
    const path = [];

    switch (status) {
      case 'deleted':
        accum += `Propperty '${parentsName}${name}' was deleted\n`;
        break;
      case 'added':
        accum += typeof (value) === 'object'
          ? `Propperty '${parentsName}${name}' was added with value: [complex value]\n`
          : `Propperty '${parentsName}${name}' was added with value: ${stringify(value)}\n`;
        break;
      case 'changed':
        accum += typeof (afterValue) === 'object'
          ? `Propperty '${parentsName}${name}' was changed from ${stringify(beforeValue)} to [complex value]\n`
          : `Propperty '${parentsName}${name}' was changed from [complex value] to ${stringify(afterValue)}\n`;
        break;
      case 'changedObj':
        path.push(`${parentsName}${name}.`);
        accum += render(children, path.join('.'));
        break;
      default:
        break;
    }
    return accum;
  }, '');
  return result;
};
export default render;
