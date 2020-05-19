const stringify = (value, i) => {
  if (typeof (value) === 'object') {
    const result = Object.keys(value).map((key) => `${'  '.repeat(i + 3)}${key}: ${value[key]}`);
    return `{\n${result}\n${'  '.repeat(i + 1)}}`;
  }
  return value;
};

const render = (tree, i = 1) => {
  const result = tree.map((node) => {
    const {
      name, value, beforeValue, afterValue, status, children,
    } = node;

    switch (status) {
      case 'deleted':
        return `\n${'  '.repeat(i)}- ${name}: ${stringify(value, i)}`;
      case 'added':
        return `\n${'  '.repeat(i)}+ ${name}: ${stringify(value, i)}`;
      case 'unchanged':
        return `\n${'  '.repeat(i)}  ${name}: ${stringify(value, i)}`;
      case 'changed':
        return `\n${'  '.repeat(i)}+ ${name}: ${stringify(afterValue, i)}\n${'  '.repeat(i)}- ${name}: ${stringify(beforeValue, i)}`;
      default:
        return `\n${'  '.repeat(i)}  ${name}: ${render(children, i + 2)}`;
    }
  });

  return `{${result.join('')}\n${'  '.repeat(i - 1)}}`;
};
export default render;
