import _ from 'lodash';

const buildingTreeDiff = (object1, object2) => {
  const tree = [];
  Object.keys(object1).forEach((key) => {
    const result = {};
    result.name = key;

    // CHECK STATUS
    if (_.has(object2, key)
    && object1[key] !== object2[key]) {
      result.status = 'changed';
      result.beforeValue = object1[key];
      result.afterValue = object2[key];
    }
    if (_.has(object2, key)
    && object1[key] === object2[key]) {
      result.status = 'unchanged';
      result.value = object1[key];
    }
    if (!_.has(object2, key)) {
      result.status = 'deleted';
      result.value = object1[key];
    }

    // ADD CHILDREN
    if (_.has(object2, key)
    && typeof (object1[key]) === 'object'
    && typeof (object2[key]) === 'object') {
      result.status = 'changedObj';
      result.children = buildingTreeDiff(object1[key], object2[key]);
    }
    return tree.push(result);
  });

  Object.keys(object2).forEach((key) => {
    const result = {};

    // CHECK ADDED
    if (!_.has(object1, key)) {
      result.name = key;
      result.status = 'added';
      result.value = object2[key];
      return tree.push(result);
    }
    return tree;
  });

  return tree;
};
export default buildingTreeDiff;
