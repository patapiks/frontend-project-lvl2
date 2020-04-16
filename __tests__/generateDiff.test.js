import generateDiff from '../src/index';

test('generateDiff_test', () => {
  expect(generateDiff(`${__dirname}/fixtures/before.json`, `${__dirname}/fixtures/after.json`))
    .toEqual(`{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`);
  expect(generateDiff(`${__dirname}/fixtures/before.yml`, `${__dirname}/fixtures/after.yml`))
    .toEqual(`{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`);
});
