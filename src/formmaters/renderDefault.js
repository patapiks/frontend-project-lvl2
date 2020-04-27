const stringify = (value, i) => {
  if (typeof (value) === 'object') {
    const result = ['{'];
    Object.keys(value).forEach((key) => {
      result.push(`${'  '.repeat(i + 3)}${key}: ${value[key]}`);
    });
    result.push(`${'  '.repeat(i + 1)}}`);
    return result.join('\n');
  }
  return value;
};

const render = (tree, i = 1) => {
  const result = tree.reduce((acc, currentValue) => {
    const {
      name, value, beforeValue, afterValue, status, children,
    } = currentValue;
    const accum = acc;

    switch (status) {
      case 'deleted':
        accum.push(`\n${'  '.repeat(i)}- ${name}: ${stringify(value, i)}`);
        break;
      case 'added':
        accum.push(`\n${'  '.repeat(i)}+ ${name}: ${stringify(value, i)}`);
        break;
      case 'unchanged':
        accum.push(`\n${'  '.repeat(i)}  ${name}: ${stringify(value, i)}`);
        break;
      case 'changed':
        accum.push(`\n${'  '.repeat(i)}+ ${name}: ${stringify(afterValue, i)}`);
        accum.push(`\n${'  '.repeat(i)}- ${name}: ${stringify(beforeValue, i)}`);
        break;
      default:
        accum.push(`\n${'  '.repeat(i)}  ${name}: ${render(children, i + 2)}`);
        break;
    }
    return accum;
  }, ['{']);

  return `${result.join('')}\n${'  '.repeat(i - 1)}}`;
};
export default render;
