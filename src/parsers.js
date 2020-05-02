import fs from 'fs';
import ini from 'ini';
import path from 'path';
import yaml from 'js-yaml';

export default (pathToFile) => {
  const file = fs.readFileSync(pathToFile, 'utf8');
  const format = path.extname(pathToFile);
  if (format === '.yml') return yaml.load(file);
  if (format === '.ini') return ini.parse(file);
  return JSON.parse(file);
};
