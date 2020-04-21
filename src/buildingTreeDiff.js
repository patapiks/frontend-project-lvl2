const buildingTreeDiff = (object1, object2) => {
  const result = ['{'];

  Object.keys(object1).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(object2, key)
    && typeof (object1[key]) === 'object'
    && typeof (object2[key]) === 'object') return result.push(`  ${key}: `, buildingTreeDiff(object1[key], object2[key]));

    if (Object.prototype.hasOwnProperty.call(object2, key)
    && object2[key] === object1[key]) result.push(`  ${key}: ${object1[key]}`);

    else if (Object.prototype.hasOwnProperty.call(object2, key)
    && object1[key] !== object2[key]) {
      if (typeof (object1[key]) !== 'object') result.push(`- ${key}: ${object1[key]}`);
      else result.push(`- ${key}: `, buildingTreeDiff(object1[key], object1[key]));
      if (typeof (object2[key]) !== 'object') result.push(`+ ${key}: ${object2[key]}`);
      else result.push(`+ ${key}: `, buildingTreeDiff(object2[key], object2[key]));
    } else if (typeof (object1[key]) !== 'object') result.push(`- ${key}: ${object1[key]}`);
    else result.push(`- ${key}: `, buildingTreeDiff(object1[key], object1[key]));
    return result;
  });

  Object.keys(object2).forEach((key) => {
    if (!Object.prototype.hasOwnProperty.call(object1, key)
    && typeof (object2[key]) === 'object') {
      result.push(`+ ${key}: `, buildingTreeDiff(object2[key], object2[key]));
    } else if (!Object.prototype.hasOwnProperty.call(object1, key)) {
      result.push(`+ ${key}: ${object2[key]}`);
    }
  });

  result.push('}');
  return result;
};
export default buildingTreeDiff;
