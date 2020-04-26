const stringify = (obj, i) => {
  const result = ['{'];
  Object.keys(obj).forEach((key) => {
    result.push(`${'  '.repeat(i + 3)}${key}: ${obj[key]}`);
  });
  result.push(`${'  '.repeat(i + 1)}}`);
  return result.join('\n');
};

const render = (tree, i = 1) => {
  const result = tree.reduce((acc, currentValue) => {
    const {
      name, value, beforeValue, afterValue, status, children,
    } = currentValue;
    const accum = acc;

    switch (status) {
      case 'deleted':
        accum.push(typeof (value) === 'object'
          ? `\n${'  '.repeat(i)}- ${name}: ${stringify(value, i)}`
          : `\n${'  '.repeat(i)}- ${name}: ${value}`);
        break;
      case 'added':
        accum.push(typeof (value) === 'object'
          ? `\n${'  '.repeat(i)}+ ${name}: ${stringify(value, i)}`
          : `\n${'  '.repeat(i)}+ ${name}: ${value}`);
        break;
      case 'unchanged':
        accum.push(typeof (value) === 'object'
          ? `\n${'  '.repeat(i)}  ${name}: ${stringify(value, i)}`
          : `\n${'  '.repeat(i)}  ${name}: ${value}`);
        break;
      case 'changed':
        accum.push(typeof (afterValue) === 'object'
          ? `\n${'  '.repeat(i)}+ ${name}: ${stringify(afterValue, i)}`
          : `\n${'  '.repeat(i)}+ ${name}: ${afterValue}`);
        accum.push(typeof (beforeValue) === 'object'
          ? `\n${'  '.repeat(i)}- ${name}: ${stringify(beforeValue, i)}`
          : `\n${'  '.repeat(i)}- ${name}: ${beforeValue}`);
        break;
      case 'changedObj':
        accum.push(`\n  ${'  '.repeat(i)}${name}: ${render(children, i + 2)}`);
        break;
      default:
        break;
    }
    return accum;
  }, ['{']);

  return `${result.join('')}\n${'  '.repeat(i - 1)}}`;
};
export default render;
