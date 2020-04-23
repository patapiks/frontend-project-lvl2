import generateDiff from '../src/index';

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
