import ini from 'ini';
import yaml from 'js-yaml';

export default (data, type) => {
  switch (type) {
    case '.yml':
      return yaml.load(data);
    case '.ini':
      return ini.parse(data);
    case '.json':
      return JSON.parse(data);
    default:
      return null;
  }
};
