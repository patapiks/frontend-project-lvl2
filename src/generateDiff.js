import fs from 'fs';
import parse from './parsers';
import { renderDefault, renderPlain, renderJson } from './formmaters/index';
import buildTreeDiff from './buildTreeDiff';

export default (pathToFile1, pathToFile2, format) => {
  const data1 = fs.readFileSync(pathToFile1, 'utf8');
  const data2 = fs.readFileSync(pathToFile2, 'utf8');
  const object1 = parse(data1, pathToFile1);
  const object2 = parse(data2, pathToFile2);

  const tree = buildTreeDiff(object1, object2);
  switch (format) {
    case 'PLAIN':
      return renderPlain(tree);
    case 'JSON':
      return renderJson(tree);
    default:
      return renderDefault(tree);
  }
};
