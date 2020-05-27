const stringify = (value, indentSize) => {
  if (typeof (value) === 'object') {
    const result = Object.keys(value).map((key) => `${'  '.repeat(indentSize + 3)}${key}: ${value[key]}`);
    return `{\n${result}\n${'  '.repeat(indentSize + 1)}}`;
  }
  return value;
};

const render = (tree, indentSize = 1) => {
  const result = tree.map((node) => {
    const {
      name, value, beforeValue, afterValue, status, children,
    } = node;

    switch (status) {
      case 'deleted':
        return `${'  '.repeat(indentSize)}- ${name}: ${stringify(value, indentSize)}`;
      case 'added':
        return `${'  '.repeat(indentSize)}+ ${name}: ${stringify(value, indentSize)}`;
      case 'unchanged':
        return `${'  '.repeat(indentSize)}  ${name}: ${stringify(value, indentSize)}`;
      case 'changed':
        return `${'  '.repeat(indentSize)}+ ${name}: ${stringify(afterValue, indentSize)}\n${'  '.repeat(indentSize)}- ${name}: ${stringify(beforeValue, indentSize)}`;
      case 'complexValue':
        return `${'  '.repeat(indentSize)}  ${name}: ${render(children, indentSize + 2)}`;
      default:
        throw new Error(`Unknown status: '${status}'!`);
    }
  });

  return `{\n${result.join('\n')}\n${'  '.repeat(indentSize - 1)}}`;
};
export default render;
