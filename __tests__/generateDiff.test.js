import fs from 'fs';
import generateDiff from '../src/index';
import getFixturePath from '../__fixtures__/getFixturePath';

test.each([
  ['yml'],
  ['ini'],
  ['json'],
])('GenerateDifference_test_1', (arg) => {
  expect(generateDiff(getFixturePath(`before.${arg}`), getFixturePath(`after.${arg}`)))
    .toEqual(fs.readFileSync(getFixturePath('exampleDefaultFormat'), 'utf8'));
  expect(generateDiff(getFixturePath(`before.${arg}`), getFixturePath(`after.${arg}`), 'PLAIN'))
    .toEqual(fs.readFileSync(getFixturePath('examplePlainFormat'), 'utf8'));
  expect(generateDiff(getFixturePath(`before.${arg}`), getFixturePath(`after.${arg}`), 'JSON'))
    .toEqual(fs.readFileSync(getFixturePath('exampleJsonFormat.json'), 'utf8'));
});
