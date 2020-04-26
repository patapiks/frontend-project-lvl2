import fs from 'fs';
import ini from 'ini';
import path from 'path';
import yaml from 'js-yaml';

export default (pathToFile) => {
  const format = path.extname(pathToFile);
  const file = fs.readFileSync(pathToFile, 'utf8');
  if (format === '.yml') return yaml.load(file);
  if (format === '.json') return JSON.parse(file);
  if (format === '.ini') return ini.parse(file);
  return null;
};
