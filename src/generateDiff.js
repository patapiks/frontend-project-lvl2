import parse from './parsers';
import render from './render';
import buildingTreeDiff from './buildingTreeDiff';

export default (pathToFile1, pathToFile2) => {
  const object1 = parse(pathToFile1);
  const object2 = parse(pathToFile2);

  const tree = buildingTreeDiff(object1, object2);
  const diff = render(tree);

  console.log(diff);
  return diff;
};
