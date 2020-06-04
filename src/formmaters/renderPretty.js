import _ from 'lodash';

const stringify = (value, depth) => {
  const indentSize = depth + 2;
  if (!_.isObject(value)) return value;
  const result = Object.keys(value).map((key) => `${'    '.repeat(indentSize)}${key}: ${value[key]}`);
  return `{\n${result}\n${'    '.repeat(indentSize - 1)}}`;
};

const render = (tree, depth = 0) => {
  const indentSize = depth;
  const result = tree.map((node) => {
    const {
      name, value, beforeValue, afterValue, status, children,
    } = node;

    switch (status) {
      case 'deleted':
        return `${'    '.repeat(indentSize)}  - ${name}: ${stringify(value, depth)}`;
      case 'added':
        return `${'    '.repeat(indentSize)}  + ${name}: ${stringify(value, depth)}`;
      case 'unchanged':
        return `${'    '.repeat(indentSize)}    ${name}: ${stringify(value, depth)}`;
      case 'changed':
        return `${'    '.repeat(indentSize)}  + ${name}: ${stringify(afterValue, depth)}\n${'    '.repeat(indentSize)}  - ${name}: ${stringify(beforeValue, depth)}`;
      case 'complexValue':
        return `${'    '.repeat(indentSize)}    ${name}: ${render(children, depth + 1)}`;
      default:
        throw new Error(`Unknown status: '${status}'!`);
    }
  });

  return `{\n${result.join('\n')}\n${'    '.repeat(indentSize)}}`;
};
export default render;
