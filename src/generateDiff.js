import fs from 'fs';
import path from 'path';
import parse from './parsers';
import render from './formmaters/index';
import buildTreeDiff from './buildTreeDiff';

export default (pathToFile1, pathToFile2, format) => {
  const data1 = fs.readFileSync(pathToFile1, 'utf8');
  const data2 = fs.readFileSync(pathToFile2, 'utf8');
  const object1 = parse(data1, path.extname(pathToFile1));
  const object2 = parse(data2, path.extname(pathToFile2));

  const tree = buildTreeDiff(object1, object2);
  const result = render(tree, format);
  return result;
};
