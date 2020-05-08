#!/usr/bin/env node

import generateDiff from '../index';

const { program } = require('commander');

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --version', 'output the version number')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format', 'DEFAULT')
  .arguments('<firstConfig> <secondConfig>')
  .action((pathToFile1, pathToFile2) => {
    const result = generateDiff(pathToFile1, pathToFile2, program.format);
    console.log(result);
  })
  .parse(process.argv);
