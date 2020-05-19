import _ from 'lodash';

const buildTreeDiff = (object1, object2) => {
  const tree = _.union(_.keys(object1), _.keys(object2))
    .reduce((acc, value) => {
      if (_.isObject(object1[value]) && _.isObject(object2[value])) {
        return [...acc, { name: value, status: 'complexValue', children: buildTreeDiff(object1[value], object2[value]) }];
      }
      if (!_.has(object2, value)) return [...acc, { name: value, status: 'deleted', value: object1[value] }];
      if (!_.has(object1, value)) return [...acc, { name: value, status: 'added', value: object2[value] }];
      if (object1[value] === object2[value]) {
        return [...acc, { name: value, status: 'unchanged', value: object1[value] }];
      }
      return [...acc, {
        name: value, status: 'changed', beforeValue: object1[value], afterValue: object2[value],
      }];
    }, '');
  return tree;
};
export default buildTreeDiff;
