import generateDiff from '../src/index';

const fs = require('fs');

test.each([
  ['yml'],
  ['ini'],
  ['json'],
])('GenerateDifference_test_1', (arg) => {
  expect(generateDiff(`${__dirname}/__fixtures__/before.${arg}`, `${__dirname}/__fixtures__/after.${arg}`))
    .toEqual(`{
    common: {
        setting1: Value 1
      - setting2: 200
      + setting3: {
            key: value
        }
      - setting3: true
        setting6: {
            key: value
          + ops: vops
        }
      + follow: false
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
    }
    group1: {
      + baz: bars
      - baz: bas
        foo: bar
      + nest: str
      - nest: {
            key: value
        }
    }
  - group2: {
        abc: 12345
    }
  + group3: {
        fee: 100500
    }
}`);
});

test.each([
  ['yml'],
  ['ini'],
  ['json'],
])('GenerateDifference_test_2', (arg) => {
  expect(generateDiff(`${__dirname}/__fixtures__/before.${arg}`, `${__dirname}/__fixtures__/after.${arg}`, 'PLAIN'))
    .toEqual(`
Propperty 'common.setting2' was deleted
Propperty 'common.setting3' was changed from true to [complex value]
Propperty 'common.setting6.ops' was added with value: 'vops'
Propperty 'common.follow' was added with value: false
Propperty 'common.setting4' was added with value: 'blah blah'
Propperty 'common.setting5' was added with value: [complex value]
Propperty 'group1.baz' was changed from [complex value] to 'bars'
Propperty 'group1.nest' was changed from [complex value] to 'str'
Propperty 'group2' was deleted
Propperty 'group3' was added with value: [complex value]`);
});

test.each([
  ['yml'],
  ['ini'],
  ['json'],
])('GenerateDifference_test_3', (arg) => {
  expect(generateDiff(`${__dirname}/__fixtures__/before.${arg}`, `${__dirname}/__fixtures__/after.${arg}`, 'JSON'))
    .toEqual(fs.readFileSync(`${__dirname}/__fixtures__/exampleJsonFormat.json`, 'utf8'));
});
