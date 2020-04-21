import generateDiff from '../src/index';

test.each([
  ['yml'],
  ['ini'],
  ['json'],
])('GenerateDifference_test_1', (arg) => {
  expect(generateDiff(`${__dirname}/__fixtures__/before.${arg}`, `${__dirname}/__fixtures__/after.${arg}`))
    .toEqual(`{
    host: hexlet.io
  - timeout: 50
  + timeout: 20
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`);
});

test('GenerateDifference_test_2', () => {
  expect(generateDiff(`${__dirname}/__fixtures__/before1.json`, `${__dirname}/__fixtures__/after1.json`)).toEqual(`{
    common: {
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: {
            key: value
        }
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
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
    }
  + group3: {
        fee: 100500
    }
}`);
});
