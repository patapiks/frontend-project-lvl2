import fs from 'fs';
import path from 'path';
import generateDiff from '../src/index';

test.each([
  ['.yml', '', 'exampleDefaultFormat'],
  ['.ini', 'PLAIN', 'examplePlainFormat'],
  ['.json', 'JSON', 'exampleJsonFormat.json'],
])('GenerateDifference_test_1', (extension, format, example) => {
  const getFixturePath = (fileName, ext = '') => path.join(__dirname, '..', '__fixtures__', fileName + ext);

  const actualValue = generateDiff(getFixturePath('before', extension), getFixturePath('after', extension), format);
  const expectedValue = fs.readFileSync(getFixturePath(example), 'UTF-8');
  expect(actualValue).toEqual(expectedValue);
});
