import generateDiff from '../src/index';

test('generateDiff_test', () => {
  expect(generateDiff('src/before.json', 'src/after.json'))
    .toEqual(`{
    host: hexlet.io
  + timeout: 20
    timeout: 50
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`);
  expect(generateDiff(`${__dirname}/fixtures/one.json`, `${__dirname}/fixtures/two.json`))
    .toEqual(`{
  - host: hexlet.io
  + rename: hexlet.io
}`);
});
