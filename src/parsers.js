import ini from 'ini';
import path from 'path';
import yaml from 'js-yaml';

export default (file, pathToFile) => {
  const fileExtension = path.extname(pathToFile);
  if (fileExtension === '.yml') return yaml.load(file);
  if (fileExtension === '.ini') return ini.parse(file);
  return JSON.parse(file);
};
