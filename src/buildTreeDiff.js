import _ from 'lodash';

const buildTreeDiff = (object1, object2) => {
  const tree = _.union(_.keys(object1), _.keys(object2))
    .map((key) => {
      if (!_.has(object2, key)) return { name: key, status: 'deleted', value: object1[key] };
      if (!_.has(object1, key)) return { name: key, status: 'added', value: object2[key] };
      if (_.isObject(object1[key]) && _.isObject(object2[key])) {
        return { name: key, status: 'complexValue', children: buildTreeDiff(object1[key], object2[key]) };
      }
      if (object1[key] === object2[key]) {
        return { name: key, status: 'unchanged', value: object1[key] };
      }
      return {
        name: key, status: 'changed', beforeValue: object1[key], afterValue: object2[key],
      };
    });
  return tree;
};
export default buildTreeDiff;
