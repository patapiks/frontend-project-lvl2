import parse from './parsers';
import buildingTreeDiff from './buildingTreeDiff';

export default (pathToFile1, pathToFile2) => {
  let count = 0;
  const object1 = parse(pathToFile1);
  const object2 = parse(pathToFile2);

  const tree = buildingTreeDiff(object1, object2);
  const diff = tree.flat(2).reduce((acc, value) => {
    if (value === '{') {
      acc += `${value}`;
      count += 1;
    } else if (value === '}') {
      acc += `\n${'    '.repeat(count)}${value}`;
      count -= 1;
    } else acc += `\n  ${'    '.repeat(count)}${value}`;
    return acc;
  });

  console.log(diff);
  return diff;
};
