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
        accum += `\nPropperty '${parentsName}${name}' was deleted`;
        break;
      case 'added':
        accum += typeof (value) === 'object'
          ? `\nPropperty '${parentsName}${name}' was added with value: [complex value]`
          : `\nPropperty '${parentsName}${name}' was added with value: ${stringify(value)}`;
        break;
      case 'changed':
        accum += typeof (afterValue) === 'object'
          ? `\nPropperty '${parentsName}${name}' was changed from ${stringify(beforeValue)} to [complex value]`
          : `\nPropperty '${parentsName}${name}' was changed from [complex value] to ${stringify(afterValue)}`;
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
