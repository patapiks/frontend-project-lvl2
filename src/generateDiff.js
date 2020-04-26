import parse from './parsers';
import renderDefault from './formmaters/renderDefault';
import renderPlain from './formmaters/renderPlain';
import renderJson from './formmaters/renderJson';
import buildingTreeDiff from './buildingTreeDiff';

export default (pathToFile1, pathToFile2, format) => {
  const object1 = parse(pathToFile1);
  const object2 = parse(pathToFile2);

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
