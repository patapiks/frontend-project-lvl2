import fs from 'fs';
import parse from './parsers';
import renderDefault from './formmaters/renderDefault';
import renderPlain from './formmaters/renderPlain';
import renderJson from './formmaters/renderJson';
import buildingTreeDiff from './buildingTreeDiff';

export default (pathToFile1, pathToFile2, format) => {
  const file1 = fs.readFileSync(pathToFile1, 'utf8');
  const file2 = fs.readFileSync(pathToFile2, 'utf8');
  const object1 = parse(file1, pathToFile1);
  const object2 = parse(file2, pathToFile2);

  const tree = buildingTreeDiff(object1, object2);
  switch (format) {
    case 'PLAIN':
      return renderPlain(tree);
    case 'JSON':
      return JSON.stringify(renderJson(tree));
    default:
      return renderDefault(tree);
  }
};
