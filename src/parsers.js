const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

export default (pathToFile) => {
  const format = path.extname(pathToFile);
  const file = fs.readFileSync(pathToFile, 'utf8');
  let result;
  if (format === '.yml') result = yaml.load(file);
  else if (format === '.json') result = JSON.parse(file);
  return result;
};