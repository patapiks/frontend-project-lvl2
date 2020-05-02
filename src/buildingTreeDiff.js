import _ from 'lodash';

const buildingTreeDiff = (object1, object2) => {
  const tree = [];
  Object.keys(object1).forEach((key) => {
    if (_.has(object2, key)
    && typeof (object1[key]) === 'object'
    && typeof (object2[key]) === 'object') {
      return tree.push({ name: key, status: 'changedObj', children: buildingTreeDiff(object1[key], object2[key]) });
    }
    if (_.has(object2, key)
    && object1[key] !== object2[key]) {
      tree.push({
        name: key,
        status: 'changed',
        beforeValue: object1[key],
        afterValue: object2[key],
      });
    }
    if (_.has(object2, key)
    && object1[key] === object2[key]) tree.push({ name: key, status: 'unchanged', value: object1[key] });
    if (!_.has(object2, key)) tree.push({ name: key, status: 'deleted', value: object1[key] });
    return key;
  });

  Object.keys(object2).forEach((key) => {
    if (!_.has(object1, key)) tree.push({ name: key, status: 'added', value: object2[key] });
  });

  return tree;
};
export default buildingTreeDiff;
