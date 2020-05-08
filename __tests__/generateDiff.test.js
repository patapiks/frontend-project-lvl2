import fs from 'fs';
import path from 'path';
import generateDiff from '../src/index';

test.each([
  ['yml', '', 'exampleDefaultFormat'],
  ['ini', 'PLAIN', 'examplePlainFormat'],
  ['json', 'JSON', 'exampleJsonFormat.json'],
])('GenerateDifference_test_1', (expansion, format, example) => {
  const filePath1 = path.join(__dirname, '..', '__fixtures__', `before.${expansion}`);
  const filePath2 = path.join(__dirname, '..', '__fixtures__', `after.${expansion}`);
  const examplePath = path.join(__dirname, '..', '__fixtures__', example);

  const actualValue = generateDiff(filePath1, filePath2, format);
  const expectedValue = fs.readFileSync(examplePath, 'UTF-8');
  expect(actualValue).toEqual(expectedValue);
});
