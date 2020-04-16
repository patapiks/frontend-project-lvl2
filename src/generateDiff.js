const fs = require('fs');

export default (pathToFile1, pathToFile2) => {
  const temp = ['{'];
  const object1 = JSON.parse(fs.readFileSync(pathToFile1, 'utf8'));
  const object2 = JSON.parse(fs.readFileSync(pathToFile2, 'utf8'));

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
