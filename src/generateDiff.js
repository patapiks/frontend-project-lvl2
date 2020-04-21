import parse from './parsers';
import buildingTreeDiff from './buildingTreeDiff';

export default (pathToFile1, pathToFile2) => {
  let count = 0;
  const object1 = parse(pathToFile1);
  const object2 = parse(pathToFile2);

  const tree = buildingTreeDiff(object1, object2);
  const diff = tree.flat(2).reduce((acc, currentValue) => {
    let accum = acc;
    if (currentValue === '{') {
      accum += `${currentValue}`;
      count += 1;
    } else if (currentValue === '}') {
      accum += `\n${'    '.repeat(count)}${currentValue}`;
      count -= 1;
    } else accum += `\n  ${'    '.repeat(count)}${currentValue}`;
    return accum;
  });

  console.log(diff);
  return diff;
};
