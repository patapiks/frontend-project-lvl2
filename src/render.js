import stringify from './stringify';

const render = (tree, i = 1) => {
  const result = tree.reduce((acc, currentValue) => {
    const {
      name, value, beforeValue, afterValue, status, children,
    } = currentValue;
    let accum = acc;

    switch (status) {
      case 'deleted':
        accum += typeof (value) === 'object'
          ? `\n${'  '.repeat(i)}- ${name}: ${stringify(value, i)}`
          : `\n${'  '.repeat(i)}- ${name}: ${value}`;
        break;
      case 'added':
        accum += typeof (value) === 'object'
          ? `\n${'  '.repeat(i)}+ ${name}: ${stringify(value, i)}`
          : `\n${'  '.repeat(i)}+ ${name}: ${value}`;
        break;
      case 'unchanged':
        accum += typeof (value) === 'object'
          ? `\n${'  '.repeat(i)}  ${name}: ${stringify(value, i)}`
          : `\n${'  '.repeat(i)}  ${name}: ${value}`;
        break;
      case 'changed':
        accum += typeof (afterValue) === 'object'
          ? `\n${'  '.repeat(i)}+ ${name}: ${stringify(afterValue, i)}`
          : `\n${'  '.repeat(i)}+ ${name}: ${afterValue}`;
        accum += typeof (beforeValue) === 'object'
          ? `\n${'  '.repeat(i)}- ${name}: ${stringify(beforeValue, i)}`
          : `\n${'  '.repeat(i)}- ${name}: ${beforeValue}`;
        break;
      case 'changedObj':
        accum += `\n  ${'  '.repeat(i)}${name}: ${render(children, i + 2)}`;
        break;
      default:
        break;
    }
    return accum;
  }, '{');

  return `${result}\n${'  '.repeat(i - 1)}}`;
};
export default render;
