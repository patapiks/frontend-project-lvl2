import parse from '../src/parsers';

test('parsers_test', () => {
  const example = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };
  expect(parse(`${__dirname}/fixtures/before.json`)).toEqual(example);
  expect(parse(`${__dirname}/fixtures/before.yml`)).toEqual(example);
});
