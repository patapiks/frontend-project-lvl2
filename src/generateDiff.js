import parse from './parsers';

export default (pathToFile1, pathToFile2) => {
  const temp = ['{'];
  const object1 = parse(pathToFile1);
  const object2 = parse(pathToFile2);

  Object.keys(object1).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(object2, key)
    && object2[key] === object1[key]) {
      temp.push(`    ${key}: ${object1[key]}`);
    } else if (Object.prototype.hasOwnProperty.call(object2, key)
    && object2[key] !== object1[key]) {
      temp.push(`  + ${key}: ${object2[key]}`);
      temp.push(`  - ${key}: ${object1[key]}`);
    } else temp.push(`  - ${key}: ${object1[key]}`);
  });
  Object.keys(object2).forEach((key) => {
    if (!Object.prototype.hasOwnProperty.call(object1, key)) {
      temp.push(`  + ${key}: ${object2[key]}`);
    }
  });

  temp.push('}');
  const result = temp.join('\n');
  console.log(result);
  return result;
};
