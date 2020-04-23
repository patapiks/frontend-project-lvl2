export default (obj, i) => {
  let result = '{';
  Object.keys(obj).forEach((key) => {
    result += `\n${'  '.repeat(i + 3)}${key}: ${obj[key]}`;
  });
  result += `\n  ${'  '.repeat(i)}}`;
  return result;
};
