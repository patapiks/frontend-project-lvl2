import generateDiff from '../src/index';

test.each([
  ['yml'],
  ['ini'],
  ['json'],
])('GenerateDifference_tests', (arg) => {
  expect(generateDiff(`${__dirname}/fixtures/before.${arg}`, `${__dirname}/fixtures/after.${arg}`))
    .toEqual(`{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`);
});
