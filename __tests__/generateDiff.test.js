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
});
