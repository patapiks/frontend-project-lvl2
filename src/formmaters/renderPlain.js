const stringify = (value) => {
  if (typeof (value) === 'string') return `'${value}'`;
  if (typeof (value) === 'object') return '[complex value]';
  return value;
};

const render = (tree, parentsName = '') => {
  const result = tree.filter((node) => node.status !== 'unchanged')
    .flatMap((node) => {
      const {
        name, value, beforeValue, afterValue, status, children,
      } = node;

      switch (status) {
        case 'deleted':
          return `Propperty '${parentsName}${name}' was deleted`;
        case 'added':
          return `Propperty '${parentsName}${name}' was added with value: ${stringify(value)}`;
        case 'changed':
          return `Propperty '${parentsName}${name}' was changed from ${stringify(beforeValue)} to ${stringify(afterValue)}`;
        case 'complexValue':
          return render(children, `${parentsName}${name}.`);
        default:
          throw new Error(`Unknown status: '${status}'!`);
      }
    });
  return result.join('\n');
};
export default render;
